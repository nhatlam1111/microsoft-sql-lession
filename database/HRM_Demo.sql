-- =====================================================================
-- HRM_Demo: database nhân sự giả lập cho khóa học "SQL Server"
-- =====================================================================
-- Toàn bộ dữ liệu là giả: tên người, số CCCD (bắt đầu bằng 000), email, lương.
-- Công thức lương đã đơn giản hóa, không dùng để tính lương thật:
--   * Bảo hiểm người lao động đóng = 10,5% lương cơ bản (hợp đồng thử việc không đóng).
--   * Thuế TNCN: giảm trừ cố định 11.000.000 đ/tháng, không tính người phụ thuộc,
--     biểu thuế lũy tiến từng phần theo tháng. Đây là giả định của bài học, không phải luật hiện hành.
--   * Ngày công thực tế = ngày có chấm công + ngày nghỉ phép năm đã duyệt.
-- Tháng 9/2026 giả định nghỉ lễ Quốc khánh ngày 1/9 và 2/9.
--
-- Cách chạy:
--   * Trên máy riêng: tạo một database tên HRM_Demo, mở database đó rồi chạy cả file này.
--   * Trên Azure SQL Database: chạy cả file trong database đang mở.
--   Chạy lại bao nhiêu lần cũng được: script chỉ xóa và tạo lại đúng 7 bảng của HRM_Demo
--   (đánh dấu bằng extended property "HRM_Demo"). Nếu database đã có bảng trùng tên
--   mà không phải của HRM_Demo, script dừng lại và không xóa gì.
--
-- Một số lỗi dữ liệu được cài cố ý để dùng trong bài học:
--   * NV015 và NV038 trùng số CCCD; NV044 và NV045 thiếu email (bài 4.6).
--   * Một hợp đồng thử việc của NV029 có ngày kết thúc trước ngày bắt đầu (bài 4.6).
--   * Bảng lương kỳ 2026-09 của NV013 và NV032 ghi dư 1 ngày công so với chấm công (bài 4.7).
-- =====================================================================

SET NOCOUNT ON;
SET XACT_ABORT ON;

IF EXISTS (
    SELECT 1
    FROM sys.tables AS t
    WHERE t.schema_id = SCHEMA_ID('dbo')
      AND t.name IN (N'PhongBan', N'ChucDanh', N'NhanVien', N'HopDong', N'ChamCong', N'DonNghiPhep', N'BangLuong')
      AND NOT EXISTS (
          SELECT 1 FROM sys.extended_properties AS ep
          WHERE ep.class = 1 AND ep.major_id = t.object_id AND ep.minor_id = 0 AND ep.name = N'HRM_Demo')
)
    THROW 50001, N'Database này đã có bảng trùng tên với HRM_Demo nhưng không phải do script này tạo. Script dừng lại, không xóa gì.', 1;

BEGIN TRANSACTION;

DROP TABLE IF EXISTS dbo.BangLuong;
DROP TABLE IF EXISTS dbo.DonNghiPhep;
DROP TABLE IF EXISTS dbo.ChamCong;
DROP TABLE IF EXISTS dbo.HopDong;
DROP TABLE IF EXISTS dbo.NhanVien;
DROP TABLE IF EXISTS dbo.ChucDanh;
DROP TABLE IF EXISTS dbo.PhongBan;

CREATE TABLE dbo.PhongBan (
    MaPB  varchar(10)   NOT NULL CONSTRAINT PK_PhongBan PRIMARY KEY,
    TenPB nvarchar(100) NOT NULL
);

CREATE TABLE dbo.ChucDanh (
    MaCD  varchar(10)   NOT NULL CONSTRAINT PK_ChucDanh PRIMARY KEY,
    TenCD nvarchar(100) NOT NULL
);

CREATE TABLE dbo.NhanVien (
    MaNV         varchar(10)   NOT NULL CONSTRAINT PK_NhanVien PRIMARY KEY,
    HoTen        nvarchar(100) NOT NULL,
    GioiTinh     nvarchar(10)  NOT NULL,
    NgaySinh     date          NOT NULL,
    SoCCCD       varchar(12)   NOT NULL,
    Email        varchar(100)  NULL,
    NgayVaoLam   date          NOT NULL,
    NgayNghiViec date          NULL,
    MaPB         varchar(10)   NOT NULL CONSTRAINT FK_NhanVien_PhongBan REFERENCES dbo.PhongBan (MaPB),
    MaCD         varchar(10)   NOT NULL CONSTRAINT FK_NhanVien_ChucDanh REFERENCES dbo.ChucDanh (MaCD),
    MaQuanLy     varchar(10)   NULL     CONSTRAINT FK_NhanVien_QuanLy REFERENCES dbo.NhanVien (MaNV),
    TrangThai    nvarchar(20)  NOT NULL
);

CREATE TABLE dbo.HopDong (
    MaHD        varchar(20)   NOT NULL CONSTRAINT PK_HopDong PRIMARY KEY,
    MaNV        varchar(10)   NOT NULL CONSTRAINT FK_HopDong_NhanVien REFERENCES dbo.NhanVien (MaNV),
    LoaiHD      nvarchar(50)  NOT NULL,
    NgayBatDau  date          NOT NULL,
    NgayKetThuc date          NULL,
    LuongCoBan  decimal(18,0) NOT NULL
);

CREATE TABLE dbo.ChamCong (
    MaNV   varchar(10) NOT NULL CONSTRAINT FK_ChamCong_NhanVien REFERENCES dbo.NhanVien (MaNV),
    Ngay   date        NOT NULL,
    GioVao time(0)     NULL,
    GioRa  time(0)     NULL,
    CONSTRAINT PK_ChamCong PRIMARY KEY (MaNV, Ngay)
);

CREATE TABLE dbo.DonNghiPhep (
    MaDon     varchar(10)  NOT NULL CONSTRAINT PK_DonNghiPhep PRIMARY KEY,
    MaNV      varchar(10)  NOT NULL CONSTRAINT FK_DonNghiPhep_NhanVien REFERENCES dbo.NhanVien (MaNV),
    LoaiNghi  nvarchar(30) NOT NULL,
    TuNgay    date         NOT NULL,
    DenNgay   date         NOT NULL,
    SoNgay    decimal(4,1) NOT NULL,
    TrangThai nvarchar(20) NOT NULL
);

CREATE TABLE dbo.BangLuong (
    KyLuong        char(7)       NOT NULL,
    MaNV           varchar(10)   NOT NULL CONSTRAINT FK_BangLuong_NhanVien REFERENCES dbo.NhanVien (MaNV),
    NgayCongChuan  decimal(4,1)  NOT NULL,
    NgayCongThucTe decimal(4,1)  NOT NULL,
    LuongCoBan     decimal(18,0) NOT NULL,
    PhuCap         decimal(18,0) NOT NULL,
    TienTangCa     decimal(18,0) NOT NULL,
    KhauTruBaoHiem decimal(18,0) NOT NULL,
    ThueTNCN       decimal(18,0) NOT NULL,
    ThucLinh       decimal(18,0) NOT NULL,
    CONSTRAINT PK_BangLuong PRIMARY KEY (KyLuong, MaNV)
);

EXEC sys.sp_addextendedproperty @name = N'HRM_Demo', @value = N'1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'PhongBan';
EXEC sys.sp_addextendedproperty @name = N'HRM_Demo', @value = N'1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ChucDanh';
EXEC sys.sp_addextendedproperty @name = N'HRM_Demo', @value = N'1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'NhanVien';
EXEC sys.sp_addextendedproperty @name = N'HRM_Demo', @value = N'1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'HopDong';
EXEC sys.sp_addextendedproperty @name = N'HRM_Demo', @value = N'1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ChamCong';
EXEC sys.sp_addextendedproperty @name = N'HRM_Demo', @value = N'1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'DonNghiPhep';
EXEC sys.sp_addextendedproperty @name = N'HRM_Demo', @value = N'1', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'BangLuong';

INSERT INTO dbo.PhongBan (MaPB, TenPB) VALUES
('BGD', N'Ban Giám đốc'),
('NS', N'Nhân sự'),
('KT', N'Kế toán'),
('KD', N'Kinh doanh'),
('IT', N'IT'),
('VH', N'Vận hành');

INSERT INTO dbo.ChucDanh (MaCD, TenCD) VALUES
('GD', N'Giám đốc'),
('TP', N'Trưởng phòng'),
('CVC', N'Chuyên viên chính'),
('CV', N'Chuyên viên'),
('TL', N'Trợ lý'),
('NV', N'Nhân viên');

-- Quản lý trực tiếp được gán ở câu UPDATE ngay sau.
INSERT INTO dbo.NhanVien (MaNV, HoTen, GioiTinh, NgaySinh, SoCCCD, Email, NgayVaoLam, NgayNghiViec, MaPB, MaCD, TrangThai) VALUES
('NV001', N'Trần Thị Mai', N'Nữ', '1992-04-12', '000192131376', 'mai.tt@hrmdemo.vn', '2024-03-01', NULL, 'KT', 'CV', N'Đang làm'),
('NV002', N'Lê Văn Hùng', N'Nam', '1988-09-03', '000088139295', 'hung.lv@hrmdemo.vn', '2024-04-01', NULL, 'KD', 'CVC', N'Đang làm'),
('NV003', N'Nguyễn Thu Hà', N'Nữ', '1995-01-25', '000195147214', 'ha.nt@hrmdemo.vn', '2023-06-01', NULL, 'KD', 'CV', N'Đang làm'),
('NV004', N'Hoàng Minh Tuấn', N'Nam', '1975-07-19', '000075155133', 'tuan.hm@hrmdemo.vn', '2015-01-05', NULL, 'BGD', 'GD', N'Đang làm'),
('NV005', N'Vũ Thị Lan', N'Nữ', '1982-11-08', '000182163052', 'lan.vt@hrmdemo.vn', '2016-03-14', NULL, 'KT', 'TP', N'Đang làm'),
('NV006', N'Đặng Quốc Bảo', N'Nam', '1984-02-27', '000084170971', 'bao.dq@hrmdemo.vn', '2016-08-01', NULL, 'KD', 'TP', N'Đang làm'),
('NV007', N'Bùi Thanh Sơn', N'Nam', '1986-05-30', '000086178890', 'son.bt@hrmdemo.vn', '2017-02-13', NULL, 'IT', 'TP', N'Đang làm'),
('NV008', N'Phan Văn Lợi', N'Nam', '1980-12-15', '000080186809', 'loi.pv@hrmdemo.vn', '2015-09-01', NULL, 'VH', 'TP', N'Đang làm'),
('NV009', N'Ngô Thị Thu Trang', N'Nữ', '1993-08-21', '000193194728', 'trang.ntt@hrmdemo.vn', '2019-05-06', NULL, 'BGD', 'TL', N'Đang làm'),
('NV010', N'Đỗ Thị Hồng', N'Nữ', '1983-03-09', '000183202647', 'hong.dt@hrmdemo.vn', '2016-06-01', NULL, 'NS', 'TP', N'Đang làm'),
('NV011', N'Lý Minh Khoa', N'Nam', '1990-10-02', '000090210566', 'khoa.lm@hrmdemo.vn', '2018-04-02', NULL, 'IT', 'CVC', N'Đang làm'),
('NV012', N'Trịnh Thị Ngọc', N'Nữ', '1991-06-17', '000191218485', 'ngoc.tt@hrmdemo.vn', '2018-07-16', NULL, 'NS', 'CVC', N'Đang làm'),
('NV013', N'Mai Đức Anh', N'Nam', '1994-01-11', '000094226404', 'anh.md@hrmdemo.vn', '2019-03-04', NULL, 'KD', 'CV', N'Đang làm'),
('NV014', N'Hồ Thị Bích', N'Nữ', '1989-04-28', '000189234323', 'bich.ht@hrmdemo.vn', '2017-10-02', NULL, 'KT', 'CVC', N'Đang làm'),
('NV015', N'Dương Văn Nam', N'Nam', '1992-12-05', '000092242242', 'nam.dv@hrmdemo.vn', '2019-09-09', NULL, 'VH', 'NV', N'Đang làm'),
('NV016', N'Lâm Thị Kim', N'Nữ', '1996-02-14', '000196250161', 'kim.lt@hrmdemo.vn', '2020-02-10', NULL, 'KD', 'CV', N'Đang làm'),
('NV017', N'Cao Minh Trí', N'Nam', '1993-07-07', '000093258080', 'tri.cm@hrmdemo.vn', '2020-06-01', NULL, 'IT', 'CV', N'Đang làm'),
('NV018', N'Tạ Thị Yến', N'Nữ', '1997-09-23', '000197265999', 'yen.tt@hrmdemo.vn', '2021-03-01', NULL, 'KT', 'CV', N'Đang làm'),
('NV019', N'Châu Văn Phúc', N'Nam', '1987-11-30', '000087273918', 'phuc.cv@hrmdemo.vn', '2018-01-15', NULL, 'VH', 'NV', N'Đang làm'),
('NV020', N'Kiều Thị Hạnh', N'Nữ', '1990-05-19', '000190281837', 'hanh.kt@hrmdemo.vn', '2019-04-01', '2025-12-31', 'KD', 'CV', N'Đã nghỉ'),
('NV021', N'Tôn Thất Long', N'Nam', '1995-03-03', '000095289756', 'long.tt@hrmdemo.vn', '2021-07-01', NULL, 'IT', 'CV', N'Đang làm'),
('NV022', N'Quách Thị Nga', N'Nữ', '1994-10-10', '000194297675', 'nga.qt@hrmdemo.vn', '2020-09-14', NULL, 'NS', 'CV', N'Đang làm'),
('NV023', N'Lưu Văn Thắng', N'Nam', '1991-08-08', '000091305594', 'thang.lv@hrmdemo.vn', '2019-11-04', NULL, 'KD', 'CV', N'Đang làm'),
('NV024', N'Võ Thị Thanh', N'Nữ', '1998-01-20', '000198313513', 'thanh.vt@hrmdemo.vn', '2022-02-14', NULL, 'VH', 'NV', N'Đang làm'),
('NV025', N'Huỳnh Văn Tài', N'Nam', '1993-06-06', '000093321432', 'tai.hv@hrmdemo.vn', '2023-11-01', NULL, 'KD', 'CV', N'Đang làm'),
('NV026', N'Phùng Thị Mỹ', N'Nữ', '1996-12-12', '000196329351', 'my.pt@hrmdemo.vn', '2021-05-04', NULL, 'KT', 'CV', N'Đang làm'),
('NV027', N'Đinh Công Hậu', N'Nam', '1989-02-02', '000089337270', 'hau.dc@hrmdemo.vn', '2018-08-20', NULL, 'VH', 'NV', N'Đang làm'),
('NV028', N'La Thị Diệu', N'Nữ', '1997-04-04', '000197345189', 'dieu.lt@hrmdemo.vn', '2022-08-01', NULL, 'KD', 'CV', N'Đang làm'),
('NV029', N'Mạc Văn Đông', N'Nam', '1994-09-09', '000094353108', 'dong.mv@hrmdemo.vn', '2025-03-01', NULL, 'IT', 'CV', N'Đang làm'),
('NV030', N'Nghiêm Thị Hoa', N'Nữ', '1999-07-15', '000199361027', 'hoa.nt@hrmdemo.vn', '2023-04-03', NULL, 'NS', 'CV', N'Đang làm'),
('NV031', N'Ông Văn Tú', N'Nam', '1992-03-27', '000092368946', 'tu.ov@hrmdemo.vn', '2020-10-05', NULL, 'VH', 'NV', N'Đang làm'),
('NV032', N'Từ Thị Hương', N'Nữ', '1995-11-11', '000195376865', 'huong.tt@hrmdemo.vn', '2021-09-06', NULL, 'KD', 'CV', N'Đang làm'),
('NV033', N'Khúc Văn Hải', N'Nam', '1990-01-01', '000090384784', 'hai.kv@hrmdemo.vn', '2019-06-03', '2026-06-30', 'VH', 'NV', N'Đã nghỉ'),
('NV034', N'Văn Thị Ly', N'Nữ', '1998-05-05', '000198392703', 'ly.vt@hrmdemo.vn', '2022-11-01', NULL, 'KT', 'NV', N'Đang làm'),
('NV035', N'Thái Minh Hiếu', N'Nam', '1996-08-18', '000096400622', 'hieu.tm@hrmdemo.vn', '2022-03-07', NULL, 'IT', 'CV', N'Đang làm'),
('NV036', N'Doãn Thị Thảo', N'Nữ', '1993-10-28', '000193408541', 'thao.dt@hrmdemo.vn', '2024-11-15', NULL, 'KD', 'CV', N'Đang làm'),
('NV037', N'Giang Văn Bình', N'Nam', '1988-06-24', '000088416460', 'binh.gv@hrmdemo.vn', '2017-05-02', NULL, 'VH', 'NV', N'Đang làm'),
('NV038', N'Ninh Thị Hà', N'Nữ', '1997-02-08', '000092242242', 'ha.nt2@hrmdemo.vn', '2023-08-14', NULL, 'KD', 'NV', N'Đang làm'),
('NV039', N'Âu Văn Kiên', N'Nam', '1994-12-19', '000094432298', 'kien.av@hrmdemo.vn', '2022-06-06', NULL, 'IT', 'CV', N'Đang làm'),
('NV040', N'Lục Thị Xuân', N'Nữ', '2000-03-16', '000300440217', 'xuan.lt@hrmdemo.vn', '2025-05-05', NULL, 'KD', 'NV', N'Đang làm'),
('NV041', N'Hà Văn Quý', N'Nam', '1991-07-21', '000091448136', 'quy.hv@hrmdemo.vn', '2020-01-06', '2026-08-15', 'VH', 'NV', N'Đã nghỉ'),
('NV042', N'Bạch Thị Tuyết', N'Nữ', '1999-09-29', '000199456055', 'tuyet.bt@hrmdemo.vn', '2024-07-01', NULL, 'KT', 'NV', N'Đang làm'),
('NV043', N'Đàm Văn Khánh', N'Nam', '1997-11-02', '000097463974', 'khanh.dv@hrmdemo.vn', '2023-02-06', NULL, 'IT', 'CV', N'Đang làm'),
('NV044', N'Lã Thị Oanh', N'Nữ', '1998-04-14', '000198471893', NULL, '2025-08-04', NULL, 'VH', 'NV', N'Đang làm'),
('NV045', N'Ung Văn Lực', N'Nam', '2001-01-09', '000201479812', NULL, '2026-07-01', NULL, 'KD', 'NV', N'Đang làm'),
('NV046', N'Hứa Thị Phương', N'Nữ', '2000-06-30', '000300487731', 'phuong.ht@hrmdemo.vn', '2026-09-14', NULL, 'IT', 'NV', N'Đang làm'),
('NV047', N'Phạm Ngọc Ánh', N'Nữ', '1999-02-17', '000199495650', 'anh.pn@hrmdemo.vn', '2026-10-01', NULL, 'NS', 'CV', N'Đang làm'),
('NV048', N'Đỗ Minh Quân', N'Nam', '2000-08-25', '000200503569', 'quan.dm@hrmdemo.vn', '2026-10-05', NULL, 'IT', 'NV', N'Đang làm');

UPDATE nv
SET MaQuanLy = CASE
        WHEN nv.MaCD = 'GD' THEN NULL
        WHEN nv.MaCD = 'TP' OR nv.MaPB = 'BGD' THEN 'NV004'
        ELSE tp.MaNV
    END
FROM dbo.NhanVien AS nv
LEFT JOIN dbo.NhanVien AS tp ON tp.MaPB = nv.MaPB AND tp.MaCD = 'TP';

INSERT INTO dbo.HopDong (MaHD, MaNV, LoaiHD, NgayBatDau, NgayKetThuc, LuongCoBan) VALUES
('HD2015-001', 'NV004', N'Không xác định thời hạn', '2015-01-05', NULL, 60000000),
('HD2015-002', 'NV008', N'Không xác định thời hạn', '2015-09-01', NULL, 32000000),
('HD2016-001', 'NV005', N'Không xác định thời hạn', '2016-03-14', NULL, 35000000),
('HD2016-002', 'NV010', N'Không xác định thời hạn', '2016-06-01', NULL, 33000000),
('HD2016-003', 'NV006', N'Không xác định thời hạn', '2016-08-01', NULL, 35000000),
('HD2017-001', 'NV007', N'Không xác định thời hạn', '2017-02-13', NULL, 35000000),
('HD2017-002', 'NV037', N'Không xác định thời hạn', '2017-05-02', NULL, 11000000),
('HD2017-003', 'NV014', N'Không xác định thời hạn', '2017-10-02', NULL, 25000000),
('HD2018-001', 'NV019', N'Không xác định thời hạn', '2018-01-15', NULL, 10000000),
('HD2018-002', 'NV011', N'Không xác định thời hạn', '2018-04-02', NULL, 26000000),
('HD2018-003', 'NV012', N'Không xác định thời hạn', '2018-07-16', NULL, 24000000),
('HD2018-004', 'NV027', N'Không xác định thời hạn', '2018-08-20', NULL, 10000000),
('HD2019-001', 'NV013', N'Không xác định thời hạn', '2019-03-04', NULL, 17000000),
('HD2019-002', 'NV033', N'Không xác định thời hạn', '2019-06-03', NULL, 10000000),
('HD2019-003', 'NV015', N'Không xác định thời hạn', '2019-09-09', NULL, 11000000),
('HD2019-004', 'NV023', N'Không xác định thời hạn', '2019-11-04', NULL, 17000000),
('HD2020-001', 'NV041', N'Không xác định thời hạn', '2020-01-06', NULL, 10000000),
('HD2020-002', 'NV022', N'Không xác định thời hạn', '2020-09-14', NULL, 16000000),
('HD2020-003', 'NV031', N'Không xác định thời hạn', '2020-10-05', NULL, 10000000),
('HD2021-001', 'NV021', N'Thử việc', '2021-07-01', '2021-08-31', 13600000),
('HD2021-002', 'NV021', N'Xác định thời hạn', '2021-09-01', '2024-08-31', 16000000),
('HD2023-001', 'NV020', N'Xác định thời hạn', '2023-04-01', '2026-03-31', 17000000),
('HD2023-002', 'NV030', N'Thử việc', '2023-04-03', '2023-06-02', 11900000),
('HD2023-003', 'NV017', N'Xác định thời hạn', '2023-06-01', '2026-12-31', 18000000),
('HD2023-004', 'NV030', N'Xác định thời hạn', '2023-06-03', '2026-06-02', 14000000),
('HD2023-005', 'NV025', N'Xác định thời hạn', '2023-11-01', '2025-10-31', 15000000),
('HD2023-104', 'NV003', N'Không xác định thời hạn', '2023-06-01', NULL, 16000000),
('HD2024-001', 'NV016', N'Xác định thời hạn', '2024-02-10', '2027-02-09', 16000000),
('HD2024-002', 'NV018', N'Xác định thời hạn', '2024-03-01', '2027-02-28', 15000000),
('HD2024-003', 'NV026', N'Xác định thời hạn', '2024-05-04', '2027-05-03', 15000000),
('HD2024-004', 'NV042', N'Xác định thời hạn', '2024-07-01', '2027-06-30', 10000000),
('HD2024-005', 'NV021', N'Không xác định thời hạn', '2024-09-01', NULL, 19000000),
('HD2024-006', 'NV032', N'Xác định thời hạn', '2024-09-06', '2027-09-05', 16000000),
('HD2024-007', 'NV034', N'Xác định thời hạn', '2024-11-01', '2027-10-31', 10000000),
('HD2024-008', 'NV036', N'Xác định thời hạn', '2024-11-15', '2026-11-14', 16000000),
('HD2024-018', 'NV001', N'Xác định thời hạn', '2024-03-01', '2027-02-28', 15000000),
('HD2024-021', 'NV002', N'Không xác định thời hạn', '2024-04-01', NULL, 25000000),
('HD2025-001', 'NV043', N'Xác định thời hạn', '2025-02-06', '2028-02-05', 17000000),
('HD2025-002', 'NV024', N'Xác định thời hạn', '2025-02-14', '2027-02-13', 10000000),
('HD2025-003', 'NV029', N'Thử việc', '2025-03-01', '2025-02-28', 13600000),
('HD2025-004', 'NV035', N'Không xác định thời hạn', '2025-03-07', NULL, 18000000),
('HD2025-005', 'NV029', N'Xác định thời hạn', '2025-05-01', '2028-04-30', 16000000),
('HD2025-006', 'NV040', N'Thử việc', '2025-05-05', '2025-07-04', 8500000),
('HD2025-007', 'NV009', N'Xác định thời hạn', '2025-05-06', '2027-05-05', 14000000),
('HD2025-008', 'NV039', N'Không xác định thời hạn', '2025-06-06', NULL, 18000000),
('HD2025-009', 'NV040', N'Xác định thời hạn', '2025-07-05', '2027-07-04', 10000000),
('HD2025-010', 'NV028', N'Xác định thời hạn', '2025-08-01', '2027-07-31', 15000000),
('HD2025-011', 'NV044', N'Thử việc', '2025-08-04', '2025-10-03', 8500000),
('HD2025-012', 'NV038', N'Xác định thời hạn', '2025-08-14', '2027-08-13', 10000000),
('HD2025-013', 'NV044', N'Xác định thời hạn', '2025-10-04', '2027-10-03', 10000000),
('HD2025-014', 'NV025', N'Xác định thời hạn', '2025-11-01', '2026-10-31', 16000000),
('HD2026-001', 'NV030', N'Không xác định thời hạn', '2026-06-03', NULL, 15000000),
('HD2026-002', 'NV045', N'Thử việc', '2026-07-01', '2026-08-31', 7650000),
('HD2026-003', 'NV045', N'Xác định thời hạn', '2026-09-01', '2027-08-31', 9000000),
('HD2026-004', 'NV046', N'Thử việc', '2026-09-14', '2026-11-13', 8500000);

INSERT INTO dbo.DonNghiPhep (MaDon, MaNV, LoaiNghi, TuNgay, DenNgay, SoNgay, TrangThai) VALUES
('DP001', 'NV013', N'Phép năm', '2026-09-07', '2026-09-08', 2.0, N'Đã duyệt'),
('DP002', 'NV016', N'Nghỉ ốm', '2026-09-15', '2026-09-15', 1.0, N'Đã duyệt'),
('DP003', 'NV022', N'Phép năm', '2026-09-21', '2026-09-23', 3.0, N'Đã duyệt'),
('DP004', 'NV005', N'Việc riêng', '2026-09-10', '2026-09-10', 1.0, N'Đã duyệt'),
('DP005', 'NV011', N'Phép năm', '2026-08-17', '2026-08-21', 5.0, N'Đã duyệt'),
('DP006', 'NV026', N'Phép năm', '2026-08-24', '2026-08-25', 2.0, N'Đã duyệt'),
('DP007', 'NV031', N'Nghỉ ốm', '2026-08-05', '2026-08-06', 2.0, N'Đã duyệt'),
('DP008', 'NV018', N'Phép năm', '2026-10-12', '2026-10-13', 2.0, N'Chờ duyệt'),
('DP009', 'NV035', N'Việc riêng', '2026-10-20', '2026-10-20', 1.0, N'Chờ duyệt'),
('DP010', 'NV039', N'Phép năm', '2026-09-28', '2026-09-30', 3.0, N'Từ chối'),
('DP011', 'NV024', N'Nghỉ ốm', '2026-09-03', '2026-09-04', 2.0, N'Đã duyệt'),
('DP012', 'NV002', N'Phép năm', '2026-08-10', '2026-08-11', 2.0, N'Đã duyệt'),
('DP013', 'NV037', N'Phép năm', '2026-09-16', '2026-09-18', 3.0, N'Đã duyệt'),
('DP014', 'NV042', N'Việc riêng', '2026-09-25', '2026-09-25', 1.0, N'Từ chối'),
('DP015', 'NV009', N'Phép năm', '2026-10-26', '2026-10-30', 5.0, N'Chờ duyệt'),
('DP016', 'NV012', N'Phép năm', '2026-09-14', '2026-09-14', 1.0, N'Đã duyệt'),
('DP017', 'NV027', N'Nghỉ ốm', '2026-09-08', '2026-09-09', 2.0, N'Đã duyệt'),
('DP018', 'NV043', N'Phép năm', '2026-08-31', '2026-09-04', 3.0, N'Đã duyệt'),
('DP019', 'NV032', N'Việc riêng', '2026-09-11', '2026-09-11', 1.0, N'Đã duyệt'),
('DP020', 'NV001', N'Phép năm', '2026-10-19', '2026-10-21', 3.0, N'Chờ duyệt');

-- Lịch tháng 8 và 9/2026. Thứ được tính từ 01/01/1900 (thứ Hai) nên không phụ thuộc @@DATEFIRST.
DECLARE @Lich TABLE (Ngay date NOT NULL PRIMARY KEY, LaNgayLam bit NOT NULL);
INSERT INTO @Lich (Ngay, LaNgayLam)
SELECT d.Ngay,
       CASE WHEN DATEDIFF(day, CAST('19000101' AS date), d.Ngay) % 7 < 5
                 AND d.Ngay NOT IN (CAST('20260901' AS date), CAST('20260902' AS date))
            THEN 1 ELSE 0 END
FROM (
    SELECT DATEADD(day, c.n * 10 + u.n, CAST('20260801' AS date)) AS Ngay
    FROM (VALUES (0), (1), (2), (3), (4), (5), (6), (7), (8), (9)) AS u (n)
    CROSS JOIN (VALUES (0), (1), (2), (3), (4), (5), (6)) AS c (n)
) AS d
WHERE d.Ngay <= CAST('20260930' AS date);

-- Ngày nghỉ đã duyệt, trải ra từng ngày làm việc.
DECLARE @NghiTheoNgay TABLE (MaNV varchar(10) NOT NULL, Ngay date NOT NULL, LoaiNghi nvarchar(30) NOT NULL, PRIMARY KEY (MaNV, Ngay));
INSERT INTO @NghiTheoNgay (MaNV, Ngay, LoaiNghi)
SELECT d.MaNV, l.Ngay, d.LoaiNghi
FROM dbo.DonNghiPhep AS d
JOIN @Lich AS l ON l.Ngay BETWEEN d.TuNgay AND d.DenNgay AND l.LaNgayLam = 1
WHERE d.TrangThai = N'Đã duyệt';

-- Chấm công tháng 9/2026: mọi ngày làm việc khi đang làm, trừ ngày nghỉ đã duyệt và vài ngày vắng.
INSERT INTO dbo.ChamCong (MaNV, Ngay, GioVao, GioRa)
SELECT nv.MaNV, l.Ngay,
       CASE WHEN (s.So * DAY(l.Ngay)) % 17 = 0 THEN CAST('08:25' AS time(0)) ELSE CAST('08:00' AS time(0)) END,
       CASE WHEN (s.So + DAY(l.Ngay)) % 29 = 0 THEN NULL
            WHEN s.So % 5 = 0 AND DAY(l.Ngay) % 4 = 0 THEN CAST('18:30' AS time(0))
            ELSE CAST('17:30' AS time(0)) END
FROM @Lich AS l
JOIN dbo.NhanVien AS nv ON l.Ngay >= nv.NgayVaoLam AND (nv.NgayNghiViec IS NULL OR l.Ngay <= nv.NgayNghiViec)
CROSS APPLY (SELECT CAST(SUBSTRING(nv.MaNV, 3, 3) AS int) AS So) AS s
WHERE l.LaNgayLam = 1
  AND l.Ngay >= CAST('20260901' AS date)
  AND NOT EXISTS (SELECT 1 FROM @NghiTheoNgay AS x WHERE x.MaNV = nv.MaNV AND x.Ngay = l.Ngay)
  AND (s.So * 3 + DAY(l.Ngay)) % 31 <> 0;

-- Bảng lương kỳ 2026-08 và 2026-09 cho người có hợp đồng hiệu lực trong kỳ.
WITH Ky AS (
    SELECT KyLuong, TuNgay, DenNgay
    FROM (VALUES ('2026-08', CAST('20260801' AS date), CAST('20260831' AS date)),
                 ('2026-09', CAST('20260901' AS date), CAST('20260930' AS date))) AS k (KyLuong, TuNgay, DenNgay)
),
HopDongKy AS (
    SELECT k.KyLuong, h.MaNV, h.LoaiHD, h.LuongCoBan,
           ROW_NUMBER() OVER (PARTITION BY k.KyLuong, h.MaNV ORDER BY h.NgayBatDau DESC) AS ThuTu
    FROM Ky AS k
    JOIN dbo.HopDong AS h
      ON h.NgayBatDau <= k.DenNgay
     AND (h.NgayKetThuc IS NULL OR (h.NgayKetThuc >= k.TuNgay AND h.NgayKetThuc >= h.NgayBatDau))
),
Dem AS (
    SELECT k.KyLuong, nv.MaNV, nv.MaCD,
           (SELECT COUNT(*) FROM @Lich AS l
             WHERE l.LaNgayLam = 1 AND l.Ngay BETWEEN k.TuNgay AND k.DenNgay) AS NgayCongChuan,
           (SELECT COUNT(*) FROM @Lich AS l
             WHERE l.LaNgayLam = 1 AND l.Ngay BETWEEN k.TuNgay AND k.DenNgay
               AND l.Ngay >= nv.NgayVaoLam AND (nv.NgayNghiViec IS NULL OR l.Ngay <= nv.NgayNghiViec)) AS NgayDangLam,
           (SELECT COUNT(*) FROM @NghiTheoNgay AS x
             WHERE x.MaNV = nv.MaNV AND x.Ngay BETWEEN k.TuNgay AND k.DenNgay) AS NgayNghi,
           (SELECT COUNT(*) FROM @NghiTheoNgay AS x
             WHERE x.MaNV = nv.MaNV AND x.Ngay BETWEEN k.TuNgay AND k.DenNgay AND x.LoaiNghi = N'Phép năm') AS NgayPhepNam,
           (SELECT COUNT(*) FROM dbo.ChamCong AS cc
             WHERE cc.MaNV = nv.MaNV AND cc.Ngay BETWEEN k.TuNgay AND k.DenNgay) AS NgayChamCong,
           (SELECT COUNT(*) FROM dbo.ChamCong AS cc
             WHERE cc.MaNV = nv.MaNV AND cc.Ngay BETWEEN k.TuNgay AND k.DenNgay AND cc.GioRa = CAST('18:30' AS time(0))) AS GioTangCa
    FROM Ky AS k
    CROSS JOIN dbo.NhanVien AS nv
),
Cong AS (
    SELECT d.*,
           -- Tháng 8 không có bảng chấm công: coi như đi làm đủ, trừ ngày nghỉ đã duyệt.
           CASE WHEN d.KyLuong = '2026-09' THEN d.NgayChamCong ELSE d.NgayDangLam - d.NgayNghi END
             + d.NgayPhepNam
             + CASE WHEN d.KyLuong = '2026-09' AND d.MaNV IN ('NV013', 'NV032') THEN 1 ELSE 0 END AS NgayCongThucTe
    FROM Dem AS d
    WHERE d.NgayDangLam > 0
)
INSERT INTO dbo.BangLuong (KyLuong, MaNV, NgayCongChuan, NgayCongThucTe, LuongCoBan, PhuCap, TienTangCa, KhauTruBaoHiem, ThueTNCN, ThucLinh)
SELECT c.KyLuong, c.MaNV, c.NgayCongChuan, c.NgayCongThucTe, h.LuongCoBan, p.PhuCap, t.TienTangCa, b.KhauTru, x.Thue,
       ROUND(g.TongThuNhap - b.KhauTru - x.Thue, -3)
FROM Cong AS c
JOIN HopDongKy AS h ON h.KyLuong = c.KyLuong AND h.MaNV = c.MaNV AND h.ThuTu = 1
CROSS APPLY (SELECT CAST(CASE c.MaCD WHEN 'GD' THEN 5000000 WHEN 'TP' THEN 3000000 WHEN 'CVC' THEN 1500000 ELSE 730000 END AS decimal(18,0)) AS PhuCap) AS p
CROSS APPLY (SELECT ROUND(c.GioTangCa * h.LuongCoBan / c.NgayCongChuan / 8 * 1.5, -3) AS TienTangCa) AS t
CROSS APPLY (SELECT ROUND(h.LuongCoBan * c.NgayCongThucTe / c.NgayCongChuan, 0) + p.PhuCap + t.TienTangCa AS TongThuNhap) AS g
CROSS APPLY (SELECT CASE WHEN h.LoaiHD = N'Thử việc' THEN CAST(0 AS decimal(18,0)) ELSE ROUND(h.LuongCoBan * 0.105, 0) END AS KhauTru) AS b
CROSS APPLY (SELECT CASE WHEN g.TongThuNhap - b.KhauTru - 11000000 > 0 THEN g.TongThuNhap - b.KhauTru - 11000000 ELSE 0 END AS TinhThue) AS n
CROSS APPLY (SELECT ROUND(CASE
        WHEN n.TinhThue <= 5000000  THEN n.TinhThue * 0.05
        WHEN n.TinhThue <= 10000000 THEN n.TinhThue * 0.10 - 250000
        WHEN n.TinhThue <= 18000000 THEN n.TinhThue * 0.15 - 750000
        WHEN n.TinhThue <= 32000000 THEN n.TinhThue * 0.20 - 1650000
        WHEN n.TinhThue <= 52000000 THEN n.TinhThue * 0.25 - 3250000
        WHEN n.TinhThue <= 80000000 THEN n.TinhThue * 0.30 - 5850000
        ELSE n.TinhThue * 0.35 - 9850000 END, 0) AS Thue) AS x;

COMMIT TRANSACTION;

SELECT N'HRM_Demo đã sẵn sàng' AS KetQua,
       (SELECT COUNT(*) FROM dbo.NhanVien) AS SoNhanVien,
       (SELECT COUNT(*) FROM dbo.HopDong) AS SoHopDong,
       (SELECT COUNT(*) FROM dbo.ChamCong) AS SoDongChamCong,
       (SELECT COUNT(*) FROM dbo.BangLuong) AS SoDongBangLuong;

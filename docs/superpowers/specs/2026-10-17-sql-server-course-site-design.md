# Thiết kế: website khóa học "SQL Server"

- Ngày: 2026-10-17
- Trạng thái: đã duyệt; prototype đã đăng ngày 2026-10-18. Thay đổi sau khi đăng ở mục 11; đợt tiếp theo ở [spec đợt 2](2026-10-18-step-flow-exercises-full-lessons-design.md).
- Repo: https://github.com/nhatlam1111/microsoft-sql-lession
- Địa chỉ sau khi đăng: https://nhatlam1111.github.io/microsoft-sql-lession/
- Mockup đã duyệt: thư mục [`2026-10-17-mockups/`](2026-10-17-mockups/) (file HTML dạng mảnh, mở bằng trình duyệt để xem; phần khung chọn A/B thiếu CSS là bình thường)

## 1. Mục đích và lý do

Một website dạy Microsoft SQL Server theo kiểu thực chiến, chạy tĩnh trên GitHub Pages, chỉ dùng trên máy tính. Khóa học được làm trước hết cho một người học: từng làm consultant triển khai phần mềm nhân sự (HRM), đang chuyển sang làm BA/PM, rành nghiệp vụ nhân sự và Excel nhưng gần như chưa tự viết SQL. Người làm khóa học là dev của một app HRM chạy trên SQL Server. Sau này khóa học có thể được đưa cho người khác học, nên nội dung không được gắn với vị trí hay xuất thân của bất kỳ ai.

Ba ý tưởng xuyên suốt:

1. **Dữ liệu nhân sự ở mọi ví dụ.** Người học hiểu sẵn dữ liệu đang nói về chuyện gì (nhân viên, hợp đồng, chấm công, nghỉ phép, bảng lương), nên chỉ còn phải học cách hỏi dữ liệu.
2. **Excel là cây cầu.** Mỗi khái niệm SQL mở đầu bằng một việc quen làm trên Excel: AutoFilter → `WHERE`, VLOOKUP → `JOIN`, PivotTable → `GROUP BY`, Data Validation → ràng buộc.
3. **Học không đều vẫn không lạc.** Người học có thể bỏ dở vài tuần. Khi mở lại trang, họ phải thấy ngay mình đã học đến đâu và bấm một nút là học tiếp.

Đợt này cần: một prototype chạy được, khung toàn bộ khóa học, nội dung tóm tắt từng bài để duyệt nhanh. Phần bài tập và thực hành làm sau.

## 2. Mục tiêu, ngoài phạm vi, những điều không được xảy ra

### Mục tiêu

- Phân biệt rõ level từ cơ bản đến nâng cao: 6 level, mỗi level có một câu "học xong làm được gì"; mỗi bài ghi rõ level, bài cần học trước và mục tiêu của bài.
- Mindmap giúp hình dung toàn bộ kiến thức, chia nhánh theo mảng kiến thức, mỗi bài gắn nhãn level.
- Popup lộ trình hiện ra khi người học quay lại, đánh dấu bài đã học bằng tick xanh lá, có nút "Học tiếp".
- Đánh dấu tiến độ từng bài (chưa học, đã xem, đã học, cần xem lại), lưu lại giữa các lần mở trang.
- Trang bài học có nhịp dẫn dắt cố định, giọng văn tự nhiên, không lý thuyết suông.
- Thêm hoặc sửa bài chỉ là thêm hoặc sửa một file Markdown.
- Push lên GitHub là trang tự cập nhật.

### Ngoài phạm vi (đợt này)

- Bài tập, chấm bài, môi trường chạy SQL trên web. Mỗi bài chỉ có một mục "Bài tập" để trống, ghi "Phần bài tập sẽ bổ sung sau". (Chuyển sang [đợt 2](2026-10-18-step-flow-exercises-full-lessons-design.md).)
- Viết đầy đủ cả 51 bài. Đợt này chỉ viết đầy đủ 3 bài mẫu (xem mục 7), 48 bài còn lại là bản tóm tắt. (Đợt 2 bắt đầu viết đầy đủ từ Level 1.)
- Giao diện điện thoại, máy tính bảng.
- Tài khoản người dùng, đồng bộ tiến độ giữa nhiều máy qua server.
- Nội dung quản trị database ở mức thao tác (tự backup, restore, cấu hình server). Phần cấp cứu dữ liệu chỉ dừng ở mức lý thuyết.
- Giao diện tối (dark mode).

### Những điều không được xảy ra

- Văn đọc lên thấy "máy viết": mở bài kiểu "Hãy cùng khám phá…", "Trong thế giới dữ liệu ngày nay…", emoji, in đậm tràn lan, kết đoạn bằng "Tóm lại…", từ sáo rỗng ("hành trình", "chinh phục", "bí kíp", "tuyệt vời").
- Nhắc tới người học là ai: không "hồi làm consultant", không "bên khách hàng", không "dành cho BA/PM", không "bàn với dev".
- Bài nặng lý thuyết, thiếu tình huống nhân sự cụ thể và thiếu phần đối chiếu Excel.
- Câu lệnh hoặc kết quả trong bài không chạy lại được trên database mẫu.
- Dùng cấu trúc bảng hay dữ liệu thật của app HRM nào. Trang là public, ai có link cũng xem được.
- Tiến độ mất mà không báo, hoặc trạng thái bài khó hiểu.

## 3. Ràng buộc

- Hosting: GitHub Pages, chỉ file tĩnh, không server. Trang nằm dưới đường dẫn con `/microsoft-sql-lession/`, mọi link và tài nguyên phải đi qua `base`.
- Chỉ dành cho máy tính, thiết kế cho màn hình rộng từ 1280px.
- Toàn bộ giao diện và nội dung bằng tiếng Việt. Từ khóa SQL, tên hàm, tên tính năng Excel giữ nguyên tiếng Anh.
- Font phải hiển thị tốt tiếng Việt có dấu.
- SQL nhắm tới SQL Server 2019 trở lên và Azure SQL Database; công cụ là SSMS.
- Máy hiện có Node.js. Không có SQL Server cài sẵn, không có Docker, không có `gh` CLI.
- Kiểm chứng câu lệnh (đã chốt): người làm khóa học tự chạy script `HRM_Demo` trên Azure SQL `sql-lession`; người dựng kiểm từng câu lệnh và lấy kết quả thật qua MCP `azure-sql` của project, giữ nguyên chế độ chỉ đọc. Người dựng không ghi gì vào `sql-lession`.

## 4. Những gì đã chốt

### 4.1 Công nghệ (đã chốt)

- **Astro** dựng trang tĩnh.
- **Mỗi bài là một file MDX.** Phần đầu file (frontmatter) ghi: mã bài, tên bài, level, mảng kiến thức, thời gian đọc, bài cần học trước, câu "học xong bài này", loại bài (đầy đủ hay tóm tắt).
- **Thành phần dùng lại trong MDX:** khối Excel, khối SQL tô màu kiểu SSMS, bảng kết quả kiểu SSMS, bong bóng tin nhắn, khung "Hay nhầm", khung "Ứng dụng", bảng "Ghi nhớ".
- **Phần tương tác** (popup lộ trình, mindmap, tiến độ, tìm kiếm) chạy phía trình duyệt. Mindmap dùng **React Flow** (`@xyflow/react`).
- **Tiến độ** lưu trong `localStorage`, có xuất và nhập file JSON.
- **GitHub Actions** build và đăng lên GitHub Pages mỗi lần push vào `main`.

### 4.2 Tên và bố cục chung (đã chốt qua mockup)

- Tên trang: **SQL Server**.
- Thanh trên cùng: tên trang, ô tìm kiếm (Ctrl K), nút "Lộ trình" (mở popup), nút "Mindmap", tiến độ tổng (ví dụ 18/51 kèm thanh tiến độ).
- Trang bài học gồm 3 cột: sidebar trái (danh sách level, level đang học mở sẵn các bài kèm trạng thái), nội dung bài ở giữa (rộng khoảng 720px), cột phải (mục lục "Trong bài này", ô trạng thái bài kèm nút "Đã học xong" và "Cắm cờ xem lại").
- Mockup: [`lesson-page.html`](2026-10-17-mockups/lesson-page.html).

### 4.3 Popup "Lộ trình của bạn" (đã chốt kiểu B, "đường đi")

- Đầu popup: "Lần trước bạn dừng ở bài X", "Cách đây N ngày (thứ, ngày/tháng)", số bài đã học. Bên phải là nút lớn "Học tiếp bài X" kèm tên bài; nếu có bài đã cắm cờ thì thêm dòng "Xem lại bài Y bạn đã cắm cờ".
- Giữa popup: 6 level là 6 trạm trên một đường ngang. Trạm học xong hết thì tô xanh lá có tick, trạm đang học viền xanh dương, các trạm khác xám; dưới mỗi trạm là tên level và số bài đã học (kèm số cờ nếu có).
- Level đang học được mở rộng bên dưới: tên level, câu "học xong level này", danh sách bài chia 2 cột, bài đang học dở tô nền xanh nhạt. Bấm vào trạm khác thì xem bài của level đó.
- Cuối popup: chú thích 4 trạng thái, nút "Mở mindmap", nút "Đóng" (Esc cũng đóng).
- Mockup: [`roadmap-popup.html`](2026-10-17-mockups/roadmap-popup.html), phương án B.

### 4.4 Mindmap (đã chốt kiểu B, chia theo mảng kiến thức)

- Gốc ở giữa: "SQL Server". 8 nhánh là 8 mảng kiến thức, 4 nhánh bên phải và 4 nhánh bên trái (thứ tự ở mục 6). Lá là các bài.
- Nhánh hiển thị tên mảng, thanh tiến độ, số bài đã học trên tổng, số cờ nếu có, nút +/− để mở hoặc thu gọn.
- Lá hiển thị biểu tượng trạng thái, mã bài, tên bài ngắn, nhãn level L1–L6 theo màu. Bài đang học dở tô nền xanh nhạt.
- Thanh công cụ: "Menu khóa học" (thêm sau khi đăng, mục 11), "Mở hết", "Thu gọn", "Về giữa", chú thích trạng thái và màu level. Kéo và zoom được.
- Thứ tự học vẫn do lộ trình (theo level) dẫn; mindmap để nhìn toàn cảnh.
- Mockup: [`mindmap.html`](2026-10-17-mockups/mindmap.html), phương án B.

### 4.5 Trang bài học (đã chốt qua bài mẫu 3.5)

> Đổi ngày 2026-10-18: khuôn mục "Làm bằng SQL" và quy tắc mục "Bài tập" theo [spec Level 1, mục 3](2026-10-18-level-1-full-lessons-design.md). Khung chép ra viết: [`docs/lesson-template.md`](../../lesson-template.md).

Đầu bài: nhãn level, mã bài, tên bài, thời gian đọc, "Cần biết trước" (link tới bài), khung "Học xong bài này: …".

Thân bài đi theo đúng thứ tự các mục sau, tên mục giữ nguyên:

1. **Tình huống**: một yêu cầu nhân sự cụ thể, có thể dùng bong bóng tin nhắn. Kết bằng một câu "nói gọn lại" để chốt câu hỏi dữ liệu. Câu dẫn trung tính, ví dụ "Một yêu cầu hay gặp từ phòng nhân sự".
2. **Với Excel**: cách quen thuộc để làm việc đó trên Excel, kèm khối Excel (thanh công thức, lưới ô có tên cột A B C, số dòng, ô lỗi tô đỏ nhạt như định dạng có điều kiện của Excel).
3. **Làm bằng SQL**: ~~viết và chạy theo từng bước (Bước 1, Bước 2…)~~ (đổi 2026-10-18) lý thuyết cơ bản (khái niệm, cú pháp chung, ví dụ thu gọn, bảng từng phần nghĩa là gì), rồi câu lệnh cho tình huống kèm kết quả, rồi sơ đồ thứ tự chạy khi câu lệnh có từ 2 bước trở lên.
4. **Hay nhầm ở đâu**: 2–3 lỗi thường gặp, nói rõ hậu quả.
5. **Ứng dụng**: 1–2 cách dùng trong công việc thật (kiểm tra dữ liệu sau import, viết yêu cầu báo cáo…), không gắn với vị trí người đọc.
6. **Ghi nhớ**: bảng 2 cột "Bên Excel" / "Bên SQL".
7. **Bài tập**: danh sách bài tập của bài; chưa có thì ghi "Phần bài tập sẽ bổ sung sau.". Bài 1.1–1.5 không có mục này (đổi 2026-10-18).

Cuối bài: nút "Đã học xong bài này" (xanh lá), nút "Cắm cờ xem lại", gợi ý nhỏ "Bấm khi bạn tự viết lại được câu lệnh mà không nhìn bài" (bài khái niệm có `noExercises`: "Bấm khi bạn trả lời được các câu tự kiểm tra cuối bài mà không nhìn bài.", đổi 2026-10-19), thẻ bài trước và bài sau.

Quy ước hiển thị:

- Khối SQL tô màu như SSMS mặc định: từ khóa (`SELECT`, `FROM`, `WHERE`, `AS`, `ON`…) xanh dương `#0000FF`; toán tử và các từ `JOIN`, `IS`, `NULL`, `AND`, `OR`, `IN`, `LIKE`, dấu phẩy màu xám `#808080`; chú thích xanh lá `#008000`; chuỗi đỏ `#FF0000`; hàm hệ thống hồng tím `#FF00FF`. Có nút "Sao chép"; trình duyệt từ chối chép thì nút báo "Không chép được".
- Bảng kết quả giống tab Results của SSMS: cột số thứ tự xám, ô `NULL` nền vàng nhạt `#FFFFE1`, dòng trạng thái "Query executed successfully." kèm tên database và số dòng.
- Khối Excel: dải đầu màu xanh Excel `#107C41`, ô `#N/A` nền `#FFC7CE` chữ `#9C0006`.

### 4.6 Trạng thái học và tiến độ

- Mỗi bài có một trạng thái chính và một cờ riêng:
  - **Chưa học**: vòng tròn rỗng.
  - **Đã xem**: nửa vòng tròn màu hổ phách, tự đánh dấu ngay khi mở trang bài.
  - **Đã học**: tròn xanh lá có tick, chỉ khi người học bấm "Đã học xong". Bấm lại thì bỏ đánh dấu.
  - **Cần xem lại**: cờ đỏ, người học tự bật hoặc tắt; độc lập với trạng thái chính. Khi có cờ, biểu tượng cờ được ưu tiên hiển thị.
- Số "đã học" ở mọi nơi chỉ đếm các bài có trạng thái Đã học.
- "Học tiếp" trỏ tới bài mở gần nhất mà chưa Đã học; nếu bài đó đã học xong thì trỏ tới bài kế tiếp theo thứ tự lộ trình.
- Lưu trong trình duyệt; có "Xuất tiến độ" (tải file JSON) và "Nhập tiến độ" (chọn file, kiểm tra hợp lệ, hỏi lại trước khi ghi đè), và "Xóa tiến độ" (hỏi lại).
- Bản lưu trong trình duyệt đọc không được thì được chép sang một khóa dự phòng rồi bắt đầu lại từ đầu; nếu không chép được thì web không ghi đè lên bản cũ và báo là không lưu được tiến độ.
- Bài không còn trong danh mục vẫn được giữ trong bản lưu của trình duyệt (để một trang cũ hay một lần đổi số bài không làm mất tiến độ); chỉ khi nhập file thì các bài đó mới bị bỏ qua và web báo số bài bỏ qua.
- Nạp tiến độ mẫu hay nhập file được tính là vừa ghé hôm nay, nên sang trang sau popup lộ trình không tự mở lại.

### 4.7 Giọng văn và quy tắc viết

- Xưng "bạn". Câu ngắn, nói như người đi trước chỉ việc. Mỗi đoạn một ý.
- Mỗi bài có ít nhất một tình huống nhân sự cụ thể và một đối chiếu Excel.
- Giải thích thuật ngữ ngay lần đầu xuất hiện. Từ khóa SQL giữ nguyên tiếng Anh.
- Dùng "kết bảng" khi nói về `JOIN` (không dùng "nối bảng").
- Không nhắc vai trò hay xuất thân người đọc; tình huống là yêu cầu công việc trung tính.
- Tránh các dấu hiệu "máy viết" ở mục 2.
- Bài mẫu 3.5 trong mockup là chuẩn giọng văn, sau khi sửa 2 chỗ: câu dẫn tình huống thành trung tính, mục "Mang vào việc BA/PM" thành "Ứng dụng".

### 4.8 Database mẫu `HRM_Demo`

- Một database nhân sự giả lập, dữ liệu hoàn toàn giả (tên người, số CCCD, lương). Tên bảng và cột tiếng Việt không dấu kiểu PascalCase.
- Lưu thành script trong repo (tạo bảng và nạp dữ liệu), chạy được trên SQL Server 2019+ và Azure SQL Database. Sau này dùng cho phần bài tập.
- Vì Azure SQL Database không chuyển database bằng `USE`, script không có `USE` hay `CREATE DATABASE`: chạy thẳng trong database đang mở, bảng nằm ở schema `dbo`. Ai học trên máy riêng thì tự tạo database tên `HRM_Demo` rồi chạy script. Trong bài, tên database hiển thị là `HRM_Demo`.
- Script chạy lại được nhiều lần: chỉ xóa và tạo lại đúng các bảng của `HRM_Demo`, không đụng tới đối tượng nào khác. Trước khi người làm khóa học chạy, người dựng kiểm qua MCP xem `sql-lession` đã có bảng trùng tên hay chưa.
- File script lưu dạng UTF-8 có BOM, để SSMS và `sqlcmd` đọc đúng chữ tiếng Việt khi mở hoặc chạy file.
- Mọi câu lệnh và kết quả trong bài phải khớp với script này. Kết quả bị cắt bớt phải ghi rõ "trích N dòng". Câu lệnh có hiển thị kết quả thì phải có `ORDER BY` khi thứ tự có ý nghĩa.
- Khung bảng tối thiểu (người dựng được thêm cột hoặc bảng nếu bài cần):

| Bảng | Cột chính |
|---|---|
| `PhongBan` | `MaPB` (khóa chính), `TenPB` |
| `ChucDanh` | `MaCD` (khóa chính), `TenCD` |
| `NhanVien` | `MaNV` (khóa chính, dạng `NV001`), `HoTen`, `GioiTinh`, `NgaySinh`, `SoCCCD`, `Email`, `NgayVaoLam`, `NgayNghiViec` (có thể trống), `MaPB`, `MaCD`, `MaQuanLy` (trỏ về `NhanVien`), `TrangThai` |
| `HopDong` | `MaHD` (khóa chính), `MaNV`, `LoaiHD` (thử việc, xác định thời hạn, không xác định thời hạn), `NgayBatDau`, `NgayKetThuc` (trống khi không xác định thời hạn), `LuongCoBan` |
| `ChamCong` | `MaNV`, `Ngay`, `GioVao`, `GioRa` |
| `DonNghiPhep` | `MaDon`, `MaNV`, `LoaiNghi`, `TuNgay`, `DenNgay`, `SoNgay`, `TrangThai` |
| `BangLuong` | `KyLuong` (dạng `2026-09`), `MaNV`, `NgayCongChuan`, `NgayCongThucTe`, `LuongCoBan`, `PhuCap`, `TienTangCa`, `KhauTruBaoHiem`, `ThueTNCN`, `ThucLinh` |

- Dữ liệu: khoảng 48 nhân viên (`NV001`–`NV048`), 6 phòng ban (Ban Giám đốc, Nhân sự, Kế toán, Kinh doanh, IT, Vận hành), chấm công tháng 9/2026, bảng lương kỳ 2026-08 và 2026-09. `NV047` (Phạm Ngọc Ánh, Nhân sự, vào làm 2026-10-01) và `NV048` (Đỗ Minh Quân, IT, vào làm 2026-10-05) chưa có hợp đồng, để khớp bài 3.5. Có vài nhân viên có cả hợp đồng thử việc lẫn chính thức (bài 3.6), có quan hệ quản lý (bài 3.7), và vài lỗi dữ liệu cố ý để dùng ở bài 4.6.

### 4.9 Màu sắc và chữ (theo mockup)

| Vai trò | Giá trị |
|---|---|
| Nền trang | `#F4F2EC` |
| Nền khối | `#FFFFFF` |
| Chữ chính / phụ / mờ | `#1F2328` / `#5B6169` / `#8A9099` |
| Đường kẻ | `#E5E2DA` |
| Nhấn (xanh dương) | `#1F4FD1`, nền nhạt `#E8EEFF` |
| Đã học (xanh lá) | `#1A7F4B`, nền nhạt `#E3F4EA` |
| Đã xem (hổ phách) | `#B26B00` |
| Cần xem lại (đỏ) | `#C0364F`, nền nhạt `#FBE3E8` |
| Level L1–L6 | `#0F8B8D`, `#2F6FD6`, `#5B4BC4`, `#9B3FAE`, `#C4581F`, `#8A2D16` |

- Font: **Be Vietnam Pro** cho giao diện và tiêu đề, **Literata** cho đoạn văn trong bài, **JetBrains Mono** cho code.
- Giữ tinh thần này; người dựng được tinh chỉnh để đẹp và đủ tương phản (chữ mờ trên nền trang hiện hơi nhạt), nhưng giữ bố cục và quy ước màu trạng thái.

## 5. Level

| Level | Tên | Học xong level này |
|---|---|---|
| 1 | Làm quen | Biết dữ liệu của hệ thống nhân sự nằm ở đâu, mở ra đọc được |
| 2 | Cơ bản | Tự lấy danh sách nhân viên theo điều kiện bất kỳ |
| 3 | Trung cấp | Tự làm báo cáo từ nhiều bảng, thay cho VLOOKUP và PivotTable |
| 4 | Phân tích | Phân tích, đối soát dữ liệu và viết yêu cầu báo cáo rõ ràng |
| 5 | Nâng cao | Hiểu thiết kế database, sửa dữ liệu an toàn, biết vì sao truy vấn chậm |
| 6 | Cấp cứu dữ liệu | Biết phải làm gì khi dữ liệu gặp sự cố (lý thuyết) |

## 6. Khung khóa học: 51 bài, 8 mảng kiến thức

Mảng kiến thức (thứ tự trên mindmap: A1–A4 bên phải từ trên xuống, A5–A8 bên trái từ trên xuống):

| Mã | Mảng | Số bài |
|---|---|---|
| A1 | Nền tảng database | 7 |
| A2 | Lấy và lọc dữ liệu | 7 |
| A3 | Tính toán trong câu lệnh | 3 |
| A4 | Kết bảng / lệnh JOIN | 6 |
| A5 | Tổng hợp và phân tích | 9 |
| A6 | Làm việc với dữ liệu thật | 6 |
| A7 | Sửa dữ liệu và hiệu năng | 6 |
| A8 | An toàn và cấp cứu dữ liệu | 7 |

Danh sách bài (tên bài có thể chỉnh câu chữ khi viết, nhưng giữ ý):

| Bài | Tên bài | Mảng | Liên hệ Excel | Nội dung chính |
|---|---|---|---|---|
| **Level 1 · Làm quen** | | | | |
| 1.1 | Database là gì, nhìn từ một file Excel nhân sự | A1 | Workbook, sheet, dòng, cột | File Excel nhân sự gửi qua lại sinh ra những lỗi gì; database giải quyết ra sao; đối chiếu workbook ↔ database, sheet ↔ bảng. **Bài đầy đủ.** |
| 1.2 | SQL Server, SSMS và database mẫu HRM_Demo | A1 | Mở file so với kết nối máy chủ | Server, database, bảng; kết nối bằng SSMS; Object Explorer; chạy script tạo HRM_Demo |
| 1.3 | Bảng, cột và kiểu dữ liệu | A1 | Format Cells, nhưng bắt buộc | INT, DECIMAL, NVARCHAR, DATE, BIT; vì sao ngày và tiền không còn bị lệch kiểu |
| 1.4 | Khóa chính, khóa ngoại và chuyện "Mã NV" | A1 | Cột mã không trùng; dropdown lấy từ sheet khác | Khóa chính, khóa ngoại; vì sao không xóa được phòng ban còn nhân viên |
| 1.5 | Đọc sơ đồ quan hệ (ERD) của HRM_Demo | A1 | Các sheet tham chiếu nhau | Quan hệ một-nhiều: phòng ban–nhân viên, nhân viên–hợp đồng, nhân viên–chấm công, bảng lương |
| 1.6 | Câu SELECT đầu tiên | A2 | Mở sheet ra xem | `SELECT *`, `TOP`; chạy bằng F5; đọc tab Results và Messages |
| **Level 2 · Cơ bản** | | | | |
| 2.1 | Chọn cột và đặt tên cột | A2 | Ẩn cột, đổi tiêu đề | Liệt kê cột cần lấy; `AS`; vì sao báo cáo không nên dùng `SELECT *` |
| 2.2 | WHERE: lọc như AutoFilter | A2 | AutoFilter | `=`, `<>`, `>`, `<`; lọc theo phòng ban, trạng thái, ngày vào làm |
| 2.3 | AND, OR, IN, BETWEEN, LIKE | A2 | Text Filters, Number Filters | Kết hợp điều kiện; dấu ngoặc; tìm theo một phần họ tên |
| 2.4 | Sắp xếp và lấy TOP | A2 | Sort, Top 10 | `ORDER BY` nhiều cột; `TOP` luôn đi cùng `ORDER BY` |
| 2.5 | NULL: ô trống không phải số 0 | A2 | Ô trống, COUNTBLANK | `IS NULL`, `ISNULL`, `COALESCE`; NULL trong phép tính |
| 2.6 | DISTINCT: bỏ dòng trùng | A2 | Remove Duplicates | `DISTINCT` một cột, nhiều cột; đếm giá trị khác nhau |
| 2.7 | Hàm chuỗi và tiếng Việt có dấu | A3 | LEFT, MID, CONCAT, TRIM | Hàm chuỗi; chữ `N` trước chuỗi tiếng Việt; collation và tìm không dấu |
| 2.8 | Hàm ngày: thâm niên, sinh nhật, hết hạn hợp đồng | A3 | TODAY, DATEDIF, EDATE, EOMONTH | `GETDATE`, `DATEDIFF`, `DATEADD`, `EOMONTH`; hợp đồng sắp hết hạn trong 30 ngày |
| 2.9 | CASE WHEN: hàm IF của SQL | A3 | IF, IFS | Phân nhóm thâm niên; đổi mã trạng thái thành chữ |
| **Level 3 · Trung cấp** | | | | |
| 3.1 | COUNT, SUM, AVG, MIN, MAX | A5 | SUM, COUNT, AVERAGE | Đếm nhân viên, tổng quỹ lương; `COUNT(*)` khác `COUNT(cột)` |
| 3.2 | GROUP BY: PivotTable bằng SQL | A5 | PivotTable (Rows) | Số người và quỹ lương theo phòng ban |
| 3.3 | HAVING: lọc sau khi gộp | A5 | Lọc trên PivotTable | Phòng ban trên 10 người; `WHERE` khác `HAVING` |
| 3.4 | INNER JOIN: VLOOKUP bằng SQL | A4 | VLOOKUP, XLOOKUP | Lấy tên phòng ban cho danh sách nhân viên; bí danh bảng |
| 3.5 | LEFT JOIN: tìm người chưa có hợp đồng | A4 | VLOOKUP ra #N/A | `LEFT JOIN … IS NULL`; điều kiện của bảng bên phải đặt ở `ON`. **Bài đầy đủ.** |
| 3.6 | Kết nhiều bảng: NV → HĐ → Lương | A4 | VLOOKUP qua nhiều sheet | Kết 3–4 bảng; dòng bị nhân lên khi quan hệ một-nhiều |
| 3.7 | Self join: ai quản lý ai | A4 | VLOOKUP trong chính sheet đó | Kết `NhanVien` với chính nó qua `MaQuanLy` |
| 3.8 | UNION: gộp hai danh sách | A4 | Dán chồng hai danh sách, Append | `UNION` khác `UNION ALL` |
| 3.9 | Subquery: câu lệnh lồng nhau | A4 | Cột phụ, sheet trung gian | `IN (SELECT …)`, `EXISTS`; khi nào dùng thay `JOIN` |
| 3.10 | Đếm có điều kiện kiểu COUNTIFS | A5 | COUNTIFS, SUMIFS | `SUM(CASE WHEN …)`; báo cáo nam/nữ theo phòng ban trên một dòng |
| **Level 4 · Phân tích** | | | | |
| 4.1 | CTE: giải bài toán từng bước | A5 | Các bước Power Query, sheet trung gian | `WITH`; chia báo cáo phức tạp thành bước nhỏ |
| 4.2 | Xếp hạng với ROW_NUMBER, RANK | A5 | RANK.EQ | Hợp đồng mới nhất của mỗi người; top 3 lương mỗi phòng |
| 4.3 | Lũy kế và so với tháng trước | A5 | Công thức cộng dồn, =B3-B2 | `SUM() OVER`, `LAG`; biến động quỹ lương theo tháng |
| 4.4 | PIVOT: xoay bảng như Excel | A5 | PivotTable (Columns) | `PIVOT` và cách viết bằng `SUM(CASE …)` |
| 4.5 | View: báo cáo lưu sẵn | A5 | Sheet báo cáo, query đã lưu | `CREATE VIEW`; dùng view như một bảng |
| 4.6 | Soi chất lượng dữ liệu: trùng, thiếu, sai | A6 | Conditional Formatting, Data Validation | Tìm mã trùng, thiếu thông tin bắt buộc, ngày vô lý |
| 4.7 | Đối soát chấm công và bảng lương | A6 | Đối chiếu hai file bằng VLOOKUP hai chiều | `FULL OUTER JOIN`, `EXCEPT`; tìm chênh lệch ngày công |
| 4.8 | Đọc hiểu stored procedure | A6 | Macro VBA có tham số | Đọc thủ tục, tham số, `EXEC`; lần theo cách tính một con số |
| 4.9 | Kéo dữ liệu SQL Server vào Excel bằng Power Query | A6 | Get Data, Refresh | Kết nối, dán câu lệnh, làm mới; khi nào nên dùng view |
| 4.10 | Viết yêu cầu báo cáo rõ ràng | A6 | Bảng mẫu báo cáo trong Excel | Định nghĩa từng cột, điều kiện lọc, mốc thời gian, trường hợp đặc biệt |
| **Level 5 · Nâng cao** | | | | |
| 5.1 | Thiết kế bảng và chuẩn hóa | A1 | Vì sao không gõ lại tên phòng ban ở mỗi dòng | Chuẩn hóa nói bằng lời thường; khi nào chấp nhận lặp dữ liệu |
| 5.2 | Ràng buộc: Data Validation của database | A1 | Data Validation | `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`, khóa ngoại |
| 5.3 | INSERT, UPDATE, DELETE an toàn | A7 | Sửa ô, nhưng không có Ctrl+Z | `SELECT` trước khi sửa; `WHERE`; `@@ROWCOUNT`; `OUTPUT` |
| 5.4 | Transaction: được ăn cả, ngã về không | A7 | Undo, nhưng chỉ trước khi COMMIT | `BEGIN TRAN`, `COMMIT`, `ROLLBACK`; SSMS mặc định tự commit |
| 5.5 | Import dữ liệu từ file Excel | A6 | File mẫu import | Import Wizard, bảng tạm, kiểm tra trước khi đưa vào bảng thật |
| 5.6 | Index và chuyện truy vấn chậm | A7 | Mục lục sách; lọc file một triệu dòng | Index là gì; clustered và nonclustered; cái giá của index |
| 5.7 | Đọc execution plan cơ bản | A7 | Evaluate Formula | Xem kế hoạch thực thi; scan và seek; tìm bước tốn nhất |
| 5.8 | Lock, blocking, deadlock | A7 | File đang có người khác mở | Vì sao câu lệnh "treo"; đọc thông báo deadlock |
| 5.9 | Trigger và nhật ký thay đổi | A7 | Track Changes, Version History | Ai đã sửa lương, lúc nào; trigger ghi lịch sử |
| **Level 6 · Cấp cứu dữ liệu** | | | | |
| 6.1 | Dữ liệu nhạy cảm và phân quyền | A8 | Protect Sheet, đặt mật khẩu file | Lương, số CCCD là dữ liệu nhạy cảm; quyền chỉ đọc; che dữ liệu; quy định bảo vệ dữ liệu cá nhân hiện hành (kiểm tra số hiệu văn bản khi viết) |
| 6.2 | Dev, UAT, Production khác nhau thế nào | A8 | Làm trên bản copy file | Vì sao không thử trên Production; dữ liệu thật trên môi trường test |
| 6.3 | Backup và restore chạy ra sao | A8 | Version History, Save As bản sao | Full, differential, log backup ở mức khái niệm |
| 6.4 | Point-in-time restore là gì | A8 | Khôi phục phiên bản theo giờ | Recovery model; khôi phục về một thời điểm; Azure SQL tự backup |
| 6.5 | Lỡ UPDATE quên WHERE: 5 phút đầu | A8 | Ctrl+Z không cứu được | Việc làm ngay, thông tin cần báo, các đường cứu, thói quen phòng tránh. **Bài đầy đủ.** |
| 6.6 | Temporal table: xem dữ liệu quá khứ | A8 | Version History cho từng dòng | `FOR SYSTEM_TIME AS OF`; khi nào hệ thống có sẵn lịch sử |
| 6.7 | Checklist trước khi chạy câu lệnh trên Production | A8 | Checklist trước khi gửi file lương | Danh sách kiểm tra in ra được |

## 7. Phạm vi prototype đợt này

1. Khung web đầy đủ: thanh trên, sidebar, popup lộ trình, mindmap, tìm kiếm, tiến độ, xuất/nhập tiến độ, trang giới thiệu.
2. Đủ 51 trang bài. 48 bài **tóm tắt**: phần đầu bài như bài đầy đủ, sau đó "Nội dung chính" (3–5 gạch đầu dòng), "Liên hệ Excel" (1–2 câu), "Tình huống ví dụ" (1 câu), mục "Bài tập" để trống; có nhãn "Bản tóm tắt".
3. 3 bài **đầy đủ**, mỗi tầng một bài:
   - **1.1 Database là gì, nhìn từ một file Excel nhân sự**: chuyện file Excel nhân sự nhiều sheet gửi qua email (trùng mã, gõ sai tên phòng ban, nhiều bản khác nhau); database giải quyết gì; đối chiếu workbook/sheet/cột/dòng/mã NV/dropdown với database/bảng/cột/dòng/khóa chính/khóa ngoại; nhìn thử một câu `SELECT` đầu tiên, chưa đi sâu cú pháp.
   - **3.5 LEFT JOIN: tìm người chưa có hợp đồng**: theo mockup, đã sửa câu dẫn và đổi "Ứng dụng".
   - **6.5 Lỡ UPDATE quên WHERE: 5 phút đầu**: tình huống chạy `UPDATE BangLuong SET …` quên `WHERE`; việc làm ngay (dừng mọi lệnh sửa; kiểm tra `@@TRANCOUNT`, nếu transaction còn mở thì `ROLLBACK`; ghi lại thời điểm chính xác, câu lệnh, số dòng bị ảnh hưởng ở tab Messages; báo ngay người quản trị database); các đường cứu ở mức khái niệm (point-in-time restore ra database khác rồi chép lại phần bị hỏng, temporal table, bảng nhật ký); thói quen phòng tránh (`SELECT` cùng điều kiện trước, `BEGIN TRAN` rồi xem số dòng trước khi `COMMIT`, sao lưu các dòng sắp sửa, dùng tài khoản chỉ đọc khi chỉ cần xem).
4. Script `HRM_Demo` (mục 4.8). Sau khi script được chạy trên `sql-lession`, mọi câu lệnh trong 3 bài đầy đủ được chạy lại qua MCP chỉ đọc và kết quả in trong bài được chép từ lần chạy thật. Câu lệnh sửa dữ liệu (ví dụ `UPDATE` ở bài 6.5) không chạy được ở chế độ chỉ đọc: kiểm bằng câu `SELECT` tương ứng (cùng điều kiện) để ra đúng số dòng bị ảnh hưởng.
5. Workflow GitHub Actions đăng lên GitHub Pages.
6. Chế độ xem thử: một nút nạp "tiến độ mẫu" (khoảng 18/51 bài, đang dở bài 3.5, có một bài cắm cờ như mockup) để duyệt popup và mindmap khi đang học dở, và nút xóa tiến độ để quay về trạng thái trống.

## 8. Những quyết định mình tự đặt (bạn xem lại khi đọc)

1. Popup tự hiện khi vào trang lần đầu, hoặc khi lần ghé trước cách đây từ 24 giờ trở lên. Lần đầu, popup ghi lời chào ngắn, mở sẵn Level 1, nút "Bắt đầu bài 1.1" và link tới trang giới thiệu.
2. Trạng thái "Đã xem" tự đánh dấu ngay khi mở bài. "Cần xem lại" là cờ riêng, không thay cho trạng thái chính.
3. Trang chủ là mindmap, popup nổi lên trên khi cần. Trang "Giới thiệu" riêng nói về khóa học, cách dùng trạng thái, 6 level và database mẫu.
4. ~~Bấm vào bài trên mindmap là mở thẳng trang bài, không có khung xem trước.~~ Đổi ngày 2026-10-18 theo yêu cầu: bấm vào bài mở drawer tóm tắt bên phải, có nút "Vào bài học" (mục 11).
5. Database mẫu giả lập, tên bảng tiếng Việt không dấu.
6. Ba bài đầy đủ là 1.1, 3.5 và 6.5.
7. Có tìm kiếm (Ctrl K) theo mã bài, tên bài, nội dung tóm tắt và tên tính năng Excel; gõ không dấu vẫn ra kết quả có dấu.
8. Chỉ có giao diện sáng. Dưới 1024px hiện thông báo "Trang được thiết kế cho máy tính", vẫn cho xem.
9. Có chế độ xem thử bằng tiến độ mẫu.
10. Dùng chữ "kết bảng" cho JOIN trong toàn khóa; bài 3.6 thành "Kết nhiều bảng: NV → HĐ → Lương".
11. Tên level và câu "học xong level này" như mục 5; bài 4.10 đổi thành "Viết yêu cầu báo cáo rõ ràng", bài 5.5 thành "Import dữ liệu từ file Excel" cho trung tính.

## 9. Để người dựng tự quyết

- Cấu trúc thư mục, tên component, cách tổ chức state phía trình duyệt, khóa và cấu trúc dữ liệu trong `localStorage` (nên có số phiên bản để đổi cấu trúc sau này).
- Đường dẫn từng bài (gợi ý: `/bai/3-5-left-join/`), cách sinh mục lục "Trong bài này".
- Thuật toán bố trí mindmap trong React Flow, hiệu ứng mở/thu gọn, mức zoom ban đầu.
- Cách làm tìm kiếm phía trình duyệt, miễn bỏ dấu khi so khớp.
- Tự host font hay dùng Google Fonts.
- Số phút đọc của từng bài, danh sách "Cần biết trước", câu chữ cụ thể của 48 bản tóm tắt (theo quy tắc ở mục 4.7).
- Dữ liệu cụ thể trong `HRM_Demo`, miễn đúng các điểm neo ở mục 4.8.
- Cách kiểm thử (logic tiến độ, quy tắc hiện popup, xuất/nhập tiến độ, build không lỗi, link không gãy dưới `base`).
- Tinh chỉnh thị giác trong khuôn khổ mục 4.9.

## 10. Việc bạn cần tự làm

- ~~Bật GitHub Pages cho repo: Settings → Pages → Source: **GitHub Actions**.~~ Đã làm.
- ~~Khi người dựng báo script `HRM_Demo` đã sẵn sàng: chạy script một lần trên Azure SQL `sql-lession`.~~ Đã làm, người dựng đã kiểm số dòng qua MCP.
- ~~Bảo đảm MCP `azure-sql` kết nối được trong phiên làm việc.~~ Đã kết nối. Còn một việc: `.env` đang để `MCP_ALLOW_WRITE=true`, cần đổi về `false` để giữ đúng chế độ chỉ đọc ở mục 3.

## 11. Thay đổi sau khi đăng (2026-10-18)

- Sửa lỗi: node trên mindmap không bấm được (React Flow tắt nhận chuột với node không chọn được và không kéo được).
- Thanh trên cùng: nút "Mindmap" và "Giới thiệu" sáng lên khi đang ở đúng trang đó.
- Mindmap có nút "Menu khóa học" ở đầu thanh công cụ: mở danh sách bài ở bên trái giống sidebar trang bài, mở sẵn level của bài đang học dở; mở hoặc ẩn thì bản đồ tự căn lại.
- Bấm vào bài trên mindmap mở drawer bên phải: level, mã bài, tên bài, trạng thái, "Bản tóm tắt" hoặc số phút, đoạn tóm tắt, "Học xong bài này", "Liên hệ Excel", "Cần biết trước" (bấm để chuyển drawer sang bài đó, nhánh đang đóng thì tự mở), nút "Vào bài học". Đóng bằng ×, Esc hoặc bấm vào chỗ trống. Ctrl+click hoặc chuột giữa vẫn mở thẳng bài. Bản đồ chỉ dịch vừa đủ để bài đang chọn không bị drawer che.
- Bấm vào nhánh vẫn là mở hoặc thu gọn nhánh, không mở drawer.
- Sửa các lỗi nhỏ còn để lại từ rà soát đợt 1 (cũng ngày 2026-10-18): bản lưu hỏng không chép dự phòng được thì không bị ghi đè; bài lạ trong bản lưu được giữ; tiến độ mẫu và file nhập không làm popup mở lại ở trang sau; `HRM_Demo.sql` có BOM; nút "Sao chép" báo khi không chép được.
- Sidebar và popup lộ trình chỉ nhận các trường bài học chúng hiển thị (mã, slug, tên, tên ngắn, level), không nhận cả danh mục; trang bài nhẹ đi khoảng một phần tư (bài 3.5: 177 KB còn 130 KB, nén gzip 33,5 KB còn 23,7 KB).
- CI chạy `npm run check` (`astro check`) trước test, để lỗi kiểu dữ liệu trong `.ts`, `.tsx` và `.astro` dừng bản build.

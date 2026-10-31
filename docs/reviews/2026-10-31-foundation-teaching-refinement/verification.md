# Chỉnh nhẹ năm bài Làm quen — kiểm và xử lý review

Ngày31/10/2026. Người dùng chọn làm theo đề xuất sau brainstorming: giữ năm bài/thứ tự, giảm độ sâu 1.3, dẫn ERD từ hai bảng, chỉnh điều kiện và câu ôn. Không có quyền push/deploy trong lượt này.

## Phiên bản và phạm vi

- Base `740c5694f6f6fd337c93cee2f7e3d9f899344dcb`; nhánh `codex/refine-foundation-lessons`.
- Vòng1 `ae7a2f3a0aa3c60e39babe0aeae356d49d8ea534`; build21:33 từ đúng MDX này, 129 trang. Commit chỉ ghi nhận những nội dung đã dùng để build; không có source MDX đổi giữa lần build và commit.
- Sửa năm MDX1.1–1.5, assertions kiến thức và tài liệu của lượt. Giữ frontmatter, slug, prerequisite, ảnh/component, YAML/seed/API/editor/Giới thiệu.
- Spec: `docs/superpowers/specs/2026-10-31-foundation-teaching-refinement-design.md`; plan cùng tên ở `plans/`.

## Kiểm tác giả thực hiện

| Lớp kiểm | Kết quả thực tế |
|---|---|
| SELECT live | Sáu query chỉ đọc đạt:48 hồ sơ/12 cột NhanVien, riêngNV021 một hồ sơ/ba hợp đồng, NV001→KT→Kế toán, metadata MaPB khôngNULL, khóa lương(KyLuong,MaNV), ngày01/02/2024→2024-01-02 và đổi số9610000. Không câu ghi, không runner. |
| Test vòng1 | Ba assertion mới thất bại trước sửa và67/67 content test đạt sau sửa. Toàn suite369/369 test,49 file đạt. |
| Astro check vòng1 |0 lỗi/0 warning;3 hint deprecated nền trong ExerciseWorkspace/SqlEditor. Không sửa ngoài phạm vi để bỏ hint. |
| Build/dist vòng1 |129 trang; check:dist1951 liên kết đạt. |
| Đếm từ vòng1 |proseParagraphs690/603/665/618/618; đoạn dài nhất88 từ;3/3/4/4/3 câu ôn. Sau sửa theo review1.1/1.2:692/608/665/618/618. |
| Browser vòng1 |IAB/CUA tại127.0.0.1:4331, bản preview dist. Đã mở cả năm bài, thử Enter/Space mở các câu ôn mới1.1–1.4 và câu tìm đường1.5. 1280×900: hình bảng1.2, nhãn khóaSsms1.4 và pathERD được xem;1024×900: nhãnNULL/decimal Ssms1.3, ERD1.5. ERD tô đúngPhongBan/NhanVien và hai cộtMaPB, không tràn toàn trang; ArrowRight cuộn vùng sơ đồ (content844/client403, scrollLeft≈38.67). |

Browser mở đầu có viewport695×871: trang ba cột sẵn có quá hẹp để đọc; không coi đây là nghiệm thu mobile. Sau đó dùng desktop để kiểm bài theo phạm vi sản phẩm. Không đổi CSS/component. Các screenshot/thao tác của vòng1 không dùng làm bằng chứng cho câu chữ sửa ở vòng2 trước khi build lại.

Evidence máy local: `temp/verification/2026-10-31-foundation-teaching-refinement/` gồm `verify-live.mjs`, `sql-results.json`, `word-counts.json`, test/check/build/dist logs. Không in/commit credential; các file log máy không commit.

## Review độc lập và ma trận

Mỗi bài một agent mới, fork none, Codex kế thừa model phiên, không override; chỉ nguồn/HTML tĩnh, không DB/secret/SQL/browser. Report gốc được giữ nguyên, không sửa kết luận của reviewer. Không có YAML hoặc đề thực hành; reviewer lập tiền đề từng câu tự kiểm tra.

| Nguồn nhận xét | Quyết định và xử lý |
|---|---|
| Brainstorm:1.2 đủ cột chưa đủ để nhận dòng |Làm theo: thêm điều kiện thỏa các luật đã khai báo. |
| Brainstorm:1.4 FK chưa đủ để mọi hồ sơ có phòng |Làm theo: gắn MaPB khôngNULL ngay trong câu kết luận. |
| Brainstorm:1.5 quá nhiều việc trước SELECT |Làm một phần: mở bằng hai bảng, giảng một-nhiều trước rồi mở rộng ba bảng; giữ một câu đọc khóa nhiều cột vì sơ đồ vẫn hiện PK/FK. Không thêm cú pháp. |
|1.1: câu ôn thiếu kiểm lợi ích nguồn chung |Làm theo: thêm một vế ngắn trong câu1/đáp án; giữ ba câu và câu đóngSSMS, cắt một câu ngoài mục tiêu để bù độ dài. |
|1.2: NV005 là giá trị, “thuộc dòng hay cột” mơ hồ |Làm theo: hỏi dấu dòng tô vàng và cột khung xanh trên hình, đáp án chỉ rõ hồ sơNV005/cộtHoTen. |
|1.2: “HopDong có ba dòng” thiếu phạm vi |Làm theo: thêm “riêngNV021”. Không đổi số liệu. |
|1.3: không finding cần sửa |Giữ source đã kiểm; các câu ôn đủ tiền đề theo report. |
|1.4: “bảng kia” không bao gồm ví dụ tự tham chiếu |Làm theo: định nghĩa dùng “bảng được trỏ tới” và tiêu đề “Khóa ngoại giữ mã tham chiếu có thật”; giữ ví dụ MaQuanLy. |
|1.5: chấm tròn không có trên đường MaQuanLy |Làm một phần: thêm “Ở đường tô xanh” trước mô tả chấm tròn/∞, giữ hướng dẫn đúng cho liên kết MaPB đang học; không sửa component hoặc thêm ngoại lệ dài. Đối chiếu src/lib/db-diagram.ts và HTML: đường tự tham chiếu có dot:null, các đường thường có dot. |

Đã đọc đủ năm report trước sửa từng bài và xử lý mọi nhận xét có căn cứ. Năm bản gốc ở các file review-1-1.md đến review-1-5.md trong cùng thư mục.

## Kiểm vòng2 sau xử lý review

- 369/369 test (49 file) đạt; Astro check 0 lỗi/0 warning, giữ 3 hint nền. Build 21:43:06 đạt 129 trang; check:dist đạt 1951 link.
- Số từ cuối theo proseParagraphs: 692/608/665/620/622; 3/3/4/4/3 câu ôn, đoạn dài nhất 88 từ.
- Sau build lại, CUA reload trang1.5 và đối chiếu lời “Ở đường tô xanh”; mở câu ôn nguồn chung1.1 bằng Enter, câu nhận diện hình1.2 bằng Space và thấy đúng đáp án mới;1.4 có tiêu đề/định nghĩa “bảng được trỏ tới”. Đã dùng viewport1024×900, không tràn toàn trang; reset viewport sau kiểm.
- Không đổi SQL/số liệu sau sáu SELECT vòng1; không chạy lại SQL hoặc runner chỉ vì biên tập câu chữ. Log vòng2 có hậu tố final trong thư mục evidence local.

Chờ review tích hợp mới trên source/build cuối. Chưa dùng trạng thái này làm bàn giao hoàn tất.

## Giới hạn

Review học thử không thay SQL/UI tác giả đã kiểm. Chưa có học viên thật hoặc đo thời lượng7 phút; chưa kiểm SSMS thật, mobile/zoom hay toàn bộ đăng nhập/chạy/nộp/lưu tiến độ web. Năm bài không có thực hànhSQL và không sửa các luồng đó, nên không chạy lại check:exercises/check:data hoặc sửagrader/nháp. Không có dữ liệu nguồn bị đổi.

# Ma trận xử lý review bộ slide Làm quen — 04/11/2026

Hai report gốc nằm cạnh file này, không sửa kết luận của reviewer: `review-bo-slide-lam-quen.md` (học thử cả bộ, mã F01–F36) và `review-tich-hop-lam-quen-slides.md` (tích hợp, mã T-01–T-14, trong report ghi là F-01–F-14).

**Công cụ thực tế:** Claude Code, công cụ Agent, `model: sonnet`, `effort: high`, ngữ cảnh mới; công cụ không trả lại tên model thực tế nên không ghi là đã xác minh. Cả hai reviewer chỉ đọc nguồn, ảnh và HTML trong `dist/`, không mở browser, không chạy SQL; reviewer tích hợp tự chạy ba file test (21 test đạt). Source giao review: sha256 `lam-quen.mdx` = `b27f01aa…649b`.

Tác giả kiểm từng mục bằng nguồn: HTML build (nháy cong, `href` tương đối), tiêu đề bài 5.x trong `src/content/lessons`, bài 1.2/1.4/1.5, ảnh PUBS và ảnh đồ thị, `docs/ho-so-cong-ty.md`. Không kết nối database.

## Kết quả

| Mã | Quyết định | Căn cứ và kết quả |
|---|---|---|
| F21 | Làm theo | Xác nhận trong HTML: `''` thành `”`, `'NULL'` thành `‘NULL’` ở cả hai trang. Đổi sang chuỗi JSX; build ra `&#39;&#39;`; thêm test |
| F19, T-01 | Làm theo | `../../phu-luc/` hỏng ở trang người giảng (sâu hơn một cấp). Dùng `appendixUrl()`; HTML cả hai trang ra `/microsoft-sql-lession/phu-luc/…`; test chặn `href="../`. `check:dist` bỏ qua link tương đối từ trước: không đổi công cụ dùng chung trong đợt này, để tác giả quyết |
| T-02 | Làm theo | Giao dịch là bài 5.4, 5.5 là Import Excel. Sửa ghi chú slide 8 (giao dịch 5.4, phân quyền 6.1, sao lưu 6.3). Bài 1.2 dòng 64 cũng ghi 5.5: ngoài phạm vi (không sửa bài nguồn), báo người làm khóa học |
| F24, T-03 | Làm một phần | Khôi phục đúng chữ bài 1.4: "cách `UNIQUE` xử lý `NULL` học ở bài 5.2". Bài 5.2 hiện là bài tóm tắt chưa dạy điều đó: không sửa bài nguồn, báo người làm khóa học |
| F27, T-09 | Làm theo | Ảnh PUBS có bảy bảng. Sửa alt; slide 20 nêu buổi này bỏ qua `employee`, `discounts`; ghi chú nhắc cả `pub_info`. Không dịch các nhãn tiếng Anh trong ảnh (nguyên gốc, không vẽ lại) |
| F29, T-08 | Làm một phần | Caption nói rõ vùng phóng không có đường nối; slide 23 thêm `titles` (ba bảng, zoom 1.45). Không chuyển sang vùng có đường: vùng `publishers`–`titles` rộng 140×340 px gốc, ở zoom đọc được (từ 1,8) cao trên 600 px, vượt vùng nội dung 500 px |
| F28 | Làm một phần | Slide 20 nêu quy tắc đầu chìa khóa = phía một. Không thêm nhãn tiếng Anh trong ảnh và "để làm gì" của slide 25 |
| F18, T-04 | Làm theo | Bảng chuyển kiểu ghi "Chuỗi …" và "Cấu hình đọc tháng trước ngày" ngay trên slide; test mới |
| F01, T-05 | Làm theo | Slide 1 nói `HRM_Demo` là database nhân sự mẫu của khóa học |
| F02 | Làm một phần | Thêm "(dạng bảng)" và "nhóm khác ở slide sau"; không thêm câu lý do cần database vì slide 5 đã trả lời |
| F04 | Làm theo | Caption và alt nêu Alice, Bob, Chess, `knows`, `is_member` (đã đối chiếu ảnh) |
| F06, T-06 | Làm theo | Thêm hàng Phần mềm Excel ↔ DBMS vào bảng slide 3; thay "Hay hiểu nhầm" lệch chủ đề |
| F07 | Làm một phần | Slide 4 nói bảng còn gọi là relation nên có tên database quan hệ. SVG đa ngôn ngữ (`systemLanguage` es/hi): chưa xác minh, giữ nguyên SVG gốc |
| F09 | Làm theo | Slide 5: họ tên chỉ lưu ở hồ sơ, hợp đồng chỉ giữ `MaNV` |
| F12 | Làm theo | Sửa thứ tự trong ghi chú slide 7; hiểu nhầm của slide 6 không nhắc SSMS; "truy vấn" được định nghĩa tại slide 7 |
| F13 | Làm một phần | Hàng đầu "Lấy thông tin qua nhiều bảng"; điều kiện giao dịch "lập trình đúng" như bài 1.2. Không thêm ví dụ giao dịch (kịch bản chỉ nhận diện, bài 5.4 dạy) |
| F14 | Làm theo | Tách câu Azure, nêu đám mây Azure. Không thêm hàng Azure vào bảng edition vì bảng gắn SQL Server 2025 |
| F17, T-07 | Làm một phần | Thêm "khóa học dùng `nvarchar` cho tên tiếng Việt"; giữ vế UTF-8 vì chặn hiểu nhầm "varchar luôn không dấu"; không giải nghĩa byte trên slide |
| F23 | Làm một phần | Đổi tiêu đề cột bảng PK và "nó" thành "bảng"; "tối đa một PK" giữ ở ghi chú |
| F25 | Làm theo | Bảng khóa ghép ghi lần lượt bốn dòng, dòng cuối bị chặn vì trùng cả cặp; "một khóa gồm nhiều cột" |
| F26 | Làm một phần | Tiêu đề cột đúng nghĩa, "kết bảng" có nghĩa tại chỗ. Giữ caption "không phải ô chọn" |
| F30, T-10 | Làm theo | "Cột FK còn cần tính duy nhất". Không thêm lý do có bảng một–một riêng |
| F31 | Làm theo | Mỗi dòng `sales` là một lần bán |
| F32 | Làm một phần | Giải nghĩa "script PUBS". Hai chiều tối đa một / đúng một đã nằm trong câu cuối slide 24 |
| F33, T-11 | Làm một phần | "Thông tin sách lặp ở mỗi dòng bán"; bỏ câu phòng nhân viên khỏi ghi chú. Không tách slide, không đổi thời lượng (kịch bản đã duyệt), tự tham chiếu giữ ở slide cuối vì hai ID cũ trỏ tới đây theo spec |
| F35 | Làm một phần | Sửa các câu "ra lệnh cho người viết" ở ghi chú slide 3, 12, 15, 19, 24; không viết lại cả 25 mục Giải thích |
| T-13 | Làm một phần | Siết kiểm `decimal`; thêm test PubsFigure (vùng trong ảnh 477×474, credit, MIT, bảy bảng), test nháy, test link PL. Giữ các kiểm điều kiện cốt lõi hiện cho lớp |
| T-14 | Làm theo | Xóa ba selector CSS thừa; cập nhật DESIGN.md (cỡ chữ foundation, crop PUBS, `ConceptFigure` không còn dùng) và lời dẫn ở `src/assets/presentations/SOURCES.md`. Không xóa `ConceptFigure.astro` (ngoài phạm vi) |
| F03 | Không làm theo | Slide 2 đáy 619/658 px, không còn chỗ giải nghĩa ba loại NoSQL; buổi chỉ nhận diện, nghĩa ở bài 1.1 và ghi chú |
| F05, F08, F10, F16, F20, F22, F36 | Không làm theo | Biên tập thuần túy hoặc đã có trong spec: bảng/caption đủ hiểu; mục tiêu slide mở 1 phút; lặp "không tự biết dữ liệu đúng nghiệp vụ" có chủ đích ở các slide điều kiện; spec không có slide hỏi đáp. Ý Data Validation giữ một vế ở slide 5 để không tuyệt đối hóa Excel |
| F11 | Không làm theo | Kịch bản 2–2 phút cho bài 1.2 đã duyệt; lặp có chủ đích để ôn phần mềm–dữ liệu trước khi thêm SSMS và SQL |
| F15 | Không làm theo | Bài 1.2 dòng 55 ghi Developer chỉ để phát triển/kiểm thử, không cấp phép vận hành; hiểu nhầm trong ghi chú có căn cứ ở bài nguồn |
| F34 | Chuyển người làm khóa học | Credit nêu MIT, liên kết LICENSE, thông báo lưu cạnh asset (SOURCES.md). Hiệu lực MIT cho riêng ảnh này tác giả không xác minh được ngoài nguồn |
| T-05 (phần còn lại), T-12a | Không làm theo | Byte, "N'…'" nằm ở ghi chú/PL.1; `ProjectionTable` bọc tiêu đề trong `code` là hành vi chung của component, bộ khác dùng cùng kiểu |

## Mục để tác giả kết luận (review tích hợp, mục 5)

1–3. Ánh xạ alias (`du-lieu-trong-database`, `ky-hieu-erd`, hai ví dụ phòng/hợp đồng) giữ theo spec đã duyệt; không coi là lỗi.
4–7. Bấm ảnh rời trang chiếu, `?slide=` ưu tiên hơn hash, thiếu `hashchange`, hash không-JS hạ cánh dưới tiêu đề: hành vi có sẵn, ngoài phạm vi; chưa kiểm bằng cách bấm thật ở các mục cần browser.
8. Hai lời dẫn sai của bài nguồn (1.2 → 5.5, 1.4 → 5.2): báo người làm khóa học, không sửa.
9. Độ rõ ảnh tổng 350 px và ba vùng zoom 1,45 ở slide 23 khi chiếu thật: chưa kiểm trên máy chiếu.
10. Schema `HRM_Demo` ngoài PK/FK, edition 2025 trên Microsoft Learn: không xác minh lại trong lượt này.
11. Buổi 50 phút chưa có buổi giảng thử.

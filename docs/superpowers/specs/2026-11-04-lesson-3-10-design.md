# Hoàn thiện bài 3.10 theo quy ước hiện hành

Kế hoạch đã được người làm khóa học yêu cầu triển khai ngày 04/11/2026. Quy ước/template hiện hành thắng các quyết định lịch sử ngày 25/10.

## Quyết định đã chốt

- Giữ tình huống cơ cấu nam/nữ/tổng hồ sơ đang làm theo MaPB hiện lưu trong tháng 10/2026; giữ metadata, 25 phút, URL và ba đề/đáp án YAML. Không đổi API, seed, schema, component hay bài khác.
- Phần chính đúng hai H3: “Từ COUNTIFS trong Excel đến SUM và CASE”, “SQL Server chạy câu này thế nào”. Excel → câu chính → LineMap; RunFlow → Result → trả lời chị Hạnh. Bốn câu ôn sau Ghi nhớ, trước Bài tập.
- Giảng cờ 1/0, WHERE chung, CASE riêng, GROUP BY chỉ theo phòng; COUNT bỏ NULL nhưng đếm 0. Biểu thức đối chiếu chỉ đọc trên cùng tình huống, copy=false; không thêm câu độc lập. Cắt truy vấn đơn nghỉ, giữ cầu nối SUMIFS/thay THEN 1 bằng cột số cần cộng trước ôn, không chép đáp án bài tập.
- Giữ giới hạn nhóm thiếu, SUM trên phạm vi rỗng, dữ liệu ngoài hai nhãn giới tính và tổng các chỉ tiêu. Không tự tạo nhóm hoặc ép nhãn dữ liệu.
- Flow FROM/WHERE/GROUP BY/SELECT/ORDER BY có tổng 48/45/6/6/6. WHERE có cột trạng thái và hồ sơ giữ/loại. Bảng kích thước nhóm ghi là minh họa, không ngụ ý mất thành viên. SELECT dùng hai ví dụ đủ nhóm BGD (2 hồ sơ), NS (5 hồ sơ), giới tính → cờ → phép cộng → ô báo cáo; không dùng checks của CASE để diễn tổng hợp. Trích trước ORDER BY chưa xếp, cuối tăng dần.
- Gỡ riêng 3.10 khỏi PENDING_TWO_SUBSECTIONS; bảo vệ số liệu, đơn vị đếm, phạm vi, ví dụ và bảng soi. So SQL sau giải mã/chuẩn hóa khoảng trắng, không khóa xuống dòng hoặc lời văn.

## Kiểm và bàn giao

SELECT thật kiểm mọi câu, Result, bước, ví dụ và ba đáp án; đối chiếu nguồn Microsoft. API build/check:exercises/check:data, npm test/check/build/check:dist; browser build 1280×900 và 1024×768, drawer, bốn câu ôn, ba link đề, copy/paste tab, khôi phục nháp/clipboard. Reviewer mới gpt-6.1-terra/high, fork none, đúng §4.5; khóa tiền đề từ file chỉ có đề trước YAML. Thêm review tích hợp ngắn cuối chương, xử lý từng nhận xét kể cả mục cân nhắc theo §4.6.

Tác giả triển khai trong phiên, không giao implementer khác; review bằng agent độc lập. Nhánh codex/lesson-3-10-refresh từ main e0b419d. Giữ premium-audit.json ngoài phạm vi. Không commit/push/deploy. Hồ sơ mới theo ngày, giữ nguyên report gốc và cập nhật spec/plan sau mỗi vòng.

## Vòng soạn đã thực hiện

Đã chuyển đúng hai tiểu mục, thêm LineMap/đoạn COUNT chỉ đọc/bốn câu ôn, giữ nguyên token câu chính, metadata và YAML. Flow dùng bảng soi giữ/loại, hai nhóm đủ thành viên BGD/NS, phép tính bốn ô và bản trích chưa xếp trước ORDER BY. Hồ sơ công ty chỉ cập nhật điều bài thực sự kể. 574 test, check/build/check:dist và API 76 đề/data đạt; SELECT và browser có bằng chứng riêng. Tiếp tục review theo kế hoạch, chưa nhận kết luận tác giả là kết quả học thử độc lập.

## Sau review từng bài

Reviewer đã khóa ba đề trước YAML, sau đó đối chiếu đáp án và source/HTML đúng SHA, không có finding cần sửa trong phạm vi kiểm tĩnh. Giữ report gốc và mọi giới hạn SQL/UI của reviewer. Tác giả tự rà thêm hai câu định nghĩa đang in đậm, đặt code cho WHERE/CASE/COUNT/NULL/0 theo mục 2.2; chỉ đổi markup, không đổi chữ, SQL hoặc số liệu. Kiểm lại build sau thay đổi markup, rồi giao tích hợp ngắn theo kế hoạch.

## Kết quả tích hợp và bàn giao

Agent tích hợp mới cùng cấu hình không thấy finding cần sửa; đối chiếu mạch 2.9/3.1/3.2, cuối chương 3 và 4.1, hash/patch, HTML chỉ thêm markup và phạm vi ba đề giữ nguyên. Mọi mục chưa tự xác minh/ngoài phạm vi có quyết định trong ma trận, không gán kiểm tác giả cho reviewer. Source cuối, SQL, 574 test, check/build/check:dist, API 76 đề/data và browser có bằng chứng tại docs/verification/2026-11-04-lesson-3-10.md. Hoàn tất đúng phạm vi, không thêm thay đổi sản phẩm sau tích hợp; chưa commit/push/deploy.

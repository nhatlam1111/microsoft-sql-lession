# Mốc thụt lề SQL trên toàn bộ màn học

Ngày 23/10/2026. Yêu cầu: “các đoạn sql mình muốn để mốc tab rõ ràng / chỉnh tất cả các màn nhé và cập nhật quy ước này”, với hình câu SELECT tổng hợp ở bài 3.1 và bản SQL có thụt lề làm tham chiếu.

## Quyết định

- Một cấp bằng 4 cột. Mệnh đề chính cùng cột; danh sách cột/điều kiện tiếp dòng lùi một cấp; WHEN/ELSE trong CASE lùi thêm một cấp, END thẳng CASE. Câu ngắn giữ một dòng.
- MDX xử lý khoảng trắng trong biểu thức nên ghi escape `\t` trong các template literal. Đồng bộ cả Sql.code, RunFlow.query, focus nhiều dòng và steps[].sql. Nút Sao chép lấy chính chuỗi đang hiển thị.
- Token runtime `--sql-tab-size: 4` áp dụng cho Sql, query có highlight trong RunFlow, LineMap/Memo và hai lớp editor. Giữ phím Tab hiện có chèn 4 dấu cách, không tự sửa bản nháp của học viên.
- Rà toàn bộ 111 khối code/query/sql trên 17 bài. Chỉ đổi khoảng trắng SQL (và xuống dòng ở một CASE ngắn), không sửa token/literal/comment, điều kiện, số liệu, kết quả hay câu báo lỗi. Không chuyển khung bài, đổi API/grader/database hoặc thêm công cụ định dạng runtime.
- Đây là đợt định dạng toàn hệ thống; review độc lập tập trung diff SQL, MDX/build, copy/focus và các chủ sở hữu CSS. Không viết lại phần giảng hay làm lại nội dung các bài đã duyệt.

## Kiểm và bàn giao

Đối chiếu token của tất cả SQL trước/sau và bản build, kiểm query/focus, copy, CASE, editor ở 1280px/1440px. Chạy npm test/check/build/check:dist và API build/check:exercises/check:data theo quy trình hiện hành. Cập nhật quy ước, template và DESIGN.md cùng thay đổi đầu tiên; ghi bằng chứng và giới hạn trong plan/report.

Evidence local: `temp/verification/2026-10-23-sql-indentation/`. Kết quả được ghi sau khi thực thi trong [plan](../plans/2026-10-23-sql-indentation.md).

## Kết quả hoàn thiện

**Đã sửa:** tám bài có phần tiếp dòng/CASE cần thụt lề; 42 chuỗi trong 111 khối SQL đã đổi whitespace. Đồng bộ focus nhiều dòng, năm nhóm consumer CSS và hướng dẫn 2.4/template/DESIGN.md. Test giải mã literal trước so điều kiện/focus; thêm kiểm giữ tab ở text/copy và highlight, không nới số liệu.

**Không làm theo:** không thêm formatter runtime, không tự sửa draft, không tách mọi câu ngắn thành nhiều dòng hoặc chuyển khung bài ngoài yêu cầu. Giữ token/literal/comment/kết quả cũ; câu CASE ngắn chỉ thêm xuống dòng. Giữ hai finding UI nền ngoài phạm vi với lý do trong báo cáo, không ghi audit strict đạt.

Review độc lập agent mới kế thừa model Codex: không finding cần sửa, đã đọc hết report. 269 test, check/build/check:dist, API build/typecheck và 45 đáp án live đạt; check:data không lệch. Browser 17 bài đối chiếu đúng 97 Sql và 55 query highlight, các mốc tab đều 4; đã kiểm thêm 1280px/1440px, clipboard, editor và khôi phục draft. Chi tiết cùng giới hạn ở [hồ sơ review](../../reviews/2026-10-23-sql-indentation/README.md).

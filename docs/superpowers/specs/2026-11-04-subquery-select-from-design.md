# Subquery trong SELECT và FROM — thiết kế đã duyệt

Ngày 04/11/2026. Người làm khóa học duyệt kế hoạch trong chat: chèn hai bài đầy đủ ngay sau 3.9; 3.10 SELECT, 3.11 FROM, chuyển COUNTIFS thành 3.12. Hai bài mới A4, 25 phút, ba bài tập và bốn câu tự kiểm tra mỗi bài. Tổng 52 bài, 82 bài tập; Arcade giữ 50 bài.

## 1. Nội dung

- 3.10: toàn bộ 48 hồ sơ kèm số dòng hợp đồng đang lưu, không xét hiệu lực hoặc trạng thái nhân viên. Scalar tương quan COUNT, 0 dòng/1 dòng/nhiều dòng, một cột, COUNT không GROUP BY trả 0. Ví dụ NV021/3 và NV047/0. FROM → SELECT → ORDER BY: 48/48/48. Lỗi nhiều dòng, nhiều cột; quên liên hệ trả 55 mọi dòng; không chữa bằng TOP/MAX tùy tiện.
- 3.11: nhóm 55 hợp đồng thành 46 mã, câu ngoài giữ ít nhất hai hợp đồng. FROM → WHERE → SELECT → ORDER BY: 46/7/7/7. Bí danh, tên cột, phạm vi xuất cột, thứ tự ngoài. Lỗi thiếu bí danh, thiếu tên biểu thức, cột ngoài phạm vi, ORDER BY trong câu con; tương quan FROM thông thường và APPLY ngoài phạm vi.
- Sáu đề theo kế hoạch chat: đếm đơn chờ; tổng ngày đơn đã duyệt bắt đầu tháng 9 giữ NULL; MAX ngày hợp đồng không sau 21/10; phòng đang làm >=5 hồ sơ; tổng ngày đã duyệt tháng 9 theo mã >=2; tổng thực lĩnh mọi kỳ đang lưu theo mã >=30000000. Đề quy định cột, phạm vi, sắp xếp; không đưa đáp án vào trang.
- Hai tiểu mục theo quy ước hiện hành; Excel → SQL → LineMap rồi RunFlow → Result → trả lời Hạnh. Hay nhầm có đoạn copy=false và Messages đã chạy thật. Bốn tự kiểm tra sau Memo. Bài 3.9 chỉ chỉnh tên/phạm vi/cầu nối. Giữ nguyên SQL và đề/đáp án COUNTIFS khi đổi số.

## 2. Tương thích

- Slug mới 3-10-subquery-trong-select, 3-11-subquery-trong-from, 3-12-dem-co-dieu-kien; URL COUNT cũ và ba URL bài tập chuyển hướng tĩnh. Schema chấp nhận minor nguyên dương không số 0 đầu.
- Tiến độ v2, key riêng: v1 3.10/lastLessonNum → 3.12, solved 3-10-1..3 → 3-12-1..3; giữ cờ/timestamps. Import v1 cũng chuyển. v2 có sẵn là bản chính; không hợp nhất lần ghi sau từ tab v1. Giữ dữ liệu v1 nguyên vẹn.
- Nháp namespace v2; COUNT mới fallback nháp 3-10 cũ, hai bài mới không fallback nháp cũ; các ID khác fallback chính ID. v2 có sẵn thắng, giữ nháp cũ.
- API cùng route/envelope, client gửi exercise có prefix course-v2:. API phân giải canonical mới; unprefixed theo danh mục cũ, COUNT remap 3-12; phiên bản lạ từ chối. API cũ không nhận ID mới nên không chấm nhầm. Giữ auth, guard, chấm kết quả, seed, Arcade.

## 3. Nghiệm thu

Đối chiếu Microsoft, SELECT live từng query/bước/ví dụ/lỗi/đáp án; API build/typecheck/check:exercises/check:data; npm test/check/build/check:dist. Browser build 1280×900, 1024×768: drawers, dấu hình, tự kiểm, sáu đề mới, redirects, copy/paste giữ tabs, phục hồi dữ liệu thử và clipboard.

Review hai bài riêng, rồi tích hợp: gpt-6.1-terra/high/fork_turns:none, nguyên lời §4.5. Khóa bảng tiền đề từ đề trước khi mở YAML. Giữ report gốc, ma trận mọi nhận xét, ghi riêng kiểm tác giả/reviewer, lỗi nền và chưa xác minh.

## 4. Bàn giao

Tiếp tục codex/lesson-3-10-refresh; giữ việc đang làm và premium-audit.json ngoài phạm vi. Local, không commit/push/deploy. Quy ước repo thắng lịch sử và mặc định skill. Hồ sơ 3.10 cũ giữ như lịch sử; hồ sơ lượt này ghi rõ đổi số.

## 5. Chốt sau kiểm và review

COUNTIF khóa vùng `HopDong!$B$2:$B$56`, giải thích dấu `$`; đề đếm đơn dùng `COUNT(*)`. Sáu đề nói rõ bộ chấm không so tiêu đề, không đặt luật cấm dấu chấm. Giới hạn tương quan ở phần chính 3.11, cắt câu lặp ở cuối Hay nhầm. Ví dụ không khớp NV047 dùng diễn giải/phép tính, không dựng dòng hợp đồng giả hoặc thay component chung để nhận bảng rỗng.

Chuyển hướng Astro dùng target có base qua manifest chung; check:dist kiểm refresh/canonical/link dự phòng và chỉ loại bốn URL lịch sử khỏi số bài. V2 hỏng được sao lưu và báo lỗi theo luồng có sẵn, không tự lấy lại v1 có thể lỗi thời. README ghi giới hạn tab v1 và thứ tự phát hành API trước web khi được phép. Bằng chứng và quyết định mọi nhận xét: docs/verification/2026-11-04-subquery-select-from.md.

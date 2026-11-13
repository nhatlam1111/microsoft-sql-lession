# Rà soát quy trình biên soạn — kế hoạch và trạng thái

Ngày 13/11/2026. Người dùng duyệt kế hoạch rà soát, cho phép đề xuất thay đổi quy trình nhưng giữ chuẩn đầu ra; phạm vi chỉ kiểm tra và viết báo cáo, chưa áp dụng thay đổi sản phẩm.

Nguồn quyết định và kết quả: [báo cáo audit](../../research/2026-11-13-authoring-audit/README.md). Báo cáo này cũng là bản đặc tả đề xuất; không tạo thêm một spec sao chép nội dung.

- [x] Đọc quy ước/template/hồ sơ và các phần liên quan; ghi HEAD và phạm vi.
- [x] Phân tích 28 lượt của ba chat Codex, 27 log agent con; đối chiếu một log Claude biên soạn, loại Arcade.
- [x] Khử trùng usage; tách cache/output và agent chính/con; ghi giới hạn đo theo giai đoạn.
- [x] Reviewer Terra/high ngữ cảnh mới rà source 1.1, 2.1, 3.10; lập bảng tiền đề từng đề/câu tự kiểm và ba mẫu biên tập.
- [x] Xử lý từng nhận xét reviewer ở báo cáo chính; giữ nguyên report gốc.
- [x] Đề xuất quy trình/prompt hai công cụ, kiểm bốn cặp skill và ma trận 19 bài phần 4–5.
- [x] Đề xuất pilot hai bài, chưa thực hiện pilot hoặc sửa quy ước.
- [x] Kiểm JSON, phép cộng, liên kết tài liệu và phạm vi diff trước bàn giao; 28/28 lượt khớp số cộng dồn, 27 agent con không trùng, đủ 19 bài trong ma trận.

Kiểm bị loại khỏi lượt này theo phạm vi: SQL live, API/bộ chấm, build/UI và deploy. Không tuyên bố những kiểm này đạt. Không sửa file premium-audit.json có trước phiên.

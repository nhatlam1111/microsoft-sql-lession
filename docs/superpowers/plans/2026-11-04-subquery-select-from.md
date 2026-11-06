# Subquery SELECT/FROM — kế hoạch triển khai

Spec: [thiết kế](../specs/2026-11-04-subquery-select-from-design.md). Thực hiện inline bằng Superpowers executing-plans; user yêu cầu không commit, repo yêu cầu reviewer riêng từng bài và tích hợp, ưu tiên các quy định đó.

- [x] 1. Kiểm tương thích RED → GREEN: progress/import v2, drafts, API version IDs; giữ dữ liệu cũ.
- [x] 2. Chạy SELECT xác minh câu chính/bước/ví dụ/lỗi/sáu đáp án trước khi điền bài.
- [x] 3. Chuyển COUNT 3.12, thêm 3.10/3.11 và YAML, cập nhật catalog/schema/redirects/liên kết, hồ sơ công ty và kiểm bảo vệ.
- [x] 4. Build/check đầy đủ; kiểm bản build ở hai viewport, khôi phục nháp/tiến độ/clipboard.
- [x] 5. Review riêng hai bài rồi tích hợp; xử lý từng nhận xét; cập nhật hồ sơ và bàn giao local.

## Nhật ký và quyết định

- 04/11: bắt đầu từ checkout hiện tại, phần COUNT vừa hoàn thiện còn uncommitted. Không ghi đè hồ sơ cũ. Ledger ở .superpowers/sdd/2026-11-04-subquery-select-from/progress.md.
- Không tạo worktree/commit theo mặc định skill vì user chốt giữ checkout và bàn giao local.
- Phụ thuộc: đổi số → migration trước tái dùng ID; SQL live → hình/số liệu/thông báo; bản build khớp source → review; khóa tiền đề → mở YAML.
- 04/11 sau review: COUNTIF khóa vùng bằng `$`; đề đếm đơn dùng COUNT(*); sáu đề giải thích rõ bộ chấm không so tiêu đề. Cắt câu tương quan lặp ở 3.11. Nguồn cuối qua 587 tests; 23 SELECT + 9 lỗi; COUNT 3.12 giữ SQL token và cả ba đề/đáp án. Bằng chứng/ma trận ở docs/verification/2026-11-04-subquery-select-from.md.
- 04/11 kết thúc: 588 tests/70 files; check 0 errors/0 warnings/7 hints nền; API build/typecheck/82 đáp án/check:data đạt; check:dist 202 trang/3817 link. Hai viewport, 14 lượt drawer, 16 lượt tự kiểm, sáu đề, bốn redirects; sao chép/dán 8 dòng giữ tabs. Phục hồi nháp/clipboard và tiến độ snapshot (lastActiveAt cập nhật do import). Hai reviewer từng bài, addendum đọc bù và reviewer tích hợp đã xong; report gốc/ma trận lưu. Local chưa commit/push/deploy.

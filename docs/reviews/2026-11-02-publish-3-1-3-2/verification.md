# Hợp nhất và phát hành 3.1–3.2 cùng research

Người dùng cho phép merge/push lên main, gồm research trong docs, rồi làm tiếp 3.3. Phạm vi phát hành này chưa sửa 3.3 hoặc triển khai SQL Arcade.

## Phiên bản

- Feature đã nghiệm thu: `5b47458`; sản phẩm drawer: `8de5a4f`; research được commit riêng `1e3dbd1` (29 file).
- Main từ remote: `a0a5d4b`, có bản trình chiếu Làm quen SQL Server đã review ở lượt riêng.
- Hợp nhất origin/main vào feature: `b6cf0babd2186ff9bead6a4da5582110ba26f276`, không conflict. DESIGN tự gộp hai bổ sung độc lập. Không lấy bản cũ ghi đè trình chiếu trên main.
- File local `premium-audit.json` có từ trước không thuộc code/research được phát hành, không stage/commit. Các worktree 2.1/2.2 giữ nguyên.

## Kiểm mới trên bản hợp nhất

- Research: 29 file (26 Markdown, 3 JSON), **182 local links**, JSON parse và kiểm chuỗi credential có hình dạng đặc trưng không có issue. Đây là preflight tài liệu, không phải xác minh lại lịch sử CodeFights/CodeSignal hoặc mạng. Giữ report nghiên cứu và sáu quyết định IR gốc.
- `npm test`: **57 file, 447/447 test đạt**.
- `npm run check`: **254 file, 0 errors, 0 warnings, 3 hint deprecated có sẵn** (hai FormEvent và một execCommand).
- `npm run build`: **139 trang**; `npm run check:dist`: **139 trang/2801 link**, đạt.
- `npm --prefix api run typecheck`: đạt. Diff không có API/seed/YAML mới so với bản 3.1–3.2 đã nghiệm thu; dùng kết quả API build/76 đáp án/check:data ở lượt drawer, không nhận là chạy SQL live lại khi merge.
- Log/helper ở `temp/verification/2026-11-02-publish-3-1-3-2/`. Không nới kiểm, sửa dependency hoặc dùng report Ready thay lệnh kiểm.

## Bằng chứng đã có và giới hạn

- Lượt drawer: [verification](../2026-11-01-drawer-select/verification.md), hai report từng bài và report tích hợp; có SQL live, API luôn hoàn tác, UI 1280/1440/1024 và giới hạn cụ thể. Sản phẩm này được giữ nguyên khi merge.
- Trình chiếu main: [verification](../2026-11-02-lam-quen-narrative/verification.md) và report độc lập/tích hợp của lượt đó. Giữ nguyên các giới hạn lịch sử trong report, không sửa thành tác giả lượt merge đã tự kiểm mọi slide.
- Research: [validation](../../research/codefights-arcade/validation.md), [review resolution](../../research/codefights-arcade/review-resolution.md). Chỉ xuất bản tài liệu, không duyệt kiến trúc/challenge/hạ tầng hoặc thực thi acceptance tests của đề xuất.
- Push main sẽ chạy workflow Pages hiện có. Không chạy workflow API thủ công hoặc thay bí mật/cấu hình deploy. Trạng thái push/CI được ghi sau khi có kết quả thật.

## UI của bản hợp nhất

Mở đúng dist mới bằng IAB/CUA qua preview 4331, viewport 1280×720. SELECT 3.2 còn đúng hai ví dụ BGD/NS, mark trỏ BGD/2 và NS/5; SELECT 3.1 có năm biểu thức và kết quả 9/16.0/1.78/1.0/3.0, bảng minh họa không tràn ngang. Trang trình chiếu Làm quen mở tại slide database-la-gi, nhãn 1/21 và mục lục 21 slide; ảnh đầu tải được, không có console error trong lượt đã xem. Không gọi việc mở trang đầu là đã xem lại toàn bộ 21 slide, fullscreen hoặc presenter; các phép kiểm đó thuộc hồ sơ gốc trên main và source được giữ nguyên.

## Xử lý review hợp nhất

Đã đọc hết [report gốc](integration-review.md). Reviewer xác nhận mọi blob riêng của hai parent đều còn nguyên; chỉ DESIGN giao nhau và giữ đủ hai bổ sung. Tự kiểm 12 hash, 29 file research/182 links/75 đích tracked không thiếu. Các nhóm Giữ được về bài/renderer, trình chiếu, research và ranh giới dữ liệu/auth/nháp: **Làm theo — giữ sản phẩm**; không sửa hoặc chạy lại full suite khi chỉ chốt hồ sơ.

| Nhận xét/mục cân nhắc | Quyết định | Căn cứ và giới hạn |
|---|---|---|
| INT-PUB-01, P3: report cũ có dòng trắng cuối file | Không làm theo việc sửa report gốc; ghi ngoại lệ | `git diff --check a0a5d4b..b6cf0ba` trả exit2 tại `docs/reviews/2026-11-01-lessons-3-1-3-2/review-3-2.md:110`, “new blank line at EOF.” Có từ feature, không do merge, không ảnh hưởng source hoặc kết luận. Giữ byte report lịch sử; không báo whitespace toàn delta PASS. Các file sản phẩm/research và hồ sơ mới không có lỗi whitespace. |
| Provenance HTML audience/presenter | Làm theo — giữ giới hạn | Manifest merge chỉ có hai HTML bài học. Đã mở trang audience đầu trên dist merge như mục UI, chưa hash hoặc mở lại presenter/toàn deck; nguồn các file chiếu khớp main và hồ sơ UI gốc giữ nguyên. |
| UI/clipboard/auth/nộp/nháp | Làm theo — tách bằng chứng | Reviewer không browser. UI merge tác giả chỉ ba trang/thao tác nêu trên; không suy thành đã thử lại clipboard/auth/nộp/nháp, zoom/screen reader hoặc Excel/SSMS. |
| SQL live/API exercise/data | Làm theo — giữ giới hạn | Source/query/answer/runner không đổi; API typecheck mới không phải live SQL. Dùng evidence drawer đúng phiên bản và không tuyên bố trạng thái DB hôm nay. |
| Claim lịch sử/nguồn ngoài/kiến trúc research | Làm theo — giữ phạm vi | Chỉ publish tài liệu, không truy cập lại mọi nguồn hoặc triển khai đề xuất; Open Questions và phê duyệt tương lai vẫn còn. Regex credential chỉ có độ phủ hữu hạn, không gọi là audit mọi dạng secret. |
| Bài3.3/alias/chuyển khung | Làm theo — để lượt tiếp theo | Product3.3 chưa đổi trong merge. Thiết kế nháp3.3 được chuẩn bị riêng, không stage trong commit phát hành này. |
| Static audit/cảnh báo nền | Làm theo — giữ hồ sơ | Không báo false positive resize, ba hint hoặc audit dependency ở hồ sơ trình chiếu đã được sửa. Không nâng dependency hoặc nới auditor. |
| Git/push/CI thật | Làm theo — kiểm sau chốt hồ sơ | Chỉ stage hai report phát hành; giữ premium-audit.json ngoài Git. Người dùng đã cho phép merge/push; không dùng kết luận review thay kết quả Git/CI. |

Đây là hồ sơ chốt trước push; kết quả lệnh Git, SHA remote và workflow sau push được lưu tại `temp/verification/2026-11-02-publish-3-1-3-2/` và báo trong chat khi có thật. Không tự bịa trạng thái phát hành tương lai trong report. Không có sửa sản phẩm sau review; chỉ chốt hồ sơ rồi fast-forward main tới cây đã kiểm.

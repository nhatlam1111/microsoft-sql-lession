# Review tích hợp — kiểm lại bốn finding

Phạm vi chỉ gồm bốn finding trong `integration.md`; report gốc giữ nguyên. Reviewer được giao `gpt-6.1-terra`/high, ngữ cảnh mới; không có bằng chứng công cụ xác minh model thực tế.

## Kết quả

1. **Đã xử lý trường hợp SQL sai hình.** `select-story.ts` chặn thêm WHERE, đổi bảng và các câu ngoài cấu trúc SELECT/FROM pilot; nguồn dựng lấy FROM từ query. Test có hai trường hợp thay query và steps đồng thời. Helper được đưa vào fingerprint. Còn một lỗi dữ liệu liên quan bên dưới.
2. **Đã xử lý ngưỡng.** Component yêu cầu `intersectionRatio >= 0.25`; test browser tác giả kiểm đứng yên ở 10%, phát sau khi cuộn vào, và dừng vẫn giữ khi cuộn lại. Đây là evidence tác giả, reviewer chưa tự chạy UI.
3. **Đã sửa kết luận kiểm 390px.** Test yêu cầu ảnh component cô lập rộng ít nhất 300px, và evidence báo riêng giới hạn shell desktop toàn trang. Reviewer tự xem `narrow-component.png`: component và link hiện trên màn hình; ảnh chữ nhỏ, có link kích thước gốc và disclosure. Chưa tự kiểm tương tác/bảng tại 390px; test chỉ assert kích thước ảnh và nút, không tự chứng minh mọi bảng đọc/ cuộn được. Shell toàn trang vẫn là giới hạn đã ghi, không coi đã đạt mobile.
4. **Đã xử lý tài nguyên tham chiếu thiếu hash.** `readAnimation` đòi hash GIF, poster và mọi scene, kiểm chỉ số bước và đọc/hash tệp. Test kiểm thiếu hash và thiếu tệp; chưa có test riêng cho scene sai chỉ số nhưng source đã kiểm điều kiện này.

## Finding còn lại

**P3 — Alt có thể giữ số hồ sơ cũ sau khi dữ liệu đổi.** `scripts/animations/render-select.mts:106` ghi cố định “48 hồ sơ”, trong khi `select-story.ts:13` cho phép `source.total` và `result.total` cùng đổi sang một số khác. Khi dựng lại, ảnh/chú thích dùng tổng mới nhưng alt vẫn nói 48, manifest vẫn hợp lệ; người dùng đọc alt nhận số sai. Dùng `result.total` để tạo alt hoặc từ chối dữ liệu ngoài tổng 48; thêm test cho tổng thay đổi.

## Kiểm và giới hạn

Tự chạy `npm test -- --run tests/animated-flow.test.ts`: 4 test đạt. Tự đối chiếu cả bốn SHA-256 trong `browser.json` với file hiện tại: khớp. Evidence UI và build/check-dist do tác giả cung cấp; hash file HTML và component không thay cho việc reviewer tự chạy UI hoặc xác minh mọi phụ thuộc build. Không chạy SQL/API, không dựng lại GIF, không tự chạy build hay toàn bộ 95 test. Kết quả follow-up không thay review bài/đề.

# Kiểm lại finding tích hợp ảnh động 2.4

- Cấu hình lượt review: `gpt-6.1-terra`, `reasoning_effort: high`, `fork_turns: none`; không có bằng chứng công cụ để xác minh model thực tế. Base `9b76a55`, kiểm riêng bản sửa local của finding đổi phần trích; giữ nguyên report gốc.
- **Kết quả: finding đã được xử lý trong phạm vi kiểm.** `order.png` hiện rõ “Đổi mẫu từ 3 sang 6 dòng để thấy ranh giới TOP (5). Mẫu vẫn có NV047 và NV048.” ở chân ảnh; hai bảng vẫn ghi trích 6/45 dòng. Manifest đưa cùng thông tin vào alt của ảnh bước ORDER BY. Khung GIF đã giải mã số 80, 108 và 135 cho thấy ghi chú còn hiện khi bắt đầu và trong lúc chuyển dòng; ảnh tĩnh hoàn tất cũng giữ ghi chú. Không thấy chú thích bị che hoặc tràn ở 1080 × 720 trong các khung này.
- Source: `storyboard.mts` đặt `scopeNote` cho cảnh ORDER BY 2.4; `render-flow.mts` vẽ chú thích riêng ngoài phần cue thay đổi và đưa nó vào alt của ảnh tĩnh. Đây là kiểm source độc lập với quan sát GIF/PNG.
- Không chạy SQL/API, không dựng lại, không kiểm HTML/UI, màn hẹp hoặc các bài khác. Không khẳng định đã kiểm từng khung GIF. Thay nguồn hay ảnh phải kiểm lại; kết quả này không thay bằng chứng phát hành hoặc quyền push.

## SHA-256 raw của bản kiểm

- `scripts/animations/storyboard.mts`: `21DBC0B308488510E375014F4864927C2019B9AD7D57A281183B8892EDE1BE1D`
- `scripts/animations/render-flow.mts`: `D9870039426F435D0F1B87184057C77EEFCD917594D8A05F3D7BAE8903E518D2`
- `scripts/animations/select.css`: `C79D2C80263B4F63AE754A35629342CCFF0816536425B8AD45F5A24D92857780`
- `public/lesson-animations/2-4-order-top/animation.gif`: `4C71352B7D6A29ADB3E100004C7E115B8DFFD4CBAFE63CAF17940461FB7804E4`
- `public/lesson-animations/2-4-order-top/select.png`: `45B84844EF3F1B1866E28F0D61BB18AF992CAB5668E744090AEB9BF3A323FF6B`
- `public/lesson-animations/2-4-order-top/order.png`: `AE4BB36712E02C1A6BB18AC436F476955B7B0CA24C1E75F6EC4D3E60EA56747D`
- `public/lesson-animations/2-4-order-top/manifest.json`: `C3D83949D8B198444A3B083F1057FCECB73A24681B4F433AD5B49B3381149AAD`

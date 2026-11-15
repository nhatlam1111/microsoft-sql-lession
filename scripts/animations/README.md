# Dựng ảnh động bài 2.1

Chạy từ thư mục gốc với Node 24+, Chrome, Python có Pillow (`python -m pip install Pillow`), và các dependency đã cài bằng `npm ci`.

```sh
npm run render:select-gif
```

`PYTHON` chọn executable Python; `CHROME_CHANNEL` mặc định `chrome`. Script đọc `query`/`steps` ngay trong bài MDX, kiểm `checkFlow`, dựng khung hình bằng Chrome với font của repo, rồi mã hóa bằng `sheet_to_gif.py`. File encoder được giữ nguyên từ skill gifgen-local:make-gif 1.0.7. Sprite `src/assets/animations/select-pulse.png` là sprite sheet 4×4 do ImageGen tạo trong lượt thử ngày 15/11/2026, dùng lại cho dấu chuyển dữ liệu; SQL và dữ liệu được dựng bằng mã.

Kết quả nằm tại `public/lesson-animations/2-1-select`: GIF 15 giây, ảnh bìa, ba cảnh tĩnh và manifest. Grid dựng bằng mã có 10×15 ô với phần đệm để encoder cắt 3%; truyền kích thước grid vì bộ tự dò của encoder chỉ xét tối đa 6 ô mỗi trục. Frame tạm nằm trong thư mục hệ thống được in sau khi xuất. Manifest lưu hash đầu vào và đầu ra, được kiểm ở build và test.

Muốn chỉnh SQL/dữ liệu, sửa bài rồi chạy lại lệnh. `select-story.ts` giới hạn kịch bản ở phép chọn ba cột của bài 2.1; khi thêm điều kiện lọc, đổi bảng hoặc đổi ngữ nghĩa, cần cập nhật kịch bản và kiểm tương ứng trước khi dựng. Muốn chỉnh thời gian/bố cục, sửa `render-select.mts`; muốn chỉnh theme tối, sửa token trong `select.css`. Sau mỗi lần dựng, kiểm cảnh nguồn, cột đang chuyển, cảnh đặt bí danh, chữ tại vùng bài và sự khớp với bảng HTML. Bằng chứng SQL live được ghi riêng trong hồ sơ biên soạn.

## Kiểm SQL live

Dùng cấu hình kết nối hiện có của API, không in credential. Script chỉ chạy hai SELECT nguyên văn từ dữ liệu bước và đối chiếu toàn bộ số dòng, tên/thứ tự cột, bốn hồ sơ minh họa.

```sh
api/node_modules/.bin/esbuild scripts/animations/verify-select-sql.mts --bundle --platform=node --format=esm --packages=external --outfile=api/dist/verify-select-animation.mjs
node api/dist/verify-select-animation.mjs
```

Bằng chứng ghi vào `docs/verification/2026-11-15-select-animation-sql.json` sau khi tất cả đối chiếu đạt.

## Kiểm trình duyệt

Sau build, chạy preview ở port 4322 rồi `node scripts/animations/check-browser.mts`. Có thể đặt `LESSON_PREVIEW_URL` cho preview khác. Script dùng Chrome headless, đóng popup lộ trình qua nút UI, kiểm ngưỡng tự phát/dừng/phát lại, bàn phím, details, reduced motion, tắt JavaScript và lỗi tải GIF. Ghi hash build/source cùng kết quả và ảnh vào thư mục evidence.

Khung trang hiện tại là desktop; ở 390px vùng bài bị co lại. Script ghi rõ giới hạn full-page và kiểm thêm component cô lập ở chiều rộng đó, không dùng kết quả cô lập để nhận toàn trang mobile đạt.

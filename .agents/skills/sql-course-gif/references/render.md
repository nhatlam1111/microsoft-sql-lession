# Dựng, kiểm tra và tích hợp

Chạy lệnh từ **gốc repo**. Ví dụ dùng bản skill trong `.agents/skills/sql-course-gif`; bản trong `.claude/skills` có cùng tài nguyên. Cần Node 24+, bộ dependency của repo (Playwright), Chrome và Python có Pillow. `CHROME_CHANNEL` chọn trình duyệt được Playwright hỗ trợ, `PYTHON` chọn executable. Dùng thư mục riêng cho mỗi lượt thử.

## A. GIF tối giản xem trực tiếp

Đường này tạo GIF thật từ một scene HTML do tác giả kiểm soát. Chạy ví dụ dữ liệu thật 2.2 để hiểu hợp đồng:

~~~sh
node .agents/skills/sql-course-gif/scripts/render-preview.mjs --lesson 2.2 --unit 2-2-where --scene .agents/skills/sql-course-gif/assets/where.html --out temp/gif-review/where.gif
python .agents/skills/sql-course-gif/scripts/inspect-gif.py temp/gif-review/where.gif --expect-ms 7200 --times 0,1200,3500,3600,4800,7190 --sheet temp/gif-review/where-frames.png
~~~

- **Nguồn.** Với AnimatedFlow dùng `--lesson` và `--unit` để nạp query/steps hoặc concept từ bộ đọc thật. Bài chỉ có một RunFlow hợp lệ (ví dụ 3.15) có thể truyền riêng `--lesson 3.15`: bộ đọc trả query và steps với ID xem thử `run-flow-preview`. Khi có nhiều luồng chưa định danh, không có flow, hoặc bộ đọc báo câu SQL đứng trước khác query, đọc trực tiếp đúng khối SQL/bảng/giả định trong bài. Soạn JSON nhỏ với đúng các trường mà scene cần, nêu nguồn của mỗi bảng trong hồ sơ; chạy với `--data du-lieu.json` thay cho cả hai tùy chọn. Với bài đề cương dùng tình huống giả định có ghi rõ. Chỉ tích hợp số liệu sau khi đối chiếu theo quy ước.
- **Viết scene mới.** Sao chép ví dụ HTML vào thư mục nguồn của lượt dựng, đặt tên theo unit và thiết kế lại phần thân cùng logic cho câu mới. Ví dụ kèm gói có điều kiện nhận đúng `2-2-where`. Giữ điều kiện kiểm đúng unit khi sửa ví dụ. Thay đổi logic WHERE bằng động tác đã chọn trong bản đồ bài. Dùng `textContent` để chèn giá trị; hiển thị NULL tường minh bằng `value ?? 'NULL'`.
- **Hợp đồng.** Trang HTML cục bộ khai báo `window.prepare(data)` trả `{width,height,scenes}`. Mỗi cảnh khai báo `{positions,leadMs,holdMs}`. `positions >= 2` gồm cả hai đầu; lead/hold là số nguyên dương chia hết cho 10 ms. Khung giữa cách nhau 100 ms. Với 10 vị trí và hai khoảng giữ 800/2000 ms, tổng là 800 + 8 × 100 + 2000 = 3600 ms. `window.draw(sceneIndex,p)` hiển thị trạng thái ở p từ 0 tới 1. Có thể trả Promise cho thao tác bất đồng bộ. Di chuyển theo p; tránh CSS transition, GIF tự chạy, đồng hồ thật hay Math.random vì chụp cùng p phải ra cùng ảnh. Đặt dữ liệu đúng ở p=0 và p=1; chỉ vẽ hàng đích sau khi nó tới nơi. Kiểm cả biến đổi liên tục hoặc các vị trí trung gian dễ phân biệt. Dùng ảnh nội bộ tham chiếu tương đối tới HTML, chờ ảnh tải trước khi chụp.
- **Bố cục.** Khung tối đa 1080 px ngang, dùng SQL hiện hành và sơ đồ/bảng. `width/height` phải bao trọn nội dung. Nếu bộ chụp báo tràn, giảm số cột trích hoặc chia lại cảnh; đừng thu toàn bộ chữ để nhét vào khung. Script bắt tràn viewport, người dựng vẫn phải kiểm cắt chữ bên trong ô.
- **Sản phẩm.** Bộ mã hóa đi kèm skill dùng chung một bảng màu cho các khung PNG và lưu thời gian của từng khung vào GIF. Renderer thay file đích khi đã mã hóa thành công. Trả GIF cùng nguồn scene và JSON nếu có. Khi giao GIF xem riêng, ghi rõ phạm vi mẫu và nơi đọc bảng tĩnh.

## B. Bộ asset của bài trên site

1. Tra lệnh của bài trong [hướng dẫn dựng của repo](../../../../scripts/animations/README.md). Đối chiếu ID `animation`, SQL và `steps` trong MDX với manifest. Ví dụ, `npm run render:where-gif` ghi lại bộ ảnh bài 2.2 trong `public/lesson-animations`. Dùng mục A khi cần xuất bản xem thử vào thư mục riêng.
2. Khi tích hợp thiết kế đã duyệt, đưa scene vào nguồn dựng của bài, thêm các phụ thuộc dựng vào fingerprint và xuất cả GIF, poster, ảnh tĩnh và manifest. Với bài chưa có lệnh dựng, xác định nguồn và ID theo quy ước của repo.
3. Kiểm theo mục 4.4 của quy ước. Với player, chạy `npm test -- tests/animated-flow.test.ts`. Để kiểm trang đã build, chạy `npm run build`, `npm run check:dist` và `npm run preview -- --port 4322`, rồi mở đúng trang bài để kiểm GIF và bảng tĩnh.

## Đọc kết quả sau khi dựng

- Mở ảnh contact sheet giải mã từ GIF ở trước/giữa/sau **mỗi thao tác khác nhau**. Chọn mốc trong đoạn di chuyển và gần cuối đoạn giữ, không lấy giữa toàn bộ thời lượng làm đại diện cho chuyển động. Bộ mã hóa có thể gộp các hình giống nhau; đối chiếu bằng tổng delay và giá trị ở đúng thời điểm.
- Dùng `inspect-gif.py FILE` để kiểm kích thước, giải mã toàn bộ frame, loop, delay và số ảnh khác nhau. Dùng thêm `--times ... --sheet FILE.png` để lấy các ảnh theo timestamp từ 0 tới trước cuối. Script không xác nhận nội dung SQL hay mức dễ học. So giá trị cuối, header, NULL, số lần xuất hiện và quan hệ từng nhánh với nguồn. Bài DML cần thấy rõ phạm vi và ảnh trước/sau.
- Xem GIF ở tốc độ thật trong vùng 720 px. Ở 390 px kiểm ảnh gốc và lối đọc bảng tĩnh phù hợp với giao phẩm. Với site, kiểm HTML/ảnh tĩnh, bàn phím, dừng/phát lại, reduced motion và fallback ảnh trên trang thật theo phạm vi ảnh hưởng. Nêu giới hạn nếu chỉ thử standalone.
- Với bản standalone, có thể mở một trang cục bộ chứa GIF ở chiều rộng 720 px, phát từ đầu tới hết vòng; ghi mốc người xem đọc được khóa, thao tác và đích. Tại 390 px, mở ảnh gốc hoặc bảng tĩnh kèm bản xem và lần lại cùng hồ sơ. Nếu chỉ giải mã hoặc xem ảnh ghép, ghi đúng mức kiểm đó.
- Nếu chữ nhảy, khóa font và tọa độ header. Nếu số liệu “dịch chuyển” nhưng cả hai bảng đã đầy ở đầu cảnh, giữ dữ liệu đích ẩn tới đúng nhịp. Nếu một cảnh có quá nhiều phép tính, chia thành các nhịp cùng bước SQL. Khi chưa có bằng chứng live, ghi đã đối chiếu MDX và để trạng thái SQL live chưa kiểm.

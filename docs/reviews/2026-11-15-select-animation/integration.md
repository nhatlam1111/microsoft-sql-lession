# Review tích hợp ảnh động 2.1 — 15/11/2026

Phạm vi: component, đăng ký MDX, nguồn dựng/manifest, test liên quan và tài liệu pilot; không review lại toàn bộ bài hay các diff cũ. Reviewer được giao cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; công cụ không cung cấp bằng chứng xác minh model thực tế.

## Finding

1. **P2 — Nguồn dựng có thể xác nhận ảnh sai với SQL sau khi dựng lại.** `scripts/animations/render-select.mts:17,32,43` chỉ trích ba tên cột bằng regex, còn `FROM NhanVien`, tên bảng và diễn giải được viết cố định; `checkFlow` chỉ kiểm focus nằm trong query, không xác nhận toàn bộ query được thể hiện. Ví dụ thêm một điều kiện `WHERE` vào câu và sửa steps cho hợp lệ: ảnh vẫn vẽ câu không có WHERE và nói toàn bộ hồ sơ, nhưng manifest mới lại khóa đúng query đã đổi nên build/test coi ảnh hợp lệ. Cần dựng từ dữ liệu câu lệnh và ngữ nghĩa tương ứng, hoặc từ chối rõ mọi câu/steps ngoài hình dạng pilot được hỗ trợ; kiểm hồi quy một thay đổi query không hỗ trợ.

2. **P2 — Ngưỡng tự phát 25% không được thực thi.** `src/components/lesson/AnimatedFlow.astro:100–104` kiểm `isIntersecting` thay vì `intersectionRatio >= 0.25`. IntersectionObserver cũng gửi callback ban đầu khi chỉ một phần nhỏ đang giao nhau; vì vậy ảnh có thể tự phát và tiêu thụ lượt tự phát trước khi 25% vào vùng nhìn. Cần kiểm tỷ lệ, thêm thử nghiệm tại dưới và trên ngưỡng; sau khi người học dừng vẫn giữ trạng thái không tự chạy lại.

3. **P2 — Kiểm màn hình hẹp hiện không chứng minh ảnh đọc được.** `scripts/animations/check-browser.mts:53` chỉ khẳng định chiều rộng <= 390, nên cả chiều rộng 0 cũng đạt. Shell desktop hiện có thể làm vùng bài co về 0 ở 390px; evidence `browser.json` vì thế không đủ chứng minh trải nghiệm full-page ở kích thước này. Kiểm chiều rộng dương và khả năng truy cập phần HTML/links trong component riêng; ghi rõ shell toàn trang ở 390px là giới hạn hiện tại, không quy kết shell cũ là hồi quy của component. Nếu sản phẩm cam kết dùng toàn trang ở cỡ đó, cần xử lý shell ở phạm vi thích hợp.

4. **P3 — Manifest không bắt buộc khóa mọi tệp thực sự được dùng.** `src/lib/animation-assets.ts:26–31` chỉ hash các mục hiện có trong `files`, rồi chỉ xác nhận mỗi bước có scene; không buộc `animation.gif`, `poster.png` và từng `scene.file` có trong danh sách hash. Nếu thiếu một mục trong manifest, build có thể thành công dù ảnh tương ứng mất hoặc đã đổi. Xác thực các tên tệp bắt buộc và mọi scene đều có hash, rồi kiểm trường hợp thiếu mục/tệp.

## Đạt và bằng chứng

- Source đăng ký `AnimatedFlow` trong lesson index; HTML hiển thị hai bước logic, scene AS thuộc SELECT, `details` bản địa và bảng đầu vào/thực hiện/kết quả từ steps. Ảnh `aliases.png` tự xem: theme tối, SQL trên, nguồn trái/kết quả phải, bốn hồ sơ và giới hạn trích; dữ liệu ô hiển thị tương ứng với dữ liệu bài. Đây không phải kiểm mọi frame GIF.
- Tự chạy `npm test -- --run tests/animated-flow.test.ts tests/content.test.ts`: 84 test đạt. Kiểm query/steps đổi gây lỗi thời và hash các tệp hiện có; test HTML kiểm dữ liệu, 2 bước và nút ẩn khi chưa chạy JS. Hai bản course-author giống byte theo `git diff --no-index`.
- Bằng chứng **tác giả**, `docs/verification/2026-11-15-select-animation/browser.json`, báo đã thử tự phát, bàn phím dừng/phát lại, lỗi tải/retry, reduced motion, không JS và disclosure. Reviewer chưa tự thử UI; bằng chứng không kèm hash build trong chính file, và phép thử chiều rộng có giới hạn ở finding 3. Không suy từ source/HTML rằng đã tự chạy các tương tác đó.
- Manifest hiện tại liệt kê query/steps qua fingerprint, theme, renderer, encoder, sprite và bốn font; các hash hiện có được `readAnimation` kiểm qua test. Các tệp source và ảnh đang khớp manifest theo test, không chứng minh cùng đầu vào tái tạo ra cùng byte ở môi trường khác.

## Giới hạn

Không chạy SQL/API, không đọc seed/secret; không tự kiểm SQL live. Không chạy lại renderer vì sẽ ghi tài nguyên ngoài report; Python mặc định thiếu Pillow, do đó chưa kiểm tái tạo/hash đầu ra hay thời lượng/frame GIF độc lập. Chưa tự chạy build hoặc UI, dựa vào build được giao là đang khớp và evidence tác giả với giới hạn nêu trên. Review tích hợp này không thay review tiền đề từng bài/đề.

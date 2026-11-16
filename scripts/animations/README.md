# Dựng ảnh động luồng SQL

## Prompt giao việc

Dùng chung cho Sol và Terra. Điền phần trong ngoặc vuông, chọn một bài mẫu gần nhất với thao tác cần minh họa.

~~~text
Dùng course-author. [Thêm/Sửa] GIF bài [số bài, slug hoặc đường dẫn MDX].
Mẫu: [2.1 để theo dõi cột / 2.2 để theo dõi dòng / đường dẫn mẫu khác].
Cần nhìn thấy: [dòng/cột/nhóm nào, đi từ đâu đến đâu hoặc đổi ra sao, vì điều kiện nào].
Phạm vi sửa: [chỉ GIF / GIF và chèn vào bài].
Giữ nguyên SQL, dữ liệu bước, bài tập và component chung trừ phần được giao.

Đọc query/steps của bài, nguồn dựng mẫu và các mục quy ước mà docs/bien-soan.md chỉ cho ảnh động. Dùng lại renderer/theme/font/sprite/encoder phù hợp. Trước khi dựng, kiểm Python đã chọn import được Pillow và Chrome dùng được.

Lần một dòng/cột/nhóm từ nguồn tới kết quả. Chốt một dòng kịch bản: trước → đang biến đổi → sau, kèm số tổng, phần trích và cảnh giữ để đọc. Vẽ SQL, chữ và dữ liệu bằng mã từ query/steps. Với thao tác chuyển dữ liệu, khung giữa phải thấy phần dữ liệu đang di chuyển hoặc biến đổi; đích chỉ hiện phần đó khi thao tác hoàn tất. Đổi nhãn bước hoặc bật/tắt cả bảng chưa đạt.

Dựng GIF, ảnh bìa, ảnh tĩnh và manifest bằng lệnh của bài. Giải mã GIF đã xuất, ghép một ảnh gồm khung trước/giữa/sau cho các thao tác đã sửa. Kiểm hình ở 720 px và chế độ màn hẹp theo quy ước. Nếu có lỗi, sửa phần liên quan rồi kiểm lại.

Dùng lại bằng chứng khớp phiên bản và chỉ chạy kiểm, review theo tác động. Khi cần review bài, giao đề đã ẩn answer trước; mở đáp án sau khi reviewer ghi cách làm. Ghi ngắn kết quả, lệnh dựng và điều chưa kiểm vào hồ sơ bài.
~~~

Ví dụ điền dòng «Cần nhìn thấy» cho bài 2.2.

> NV001 mã KT bị loại. NV002, NV003, NV020 mã KD lần lượt trượt sang phải. SELECT thu cột GioiTinh và giữ nguyên các dòng.

## Ảnh động SELECT của bài 2.1

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

## Ảnh động WHERE của bài 2.2

Chạy `npm run render:where-gif` với cùng Node, Chrome và Python ở trên. Script dùng lại theme, font, sprite và encoder của bài 2.1. Bảng nguồn và bảng lọc lấy hàng/cột từ MDX. Trong 15 giây, ba hồ sơ mẫu lần lượt trượt vào bảng lọc. Sau đó `SELECT` thu cột mẫu `GioiTinh` rồi đổi tiêu đề bốn cột còn lại. GIF, ảnh bìa, hình tĩnh và manifest nằm ở `public/lesson-animations/2-2-where`.

Khi nghiệm thu chuyển động, mở các khung đã giải mã của GIF ở 4,0 / 4,6 giây, 5,2 / 5,8 giây và 6,4 / 7,0 giây để so vị trí mỗi dòng đang đi và khi đã đến. So cột và hàng ở 8,3, 10,6 và 13,2 giây. Với bản đã build, chạy `node scripts/animations/check-where-browser.mts` trên Astro preview. Đặt `LESSON_PREVIEW_URL` nếu dùng cổng khác, và `WHERE_ANIMATION_EVIDENCE_DIR` để ghi vào thư mục bằng chứng riêng.

## Ảnh động điều kiện kết hợp của bài 2.3

Chạy `npm run render:conditions-gif` với cùng Node, Chrome và Python/Pillow. Script đọc SQL và các bước từ bài, kiểm kịch bản rồi dựng GIF khoảng 21 giây, ảnh bìa, ba hình tĩnh và manifest tại `public/lesson-animations/2-3-conditions`. Trong bốn dòng trích, `NV002` sai ngày và `NV030` sai phòng; `NV003` và `NV043` đạt cả hai điều kiện và lần lượt chuyển sang kết quả. `SELECT` bỏ cột mẫu `GioiTinh`, sau đó đặt tiêu đề bốn cột. Nếu SQL hoặc dữ liệu đổi phải cập nhật kịch bản trước khi dựng lại.

Kiểm khung trước, giữa và sau khi chuyển từng dòng từ GIF đã xuất, cảnh chọn cột và HTML. Với Astro preview, chạy `node scripts/animations/check-conditions-browser.mts`; đặt `LESSON_PREVIEW_URL` hoặc `CONDITIONS_ANIMATION_EVIDENCE_DIR` khi cần. Kiểm SQL live chỉ đọc bằng cách bundle và chạy `scripts/animations/verify-conditions-sql.mts` tương tự lệnh bài 2.1.

## Ảnh động ORDER BY và TOP của bài 2.4

Chạy `npm run render:order-top-gif` với Node, Chrome và Python/Pillow như trên. Script đọc SQL và năm bước của bài, kiểm kịch bản, rồi xuất GIF khoảng 21 giây, ảnh bìa, năm hình tĩnh và manifest tại `public/lesson-animations/2-4-order-top`. Bốn cột được chuyển từ trích đoạn sau lọc sang SELECT. Cảnh ORDER BY trích sáu trong 45 hồ sơ, với thứ tự đầu vào chỉ là minh họa; từng hồ sơ chuyển tới vị trí đã xếp. TOP chuyển năm dòng đầu, để NV040 ở vị trí thứ sáu ngoài kết quả. SQL và dữ liệu bước thay đổi thì phải kiểm và cập nhật kịch bản trước khi dựng lại.

Giải mã GIF để kiểm trước, giữa, sau các chuyển động SELECT, ORDER BY và TOP. Kiểm SQL chỉ đọc bằng cách bundle `scripts/animations/verify-order-top-sql.mts` như ví dụ bài 2.1. Sau build, chạy Astro preview rồi `node scripts/animations/check-order-top-browser.mts`; có thể đặt `LESSON_PREVIEW_URL` và `ORDER_TOP_EVIDENCE_DIR`.

## Ảnh động NULL của bài 2.5

Chạy `npm run render:null-gif` với cùng Node, Chrome và Python/Pillow. Nguồn dựng đọc SQL và các bước trong bài, kiểm kịch bản rồi xuất GIF, ảnh bìa, bốn cảnh tĩnh và manifest tại `public/lesson-animations/2-5-null`. Nguồn trích bốn trong 48 hồ sơ; kết quả trích hai trong tám hồ sơ. `NV008` và `NV044` qua lọc, `NV033` và `NV045` bị loại. `COALESCE` giữ email của `NV008` và ghi nhãn cho email thiếu của `NV044` trong kết quả, sau đó `ORDER BY` xếp hai dòng minh họa. Nguồn vẫn giữ `NULL`.

Kiểm SQL live chỉ đọc: bundle `scripts/animations/verify-null-sql.mts` qua esbuild như ví dụ 2.1 rồi chạy file trong `api/dist`. Kiểm UI bản build với `node scripts/animations/check-null-browser.mts` và `LESSON_PREVIEW_URL` khi dùng cổng khác.

## Ảnh động bài 2.6–2.9

Chạy `npm run render:distinct-gif`, `npm run render:strings-gif`, `npm run render:dates-gif` hoặc `npm run render:case-gif` từ thư mục gốc với cùng Node, Chrome và Python/Pillow. Các nguồn dựng đọc SQL và dữ liệu bước từ bài, kiểm kịch bản và tạo GIF, ảnh bìa, hình tĩnh cùng manifest trong `public/lesson-animations/2-6-distinct`, `2-7-strings`, `2-8-dates` và `2-9-case`.

- Bài 2.6 trích năm hồ sơ để theo dõi chọn hai cột, gộp cặp trùng và xếp bốn cặp trong tổng 19 cặp.
- Bài 2.7 trích ba hồ sơ để theo dõi lọc, các hàm chuỗi của NV007 và xếp hai trong mười hồ sơ.
- Bài 2.8 trích năm hợp đồng để theo dõi lọc theo ngày, tính số ngày còn lại và xếp hai trong ba hợp đồng.
- Bài 2.9 theo dõi ba hồ sơ đi qua các nhánh CASE theo mốc thâm niên.

Sau khi đổi SQL, dữ liệu hoặc nguồn dựng, cập nhật kịch bản, xuất lại và kiểm các khung trước, giữa, sau cùng HTML theo quy ước. Thứ tự trước `ORDER BY` trong ảnh chỉ là minh họa; bằng chứng SQL và UI ghi riêng trong hồ sơ từng bài.

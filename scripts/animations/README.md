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

## Dựng lại GIF bài 2.1–2.9

Cần Node 24+, Chrome, Python có Pillow và các dependency của repo. Chạy lệnh từ thư mục gốc.

| Bài | Lệnh |
|---|---|
| 2.1 | `npm run render:select-gif` |
| 2.2 | `npm run render:where-gif` |
| 2.3 | `npm run render:conditions-gif` |
| 2.4 | `npm run render:order-top-gif` |
| 2.5 | `npm run render:null-gif` |
| 2.6 | `npm run render:distinct-gif` |
| 2.7 | `npm run render:strings-gif` |
| 2.8 | `npm run render:dates-gif` |
| 2.9 | `npm run render:case-gif` |

`PYTHON` chọn executable Python. `CHROME_CHANNEL` mặc định là `chrome`. Bộ dựng đọc `query` và `steps` trong MDX, đối chiếu SQL hiển thị và gọi `checkFlow`. Khi SQL hoặc mẫu dữ liệu đổi, cập nhật kịch bản tương ứng trong `storyboard.mts`.

Khung 1080 × 720 bắt đầu bằng thanh bước. Bảng trái hiển thị đầu vào của bước đang sáng, bảng phải ghi kết quả của bước đó. `FROM` làm nổi nguồn, `AS` đổi tên tại đích. Khi chuyển dữ liệu giữa hai bảng, hiện dữ liệu ở đích khi chuyển động hoàn thành.

`ORDER BY` làm nổi các cột khóa ở bảng phải, ghi chiều xếp và đổi vị trí dòng ngay trong bảng đó. Giá trị đã tính ở `SELECT` hay cặp đã qua `DISTINCT` đi cùng dòng khi xếp. Bài 2.4 báo đổi sang mẫu sáu dòng ở cảnh xếp để nhìn được ranh giới `TOP (5)`. Cảnh `TOP` chuyển cùng lúc cả khối năm dòng đầu từ trái sang phải.

`render-flow.mts` dựng khung bằng Chrome và font của repo, rồi xuất GIF với `sheet_to_gif.py`. `select.css` giữ kiểu trình bày chung. Ảnh bìa, ảnh tĩnh lấy từ trạng thái đã hoàn tất từng cảnh và manifest nằm cùng GIF tại `public/lesson-animations/<mã>`. Manifest khóa dữ liệu bước, phụ thuộc dựng và hash ảnh xuất. Bài 2.1 có thêm ảnh tĩnh đổi bí danh trong cùng bước `SELECT`.

## Kiểm sau khi dựng

- Giải mã GIF đã xuất. Xem trước, giữa và sau khi chuyển ở 720 px, đối chiếu ô ở đích, thứ tự dòng và trạng thái của ảnh tĩnh. Ở 390 px, kiểm bố cục và lối mở ảnh gốc hoặc bảng HTML để đọc số liệu.
- Build và kiểm link, kích thước ảnh, dữ liệu bước và điều khiển của giao diện. Chạy Astro preview ở port 4322 rồi dùng các script `check-*-browser.mts` và `check-lessons-2-6-2-9.mts`. Đặt `LESSON_PREVIEW_URL` khi cần.
- Bằng chứng SQL live lưu riêng. Khi đổi SQL hoặc số liệu, bundle script `verify-*-sql.mts` qua esbuild như ví dụ dưới đây. Dùng cấu hình hiện có, đọc dữ liệu và giữ credential khỏi log.

~~~sh
api/node_modules/.bin/esbuild scripts/animations/verify-select-sql.mts --bundle --platform=node --format=esm --packages=external --outfile=api/dist/verify-select-animation.mjs
node api/dist/verify-select-animation.mjs
~~~

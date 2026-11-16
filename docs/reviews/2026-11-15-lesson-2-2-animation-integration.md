# Review tích hợp AnimatedFlow — bài 2.2

Phạm vi: đọc source bài 2.2, component, cơ chế khóa, nguồn dựng và manifest được giao theo §2.6a, §4.5. Đây là review tích hợp, không lặp review độc lập toàn bộ bài tập. Không có base/head, build hay bằng chứng kỹ thuật được giao; các nhận định dưới đây là suy luận từ source hiện tại.

## Finding

1. **Câu SQL hiện trên trang chưa được khóa cùng SQL của hình.** `src/content/lessons/2-2-where-loc-nhu-autofilter.mdx:51–61` khai báo câu trong `Sql` và `AnimatedFlow query` hai lần độc lập; `src/lib/animation-assets.ts:6–7,24` chỉ hash query truyền cho AnimatedFlow. Hiện hai bản khớp nhau, nhưng nếu sửa riêng câu người học sao chép, build qua cơ chế này vẫn nhận ảnh cũ: người học có thể thấy minh họa giải thích câu khác. Đề xuất dùng cùng dữ liệu SQL hoặc thêm kiểm so sánh hai bản trong build/test.

2. **Dựng lại có thể đóng dấu hợp lệ cho hình sai câu mới.** `scripts/animations/render-where.mts:22–24,38–41` chỉ ràng buộc một số đặc điểm và điều kiện WHERE, trong khi SQL trong hình được viết cứng. Ví dụ đổi tên bí danh trong cả query và steps cho nhất quán, các kiểm kịch bản nêu trên không so bí danh SQL với chuỗi cố định trong hình. Khi dựng lại, manifest được tính từ query/steps mới nhưng hình vẫn hiển thị bí danh cũ; cơ chế hash sau đó không phát hiện sự lệch. Đề xuất dựng chữ SQL trực tiếp từ query đã khóa hoặc từ chối mọi thay đổi kịch bản chưa được cập nhật đầy đủ; kiểm tương tự cho các nhãn/diễn giải viết cứng phụ thuộc dữ liệu.

3. **Thông báo tài nguyên lỗi thời chỉ sai lệnh sửa cho bài 2.2.** `src/lib/animation-assets.ts:24–25` luôn chỉ `npm run render:select-gif`, còn lệnh dựng bài này là `npm run render:where-gif` trong `package.json`. Khi dữ liệu bài 2.2 thay đổi, người bảo trì làm theo thông báo sẽ dựng nhầm bài 2.1 và lỗi 2.2 vẫn còn. Đề xuất thông báo lệnh theo animation hoặc chỉ dẫn trung tính tới hướng dẫn tương ứng.

## Phần giữ được qua đọc source

- `WHERE` được giới thiệu trước câu SQL đầy đủ; câu SQL sát minh họa, sau đó giải thích NV001 bị loại và NV020 được giữ rồi đưa bảng trích và trả lời chị Hạnh. Nguồn có phân biệt thứ tự logic với cách SQL Server thực thi; câu trả lời nói rõ phạm vi và số dòng theo bài.
- Manifest liệt kê query/steps qua fingerprint, CSS, script, sprite, font và hash các ảnh; `readAnimation` kiểm hash ảnh, hình tham chiếu và có cảnh cho từng bước. Đây là kiểm tra được thiết kế trong source, chưa phải bằng chứng build đã chạy thành công hay kiểm mọi phụ thuộc.
- Source dùng nút native và `summary`, kiểu focus-visible, bảng HTML và ảnh tĩnh trong `details`; khi không có JavaScript nút phát ẩn, nội dung bước vẫn nằm trong markup. Khi giảm chuyển động, nhánh tự phát bị chặn nhưng người học có thể chủ động phát. Nút dừng đổi về poster, cờ người đọc ngăn tự phát lại; khi GIF báo lỗi lúc đang phát, code trả về poster và hiện chỉ dẫn mở từng bước. Poster hoặc hình tĩnh lỗi không có nhánh thông báo riêng; alt và bảng HTML vẫn được khai báo. Chưa kết luận trải nghiệm thực tế từ source.

## Giới hạn và phiên bản

Không được giao browser/UI, không chạy SQL/API, không kiểm HTML/build, không xem từng frame hoặc đo khả năng đọc ảnh, không kiểm YAML/tiền đề từng đề trong lượt tích hợp này. Vì vậy không xác nhận kết quả SQL live, tương tác bàn phím, hành vi mạng/lỗi ảnh, reduced motion, không JS hoặc hiển thị thực tế. Cần kiểm riêng các mục đó trên build tương ứng; không dùng nhận định source làm bằng chứng UI. Không có evidence tác giả để đối chiếu hay tái sử dụng.

SHA-256 tại lúc đọc chỉ định danh source đã đọc, không chứng minh kiểm ngoài source:

- AnimatedFlow.astro: `fcebcedff2298265a5669d1a806cbc73720f5fb60499d2b04425da2fd2f1cf7c`
- animation-assets.ts: `bda5ff18b666f0ff3113bdfca2504ac26c0fa8b17e3dfb2f612eff5c8d9174d7`
- render-where.mts: `ed32530e7b2a47cc2f3c724c90d812edcfde4802f2cb46c5fc950ea9ee143271`
- manifest.json: `cf88f5efc07ddfb52c8739aebf634c5cd6ed89d3c4f4146641b131781dcb99d3`
- MDX: `2baece33603aaec1ddc8ee0aedba065282725d5af4bc4d469c31fc79296b8609`


## Kiểm lại source sau sửa

- **Finding 1: đã xử lý theo cơ chế test và khi dựng ảnh.** `tests/animated-flow.test.ts:64–70` so SQL hiển thị với query của AnimatedFlow; `render-where.mts:18–19` cũng dừng dựng nếu hai câu khác nhau. Đây là bảo vệ khi chạy test hoặc dựng ảnh, không phải kiểm độc lập mỗi lần build. Chưa tự chạy test/build trong lượt kiểm source này.
- **Finding 2: đã xử lý trường hợp SQL viết cứng; còn phần dữ liệu/diễn giải cần xử lý.** `render-where.mts:20–24` từ chối query khác câu cố định trước khi dựng, nên ví dụ đổi bí danh trong finding gốc không còn lọt. Tuy nhiên, lời cảnh `NV020 mã KD được giữ dù đã nghỉ` và alt được viết cứng trong script, còn trạng thái dòng lấy từ `steps`. Nếu cập nhật trạng thái NV020 nhất quán trong cả ba bảng bước và giữ các tổng/cột như cũ, các điều kiện kịch bản ở dòng 29–32 và `checkFlow` không so trạng thái đó với lời viết cứng; dựng lại có thể ghi manifest mới cho ảnh có ô trạng thái và lời giải mâu thuẫn. Cần ràng buộc các dữ kiện được kể bằng chữ cứng hoặc tạo chữ/alt từ dữ liệu đã kiểm. Đây là phân tích source, chưa thử thay dữ liệu hay dựng ảnh.
- **Finding 3: đã xử lý.** `animation-assets.ts:25` nay dùng hướng dẫn trung tính dựng ảnh của bài tương ứng, không còn chỉ sai lệnh bài 2.1; `package.json` có lệnh riêng cho 2.2.

Hash SHA-256 sau sửa của các file đã đọc: `render-where.mts` `9e1c53e356fa0e194cb84507ebf5c05ee48bef6b6352fcef8a12abf19fd7ab36`; `animation-assets.ts` `fe2e809b46598c8e02c3a4fe84cee7f6ec964021c776c220d3c059c324b80ea2`; `tests/animated-flow.test.ts` `2a8cca05415522c3d1ad3f3dd5ff4a7702726d45520e01e9efa222589cfba81d`; manifest `8f38bff4f1503c38b191ed944a9495ba3d5bc42d4db6237dc8cad31634ec3f04`. Các giới hạn UI/SQL/ảnh ở trên vẫn giữ nguyên.

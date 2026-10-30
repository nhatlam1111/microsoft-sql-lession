# Bài 1.3: sắp xếp lại mạch từ ô Excel đến kiểu cột

Trạng thái: người làm khóa học đã duyệt và đã triển khai ngày 30/10/2026; kết quả ở cuối tài liệu. Tài liệu này thay quyết định "giữ phạm vi kiến thức" và vị trí hình ở [thiết kế ngày 30/10 trước đó](2026-10-30-lesson-1-3-teach-brainstorm-design.md); các quyết định khác ở đó vẫn giữ nếu không nêu lại dưới đây.

## Vì sao làm

Người làm khóa học thấy lời văn và thứ tự bài chưa hợp lý: tiêu đề là "Từ ô Excel đến kiểu dữ liệu của cột" nhưng phần chính mở bằng database. Mục tiêu là để người mới theo được từ file của chị Hạnh tới câu trả lời mà không bị đứt mạch.

Ngoài phần mở đầu, tác giả rà ra bốn điểm: giảng Format Cells trước khi cho xem file; chuyển kiểu bị SSMS và bảng kiểu cắt đôi; sau lời đáp chị Hạnh còn ba đoạn nối đuôi; bảng sáu ô dùng `NOT NULL` cho `NgayVaoLam` nhưng bài chưa cho thấy cột này không nhận `NULL`.

## Mục tiêu và giới hạn

- **Mục tiêu:** phần chính đi đúng tiêu đề; mỗi tiểu mục dẫn thẳng sang tiểu mục sau; khái niệm được dạy trước chỗ dùng; lời đáp chị Hạnh là ý cuối của mạch giải thích.
- **Không làm:** không đổi tình huống, nhân vật, sáu ô trong file, kết quả chuyển kiểu, URL, `noExercises`, component hay CSS chung; không thêm SQL, bài tập hay giá trị dữ liệu mới.
- **Coi là hỏng nếu:** bài ngắn hơn nhưng làm mất ý bài sau đang trỏ về, hoặc hứa quá điều kiểu dữ liệu làm được.
- **Giữ cho bài sau:** chuyển kiểu ngầm (2.2, 2.5, 2.9, 3.8), `decimal(p,s)` (3.1), `N'…'` (2.1), chuỗi rỗng với `NOT NULL` (2.5), cách xem Columns (1.5), lý do chọn kiểu theo ý nghĩa (2.9).

## Các hướng đã cân nhắc

- **Đi theo đường đi của ô dữ liệu:** được chọn. Excel → cột database và cách đọc kiểu → chuyển kiểu và trả lời. Đi đúng tiêu đề và khung bài, `NOT NULL` được dạy trước bảng sáu ô; cái giá là bảng kiểu vẫn đứng trước câu trả lời nên phải ngắn.
- **Trả lời trước, mở rộng sau:** không chọn. Câu chuyện liền mạch nhất, nhưng mục tiêu đọc kiểu cột thành phần học thêm sau khi tình huống khép, lệch khung bài kết bằng câu trả lời.
- **Chỉ dời hình, giữ thứ tự còn lại:** không chọn. Ít sửa nhất nhưng chuyển kiểu vẫn bị cắt đôi.

## Cấu trúc được chốt

**Tình huống:** giữ tin nhắn, `Key` và giả định IT lấy chữ hiển thị. Phần thiết lập phiên SQL chuyển xuống đoạn `DATEFORMAT`, nơi người học cần nó.

**1. Cùng một cột nhưng các ô đang khác kiểu.** Mở bằng lời dẫn và hình Excel. Đọc ô theo từng cột, rồi mới nói file chưa đặt Data Validation và Format Cells chỉ đổi cách hiển thị. Kết bằng ý: Excel để từng ô tự mang kiểu riêng, dẫn sang database.

**2. Trong database, mỗi cột có một kiểu.** Mở bằng hình bảng `NhanVien` làm cầu nối, chỉ nhắc đủ định nghĩa bảng, dòng, cột từ bài 1.1. Tiếp theo: khai báo kiểu cho cả cột và lý do dùng `date`, kiểu số; đọc kiểu và `NULL` trong SSMS; bảng kiểu rút gọn; `decimal(p,s)`; lý do `SoCCCD` dùng kiểu chữ.

**3. Đối chiếu từng ô để trả lời chị Hạnh.** Chuyển kiểu ngầm và ba khả năng → `DATEFORMAT` → bảng sáu ô → giới hạn của kiểu dữ liệu → lời đáp chị Hạnh → đoạn "Ở bài này chỉ cần…".

## Phần rút và thêm

- **Bảng kiểu:** còn `varchar(n)`, `nvarchar(n)`, `date`, `decimal(p,s)`. Bỏ `char(n)`, `time(0)` và khái niệm byte; không bài nào khác nhắc tới chúng. Thêm một vế nói SSMS còn hiện các kiểu khác, đọc theo cùng cách. `varchar` viết theo điều kiện mã không dấu để vẫn đúng khi không nói byte.
- **`NgayVaoLam`:** thêm một câu nói cột này là `date`, không nhận `NULL`. `Ssms` giữ bảng `HopDong` vì một bảng có đủ hai trường hợp nhận và không nhận `NULL`.
- **Đoạn cắt:** bỏ đoạn thống nhất cách báo dòng lỗi vì đã có ở Ứng dụng và bài 5.5. Trường hợp IT đọc trực tiếp ngày trong ô rút thành một vế gần ô `C2`. Quy ước `NULL` của `NgayNghiViec` rút thành một vế ở chỗ định nghĩa `NULL`.
- **Sáu đề xuất biên tập chưa làm:** áp dụng cả sáu ở bài đã xếp lại. Câu ôn 1 dùng đúng nhãn `LuongCoBan (decimal(18,0), not null)`.
- **Test:** bỏ yêu cầu `byte (đơn vị lưu trữ)` và `dấu cách ở cuối`; giữ các bảo vệ còn lại về số liệu, giả định, giới hạn.

## Tác giả tự quyết khi viết

- Câu chữ cụ thể, tuân theo `docs/quy-uoc.md`, mẫu bài 1.1 và giới hạn 120 chữ mỗi đoạn.
- Caption hình bảng có thể đổi để nối với cột `NgayVaoLam`; hình giữ nguyên.
- `minutes` giữ 15 trừ khi nội dung giảm rõ. Bài hiện dài xấp xỉ bài 1.1, chưa đo với người học thật.
- Bản ghi trong `ho-so-cong-ty.md` không đổi vì câu chuyện giữ nguyên.

## Kiểm và bàn giao

Chạy tuần tự `npm test`, `npm run check`, `npm run build`, `npm run check:dist`, xem bản build, rồi giao reviewer mới theo mục 4.5 và xử lý theo mục 4.6. Mọi giá trị trong bài là giá trị đã có; `NgayVaoLam date NOT NULL` lấy từ `database/HRM_Demo.sql:66`, chưa đối chiếu metadata live vì connector database hiện không có trong phiên. Giữ bản local, không commit, push hay deploy nếu chưa được đồng ý.

## Kết quả

Đã triển khai đủ cấu trúc ba tiểu mục và sáu đề xuất biên tập. Reviewer mới (Sonnet, effort high) không có mục Cần sửa; tác giả xử lý các mục còn lại trước khi bàn giao. Khác với thiết kế ở hai điểm: bỏ hẳn vế IT đọc trực tiếp ngày trong ô vì giả định đã ghi IT dùng câu lệnh SQL, và bỏ hẳn quy ước `NULL` của `NgayNghiViec` vì chú thích hình đã nêu quy ước bộ mẫu.

Sau [review tích hợp](../../reviews/2026-10-30-bai-1-1-1-3-tich-hop/verification.md), bản cuối đạt 329/329 test, check 0 lỗi, build 132 trang, `check:dist` 1998 liên kết. Bài dài 2.165 từ theo `wc` so với 2.099 trước đó nên giữ 15 phút: bản mới dễ theo hơn chứ không ngắn hơn. [Ma trận xử lý và giới hạn](../../reviews/2026-10-30-lesson-1-3-reorder/verification.md).

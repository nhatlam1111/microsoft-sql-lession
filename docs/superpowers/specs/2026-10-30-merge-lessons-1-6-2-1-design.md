# Gộp bài 1.6 và 2.1 thành bài 2.1

Trạng thái: người làm khóa học đã duyệt ngày 30/10/2026. Người làm khóa học yêu cầu gộp và giao phần chọn nội dung cho người viết, nên mọi quyết định nội dung dưới đây là đề xuất của người viết.

## Ý định

Bỏ bài 1.6, để Level 1 chỉ còn năm bài nền không viết SQL. Người học viết câu SQL đầu tiên ở bài 2.1, trong một bài có một mạch, thay vì hai bài trùng nhau ở `FROM` → `SELECT` và Copy with Headers.

Lý do trên do người viết suy ra từ hướng làm của đợt bài nền, người làm khóa học chưa nói rõ.

## Mục tiêu

- Một bài 2.1 khoảng 22 phút, một tình huống, dạy đủ `SELECT`, `FROM`, `*`, `TOP (n)`, liệt kê cột, thứ tự cột, `AS`, đọc Results và Messages.
- Hướng dẫn thao tác SSMS nằm ở trang Giới thiệu, cạnh mục kết nối.
- Khóa học còn 50 bài, không còn lời trỏ tới bài 1.6.

## Không làm

- Không viết lại 2.2 trở đi, trừ lời trỏ ở 2.4.
- Không đổi slug `2-1-chon-cot-dat-ten-cot`, không đánh lại số bài 2.x.
- Không làm redirect cho link cũ của 1.6, giống cách đã xử lý 1.2 và 1.3.

Thất bại dù vẫn chạy được: bài gộp đọc như hai bài dán nối nhau, hoặc người học xong bài mà chưa biết bấm chạy ở đâu.

## Cách đã cân nhắc

| Cách | Được | Mất | Kết quả |
|---|---|---|---|
| Một mạch, chuyển thao tác SSMS sang trang Giới thiệu | Khoảng 22 phút, một chuyện, gần bài mẫu 2.2 | Người dùng SSMS phải đọc thêm một mục ở trang Giới thiệu | **Chọn** |
| Giữ đủ hai phần nối tiếp nhau | Ít mất nội dung | 30–35 phút, dài nhất Level 2, hai tình huống | Bỏ |
| Bỏ `TOP` khỏi bài, để hẳn cho 2.4 | Khoảng 18 phút | Mất cách xem thử bảng an toàn ở câu đầu tiên; 2.4 phải viết lại đoạn nối | Bỏ |

## Nội dung bài 2.1

Giữ tình huống gửi Kế toán của 2.1, vì nó có sản phẩm cuối rõ ràng. Việc xem bảng của 1.6 thành bước đầu của chính tình huống đó: muốn chọn ba cột thì phải biết bảng đang lưu những cột nào.

Câu giả định "vừa được cấp quyền đọc database nhân sự" chuyển sang 2.1, vì đây thành bài đầu tiên có tình huống.

Thứ tự phần chính:

1. Xem bảng đang lưu gì: `SELECT TOP (5) * FROM NhanVien;`, giải thích `SELECT`, `*`, `FROM`, `TOP`, đọc Results và Messages. Nói rõ `TOP` chưa có `ORDER BY` không bảo đảm chọn hồ sơ nào, và `*` lấy cả dữ liệu cá nhân nên chỉ dùng để xem.
2. Chọn những cột cần gửi: giữ từ 2.1.
3. Đặt tiêu đề mà không đổi cột nguồn: giữ từ 2.1.
4. Câu lệnh cho tình huống, kết quả và Copy with Headers: giữ từ 2.1.
5. Sơ đồ `FROM` → `SELECT` của câu cuối: giữ từ 2.1. Bỏ sơ đồ ba bước của 1.6.

Cắt khỏi bài: danh sách diễn giải 12 cột, đoạn phân tích `NV004`, Select Top 1000 Rows, phần trùng về Copy with Headers.

Hay nhầm: giữ các ý của 2.1, thêm ý `TOP` không chọn mười mã nhỏ nhất. Ý bôi đen thiếu phần và cảnh báo Edit Top 200 Rows chuyển sang trang Giới thiệu.

## Trang Giới thiệu

Mục kết nối SSMS đã có sẵn đoạn New Query, chọn database và F5. Thêm vào đó: hình thanh công cụ, bôi đen thì chỉ chạy phần bôi đen, nút Parse, cảnh báo Edit Top 200 Rows, và `SELECT INTO` cho thấy chữ `SELECT` đầu câu chưa đủ để kết luận chỉ đọc. Các câu trỏ "học ở bài 1.6" đổi thành 2.1.

## Bài tập

Bốn bài, đều chỉ đọc:

1. `2-1-1` mới, lấy từ `1-6-2`: toàn bộ hợp đồng, đủ mọi cột. Hợp đồng chưa từng in trong bài nên không chép được.
2. `2-1-2`: `2-1-1` cũ, chọn hai cột.
3. `2-1-3`: `2-1-2` cũ, đổi thứ tự cột.
4. `2-1-4`: `2-1-3` cũ, đặt tiêu đề.

Phần Bài tập giữ lời dặn ngắn về cách dùng trang bài tập, vì đây thành lần đầu người học gặp trang này.

## Thay đổi đi kèm

- Xóa `1-6-cau-select-dau-tien.mdx` và file bài tập của nó.
- `prerequisites` của 2.1 thành `1.2`, `1.3`; `minutes` thành 22.
- Sửa lời trỏ ở bài 1.1, 1.2, 2.4, trang Giới thiệu, README, `docs/ho-so-cong-ty.md`; sửa các chỗ ghi 51 bài.
- Level 1 trong `src/data/curriculum.ts` đổi mô tả, vì không còn "mở ra đọc được".
- `DEMO_DONE` trong `src/lib/progress.ts` bỏ `1.6`, còn 17 bài.
- Test của 1.6 chuyển sang 2.1 nếu nội dung còn, bỏ nếu nội dung đã chuyển hoặc đã cắt.

## Đã kiểm

- Tiến độ học: `1.6` đã lưu trong trình duyệt không gây lỗi. `countDone` chỉ đếm bài còn trong khóa; `lastLessonNum` trỏ bài không còn thì trở về `null`.
- Bài tập: API lấy từ `src/content/exercises`, không có chỗ nào ghi cứng `1-6`. `checkExerciseFile` buộc mã bài tập liên tục nên phải đánh số lại.
- `1.6` chỉ là điều kiện trước của 2.1, không bài nào khác phụ thuộc.

Hệ quả nhỏ: bài tập đã làm lưu theo mã, nên sau khi đánh số lại, dấu hoàn thành của `2-1-1` đến `2-1-3` lệch một bài.

## Quyết định của người viết

- Làm trên nhánh mới `feat/merge-lessons-1-6-2-1`, tách từ `feat/level-1-foundation-lessons`, để PR #4 giữ nguyên phần đã review.
- Một review độc lập cho bài 2.1 cùng phần sửa trang Giới thiệu, theo mục 4.5 và 4.6 của quy ước.
- Câu mới đối chiếu với database bằng `SELECT`; bài tập chạy `check:exercises`.

## Để người viết tự quyết

- Tiêu đề cuối của bài, câu chữ và tên tiểu mục, trong giới hạn của khung bài.
- Số ý Hay nhầm, miễn không thêm ý ngoài mục tiêu bài.

## Kết quả

Đã làm trên nhánh `feat/merge-lessons-1-6-2-1`, chưa push. Bài 2.1 mới một tình huống, 22 phút, bốn bài tập; khóa học còn 50 bài. Một review độc lập không có mục Cần sửa. Bản cuối đạt 324/324 test, check 0 lỗi, build 129 trang, `check:dist` 1952 liên kết, `check:exercises` và `check:data` đạt. [Hồ sơ xử lý](../../reviews/2026-10-30-gop-1-6-2-1/verification.md).

Khác thiết kế:

- Tiêu đề bài là "Câu SELECT đầu tiên: chọn cột và đặt tiêu đề", vì "đặt tên cột" dễ hiểu là đổi tên cột trong bảng.
- Trang Giới thiệu có thêm mục `#chay-cau-lenh`, bài 2.1 trỏ tới đó.
- Câu Hay nhầm về chuỗi dùng `'HoTen'`, bỏ `N`.

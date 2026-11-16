# Kiểm lại finding 1 — ảnh động bài 2.7

## Kết luận

Finding về thời lượng cảnh LEN đã được xử lý trong GIF hiện tại: khung GIF số 75 (đánh số từ 0) hiển thị đầy đủ `LEN(HoTen) → 13`, cùng giải thích đếm hai dấu cách, trong **3000 ms**, từ 15,64 đến 18,64 giây. Ba giây là khoảng dừng hợp lý để đọc cảnh này ở kích thước ảnh gốc; chưa đánh giá khả năng đọc ở vùng bài hoặc màn hình hẹp.

Renderer `render-strings.mts:88–89` giữ nguyên trạng thái nguồn frame 111 thêm 18 frame trước khi tiếp tục, sau ba frame 111–113 ban đầu. GIF được giải mã có 89 khung sau gộp, 1080 × 824, lặp vô hạn, tổng 23,75 giây; thời lượng 3000 ms là thời lượng thực trong tệp, không chỉ ước lượng từ source.

## Chuyển động kề cảnh

Đã giải mã và xem các khung 52, 53, 56, 62, 65, 68, 71, 74, 75, 76, 78, 82, 85, 88. RIGHT và UPPER đã hiện; thành phần ghép đến CONCAT và kết quả ghép xuất hiện; nhãn `Bùi Thanh Sơn → 13` đi từ nguồn tới vùng LEN, sau đó hiện kết quả đầy đủ trước khi chuyển ORDER BY. Khi kết thúc sắp, hai dòng và giá trị đúng vị trí: NV007 trước NV011. Không thấy chuyển động LEN hoặc đoạn giữ cảnh bị cắt hay nhảy sang thứ tự sai.

Trong khung 82, hai dòng đang đổi vị trí chồng lên nhau và một dòng bị che tạm thời; hai dòng xuất hiện trở lại ở trạng thái cuối. Đây là quan sát về cảnh ORDER BY, không phải hỏng cảnh LEN; nếu muốn cả hai dòng luôn nhìn thấy trong lúc đổi chỗ thì cần điều chỉnh hoạt họa riêng.

## Định danh và giới hạn

- `public/lesson-animations/2-7-strings/animation.gif`: SHA-256 `edc921086cc61f2942114e4d0df35e0597baf08f419c3984f3c519ed4c402038`.
- `scripts/animations/render-strings.mts`: SHA-256 `33ba9452092f541be2d5c83db4f271c6918537845011ba0ba1f2e441a08e7ced`.
- `scripts/animations/sheet_to_gif.py`: SHA-256 `85d31b11aa3477ac339f08fc88f48904f959826dc90b06726bddaadd997d3b8b`.
- `select.png`: SHA-256 `feb0f366e937b30b9e936ea10348a5cc8d208631ae718c019a60a8e6b8b19fd9`.

Chỉ kiểm finding được giao bằng source và các khung GIF giải mã; không chạy renderer, SQL/API, không kiểm HTML build hoặc tương tác UI, không khẳng định toàn bộ các khung và thao tác khác đã được review lại.

# Bài 2.1 dẫn bằng sơ đồ: hồ sơ xử lý review

Lượt ngày 31/10/2026, sau khi đổi tiểu mục "Câu lệnh cho tình huống" trong `docs/quy-uoc.md` mục 2.1. [Report gốc](review.md) giữ nguyên byte so với `temp/review/2026-10-31-bai-2-1-dan-bang-so-do/review-bai-2-1-chon-cot-dat-ten-cot.md`.

Reviewer: agent mới, Claude Sonnet, effort high, đọc commit `a3c16a9` và build 14:34, chỉ đọc nguồn và HTML. Reviewer ghi rõ đã mở YAML cùng lượt với bài, nên bảng tiền đề không phải phép thử mù hoàn toàn.

Trong lúc review, người làm khóa học yêu cầu thêm bảng kết quả cuối trước câu trả lời (commit `3c3f2bf`). Vì vậy thứ tự cuối là câu lệnh → sơ đồ → bảng kết quả → câu trả lời, khác bản reviewer đọc. Mục 8 của report ghi nhận việc bỏ `Result` là theo bản cũ, không còn đúng.

## Xử lý từng nhận xét

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 lời dẫn sơ đồ | Làm theo | Câu hỏi tự nhiên nhất của bài chưa được trả lời trước khi bấm | Nói nghĩa của thứ tự logic và lý do: biết bảng nguồn rồi mới chọn được cột; bỏ chữ "biến" |
| F2 bằng chứng người đã nghỉ | Làm theo | `SELECT` trên `NV033` | Thêm `NV033` vào hai bước sơ đồ. Không dùng `NV020` như đề xuất vì trùng tên chị Hạnh |
| F3 đoạn Copy with Headers | Làm theo | Chỉ cho SSMS, dùng chữ Results trước khi giải thích | Cắt; ý chuyển vào Ứng dụng |
| F4 câu tra tên lặp | Làm theo | Quy ước 1 | Giữ ở mục Bài tập |
| F5 "lướt vài dòng đầu" | Làm theo | Trái Hay nhầm 5 và bài 1.2 | Đổi thành lướt qua một sheet, thêm "dòng nào cũng được" |
| F6 "nhận ra câu xem thử", mục tiêu | Làm theo | Đề 1 cần viết `*` | Đổi đoạn "Ở bài này chỉ cần…" và `goal` |
| F7 Ghi nhớ thiếu `FROM` | Làm theo | Ý chính của sơ đồ | Gộp vào hàng đầu |
| F8 tiêu đề khi không có `AS` | Làm theo | Đề 2, 3 không đặt tiêu đề | Thêm một câu |
| F9 độ tải | Làm một phần | Câu về dấu `;` vẫn cần cho người mới | Rút câu `N`; gộp hai ý Ứng dụng; giữ đoạn đầu |

## Kiểm thực tế

- Bản cuối: `npm test` 327/327; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 129 trang; `npm run check:dist` đạt.
- Đối chiếu bằng `SELECT`: hàng `NV033` đủ 12 cột trong sơ đồ. Năm dòng của bảng kết quả dùng lại giá trị đã chạy ở lượt trước.
- Bản `3c3f2bf` xem ở 1024×720: thứ tự sơ đồ, bảng, câu trả lời đúng; không tràn trang; không lộ backtick.

## Giới hạn

- Các sửa sau review chưa có reviewer đọc lại; bảng kết quả thêm sau khi reviewer bắt đầu.
- Chưa chạy thật trên trang bài tập vì cần mã truy cập; chưa kiểm trong SSMS thật, kể cả Copy with Headers.
- 15 phút là nhãn dự kiến, chưa đo.
- 21 bài có sơ đồ chưa chuyển thứ tự mới, trong 23 bài chờ chuyển bố cục.

## Lượt chỉnh sau review: chỉ bám tình huống

Người làm khóa học yêu cầu mọi giải thích SQL và câu lệnh chỉ bám tình huống đầu bài, ghi vào `docs/quy-uoc.md` mục 2.1. Bài 2.1 bỏ `TOP`, hai ví dụ `NhanVien` và `PhongBan` trong lời văn, Hay nhầm về bỏ trùng và `TOP`, ý Ứng dụng xem mẫu. Dấu `*` giữ đúng một vế vì đề 1 cần. Bài 2.4 bỏ câu trỏ về `TOP` của bài 2.1; ví dụ bôi đen ở trang Giới thiệu đổi thành `SELECT *`, lỗi `Must specify table to select from.` đã chạy thật.

Phần chính không tính sơ đồ còn 618 từ. Bản cuối đạt `npm test` 327/327, `npm run check` 0 lỗi, build 129 trang, `check:dist` đạt; xem ở 1024×720 không tràn trang. Lượt này chỉ cắt theo yêu cầu của người làm khóa học, không có review độc lập mới.

## Lượt chỉnh sau review: thấy câu lệnh trước khi giải thích

Người làm khóa học đổi mạch vì lời giải thích không kèm câu lệnh khiến học viên khó hình dung. Mạch mới, ghi vào `docs/quy-uoc.md` mục 2.1 và `docs/lesson-template.md`: việc trong Excel → trong SQL cần chạy câu lệnh gì → câu lệnh của tình huống → giải thích từng phần → thứ tự thực hiện → kết quả → câu trả lời.

Bài 2.1 dùng `LineMap` cho phần giải thích, tiểu mục sau lấy lại tên "SQL Server chạy câu này thế nào". Cột mã của `LineMap` thu từ 240px xuống 150px để chữ không bị hẹp ở rộng 1024; bài 2.1 hiện là bài duy nhất dùng khối này.

Bản cuối đạt `npm test` 327/327, `npm run check` 0 lỗi, build 129 trang, `check:dist` đạt; xem ở 1024×720 đúng thứ tự, không tràn trang. Lượt này không có review độc lập mới. Ở rộng 1024, dòng đầu câu lệnh dài hơn khung nên phải cuộn ngang trong khối SQL.

# 10. Wireframe tham chiếu và đề xuất

Ký hiệu: **H** = sơ đồ khái quát từ ảnh lịch sử, chưa phải bản sao pixel; **P** = đề xuất độc lập cho SQL Arcade. Các khung ASCII không chứa tài nguyên/đề/dataset CodeSignal. Phân tích UX ở [08](08-ui-ux-reconstruction.md).

## H1. Map và workspace nhìn thấy trong tư liệu

```text
MAP 2017 — chỉ cấu trúc quan sát [H-03-M]
  World đang mở:  (xanh/không hiện khóa) --- (khóa) --- (khóa)
  World tiếp:    [khóa cả nhóm]

WORKSPACE — bố cục ảnh [H-03-I, H-06]
+------------------------------+----------------------------------+
| Description / Solutions      | Ngôn ngữ     CODE.JS      Saved   |
| Tên, đề, ví dụ, giới hạn      | Editor có số dòng/highlight       |
|                              +----------------------------------+
|                              | Tests: mẫu đạt / test khóa        |
|                              | Add custom test                   |
|                              | RUN TESTS             SUBMIT      |
+------------------------------+----------------------------------+
```

Không khôi phục chính xác kích thước, responsive, hover, timing hoặc vị trí mọi control qua tất cả phiên bản. Không có wireframe lịch sử “hidden unlocked” hay “world complete” đáng tin để coi là gốc; dùng P4/P5 có nhãn đề xuất.

## P1. Arcade Home / World selection / Challenge list

```text
SQL Server                         Bài học | Luyện SQL | Tiến độ
Luyện theo từng thử thách                         [Tiếp tục]

Chọn và lọc dữ liệu    1/4     [Mở danh sách]
Kết hợp điều kiện     0/3     [Khóa — hoàn thành bài 04]
Lấy kết quả đúng ý    0/3     [Khóa — hoàn thành bài 07]

World: Chọn và lọc dữ liệu       [Bản đồ] [Danh sách]
01 Chọn hai cột          Đã hoàn thành       [Luyện lại]
02 Đổi thứ tự cột        Đang làm            [Tiếp tục]
03 Một mã phòng         Khóa — cần bài 02
04 Trạng thái tiếng Việt Khóa — cần bài 03
Tiến độ lưu trên thiết bị này.   [Xuất] [Nhập]
```

Danh sách có cùng khả năng điều hướng với map, dùng được bằng bàn phím. Node khóa vẫn mô tả vì sao và dẫn bài tiền đề; không giả làm lỗi API.

## P2. Challenge details / Editor / Tests

```text
+--------------------------------+--------------------------------------+
| 03. Một mã phòng               | Microsoft SQL Server                 |
| Mục tiêu, bài cần biết [2.2]    | [Editor T-SQL, nháp tự lưu]           |
| Yêu cầu cột/thứ tự/tiêu chí     |                                      |
| [Đề] [Schema] [Dữ liệu mẫu]     | [Khôi phục starter]                  |
|                                +--------------------------------------+
| Bảng/cột, ví dụ tự soạn         | [Chạy thử (F5)] [Nộp bài]             |
| Chấm tên cột: không             | Đang chờ / đang chạy / kết quả        |
| Thứ tự dòng: theo đề            | Mẫu 1  Đạt     Mẫu 2 Chưa đạt         |
|                                | [Input] [Expected] [Actual]          |
|                                | Hidden: chỉ chấm khi nộp             |
+--------------------------------+--------------------------------------+
```

Màn nhỏ xếp dọc cả ba vùng, không ẩn kiến thức tiền đề để nhường chỗ cho editor. F5 thuộc workspace; không chặn phím ngoài vùng làm bài. SQL dialect cố định, không có language selector không cần thiết.

## P3. Test failed / Service error

```text
Chạy thử: 1/2 mẫu đạt
Mẫu 2 — khác số dòng
Expected (dữ liệu mẫu công khai) | Actual của bạn
[Bảng expected]                 | [Bảng actual]
[Về editor]

Nộp bài: chưa đạt — hidden 2/3
Không hiển thị input/expected/actual của hidden.
[Đọc lại tiêu chí] [Sửa code]

Chưa biết kết quả do mất mạng: [Lấy lại job cũ]
Đã nhận lỗi dịch vụ terminal. Nháp vẫn còn.
[Thử lại bằng job mới]
```

Lỗi dịch vụ dùng thông điệp riêng, không hiển thị “bạn sai”. Kết quả của code cũ có nhãn “Bản đã gửi trước khi bạn sửa”.

## P4. Hidden locked / revealed — giai đoạn sau

```text
MVP: Hidden 2/3  [khóa] — không có nút mua

TƯƠNG LAI, CHƯA DUYỆT:
[Xem phản ví dụ] -> dialog: phạm vi quyền / giá đã duyệt / số dư
Thiếu Coin: [Đóng] — không trừ
Đã có quyền: [Mở phản ví dụ] — không trừ lại
Revealed: dữ liệu luyện được phép xem; holdout vẫn không hiển thị
```

Không điền giá dựa vào 5.000 Coin trong tài liệu gián tiếp lịch sử; đây là điểm cần quyết định riêng.

## P5. Challenge completed / World completed / Progress

```text
Challenge 03 đã đạt toàn bộ bộ kiểm của phiên bản 1
Lần đầu: +10 XP cá nhân    Luyện lại: không cộng thêm
[Bài kế] [Về world] [Tiếp tục sửa thử]

World đã hoàn thành: 4/4 challenge
[World tiếp] [Luyện lại bài đã qua]

Tiến độ cá nhân: 4/10 | XP 40 | Bài đang làm: 05
Không phải chứng chỉ hoặc xếp hạng chống gian lận.
[Xuất JSON] [Nhập JSON] [Về bài học]
```

Các số là ví dụ UI minh họa, không phải dữ liệu học viên hoặc kết quả đã chạy. Chưa tạo giao diện/prototype thực tế trong lượt nghiên cứu này.

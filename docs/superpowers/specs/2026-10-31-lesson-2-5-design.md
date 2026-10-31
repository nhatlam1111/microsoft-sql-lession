# Bài 2.5 theo mạch một câu lệnh

Trạng thái: đã duyệt và đã làm trên nhánh `feat/lesson-2-5-null`, chưa push, 31/10/2026. [Hồ sơ kiểm](../../reviews/2026-10-31-lesson-2-5/verification.md).

Khác thiết kế: hình Excel bỏ cột họ tên và dùng `NV031` thay `NV037` để thấy ô `(chưa có)` ở rộng 1024; Hay nhầm 3 đổi thành "coi dòng không có nhãn là đã có email"; bước `WHERE`, `SELECT` trích ba hồ sơ để thẻ sơ đồ thấy `NV044`.

Tích hợp sau review từng bài: [hồ sơ merge 2.5–2.9](../../reviews/2026-10-31-publish-2-5-2-9/verification.md), có review mới và quyết định giữ nháp khi đề 2-5-3 đổi phạm vi. Không đổi thiết kế sản phẩm trong lượt merge.

## Ý định

Chuyển bài 2.5 sang bố cục của 2.1–2.4: một câu lệnh của tình huống, giải thích từng phần, sơ đồ, bảng kết quả, trả lời chị Hạnh. Bài hiện có 4 tiểu mục và 3 khối `Sql`; kết quả chỉ có 2 dòng đều là `(chưa có)`, nên người học không thấy `COALESCE` giữ lại email thật, trong khi đề 2-5-3 cần đúng phần đó.

## Mục tiêu

- Người học lọc được ô chưa có giá trị bằng `IS NULL`, ô đã có giá trị bằng `IS NOT NULL`, biết vì sao `= NULL` không lấy được dòng nào.
- Người học thấy `COALESCE` giữ giá trị có sẵn và chỉ thay chỗ `NULL`, không đổi dữ liệu nguồn.
- Người học hiểu `NULL` không tự nói lý do: cùng một dòng, `Email` là `NULL` vì còn thiếu, `NgayNghiViec` là `NULL` vì chưa nghỉ.

## Không làm

- Không đổi slug, số bài, tiêu đề bài.
- Không sửa 2.6 trở đi, seed, API hay component.
- Không dạy phép tính với `NULL`. Không dạy `ISNULL` ở phần chính.

Thất bại dù vẫn chạy được: bài gọn nhưng thiếu kiến thức để làm ba đề, hoặc mất ý mà bài 3.5, 3.9, 2.7, 4.4 đang trỏ về.

## Cách đã cân nhắc

| Quyết định | Cách | Được | Mất | Kết quả |
|---|---|---|---|---|
| Tình huống | Danh sách liên hệ phòng VH, lọc `NgayNghiViec IS NULL` | Kết quả có cả email thật lẫn nhãn; thấy hai nghĩa của `NULL` trên một dòng | Sửa hồ sơ công ty và test; lọc theo ngày nghỉ thay vì `TrangThai` hơi gượng | **Người làm khóa học chọn** |
| | Giữ yêu cầu hai hồ sơ thiếu email | Ít sửa | Mọi dòng đều ra `(chưa có)` | Bỏ |
| Trình bày | Cách 1: đi theo câu lệnh, ý phân biệt viết một câu | Gọn, thấy câu lệnh sớm, đúng quy tắc bám tình huống | Không có bảng để tra lại | **Người làm khóa học chọn** |
| | Cách 2: giữ bảng `NULL`, `0`, `''`, `' '` | Nhìn rõ trong một khối | Dài hơn, đẩy câu lệnh xuống, nói về giá trị không có trong tình huống | Bỏ |

## Nội dung bài

**Tình huống.** Chị Hạnh rà danh sách liên hệ phòng Vận hành: những hồ sơ chưa có ngày nghỉ việc, gồm mã nhân viên, họ tên, email, tiêu đề tiếng Việt, xếp mã tăng dần; ai chưa có email thì ghi `(chưa có)`. Phạm vi nêu rõ `NULL` ở `NgayNghiViec` là quy ước của bộ mẫu cho người chưa nghỉ, và yêu cầu không kiểm email đúng định dạng hay còn dùng được.

**Câu lệnh.** Đã chạy trên database, 8 dòng, chỉ `NV044` hiện nhãn:

```sql
SELECT MaNV AS [Mã nhân viên], HoTen AS [Họ tên],
    COALESCE(Email, N'(chưa có)') AS [Email]
FROM NhanVien
WHERE MaPB = 'VH'
    AND NgayNghiViec IS NULL
ORDER BY MaNV ASC;
```

**Tiểu mục đầu**, "Từ lọc ô trống trong Excel đến IS NULL và COALESCE":

- Excel: lọc `VH`, chọn **(Blanks)** ở `NgayNghiViec`, thêm cột phụ ghi nhãn. Hình trích `NV008`, `NV037`, `NV044` với số dòng thật của sheet, đánh dấu hai ô trống của `NV044`; nói rõ quy ước bản xuất ghi `NULL` thành ô trống.
- Câu lệnh, rồi `LineMap` từng phần, mỗi dòng có "Ví dụ:".
- `NULL` là chưa có giá trị, khác số `0` và chuỗi rỗng `''` là những giá trị đã có. Viết một câu.
- `NULL` không tự nói lý do: hai ô `NULL` của `NV044` mang hai nghĩa, phải dựa vào quy ước dữ liệu.
- `IS NULL`, `IS NOT NULL`; so sánh ô `NULL` bằng `=`, `<>` hay `>=` đều cho `UNKNOWN`, mà `WHERE` chỉ giữ dòng có điều kiện đúng.
- Lọc và hiển thị là hai việc: `COALESCE` trả giá trị đầu tiên khác `NULL`, chỉ tạo giá trị trả về, `Email` nguồn vẫn là `NULL`. Cột `varchar(100)` gặp nhãn Unicode thì kết quả thành `nvarchar` (chuyển kiểu ngầm, bài 1.3).
- Đoạn "Ở bài này chỉ cần…", trỏ sang 3.1 và 4.6.

**Tiểu mục sau**, "SQL Server chạy câu này thế nào": sơ đồ FROM 48 → WHERE 8 → SELECT 8 → ORDER BY 8; bước `WHERE` còn `NULL`, tới `SELECT` mới có nhãn. Sau sơ đồ là bảng đủ 8 dòng, đánh dấu `NV044`, rồi trả lời: 8 hồ sơ chưa có ngày nghỉ việc, `NV044` cần nhắc bổ sung, `NV033` và `NV041` không vào danh sách vì đã có ngày nghỉ; 7 email còn lại có giá trị nhưng chưa được xác minh.

**Hay nhầm**, ba ý, đều là biến thể của chính câu này:

1. `NgayNghiViec = NULL` chạy không báo lỗi, trả `0` dòng thay vì `8`.
2. Đổi `COALESCE` thành `ISNULL`: `ISNULL(Email, N'(chưa có)')` theo kiểu `varchar` của cột nên ra `(chua có)`, mất dấu. Đã chạy thử.
3. Coi dòng có email là liên hệ được ngay: `COALESCE` chỉ thay `NULL`; chuỗi rỗng, dấu cách, địa chỉ gõ sai vẫn giữ nguyên.

**Bài tập.** 2-5-1, 2-5-2 giữ nguyên. 2-5-3 đổi từ phòng VH sang phòng KD (14 hồ sơ, `NV045` thiếu email).

## Thay đổi đi kèm

- `src/content/lessons/2-5-null-o-trong.mdx`: viết lại, `minutes` còn 15, sửa `goal`, `excel`, `summary`.
- `src/content/exercises/2-5-null-o-trong.yaml`: đổi đề 2-5-3.
- `docs/ho-so-cong-ty.md`: dòng 2.5 ở bảng tình huống.
- `tests/content.test.ts`: gỡ 2.5 khỏi `PENDING_TWO_SUBSECTIONS`; test `ISNULL(Email` chỉ còn chặn ở phần chính, vì Hay nhầm nêu đúng câu sai đó.
- `tests/content-2-5.test.ts`: đổi sang số liệu 48/8/8/8 và 8 dòng kết quả.

## Quyết định của người viết

- Bỏ `10 + NULL` và cặp `OR Email IS NULL`: không bài sau nào dựa vào; 3.6 và 4.6 tự nêu điều kiện của mình.
- Bỏ cột mã phòng khỏi kết quả, vì danh sách chỉ có một phòng.
- Giữ tiêu đề "NULL: ô trống không phải số 0" dù bài không còn phép tính, vì ý đó vẫn nằm trong một câu.
- Đổi đề 2-5-3 sang KD: đề cũ chỉ khác câu lệnh của bài ở chỗ bỏ một điều kiện.
- Làm trên nhánh `feat/lesson-2-5-null`, tách từ `main` tại `9a0762b`.

## Để người viết tự quyết

Câu chữ, tên tiểu mục đầu, nội dung Ứng dụng và Ghi nhớ, số ý cụ thể trong `LineMap`, trong giới hạn của quy ước.

## Nghiệm thu

- Chạy lại mọi câu, số liệu và hàng dữ liệu trong sơ đồ bằng `SELECT`.
- `npm --prefix api run build`, `check:exercises`, `check:data`; `npm test`, `npm run check`, `npm run build`, `npm run check:dist`.
- Xem bản build: hình Excel, bốn bước sơ đồ, bảng kết quả, chép câu lệnh.
- Một review độc lập theo mục 4.5, xử lý nhận xét theo mục 4.6, lưu hồ sơ ở `docs/reviews/2026-10-31-lesson-2-5/`.

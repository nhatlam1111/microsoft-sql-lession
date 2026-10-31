# Bài 2.8 và 2.9 theo mạch một câu lệnh

Trạng thái: chờ người làm khóa học duyệt, 31/10/2026.

## Ý định

Chuyển 2.8, 2.9 sang bố cục hai tiểu mục, một câu lệnh, drawer ba phần có lời mới. Hai bài giữ nguyên yêu cầu của chị Hạnh và câu lệnh, vì câu lệnh đã dùng đúng các hàm cần dạy.

Ý khó nhất của 2.9 là `WHEN` xét từ trên xuống và dừng ở nhánh đúng đầu tiên, nên bảng soi được mở rộng cho bước `SELECT` có `CASE`. Bài 2.8 có 25 trong 55 hợp đồng để trống `NgayKetThuc`, nên bảng soi phải hiện được `UNKNOWN`.

## Mục tiêu

- Mỗi bài một câu lệnh, ba đề vẫn đủ tiền đề.
- Bảng soi hiện `UNKNOWN` ở bước lọc, và hiện từng nhánh `WHEN` ở bước `CASE`.

## Không làm

- Không đổi slug, số bài, tiêu đề bài, YAML bài tập, seed, tình huống, câu lệnh.
- Không chuyển 3.1 trở đi; các bước `CASE`, `WHERE` ở đó chờ tới lượt.

Thất bại dù vẫn chạy được: bảng soi `CASE` khiến người đọc nghĩ mọi nhánh luôn được xét, hoặc học viên không làm được đề `MONTH`, `EOMONTH`.

## Cách đã cân nhắc

| Quyết định | Cách | Được | Mất | Kết quả |
|---|---|---|---|---|
| Bước `CASE` | Bảng soi từng nhánh, cột cuối là nhãn | Thấy `WHEN` dừng ở nhánh đúng đầu tiên | Sửa thêm component | **Người làm khóa học chọn** |
| | Chỉ câu chữ | Không sửa component | Ý khó nhất chỉ nằm trong lời | Bỏ |
| Yêu cầu 2.8, 2.9 | Giữ | Ít sửa, hồ sơ công ty không đổi | Không có | Câu lệnh đã dùng đúng hàm, không cần đổi như 2.7 |

## Bảng soi

`FlowChecks` trong `src/lib/run-flow.ts`:

- `rows` nhận thêm `null`. Ở bước lọc, `null` hiện là `UNKNOWN`, dòng đó bị loại.
- Thêm trường tùy chọn `labels: string[]`, mỗi hàng một nhãn. Có `labels` là bảng nhánh `CASE`: cột cuối tiêu đề `Nhãn`, `null` hiện là `Không xét`, hàng cuối đếm số dòng dừng ở từng nhánh.

Ví dụ bảng nhánh của 2.9:

| MaNV | Mốc 3 năm <= ngày chốt | Mốc 1 năm <= ngày chốt | Nhãn |
|---|---|---|---|
| NV003 | Đúng | Không xét | Từ 3 năm trở lên |
| NV025 | Sai | Đúng | Từ 1 đến dưới 3 năm |
| NV045 | Sai | Sai | Dưới 1 năm |
| Cả 45 dòng | 33 | 8 | 4 |

`checkFlow` thêm:

- Bảng nhánh: `labels` khớp số hàng; trước nhánh đúng là `false`, sau nhánh đúng là `null`; `totals` cộng lại bằng số dòng của bước; nhãn khớp `rows` của bước.
- Bước lọc: `null` tính là không giữ.

Ghi chú tự động dưới bảng nhánh: "Trích 3 trong 45 dòng; hàng cuối đếm số dòng dừng ở từng nhánh."

## Bài 2.8

Giữ tình huống, câu lệnh và sơ đồ `FROM` 55 → `WHERE` 3 → `SELECT` 3 → `ORDER BY` 3.

**Tiểu mục đầu**, "Từ phép trừ ngày trong Excel đến DATEADD và DATEDIFF": Excel → `Sql` → `LineMap`. Sau đó:

- `GETDATE()` lấy ngày giờ máy chủ, Azure dùng UTC, nên báo cáo dùng ngày chốt cố định. Các đề cấm `GETDATE`.
- `DATEADD(đơn vị, số lượng, ngày gốc)`, các đơn vị `day`, `month`, `year`.
- `>=`, `<=` lấy cả hai đầu. Cột có giờ thì dùng `<` ngày kế tiếp; bài 2.3 trỏ về ý này.
- `DATEDIFF` đếm ranh giới: `DATEDIFF(year, NgayBatDau, NgayKetThuc)` của `HD2024-008` ra `2`, nhưng `DATEADD(year, 2, NgayBatDau)` là `2026-11-15`, sau ngày kết thúc. Đã chạy. Muốn kiểm đủ năm thì so mốc tạo bằng `DATEADD`; đề 2-8-2 cần ý này.
- Bảng nhỏ trên `HD2024-008`: `MONTH(NgayKetThuc)` ra `11`, `EOMONTH(NgayKetThuc)` ra `2026-11-30`. Đề 2-8-1, 2-8-3 cần.
- `NgayKetThuc` là `NULL` ở hợp đồng không xác định thời hạn, so sánh cho `UNKNOWN`.
- Đoạn "Ở bài này chỉ cần…".

Bỏ hai `Sql`, hai `Result` phụ và câu về `HD2025-003`.

**Tiểu mục sau:** bước `FROM` trích `HD2015-001`, `HD2023-003`, `HD2024-008`, `HD2025-014`, `HD2026-002`. Bảng soi bước `WHERE`:

| MaHD | `>=` ngày chốt | `<=` mốc 30 ngày | Kết luận |
|---|---|---|---|
| HD2015-001 | UNKNOWN | UNKNOWN | Loại |
| HD2023-003 | Đúng | Sai | Loại |
| HD2024-008 | Đúng | Đúng | Giữ |
| HD2025-014 | Đúng | Đúng | Giữ |
| HD2026-002 | Sai | Đúng | Loại |
| Cả 55 dòng | 20 đúng | 13 đúng | 3 giữ |

Tiêu đề bảng có tên cột. `minutes` còn 20. Ba câu tự kiểm tra sửa `NV036` thành `HD2024-008`.

## Bài 2.9

Giữ tình huống, câu lệnh và sơ đồ `FROM` 48 → `WHERE` 45 → `SELECT` 45 → `ORDER BY` 45.

**Tiểu mục đầu**, "Từ IF trong Excel đến biểu thức CASE": Excel → `Sql` → `LineMap`. Sau đó:

- Thâm niên tính theo mốc kỷ niệm: `NV025` vào làm `2023-11-01`, phải tới `2026-11-01` mới đủ `3` năm.
- Nhánh đủ `3` năm đặt trước nhánh đủ `1` năm; `NV003` thỏa cả hai.
- `ELSE` là giá trị khi không nhánh nào đúng; bỏ `ELSE` thì dòng đó nhận `NULL`. Đề 2-9-3 cần ý này.
- `CASE` không thay `WHERE`, không ghi nhãn vào bảng; các nhánh cùng trả chuỗi Unicode.
- Đoạn "Ở bài này chỉ cần…".

Bỏ ví dụ `MaCD`, bỏ bảng ba nhánh vì bảng nhánh trong sơ đồ đã nói ý đó.

**Tiểu mục sau:** bảng soi bước `WHERE` có `TrangThai = N'Đang làm'`, `NgayVaoLam <= ngày chốt`, tổng `45`, `48`, `45`. Bước `SELECT` có bảng nhánh như trên, tổng `33`, `8`, `4`. `Result` trích 10 dòng đầu, tổng 45, câu trả lời giữ.

`minutes` còn 18.

## Thay đổi đi kèm

- `src/lib/run-flow.ts`, `src/components/lesson/RunFlow.astro`.
- `docs/quy-uoc.md` mục 2.6, `docs/lesson-template.md`: `null`, `labels`.
- `tests/run-flow.test.ts`, `tests/components.test.ts`, `tests/content-2-8.test.ts`, `tests/content-2-9.test.ts`, `tests/content-flow-checks.test.ts`, `tests/content.test.ts`.

## Quyết định của người viết

- Ô sau nhánh đúng hiện `Không xét`, không hiện giá trị thật của điều kiện đó, vì đây là điều `CASE` làm với điều kiện từng dòng của bài.
- Bước `FROM` của 2.8 đổi hai dòng trích để có đủ bốn trường hợp; bỏ `HD2025-003` để khỏi phải giải thích lỗi của bài 4.6.
- 2.8 còn 20 phút, 2.9 còn 18 phút; chưa đo.
- Làm tiếp trên nhánh `feat/lesson-2-5-null`.

## Để người viết tự quyết

Câu chữ, tên tiểu mục, tiêu đề cột bảng soi, nội dung Ứng dụng và Ghi nhớ.

## Nghiệm thu

- Chạy lại bằng `SELECT` mọi câu và số mới.
- `npm --prefix api run build`, `check:exercises`, `check:data`; `npm test`, `npm run check`, `npm run build`, `npm run check:dist`.
- Xem bản build ở rộng 1024: hình Excel, bốn drawer, hai kiểu bảng soi, nút Sao chép, Bước trước, Bước sau.
- Một review độc lập cho mỗi bài theo mục 4.5, xử lý theo mục 4.6, hồ sơ ở `docs/reviews/2026-10-31-lesson-2-8/`, `2026-10-31-lesson-2-9/`.

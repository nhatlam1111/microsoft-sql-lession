# Drawer sơ đồ: đầu vào, thực hiện, kết quả

Trạng thái: đã duyệt và đã làm trên nhánh `feat/lesson-2-5-null`, chưa push, 31/10/2026. [Hồ sơ kiểm](../../reviews/2026-10-31-run-flow-drawer/verification.md).

Khác thiết kế, sau review:

Hồ sơ tích hợp cuối: [merge 2.5–2.9](../../reviews/2026-10-31-publish-2-5-2-9/verification.md), gồm UNKNOWN/CASE đã mở rộng và các giới hạn bài cũ/mobile. Không đổi thiết kế sản phẩm trong lượt merge.

- Thêm trường `inputColumns`, vì `preview` của bước trước không đủ cột cho cả thẻ lẫn đầu vào của bước sau.
- Câu mặc định của bước đầu thành "Bước này không nhận dữ liệu từ bước nào trước đó trong sơ đồ."
- Tiêu đề bảng soi có tên cột, dưới bảng có ghi chú tự động nói phần trích và cách đếm hàng cuối.
- Mã trong bảng soi phải nằm trong 5 dòng đang hiện ở đầu vào.
- Bảng soi 2.4 thêm `NV001`; sửa 15 câu ở các bài sau còn nhắc câu lệnh xem dữ liệu trong drawer.

## Ý định

Bấm vào một bước của sơ đồ, học viên phải hiểu ngay dữ liệu nào đi vào, bước đó làm gì, kết quả ra sao. Drawer hiện có "… làm gì", "Ở bước này", câu lệnh xem dữ liệu và liên hệ Excel, nên người đọc phải tự ghép; bước có nhiều điều kiện không cho thấy từng điều kiện tác động thế nào.

## Mục tiêu

- Drawer có ba phần: **Đầu vào**, **Thực hiện**, **Kết quả**.
- Bỏ khỏi drawer phần liên hệ Excel và câu lệnh xem dữ liệu, ở cả 22 bài.
- Bước lọc có bảng soi từng hồ sơ: mỗi điều kiện đúng hay sai, hồ sơ được giữ hay bị loại, kèm tổng trên toàn đầu vào.
- Lời mới cho toàn bộ bước của bài 2.1–2.5.

## Không làm

- Không đổi thẻ sơ đồ, thứ tự bước, số dòng, kiểu `Result`.
- Không viết lại lời các bước từ 2.6 trở đi; chúng được chỉnh khi từng bài chuyển bố cục.
- Không làm bảng soi cho điều kiện `OR` hay giá trị `UNKNOWN`; chưa bài nào trong đợt này cần.

Thất bại dù vẫn chạy được: drawer dài hơn mà người đọc vẫn không biết vì sao một hồ sơ bị loại, hoặc bảng soi khiến người đọc nghĩ SQL Server lọc nhiều lượt.

## Cách đã cân nhắc

| Quyết định | Cách | Được | Mất | Kết quả |
|---|---|---|---|---|
| Đầu vào | Bảng rút gọn lấy từ bước trước | Thấy hồ sơ nào đi vào rồi biến mất, không phải viết thêm | Drawer dài hơn | **Người làm khóa học chọn** |
| | Chỉ câu chữ | Ngắn | Không thấy giá trị | Bỏ |
| Thực hiện | B: bảng đúng sai từng hồ sơ | Đúng cách SQL Server xét trên mỗi dòng | Soạn thêm dữ liệu, chỉ hợp với bước lọc | **Người làm khóa học chọn** |
| | A: đếm qua từng điều kiện | Lời văn, hợp mọi bước | Dễ hiểu thành lọc hai lượt | Bỏ |
| Triển khai | Cách 1: đổi drawer cả 22 bài, viết lại lời 2.1–2.5 | Đồng nhất ngay, lượt vừa sức | Từ 2.6 lời cũ có chỗ chưa khớp nhãn mới | **Người làm khóa học chọn** |
| | Cách 2: viết lại cả 89 bước | Xong hẳn | Rất lớn, các bài từ 2.6 phải sửa lần nữa khi chuyển bố cục | Bỏ |
| | Cách 3: chỉ 2.1–2.5 đổi | Không có bài nửa cũ nửa mới | Hai kiểu drawer, các bài sau còn phần muốn bỏ | Bỏ |

## Mẫu

Bước `WHERE` bài 2.3. Số liệu đã chạy trên database, [mockup](../../../.superpowers/brainstorm/1089-1793448119/content/drawer-2-3.html) là phương án B.

- **Đầu vào, từ bước FROM:** bảng `MaNV`, `MaPB`, `NgayVaoLam` của `NV002`, `NV003`, `NV030`, `NV043`; ghi "Trích 4 trong 48 dòng, 3 trong 12 cột".
- **Thực hiện:** "`WHERE` xét từng hồ sơ, `AND` yêu cầu cả hai điều kiện cùng đúng", rồi bảng soi:

| MaNV | IN | BETWEEN | Kết luận |
|---|---|---|---|
| NV002 | Đúng | Sai | Loại |
| NV003 | Đúng | Đúng | Giữ |
| NV030 | Sai | Đúng | Loại |
| NV043 | Đúng | Đúng | Giữ |
| Cả 48 dòng | 24 đúng | 3 đúng | 2 giữ |

- **Kết quả:** "Còn `2` hồ sơ, vẫn đủ `12` cột", rồi khối `Result`.

## Cách làm

**Drawer.** Giữ phần đầu và khối câu lệnh tô vàng để biết bước ứng với đoạn nào của câu. Bỏ hai nhãn cũ, khối `Sql` và khối Excel. Thứ tự: Đầu vào → Thực hiện → bảng soi nếu có → Kết quả → `Result`.

**Đầu vào tự động.** Bảng lấy từ `rows` của bước trước, tối đa 5 dòng, dùng các cột `preview` của bước đó, mặc định ba cột đầu. Nhãn nêu tên bước trước. Dòng ghi phần trích chỉ hiện khi có trích.

**Bước không có bước trước.** Trường tùy chọn `input` là lời cho phần Đầu vào.

- Bước đầu, không có `input`: câu mặc định "Chưa qua bước nào; dữ liệu lấy trực tiếp từ bảng nguồn."
- `FROM` ở 2.1–2.5 có `input` riêng, nêu bảng gốc và số dòng.
- `JOIN`: bảng rút gọn là bảng bên trái, `input` nêu bảng bên phải khi bài đó được chuyển.
- `UNION`: hai nhánh đầu là bước không có bước trước; bước gộp hiện bảng của cả hai nhánh.

**Trường dữ liệu.** `meaning` hiện ở Thực hiện, `detail` ở Kết quả, giữ tên để không phải đổi 22 bài. `excel` bỏ khỏi kiểu dữ liệu và các bài bằng script. `sql` vẫn bắt buộc nhưng không hiện, vì đó là bằng chứng để chạy lại từng bước.

**Bảng soi.** Trường tùy chọn `checks`:

```ts
checks?: {
  /** Header per condition, such as "IN" or "BETWEEN". */
  conditions: string[];
  /** One row per record: its key, then whether each condition holds. */
  rows: [string, ...boolean[]][];
  /** Input rows meeting each condition, then the rows kept. */
  totals: number[];
}
```

Kết luận suy ra từ `AND`: mọi điều kiện đúng thì Giữ. `checkFlow` báo lỗi khi số ô không khớp, khi số giữ ở `totals` khác số dòng của bước, khi một mã trong bảng soi không có ở đầu vào, hoặc mã được Giữ không có trong `rows` của bước.

**Lời 2.1–2.5.** 17 bước. Thực hiện bắt đầu từ từ khóa, nói việc làm với các dòng của tình huống. Kết quả nêu số dòng, số cột, hồ sơ giữ hoặc loại. Không lặp lại bảng. Bảng soi có ở bước `WHERE` của 2.2, 2.3, 2.4, 2.5; bài 2.1 không có bước lọc.

Giá trị bảng soi của 2.5, đã chạy: `NV008` đúng đúng, `NV033` đúng sai, `NV044` đúng đúng, `NV045` sai đúng; tổng `10`, `45`, `8`.

## Thay đổi đi kèm

- `src/lib/run-flow.ts`, `src/components/lesson/RunFlow.astro`, `src/styles/lesson.css`: như trên, bỏ CSS `.rf-excel`, `.rf-xmark`.
- `src/content/lessons/2-1` đến `2-5`: lời mới, `input`, `checks`; bước `FROM` của 2.3 thêm dòng `NV002`.
- 22 bài: bỏ dòng `excel` bằng script.
- `docs/quy-uoc.md`, `docs/lesson-template.md`: quy tắc drawer ba phần, bảng thuộc tính, trường `excel`.
- `tests/`: `run-flow`, `components`, các test đang đọc `excel` hoặc nội dung drawer.

## Quyết định của người viết

- Giữ khối câu lệnh tô vàng trong drawer.
- Bảng soi có cả ở bước `WHERE` một điều kiện của 2.2, 2.4, để cách đọc nhất quán.
- Đầu vào tối đa 5 dòng để drawer không quá dài.
- Dùng tiêu đề cột `Kết luận`, tổng ghi "Cả 48 dòng".
- Làm tiếp trên nhánh `feat/lesson-2-5-null`, vì bài 2.5 chưa merge và drawer của nó cũng đổi; một PR gồm cả hai.

## Để người viết tự quyết

Câu chữ của từng bước, tên viết tắt của điều kiện trong tiêu đề bảng soi, dòng nào trích ở Đầu vào, trong giới hạn của quy ước.

## Nghiệm thu

- Chạy lại bằng `SELECT` mọi số trong bảng soi và lời mới.
- `npm test`, `npm run check`, `npm run build`, `npm run check:dist`; bài tập không đổi nên không cần `check:exercises`.
- Xem bản build ở rộng 1024 và 1440: 2.3, 2.5, một bài có `JOIN`, bài `UNION` 3.8, bàn phím, nút Bước trước và Bước sau.
- Một review tích hợp theo mục 4.5 cho drawer và năm bài, xử lý theo mục 4.6, hồ sơ ở `docs/reviews/2026-10-31-run-flow-drawer/`.

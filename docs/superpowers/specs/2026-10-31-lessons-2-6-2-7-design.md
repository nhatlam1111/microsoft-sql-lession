# Quy ước drawer, bài 2.6 và 2.7 theo mạch một câu lệnh

Trạng thái: đã duyệt và đã làm trên nhánh `feat/lesson-2-5-null`, chưa push, 31/10/2026. Hồ sơ kiểm: [2.6](../../reviews/2026-10-31-lesson-2-6/verification.md), [2.7](../../reviews/2026-10-31-lesson-2-7/verification.md).

Khác thiết kế, sau review:

Hồ sơ tích hợp cuối: [merge 2.5–2.9](../../reviews/2026-10-31-publish-2-5-2-9/verification.md); giữ riêng giới hạn grader không xác minh tên collation từ kết quả. Không đổi thiết kế sản phẩm trong lượt merge.

- Bài 2.7 và đề 2-7-2 đổi từ `Vietnamese_CI_AI` sang `Latin1_General_CI_AI`, vì `Vietnamese_CI_AI` coi `Đ`, `Â` là chữ riêng. Thiết kế ghi không đổi YAML; đây là thay đổi duy nhất ở YAML, Hay nhầm của 2.7 thành bốn ý, tự kiểm tra thành bốn câu.
- Bài 2.6 đổi lời trỏ sang bài 3.2, vì không bài nào dạy đếm số giá trị khác nhau.
- Bước `ORDER BY` của 2.5 thêm câu chỉ bước này mới bảo đảm thứ tự.

## Ý định

Ghi vào quy ước những gì rút ra từ lượt drawer, để các bài sau làm đúng ngay. Chuyển 2.6, 2.7 sang bố cục hai tiểu mục, một câu lệnh, drawer ba phần có lời mới.

## Mục tiêu

- Quy ước và danh sách tự rà đủ để viết một bước sơ đồ không cần đọc lại lượt review.
- 2.6: một câu lệnh, người học vẫn làm được đề hai cột và đề có `WHERE`.
- 2.7: một câu lệnh dùng thật `RIGHT`, `UPPER`, `CONCAT`, `LEN` và hàm lồng; đề 2-7-1, 2-7-2 và bài 4.6 vẫn đủ tiền đề.

## Không làm

- Không đổi slug, số bài, tiêu đề bài, YAML bài tập, seed, component.
- Không chuyển 2.8 trở đi.

Thất bại dù vẫn chạy được: 2.7 gọn nhưng học viên không làm được đề `COLLATE`, hoặc đổi yêu cầu khiến chị Hạnh hỏi một việc không ai cần.

## Cách đã cân nhắc

| Quyết định | Cách | Được | Mất | Kết quả |
|---|---|---|---|---|
| Yêu cầu 2.7 | Đổi: nhãn `007 - BÙI THANH SƠN` kèm số ký tự họ tên | Học viên thấy bốn hàm chạy thật và hàm lồng, đúng thứ đề 2-7-3 cần | Sửa tình huống, hồ sơ công ty, test | **Người làm khóa học chọn** |
| | Giữ yêu cầu cũ, chỉ `CONCAT` | Ít sửa | Mọi hàm khác chỉ nằm trong bảng | Bỏ |
| Bố cục 2.6 | Một câu `DISTINCT MaPB`, ý nhiều cột viết bằng lời | Đúng quy ước | Không có bảng kết quả hai cột | Cách duy nhất hợp quy ước |

## Quy ước

`docs/quy-uoc.md`:

- Dòng drawer ở mục 2 thêm: Thực hiện nói việc, Kết quả nói số và danh sách cần, không lặp nhau; bước `FROM` không nói lại cùng một điều ở ba phần.
- Thêm: bước lọc phải thấy cột của điều kiện ở Đầu vào, bước `SELECT` phải thấy cột sắp lấy, dùng `inputColumns`; tiêu đề bảng soi có tên cột; dòng trong bảng soi có cả hồ sơ giữ và hồ sơ loại.
- Mục 4.3 thêm một dòng tự rà cho drawer.
- Mục 4.5, lời dặn reviewer: kiểm đầu vào của mỗi bước có đủ cột để hiểu vì sao dòng bị loại; `sql` của bước không hiện trên trang, chỉ đối chiếu trong nguồn.

`docs/lesson-template.md`: thêm câu Thực hiện nói việc, Kết quả nói số.

## Bài 2.6

Giữ tình huống và câu lệnh `SELECT DISTINCT MaPB FROM NhanVien ORDER BY MaPB ASC;`.

**Tiểu mục đầu**, "Từ Remove Duplicates đến DISTINCT": Excel kèm hình → `Sql` → `LineMap`. Sau đó:

- `DISTINCT` chỉ tạo danh sách trả về, không xóa hồ sơ.
- `DISTINCT` so **cả dòng kết quả** trên mọi cột đứng sau `SELECT`: chọn thêm `MaCD` thì `IT`, `CV` và `IT`, `CVC` đều được giữ, ra `19` cặp thay vì `6` mã. Đề 2-6-2 cần ý này.
- Thêm `WHERE` thì `DISTINCT` chỉ xét các dòng đã lọc. Đề 2-6-2, 2-6-3 cần ý này.
- Đoạn "Ở bài này chỉ cần…".

Bỏ hai `Sql` và hai `Result` phụ, bỏ Advanced Filter, bỏ câu `NULL` với `DISTINCT` vì ngoài tình huống và không đề nào cần.

**Tiểu mục sau:** sơ đồ `FROM` 48 → `SELECT` 48 → `DISTINCT` 6 → `ORDER BY` 6, `Result` 6 dòng, câu trả lời. Bước `FROM`, `SELECT` trích năm dòng `NV001`–`NV005`, để đầu vào của `DISTINCT` thấy `KT`, `KD`, `KD`, `BGD`, `KT`. Bước `DISTINCT` không có bảng soi vì không xét điều kiện.

**Hay nhầm**, bốn ý: thêm `MaNV` thì ra `48` dòng; thấy mã lặp cho là nhập trùng; dùng `DISTINCT` che hồ sơ trùng; `ORDER BY NgayVaoLam` báo `ORDER BY items must appear in the select list if SELECT DISTINCT is specified.`, đã chạy.

`minutes` còn 12, `excel` còn Remove Duplicates.

## Bài 2.7

**Tình huống.** Chị Hạnh in phiếu ký nhận phòng IT. Ô nhãn trên phiếu ngắn nên cần nhãn dạng `007 - BÙI THANH SƠN`: ba số cuối của mã, họ tên in hoa có dấu; thêm cột số ký tự họ tên để biết nhãn nào dài; xếp mã tăng dần. Không nêu khổ ô cụ thể.

**Câu lệnh.** Đã chạy, 10 dòng:

```sql
SELECT MaNV AS [Mã nhân viên],
    CONCAT(RIGHT(MaNV, 3), N' - ', UPPER(HoTen)) AS [Nhãn ký nhận],
    LEN(HoTen) AS [Số ký tự họ tên]
FROM NhanVien
WHERE MaPB = 'IT'
ORDER BY MaNV ASC;
```

**Tiểu mục đầu**, "Từ công thức Excel đến hàm chuỗi": hình Excel có công thức `=CONCAT(RIGHT(A2,3)," - ",UPPER(B2))` → `Sql` → `LineMap`, nói rõ hàm trong được tính trước. Sau đó:

- Một bảng nhỏ cho các hàm còn lại, đều trên giá trị của `NV007`: `LEFT(MaNV, 2)` ra `NV`; `SUBSTRING(MaNV, 3, 3)` ra `007`, vị trí đầu là `1`, tương ứng `MID`; `LOWER(HoTen)` ra `bùi thanh sơn`; `TRIM` bỏ dấu cách ở hai đầu, `HoTen` này không có nên giữ nguyên.
- `LEN` không tính dấu cách cuối, khác Excel. `CONCAT` coi `NULL` là chuỗi rỗng, nên ghép được chưa chứng minh đầu vào đủ. Đề 2-7-3 cần ý này.
- `N` giữ chuỗi Unicode tự viết. **Collation** là luật so sánh và sắp xếp chữ; database khóa học phân biệt dấu: `HoTen LIKE N'bui%'` ra `0` dòng, `HoTen COLLATE Vietnamese_CI_AI LIKE N'bui%'` ra `NV007`, đã chạy. Đề 2-7-2 cần ý này.
- Đoạn "Ở bài này chỉ cần…".

Bỏ ba `Sql` và ba `Result` phụ.

**Tiểu mục sau:** sơ đồ `FROM` 48 → `WHERE` 10 → `SELECT` 10 → `ORDER BY` 10, bảng soi `MaPB = 'IT'`, `Result` 10 dòng, câu trả lời: 10 nhãn, họ tên dài nhất 14 ký tự ở `NV035`, `NV046`, ngắn nhất 11 ở `NV039`.

**Hay nhầm**, ba ý: coi phần số của mã là số; dùng `UPPER` mong tìm được chữ không dấu; dùng `TRIM` rồi coi dữ liệu đã sạch. Bỏ ý cắt họ tên vì ngoài tình huống.

Giữ ba câu tự kiểm tra, sửa cho khớp. `minutes` còn 20.

## Thay đổi đi kèm

- `docs/ho-so-cong-ty.md`: dòng 2.7.
- `tests/content.test.ts`: gỡ 2.6, 2.7 khỏi `PENDING_TWO_SUBSECTIONS`.
- `tests/content-2-6.test.ts`, `tests/content-2-7.test.ts`: bỏ phần đọc `Result` phụ, giữ kiểm số `19`, `48` từ seed; đổi nhãn mong đợi.
- `tests/content-flow-checks.test.ts`: thêm 2.6, 2.7.

## Quyết định của người viết

- Bỏ câu `NULL` với `DISTINCT` ở 2.6; bài sau không dựa vào.
- 2.6 còn 12 phút, 2.7 còn 20 phút; chưa đo.
- Làm tiếp trên nhánh `feat/lesson-2-5-null`, vì hai bài dựa vào drawer mới chưa merge.

## Để người viết tự quyết

Câu chữ, tên tiểu mục, nội dung Ứng dụng và Ghi nhớ, dòng trích trong sơ đồ.

## Nghiệm thu

- Chạy lại bằng `SELECT` mọi câu và số mới.
- `npm --prefix api run build`, `check:exercises`, `check:data`; `npm test`, `npm run check`, `npm run build`, `npm run check:dist`.
- Xem bản build ở rộng 1024: hình Excel, bốn drawer, bảng soi, nút Sao chép, nút Bước trước, Bước sau.
- Một review độc lập cho mỗi bài theo mục 4.5, xử lý theo mục 4.6, hồ sơ ở `docs/reviews/2026-10-31-lesson-2-6/`, `2026-10-31-lesson-2-7/`.

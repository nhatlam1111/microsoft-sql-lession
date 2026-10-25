# Re-review bài 3.8 — sau sửa R1–R3

## Phạm vi, phiên bản và cách kiểm

Đây là lượt kiểm tiếp của cùng reviewer, model kế thừa phiên. Giữ nguyên `initial-review.md`; không học lại hoặc mở lại đáp án để làm lại ma trận tiền đề đã khóa. Phạm vi là sửa R1–R3, phần giải thích cơ chế xử lý mới, bốn trạng thái/drawer của `RunFlow`, và ảnh hưởng trực tiếp của cách biểu diễn hai đầu vào.

- Base HEAD: `19170bc4428d21715ba42b3fa0416c06148280a4`; branch `codex/review-lesson-3-8`; source mới đang ở working tree, chưa có commit mới.
- MDX 3.8: SHA-256 `BF62F92D9CBB0284E4B0619E30D99B7DBDA24F554C0BED834E709ED274F88937`.
- YAML 3.8: SHA-256 `62581E2AC93D26B50592B51EF6DC80E729632AAD3E15CD5C113C7845C67818F6`, đúng hash lượt đầu. Các đề/answer không đổi; kết luận tiền đề của ba đề ở report đầu tiếp tục áp dụng.
- Build được giao: `dist`, lúc `23:03:03 +07` ngày 25/10/2026. Tôi kiểm file bài 3.8 có đúng mốc sửa này và đếm được 117 file HTML trong dist (116 file `index.html` cộng trang HTML khác). Không tự chạy build.
- HTML được đọc: `dist/bai/3-8-union-gop-danh-sach/index.html`, SHA-256 `AA10561160D9093A0D6403E0F607DF024EF1063A65FB94D958C50FE69864063C`.
- Shared component được đọc: `src/components/lesson/RunFlow.astro` (hash `6E7B2D9B37484665C73512FDDFEB04AE2C155AE4FCFC22991AAFAB3DA61264EE`), `src/lib/run-flow.ts` (hash `CF29622227AD1A33166CDCDC0AD9D1B748C3F81C6ED450D1BC01FC97735A5F8C`), cùng diff CSS và test liên quan.
- Công cụ thực tế: PowerShell, `rg`, Git chỉ đọc, Node đọc/so literal MDX và phân tích HTML bằng `parse5`, Vitest cho unit/component dùng dữ liệu giả. Đã áp dụng `frontend-design` cùng `frontend-design-premium` cho nghĩa của sơ đồ, shared owner và mức bằng chứng UI; đọc DESIGN.md và checklist liên quan. Đây không phải xác nhận hoàn tất audit UI toàn ứng dụng.
- Không browser, SQL, DB, API/runner, seed SQL hoặc secret. Không sửa source/test/docs/Git, không tạo agent con. Chỉ ghi report này.

## Rà các sửa đổi theo thứ tự bài

| Mục ban đầu | Kiểm trực tiếp | Kết quả |
|---|---|---|
| R3 — lặp tổng 9/76, MDX 34–36 | Đoạn 34 vẫn giữ đơn vị mỗi nhánh; đoạn 36 chỉ nói bảng trích, mã được đánh dấu và thứ tự chưa bảo đảm. Tổng vẫn nằm trên `Result`. | Đã xử lý. Cắt đúng câu lặp, không làm mất phạm vi hoặc tổng cạnh hình. |
| R2 — tên chuyển kiểu, MDX 46/67 | Dòng 46 gọi rõ **chuyển kiểu ngầm** và dẫn bài 1.3; dòng 67 dùng lại đúng tên. | Đã xử lý. Không thêm luật chọn kiểu phức tạp hoặc biến phần này thành tiền đề mới để làm đề. |
| R1 — đường xử lý cả câu, MDX 90–92 | Tiểu mục mới giải thích `FROM` → `WHERE` → `SELECT` trong từng nhánh, hai nhánh độc lập, `UNION` gộp/bỏ trùng rồi `ORDER BY` sắp chung. Nói trực tiếp đây là mô hình logic, không yêu cầu chạy xong nhánh trên rồi nhánh dưới. | Đã xử lý. Người học có thể giải thích lại cả câu bằng lời, không cần mở drawer để nhận lý thuyết còn thiếu. |

Câu tự hỏi “SQL Server có buộc đọc hết đơn nghỉ rồi mới chấm công không?” được trả lời ngay ở đoạn luôn hiển thị trước sơ đồ. Câu “vì sao 9 + 76 không bằng số mã gửi chị Hạnh?” tiếp tục được trả lời bằng bỏ trùng trên một cột và được nối sang trạng thái 41 mã. Đoạn mới không mâu thuẫn phần so cả dòng khi có hai cột ở ví dụ nhãn nguồn.

HTML có tiểu mục và đoạn giải thích logic trong `<p>` thông thường trước `<figure class="rf">`; không nằm trong `<details>`, drawer hoặc phần tử `hidden`. Giả định tháng/giờ và lời trả lời chị Hạnh vẫn ở phần chính. Các khối được thêm chỉ cụ thể hóa kiến thức đã hiện, không giấu kiến thức cốt lõi để rút ngắn bề ngoài.

## Rà bốn trạng thái và drawer

Câu `RunFlow.query` khớp từng ký tự với `Sql` cho tình huống sau khi giải mã literal MDX, gồm newline, tab, chuỗi ngày và giờ. Cả bốn `focus` có mặt chính xác trong query. `steps[3].sql` khớp query toàn câu; hai câu nhánh chỉ đọc nguồn riêng; câu trạng thái UNION không có `ORDER BY`.

| Drawer | Đơn vị và phạm vi trong lời giải | Trạng thái bảng/source | Đối chiếu HTML |
|---|---|---|---|
| 01 — SELECT đơn nghỉ, MDX 104–117 | Mã từ đơn đã duyệt có `TuNgay` trong tháng 9/2026. `SELECT` chỉ chọn mã sau khi nhánh đã xác định nguồn/lọc. | 9 dòng, ghi đủ 9; mỗi dòng có một `MaNV`. `NV005` xuất hiện một lần trong chín dòng ghi ở source. | Có đủ 9 dòng bảng. Highlight chỉ đúng câu nhánh đơn nghỉ; nhãn thẻ và aria-label dùng “có 9 dòng”. |
| 02 — SELECT chấm công, MDX 118–131 | 76 **lần mã xuất hiện** theo ngày tháng 9 và giờ vào sau 08:00; nói rõ mã có thể lặp qua ngày, không lấy nhánh đơn làm đầu vào. | Trích 10 dòng trên tổng 76, không gọi là 76 mã khác nhau. | Có 10 dòng bảng; thẻ xem nhanh hiện 3 dòng và `+73 dòng`; nhãn/aria-label dùng “có 76 dòng”. Highlight đúng toàn bộ câu nhánh chấm công. |
| 03 — UNION, MDX 132–150 | Nhận hai kết quả 9/76, trả 41 mã khác nhau vì chỉ chọn một cột. Có nhắc chưa được dựa vào thứ tự trước `ORDER BY`. | Trích 10 trên 41; `NV005` trong phần trích còn một dòng. | Highlight đúng từ khóa `UNION`; bảng có 10 dòng, tổng 41. Không có `ORDER BY` trong câu SQL xem trạng thái này. |
| 04 — ORDER BY, MDX 151–170 | Sắp toàn bộ danh sách chung theo mã tăng dần; giữ nguyên 41 mã, không sắp riêng từng nguồn. | Trích 10 dòng đầu, tổng 41; câu SQL trùng câu chính. | Highlight đúng `ORDER BY MaNV;`; bảng và câu SQL giữ đúng dữ liệu được giao. |

Tôi phân tích HTML bằng parser, không chỉ tìm chuỗi trong file: bốn panel đều có đúng SQL hiển thị và thuộc tính `data-copy` như `steps[i].sql`; các vùng highlight khớp focus, với dấu `;` nằm trên dòng `ORDER BY` cuối theo cách component mở rộng highlight cả dòng. Ghép các block trước/highlight/sau bằng ranh giới dòng của CSS trả đúng query ở cả bốn drawer. Không thấy backtick hoặc chuỗi escape dùng thay tab lọt vào chữ giảng; tab và nháy thẳng được giữ trong nội dung SQL/thuộc tính sao chép.

Đây là kiểm HTML và dữ liệu sao chép được khai báo. Chưa thử bấm Sao chép, dán vào editor, mở/đóng drawer hoặc dùng bàn phím trên browser.

## Rà quan hệ hai đầu vào trong shared RunFlow

- Source nhận đúng chuỗi bốn clause `SELECT`, `SELECT`, `UNION`/`UNION ALL`, `ORDER BY` để chọn biểu diễn hai đầu vào. HTML bài 3.8 có `data-layout="union"`.
- Hai thẻ SELECT ở cùng hàng, hai cột; không thẻ nào có `data-arrow`. Hai đường SVG bắt đầu ở hai vị trí đầu vào và đi xuống vùng UNION; chỉ thẻ UNION mang mũi tên sang ORDER BY. Không thấy mũi tên nhánh 1 → nhánh 2 trong source hoặc HTML.
- Note luôn hiển thị nói rõ hai đầu vào độc lập, các mũi tên cùng đi vào UNION và chỉ `ORDER BY` cuối câu bảo đảm thứ tự. Nhãn “có” ở cả hai thẻ nguồn tránh ngụ ý 76 dòng là phần còn lại của 9 dòng.
- Bốn panel vẫn dùng owner chung, nút thật, aria-label/aria-controls và drawer hiện có. Không thêm API/schema hoặc drawer riêng trong MDX. CSS mới dùng nền/ink/owner đang có; không thấy thay đổi token hay chức năng lưu nháp/bài tập trong diff này.
- Điều được xác nhận là cấu trúc và ý nghĩa quan hệ trong nguồn/HTML. Chưa nhìn hình trên viewport thật nên không xác nhận khoảng cách, đường kẻ, focus, clipping hoặc khả năng thao tác ở 1280/1440px.

## Kiểm thử reviewer tự chạy

Lệnh tại workspace:

```text
npm test -- tests/run-flow.test.ts tests/components.test.ts
```

Kết quả lúc 23:06:41 ngày 25/10/2026: **2 file đạt, 38 test đạt**; `run-flow.test.ts` 12 test, `components.test.ts` 26 test. Các kiểm dùng dữ liệu giả, gồm thứ hạng UNION trước ORDER BY, quan hệ hai đầu vào không nối nguồn vào nguồn, nhãn “có/có/còn/còn”, bốn panel và các kiểm component hiện có. Không dùng kết quả này để xác nhận số liệu HRM_Demo hoặc cách SQL Server thực thi.

Không chạy `tests/content-3-tail.test.ts` trong lượt này vì test đó dùng `seedRows`; không đọc seed để thay bằng chứng mà gói review cấm. Không chạy cả suite/typecheck/build/check:dist, audit toàn ứng dụng hoặc browser. Các lệnh đọc file/hash đã hoàn tất; không có lỗi nền test trong hai file thực sự chạy. Một phép bóc HTML bằng regex ban đầu bị giới hạn bởi figure lồng nhau; tôi thay bằng parser và kiểm đủ cả bốn panel, không dùng phép bóc thiếu đó làm kết luận.

## Evidence của tác giả, tách khỏi kiểm của reviewer

Root báo đã đối chiếu live SELECT cho chín câu SQL, bốn Result và bốn trạng thái. Tôi **không tự chạy database** và không chạy script xác minh của tác giả.

Sau khi hỏi riêng về câu “Hai lần NV005 ở hai nhánh”, tôi được giao và đã đọc `temp/verification/2026-10-25-union-3-8-recheck/sql-live.log`. Sáu bản ghi tóm tắt trong log cho biết: đơn nghỉ 9 dòng/9 mã; chấm công 76 dòng/40 mã; UNION và bản sắp đều 41 dòng/41 mã; ALL 85 dòng/41 mã; nhãn nguồn 49 cặp. Log ghi `NV005` một lần ở mỗi nguồn, hai lần trong ALL, một lần trong UNION, hai nhãn trong kết quả nguồn.

Như vậy câu “Hai lần NV005” không mâu thuẫn evidence của tác giả và không cần sửa theo nghi ngờ ban đầu. Tôi chỉ đối chiếu nội dung log được giao với source/HTML; đây vẫn là **xác minh SQL do tác giả thực hiện**, không phải kiểm DB độc lập của reviewer. Tôi không suy từ log sáu bản tóm tắt rằng mình đã tự xác minh đủ chín câu SQL hoặc toàn bộ dữ liệu live.

## Findings và kết luận có giới hạn

**Không có finding mới cần sửa trong phạm vi re-review.** R1, R2, R3 đều được xử lý. Bốn drawer phân biệt đúng nguồn, lần xuất hiện, mã không trùng, phần trích và tổng; mô hình logic đứng ngoài drawer, hai nguồn không bị kể thành luồng nối tiếp.

Tiền đề ba đề không đổi và vẫn đủ theo học thử lượt đầu; YAML giữ nguyên hash. Kiểm nguồn, HTML và 38 fake/unit/component tests ở trên hỗ trợ kết luận này. Giao diện tương tác thực tế, clipboard thực tế, các viewport và SQL live vẫn ngoài kiểm độc lập của tôi; phần bằng chứng tác giả đã được ghi riêng. Không dùng kết luận này làm xác nhận đã chạy đủ mục 4.4 hoặc quyền push/deploy.

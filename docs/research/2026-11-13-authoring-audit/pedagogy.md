# Audit sư phạm theo mẫu: 1.1, 2.1, 3.10

Ngày 13/11/2026. Source HEAD `4066c0f3e589c7b34a02106702aa1351cc3ade23`; gói giao cho biết working tree không có thay đổi bài lúc giao. Reviewer Codex được cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; công cụ trong lượt này không xác nhận độc lập model thực tế. Vai người học: chỉ biết Excel văn phòng cơ bản. Đã đọc toàn bộ ba MDX và YAML 2.1/3.10, các khối và drawer trong source; tra các đoạn bài trước theo tiền đề. Không đọc review cũ. Đây là mẫu audit quy trình, không thay review nghiệm thu độc lập từng bài mới.

## Nhận xét theo ưu tiên

1. **Cần làm rõ — 3.10, phần chính, dòng 46–66.** Bài dùng `COUNT(hd.MaHD)` nhưng nói “Đếm mọi dòng `HopDong`” và “ba mã hợp đồng ... cho số 3”. Vì sao đếm mã lại đại diện cho mọi dòng? Bài 3.1 dòng 78 đã dạy `COUNT(cột)` bỏ `NULL`; 3.10 không nối lại điều kiện mỗi dòng hợp đồng có mã khác `NULL`. Người học có thể phân vân giữa đếm dòng và đếm giá trị. Đây là thiếu cầu nối, chưa có căn cứ kết luận số liệu mẫu sai: kiểm ràng buộc/số liệu riêng trước khi khẳng định. Có thể nhắc điều kiện nếu xác minh đúng, hoặc cân nhắc `COUNT(*)` đã học ở 3.1 nếu mục tiêu là đếm mọi dòng; thay câu phải kiểm lại toàn bộ ví dụ.
2. **Cần làm rõ — 1.1, bảng so sánh dòng 37.** “các bảng liên hệ bằng giá trị khóa” xuất hiện trước lời “liên quan qua mã” ở dòng 71. Người mới chưa biết khóa phải đọc qua một thuật ngữ chưa giải nghĩa; chưa cần giảng khóa chính/ngoại ở đây. Một cụm gắn với mã chung giúp hiểu tại chỗ và vẫn dẫn bài 1.4.
3. **Khó đọc / biên tập — 3.10, dòng 68.** Bốn câu liên tiếp đổi từ `SUM`/`MAX`, `NULL`, `COALESCE`, vị trí điều kiện đến `GROUP BY`. Từng ý có ích cho bài tập hoặc lỗi thường gặp, nhưng tập trung ở một đoạn khiến người học khó thấy hai quyết định khác nhau: tính gì và lọc ở đâu. Tách nhịp, gộp ý liên quan; giữ điều kiện phạm vi rỗng và cảnh báo nhóm.
4. **Cần cắt có chọn lọc — 3.10, dòng 56, 192–195, 254–271.** Ý câu con tạo một ô và đếm theo mã được nói ở `LineMap`, lời bước `SELECT` và hai lời tính trong drawer. Giữ hai ví dụ đủ dữ liệu `NV021`/`NV047` vì chúng chứng minh khác biệt 3 và 0; cân nhắc rút câu giải thích giống nhau trong drawer, không bỏ lý do `COUNT` vẫn cho một dòng khi không khớp.
5. **Giữ được — 2.1.** `SELECT`/`FROM`/`AS` có câu lệnh trước `LineMap`, nêu dấu phẩy, thứ tự cột, bí danh không đổi nguồn và giới hạn không lọc dòng. Kết quả trả lời tình huống; lời báo bộ chấm không so tiêu đề ở dòng 152 giúp tránh nhầm “được chấm đúng” với đúng toàn bộ yêu cầu. Chưa thấy lỗi nội dung có đủ căn cứ trong phạm vi đọc.
6. **Giữ được — 3.10.** Câu hỏi “vì sao 0 khác `NULL`?” được trả lời trước phần ôn tại dòng 64–68; `RunFlow` phân biệt bảng trích với tập hợp đồng đầy đủ, không giả dòng cho `NV047`. Phạm vi không suy ra hiệu lực và cảnh báo thứ tự logic không phải thực thi vật lý đều cần giữ. Hai lỗi nhiều cột/nhiều dòng có hậu quả cụ thể. Chưa xác minh số 48, 55, 3 hoặc thông báo lỗi bằng SQL.

## Tiền đề từng câu và đề

“Đủ” nghĩa là tìm thấy kiến thức trong lời giảng trước câu/đề, không phải đã xác minh người học hay bộ chấm thực hiện được. Vị trí bài tập theo ID YAML; tên cột/bảng có thể tra sơ đồ theo hướng dẫn 2.1 dòng 148.

| Câu/đề | Tiền đề và nơi dạy; khoảng trống |
|---|---|
| 1.1 tự kiểm 1: database/DBMS | Định nghĩa phần mở đầu 1.1; đủ. |
| 1.1 tự kiểm 2: quan hệ/NoSQL | Hai nhóm và bảng so sánh 1.1; đủ để trả lời, riêng “giá trị khóa” khó hiểu như nhận xét 2. |
| 1.1 tự kiểm 3: dòng nhân viên/hợp đồng | Phần bảng, dòng, cột 1.1 nêu một người có thể có nhiều hợp đồng; đủ. |
| 1.1 tự kiểm 4: giới hạn workbook | Phần mở đầu và phần bảng 1.1 phân biệt mô hình, tên cột và dòng; đủ. |
| 2.1-1: mọi hợp đồng/mọi cột | 1.1 giải thích bảng hợp đồng; 2.1 phần chính dạy `FROM`, `SELECT *`; đề tự giải thích ý nghĩa `NgayKetThuc` là `NULL` trong mẫu. Đủ, tra tên bảng qua sơ đồ nếu cần. |
| 2.1-2: họ tên, email | 2.1 `LineMap` dạy chọn và thứ tự cột; đề chỉ rõ nguồn/cột, không bắt lọc. Đủ. |
| 2.1-3: đảo thứ tự | 2.1 `LineMap` nói cột hiện theo thứ tự viết; đề chỉ rõ cả ba cột. Đủ. |
| 2.1-4: danh mục, tiêu đề | 2.1 dạy `AS`, ngoặc vuông, thứ tự và tự kiểm tiêu đề; tên nguồn/cột phải tra sơ đồ theo chỉ dẫn, chưa xác minh UI sơ đồ. Không coi đáp án là lời giảng. |
| 3.10 tự kiểm 1: `SELECT` so với `IN` | 3.9 dòng 43 và 3.10 dòng 62–64 giải thích danh sách so với một ô; đủ. |
| 3.10 tự kiểm 2: `NV047` nhận 0 | 3.10 dòng 66 nêu `COUNT` không `GROUP BY` trả một dòng 0; đủ cho trường hợp không khớp. |
| 3.10 tự kiểm 3: bỏ liên hệ | 3.10 `LineMap` và Hay nhầm 3 nêu đếm tất cả nhưng không nhất thiết báo lỗi; đủ. |
| 3.10 tự kiểm 4: cộng và không có dòng | 3.1 dòng 66, 86 và 3.10 dòng 68 dạy `SUM`, điều kiện liên hệ và `NULL`; đủ. |
| 3.10-1: đếm đơn chờ | 3.10 dạy tương quan và đặt điều kiện dòng liên quan trong câu con; 3.1 dòng 78–80 dạy `COUNT(*)` đếm dòng; 1.3/2.2 dạy chuỗi Unicode, 2.3 dạy `AND`, 2.4 sắp xếp. Đủ; đề chỉ rõ trạng thái, không giới hạn ngày. |
| 3.10-2: tổng ngày | 3.10 dòng 68 dạy `SUM` và `NULL`; 3.1 dòng 25, 74–86 và 3.9 dòng 51–59 đã dùng cùng phạm vi trạng thái/ngày, không phân bổ qua tháng. Đủ; đề tự quy định giữ `NULL`. |
| 3.10-3: ngày lớn nhất | 3.1 dòng 86 dạy `MAX` cho ngày và `NULL` khi không dòng; 2.2/2.3 dạy so sánh ngày, 3.10 dạy đặt điều kiện trong câu con. Đề nói rõ không xét hiệu lực. Đủ về cách làm; chưa chạy kiểm kết quả. |

## Ba đề xuất trước/sau để cân nhắc

- **1.1:** Trước: “các bảng liên hệ bằng giá trị khóa”. Sau: “các bảng liên hệ qua giá trị chung, như mã nhân viên; cách xác định và giữ liên hệ học ở bài 1.4”. Người mới có hình dung cụ thể trước khi gặp thuật ngữ khóa; không hứa mã tự bảo đảm liên hệ.
- **2.1:** Trước: “`AS` đặt tiêu đề cho cột trong kết quả”. Sau: “`AS` đặt tiêu đề cho cột kết quả, như `HoTen` hiện thành Họ tên; tên và giá trị trong bảng nguồn giữ nguyên”. Gắn tiêu đề với cột nguồn và phân biệt bản gửi với nguồn ngay ở `LineMap`; nếu áp dụng, rút câu lặp ở đoạn bí danh, vẫn giữ phạm vi bí danh và kiểu dữ liệu không đổi.
- **3.10:** Trước: “Trong câu chính, `COUNT` không có `GROUP BY` nên trả đúng một dòng tổng hợp”. Sau, **nếu kiểm được `MaHD` luôn khác `NULL`**: “`COUNT(hd.MaHD)` đếm mã khác `NULL`; mỗi hợp đồng trong phạm vi đều có mã nên số này bằng số dòng hợp đồng. Không có `GROUP BY`, phép đếm vẫn trả một dòng: không khớp thì nhận `0`.” Cầu nối này giữ phân biệt đếm giá trị với đếm dòng và lý do 0; nếu điều kiện không đúng thì phải chọn cách đếm khác và xác minh lại, không chép giả định thành sự thật.

## Giới hạn

Chỉ review source; không build, render, mở UI, thử drawer/copy hay đối chiếu SQL live, database, API, bộ chấm hoặc tài liệu ngoài khóa học. Dữ liệu và thông báo lỗi trong source là điều bài tuyên bố, chưa phải kết quả tôi chạy. Chưa kiểm toàn bộ bài trước hay đường đi thực hành; các trích dẫn tiền đề chỉ phục vụ từng đề nêu trên. Không có kết luận nghiệm thu, Ready hay quyền push/deploy.

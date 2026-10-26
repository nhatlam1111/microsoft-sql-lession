# Review học thử bài 4.6 — BƯỚC1

**CHƯA XEM ANSWER.** Chỉ đọc đề tại `public-exercises-4-6.json`; chưa mở YAML exercise/answer, API hoặc dist API. Bảng cách làm bên dưới được lập độc lập trước khi đối chiếu đáp án. Dừng tại BƯỚC1, chờ root khóa snapshot và giao tiếp.

## Phiên bản và cách kiểm

- Góc nhìn: người làm Business Consultant muốn đủ hiểu để chuyển sang BA/PM và phản biện developer; nền Excel văn phòng cơ bản, không mặc định biết VLOOKUP/PivotTable.
- Model: kế thừa model của phiên, không đổi model hoặc phân thêm agent.
- Đã đọc `AGENTS.md`, toàn bộ `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1 và toàn bộ các bài 2.5, 2.7, 2.8, 3.3, 3.4, 3.8, 3.10, 4.1. Với spec, chỉ đọc phạm vi/cách thực hiện và mục 4.6; không đọc căn cứ dữ liệu, tiến độ, review hay ma trận của tác giả.
- Nguồn đang giao: `src/content/lessons/4-6-soi-chat-luong-du-lieu.mdx`, SHA-256 `233d9de6c59f27859b732e7e968d39eb11d266dd269eadfad8bca6225f41c60a`, khớp manifest. Không kiểm Git.
- HTML đã đọc: `dist/bai/4-6-soi-chat-luong-du-lieu/index.html`, SHA-256 `0ea68b4e4b0f583ec49dfd554bad5927a1eed8382c9f4ea03d6368bcbe966d13`; mtime 14:36:58 +0700 ngày 26/10/2026, sau source 14:36:21. Nội dung và ba khối SQL quan sát được tương ứng với source; tôi không tự build lại.
- Công cụ thực tế: đọc file bằng shell, đánh số dòng và phân tích HTML bằng Python `html.parser`. Thử import BeautifulSoup không có thư viện nên chuyển sang parser chuẩn; không phải lỗi sản phẩm. Không chạy SQL/API/database/test/browser, không đọc seed/secret hay tài liệu SQL ngoài khóa học.

## Rà theo thứ tự bài

### Tình huống và phần chính — Giữ được

Phạm vi “toàn bộ `NhanVien` và `HopDong` ở mọi trạng thái” được chốt ngay dòng 26. Người học biết đây là luật phục vụ công việc, không tự suy email thiếu là vi phạm ràng buộc bắt buộc. Câu nối Excel–SQL ở dòng 34–36 giải nghĩa Conditional Formatting tại chỗ và giữ giới hạn: thao tác tìm dấu hiệu chưa xác định nguyên nhân hay cách sửa.

Dòng 40–44 giải thích đúng điểm dễ nhầm: một dòng nhóm không phải một hồ sơ; muốn có chi tiết thì dùng CTE chứa nhóm và kết lại `NhanVien`. Lý do bước kết không nhân thêm hồ sơ được nói rõ: mỗi số chỉ có một dòng trong CTE. Đây là hướng dẫn trước phần ôn, không buộc người học lấy answer làm lời giảng.

Dòng 48–56 chốt đủ quy ước thiếu/sai và cách đếm cần cho đề: `NULL` khác chuỗi rỗng; `TRIM` chỉ xử lý dấu cách thông thường; dấu `<` không bắt ngày bằng nhau hoặc `NULL`; cộng cờ để giữ phòng có `0`; ba nhánh `COUNT(*)` không `GROUP BY` để vẫn có dòng khi đếm bằng `0`. Cách đặt mã chữ, alias nhánh đầu và `ORDER BY` cuối đã nối được với bài 3.8.

### Ba câu lệnh và câu trả lời tình huống — Giữ được

Cả ba khối SQL đều có phạm vi và thứ tự dòng phù hợp lời dẫn. Kết quả được giải thích ngay cạnh câu lệnh: `1` nhóm có `2` hồ sơ; `2` hồ sơ thiếu email; `1` hợp đồng có thứ tự ngày đảo. Các con số thống nhất với hồ sơ công ty được giao đọc; đây là đối chiếu tài liệu, **chưa phải xác minh SQL live**. Riêng hai ngày `2025-02-28` và `2025-03-01` tự cho thấy thứ tự đảo như lời giải.

Không thấy lẫn số nhóm với số hồ sơ hoặc biến danh sách dấu hiệu thành kết luận tự sửa/xóa. Ba Result đều hiện đủ số dòng đã khai báo, không có vấn đề lấy bảng trích để suy tổng. Bài không có RunFlow/LineMap/Excel/Ssms/Erd hoặc drawer lý thuyết; không cần yêu cầu thêm các khối ấy chỉ để đủ khuôn.

### Hay nhầm → Ứng dụng → Ghi nhớ → Tự kiểm tra → Bài tập — Giữ được

Thứ tự phù hợp template. Bốn ứng dụng nói rõ việc làm được nhờ chủ đề, nhất là giao bổ sung theo phòng và giữ đơn vị đếm qua các lần lấy dữ liệu. Năm câu tự kiểm tra nằm sau Ghi nhớ, trước Bài tập; đáp án đều đã được giảng ở dòng 40–56, không xuất hiện kiến thức cốt lõi mới ở phần ôn. Bộ câu hỏi bao phủ nhóm/chi tiết, email thiếu, giới hạn luật ngày, giữ số `0` và giới hạn cộng số người.

Mạch bài có bốn tiểu mục chính và ba kiểm độc lập, không rẽ sang xây hệ thống kiểm toán hay chặn ghi. Các lời nhắc xác minh có cùng chủ đề nhưng đang áp vào ba suy luận khác nhau; chưa có câu vòng vo/lặp đủ tác động để đề nghị cắt riêng. Thời lượng `40` phút chưa được đo bằng một buổi học có thực hành.

### Biên tập nhỏ F1

- **Vị trí/câu gốc:** dòng 28 “Dùng SELECT trả ra…” và dòng 103 “Chạy SELECT rồi nghĩ…”.
- **Đánh giá:** Biên tập, không chặn hiểu bài. Hai lần tên lệnh còn ở chữ thường trong khi các đoạn giải thích khác dùng code.
- **Căn cứ/đề xuất:** mục 2.2 quy ước yêu cầu từ khóa SQL dùng code; đổi riêng `SELECT` sang code ở hai vị trí này. Không cần thêm lời giảng.

## Các câu hỏi “tại sao/để làm gì” khi học

| Câu hỏi tự đặt | Bài trả lời ở đâu / còn thiếu gì |
|---|---|
| Vì sao phải chốt luật, không gọi mọi thứ nhìn lạ là lỗi? | Dòng 26, 34–36: luật phục vụ mục đích liên hệ/rá soát; dấu hiệu chưa xác định nguyên nhân. Đủ trong phạm vi bài. |
| Vì sao một nhóm CCCD lại cần quay về hồ sơ? Vì sao kết không làm số hồ sơ tăng thêm? | Dòng 40–44: nhóm gộp nhiều hồ sơ; CTE chỉ có một dòng cho mỗi số rồi kết theo số. Đã trả lời trước bài tập. |
| Vì sao dùng cả `IS NULL` lẫn `TRIM`? Email có chữ đã dùng được chưa? | Dòng 48 và 81: các giá trị thiếu khác nhau, hai dòng mẫu hiện là `NULL`; điều kiện chưa chứng minh địa chỉ nhận thư được. |
| Vì sao ngày bằng nhau/`NULL` không xuất hiện? Có nghĩa là hợp lệ không? | Dòng 50: luật chỉ dùng `<`, so với `NULL` không thành đúng; không mở rộng thành chứng nhận hợp lệ. |
| Vì sao không lọc email thiếu trước rồi đếm theo phòng? | Dòng 52: mất phòng có hồ sơ nhưng không thiếu; phạm vi không hứa tạo phòng chưa có hồ sơ. |
| Vì sao mỗi luật còn một dòng khi số đếm bằng `0`? Vì sao không cộng thành số người? | Dòng 54–56: `COUNT(*)` không nhóm và đơn vị khác nhau/khả năng một hồ sơ khớp nhiều luật. Đã trả lời. |
| Tìm thấy dấu hiệu rồi làm gì, có chặn lần ghi sau không? | Dòng 92–94 và Hay nhầm 3–4: chuyển xác minh, không tự sửa; `SELECT` không tạo luật chặn ghi. |

## Bảng tiền đề và cách làm tự xác định từ đề công khai

**CHƯA XEM ANSWER.** Đây là phương án suy ra từ bài học và các bài trước, không phải SQL đã chạy hoặc lời chép từ đáp án.

| Đề | Cách làm tôi tự xác định | Kiến thức cần | Nơi đã giảng trước phần ôn | Còn thiếu / giới hạn |
|---|---|---|---|---|
| `4-6-1` — Hồ sơ mang số CCCD trùng | Tạo một CTE nhóm mọi `NhanVien` theo `SoCCCD`, giữ nhóm có trên một dòng; kết `NhanVien` với CTE theo số; chỉ chọn mã nhân viên và mã phòng, sắp mã tăng. Không lọc trạng thái, không trả bảng nhóm thay cho chi tiết. | Nhóm và `HAVING`; cú pháp/phạm vi CTE; bí danh và `INNER JOIN`; chọn cột, thứ tự. | 4.6 dòng 40–44; bài 3.3 “Từ Value Filters đến HAVING”; bài 4.1 “Từ vùng Excel trung gian đến CTE”; bài 3.4 “Bí danh giúp nhận ra cột thuộc bảng nào”. | Chưa thấy tiền đề thiếu. Cần tự ráp các kỹ thuật đã giảng; bài đã nói rõ phép kết và lý do không nhân hồ sơ. Chưa kiểm đáp án/kết quả chạy. |
| `4-6-2` — Email thiếu theo từng phòng có hồ sơ | Đọc mọi dòng, nhóm theo mã phòng; mỗi dòng khớp `NULL` hoặc `TRIM` bằng rỗng góp `1`, còn lại góp `0`, cộng thành chỉ tiêu; không lọc thiếu ở `WHERE`; sắp mã phòng tăng. | `NULL`, `OR`, chuỗi rỗng/dấu cách; `TRIM`; `SUM(CASE)`; nhóm và alias chỉ tiêu. | 4.6 dòng 48, 52; bài 2.5 phân biệt các giá trị và `IS NULL`; bài 2.7 giải nghĩa `TRIM`; bài 3.10 “Đếm bằng cách cộng các cờ 1 và 0” và giới hạn nhóm có hồ sơ. | Chưa thấy tiền đề thiếu. Đề nói rõ chỉ các phòng có hồ sơ, nên không cần tự thêm danh mục phòng hoặc `LEFT JOIN`. Chưa kiểm đáp án/kết quả chạy. |
| `4-6-3` — Số dòng cần rà của ba luật | Giữ CTE nhóm trùng; nhánh CCCD đếm hồ sơ sau kết lại, nhánh email đếm hồ sơ khớp luật thiếu, nhánh ngày đếm hợp đồng có thứ tự đảo. Mỗi nhánh trả mã luật được đề cho và một `COUNT(*)`, không nhóm; chồng ba nhánh bằng `UNION ALL`, đặt tên hai cột ở nhánh đầu rồi sắp mã cuối câu. | CTE và kết bảng như đề 1; hai điều kiện thiếu/ngày; đếm tổng không nhóm; chuỗi hằng; cấu trúc các nhánh, alias và thứ tự sau `UNION ALL`; đơn vị đếm. | 4.6 dòng 48–56; bài 4.1 về một câu dùng CTE; bài 3.8 “Cột phải cùng vị trí…” có nhãn cố định, tên cột từ nhánh đầu và `ORDER BY` chung; bài 3.10 về phạm vi tính. | Chưa thấy tiền đề thiếu. Quy tắc trả dòng đếm bằng `0` đã nói trước ôn; không phải suy từ đáp án. Chưa kiểm đáp án/kết quả chạy. |

## HTML, đường thực hành và ưu tiên

HTML có đủ ba nút “Làm bài” trỏ lần lượt tới `/bai/4-6-soi-chat-luong-du-lieu/bai-tap/1/`, `/2/`, `/3/` dưới base của khóa học. Ba khối SQL hiển thị dấu nháy thẳng, xuống dòng thật; chuỗi `data-copy` tương ứng nội dung khối, không thấy backtick hay escape lộ trong phần bài. Các câu này không có dòng tiếp cần thụt một cấp, nên không dùng chúng để xác nhận mốc tab bốn cột.

Đọc thêm đúng phần hướng dẫn công khai của `ExerciseWorkspace.tsx` và `gioi-thieu.astro`: web cần mã từ người phụ trách/người gửi khóa học; chưa có mã thì theo bài 1.2 tạo bản riêng và tự đối chiếu, không có chấm tự động. Không thấy yêu cầu người chọn web phải kết nối SSMS trong phần đã đọc. Điều kiện hoàn thành bài trên HTML là tự viết lại câu lệnh, phù hợp bài truy vấn. Đây chỉ là kiểm nguồn/đích liên kết, chưa chứng minh mở bài, nhập mã, chạy hoặc nộp thành công; không đọc thêm đề từ trang bài tập ngoài JSON whitelist.

**Ưu tiên:** chưa có finding nội dung cần sửa/cần làm rõ để tháo vướng ba đề. F1 là chỉnh định dạng thấp. Bài và các bài nền đã cung cấp cách làm cho ba đề công khai; kết luận này không xác nhận answer YAML, grader, số liệu live hoặc khả năng mọi học viên tự học thành công.

## Giới hạn và cổng dừng

Không mở browser, không có viewport, không thử copy/paste, bàn phím, drawer, SSMS, nhận mã hay chấm bài; không dùng nhãn “Query executed successfully” trong Result làm bằng chứng mình đã chạy SQL. Không kiểm SQL live, kiểu dữ liệu/ràng buộc thực tế hoặc dữ liệu có thay đổi sau build hay không. Không đọc report cũ/ma trận/evidence tác giả, seed/secret, tài liệu SQL ngoài hay bài sau để bù kiến thức.

**CHƯA XEM ANSWER — DỪNG BƯỚC1.** Chờ root khóa snapshot phần này rồi giao followup; chỉ khi đó mới APPEND đối chiếu YAML, không sửa lại phần cách làm độc lập đã khóa.

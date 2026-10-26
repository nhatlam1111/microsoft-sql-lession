# Addendum kiểm bản sửa 4.4

## Phạm vi và phiên bản

Kiểm lại duy nhất finding biên tập của review 4.4: code cho tên hàm/từ khóa ở dòng 70, 87, 149. Không review lại nội dung hoặc mở rộng phạm vi. Reviewer kế thừa model của phiên; chỉ đọc source/HTML/log và ghi addendum này, không sửa sản phẩm hoặc hai report gốc.

- Source đang làm việc: `src/content/lessons/4-4-pivot-xoay-bang.mdx`, LastWriteTime **19:17:29 ngày 26/10/2026**. Đây là bản root vừa sửa sau review; không gán trạng thái hiện tại thành commit `dd67309` chưa sửa.
- HTML đã tự đọc: `dist/bai/4-4-pivot-xoay-bang/index.html`, LastWriteTime **19:18:07 ngày 26/10/2026**, mới hơn source.
- Log đã đọc phần cuối: `temp/verification/2026-10-26-review-4-1-4-6/build-final.log`, LastWriteTime **19:18:07**; ghi `132 page(s) built` và `Complete!`. Đây là log build của root, không phải lệnh build do reviewer chạy.

## Đối chiếu đã làm

| Vị trí source | Bản sửa source | HTML mới | Kết quả |
|---|---|---|---|
| 70 | SUM và PIVOT trong câu đối chiếu CASE đã được bọc code. | Đoạn tương ứng chứa `khớp cách <code>SUM</code> trong <code>PIVOT</code> xử lý ở đây`. | Finding đã xử lý đúng. |
| 87 | PIVOT trong cụm “câu PIVOT bên dưới” đã được bọc code. | Đoạn tương ứng chứa `câu <code>PIVOT</code> bên dưới`. | Finding đã xử lý đúng. |
| 149 | SUM và COUNT trong đáp án tự kiểm tra đã được bọc code. | Đoạn tương ứng có `<code>SUM</code>` và `<code>COUNT</code>`, các giá trị NULL/0 vẫn có code. | Finding đã xử lý đúng. |

Nội dung ba câu vẫn giữ ý nghĩa trước sửa. HTML dùng phần tử code đúng chỗ, không lộ dấu backtick tại ba đoạn đã kiểm. **Không còn nhận xét tồn đọng trong phạm vi bản sửa này và không có finding mới.**

## Công cụ và giới hạn

Thực tế dùng PowerShell/Get-Content/Get-Item và regex để đọc đúng ba dòng source, phần cuối log và ba đoạn HTML tương ứng. Không browser, DB, SQL, API, runner, Git mutation hoặc agent con. Không gọi đây là kiểm UI; chưa xem bố cục bằng mắt hoặc thử tương tác. Root báo SQL/Result/YAML không đổi; addendum này xác nhận riêng phần định dạng source/HTML, không dùng lời báo đó làm kết quả kiểm SQL mới.

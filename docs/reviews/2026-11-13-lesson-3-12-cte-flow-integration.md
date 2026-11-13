# Review tích hợp RunFlow — bài 3.12

## Kết quả

Không thấy finding có căn cứ trong phạm vi được giao. Hai thẻ `CTE` nối tiếp chuyển 9 đơn thành 3 tổng; `FROM` của câu ngoài nhận đúng ba tổng đó, rồi `WHERE`, `SELECT`, `ORDER BY` tiếp tục theo thứ tự. Chú thích phân biệt mũi tên nguồn dữ liệu với cách SQL Server thực thi. Highlight chọn đúng khối CTE và câu ngoài trong source; `splitFocus` mở rộng theo dòng, không phải phân tích cú pháp SQL.

`clauseRank` cho phép nhiều `CTE` cùng hạng trước `FROM` và từ chối `CTE` sau `FROM`; kiểm này không xác minh ngữ nghĩa phụ thuộc giữa các CTE. `inputSteps` chuyển kết quả bước trước, phù hợp chuỗi phụ thuộc cụ thể của bài; không suy ra hỗ trợ mọi đồ thị CTE. `FlowStep.clause` là chuỗi, không có enum schema khác cần mở rộng. Nhánh UNION bốn bước vẫn nhận hai đầu vào độc lập theo source và test hiện có; không thấy thay đổi renderer. Test bài 3.12 kiểm thứ tự, đầu vào và focus, đồng thời đối chiếu fixture; test RunFlow có các trường hợp UNION và kiểm thứ tự cũ.

Source drawer có nhãn nút, `aria-expanded`, `aria-controls`, các panel ẩn, điều hướng trước/sau, Esc và trả focus; bảng có tiêu đề cột. Đây là nhận xét tĩnh, chưa chứng minh hành vi với bàn phím hoặc trình đọc màn hình.

## Bằng chứng và giới hạn

- Đã đọc source, caller, hai file test được giao; đối chiếu SHA-256: `run-flow.ts` là `62144fcced9d9310753e3cfa22c75e34e0ff4afbbaebd9b143d05f35015cdfa8`, HTML là `1fa6604942f7a585fc4c20b0d2f3a3acbcf5f6aeac53871206e7b96c93ea4aec` như gói giao. Chưa đọc HTML để kiểm cấu trúc render.
- 596 tests, check, build/check:dist là kết quả tác giả báo, không phải kiểm độc lập của reviewer. Không chạy test, SQL, API hoặc browser; không xác minh tương tác UI, kết quả SQL live hay mọi sơ đồ cũ. Không review lại nội dung bài hoặc từng đề.
- Reviewer được giao cấu hình `gpt-6.1-terra`, effort `high`, `fork_turns: none`; không có bằng chứng độc lập xác minh model thực tế.

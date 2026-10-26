# Bài 4.1–4.3: tổ chức truy vấn và tính trên từng dòng

- Ngày: 26/10/2026.
- Trạng thái: thiết kế ngắn, chờ người làm khóa học duyệt trước khi viết bài.
- Yêu cầu: tiếp tục ba bài 4.1–4.3; giữ quy ước mỗi bài một branch và quy trình review độc lập của các lượt trước.
- Gốc: `main` tại `0081807f739ce60263fba799de05677b17017931`.
- Tài liệu chi phối: [quy ước](../../quy-uoc.md), [khung bài](../../lesson-template.md), [hồ sơ công ty](../../ho-so-cong-ty.md), mẫu bài 1.1. Dùng bản hiện hành, gồm cập nhật thụt lề SQL, vị trí tự kiểm tra và quy trình review; không dùng bố cục cũ trong spec lịch sử.

## Mục đích và cách thực hiện

Chuyển đúng ba bản tóm tắt hiện có thành bài đầy đủ. Người học đi từ đặt tên cho kết quả truy vấn trung gian bằng CTE, sang đánh số/xếp hạng trong từng nhóm, rồi cộng dồn và so sánh với dòng trước. Đây là phần tiếp nối nội dung trên sản phẩm hiện có; mục tiêu là người chỉ biết Excel văn phòng cơ bản, đã học các bài tiên quyết, hiểu và tự viết được câu SQL.

**Cách được đề xuất:** tiếp tục MDX/YAML và các khối hiện có, triển khai trực tiếp trong phiên, mỗi bài ba bài tập. Cách này giữ mạch và giao diện đã duyệt. Không giữ nguyên bản tóm tắt vì chưa đáp ứng việc viết đầy đủ; không dựng thêm công cụ mô phỏng hoặc thay giao diện vì ba chủ đề đều diễn giải được bằng câu lệnh, bảng kết quả và RunFlow hiện có. Các lựa chọn tình huống dưới đây là đề xuất của tác giả, chưa ghi là người làm khóa học đã chọn.

Không sửa UI, API, bộ chấm, schema nội dung hoặc dữ liệu mẫu; không chuyển hàng loạt bài ngoài 4.1–4.3. Không mở sang CTE đệ quy, bảng tạm, tối ưu kế hoạch thực thi, phân trang, lịch tháng đầy đủ hay các hàm cửa sổ khác. Không coi viết CTE là cam kết chạy nhanh hơn.

## Khung nội dung từng bài

| Bài | Tình huống đề xuất | Kiến thức cần giảng trước phần ôn |
|---|---|---|
| **4.1 — CTE: giải bài toán từng bước** | Chị Hạnh muốn đọc và kiểm một báo cáo qua các kết quả trung gian: lấy đơn đã duyệt bắt đầu tháng 9/2026, cộng SoNgay theo loại, rồi giữ loại có tổng từ 5 ngày. Kết quả chính chỉ gồm LoaiNghi và TongNgay. | Giải thích CTE là tên của kết quả truy vấn dùng trong một câu lệnh; bắt đầu bằng WITH, định nghĩa AS (...), rồi SELECT đọc tên đó. Hai CTE cách nhau bằng dấu phẩy, bước sau tham chiếu bước trước. Kiểm một bước bằng cách thay SELECT cuối trong cả câu WITH, không chạy SELECT thứ hai sau khi phạm vi CTE đã hết. CTE không lưu thành bảng/sheet và không bảo đảm vật chất hóa hay chạy từng bước một lần. |
| **4.2 — Xếp hạng với ROW_NUMBER, RANK** | Chị Hạnh cần một hợp đồng có ngày bắt đầu gần nhất, không sau mốc 21/10/2026, cho mỗi mã nhân viên có hợp đồng. Khi cùng ngày, dùng MaHD giảm dần để chọn nhất quán. | Định nghĩa hàm cửa sổ, OVER, PARTITION BY và ORDER BY trong OVER bằng việc đánh số các dòng còn nguyên. ROW_NUMBER cho số thứ tự riêng trong từng nhóm; dùng CTE để lọc số 1 ở câu ngoài. ORDER BY ngoài cùng vẫn cần để sắp bảng trả về. So sánh ROW_NUMBER, RANK, DENSE_RANK bằng các đơn nghỉ có SoNgay bằng nhau; đồng hạng dựa trên chỉ tiêu, không thêm mã duy nhất vào khóa xếp hạng nếu muốn giữ đồng hạng. Lấy tối đa n dòng khác giữ các hạng đến n. |
| **4.3 — Lũy kế và so với tháng trước** | Chị Hạnh muốn tổng số ngày ghi trên đơn theo tháng bắt đầu trong phạm vi tháng 8–10/2026, cộng dồn và chênh lệch so với dòng tháng trước. Lấy mọi trạng thái đơn, gồm cả chờ duyệt và từ chối. | Dùng EOMONTH đã học ở 2.8 làm khóa tháng, tổng hợp thành một dòng mỗi tháng trước khi tính cửa sổ. SUM(...) OVER với ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW cộng từ dòng đầu tới dòng hiện tại. LAG lấy giá trị ở dòng trước theo thứ tự đã chọn, dòng đầu trả NULL. Dùng CTE đặt tên kết quả LAG rồi mới trừ; PARTITION BY tính riêng từng loại nghỉ. LAG không tự tạo tháng thiếu; muốn chỉ hiện tháng cuối mà giữ kỳ trước/lũy kế, lọc sau bước tính cửa sổ. |

Mạch Excel là những vùng/sheet trung gian, đánh số sau khi sắp, công thức cộng dồn và trừ dòng trên. Giải thích công cụ ngay tại chỗ; không lấy việc người học biết Power Query hoặc RANK.EQ làm tiền đề. Thuật ngữ đã học chỉ nhắc đủ để nối ý.

### Phạm vi và giới hạn phải giữ

- Chị Hạnh vẫn là người hỏi; câu chuyện tháng 10/2026, ngày chốt của ví dụ hợp đồng cố định. Hợp đồng mới nhất theo ngày bắt đầu đã lưu không đồng nghĩa còn hiệu lực hoặc hợp lệ pháp lý. Không lọc trạng thái nhân viên trong ví dụ này; mã chưa có hợp đồng không tự có dòng để đánh số. Không sửa lỗi hợp đồng cài sẵn.
- Tổng ngày đơn nghỉ luôn nói rõ lấy theo TuNgay và cộng nguyên SoNgay. Đặc biệt 4.3 lấy mọi trạng thái để báo cáo số ngày trên các đơn đang lưu, không gọi đó là ngày đã nghỉ, ngày đã duyệt hoặc số ngày thực nghỉ trong tháng; không bảo đảm dữ liệu đã đầy đủ cho cả kỳ.
- Dòng đầu không có giá trị kỳ trước thì giữ NULL cho kỳ trước và chênh lệch, không tự coi kỳ trước là số 0. Nếu thiếu tháng, LAG trả dòng có sẵn trước đó; không gọi mặc nhiên là tháng lịch liền trước.
- ROW_NUMBER chọn dòng ổn định bằng khóa phụ duy nhất trong phạm vi; RANK/DENSE_RANK giữ đồng hạng theo SoNgay. Khóa phụ sắp kết quả ngoài không được vô tình phá đồng hạng trong OVER.
- Câu bài tập bắt đầu bằng WITH hoặc SELECT, chỉ một statement theo bộ chặn đang có. Dấu chấm phẩy ở cuối câu; hướng dẫn SSMS chỉ nói điều kiện kết thúc câu trước khi viết WITH, không đổi API để nhận thêm statement hoặc thêm dấu chấm phẩy đầu câu.

### Bằng chứng nguồn đã xem khi lập khung

Đối chiếu script hiện tại, **chưa phải thực thi SQL Server**: tháng 9 có 9 đơn đã duyệt; tổng theo loại là Phép năm 9, Nghỉ ốm 5, Việc riêng 2, phù hợp luồng 9 dòng → 3 nhóm → 2 loại đạt ngưỡng của 4.1. Có 55 dòng hợp đồng không sau mốc 21/10, thuộc 46 mã nhân viên; phép chọn mới nhất dự kiến trả 46 dòng. Dữ liệu đơn mọi trạng thái theo tháng bắt đầu cho tổng 14, 20, 11 ở tháng 8, 9, 10; lũy kế dự kiến 14, 34, 45, chênh lệch NULL, 6, -9. Đơn Phép năm có các mức SoNgay lặp để kiểm đồng hạng thật trong bộ mẫu.

Mọi bảng kết quả cuối cùng và câu kiểm vẫn phải được đối chiếu lại trong lượt triển khai; không lấy các con số trong thiết kế làm bằng chứng đã chạy live.

## Ba bài tập cho mỗi bài

| Bài | Bài tập 1 | Bài tập 2 | Bài tập 3 |
|---|---|---|---|
| **4.1** | Dùng CTE tổng hợp đơn đã duyệt bắt đầu tháng 8 theo loại, lọc tổng ngày từ 2 trở lên. | Dùng CTE đếm hồ sơ đang làm theo phòng, giữ phòng có từ 8 hồ sơ. | Tổ chức kết quả đếm hợp đồng theo MaNV và chọn các mã có từ hai hợp đồng; đọc toàn bộ hợp đồng, không tự suy ra hiệu lực. |
| **4.2** | Đánh số các đơn chờ duyệt, bắt đầu lại theo từng LoaiNghi, xếp SoNgay giảm dần rồi MaDon tăng dần. | Tính RANK và DENSE_RANK cho mọi đơn Phép năm theo SoNgay; giữ đồng hạng, sắp bảng ngoài theo số ngày và mã. | Dùng ROW_NUMBER và CTE lấy tối đa ba đơn của mỗi loại ở mọi trạng thái; dữ liệu có đồng hạng ở điểm cắt để phân biệt với lọc RANK. |
| **4.3** | Tính tổng và lũy kế theo tháng bắt đầu, chỉ trên các đơn Phép năm ở mọi trạng thái. | Tính lũy kế riêng từng LoaiNghi theo các tháng có dữ liệu; không tự thêm tháng hoặc gán ngày thiếu bằng 0. | Chỉ hiển thị tháng 10, nhưng phải lấy kỳ trước và lũy kế sau khi tính trên toàn phạm vi tháng 8–10. |

Đề sẽ nêu rõ cột theo thứ tự, cách sắp và điều kiện biên. Bài giảng phải cung cấp đủ tiền đề cho từng đề trước Memo; tự kiểm tra chỉ ôn. Không biến answer thành lời dạy. Bộ chấm hiện có vẫn so kết quả, không bắt buộc CTE hay một cú pháp duy nhất; phần Bài tập nói rõ cần tự đối chiếu kỹ thuật đang học. Kiểm cả ví dụ của ba bài với các bài tập để không có câu minh họa nộp nguyên vẹn được.

## Bố cục và RunFlow

Giữ sáu mục cấp hai, Excel/SQL trong cùng phần chính, khoảng 2–4 tiểu mục theo chủ đề. Tình huống được khép ngay cạnh câu lệnh/kết quả. Tự kiểm tra nằm sau Ghi nhớ và trước Bài tập; đáp án đều đã được giảng. Thời lượng dự kiến 4.1 khoảng 25–30 phút, 4.2 khoảng 30–35 phút, 4.3 khoảng 30 phút gồm thực hành; điều chỉnh theo bản thật.

Dùng Result để xem các kết quả có tên. Nếu dùng RunFlow, nó chỉ diễn giải thứ tự logic của SELECT ngoài sau khi đã giới thiệu ý nghĩa các CTE; không sáng tác bước WITH/CTE hay vẽ một dây chuyền vật chất hóa. Các câu kiểm phải có đủ WITH tương ứng để chạy độc lập. Dùng bí danh nguồn ở SELECT/ORDER BY ngoài để focus không trùng nhầm đoạn SELECT/ORDER BY bên trong CTE hoặc OVER. Không cần sửa component hoặc bộ kiểm flow cho lượt này.

SQL theo mốc thụt lề bốn cột: escape \t trong MDX, CASE lùi hai cấp khi cần; query/focus/sql khớp cả khoảng trắng. Kiểm bản build, nháy thẳng, thao tác sao chép/dán và bản nháp trong editor nếu có công cụ. Không gọi kiểm nguồn hoặc đọc HTML là đã kiểm tương tác.

## Branch, review và bàn giao

Các branch nối tiếp, để bài sau có đủ bài tiên quyết:

1. `codex/lesson-4-1-full` từ main 0081807.
2. `codex/lesson-4-2-full` từ commit hoàn tất 4.1.
3. `codex/lesson-4-3-full` từ commit hoàn tất 4.2.

Mỗi bài cập nhật MDX/YAML, mục prerequisite/goal/minutes, trạng thái full và test dữ liệu có ý nghĩa, README, hồ sơ công ty, spec/plan tương ứng. Không thêm trường schema hoặc nới kiểm tra để che lỗi. Chốt commit local sau khi xử lý review và kiểm lại. Không push, merge main hoặc deploy trong lượt soạn bài; thao tác ra ngoài theo xác nhận riêng của người làm khóa học.

Sau mỗi bài, giao agent mới review theo đúng mục 4.5: giữ model của phiên, không mang ngữ cảnh tác giả, không đọc seed/secret/tài liệu SQL ngoài khóa học và không chạy SQL/API. Gói giao ghi đúng source/build, phạm vi, quyết định đã duyệt, phương thức kiểm và report mới. Reviewer lập bảng tiền đề cho từng bài tập, đọc đề và xác định cách làm trước khi đối chiếu answer, đọc đủ các panel nhưng không dùng chúng như chứng cứ chạy SQL thật. Sau ba bài có agent mới review tích hợp; tác giả xử lý cả các phần reviewer chưa kết luận.

Tác giả đọc toàn bộ report trước khi sửa, kiểm kỹ thuật bằng nguồn script, SELECT trên database khi có kết nối và tài liệu Microsoft; ghi ma trận Làm theo/Làm một phần/Không làm theo cho từng nhận xét, gồm cả mục nhỏ có căn cứ. Giữ report gốc và bản sao hồ sơ; bàn giao link bài, report, ma trận và kết quả kiểm thực tế. Ready không thay bằng chứng hoặc quyền push.

Chạy các kiểm web/API theo mục 4.4. Ở phiên lập khung chưa có công cụ SQL trực tiếp và bốn biến SQL_SERVER/DATABASE/USER/PASSWORD đều chưa đặt; kiểm live còn phụ thuộc kết nối khả dụng khi triển khai. Kiểm nguồn, HTML, UI, SQL live và lỗi nền phải ghi riêng; phần chưa kiểm không đánh dấu đạt. Không in/commit secret hoặc đổi dữ liệu dùng chung. Sau khi thiết kế được duyệt, lập kế hoạch rồi triển khai trực tiếp, không cần hỏi lại phương thức đã nêu ở đây.

## Nguồn kỹ thuật dùng để chốt giới hạn

- [CTE](https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql?view=sql-server-ver17).
- [ROW_NUMBER](https://learn.microsoft.com/en-us/sql/t-sql/functions/row-number-transact-sql?view=sql-server-ver16), [RANK](https://learn.microsoft.com/en-us/sql/t-sql/functions/rank-transact-sql?view=sql-server-ver16), [DENSE_RANK](https://learn.microsoft.com/en-us/sql/t-sql/functions/dense-rank-transact-sql?view=sql-server-ver17).
- [OVER và khung ROWS](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?view=sql-server-ver16), [LAG](https://learn.microsoft.com/en-us/sql/t-sql/functions/lag-transact-sql?view=sql-server-ver16).

Các liên kết Microsoft là căn cứ ngữ nghĩa, không xác nhận câu của khóa học đã chạy đúng trên database thật.

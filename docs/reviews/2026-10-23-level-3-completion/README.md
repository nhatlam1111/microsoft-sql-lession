# Review và hoàn thiện bài 3.1–3.3

Ngày 23/10/2026, theo yêu cầu “review và hoàn thiện các bài từ 3.1 - 3.3 trên nhánh riêng, sau đó đưa vào main”. Nhánh thực hiện: `codex/review-lessons-3-1-3-3`, tạo từ `origin/main` tại `0f1963a`; thu thập ba nhánh nối tiếp tới `335540d`, giữ lịch sử các commit tác giả `8018d7d` → `7e43b58` → `335540d`.

Mỗi bài được một agent Codex mới học thử độc lập, không mang lịch sử viết, không đọc spec/plan/report cũ hoặc seed. Reviewer kế thừa model của phiên, không truyền model override và không đoán tên model. Người thực hiện đọc đầy đủ report, đối chiếu script, SQL Server thật và tài liệu Microsoft trước khi sửa. Một agent mới khác kiểm tích hợp cuối.

| Bài | Report lượt này | Đã sửa |
|---|---|---|
| 3.1 | [COUNT/SUM/AVG/MIN/MAX](review-bai-3-1-count-sum-avg.md) | Làm rõ bảng chi tiết FROM trích 10/20 đơn, WHERE hiện đủ chín đơn; giữ tình huống, câu SQL và bài tập. |
| 3.2 | [GROUP BY](review-bai-3-2-group-by-pivottable.md) | Thêm một câu: khi nhóm theo một cột có NULL, các dòng NULL thuộc cùng một nhóm; rút vế nhắc lại việc đếm cả phạm vi. |
| 3.3 | [HAVING](review-bai-3-3-having-loc-sau-khi-gop.md) | Cắt vế lặp sau bảng so sánh; giữ hệ quả HAVING loại nhóm mà không tính lại số hồ sơ. |

[Review tích hợp cuối](review-integration.md) không tìm thấy lỗi cần chặn; ba chỉnh sửa giữ đủ điều kiện và helper Windows không nới kiểm nội dung. Các report là kết quả học thử tĩnh; kiểm live/UI bên dưới do người thực hiện chạy riêng.

## Bằng chứng kiểm tra

- **267/267 test, 38 file**; Astro check **0 lỗi, 0 warning**, còn ba hint deprecation đã có. Build **99 trang**, check:dist **1.651 liên kết**, không lộ đáp án. API build/typecheck đạt, **45/45** đáp án chạy thành công trên SQL Server thật.
- Lỗi đầu lượt: **266/267** đạt vì test 3.1 so query CRLF với literal JavaScript đã chuẩn hóa LF. Sửa riêng `tests/helpers/lesson-blocks.ts` để chuẩn hóa xuống dòng như MDX/JavaScript; SQL, các số liệu, assertion và code sản phẩm giữ nguyên. Ba test file mới đạt **9/9** sau sửa, toàn suite đạt như trên.
- Bộ kiểm live riêng chạy **23 SELECT khác nhau**: toàn bộ năm khối SQL, năm Result và **14 bước RunFlow**, kèm các ca NULL/0, toàn NULL, chuỗi rỗng, AVG số nguyên/thập phân, nhóm NULL, nhóm rỗng và WHERE so với HAVING. Cột/giá trị/tổng dòng/thứ tự đã khớp. Ba hình Excel, **46 ô sau hàng tiêu đề**, đối chiếu được với dữ liệu live và các phép tính tổng cộng.
- Schema live xác nhận `DonNghiPhep.SoNgay` là `decimal(4,1) NOT NULL`; `NhanVien.Email` nhận NULL, `MaNV`/`MaPB` không nhận NULL. Phép AVG minh họa xác nhận chuyển đầu vào sang decimal giữ phần lẻ; chuyển kết quả AVG của int không lấy lại phần đã mất. Hai dòng khóa NULL được gom chung, trong khi COUNT(khóa) của nhóm đó bằng 0.
- Qua `handleGrade` và SQL Server thật, **18 bài làm sai tiêu biểu đều bị bác**: đếm email bằng COUNT(*), lọc mất email thiếu trước khi đếm hồ sơ, bỏ trạng thái, nhầm tháng, cắt bình quân về số nguyên, đổi SQL NULL thành số 0/chữ NULL, GROUP BY trên tập rỗng, nhóm sai phạm vi/chỉ tiêu và đổi các biên HAVING. Lời giải chuẩn 3.1 trả 1/1/1 dòng, 3.2 trả 6/8/3 dòng, 3.3 trả 3/2/6 dòng.
- `check:exercises` dùng runner giao dịch luôn hoàn tác; các câu ghi của bài cũ chỉ qua luồng đó. `check:data` sau kiểm báo **Không bảng nào lệch**. Các truy vấn kiểm riêng chỉ là SELECT; không đổi database dùng chung.
- Browser bản build ở **1280px và 1440px**: mục lục, ba hình Excel, bảng so sánh, code/highlight và kết quả đọc được, không tràn trang. Đã mở/đóng đủ **14 drawer bằng Enter/Escape**, trả đúng focus và không lộ backtick; sáu câu tự kiểm mở bằng Enter/Space. Link bài tập, Tab thụt dòng trong editor và sơ đồ database dùng được bằng bàn phím. Không nhập mã truy cập hay thực thi SQL từ browser; bằng chứng chấm live lấy qua core API/runner trên máy.
- Đối chiếu bố cục bài 2.9 với các bài mới: giữ cùng typography, chiều rộng đọc và điều hướng. Mindmap bản build hiển thị bình thường; mở nhóm Tổng hợp và phân tích bằng Enter thấy đủ liên kết 3.1/3.2/3.3 và các đường nối, đã xem ảnh chụp.

Evidence local: `temp/verification/2026-10-23-level-3-review/`. Không commit cấu hình kết nối hoặc mã truy cập. Các báo cáo cũ ghi thiếu môi trường được giữ nguyên như lịch sử; lượt này bổ sung kiểm SQL Server và browser thật.

## Quyết định giữ và giới hạn

- Giữ ba bài tập đại diện mỗi bài. Ca rỗng của 3.1 không phân biệt được đổi vị trí SUM/AVG/MIN/MAX khi tất cả đều NULL; bài 2 dùng tập có dữ liệu để bổ sung. Bài 3.3 chưa có trường hợp hòa chỉ tiêu để kiểm hết tiêu chí sắp phụ. Không thay seed hoặc cưỡng chế cú pháp để bắt mọi cách viết cho cùng kết quả.
- Giữ phạm vi nghỉ phép theo **TuNgay**, cộng toàn bộ SoNgay của đơn; không đổi thành ngày thực nghỉ nằm trong tháng. Nhân viên được nhóm theo phòng/trạng thái hiện lưu, không dựng lịch sử.
- Không sửa UI/API/grader/schema/quy ước hoặc các bài ngoài 3.1–3.3. Hình Excel là mô phỏng, không điều khiển Excel thật. Thời lượng vẫn là ước lượng, chưa đo bằng phiên học của học viên.
- Audit tĩnh Frontend Design Premium ở chế độ strict trả **exit 1**, có hai finding trên component có sẵn ngoài diff. `form.novalidate-missing` ở form mã truy cập: chưa khai báo noValidate; input không có constraint native và form đã có handler, chưa thấy lỗi tương tác liên quan ở lượt này. `form.textarea-resize-missing` là cảnh báo tĩnh thiếu căn cứ: CSS hiện có `.ed-input { resize: none; }`; browser xác nhận computed resize là `none` ở cả ba trang bài tập. Không gọi audit này là đạt và không mở rộng đợt sửa bài thành thay đổi component chung.
- Lượt kiểm browser tập trung phần bài học mới; không phải một audit đầy đủ mọi trạng thái mạng, đăng nhập, 200% zoom hoặc thiết bị di động của sản phẩm. `DESIGN.md` và các component hiện hành được giữ nguyên.

Nguồn ngữ nghĩa đã đối chiếu: Microsoft Learn về [AVG](https://learn.microsoft.com/en-us/sql/t-sql/functions/avg-transact-sql), [COUNT](https://learn.microsoft.com/en-us/sql/t-sql/functions/count-transact-sql), [GROUP BY](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql) và [HAVING](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-having-transact-sql). Các số liệu trong báo cáo này có thêm bằng chứng thực thi live, không suy từ tài liệu thành kết quả database.

## Nhập main và xuất bản

- Nhánh review đã push tại `98cf19c`; fetch trước nhập xác nhận main vẫn là `0f1963a`. Merge không force thành `973994c`, cây sản phẩm trùng nhánh review; toàn bộ 267 test đạt trên cây đã nhập. Push main và đối chiếu SHA remote thành công, không có xung đột hoặc thay đổi người dùng bị ghi đè.
- Với SHA đầy đủ `973994cdd77d8b49e0b8556235b250ab5b0c1531`, [Deploy to GitHub Pages](https://github.com/nhatlam1111/microsoft-sql-lession/actions/runs/39984684083) và [Deploy the exercise API](https://github.com/nhatlam1111/microsoft-sql-lession/actions/runs/39984684535) đều **success**. API đã qua bước kiểm ping không mã trả 401; đây là kiểm health, không phải nộp một bài làm qua browser.
- Browser công khai xác nhận [3.1](https://nhatlam1111.github.io/microsoft-sql-lession/bai/3-1-count-sum-avg/), [3.2](https://nhatlam1111.github.io/microsoft-sql-lession/bai/3-2-group-by-pivottable/) và [3.3](https://nhatlam1111.github.io/microsoft-sql-lession/bai/3-3-having-loc-sau-khi-gop/) có câu sửa mới, đủ sáu mục và ba liên kết bài tập mỗi bài. Đã xem và lưu ảnh `published-3-2.png` trong thư mục evidence local. Không dùng số liệu CI để thay kiểm SQL Server độc lập ở trên.
- Commit hồ sơ sau bước này chỉ ghi kết quả thực tế và hoàn tất checkbox của plan; giữ nguyên source/YAML đã kiểm và giữ các nhánh để tra lại.

# Review độc lập bài 3.2 — GROUP BY: PivotTable bằng SQL

Ngày review: 23/10/2026. Công cụ: Codex; model kế thừa model của phiên, không chỉ định model khác. Vai học thử: Business Consultant khó tính, muốn học đủ để hiểu và phản biện yêu cầu dữ liệu khi chuyển sang BA/PM.

Phạm vi: toàn bộ MDX, YAML ba bài tập, các kiểm thử liên quan và HTML đã build của bài 3.2 cùng ba trang bài tập. Không đọc spec/plan, nhật ký tác giả, review cũ hoặc seed database; không dùng database, API, browser hay tài liệu ngoài. Không sửa sản phẩm, test hoặc tài liệu nội dung. Phần kiểm trực tiếp UI/live do người điều phối thực hiện riêng.

## 1. Mục tiêu, tiêu đề và độ sâu — Giữ được

**Câu gốc:** `goal: bạn tổng hợp theo một hoặc nhiều cột nhóm và sắp xếp báo cáo đúng yêu cầu`; `minutes: 20`; “GROUP BY: PivotTable bằng SQL”.

**Tự hỏi:** Học bài này để làm được việc gì mới sau bài 3.1? **Bài đã trả lời:** từ một kết quả cho cả phạm vi sang tính riêng từng nhóm, chọn một hay nhiều cột nhóm và sắp báo cáo. Phần giảng, ví dụ KD, câu tình huống và ba bài tập đều bám vào mục tiêu này.

**Lý do/đề xuất:** Giữ bốn tiểu mục của phần chính. Mạch Excel → nhóm SQL → tổ hợp nhiều cột → lời giải → RunFlow đúng khung hiện hành, không cần tách lại Excel/SQL. Hai mươi phút là ước lượng hợp lý để đọc và làm ba bài; đây không phải kết quả đo thời gian người học thực tế. Không có nhu cầu thêm JOIN, truy vấn con, window hay COUNT có CASE.

## 2. Tình huống và phạm vi hiện tại — Giữ được

**Câu gốc, MDX 21–26:** “Em đếm giúp chị số hồ sơ đang làm theo từng mã phòng nhé”; “Phân phòng theo `MaPB` hiện tại, không suy ngược phòng của nhân viên ở tháng trước. Một hồ sơ là một dòng trong bảng có khóa chính `MaNV`.”

**Tự hỏi:** Đếm người, đếm dòng hay đếm hồ sơ? Đang làm tại thời điểm nào và phòng hiện tại hay phòng trong kỳ trước? **Bài đã trả lời:** đếm các dòng hồ sơ đang lưu có đúng trạng thái được nêu; không dựng lại lịch sử phòng ban. Điều này khớp hồ sơ công ty vốn không lưu lịch sử chuyển phòng.

**Lý do/đề xuất:** Giữ. Yêu cầu chỉ cần mã phòng và số hồ sơ cũng giải thích được vì sao không lấy tên phòng hoặc họ tên. Không thấy tình huống bị lẫn với một báo cáo nhân sự lịch sử hay báo cáo thiếu người.

## 3. PivotTable và hình Excel — Giữ được; hình ảnh cần kiểm live riêng

**Câu gốc, MDX 32–43:** đưa trạng thái vào Filters, chọn `Đang làm`, đưa mã phòng vào Rows và mã nhân viên vào Values, chọn Count; “Các ô được đánh dấu là mã `KD` ở `A2`, số hồ sơ của phòng ở `B2` và tổng cộng ở `B8`; tổng cộng không phải một phòng.”

**Tự hỏi:** Tại sao đếm mã nhân viên, vì sao có dòng Grand Total, và hình đang chỉ vào đâu? **Bài đã trả lời:** Count là phép tổng hợp cần cho số hồ sơ; tổng cộng được gọi rõ là tổng chứ không phải phòng thứ bảy. Mã nhân viên không thiếu khi là khóa chính, phù hợp kiến thức đã học về COUNT/đếm giá trị ở 3.1.

**Lý do/đề xuất:** Giữ. Đây là hình minh họa phần kết quả, không giả là toàn bộ thao tác Excel. Đối chiếu HTML thấy `xl-mark` đúng ở `KD`, `13`, `45`, `B2` đồng thời có lớp chọn và căn số; ô tổng là hàng 8. Chưa quan sát màu, cắt chữ, cuộn hoặc kích thước màn hình, nên không kết luận visual QA đã đạt.

## 4. Khái niệm GROUP BY, khóa nhóm và vị trí mệnh đề — Giữ được

**Câu gốc, MDX 45–47:** “`GROUP BY MaPB` gom những hồ sơ cùng mã phòng; `COUNT(*)` đếm trong từng nhóm, thay cho đếm cả phạm vi như bài 3.1”; “`MaPB` là **khóa nhóm**: giá trị dùng để xác định hồ sơ nào thuộc cùng một nhóm.”

**Tự hỏi:** Tại sao thêm GROUP BY, có phải nó tự đếm không, và đặt ở đâu? **Bài đã trả lời:** GROUP BY xác định nhóm, hàm tổng hợp tính chỉ tiêu; vị trí viết được nêu ngay sau đó, cùng đối chiếu Rows/Values. Không đồng nhất GROUP BY với hàm COUNT.

**Lý do/đề xuất:** Giữ. “Sau `WHERE` và trước `ORDER BY`” được đọc trong câu đang có đủ các phần đó; bài tập 2 cho thấy có thể nhóm toàn bộ bảng không có WHERE, phù hợp kiến thức lọc tùy yêu cầu từ các bài trước. Không cần thêm một bảng cú pháp riêng. Những khái niệm mới được nhấn đậm, tên cột và biểu thức có kiểu code đúng trong HTML.

## 5. Nhóm không có hồ sơ, tập rỗng và tổng cộng — Giữ được

**Câu gốc, MDX 49:** “`GROUP BY MaPB` chỉ trả các mã có hồ sơ trong phạm vi đã lọc; nó không tự tạo một dòng số `0` cho phòng không có hồ sơ phù hợp”; “câu `GROUP BY` thông thường dưới đây chỉ có các dòng phòng, không tự thêm dòng tổng cộng.”

**Tự hỏi:** Phòng không có ai qua bộ lọc có hiện 0 không? Cả phạm vi rỗng thì có còn dòng đếm 0 như bài 3.1 không? **Bài trả lời câu đầu trực tiếp**, và nguyên tắc chỉ tạo nhóm từ dòng còn lại đủ để suy ra không có dòng nào thì không có nhóm nào. Câu tự kiểm tra cuối bài củng cố chính ý này. Bài 3.1 đã khoanh rõ quy tắc một dòng với COUNT = 0 chỉ áp dụng khi không GROUP BY.

**Lý do/đề xuất:** Giữ; không cần dạy trước cách giữ phòng rỗng bằng kết bảng. Phân biệt Grand Total của hình Excel với các dòng phòng SQL giúp tránh cộng lại một dòng tổng vào tổng chung. Không thấy bài đang hứa luôn trả đủ danh mục phòng.

## 6. NULL trong khóa nhóm còn là một câu hỏi chưa được trả lời — Cần làm rõ, mức nhỏ

**Câu gốc làm phát sinh câu hỏi, MDX 45:** “gom những hồ sơ cùng mã phòng”; bài 3.1 vừa dạy “`SUM`, `AVG`, `MIN`, `MAX` bỏ qua `NULL`”. Bài 3.2 hiện không có câu nói về NULL ở cột dùng làm khóa nhóm.

**Tự hỏi:** Nếu chọn một cột nhóm có NULL, các dòng đó bị loại, thành nhiều nhóm hay thành một nhóm? NULL trong khóa nhóm có cùng vai trò với NULL trong cột đem cộng không? **Bài chưa trả lời.** Ví dụ và bài tập hiện tại không yêu cầu xử lý tình huống này, nên đây không phải lỗi trong các kết quả đang trình bày.

**Lý do/đề xuất:** Người học vừa học quy tắc bỏ NULL của các hàm tổng hợp có thể mang nhầm quy tắc đó sang bước gom nhóm. Có thể thêm đúng một câu cạnh định nghĩa, sau khi người viết xác minh: “Nếu cột làm khóa nhóm có `NULL`, các dòng mang `NULL` được gom thành một nhóm.” Không cần thêm ví dụ SQL, bài tập hoặc nhánh JOIN; không biến phần này thành bài NULL thứ hai. Đây là đề xuất làm rõ kiến thức tổng quát, không phải kết luận đã chạy kiểm được một nhóm NULL trên database khóa học.

## 7. Khóa nhóm nhiều cột và ví dụ KD — Giữ được

**Câu gốc, MDX 53–66:** “Đây là phạm vi khác với tình huống đang làm ở đầu bài”; “Chỉ nhóm theo `MaPB` trên phạm vi này thì có một nhóm `KD` với `14` hồ sơ; nhóm thêm `TrangThai` cho hai tổ hợp, nên thành hai dòng `13` và `1`.”

**Tự hỏi:** Vì sao cùng là KD mà từ một dòng thành hai? Có sao chép tổng phòng vào mỗi trạng thái không? **Bài đã trả lời:** nhóm được xác định bởi cả tổ hợp phòng/trạng thái, và tính lại số hồ sơ của từng tổ hợp. Bộ lọc chỉ chọn KD, giữ cả hai trạng thái nên đúng mục đích quan sát việc chia tiếp nhóm.

**Lý do/đề xuất:** Giữ. Kết quả KD đang làm 13, đã nghỉ 1 khớp hồ sơ công ty; tổng 14 khớp phần tổ chức. Câu SQL có đủ hai cột nhóm và ORDER BY số lượng. Hai giá trị 13/1 khác nhau nên thứ tự của hình không thiếu tiêu chí phá hòa trong dữ liệu ví dụ hiện có. Không cần đổi ví dụ thành toàn công ty; bài tập 2 đã buộc áp dụng tổ hợp trên mọi phòng.

## 8. Cột SELECT phải phù hợp mức nhóm — Giữ được

**Câu gốc, MDX 68:** “cột lấy trực tiếp từ bảng trong `SELECT`, nếu không nằm trong hàm tổng hợp, phải có trong `GROUP BY`”; “Không đưa tùy ý `HoTen` vào một dòng đại diện cả phòng, vì một phòng có nhiều họ tên mà câu lệnh chưa nói phải chọn tên nào.”

**Tự hỏi:** Vì sao không thể mang thêm họ tên cho dễ đối chiếu? **Bài đã trả lời bằng ý nghĩa dòng kết quả**, không chỉ đưa ra luật cú pháp. Phạm vi “lấy trực tiếp từ bảng” và “cách nhóm theo cột trong bài này” đủ chặt, tránh kéo theo biểu thức hoặc cú pháp nhóm nâng cao.

**Lý do/đề xuất:** Giữ, nhất là câu giải thích bằng họ tên. Hay nhầm 1 sau đó chỉ rõ cái giá của cách chữa lỗi bằng thêm MaNV: đổi báo cáo phòng thành từng hồ sơ. Không cần thêm nguyên văn lỗi SQL để người học hiểu điểm này.

## 9. Câu tình huống, alias, thứ tự và lời trả lời — Giữ được

**Câu gốc, MDX 74–91:** “`SoHoSo` là alias của `COUNT(*)`”; `ORDER BY [SoHoSo] DESC, MaPB ASC`; “Chị Hạnh nhận `6` dòng phòng; `KD` có nhiều hồ sơ đang làm nhất với `13`. Cộng sáu số lượng được `45`…”

**Tự hỏi:** Vì sao xếp được bằng một tên không có trong bảng? Nếu hai phòng bằng số lượng thì sao? Kết quả đã trả đúng câu hỏi công việc chưa? **Bài đã trả lời:** alias đã học ở 2.1 được dùng để sắp, hai tiêu chí và hướng được nói rõ, lời trả lời nằm sát kết quả. Cơ sở dùng alias ở ORDER BY có ở bài 2.4 và được giải thích lại trong RunFlow.

**Lý do/đề xuất:** Giữ. Sáu số 13, 10, 8, 7, 5, 2 cộng 45 và khớp bảng tổ chức; không lẫn 48 hồ sơ toàn bộ. Không có hai phòng bằng số lượng trong ví dụ chính, nhưng điều kiện phá hòa vẫn đúng yêu cầu. Lời trả lời không nhảy từ số hồ sơ sang kết luận tuyển người hoặc đánh giá năng suất.

## 10. RunFlow đủ năm bước và giới hạn mô hình — Giữ được

**Câu gốc, MDX 95:** “các câu này không phải những lệnh SQL Server tự chạy nối tiếp”; “Trước `ORDER BY`, thứ tự dòng có thể khác hình; sơ đồ không mô tả cách thực thi vật lý.” Drawer GROUP BY: “Câu kiểm dùng `SELECT` để hiện kích thước nhóm”; drawer SELECT: alias “được tạo ở đây”.

**Tự hỏi:** Sao GROUP BY đã có SoHoSo trước khi đến SELECT? Có phải SQL Server thật sự chạy lại năm câu? Có thể tin thứ tự trong hình ở giữa không? **Bài đã trả lời đủ để hiểu đây là các câu xem trạng thái**, không phải bản ghi thực thi; chi tiết ở GROUP BY trực tiếp giải thích vì sao bảng xem có phép đếm và alias. Dùng cùng câu kiểm ở GROUP BY và SELECT không tự nó là lỗi.

**Lý do/đề xuất:** Giữ. FROM 48 → WHERE 45 → GROUP BY 6 → SELECT 6 → ORDER BY 6 nhất quán với câu tình huống. Phần trích nguồn 10 dòng có cả NV020/NV033/NV041 và bước lọc sau đó loại người đã nghỉ; không hiểu nhầm 10 dòng trích là toàn bộ nguồn. Drawer bắt đầu bằng từ khóa và có số dòng thật theo nội dung khóa học. HTML có đúng năm panel, code nội dòng trong lời giải thích đã thành thẻ code, không còn backtick hiển thị như chữ. Chưa kiểm thao tác mở/đóng, focus, phím, hoặc chạy các câu kiểm.

## 11. Hay nhầm ở đâu — Giữ được

**Câu gốc, MDX 203–206:** thêm MaNV để hết lỗi; dùng DISTINCT thay tổng hợp; bỏ WHERE; coi gom nhóm đã được sắp.

**Tự hỏi:** Câu lệnh chạy được thì còn có thể sai ở đâu? **Bài đã trả lời bốn lỗi khác nhau:** sai mức chi tiết, thiếu chỉ tiêu, sai phạm vi, sai hợp đồng thứ tự. Mỗi mục nói hậu quả, không chỉ lặp một định nghĩa.

**Lý do/đề xuất:** Giữ cả bốn. Việc nhắc WHERE hoặc ORDER BY ở đây có mục đích nhận diện lỗi và hậu quả, không phải hai đoạn giảng lý thuyết trùng nhau cần cắt. Không thấy câu dài vòng vo hoặc lời cảnh báo nằm ngoài chủ đề. `DISTINCT MaPB` được hiểu là cách chọn danh sách mã đã học ở 2.6, không phải một câu SQL hoàn chỉnh để sao chép.

## 12. Ứng dụng và Ghi nhớ — Giữ được

**Câu gốc, MDX 214–226:** “đếm hồ sơ… nhóm theo mã phòng hoặc mã chức danh”; “nhóm theo cả phòng và trạng thái”; “dùng `SUM(SoNgay)` trong từng nhóm `LoaiNghi` để đối chiếu tổng số ngày trên đơn”.

**Tự hỏi:** Ngoài bài đếm phòng, dùng kiến thức này để làm gì? **Bài đã trả lời ba cách áp dụng cụ thể**, từ phân bố hiện tại đến hai chiều báo cáo và tổng số ngày trên đơn. Ý thứ ba là cầu nối đủ ngắn sang bài tập 3, dùng SUM đã học chứ không bắt tự đoán một hàm mới.

**Lý do/đề xuất:** Giữ. “Trong từng phòng đang lưu” không hứa truy ngược phòng lịch sử; “ngày trên đơn” không biến thành số ngày thực nghỉ trong tháng. Memo gom đúng bốn điểm tựa Excel/SQL, gồm không bảo đảm thứ tự. HTML hiển thị biểu thức trong Memo theo định dạng code; không có dấu backtick thô trong các chuỗi thuộc tính đã xem. Không cần thêm ứng dụng chung về import hay chất lượng dữ liệu.

## 13. Bài tập 1 — Có khả năng phân biệt các lỗi chính

**Câu gốc, YAML 7–19:** “chỉ tính… `Đang làm`”; “một dòng cho mỗi `MaCD`”; số lượng giảm dần, bằng nhau thì mã chức danh tăng dần; đáp án lọc trạng thái rồi GROUP BY MaCD.

**Tự hỏi:** Có chỉ chép nguyên ví dụ phòng là qua không? Có dữ liệu để tập tiêu chí thứ hai không? **Đề trả lời rõ khóa nhóm khác ví dụ chính**. Từ bảng hồ sơ công ty có thể đối chiếu phân bố đang làm: CV 20, NV 14, TP 5, CVC 4, GD 1, TL 1; GD/TL cùng 1 nên có tình huống phá hòa. Đây là đối chiếu tài liệu, không phải kết quả SQL do reviewer chạy.

**Đánh giá/đề xuất:** Giữ. Bỏ lọc trạng thái làm sai CV/NV; nhóm theo MaPB hoặc thêm MaNV làm sai nhóm hoặc số dòng; đếm email sẽ thiếu hồ sơ vì NV044/NV045 không có email. Đề rõ hai cột, vị trí cột, alias không chấm, không có tổng cộng. COUNT(MaNV) nếu cho cùng kết quả là cách làm hợp lệ, không nên bị coi sai chỉ vì không dùng dấu sao.

## 14. Bài tập 2 — Giữ được và bổ sung đúng chỗ ví dụ nhiều cột còn thu gọn

**Câu gốc, YAML 24–36:** “toàn bộ hồ sơ ở mọi phòng và mọi trạng thái, kể cả đã nghỉ”; “một dòng cho mỗi cặp MaPB và TrangThai xuất hiện trong bảng”; sắp mã phòng trước rồi số lượng trong cùng phòng.

**Tự hỏi:** Tôi đã hiểu cả tổ hợp hay chỉ biết chia KD thành hai dòng? Có phải thêm những tổ hợp phòng/trạng thái không có dữ liệu không? **Đề đã trả lời phạm vi và hình dạng kết quả**, buộc mở rộng ví dụ KD sang mọi phòng mà không thêm nhóm giả.

**Đánh giá/đề xuất:** Giữ. Theo hồ sơ công ty, BGD/IT/KT/NS có một trạng thái đang làm, KD/VH có hai; tổng cộng tám cặp và 48 hồ sơ. Lọc đang làm hoặc giữ WHERE MaPB = KD của ví dụ sẽ thiếu nhóm; chỉ nhóm theo MaPB không đáp ứng ba cột đúng mức; thêm MaNV sẽ vỡ mức nhóm. Hai cặp cùng phòng của KD/VH có số lượng khác nhau nên không cần thêm một tiêu chí phá hòa ngoài đề trên bộ dữ liệu đang mô tả. Đáp án không chứa WHERE phù hợp phạm vi; không cần ép người học viết một WHERE luôn đúng.

## 15. Bài tập 3 — Giữ được; số tổng từng loại chưa xác minh live

**Câu gốc, YAML 41–55:** đơn “Đã duyệt” ở mọi ngày bắt đầu, “không giới hạn tháng”; ba cột LoaiNghi, SoDon, TongNgay; “Cộng toàn bộ SoNgay của mỗi đơn, không phân bổ theo tháng”.

**Tự hỏi:** Có mang bộ lọc tháng 9 từ 3.1 sang không? Tính số đơn hay số ngày, có chia đơn giao tháng không? **Đề đã trả lời đầy đủ**, rõ hơn một yêu cầu “tổng hợp đơn nghỉ theo loại” chung chung. Hai hàm COUNT/SUM đều đã có ở 3.1; nhóm theo loại đã được mở đường trong Ứng dụng.

**Đánh giá/đề xuất:** Giữ. Cấu trúc đáp án lọc trạng thái, nhóm LoaiNghi và sắp LoaiNghi phù hợp đề. Bỏ lọc có thể đưa đơn chờ duyệt/từ chối vào; mang lại bộ lọc tháng 9 làm thiếu đơn; đếm thay vì SUM dễ sai chỉ tiêu tổng ngày. Chưa thể xác minh đầy đủ các số tổng theo từng loại hoặc mức chênh của từng câu sai từ các bài và hồ sơ hiện có; không tự đoán kết quả. Cần dùng kiểm live của người điều phối cho phần này, không sửa seed/grader để tạo thêm lỗi phân biệt.

## 16. Tự kiểm tra, bộ chấm, kiểm thử và HTML — Giữ được trong giới hạn đã công khai

**Câu gốc, MDX 231:** “Bộ chấm so giá trị, thứ tự cột và thứ tự dòng theo đề, không so alias hay bắt buộc một cú pháp.” Hai câu tự kiểm tra hỏi về tổ hợp KD/trạng thái và phòng không có dòng qua WHERE.

**Tự hỏi:** Chấm đúng có bảo đảm tôi đã viết đúng ORDER BY và hiểu khái niệm không? **Bài nói đúng phạm vi bộ chấm.** Hai câu tự kiểm tra kiểm đúng hai ý trọng tâm; bài truy vấn không có yêu cầu phải đủ ba câu tự kiểm tra của bài khái niệm. Ba bài tập đã kiểm thêm phạm vi, chỉ tiêu và thứ tự.

**Đánh giá/đề xuất:** Giữ. Với bộ chấm theo kết quả, thiếu ORDER BY vẫn có thể qua nếu lần chạy tình cờ trả đúng thứ tự; COUNT(MaNV) có thể bằng COUNT(*) hoặc một cách SQL tương đương có thể đúng. Đây là giới hạn của cách kiểm kết quả đã chốt, không phải căn cứ đòi đổi grader hoặc cưỡng chế cú pháp. Câu nhắc tự xác định mỗi dòng đại diện cho nhóm nào là cần thiết; không thể dùng việc được chấm đúng để thay câu tự kiểm tra.

Đã đọc `tests/content-3-2.test.ts`: kiểm 45 hồ sơ/sáu nhóm, kết quả KD theo trạng thái, năm mốc RunFlow, định dạng ba bài tập và không chép nguyên đáp án vào thân bài. Test này có đối chiếu qua helper seed; reviewer không mở seed hoặc chạy test này. Các test `grade`, `run-flow`, `check-dist`, `exercises` và phần quy tắc bố cục trong `content.test.ts` giúp xác định các bảo vệ có sẵn, không phải bằng chứng thực thi SQL. Chưa thấy lý do mở danh sách khung cũ hoặc bỏ một kiểm bảo vệ.

Đã kiểm riêng, không đọc seed và không gọi `main()` của script check-dist: toàn bộ dist có **99 file HTML**; bài 3.2 có đủ ba link bài tập; năm panel RunFlow; ba giá trị đánh dấu Excel là KD/13/45. Dùng `findAnswerLeaks` trên các file HTML/JS/JSON đã build với đúng ba đáp án YAML 3.2: **không phát hiện leak**. Cả ba prompt trong HTML bài tập khớp phạm vi YAML. Không chạy lại bộ test, lệnh build/check hoặc check:exercises trong lượt review; không báo những bước đó đã đạt.

## Kết luận và ưu tiên

Không phát hiện lỗi chặn học hoặc lỗi số liệu mâu thuẫn với hồ sơ công ty trong phạm vi đối chiếu độc lập. Bài đi đúng khung gộp, giải được tình huống, có lý do cho việc chọn nhóm, giải thích được cái giá của thêm cột và ba bài tập có vai trò khác nhau.

1. Cân nhắc làm rõ **NULL ở khóa nhóm** bằng một câu tại định nghĩa (mục 6); người viết xác minh trước khi chèn. Đây là khoảng trống nhỏ, không phải kết quả hiện có bị sai.
2. Hoàn tất kiểm live/UI riêng: ba ô Excel, cả năm drawer và code nội dòng, ba link/prompt, kết quả bài tập 3. Chưa có phát hiện tĩnh nào buộc thay UI/API/schema/grader/dữ liệu.
3. Giữ các phần còn lại; không mở thêm nhánh kiến thức nâng cao hoặc kéo dài bài vì các trường hợp không nằm trong yêu cầu hiện tại.

## Nguồn và giới hạn đối chiếu

- Đã đọc AGENTS.md, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md` và bài 1.1 đã duyệt; đọc bài 3.1 đầy đủ và các phần liên quan của bài trước về alias, thứ tự, NULL, DISTINCT và đọc kết quả.
- Nguồn review chính: `src/content/lessons/3-2-group-by-pivottable.mdx`, YAML cùng slug, các test nêu ở mục 16; đối chiếu component Excel/Result/RunFlow và mã so kết quả để hiểu HTML/bộ chấm, không sửa chúng.
- HTML bài chính tại `dist/bai/3-2-group-by-pivottable/index.html` có thời điểm file 23/10/2026 22:47:37 khi kiểm; đọc cả HTML của ba trang bài tập thuộc slug này. Đây là đọc HTML tĩnh, không phải nhìn hoặc thao tác browser.
- Số liệu khớp tài liệu công ty chỉ được ghi là đối chiếu tài liệu. Không khẳng định các câu SQL đã được chạy hoặc dữ liệu live đã được xác nhận trong lượt review này. Không truy cập seed/DB/API/tài liệu ngoài; không đọc spec/plan hoặc review trước để giữ độc lập.

# Review độc lập bài 3.6 — Kết nhiều bảng

Ngày review: 24/10/2026. Vai đọc: Business Consultant khó tính, học SQL Server để đủ hiểu và phản biện yêu cầu dữ liệu khi chuyển sang BA hoặc PM. Công cụ: Codex; agent mới kế thừa model của phiên, không chỉ định model khác.

Tôi đọc bài theo thứ tự người học gặp: tình huống, Excel, ERD, các câu SQL và kết quả, từng bước RunFlow, các mục cuối, ba đề bài tập và tự kiểm tra. Đã đối chiếu nội dung tĩnh của bản build, gồm cả ba trang bài tập; không mở browser và không chạy SQL.

Bài giải thích tốt hai việc dễ bị đánh đồng: kết đúng mã chưa chắc đúng độ chi tiết; lọc ngày chưa bảo đảm một hợp đồng duy nhất. Chưa thấy căn cứ để kết luận câu SQL chính sai. Hai chỗ đáng làm rõ trước là nhóm điều kiện ngày trong lời văn và cách người học tự kiểm báo cáo không bỏ mất dòng lương. Các mục còn lại chủ yếu là diễn đạt, đánh dấu và cắt ý lặp.

Số dòng dưới đây tính theo file nguồn tại lúc review. Mỗi mục ghi câu hỏi tôi tự đặt ra và tình trạng bài trả lời.

## 1. Mục tiêu và phạm vi đầu bài

**Câu gốc — MDX dòng 11–13:**

> goal: bạn kết ba bảng theo đúng phạm vi và kiểm được một dòng kết quả đại diện cho gì
>
> Chốt kỳ lương, chọn hợp đồng ứng viên theo mốc ngày và phát hiện tiền bị lặp khi kết.

**Đánh giá: Giữ được.**

- **Lý do:** Mục tiêu đủ cụ thể và được phần chính thực hiện: có ba bảng, kỳ lương riêng, mốc hợp đồng riêng và ví dụ tiền bị lặp. Không hứa học xong sẽ tính được lương hoặc tự xác nhận hợp đồng có hiệu lực pháp lý. Thời lượng 25 phút có thể hợp lý với lượng câu lệnh và ba bài tập; tôi chưa đo thời gian học thực tế.
- **Tự hỏi:** Học thêm bảng thứ ba để làm gì, ngoài việc viết câu dài hơn? **Bài đã trả lời:** thêm thông tin hợp đồng vào dòng lương, đồng thời phải kiểm ý nghĩa từng dòng.
- **Đề nghị:** Giữ phạm vi này; không thêm CTE, window function hoặc cách tự chọn hợp đồng mới nhất.

## 2. Tình huống chốt đúng kỳ, nhưng quy tắc lời văn cần nhóm rõ AND/OR

**Câu gốc — MDX dòng 21, 24:**

> Em lấy các dòng lương kỳ 2026-09, thêm họ tên, mã và loại hợp đồng phù hợp tại ngày 30/09 giúp chị.
>
> Quy tắc báo cáo: hợp đồng **ứng viên tại mốc** có `NgayBatDau <= '20260930'` và `NgayKetThuc IS NULL` hoặc `NgayKetThuc >= '20260930'`. Xét đủ hai đầu ngày, không lọc trạng thái hiện tại.

**Đánh giá: Cần làm rõ.**

- **Lý do:** Tình huống xác định được tháng lương, ngày đối chiếu, cột cần bổ sung và việc không được nhân khoản tiền. Tuy nhiên, lời văn đang có dạng A và B hoặc C, trong khi SQL phía sau dùng A và (B hoặc C). Bài 2.3 đã nhấn mạnh khác biệt này. Người đọc có thể hiểu ngày kết thúc từ mốc trở đi là một nhánh độc lập, dù hợp đồng chưa bắt đầu. Đây là vấn đề diễn đạt quy tắc; câu SQL phía sau đã có ngoặc đúng.
- **Tự hỏi:** Hợp đồng chưa bắt đầu nhưng kết thúc sau mốc có được nhận không? **Bài trả lời đúng ở SQL, chưa rõ ngay câu định nghĩa.** Câu hỏi này cần được khép tại quy tắc đầu bài.
- **Đề nghị:** Sửa ngay câu hiện có thành: “Hợp đồng **ứng viên tại mốc** thỏa `NgayBatDau <= '20260930'` và (`NgayKetThuc IS NULL` hoặc `NgayKetThuc >= '20260930'`); hai phép so sánh ngày đều nhận trường hợp bằng mốc.” Không cần thêm đoạn giảng lại AND/OR.

## 3. Phân biệt quy tắc đối chiếu với quyết định nghiệp vụ

**Câu gốc — MDX dòng 24, 26:**

> Quy tắc này dùng các ngày đã lưu để đối chiếu, không chứng nhận hiệu lực pháp lý hoặc tính lại lương của cả tháng.
>
> Một dòng lương được nhận diện bằng cặp kỳ lương và mã nhân viên; kết thêm hợp đồng phải kiểm số dòng khớp.

**Đánh giá: Giữ được.**

- **Lý do:** Mốc cuối tháng phục vụ yêu cầu đối chiếu đã chốt; bài không khẳng định đây là hợp đồng làm căn cứ cho toàn bộ tháng. Cách gọi “ứng viên” cũng phù hợp với việc còn phải kiểm dữ liệu chồng ngày. Không lọc trạng thái hiện tại là hợp lý với một kỳ lương quá khứ và khớp hồ sơ công ty.
- **Tự hỏi:** Vì sao một hợp đồng phù hợp ngày 30/09 chưa đủ để tính lại tiền lương tháng 9? **Bài đã trả lời:** quy tắc chỉ xét ngày đã lưu tại một mốc, còn số tiền đọc từ bảng lương kỳ đó.
- **Đề nghị:** Giữ cảnh giới hạn này. Không cần thêm kiến thức pháp lý hoặc quy tắc tính lương vào bài kết bảng.

## 4. Định nghĩa độ chi tiết có ví dụ trực tiếp, dùng lại đúng kiến thức nền

**Câu gốc — MDX dòng 32:**

> **Độ chi tiết của dòng** là điều một dòng đang đại diện: `NhanVien` có một dòng mỗi `MaNV`; `HopDong` có một dòng mỗi `MaHD`; `BangLuong` có một dòng mỗi cặp `KyLuong`, `MaNV`. Chỉ cùng `MaNV` chưa làm ba bảng có cùng độ chi tiết. Mỗi `JOIN` cần `ON` riêng để nói cặp dòng nào được kết.

**Đánh giá: Giữ được.**

- **Lý do:** Khái niệm mới được in đậm và giải nghĩa ngay bằng ba loại dòng thật. Cặp khóa lương đã được bài 1.5 giải thích là tối đa một dòng mỗi nhân viên mỗi kỳ, nên không cần giảng lại khóa chính ở đây. Tên bảng, cột và từ khóa đều có code. Người học biết vì sao không thể coi một dòng hợp đồng là một dòng nhân viên hay một dòng lương.
- **Tự hỏi:** Vì sao đều có mã nhân viên mà không kết thoải mái được? **Bài đã trả lời:** một mã có thể ứng với nhiều hợp đồng và nhiều kỳ lương.
- **Đề nghị:** Giữ. Có thể thay “là điều một dòng đang đại diện” bằng “là ý nghĩa của một dòng” nếu muốn câu tự nhiên hơn, nhưng đây không phải lỗi cần chặn.

## 5. Excel có giả định đủ để VLOOKUP không giấu hợp đồng trùng

**Câu gốc — MDX dòng 34–41 và khối Excel:**

> Sheet `HopDongMoc` chứa `MaNV`, `MaHD` ở hai cột đầu và đã kiểm mỗi mã chỉ còn một ứng viên trước khi dùng VLOOKUP.
>
> Ô `C2` là `16457000`, lấy từ dòng lương kỳ `2026-09`, không tính từ công thức dò hợp đồng.

Công thức: `=VLOOKUP(A2,HopDongMoc!A:B,2,FALSE)`; dòng minh họa: `NV021`, `HD2024-005`, `16457000`; đánh dấu `B2`, `C2`.

**Đánh giá: Giữ được.**

- **Lý do:** Công thức dò đúng cột mã sang mã hợp đồng; bài nói rõ sheet dò đã được lọc và kiểm mỗi mã. Không đánh đồng VLOOKUP lấy dòng đầu tiên với JOIN trả mọi cặp. Hai ô được đánh dấu đều có lời giải thích ngay cạnh hình; số tiền ở `C2` là số, không bị mô tả là kết quả của công thức tại `B2`. Đây là hình minh họa đã được gọi đúng tên, không giả làm kết quả chạy SQL.
- **Tự hỏi:** Vì sao lần dò này chỉ lấy một hợp đồng và tiền có bị tính lại không? **Bài đã trả lời cả hai.**
- **Đề nghị:** Giữ. Không cần thêm một bảng Excel dài để trình bày toàn bộ thao tác lọc; phần SQL ngay sau đã chỉ điều kiện.

## 6. Đường quan hệ đúng, có thể nói thẳng cột thiếu ở bảng lương

**Câu gốc — MDX dòng 41–43:**

> Trong SQL, bảng trung tâm kết hai phía qua `NhanVien.MaNV`: hợp đồng trỏ tới hồ sơ, dòng lương cũng trỏ tới hồ sơ. Sơ đồ đánh dấu hai quan hệ đó; `HopDong` và `BangLuong` không có cột mã hợp đồng liên kết trực tiếp trong bộ mẫu.

ERD: `path={['HopDong','NhanVien','BangLuong']}`; chú thích: “Hai quan hệ cùng qua MaNV; khóa của bảng lương còn có KyLuong.”

**Đánh giá: Giữ được; Biên tập nhẹ câu cuối nếu sửa.**

- **Lý do:** Đường đi và cặp mã phù hợp với sơ đồ đã học ở bài 1.5. Bài không vẽ quan hệ trực tiếp từ một hợp đồng sang dòng lương; do đó không hứa truy được chính xác hợp đồng gốc đã sinh khoản lương. Cụm “hai bảng không có cột mã hợp đồng liên kết trực tiếp” hơi vòng vì `HopDong` vẫn có `MaHD`, chỉ `BangLuong` không giữ nó.
- **Tự hỏi:** Vì sao phải qua hồ sơ, và có biết dòng lương này thuộc hợp đồng nào không? **Bài đã trả lời về cấu trúc:** hai phía qua `MaNV`, hợp đồng đi kèm là ứng viên theo quy tắc ngày, không phải một liên kết `MaHD` đã lưu ở lương.
- **Đề nghị:** Nếu biên tập, đổi vế cuối thành “`BangLuong` không lưu `MaHD` để trỏ trực tiếp tới một hợp đồng.” Không thêm một đoạn mới.

## 7. Ví dụ nhân dòng chỉ rõ cơ chế và hậu quả của DISTINCT

**Câu gốc — MDX dòng 47–75, SQL và Result ba dòng:**

> Nếu chỉ kết bằng `MaNV`, hồ sơ `NV021` có `3` hợp đồng đang lưu.
>
> Khoản `16457000` xuất hiện ở cả `3` dòng vì cùng dòng lương khớp ba hợp đồng. Cộng cột đó sẽ thành `49371000`, không phải thực lĩnh mới của nhân viên. Dùng `DISTINCT` không sửa quan hệ: còn `MaHD` thì ba dòng vẫn khác nhau; bỏ mã để giấu dòng lại làm mất căn cứ đối chiếu.

**Đánh giá: Giữ được.**

- **Lý do:** SQL cố ý giữ cả lịch sử nhưng vẫn giới hạn đúng kỳ và đúng mã để hiện tượng có một nguyên nhân rõ ràng. Ba mã hợp đồng khác nhau làm ba dòng thực sự khác nhau; đây không phải ba bản ghi hoàn toàn trùng. Phép nhân `16457000 × 3 = 49371000` đúng về số học. Hình đánh dấu cả ba dòng và lời văn chỉ đúng cả ba khoản tiền. Số tiền gốc và ba mã hợp đồng chưa được tôi xác minh bằng database.
- **Tự hỏi:** Vì sao một người thành ba dòng; tại sao không dùng DISTINCT để chữa? **Bài đã trả lời bằng dữ liệu đang nhìn thấy, không chỉ đưa lời cảnh báo.**
- **Đề nghị:** Giữ. Không cần chuyển đoạn này thành hướng dẫn tổng hợp sau JOIN hoặc thêm cách chữa bằng chọn dòng mới nhất.

## 8. Kiểm mã nhiều ứng viên đúng, nhưng chưa dạy đủ bước kiểm không mất dòng lương

**Câu gốc — MDX dòng 77–86, 177 và RunFlow dòng 504:**

> Câu sau trả các mã cần xử lý tiếp; hiện bộ mẫu trả `0` dòng.
>
> Với bộ mẫu hiện tại, mỗi mã trong `45` ứng viên có đúng một hợp đồng; chỉ `43` mã có dòng lương kỳ `2026-09`.
>
> Chị Hạnh nhận `43` dòng, bằng số dòng lương của kỳ `2026-09`; mỗi mã chỉ xuất hiện một lần sau các kiểm trên.
>
> Số dòng bằng danh sách lương của kỳ đã đối chiếu riêng.

Câu kiểm hiện có nhóm `HopDong` theo `MaNV`, lọc ngày rồi dùng `HAVING COUNT(*) > 1`.

**Đánh giá: Cần làm rõ.**

- **Lý do:** Câu kiểm trả `0` nghĩa là không có mã nào có trên một ứng viên trong tập hợp đồng đạt ngày. Nó không liệt kê người không có ứng viên, vì những người đó không tạo nhóm trong truy vấn này. Sau đó hai INNER JOIN vẫn có thể bỏ một dòng lương nếu thiếu hợp đồng ứng viên. Bài đã đưa con số `43` bằng bảng lương gốc và nói “đã đối chiếu riêng”, nên tôi không kết luận bộ mẫu đang thiếu dòng hoặc SQL chính sai. Chỗ thiếu là phép kiểm mà người học phải tự làm để biết báo cáo giữ đủ các dòng lương chị Hạnh xin.
- **Tự hỏi:** Kiểm trùng trả rỗng đã đủ để giao đủ bảng lương chưa; tôi lấy số gốc để đối chiếu ở đâu? **Bài trả lời được vế không dư, mới thông báo kết quả đối chiếu của vế không thiếu, chưa chỉ rõ thao tác đối chiếu đó.**
- **Đề nghị:** Sửa câu chốt cạnh kết quả để nêu phép kiểm đang bị ẩn: “Đối chiếu thêm `COUNT(*)` của `BangLuong` riêng kỳ `2026-09` với số dòng cuối để kiểm không bỏ dòng lương.” Chỉ cần một vế thao tác đã học ở bài 3.1; không cần thêm kỹ thuật SQL mới. Sau khi đã biết mỗi mã tối đa một ứng viên và khóa lương không trùng trong kỳ, so hai số dòng mới có ý nghĩa kiểm đủ ở báo cáo này. Nếu thiếu, có thể trỏ về cách tìm không khớp ở bài 3.5, không cần mở một bài phụ.

## 9. Không tự chọn hợp đồng đầu tiên hoặc mới nhất là giới hạn đúng

**Câu gốc — MDX dòng 86, 88:**

> Điều kiện ngày không phải ràng buộc duy nhất: hai hợp đồng chồng ngày vẫn có thể cùng đạt. Nếu câu kiểm trả mã, cần thống nhất quy tắc chọn với người phụ trách; không tự lấy hợp đồng đầu tiên hoặc mới nhất.
>
> Ở bài này chỉ cần kết ba bảng và kiểm độ chi tiết. Chọn dòng mới nhất bằng xếp hạng học ở bài 4.2; đối chiếu và kiểm dữ liệu bất thường học ở bài 4.6–4.7.

**Đánh giá: Giữ được.**

- **Lý do:** Bài tách đúng việc SQL tìm ứng viên với việc nghiệp vụ quyết định chọn gì. Không biến “mới nhất” thành quy tắc mặc định; phần xếp hạng được để ở bài sau. Có câu chốt phạm vi “Ở bài này chỉ cần…” đúng khung hiện hành.
- **Tự hỏi:** Nếu có hai hợp đồng cùng đạt, vì sao không lấy đại cái mới nhất cho đủ một dòng? **Bài đã trả lời:** chưa có quy tắc nghiệp vụ cho phép chọn vậy.
- **Đề nghị:** Giữ cảnh báo ở đây, nơi người học vừa thấy câu kiểm; cắt phần nhắc lại thao tác ở Hay nhầm như mục 15 dưới đây.

## 10. Câu lệnh chính dùng hai ON đúng vai trò và không tính lại lương

**Câu gốc — MDX dòng 92–102:**

> Sau kiểm ứng viên, kết đúng kỳ lương và lấy số tiền từ `BangLuong`. Điều kiện ngày thuộc phần hợp đồng được khớp; điều kiện kỳ thuộc phần lương được khớp.

SQL lấy `bl.MaNV`, `nv.HoTen`, `hd.MaHD`, `hd.LoaiHD`, `bl.ThucLinh`; kết hợp đồng bằng mã và hai điều kiện ngày; kết lương bằng mã cùng `bl.KyLuong = '2026-09'`; xếp `bl.MaNV`, `hd.MaHD` tăng dần.

**Đánh giá: Giữ được.**

- **Lý do:** Mỗi phép kết có điều kiện riêng. Ngoặc OR đúng, không bỏ ngày bắt đầu, không dùng `NgayKetThuc IS NULL` để nhận diện thiếu hợp đồng. `ThucLinh` đọc từ lương đúng kỳ. Không có phép SUM hoặc lấy `hd.LuongCoBan` để suy ra lương. Cách đặt điều kiện ở ON giúp nhìn nguồn điều kiện nhưng không tuyên bố mọi điều kiện INNER JOIN bắt buộc phải nằm ở ON; các bài tập đặt điều kiện kỳ ở WHERE vì vậy không mâu thuẫn bài giảng.
- **Tự hỏi:** Vì sao kỳ lương phải kiểm riêng, còn điều kiện hợp đồng không tự chọn được tháng lương? **Bài đã trả lời qua hai nguồn và ví dụ một mã có nhiều kỳ.**
- **Đề nghị:** Giữ. Phần kiểm đủ dòng cần hoàn thiện ở mục 8, không phải thay query chính bằng kỹ thuật chưa học.

## 11. Kết quả khép tình huống đúng vị trí; mark và một vế ngoài phạm vi nên chỉnh

**Câu gốc — MDX dòng 175–177:**

> Chị Hạnh nhận `43` dòng, bằng số dòng lương của kỳ `2026-09`; mỗi mã chỉ xuất hiện một lần sau các kiểm trên. Hình trích `10` dòng đầu. Báo cáo thêm tên hiện lưu và hợp đồng ứng viên tại mốc đã chốt; không khôi phục phòng/chức danh quá khứ và không tính lại số thực lĩnh.

Result có `total={43}`, `mark={[1]}`; dòng đầu là `NV001`, `HD2024-018`, `13285000`.

**Đánh giá: Giữ được về mạch; Biên tập và Cần cắt một vế.**

- **Lý do:** Trả lời ngay cạnh SQL và kết quả, không tách thêm mục “Trả lời chị Hạnh”; phân biệt tổng `43` với hình trích `10` rõ. Tuy nhiên, không có câu nào nói vì sao dòng `NV001` được đánh dấu. Vế “không khôi phục phòng/chức danh quá khứ” nói về hai thông tin không hề có trong query hoặc yêu cầu này; cảnh giới hạn phòng/chức danh hiện lưu có chỗ dùng rõ hơn ở bài tập 1–2.
- **Tự hỏi:** Ô/dòng tô màu đang chứng minh điều gì? **Bài chưa trả lời cho mark của kết quả chính.** Tôi có nhận được đúng loại thông tin chị Hạnh xin không? **Có**, với giới hạn dữ liệu đã nói ở đầu bài và bước kiểm đủ cần làm rõ ở mục 8.
- **Đề nghị:** Nếu không cần dẫn chứng riêng về `NV001`, bỏ `mark={[1]}` để không phải thêm câu giải thích. Cắt vế “không khôi phục phòng/chức danh quá khứ”; giữ “không tính lại số thực lĩnh”.

## 12. RunFlow phân biệt logic và thực thi vật lý đúng, nhưng bước giảm từ 48 xuống 45 nên gọi tên phần bị loại

**Câu gốc — MDX dòng 181, 249–250:**

> Hai phép kết ở đây là `INNER JOIN`, nên dòng không có cặp phù hợp bị loại. Đây không phải thứ tự thực thi vật lý; trước `ORDER BY`, thứ tự có thể khác hình.
>
> `INNER JOIN` này có `45` cặp hồ sơ/hợp đồng ứng viên. Bộ mẫu hiện mỗi mã khớp một ứng viên sau kiểm mã trùng; chưa giới hạn dòng lương.

**Đánh giá: Giữ được về cơ chế; Cần làm rõ drawer bước 2.**

- **Lý do:** Thẻ và drawer thể hiện `48 → 45 → 43`, sau đó SELECT và ORDER BY giữ `43`. Câu quan sát riêng ở từng drawer có phạm vi tương ứng, không bị kể thành các lệnh SQL Server thật sự chạy tuần tự. Tuy nhiên, phần “Ở bước này” của bước 2 mới nói còn `45`, chưa gắn lại với `48` hồ sơ đầu vào và nguyên nhân loại những hồ sơ không có ứng viên tại mốc. Đây là ngay chỗ người học cần hiểu cái giá của INNER JOIN. Tôi không đoán mã của ba hồ sơ bị loại vì không được chạy SQL.
- **Tự hỏi:** Vì sao còn `45`, có phải database đã chọn chỉ người đang làm không? **Bài trả lời một phần:** đầu bài nói không lọc trạng thái; cơ chế không khớp bị loại nằm ở đoạn ngoài sơ đồ. Drawer nên đủ nghĩa khi mở riêng.
- **Đề nghị:** Thay câu đầu drawer bằng “`INNER JOIN` giữ `45` cặp từ `48` hồ sơ, loại hồ sơ không có hợp đồng ứng viên tại mốc.” Không cần thêm danh sách dài hoặc đoán lý do cụ thể của từng mã.

## 13. Các drawer còn lại đủ để theo dõi, tên bảng/cột cần code nhất quán

**Câu gốc — MDX dòng 249, 325, 414–415:**

> `INNER JOIN` với HopDong chỉ nhận cặp cùng MaNV và thỏa cả điều kiện ngày bắt đầu, kết thúc.
>
> `INNER JOIN` với BangLuong nhận cặp cùng MaNV và đúng KyLuong.
>
> `SELECT` lấy mã, họ tên, mã/loại hợp đồng và ThucLinh của kỳ lương.
>
> `SELECT` giữ `43` dòng và `5` cột; khoản tiền được đọc từ BangLuong, không cộng lại theo hợp đồng.

**Đánh giá: Biên tập.**

- **Lý do:** Các giải thích bắt đầu từ từ khóa và có số dòng ở detail. Riêng các tên `HopDong`, `MaNV`, `BangLuong`, `KyLuong`, `ThucLinh` trong các chuỗi trên đang hiện như chữ thường trên build; từ khóa đã có code, nên đây không phải giới hạn không hỗ trợ định dạng của drawer. Bước 3 nói rõ lấy kỳ `2026-09`, bỏ kỳ `2026-08`; SELECT vẫn giữ `43` dòng là đúng vì không có tổng hợp hay DISTINCT.
- **Tự hỏi:** Số tiền lấy từ đâu, vì sao SELECT không làm giảm số người? **Bài đã trả lời.** Từ nào là tên cột phải tìm trong sơ đồ? **Đọc được nhưng dấu phân biệt chưa nhất quán.**
- **Đề nghị:** Bọc các tên bảng/cột còn thiếu bằng code ngay trong các chuỗi; không đổi câu lệnh hoặc component chung. Giữ cách trình bày số dòng hiện có.

## 14. SQL giữ tab thật sau build, chưa kiểm được clipboard hay bố cục bằng mắt

**Dẫn chứng gốc — MDX dòng 94–102, 183–191 và các `focus`, `sql` trong RunFlow:**

`SELECT` xuống dòng cho `hd.LoaiHD, bl.ThucLinh`; các dòng tiếp điều kiện dùng escape `\t`; dòng `AND (...)` khớp ở query và focus.

**Đánh giá: Giữ được trong phạm vi kiểm tĩnh.**

- **Lý do:** HTML build chứa 13 khối pre của SQL chính và sơ đồ; các dòng cần thụt lề là ký tự tab thật, không phải hai ký tự gạch chéo và `t`. Tám thuộc tính dùng cho sao chép cũng chứa tab thật ở những câu có thụt lề. CSS đi kèm đặt `--sql-tab-size: 4` và dùng token này cho SQL, query trong drawer, editor/lớp highlight. Các phần focus đọc được khớp query về điều kiện và vị trí xuống dòng. Bài này không có CASE hai cấp nên không thể báo đã kiểm CASE ở bài này.
- **Tự hỏi:** Thụt lề trong file nguồn có còn đúng khi bài được build và sao chép không? **Đã xác nhận được dữ liệu HTML/CSS phục vụ hiển thị và sao chép; chưa thao tác nút Sao chép/dán vào editor thực tế.**
- **Đề nghị:** Không sửa SQL chỉ vì thấy `\t` trong MDX. Người phụ trách còn cần kiểm tương tác clipboard, focus và bố cục ở browser; review này không thay thế bước đó.

## 15. Hay nhầm: giữ lỗi/hậu quả, cắt câu dặn lặp và sửa code

**Câu gốc — MDX dòng 595–598:**

> 1. **Kết lương chỉ bằng mã nhưng quên kỳ.** Một hồ sơ có thể có lương ở nhiều kỳ; số dòng tăng và tiền của kỳ khác lọt vào báo cáo.
> 2. **Chỉ kiểm ngày kết thúc hợp đồng.** Hợp đồng chưa bắt đầu nhưng có ngày kết thúc NULL cũng lọt qua; cần cả điều kiện ngày bắt đầu.
> 3. **Coi điều kiện ngày bảo đảm một hợp đồng mỗi người.** Dữ liệu chồng ngày vẫn tạo nhiều cặp; kiểm mã có trên một ứng viên trước khi chấp nhận báo cáo.
> 4. **Cộng tiền trên kết quả bị nhân dòng.** Khoản lương gốc đã bị lặp qua từng hợp đồng; dùng DISTINCT để che dòng không xác định lại được quan hệ đúng.

**Đánh giá: Giữ được mục 1; Cần cắt phần lặp và Biên tập ở mục 2–4.**

- **Lý do:** Bốn lỗi đều đúng chủ đề. Mục 1 bổ sung hậu quả cụ thể khi quên kỳ. Câu dặn kiểm mã ở cuối mục 3 lặp thao tác đã có câu SQL và lời giải ở dòng 77–86. Vế DISTINCT ở mục 4 lặp phân tích đã có dẫn chứng đầy đủ ở dòng 75. Phần Hay nhầm chỉ cần lỗi và hậu quả. `NULL`, `DISTINCT` đang thiếu code.
- **Tự hỏi:** Mỗi lỗi làm báo cáo sai kiểu gì? **Bài đã trả lời.** Có phải đọc lại cùng lời hướng dẫn kiểm ứng viên và chữa DISTINCT lần nữa không? **Không cần.**
- **Đề nghị:** Cắt từ “kiểm mã có trên một ứng viên…” ở mục 3; cắt từ “dùng DISTINCT…” ở mục 4. Phần lỗi/hậu quả còn lại đã đủ nghĩa. Đổi `NULL` ở mục 2 sang code; nếu còn nhắc từ khóa DISTINCT ở đâu thì cũng dùng code. Không cần thêm mục Hay nhầm mới.

## 16. Ứng dụng đúng chủ đề, nhưng “hai mốc ngày” làm lệch việc phải chốt

**Câu gốc — MDX dòng 606–608:**

> **Bổ sung thông tin cho bảng lương:** kết hồ sơ và danh mục để thêm tên phòng/chức danh hiện lưu, đồng thời giữ đúng kỳ và một dòng mỗi cặp khóa lương.
>
> **Đối chiếu hợp đồng tại mốc báo cáo:** đặt rõ hai mốc ngày và cách hiểu ngày kết thúc NULL, kiểm số hợp đồng ứng viên từng người trước khi dùng.
>
> **Phát hiện báo cáo đếm hoặc cộng dư:** so số dòng, mã bị lặp và số tiền trước/sau từng phép kết để tìm phía tạo nhiều cặp.

**Đánh giá: Giữ được ý 1 và 3; Cần làm rõ ý 2.**

- **Lý do:** Ý 1 mở sang đường kết danh mục đã học, có điều kiện “hiện lưu” nên không hứa dữ liệu phòng/chức danh quá khứ. Ý 3 là ứng dụng thật của việc kiểm độ chi tiết. Nhưng tình huống hợp đồng có một mốc báo cáo `30/09/2026`; hai cột ngày của mỗi hợp đồng được so với cùng mốc đó. Cụm “đặt rõ hai mốc ngày” có thể làm người học tưởng phải tự bổ sung một mốc báo cáo thứ hai.
- **Tự hỏi:** Hai mốc cần chốt là ngày nào; tôi có đang thiếu một ngày trong đề không? **Bài chưa trả lời vì thực tế chỉ có một mốc đối chiếu.**
- **Đề nghị:** Đổi ngay ý 2 thành “**Đối chiếu hợp đồng tại mốc báo cáo:** chốt mốc đối chiếu và cách hiểu `NgayKetThuc IS NULL`, rồi kiểm số hợp đồng ứng viên từng người.” Giữ ba ý, không thêm ứng dụng chung chung.

## 17. Ghi nhớ phủ đúng các điểm tựa của bài

**Câu gốc — MDX dòng 614–618:**

> Mỗi sheet có một loại dòng → Xác định khóa và độ chi tiết trước khi JOIN
>
> Dò qua nhiều sheet → Mỗi JOIN có ON cho đúng quan hệ
>
> Một mã có nhiều dòng được dò → JOIN có thể lặp khoản tiền trên từng cặp
>
> Lọc trước khi dò và kiểm mã trùng → Điều kiện ngày/kỳ phải đi cùng kiểm số ứng viên

**Đánh giá: Giữ được.**

- **Lý do:** Bốn hàng ôn đúng quan hệ, độ chi tiết, khả năng nhân dòng và kiểm ứng viên. Sự lặp ở đây có mục đích ôn bài và được quy ước cho phép. Không cần chèn dấu backtick vào chuỗi Memo chỉ để biến chúng thành ký tự thường trên giao diện.
- **Tự hỏi:** Trước khi tin một báo cáo nhiều bảng, phải nhìn những gì? **Bài đã trả lời:** khóa/loại dòng, quan hệ ON, dòng lặp, phạm vi ngày/kỳ và ứng viên. Bước kiểm đủ dòng ở mục 8 cần được nói rõ trong phần chính trước khi cân nhắc cập nhật Ghi nhớ.
- **Đề nghị:** Giữ bốn hàng. Chưa cần thêm hàng mới để bù cho lời giải thích còn thiếu ở thân bài.

## 18. Đề 3-6-1 đủ dữ kiện, đổi đường kết đúng mức

**Câu gốc — YAML dòng 6–8:**

> Lấy các dòng BangLuong có KyLuong bằng 2026-08, chỉ hồ sơ hiện mang MaPB bằng IT. Kết NhanVien và PhongBan theo mã để trả MaNV, HoTen, TenPB, ThucLinh theo thứ tự này. Xếp MaNV tăng dần. Phòng là phòng hiện lưu; không lọc trạng thái và không lấy hợp đồng.

**Đánh giá: Giữ được.**

- **Lý do:** Có kỳ cụ thể, điều kiện phòng, nguồn tên phòng, thứ tự bốn cột, thứ tự dòng và giới hạn hiện tại/quá khứ. “Không lấy hợp đồng” ngăn chép query chính rồi vô tình nhân dòng. Đường `BangLuong → NhanVien → PhongBan` đã có ở bài 1.5 và kết danh mục ở bài 3.4, nên không đòi kiến thức chưa học. Answer YAML dùng ba bảng và các điều kiện phù hợp đề, về mặt đọc tĩnh.
- **Tự hỏi:** Là người thuộc IT tại tháng 8 hay người hiện đang ở IT có dòng lương tháng 8? **Bài đã trả lời rõ là hiện mang mã phòng IT.** Có phải loại người đã nghỉ không? **Đề đã trả lời không lọc trạng thái.**
- **Đề nghị:** Giữ. Không cần thêm số dòng đáp án vào đề.

## 19. Đề 3-6-2 đủ dữ kiện, không đánh đồng chức danh hiện tại với kỳ lương

**Câu gốc — YAML dòng 27–29:**

> Lấy dòng lương kỳ 2026-09 của những hồ sơ hiện có MaCD bằng TP, không thêm điều kiện trạng thái. Kết NhanVien và ChucDanh để trả MaNV, HoTen, TenCD, ThucLinh. Xếp MaNV tăng dần. Chức danh là dữ liệu hiện lưu, không phải chức danh lịch sử tại kỳ lương.

**Đánh giá: Giữ được.**

- **Lý do:** Đề đổi bảng danh mục và khóa từ phòng sang chức danh, vẫn chỉ có ba bảng. `ChucDanh`, `MaCD`, `TenCD` đều nhìn được trên ERD người học đã có; không cần tác giả đưa trước toàn bộ query. Phạm vi thời gian và trạng thái đủ rõ. Answer YAML phù hợp lời đề khi đọc tĩnh.
- **Tự hỏi:** Lọc trưởng phòng tại thời điểm nào; tên chức danh lấy đâu? **Đề trả lời:** mã chức danh hiện lưu và danh mục ChucDanh. Không phải báo cáo chức danh tại tháng 9.
- **Đề nghị:** Giữ. Không yêu cầu thêm bảng lịch sử mà bộ mẫu không có.

## 20. Đề 3-6-3 kiểm đúng hiện tượng nhân dòng và dùng được kiến thức 3.1–3.3

**Câu gốc — YAML dòng 48–51:**

> Chỉ xét người có dòng BangLuong kỳ 2026-09. Kết NhanVien với toàn bộ HopDong đang lưu theo MaNV, không lọc ngày hay loại hợp đồng. Đếm số hợp đồng từng người, chỉ giữ người có trên 1 hợp đồng. Trả MaNV, HoTen, SoHD; xếp MaNV tăng dần. Đây là kiểm lịch sử hợp đồng làm lặp một dòng lương, không đếm hợp đồng ứng viên tại một ngày.

**Đánh giá: Giữ được.**

- **Lý do:** Phân biệt “toàn bộ hợp đồng đang lưu” với “hợp đồng ứng viên theo ngày” được viết rõ, nên không thể nhầm là lặp lại câu kiểm trả `0` ở thân bài. Đếm từng người và lọc ngưỡng dùng COUNT, GROUP BY, HAVING đã học. Một dòng lương mỗi người trong một kỳ làm số cặp với hợp đồng đúng là số hợp đồng của người đó ở phạm vi này; không bị nhân thêm qua nhiều kỳ. Answer YAML nhóm cả mã và họ tên, đúng quy tắc chọn cột ở bài 3.2. Không thấy thiếu dữ kiện để tự làm.
- **Tự hỏi:** Tôi đang đếm số hợp đồng lịch sử hay số hợp đồng còn phù hợp tại mốc; tại sao vẫn phải kết lương? **Đề đã trả lời:** đếm lịch sử nhưng chỉ cho người có lương kỳ `2026-09`, để tìm nguy cơ lặp khoản tiền của kỳ này.
- **Đề nghị:** Giữ. Không chuyển thành yêu cầu tự chọn hợp đồng duy nhất hoặc tự tính lại lương.

## 21. Tự kiểm tra phủ mục tiêu, còn thiếu code trong câu hỏi và đáp án

**Câu gốc — MDX dòng 630–646:**

> Vì sao khoản lương của NV021 xuất hiện ba lần khi kết mọi hợp đồng?
>
> Một dòng lương kỳ 2026-09 cùng mã khớp ba hợp đồng. Ba cặp không phải ba khoản lương khác nhau.
>
> Lọc ngày bắt đầu và kết thúc có luôn chọn đúng một hợp đồng không?
>
> Khóa của BangLuong là MaNV hay cặp KyLuong, MaNV?
>
> Là cặp KyLuong, MaNV. Cùng một người có thể có dòng lương ở nhiều kỳ; báo cáo một kỳ phải giới hạn kỳ đó.

**Đánh giá: Giữ được về nội dung; Biên tập định dạng.**

- **Lý do:** Ba câu kiểm cả nguyên nhân nhân dòng, giới hạn điều kiện ngày và khóa lương; không chỉ hỏi lỗi hiếm. Đáp án ngắn, không dạy thêm kỹ thuật mới. Tuy nhiên `NV021`, `2026-09`, `BangLuong`, `MaNV`, `KyLuong` đang là chữ thường trong các vị trí này trên build, khác chuẩn dẫn chứng của bài 1.1.
- **Tự hỏi:** Tôi có giải thích được vì sao bị lặp và vì sao lọc ngày chưa đủ để chọn đúng một dòng không? **Bộ tự kiểm tra đã hỏi đúng hai ý này.** Tôi có phân biệt được một người với một dòng lương không? **Câu khóa cặp đã kiểm được.**
- **Đề nghị:** Dùng `<code>` trong summary và code Markdown ở đáp án cho các tên/giá trị trên. Không cần thêm câu tự kiểm tra thứ tư chỉ để tăng số lượng; trước hết sửa rõ phép kiểm đủ dòng trong phần chính.

## Thứ tự ưu tiên xử lý

1. **Làm rõ quy trình để người học có thể tự giao đủ báo cáo:** nêu phép đối chiếu số dòng cuối với bảng lương riêng đúng kỳ, phân biệt kiểm không trùng với kiểm không thiếu (mục 8). Không ghi nhận đây là lỗi số liệu đã được xác minh.
2. **Làm quy tắc ngày nhất quán ngay từ lời văn:** nhóm nhánh ngày kết thúc bằng ngoặc (mục 2); sửa “hai mốc ngày” ở Ứng dụng thành một mốc đối chiếu (mục 16).
3. **Làm sơ đồ tự đủ nghĩa hơn:** gọi tên loại hồ sơ bị loại khi `48 → 45` ở drawer bước 2 (mục 12), không đoán mã hay nguyên nhân cụ thể khi chưa chạy.
4. **Biên tập theo chuẩn hiện hành:** thêm code ở drawer, Hay nhầm, tự kiểm tra; bỏ mark không được giải thích hoặc giải thích ngay cạnh hình; rút vế phòng/chức danh ngoài phạm vi query và các câu dặn lặp ở Hay nhầm (mục 11, 13, 15, 21). Có thể làm gọn câu ERD ở mục 6 trong cùng lượt.

Không đề nghị đổi về bố cục tách Excel/SQL; không thêm mục trả lời tình huống riêng; không đòi lựa chọn hợp đồng bằng CTE/window function; không mở rộng bài thành tính lương hoặc pháp lý lao động.

## Nguồn đối chiếu và giới hạn

**Đã đọc:**

- [AGENTS.md](<E:/Projects/SQL Lession/AGENTS.md>).
- [Quy ước hiện hành](<E:/Projects/SQL Lession/docs/quy-uoc.md>), nhất là mục 1–4.5; [khung bài hiện hành](<E:/Projects/SQL Lession/docs/lesson-template.md>).
- [Hồ sơ công ty](<E:/Projects/SQL Lession/docs/ho-so-cong-ty.md>): kỳ lương, dữ liệu hiện tại không có lịch sử chuyển phòng/chức danh, khóa lương và sự việc bài 3.6.
- [Bài 1.1 đã duyệt](<E:/Projects/SQL Lession/src/content/lessons/1-1-database-la-gi.mdx>), [bài 1.5](<E:/Projects/SQL Lession/src/content/lessons/1-5-doc-so-do-erd.mdx>); phần AND/OR và ngoặc ở [bài 2.3](<E:/Projects/SQL Lession/src/content/lessons/2-3-and-or-in-between-like.mdx>).
- [Bài 3.1](<E:/Projects/SQL Lession/src/content/lessons/3-1-count-sum-avg.mdx>), [3.2](<E:/Projects/SQL Lession/src/content/lessons/3-2-group-by-pivottable.mdx>), [3.3](<E:/Projects/SQL Lession/src/content/lessons/3-3-having-loc-sau-khi-gop.mdx>), [3.4](<E:/Projects/SQL Lession/src/content/lessons/3-4-inner-join-vlookup.mdx>), [3.5](<E:/Projects/SQL Lession/src/content/lessons/3-5-left-join.mdx>).
- [MDX bài 3.6](<E:/Projects/SQL Lession/src/content/lessons/3-6-ket-nhieu-bang.mdx>) và [YAML bài tập](<E:/Projects/SQL Lession/src/content/exercises/3-6-ket-nhieu-bang.yaml>), gồm prompt, cột, thứ tự và answer để đối chiếu tĩnh.
- [HTML build bài 3.6](<E:/Projects/SQL Lession/dist/bai/3-6-ket-nhieu-bang/index.html>), ba HTML trang bài tập tương ứng và CSS được chính HTML tham chiếu, chỉ bằng đọc file. Có kiểm chuỗi SQL, nội dung drawer, tab thật, dữ liệu sao chép và token tab rộng 4.

**Chưa xác minh / không thực hiện:**

- Không đọc seed `database/HRM_Demo.sql`, spec/plan tác giả, review cũ hoặc thư mục verification; không dùng tài liệu ngoài, web, DB, API hay browser.
- Không chạy SQL. Các tổng `45`, `43`, truy vấn kiểm trùng trả `0`, số tiền lương và các dòng Result/RunFlow **chưa được xác minh độc lập trên database** trong review này. Khớp câu kể ở hồ sơ công ty chỉ là đối chiếu nội bộ tài liệu. Chỉ xác nhận được phép tính số học của khoản tiền minh họa và sự nhất quán tĩnh trong nội dung đã đọc.
- Không đo thời gian học 25 phút; không kiểm bằng ảnh bố cục, cuộn sơ đồ, trạng thái focus hoặc clipboard sau thao tác thật. Phân tích tĩnh HTML/CSS không thay thế kiểm giao diện theo mục 4.4 của quy ước.
- Không chạy test/build/check:exercises/check:dist vì đây là lượt học thử độc lập chỉ tạo report; không báo các check đó đạt hoặc lỗi nền khi chưa chạy. Không sửa source, test, spec hay plan.

Kết quả review là báo cáo này; không có thay đổi bài học.

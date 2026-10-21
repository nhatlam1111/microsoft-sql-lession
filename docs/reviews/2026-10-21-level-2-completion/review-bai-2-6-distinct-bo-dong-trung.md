# Review độc lập bài 2.6 — DISTINCT: bỏ dòng trùng

Ngày review: 21/10/2026. Công cụ: Codex; model kế thừa model của phiên, không chỉ định model khác. Vai người học: Business Consultant muốn học đủ để hiểu và phản biện yêu cầu dữ liệu khi chuyển sang BA/PM.

Phạm vi đã đọc: toàn bộ MDX/YAML bài 2.6; AGENTS.md, quy ước, template, hồ sơ công ty, bài 1.1 đã duyệt và các phần liên quan của bài 2.1–2.5. Đã đọc HTML tĩnh của bài và ba trang bài tập trong bản build lúc 21:46 ngày 21/10. Không đọc bản review cũ, không đọc script database, không tra tài liệu ngoài, không gọi API hay chạy SQL. Đã đọc bối cảnh và mục “Không làm theo” của spec; không đề nghị đổi các quyết định đã chốt.

Kết luận: chưa thấy lỗi kiến thức, mâu thuẫn dữ kiện hay câu dẫn khiến người học phải đoán điều kiện chính. Có một gợi ý biên tập tùy chọn để tự kiểm mục tiêu giải thích tác động của MaNV. Các giới hạn phân biệt lời giải bằng dữ liệu hiện có được ghi ở mục 10–12; đó chưa phải lỗi của bài hay bằng chứng bộ chấm thực tế đã nhận lời giải sai.

**1. Mục tiêu và tình huống — Giữ được.** MDX dòng 11, 18–26.

Câu gốc: “bạn lấy được danh sách không trùng trên một hoặc nhiều cột và giải thích được vì sao thêm mã nhân viên làm đổi kết quả”; “Lấy cả hồ sơ đang làm và đã nghỉ, mỗi mã phòng hiện một lần thôi, xếp mã tăng dần.”

Tôi hỏi: đang cần danh mục phòng công ty, phòng có người đang làm hay mã phòng xuất hiện trong mọi hồ sơ? Bài trả lời ngay bằng phạm vi toàn bộ `NhanVien`, không lọc ngày/trạng thái, và chỉ rõ phòng chưa có hồ sơ sẽ vắng mặt dù có trong `PhongBan`. Mốc tháng 10/2026, người hỏi và phạm vi khớp hồ sơ công ty. `Key` chốt đúng phép biến đổi cần học. Không cần thêm cảnh báo hay câu hỏi dẫn.

**2. Điểm tựa Excel và hình đầu bài — Giữ được.** MDX dòng 32–41.

Câu gốc: “Công cụ này bỏ các dòng trùng trong vùng đã chọn, nên dùng bản sao để giữ danh sách hồ sơ”; “Hai ô `B3`, `B4` được đánh dấu cùng chứa `KD`”.

Tôi hỏi: vì sao phải chép riêng cột, vì sao không bỏ trùng ngay trên hồ sơ, và mã phòng lặp có phải lỗi không? Bài đã trả lời bằng phạm vi vùng chọn, bản sao và hai hồ sơ khác nhau cùng `KD`. Hình đúng vị trí: `NV002`/`KD` ở dòng 3, `NV003`/`KD` ở dòng 4; `mark` khớp lời dẫn. Đây là hình trước khi lọc, không cần số dòng nhảy cóc. Advanced Filter được nêu như lựa chọn có thể chép sang vùng khác, không hứa mọi thao tác đều tự giữ nguồn. Không cần mở rộng thao tác Excel.

**3. Định nghĩa DISTINCT và thay đổi tiêu chí so trùng — Giữ được.** MDX dòng 43–45.

Câu gốc: “`DISTINCT` chỉ giữ các dòng không trùng nhau trong kết quả, xét trên các cột được chọn sau `SELECT`”; “nó không xóa hồ sơ trong `NhanVien`”.

Tôi hỏi: SQL đang bỏ hồ sơ, bỏ riêng từng ô hay chỉ thay danh sách trả về? Hai đoạn trả lời được cả ba: chọn `MaPB` tạo dòng kết quả chỉ có mã phòng; không có `DISTINCT` vẫn có một dòng trên mỗi hồ sơ; có `DISTINCT` thì bỏ dòng kết quả trùng. So sánh Excel chỉ nói tương tự về căn cứ so trùng, không khẳng định Excel và SQL giữ nguyên cùng những cột đầu ra. Chữ đậm đặt ở định nghĩa, tên bảng/cột và từ khóa có code. Không cần cắt câu giải thích phạm vi chỉ để ngắn hơn.

**4. Ví dụ hai cột — Giữ được.** MDX dòng 49–68, khối `Sql`/`Result` đầu tiên.

Câu gốc: “trùng dòng kết quả nghĩa là cả mã phòng và mã chức danh đều giống nhau”; “Hai dòng đánh dấu cùng `IT` nhưng khác `CV` và `CVC`, nên đều được giữ.”

Tôi hỏi: vì sao `IT` vẫn lặp sau `DISTINCT`, vậy công cụ có làm đúng không? Ví dụ trả lời trực tiếp bằng hai cặp khác nhau. `mark={[3,4]}` đúng hai dòng đang giải thích; SQL sắp theo cả `MaPB`, `MaCD`; hình trích mười dòng và báo tổng mười chín, không giả vờ đây là toàn bộ kết quả. Từ bảng hồ sơ có thể suy ra 19 cặp: BGD 2, IT 4, KD 4, KT 4, NS 3, VH 2; mười dòng đã hiện phù hợp. Đây là đối chiếu tài liệu, chưa phải xác minh SQL live. Giữ cách dùng kết quả để chứng minh định nghĩa.

**5. Thêm MaNV, NULL và giới hạn độ sâu — Giữ được.** MDX dòng 70–87, khối `Sql`/`Result` thứ hai.

Câu gốc: “Trong bảng này, `MaNV` được khai báo là khóa chính nên không trùng”; “Nếu chỉ chọn một cột có nhiều `NULL`, `DISTINCT` giữ một dòng `NULL`”.

Tôi hỏi: vì sao thêm cột lại tăng số dòng, và vì sao `NULL` được gom dù bài 2.5 nói so sánh với `NULL` cho UNKNOWN? Bài trả lời câu đầu bằng căn cứ khóa chính ở chính bảng nguồn, không suy mã nhân viên lúc nào cũng duy nhất trong mọi truy vấn. Hai dòng `IT`/`CV` khác `NV017`, `NV021` làm cơ chế nhìn thấy được; bốn dòng đầu phù hợp bảng hồ sơ. Câu về `NULL` gọi đây là quy tắc so trùng, tách khỏi việc đã biết giá trị thiếu. Chưa có kết quả chạy riêng cho trường hợp `NULL`, nên chỉ ghi nhận lời giải thích rõ, không xác nhận đã thử. Đoạn “Ở bài này chỉ cần…” đặt đúng ranh giới với đếm và kiểm chất lượng dữ liệu; không cần thêm COUNT hay ví dụ ngoại lệ.

**6. Câu trả lời tình huống và ORDER BY — Giữ được.** MDX dòng 91–108.

Câu gốc: “toàn bộ `48` hồ sơ đang lưu, gồm cả đang làm và đã nghỉ, có `6` mã phòng xuất hiện”; “`DISTINCT` không bảo đảm thứ tự”.

Tôi hỏi: đã trả lời đúng chị Hạnh chưa, có thể dùng danh sách này để suy số người mỗi phòng không, và tại sao không sắp theo ngày vào làm? Câu lệnh chọn đúng một cột, không có điều kiện lọc ngoài yêu cầu, có thứ tự tăng dần. Lời giải nằm cạnh kết quả, nói rõ không cho biết số người. Sáu mã và tổng hồ sơ khớp hồ sơ công ty. Quy tắc cột `ORDER BY` trong `SELECT DISTINCT` có lý do ngay sau dấu hai chấm: mỗi mã phòng có thể đại diện cho nhiều ngày vào làm. Không cần tách phần trả lời riêng hay chèn thêm ví dụ lỗi SQL.

**7. Toàn bộ RunFlow — Giữ được, chưa xác minh tương tác.** MDX dòng 112–174.

Câu gốc: “Sơ đồ mô tả thứ tự xử lý logic, không phải cách SQL Server đọc dữ liệu vật lý”; “Vẫn `48` dòng”; “Còn `6` dòng”; “Vẫn `6` dòng”.

Tôi hỏi: vì sao SELECT chưa giảm số dòng, DISTINCT mới giảm, rồi ORDER BY không làm mất mã nào? Bốn bước và các drawer trả lời đủ: FROM 48 dòng/12 cột → SELECT 48 dòng/1 cột → DISTINCT 6 dòng/1 cột → ORDER BY vẫn 6 dòng/1 cột. `meaning` bắt đầu bằng từ khóa; `detail` cung cấp số dòng thật theo bài; các câu để xem từng bước là truy vấn đọc hoàn chỉnh. Thứ tự chưa được bảo đảm trước ORDER BY được nói rõ. HTML có đủ bốn thẻ và bốn nội dung drawer; giá trị đánh dấu bằng code trong lời giải đã render thành phần tử code, không lộ backtick. Các trường bổ sung như email, số CCCD, ngày sinh trong bảng nguồn chưa được xác minh độc lập ngoài việc nhất quán với ví dụ các bài trước. Không kết luận nút/drawer hoạt động chỉ từ HTML.

**8. Hay nhầm và Ứng dụng — Giữ được.** MDX dòng 180–192.

Câu gốc: “Thêm mã nhân viên cho dễ đối chiếu rồi vẫn mong mỗi phòng một dòng”; “Nếu bỏ mã và các cột còn lại giống nhau”; “lấy các cặp phòng/chức danh thực sự xuất hiện trong hồ sơ để đối chiếu chức danh đang dùng ở từng phòng”.

Tôi hỏi: cái giá của chọn sai cột là gì, vì sao danh sách ngắn chưa chứng minh dữ liệu sạch, và dùng DISTINCT vào việc gì? Ba lỗi có hậu quả cụ thể: sai mức chi tiết, mất người khi xóa nhầm, che hai hồ sơ phía nguồn. Điều kiện “bỏ mã và các cột còn lại giống nhau” làm nhận xét che lỗi đủ chính xác, không khẳng định DISTINCT sẽ che mọi lỗi. Ba ứng dụng đều dùng đúng khả năng lấy giá trị/cặp đang xuất hiện và có mục đích; không hứa đây là danh mục đầy đủ hay đã thống kê số người. Phần này nhắc nguyên lý để gắn hậu quả công việc, chưa thấy đoạn lặp thuần túy cần cắt.

**9. Ghi nhớ và lời dẫn bài tập — Biên tập tùy chọn.** MDX dòng 198–207.

Câu gốc: “MaNV là khóa chính của bảng nguồn; chọn thêm mã thì mỗi hồ sơ vẫn một dòng”; “Xác định mỗi dòng cần đại diện cho giá trị nào trước khi chọn cột.”

Tôi hỏi: ngoài viết truy vấn, tôi đã tự giải thích được tác động khi thêm MaNV như mục tiêu đầu bài yêu cầu chưa? Phần giảng và Memo trả lời rõ, nhưng ba bài tập dưới chỉ yêu cầu trả danh sách; chưa có yêu cầu người học tự phát biểu nguyên nhân. Đây là khoảng trống tự kiểm nhỏ, không phải thiếu kiến thức để học tiếp. Nếu muốn khép đủ hai vế mục tiêu mà giữ ba bài tập, có thể thay câu dẫn chung bằng một câu tự kiểm: “Trước khi làm, tự giải thích vì sao thêm `MaNV` khiến danh sách không còn mỗi phòng một dòng.” Không bắt buộc thêm câu, đáp án, bài thứ tư hay đổi bộ chấm. Bốn dòng Memo còn lại và lời thông báo chấm vị trí cột/thứ tự, không so tên cột, giữ được.

**10. Bài tập 2-6-1 — Giữ được; có giới hạn chấm theo dữ liệu.** YAML dòng 3–16.

Câu gốc: “Lấy danh sách MaCD không trùng trên toàn bộ hồ sơ đang lưu… Không thêm điều kiện lọc”; đáp án dùng `SELECT DISTINCT MaCD` và `ORDER BY MaCD ASC`.

Tôi hỏi: bài này kiểm việc bỏ trùng được không, có thể chép nguyên ví dụ để đạt không? Theo hồ sơ, 48 dòng chứa sáu mã chức danh, nên bỏ DISTINCT sẽ còn 48 thay vì sáu; câu ví dụ lấy MaPB không đáp ứng cột/giá trị yêu cầu. Cột, thứ tự và SQL lời giải khớp nhau; HTML trang bài tập có đề, không hiện đáp án.

Giới hạn suy luận: sáu chức danh đều còn ít nhất một hồ sơ đang làm, nên thêm sai điều kiện chỉ lấy đang làm vẫn có thể cho cùng sáu mã. Điều này không làm đề sai; không nên coi kết quả đúng là bằng chứng người học đã hiểu “toàn bộ hồ sơ”. Chưa chạy bộ chấm nên không khẳng định thực tế nó nhận câu sai. Không đề nghị đổi dữ liệu hoặc chặn cú pháp; giữ yêu cầu phạm vi rõ như hiện tại.

**11. Bài tập 2-6-2 — Giữ được; điều kiện phòng có tác dụng phân biệt.** YAML dòng 17–32.

Câu gốc: “chỉ xét hồ sơ có MaPB là IT hoặc NS… Lấy mỗi cặp MaPB, MaCD một lần”; đáp án dùng `WHERE MaPB IN ('IT', 'NS')`.

Tôi hỏi: nếu bỏ lọc hoặc bỏ DISTINCT thì kết quả có khác ngay trên bộ mẫu không? Theo bảng hồ sơ, IT có bốn cặp, NS có ba cặp: dự kiến bảy dòng sau DISTINCT trên mười lăm hồ sơ. Bỏ WHERE đưa các phòng khác vào, dự kiến mười chín cặp; bỏ DISTINCT giữ mười lăm dòng. Vì vậy đây không phải điều kiện “có viết cũng như không” đối với hai lỗi chính đó. SQL và prompt thống nhất thứ tự hai cột và hai tiêu chí sắp xếp; câu ví dụ toàn công ty không được dùng nguyên văn làm đáp án.

Giới hạn: IT và NS không có người đã nghỉ theo hồ sơ công ty, nên thêm sai điều kiện đang làm không đổi kết quả hiện tại. Cụm “đã nghỉ nếu có” diễn tả đúng yêu cầu nhưng không tự tạo ca dữ liệu kiểm được nó. Đây là giới hạn bao phủ đã nhận diện, không phải kết luận lỗi bài tập; root cần kiểm DB nếu muốn ghi số liệu thực thi.

**12. Bài tập 2-6-3 — Giữ được; phân biệt bỏ WHERE và DISTINCT, chưa phân biệt được mọi cách lọc sai.** YAML dòng 33–48.

Câu gốc: “chỉ xét hồ sơ có NgayNghiViec khác NULL. Không thêm điều kiện trạng thái hoặc khoảng ngày”; đáp án dùng `IS NOT NULL`, `DISTINCT`, `MaPB DESC`.

Tôi hỏi: đã đủ dữ liệu để thấy cần cả lọc lẫn bỏ trùng chưa? Hồ sơ công ty có NV020 ở KD, NV033 và NV041 ở VH với ngày nghỉ việc: suy ra ba hồ sơ, hai mã phòng. Không DISTINCT thì VH xuất hiện hai lần; không WHERE thì có sáu mã; viết `= NULL` thì không lấy được nhóm theo lý thuyết bài 2.5. Chiều giảm dần cần khác chiều tăng của câu ví dụ, nên ví dụ không trả lời sẵn.

Giới hạn: bộ mẫu quy ước ba người có ngày nghỉ cũng chính là ba hồ sơ trạng thái Đã nghỉ. Vì thế thay điều kiện ngày bằng trạng thái có thể cho cùng hai mã, dù không làm đúng cách lọc đề yêu cầu. Đây là sự tương đương trên dữ liệu hiện tại, chưa phải chứng cứ grader bắt buộc hay không bắt buộc cú pháp. Đồng thời, chỉ so thứ tự kết quả một lần không chứng minh câu có ORDER BY: khi thiếu ORDER BY, không được đoán thứ tự SQL Server sẽ trả. Giữ lời giải và yêu cầu hiện tại; không cần đổi UI/API hay thêm bộ chấm cú pháp.

**Ưu tiên xử lý:** không có mục Cần sửa/Cần làm rõ bắt buộc. Mục 9 là gợi ý tùy chọn, có thể không làm để giữ bài gọn. Mục 10–12 cần được giữ đúng tư cách giới hạn khi báo cáo kết quả kiểm, không chuyển thành khẳng định đã bắt được mọi lỗi điều kiện hoặc thiếu ORDER BY. Không tìm thấy câu bắt buộc phải cắt hay gộp.

**Nguồn đối chiếu:** [quy ước](E:/Projects/SQL%20Lession/docs/quy-uoc.md), [template](E:/Projects/SQL%20Lession/docs/lesson-template.md), [hồ sơ công ty](E:/Projects/SQL%20Lession/docs/ho-so-cong-ty.md), [bài chuẩn 1.1](E:/Projects/SQL%20Lession/src/content/lessons/1-1-database-la-gi.mdx), bài 2.1–2.5, [MDX bài 2.6](E:/Projects/SQL%20Lession/src/content/lessons/2-6-distinct-bo-dong-trung.mdx), [YAML bài 2.6](E:/Projects/SQL%20Lession/src/content/exercises/2-6-distinct-bo-dong-trung.yaml), HTML tĩnh của bài và `bai-tap/1`, `bai-tap/2`, `bai-tap/3` trong dist. Mục Không làm theo của spec được dùng làm bối cảnh, không dùng kết luận review cũ làm bằng chứng.

**Giới hạn xác minh:** chưa kiểm SQL Server live, API chấm bài, thao tác trình duyệt, bố cục thị giác, bàn phím hay màn hình nhỏ. Chỉ xác nhận nội dung có trong HTML, không xác nhận các nút hoạt động. Các số dòng/cặp trong nhận xét là suy luận từ hồ sơ công ty và nội dung bài, chưa thực thi. Prompt YAML hiện thành văn bản thuần trong HTML; không coi đó là tên bảng/cột đã có kiểu code và không đề nghị sửa component ngoài phạm vi. Không chạy test/build vì lượt này chỉ tạo report và bản build mới đã có sẵn.

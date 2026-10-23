# Review độc lập bài 3.3 — HAVING: lọc sau khi gộp

- Ngày: 23/10/2026. Công cụ: Codex; model kế thừa model của phiên, không đoán tên model cụ thể.
- Vai đọc: Business Consultant khó tính muốn chuyển sang BA/PM, học để hiểu yêu cầu dữ liệu và phản biện cách làm. Không mang ngữ cảnh tác giả.
- Phạm vi: toàn bộ MDX, YAML ba bài tập, test liên quan, HTML bài học và ba trang bài tập trong bản build hiện có. Đếm trực tiếp được **99 file HTML** trong `dist`.
- Giữ các quyết định được giao: khung gộp Excel/SQL; ba bài tập đại diện; không đổi UI/API/schema/grader/dữ liệu; không dạy trước kết bảng, truy vấn con, window hoặc COUNT có CASE; không hứa nhanh hơn khi đổi chỗ lọc.

## Kết luận

Trong phạm vi học thử và đối chiếu tĩnh, **không phát hiện lỗi kiến thức hoặc lỗi đề/đáp án cần chặn bài 3.3**. Bài nối tiếp 3.2 rõ, phân biệt dòng với nhóm, đóng tình huống ngay cạnh kết quả, và dùng đúng nhóm có số lượng bằng ngưỡng để giải thích `>`/`>=`. Ba bài tập có các trường hợp biên thật và kiểm ba kỹ năng khác nhau.

Có một biên tập nhỏ tùy chọn về câu lặp sau bảng đối chiếu. Giới hạn cần ghi nhận là dữ liệu bài tập 1 và 2 không có trường hợp bằng chỉ tiêu để kiểm tiêu chí sắp phụ; chấm kết quả cũng không chứng minh người học đã dùng một cú pháp cụ thể. Đây không phải lý do đổi dữ liệu hoặc cưỡng chế cú pháp.

## Rà theo thứ tự bài

### 1. Mục tiêu, tình huống và phạm vi — Giữ được

**Câu gốc:** “Em giữ giúp chị những phòng có trên 10 hồ sơ đang làm thôi nhé.”; “Giả định: vẫn đọc `NhanVien` đang lưu, chọn `TrangThai = N'Đang làm'` và nhóm theo `MaPB` hiện tại.” (MDX 21–24).

**Tại sao/để làm gì:** Tôi cần biết đang lọc người, hồ sơ hay phòng; “hiện tại” có phải tháng lịch sử không. **Bài đã trả lời:** dòng nguồn là hồ sơ, đầu ra là nhóm phòng, lấy trạng thái và mã phòng hiện lưu; không suy ra số người theo phòng ở một tháng đã qua. “Trên `10`” được chốt là không gồm đúng `10`.

**Đề xuất:** Giữ. Mục tiêu frontmatter khớp thao tác thực tế; không cần thêm giả định thời gian lịch sử hoặc một đoạn giải thích lại mô hình nhân sự.

### 2. Điểm tựa Excel và hình đánh dấu — Giữ được

**Câu gốc:** “**Value Filters** là bộ lọc theo giá trị đã tổng hợp: chọn `Count of MaNV` lớn hơn `10`…”; “ô `B2` được chọn là số lượng của mã phòng `KD` ở `A2`.” (32–37).

**Tại sao/để làm gì:** Tôi muốn hiểu lọc con số của PivotTable khác lọc danh sách nguồn ở đâu. **Bài đã trả lời:** Value Filters xét số đã tổng hợp; phạm vi đang làm được kế thừa từ PivotTable bài 3.2. Hình được gọi rõ là minh họa phần kết quả, không giả là giao diện thao tác đầy đủ.

**Đề xuất:** Giữ. HTML có `A2 = KD` mang `xl-mark`, `B2 = 13` mang `xl-sel xl-mark xl-num`, đúng dẫn chứng. Không cần ép có hình hộp thoại Value Filters; tương tác, màu sắc và bố cục khi mở trang do root kiểm live.

### 3. Định nghĩa HAVING và bảng dòng/nhóm — Giữ được

**Câu gốc:** “`HAVING` đặt điều kiện lên các nhóm sau khi `GROUP BY` hình thành nhóm và tính số liệu tổng hợp.”; bảng ghi `WHERE`: `48 → 45` hồ sơ, `HAVING`: `6 → 1` nhóm (39–44).

**Tại sao/để làm gì:** Vì sao không dùng bộ lọc đã biết là `WHERE` cho tất cả? **Bài đã trả lời:** hai mệnh đề xét hai đối tượng, ở hai mốc logic. Bảng bổ sung số dòng/nhóm cụ thể, giúp tôi không hiểu nhầm `HAVING` là tiếp tục lọc từng nhân viên.

**Đề xuất:** Giữ. Đếm lại từ bảng hồ sơ trong `ho-so-cong-ty.md` được 48 hồ sơ, 45 chưa nghỉ và sáu nhóm `13, 10, 8, 7, 5, 2`; chỉ `KD = 13` vượt 10. Đây là đối chiếu tài liệu, không phải xác minh database đang chạy.

### 4. Hậu quả của lọc nhóm và một vế có thể rút — Biên tập tùy chọn

**Câu gốc:** “`HAVING` loại cả nhóm không đạt điều kiện khỏi kết quả, không chọn lại từng hồ sơ trong nhóm. Phòng còn lại vẫn mang số lượng được tính từ toàn bộ hồ sơ đã qua `WHERE`; hai bộ lọc làm hai việc khác nhau, không thay thế nhau.” (46).

**Tại sao/để làm gì:** Giữ phòng `KD` có làm thay đổi 13 hồ sơ đem đếm không? **Bài đã trả lời tốt:** không; ngưỡng chỉ loại nhóm khỏi kết quả. Đây là hệ quả hữu ích hơn việc chỉ học vị trí từ khóa.

**Đề xuất:** Giữ hai ý về loại nhóm và giữ nguyên phép đếm. Nếu cần rút chữ, có thể bỏ riêng vế “hai bộ lọc làm hai việc khác nhau, không thay thế nhau”, vì bảng ngay trước đã thể hiện việc đó. Không coi đây là lỗi kỹ thuật hoặc yêu cầu sửa bắt buộc.

### 5. Đối chiếu WHERE SoNgay với HAVING SUM — Giữ được

**Câu gốc:** “`WHERE SoNgay >= 2` chỉ đưa các đơn ít nhất `2` ngày vào phép tính. Nếu không lọc trước theo `SoNgay`, `HAVING SUM(SoNgay) >= 2` giữ loại nghỉ có tổng ít nhất `2` ngày, kể cả các đơn `1` ngày trong nhóm.” (50).

**Tại sao/để làm gì:** Chuyển điều kiện từ `WHERE` sang `HAVING` chỉ đổi cách viết hay đổi câu hỏi? **Bài đã trả lời:** chọn đơn dài tối thiểu khác chọn loại nghỉ có tổng tối thiểu; đơn một ngày có thể vẫn góp vào tổng của nhóm đạt ngưỡng. Điều kiện “nếu không lọc trước theo `SoNgay`” làm phép đối chiếu đủ rõ.

**Đề xuất:** Giữ ví dụ ngắn này và câu hậu quả “đổi cả tổng và những nhóm xuất hiện”. Không cần thêm một truy vấn hoàn chỉnh, một bộ số giả, hoặc bàn tối ưu tốc độ; bài tập 2 đã cho chỗ áp dụng `SUM`.

### 6. Thứ tự viết, thứ tự logic và alias — Giữ được

**Câu gốc:** “theo thứ tự logic, `HAVING` đứng trước `SELECT`: alias `SoHoSo` tạo trong `SELECT` chưa dùng được ở `HAVING` của cùng câu”; “ở `ORDER BY`, sau `SELECT`, bạn dùng được `[SoHoSo]`.” (52).

**Tại sao/để làm gì:** Vì sao phải viết lại `COUNT(*)` trong khi vừa đặt tên `SoHoSo`? **Bài đã trả lời trực tiếp**, phân biệt thứ tự gõ và mốc alias có hiệu lực trong cùng câu. Alias đã được giải nghĩa ở 2.1 và dùng trong 3.2; không phải thuật ngữ mới bỏ lửng ở đây.

**Đề xuất:** Giữ. Dẫn 3.10 và 3.4 ở đoạn “Ở bài này chỉ cần…” đặt đúng giới hạn, không dạy trước kỹ thuật. Không cần đưa các biến thể HAVING ngoài phạm vi câu nhóm đang học vào bài nhập môn này.

### 7. Câu lệnh, kết quả và câu trả lời nghiệp vụ — Giữ được

**Câu gốc:** `HAVING COUNT(*) > 10` và `ORDER BY [SoHoSo] DESC, MaPB ASC`; “`IT` có đúng `10` nên không qua điều kiện ‘trên `10`’; đổi sang `>= 10` thì phòng này cũng được giữ.” (60–71).

**Tại sao/để làm gì:** Tại sao chỉ có `KD`? Một dòng rồi còn sắp xếp làm gì? **Bài đã trả lời:** `KD = 13`, `IT = 10` nằm đúng biên bị loại; drawer ORDER BY giải thích giữ thứ tự đã yêu cầu để câu còn đúng khi có thêm phòng đạt ngưỡng. Hồ sơ công ty và bài 3.2 thống nhất với kết quả này.

**Đề xuất:** Giữ toàn bộ lời giải ngắn cạnh kết quả. Câu “không tự kết luận phòng nào đang thiếu người” tách được số liệu và quyết định; không suy diễn báo cáo đầu người thành định biên. Câu SQL đầy đủ dùng Unicode đúng và không trùng nguyên văn đáp án ba bài tập.

### 8. RunFlow sáu bước và số dòng — Giữ được; phần tương tác chưa kiểm

**Câu gốc:** “Bấm từng bước để xem dữ liệu bằng một câu `SELECT` riêng; alias trong các câu kiểm không làm alias của câu gốc xuất hiện sớm hơn.”; các bước có tổng `48 → 45 → 6 → 1 → 1 → 1` (75–196).

**Tại sao/để làm gì:** Vì sao bước GROUP BY đã có bảng mang nhãn `SoHoSo` khi SELECT của câu gốc còn ở sau? Vì sao bảng FROM chỉ thấy mười hồ sơ? **Bài đã trả lời:** mỗi bảng được hiện bằng một câu SELECT riêng; FROM nêu rõ trích ba cột/mười hồ sơ, tổng thật vẫn 48. WHERE vẫn là dòng hồ sơ, GROUP BY mới thành dòng phòng. Ba hồ sơ đã nghỉ trong phần trích FROM bị loại đúng ở WHERE.

**Đề xuất:** Giữ. HTML có đủ sáu panel, highlight đúng từng mệnh đề; lời giải đều bắt đầu từ từ khóa, có số dòng và code được render, không lộ backtick. Cảnh báo thứ tự trước ORDER BY và thứ tự thực thi vật lý đủ rõ. Tôi chưa bấm mở drawer, kiểm bàn phím, cuộn hoặc responsive; không coi HTML tĩnh là kiểm live.

### 9. Ba lỗi thường gặp — Giữ được

**Câu gốc:** “Đặt `COUNT(*) > 10` vào `WHERE`…”; “Bỏ `WHERE` vì đã có `HAVING`…”; “Dùng nhầm chỉ tiêu trong `HAVING`…” (202–204).

**Tại sao/để làm gì:** Nếu viết sai thì bị lỗi ngay hay vẫn ra báo cáo có vẻ hợp lý? **Bài đã trả lời cả hai:** phép tổng hợp trong WHERE của câu đang xét bị lỗi; bỏ WHERE vẫn ra `KD` nhưng thành 14; chọn COUNT thay SUM là đổi đơn vị đo từ ngày thành đơn.

**Đề xuất:** Giữ. Mục 2 đáng giữ dù nhắc lại phạm vi, vì đưa hậu quả mới `KD = 14`, không chỉ giảng lại định nghĩa. Mục 3 nối được ví dụ đơn nghỉ với bài tập 2. Không có thông báo lỗi nguyên văn tự sáng tác cần kiểm lại.

### 10. Ứng dụng, Ghi nhớ và tự kiểm tra — Giữ được

**Câu gốc:** “Rà loại nghỉ có tổng ngày lớn…”; “nhóm theo cặp phòng và chức danh…”; câu tự kiểm tra hỏi dữ liệu được WHERE/HAVING xét và đổi `> 10` thành `>= 10` (212–245).

**Tại sao/để làm gì:** Sau bài này tôi làm được báo cáo nào và tự biết đã hiểu chưa? **Bài đã trả lời:** lọc nhóm theo số hồ sơ, tổng ngày hoặc cặp khóa có ngưỡng đã thống nhất; không hứa tự xác định thiếu người hay đủ năng lực. Hai câu tự kiểm tra bám hai sai lầm chính và có đáp án tự đủ nghĩa.

**Đề xuất:** Giữ. Ghi nhớ lặp kiến thức để ôn là đúng quy ước. Không cần tăng thành một bộ câu hỏi dài; bài có ba bài tập thực hành và không thuộc trường hợp bài khái niệm phải có tối thiểu ba câu tự kiểm tra. Thời lượng 20 phút hợp lý nếu tính phần xem bước và thực hành, chưa có đo thời gian học thực tế.

### 11. Lời dặn bộ chấm và HTML bài tập — Giữ được

**Câu gốc:** “bộ chấm so kết quả, không kiểm alias hay bắt buộc cú pháp. Tự đối chiếu rằng điều kiện chọn dòng nằm ở `WHERE`, điều kiện theo chỉ tiêu nhóm nằm ở `HAVING`.” (229).

**Tại sao/để làm gì:** Được chấm đúng có chứng minh tôi đã học đúng HAVING không? **Bài đã trả lời giới hạn thật:** kết quả đúng không chứng minh một cấu trúc câu lệnh cụ thể; người học còn phải tự đối chiếu ý nghĩa. YAML cũng phân biệt thứ tự cột cần có với tên alias không chấm.

**Đề xuất:** Giữ cách nói này; không ép cú pháp ở grader. HTML đủ ba đề, đường dẫn Làm bài đều có trang đích. Kiểm riêng ba đáp án với 119 file HTML/JS của build bằng `findAnswerLeaks` không tìm thấy rò đáp án; `missingExerciseLinks` không báo link thiếu. Không gọi đây là kết quả của toàn bộ `check:dist`.

### 12. Bài tập 1: hai biên đếm — Giữ được; nhận diện giới hạn sắp phụ

**Câu gốc:** “số hồ sơ lớn hơn 5 và nhỏ hơn hoặc bằng 10”; đáp án dùng `HAVING COUNT(*) > 5 AND COUNT(*) <= 10` (YAML 7–21).

**Tại sao/để làm gì:** Đề có thực sự bắt được nhầm `>`/`>=` và `<`/`<=` không? **Có theo hồ sơ công ty:** `NS = 5` phải bị loại, `IT = 10` phải được giữ; kết quả là `IT 10`, `VH 8`, `KT 7`. Bỏ WHERE khiến VH thành 10, nên số lượng cũng khác đáp án. Đề, cột trả về và đáp án thống nhất, không thể nộp nguyên câu tình huống để đúng.

**Đề xuất:** Giữ. Ba số 10/8/7 khác nhau nên bài này không kiểm được nhầm bỏ tiêu chí sắp phụ MaPB khi bằng số lượng. Ghi nhận giới hạn cố định của dữ liệu, không đề nghị đổi dữ liệu hoặc thêm bài để sửa một kỹ năng sắp xếp đã có ở 2.4.

### 13. Bài tập 2: tổng ngày khác số đơn — Giữ được; số thực thi chưa tự xác minh

**Câu gốc:** “Cộng toàn bộ SoNgay trên các đơn đạt điều kiện, không phân bổ ngày thực nghỉ theo tháng”; “tổng SoNgay lớn hơn hoặc bằng 5”; đáp án dùng `HAVING SUM(SoNgay) >= 5` (YAML 26–43).

**Tại sao/để làm gì:** Bài có kiểm đúng chỉ tiêu và đúng phạm vi, thay vì chỉ đổi số 10 thành số 5 không? **Có:** đề giữ quy ước tháng bắt đầu/trạng thái của 3.1, trả cả SoDon lẫn TongNgay để phân biệt hai đơn vị đo. Test nguồn ghi các tổng 9/5/2; do đó `>= 5` khác `> 5` ngay tại Nghỉ ốm = 5, và chọn COUNT thay SUM sẽ không cho cùng nhóm này. Dãy SoNgay trong 3.1 chỉ có bốn đơn một ngày và không đơn nào quá ba ngày, phù hợp với phép phân biệt đó.

**Đề xuất:** Giữ đề và lời giải. Tổng theo từng loại 9/5/2 chỉ được đọc từ test, chưa được reviewer xác minh với database hoặc danh sách đơn có LoaiNghi; không lấy assertion của test làm bằng chứng thực thi SQL. Hai tổng đạt ngưỡng 9 và 5 cũng chưa kiểm được tiêu chí sắp phụ LoaiNghi khi bằng tổng.

### 14. Bài tập 3: cặp khóa và ngưỡng gồm đúng ba — Giữ được

**Câu gốc:** “Nhóm theo cặp MaPB và MaCD hiện lưu… có từ 3 hồ sơ trở lên (gồm đúng 3)”; đáp án `GROUP BY MaPB, MaCD` và `HAVING COUNT(*) >= 3` (YAML 48–62).

**Tại sao/để làm gì:** Tại sao không lấy số hồ sơ cả phòng rồi lặp lại trên từng chức danh? **Kiến thức 3.2 đã trả lời**, đề buộc một dòng đại diện cho một cặp, không phải một phòng. Đếm lại bảng hồ sơ công ty được sáu cặp đạt ngưỡng: IT/CV 6; KD/CV 8; KD/NV 3; KT/CV 3; NS/CV 3; VH/NV 7. Ba cặp đúng ba làm lỗi `> 3` khác kết quả; bỏ WHERE làm một số số lượng thay đổi.

**Đề xuất:** Giữ. MaCD đã xuất hiện trong 1.6 cùng mã chức danh; không cần dạy lại danh mục. Đề không đòi tên phòng hoặc tên chức danh nên không buộc kết bảng sớm. Thêm MaNV làm khóa nhóm sẽ không còn cặp đạt ngưỡng, đủ phát hiện sai độ chi tiết.

### 15. Độ sâu, lặp và bảo vệ bằng test — Giữ được trong phạm vi hiện tại

**Câu gốc:** test “3.3 filters rows before grouping, and groups before assigning the SELECT alias”; “3.3 exercises expose both count boundaries, sum boundaries and composite keys” (`tests/content-3-3.test.ts`).

**Tại sao/để làm gì:** Bài có quá tải, và test có bảo vệ được phần dễ sai không? **Đã có bảo vệ phù hợp:** thứ tự/số dòng sáu bước, COUNT thay alias trong HAVING, biên 10, biên 5/10, tổng theo loại và ba cặp đúng 3. Khung nội dung chung vẫn kiểm phần chính gộp, SQL Unicode và hai tiểu mục cuối; 3.3 không nằm trong danh sách cho phép khung cũ. Regex kiểm đáp án chuẩn trong repository không đồng nghĩa cưỡng chế câu SQL học viên.

**Đề xuất:** Giữ độ sâu hiện tại, không thêm LineMap hoặc ví dụ nâng cao. Ngoài vế có thể cắt ở mục 4, các phần nhắc lại còn có vai trò cụ thể: bảng đối chiếu, hệ quả với hồ sơ, drawer có trạng thái dữ liệu, lỗi có hậu quả, rồi ôn. Test nguồn chưa chứng minh mọi câu sai điển hình đều bị grader bác; reviewer không chạy test đọc seed và không chạy API nên không khẳng định điều đó.

## Ưu tiên và kết quả kiểm

1. **Không có sửa bắt buộc được xác lập trong lượt này.** Giữ mạch, tình huống, kết quả, ba bài tập và phạm vi kiến thức.
2. **Tùy chọn:** rút riêng vế lặp ở MDX 46 như mục 4, nếu cần làm bài gọn hơn; không thêm đoạn giải thích để bù.
3. **Cần ghi đúng giới hạn:** kết quả sắp phụ khi hòa chỉ tiêu chưa được dữ liệu bài 1/2 thử tới; không coi điều này là lỗi bài hay lý do sửa grader.
4. **Root kiểm phần còn lại theo phân công:** tương tác live/UI và thực thi truy vấn/API. Báo cáo này không thay những bước đó.

Đã chạy riêng lệnh `vitest run tests/run-flow.test.ts tests/check-dist.test.ts tests/exercises.test.ts`: **3 file, 23 test đạt**. Đây là test cơ chế sơ đồ, kiểm liên kết/rò đáp án và schema/public exercises; không phải kết quả chạy `tests/content-3-3.test.ts` hoặc toàn bộ dự án. Kiểm tĩnh riêng build cho ba đáp án: không rò đáp án và không thiếu ba link bài tập. Không phát hiện lỗi nền trong ba file test đã chạy; không suy ra các kiểm khác đạt.

## Nguồn đối chiếu và giới hạn độc lập

- Đã đọc `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài 1.1 đã duyệt; đọc trọn 3.1, 3.2, 3.3 và YAML 3.3. Đối chiếu các đoạn cần thiết của 1.6, 2.1, 2.3, 2.4 về mã chức danh, alias, điều kiện và sắp xếp.
- Đã đọc test riêng 3.3 cùng phần test nội dung chung liên quan; xem các test và mã phục vụ RunFlow, Exercises, kiểm HTML. Kiểm HTML bài và ba trang bài tập, gồm sáu panel RunFlow; đếm 99 HTML. Các phép đếm hồ sơ/cặp khóa độc lập lấy từ bảng hồ sơ công ty, không từ seed SQL.
- Không đọc spec/plan có nhật ký tác giả hoặc review cũ. Không đọc `database/HRM_Demo.sql`, không kết nối database, không gọi API, không dùng browser, không tra tài liệu ngoài.
- Không tự xác minh dữ liệu SQL Server đang lưu, nguyên văn lỗi SQL, hành vi bộ chấm live, bố cục/màu sắc/tương tác thật trên thiết bị. Những phần chỉ xác nhận được bằng thực thi giữ trạng thái **chưa xác minh**.
- Không sửa sản phẩm, tests, schema, dữ liệu hoặc tài liệu dự án; chỉ tạo báo cáo này.

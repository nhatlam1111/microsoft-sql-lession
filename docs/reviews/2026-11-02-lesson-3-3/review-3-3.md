# Review độc lập bài 3.3 — HAVING: lọc sau khi gộp

## Phạm vi, phiên bản và công cụ

- Review một bài: `src/content/lessons/3-3-having-loc-sau-khi-gop.mdx`, ba trang đề HTML, sau đó mới đối chiếu YAML bài tập. Vai học thử: người chỉ biết Excel văn phòng cơ bản, chưa biết SQL/lập trình/quản trị hệ thống; không mặc định biết PivotTable từ trước khóa học.
- Agent mới, kế thừa model của phiên; không chỉ định model/effort khác và không giao tiếp cho reviewer khác. Công cụ thực tế: shell PowerShell, Python chuẩn để đọc HTML, SHA-256, Git chỉ đọc và công cụ ghi file report. Không dùng browser.
- HEAD đọc được: `0b4527eb73b0694a382417557f0d2ced975a964c`. Manifest ghi build UTC `2026-11-02T16:56:23.6157865Z`. Tự tính lại đủ **12/12 hash khớp**, gồm MDX/YAML, nền 3.1–3.2, các file renderer/style trong manifest và bốn HTML bài/đề. Việc băm YAML chỉ đọc byte, chưa mở nội dung đáp án.
- Đã đọc trọn brief, AGENTS.md, quy ước, template, hồ sơ công ty, quyết định đã duyệt và nền 1.3, 2.1 (bài mẫu), 2.2, 2.3, 2.4, 3.1, 3.2 hiện tại. Không đọc tiến trình spec/plan, verification của tác giả, report cũ hay nhận xét khác.
- Đã đọc toàn MDX 3.3, nội dung HTML phần bài gồm sáu drawer, Excel, SQL, LineMap, Results, ví dụ, bảng soi, ghi nhớ và ba câu tự kiểm tra; đã đọc đủ ba đề từ HTML trước khi mở answer YAML. Đọc HTML bằng parser không đồng nghĩa đã tương tác UI.
- Đọc thêm `src/pages/gioi-thieu.astro` để lần theo đường thực hành mà bài mẫu 2.1 dẫn tới. Chỉ dùng phần hướng dẫn khóa học này; không mở tài liệu SQL ngoài khóa học hoặc bài sau 3.3 để bổ sung kiến thức.
- Lượt được giao ngày 02/11; hoàn tất sau khi ngày địa phương chuyển sang 03/11/2026. Giữ nguyên đường dẫn report của gói giao.

## Cách làm và tiền đề từng đề — ghi trước khi mở answer YAML

Phần này được ghi vào report sau khi đọc toàn bài và cả ba trang đề HTML, **trước khi đọc nội dung YAML**. Chỉ mô tả hướng giải và kiến thức cần có, không chép câu SQL đáp án.

| Đề HTML | Cách làm tự xác định từ lời giảng | Tiền đề và nơi đã dạy | Còn thiếu trước khi xem đáp án |
|---|---|---|---|
| 1 — Phòng có trên 5 đến tối đa 10 hồ sơ đang làm | Chọn hồ sơ đang làm từ `NhanVien` trước; nhóm từng `MaPB`; đếm hồ sơ từng nhóm; giữ đồng thời số đếm lớn hơn 5 và không quá 10; xuất mã phòng rồi số đếm; sắp số đếm giảm, mã tăng. Không tự thêm tổng cộng. Từ bảng sáu nhóm đang có trong bài, dự đoán các phòng đạt hai biên là IT/10, VH/8, KT/7; NS đúng 5 không đạt. | Chọn cột/alias: 2.1. Unicode: 1.3, 2.2. Lọc trạng thái: 2.2 và câu chính 3.3. Điều kiện cùng đúng/AND: 2.3; áp dụng vào HAVING nói rõ tại 3.3 dòng 64. Ngưỡng nghiêm ngặt và gồm mốc: 2.2, giả định 3.3 dòng 24 và kết luận dòng 227. Đếm từng nhóm: 3.1–3.2. Sắp hai tiêu chí: 2.4 và LineMap 3.3. | Không thấy thiếu kiến thức cốt lõi. Phải chuyển “nhỏ hơn hoặc bằng” thành phép so sánh tương ứng, thay hai biên theo đề; đây là vận dụng những phép so sánh đã có, không cần bài sau. |
| 2 — Loại nghỉ có tổng từ 5 ngày | Lọc đơn đã duyệt với ngày bắt đầu từ 01/09 đến trước 01/10/2026; nhóm theo loại nghỉ; đếm đơn và cộng `SoNgay` trong từng loại; lọc bằng tổng ngày đạt từ 5, thay vì dùng số đơn; trả ba cột đúng thứ tự; sắp tổng giảm rồi loại tăng. Cộng toàn bộ số ngày của đơn đã lọc, không chia ngày sang tháng. | Phạm vi đơn, `TuNgay`, `SoNgay`, Unicode, hai mốc ngày và không phân bổ: 3.1. COUNT/SUM: 3.1. Tổng hợp riêng mỗi khóa nhóm và ứng dụng theo `LoaiNghi`: 3.2 phần chính/Ứng dụng. HAVING so đúng chỉ tiêu, đề hỏi tổng dùng SUM: 3.3 dòng 64. “Từ” gồm mốc (`>=`): 2.2 và đối chiếu `>= 10` ở 3.3 dòng 227. Alias/sắp: 2.1, 2.4, 3.3 dòng 66. | Không thấy thiếu kiến thức cốt lõi. Từ bài và dữ liệu được phép đọc chưa tự dựng được đầy đủ tổng từng loại; không dùng hồ sơ công ty về bài sau để bù số liệu, và không coi thiếu bảng toàn bộ đơn là thiếu cách viết truy vấn. Kết quả số cần chạy SQL mới xác minh được. |
| 3 — Cặp phòng và chức danh có từ ba hồ sơ | Lọc đang làm trước; tạo nhóm theo cả `MaPB` và `MaCD`; đếm từng cặp, giữ cặp có ít nhất ba hồ sơ; lấy hai mã rồi số lượng của cặp; sắp mã phòng tăng, trong phòng mã chức danh tăng. Không lấy tổng cả phòng cho mỗi cặp và không tạo các cặp vắng hồ sơ. | Nhóm nhiều cột cách nhau bằng dấu phẩy, mỗi tổ hợp là một nhóm, cột trực tiếp trong SELECT phải nằm trong GROUP BY, không tự tạo nhóm 0: 3.2 phần chính. Ngưỡng HAVING xét riêng mỗi tổ hợp: 3.3 dòng 64. COUNT, lọc trạng thái, `>=`, thứ tự cột và sắp nhiều cột: 3.1, 2.1–2.4 và câu chính/LineMap 3.3. `MaCD` là mã chức danh được đề gọi rõ, không phải thuật ngữ SQL mới. | Không thấy thiếu kiến thức cốt lõi; không phải nhờ đáp án mới biết cần hai khóa nhóm. Chưa xác minh số lượng từng cặp trên database. |

## Đối chiếu YAML sau bước học thử

Đã mở YAML sau khi phần cách làm/tiền đề trên được ghi ra file. Cả ba prompt/metadata trong YAML khớp nội dung đề HTML đã đọc: số/thứ tự cột, thứ tự dòng được chấm, alias không được chấm và các giới hạn phạm vi.

| Đề | Đối chiếu với cách làm đã ghi | Kết quả đọc nguồn |
|---|---|---|
| 3-3-1 | Lọc trạng thái trước; đếm theo phòng; AND kết hợp hai biên, trên 5 và tối đa 10; sắp số lượng giảm rồi mã tăng. | Khớp. Không phát hiện alias dùng sớm hoặc đổi biên thành gồm đúng 5/loại đúng 10. |
| 3-3-2 | Giữ đúng phạm vi đơn của 3.1; nhóm loại nghỉ; vừa đếm đơn vừa cộng ngày; lọc theo SUM đạt mốc 5; sắp theo tổng rồi loại. | Khớp. Không dùng COUNT thay tổng ngày; điều kiện tháng vẫn xét `TuNgay`, không tự phân bổ ngày. Dòng AND trong YAML thụt thêm bốn dấu cách so với WHERE. |
| 3-3-3 | Nhóm và đếm trên từng cặp phòng/chức danh; lấy cả mốc 3; sắp lần lượt hai mã. | Khớp. Không lặp tổng phòng hoặc thêm cặp vắng hồ sơ. |

Đây là đối chiếu logic câu chữ và cấu trúc SQL từ nguồn, không phải kết quả thực thi hay xác nhận bộ chấm đã chạy đúng. Không có nguyên câu đáp án trong report.

## Rà bài theo thứ tự và những phần giữ được

Các vị trí dưới là dòng trong MDX 3.3 của commit đã nêu, trừ chỗ ghi khác.

### Mục tiêu, tình huống và phần giảng

- **Giữ được — mục tiêu và phạm vi nối được từ 3.2.** “Vẫn đọc `NhanVien` đang lưu” và “không gồm đúng `10`” (dòng 24) chốt cả trạng thái, khóa nhóm hiện lưu và ngưỡng nghiêm ngặt. Bài 3.2 đã giải thích một hồ sơ là một dòng có khóa chính `MaNV`; 3.3 không đổi đơn vị thành lượt hay số người tại tháng quá khứ. Đề nghị giữ cách nối ngắn này, không chép lại cả bài trước.
- **Giữ được — điểm tựa Excel tự có nghĩa.** “Value Filters là bộ lọc theo giá trị đã tổng hợp” (dòng 32) nói ngay công dụng, thay vì mặc định người học biết tên menu. PivotTable, Rows, Values và Count đã được dạy ở 3.2; hình 3.3 được gọi là minh họa, chỉ hai ô KD/13 được đánh dấu đúng lời dẫn. Hình không được dùng như bằng chứng rằng database chỉ có một phòng.
- **Giữ được — câu lệnh đi trước lời giải.** Câu đầy đủ ở dòng 41–46, sau đó LineMap dòng 50–58 giải đủ bảy phần; mỗi dòng có “Ví dụ:” cụ thể trên cùng tình huống. Việc mới là HAVING được gắn ngay với KD/13 và IT/10, không chuyển sang ví dụ SQL ở bảng khác. Hai tiểu mục đúng khung hiện hành, chuyển từ Excel sang SQL rõ.
- **Giữ được — phân biệt hai thời điểm lọc bằng hậu quả cụ thể.** “Nhóm đạt điều kiện vẫn giữ số đếm từ toàn bộ hồ sơ đã qua WHERE” (dòng 60) và “không chọn lại từng hồ sơ trong nhóm” (dòng 62) ngăn cách hiểu HAVING làm nhỏ số thành viên của nhóm được giữ. Giải thích COUNT chưa dùng ở WHERE được giới hạn bằng “của câu này”, không mở rộng sang mọi truy vấn phức tạp.
- **Giữ được — đủ cầu nối để tự vận dụng ba đề.** Dòng 64 nói rõ chọn chỉ tiêu COUNT/SUM, nối điều kiện bằng AND/OR và xét riêng từng tổ hợp nhiều khóa. Đây là lời giảng hiển thị trước phần ôn, không đợi đáp án hay tự kiểm tra mới bổ sung. 3.1 cung cấp hàm và phạm vi đơn; 3.2 cung cấp cú pháp nhóm nhiều cột và cách tính riêng mỗi nhóm.
- **Giữ được — alias được giải theo thứ tự logic.** “HAVING được xét trước SELECT” (dòng 66) có ngay cách sửa: viết biểu thức COUNT tại HAVING, dùng alias sang ORDER BY. Các caption “Số hồ sơ trong nhóm” ở bước trung gian được nói rõ là nhãn minh họa, chưa phải alias của câu chính (dòng 147); không cần lấy kiến thức ngoài khóa học để giải sự khác nhau này.

### Sáu bước và dữ liệu trong drawer

Đã đọc cả nguồn lẫn nội dung HTML của từng bước. Các con số dưới **nhất quán nội bộ** với bài và hồ sơ công ty, chưa được reviewer xác minh bằng database. Bảng trung gian đối chiếu nhóm là hình để hiểu trạng thái logic; không coi đó là bảng nguồn mới được lưu.

| Bước | Đầu vào và thao tác đọc được | Kết quả nối sang bước sau | Đánh giá |
|---|---|---|---|
| FROM, dòng 81–97 | Nêu nguồn `NhanVien`; chưa lọc/chọn cột/gom. Năm dòng có mã, phòng và trạng thái, gồm NV020/NV033 đã nghỉ. | 48 hồ sơ; trích năm dòng, ba cột cần theo dõi. | **Giữ được.** Bước sau có đủ cột để quyết định giữ/loại. Không nhầm ba cột theo dõi với toàn bộ cấu trúc bảng đã học. |
| WHERE, dòng 100–127 | Đầu vào đúng năm dòng FROM. Bảng soi ghi đúng tiêu đề điều kiện trạng thái; ba dòng đúng, hai dòng sai khớp giá trị đang thấy. Hàng tổng nói xét cả 48, giữ 45. | 45 hồ sơ, vẫn ba cột; bảng kết quả trích 10. Đầu vào GROUP BY lấy năm dòng đầu và chỉ giữ hai cột cần theo dõi. | **Giữ được.** Không suy tổng 45 từ riêng ba hồ sơ đúng trong bảng soi và không tính số nhóm ở đây. |
| GROUP BY, dòng 130–154 | Đầu vào trích năm hồ sơ có `MaNV`/`MaPB`, đủ nhận ra khóa nhóm. Hai ví dụ KD và IT đều ghi rõ trích 5/13 và 5/10, gồm thành viên ngoài bảng đầu vào đang trích. | Sáu mã/kích thước nhóm; sáu số đếm cộng được 45. HAVING nhận năm trong sáu dòng này. | **Giữ được.** Không phát hiện nhóm mẫu bị gọi là toàn nhóm hoặc nhãn số lượng bị dạy thành alias dùng sớm. |
| HAVING, dòng 157–175 | Đầu vào năm nhóm KT/7, KD/13, BGD/2, IT/10, VH/8. Bảng soi cùng năm mã; KD đúng, bốn nhóm kia sai. Hàng tổng và chú thích xét cả sáu nhóm, không chỉ năm dòng. | Một nhóm KD, còn đủ 13 hồ sơ; hai cột đối chiếu. NS/5 ngoài phần trích cũng không vượt 10 theo bảng GROUP BY. | **Giữ được.** Ngưỡng `> 10` loại IT đúng 10; giữ một nhóm không có nghĩa còn một hồ sơ. |
| SELECT, dòng 178–202 | Đầu vào KD/13; ví dụ trích năm thành viên ghi rõ phạm vi. Hai biểu thức nối tới hai ô mã KD và số đếm 13; giải thích đếm cả nhóm, không đếm một dòng đối chiếu hay năm dòng trích. | Một dòng, hai cột `MaPB`, `SoHoSo`; đánh dấu dòng vừa giải. | **Giữ được.** Dòng 189 trực tiếp tháo được nguy cơ COUNT thành 1 sau HAVING; alias chỉ có từ bước này (dòng 193). |
| ORDER BY, dòng 205–219 | Thấy đủ hai cột đang sắp; alias đã hình thành. | Vẫn KD/13, một dòng/hai cột. | **Giữ được.** Dòng 210 giải thích vì sao vẫn giữ tiêu chí sắp dù kết quả hiện tại không đổi vị trí. Không dựng thêm nhóm giả để diễn hoạt sắp. |

**Giữ được — kết quả và giới hạn nằm đúng chỗ.** Ngay sau Result cuối (dòng 223–225), dòng 227 trả lời chị Hạnh bằng KD/13, đối chiếu IT đúng 10 và trường hợp đổi sang `>=`. Câu “không tự kết luận phòng nào đang thiếu người” tách báo cáo số lượng với quyết định bố trí nhân sự; giới hạn về phòng hiện lưu không bị giấu ở cuối bài.

### Hay nhầm, Ứng dụng, Ghi nhớ và tự kiểm tra

- **Giữ được — Hay nhầm bám đúng câu chính.** Ba lỗi tại dòng 233–235 đều là biến thể ngay tình huống đang học: đặt COUNT trong WHERE, bỏ lọc trạng thái, dùng alias ở HAVING. Hậu quả “KD ... thành 14” khớp hồ sơ công ty và giải thích lý do sai phạm vi. Hai câu “bị lỗi/báo lỗi” chưa được reviewer chạy lại; bài không tự đặt một thông báo SQL nguyên văn để làm bằng chứng.
- **Giữ được — ứng dụng là việc làm được nhờ HAVING.** Ba ý tại dòng 243–245 đi từ lọc phòng theo quy mô đến tổng ngày theo loại và cặp phòng/chức danh. SUM và nhiều khóa đã có lời giảng tại dòng 64 cùng nền 3.1–3.2; không cần học bài sau để hiểu các việc này. Tiêu chí phân công được gọi là đã thống nhất, không mặc định số lượng chứng minh đủ/thiếu người.
- **Giữ được — phần ôn đúng vị trí và có tiền đề.** Ghi nhớ dòng 251–256 ôn bốn thao tác Excel/SQL. Ba câu tự kiểm tra dòng 260–279 nằm sau đó và trước Bài tập, phủ thời điểm lọc, ngưỡng và alias; đáp án đều tìm được ở phần giảng trước. Không thấy đáp án ôn đưa một quy tắc mới buộc người học phải đọc mở mới biết.
- **Giữ được — yêu cầu làm bài và điều kiện hoàn thành nhất quán.** Dòng 283 nói chấm kết quả/thứ tự, không kiểm alias hoặc bắt cú pháp; cả ba đề HTML xác nhận điều đó. Footer HTML hướng tới tự viết lại câu lệnh không nhìn bài, khớp cách đánh dấu đã học trong trang Giới thiệu. Bài không đặt thêm yêu cầu kết nối SSMS đối với người chọn web. Bài mẫu 2.1 trỏ tới mục chọn nơi thực hành; nguồn Giới thiệu phân biệt mã web do người phụ trách/người gửi khóa học cấp, tài khoản SSMS và bản SQL Server riêng tự đối chiếu. Không tự thêm người liên hệ hay đề nghị bỏ xác thực. Chưa thử bấm các đường đi đó trên UI.
- **Giữ được — tải và cách đánh dấu có chủ đích.** Bài chỉ thêm một thao tác mới vào báo cáo 3.2; không kéo kiến thức kết bảng/nâng cao vào lời giải. Bôi đậm tập trung ở Value Filters và đối chiếu WHERE/HAVING, code dùng cho cột/giá trị/phép so sánh. Đọc HTML không thấy backtick hoặc chuỗi escape hiện thành chữ ở nội dung bài. Không tìm thấy câu dẫn rỗng hoặc đoạn cần cắt có tác động rõ; không đề xuất thêm nội dung chỉ để đủ số nhận xét. `20` phút là thông tin ước lượng của bài, chưa được đo bằng học viên thật.

### Các câu “tại sao/để làm gì” đã tự đặt khi học thử

| Câu hỏi của người mới | Bài có trả lời ở đâu? |
|---|---|
| Đã có bảng 3.2 rồi, thêm HAVING để làm việc gì? | Tình huống dòng 18–26 và Value Filters dòng 32–39: chỉ giữ phòng vượt ngưỡng trên số đã tổng hợp. |
| Vì sao không dùng WHERE cho số lượng phòng, và vì sao vẫn phải giữ WHERE trạng thái? | Dòng 60–62 phân biệt đơn vị xét; Hay nhầm dòng 233–234 nêu lỗi hoặc số đếm sai phạm vi. |
| IT có 10 vì sao lại bị loại? | Giả định dòng 24, LineMap dòng 56, bảng soi HAVING và kết luận dòng 227 đều phân biệt trên 10 với từ 10. |
| Chỉ thấy năm thành viên trong hình thì 13/10 từ đâu, có phải đếm sai không? | Hai note ở dòng 138/143 ghi rõ trích trong toàn nhóm; GROUP BY dùng cả 45 hồ sơ. SELECT dòng 185–189 tiếp tục phân biệt trích 5 với đủ 13. Không thể tự kiểm số thật chỉ từ bảng trích, nhưng phạm vi phép tính đã rõ. |
| Sau HAVING chỉ còn một dòng thì COUNT có thành 1 không? | Dòng 162 giữ cả nhóm với 13 hồ sơ; phép tính SELECT dòng 189 nói thẳng không đếm một dòng đối chiếu. |
| Đã thấy tiêu đề số lượng trong bước nhóm, vì sao không dùng SoHoSo ngay ở HAVING? | Dòng 66 giải thứ tự logic; dòng 147 tách nhãn minh họa khỏi alias câu chính; dòng 193 đặt thời điểm có alias. |
| Vì sao ORDER BY vẫn có khi chỉ còn một phòng? | LineMap dòng 57 và detail dòng 210: giữ tiêu chí yêu cầu, trường hợp này không đổi vị trí. |
| Đề đổi thành tổng ngày hoặc cặp phòng/chức danh thì có được làm tương tự không? | Dòng 64 trả lời trực tiếp, dựa vào hàm ở 3.1 và nhiều khóa ở 3.2; không cần xem đáp án để biết cách chọn. |
| Lấy KD/13 xong có đủ kết luận cần tuyển thêm người không? | Dòng 227 giới hạn kết quả ở tiêu chí số lượng, không tự kết luận thiếu người. |

### Đối chiếu HTML có giới hạn

- Đọc được đầy đủ nội dung sáu panel ẩn trong HTML và đủ ba đề; lời trong drawer và bảng soi khớp nguồn. Nút/thẻ chỉ hiện vài dòng có ghi phần còn lại; không dùng thẻ ba dòng làm toàn kết quả.
- Tự trích các khối SQL trong HTML: câu chính khớp sáu dòng SQL của tình huống. Cả sáu drawer giữ cùng câu đó khi nối các khối trước/focus/sau; phần focus tương ứng FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. ORDER BY tô cả dòng kèm dấu kết thúc; không đổi nghĩa câu.
- Parser văn bản đơn thuần ghép các khối highlight sát nhau; đã kiểm markup và CSS `.rf-q-dim`/`.rf-q-on` dùng khối hiển thị riêng, nên không coi chuỗi dính ở bản trích văn bản là lỗi xuống dòng trên trang.
- Hai ô Excel A2/B2 có lớp đánh dấu, SELECT có một dòng Result được đánh dấu đúng KD/13. Không có bảng Result giả bị nhầm là mọi thành viên của nhóm trong các ví dụ.
- Câu chính và query của bài 3.3 không có dòng SQL cần thụt tiếp; không dùng chúng làm bằng chứng đã kiểm tab bốn cột hoặc CASE hai cấp. YAML đề 2 có thụt AND đúng bốn dấu cách ở nguồn; đáp án không hiện cho người học, nên việc này không chứng minh editor/copy-paste đã đúng.

## Findings và ưu tiên

**Không phát hiện finding cần sửa, cần làm rõ, cần cắt hoặc biên tập có căn cứ trong phạm vi được giao.** Các mục giữ được và vị trí/căn cứ đã ghi theo thứ tự bài ở trên; không thêm lỗi để đủ số lượng nhận xét.

Với nền 1.3, 2.1–2.4, 3.1–3.2 đã chỉ ra, nội dung hiện tại cung cấp đủ kiến thức để xác định cách giải cả ba đề. Không thấy tiền đề nào phải lấy từ bài sau, phần đáp án YAML hay lời giải tự kiểm tra để bù. Đây là kết luận về đường suy luận từ bài giảng, không phải bảo đảm mọi học viên sẽ tự học thành công hoặc xác nhận kỹ thuật đã chạy đạt.

## Nguồn và giới hạn

- Nguồn nội dung: brief và quyết định đã duyệt trong `temp/verification/2026-11-02-lesson-3-3/`; AGENTS.md, quy ước/template, hồ sơ công ty; các bài nền liên quan và 3.3; YAML 3.3 sau khi học thử; bốn HTML trong manifest. Chỉ tham khảo thêm nguồn Giới thiệu để lần theo nơi thực hành và các đoạn RunFlow/CSS hiện tại để hiểu cấu trúc HTML, không review mở rộng hay đề nghị sửa công cụ.
- Kiểm phiên bản: tự đọc HEAD, trạng thái Git và đối chiếu SHA-256 đủ 12 file. Trước khi tạo report, working tree chỉ hiện `premium-audit.json` chưa được theo dõi; không mở hay sửa file đó. Git chỉ đọc; không thay index, HEAD, branch hoặc các file sản phẩm/test.
- **Chưa xác minh:** kết quả SQL live, tổng/thành viên thực trong database, lỗi thực tế của hai biến thể COUNT/alias, API/runner, điểm chấm/nộp bài, hoàn tác/check:data. Không kết nối database, không đọc seed, `.env`/secret, không chạy SQL hay test/API.
- **Chưa xác minh:** mở/đổi bước/đóng drawer thực, bàn phím, focus, copy/paste, editor, đăng nhập mã web, điều hướng thực, SSMS, khả năng đọc trên viewport thật và màn hẹp. Không mở browser; không có viewport để báo. Sự hiện diện của nội dung/lớp CSS/markup chỉ là bằng chứng tĩnh.
- Không đọc verification kết quả tác giả hoặc report khác để thay cho kiểm của mình; không chạy bộ kiểm máy nên không kết luận các test đạt hay không có lỗi nền. Hash khớp chỉ xác nhận đúng artifact được giao, không thay các phép kiểm còn thiếu.
- Chỉ ghi file report này. Kết luận không cấp quyền merge, push hoặc deploy.

# Review độc lập bài 2.3 — AND, OR, IN, BETWEEN, LIKE

Ngày: 24/10/2026. Công cụ: Codex, agent mới kế thừa model của phiên; không chỉ định model khác. Vai trò: Business Consultant học SQL Server để đủ hiểu và phản biện yêu cầu dữ liệu. Chỉ dùng bài hiện tại, các bài trước liên quan và các tài liệu nội bộ được phép.

Phạm vi: `src/content/lessons/2-3-and-or-in-between-like.mdx`, YAML tương ứng, HTML bài học và bốn trang bài tập đã build. Không sửa sản phẩm hoặc dữ liệu.

Kết luận: hai nhịp học rõ, đủ kiến thức làm bốn đề; ba câu tự kiểm tra đúng vị trí và bao phủ các nhịp. Có một lỗi cần sửa ở HTML của cả ba câu tự kiểm tra và hai chỗ cắt lặp nhỏ. Không thấy lý do phải tách bài hoặc tăng độ sâu SQL.

## Rà theo thứ tự bài

### 1. Mục tiêu và thời lượng — Giữ được

Câu gốc, dòng 11: “bạn kết hợp được nhiều điều kiện, đặt ngoặc đúng nhóm, lọc khoảng có hai đầu mút và tìm theo mẫu chữ”.

Nội dung thực hiện đúng mục tiêu: nhịp đầu AND/OR/IN, nhịp sau BETWEEN/LIKE; sau đó có truy vấn tổng hợp và thực hành riêng cho mẫu chữ. Mốc 25 phút không có dấu hiệu quá thấp rõ rệt so với lượng giảng và bốn đề; đây là nhận định đọc bài, chưa phải đo thời gian học viên làm thật.

Tự hỏi: “Học năm từ khóa này để làm gì?” — **Đã trả lời:** từ lọc một điều kiện ở 2.2 sang giữ đồng thời nhóm phòng và khoảng ngày, rồi tra tên chưa nhớ đủ. Đề xuất: giữ.

### 2. Tình huống và giả định — Giữ được

Câu gốc, dòng 21–26: “hiện mang mã phòng KD hoặc IT”, “Kể cả người đã nghỉ nếu có”, “Mã phòng là phòng hiện tại”.

Đã chốt đúng tháng 10/2026, người hỏi và phạm vi hồ sơ. Phân biệt phòng hiện lưu với phòng lúc vào làm giúp tránh diễn giải danh sách thành lịch sử tuyển dụng theo phòng. Yêu cầu tiêu đề tiếng Việt có căn cứ từ 2.1. Khớp mục 7 hồ sơ công ty.

Tự hỏi: “Có loại người đã nghỉ hoặc tìm phòng tại năm 2023 không?” — **Đã trả lời:** không; ngày vào làm thuộc khoảng yêu cầu còn phòng lấy theo giá trị hiện lưu. Đề xuất: giữ.

### 3. Nhịp AND/OR/IN và hình Excel — Giữ được

Câu gốc, dòng 32–54: “Một dòng phải qua bộ lọc của cả hai cột”, “AND trước OR”, “IN viết gọn nhiều phép so sánh bằng trên cùng một cột”.

Dẫn Excel sang SQL rõ. Hình Excel hiện đúng số dòng nhảy từ 4 sang 44, giữ mã/ngày cạnh nhau và đánh dấu đúng bốn ô được lời văn gọi tên. Ví dụ cùng một ô không thể bằng cả KD và IT giải nghĩa AND/OR bằng việc cụ thể. Hai đoạn WHERE đặt cạnh nhau, có `copy={false}`, và hồ sơ NV002 cho thấy hậu quả thiếu ngoặc; không chỉ đưa quy tắc để học thuộc. Nháy riêng từng mã và giới hạn IN trên cùng một cột đủ dùng, không kéo sang cú pháp khác.

Tự hỏi: “Vì sao thụt lề đẹp vẫn lọc sai?” — **Đã trả lời:** ngoặc mới đổi nhóm điều kiện; AND được xét trước OR về logic. “IN hơn OR ở đâu?” — **Đã trả lời:** viết gọn danh sách so bằng cùng cột. Đề xuất: giữ.

### 4. Nhịp BETWEEN — Giữ được

Câu gốc, dòng 58–60: “gồm cả hai đầu mút”, “Chữ AND nằm giữa hai mốc là một phần của cú pháp BETWEEN”.

Bài đặt phép so sánh đã học ở 2.2 cạnh BETWEEN nên không đòi người mới tự suy ra hai đầu có được lấy không. Phân biệt AND trong khoảng với AND kết hợp điều kiện giải đúng một điểm có thể vấp khi mới học. Giới hạn cột date không có giờ nói gọn và dẫn 2.8, không dạy trước cách xử lý thời gian.

Tự hỏi: “Ngày đúng mốc cuối có được lấy, và AND này đang nối cái gì?” — **Đã trả lời.** Đề xuất: giữ.

### 5. Nhịp LIKE và bảng mẫu — Giữ được

Câu gốc, dòng 62–85: “% đại diện cho từ 0 ký tự trở lên, _ đại diện cho đúng một ký tự”, “Các dòng trong bảng trên là những cách tìm riêng”.

Có chuyển ý từ nhu cầu chỉ nhớ một phần tên. Bảng bao phủ đầu/đuôi/giữa và một ký tự; `_` được nói rõ không chỉ là số. Ví dụ SELECT đầy đủ giúp lắp điều kiện LIKE vào câu đã học mà không phải đoán vị trí. Phạm vi toàn bộ hồ sơ tách rõ khỏi tình huống hai phòng. Dẫn lại tiền tố N và collation đủ ngắn; không đòi học kiến thức 2.7 trước để làm bốn đề.

Tự hỏi: “Vì sao không dùng dấu bằng, và LIKE có tự hiểu phần tên gọi không?” — **Đã trả lời:** dấu bằng so giá trị chuỗi, LIKE xét mẫu ký tự. “Có ghép % với _ được không?” — **Có đủ cơ sở để suy ra:** mỗi ký hiệu đã có nghĩa, cùng nằm trong chuỗi mẫu; đề 4 diễn giải từng phần cần khớp. Không cần thêm lời giải nguyên mẫu của đề 4 vào bài.

Đề xuất: giữ bảng và ví dụ.

### 6. Câu lệnh cho tình huống và kết quả — Giữ được

Câu gốc, dòng 89–102: “Dùng IN để gom hai phòng và BETWEEN để ghi khoảng ngày”; “có 2 hồ sơ … NV003, NV043”.

Câu chính áp dụng kiến thức vừa học, chọn đúng bốn cột và alias theo yêu cầu. Lời trả lời nằm ngay sau kết quả, nói rõ hai dòng là toàn bộ kết quả của bộ mẫu, đồng thời tách không lọc trạng thái với thực tế hai hồ sơ đều đang làm. Mã, phòng, ngày của hai dòng khớp hồ sơ công ty; đó là đối chiếu nội bộ, chưa xác minh database live.

Tự hỏi: “Đủ trả lời chị Hạnh chưa, hay mới chỉ đưa cú pháp?” — **Đã trả lời:** có danh sách, số hồ sơ và phạm vi kết luận. Đề xuất: giữ.

### 7. Câu loại NV030 — Cần cắt

Câu gốc, dòng 104: “NV030 vào làm 2023-04-03 nhưng thuộc NS, nên không được lấy.”

Ý này được trình bày lại ở drawer WHERE, dòng 137: “NV003, NV043 được giữ; NV030 bị loại vì mã phòng là NS.” Hình và lời trong bước WHERE là nơi phù hợp để đối chiếu hồ sơ bị loại; câu trả lời tình huống phía trên đã đủ nghĩa.

Tự hỏi: “Vì sao NV030 không xuất hiện dù ngày nằm trong khoảng?” — **Đã trả lời trong RunFlow.** Đề xuất: bỏ riêng câu đầu dòng 104; giữ câu nhắc thứ tự có thể khác hình. Không cần thêm đoạn thay thế.

### 8. RunFlow — Giữ được

Câu gốc, dòng 108–169: “Các điều kiện nằm chung trong bước WHERE”; các bước FROM → WHERE → SELECT, tổng 48 → 2 → 2 hồ sơ.

Sơ đồ phân biệt thứ tự logic với cách đọc vật lý. Cột xem trước ở FROM/WHERE là mã, phòng và ngày nên người học kiểm trực tiếp hai điều kiện. Drawer giữ 12 cột trước khi SELECT và bốn cột sau SELECT; nghĩa của bước bắt đầu từ từ khóa, số hồ sơ/cột và trích mẫu được nêu rõ. Câu chính, query, focus và SQL của bước cuối nhất quán khi đọc nguồn.

Tự hỏi: “Có phải SQL quét bảng riêng một lần cho IN rồi lại cho BETWEEN không?” — **Đã trả lời:** các điều kiện nằm chung bước WHERE, sơ đồ chỉ giải nghĩa logic. Đề xuất: giữ. HTML có tab thật trong SQL và thuộc tính data-copy; chưa kiểm thao tác sao chép, độ rộng tab hay drawer bằng trình duyệt.

### 9. Hay nhầm — Cần cắt một câu; phần còn lại giữ được

Câu gốc, dòng 177: “Mẫu chữ không tự phân biệt phần họ với phần tên.”

Câu này lặp lại dòng 71: “Mẫu so khớp chuỗi ký tự, không tự hiểu họ hay từ riêng biệt.” Ngay trong Hay nhầm, ví dụ NV041/Hà Văn Quý đã diễn tả đủ hậu quả tìm nhầm người có tên gọi Hà.

Tự hỏi: “Tìm chuỗi Hà có thể lấy ai ngoài người tên gọi Hà?” — **Đã trả lời bằng NV041.** Đề xuất: bỏ câu cuối dòng 177; giữ lỗi và ví dụ hậu quả. Hai lỗi OR thiếu phép so sánh và đảo mốc BETWEEN cụ thể, đúng phạm vi bài; không đề nghị thêm lỗi hiếm.

### 10. Ứng dụng — Giữ được

Câu gốc, dòng 185–187: “Khoanh nhóm đối chiếu”, “Chọn nhiều mã”, “Tra cứu khi thiếu thông tin”.

Ba ý đúng khả năng chủ đề, gắn việc làm với mục đích. Ý tra cứu yêu cầu đối chiếu mã trước khi xác nhận người, không hứa mẫu chữ nhận diện đúng người.

Tự hỏi: “Sau bài có áp dụng gì ngoài sao chép câu ví dụ?” — **Đã trả lời:** đổi nhóm mã, khoảng ngày hoặc phần tên cần tra. Đề xuất: giữ.

### 11. Ghi nhớ — Giữ được

Câu gốc, dòng 193–198: bốn hàng AND, OR/IN/ngoặc, BETWEEN, LIKE `%`/`_`.

Ôn đủ hai nhịp học, không thêm kiến thức mới. Chuỗi trong Memo ở HTML không lộ backtick. Việc lặp ở đây đúng vai trò ôn tập.

Tự hỏi: “Điểm nào phải nhớ trước khi tự viết?” — **Đã trả lời:** nhóm điều kiện, hai mốc và hai ký tự đại diện. Đề xuất: giữ.

### 12. Ba câu tự kiểm tra — Cần sửa dấu nháy trong bản build

Câu nguồn, dòng 203, 210, 217 dùng `<code>` với nháy thẳng. Nhưng HTML hiện có:

- `<code>MaPB = ‘KD’ AND MaPB = ‘IT’</code>`
- `<code>BETWEEN ‘20230101’ AND ‘20230630’</code>`
- `<code>LIKE N’%Hà%’</code>`

Nháy trong SQL đã bị chuyển thành dấu câu cong, khác với nháy đơn thẳng trong Sql và trong các code span của bài. Đặc biệt `N’%Hà%’` trông như một mẫu SQL hợp lệ để chép theo dù ký tự không còn đúng mẫu đã dạy. Đây là lỗi thấy trực tiếp trong HTML mới, không phải suy đoán từ nguồn MDX.

Đề xuất: giữ nguyên nội dung câu hỏi, bảo toàn nguyên văn các chuỗi trong `<code>` qua bước build, chẳng hạn dùng biểu thức chuỗi JSX cho phần có nháy; kiểm lại HTML để các nháy đều là ký tự `'`. Không cần thay câu hỏi hoặc mở rộng lý thuyết.

Về nội dung: câu 1 kiểm AND/OR/IN và nhắc ngoặc; câu 2 kiểm biên BETWEEN; câu 3 kiểm mẫu chuỗi không đồng nghĩa tên gọi. Cả ba nằm sau Ghi nhớ, trước Bài tập; đáp án đã được giải thích trước đó. Câu 3 không trực tiếp hỏi `_`, nhưng Memo đã ôn và đề 4 kiểm việc vận dụng, nên chưa phải thiếu kiến thức cản làm bài.

Tự hỏi: “Có thể tự kiểm từng nhịp mà không học thêm trong đáp án không?” — **Đã trả lời:** có. Lỗi còn lại thuộc bảo toàn ký tự SQL khi render.

### 13. Bài tập và YAML — Giữ được

Câu gốc, dòng 225: “Bốn bài luyện nhóm điều kiện, danh sách mã, khoảng ngày và mẫu chữ.”

| Đề | Đánh giá từ góc nhìn học viên | Câu tự hỏi và mức đáp ứng |
|---|---|---|
| 2-3-1 — hai phòng, đang làm | Đủ kiến thức từ AND/OR/IN và N ở 2.2. Đề nói rõ trạng thái áp dụng cả hai phòng, không lọc ngày. Đáp án YAML dùng đúng nhóm ngoặc và bốn cột đã nêu. | “Trạng thái chỉ áp dụng VH hay cả KD?” — Đã trả lời rõ trong đề. |
| 2-3-2 — phòng và khoảng ngày | Chính là chuyển mẫu tình huống sang mã/mốc khác. Đề nói rõ gồm hai mốc, kể cả đã nghỉ và thứ tự bốn cột. Đáp án khớp điều kiện được mô tả. | “Có được tự thêm trạng thái không?” — Đã trả lời: không. |
| 2-3-3 — chuỗi Thị | Bảng LIKE đã dạy chứa ở bất kỳ vị trí nào; đề không yêu cầu tách từ và đã bỏ mọi bộ lọc phòng/ngày/trạng thái. Đáp án khớp kỹ năng đã dạy. | “Chuỗi phải là một từ riêng hay có thể nằm trong chuỗi khác?” — Đã trả lời rõ. |
| 2-3-4 — H áp chót | Khó hơn một nhịp vì ghép hai ký tự đại diện, nhưng đề tự diễn giải phần trước bất kỳ, sau còn đúng một ký tự và kết thúc. Không cần hàm chuỗi hoặc kiến thức bài sau. Đáp án YAML khớp mô tả. | “Một ký tự sau H có phải chỉ chữ số không?” — Đã trả lời ở phần chính: `_` không chỉ là số. |

HTML bốn trang bài tập giữ đúng các prompt và số/thứ tự cột trong YAML; bài học có đủ bốn liên kết. Không phát hiện yêu cầu phụ không được dạy hoặc mâu thuẫn giữa đề và đáp án. Không sửa đề hay đáp án. Chưa chạy SQL hoặc bộ chấm nên không xác nhận các tập kết quả live hay mọi biến thể tương đương được nhận.

## Thứ tự ưu tiên

1. **Cần sửa:** bảo toàn nháy đơn thẳng ở cả ba `<summary>` tự kiểm tra, rồi kiểm bản build (mục 12).
2. **Cần cắt:** bỏ câu NV030 trong lời trước RunFlow, vì drawer WHERE đã giải cùng dẫn chứng (mục 7).
3. **Cần cắt:** bỏ câu kết giảng lại quy tắc họ/tên ở Hay nhầm 3; giữ ví dụ NV041 (mục 9).

Không có đề xuất thay đổi 51 bài/URL, khung gộp, seed, API, số bài tập, đáp án hoặc model.

## Nguồn đối chiếu và giới hạn

Đã đọc: AGENTS.md; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; mẫu 1.1; các bài 1.6, 2.1, 2.2; bài 2.3 và YAML; HTML mới của bài 2.3 cùng bốn trang bài tập. Đối chiếu quyết định phạm vi hiện hành trong spec của lượt sửa học viên và mục quyết định liên quan của spec Level 2; không mở các file review cũ hoặc báo cáo kiểm thử học viên gốc.

Không đọc `.env`, secret hoặc `database/HRM_Demo.sql`; không kết nối database, không chạy SQL, không tra tài liệu SQL ngoài khóa học. Chưa xác minh trực tiếp số liệu với SQL Server, collation live, hành vi bộ chấm hoặc thao tác trình duyệt/bàn phím/sao chép. Kiểm HTML chỉ xác nhận nội dung và ký tự được build, không thay kiểm tương tác hoặc chụp giao diện. Không chạy lại test/build vì vai trò lượt này là đọc review độc lập trên dist đã được chuẩn bị.

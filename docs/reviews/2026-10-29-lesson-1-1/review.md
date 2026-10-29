# Review độc lập bài 1.1 — 29/10/2026

## Phạm vi, phiên bản và công cụ thực tế

- Vai học thử: Business Consultant khó tính, muốn hiểu đủ để trao đổi và phản biện yêu cầu dữ liệu; chỉ giả định nền Excel văn phòng cơ bản, chưa biết SQL, lập trình hoặc quản trị hệ thống.
- Model: kế thừa model của phiên; không chỉ định hoặc đổi model. Đây là ngữ cảnh review mới, không đọc nhận xét cũ hay ma trận của tác giả, không tạo agent con.
- Phạm vi: toàn bộ [bài 1.1](<E:/Projects/SQL Lession/src/content/lessons/1-1-database-la-gi.mdx>), ba PNG mới và HTML mới của bài. Bài noExercises: true, không có YAML/answer; kiểm đủ bốn tự kiểm tra. Đọc [bài 1.2](<E:/Projects/SQL Lession/src/content/lessons/1-2-sql-server-ssms-hrm-demo.mdx>) để kiểm chuyển bài, không lấy kiến thức bài 1.2 bù tiền đề của bài 1.1.
- Source: nhánh codex/lesson-1-1-story-and-image, HEAD 75278be2e779e3f86d98397e468d626100157129 cộng thay đổi chưa commit. Bài 1.1 có mtime 2026-10-29 18:05:42 +07:00, SHA256 60A3E1DD0BEA5BBCC951E19D5D92E511D956F5CE2FC01B69A601F1F457425539.
- Build: [dist/bai/1-1-database-la-gi/index.html](<E:/Projects/SQL Lession/dist/bai/1-1-database-la-gi/index.html>), mtime 2026-10-29 18:07:09 +07:00, SHA256 15718F37EF3649DA72F73AD5AB769625CF601CEDDAD514F1226B8FA47FBC4547. Người giao xác nhận build hoàn tất 18:07:10 và source/ảnh không đổi sau khi giao. Reviewer tự đọc HTML, đối chiếu lời giảng, ba figure, bảng Excel và bốn details; không dùng dist cũ.
- Công cụ: exec_command/PowerShell để đọc source, kiểm nhánh/HEAD/status, mtime và SHA256; view_image để tự nhìn từng PNG; đọc HTML tĩnh. Không mở browser, không kiểm tương tác UI hoặc ảnh chụp trình duyệt. Chỉ tạo report này.
- Quyết định đã đọc: [spec của lượt](<E:/Projects/SQL Lession/docs/superpowers/specs/2026-10-29-lesson-1-1-story-and-image-design.md>). Giữ bốn nhịp kể, 12 phút, khung phần cuối, ba ảnh khái niệm không nhân vật, Excel minh họa hiện có; không yêu cầu thêm SQL preview.

## Rà bài theo thứ tự người học đọc

### Tình huống và giả định — dòng 21–31

**Giữ được.** Câu hỏi là xác minh hai bản đang lệch, có đủ mốc tháng 10/2026, phạm vi danh sách hiện tại và điều kiện Quân đã chuyển phòng có hiệu lực trước lúc lấy dữ liệu. Vì vậy, kết luận ở cuối bài có thể giới hạn ở dòng của Quân, không cần đoán toàn bộ file nào đúng. Việc tách nhân vật giả định khỏi hồ sơ mẫu ở dòng 29 tránh nhầm Quân với NV048 trong hồ sơ công ty.

Tự hỏi “Vì sao không chỉ chọn file mới nhất?”: bài không dùng độ mới của tên file làm căn cứ mà dẫn tới quyết định chuyển phòng, ngày hiệu lực và người cập nhật ở dòng 52, 96–100. Đây là câu trả lời đúng phạm vi yêu cầu.

### Nhịp 1: vì sao hai bản khác nhau — dòng 35–39

**Giữ được.** Workbook và sheet có nghĩa tiếng Việt tại lần dùng đầu; nguyên nhân lệch là bản sao riêng và thay đổi chưa tới người giữ bản kia. Đoạn này không quy lỗi cho Excel nói chung: dòng 39 công nhận Excel có cùng sửa một workbook, rồi giới hạn vào cách công ty đang gửi bản riêng.

Tự hỏi “Database giải quyết gì mà việc gửi lại file không giải quyết?”: dòng 39–43 chuyển từ sửa đủ nhiều bản sang nguồn chính thức với người chịu trách nhiệm cập nhật. Chuyển ý có nguyên nhân và mục đích, không đòi người mới biết công nghệ kết nối.

### Nhịp 2: nguồn chung và cấu trúc — dòng 41–52

**Giữ được.** Database được định nghĩa bằng dữ liệu có cấu trúc, phần mềm quản lý và quyền truy cập; ví dụ workbook–sheet rồi database–bảng giúp đi tới NhanVien, dòng/bản ghi và cột. Câu “Mỗi dòng… lưu một hồ sơ” đứng sau bảng NhanVien nên đọc được trong ngữ cảnh hồ sơ nhân viên, không phải lời khẳng định mọi bảng đều lưu một người mỗi dòng.

Tự hỏi “Cả hai cùng đọc rồi thì đã chắc đúng chưa?”: dòng 52 trả lời trực tiếp trường hợp nguồn chưa cập nhật, và yêu cầu quyết định chuyển phòng/ngày hiệu lực. Không có lời hứa database tự biết sự kiện ngoài đời.

Tôi tự xem ảnh database: khối trụ và ba bảng trống gợi dữ liệu được tổ chức, không có nhân vật, mã hay con số khiến người đọc hiểu là kết quả thật. Alt/caption ghi minh họa; khái niệm bảng/dòng/cột vẫn được giải thích bằng chữ ngay sau hình. Ảnh hỗ trợ nhận diện khái niệm, không phải bằng chứng cấu trúc thật của database.

### Nhịp 3: luật kiểm được gì — dòng 54–74

**Giữ được.** Excel là minh họa đã được nói rõ, không giả làm dữ liệu database hiện tại. Đối chiếu source và HTML:

- A3 và A5 cùng chứa NV005, đều có xl-mark.
- C4 chứa 02.10.2017, có xl-mark; không mang xl-num. C2, C3, C5 có xl-num, phù hợp lời giảng đang giả định các ô này là ngày thật.
- D4 chứa Ke toan, vừa xl-sel vừa xl-mark; ô tên và thanh công thức cũng là D4/Ke toan.
- Không có lọc dòng trong hình, nên thứ tự dòng 1–5 liên tục phù hợp; không cần rowNumbers nhảy cóc.

Cách mô tả C4 là chữ nằm trong một ví dụ có giả định rõ; bài không nói mọi chuỗi dùng dấu chấm đều luôn bị Excel hoặc SQL Server hiểu là chữ.

Tự hỏi “Vì sao phải có kiểu dữ liệu, khóa chính và mã phòng?”: ba ý ở dòng 66–68 gắn lần lượt với ngày không cùng kiểu, hồ sơ có mã trùng và tên phòng viết khác nhau. Ngay chỗ giới thiệu đã có việc chúng kiểm, lợi ích và giới hạn; không cần học cú pháp khai báo để hiểu bài này.

Tự hỏi “Luật có tự xuất hiện và có bảo đảm đúng người không?”: dòng 67–70 nói phải khai báo, ràng buộc đang bật mới kiểm câu ghi; dòng 72 cho ví dụ KD có thật nhưng gán nhầm người. Khóa ngoại được phân biệt với ô chọn trên màn hình. Các điều kiện quan trọng có trong phần giảng trước phần ôn.

Độ tải tập trung cao nhất ở đoạn này vì có date, NULL, khóa chính, khóa ngoại và constraint. Tuy vậy, mỗi thuật ngữ có giải thích tại chỗ và đều gắn với một ô/lỗi cụ thể; các phần sâu được dẫn sang 1.3, 1.4, 5.2, 5.5. Không phát hiện chỗ buộc người học dùng kiến thức SQL chưa được dạy để hiểu bốn câu tự kiểm tra.

### Nhịp 4: SQL Server, SQL và khép tình huống — dòng 76–100

**Giữ được về kiến thức và mạch kể.** SQL Server được gọi là phần mềm Microsoft quản lý lưu trữ/đọc/cập nhật database; SQL là ngôn ngữ gửi yêu cầu; SQL Server xử lý rồi trả kết quả. T-SQL có tên đầy đủ và vị trí trong SQL Server. Không chèn câu lệnh để người mới phải đọc trước cú pháp.

Tôi tự xem hai ảnh còn lại:

- SQL Server: khung ứng dụng chứa các khối dữ liệu, bảng và biểu tượng thiết lập. Caption nói rõ đây là hình khái niệm, nên không lấy giao diện hư cấu làm hướng dẫn tìm nút trong SSMS.
- SQL: tài liệu mang chữ SQL, mũi tên tới bảng kết quả và khối dữ liệu. Hình nhấn đúng quan hệ yêu cầu–kết quả; caption gọi bảng bên phải là tượng trưng. Cơ chế xử lý bởi SQL Server nằm trong lời văn ngay trước hình, nên không có kết luận SQL tự là phần mềm chạy dữ liệu.

Ba figure đứng cạnh từng định nghĩa tương ứng. HTML có đủ alt/caption, srcset 360w/720w, đường dẫn /microsoft-sql-lession/_astro/ và width/height 720/360. Đây là kiểm cấu trúc HTML, chưa chứng minh ảnh tải đúng hoặc trình bày tốt tại từng viewport.

Tự hỏi “Xuất lại Excel có làm nguồn chung mất ý nghĩa không?”: dòng 92 nói file xuất là dữ liệu tại lúc lấy, phải lấy lại hoặc có quy trình cập nhật riêng. Tự hỏi “Muốn xem lại phòng ban cũ thì sao?”: dòng 96 nêu bộ mẫu không lưu lịch sử, chỉ ra cần bản chốt hoặc thiết kế lịch sử.

Ba bước cuối nối đủ xác minh nghiệp vụ → người có quyền sửa nguồn → lấy lại danh sách có cùng phạm vi. Dòng 100 chỉ kết luận dòng Quân, không tuyên bố file chị Hạnh hoàn toàn đúng. Có một gợi ý biên tập nhỏ về mốc học câu lệnh ở dòng 85, ghi riêng bên dưới.

### Hay nhầm, Ứng dụng và Ghi nhớ — dòng 102–131

**Giữ được.** Hay nhầm nêu được hậu quả: nguồn sao riêng vẫn lệch, mã hợp lệ vẫn làm báo cáo sai, sửa file xuất chưa sửa nguồn và tự sửa dữ liệu chung ảnh hưởng người khác. Data Validation có mô tả chức năng ngay trong câu; không giả định người mới đã từng dùng. Lời giới hạn về dữ liệu chung được tiếp nối ở bài 1.2 bằng đường web/SSMS và chỉ đọc ở giai đoạn đầu.

Bốn ứng dụng đúng khả năng vừa giải thích: nguồn thống nhất, luật kiểm dữ liệu, tra cứu/báo cáo và lịch sử có thiết kế lưu. Không hứa tự đồng bộ Excel hoặc tự lưu lịch sử. Memo giữ các điểm tựa Excel và giới hạn khóa ngoại, không thêm kiến thức mới.

Bold được đặt ở định nghĩa/đối chiếu và các nhãn có tác dụng đọc; dẫn chứng, mã, tên bảng/cột/ô trong lời văn dùng code. Trong HTML đã đọc không thấy dấu backtick hoặc escape lộ ở các đoạn được đối chiếu. Không có SQL nhiều dòng, drawer hay chức năng sao chép mới cần kiểm trong bài này.

### Tự kiểm tra — dòng 133–161

Bốn câu nằm sau Memo, phù hợp noExercises; phủ phân biệt thuật ngữ, lợi ích nguồn chung và hai giới hạn quan trọng. Tôi xác định hướng trả lời từ phần giảng trước rồi mới đối chiếu phần đáp án. Không dùng phần đáp án để bổ sung kiến thức còn thiếu. Bảng dưới không chép nguyên đáp án.

## Tiền đề cho từng câu tự kiểm tra

| Câu hỏi | Kiến thức cần để tự trả lời | Đã giảng trước phần ôn | Kết quả học thử / còn thiếu |
|---|---|---|---|
| Database, SQL Server và SQL khác nhau thế nào? (dòng 136) | Phân biệt dữ liệu, phần mềm quản lý và ngôn ngữ gửi yêu cầu | Database ở 43/50; SQL Server ở 78; SQL và vai xử lý của SQL Server ở 85; ba hình nằm cạnh định nghĩa | Có thể lập ba vai trò từ bài; không cần biết cú pháp hay SSMS. Không thiếu tiền đề. |
| Nguồn chung giúp giảm lệch giữa Nhân sự và Kế toán như thế nào? (dòng 143) | Nguyên nhân lệch bản sao, cập nhật tập trung và người chịu trách nhiệm | 37–43; nguồn có thể còn cũ ở 52; quy trình cập nhật/lấy lại ở 97–98 | Có thể giải thích cơ chế thay vì chỉ nói “dùng database thì đúng”. Không thiếu tiền đề. |
| Có database rồi thì còn nhập sai phòng ban được không? (dòng 150) | Giới hạn của nguồn chung và khóa ngoại; phân biệt hợp lệ với đúng | 52, 68, 70–72 | Có cả trường hợp nguồn chưa cập nhật và mã có thật gán nhầm; không cần tự biết ngoại lệ SQL. Không thiếu tiền đề. |
| Hai file nhân sự khác nhau thì chắc chắn có một file sai? (dòng 157) | Dữ liệu xuất gắn với thời điểm; phạm vi lọc và mục tiêu hiện tại/lịch sử ảnh hưởng việc so sánh | Giả định hẹp ở 29; bản xuất không tự cập nhật ở 92; bản chốt/lịch sử ở 96; điều kiện so sánh ở 98 | Phải chuyển từ tình huống giả định hẹp sang câu hỏi tổng quát, nhưng bản xuất theo thời điểm và yêu cầu so cùng thời điểm/điều kiện đã cho đủ căn cứ để suy luận. Ví dụ trong đáp án là minh họa suy luận đó, không phải kiến thức mới bắt buộc. Không thiếu tiền đề. |

## Nhận xét và ưu tiên

Không phát hiện mục **Cần sửa**, **Cần làm rõ** hoặc **Cần cắt** có căn cứ trong phạm vi kiến thức của bản được giao. Một mục biên tập tùy chọn:

### E1 — Biên tập: diễn đạt mốc học SELECT cho khớp bài 1.2

- Vị trí: [bài 1.1, dòng 85](<E:/Projects/SQL Lession/src/content/lessons/1-1-database-la-gi.mdx:85>).
- Câu gốc ngắn: “câu lệnh đọc đầu tiên học ở bài 1.6.”
- Căn cứ: [bài 1.2, dòng 98–106](<E:/Projects/SQL Lession/src/content/lessons/1-2-sql-server-ssms-hrm-demo.mdx:104>) đã cho người dùng SSMS gõ/chạy SELECT và người dùng web đọc mẫu; chính bài 1.2 phân biệt việc này với học cú pháp ở 1.6.
- Tác động: câu hiện tại có thể được hiểu là trước 1.6 chưa gặp câu lệnh đọc nào. Đây là kỳ vọng chuyển bài hơi thiếu chính xác, không phải sai về SQL hoặc thiếu tiền đề làm câu ôn.
- Đề xuất: đổi riêng vế này thành “cú pháp câu lệnh đọc học ở bài 1.6” hoặc “cách viết câu lệnh đọc học ở bài 1.6”; không thêm preview hoặc giải thích dài.

Các nhóm **Giữ được** có căn cứ:

| Vị trí / câu gốc ngắn | Tác dụng và căn cứ | Đề xuất |
|---|---|---|
| Dòng 29 và 100: “hai file đều là danh sách phòng ban hiện tại”; “ở dòng của Quân” | Giả định đủ cho kết luận, không lan kết luận một dòng thành toàn bộ file | Giữ phạm vi này. |
| Dòng 52 và 70–72: “cả hai bên vẫn đọc thông tin cũ”; “Khi ràng buộc đang bật”; “hợp lệ chưa chắc đã đúng” | Ngăn ba hiểu nhầm lớn về nguồn chung, việc kiểm luật và đúng nghiệp vụ | Giữ đầy đủ điều kiện; không rút thành lời hứa database tự bảo đảm đúng. |
| Dòng 45–50, 80–89: “Database — dữ liệu được lưu”; “SQL Server — phần mềm quản lý”; “SQL — ngôn ngữ gửi yêu cầu” | Ba ảnh đã tự xem dùng chung cách biểu đạt nhưng tách được vai trò nhờ nội dung/alt/caption; không giả SSMS hoặc SQLResult thật | Giữ quan hệ ảnh với định nghĩa và nhãn minh họa. |
| Dòng 92, 96–100, 120: “File xuất chỉ phản ánh dữ liệu lúc lấy”; “khi hệ thống có thiết kế lưu lịch sử” | Giải thích được cái giá của bản xuất, giới hạn lịch sử và cách trả lời đúng tình huống | Giữ các giới hạn này ngay nơi đang áp dụng. |

## Nguồn đã đọc và giới hạn

Đã đọc AGENTS.md; toàn bộ docs/quy-uoc.md, docs/lesson-template.md, docs/ho-so-cong-ty.md; source bài 1.1 và 1.2; spec thiết kế được giao; HTML mới của bài 1.1. Không đọc report cũ ở temp/review/docs/reviews, ma trận tác giả, prompt/plan khác, seed, env hoặc secret.

Ảnh đã tự xem bằng view_image:

| PNG | mtime +07:00 | SHA256 |
|---|---|---|
| src/assets/lessons/1-1-database.png | 2026-10-29 18:03:46 | 0CDD87813C5CBBA54B5C3B97F9C89C20079B8E645CD6CBA4782CC6C444C7FA3F |
| src/assets/lessons/1-1-sql-server.png | 2026-10-29 18:04:03 | 379B82EE026B902B79631222BCF02BA21E0C0215E7502694D937D6D3C9F265BD |
| src/assets/lessons/1-1-sql-language.png | 2026-10-29 18:04:20 | 3113497994DF2CB48EB1B21FA28583E10B1BCD3B7B3639479BAE2E51A37E4556 |

Không chạy npm test/check/build/check:dist, database, SQL, API/runner hoặc nộp bài. Không dùng tài liệu SQL bên ngoài để bù kiến thức. Tính đúng kỹ thuật đã nhận xét theo lời giảng và hồ sơ khóa học; các hành vi cần thực thi mới biết chưa được xác minh độc lập ở lượt này.

Chưa xác minh UI tại 1280/1440 hoặc chiều rộng hẹp, ảnh thực sự tải qua base path, độ dễ đọc/crop trong layout, bàn phím mở đóng tự kiểm tra, TOC, nút trạng thái, clipboard hay SSMS thật. HTML có figure/srcset/alt/caption đúng không thay cho bằng chứng tương tác hoặc kiểm màn hình. Reviewer không lấy kết quả browser của người giao làm kết quả tự kiểm.

Trong phạm vi học thử source + PNG + HTML, bài đã có đủ kiến thức để xác định hướng trả lời cả bốn câu tự kiểm tra; không có vướng mắc bắt buộc phải dùng đáp án hoặc bài sau để bù. Mục E1 là biên tập chuyển bài. Kết luận này không xác nhận SQL/UI đã chạy đúng và không cấp quyền push/merge/deploy.

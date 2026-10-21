# Review độc lập bài 2.8 — Hàm ngày

- Reviewer: Codex, model kế thừa phiên, không đổi model và không suy đoán tên model.
- Ngày review: 21/10/2026.
- Phạm vi: toàn bộ `src/content/lessons/2-8-ham-ngay-tham-nien.mdx`, YAML tương ứng và HTML tĩnh của bài cùng ba trang đề. HTML bài chính có thời gian ghi 21:46:36 ngày 21/10/2026.
- Cách đọc: người mới học SQL Server, cần hiểu đủ để đối chiếu yêu cầu nghiệp vụ và phản biện cách lấy dữ liệu. Chỉ dùng bài học, bài trước và tài liệu nội bộ được giao; không đọc seed hoặc report review cũ, không dùng database/API/browser, không sửa bài.

## Nhận định chung

Không phát hiện lỗi SQL cốt lõi qua đọc tĩnh. Bài phân biệt đúng ngày báo cáo cố định với đồng hồ máy chủ, khoảng cách 30 ngày với 31 ngày lịch gồm hai đầu, ranh giới của `DATEDIFF` với mốc kỷ niệm bằng `DATEADD`. Tình huống và ba đề đều đủ dữ kiện để viết truy vấn mà không phải tự đoán thêm phạm vi.

Có bốn mục cần hành động, chủ yếu là lời hẹn chưa khép từ bài trước và biên tập thuật ngữ. Những kết luận về dữ liệu live, SQL Server thực thi và tương tác giao diện vẫn chưa được xác minh ở lượt này.

## Rà theo thứ tự bài

### 01. Giữ được — tiêu đề, mục tiêu và độ sâu

**Nguồn/câu gốc:** MDX dòng 3–13: “Hàm ngày: thâm niên, sinh nhật, hết hạn hợp đồng”; “phân biệt số ranh giới thời gian với thâm niên tròn và tìm tháng sinh, cuối tháng”.

**Tại sao/để làm gì:** Sau bài tôi phải tự tính số năm thâm niên đầy đủ, hay chỉ biết xét đã chạm mốc chưa? **Bài đã trả lời:** mục tiêu là phân biệt và tạo mốc, không hứa một công thức tổng quát tính số năm tròn. Phần dẫn sang bài 2.9 khớp với mục tiêu đó.

Nội dung có `GETDATE`, `CAST`, `DATEADD`, `EOMONTH`, `DATEDIFF`, `MONTH`, bốn bước sơ đồ và ba bài tập; thời lượng 28 phút không rõ là thấp quá qua việc đọc này. Không đề nghị mở thêm công thức tổng quát hay quy tắc nghiệp vụ thâm niên ngoài mục tiêu.

### 02. Giữ được — yêu cầu và giả định khép đủ

**Nguồn/câu gốc:** MDX dòng 18–24: “toàn bộ bảng `HopDong`, gồm cả hợp đồng lịch sử nếu thỏa khoảng ngày”; “khoảng cách `30` ngày giữa hai mốc, có `31` ngày lịch khi tính cả hai đầu”.

**Tại sao/để làm gì:** “Sắp hết hạn” có nghĩa chỉ hợp đồng hiện hành của người đang làm, hay mọi dòng có ngày kết thúc đạt khoảng? Có lấy hôm nay không? **Bài đã trả lời rõ:** mọi dòng hợp đồng, hai đầu đều được lấy, ngày chốt cố định, trả năm cột và có tiêu chí phụ khi cùng ngày.

Đếm từ `2026-10-21` tới `2026-11-20` là khoảng cách 30 ngày; thêm việc lấy cả hai đầu thì có 31 ngày lịch. Không có mâu thuẫn cần sửa. Phạm vi cũng khớp mục 7 hồ sơ công ty.

### 03. Biên tập — Key chưa chốt câu hỏi dữ liệu

**Nguồn/câu gốc:** MDX dòng 26: “Chốt ngày báo cáo và hai đầu khoảng lọc trước khi tính hoặc so sánh ngày.”

**Tại sao/để làm gì:** Khối chốt đang nhắc tôi phải làm thế nào, hay nhắc kết quả cụ thể chị Hạnh cần? **Chưa đúng vai trò của Key:** đây là nguyên tắc chung, còn câu hỏi dữ liệu nằm ở đoạn trước. Quy ước yêu cầu Key chốt câu hỏi dữ liệu của tình huống.

**Đề xuất:** thay ngay câu này bằng “Tìm các dòng hợp đồng kết thúc từ `2026-10-21` đến hết `2026-11-20`, kèm số ngày còn lại.” Không thêm đoạn giải thích.

### 04. Giữ được — điểm tựa Excel và chuyển sang đồng hồ máy chủ

**Nguồn/câu gốc:** MDX dòng 32–44: “nếu cột ngày đã là ngày thật”; công thức `=B2-DATE(2026,10,21)`; “`GETDATE()` trả ngày giờ hệ thống của máy chủ”.

**Tại sao/để làm gì:** Vì sao không dùng `TODAY` hoặc `GETDATE` ở mọi câu? Tại sao `CAST` xuất hiện? **Bài đã trả lời:** ngày hiện tại thay đổi theo lúc chạy; báo cáo đối chiếu cần giữ ngày chốt; `CAST(... AS date)` bỏ giờ.

Ba phép trừ ngày cho ra `10`, `23`, `24`, nhất quán với kết quả tình huống. Hình ghi rõ là minh họa, đánh dấu đúng `B2`–`B4`, công thức dùng `C2`; không phải hình sau lọc nên không cần số dòng nhảy cóc. Chuyển Excel → SQL diễn ra trong cùng mạch, không cần tách hai mục cũ.

### 05. Biên tập — giải nghĩa ngắn UTC ngay chỗ dùng

**Nguồn/câu gốc:** MDX dòng 46: “Database học trên Azure SQL Database dùng giờ UTC; ngày đó có thể khác ngày ở Việt Nam gần lúc chuyển ngày.”

**Tại sao/để làm gì:** UTC là gì, vì sao ngày máy chủ có thể khác ngày tôi đang nhìn? **Bài trả lời được hậu quả nhưng chưa giải nghĩa thuật ngữ.** Các bài trước được đọc không cung cấp điểm tựa này. Không coi đây là lỗi của ngày chốt cố định hoặc đề nghị dạy xử lý múi giờ đầy đủ.

**Đề xuất:** thay câu đầu bằng một câu ngắn có vế “UTC là giờ chuẩn quốc tế, chậm giờ Việt Nam `7` giờ”. Vế này làm rõ nguyên nhân; giữ cách dùng ngày cố định của phần còn lại. Khẳng định môi trường học thực tế là Azure SQL Database vẫn cần người viết xác minh ở bước kiểm môi trường, không được chứng nhận chỉ bằng review tĩnh này.

### 06. Giữ được — tạo mốc bằng DATEADD và cuối tháng bằng EOMONTH

**Nguồn/câu gốc:** MDX dòng 48–63: “số âm để lùi lại”; “`DATEADD(day, 30, ...)` khác cộng một tháng: tháng có độ dài khác nhau”; kết quả `2026-11-20`, `2026-10-31`.

**Tại sao/để làm gì:** Vì sao dùng `day, 30` thay cho `month, 1`, và cuối tháng có phải cùng một mốc không? **Bài đã trả lời:** hai cách tạo mốc có ý nghĩa khác nhau; câu ví dụ đặt hai kết quả cạnh nhau để đối chiếu.

Cú pháp ba đầu vào, đơn vị không có dấu nháy và vai trò số âm đều đủ để đọc ví dụ lẫn làm bài tập. Câu so với Excel nói về mục đích của hàm, không đưa một công thức Excel một tham số để học viên chép sai. Không cần thêm các trường hợp cuối tháng/năm nhuận ngoài phạm vi hiện có.

### 07. Cần làm rõ — lời hẹn lọc hết ngày ở bài trước chưa được thực hiện

**Nguồn/câu gốc:** MDX dòng 65: “Trong bảng này `NgayKetThuc` có kiểu `date`, nên không có phần giờ cần xét thêm.” Đối chiếu bài 2.2 dòng 85: “với cột có giờ, mốc cuối ngày cần cách viết khác (bài 2.8)”; bài 2.3 dòng 60: “cách lọc tới hết ngày học ở bài 2.8”.

**Tại sao/để làm gì:** Tôi đã được bảo đợi bài này để biết viết mốc cuối khi cột có giờ; đến đây phải viết thế nào để không bỏ các giờ còn lại của ngày cuối? **Bài chưa trả lời lời hẹn đó.** Điều kiện `<=` hiện tại hoàn toàn đúng với cột `date` của tình huống; thiếu ở mạch kiến thức liên bài, không phải query hợp đồng đang sai.

**Đề xuất:** thêm đúng một vế cạnh câu hiện có: “Với cột có giờ, lấy hết ngày mốc trên bằng `< DATEADD(day, 1, ngày_mốc_trên)`.” Chỉ cần diễn đạt rõ `ngày_mốc_trên` là mốc kiểu ngày; không thêm một bài riêng về kiểu ngày giờ. Nếu quyết định giữ bài 2.8 chỉ với `date`, cần sửa hai lời hẹn cũ sang đúng nơi thực sự dạy ý này.

### 08. Giữ được — DATEDIFF đếm ranh giới, DATEADD kiểm mốc đủ năm

**Nguồn/câu gốc:** MDX dòng 69–94: “Từ `2026-09-30` tới `2026-10-01` chỉ cách một ngày nhưng `DATEDIFF(month, ...)` là `1`”; ví dụ `NV036`; “không lấy chênh lệch năm hay số ngày chia `365` làm số năm tròn”.

**Tại sao/để làm gì:** Vì sao đếm được hai năm mà người đó chưa đủ hai năm? Vì sao vẫn dùng được `DATEDIFF(day, ...)`? **Bài đã trả lời cả hai:** qua hai ranh giới năm nhưng chưa tới `2026-11-15`; hai giá trị kiểu `date` dùng để đếm khoảng cách ngày, không suy ra số năm tròn.

Ngày vào làm của `NV036` khớp hồ sơ công ty. Mốc hai năm sau ngày chốt nên kết luận chưa đủ hai năm là hợp lý qua đối chiếu lịch. Bài cũng nêu nghĩa số `0` và số âm, không chỉ nêu cách áp dụng thuận chiều. Không cần công thức số năm hoàn chỉnh để làm yêu cầu hiện tại.

### 09. Giữ được — tháng sinh, NULL và chất lượng ngày

**Nguồn/câu gốc:** MDX dòng 96–98: “bất kể năm sinh”; “không kiểm sinh nhật đã qua trong tháng hay chưa”; “Bộ lọc ngày không kiểm đúng/sai của dữ liệu”.

**Tại sao/để làm gì:** Lấy tháng có đồng nghĩa lấy sinh nhật sắp tới không? `NULL` có được hiểu là còn xa hạn không? Lọc xong có chứng minh dữ liệu ngày hợp lý không? **Bài đã trả lời:** chỉ lấy số tháng; `NULL` không qua khoảng so sánh; việc lọc không kiểm hoặc sửa ngày sai.

Giới hạn được đặt ngay cạnh phép tính nên dễ dùng đúng. Ngày sinh `1993-10-28` của `NV036` không có trong hồ sơ công ty được giao; reviewer không đọc seed hoặc chạy query nên ghi **chưa xác minh** giá trị này, không suy đoán nó sai. Lỗi ngày kết thúc trước ngày bắt đầu được hồ sơ công ty xác nhận là có chủ ý.

### 10. Cần cắt — thuật ngữ index ở câu dẫn đi sâu không giúp mục tiêu hiện tại

**Nguồn/câu gốc:** MDX dòng 100: “và xem ảnh hưởng của cách lọc tới index ở bài 5.6”.

**Tại sao/để làm gì:** Index là gì, tôi cần hiểu nó để giải yêu cầu này không? **Bài chưa giải nghĩa và không cần nó để hoàn thành mục tiêu.** Các đường dẫn ý nghĩa tới bài 2.9, 3.4 và 4.6 đã đủ chốt phần đào sâu; giữ thêm một thuật ngữ kỹ thuật chưa dùng làm câu này nặng hơn.

**Đề xuất:** bỏ đúng vế trích trên. Nếu muốn giữ lời dẫn, thay `index` bằng “chỉ mục” kèm nghĩa sẽ cần thêm kiến thức không cần thiết lúc này; ưu tiên cắt theo quy ước viết gọn. Không đề nghị mở thêm phần hiệu năng.

### 11. Giữ được — câu lệnh, kết quả và câu trả lời nghiệp vụ

**Nguồn/câu gốc:** MDX dòng 104–149: `WHERE NgayKetThuc >= ... AND NgayKetThuc <= DATEADD(day, 30, ...)`; `ORDER BY NgayKetThuc ASC, MaHD ASC`; “Đây là danh sách hợp đồng để rà, không phải số nhân viên cần gia hạn.”

**Tại sao/để làm gì:** Query đã lấy đúng khoảng, đúng cột, đúng thứ tự chưa? Có thể biến ba hợp đồng thành ba người phải gia hạn không? **Bài đã trả lời:** năm cột đúng yêu cầu; hai đầu được giữ; thứ tự ngày rồi mã; cần người phụ trách xem hồ sơ và quyết định gia hạn.

Ba mã, mã nhân viên và ngày kết thúc khớp mục 7 hồ sơ công ty; các khoảng cách ngày khớp nhau giữa Excel/Result/lời giải. Tất cả ba dòng được đánh dấu và có câu nói rõ mục đích đối chiếu. Chưa chạy SQL Server nên không chứng nhận số dòng thực tế của database dùng chung hoặc mọi ngày bắt đầu từ nguồn live.

### 12. Giữ được — toàn bộ RunFlow

**Nguồn/câu gốc:** MDX dòng 153–356: “thứ tự xử lý logic”; “Hai bước đầu chỉ trích các cột mã/ngày”; “Trước `ORDER BY`, thứ tự các dòng trong hình không được bảo đảm”; bước nguồn `55`, lọc còn `3`, thêm cột và xếp vẫn `3`.

**Tại sao/để làm gì:** Vì sao nhìn thấy cột ở bước `FROM` khi `SELECT` ở sau? Vì sao kết quả giữa các bước có thể khác thứ tự? **Bài đã trả lời:** đây là các cột trích để đối chiếu và sơ đồ logic; chỉ bước cuối chốt thứ tự.

`query` trùng câu tình huống; `focus` khớp đoạn SQL từng bước. `FROM` có năm dòng trích với `NULL` và lỗi ngày chủ ý; `WHERE` giữ đúng ba mã đã xuất hiện; `SELECT` thêm `SoNgayConLai`; `ORDER BY` xếp đúng các ngày hiển thị. Tổng 55 hợp đồng khớp hồ sơ công ty; phép trừ 55 − 3 = 52 nhất quán nội bộ. Drawer mở đầu bằng từ khóa, nêu số dòng và giá trị cụ thể; không có `LineMap` cần ép thêm. Kết quả từng câu kiểm bước trên SQL Server vẫn chưa xác minh.

### 13. Giữ được — Hay nhầm, Ứng dụng, Ghi nhớ và hướng dẫn bài tập

**Nguồn/câu gốc:** MDX dòng 362–391: “Hợp đồng đã kết thúc từ trước ngày chốt cũng lọt vào”; “Chuẩn bị rà hợp đồng”; “Kiểm mốc thâm niên”; “Tên cột không được chấm”.

**Tại sao/để làm gì:** Điều kiện sai gây sai báo cáo kiểu gì, tôi áp dụng các hàm vào việc nào, phải tuân thủ định dạng kết quả nào? **Bài đã trả lời:** bốn lỗi đi cùng hậu quả, ba ứng dụng bám đúng các hàm đã giảng, Ghi nhớ đối chiếu đúng các ý chính, phần bài tập nói rõ vị trí cột/thứ tự dòng và không chấm tên cột.

Hay nhầm nhắc lại dưới dạng lỗi/hậu quả, không chép thêm cách giảng hàm; Ghi nhớ được phép ôn lại. Không thấy câu lặp dài cần cắt thêm ở nhóm này. Khái niệm trọng tâm và giá trị dẫn chứng được đánh dấu có chọn lọc; không đề nghị bôi đậm mọi lần xuất hiện.

### 14. Giữ được — ba bài tập phủ mục tiêu và đủ dữ kiện

**Nguồn/câu gốc:** YAML dòng 3–64: “Tháng sinh của tháng kế tiếp”; “Đang làm và chưa đủ một năm”; “Kết thúc sau ngày chốt đến hết tháng”.

**Tại sao/để làm gì:** Đề có buộc tự đoán trạng thái/phòng/ngày hay cách lấy hai đầu không? Có chỉ cần chép nguyên câu tình huống để nộp không? **Bài đã trả lời rõ phạm vi và có thay đổi yêu cầu đủ để người học tự viết.**

- **2-8-1:** ngày chốt, tháng kế tiếp, bất kể năm/phòng/trạng thái, ba cột và thứ tự mã đều rõ. Đáp án dùng `MONTH(DATEADD(month, 1, ...))`, đúng ý đề khi đọc tĩnh; không biến tháng sinh thành khoảng ngày sinh của năm 2026.
- **2-8-2:** chỉ trạng thái `Đang làm`, đã vào làm tới ngày chốt, mốc đủ một năm phải sau ngày chốt, loại người đạt mốc đúng hôm đó. Đủ cả chặn hồ sơ ngày vào làm tương lai và giới hạn đầu mốc; đáp án phản ánh đúng. Hồ sơ công ty cho phép đối chiếu bốn ngày vào làm gần nhất, nhưng số dòng live chưa xác minh.
- **2-8-3:** bỏ ngày chốt, lấy hết ngày cuối tháng, không thêm lọc loại hợp đồng/nhân viên; `NULL` được nói rõ. Đáp án đổi đầu dưới thành `>`, đầu trên dùng `EOMONTH`, bốn cột và thứ tự đúng yêu cầu. Query tình huống trả năm cột và mốc sau 30 ngày, nên không phải nguyên câu giải sẵn cho đề này.

Cả ba khai báo `ordered: true`, `columns` khớp vị trí cột trong đáp án. Không phát hiện nguyên câu đáp án được đưa thành ví dụ đầy đủ trong MDX. Việc hệ thống chấm có cưỡng chế đúng hàm theo câu “Dùng ...” không được kiểm ở lượt chỉ đọc này; không suy đoán bộ chấm thực thi một luật chưa xác minh.

### 15. Giữ được trong giới hạn HTML tĩnh — nguồn và build nhất quán

**Nguồn/câu gốc:** `dist/bai/2-8-ham-ngay-tham-nien/index.html` và ba `bai-tap/<n>/index.html`.

**Tại sao/để làm gì:** Người học có thấy nội dung mới, dấu đánh và đủ ba đề không? **HTML tĩnh trả lời được một phần:** có sáu mục cấp hai đúng khung, bốn tiểu mục trong phần chính, bốn thẻ/bốn panel RunFlow, ba ô ngày Excel được đánh dấu, ba dòng Result được đánh dấu và đủ ba trang đề với prompt khớp YAML. Không thấy dấu backtick lộ thành chữ ở phần văn bản trích.

Các thuộc tính đánh dấu của nguồn có mặt trong HTML. Đây không phải xác minh người học bấm mở drawer được, không phải ảnh chụp viewport hoặc bằng chứng không tràn ngang. Không suy ra “giao diện đã đạt” từ các kiểm tĩnh này.

## Thứ tự ưu tiên sửa

1. **Mục 07 — Cần làm rõ:** hoàn tất lời hẹn lọc hết ngày cho cột có giờ, hoặc chỉnh hai lời hẹn cũ về đúng nơi thực sự dạy. Đây là khoảng trống kiến thức liên bài rõ nhất.
2. **Mục 05 — Biên tập:** giải nghĩa UTC bằng một vế có chênh lệch giờ để người học hiểu nguyên nhân lệch ngày.
3. **Mục 03 — Biên tập:** đổi Key thành câu chốt dữ liệu cần lấy.
4. **Mục 10 — Cần cắt:** bỏ vế `index` chưa cần thiết.

Tổng cộng **15 mục report**, gồm **4 mục cần hành động**, **11 mục Giữ được**. Không có đề xuất đổi khung gộp Excel/SQL, thêm phần trả lời riêng, đổi bộ chấm tên cột hoặc mở rộng ra công thức thâm niên tổng quát.

## Nguồn đối chiếu và giới hạn xác minh

- Đã đọc brief lượt review, `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu bài 1.1 và phần bài trước liên quan về kiểu ngày/so sánh khoảng/chuỗi. Đã xem các quyết định “Không làm theo” trong spec được chỉ định; không có đề xuất nào ở đây chủ ý đảo quyết định đã chốt.
- Không đọc `database/HRM_Demo.sql`, các report trong `docs/reviews` hoặc `temp/review`. Chỉ tạo report này, không sửa nội dung bài/test/API/component/tài liệu triển khai.
- Không dùng tài liệu ngoài, SQL Server, API, browser hoặc nút chạy bài tập; không chạy build/test/check để chứng nhận thay người kiểm chính. Các số liệu khớp tài liệu nội bộ hoặc lịch được phân biệt với dữ liệu live chưa xác minh.
- Chưa xác minh ngày sinh `NV036`, mọi ngày bắt đầu hợp đồng, tổng dòng thực tế ở database dùng chung, chính sách hàm của bộ chấm, thao tác sao chép, drawer, bàn phím hoặc bố cục tại viewport cụ thể. Không có kết luận lỗi nền máy chạy ở lượt này vì các kiểm đó không được thực hiện trong phạm vi được giao.

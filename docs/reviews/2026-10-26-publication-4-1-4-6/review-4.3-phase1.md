# Học thử bài 4.3 — pha 1 đã khóa

## Phạm vi, phiên bản và cách làm

Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

- Bài: `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx`, đọc toàn bộ 292 dòng, hai `Sql`, hai `Result`, toàn bộ ba bước `RunFlow` cùng `query`, `focus`, `meaning`, `detail`, SQL kiểm, cột, dòng và `total`; cả bốn câu tự kiểm tra và ba đề công khai.
- Phiên bản được giao: source `dd67309`, nhánh `codex/review-lessons-4-1-4-6`. Theo brief, root chỉ thêm plan, chưa sửa nội dung. Đây là nhận diện phiên bản từ gói giao việc, không phải bằng chứng do reviewer chạy Git.
- Chưa được giao build khớp source. Không mở `dist` cũ, không kiểm HTML hoặc browser.
- Model: kế thừa model của phiên; không chỉ định model khác, không tạo agent con.
- Công cụ thực tế: đọc file bằng PowerShell; tìm đúng tên bài trước bằng `rg --files`; kiểm tĩnh riêng MDX bằng regex/JSON trong PowerShell. Không chạy SQL/API/runner/DB, không nộp bài, không đọc seed, secret, report cũ hoặc nhận xét reviewer khác.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md` (gồm đầy đủ 4.5/4.6), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1; đọc đầy đủ 4.1, 4.2, 2.8, 3.2, 3.10 làm tiền đề. Không dùng các dòng mô tả bài sau trong hồ sơ công ty để bù lời giảng bài 4.3.
- Đầu vào bài tập ở pha này chỉ là `public-4.3.json`, đã bỏ answer/check. **Chưa mở YAML. Pha 1 khóa ngay sau khi ghi file này; không sửa lại khi đã biết đáp án.**

## Rà theo thứ tự bài

| Phần | Kết quả học thử từ source |
|---|---|
| Frontmatter, tình huống, phạm vi (8–25) | Mục tiêu gồm lũy kế, kỳ trước, tháng thiếu và thời điểm lọc. Tình huống yêu cầu mọi trạng thái; đoạn 23 nói rõ theo tháng bắt đầu, cộng nguyên `SoNgay`, gồm cả đơn sau 21/10, không đồng nhất với ngày đã duyệt/thực nghỉ hoặc chứng nhận dữ liệu đủ kỳ. Không mang điều kiện đã duyệt của 4.1 sang báo cáo này. |
| Excel → bảng tháng (31–47) | Công thức cố định điểm bắt đầu `$B$2` được giải thích bằng cách kéo xuống; không cần biết PivotTable/VLOOKUP. Chuyển SQL rõ bằng `EOMONTH`, có giải thích ngày cuối tháng chỉ là khóa đại diện. Câu kiểm CTE cho hai cột và đủ ba tháng. Ví dụ `DP018` giải thích vì sao đơn qua tháng vẫn góp nguyên ngày cho tháng bắt đầu. |
| `SUM OVER`, khung `ROWS` (49–51) | Có nghĩa của cửa sổ giữ dòng, thứ tự tháng, đầu khung và dòng hiện tại. Đã chốt một dòng mỗi tháng trước; không có khóa tháng trùng trong nguồn cửa sổ của câu chính. `PARTITION BY` vắng mặt được giải thích là một nhóm chung. Không hứa cửa sổ thay `GROUP BY`. |
| `LAG`, bí danh, `NULL` (55–57) | So với phép trừ dòng trên trong Excel; định nghĩa dòng trước trong thứ tự và mặc định `NULL` tại đầu phạm vi. Lý do cần CTE `SoSanh` để sử dụng cột `KyTruoc` có sẵn được nói trước câu chính; không yêu cầu người mới dùng bí danh vừa tạo cùng cấp. `NULL` trong phép trừ được giảng tại đây. |
| Tháng thiếu, chia loại, lọc hiển thị (59–63) | Ví dụ thiếu tháng 9 cho thấy `LAG` lấy tháng 8 ở tháng 10, lũy kế 25, không tự sinh tháng/0. Chia loại được hướng dẫn đủ hai việc: đổi khóa nhóm thành loại–tháng và thêm `PARTITION BY LoaiNghi` trước thứ tự trong `OVER`; giữ khung. Điều kiện chỉ hiện tháng 10 có vị trí cụ thể ở câu ngoài; hậu quả lọc sớm là lũy kế 11, kỳ trước `NULL`. |
| Câu chính, kết quả, trả lời (69–90) | Câu chính có hai CTE, tổng hợp tháng trước cửa sổ, sau đó mới trừ. Kết quả ba dòng đúng cấu trúc, `total=3`. Các phép cộng/trừ trên ba tổng đã cho nhất quán: 14 → 34 → 45; kỳ trước `NULL`/14/20; chênh lệch `NULL`/6/−9. Câu trả lời cạnh kết quả, tháng 8 là đầu phạm vi tính chứ không khẳng định không tồn tại dữ liệu tháng 7. |
| Sơ đồ (94–227) | Nói rõ chỉ diễn giải `SELECT` ngoài và không khẳng định CTE được lưu/chạy tuần tự. Rà đủ từng drawer ở bảng dưới. Không ép thêm một chuỗi bước cho nội bộ CTE khi bài đã giới hạn phạm vi sơ đồ. |
| Hay nhầm (233–235) | Ba lỗi gắn hậu quả riêng: nhầm điểm đầu lũy kế; đổi thiếu thông tin thành giả định 0; đọc chênh lệch âm thành `SoNgay` âm. Không nêu ngoại lệ kỹ thuật không cần cho mục tiêu. |
| Ứng dụng, Memo (243–256) | Bốn ứng dụng đúng phần đã giảng, gồm chia nhóm và lọc hiển thị; Memo ôn công cụ Excel/SQL gọn. Không cần thêm `LineMap` hoặc hình chỉ để đủ khối. |
| Tự kiểm tra (258–286) | Bốn câu đúng vị trí sau Memo, trước Bài tập. Đáp án đều đã có ở 49–63; không dùng phần ôn để dạy bù. Bao phủ đơn vị dòng, tháng thiếu, thời điểm lọc và `PARTITION BY`. |
| Bài tập (290–292 và public JSON) | Có nhắc lại phạm vi dùng chung, cách chấm chỉ so kết quả/thứ tự, người học phải tự kiểm kỹ thuật. Ba đề có cách làm từ phần chính, không cần bài sau. |

### Rà đủ RunFlow và câu kiểm trạng thái dòng

| Bước/dòng nguồn | Nguồn và trạng thái đúng theo nội dung hiển thị | SQL kiểm và kiểm tĩnh |
|---|---|---|
| `FROM` (115–147) | Đọc `SoSanh` đã có `Thang`, `TongNgay`, `LuyKe`, `KyTruoc`. Đủ ba tháng, bốn cột; không có `ChenhLech` vì chưa tính ở câu ngoài. Dòng đầu `KyTruoc=NULL`. `rows=3`, `total=3`. | Có đầy đủ hai định nghĩa CTE; SELECT bốn cột, từ đúng nguồn, thêm sắp tháng để xem. Focus đúng phần `FROM SoSanh AS ss`. Không hiểu đây là ba đơn nguồn. |
| `SELECT` (150–186) | Giữ ba dòng, thêm cột thứ năm bằng phép trừ. Hai `NULL` ở dòng tháng 8, chênh lệch 6/−9 ở hai tháng sau khớp phép tính. `rows=3`, `total=3`. | Có đầy đủ `WITH`; SELECT khớp năm cột/result. Focus nhiều dòng có trong query sau chuẩn hóa CRLF/LF. Câu kiểm có `ORDER BY` để trả kết quả ổn định; không lấy nó làm bằng chứng rằng `SELECT` tự sắp dòng. |
| `ORDER BY` (189–225) | Vẫn ba dòng, năm cột; tháng tăng dần. Không thay đổi cửa sổ hoặc số liệu. `rows=3`, `total=3`. | Câu kiểm đủ CTE và trùng câu chính. Focus đúng phần `ORDER BY ss.Thang ASC`. Lời nhắc tháng có sẵn phải được kiểm liên tiếp không mâu thuẫn phần giảng. |

Kiểm tĩnh tự chạy: tìm thấy đúng hai khối SQL và một `RunFlow`; câu chính bằng `RunFlow.query`; cả ba focus khớp query sau chuẩn hóa xuống dòng; cả ba câu kiểm có `WITH` đầy đủ và dấu chấm phẩy cuối; số cột mỗi dòng khớp `columns`; cả ba drawer có ba dòng và `total=3`. Lần so chuỗi đầu chưa chuẩn hóa CRLF/LF báo focus `SELECT` không khớp; kiểm lại với chuẩn hóa xuống dòng thì khớp. Đây là giới hạn của phép so thô, không phải phát hiện lỗi sản phẩm. Không thực thi SQL trong các thuộc tính này.

## Tự hỏi “tại sao/để làm gì”

| Câu tự hỏi | Bài đã trả lời ở đâu / còn thiếu gì |
|---|---|
| Vì sao chưa dùng cửa sổ trực tiếp trên từng đơn? | 33, 49–51: cần một dòng mỗi tháng, cửa sổ giữ nguyên dòng đầu vào. Đã trả lời. |
| Vì sao dùng ngày cuối tháng thay vì chỉ số tháng? | 33: mọi ngày cùng tháng có chung khóa là một ngày đại diện; 2.8 đã dạy hàm trả ngày cuối tháng. Câu chính giữ cả năm trong khóa ngày. Đủ cho phạm vi hiện tại. |
| Vì sao cần cả `OVER` và khung `ROWS`? | 49–51: thứ tự xác định tháng trước/sau, khung chọn từ đầu đến dòng hiện tại; 4.2 đã giảng `OVER`. Đã trả lời, không cần học khung khác để làm ba đề. |
| Vì sao tháng đầu không phải tăng bằng tổng tháng đó? | 55–57, 90, Hay nhầm 2: đầu phạm vi không có dòng kỳ trước, thiếu thông tin khác 0. Đã trả lời. |
| Vì sao thiếu tháng 9 mà kỳ trước tháng 10 có thể là tháng 8? | 59: `LAG` lấy dòng có sẵn trước trong thứ tự, không tạo lịch. Đã trả lời bằng số cụ thể. |
| Vì sao tách CTE `SoSanh` rồi mới trừ? | 57 và tiền đề 4.1: dùng được cột từ nguồn, tránh tham chiếu bí danh vừa tạo cùng cấp. Đã trả lời. |
| Vì sao chia loại cần thay cả tổng hợp lẫn cửa sổ? | 61: đầu vào mỗi cặp loại–tháng, nhóm tính riêng theo loại. 3.2 đã dạy thêm khóa nhóm đổi độ chi tiết; 4.2 đã dạy `PARTITION BY`. Đã trả lời. |
| Vì sao chỉ gửi tháng 10 vẫn phải giữ tháng 8–9 trước đó? | 63: chúng còn cần cho lũy kế và kỳ trước, kèm kết quả sai nếu lọc sớm. Đã trả lời. |
| Có thể kết luận số ngày thực nghỉ/tăng nghỉ đã duyệt không? | 23, 47, 90: đây là tổng ngày trên mọi trạng thái đơn theo tháng bắt đầu. Không có căn cứ diễn giải thành thực nghỉ. Đã giới hạn rõ. |

## Bảng tiền đề và cách làm riêng từng đề — lập trước YAML

| Đề | Kiến thức cần và đã học ở đâu | Cách làm tự xác định từ bài/public JSON | Thiếu / khó tìm / cần chạy mới biết |
|---|---|---|---|
| 4-3-1 — Phép năm | Lọc ngày và chuỗi Unicode: cú pháp đã xuất hiện trong 3.10 và 4.1; ngày cuối tháng ở 2.8, nhắc tại 33; `GROUP BY`/`SUM` ở 3.2 và 33; CTE ở 4.1; khung cộng dồn ở 49–51. | Chọn đúng loại Phép năm và khoảng tháng 8–10, không thêm điều kiện trạng thái. Nhóm theo ngày cuối tháng, cộng nguyên ngày. Dùng kết quả tháng làm đầu vào cộng dồn có khung từ đầu đến dòng hiện tại; chọn ba cột theo đề, sắp tháng tăng dần. Không tự bổ sung tháng thiếu. | Không thấy thiếu tiền đề. Cần tự viết lại theo yêu cầu hẹp hơn ví dụ. Tổng tháng riêng Phép năm cần truy vấn dữ liệu để xác nhận; các tổng chung 14/20/11 không đủ suy ra chúng. Điều này không phải thiếu lời giảng. |
| 4-3-2 — Lũy kế theo loại | Nhóm nhiều khóa ở 3.2; `PARTITION BY` ở 4.2; hướng dẫn đổi chính xác sang loại–tháng và giữ khung ở 61; sắp nhiều khóa ở 3.2/4.2. | Giữ mọi trạng thái trong khoảng ngày. Đầu vào phải có `LoaiNghi` và tháng cuối kỳ, tổng nguyên `SoNgay` cho từng cặp. Cộng dồn riêng từng loại theo tháng, giữ khung từ dòng đầu của loại đó. Trả bốn cột, sắp loại rồi tháng; chỉ các cặp có dữ liệu. | Không thấy thiếu tiền đề hoặc chỗ phải học từ đáp án. Cách làm được viết bằng lời ở 61 thay vì có một câu SQL đầy đủ riêng; với cú pháp `PARTITION BY` đã học ở 4.2 là đủ. Số cặp và tổng cụ thể phải chạy để xác minh, chưa tự xác minh. |
| 4-3-3 — Chỉ hiện tháng 10 | Hai CTE ở 4.1; tổng tháng, `SUM OVER`/`ROWS`, `LAG`, `NULL` ở 33–59; vị trí điều kiện tháng cụ thể ở 63; phép trừ ở 57 và câu chính. | Giữ đủ đầu vào tháng 8–10 cho hai phép cửa sổ; chỉ sau đó mới giới hạn tháng hiển thị ở câu ngoài. Phép trừ dùng cột kỳ trước đã tính, giữ `NULL`, chọn đúng năm cột và sắp tháng. | Không thiếu tiền đề. Bài đã cho cả lý do lẫn vị trí điều kiện; tự kiểm tra 3 chỉ ôn lại. Có thể đối chiếu dự kiến tháng 10 với dòng 88: 11/45/20/−9, nhưng chưa chứng minh dữ liệu sống hoặc bộ chấm trả đúng. |

## Nhận xét ưu tiên trước khi biết đáp án

Không phát hiện mục **Cần sửa / Cần làm rõ / Cần cắt** có căn cứ chặn mục tiêu hoặc ba đề trong pha source này. Không gán lỗi vì chưa chạy database và không thêm finding cho đủ số.

- **Giữ được — phạm vi số liệu:** “cộng nguyên `SoNgay` theo tháng bắt đầu” (23, 47). Tránh nhầm ngày đơn với ngày thực nghỉ, cũng tránh mang phạm vi đã duyệt từ bài trước.
- **Giữ được — tiền đề `ROWS`/`LAG`:** “cửa sổ không thay bước `GROUP BY`” (51), “Dòng trước chưa chắc là tháng lịch liền trước” (59). Giải thích đơn vị dòng và điều kiện diễn giải trước khi ôn/làm đề.
- **Giữ được — thời điểm lọc:** “Thêm điều kiện ... ở câu ngoài đọc `SoSanh`” (63). Người mới có vị trí sửa cụ thể và thấy hậu quả khi làm khác.
- **Giữ được — chia nhóm:** đoạn 61 yêu cầu đồng thời thêm khóa tổng hợp và `PARTITION BY`, không chỉ nhắc tên kỹ thuật. Đủ để tự biến đổi sang đề 2.
- **Giữ được — trình bày:** mạch Excel/SQL gộp, bốn tiểu mục phần chính, trả lời cạnh kết quả, bold chọn lọc và code cho dẫn chứng/biểu thức. Không có dấu mark sai hoặc `LineMap` thiếu ví dụ vì bài không dùng các khối ấy. Thời lượng 35 phút có vẻ phù hợp lượng kiến thức và ba đề, nhưng chưa đo một lượt học có thao tác.

## Giới hạn khóa pha 1

Đã kiểm nội dung nguồn, logic nội tại, số học trên giá trị đã cho và tiền đề cách làm. Chưa xác minh tổng 14/20/11 với nguồn sống, sự tồn tại/giá trị `DP018`, số liệu riêng từng loại, kết quả câu SQL thật, bộ chấm, HTML, copy/paste, tab bốn cột sau build, highlight/drawer khi tương tác, bàn phím hoặc luồng web/SSMS. Source dùng escape thụt lề đúng dạng quy ước; đó chưa phải kiểm render.

Chưa đọc YAML/answer/check. Sau khi file này được ghi, đối chiếu YAML chỉ được ghi vào `review-4.3.md`, không thay kết luận hoặc bảng tiền đề pha 1.

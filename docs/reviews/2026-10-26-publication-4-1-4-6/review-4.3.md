# Review độc lập bài 4.3 — Lũy kế và so với tháng trước

## Phạm vi, phiên bản và công cụ thực tế

Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

- Đã đọc toàn bộ `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx` (292 dòng): lời văn, hai `Sql`, hai `Result`, toàn bộ `RunFlow` gồm ba drawer và từng `query`/`focus`/SQL kiểm/`columns`/`rows`/`total`, bốn câu tự kiểm tra, phần Bài tập và ba đề.
- Source được giao theo brief: `dd67309`, nhánh `codex/review-lessons-4-1-4-6`; root cho biết mới thêm plan, chưa sửa bài. Reviewer không chạy Git để xác minh riêng commit và không sửa Git/sản phẩm.
- Ban đầu và đến lúc kết thúc chưa được giao build mới khớp source; đây là review source. Không mở `dist` cũ làm bằng chứng, không dùng browser.
- Model: kế thừa model của phiên. Không đổi model, không phân tiếp agent.
- Công cụ: PowerShell đọc đúng các file được giao; `rg --files` xác định tên các bài tiền đề; regex/JSON kiểm tĩnh các thuộc tính của riêng MDX 4.3. Không thực thi SQL/API/runner/DB hoặc nộp bài. Không đọc seed, secret, report cũ hay nhận xét reviewer khác.
- Hai pha đã thực hiện đúng thứ tự: đọc bài và `public-4.3.json` → tự lập cách làm/tiền đề → ghi và khóa `review-4.3-phase1.md` → mới mở `src/content/exercises/4-3-luy-ke-so-thang-truoc.yaml`. Không sửa report pha 1 sau khi biết answer. Report này không chép đáp án SQL.

Đã đọc các quy định hiện hành (`AGENTS.md`, `docs/quy-uoc.md` gồm 4.5/4.6, template, hồ sơ công ty, mẫu 1.1) và toàn bộ các bài 4.1, 4.2, 2.8, 3.2, 3.10. Dùng nền Excel cơ bản; không mặc định biết PivotTable/VLOOKUP. Không dùng mô tả bài sau trong hồ sơ công ty làm lời giảng bù cho bài này.

## Kết quả rà theo thứ tự bài

| Phần và vị trí MDX | Nhận xét |
|---|---|
| Mục tiêu và tình huống, 8–25 | Mục tiêu nêu đúng lũy kế/kỳ trước/tháng thiếu/thời điểm lọc. Phạm vi được khóa trước câu SQL: mọi trạng thái, theo `TuNgay` tháng 8–10, cộng nguyên `SoNgay`, kể cả đơn sau mốc 21/10 của bài trước. Không nhầm với ngày thực nghỉ, ngày đã duyệt hoặc dữ liệu đủ kỳ. |
| Cộng dồn Excel và bảng tháng, 31–47 | Công thức cố định ô đầu được giải nghĩa bằng thay đổi khi kéo xuống. Chuyển sang SQL rõ: `EOMONTH` tạo khóa ngày đại diện, `GROUP BY` tạo một dòng mỗi tháng. Có câu kiểm CTE và đầy đủ ba dòng. Ví dụ đơn qua tháng giải thích việc cộng nguyên số ngày vào tháng bắt đầu. |
| `SUM OVER` và khung `ROWS`, 49–51 | Giảng rõ cửa sổ giữ dòng, tháng cũ trước, khung từ đầu nhóm đến dòng hiện tại. Nguồn đã được nhóm một dòng/tháng nên thứ tự theo tháng phân định từng dòng. Không viết `PARTITION BY` nghĩa là một nhóm chung; cửa sổ không thay tổng hợp. |
| `LAG`, hai CTE và `NULL`, 55–57 | Liên hệ trừ dòng trên của Excel rồi định nghĩa `LAG` theo thứ tự. Không có dòng trước trả `NULL`, phép trừ với `NULL` vẫn thiếu thông tin. CTE thứ hai giúp cột `KyTruoc` đã là cột nguồn ở câu ngoài; lý do này được giảng trước câu chính, khớp 4.1. |
| Tháng thiếu/chia loại/thời điểm lọc, 59–63 | Bài không hứa `LAG` tự sinh tháng; ví dụ tháng 8 → 10 dùng số cụ thể. Đoạn chia loại nêu đủ thay khóa tổng hợp và thêm `PARTITION BY` cho cửa sổ; không quên giới hạn tháng thiếu theo từng loại. Điều kiện chỉ hiện tháng 10 có vị trí cụ thể và hậu quả nếu lọc sớm. |
| Câu chính và trả lời, 69–90 | Câu chính làm đúng nhịp đã giảng: bảng tổng tháng → tính cửa sổ → trừ ở câu ngoài. Hai CTE không bị coi là bảng lưu. Ba dòng kết quả có cấu trúc đúng, `total=3`; số học trên đầu vào 14/20/11 nhất quán với lũy kế 14/34/45, kỳ trước `NULL`/14/20 và chênh lệch `NULL`/6/−9. Lời giải tình huống đứng cạnh kết quả. |
| RunFlow, 94–227 | Giới hạn rõ chỉ diễn giải `SELECT` ngoài, không mô tả kế hoạch vật lý hoặc CTE lưu/chạy tuần tự. Đã đọc toàn bộ ba bước, không chỉ thẻ xem nhanh; chi tiết ở bảng riêng dưới. |
| Hay nhầm, 233–235 | Ba hậu quả có ích và phân biệt nhau: nhầm điểm đầu lũy kế, gán kỳ thiếu bằng 0, đọc chênh lệch âm thành số ngày đơn âm. Không cần thêm ngoại lệ kỹ thuật ngoài mục tiêu. |
| Ứng dụng/Memo, 243–256 | Bốn ứng dụng dùng đúng kỹ thuật đã giảng, có mục đích cụ thể. Memo gọn, không thay phần giảng chính. |
| Tự kiểm tra, 258–286 | Bốn câu ở đúng vị trí sau Memo, trước Bài tập. Lời đáp đều đã có trước ở 49–63, bao phủ đơn vị dòng, tháng thiếu, lọc hiển thị và chia nhóm. Không dạy kiến thức mới bằng đáp án ôn. |
| Bài tập, 290–292 và public JSON | Ba đề thống nhất phạm vi tháng bắt đầu/mọi trạng thái/nguyên `SoNgay`; người học biết cách chấm không bảo đảm kỹ thuật đã luyện. Kiến thức cần cho từng đề hiện diện trước phần ôn; bảng đối chiếu hai pha ở dưới. |

Mạch Excel/SQL gộp liền, không yêu cầu biết PivotTable/VLOOKUP để hiểu công thức của bài. Có bốn tiểu mục phần chính, lời dẫn sang SQL và câu trả lời ngay cạnh kết quả. Bold dành cho các điểm chính, code cho biểu thức/tên cột/giá trị dẫn chứng. Bài không có `LineMap` hoặc dấu mark để phải kiểm thêm; không cần thêm khối chỉ vì khuôn. Thời lượng 35 phút không mâu thuẫn rõ với lượng nội dung và ba đề, nhưng reviewer chưa đo một lượt học thực tế.

### Kiểm đủ từng drawer và trạng thái dòng

| Bước | Trạng thái dòng/cột/result | Đối chiếu SQL kiểm và highlight từ source |
|---|---|---|
| `FROM`, 115–147 | Nguồn `SoSanh` đã tính tổng, lũy kế và kỳ trước. Bốn cột, ba tháng, đầu phạm vi có `KyTruoc=NULL`; chưa có `ChenhLech`. `rows=3`, `total=3`, không coi ba dòng này là ba đơn nguồn. | Câu kiểm có đầy đủ hai định nghĩa CTE và đọc bốn cột đúng nguồn; có sắp tháng để xem. Focus có trong query. |
| `SELECT`, 150–186 | Giữ ba dòng; thêm phép trừ thành năm cột. Hai giá trị so sánh của tháng 8 là `NULL`; các chênh lệch 6 và −9 khớp các cột nguồn. `rows=3`, `total=3`. | Câu kiểm đủ `WITH` và biểu thức trừ. Focus nhiều dòng khớp query sau chuẩn hóa CRLF/LF. Câu kiểm đã có `ORDER BY` để trả bảng ổn định; không diễn giải nó thành việc `SELECT` tự bảo đảm thứ tự. |
| `ORDER BY`, 189–225 | Ba dòng, năm cột và các giá trị được giữ, tháng tăng dần. Không đổi cửa sổ hoặc tạo tháng. `rows=3`, `total=3`. | SQL kiểm trùng câu chính; focus đúng `ORDER BY` ngoài. Lời nhắc `LAG` không bảo đảm lịch liên tiếp đúng phần giảng. |

Phép kiểm tĩnh tự chạy tìm thấy hai `Sql` và một `RunFlow`; câu SQL chính bằng `RunFlow.query`; ba focus thuộc query sau chuẩn hóa xuống dòng; mỗi câu kiểm có phần `WITH` đầy đủ và dấu chấm phẩy cuối; mỗi dòng có đủ số cột; số dòng của cả ba drawer bằng `total=3`. Phép so focus `SELECT` đầu tiên chưa chuẩn hóa xuống dòng báo không khớp do CRLF/LF; kiểm lại đã khớp. Không coi sai khác của phép so thô này là lỗi bài. Kiểm source không chứng minh các câu kiểm đã chạy được trên SQL Server hoặc highlight đã hoạt động trên giao diện.

## Các câu “tại sao/để làm gì” tự đặt ra

| Câu hỏi của người học | Lời đáp trong bài |
|---|---|
| Vì sao phải tổng hợp trước thay vì chạy cửa sổ trên đơn? | 33, 49–51: mỗi dòng cần đại diện một tháng; cửa sổ không tự gộp dòng. |
| Vì sao `Thang` là ngày cuối tháng, có phải ngày bắt đầu đơn không? | 33 và ví dụ 47: ngày đại diện để gom tháng, không phải ngày bắt đầu của mọi đơn; 2.8 đã dạy hàm. |
| Vì sao cần khung từ đầu tới dòng hiện tại? | 49–51: khung chọn các dòng tham gia tổng cho từng dòng; tháng tăng dần tạo tổng cộng từ đầu phạm vi. |
| Vì sao kỳ trước tháng đầu không bằng 0? | 55–57, 90 và Hay nhầm 2: không có dòng trước trong phạm vi, thiếu dữ liệu khác giả định bằng 0. |
| Thiếu tháng 9 thì `LAG` lấy gì ở tháng 10? | 59: lấy dòng có sẵn trước, cụ thể tháng 8 trong ví dụ; không thêm tháng 9/0. |
| Vì sao thêm CTE rồi mới tính chênh lệch? | 57: cột kỳ trước đã có từ nguồn, không dùng bí danh vừa tạo trong `SELECT` cùng cấp; khớp 4.1. |
| Vì sao chia loại phải sửa hai nơi? | 61, tiền đề 3.2/4.2: tổng hợp tạo cặp loại–tháng, cửa sổ tính riêng từng loại. |
| Vì sao lọc tháng 10 ở câu ngoài? | 63: giữ tháng 8–9 làm ngữ cảnh tính; lọc sớm cho 11 và `NULL`, sai mục tiêu. |
| Các con số cho phép kết luận việc nghỉ tăng/giảm thực tế không? | 23, 47, 90: chỉ ngày trên mọi trạng thái đơn theo tháng bắt đầu. Phạm vi diễn giải được giới hạn rõ. |

Không thấy câu hỏi cốt lõi nào trong các câu trên phải lấy đáp án YAML hoặc bài sau để hiểu.

## Tiền đề và đối chiếu từng đề sau khi khóa pha 1

| Đề | Cần gì, đã được giảng ở đâu | Cách làm đã tự xác định ở pha 1 | Kết quả đối chiếu YAML |
|---|---|---|---|
| 4-3-1 — lũy kế Phép năm | Lọc ngày/chuỗi Unicode đã có mẫu trong 4.1, 3.10; `EOMONTH` ở 2.8 và 33; nhóm/tổng ở 3.2 và 33; CTE ở 4.1; `SUM OVER`/`ROWS` ở 49–51. | Giữ đúng loại, ngày và mọi trạng thái; mỗi tháng một dòng tổng; cộng dồn từ đầu phạm vi theo thứ tự tháng; trả ba cột, không bổ sung tháng. | Cùng cách làm, phạm vi, đơn vị dòng và thứ tự. Answer dùng các kiến thức đã giảng, không có cú pháp mới làm tiền đề. Chưa xác minh số liệu riêng Phép năm bằng DB. |
| 4-3-2 — bắt đầu lại theo loại | Nhóm nhiều cột ở 3.2; `PARTITION BY` ở 4.2; đổi chính xác sang loại–tháng và giữ khung ở 61; sắp nhiều khóa đã có ở 3.2/4.2. | Mỗi cặp loại–tháng có dữ liệu một dòng; lũy kế riêng từng loại theo tháng; không tạo tháng hoặc gán 0; trả bốn cột, sắp loại rồi tháng. | Cùng cấu trúc tổng hợp, khóa chia cửa sổ, khung và thứ tự. Đoạn 61 là hướng dẫn bằng lời đủ để biến đổi từ câu chính, không cần lấy answer làm lời giảng. Chưa xác minh số cặp/tổng từng loại bằng DB. |
| 4-3-3 — chỉ gửi tháng 10 | Hai CTE ở 4.1; `LAG`/`NULL`/phép trừ ở 55–59; điểm đặt điều kiện cụ thể ở 63; câu chính ở 69–86. | Cửa sổ giữ đầu vào đủ tháng 8–10; câu ngoài mới giới hạn tháng hiển thị và tính chênh lệch từ cột đã có; giữ `NULL`, trả năm cột. | Cùng cách làm. Việc khác tên CTE/bí danh không ảnh hưởng yêu cầu. Answer đặt lọc sau cửa sổ đúng như bài đã giảng; không có kiến thức mới. Dòng tháng 10 có thể đối chiếu về số học với result của bài, chưa kiểm kết quả chạy thật. |

Public JSON và YAML cùng ba ID, đề, thứ tự cột, cờ `ordered: true`, `kind: query`; không có chênh phạm vi khi mở answer. YAML bài này không có trường `check` riêng. Chưa kiểm cơ chế chấm/API nên không từ điều đó suy ra bài nộp nào sẽ được chấp nhận.

## Nhận xét ưu tiên

**Không phát hiện finding Cần sửa / Cần làm rõ / Cần cắt có căn cứ trong phạm vi nội dung nguồn được giao.** Không có mục biên tập cần buộc sửa để đạt mục tiêu. Đã xem đủ các khả năng thiếu tiền đề, khó tìm, sai logic và nghi số liệu; các phần cần chạy mới biết được ghi riêng ở giới hạn, không biến thành lỗi phỏng đoán.

Các điểm **Giữ được** có tác động trực tiếp tới người mới:

| Vị trí/câu gốc ngắn | Căn cứ và tác động |
|---|---|
| `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx:23` — “cộng nguyên `SoNgay` theo tháng bắt đầu” | Chốt đúng đơn vị, trạng thái và giới hạn trước ví dụ; không mang định nghĩa đơn đã duyệt từ 4.1 vào phạm vi mới. |
| `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx:51` — “cửa sổ không thay bước `GROUP BY`” | Cần cho cả ba đề; người học biết phải tạo bảng tháng, không mong hàm cửa sổ tự giảm dòng. |
| `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx:59` — “Dòng trước chưa chắc là tháng lịch liền trước” | Có phản ví dụ và số cụ thể, đủ tránh gọi sai kết quả `LAG` khi lịch thiếu. |
| `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx:61` — “trước hết nhóm theo cả `LoaiNghi` và `EOMONTH(TuNgay)`” | Đã dạy đủ tiền đề đề 2 ở phần chính, kể cả đổi khóa tổng hợp, `PARTITION BY`, khung và tháng thiếu. |
| `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx:63` — “ở câu ngoài đọc `SoSanh`” | Vị trí lọc cụ thể, có hậu quả sai khi đặt sớm; đề 3 luyện biến đổi đã được giảng. |
| `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx:94` — “không phải cam kết CTE được lưu hay thực thi tuần tự” | Sơ đồ giữ đúng vai trò diễn giải logic; không cài mô hình sai về thực thi CTE. |

## Nguồn và giới hạn còn lại

Nguồn tự đọc: brief của lượt này; AGENTS/quy ước/template/hồ sơ công ty; mẫu 1.1; các bài 2.8, 3.2, 3.10, 4.1, 4.2; MDX 4.3; public JSON 4.3; YAML đúng bài sau khi đã khóa pha 1. Chỉ ghi hai report được giao.

Đã xác minh bằng source và tính tay: mạch kiến thức, phạm vi điều kiện, các phép cộng/trừ dựa trên 14/20/11, cấu trúc dòng/cột/tổng, tương ứng query/focus/SQL kiểm và sự phù hợp đề–answer. Ba đề có đủ tiền đề và một cách làm xác định được trước khi đọc answer; không cần thêm kiến thức từ bài sau. Đây là kết luận học thử source, không phải khẳng định mọi học viên sẽ tự làm được.

**Chưa tự xác minh:** tổng 14/20/11 trên database sống; ngày/số ngày thật của `DP018`; số liệu chi tiết từng loại và từng câu kiểm; SQL Server chạy các câu này; API/bộ chấm; HTML từ build mới; dấu nháy, thụt lề bốn cột, backtick/escape khi render; highlight/drawer/copy/paste/bàn phím; luồng web/SSMS trên UI. Source dùng escape thụt lề theo quy ước, nhưng chưa đủ bằng chứng render. Không có build mới được giao nên không kết luận UI đạt. SQL live và UI do root xác minh riêng theo brief.

Không dùng điểm số hoặc chữ “Ready” thay bằng chứng kiểm; report không trao quyền push/publish.

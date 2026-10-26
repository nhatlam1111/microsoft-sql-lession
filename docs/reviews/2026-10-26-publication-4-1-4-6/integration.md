# Review tích hợp 4.1–4.6 — 26/10/2026

## Phạm vi, phiên bản và công cụ

Reviewer tích hợp mới, kế thừa model của phiên, không đổi model và không phân agent con. Góc đọc: Business Consultant khó tính muốn học để làm BA/PM, chỉ có Excel văn phòng cơ bản; không dùng kiến thức chuyên gia hoặc bài sau để bù lời giảng hiện tại.

- Base: `main` tại `0081807f739ce60263fba799de05677b17017931`.
- Source được kiểm: `HEAD dd67309f91f75b6e4fd9e98ca46dba839d99a96f`, nhánh được giao `codex/review-lessons-4-1-4-6`, cộng ba dòng biên tập code trong lời văn 4.4. Tự xem diff xác nhận ba dòng không thay SQL/Result/đề.
- Đọc hết sáu MDX và các khối/drawer; đọc 15 đề công khai trong `public-4.1.json` … `public-4.6.json`. Không đọc answer/YAML, seed, env/secret, report từng bài hoặc report cũ.
- Đọc AGENTS, quy ước, template, hồ sơ công ty và mẫu 1.1; đối chiếu đường thực hành ở 1.2, các phần liên quan của 2.7, 2.8, 3.8, 3.9, 3.10 và source layout/catalog/đường bài tập hiện tại.
- Tự kiểm bằng PowerShell, Git chỉ đọc và Node chỉ đọc file: metadata, điều hướng, tiêu đề, tự kiểm tra, SQL trong HTML và các đề của bản `dist` hiện có. Không browser, không SQL, không API/runner, không nộp bài, không kiểm SSMS. Không sửa sản phẩm/Git; chỉ ghi report này.
- Build được giao: `dist`, log kết thúc 19:18:07 ngày 26/10/2026, 132 trang. Đã tự xác nhận ba dòng format mới của 4.4 hiện đúng trong HTML. Trong lúc review, root có sửa tài liệu spec; không dùng các tài liệu đang sửa đó làm căn cứ cho kết luận nội dung.

**Giới hạn độc lập cần giữ trong hồ sơ:** lệnh đọc 95 dòng đầu `verification.md` vô tình đưa cả ma trận xử lý của tác giả vào output. Tôi đã báo root ngay khi nhận ra; không dùng ma trận đó làm căn cứ hoặc đọc thêm nhận xét từng bài. Root yêu cầu tiếp tục và ghi minh bạch. Lượt tích hợp này không được mô tả là blind audit hoàn toàn. Các kết luận dưới dựa trên source, đề công khai, HTML và evidence máy được giao; chúng không thay các vòng tiền đề độc lập từng bài.

## Mạch học, phạm vi và đường thực hành

Không thấy điểm đứt mạch cần sửa giữa sáu bài. 4.1 cho cách đặt tên/lọc một cột đã tính; 4.2 dùng ngay CTE để lọc số thứ tự, rồi dạy cửa sổ vẫn giữ dòng chi tiết. 4.3 áp dụng đúng điểm ấy: tổng hợp một dòng mỗi tháng trước khi tính giữa các dòng. 4.4 đổi hình trình bày, vẫn giữ phạm vi của 4.3. 4.5 quay lại so tên CTE trong một câu với định nghĩa dùng lại; 4.6 kết hợp các kỹ thuật đã học để rà theo luật, không đòi view được tạo.

Các câu “tại sao/để làm gì” ở điểm chuyển đều có chỗ trả lời trước phần ôn:

| Điểm cần hiểu | Căn cứ trực tiếp trong source | Đánh giá/tác động |
|---|---|---|
| Tại sao đặt CTE thay vì coi đó là bảng đã lưu? | `4-1-cte-tung-buoc.mdx:41`: “CTE chỉ có phạm vi trong **một câu lệnh**”; dòng 57 không hứa lưu kết quả hoặc tăng tốc. | **Giữ được.** Người học biết phải chạy cả khối và biết lợi ích là tổ chức/kiểm câu, làm nền đúng cho 4.2 và 4.5. |
| Tại sao cần khóa phân định và câu ngoài để lọc? | `4-2-xep-hang-row-number-rank.mdx:34`: “`MaHD` là khóa duy nhất”; dòng 36 giải thích tính cột rồi lọc ở câu ngoài. Dòng 73 tách thứ tự đánh số, đồng hạng và thứ tự bảng cuối. | **Giữ được.** Không chuyển ngầm từ `GROUP BY` sang chọn cả dòng; không biến hợp đồng mới nhất thành hợp đồng còn hiệu lực. |
| Tại sao tổng ngày tháng 9 khác ví dụ đã duyệt trước đó? | `4-3-luy-ke-so-thang-truoc.mdx:23`: “Có cả đơn chờ duyệt và từ chối”; dòng 47 nhắc phạm vi khác 4.1. | **Giữ được.** `20` ngày ở 4.3/4.4 không mâu thuẫn `16` ngày đã duyệt của các bài trước. Đơn góp nguyên `SoNgay` theo tháng `TuNgay`; không bị đọc thành ngày thực nghỉ. |
| Tại sao dòng trước có thể không là tháng liền trước, và tại sao lọc tháng sau cửa sổ? | `4-3-luy-ke-so-thang-truoc.mdx:59`: “Dòng trước chưa chắc là tháng lịch liền trước”; dòng 61–63 có chia loại và vị trí lọc. | **Giữ được.** Không cần người học tự đoán về tháng thiếu hoặc dùng tự kiểm tra để học bù. |
| Tại sao nguồn PIVOT chỉ có ba vai trò, và tại sao NULL khác 0? | `4-4-pivot-xoay-bang.mdx:53`: cột nguồn còn lại là khóa nhóm; dòng 57–65 nêu danh sách cố định, tháng thiếu, SUM/COUNT và điều kiện đúng năm. | **Giữ được.** Giải thích đủ việc nguồn thừa mã làm tăng dòng và đổi phép tính làm đổi đơn vị; không ép thêm RunFlow cho đủ mẫu. |
| Tại sao view không chạy được trong bài web, và hoàn thành bằng gì? | `4-5-view-bao-cao-luu-san.mdx:41`: “Hai khối SQL trong bài chỉ để đọc hiểu”; dòng 73 nói trả lời năm câu, không cần SQL Server riêng. | **Giữ được.** Định nghĩa được đề xuất, chưa báo đã triển khai; đủ giải nghĩa schema/batch/quyền tại chỗ để đọc hiểu, không buộc thực hành DDL. |
| Tại sao không cộng các số rà soát thành số người có lỗi? | `4-6-soi-chat-luong-du-lieu.mdx:54`: nhánh CCCD đếm hồ sơ, không đếm nhóm; dòng 56: một hồ sơ có thể khớp nhiều luật, nhánh ngày đếm hợp đồng. | **Giữ được.** Chuyển từ nhóm ra chi tiết và từ nhiều nguồn sang tổng theo mã luật không làm mất đơn vị. Luật rà soát khác ràng buộc ghi và khác quyết định sửa dữ liệu. |

`ROW_NUMBER`, `OVER`, `PARTITION BY`, `RANK`, `DENSE_RANK`, `LAG`, khung `ROWS` được giải nghĩa đúng chỗ sử dụng. PivotTable/Rows/Columns/Values có giải thích bằng công việc cần làm, không mặc định người đọc đã biết PivotTable. Các kỹ thuật chuỗi/ngày/đếm có điều kiện/gộp có điểm nối về bài trước; không thấy tiền đề cốt lõi phải đọc bài sau mới làm được.

Độ tải tăng ở 4.2–4.4 và 4.6 có lý do: ba hàm hạng, khung và kỳ trước, ba vai trò xoay, rồi ba luật rà soát. Thời lượng 30/35/35/35/25/40 phút không còn giả làm bài đọc 12 phút. Các giới hạn nằm cạnh ý có thể bị hiểu nhầm; không thấy đoạn lặp cần cắt bắt buộc ở cấp tích hợp. Chưa đo thời gian với người học thật nên không xác nhận thời lượng thực tế.

Đường web/SSMS nhất quán với 1.2 và workspace hiện tại: mã truy cập từ người phụ trách/người gửi khóa học; bản riêng là lựa chọn khi chưa có mã, không có chấm tự động. 4.1 nói rõ web nhận một khối `WITH` và một câu lệnh; SSMS cần kết thúc câu trước. 4.5 không đẩy học viên chỉ chọn web sang SSMS. Cơ chế luôn hoàn tác được gắn với trang bài tập, không hứa SSMS tự hoàn tác.

## Tiền đề đề công khai và phạm vi bộ chấm

Đây là kiểm giao điểm giữa các bài, không lặp review chi tiết/answer. Tôi xác định hướng làm từ đề công khai và phần giảng trước ôn; không đối chiếu đáp án.

| Đề | Kiến thức cần và điểm đã dạy | Thiếu tiền đề thấy được |
|---|---|---|
| `4-1-1`, `4-1-2`, `4-1-3` | Lọc tháng/trạng thái, SUM/COUNT và nhóm từ các bài 2–3; 4.1 dạy CTE, cột tổng ở câu ngoài, đổi phạm vi và thứ tự. | Không thấy. |
| `4-2-1`, `4-2-2`, `4-2-3` | 4.2 dạy đánh số lại theo loại, hạng chỉ theo chỉ tiêu, phân định bằng mã, giới hạn số thứ tự ở CTE/câu ngoài; 4.1 cung cấp phạm vi CTE. | Không thấy. |
| `4-3-1`, `4-3-2`, `4-3-3` | EOMONTH từ 2.8; 4.3 dạy tổng tháng trước cửa sổ, khung cộng dồn, chia loại, giữ tháng có dữ liệu và lọc hiển thị sau cửa sổ. | Không thấy. |
| `4-4-1`, `4-4-2`, `4-4-3` | 4.4 dạy nguồn ba vai trò, SUM giữ NULL, COUNT khóa cho 0, đổi tháng thành cột và lọc đúng năm; MONTH/EOMONTH từ 2.8, CTE từ 4.1. | Không thấy. |
| `4-6-1`, `4-6-2`, `4-6-3` | 4.6 dạy kết CTE nhóm trùng trở lại hồ sơ; CASE cộng cờ giữ phòng 0; UNION ALL các nhánh có mã luật/số đếm, COUNT không GROUP BY vẫn có 0. Nền 3.3–3.5, 3.8, 3.10, 4.1 được nhắc ngay trong bài. | Không thấy. |

Các đề phân biệt rõ mọi trạng thái/đã duyệt, ngày trên đơn/ngày thực nghỉ, hồ sơ/hợp đồng/người, NULL/0 và thứ tự cột/dòng. Đoạn dẫn trước Bài tập của từng bài công khai giới hạn bộ chấm: kiểm giá trị/thứ tự, không ép kỹ thuật hoặc alias. Không thấy lời hứa kiểm cú pháp/hàm mà API hiện tại không làm.

4.5 có `noExercises: true`, không có đề trong gói công khai; năm câu tự kiểm tra phủ định nghĩa lưu gì, khác CTE, bốn cột và điều kiện, quyền/tồn tại và cách hoàn thành web. Các đáp án đều đã được giảng trước Ghi nhớ.

## Kiểm source/build và metadata do reviewer thực hiện

- Đếm `dist/bai`: **51** thư mục bài. Đọc HTML sáu bài, điều hướng liên tục `3.10 → 4.1 → 4.2 → 4.3 → 4.4 → 4.5 → 4.6 → 4.7` với tên hiện hành.
- Sáu trang hiện tiêu đề phần chính gộp Excel/SQL. Có **24** tự kiểm tra: 3/3/4/4/5/5; chúng theo Ghi nhớ và trước Bài tập nếu bài có Bài tập. 4.5 chỉ có năm mục cấp 2, không có Bài tập rỗng; hint cuối là trả lời tự kiểm tra không nhìn bài.
- Có đủ **15** trang đề. So từng title/prompt HTML với JSON công khai: **15/15 khớp**; liên kết Làm bài có đúng ba ID ở mỗi bài có thực hành và không có ở 4.5.
- So chuỗi của các khối `Sql` trực tiếp trong sáu MDX với nội dung `<pre class="sql-code">` tương ứng sau giải mã HTML/escape và chuẩn hóa CRLF: **17/17 khớp**; không thấy ký tự `\\t` bị lộ. Số figure SQL trong HTML là 6/8/5/4/2/3, trong đó 11 khối bổ sung thuộc drawer 4.1–4.3. Đây là so chuỗi tĩnh, không chứng minh clipboard hoặc độ rộng tab hiển thị.
- Ba đoạn format mới 4.4 có `<code>` đúng trong HTML. Hai mẫu chỉ đọc ở 4.5 không có copy trong source; HTML không có nút copy và không có Result của view.
- Source layout chọn hint qua `entry.noExercises`; catalog lấy metadata từ content và sắp số bài dạng số. README liệt kê bài đầy đủ/bài tập mới, template nêu thêm 4.5, Giới thiệu mô tả hoàn thành bài không có Bài tập bằng tự kiểm tra. Không thấy lệch metadata/điều hướng trong phần được mở.
- Tự xem diff base–HEAD theo danh sách file: không thay seed/API/editor hoặc hệ thống ID/URL; không có thêm bài vào allowlist khung cũ. Không kiểm nhánh workspace SSMS để riêng.

## Findings cần xử lý

**Không có finding “Cần sửa / Cần làm rõ / Cần cắt / Biên tập” mới có đủ căn cứ trong phạm vi tích hợp đã kiểm.** Các mục “Giữ được” và lý do được ghi ở bảng mạch học trên; không dựng lỗi để đủ số lượng. Kết luận này là học thử nguồn/đề và đối chiếu HTML tĩnh, không phải xác nhận độc lập rằng SQL, chấm bài hay mọi tương tác UI đã chạy đúng.

## Bằng chứng tác giả đã đọc, không phải phép kiểm reviewer chạy lại

| Evidence được giao | Điều log thể hiện | Giới hạn |
|---|---|---|
| `sql-live.log`, `live-results.json` | 19 SELECT/WITH duy nhất; 13 Result và 11 trạng thái flow được đối chiếu; bốn mẫu rời/view không chạy. Phần SELECT nền của view có 45 hồ sơ. | Reviewer không kết nối DB/chạy lại truy vấn; không suy log này thành đã tạo hoặc đọc được view đề xuất. |
| `exercises.log`, `data.log` | 78 ID có kết quả qua runner; sau đó `check:data` báo “Không bảng nào lệch.” | Không xem answer hoặc chạy runner; log không thay kiểm API production sau xuất bản. |
| `baseline.log` | 48 file, 322 test pass ở 19:00:08. | Trước ba dòng format 4.4; chỉ dùng đúng phạm vi thời điểm của log. |
| `check.log` | 0 errors, 0 warnings, 3 hints FormEvent/execCommand trong editor hiện tại. | Đây là hint nền; diff lần này không đổi các file đó. Không gọi là 0 diagnostics. |
| `api-build.log`, `api-typecheck.log` | Build 78 bài; typecheck không báo lỗi trong log được giao. | Reviewer không build lại API. |
| `build-final.log`, `dist-final.log` | Build 19:18:07: 132 trang; check-dist OK 132 trang/1994 link. | Reviewer tự đối chiếu các phần source/build nêu trên, không chạy lại toàn build/check-dist. |
| `browser-matrix.json`, `drawers.json` | Sáu bài ở rộng 1280/1440 không overflow theo ma trận; 24 tự kiểm tra; 11 drawer có focus/SQL và bảng trích. | Reviewer không mở browser; không nhận thao tác Enter/Escape/copy/undo của tác giả là thao tác mình thực hiện. |

Phần tường thuật SQL/UI và giới hạn của `docs/reviews/2026-10-26-publication-4-1-4-6/verification.md` là evidence bổ sung tác giả. Sự cố thấy ma trận trong cùng file đã nêu đầu report; không dùng các kết luận reviewer trước trong ma trận để chứng minh nội dung.

## Mục chưa phán định, root cần ghi quyết định

1. **Tính độc lập của lượt tích hợp:** ghi ruling minh bạch về sự cố đọc ma trận; không mô tả lượt này là blind audit hoàn toàn. Không có finding nội dung bị giữ lại chờ ruling.
2. **Phiên bản nghiệm thu cuối:** report gắn với HEAD/ba dòng format/build đã nêu. Sau khi ghép tài liệu hoặc chuyển main, root cần ghi kết quả kiểm trên trạng thái cuối và trạng thái publish thực tế; không dùng report này thay kiểm main hoặc quyền push.
3. **Phần công cụ chưa kiểm trực tiếp:** reviewer không kiểm browser, clipboard, bàn phím, nháp, SSMS, quyền/batch bằng DDL hoặc API production. Evidence tác giả bao phủ một phần UI/runner local; các giới hạn còn lại cần giữ nguyên trong bàn giao, không tự báo đạt.
4. **View tồn tại/quyền:** không dùng `OBJECT_ID = NULL` một mình để chứng minh đối tượng không tồn tại; mức thấy metadata còn phụ thuộc quyền. Quyết định bài đọc hiểu/mẫu đề xuất chưa triển khai đã được giao và source thể hiện nhất quán; không cần tạo view trên database chung để hoàn thành lần này.

## Nguồn và giới hạn kết luận

Nguồn trực tiếp: sáu MDX hiện tại, 15 đề công khai, các tài liệu chuẩn/tiền đề đã liệt kê, source layout/catalog/workspace và HTML `dist`. Evidence tác giả: đúng các log/JSON được giao trong `temp/verification/2026-10-26-review-4-1-4-6/` và phần kiểm máy/SQL/UI của `verification.md`.

Không dùng web/tài liệu SQL ngoài khóa học, không đọc secret/seed/answer, không SQL/API/runner/browser. Không đánh giá chẩn đoán accessibility bằng công nghệ hỗ trợ hoặc thời gian học thực tế. Với kiến thức cần làm 15 đề, không thấy thiếu tiền đề từ phần giảng và bài trước; kết quả đó không chứng minh mọi học viên chắc chắn tự học được. Không dùng nhãn Ready và không cấp quyền merge/push/deploy.

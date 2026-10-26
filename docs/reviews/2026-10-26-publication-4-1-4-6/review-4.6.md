# Review độc lập bài 4.6 — Soi chất lượng dữ liệu

## Kết quả, phạm vi và bằng chứng

**Không có finding cần sửa có căn cứ trong phạm vi học thử lần này.** Bài đã giảng đủ đường làm ba đề, năm câu tự kiểm tra đều ôn ý có trước, và đáp án YAML không đòi kiến thức bổ sung để bù phần bài chưa dạy. Đây là kết luận từ đọc nguồn/HTML và đối chiếu logic; chưa phải kết quả chạy SQL, bộ chấm hoặc UI.

- Ngày review: 26/10/2026. Model kế thừa model của phiên, không đổi model, không phân agent con.
- Bài: `src/content/lessons/4-6-soi-chat-luong-du-lieu.mdx`, đọc đủ 168 dòng và mọi khối.
- Source giao và HEAD tự đọc: `dd67309f91f75b6e4fd9e98ca46dba839d99a96f`; nhánh được giao `codex/review-lessons-4-1-4-6`. Root thông báo phần bổ sung hiện tại chỉ là plan, chưa sửa nội dung bài.
- Đã đọc AGENTS, quy ước (đặc biệt đầy đủ 4.5/4.6), template, hồ sơ công ty, mẫu 1.1 và các bài tiền đề 2.5/2.7/3.3/3.4/3.5/3.8/3.10/4.1. Điểm xuất phát là Excel văn phòng cơ bản, không tự mặc định biết PivotTable/VLOOKUP.
- Root giao build 132 trang khớp source, lúc `19:07:28 +07` ngày 26/10. Tôi tự đọc HTML `dist/bai/4-6-soi-chat-luong-du-lieu/index.html` (mtime đúng mốc đó), đối chiếu nội dung bài, ba `pre` SQL, ba Result và năm summary. Sau khi khóa giai đoạn 1, còn đọc HTML ba trang `bai-tap/1/`, `bai-tap/2/`, `bai-tap/3/`, khớp đề/cột/thứ tự trong nguồn. Không tự chạy build hoặc tự kiểm con số 132 trang.
- Hai giai đoạn đúng thứ tự: đọc MDX và `public-4.6.json` → lập cách làm/tất cả tiền đề → ghi xong `review-4.6-phase1.md` → lấy SHA256 → mới mở đúng YAML `src/content/exercises/4-6-soi-chat-luong-du-lieu.yaml`. Giai đoạn 1 ghi lúc `19:16:48`, SHA256 `FFB6F94DE536772E75EC322B7718DF7C33B3027FA23B23B0C1A708882BBEC322`; giữ nguyên sau khi biết đáp án.
- Công cụ: PowerShell đọc/đối chiếu file, `rg --files`, `git rev-parse HEAD` chỉ đọc, ghi đúng hai report. Không browser, DB/SQL/API/runner/nộp bài, seed, secret, tài liệu ngoài khóa học, report cũ hay ma trận tác giả; không sửa sản phẩm/test/docs/Git.

## Rà theo thứ tự bài

| Phần và vị trí MDX | Đánh giá, căn cứ và tác động tới người học |
|---|---|
| Mục tiêu/tình huống, 2–28 | **Giữ được.** Phạm vi mọi trạng thái được chốt trước; ba luật phục vụ nhu cầu cụ thể. Email cần cho danh sách liên hệ được tách khỏi ràng buộc bắt buộc của hệ thống. Người học không bị dẫn tới tự sửa/xóa nguồn chung. |
| Từ Excel sang SQL, 32–36 | **Giữ được.** `Conditional Formatting` được giải thích ngay lần đầu; tô trùng, lọc trống, so hai ngày cùng dẫn đến ý tìm dòng khớp luật bằng `SELECT`. Không phải biết thêm công cụ Excel chuyên sâu mới hiểu được. |
| Nhóm CCCD và chi tiết, 38–44 | **Giữ được.** Bài định nghĩa một dòng nhóm, số hồ sơ trong nhóm và đường trở lại hồ sơ bằng CTE + kết theo CCCD. Câu “Mỗi số chỉ có một dòng trong CTE” giải thích đúng vì sao phép kết này không nhân thêm hồ sơ. Không mô tả CTE là bước lưu bảng; 4.1 đã nói rõ phạm vi một câu và không đảm bảo vật chất hóa. |
| Ba luật và báo cáo theo luật, 46–56 | **Giữ được.** Đủ `NULL`/rỗng/dấu cách thường; không hứa xác minh email có chữ. Ngày bằng nhau/`NULL` được xử lý theo chính luật `<`, không kết luận hợp lệ rộng hơn. `SUM` cờ giữ nhóm số 0 nhưng không sinh phòng không có hồ sơ. Nhánh `COUNT(*)` không nhóm vẫn có một dòng 0; nhánh CCCD đếm hồ sơ sau kết, không đếm nhóm. Bí danh ở nhánh đầu, cột cùng vị trí, mã hằng và `ORDER BY` cuối đều đã nêu trước bài tập. |
| Câu 1 + Result, 60–70 | **Giữ được về logic nguồn.** Đọc đủ `SELECT SoCCCD` + `COUNT(*)`, nhóm, `HAVING > 1`, xếp số tăng. Bảng hiện đủ 1 dòng nhóm với số lượng 2 và `total=1`; diễn giải đúng nhóm/hồ sơ. Hồ sơ công ty xác nhận cặp CCCD trùng, chưa tự chạy DB để xác nhận số CCCD cụ thể. |
| Câu 2 + Result, 72–81 | **Giữ được về logic nguồn.** Đọc đủ ba cột, điều kiện hai nhánh, thứ tự mã. Hai dòng `NV044`/`VH`/`NULL`, `NV045`/`KD`/`NULL`, `total=2` khớp hồ sơ công ty và bài 2.5. Phần văn nói rõ mẫu thật đều là `NULL`, không giả đã có dữ liệu thử rỗng/chỉ dấu cách. |
| Câu 3 + Result, 83–94 | **Giữ được về logic nguồn.** Đọc đủ bốn cột và điều kiện ngày; một dòng `HD2025-003`/`NV029` có bắt đầu 01/03/2025, kết thúc 28/02/2025, `total=1`, diễn giải khớp bảng. Câu khép tình huống giữ riêng nhóm CCCD/hồ sơ/hợp đồng và bước đối chiếu, không gợi ý tự sửa ngày. Ngày/mã hợp đồng chưa tự kiểm DB. |
| Hay nhầm, 96–105 | **Giữ được.** Bốn lỗi có hậu quả cụ thể; không dùng phần này để dạy bù điều cần cho câu chính. Giới hạn giữa phát hiện và chặn khi ghi đúng phạm vi. |
| Ứng dụng, 107–116 | **Giữ được.** Bốn việc làm gắn đúng chủ đề và mục đích, không hứa tự làm sạch nguồn. |
| Ghi nhớ/tự kiểm tra, 118–162 | **Giữ được.** Đã rà đủ bốn hàng Memo, năm câu và năm đáp án. Vị trí ngay sau Memo, trước bài tập; không có câu dùng phần ôn làm tiền đề mới. |
| Bài tập, 164–168; YAML sau khóa phase1 | **Giữ được.** Dẫn đúng bài tiền đề, phạm vi mọi trạng thái, nói rõ giới hạn bộ chấm về cú pháp/alias. Ba đề có cách làm từ kiến thức đã học; đối chiếu chi tiết bên dưới. |

Đọc đủ mọi SQL/Result của bài: ba khối SQL đầy đủ, ba Result đều hiển thị toàn bộ tập nhỏ tương ứng, không lẫn bảng trích với tổng. Bài không có RunFlow/LineMap/drawer; ba phép kiểm độc lập không cần bị ép thành một luồng chung. Không có khối bị bỏ qua do ẩn sau drawer.

## Câu hỏi “tại sao/để làm gì” và năm câu tự kiểm tra

| Điểm cần hiểu | Bài có đáp ở đâu |
|---|---|
| Tại sao chốt luật trước khi gọi dữ liệu là thiếu/sai? | 26, 34–36: yêu cầu nghiệp vụ quyết định điều cần rà; lưu được vẫn có thể chưa đủ cho liên hệ. |
| Tại sao một dòng nhóm chưa phải một hồ sơ/người? | 40–44, 70: đơn vị nhóm và kích thước nhóm được nói riêng; chưa kết luận cùng người. |
| Làm gì để nhận từng mã và vì sao không nhân thêm? | 42 và tiền đề 3.4/4.1: kết hồ sơ với một dòng CTE cho mỗi số. |
| Vì sao cần cả `IS NULL` và `TRIM`? | 48, 81 và tiền đề 2.5/2.7: nhận các kiểu giá trị thiếu khác nhau. |
| Vì sao ngày bằng nhau/`NULL` không xuất hiện, có được coi hợp lệ luôn không? | 50: giới hạn chính luật `<`, cần luật riêng cho trường hợp khác. |
| Vì sao giữ mọi hồ sơ trước cộng và nhánh đếm vẫn phải có dòng 0? | 52–54: giữ nhóm phòng có hồ sơ; tổng theo luật giữ đủ mã kể cả không khớp. |
| Tại sao không cộng ba số thành người hoặc sửa ngay? | 56, 92–94, 102–103: chồng luật, khác đơn vị, cần đối chiếu; `SELECT` không tự chặn khi ghi. |

Đã tự trả lời đủ năm câu trước khi mở YAML: (1) một nhóm có hai hồ sơ, muốn chi tiết phải kết lại; (2) `IS NULL` nhận chưa có giá trị, `TRIM` nhận hai dạng chuỗi thiếu; (3) bằng nhau/`NULL` không khớp luật ngày; (4) không lọc mất hồ sơ để giữ nhóm số 0; (5) không cộng thành người vì chồng luật/khác đơn vị/chưa xác minh cần sửa. Các đáp án có tiền đề lần lượt ở 40–44/70, 48/81, 50, 52, 56/94; không phải nội dung mới xuất hiện ở tự kiểm tra.

## Tiền đề từng đề và kết quả đối chiếu YAML

| Đề | Tiền đề đã có trước answer | Cách làm tự lập đã khóa | Đối chiếu YAML sau đó |
|---|---|---|---|
| `4-6-1` | 3.3: gom/lọc nhóm; 4.1: CTE một câu; 3.4: bí danh và `INNER JOIN … ON`; 3.5: đếm dòng sau kết; 4.6:40–44: áp vào nhóm CCCD. | Tạo tập số trùng trong CTE từ mọi hồ sơ, kết với hồ sơ theo số; chọn mã/phòng và xếp mã nhân viên tăng. Không kết luận cùng người. | Khớp cách làm và đề công khai: mọi dòng, đúng hai cột/thứ tự, CTE + `INNER JOIN`, không lọc trạng thái. YAML chỉ giữ khóa số trong CTE thay vì thêm cột số lượng như một khả năng mô tả ở bài; điều này không đổi tính một dòng cho mỗi số và không thiếu tiền đề. |
| `4-6-2` | 2.5/2.7: `NULL`, chuỗi và `TRIM`; 3.3: nhóm; 3.10: cờ 1/0, `SUM` giữ nhóm có 0; 4.6:48,52: điều kiện email và giới hạn phòng có hồ sơ. | Giữ mọi hồ sơ, nhóm mã phòng, cộng cờ của điều kiện thiếu; không lọc thiếu ở `WHERE`, không cần sinh phòng từ danh mục. | Khớp: cộng cờ 1/0 với đủ hai nhánh điều kiện, không lọc trạng thái/thiếu trước nhóm; bí danh và thứ tự mã đúng. Không lẫn `COUNT(... ELSE 0)` thành đếm điều kiện. |
| `4-6-3` | Đề 1 và ba luật trong phần giảng; 4.6:54: `COUNT(*)` nhánh không nhóm vẫn có 0; 3.8 và 4.6:54–56: nhãn hằng, cột theo vị trí, tên cột nhánh đầu, `UNION ALL`, một `ORDER BY` cuối. | Ba nhánh đếm riêng: hồ sơ mang số thuộc nhóm trùng sau kết; hồ sơ thiếu email; hợp đồng đảo ngày. Mỗi nhánh có mã luật và số đếm không nhóm, gộp rồi xếp mã, không cộng thành người. | Khớp đủ ba mã luật/nguồn/đơn vị. Nhánh CCCD không đếm nhóm; ba nhánh không có `GROUP BY` nên logic giữ dòng khi 0; bí danh nhánh đầu và thứ tự cuối phù hợp đề. CTE phạm vi cả câu gộp, không cần lệnh tạo đối tượng. |

Đã đọc đủ ba answer SQL và toàn bộ YAML của đúng bài, gồm prompt, columns, ordered, kind; không thấy trường check bổ sung trong YAML này. Các prompt/cột/ordered khớp public JSON và HTML ba đề. Không chép nguyên đáp án vào report. Việc YAML phù hợp đề/tiền đề không chứng minh bộ chấm thực tế đã thực thi đúng.

Không phát hiện thiếu tiền đề. 3.4 được trỏ tại dòng 42 và 166; việc frontmatter liệt kê 3.5 (bản thân đã có 3.4 làm tiền đề) không tạo vướng mắc học thử. Chưa thấy điểm “đã dạy nhưng khó tìm” cần sửa riêng.

## Ưu tiên và những phần giữ được

Không có mục **Cần sửa / Cần làm rõ / Cần cắt / Biên tập** có căn cứ để giao tác giả xử lý ở vòng này. Các mục **Giữ được** đã ghi vị trí, căn cứ và ý nghĩa trong bảng rà bài.

- Giữ ba luật đúng phạm vi, đặc biệt phân biệt dấu hiệu với lỗi đã xác nhận, nhóm với dòng, hồ sơ với người/hợp đồng và số 0 với nhóm không tồn tại.
- Giữ phần giảng ngắn cho CTE kết nhóm trùng, cộng cờ và nhánh tổng theo luật: đây là tiền đề trực tiếp của cả ba đề, không cần thêm một đáp án mẫu đầy đủ gây lộ bài tập.
- Bold chọn lọc; code cho dẫn chứng/tên bảng/cột/điều kiện; năm summary dùng `code`. Ba SQL trong HTML có nháy thẳng, toán tử, xuống dòng và token khớp nguồn; không thấy backtick/escape lộ trong phần văn bản đã đọc. Ba SQL chính ngắn, không có CASE hai cấp thụt lề để tôi kiểm giao diện ở bài này.
- Lặp ý ở Memo/tự kiểm tra đúng chức năng ôn; Hay nhầm gắn lỗi với hậu quả, Ứng dụng gắn thao tác với mục đích. Không có căn cứ đề nghị thêm RunFlow hay LineMap chỉ để đủ khuôn.
- Mốc 40 phút không tạo chênh lệch rõ với lượng đọc và ba đề tổng hợp; chưa đo thời gian người học thực tế. Không đề nghị mở luật NBSP, kiểm định dạng email, DDL hoặc thao tác sửa/xóa ngoài scope.

## Nguồn, điều chưa xác minh và giới hạn bàn giao

Nguồn trực tiếp: brief, AGENTS/quy ước/template/hồ sơ công ty/mẫu 1.1, các MDX tiền đề đã nêu, MDX 4.6, public JSON, YAML đúng bài sau khi khóa, HTML bài và ba trang bài tập từ build được giao. Đối chiếu hồ sơ công ty là kiểm tính nhất quán nguồn, không phải kiểm dữ liệu live.

**Chưa tự xác minh:** SQL/Result trên DB; số CCCD, mã hợp đồng và ngày thực tế ở nguồn chung; hành vi trả 0 khi dữ liệu thay đổi thật; thực thi đáp án/chấm bài; auth/runner; UI/viewport, thao tác mở/đóng tự kiểm tra, bàn phím, copy/paste, SSMS; build/test/check:dist. Không ghi “đạt” cho những phần đó. Root đang kiểm SQL riêng, không tính đó là kiểm DB do reviewer thực hiện. Lời hứa hoàn tác xuất hiện trên HTML trang bài tập chỉ được đọc, chưa thử hành vi.

Có hai lượt dò đường dẫn đầu tiên không trúng (`dist/lessons/...`, tên rút gọn 3.4); sau đó tìm đúng bằng `rg --files` và đọc đủ. Đây là giới hạn thao tác ban đầu đã khắc phục, không phải lỗi nội dung.

Kết luận học thử: nội dung nguồn/HTML và đề/đáp án nhất quán trong phạm vi được đọc, đủ tiền đề để xác định cách làm cả ba đề; không có finding nội dung cần sửa. Giữ riêng bằng chứng SQL/UI của tác giả trước nghiệm thu xuất bản. Báo cáo này không dùng điểm số/Ready và không cấp quyền Git/publish.

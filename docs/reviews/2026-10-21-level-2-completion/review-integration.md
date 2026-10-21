# Review tích hợp Level 2 — 21/10/2026

Reviewer Codex độc lập, kế thừa model của phiên; học thử theo vai Business Consultant muốn chuyển sang BA/PM. Phạm vi: trọn MDX và ba bài tập YAML của 2.9; diff so với HEAD của 2.3–2.8 và tests, gồm file test discrimination chưa được Git theo dõi. Không đọc spec/plan, review cũ, seed hoặc lịch sử; không dùng database/API/browser/tài liệu ngoài. Chỉ tạo báo cáo này.

**Kết luận: chưa phát hiện lỗi cần sửa trong phạm vi review.** Có thể giữ các thay đổi hiện tại về nội dung. Đây không phải xác nhận kết quả chạy SQL Server hay thay cho bộ kiểm tra trước nhập main.

## Học thử bài 2.9 theo thứ tự

| Hạng mục / câu gốc tiêu biểu | Đánh giá và câu hỏi của người học |
|---|---|
| Tình huống: “Coi dữ liệu đang mở là bản chốt ngày `2026-10-21`” | **Giữ được.** Vì sao có trạng thái và điều kiện ngày? Bài trả lời: chỉ hồ sơ đang làm, đã vào tới ngày chốt. Cảnh báo trạng thái hiện tại không tự dựng lịch sử giải quyết được câu hỏi đổi ngày có lấy lại danh sách quá khứ hay không. |
| Excel: “`EDATE(B2,36)` lấy mốc sau `36` tháng” | **Giữ được.** Công thức IF và ba hồ sơ minh họa khớp các nhóm tại ngày chốt; có giải nghĩa phần mới, chỉ đúng ô `C2`. Người học thấy vì sao cần so ngày kỷ niệm. |
| “`CASE` là một biểu thức” và ví dụ mã `TP` | **Giữ được.** CASE dùng để làm gì? Tạo một giá trị/cột cho từng dòng. Bài phân biệt với IF điều khiển câu lệnh, WHERE và cập nhật nguồn. NV005 nhận nhãn Trưởng phòng; “Chức danh khác” không bị diễn giải thành thiếu mã. |
| “Đặt nhánh đã đủ `3` năm trước nhánh đã đủ `1` năm” | **Giữ được.** Tại sao thứ tự có tác động? NV003 thỏa cả hai nhánh, nên nhánh đúng đầu tiên quyết định. NV025 giải thích vì sao DATEDIFF(year) không phải số năm tròn. Dấu `<=` khớp quy tắc đủ ngay ngày kỷ niệm. |
| “`NgayVaoLam` có `NOT NULL` và đã lọc ngày không sau mốc chốt” | **Giữ được về lập luận.** Vì sao ELSE được gọi là dưới một năm? Có đủ hai tiền đề nêu ngay cạnh. Phần mở rộng NULL nay nói rõ phải còn dòng qua WHERE thì CASE mới có thể gán nhãn; không hứa thêm WHEN sẽ cứu dòng đã bị lọc mất. Khai báo NOT NULL thực tế chưa xác minh trực tiếp. |
| “Các nhánh trong bài cùng trả chuỗi Unicode `N'…'`” | **Giữ được.** Vì sao dùng cùng kiểu? Bài giải thích chuyển kiểu ngầm/lỗi khi trộn chữ và số, dẫn lại 1.3; mức giải thích đủ cho mục tiêu hiện tại. |
| Câu lệnh, Result, câu trả lời tình huống | **Giữ được.** Đủ bốn cột, ngày chốt đồng nhất, lọc trước tạo nhãn và xếp MaNV tăng dần. Các ngày/nhãn được trích khớp hồ sơ công ty; `total={45}` khớp phạm vi 45 hồ sơ đang làm. Không suy thành quyết định nhân sự. |
| RunFlow FROM → WHERE → SELECT → ORDER BY | **Giữ được.** Tại sao 48 còn 45, rồi vẫn 45? Ba hồ sơ đã nghỉ bị lọc; tạo nhãn và xếp không loại dòng. Phần trích đổi từ nhóm 10 → 7 dòng sang 10 dòng đầu được báo rõ, tránh tưởng ORDER BY thêm người. Phân biệt thứ tự logic với đọc vật lý. |
| Hay nhầm, Ứng dụng, Ghi nhớ, Bài tập | **Giữ được.** Lỗi có hậu quả cụ thể, ứng dụng nằm trong khả năng đã dạy; ghi nhớ phủ CASE/thứ tự/mốc năm/ELSE. Bài có bốn tiểu mục chính, phần giảng luôn hiện, không quay lại khung Excel/SQL tách đôi. Không thấy chỗ lặp cần cắt hay thuật ngữ mới làm đứt mạch học. |

## Ba bài tập 2.9

- **2-9-1 — Giữ được:** đề và answer cùng mốc `2026-10-21`, IT, đang làm, không lấy ngày tương lai; đúng ba vị trí cột, hai nhãn Unicode và ORDER BY. Theo hồ sơ công ty, NV046/NV048 giúp phân biệt hai nhánh. Vì sao còn lại là chưa đủ năm đã được lý thuyết trả lời.
- **2-9-2 — Giữ được:** đề và cả ba chỗ dùng ngày trong answer cùng đổi thành `2026-08-14`; không lọc trạng thái/ngày nghỉ. Đề nói rõ dùng mã phòng hiện tại và đo từ ngày vào tới mốc, không dừng khi nghỉ, nên không hứa tính thâm niên làm thực tế của người đã nghỉ. NV038 vào `2023-08-14` là trường hợp đủ ba năm đúng biên; đổi `<=` thành `<` sẽ đổi nhãn. Bốn cột, thứ tự và chữ nhãn đồng bộ. Lời dẫn MDX không còn nói cả ba đề dùng 21/10.
- **2-9-3 — Giữ được:** giữ cả hồ sơ chưa đủ ba năm, bỏ ELSE để cột kết quả nhận NULL thật; không chuyển điều kiện kỷ niệm sang WHERE. Theo hồ sơ công ty, NV047 tạo trường hợp cần NULL. Đề/answer cùng phạm vi NS, đang làm, mốc 21/10, ba cột và mã tăng dần.

## Rà diff tích hợp 2.3–2.8 và tests

| Hạng mục | Kết luận |
|---|---|
| 2.3 | **Giữ:** cắt ví dụ loại NV002 không mất điều kiện khoảng ngày/phòng hay cảnh báo thiếu ORDER BY. Đề 2-3-4 mới và answer `%H_` đồng bộ; kiến thức `_` đã được dạy. Mẫu `%H%` sẽ nhận tập rộng hơn trên các tên trong hồ sơ công ty, nên bài tập có tác dụng phân biệt. |
| 2.4 | **Giữ:** ví dụ A02/A03 nói rõ giả định, giải thích tác dụng khóa phụ khi còn một chỗ trong TOP; không đổi thành lời hứa TOP luôn trả đủ năm dòng. |
| 2.5 | **Giữ:** gộp đoạn/cắt đường dẫn bài sau không mất giới hạn. Đề 2-5-2 và answer cùng chuyển KT → KD; KD có NV045 thiếu email và các hồ sơ có email, khiến IS NOT NULL có tác dụng thật. Không hứa email khác NULL là liên hệ được. |
| 2.6 | **Giữ:** không có diff so với HEAD; không mở rộng review nội dung ngoài yêu cầu tích hợp. |
| 2.7 | **Giữ:** đề/answer/test cùng đổi `nguyen%` → `ho%`, LOWER → UPPER. Hoàng Minh Tuấn và Hồ Thị Bích là ví dụ phù hợp cho so không phân biệt dấu; độ dài kỳ vọng 15/11 khớp chữ được trình bày. Cột email gốc vẫn giữ NULL, nhãn CONCAT nhận `[]`. Hai câu tự kiểm tra phân biệt TRIM với Excel và Unicode với collation, không thêm lời hứa sửa nguồn. |
| 2.8 | **Giữ:** Key nêu đúng câu hỏi dữ liệu; UTC được giải thích; đoạn cột có giờ dùng `<` đầu ngày kế tiếp, không thay điều kiện `date` của tình huống. Vẫn giữ khoảng gồm hai đầu, 30 ngày chênh lệch/31 ngày lịch và giới hạn dữ liệu hợp đồng. |
| Tests sửa và test discrimination mới | **Giữ theo đọc mã:** thay expected theo đề mới; chuẩn hóa CRLF ở 2.8 không xóa assertion kết quả. Test mới bảo vệ dữ liệu có trường hợp biên, wildcard khác nhau và email vừa có vừa thiếu. Các chú thích phân biệt kiểm dữ liệu nguồn với thực thi T-SQL là đúng giới hạn. Không thấy nới allowlist khung cũ hay xóa bảo vệ kiến thức. Không thực thi các test đọc seed trong lượt này. |
| Phạm vi và lời hứa | Diff hiện chỉ gồm lesson/exercise 2.3–2.9 và tests liên quan. Không có đổi API/nguồn dữ liệu/component chung; các câu đang rà không hứa tự lưu lịch sử, tự sửa dữ liệu hay bảo đảm tính đúng nghiệp vụ. |

## Kiểm tra và giới hạn

- `git diff --check`: đạt, không có đầu ra lỗi.
- Đọc HTML build 2.7: hai summary mới render thành `<code>`, không lộ backtick. HTML bài tập 2 của 2.9 có ngày `2026-08-14` và điều kiện không dừng ở ngày nghỉ. HTML phần giảng 2.9 có đoạn NULL mới và lời dẫn bài tập mới.
- **Chưa xác minh:** thực thi SQL Server, collation/kiểu trả về thực tế, toàn bộ kết quả và tổng dòng trên database, cấu hình NOT NULL thực tế, API chấm bài và tương tác giao diện. Không chạy test suite/build/check trong lượt độc lập này; không xem giao diện trực tiếp. HTML chỉ chứng minh phần văn bản đã render, không chứng minh SQL hay toàn bộ bố cục.
- Nguồn đối chiếu: AGENTS.md; docs/quy-uoc.md; docs/lesson-template.md; docs/ho-so-cong-ty.md; bài chuẩn 1.1; các phần nền liên quan ở 1.3/1.6/2.3/2.5/2.7/2.8; MDX/YAML và diff/tests nêu trên. Không dùng báo cáo cũ làm bằng chứng.

**Ưu tiên sửa: không có mục bắt buộc từ lượt này.** Trước nhập main vẫn cần người thực hiện đối chiếu kết quả các kiểm tra máy/live thuộc quy trình, không suy từ kết luận đọc nội dung này rằng toàn bộ kiểm tra đã đạt.

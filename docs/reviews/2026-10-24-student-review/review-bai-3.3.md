# Review độc lập bài 3.3 — HAVING: lọc sau khi gộp

- Thời điểm review: 25/10/2026.
- Công cụ: Codex; reviewer kế thừa model của phiên, không đổi model.
- Vai trò học thử: Business Consultant muốn hiểu SQL Server để đủ hiểu và phản biện developer; đánh giá chỉ dựa vào nội dung khóa học đã đọc.
- Bản build đối chiếu: `dist/bai/3-3-having-loc-sau-khi-gop/index.html`, thời gian sửa 25/10/2026 00:20:11 theo đồng hồ máy.

## Kết luận

**Giữ được. Không có finding cần sửa hoặc cần làm rõ về nội dung học trong vòng này.** Hai câu tự kiểm nằm sau Ghi nhớ, trước Bài tập ở cả MDX và HTML build. Việc đặt chúng tại đây không lấy mất lời giải thích cần thiết khỏi phần chính. Người học đã học các bài trước liên quan có đủ kiến thức để làm cả ba đề YAML, không cần lấy đáp án tự kiểm làm nguồn kiến thức mới.

Không đề nghị thêm ví dụ, thêm câu tự kiểm hoặc mở rộng lý thuyết chỉ để tăng số lượng. Bài hiện đã giải thích đủ mục tiêu phân biệt lọc dòng với lọc nhóm và dùng `HAVING` trên chỉ tiêu tổng hợp.

## Rà theo thứ tự bài

### 1. Tình huống và giả định — Giữ được

**Câu gốc:** “Em giữ giúp chị những phòng có trên 10 hồ sơ đang làm thôi nhé.”; “nhóm theo `MaPB` hiện tại”; “không gồm đúng `10`”.

Yêu cầu tiếp nối trực tiếp bài 3.2, có phạm vi trạng thái, khóa nhóm, ý nghĩa biên và thứ tự kết quả. Bài tách được dữ liệu phòng hiện lưu với báo cáo ở một tháng đã qua. Mã phòng và số lượng trong kết luận khớp hồ sơ công ty: `KD` có `13`, `IT` có `10` hồ sơ đang làm. Đề xuất: giữ.

### 2. Từ Value Filters đến HAVING — Giữ được

**Câu gốc:** “**Value Filters** là bộ lọc theo giá trị đã tổng hợp”; “`HAVING` loại cả nhóm không đạt điều kiện khỏi kết quả, không chọn lại từng hồ sơ trong nhóm.”

Thuật ngữ mới được giải thích ngay khi dùng, nối được với Rows/Values và Count ở bài 3.2. Hình ghi rõ là minh họa kết quả còn lại; `A2`, `B2` được đánh dấu đúng mã `KD` và số `13` đang nói tới. Bảng đối chiếu từng dòng/từng nhóm giúp đọc được ý nghĩa `48 → 45` và `6 → 1`; đoạn sau làm rõ số lượng nhóm không bị tính lại sau khi lọc nhóm. Đề xuất: giữ.

### 3. Chọn chỗ đặt điều kiện và dùng alias — Giữ được

**Câu gốc:** “`WHERE SoNgay >= 2` chỉ đưa các đơn ít nhất `2` ngày vào phép tính”; “`HAVING SUM(SoNgay) >= 2` giữ loại nghỉ có tổng ít nhất `2` ngày”; “alias `SoHoSo` tạo trong `SELECT` chưa dùng được ở `HAVING` của cùng câu”.

Ví dụ phụ trả lời được hậu quả nghiệp vụ của việc đặt nhầm điều kiện: thay cả dữ liệu đưa vào tổng và các nhóm còn lại. Nó cũng cung cấp nền cho đề dùng tổng số ngày, không chỉ đề đếm hồ sơ. Bài tách rõ thứ tự viết và thứ tự logic, rồi chỉ ngay cách viết `HAVING COUNT(*)` và dùng alias trong `ORDER BY`. Đoạn giới hạn phạm vi dẫn bài 3.4 và 3.10 hợp lý. Đề xuất: giữ.

### 4. Câu lệnh, kết quả và toàn bộ RunFlow/drawer — Giữ được

**Câu gốc:** “Giữ nguyên phạm vi và khóa nhóm của bài 3.2, thêm điều kiện `HAVING` trước `ORDER BY`”; “Kết quả chỉ trả lời tiêu chí số lượng, không tự kết luận phòng nào đang thiếu người.”

Câu chính và `RunFlow.query` khớp nhau. Đã đọc đủ sáu bước `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`, gồm `meaning`, `detail`, câu kiểm, cột, dòng, tổng và liên hệ Excel của từng drawer. Các bước nhất quán nội bộ: `48` hồ sơ nguồn, `45` đang làm, `6` nhóm, còn `KD` với `13`, kết quả hai cột và một dòng. Sáu số nhóm `7 + 13 + 2 + 10 + 8 + 5 = 45` khớp nhau và hồ sơ công ty.

Drawer bắt đầu giải thích từ từ khóa và nêu số dòng thật theo nội dung khóa học. Bài đã nói câu kiểm riêng không làm alias câu gốc xuất hiện sớm, thứ tự trước `ORDER BY` có thể khác hình, sơ đồ là thứ tự logic. Vì vậy người học không bị buộc hiểu rằng SQL Server chạy lần lượt sáu câu kiểm. Việc giữ `ORDER BY` dù hiện chỉ có một dòng cũng được giải thích. Đề xuất: giữ; đây là đối chiếu nguồn, chưa phải xác minh bằng database hoặc thao tác drawer trong browser.

### 5. Hay nhầm và Ứng dụng — Giữ được

**Câu gốc:** “`KD` vẫn qua ngưỡng, nhưng số lượng thành `14` do tính thêm hồ sơ đã nghỉ”; “Lọc bằng `COUNT(*)` khi yêu cầu theo tổng số ngày sẽ chọn nhóm theo số đơn”.

Các lỗi có hậu quả cụ thể: lỗi cú pháp, sai phạm vi trạng thái, sai chỉ tiêu. Các ứng dụng bám vào lọc nhóm theo quy mô hoặc tổng số ngày; ứng dụng nhóm theo cặp phòng/chức danh dùng kiến thức nhiều khóa nhóm đã có ở 3.2. Không hứa kết quả tự xác nhận thiếu nhân sự. Phần này không tạo tải thuật ngữ mới đáng kể. Đề xuất: giữ.

### 6. Ghi nhớ và tự kiểm — Giữ được

**Câu gốc:** “`WHERE` và `HAVING` xét những dữ liệu nào?”; “Đổi ngưỡng từ `> 10` sang `>= 10` có giữ thêm nhóm nào trong tình huống?”

Ghi nhớ ôn đúng bốn nhịp: chọn dòng, gom nhóm/tính chỉ tiêu, lọc nhóm, sắp kết quả. Hai câu tự kiểm phủ điểm phân biệt chính và cách áp dụng biên trên ví dụ cụ thể. Đáp án đều đã được giải thích trước đó, đặc biệt tại đoạn sau kết quả; không dùng tự kiểm để dạy bù.

Trong MDX, `<Memo />` đứng trước phần tự kiểm, và `## Bài tập` đứng sau hai `<details>`. HTML build cũng có cùng thứ tự, giữ `<code>` và hiển thị đúng `> 10`, `>= 10`. Đề xuất: giữ vị trí hiện tại.

### 7. Bài tập và YAML — Giữ được, đủ nền để làm đề

**Câu gốc:** “Tự đối chiếu rằng điều kiện chọn dòng nằm ở `WHERE`, điều kiện theo chỉ tiêu nhóm nằm ở `HAVING`.”

Hướng dẫn chấm nói rõ cột/thứ tự dòng được yêu cầu, alias và cú pháp không bị ép. Đã đọc đủ ba prompt và answer trong YAML; các câu trả lời mẫu khớp yêu cầu bằng kiểm tra tĩnh. Không có đề nào cần kiến thức chỉ xuất hiện trong phần tự kiểm.

| Đề | Kiến thức người học cần | Nơi đã học và đánh giá |
|---|---|---|
| `3-3-1`: lớn hơn `5`, nhỏ hơn hoặc bằng `10` | Lọc đang làm, nhóm phòng, kết hợp hai so sánh trên `COUNT(*)`, sắp số lượng rồi mã | Bài 3.3 có mẫu `WHERE/GROUP BY/HAVING/ORDER BY` và biên `>`/`>=`; bài 2.2 có phép so sánh, 2.3 có `AND`, 2.4 có nhiều tiêu chí sắp. **Đủ.** Hai vế cùng đúng trong `HAVING` là áp dụng kiến thức điều kiện đã học. |
| `3-3-2`: tổng số ngày từ `5` | Chọn đơn đã duyệt bắt đầu tháng 9, cộng toàn bộ ngày trên đơn, nhóm loại nghỉ, vừa đếm vừa cộng, lọc theo `SUM` | Bài 3.1 có đúng phạm vi trạng thái/ngày và phân biệt ngày trên đơn với ngày thực nghỉ trong tháng; 3.2 có hàm tổng hợp theo nhóm; 3.3 đối chiếu rõ `WHERE SoNgay` với `HAVING SUM(SoNgay)`. Unicode và ngày tám chữ số có ở 2.2; `AND` ở 2.3. **Đủ.** |
| `3-3-3`: cặp phòng/chức danh từ `3` hồ sơ | Hai khóa nhóm, đếm trong mỗi tổ hợp, ngưỡng gồm biên, sắp theo cặp mã | Bài 1.6 đã giải thích `MaCD` là mã chức danh; 3.2 giải thích thêm khóa nhóm đổi độ chi tiết và quy tắc cột trực tiếp trong `SELECT`; 3.3 áp dụng ngưỡng trên nhóm. Sắp nhiều cột có ở 2.4. **Đủ.** Không cần kết bảng hoặc đếm nhiều điều kiện của 3.10. |

## Các câu “tại sao, để làm gì” đã tự đặt ra

| Câu hỏi của người học | Bài đã trả lời chưa? |
|---|---|
| Vì sao còn cần `WHERE` khi đã có `HAVING`? | **Đã trả lời:** chọn hồ sơ đang làm trước khi đếm; bỏ lọc thì `KD` thành `14`. |
| Vì sao không đặt `COUNT(*) > 10` vào `WHERE`? | **Đã trả lời:** bước đó xét từng hồ sơ trước khi có nhóm; mục Hay nhầm nêu câu sẽ lỗi. |
| `HAVING` có đếm lại hoặc chọn bớt hồ sơ của phòng đạt ngưỡng không? | **Đã trả lời:** loại/giữ cả nhóm; số lượng vẫn tính từ toàn bộ dòng qua `WHERE`. |
| Vì sao lọc đơn ít nhất hai ngày khác lọc loại nghỉ có tổng ít nhất hai ngày? | **Đã trả lời:** một bên loại dòng trước tổng, bên kia giữ cả nhóm kể cả đơn một ngày. |
| Vì sao `HAVING` không dùng `SoHoSo`, còn `ORDER BY` dùng được? | **Đã trả lời:** alias tạo tại `SELECT`; thứ tự logic được viết rõ và giải thích trong drawer. |
| Vì sao `IT` không xuất hiện, và đổi điều kiện thế nào để giữ nó? | **Đã trả lời:** đúng `10` không qua `> 10`; `>= 10` giữ thêm `IT`. |
| Vì sao vẫn sắp khi hiện chỉ còn một phòng? | **Đã trả lời trong drawer `ORDER BY`:** giữ tiêu chí đúng khi dữ liệu có thêm phòng đạt ngưỡng. |
| Có được dùng kết quả để kết luận phòng thiếu người không? | **Đã trả lời:** kết quả chỉ thể hiện tiêu chí số lượng. |

## Ưu tiên

1. Chấp nhận việc đặt tự kiểm sau Ghi nhớ, trước Bài tập. Không có sửa nội dung bắt buộc từ vòng review này.
2. Các kiểm thử và xác minh live thuộc lượt kiểm của tác giả; báo cáo này không thay thế kết quả đó và không khẳng định chúng đã đạt.

## Nguồn đối chiếu và giới hạn thực tế

Đã đọc đầy đủ `brief.md` được giao, `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1; toàn bộ bài 3.3 và YAML tương ứng; các bài trước liên quan 1.6, 2.2, 2.3, 2.4, 3.1 và 3.2. Đối chiếu tĩnh phần bài trên HTML build để xác nhận thứ tự phần tự kiểm và ký hiệu so sánh.

Không đọc review cũ, báo cáo kiểm thử học viên gốc, ma trận tác giả, seed, `.env` hay tài liệu SQL ngoài khóa học. Không kết nối/chạy database, không chạy bộ chấm, không kiểm browser hoặc nút sao chép/drawer bằng tương tác. Con số chỉ được so với nội dung khóa học và tính nhất quán nội bộ, **chưa xác minh live**. Không chạy test/build nên không có kết quả test hoặc lỗi nền mới để báo. Chỉ tạo báo cáo này; không sửa file sản phẩm, test, tài liệu hoặc đáp án.

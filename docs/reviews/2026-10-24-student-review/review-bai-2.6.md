# Review độc lập bài 2.6 — DISTINCT: bỏ dòng trùng

Ngày review: 24/10/2026. Phạm vi: MDX bài 2.6, YAML ba bài tập và HTML build tương ứng. Học thử theo chỉ dẫn trong `brief.md`, giữ góc nhìn người mới đã học các bài trước.

**Kết luận:** chưa thấy lỗi nội dung, khoảng thiếu kiến thức hay chỗ lặp cần yêu cầu sửa. Bài phân biệt được trùng giá trị với trùng dòng trên các cột đã chọn, khép lại yêu cầu của chị Hạnh và cung cấp đủ kiến thức để làm cả ba đề. Quy tắc cột sắp xếp khi dùng `DISTINCT` chỉ được giảng ở Hay nhầm 4; không cần chép thêm lên phần chính.

## Rà theo thứ tự bài

### 1. Mục tiêu và tình huống — Giữ được

- Câu gốc: “Lấy cả hồ sơ đang làm và đã nghỉ, mỗi mã phòng hiện một lần thôi, xếp mã tăng dần.”
- Phạm vi toàn bộ `NhanVien`, không lọc ngày hoặc trạng thái, được chốt ngay sau tin nhắn. Câu “phòng chưa có hồ sơ nhân viên sẽ không xuất hiện” giải thích đúng giới hạn của nguồn đang hỏi, không biến danh sách mã đang dùng thành danh mục phòng ban đầy đủ.
- Tự hỏi: **Vì sao không lấy thẳng danh mục `PhongBan`?** Bài đã trả lời: chị Hạnh cần mã có mặt trong hồ sơ, không phải mọi mã trong danh mục.
- Đề xuất: giữ nguyên; không thêm một đoạn rào đón tương tự ở cuối lời giải.

### 2. Chọn danh sách cần lấy trước khi bỏ trùng — Giữ được

- Câu gốc: “`DISTINCT` chỉ giữ các dòng không trùng nhau trong kết quả, xét trên các cột được chọn sau `SELECT`.”
- Định nghĩa xuất phát từ cột mã phòng người học đang cần. Bài chỉ rõ không có `DISTINCT` thì một cột vẫn có một dòng cho mỗi hồ sơ; nối được với Hay nhầm 4 của bài 2.1 mà không giả định người học đã biết cách bỏ trùng.
- Excel được giới thiệu bằng hành động chép cột sang vùng khác, rồi mới dẫn sang SQL. Câu về Remove Duplicates nêu được cái giá: dùng trực tiếp trên danh sách hồ sơ có thể bỏ dòng trong vùng làm việc. Advanced Filter chỉ là một cách Excel khác, được mô tả chức năng ngay khi nhắc tới.
- Tự hỏi: **Vì sao `KD` lặp mà không phải nhập trùng người?** Bài đã trả lời bằng `NV002`, `NV003`, cùng mã phòng nhưng khác hồ sơ. **Chạy câu này có mất hồ sơ không?** Đã trả lời bằng giới hạn của câu `SELECT DISTINCT` đang học.
- Hình Excel: `B3`, `B4` đúng là hai ô `KD` được nhắc. HTML build có `xl-mark` tại đúng hai ô đó.
- Đề xuất: giữ nguyên; không cần thêm thuật ngữ về tập hợp hay thuật toán loại trùng.

### 3. Nhiều cột thì so cả dòng kết quả — Giữ được

- Câu gốc: “trùng dòng kết quả nghĩa là cả mã phòng và mã chức danh đều giống nhau.”
- Hai dòng `IT`/`CV`, `IT`/`CVC` cho thấy ngay việc cùng phòng chưa đủ để bị bỏ. Câu “không bỏ trùng riêng từng cột” xử lý đúng chỗ người mới dễ suy nhầm.
- Câu gốc: “Trong bảng này, `MaNV` được khai báo là khóa chính nên không trùng”. Điều kiện được gắn với bảng mẫu, không hứa mọi cột mang tên mã đều duy nhất. Hình thứ hai giữ cùng cặp `IT`, `CV` nhưng khác `NV017`, `NV021`, nên dẫn chứng làm rõ được nguyên nhân từ `19` cặp lên `48` dòng.
- Tự hỏi: **Vì sao thêm mã để đối chiếu lại làm đổi kết quả?** Bài đã trả lời: tiêu chí so trùng cũng đổi theo danh sách cột. **Mỗi dòng đang đại diện cho cái gì?** Đã chốt rõ ba mức: mã phòng, cặp phòng/chức danh, hồ sơ.
- Câu về một dòng `NULL` là một vế bổ sung gọn và nối được với bài 2.5; câu sau không cho người học hiểu nhầm đã xác định được giá trị thiếu.
- Đoạn “Ở bài này chỉ cần…” giữ phạm vi hợp lý, chuyển việc đếm và kiểm chất lượng dữ liệu sang các bài sau.
- Đối chiếu hồ sơ công ty: bảng 48 hồ sơ cho `6` mã phòng và `19` cặp phòng/chức danh. Các cặp theo phòng là BGD `2`, IT `4`, KD `4`, KT `4`, NS `3`, VH `2`. Đây là kiểm nhất quán với tài liệu khóa học, không phải kết quả chạy SQL trong lượt review.
- Hình kết quả: HTML build đánh dấu đúng dòng 3–4 ở cả hai bảng; dữ liệu và số dòng trích khớp lời dẫn (`10`/`19`, `4`/`48`).
- Đề xuất: giữ nguyên; không cần thêm ví dụ ba cột khác hoặc một bảng diễn giải lại cùng quy tắc.

### 4. Câu lệnh cho tình huống — Giữ được

- Câu gốc: “Chị Hạnh cần mỗi mã phòng một lần, nên chỉ chọn `MaPB` và đặt `DISTINCT` ngay sau `SELECT`”.
- Câu lệnh có đúng một cột, không tự thêm bộ lọc; kết quả sáu mã tăng dần khớp yêu cầu. Lời trả lời nằm ngay sau kết quả, có đủ phạm vi `48` hồ sơ và giới hạn không biết số người mỗi phòng.
- Tự hỏi: **Vì sao vẫn cần `ORDER BY` sau khi bỏ trùng?** Bài đã trả lời bằng câu “`DISTINCT` không bảo đảm thứ tự”; đây là quy tắc khác với việc cột `ORDER BY` phải có trong danh sách `SELECT DISTINCT` ở Hay nhầm 4, nên không phải lặp cùng một ý.
- Đề xuất: giữ nguyên.

### 5. SQL Server chạy câu này thế nào — Giữ được

- Câu gốc: “`SELECT` chọn cột trước, `DISTINCT` mới bỏ các dòng kết quả trùng nhau, rồi `ORDER BY` sắp thứ tự”.
- Bài gọi đúng đây là thứ tự logic, không mô tả các lượt đọc vật lý. Bốn bước thể hiện được thay đổi đang học: `48` hồ sơ/`12` cột → `48` dòng/`1` cột → `6` dòng/`1` cột → vẫn `6` dòng đã sắp.
- `meaning` của mỗi drawer bắt đầu từ từ khóa tương ứng; `detail` phân biệt bảng trích với tổng số dòng. Các bước chưa sắp đều ghi thứ tự chưa được bảo đảm.
- Tự hỏi: **Bước nào làm bớt dòng, bước nào chỉ làm bớt cột hoặc đổi thứ tự?** Bài đã trả lời bằng các số và trạng thái ở từng bước.
- SQL trong bài này không có danh sách cột hoặc điều kiện tiếp dòng phải thụt thêm một cấp. HTML giữ xuống dòng và các mệnh đề chính thẳng cột. Không có căn cứ yêu cầu thêm `\t` vào những câu hiện tại.
- Đề xuất: giữ nguyên. Nội dung drawer bổ sung cách đọc các trạng thái, không cần kéo toàn bộ bảng 12 cột ra phần chính.

### 6. Hay nhầm ở đâu — Giữ được

- Mục 1: “Thêm mã nhân viên cho dễ đối chiếu rồi vẫn mong mỗi phòng một dòng.” Mục này diễn đạt sai lầm và hậu quả đối với yêu cầu chị Hạnh; không mở thêm một lượt giảng lại ví dụ ba cột.
- Mục 2 phân biệt lặp mã phòng với nhập trùng hồ sơ; mục 3 phân biệt che dòng trong kết quả với xử lý dữ liệu nguồn. Hai lỗi có nguyên nhân và hậu quả khác nhau, không nên gộp thành một lời cảnh báo chung.
- Mục 4: “Cột dùng trong `ORDER BY` phải có trong danh sách đã chọn.” Đây là chỗ duy nhất bài giảng giới hạn này; lý do được nối ngay với một mã phòng có nhiều ngày vào làm. Tự hỏi **vì sao không thể sắp danh sách phòng theo ngày vào làm của hồ sơ?** Bài đã trả lời: sau bỏ trùng không có một ngày duy nhất để dùng cho mỗi mã phòng.
- Đề xuất: giữ nguyên; không thêm lại quy tắc mục 4 vào phần chính hay yêu cầu thêm một truy vấn lỗi chỉ để lặp chứng minh.

### 7. Ứng dụng, Ghi nhớ và độ tải — Giữ được

- Ba ứng dụng đều là việc dùng danh sách giá trị/cặp giá trị không trùng: đối chiếu mã đang dùng, rà chức danh theo phòng, chuẩn bị lựa chọn theo phạm vi đã lọc. Không hứa dữ liệu đã đúng hay danh mục đã đầy đủ.
- Bốn dòng Ghi nhớ ôn đúng mục tiêu: một cột, nhiều cột, thêm mã riêng, giữ nguồn và yêu cầu thứ tự. Việc nhắc lại ở đây đúng chức năng ôn bài.
- Khái niệm trọng tâm có bold chọn lọc; giá trị dẫn chứng, tên cột/bảng/ô dùng code. Không thấy dấu backtick thừa trong các bảng Results/Excel đã đối chiếu ở HTML.
- Bốn tiểu mục phần chính nằm trong khung hiện hành. Ba truy vấn chính có vai trò khác nhau, không có nhánh kiến thức sâu kéo dài khỏi mục tiêu. Mốc `18` phút gồm học và ba bài tập là hợp lý theo lượng nội dung; chưa đo thời gian học thực tế nên không khẳng định một thời lượng chính xác.
- Bài truy vấn 2.6 không thuộc nhóm bị yêu cầu riêng phải có ít nhất ba selfcheck; ba bài tập đang luyện trực tiếp mục tiêu. Không đề nghị thêm câu hỏi chỉ để đủ hình thức.

### 8. YAML ba bài tập — Giữ được, đủ kiến thức để làm đề

| Bài tập | Người học cần dùng | Đã có trong khóa học | Đánh giá |
|---|---|---|---|
| `2-6-1` | Lấy `MaCD` không trùng, toàn bộ hồ sơ, tăng dần | Một cột với `DISTINCT` ở 2.6; chọn cột ở 2.1; `ASC` ở 2.4 | Đề và đáp án cùng một cột, không tự lọc, đúng hướng sắp. |
| `2-6-2` | Lọc IT hoặc NS, lấy cặp `MaPB`, `MaCD`, sắp hai cột | `OR`/`IN` ở 2.3; thứ tự sắp nhiều cột ở 2.4; so cả cặp ở 2.6 | Đề nói rõ phạm vi, thứ tự cột và thứ tự dòng; đáp án dùng `IN` phù hợp. |
| `2-6-3` | Lọc `NgayNghiViec IS NOT NULL`, lấy mã phòng, giảm dần | Kiểm `NULL` ở 2.5; `DESC` ở 2.4; một cột không trùng ở 2.6 | Đề không đánh đồng lọc ngày nghỉ với lọc trạng thái; đáp án không tự thêm điều kiện. |

- Tự hỏi: **Khi có bộ lọc, bỏ trùng trên toàn bộ bảng hay trên nhóm đã lọc?** Bài 2.5 đã dạy `WHERE` trước `SELECT`, bài 2.6 đặt `DISTINCT` sau bước chọn cột; kết hợp được hai mạch mà không phải học cú pháp mới để giải đề 2–3.
- Cả ba YAML có `ordered: true`; lời dẫn cuối MDX báo rõ chấm vị trí cột và thứ tự dòng, không so tên cột. HTML build có đủ ba mục bài tập tương ứng.
- Không thấy câu ví dụ trong phần bài học trùng nguyên văn với đáp án của ba đề. Chưa chạy bộ chấm nên đây chỉ là đối chiếu nội dung, không phải kết luận `check:dist` hoặc `check:exercises` đạt.

## Ưu tiên

Không có mục Cần sửa/Cần làm rõ/Cần cắt cần xử lý trước khi chốt bài từ lượt học thử này. Ưu tiên giữ ví dụ so hai cột rồi thêm `MaNV`, và giữ giới hạn `DISTINCT`/`ORDER BY` ở Hay nhầm 4 như hiện tại. Không đề nghị thêm rào đón, bài mới hoặc kiến thức ngoài mục tiêu.

## Nguồn đối chiếu và giới hạn

- Đã đọc: `AGENTS.md`; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; mẫu bài 1.1; bài 2.1, 2.3, 2.4, 2.5; toàn bộ MDX/YAML bài 2.6; `temp/review/2026-10-24-student-update/brief.md`.
- Đã đối chiếu HTML: `dist/bai/2-6-distinct-bo-dong-trung/index.html`, gồm thứ tự mục, SQL, bảng Excel/Results, dấu ô/dòng, nội dung sơ đồ và ba mục bài tập.
- Không mở trình duyệt, không kiểm tương tác drawer, nút Sao chép, dán vào editor hoặc nộp bài. Không coi đọc HTML là kiểm tương tác hay QA trực quan trên trình duyệt.
- Không đọc seed/`.env`/secret, không kết nối database, không chạy SQL và không tra tài liệu SQL ngoài khóa học. Các số `48`, `6`, `19` được đối chiếu với hồ sơ công ty; chưa xác minh trên database đang chạy. Không xác nhận test/build/check nào đã chạy hoặc đạt trong lượt review này.
- Không đọc review cũ, nhận xét reviewer khác hoặc báo cáo học viên gốc. Chỉ tạo report này; không sửa sản phẩm, test, docs, seed hay dữ liệu.

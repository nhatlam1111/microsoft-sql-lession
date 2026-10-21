# Review độc lập bài 2.4 — Sắp xếp và lấy TOP

- Công cụ: Codex, **kế thừa model của phiên**; không chỉ định hoặc đoán tên model.
- Vai đọc: Business Consultant khó tính, muốn hiểu SQL Server để chuyển sang BA/PM và phản biện yêu cầu dữ liệu.
- Phạm vi: toàn bộ `src/content/lessons/2-4-sap-xep-va-top.mdx` và `src/content/exercises/2-4-sap-xep-va-top.yaml`, gồm dữ liệu của Excel/Sql/Result/RunFlow và ba bài tập.
- Kết luận: không phát hiện lỗi kiến thức SQL chắc chắn qua đọc nguồn. Có một chỗ nên rút và một điểm luyện tập nên làm rõ; không cần viết lại phần chính hoặc đổi khung gộp.

## Rà theo thứ tự bài

### 1. Đầu bài và tình huống — Giữ được

**Câu gốc:** “bạn sắp xếp được kết quả theo nhiều cột và lấy tối đa N hồ sơ đầu theo đúng tiêu chí, kể cả khi trùng giá trị sắp xếp” (MDX:11); “Sếp cần năm hồ sơ đang làm có ngày vào làm gần nhất” (MDX:21); “ở mọi phòng và không giới hạn năm vào làm” (MDX:24).

**Tự hỏi:** “Gần nhất” theo ngày nào, trên tập nào, và nếu không đủ năm hồ sơ thì sao? **Bài đã trả lời:** phạm vi chốt `NhanVien` hiện tại, `TrangThai = Đang làm`, xét `NgayVaoLam`; `Key` và phần `TOP` nói tối đa năm. Không đồng nhất ngày vào làm với ngày nhập hồ sơ hoặc thứ tự cấp mã. Nhân vật, tháng và yêu cầu khớp hồ sơ công ty. Mốc tháng 10/2026 đủ cho tình huống không dùng phép tính tương đối theo ngày chạy.

**Đề xuất:** giữ. Thời lượng 20 phút có cơ sở vì ngoài phần đọc còn năm bước sơ đồ và ba bài thực hành; không có căn cứ từ đọc nguồn để yêu cầu đổi thời lượng.

### 2. Từ Excel sang ORDER BY; ví dụ nhiều cột — Giữ được

**Câu gốc:** “Sắp cả vùng để mã, họ tên và ngày của mỗi hồ sơ vẫn đi cùng nhau” (MDX:32); “Mỗi cột có hướng riêng; không ghi hướng thì mặc định là `ASC`” (MDX:34); “chỉ khi cột trước bằng nhau mới xét cột tiếp theo” (MDX:36).

**Tự hỏi:** Vì sao phải chọn cả vùng? Vì sao `NV029` có ngày cũ hơn vẫn đứng trước `NV047`? **Bài đã trả lời:** giữ các ô của một hồ sơ đi cùng nhau; `MaPB` được xét trước ngày, `IT` đứng trước `NS`. Cách chuyển từ Sort/Add Level sang `ORDER BY` rõ, `ASC`/`DESC` được giải nghĩa ngay, không cần giảng lại cú pháp chọn cột của bài 2.1.

**Đối chiếu khối:** đoạn `ORDER BY MaPB ASC, NgayVaoLam DESC, MaNV ASC` có `copy={false}` và nhãn chỉ để đọc. Bốn hồ sơ, tên, mã phòng, ngày khớp hồ sơ công ty. Ô `C4`, `D4`, `C5`, `D5` đúng hai dòng `NV029`/`NV047`; các ô ngày đều có `numeric`. Đây là hình thu gọn đã nói rõ phạm vi, không có lời hứa đang hiển thị nguyên các vị trí dòng của một sheet sau AutoFilter, nên không thấy lý do bắt buộc thêm `rowNumbers` như hình lọc ở bài trước.

**Đề xuất:** giữ ví dụ này; nó làm rõ thứ tự ưu tiên nhiều cột bằng dữ liệu cụ thể.

### 3. Chốt thứ tự khi trùng ngày — Cần làm rõ [P3]

**Câu gốc:** “Quy tắc này cũng xác định ai được lấy nếu một nhóm trùng ngày nằm ở ranh giới năm dòng” (MDX:75); ba bài tập đều kết thúc tiêu chí sắp bằng `MaNV` (YAML:8,24,41).

**Tự hỏi:** Nếu cùng ngày ở vị trí cuối được lấy, tôi có tự xác định được ai nằm trong `TOP` hay chỉ chép `MaNV ASC` theo mẫu? **Bài đã trả lời về quy tắc:** có; khóa chính không trùng và điều kiện dữ liệu không đổi được nói đúng. **Phần chưa được thể hiện bằng một ca cụ thể:** bốn dòng Excel, năm dòng kết quả và danh sách ngày trong hồ sơ công ty không có ca trùng `NgayVaoLam`; cả ba tập bài tập được mô tả cũng không tạo được tình huống trùng ngày để thấy tác dụng của tiêu chí mã cuối cùng. Bài 1 vẫn luyện việc xét cột sau khi `MaPB` trùng, nên không thể nói hoàn toàn thiếu luyện sắp nhiều cột.

**Lý do/đề xuất:** đây là khoảng trống nhỏ giữa mục tiêu “kể cả khi trùng giá trị” và chứng cứ học viên đã hiểu việc chọn ở ranh giới `TOP`, **không phải sai SQL**. Có thể thay câu lặp ở mục 4 bên dưới bằng một vế ví dụ được ghi rõ là giả định về hai mã cùng ngày tranh chỗ cuối, hoặc một câu tự kiểm tra ngắn; không cần thêm bảng, sửa dữ liệu dùng chung hay thêm cú pháp ngoài bài. Chưa chạy bộ chấm nên không khẳng định đã thử nộp câu thiếu `MaNV` và được chấm đúng.

### 4. Phần TOP, alias và giới hạn — Cần cắt [P3], các ý chính giữ được

**Câu gốc cần cắt:** “Trong câu cho tình huống, `MaNV ASC` xử lý trường hợp cùng ngày theo yêu cầu đã chốt” (MDX:83).

**Tự hỏi:** Câu này giúp tôi hiểu thêm điều gì sau MDX:75? **Bài đã trả lời ngay trước đó:** MDX:75 đã giải thích cả thứ tự mã, lý do dùng khóa chính và trường hợp ranh giới; câu này lặp mà không có dẫn chứng mới. Bỏ câu, hoặc dùng vị trí đó cho vế ví dụ giả định ở mục 3, vẫn giữ mạch liền.

**Các câu còn lại trong MDX:77–87 giữ được:** `ORDER BY` chỉ sắp kết quả, không ghi lại thứ tự bảng hoặc đổi thứ tự cột; `TOP (5)` là tối đa năm, lọc trước giới hạn, lấy trên cả tập chứ không theo từng phòng. Nhắc `TOP` thiếu `ORDER BY` ở bài 1.6 giải thích đúng vì sao không dùng nó để kết luận “gần nhất”. Alias đã được định nghĩa ở bài 2.1; ở đây chỉ bổ sung nơi được dùng và lý do theo thứ tự logic. Đoạn “Ở bài này chỉ cần…” giới hạn phạm vi và dẫn `NULL`, so chữ, hiệu năng sang bài sau hợp lý.

### 5. Câu lệnh cho tình huống và kết quả — Giữ được

**Câu gốc:** `WHERE TrangThai = N'Đang làm'` và `ORDER BY NgayVaoLam DESC, MaNV ASC` (MDX:93–97); “năm hồ sơ phù hợp theo thứ tự là `NV048`, `NV047`, `NV046`, `NV045`, `NV044`” (MDX:137).

**Tự hỏi:** Câu này có giải đúng yêu cầu, có tự ý giới hạn năm hoặc loại phòng nào không? **Bài đã trả lời:** đúng bốn cột, đúng alias và vị trí; chỉ lọc trạng thái đã yêu cầu; ngày giảm dần, mã tăng dần; `TOP (5)` áp lên tập đã lọc. Chuỗi có dấu có tiền tố `N`, câu đọc đầy đủ có thể sao chép.

**Đối chiếu khối:** năm dòng trong `Result` có thứ tự ngày và dữ liệu khớp hồ sơ công ty; dòng đầu/cuối đúng `mark={[1,5]}` và được chú thích ngay sau kết quả. Việc `NV044` có ngày năm 2025 giải thích cụ thể vì sao “gần nhất” không đồng nghĩa “năm 2026”. Câu ở MDX:139 phân biệt giữ tiêu chí với giữ bản chốt, không hứa cùng câu luôn trả cùng nhóm khi dữ liệu đổi.

**Đề xuất:** giữ lời giải sát câu lệnh/kết quả. Đây là đối chiếu nguồn và hồ sơ, chưa phải xác nhận chạy SQL Server thực tế.

### 6. Toàn bộ RunFlow — Giữ được, số liệu ngoài hồ sơ còn giới hạn xác minh

**Câu gốc:** “Sơ đồ là **thứ tự xử lý logic**, không phải cách SQL Server quét hay sắp dữ liệu vật lý” (MDX:143); “`TOP (5)` tuy viết trên dòng SELECT nhưng chưa giới hạn dòng ở bước logic này” (MDX:304).

**Tự hỏi:** Vì sao `SELECT TOP` viết đầu nhưng giới hạn cuối? Sắp xếp có làm mất hồ sơ không? **Bài đã trả lời:** có; sơ đồ tách `FROM → WHERE → SELECT → ORDER BY → TOP` và các tổng `48 → 45 → 45 → 45 → 5`. Mỗi `meaning` bắt đầu từ từ khóa; drawer nêu dòng giữ/bỏ, số dòng hoặc số cột và có câu đọc đối chiếu trạng thái bước.

**Đối chiếu từng bước:**

- `FROM` trích `NV020`, `NV047`, `NV048`; `NV020` đã nghỉ đúng hồ sơ công ty. `preview` đủ mã, ngày, trạng thái để hiểu bước kế.
- `WHERE` không còn `NV020`, ba dòng minh họa đều đang làm; câu nói chưa có thứ tự bảo đảm phù hợp với câu không có `ORDER BY`.
- `SELECT` chỉ còn bốn cột/alias, chưa lấy năm dòng. Query riêng của bước đã bỏ `TOP`, phù hợp ý nghĩa cần minh họa.
- `ORDER BY` giữ 45 dòng, trích đúng mười mã có ngày mới nhất theo danh sách trong hồ sơ công ty; các ngày giảm dần, không nhầm mười dòng trích với tổng.
- `TOP` có đủ năm dòng và thứ tự trùng `Result`, `total: 5`; query cuối trùng query chính.

**Đề xuất:** giữ. Không có `LineMap` nên không đặt ra yêu cầu thêm khối này. Các trường ngày sinh, CCCD, email của bảng nguồn không có đủ trong hồ sơ công ty để xác minh độc lập; không nhận chúng là sai hoặc đã kiểm live.

### 7. Hay nhầm ở đâu — Giữ được

**Câu gốc:** “Nghĩ một `DESC` áp dụng cho mọi cột”; “Sắp `HoTen` rồi nghĩ đã xếp theo tên gọi”; “Chỉ lấy năm dòng rồi mới tự chọn người đang làm trong đó” (MDX:486–488).

**Tự hỏi:** Tôi dễ viết một câu chạy được mà sai yêu cầu ở đâu, và hậu quả là gì? **Bài đã trả lời:** hướng sắp thuộc từng cột; so `HoTen` không tự tách tên gọi; giới hạn nhầm tập có thể bỏ sót người phù hợp. Mỗi ý có hậu quả hoặc điều cần thống nhất, không chỉ nhắc lại tên lệnh. Ý `HoTen` nối được với bài 2.3: mẫu chữ cũng không tự hiểu họ và tên.

**Đề xuất:** giữ ba lỗi. Không cần mở rộng thuật toán collation hoặc tách tên ở đây vì đã dẫn sang bài 2.7.

### 8. Ứng dụng, Ghi nhớ và định dạng — Giữ được

**Câu gốc:** “Chuẩn hóa thứ tự báo cáo: xếp theo phòng, rồi theo ngày và mã để các bên dễ so từng dòng khi dùng cùng dữ liệu” (MDX:497); “Chọn nhóm cần ưu tiên… như ngày vào làm sớm nhất để rà hồ sơ lâu năm” (MDX:498).

**Tự hỏi:** Học xong dùng được vào việc gì ngoài chép lại yêu cầu đầu bài? **Bài đã trả lời:** đối chiếu nhóm gần đây, tạo thứ tự báo cáo nhất quán trên cùng dữ liệu và lấy nhóm ưu tiên theo tiêu chí nghiệp vụ. Ví dụ sớm nhất cho thấy có thể đổi hướng ngày, được luyện lại ở bài tập 3; không suy ra SQL tự quyết định chính sách ưu tiên.

**Đối chiếu khối:** bốn dòng `Memo` ôn Sort, Add Level, lọc–sắp–giới hạn và tiêu chí mã khi trùng ngày. Nhắc lại ở đây đúng chức năng ôn tập. Khái niệm trọng tâm được in đậm có chọn lọc; tên bảng/cột, giá trị và ô được chỉ trong lời văn có code. Chuỗi `Memo` không chứa dấu backtick có nguy cơ hiện nguyên ký tự. Giữ sáu phần cấp hai và bốn tiểu mục chính; không có phần trả lời tách rời.

**Đề xuất:** giữ, không thêm checklist ứng dụng chung hoặc tách lại Excel/SQL.

### 9. Lời dẫn bài tập và bài 2-4-1 — Giữ được

**Câu gốc:** “Ba bài đều chấm **thứ tự dòng** và vị trí cột” (MDX:513); “Lấy toàn bộ hồ sơ… KT hoặc NS, kể cả người đã nghỉ nếu có” và “Không giới hạn số dòng và không thêm điều kiện trạng thái hay ngày” (YAML:7–10).

**Tự hỏi:** Vì sao đủ người mà vẫn sai, có được giữ `TOP`/lọc đang làm từ ví dụ chính không? **Bài đã trả lời:** thứ tự dòng và vị trí cột là yêu cầu; toàn bộ KT/NS không giới hạn trạng thái/ngày/số dòng. Đề chỉ rõ thứ tự phòng → ngày → mã. `ordered: true`, danh sách `columns` và câu đáp án thống nhất với yêu cầu. `IN` đã học ở bài 2.3; không yêu cầu kiến thức mới.

**Đề xuất:** giữ. Đây là biến thể thực hành thật: khác tập phòng, hướng ngày, vị trí cột và không dùng `TOP`; câu ví dụ hiện trong bài không phải nguyên văn đáp án. Chưa kiểm bộ chấm thực tế nên chỉ xác nhận cấu hình nguồn, không xác nhận đã thử các cách nộp tương đương.

### 10. Bài 2-4-2 và 2-4-3 — Giữ được, lưu ý mức phủ ở mục 3

**Câu gốc:** “lấy tối đa ba hồ sơ hiện có MaPB bằng IT và TrangThai bằng Đang làm” (YAML:23); “Lấy tối đa bốn hồ sơ có NgayVaoLam sớm nhất, xếp ngày cũ đến mới” (YAML:40).

**Tự hỏi:** Tôi có phải chọn đúng tập trước khi lấy đầu, có nhầm ngày vào làm thành ngày chuyển vào phòng, và có đổi đúng `ASC`/`DESC` không? **Bài đã trả lời:** đề nói phòng hiện có, trạng thái, cột ngày cụ thể, không giới hạn năm và số dòng tối đa. Bài 2 dùng `TOP (3)`/ngày giảm dần cho IT; bài 3 dùng `TOP (4)`/ngày tăng dần cho KT. Hai đáp án có điều kiện `AND`, tiền tố `N`, cột đúng vị trí, `MaNV ASC`, `ordered: true`, khớp prompt. Không có nguyên câu đáp án trong MDX.

**Đề xuất:** giữ cả hai vì kiểm hai hướng ngày trên hai phạm vi khác ví dụ. Không gọi việc thay tiêu chí của mẫu là bị “trả lời sẵn”; học viên vẫn phải chọn điều kiện, hướng và giới hạn đúng. Riêng tác dụng của mã ở ranh giới ngày trùng chưa có ca thực hành cụ thể, như mục 3; không mở rộng sang `WITH TIES` hoặc phân trang vì ngoài mục tiêu đã chốt.

## Ưu tiên xử lý

1. **P3 — mục 3:** nếu muốn mục tiêu chốt thứ tự ở ranh giới `TOP` có ví dụ kiểm được, dùng một vế giả định ngắn thay câu lặp; không sửa database dùng chung. Đây là cải thiện sư phạm, không phải lỗi kiến thức đã xác nhận.
2. **P3 — mục 4:** cắt câu cuối MDX:83 nếu không dùng vị trí đó cho ví dụ. Không có mục P1/P2 từ lượt đọc này.

## Nguồn đối chiếu và giới hạn

- Đã đọc `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài 1.1 mẫu đã duyệt, bài 2.3 đứng trước; đối chiếu thêm bài 2.2/2.1 và phần `TOP` của bài 1.6. Đã đọc bối cảnh bài 2.4 và quyết định không làm theo trong spec được giao. Không đọc report cũ trong `docs/reviews` hoặc `temp/review`.
- Chỉ đọc nguồn, không đọc `database/HRM_Demo.sql`, không tài liệu ngoài, không kết nối database, không gọi API hoặc bấm chạy bài tập. Không chạy test/build/server/browser và không sửa file dự án ngoài report này. Các tổng/dòng khớp hồ sơ công ty không thay thế chứng cứ SQL Server đang chạy; root phụ trách đối chiếu DB/UI.
- Sau khi root báo build mới, đã đọc HTML tĩnh `dist/bai/2-4-sap-xep-va-top/index.html` timestamp `21/10/2026 21:46:36` và đủ ba trang bài tập. HTML hiện có bài đầy đủ, prerequisite 2.3, thời lượng 20 phút, sáu tiêu đề cấp hai; bốn ô Excel có lớp đánh dấu đúng hai dòng được nói tới, `Result` có hai dòng đánh dấu số 1/5 đúng mã đầu/cuối, có năm panel RunFlow. Đề, thứ tự cột và nhãn có sắp xếp ở ba trang bài tập khớp YAML. HTML tĩnh không xác nhận màu/độ rõ thực tế, tràn ngang, mở/đóng drawer, thao tác bàn phím hoặc kết quả chấm trên UI; các phần đó vẫn do root xác minh.
- Report có **10 mục**, gồm **2 mục cần hành động mức P3**, các mục còn lại ghi nhận những điểm giữ được và giới hạn chứng cứ.

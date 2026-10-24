# Review độc lập bài 1.1 — lượt sửa theo kiểm thử học viên

- Ngày: 24/10/2026.
- Bài: `src/content/lessons/1-1-database-la-gi.mdx`.
- Vai trò: Business Consultant khó tính, muốn học đủ để hiểu và phản biện yêu cầu dữ liệu; chỉ dùng kiến thức được bài này cung cấp. Bài 1.1 không có bài học trước.
- Công cụ/model: đọc file bằng PowerShell qua công cụ `exec_command`; reviewer Codex kế thừa model của phiên, không chỉ định model khác.
- Phạm vi: toàn bộ frontmatter, nội dung MDX, bảng Excel, Memo và bốn câu tự kiểm tra; đối chiếu nội dung HTML của bản build. Không có YAML bài tập tương ứng, phù hợp `noExercises: true`.

## Nhận định chung

Bài đi được từ hai bản Excel lệch nhau tới cách thống nhất nguồn, bổ sung luật dữ liệu rồi xác minh yêu cầu của chị Hạnh. Không phát hiện lỗi nội dung nghiêm trọng có căn cứ trong phạm vi đã đọc. Hai điểm nên chỉnh nhỏ là giải nghĩa `workbook`/`sheet` ngay lần đầu và để bộ tự kiểm tra kiểm trực tiếp lợi ích của nguồn chung. Không cần thêm SQL, tách bài hoặc tăng phần giảng về khóa.

## Rà theo thứ tự bài

### 1. Mục tiêu và tình huống — Giữ được

**Câu gốc:** “hai file đều là danh sách phòng ban hiện tại” (dòng 24); “căn cứ vào đâu để xác minh và cập nhật đúng?” (dòng 26).

Giả định đã loại được khả năng một file là ảnh chụp trước khi Quân chuyển phòng. Câu hỏi yêu cầu cả căn cứ xác minh lẫn cập nhật, nên không gợi ý chọn bản mới hơn hoặc tin ngay người gửi. Việc tách nhân vật giả định khỏi hồ sơ mẫu khớp hồ sơ công ty. Mục tiêu đầu bài rõ; mốc 12 phút không có dấu hiệu lệch lớn khi đọc, nhưng chưa đo thời gian học thật.

**Tự hỏi:** “Tại sao chưa thể chỉ nhìn hai file để quyết định?” — **Đã trả lời** qua bước xác minh quyết định/ngày hiệu lực ở cuối phần chính.

### 2. Lần đầu dùng thuật ngữ Excel — Cần làm rõ, mức nhẹ

**Câu gốc:** “Công ty dùng một **workbook** nhân sự nhiều **sheet**…” (dòng 32).

Hai từ này được in đậm nhưng chưa gọi bằng tên tiếng Việt hoặc gắn ngay với thứ người học nhìn thấy. Đến dòng 36, người học biết workbook chứa sheet, nhưng vẫn phải tự suy ra workbook là file Excel và sheet là từng trang tính bên trong. Đây là điểm tựa của toàn bộ phép đối chiếu với database/bảng; bài đầu khóa không có bài trước để bổ sung nghĩa.

**Đề xuất:** sửa ngay câu đang có thành “Công ty dùng một **workbook** (file Excel) nhân sự có nhiều **sheet** (trang tính)…”; không cần thêm đoạn giải thích.

**Tự hỏi:** “Workbook với sheet có phải hai loại file khác nhau không?” — **Chưa trả lời tường minh ngay lần đầu**; dòng 36 đã cho quan hệ chứa nhau, chỉ còn thiếu nhãn cụ thể.

### 3. Nguồn chung, database và SQL Server — Giữ được

**Câu gốc:** “thống nhất một **nguồn chính thức** và người chịu trách nhiệm cập nhật” (dòng 34); “Database không tự biết Quân đã chuyển phòng” (dòng 38).

Định nghĩa database và SQL Server đủ để phân biệt dữ liệu với phần mềm quản lý. Phép đối chiếu workbook → database, sheet → bảng có giới hạn “Trong khóa học”, không tuyên bố mọi database đều tổ chức giống workbook. Dòng/bản ghi được gắn với một hồ sơ, kiểu dữ liệu được giải thích thêm bằng ví dụ ngày ở phần ngay sau. Bài cũng thừa nhận Excel có làm việc chung và chỉ nêu vấn đề của cách gửi nhiều bản trong tình huống.

**Tự hỏi:** “Dùng chung giúp gì nếu vẫn nhập sai?” — **Đã trả lời:** giảm sót cập nhật giữa các bản; kiểm đúng nghiệp vụ vẫn là việc riêng.

### 4. Hình Excel và ba lỗi nhập liệu — Giữ được

**Câu gốc:** “Hình dưới minh họa ba lỗi nhập liệu, không phải dữ liệu đang lưu…” (dòng 42).

Bảng có đúng bốn dòng dữ liệu: `NV005` lặp ở `A3`, `A5`; `C4` chứa `02.10.2017`; `D4` chứa `Ke toan`. MDX và HTML build cùng đánh dấu `A3`, `A5`, `C4`, `D4`, chọn `D4`; các ô ngày `C2`, `C3`, `C5` mang lớp căn phải `xl-num`, `C4` không có lớp này. Chú thích nói rõ đây là minh họa, không giả làm kết quả database.

Ba lời giải có điều kiện hợp lý: `date` chỉ chặn chữ không chuyển được; khóa chính chỉ chặn trùng mã và `NULL`; khóa ngoại chỉ kiểm mã có trong danh mục. Ví dụ `KD` có thật nhưng gán sai người trả lời được giới hạn quan trọng mà không cần người học biết cú pháp. Tên cột, kiểu, mã, giá trị và địa chỉ ô trong lời văn đã dùng code; khái niệm trọng tâm được in đậm có chọn lọc.

**Tự hỏi:** “Tại sao không gõ tên phòng ở từng dòng?” — **Đã trả lời:** tránh nhiều cách viết và đổi tên tại một chỗ. “Cái giá là gì?” — **Đã trả lời:** muốn xem tên phải lấy dữ liệu qua hai bảng. “Lưu được có đồng nghĩa đúng người không?” — **Đã trả lời:** không, qua ví dụ `KD`/`Kế toán`.

Không yêu cầu thêm cách khai báo khóa, cách chuyển ngày hoặc câu SQL chứng minh lỗi ở đây; bài đã dẫn đúng phần đi sâu hơn. Các cơ chế của SQL Server trong đoạn này chưa được reviewer xác minh bằng chạy SQL hoặc tài liệu ngoài.

### 5. SQL và lời giải yêu cầu của chị Hạnh — Giữ được

**Câu gốc:** “SQL là ngôn ngữ để hỏi và thao tác với dữ liệu” (dòng 66); “ở dòng của Quân, bản của chị Hạnh đúng…” (dòng 74).

Phần này phân biệt SQL với SQL Server đã học, giới thiệu T-SQL ngắn và dẫn tới bài 1.6 thay vì đưa cú pháp trước lúc cần. Giới hạn file xuất chỉ phản ánh thời điểm lấy được nêu cạnh thao tác xuất. Ba bước xử lý tách căn cứ nghiệp vụ, người được quyền cập nhật và điều kiện lấy lại danh sách; lời kết chỉ xác nhận dòng của Quân, không chứng nhận cả file. Giới hạn không có lịch sử của bộ mẫu khớp hồ sơ công ty.

**Tự hỏi:** “Căn cứ nào để sửa nguồn?” — **Đã trả lời:** quyết định chuyển phòng cùng ngày hiệu lực. “Muốn xem tháng trước thì cứ hỏi database hiện tại được không?” — **Đã trả lời:** cần bản chốt hoặc thiết kế lưu lịch sử. “Tôi sửa file xuất thì nguồn có đổi theo không?” — **Đã trả lời** ở dòng 66 và Hay nhầm 3.

### 6. Hay nhầm, Ứng dụng và Ghi nhớ — Giữ được

**Câu gốc:** “Mã phòng gán nhầm vẫn có thể đi vào báo cáo…” (dòng 81); “khi hệ thống có thiết kế lưu lịch sử” (dòng 94).

Hay nhầm gắn lỗi với hậu quả và chỉ dẫn an toàn cho dữ liệu dùng chung. Data Validation được giải nghĩa bằng công dụng, không coi Excel là công cụ hoàn toàn không có kiểm soát dữ liệu. Bốn ứng dụng đúng chủ đề database, có việc làm cụ thể; tra cứu lịch sử có điều kiện ngay trong ý. Memo không hứa khóa chính chống được một người mang hai mã, khóa ngoại biết đúng người, hay database tự lưu lịch sử. Bản HTML không làm lộ backtick trong các ô Memo.

Không thấy đoạn cần cắt bắt buộc: các giới hạn được dùng vào hậu quả hoặc tình huống, chưa biến thành phần hướng dẫn kỹ thuật sâu. Phần giảng chính vẫn hiển thị, chỉ đáp án tự kiểm tra nằm trong khối mở.

### 7. Bộ tự kiểm tra — Biên tập để phủ hết mục tiêu

**Câu gốc:** mục tiêu có “giải thích được nguồn dữ liệu chung giúp gì” (dòng 10); câu cuối hỏi “Bảng có khóa chính `MaNV` thì còn chuyện một người hai dòng không?” (dòng 131).

Vị trí sau Ghi nhớ đúng khung; bốn đáp án đều tự đủ nghĩa và không dạy thêm lý thuyết. Câu phân biệt database/SQL Server/SQL kiểm được mục tiêu thuật ngữ. Hai câu về nhập sai và khác mốc dữ liệu kiểm được nhu cầu đối chiếu. Tuy nhiên, chưa có câu yêu cầu người học tự nói lợi ích của nguồn chung: trả lời đúng toàn bộ bốn câu hiện tại vẫn có thể chỉ nhớ các giới hạn mà chưa diễn đạt được vì sao công ty muốn đổi cách làm.

**Đề xuất:** thay câu tự kiểm tra cuối về ngoại lệ khóa chính bằng “Nguồn dữ liệu chung giúp giảm lệch giữa Nhân sự và Kế toán như thế nào?”. Đáp án có thể là “Người có quyền cập nhật tại một nguồn, các bên cùng lấy danh sách từ đó, giảm việc sót sửa trên các bản riêng.” Không cần tăng số câu; ngoại lệ một người hai mã đã có trong phần giảng và không phải mục tiêu chính đầu bài.

**Tự hỏi:** “Học xong, tôi đã được yêu cầu giải thích vì sao nguồn chung có ích chưa?” — **Phần giảng đã trả lời**, nhưng **bộ tự kiểm tra chưa kiểm trực tiếp** ý này.

## Ưu tiên

1. Làm rõ `workbook`/`sheet` bằng một cụm ngay câu đầu dùng chúng; ảnh hưởng trực tiếp đến điểm tựa của người chưa quen tên tiếng Anh.
2. Biên tập một câu tự kiểm tra để kiểm trực tiếp lợi ích nguồn chung, giữ bốn câu hiện có về số lượng.

Không có đề xuất thay đổi cấu trúc, thêm bài, thêm SQL preview hoặc sửa dữ liệu mẫu. Hai đề xuất đều nhỏ; không coi chúng là lỗi khiến người học không hiểu được bài.

## Nguồn đối chiếu và giới hạn thực tế

Đã đọc `AGENTS.md`, `temp/review/2026-10-24-student-update/brief.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, toàn bộ `docs/ho-so-cong-ty.md`, toàn bộ MDX bài 1.1 và nội dung bài trong `dist/bai/1-1-database-la-gi/index.html`. Số dòng trong report là số dòng MDX tại lúc đọc.

Chỉ đọc nguồn và HTML, chưa mở trình duyệt: đã đối chiếu cấu trúc đánh dấu của hình, chưa xác nhận màu thực tế, bố cục, thao tác mở đáp án hoặc nút hoàn thành bài. Bài không có Sql/Result/Messages/RunFlow/Ssms/Erd để kiểm. Không chạy DB, không đọc seed, `.env`, secret, review cũ, báo cáo học viên gốc hoặc nhận xét reviewer khác; không tra tài liệu SQL bên ngoài. Không chạy build/test và không tuyên bố các kiểm tra đó đạt. Không xác minh live các cơ chế SQL Server, Data Validation hoặc số liệu từ database; hình này được tác giả ghi rõ là minh họa. Chỉ tạo report này, không sửa sản phẩm/test/docs và không commit.

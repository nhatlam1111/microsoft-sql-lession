# Review bài 1.1 "Database là gì, nhìn từ một file Excel nhân sự" (lượt one-story, 30/10/2026)

## 1. Phạm vi, phiên bản, công cụ thực tế

- **Bài:** `src/content/lessons/1-1-database-la-gi.mdx`; không có YAML (`noExercises: true`). Bài khái niệm, không có bài tập.
- **Source:** working tree chưa commit. SHA256 tính lại bằng `sha256sum` khớp giá trị được giao (`52ce90e0…489b93`).
- **Build:** `dist/bai/1-1-database-la-gi/index.html`, thời gian file 30/10/2026 16:08:39; MDX sửa lần cuối 16:08:22. Build sau source 17 giây, nên tôi coi là cùng phiên bản. Tôi không có cách đối chiếu mã băm của HTML với source, chỉ đối chiếu thời gian và nội dung chữ.
- **Cách kiểm:** chỉ đọc nguồn và HTML. Đã xem ba ảnh PNG gốc. Không mở browser, không tương tác, không kiểm bàn phím, không kiểm bố cục thật ở viewport nào. Không chạy SQL, không kết nối database, không đọc `HRM_Demo.sql`, `.env`, report cũ hay review của người khác.
- **Đã đọc:** `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, spec `2026-10-30-lesson-1-1-one-story-design.md`, toàn bộ bài, bản render. Ngoài danh sách giao: đọc một phần bài 1.2 và 1.3 và tiêu đề 5.2, 6.6 chỉ để xác nhận các câu trỏ bài ("bài 1.2", "1.3", "1.4", "1.6", "5.2", "6.6") đúng nội dung; không dùng chúng để bù kiến thức cho bài 1.1. Có chạy `grep` số dòng trong `tests/content.test.ts` và CSS `.lesson-illustration` để biết hình/caption hiển thị khối hay dòng; không đọc test để hình thành nhận xét.
- **Model:** Sonnet 5.5 (`claude-sonnet-5-5`) theo thông tin phiên; mức effort do người giao đặt, tôi không xác định được từ trong phiên.
- **Giả định người học:** chỉ biết Excel văn phòng cơ bản, chưa biết SQL, lập trình, quản trị hệ thống.

## 2. Rà theo thứ tự bài

Ký hiệu: dòng = số dòng trong file MDX. Mỗi finding gắn nhãn theo bốn loại: **Chưa được dạy** (người mới không có nghĩa tại chỗ), **Đã dạy nhưng khó tìm**, **Nội dung sai có căn cứ**, **Chưa thể xác minh**.

### 2.1 Tình huống (dòng 21–31)

Tin nhắn của chị Hạnh rõ, một việc, khớp hồ sơ công ty (tháng 10/2026, chị Hạnh/chị Thảo/Quân, Quân minh họa mã `NV052`). Câu chốt `Key` hỏi đúng thứ bài sẽ trả lời ("căn cứ vào đâu để xác minh và cập nhật đúng"). **Giữ được.**

**C7. Giả định hơi mơ hồ.** Câu gốc: "hai file đều là danh sách phòng ban hiện tại, và việc Quân chuyển sang IT đã có hiệu lực trước lúc lấy dữ liệu" (dòng 29).
- Đánh giá: **Cần làm rõ** (nhỏ). Loại: chưa được dạy.
- Tác động: "danh sách phòng ban" dễ đọc thành "danh sách các phòng", trong khi file là danh sách nhân sự theo phòng. "Lúc lấy dữ liệu" chưa có nghĩa: lúc này chưa nói tới việc lấy dữ liệu từ đâu, chỉ có hai file Excel. Người mới sẽ dừng lại đoán "lấy" là lập file hay lấy từ đâu.
- Căn cứ: đọc nguồn; ở các dòng 37–39 chỉ có hai file.
- Đề xuất: "hai file đều là danh sách nhân sự theo phòng hiện tại; việc Quân chuyển sang IT có hiệu lực trước khi hai file được lập".

**B-sub. "bộ dữ liệu mẫu" dùng trước khi biết nó là gì.** Câu cuối giả định (dòng 29): "không phải hồ sơ trong bộ dữ liệu mẫu". Xem C4.

### 2.2 Tiểu mục "Một lần chuyển phòng, hai bản khác nhau" (dòng 35–59)

Tiêu đề mở đúng điều hứa: lần chuyển phòng và hai bản lệch. Định nghĩa **workbook**, **sheet** tại chỗ, kèm tiếng Việt. Mạch kể "chị Hạnh sửa bản mình, chưa tới bản chị Thảo" trả lời được "vì sao hai bản lệch". **Giữ được.**

Hai khối `Excel` (dòng 43–57):
- Đối chiếu nguồn và HTML: cùng ba cột `Mã NV`, `Họ tên`, `Phòng ban`; hàng 1 là tiêu đề nên Quân ở hàng 4; `mark={['C4']}`, `selected="C4"`, `formula="IT"` / `"Kinh doanh"` khớp ô được tô và thanh công thức; HTML có `xl-sel xl-mark` ở đúng ô `Kinh doanh` / `IT` của dòng Quân. Ô `C4` đúng địa chỉ. **Giữ được.**
- `NV001` Trần Thị Mai (Kế toán) và `NV005` Vũ Thị Lan (Kế toán) khớp bảng hồ sơ ở `ho-so-cong-ty.md` mục 3 (NV001 KT, NV005 KT). `NV052` ngoài 48 hồ sơ, đã nói rõ ở dòng 29 là nhân vật giả định. Tôi không đối chiếu được với script (không được đọc).
- Hình được nói rõ "là file minh họa, không phải dữ liệu trong database" (dòng 39). Đúng loại.

**B5a. "Ba dòng giống nhau ở hai bản, trừ ô `C4`" (dòng 39).**
- Đánh giá: **Biên tập** (nhỏ). Tác động: ba dòng dữ liệu nhưng dòng thứ ba chứa ô khác, nên câu tự mâu thuẫn một chút ("ba dòng giống nhau… trừ một ô trong dòng thứ ba"). Người đọc nhanh vẫn hiểu. Đề xuất: "Hai bản giống nhau, trừ ô `C4` được tô màu: phòng ban của Quân."

**S1. Thứ tự "việc đầu tiên" mâu thuẫn với danh sách "theo thứ tự".**
- Câu gốc: "Vì vậy, việc đầu tiên là thống nhất **nguồn chính thức** và người chịu trách nhiệm cập nhật nguồn đó." (dòng 59). Cuối bài (dòng 98–102): "bạn làm theo thứ tự: 1. Xác minh quyết định chuyển phòng… 2. Thống nhất nguồn chính thức và người chịu trách nhiệm…".
- Đánh giá: **Cần sửa**. Loại: nội dung tự mâu thuẫn (không phải sai kiến thức).
- Tác động: người học vừa được bảo "việc đầu tiên" là thống nhất nguồn, vài phút sau thấy thứ tự khác, không biết cái nào là thứ tự đúng; cùng một ý "thống nhất nguồn chính thức và người chịu trách nhiệm" cũng bị nói hai lần (dòng 59 và dòng 101).
- Đề xuất: ở dòng 59 bỏ "việc đầu tiên", dùng "Vì vậy, cần thống nhất…", hoặc cắt nửa câu sau và chỉ giữ ý ở bước 2 của danh sách.

### 2.3 Tiểu mục "Đưa hồ sơ về một nguồn chung" (dòng 61–70)

Tiêu đề mở đúng điều hứa. Định nghĩa **database** tại chỗ; ánh xạ workbook–sheet với database–bảng, dòng, cột; nêu `NhanVien`. Hình 1 nằm ngay sau định nghĩa. **Giữ được** phần ánh xạ (đây là chỗ Excel nối sang database tốt nhất bài).

**C3. Database là phương án đề xuất hay hệ thống công ty đang có?**
- Câu gốc: "Một cách tổ chức nguồn chung là lưu hồ sơ trong **database**…" (dòng 63); sau đó: "Nếu nguồn còn cũ, người có quyền cập nhật sửa phòng của Quân…" (dòng 101), "Nguồn chung còn ghi Quân ở phòng cũ" (câu ôn 3, dòng 158), "Hai bên lấy lại danh sách từ cùng nguồn" (dòng 102).
- Đánh giá: **Cần làm rõ**. Loại: chưa được dạy (thiếu một câu nối).
- Tác động: dòng 63 mở như một lựa chọn để cân nhắc ("một cách… là"); các câu sau lại nói như database đã có sẵn và chứa Quân. Tình huống chỉ nói hai file Excel gửi qua email, không nói công ty có hệ thống nào. Người học không biết: nguồn chung là thứ chị Hạnh nên đề xuất làm, hay là thứ em đang có quyền vào. Bước 2–3 phụ thuộc vào điều đó.
- Căn cứ: đọc dòng 21–31 và 59–63; không có câu nói công ty đã dùng database. (Hồ sơ công ty nói hệ thống nhân sự lưu trong SQL Server nhưng bài không nhắc; theo quy định tôi không dùng nó bù.)
- Đề xuất: một vế ở dòng 63, ví dụ "công ty đã có hệ thống lưu hồ sơ trong database" hoặc nêu rõ đây là đề xuất cho các bước sau; chọn một.

**B1. Hai nhóm thuật ngữ cùng chỉ một thứ.**
- "nguồn chung" (tiêu đề, goal, Ứng dụng) và "nguồn chính thức" (dòng 59, 101, Memo) chưa được nói là cùng hay khác; "người phụ trách cập nhật" (dòng 63), "người chịu trách nhiệm cập nhật" (dòng 59, 101), "người có quyền cập nhật" (dòng 96, 101, Memo, câu ôn 2–3) cũng chưa nói là một vai hay nhiều vai. "Nguồn chung" không được in đậm hay định nghĩa dù là khái niệm trung tâm của bài.
- Đánh giá: **Biên tập**. Tác động: người học cẩn thận tự hỏi "người có quyền" là IT (có quyền kỹ thuật) hay Nhân sự (chịu trách nhiệm nghiệp vụ). Đề xuất: chọn một cách gọi cho vai (ví dụ "người chịu trách nhiệm cập nhật") và một vế nói nguồn chung trở thành nguồn chính thức khi có người chịu trách nhiệm.

**C1. Ai đọc nguồn chung, bằng gì?**
- Câu gốc: "Người phụ trách cập nhật hồ sơ tại nguồn này qua hệ thống; Nhân sự và Kế toán cùng đọc dữ liệu từ đó." (dòng 63); "Hai bên lấy lại danh sách từ cùng nguồn" (dòng 102); tiểu mục sau (dòng 72–88) nói "bạn dùng **SQL**".
- Đánh giá: **Cần làm rõ**. Loại: chưa được dạy.
- Tác động: "qua hệ thống" không nói hệ thống nào. Người học thấy Kế toán "đọc từ đó" nhưng tiểu mục sau dạy đọc bằng SQL Server và SQL; chị Thảo cũng phải học SQL? Hay có ứng dụng nhân sự đứng giữa? Bài chưa nói. Người mới sẽ hiểu "để có nguồn chung thì mọi người cần biết SQL", điều chưa chắc đúng theo ý bài.
- Đề xuất: một vế ở dòng 72 hoặc 81: người đọc trực tiếp bằng SQL (như bạn) hoặc xem qua báo cáo/ứng dụng do hệ thống cung cấp; hoặc dùng "bạn lấy danh sách cho hai bên" ở bước 3 nếu đó là ý.

**B3a. Hình 1.** Caption "Hình minh họa các bảng dữ liệu được tổ chức trong một database của khóa học." (dòng 67).
- Đánh giá: **Biên tập** (nhỏ). Tác động: (a) "của khóa học" dễ đọc là hình thể hiện database thật của khóa học (còn có bảng nào, bao nhiêu?), trong khi hình chỉ có ba bảng trống quanh một khối trụ; (b) trong ảnh các bảng nằm bên cạnh khối trụ, không nằm trong nó, còn lời giảng nói database chứa bảng. Alt text mô tả đúng hình ("được sắp xếp cùng nhau"). Đề xuất: bỏ "của khóa học", dùng "Hình khái niệm: một database gồm nhiều bảng", như hình 2 đã ghi "đây là hình khái niệm".

**Công nhận:** câu "mỗi **dòng**, còn gọi là **bản ghi**, lưu một hồ sơ; mỗi **cột** lưu một loại thông tin như mã nhân viên, họ tên hoặc mã phòng ban" khớp ba cột của hình Excel (trừ chi tiết "mã phòng ban" xem B2). Định nghĩa đủ cho người mới.

**X1 (một phần). "bản ghi".** In đậm nhưng không dùng lại trong bài; để lại nếu bài 1.4 cần (bài 1.4 có dùng), nếu không thì người học nhớ thêm một từ chưa cần. Xem mục 4.

### 2.4 Tiểu mục "Đọc nguồn chung bằng SQL Server và SQL" (dòng 72–88)

Ba khái niệm đứng liền nhau đúng như thiết kế; người học gặp database, SQL Server, SQL theo thứ tự, không còn dòng "câu ghi" chưa dạy. Phần ánh xạ ba hình khái niệm có caption riêng, nói rõ "hình khái niệm". **Giữ được** cấu trúc.

**X2. Câu mở không có lý do.** "Để đọc được nguồn chung, bạn cần biết phần mềm quản lý nó." (dòng 74)
- Đánh giá: **Cần cắt** / **Biên tập**. Tác động: "cần biết" ở đây là chuyển ý rỗng, không nói vì sao phải có phần mềm; người học hỏi "tại sao cần SQL Server mà không mở thẳng database?" và bài chưa đưa ra lý do, chỉ đưa định nghĩa. Đề xuất: bỏ câu này; câu sau đã đủ ("SQL Server là phần mềm… quản lý việc lưu trữ, đọc và cập nhật database"). Nếu muốn giữ "vì sao": nói database được lưu và truy cập qua phần mềm này, không ai mở dữ liệu như mở file.

**B3b. Hình 2.** Alt: "một khung ứng dụng quản lý các database, có biểu tượng thiết lập và bảng dữ liệu"; caption: "Khung phần mềm và biểu tượng thiết lập minh họa việc quản lý các database; đây là hình khái niệm." (dòng 77–78).
- Đánh giá: **Biên tập** (nhỏ); mức tác động chưa thể xác minh vì không có học viên thật.
- Căn cứ: ảnh là một cửa sổ ứng dụng có thanh tiêu đề ba chấm, menu bên trái, bánh răng. Nó giống một công cụ cài trên máy (client). Bài sau (1.2) phân biệt rõ SQL Server (phần mềm quản lý trên máy chủ) với SSMS (công cụ để kết nối). Người học có thể nhớ "SQL Server là cái cửa sổ này". Caption đã nói là hình khái niệm; chưa nói "không phải giao diện bạn sẽ mở".
- Đề xuất: thêm vế "không phải giao diện thật" hoặc đổi chữ "khung phần mềm" thành "phần mềm chạy phía sau, quản lý các database".

**S2. "Phiên bản SQL dùng trong SQL Server gọi là T-SQL".**
- Câu gốc: dòng 81. Đánh giá: **Cần sửa** (nhẹ). Loại: nội dung không chính xác, căn cứ từ hiểu biết chung, chưa đối chiếu tài liệu Microsoft (không được dùng tài liệu ngoài khóa học theo lời dặn).
- Tác động: "phiên bản" gợi số phiên bản (SQL 2016, 2019…). T-SQL là cách Microsoft mở rộng, thêm cú pháp vào SQL (phương ngữ/biến thể). Người mới có thể nghĩ T-SQL là "SQL bản mới hơn". Người dùng này sẽ dùng sai từ khi trao đổi với developer.
- Đề xuất: "Cách Microsoft viết SQL trong SQL Server gọi là T-SQL" hoặc "biến thể SQL dùng trong SQL Server". Người viết kiểm lại bằng tài liệu Microsoft theo mục 4.6.
- Ghi chú: "Trong khóa học, **SQL Server** là phần mềm của Microsoft…" (dòng 74): "Trong khóa học" ngụ ý SQL Server chỉ là cái tên của khóa học; bản thân SQL Server luôn là phần mềm Microsoft. Bài 1.2 nói khóa học dùng Azure SQL Database; tôi coi 1.1 giản lược hợp lý, **không phải lỗi**, nhưng "Trong khóa học" có thể bỏ.

**Công nhận:** "SQL… hỏi và thao tác với dữ liệu. SQL Server xử lý yêu cầu đó rồi trả kết quả." phân vai SQL / SQL Server rõ, đủ cho câu ôn 1. "thao tác" chưa giải thích nhưng bài chưa cần.

**Hình 3.** Alt "một yêu cầu được gửi tới hệ thống để lấy kết quả dạng bảng"; caption nói bảng bên phải là kết quả. Hình vẽ SQL như một tài liệu → bảng; không có SQL Server ở giữa dù lời văn nói SQL Server xử lý. **Giữ được** (đây là hình khái niệm, không hứa chi tiết).

**X3. Đoạn "file xuất" (dòng 88).** "Danh sách lấy được có thể chép hoặc xuất sang Excel… File xuất chỉ phản ánh dữ liệu lúc lấy, không tự cập nhật theo nguồn chung. Nếu sau đó Quân chuyển phòng lần nữa, bản Excel đã xuất vẫn giữ thông tin cũ…"
- Đánh giá: ý **Giữ được** (nối lại với bản Excel của đầu bài, báo trước rủi ro lệch lần nữa); câu thứ ba là ví dụ lặp ý câu thứ hai → **Cần cắt** (nhỏ). Hay nhầm 3 (dòng 114) cũng nhắc "file xuất" nhưng nói điều khác (sửa file không sửa nguồn), nên không phải lặp.

### 2.5 Tiểu mục "Căn cứ để xác định bản đúng" (dòng 90–106)

Tiêu đề hứa "căn cứ" và nội dung đưa đúng: thống nhất chưa chắc đúng → luật dữ liệu → hợp lệ ≠ đúng (ví dụ Quân) → ba bước → kết luận ở dòng của Quân → trỏ bài sau. Chuỗi lập luận này là phần tốt nhất của bài; câu "`Kinh doanh` là phòng có thật, nên dòng ghi Quân ở phòng cũ vẫn lưu được; database không tự biết Quân đã chuyển sang IT" trả lời đúng "tại sao" mà người học khó tính hỏi. **Giữ được.**

**Đoạn luật dữ liệu (dòng 94).** Câu hỏi giao: đủ nghĩa khi chưa dạy tên các khóa không? **Có.** Ba ví dụ ("cột ngày chỉ nhận ngày, mã nhân viên không được trùng, mã phòng phải có trong danh mục") mỗi cái hiểu được độc lập, không cần từ "khóa". Chỉ còn vài lỗ nhỏ:

**B2. Bốn chi tiết nhỏ trong đoạn luật dữ liệu.**
1. "Khi luật đang bật" (dòng 94): "bật" ngầm nói luật có thể tắt; bài chưa nói ai bật/tắt. Giữ được vì mục đích không hứa quá (quy ước mục 2: ràng buộc chỉ có khi khai báo), nhưng với người mới "đang bật" lạ hơn "đã khai báo". Có thể đổi "khi luật đã được khai báo và đang áp dụng" hoặc giữ.
2. "nên lỗi bị chặn ngay lúc ghi" (dòng 94): "lỗi" đọc rộng; chỉ có dữ liệu vi phạm luật mới bị chặn (câu sau cũng nói vậy). "Ghi" dùng lần đầu nhưng nghĩa suy ra được. Đề xuất: "dữ liệu vi phạm bị chặn ngay lúc lưu".
3. Luật nhắc "mã phòng phải có trong danh mục", còn ví dụ Quân dùng tên phòng `Kinh doanh` (giống ô Excel); cột trong database lưu "mã phòng ban" (dòng 70). Người học khó tính hỏi: luật kiểm mã hay kiểm tên? Bài chưa nối. Đề xuất: "`Kinh doanh` là phòng có trong danh mục".
4. Ở dòng 106, "các loại ràng buộc ở bài 5.2" dùng từ "ràng buộc", còn bài gọi là "luật dữ liệu". Chưa nói hai từ là một. Đề xuất: "luật dữ liệu (còn gọi là ràng buộc)" ở dòng 94.

- Đánh giá chung B2: **Biên tập**; không phải lỗi kiến thức.

**S1 (tiếp):** xem 2.2.

**C2. Bước 3 "để đối chiếu" không nói đối chiếu với gì.**
- Câu gốc: "Hai bên lấy lại danh sách từ cùng nguồn, cùng thời điểm, cùng điều kiện lọc để đối chiếu." (dòng 102); sau đó "các dòng khác vẫn phải đối chiếu" (dòng 104).
- Đánh giá: **Cần làm rõ**. Loại: chưa được dạy (thiếu bổ ngữ).
- Tác động: hai bên lấy từ cùng một nguồn, cùng thời điểm, cùng điều kiện thì hai danh sách giống nhau theo cách lấy; đối chiếu hai danh sách này với nhau là không có việc để làm. Ý chắc là đối chiếu danh sách mới với từng bản Excel đang giữ, để tìm các dòng khác ngoài Quân. Bài không viết điều đó; người học khó tính sẽ hỏi "đối chiếu cái gì với cái gì?".
- Đề xuất: "…để đối chiếu với từng bản Excel đang giữ".
- Ghi chú: "điều kiện lọc" (lọc) chỉ có nghĩa với người biết AutoFilter; người học Excel cơ bản đoán được. "bản chốt" (dòng 100) chưa định nghĩa, xem C5.

**C4. "bộ dữ liệu mẫu", "bộ mẫu", "database của khóa học", "dữ liệu mẫu dùng chung".**
- Câu gốc: "Các nhân vật là giả định, không phải hồ sơ trong bộ dữ liệu mẫu." (dòng 29); "Trong database của khóa học…" (dòng 70); "Bảng `NhanVien` của bộ mẫu chỉ giữ phòng hiện tại" (dòng 100); Hay nhầm 4: "Tự sửa dữ liệu mẫu dùng chung. Mọi học viên dùng cùng nguồn…" (dòng 115).
- Đánh giá: **Cần làm rõ**. Loại: chưa được dạy; **đã dạy nhưng khó tìm** (một phần: bài 1.2 nói rõ HRM_Demo, nhưng bài 1.1 không được dùng bài sau để bù).
- Tác động: lần đầu "bộ dữ liệu mẫu" xuất hiện (dòng 29) chưa ai nói đó là một database học tập; bốn tên khác nhau cho cùng thứ khiến người học hỏi chúng có giống nhau không; và điều quan trọng cho an toàn ("mọi học viên dùng chung, chỉ đọc") chỉ xuất hiện lần đầu trong mục Hay nhầm, mục ôn lỗi, không phải ở phần giảng.
- Đề xuất: chọn một tên ("database mẫu của khóa học") và nói ở dòng 70 đây là bộ dữ liệu mẫu dùng chung cho mọi học viên, chỉ đọc; rút gọn Hay nhầm 4 bằng cách trỏ về. Câu "Bài 1.2 chỉ nơi thực hành…" (dòng 115) có thể bị đọc thành "chỉ" = "duy nhất"; đổi "Bài 1.2 hướng dẫn nơi thực hành…".

### 2.6 Hay nhầm ở đâu (dòng 108–117)

Bốn mục, mỗi mục nêu lỗi và hậu quả, đúng quy ước. Mục 2 và 3 gắn đúng với phần chính ("hợp lệ ≠ đúng", "file xuất"). **Giữ được.**

- Mục 1 ("Nghĩ database chỉ là Excel to hơn"): chỉ bác bỏ bằng "tăng dung lượng file không giải quyết việc mỗi người sửa một bản" và thừa nhận Excel có Data Validation. Lập luận trung thực nhưng xem C6.
- Mục 4: xem C4.

**C6. Bài chưa trả lời trực tiếp "vì sao database mà không phải workbook dùng chung có Data Validation".**
- Bài đã tự nói: Excel hỗ trợ cùng sửa một workbook (dòng 59) và có Data Validation (dòng 112). Hai điều này là điểm tốt (không tuyệt đối hóa Excel). Hệ quả: người học khó tính sẽ hỏi "vậy database hơn Excel dùng chung ở đâu?". Bài chỉ trả lời gián tiếp: "một nguồn có người chịu trách nhiệm" và "luật khai báo". Không có câu nói rõ điều khác biệt thực chất (nhiều bảng được quản lý chung, truy vấn bằng SQL, kiểm luật tại một nơi ghi dữ liệu).
- Đánh giá: **Cần làm rõ** (mức thấp; đây là bài mở đầu, có thể cố ý để bài sau). Tác động: câu "để làm gì" của database chưa có đáp án rõ cho người khó tính. Tôi **không** đề xuất thêm đoạn; nếu muốn, một vế ở mục Hay nhầm 1, ví dụ "database kiểm luật cho mọi người ghi vào cùng nguồn, Data Validation chỉ kiểm ô được thiết lập trong file đó". Người viết cần kiểm đúng sai của vế này; tôi không xác minh được.

### 2.7 Ứng dụng (dòng 119–128)

Bốn ý, khớp chủ đề (nguồn chung, luật, tra cứu, lịch sử), không nhắc vai trò người đọc. **Giữ được** ý 1 và 3.

**B4. Hai ý Ứng dụng nói khả năng của hệ thống hơn là việc người học làm được.**
- Ý 2 "áp dụng các luật đã khai báo để kiểm dữ liệu nhập vào, như chặn trùng mã…": người học không khai báo luật (bài không dạy); việc làm được là hỏi/xác nhận luật nào đã có, hoặc đoán lỗi nào không bị chặn. "Áp dụng" mơ hồ về chủ ngữ.
- Ý 4 "Tra cứu lịch sử… khi hệ thống có thiết kế lưu lịch sử (bài 6.6)": bài 1.1 chỉ nói bảng `NhanVien` không lưu lịch sử; việc làm được cần kiến thức chưa dạy. Điều kiện đã nêu nên không hứa quá.
- Đánh giá: **Biên tập** (nhỏ). Đề xuất: ý 2 đổi chủ ngữ ("Hỏi bên IT cột nào đã có luật…" hoặc "Biết nguồn chặn được lỗi gì và không chặn được lỗi nào để chọn cần đối chiếu gì"), ý 4 giữ hoặc bỏ nếu cần gọn.

### 2.8 Ghi nhớ và tự kiểm tra (dòng 130–169)

- Dòng 132 gom ba khái niệm trong một câu, đúng chức năng ôn. Dòng 139 "**Hợp lệ chưa chắc đã đúng hồ sơ.**" đứng riêng sau bảng: đủ nghĩa.
- `Memo` hai hàng (workbook ↔ database; mỗi bên một file ↔ cùng đọc nguồn chính thức). Nội dung đúng.
- Bản render của `Memo`: cột "Bên SQL" bọc cả câu trong `<code>` (HTML: `<td><code>Cùng đọc nguồn chính thức do người có quyền cập nhật</code></td>`), nên hai câu thường hiện như đoạn mã. Đó là cách component chung hiển thị (không phải lỗi backtick của bài). **Biên tập** (B6); theo quy ước không sửa component chỉ vì một bài, nên chỉ ghi nhận: cột "Bên SQL" cho hai ý khái niệm (không phải câu SQL) sẽ hiện kiểu mã.

Chi tiết từng câu tự kiểm tra ở mục 3.

### 2.9 Render và kỹ thuật chữ

- Backtick: trong phần `<article>` của HTML có 0 ký tự backtick và 0 ký tự gạch chéo ngược; 8 backtick trong HTML nằm ở script hydrate của framework, ngoài nội dung bài. Không lộ backtick/escape trong bài. **Giữ được.**
- Code có nền: `C4`, `NhanVien`, `Kinh doanh` đúng dẫn chứng (ô, bảng, giá trị). `IT`, `Kế toán`, `Quân` trong lời văn là vai/nhân vật nên để chữ thường theo quy ước 2.2. **Giữ được.**
- Bold: workbook, sheet, nguồn chính thức, database, bảng, dòng, bản ghi, cột, SQL Server, SQL, T-SQL, luật dữ liệu, "hợp lệ chưa chắc đã đúng". Workbook/sheet/database/bảng được in đậm lần hai ở câu đối chiếu (dòng 70), đúng chỗ quy ước cho phép ("ở chỗ định nghĩa và đối chiếu"). Không bôi cả đoạn. **Giữ được.** Hai từ in đậm nhưng ít dùng lại: `bản ghi` và `T-SQL` (xem mục 4).
- Caption `<strong>` + chữ: HTML liền nhau nhưng `lesson.css` đặt `figcaption strong {display:block}`, nên dự kiến xuống dòng riêng. Chưa thể xác minh bằng mắt vì không mở browser.
- Độ dài đoạn: không đoạn nào gần mức 120 chữ; câu ngắn. Chưa đo bằng test.
- Độ tải: ~13 khái niệm/từ mới trong 12 phút (workbook, sheet, nguồn chính thức, database, bảng, dòng, bản ghi, cột, SQL Server, SQL, T-SQL, luật dữ liệu, hợp lệ/đúng) cộng ba câu trỏ bài (kiểu dữ liệu, khóa chính, khóa ngoại, ràng buộc). Với người đã biết workbook/sheet/dòng/cột thì mới thật sự là database/SQL Server/SQL/T-SQL/luật dữ liệu. Chịu được; T-SQL và bản ghi là hai chỗ có thể giảm tải nhất (spec đã chọn giữ T-SQL cho bài 1.2, nên tôi không đề nghị bỏ).

## 3. Bảng tiền đề từng câu tự kiểm tra

Đọc từng câu, thử trả lời từ nội dung bài trước khi xem đáp án.

| # | Câu hỏi | Cần kiến thức gì | Đã dạy ở đâu | Còn thiếu gì |
|---|---|---|---|---|
| 1 | "Database, SQL Server và SQL khác nhau thế nào?" (dòng 143) | Ba định nghĩa và vai (lưu / quản lý / ngôn ngữ) | Database dòng 63; SQL Server dòng 74; SQL dòng 81; Ghi nhớ dòng 132 | Không thiếu. Có rủi ro nhỏ: hình 2 giống cửa sổ ứng dụng (B3b); "thao tác" chưa có nghĩa nhưng đáp án cũng dùng từ đó. Trả lời được từ bài. |
| 2 | "Nguồn chung giúp giảm lệch giữa Nhân sự và Kế toán như thế nào?" (dòng 150) | Một nguồn, người cập nhật, các bên cùng đọc; cái giá: nguồn vẫn phải đúng | Dòng 59, 63, 92, 101 | Không thiếu kiến thức. Từ "người có quyền cập nhật" so với "người phụ trách" chưa thống nhất (B1); ai đọc bằng gì chưa rõ (C1). Trả lời được ở mức khái niệm. |
| 3 | "Nguồn chung còn ghi Quân ở phòng cũ. Database có tự phát hiện không?" (dòng 157) | Luật chỉ kiểm tính hợp lệ; hợp lệ ≠ đúng | Dòng 94–96 (Kinh doanh là phòng có thật nên lưu được) | Không thiếu. Tiền đề "database đã có Quân" phụ thuộc C3. Đáp án khớp phần giảng. |
| 4 | "Hai file nhân sự khác nhau thì chắc chắn có một file sai?" (dòng 164) | Hai file khác nhau có thể đều đúng nếu khác mốc thời gian/điều kiện lọc; "báo cáo chốt" | Chỉ gợi ý ở dòng 100 ("bản chốt") và dòng 102 ("cùng thời điểm, cùng điều kiện lọc") | **Thiếu nguyên tắc "khác nhau chưa chắc sai" trong phần giảng.** Người học chỉ có thể đoán từ dòng 102. "Báo cáo chốt", "bản chốt" chưa có nghĩa. Giả định đầu bài ("đều là danh sách hiện tại") còn làm câu trả lời đối lập với tình huống chính. Đây là trường hợp tự kiểm tra dạy thêm (C5). |

**C5. Câu ôn 4 dạy điều chưa được giảng.**
- Đánh giá: **Cần làm rõ**. Loại: chưa được dạy (một phần).
- Tác động: đáp án đưa ra ý mới ("báo cáo chốt trước ngày chuyển phòng có thể khác danh sách hiện tại mà vẫn đúng theo mốc thời gian") không có trong phần giảng. Quy ước: không dùng tự kiểm tra để dạy bù.
- Đề xuất: hoặc thêm một vế vào bước 3 ("vì hai bản có thể lập ở mốc thời gian hoặc điều kiện lọc khác nhau mà vẫn đúng với mốc của mình"), hoặc bỏ câu 4 (đã có ba câu phủ mục tiêu, đạt ngưỡng tối thiểu).
- Ba câu đầu phủ ba mục tiêu của `goal` (phân biệt ba thuật ngữ; nguồn chung giúp gì; vì sao vẫn kiểm tra), nằm sau Ghi nhớ, đúng vị trí.

Sau khi bài đã có đoạn bước 3 như trên, câu 4 trở thành câu ôn hợp lệ.

## 4. Câu nên bỏ hoặc gộp (gọn)

- **Bỏ:** "Để đọc được nguồn chung, bạn cần biết phần mềm quản lý nó." (dòng 74) — chuyển ý rỗng (X2).
- **Bỏ/gộp:** "Nếu sau đó Quân chuyển phòng lần nữa, bản Excel đã xuất vẫn giữ thông tin cũ cho tới khi bạn lấy lại dữ liệu hoặc có quy trình cập nhật riêng." (dòng 88) lặp câu liền trước (X3).
- **Bỏ nửa câu:** "và người chịu trách nhiệm cập nhật nguồn đó" ở dòng 59, hoặc gộp bước 2 (S1).
- **Cân nhắc:** `bản ghi` (dòng 70), chỉ dùng một lần trong bài này; bài 1.4 có dùng lại nên để cũng được. "Trong khóa học," ở dòng 74 có thể bỏ.
- **Không đề xuất thêm khối, bảng hay đoạn mới.** Mọi chỗ "đề xuất thêm" ở trên là một vế câu (C3, C4, C1, C5), không thêm đoạn.

## 5. Các câu "tại sao / để làm gì" tự đặt ra

| Câu hỏi | Bài đã trả lời chưa, ở đâu |
|---|---|
| Vì sao hai bản Excel lệch? | Có (dòng 37). |
| Vì sao Excel gửi nhiều bản lại thành vấn đề, không dùng chung một workbook? | Có, và trung thực: nêu Excel có cùng sửa nhưng tình huống mỗi người một bản (dòng 59). |
| Database là gì, để làm gì? | Định nghĩa có (dòng 63); "để làm gì" so với workbook dùng chung chỉ trả lời gián tiếp (C6). |
| Database có phải phương án mới hay hệ thống đang có? | **Chưa** (C3). |
| Vì sao cần SQL Server? | Định nghĩa có, "vì sao cần" chưa (dòng 74, X2). |
| SQL để làm gì, khác SQL Server chỗ nào? | Có (dòng 81). |
| T-SQL là gì? | Có nhưng từ "phiên bản" chưa chính xác (S2). |
| Vì sao file xuất không tự cập nhật? | Có (dòng 88). |
| Vì sao database không tự bắt được lỗi của Quân? | Có (dòng 94–96) và là điểm mạnh nhất. |
| Luật dữ liệu để làm gì, ai đặt? | Có (dòng 94), người thiết kế khai báo. |
| Vì sao bảng `NhanVien` không có lịch sử? | Nêu sự thật ở dòng 100, "vì sao" để bài 6.6 theo quy ước. Chấp nhận. |
| Ai đọc nguồn chung, bằng cách nào? | **Chưa** (C1). |
| Bước 3 đối chiếu với cái gì? | **Chưa** (C2). |
| Hai file khác nhau thì file nào sai? | Trả lời cho tình huống (nhờ giả định), nguyên tắc chung chỉ nằm trong đáp án câu ôn 4 (C5). |
| Bạn nên làm gì tiếp? | Có (ba bước dòng 98–102); thứ tự mâu thuẫn dòng 59 (S1). |

## 6. Phần thật sự đúng, giữ được

- Cả bài bám một câu chuyện: hai file Excel của Quân → database → SQL Server/SQL → luật dữ liệu → xác minh quyết định → trả lời "bản chị Hạnh đúng ở dòng Quân, các dòng khác vẫn phải đối chiếu". Không còn đoạn rẽ sang file khác. Tiêu đề bốn tiểu mục mở đúng điều chúng hứa.
- Câu trả lời tình huống nằm trong phần giảng, giới hạn đúng ở dòng của Quân và đúng giả định, tách "căn cứ" (quyết định chuyển phòng) khỏi "thao tác" (người có quyền cập nhật).
- Không câu nào hứa quá khả năng của database: "luật đã khai báo", "hợp lệ chưa chắc đúng", "giúp giảm lệch" (không "loại bỏ"), "file xuất chỉ phản ánh lúc lấy", "lịch sử khi có thiết kế". Excel không bị tuyệt đối hóa.
- Phần luật dữ liệu đủ nghĩa khi chưa dạy khóa chính/khóa ngoại; bài 1.3, 1.4, 5.2, 6.6, 1.6 được trỏ đúng nội dung (xác nhận qua tiêu đề/goal ở các bài này).
- Hình Excel: dấu `C4`/`mark`/`selected`/`formula` đúng chỗ; NV001/NV005 khớp hồ sơ công ty. Ba hình khái niệm có alt và caption nói rõ là hình khái niệm/minh họa.
- Render: không lộ backtick/escape trong thân bài.

## 7. Ưu tiên

**Nên sửa trước khi chủ khóa đọc (ảnh hưởng hiểu mạch):**
1. S1 – thứ tự "việc đầu tiên" vs danh sách (mâu thuẫn rõ, sửa một câu).
2. C2 – bước 3 đối chiếu với gì (một vế).
3. C3 – database là phương án hay hệ thống có sẵn; C1 – ai đọc bằng gì (hai vế, cùng khu vực).
4. S2 – "phiên bản" của T-SQL.
5. C5 – câu ôn 4 dạy bù (thêm vế vào bước 3 hoặc bỏ câu).

**Nên làm nếu sửa bài lần nữa:**
6. C4 – gọi một tên cho database mẫu và nói nó dùng chung ở phần giảng.
7. C7 – giả định đầu bài.
8. X2, X3 – cắt hai câu.
9. B1, B2, B3a/b, B4, B5a, B6 – chỉnh chữ, hình, caption nhỏ.

**Có thể bỏ qua:** C6 (trả lời "hơn workbook dùng chung ở đâu" nếu người viết muốn bài 1.1 ngắn và để bài sau).

## 8. Tóm tắt finding theo mức

| Mức | Số | Mã |
|---|---|---|
| Cần sửa | 2 | S1, S2 |
| Cần làm rõ | 7 | C1, C2, C3, C4, C5, C6, C7 |
| Cần cắt | 2 | X2, X3 (X1 là ghi chú "bản ghi", gộp trong mục 4) |
| Biên tập | 6 | B1, B2, B3 (a+b), B4, B5, B6 |
| Giữ được | các phần ở mục 6 | không tính số |

Phân loại theo nguyên nhân: **Chưa được dạy**: C1, C2, C3, C4, C5, C7; **Đã dạy nhưng khó tìm**: một phần C4 (HRM_Demo nằm ở bài 1.2, không dùng để bù); **Nội dung sai có căn cứ**: S2 (nghi ngờ, dựa trên hiểu biết chung, chưa đối chiếu tài liệu Microsoft); S1 là tự mâu thuẫn chứ không sai kiến thức; **Chưa thể xác minh**: tác động của hình 2 tới người học (B3b), hiển thị caption, bố cục ở các viewport, bàn phím.

## 9. Nguồn và giới hạn

- **Nguồn đã đọc:** `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, spec `docs/superpowers/specs/2026-10-30-lesson-1-1-one-story-design.md`, toàn bộ MDX, ba ảnh PNG, HTML trong `dist/bai/1-1-database-la-gi/index.html`. Đọc có hạn chế bài 1.2, 1.3 (tiêu đề, goal và vài dòng) và tiêu đề 5.2, 6.6 chỉ để xác minh câu trỏ bài.
- **Không làm:** không mở browser, không kiểm bàn phím/copy/paste/drawer, không đo viewport, không kết nối database, không chạy SQL/API, không đọc `HRM_Demo.sql`, `.env`, report cũ ở `temp/review`/`docs/reviews`, không tạo reviewer khác, không sửa source/test/docs/index/HEAD/branch.
- **Chưa thể xác minh:** (1) dữ liệu `NV001`, `NV005` với script thật (chỉ đối chiếu `ho-so-cong-ty.md`); (2) kết luận kỹ thuật về T-SQL, luật dữ liệu "từ chối khi ghi" và Data Validation: dựa trên hiểu biết chung, người viết kiểm theo mục 4.6 và 5; (3) mọi điều cần nhìn bằng mắt (ảnh, caption, bảng `Memo`, hai khối Excel ở 1280px/1024px); (4) việc học viên thật có hiểu nhầm hình 2 hay không.
- **Kết luận học thử:** với người chỉ biết Excel cơ bản, bài đủ kiến thức để trả lời ba câu ôn đầu (phân biệt ba khái niệm, nguồn chung giúp gì, hợp lệ ≠ đúng) mà không phải dùng bài sau. Còn vướng ở: thứ tự hai lần nói "việc đầu tiên" (S1), bước 3 không nói đối chiếu với gì (C2), chưa nói rõ database có sẵn hay là đề xuất và ai đọc nó bằng cách nào (C3, C1), câu ôn 4 dạy bù (C5), và chữ "phiên bản" của T-SQL (S2). Đây là đánh giá học thử bằng đọc, không phải xác nhận SQL, giao diện hay hình đã hiển thị đúng; cũng không khẳng định học viên chắc chắn tự học được.

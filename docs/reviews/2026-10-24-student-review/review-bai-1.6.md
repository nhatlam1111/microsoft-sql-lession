# Review độc lập bài 1.6 — Câu SELECT đầu tiên

- Ngày: 24/10/2026.
- Công cụ/model: Codex, kế thừa model của phiên; không chỉ định model khác.
- Phạm vi: đọc toàn bộ MDX và YAML cùng slug; học thử dựa trên các bài trước. Đối chiếu HTML build của bài và đề bài tập 1, cùng mã nguồn khối hiển thị để phân biệt điều bài nói với điều công cụ triển khai.
- Kết luận: mạch kiến thức đủ để làm ba đề, không phát hiện lỗi kiến thức SQL chắc chắn. Có một điểm cần làm rõ về database của bản riêng và hai điểm biên tập/chỉ đường cho người dùng web. Không cần thêm kiến thức SQL mới hoặc thêm truy vấn chỉ để chứng minh các con số.

## 1. Tình huống và nhịp Excel → SELECT — Giữ được

**Câu gốc:** “Bạn chỉ xem các cột và vài hồ sơ minh họa”; “Database có nhiều bảng, nên không có một ‘sheet đang mở’ để SQL Server tự đoán.”

Tình huống có phạm vi rõ, phù hợp hồ sơ công ty: chị Hạnh cần biết thông tin bảng nhân viên đang lưu để làm mẫu hồ sơ. Hình Excel trích năm cột và ghi rõ là minh họa, ô ngày được khai báo `numeric`. Phần giải thích đưa `SELECT`, `*`, `FROM` ngay cạnh câu đã xuất hiện ở bài 1.2; không yêu cầu tự suy ra cú pháp chọn cột chưa học.

- Tự hỏi: **Vì sao cần ghi tên bảng khi trước mắt đã mở bảng nhân viên?** Bài đã trả lời: database có nhiều bảng, câu lệnh phải chỉ rõ nguồn bằng `FROM`.
- Tự hỏi: **TOP để làm gì, có phải lúc nào cũng đủ mười dòng?** Bài đã trả lời bằng “tối đa” và trường hợp bảng chỉ có sáu dòng; có nêu cái giá của `*` là lấy cả cột không cần/dữ liệu cá nhân.

### 1.1. Biên tập — P3: “đã chạy” chưa khớp người chỉ dùng web

**Vị trí:** `src/content/lessons/1-6-cau-select-dau-tien.mdx:42`.

**Câu gốc:** “Câu `SELECT * FROM PhongBan;` đã chạy ở bài 1.2…”

Bài 1.2 cho người chỉ dùng web đọc câu/kết quả và chưa tự chạy. Cụm “đã chạy” dễ làm người đó nghĩ mình bỏ sót một việc bắt buộc. Đây là lệch lời dẫn nhỏ, không phải lỗi cú pháp hay thiếu kiến thức.

**Đề xuất:** đổi thành “Câu `SELECT * FROM PhongBan;` đã thấy ở bài 1.2…”.

## 2. Chạy trong SSMS và đọc hai tab kết quả

### 2.1. Cần làm rõ — P2: khôi phục nhắc database riêng ngay tại bước chọn database

**Vị trí:** `src/content/lessons/1-6-cau-select-dau-tien.mdx:52`.

**Câu gốc:** “Mở **New Query**, kiểm database đang chọn là `free-sql-db-8797714`…”

Bài 1.2 đã cho phép học bằng SQL Server riêng và yêu cầu tạo database `HRM_Demo`. Người làm đúng lối đó sẽ không có `free-sql-db-8797714`; bước kiểm ở bài 1.6 hiện chỉ đúng với nguồn dùng chung. Chỗ này đáng sửa vì chính người chưa có mã web được hướng sang bản riêng.

**Đề xuất:** sửa ngay câu hiện có thành “Mở **New Query**, kiểm database đang chọn là `free-sql-db-8797714` (**bản riêng: `HRM_Demo`**)…”. Không cần lặp lại hướng dẫn kết nối.

- Tự hỏi: **Tôi đã tạo `HRM_Demo` đúng ở bài 1.2, vì sao giờ phải chọn tên khác?** Bài 1.6 chưa trả lời tại điểm thao tác; bài 1.2 có căn cứ để bổ sung vế ngắn trên.

### 2.2. Giữ được: thao tác và đọc kết quả đủ điều kiện

**Câu gốc:** “SSMS chỉ chạy đoạn đang bôi đen; không bôi đen thì chạy cả cửa sổ”; “`(10 rows affected)` nghĩa là trả về 10 dòng…”

Đã phân biệt số thứ tự kết quả với mã nhân viên, `NULL` với chuỗi rỗng/số `0`, Results với Messages và mười dòng trả về với tổng hồ sơ. Cảnh báo `SELECT INTO` chỉ một câu, không đưa cú pháp bắt học viên vận dụng; không cần giảng thêm về tạo bảng tại đây. Hướng dẫn Copy with Headers nằm trong tiểu mục SSMS nên không tạo lời hứa đó cho editor web.

- Tự hỏi: **Vì sao chạy câu đọc mà báo “affected”, có phải đã sửa mười người?** Bài đã trả lời trực tiếp.
- Tự hỏi: **Bấm Parse đã lấy dữ liệu chưa?** Chú thích hình đã trả lời: chỉ kiểm cú pháp, không chạy.

## 3. Câu lệnh và câu trả lời tình huống — Giữ được

**Câu gốc:** “Hình trên có 12 cột…”; “mẫu này chưa cho thấy một người đã nghỉ trông ra sao”; “máy bạn có thể hiện các dòng khác hoặc khác thứ tự.”

Đã chốt được thông tin gửi chị Hạnh và giới hạn của mẫu mười hồ sơ. Dòng đánh dấu thứ tư đúng là `NV004`; lời giải nói đúng hai ô `MaCD = GD`, `MaQuanLy = NULL`. Tên cột trong kết quả đủ 12 mục như đoạn diễn giải. Không suy từ mười người chưa nghỉ thành toàn bộ công ty chưa có người nghỉ. Tham chiếu danh mục/bài 1.5 đủ để hiểu vì sao bảng chỉ giữ mã, không bắt viết `JOIN`.

Số 48 hồ sơ, 12 cột và thông tin quản lý của `NV004` không mâu thuẫn hồ sơ công ty/các bài đã đọc. Chưa xác minh bằng SQL live nên không kết luận dữ liệu truy vấn hoặc nguyên văn Messages đã được kiểm lại trong lượt này.

- Tự hỏi: **Vì sao không thấy tên phòng, và mục chưa thấy có chắc hệ thống không lưu?** Bài đã trả lời: tên nằm ở danh mục, mục khác có thể ở bảng khác hoặc chưa lưu.
- Tự hỏi: **Có quyền đọc thì gửi cả CCCD/email cho mọi người được không?** Bài đã trả lời ngay trong phạm vi gửi mẫu, không cần thêm rào đón.

## 4. RunFlow, thẻ ba dòng và bảng trong drawer — Giữ được

**Câu gốc:** “Mỗi thẻ chỉ hiện tối đa ba dòng; `+n dòng` là số dòng chưa hiện trên thẻ.”

Đối chiếu HTML build:

- Thẻ `FROM`: có 48 dòng, hiện ba dòng/ba cột, `+45 dòng`, `+9 cột`.
- Thẻ `SELECT`: còn 48 dòng, cũng `+45 dòng`, `+9 cột`.
- Thẻ `TOP`: còn 10 dòng, `+7 dòng`, `+9 cột`.
- Bảng trích trong hai panel đầu có chú thích “Trích 10 dòng (kết quả có 48 dòng)”. Bảng ở panel `TOP` có đủ mười dòng của kết quả minh họa.

Các số trên không thể hiện có hồ sơ bị mất khỏi bước `FROM`/`SELECT`. `meaning` bắt đầu từ từ khóa của từng bước, `detail` nói số dòng/cột và việc giữ dữ liệu; câu trong drawer đều dùng cú pháp đã dạy. Bài nêu rõ đây là thứ tự xử lý logic, không phải đọc vật lý. Giới hạn khi không có `ORDER BY` đã được giải thích, không cần bắt bổ sung `ORDER BY` trước bài 2.4.

- Tự hỏi: **Tại sao thẻ có ba dòng mà nói 48?** Bài đã trả lời bằng phạm vi thẻ và `+n`; chú thích bảng trích trả lời tiếp phạm vi drawer.
- Tự hỏi: **Tại sao viết SELECT trước mà sơ đồ bắt đầu FROM?** Bài đã trả lời qua định nghĩa thứ tự logic và giải thích bước `FROM`.

Giới hạn: mới đối chiếu nội dung nguồn/HTML, chưa bấm mở drawer, chưa thử điều hướng bàn phím hoặc nút Sao chép trong trình duyệt.

## 5. Hay nhầm, Ứng dụng và Ghi nhớ — Giữ được

Ba lỗi thường gặp có hậu quả/cách xử lý cụ thể; `TOP` không được gọi là ngẫu nhiên hoặc mười mã nhỏ nhất. Nguyên văn lỗi khi bôi đen thiếu phần là dữ kiện cần tác giả xác minh bằng luồng kiểm của họ; lượt review này không chạy để xác nhận hay phủ nhận.

Ứng dụng đúng chủ đề: xem mẫu, kiểm bước đầu sau nhập và đọc kết quả thực thi. Mục kiểm sau nhập có giới hạn “mẫu chưa thay thế kiểm tra toàn bộ”, không hứa phát hiện mọi lỗi. Ghi nhớ được phép ôn lại phần giảng. Bài có bài tập nên việc không có bộ tự kiểm tra riêng không vi phạm điều kiện dành cho bài khái niệm `noExercises`.

## 6. Lối thực hành web và ba đề YAML

### 6.1. Cần làm rõ — P3: chỉ chỗ mở editor trước khi bảo chạy mẫu

**Vị trí:** `src/content/lessons/1-6-cau-select-dau-tien.mdx:207`.

**Câu gốc:** “Không có SSMS thì thử câu mẫu bằng **Chạy (F5)** trước, rồi làm ba bài dưới đây.”

Trên trang bài học, ba mục bên dưới là nút **Làm bài**; nút **Chạy (F5)** thuộc trang bài tập. Bài 1.2 có chỉ đường này nhưng đây là lần đầu thực hành web thật, trong khi đề đầu tiên đã yêu cầu bảng khác câu mẫu (`ChucDanh` thay vì `NhanVien`). Đổi một câu sẽ giúp người mới biết mở ở đâu và vì sao phải thay câu mẫu khi làm đề.

**Đề xuất:** “Nếu dùng web, bấm **Làm bài** ở bài tập 1, nhập câu mẫu rồi bấm **Chạy (F5)** để thử; sau đó thay bằng câu theo đề và làm lần lượt ba bài.” Không cần thêm mục hướng dẫn riêng hoặc thêm editor lên bài học.

- Tự hỏi: **Nút Chạy ở đâu khi trên bài học chỉ thấy Làm bài?** Bài hiện trả lời gián tiếp qua bài 1.2; vế sửa trên trả lời ngay tại bước dùng.

### 6.2. Giữ được: placeholder, khác biệt bôi đen và kiến thức để làm đề

**Câu gốc:** “Trang bài tập chạy cả khung soạn, mỗi lần chỉ nhận một câu”; “Chữ nhắc trong ô mới là placeholder…”; “Nếu bản nháp cũ có dòng bắt đầu bằng `--`, đó là ghi chú…”.

Giải thích phân biệt rõ web với SSMS. Mã nguồn editor dùng thuộc tính `placeholder`, còn workspace khởi tạo bằng bản nháp hoặc chuỗi rỗng; phù hợp lời bài, không phải câu SQL điền sẵn. Hướng dẫn bản nháp cũ có `--` giúp tránh gõ tiếp vào ghi chú mà không bắt học cú pháp comment đầy đủ. Chưa thử trực tiếp thao tác gõ/khôi phục bản nháp nên đây là đối chiếu nguồn, không phải kiểm tương tác.

Ba đề YAML đều làm được bằng `SELECT * FROM <bảng>;`, không buộc kiến thức `WHERE`, chọn cột, `JOIN` hay xử lý `NULL` chưa học. Bảng cần tìm có thể tra qua sơ đồ đã được giới thiệu; đề lấy mọi dòng/mọi cột, `ordered: false` khớp lời “thứ tự dòng không quan trọng”. Đề hợp đồng giải thích `NULL` là quy ước của bộ mẫu, không biến thành luật cho mọi database. Đề đơn nghỉ ghi rõ mọi loại/mọi trạng thái, tránh hiểu nhầm phải lọc tháng ngay bài này. Không cần đổi bộ bài tập.

## Ưu tiên xử lý và giới hạn

1. **P2:** bổ sung `HRM_Demo` cho người thực hành SSMS trên bản riêng tại dòng 52.
2. **P3:** đổi “đã chạy” thành “đã thấy” tại dòng 42; chỉ rõ **Làm bài → nhập mẫu → Chạy → thay bằng câu theo đề** tại dòng 207.
3. Giữ các phần còn lại. Không đề nghị tách bài, thay khung gộp, thêm truy vấn đếm hoặc tăng độ sâu SQL.

**Nguồn đối chiếu:** `AGENTS.md`; brief của lượt; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; toàn bộ các bài 1.1, 1.2, 1.4, 1.5, 1.6; YAML bài 1.6; `dist/bai/1-6-cau-select-dau-tien/index.html`; `dist/bai/1-6-cau-select-dau-tien/bai-tap/1/index.html`; các khối `RunFlow`, `Result`, `Exercises`, `SqlEditor`, `ExerciseWorkspace` và hàm tạo preview của RunFlow.

**Giới hạn thực tế:** không đọc seed `database/HRM_Demo.sql`, `.env`, review cũ hoặc nhận xét reviewer khác; không kết nối database, không chạy/nộp SQL, không chạy lại suite kiểm của tác giả; không kiểm tương tác trình duyệt hoặc thao tác copy/dán. Không có kết luận “SQL live đã đạt” hay “UI tương tác đã đạt”. Chỉ tạo báo cáo này, không sửa sản phẩm/test/docs.

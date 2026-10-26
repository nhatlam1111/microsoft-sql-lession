# Học thử độc lập bài 4.5 — View: báo cáo lưu sẵn

## Phạm vi, phiên bản và công cụ

- Bài được đọc toàn bộ: `src/content/lessons/4-5-view-bao-cao-luu-san.mdx`, 140 dòng, gồm hai khối SQL, bốn dòng Memo và năm câu tự kiểm tra. Đã đọc `public-4.5.json`: `exercises` rỗng; đây là bài `noExercises`, không có YAML để mở hay giai đoạn đối chiếu đáp án SQL.
- Source tự kiểm bằng Git chỉ đọc: HEAD `dd67309f91f75b6e4fd9e98ca46dba839d99a96f`, nhánh `codex/review-lessons-4-1-4-6`. Lúc kiểm, Git chỉ báo kế hoạch xuất bản mới chưa được theo dõi; không có thay đổi nội dung bài.
- Build root giao: bản mới 132 trang, 19:07:28 +07 ngày 26/10/2026. Tôi tự đọc `dist/bai/4-5-view-bao-cao-luu-san/index.html`, thấy thời gian sửa file 19:07:28 cùng ngày và đối chiếu nội dung bài với MDX. Số trang toàn build là thông tin gói giao, không phải số do tôi chạy build xác nhận.
- Đã đọc AGENTS, toàn bộ `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1 và các bài tiền đề được giao: 1.2, 2.1, 2.2, 2.4, 4.1. Không mở bài sau, report cũ, nhận xét reviewer khác hoặc ma trận tác giả.
- Công cụ thực tế: `functions.exec` gọi PowerShell để đọc/đánh số dòng và đối chiếu HTML; `rg --files` để tìm đúng file; `git rev-parse`, `git branch --show-current`, `git status --short` chỉ để kiểm phiên bản. Ghi duy nhất report này bằng `apply_patch`. Model: kế thừa model của phiên, không đổi model và không tạo agent con.
- Giữ quyết định đã duyệt: view thông thường chỉ là đề xuất chưa tạo trong database khóa học; hai mẫu chỉ đọc hiểu, `copy={false}`, không dựng Result; hoàn thành bằng năm câu tự kiểm tra, không ép SSMS hoặc mở DDL trên web.

## Rà theo thứ tự bài

### Tình huống và mục tiêu — dòng 11–25

Yêu cầu đủ cụ thể: dùng chung định nghĩa hồ sơ đang làm, chỉ lấy bốn thông tin. Dòng 23 chốt trạng thái đang lưu và loại cách hiểu danh sách tại ngày quá khứ. Đây là phạm vi một dòng hồ sơ trong `NhanVien`, không biến trạng thái thành xác nhận thực tế của người đó. Bốn tên cột đứng ngay cạnh yêu cầu nghiệp vụ nên không phải tự đoán mã phòng hay mã chức danh là cột nào.

Mục tiêu là đọc định nghĩa, hiểu view lưu gì và biết điều kiện dùng lại. Không có yêu cầu ngầm tạo một đối tượng. Tên bài “báo cáo lưu sẵn” có thể gợi liên tưởng bản chốt khi mới nhìn, nhưng summary và phần định nghĩa ngay đầu bài phân biệt rõ lưu định nghĩa với lưu dữ liệu; không có căn cứ yêu cầu đổi tên.

### Từ Excel đến đối tượng view — dòng 29–35

Điểm tựa chỉ cần lọc trạng thái, giữ cột và chép kết quả sang sheet, phù hợp Excel cơ bản; không cần biết PivotTable/VLOOKUP. Bài không phủ nhận Excel có cách dùng lại bộ lọc. Chuyển sang SQL rõ bằng định nghĩa view và cách dùng tên trong `FROM`.

“View thông thường” giới hạn loại view đang xét. Dòng 35 không hứa câu đọc luôn thấy bản mới nhất của mọi thay đổi, không gọi view là bản chốt và không biến nguồn chung thành bảo đảm đủ/đúng. Điều này nối được với bài 1.1 về nguồn chính thức và bài 1.2 về file xuất tại lúc lấy.

### Đọc định nghĩa đề xuất — dòng 37–50

`schema`, `dbo`, tên hai phần và tiền tố `vw_` có nghĩa tại chỗ; không mặc định người học biết quy ước quản trị. Điều này cũng nhất quán với schema đã giới thiệu ở 1.2 dòng 43.

Trước khối tạo view đã nói rõ view chưa tồn tại và hai mẫu không được dán vào bài tập. Mẫu khai báo đúng bốn cột của tình huống, dùng chuỗi tiếng Việt có `N`, không dùng dấu ba chấm hoặc cột ngoài phạm vi. `CREATE VIEW` và `AS` được giải nghĩa ngay sau mẫu. So sánh CTE tập trung vào vòng đời tên và khả năng dùng lại; khớp 4.1 dòng 41, 57, không nói CTE tạo/lưu bảng trung gian. Không hứa view chạy nhanh hơn và có dẫn phần hiệu năng.

### Đọc, lọc thêm và sắp xếp — dòng 52–63

Giả định view đã được tạo và có quyền đọc được đặt trước câu mẫu. `WHERE` bên ngoài chỉ thu hẹp các dòng do view cung cấp; bài nói thẳng không lấy lại hồ sơ đã bị điều kiện trạng thái loại. Đây là diễn giải logic để đọc câu, không mô tả các bảng vật chất được tạo tuần tự.

`ORDER BY` nằm ở câu đọc, nên không tạo lời hứa thứ tự tự có từ view. Cột `TrangThai` được dùng bên trong nhưng không xuất ra được giải thích ở dòng 63; tách được cột dùng lọc trong định nghĩa với cột mà báo cáo có thể chọn từ view. Bài 2.2 dòng 51 đã cho nền rằng cột dùng lọc không bắt buộc nằm trong `SELECT`; phần mới về ranh giới cột của view được dạy ngay trong 4.5.

Hai mẫu có đầy đủ mệnh đề, xuống dòng theo mệnh đề; không có phần tiếp dòng cần thụt thêm cấp. Không có số dòng kết quả, Result, LineMap, RunFlow hoặc drawer phải kiểm thêm ở bài này. Việc không có Result là phù hợp vì view đề xuất chưa được tạo.

### Điều kiện triển khai và lời giải tình huống — dòng 65–73

Phân biệt quyền tạo và quyền đọc, yêu cầu đúng database/schema, và định nghĩa `batch` ngay khi dùng. Điều kiện `CREATE VIEW` đứng đầu batch được nêu để đọc kế hoạch triển khai; không biến thành hướng dẫn tự chạy trên nguồn chung. Mẫu tạo view cũng bắt đầu bằng chính `CREATE VIEW`, không có câu đặt trước gây mâu thuẫn với phần giảng.

Dòng 69 nói tạo view không tự thu hồi quyền bảng gốc và không tự bảo đảm che kín dữ liệu, nên không suy từ bốn cột xuất ra thành hàng rào bảo mật. Quyền chi tiết để bài 6.1 là giới hạn hợp lý với mục tiêu đọc hiểu.

Dòng 71 khép tình huống bằng việc thống nhất định nghĩa rồi nhờ người phụ trách triển khai cùng quyền. Dòng 73 chốt rõ điều kiện hoàn thành trên web: hiểu định nghĩa và trả lời năm câu, không cần kết nối SQL Server riêng. Không ép người đã chọn web ở 1.2 phải đổi đường thực hành.

### Hay nhầm, Ứng dụng, Ghi nhớ và tự kiểm tra — dòng 75–140

Bốn lỗi thường gặp có hậu quả phù hợp mục tiêu: nhầm bản chốt, tin nguồn đủ, đồng nhất quyền và tự coi view là bảo mật. Ba ứng dụng nói đúng việc làm được nhờ định nghĩa chung, lọc/sắp câu đọc và bàn giao triển khai. Không có ứng dụng vượt sang chỉnh dữ liệu hoặc quản trị quyền cụ thể.

Memo ngắn, giữ được đối chiếu Excel/SQL. Khái niệm mới được in đậm có chọn lọc; tên đối tượng/cột/từ khóa và giá trị dẫn chứng dùng code. Hai giá trị trong `<summary>` dùng `<code>`, không để backtick thành chữ thường. Năm câu tự kiểm tra nằm sau Memo, không có mục Bài tập rỗng.

Câu tự kiểm tra thứ ba gộp việc đọc cột/nguồn, lọc và thứ tự, nhưng các ý đều đã được giảng cạnh hai mẫu; không cần kiến thức từ đáp án để hiểu. Chưa thấy đoạn cần cắt hoặc bổ sung để vượt qua một chỗ vấp cụ thể. Chưa đo thời gian học của người thật, nên không dùng lượt đọc nguồn này để xác nhận chính xác mốc 25 phút.

## Các câu “tại sao/để làm gì” khi học thử

| Câu tự đặt ra | Bài đã trả lời ở đâu | Đánh giá |
|---|---|---|
| Vì sao cần dùng view khi đã biết viết câu `SELECT`? | Dòng 20, 31, 33, 50: nhiều báo cáo cần cùng quy tắc và một định nghĩa có tên dùng lại được. | Đủ mục đích; không hứa mọi người bị buộc phải dùng view. |
| View lưu phần nào, khi nguồn thay đổi thì báo cáo có phải bản chốt không? | Dòng 33–35, nối với 1.1 và 1.2 về file xuất tại thời điểm lấy. | Giải thích trước phần ôn, không cần tự suy từ tên bài. |
| Vì sao tên view dùng lại được còn tên CTE không? | Dòng 50; 4.1 dòng 41, 57. | Tiền đề trực tiếp, không đánh đồng CTE với bảng lưu sẵn. |
| Vì sao lọc phòng ngoài view không mang hồ sơ đã nghỉ trở lại? | Dòng 54–61: câu đọc lấy nguồn qua định nghĩa đã giới hạn trạng thái. | Có lời giải tại chỗ, không cần kiến thức tối ưu hóa. |
| Vì sao đã lọc bằng `TrangThai` mà báo cáo không chọn được cột đó từ view? | Dòng 63 cùng danh sách cột dòng 44. | Nêu đúng ranh giới cột xuất ra. |
| Vì sao cần `ORDER BY` ở câu đọc? | Dòng 61; 2.4 dòng 34, 77. | Không phụ thuộc thứ tự tình cờ của dữ liệu. |
| Đọc được bảng có đủ để triển khai view hoặc che dữ liệu chưa? | Dòng 67–69 và Hay nhầm 3–4. | Tách quyền tạo/đọc và quyền bảng gốc; chi tiết quyền để bài 6.1. |
| Không tạo được view trên web thì hoàn thành bài bằng cách nào? | Dòng 41, 73, 105 và câu tự kiểm tra cuối. | Đường hoàn thành rõ, phù hợp bài đọc hiểu. |

## Bảng tiền đề cho từng câu tự kiểm tra

Không có đề nộp SQL hay answer YAML. Bảng dưới dùng phần giảng trước mục ôn và các bài tiền đề để xác định cách tự trả lời; không lấy đáp án trong `<details>` làm lời giảng bù và không chép đáp án vào report.

| Câu | Kiến thức cần có | Đã dạy trước ở đâu | Cách người học tự làm | Thiếu hoặc khó tìm |
|---|---|---|---|---|
| 1. View lưu định nghĩa hay bản chốt? | Phân biệt định nghĩa truy vấn với kết quả xuất tại một thời điểm; giới hạn đủ/đúng của nguồn. | 4.5 dòng 31–35; 1.1 phần nguồn chung và xuất Excel; 1.2 dòng 119. | Đối chiếu định nghĩa với ví dụ sheet sao chép và giới hạn nguồn. | Không thấy thiếu. |
| 2. Vì sao không dùng lại tên CTE của câu trước? | Phạm vi tên CTE; định nghĩa view được lưu và điều kiện dùng lại. | 4.1 dòng 33, 41, 57; 4.5 dòng 50. | So sánh phạm vi hai loại tên đã được giải thích trực tiếp. | Không thấy thiếu. |
| 3. Đọc bốn cột/nguồn, lọc thêm và thứ tự | `SELECT`/`FROM`, điều kiện trạng thái của view, điều kiện câu ngoài, `ORDER BY`. | 2.1 dòng 42–44; 2.2 dòng 41–55; 2.4 dòng 34, 77; 4.5 dòng 39–63. | Đọc mẫu định nghĩa rồi mẫu sử dụng, kiểm riêng cột, phạm vi dòng và điều kiện sắp. | Câu nhiều vế nhưng từng vế có phần giảng liền trước; không thiếu tiền đề. |
| 4. Quyền đọc bảng có bảo đảm tạo/đọc view? | Quyền tạo khác quyền đọc; đối tượng phải tồn tại đúng nơi; quyền bảng gốc không tự mất. | 1.2 về đúng database; 4.5 dòng 67–69. | Kiểm lần lượt việc tồn tại đối tượng và quyền cho từng việc, không suy từ một quyền sang quyền khác. | Không thấy thiếu; không cần biết lệnh cấp quyền. |
| 5. Hoàn thành bài trên web thế nào? | Phạm vi chỉ đọc hiểu, trạng thái view minh họa, giới hạn web và điều kiện đánh dấu hoàn thành. | 1.2 dòng 49–53 về đường web; 4.5 dòng 41, 73, 105. | Theo đúng chỉ dẫn hoàn thành hiện có, không tìm một bài nộp SQL không được giao. | Không thấy mâu thuẫn hay bước bắt buộc thiếu. |

Cả năm đáp án mở đều chỉ nhắc lại kiến thức đã có trước phần ôn. Không có đáp án dùng để dạy bù kiến thức còn thiếu. Chưa phát hiện câu tự kiểm tra nào cần bài sau hoặc kiến thức quản trị chuyên sâu mới trả lời được.

## Ưu tiên và các điểm giữ được

Không phát hiện finding thuộc **Cần sửa**, **Cần làm rõ**, **Cần cắt** hoặc **Biên tập** có đủ căn cứ trong phạm vi lượt này. Không đề nghị bổ sung bài tạo view, Result giả, API hoặc thay đổi database để hợp thức hóa mẫu đọc hiểu.

| Đánh giá | Vị trí và câu gốc ngắn | Tác động với người mới / căn cứ |
|---|---|---|
| Giữ được | `4-5-view-bao-cao-luu-san.mdx:33`: “SQL Server lưu định nghĩa chọn dữ liệu” | Chốt được view thông thường lưu gì, tránh học nhầm thành bản dữ liệu riêng. |
| Giữ được | `4-5-view-bao-cao-luu-san.mdx:41`: “Hai khối SQL trong bài chỉ để đọc hiểu.” | Chỉ dẫn nằm trước mẫu đầu, bảo vệ đường học web và tình trạng đối tượng chưa tạo. |
| Giữ được | `4-5-view-bao-cao-luu-san.mdx:50`: “muốn dùng ở câu khác phải khai báo lại” | So sánh CTE/view đúng kiến thức tiền đề, không hứa lưu sẵn hay nhanh hơn. |
| Giữ được | `4-5-view-bao-cao-luu-san.mdx:61`: “WHERE ngoài lọc thêm phòng IT” và “chỉ dùng view không bảo đảm thứ tự dòng” | Nêu đủ giới hạn dòng và thứ tự, câu đọc có `ORDER BY` tương ứng. |
| Giữ được | `4-5-view-bao-cao-luu-san.mdx:63`: “chỉ gọi được các cột view cung cấp” | Người học không lấy việc dùng cột trong bộ lọc làm căn cứ chọn cột đó ở câu ngoài. |
| Giữ được | `4-5-view-bao-cao-luu-san.mdx:67`: “Quyền tạo view khác quyền đọc view.” | Tách hai việc và định nghĩa batch ngay tại chỗ; không giao thao tác DDL lên nguồn chung. |
| Giữ được | `4-5-view-bao-cao-luu-san.mdx:69`: “không tự thu hồi quyền đọc bảng gốc” | Không biến view thành lời hứa bảo mật chỉ vì giảm cột trong báo cáo. |
| Giữ được | `4-5-view-bao-cao-luu-san.mdx:73`: “Không cần kết nối SQL Server riêng” | Điều kiện hoàn thành khớp năm câu cuối và lựa chọn web từ bài 1.2. |

## Kiểm HTML, nguồn và giới hạn

Đã tự đọc nội dung HTML mới sau khi loại thẻ/script để đối chiếu. Hai câu SQL giữ đủ tên, literal và mệnh đề; nháy trong SQL là nháy thẳng. Không thấy ký tự backtick hoặc chuỗi escape bị lộ trong phần bài. HTML có đủ năm `<details>` và hướng dẫn dưới nút hoàn thành: bấm khi trả lời được tự kiểm tra mà không nhìn bài.

Kiểm tĩnh đếm được source có hai `Sql`, cả hai `copy={false}`, năm `details`, không có `Result` hoặc `Exercises`. HTML không có phần tử mang class `sql-copy`. Trong HTML có chữ “Sao chép” trong script dùng chung của component, không phải nút được render; đã kiểm ngữ cảnh để không nhận nhầm thành lỗi của hai mẫu.

Chỉ đọc HTML không xác nhận được bố cục nhìn thấy, kích thước chữ, bàn phím, hành vi mở/đóng câu tự kiểm tra, nút hoàn thành, clipboard hoặc viewport thực tế. Không dùng browser vì gói giao không cho phép; chưa kiểm UI tương tác.

Không chạy test, build, SQL, API/runner, nộp bài hoặc kết nối database; không đọc seed, secret hay tài liệu Microsoft ngoài khóa học. Vì vậy chưa tự xác minh bằng thực thi SQL điều kiện batch/quyền, trạng thái view trong database hoặc việc API thực tế chặn `CREATE`. Các trạng thái môi trường ấy là phạm vi đã duyệt và lời hướng dẫn được review về tính nhất quán, không phải kết quả kiểm live của reviewer. Bài không đưa số liệu kết quả cần tôi thay bằng kiểm dữ liệu live, và không có nghi số liệu riêng phát sinh từ lượt đọc này.

Kết quả học thử trên nguồn và HTML: đủ tiền đề cho năm câu tự kiểm tra theo mục tiêu đọc hiểu đã giao; không có vướng mắc nội dung cụ thể cần sửa được phát hiện. Kết quả này không thay cho bằng chứng SQL/UI của tác giả và không cấp quyền Git/publish.

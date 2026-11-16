# Biên soạn bài SQL Server cho BA/PM

Quy trình dùng chung cho Codex và Claude, áp dụng từ 13/11/2026. Mục tiêu là người chỉ biết Excel cơ bản tự đọc hiểu, truy vấn, phân tích dữ liệu và biết phối hợp khi có sự cố. Không biến bài thành khóa DBA hoặc lập trình nâng cao.

## Đọc đúng phần cần dùng

| Công việc | Cần đọc |
|---|---|
| Sửa chữ, không đổi nghĩa | Đoạn bài và đoạn xung quanh; mục 1, 2.2 và 4.4 của [quy ước](quy-uoc.md) |
| Sửa giải thích/điều kiện | Toàn bài/YAML; mục 1–2, 4 của quy ước; đoạn tiền đề trực tiếp. Có dữ kiện công ty thì đọc phần liên quan trong [hồ sơ](ho-so-cong-ty.md) |
| Viết mới/đổi bố cục | Như trên; biến thể và khối cần dùng trong [template](lesson-template.md); bài mẫu 1.1 cho bài nền, 2.1 cho truy vấn |
| SQL/số liệu/bài tập | Mục 3, 4.4, 5 của quy ước; câu lệnh, dữ liệu và kiểm liên quan |
| Ảnh động luồng SQL | Mục 2.6a, 3, 4.4–4.5 của quy ước; dữ liệu bước, nguồn dựng, token và ảnh xuất của bài |
| Review | Toàn bài/YAML và tiền đề được giao; mục 4.5 và các quy tắc áp dụng. Không đọc kết luận/report cũ |
| Làm phần 4–5 | Thêm [định hướng khóa học](dinh-huong-khoa-hoc.md); lấy năng lực BA/PM làm đầu ra |

Quy ước là nguồn quyết định chính. Giao đường dẫn kèm heading/phạm vi cần đọc, không dán nguyên tài liệu vào prompt. Không đọc lại tài liệu không đổi sau mỗi chỉnh nhỏ; khi có điểm chưa rõ, mở đúng mục cần kiểm. Reviewer được mở thêm nguồn liên quan khi thiếu tiền đề, không dùng bản tóm tắt của tác giả thay source.

## Cách làm

Chốt mục tiêu, tiền đề và phạm vi trong một gói ngắn ngay trong hồ sơ của lượt; không tạo thêm brief và plan chứa cùng nội dung. Phân từng ý thành **phải hiểu để làm bài / cần nhận biết / tùy chọn**. Kiến thức cần cho đề bắt buộc phải được giảng đủ trong phần bắt buộc, không đẩy sang đọc thêm để giảm độ dài.

Tự lần một dòng/nhóm đại diện từ dữ liệu đến từng ô kết quả trước khi dựng đủ các khối. Dùng cấu trúc đã có; chỉ mở brainstorming khi còn quyết định thật sự về cách giảng hoặc công cụ. Một bài đơn lẻ không cần thêm agent chỉ làm điều phối.

Viết phần cốt lõi để người học hiểu mà chưa cần mở drawer. Cấu trúc mới giải thích mục đích/cách viết trước SQL; SQL đầy đủ đặt sát minh họa luồng, sau đó tóm tắt nguyên nhân ra kết quả và trả lời nghiệp vụ. Drawer cho dữ liệu/phép tính chi tiết; Memo dùng để ôn. Không mặc định LineMap hoặc giảng lại mọi mệnh đề đã học. Mỗi đoạn một ý; cơ chế khó được giải thích đủ, không chỉ rút ngắn số chữ.

Kiểm theo tác động ở mục 4.4; một reviewer độc lập cho bài mới/sửa đáng kể theo mục 4.5; gom sửa và ghi quyết định. Chỉ review tích hợp khi có tác động xuyên bài/công cụ như quy định. Không tăng số reviewer thay cho làm rõ cách giải thích.

Hồ sơ lượt giữ: phạm vi, quyết định, thay đổi, report gốc, cách xử lý và bằng chứng/giới hạn. Spec/plan trỏ tới hồ sơ, không sao chép cùng nội dung. Dùng mẫu bên dưới để giao sửa và tiếp tục phiên; không yêu cầu đọc lại toàn bộ lịch sử.

Database chung chỉ đọc; câu ghi qua runner luôn hoàn tác, không backup/restore thật. Quyền push/deploy tách khỏi quyền biên soạn.

## Gói giao tác giả

~~~text
Bài/đường dẫn:
Sau bài, người học tự làm được:
Tiền đề đã học:
Cấu trúc mới cần giảng / kiến thức cũ chỉ cần nhắc:
Ý phải hiện trên trang / chi tiết dành cho drawer:
Tình huống và phạm vi dữ liệu (bài nền không bắt buộc):
Phần giữ nguyên / được sửa / để bài sau:
Mức từng ý: phải hiểu để làm bài / cần nhận biết / tùy chọn:
Đề/câu tự kiểm cần đáp ứng và vị trí giảng tiền đề:
Nguồn cần đọc: đường dẫn + heading/phạm vi:
Trạng thái kiểm: đã kiểm + bằng chứng/phiên bản; cần kiểm; chưa xác minh:

Theo docs/bien-soan.md và các mục quy ước liên quan.
Giải thích một dòng/nhóm đại diện trước khi dựng đủ khối.
Giữ đủ tiền đề từng đề; không tự nghiên cứu/mở rộng ngoài nhiệm vụ.
Hoàn thiện, kiểm theo tác động và giao review độc lập theo mục 4.5.
Bàn giao một hồ sơ với kết quả thật và phần chưa kiểm. Không push/deploy.
~~~

## Gói giao reviewer

Dùng bốn dòng vai trò ở mục 4.5 quy ước, rồi thêm:

~~~text
Bài/YAML:
Mục tiêu, tiền đề và quyết định đã duyệt:
Mức từng ý; danh sách đề và nguồn tiền đề (đường dẫn + heading):
Phiên bản source/diff; build tương ứng hoặc chưa có:
Phạm vi công cụ: chỉ source/HTML hoặc tương tác UI được giao:
Đường dẫn report mới, chỉ được ghi report này:

Đọc hết bài và các khối/drawer; tự xác định cách làm từng đề trước khi xem answer.
Kiểm cấu trúc mới → SQL sát RunFlow → tóm tắt → kết quả; không lặp lời hoặc giấu tiền đề trong drawer.
Không dùng bài sau hoặc kiến thức chuyên gia bù lời giảng; ghi tiền đề từng đề/câu tự kiểm.
Report ngắn: vị trí/câu gốc, tác động, đề xuất; phần giữ được; điều chưa xác minh.
Không đọc report cũ, seed/secret; không SQL/API, sửa bài/test/Git hoặc tạo agent khác.
~~~

Codex chọn rõ Terra/high, fork_turns none; Claude chọn Sonnet/high. Nếu phiên không hỗ trợ ngữ cảnh mới hoặc effort thì ghi giới hạn, không giả lập reviewer bằng một vai trong chat tác giả. Chỉ nhận đã cấu hình model, không nhận đã xác minh model thực tế khi công cụ không cung cấp bằng chứng.

## Bằng chứng, sửa và tiếp tục phiên

Ghi trong cùng hồ sơ; report reviewer gốc giữ riêng và liên kết tới đó. Gói reviewer vòng đầu chỉ nhận phạm vi/quyết định và bằng chứng kỹ thuật cần thiết, không nhận kết luận hay report review cũ.

| Nội dung đã kiểm | Nguồn/lệnh và kết quả | Phiên bản hoặc SHA-256 file/phụ thuộc | Giới hạn; khi nào cần kiểm lại |
|---|---|---|---|
| … | Đường dẫn log hoặc nguồn, không chép cả output | Commit kèm diff khi có sửa chưa commit; hoặc hash | Source/SQL/dữ liệu/component nào đổi thì kiểm nào hết hiệu lực |

Hash ghi bây giờ không chứng minh lần kiểm cũ đã dùng đúng bản đó. Thiếu phiên bản hay phụ thuộc thì ghi **chưa đủ căn cứ dùng lại**, kiểm phần cần thiết nếu nhiệm vụ cần kết luận. Không nhận đã kiểm SQL live từ source hoặc đã thử UI từ HTML. Bộ kiểm phát hành vẫn theo mục 4.4 của quy ước; không sao chép lệnh lọc theo file từ repo khác.

~~~text
Giao sửa: finding + vị trí | vấn đề và tác động | tiêu chí hết lỗi.
Xử lý: làm theo / một phần / không làm + căn cứ; đoạn và phụ thuộc bị ảnh hưởng.
Kiểm lại: đoạn sửa + lời giải thích/kết quả/đề phụ thuộc; bằng chứng hoặc chưa kiểm.
Bàn giao: bài đang làm; đã xong; finding còn mở; bước tiếp theo; nguồn/bằng chứng cần đọc.
~~~

Sửa theo đoạn, gom các finding liên quan; tiếp tục cùng reviewer khi cần xác nhận. Không cố định hai vòng hay tạo agent mới sau mỗi sửa. Nếu lặp mà chưa hết lỗi, xác định nguyên nhân và báo điểm mắc. Câu chữ khiến học viên hiểu sai là lỗi cần xử lý dù chỉ dài một câu.

## Đo hai lượt biên soạn thực tế tiếp theo

Trong hồ sơ mỗi lượt, ghi riêng tác giả/reviewer: model/effort, giai đoạn, số lần gọi model, input/cache/output theo tên trường log, số lần đọc tài liệu và vòng sửa. Khử trùng theo ID response/message khi có; thiếu log thì ghi thiếu. Không cộng cache hai lần, không quy input có cache thành phần trăm quota.

Tách chi phí chuẩn bị quy trình/công cụ khỏi viết bài. Chỉ so với lượt có phạm vi và cấu hình tương đương; chưa đặt tỷ lệ tiết kiệm. Nghiệm thu cải tiến khi bớt đọc/kiểm lặp mà vẫn đủ tiền đề từng đề, rõ cách suy ra kết quả và hết lỗi trọng yếu. Không viết/review lại bài đã đạt chỉ để tạo số đo.

## Chọn skill

course-author là điểm vào cho biên soạn/review trong repo. Bốn teach-skills dùng khi được gọi rõ cho dạy tương tác, không tự tạo HTML/workspace, nghiên cứu, bẫy kiến trúc hay suy trạng thái học viên từ thời gian người làm khóa học trả lời.

Không kích hoạt quy trình phát triển phần mềm chỉ vì bài có SQL. Nếu cần sửa component/runner, xác định tác vụ kỹ thuật riêng và dùng skill tương ứng. Tác giả dùng model/effort người dùng chọn; chưa có phép thử để áp một model khác làm mặc định.

## Dựng ảnh động luồng SQL

Giao việc bằng [prompt ảnh động](../scripts/animations/README.md#prompt-giao-việc). Theo mục 2.6a của quy ước, ghi lựa chọn RunFlow/AnimatedFlow, kịch bản và câu SQL kiểm trong hồ sơ lượt hiện có. Dùng bài 2.1 làm mẫu chuyển cột và bài 2.2 làm mẫu chuyển dòng.

Sau khi đổi dữ liệu hoặc nguồn dựng, xuất lại GIF/hình tĩnh rồi kiểm từng cảnh, khung giữa chuyển động trong GIF và phần HTML. Giao review theo tác động ở mục 4.4–4.5. Khi có review tích hợp, giao đúng phần dùng chung và bằng chứng liên quan, gồm tài nguyên lỗi thời, bàn phím, lỗi tải ảnh và giảm chuyển động khi các phần đó bị tác động.

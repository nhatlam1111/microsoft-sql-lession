# 01. CodeFights Arcade qua các phiên bản

Ngày khảo sát: 02/11/2026. Báo cáo này trình bày lịch sử có thể phục hồi, không mô tả một phiên bản duy nhất kéo dài từ 2016 đến nay. Nguồn và mức tiếp cận xem [Source Catalog](02-source-catalog.md); mỗi mã H- được đăng ký tại [Evidence Register](evidence-register.md).

## 1. Ranh giới của bằng chứng

`CONFIRMED` áp dụng cho nội dung thông cáo chính thức hoặc phần nhìn thấy trực tiếp trong ảnh đã mở. Nhãn đó không xác nhận backend hay một thao tác chưa chạy. `STRONGLY SUPPORTED` cần ít nhất hai nguồn độc lập phù hợp phạm vi; `INFERRED`, `UNKNOWN` và `CONFLICTING` giữ nguyên ý nghĩa trong prompt nghiên cứu.

Một bài viết có thể chứa bằng chứng mạnh về sự tồn tại một nút nhưng chỉ có lời kể về giao dịch phía sau. Giá, phần thưởng và điều kiện mở khóa phải gắn phiên bản và challenge; không nâng một ví dụ thành luật toàn nền tảng. Thời điểm đăng bài, ngày người nghiên cứu truy cập và ngày chụp ảnh cũng là ba mốc khác nhau.

## 2. Timeline có căn cứ

| Mốc | Điều nguồn cho phép kết luận | Nhãn và nguồn | Không được suy ra |
|---|---|---|---|
| Trước 09/2016 | Bộ nguồn đã kiểm chưa đủ tái dựng trải nghiệm trước Arcade | UNKNOWN | Không tự gắn map, Coin hoặc hidden-test purchase cho phiên bản sớm nhất |
| 21/09/2016 | Code Arcade ra mắt; map theo chủ đề, Intro Gates 8 bài, mở địa điểm bằng hai sao; Databases còn là hướng mở rộng | CONFIRMED, H-01 | Chưa có ngày Databases ra mắt hoặc công thức sao |
| 18/05/2017 | Bài trải nghiệm và ảnh đi kèm cho thấy UI CodeFights, khóa bài/world và workspace test | CONFIRMED cho ảnh; H-03-I, H-03-M | Ngày đăng không tự chứng minh ngày chụp |
| 24/06/2017 12:54:17 UTC | Wayback giữ HTML shell đường dẫn Arcade Intro | CONFIRMED byte/snapshot, H-11; REA T-03 | Chưa có bundle hoạt động hoặc nội dung challenge từ shell |
| 28/08/2017 | CEO nêu XP, Coin, badge và mở bài khó hơn trong mô tả các mode luyện cá nhân | CONFIRMED cho phát biểu, H-07 | Không biết mỗi bài được bao nhiêu hoặc luôn nhận đủ ba loại |
| 10/07/2018 | Đổi tên CodeFights thành CodeSignal, giới thiệu Coding Score và giao diện mới | CONFIRMED, H-02 | Không coi Coding Score là số dư Coin hoặc ngày thay mọi luật Arcade |
| 14/01/2020 | Người học Arcade Intro báo qua tests thường nhưng trượt hidden tests | Lời kể trực tiếp; bổ trợ phân biệt test, H-08 | Chưa xác minh nguyên nhân trượt hoặc request nào chạy hidden |
| 04/03/2021 | Text/index của luận văn ghi ngày khảo sát Arcade Intro/CheckPalindrome | INFERRED từ nguồn gián tiếp, H-04 | Chưa kiểm PDF/pixels trực tiếp; không coi mọi hình cùng ngày |
| Năm học 2020/2021 | Luận văn ghi nhận mở nội dung bằng Coin và giao diện xem hidden có giá | INFERRED cho cơ chế cụ thể từ tài liệu index, H-04 | Chưa trực tiếp kiểm pixels/giao dịch của hình |
| Đến 08/2024 | Catalog học thuật lưu một screenshot workspace có dẫn video CodeFights | CONFIRMED cho screenshot đã xem, H-06 | Chưa kiểm timestamp hay ngày đăng video gốc |
| 21/08/2024 | Tài khoản trải nghiệm Arcade Intro còn nhắc dùng Coin xem hidden | Lời kể bổ trợ, H-05 | Không biết chính xác giao dịch diễn ra khi nào |
| 26/11/2024 | Search index của bài Reddit ghi người dùng báo Arcade mất và gặp 404 | Báo cáo người dùng, H-09 | Không phải ngày ngừng dịch vụ chính thức |
| 02/11/2026 | Phiên khảo sát hiện tại không mở được Arcade Database tại đường dẫn cũ | Quan sát hiện tại; xem [03](03-technical-observation.md) | Không phục hồi được progression cũ từ sandbox hiện tại |

Các mốc trên không tạo thành changelog đầy đủ. Khoảng 2018–2024 còn thiếu bằng chứng để xác định lúc thay luật sao, giá Coin, thông tin test hoặc quy tắc tiến độ.

## 3. Phân xử những điểm quan trọng

### 3.1. Map và mở khóa

H-01 là căn cứ của thiết kế map ban đầu. H-03-M xác nhận có trạng thái khóa, nhưng không chứng minh guard mở khóa. H-04 gợi ý có thể dùng Coin mở bài/world ở thời kỳ sau; chưa thể xác định đó là đường thay thế hay điều kiện chính.

Vì thế, kết luận an toàn là **Arcade có tiến độ và khóa nội dung**, còn công thức phải theo từng phiên bản. Không viết “mọi bài chỉ mở khi qua toàn bộ bài trước” như một luật lịch sử đã biết. Quy tắc tuần tự dành cho SQL Arcade, nếu chọn, là đề xuất mới.

### 3.2. Workspace và editor

Ảnh H-03-I và H-06 đủ dựng cấu trúc tham chiếu: mô tả ở trái, editor ở phải, vùng test dưới editor và các nút hành động riêng. Những thành phần nhìn thấy được liệt kê một lần trong [Evidence Register](evidence-register.md); các [wireframe](10-wireframes.md) cần trỏ về đúng hình.

Nhãn Saved chỉ chứng minh có chỉ báo lưu. Nó chưa xác minh autosave theo thời gian, lưu server, khôi phục nháp, thay ngôn ngữ hoặc tiếp tục ở thiết bị khác. Một dropdown ngôn ngữ không chứng minh toàn bộ danh sách được hỗ trợ ở mọi thời kỳ.

### 3.3. Run Tests, Submit và điều kiện hoàn thành

Hai nút khác nhau và sự phân biệt sample/hidden có bằng chứng. Chưa có capture thao tác hoặc request lịch sử để xác nhận chính xác tập test được chạy bởi mỗi nút. Không dùng kết quả của sandbox assessment hiện tại để bù khoảng trống này.

Lời kể H-03-T về đi tiếp sau sample và thưởng thêm nhờ hidden chưa đủ khóa thành một luật chấm cho toàn Arcade. Các ví dụ thời kỳ khác không xác nhận lại cùng quy tắc. Vì vậy, điều kiện hoàn thành, partial score và thời điểm nhận thưởng được giữ UNKNOWN khi chưa gắn được phiên bản.

### 3.4. Mua quyền xem hidden tests

Sự tồn tại cơ chế này được **STRONGLY SUPPORTED** bởi H-03-T và H-05, có H-04 bổ trợ. Điều đó không xác nhận mua từng test hay cả gói, quyền có vĩnh viễn hay không, hoặc có ảnh hưởng điểm thưởng.

Riêng giá **5.000 Coin** chỉ xuất hiện trong tài liệu gián tiếp H-04 cho một ví dụ Intro. Nhãn cho con số này là **INFERRED**, không phải giá chuẩn đã được kiểm chứng độc lập. Không có căn cứ áp giá đó cho Databases Arcade hoặc MVP SQL Server.

### 3.5. XP, Coin, Score, sao và badge

H-07 tách tên các loại thưởng; H-02 mô tả một chỉ số đánh giá kỹ năng khác. Các ảnh có nhãn Score không tự chứng minh score là tiền trong ví. Bản [testing/scoring](07-testing-and-scoring.md) phải giữ từng khái niệm riêng và không suy ra tỷ giá.

Chưa có công thức tin cậy cho XP lên level, Coin theo số test, replay, giảm thưởng vì dùng hint hoặc bảng xếp hạng riêng Arcade. Phân tích động lực học tập là diễn giải UX, không phải bằng chứng về thuật toán thưởng.

### 3.6. Arcade và các sản phẩm khác

H-03-T và H-07 đề cập nhiều mode cùng nền tảng. Thông tin về Challenges, Interview Practice, Company Bots hoặc leaderboard toàn site không tự thuộc Arcade. Databases Arcade cũng cần phân biệt với câu hỏi SQL trong môi trường assessment.

Bộ tài liệu [11](11-databases-arcade-analysis.md) xử lý riêng cấu trúc SQL lịch sử. NULL, dòng trùng, collation, thứ tự và transaction của SQL Server phải được thiết kế từ yêu cầu mới khi thuật toán lịch sử chưa phục hồi được.

## 4. Các câu hỏi chưa xác minh

Danh sách dưới đây là khoảng trống lịch sử cần giữ trong [Open Questions](open-questions.md), không phải lý do tự tạo thêm luật.

| Mã đề nghị | Câu hỏi còn mở | Bằng chứng cần để đóng |
|---|---|---|
| U-H01 | Ngày và phiên bản Databases Arcade ra mắt | Thông báo cùng thời kỳ hoặc bản lưu có ngày |
| U-H02 | Cách tính hai sao, điều kiện mở map và thời điểm đổi luật | Manual/versioned capture hoặc video đầy đủ |
| U-H03 | Coin có cho bỏ qua bài/world không, thuộc giai đoạn nào | Pixels/capture và luồng mở khóa có guard |
| U-H04 | Run Tests chạy sample, custom hay cả hidden | Video/capture từ click đến kết quả cùng phiên bản |
| U-H05 | Submit chạy tập nào, có partial score và điều kiện hoàn thành nào | Kết quả nộp và progression trước/sau |
| U-H06 | Giá hidden được tính thế nào; mở từng test hay nhóm | Dialog mua và giao dịch của các bài khác nhau |
| U-H07 | Quyền xem hidden có lưu vĩnh viễn hoặc liên thiết bị | Tái mở bài/phiên khác sau khi mua |
| U-H08 | Xem hidden/hint làm thay đổi thưởng hoặc score không | Rule chính thức hoặc so sánh kiểm soát |
| U-H09 | Công thức XP, level, Coin, badge, rank và giới hạn | Tài liệu luật có phiên bản |
| U-H10 | Replay/resubmit có thưởng lại hoặc cải thiện điểm không | Lịch sử nộp và số dư trước/sau |
| U-H11 | Autosave, đổi ngôn ngữ, reset và phục hồi lời giải ra sao | Thao tác quan sát được và trạng thái qua reload |
| U-H12 | Danh sách ngôn ngữ, shortcut và autocomplete từng thời kỳ | UI/menu hoặc manual đúng phiên bản |
| U-H13 | Animation, timing, hover và responsive nguyên bản | Video/ảnh nhiều viewport có nguồn |
| U-H14 | Grader SQL so NULL, duplicate, order, numeric, date/collation thế nào | Rule chính thức hoặc phép thử lịch sử có đối chứng |
| U-H15 | Ngày đóng Arcade chính thức và phạm vi dữ liệu bị ngừng | Thông báo của nhà cung cấp |
| U-H16 | Nội dung/backend/fixture nào còn được lưu hoặc cấp quyền tái sử dụng | Artifact có nguồn gốc và quyền rõ ràng |

Không đóng câu hỏi chỉ vì đã tìm nhiều lần mà không có kết quả. Khi không thể phục hồi, thiết kế thay thế được ghi `RECOMMENDATION`, kèm lý do và tiêu chí kiểm thử; nó không sửa lại lịch sử.

## 5. Kết quả và giới hạn của lượt khảo sát

Đã kiểm nguồn chính thức, tài khoản trải nghiệm, ảnh gốc và một PDF render được; chưa xem video động hoặc chạy một phiên Arcade lịch sử. Web tool không mở được Wayback, nhưng HTTP trực tiếp sau đó lấy được CDX và HTML shell Intro 2017. Bundle được shell dẫn trả 404 ở yêu cầu replay, truy vấn CDX cho bundle bị timeout; không coi đó là đã khôi phục app hoặc chứng minh archive không có script ở mọi nơi. UPV chỉ đọc được qua index; screenshot/download trực tiếp bị Anubis, không vượt challenge. [H-11, T-03]

Kết quả đủ xác định các thành phần nên nghiên cứu để tái hiện và chỉ ra nơi cần thiết kế mới. Độ chính xác có thể đạt cao ở bố cục và tên trạng thái nhìn thấy; chưa thể cam kết bản sao đầy đủ của scoring, unlock hoặc backend cũ.

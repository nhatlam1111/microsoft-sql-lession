# Review độc lập bài 3.2 — drawer GROUP BY/SELECT

## Phạm vi, phiên bản và cách kiểm

- Gói giao việc: `temp/verification/2026-11-01-drawer-select/brief-review-3-2.md`; tiếp tục cùng lượt review vào 02/11/2026, không khởi động lượt mới.
- Bài: `src/content/lessons/3-2-group-by-pivottable.mdx`; đáp án đối chiếu: `src/content/exercises/3-2-group-by-pivottable.yaml`.
- Source được giao: `8de5a4f407ef4c0740ba571f108ecedfbed975b4`. Build theo manifest: `2026-11-01T15:20:45.6555704Z`; HTML bài: `dist/bai/3-2-group-by-pivottable/index.html`.
- Đã tự tính SHA-256: cả 7 mục trong `build-manifest.json` khớp, gồm MDX 3.1/3.2, ba file công cụ và HTML hai bài. Nhãn commit lấy từ gói giao việc/manifest; không chạy Git để xác minh HEAD. Ba HTML đề trong `dist/bai/3-2-group-by-pivottable/bai-tap/{1,2,3}/index.html` đã đọc nhưng không có checksum riêng trong manifest.
- Công cụ thực tế: đọc file, tìm bằng `rg`, PowerShell tính hash và trích nội dung HTML; đọc cả markup của các drawer ẩn. Model: **kế thừa model của phiên**, không đổi model/effort, không tạo agent khác.
- Đã đọc AGENTS, quy ước, template, hồ sơ công ty, quyết định đã duyệt; đọc trọn các bài nền được giao: 2.1, 2.2, 2.4, 2.6, 3.1 hiện tại. Đọc thêm HTML trang Giới thiệu để đối chiếu đường thực hành. Không đọc review cũ, nhận xét tác giả, verification tác giả hoặc bài sau để bù kiến thức.
- Góc học thử: chỉ biết Excel văn phòng cơ bản; không mặc định biết PivotTable. Review toàn bài để kiểm tính tự đủ, trọng tâm hai drawer được sửa và khối minh họa tùy chọn.

## Kết quả và ưu tiên

**Không có finding Cần sửa / Cần làm rõ / Cần cắt / Biên tập có đủ căn cứ trong phạm vi đã kiểm.** Hai nhóm mẫu giải thích được cách tạo từng ô, không lấy số dòng trích làm số đếm của nhóm. Đã xác định cách làm cả ba đề từ bài học trước khi mở answer YAML; chưa thấy thiếu tiền đề, và sau đó đối chiếu thấy cách làm khớp YAML.

Đây là kết quả đọc nguồn và HTML, không phải xác nhận SQL live, bộ chấm hoặc tương tác UI đã đạt. Các phần chưa xác minh được ghi riêng ở cuối.

## Rà theo thứ tự bài

| Vị trí trong MDX 3.2 | Câu gốc ngắn | Đánh giá và tác động tới người mới | Căn cứ, đề xuất |
|---|---|---|---|
| Dòng 18–26, tình huống/giả định | “Một hồ sơ là một dòng trong bảng có khóa chính `MaNV`.” | **Giữ được.** Chốt đúng đơn vị đếm và phạm vi hiện tại; không lẫn đếm hồ sơ với phòng trong quá khứ. | Yêu cầu chỉ đang làm, dùng mã phòng hiện lưu, thứ tự rõ. Không cần thêm điều kiện thời gian ngoài đề. |
| Dòng 30–45, Excel | “PivotTable tạo bảng tổng hợp từ danh sách.” | **Giữ được.** Có định nghĩa tại chỗ và giải nghĩa Filters/Rows/Values; phân biệt Count của PivotTable với COUNT trên sheet. | Hình nói rõ minh họa, đánh dấu đúng A2/B2/B8. Tổng cộng 45 tách khỏi các phòng; không bắt người học biết sẵn PivotTable. |
| Dòng 47–68, SQL và LineMap | “`MaPB` là khóa nhóm” | **Giữ được.** Đọc câu lệnh đầy đủ trước khi giải từng phần, hiểu mã nhóm và phép đếm có vai trò khác nhau. | Mọi dòng LineMap có ví dụ; quy tắc cột trực tiếp trong SELECT phải có trong GROUP BY được giảng trước phần ôn/bài tập. Không cần bổ sung cú pháp khác. |
| Dòng 70–76, nhóm nhiều cột và giới hạn | “một nhóm cho mỗi cặp giá trị” | **Giữ được.** Đủ tiền đề đổi sang phòng/trạng thái và đổi hàm tổng hợp; không hứa luôn tăng số nhóm. | Nêu rõ trường hợp vẫn lọc đang làm không tách thêm; nhóm không tự sinh số 0/Grand Total; NULL và thứ tự được nói tại chỗ. |
| Dòng 80–135, FROM/WHERE | “Chưa có dòng tổng hợp theo phòng.” | **Giữ được.** Người mới thấy lọc hồ sơ trước khi đếm theo nhóm. | Đầu vào WHERE có MaNV/MaPB/TrangThai; bảng soi khớp 5 hồ sơ, gồm cả giữ và loại. Số 48/45 là tổng phạm vi, không phải số dòng trích. |
| Dòng 137–164, GROUP BY | “minh họa thành viên nhóm trong cả `45` hồ sơ” | **Giữ được.** Hai hình giữ thành viên nhóm, không biến nhóm thành một hồ sơ có sẵn số đếm. | BGD đủ NV004/NV009; NS đủ NV010/NV012/NV022/NV030/NV047. Cùng mã thì cùng nhóm, khác BGD/NS thì khác nhóm. Lời dẫn nói rõ có dòng ngoài bảng trích và không tạo bảng mới được lưu. Bảng sáu mã/kích thước nhóm là bảng đối chiếu, nhãn minh họa được phân biệt với alias. |
| Dòng 166–202, SELECT | “`MaPB` lấy mã chung; `COUNT(*)` đếm hồ sơ trong riêng nhóm đó.” | **Giữ được.** Có thể lần theo từng biểu thức tới từng ô rồi ghép thành dòng. | BGD: mã chung → MaPB; NV004/NV009 góp mỗi dòng một lần → 2 dưới SoHoSo. NS lặp cùng cơ chế với đủ 5 thành viên → NS/5. AS được giải thích là tên cột số đếm; hai dòng kết quả mẫu được đánh dấu đúng. Không nói chỉ tại SELECT mới có thể tính hàm tổng hợp. |
| Dòng 204–230, ORDER BY/kết quả/câu trả lời | “không đổi số hồ sơ trong từng nhóm” | **Giữ được.** Tách việc sắp dòng với việc nhóm/đếm; câu trả lời khép đúng yêu cầu. | Sáu dòng cuối KD13, IT10, VH8, KT7, NS5, BGD2; cộng nội bộ được 45, khớp hồ sơ công ty. Câu trả lời nằm ngay sau Result và nhắc giới hạn phòng hiện lưu. |
| Dòng 232–260, Hay nhầm/Ứng dụng/Ghi nhớ | “Thêm `MaNV` vào `GROUP BY`” | **Giữ được.** Lỗi chọn khóa nhóm có hậu quả cụ thể; ứng dụng nêu việc làm được nhờ tổng hợp theo nhóm. | Không thêm tình huống SQL ngoài phạm vi phần chính/Hay nhầm. Ứng dụng mã chức danh, nhiều chiều, tổng ngày theo loại là các biến đổi đã có tiền đề. Bold và code có chọn lọc, không thấy backtick lộ trên HTML. |
| Dòng 262–289, ôn và bài tập | “xác định một dòng kết quả cần đại diện cho nhóm nào” | **Giữ được.** Nhấn đúng quyết định cần làm trước khi viết SQL. | Ba câu tự kiểm tra đều có lời giảng trước đó, phủ nhóm nhiều cột, phạm vi nhóm có thật và sắp xếp; đặt sau Ghi nhớ, trước Bài tập. Không dùng đáp án ôn để dạy bù. |

### Mạch dữ liệu trong từng drawer

| Bước | Đầu vào và bảng soi/minh họa | Kết quả nối sang bước sau |
|---|---|---|
| FROM | Nêu bảng NhanVien; chưa lọc/chọn cột kết quả/gom nhóm. | 48 hồ sơ; trích 5 dòng, 3 cột theo dõi. Đây là phần theo dõi của bảng, không có lời hứa nguồn chỉ có 3 cột. |
| WHERE | 5 dòng từ FROM có đủ cột trạng thái; NV001/NV002/NV003 giữ, NV020/NV033 loại, đúng với các giá trị hiển thị. | 45 hồ sơ; 3 cột theo dõi; Result trích 10. Bảng soi ghi tổng trên cả 48 dòng. |
| GROUP BY | Đầu vào trích 5/45, đủ MaPB để thấy cơ chế; hai ví dụ minh họa đầy đủ từng nhóm mẫu, dùng cả thành viên ngoài bảng trích. | 6 nhóm; bảng 2 cột đối chiếu đủ sáu mã/kích thước. Không hiểu 5 dòng đầu vào thành toàn phạm vi. |
| SELECT | Đầu vào trích 5/6 nhóm; NS ngoài phần trích vẫn có trong kết quả GROUP BY đầy đủ và được dựng đủ 5 thành viên trong ví dụ SELECT. | 6 dòng/2 cột; mỗi nhóm tạo cặp mã và số đếm riêng. Dòng 3 BGD/2 và dòng 6 NS/5 được đánh dấu trong HTML bằng `res-mark`. |
| ORDER BY | Đầu vào có MaPB và SoHoSo, đủ hai tiêu chí sắp; có các dòng đang không theo thứ tự số lượng. | Giữ đủ 6 dòng/2 cột, chỉ đổi thứ tự thành báo cáo cuối. |

Bảng đầu vào SELECT là bảng đối chiếu nhóm, không liệt kê hồ sơ. Trong phạm vi thiết kế đã duyệt, phần Thực hiện ngay sau đó cung cấp lại đầy đủ thành viên BGD/NS, đủ để hiểu COUNT(*) đếm hồ sơ bên trong nhóm thay vì đếm dòng của bảng đối chiếu. Không có căn cứ yêu cầu mở cả sáu nhóm hoặc 45 hồ sơ.

Các thành viên của nhóm mẫu lặp lại giữa hai drawer có mục đích khác nhau: GROUP BY giải thích hồ sơ vào nhóm nào; SELECT giải thích mã và phép đếm tạo ô nào. Giữ ví dụ tự đủ ở mỗi drawer phù hợp hơn việc bắt người học quay lại drawer trước; không đề nghị cắt chỉ vì lặp danh sách.

### Các câu “tại sao/để làm gì” đã tự đặt

| Câu tự hỏi khi học | Bài trả lời ở đâu |
|---|---|
| Vì sao cần GROUP BY thay vì dòng tổng chung ở 3.1? | Tình huống cần một dòng mỗi phòng; định nghĩa dòng 47 và khóa nhóm dòng 66. |
| Vì sao lọc đang làm trước khi nhóm? | LineMap dòng 61, WHERE dòng 111 và Hay nhầm 3: hồ sơ đã nghỉ sẽ bị đếm vào phòng nếu bỏ lọc. |
| Làm sao biết hai hồ sơ chung nhóm, năm hồ sơ kia là nhóm khác? | GROUP BY dòng 144–153: cùng mã BGD/NS và đối chiếu khác mã. |
| Vì sao COUNT(*) ra 2 hoặc 5, không phải 45 hoặc số dòng đang trích? | SELECT dòng 174–190: đủ thành viên từng nhóm, mỗi dòng góp 1; câu chốt không dùng tổng 45 cho mọi nhóm. |
| Mã BGD/NS và con số được đặt vào cột nào, AS làm gì? | SELECT dòng 170, bảng biểu thức dòng 177–188 và câu ghép hai ô dòng 180/190. |
| Vì sao không chọn thêm MaNV cho dễ nhìn? | Quy tắc dòng 68 và hậu quả thêm mã khóa chính ở Hay nhầm 1. |
| Vì sao thêm TrangThai lúc vẫn lọc đang làm không đổi số nhóm? | Dòng 70 đã giải thích trước câu ôn. |
| Vì sao không có phòng số 0 hoặc dòng tổng cộng? | Dòng 72: chỉ tạo nhóm từ hồ sơ còn lại; khác Grand Total của hình Excel. |
| Vì sao vẫn cần ORDER BY và dùng được SoHoSo ở đó? | Dòng 74 và drawer ORDER BY: nhóm không bảo đảm thứ tự, alias đã có sau SELECT. |

Không còn câu hỏi cốt lõi chưa được trả lời trong các mục trên. Giới hạn mất độ chi tiết của từng hồ sơ được nói rõ ở dòng 68; nội dung sâu về lọc nhóm/kết bảng được dẫn đúng bài sau mà không dùng để bù đề hiện tại.

## Tiền đề từng bài tập

Đã đọc đề hiển thị tại ba HTML bài tập và ghi cách làm/tiền đề trong lượt công cụ **trước** lần đọc YAML. Bảng dưới giữ cách xác định bằng lời, không chép nguyên đáp án.

| Đề hiển thị | Cách làm tự xác định trước YAML | Kiến thức cần và nơi đã dạy | Thiếu gì / đối chiếu sau đó |
|---|---|---|---|
| 3-2-1 — Hồ sơ đang làm theo chức danh | Lọc trạng thái Đang làm; dùng MaCD làm khóa nhóm; đếm dòng mỗi nhóm; trả mã rồi số đếm, xếp số giảm dần rồi mã tăng dần. | Chọn cột/AS/thứ tự cột: 2.1. WHERE và Unicode: 2.2. Sắp nhiều tiêu chí: 2.4. MaCD là mã chức danh: 2.6. Nhóm và đếm riêng: 3.2 dòng 47–74. | Không thấy thiếu tiền đề. MaCD là đổi cột khóa nhóm, không cần kiến thức SQL mới. Cách xác định khớp answer YAML; `columns` và `ordered` khớp đề HTML. |
| 3-2-2 — Mỗi cặp phòng và trạng thái một dòng | Dùng mọi hồ sơ, bỏ bộ lọc trạng thái của câu chính; nhóm theo cặp MaPB/TrangThai, đếm riêng mỗi cặp; trả hai khóa rồi số đếm; xếp mã tăng rồi số đếm giảm. | Không WHERE dùng cả nguồn: 2.1/2.6. Nhóm nhiều cột, cặp có thật và không tự sinh dòng 0: 3.2 dòng 70–72. COUNT(*): 3.1 và 3.2. ORDER BY nhiều tiêu chí: 2.4. | Không thấy thiếu tiền đề. Phạm vi mọi trạng thái được đề nói rõ; có thể làm từ phần chính, không cần lấy kiến thức mới từ câu ôn. Cách xác định khớp YAML, đúng vị trí ba cột và yêu cầu thứ tự. |
| 3-2-3 — Số đơn và tổng ngày theo loại nghỉ | Chỉ lọc trạng thái Đã duyệt, không lọc tháng; nhóm theo LoaiNghi; đếm đơn và cộng toàn bộ SoNgay mỗi nhóm; trả loại, số đơn, tổng ngày, xếp loại tăng dần. | Một dòng DonNghiPhep là một đơn; COUNT(*), SUM, phạm vi phép tính: 3.1. WHERE/Unicode: 2.2/3.1. Hàm SUM tính riêng mỗi nhóm: 3.2 dòng 66; áp dụng đúng LoaiNghi/SoNgay ở dòng 249. | Không thấy thiếu tiền đề. Đề đã chốt mọi ngày và không phân bổ theo tháng, tránh bê bộ lọc tháng 9 từ 3.1 sang. Cách xác định khớp YAML và ba cột/thứ tự trong HTML. |

Không thấy trường hợp “chưa được dạy” hoặc “đã dạy nhưng khó tìm” gây cản trở một đề. Đây là đánh giá đủ kiến thức để xây dựng cách làm; chưa chạy các câu đó và chưa nộp bộ chấm.

## Đường thực hành và HTML

- Ba thẻ Làm bài trỏ đúng ba trang bài tập đã đọc; mô tả, số cột và yêu cầu sắp xếp tại trang đề khớp YAML. Lời giới thiệu bài 3.2 nói rõ chấm giá trị/vị trí cột/thứ tự dòng, không chấm alias.
- Trang Giới thiệu có ba lối: mã truy cập web, tài khoản SSMS khóa học, bản SQL Server riêng. Lối web nói nơi nhận mã và thời điểm hỏi mã khi Chạy/Nộp lần đầu; không buộc người chỉ dùng web kết nối SSMS. Điều kiện Đã học ở cuối bài là tự viết lại câu lệnh, phù hợp trang Giới thiệu. Chỉ đối chiếu hướng dẫn/HTML, không xác nhận đã đi qua đăng nhập hoặc chạy bài.
- HTML chứa đủ hai ví dụ trong mỗi drawer GROUP BY/SELECT; bảng dữ liệu mỗi ví dụ có đúng 2 hoặc 5 dòng, không vượt giới hạn. Hai phép ánh xạ của mỗi nhóm nối đúng MaPB/SoHoSo. Không thấy lộ backtick hay escape `\n`/`\t` trong panel SELECT.
- Câu SQL chính và query của RunFlow khớp nhau; các focus đều thuộc query. HTML giữ nháy thẳng trong `N'Đang làm'`; phần được mark tương ứng đúng mệnh đề từng bước. Các `sql` bằng chứng trong source khớp phạm vi/trạng thái mà bước mô tả; chúng không xuất hiện thành câu SQL phụ cho người học trong HTML.
- Câu chính 3.2 không có dòng tiếp danh sách SELECT cần thụt một cấp hoặc CASE hai cấp. Không dùng bài này làm bằng chứng thao tác thụt 4 cột/copy-paste của công cụ chung. Khi trích text thuần, ranh giới trước/sau focus mất xuống dòng vì renderer tách thành các khối; source CSS đặt các khối focus/dim là block/grid. Không coi chuỗi text thuần bị ghép là finding hiển thị khi chưa xem browser.

## Nguồn và giới hạn

Nguồn dùng để kết luận: tài liệu hiện hành và quyết định đã duyệt nêu trên; năm bài trước được giao; toàn bộ MDX 3.2; HTML 3.2 và ba HTML đề; YAML chỉ sau khi tự xác định cách làm; HTML Giới thiệu; đọc chọn phần liên quan trong `FlowExamples.astro`, `RunFlow.astro`, `run-flow.ts`, `lesson.css` để hiểu markup đang đối chiếu. Không dùng kiến thức bài sau hoặc đáp án thay lời giảng.

**Chưa xác minh:**

- Số liệu trên database live, dữ liệu mẫu hiện thực tế và kết quả chạy mọi `sql` bằng chứng/câu chính/đáp án. Chỉ đối chiếu nội bộ source–HTML–hồ sơ công ty và phép cộng/đếm các ví dụ được hiển thị; không đọc seed, secret hoặc tài liệu SQL ngoài khóa học.
- Chạy API/runner, nộp bài, chấm thứ tự/alias thực tế, hoàn tác khi chạy, hoặc tình trạng kết nối/dịch vụ.
- Tương tác browser: mở/đóng/đổi bước drawer, bàn phím, focus, scroll, copy-paste, viewport desktop/màn hẹp, clipping hoặc độ đọc thực tế. Không có viewport đo được vì không mở browser.
- SQL/SSMS thật và thao tác Excel/PivotTable thật; không gọi HTML mô phỏng là đã chạy công cụ.
- Các lệnh kiểm §4.4 và hồi quy renderer toàn khóa; không chạy test/build trong lượt chỉ đọc này, không kết luận các kiểm đó đạt hay có lỗi nền. Phần công cụ chung cần bằng chứng kiểm và review tích hợp của lượt được giao riêng.

Trong giới hạn này, bài cung cấp đủ tiền đề cho cả ba đề và mạch GROUP BY → SELECT giải thích được hai nhóm mẫu cùng cách tạo từng ô. Không có sửa sản phẩm được đề nghị từ review này; các kiểm live/UI còn lại vẫn phải được xác minh theo phạm vi người viết và reviewer tích hợp.

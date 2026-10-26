# Review 4.1 — giai đoạn 1, khóa trước khi đọc YAML

## Phạm vi, phiên bản và cách làm

- Bài: `src/content/lessons/4-1-cte-tung-buoc.mdx`, toàn bộ dòng 1–253, gồm hai Sql, hai Result, bốn bước và toàn bộ drawer của RunFlow, Memo, ba tự kiểm tra và lời dẫn Bài tập.
- Source giao: `dd67309`, nhánh `codex/review-lessons-4-1-4-6`; theo gói giao, root mới thêm plan và chưa sửa bài. Không tự thao tác Git để đổi phiên bản.
- Model: kế thừa model của phiên; không chỉ định model khác, không tạo agent con.
- Công cụ thực tế: đọc file bằng PowerShell/rg; không dùng browser, HTML/dist, SQL, API/runner, database hoặc bài nộp. Ban đầu chưa có build mới thuộc gói được giao; UI/render chưa xác minh.
- Đã đọc AGENTS, quy ước (gồm 4.5/4.6), template, hồ sơ công ty, mẫu 1.1 và các bài trước 3.9, 3.2, 3.1, 2.3, 2.4. Đọc `public-4.1.json` đã bỏ answer/check. Chưa mở YAML, seed, secret, báo cáo cũ hoặc nhận xét khác.

Vai học thử được giữ nguyên:

> Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
> Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
> Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
> Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

Chỉ dùng nền Excel cơ bản và kiến thức bài trước; không lấy đáp án hay hiểu biết ngoài khóa học bù tiền đề.

## Rà theo thứ tự bài

| Vị trí | Kết quả học thử trên source |
|---|---|
| 17–25, tình huống và phạm vi | Yêu cầu có đơn vị và tiêu chí rõ: đơn đã duyệt, tháng bắt đầu 9/2026, cộng nguyên SoNgay theo loại, giữ từ 5. Phân biệt với ngày thực nghỉ trong tháng ngay ở đầu. Key chuyển yêu cầu này thành mục tiêu đặt tên hai kết quả. |
| 29–37, từ Excel đến CTE | Không đòi biết PivotTable/VLOOKUP. Ý vùng kết quả đầu vào rồi vùng tổng đủ làm cầu nối. CTE được định nghĩa bằng việc sử dụng, giải nghĩa chữ viết tắt, WITH/AS/tên/ngoặc và dấu phẩy trước CTE thứ hai. Dùng cột TongNgay ở câu ngoài được giải thích; tl được nhận diện là bí danh nguồn. SUM/GROUP BY có nền tại 3.1/3.2. |
| 39–59, cách kiểm từng phần | Khối đọc chín đơn có đủ WITH và SELECT cuối, có ORDER BY MaDon. Lời dặn giữ đúng định nghĩa cần dùng tránh việc đọc lại CTE ở câu thứ hai hoặc để lại định nghĩa chưa dùng. Cách thay SELECT cuối để kiểm ba tổng có đủ vị trí thay và kết quả cần đối chiếu. Phạm vi một câu, không tạo bảng và không hứa tăng tốc được tách rõ. Web và SSMS có hướng dẫn dấu chấm phẩy theo đúng phạm vi công cụ. |
| 61–80, câu chính và lời giải | Hai CTE tương ứng chọn đơn rồi tổng theo loại; câu ngoài lọc cột đã có và sắp tổng giảm/tên tăng. Hai cột Result khớp SELECT; 2 dòng cuối đúng phép cộng từ các dòng đã in (Phép năm 2+3+3+1=9; Nghỉ ốm 1+2+2=5; Việc riêng 1+1=2). Đây chỉ là kiểm nhất quán số in trong source, chưa xác nhận dữ liệu DB. Lời trả chị Hạnh nằm cạnh kết quả và nêu loại bị loại. |
| 82–196, RunFlow | Chỉ diễn giải SELECT ngoài, nguồn có 3 dòng; bài nói rõ không phải lưu/chạy tuần tự các CTE. FROM/WHERE/SELECT/ORDER BY có focus khớp câu chính, câu kiểm độc lập chứa đủ hai CTE. Các bước lần lượt có 3/2/2/2 dòng; rows và total tương ứng. Câu kiểm có ORDER BY để đối chiếu, được giải thích ở bước FROM. Không gán việc sắp phụ cho WHERE. Bước WHERE giữ cả đúng 5; SELECT giữ độ chi tiết một dòng mỗi loại; ORDER BY giải thích khóa phụ khi bằng tổng. Không có LineMap, Excel hay Ssms cần kiểm thêm trong bài này. |
| 198–216, Hay nhầm và Ứng dụng | Ba nhầm lẫn gắn với hậu quả thực: mất phạm vi tên, sai cách viết nhiều CTE, lẫn ngày/đơn/người. COUNT(*)/SUM đã học ở 3.1. Ba ứng dụng đúng việc CTE giúp đọc/kiểm báo cáo; không hứa lưu kết quả hay nhanh hơn. |
| 218–247, Memo và tự kiểm tra | Memo tập trung cú pháp nhiều kết quả có tên và lọc cột tổng. Ba câu ôn phủ cột nguồn ở câu ngoài, giữ định nghĩa khi kiểm, và giới hạn không vật chất hóa. Mọi đáp án đã giảng tại 33–57; không dùng phần ôn để dạy bù. Vị trí sau Ghi nhớ, trước Bài tập đúng khung. |
| 249–253, đường luyện tập | Lời dẫn xác định bộ chấm so kết quả, thứ tự cột/dòng, không cưỡng chế CTE/bí danh. Người học được yêu cầu tự kiểm CTE theo mục tiêu. Ba public prompt có đủ bảng, phạm vi, độ chi tiết, cột và thứ tự. Không cần SSMS mới được làm bài trên web. |

Chữ đậm tập trung CTE, một WITH, một câu và tháng bắt đầu; dẫn chứng/tên nguồn/cột dùng code. Source dùng escape tab một cấp/hai cấp; chưa suy ra cách render hoặc copy/paste từ việc đọc file. Thời lượng 30 phút có thể dành cho lý thuyết, kiểm các phần và ba đề; không có đoạn lý thuyết bị giấu để làm bài trông ngắn. Phần nhắc phạm vi trong Hay nhầm và ôn có chức năng riêng; không thấy đoạn phải cắt vì lặp làm tăng tải đáng kể.

## Các câu tự hỏi tại sao/để làm gì

| Câu tự hỏi khi học | Bài trả lời ở đâu |
|---|---|
| Vì sao cần CTE khi đã biết SELECT và GROUP BY? | 31 và 39–55: đặt tên đầu vào/tổng rồi đổi SELECT cuối để kiểm sai khác ở từng mốc. |
| AS này làm gì, có tạo bảng/sheet không? | 33: gắn tên với truy vấn định nghĩa, SELECT ngay sau đọc trong FROM; không tạo bảng. |
| Hai kết quả cần hai WITH hay một? | 35, nhầm 2 và Memo: một WITH, ngăn bằng dấu phẩy, CTE sau đọc CTE trước. |
| Vì sao WHERE ở ngoài dùng TongNgay được? | 37 và drawer WHERE: đó là cột nguồn từ CTE, khác bí danh SELECT cùng cấp. |
| Muốn xem riêng một bước thì chạy phần nào? | 41–55, khối kiểm đầy đủ và chỉ dẫn thay SELECT cuối; không chạy riêng câu cuối. |
| Có phải các CTE được lưu lần lượt hoặc làm báo cáo nhanh hơn? | 57 và 84: không có bảo đảm lưu/chạy mỗi phần đúng một lần, thực thi do SQL Server chọn. |
| Tổng là ngày thực nghỉ hoặc số người không? | 23, 80 và nhầm 3: ngày trên đơn bắt đầu trong tháng; SUM ngày, COUNT đơn khác người. |
| Vì sao thẻ/drawer chỉ có vài dòng nhưng có tổng khác? | 84: thẻ tối đa ba dòng, drawer tối đa mười cùng tổng thật. Bài này các bước chỉ có 3 hoặc 2 dòng nên không có dòng ẩn cần suy đoán. |
| Đem khối WITH sang web/SSMS cần chú ý gì? | 59: web một khối một câu; ở SSMS câu trước kết thúc bằng dấu chấm phẩy. |

Không có câu cần thiết cho mục tiêu hoặc cách làm ba đề còn bỏ ngỏ trong phạm vi đọc nguồn.

## Tiền đề và cách làm từng đề — trước khi biết answer

| Đề public | Kiến thức cần và nơi đã dạy | Cách làm người học tự xác định | Còn thiếu/khó tìm |
|---|---|---|---|
| 4-1-1: tổng ngày đơn đã duyệt bắt đầu tháng 8 | WHERE, AND, khoảng ngày ở 2.3; mẫu khoảng nửa mở tháng 9 ở 3.1/3.9/4.1; Unicode N trong các câu mẫu và public prompt; SUM ở 3.1; một dòng mỗi loại với GROUP BY ở 3.2; CTE/cột tổng/câu ngoài ở 4.1:33–55; nhiều khóa ASC/DESC ở 2.4. | Chọn đúng đơn tháng 8 đã duyệt, cộng nguyên SoNgay theo LoaiNghi vào CTE có TongNgay. Câu ngoài giữ tổng >=2; chỉ lấy loại và tổng theo vị trí đề, sắp tổng giảm rồi loại tăng. Có thể dùng một CTE tổng thay vì sao chép đủ hai CTE nếu không cần tách riêng bước lọc. | Không thấy thiếu tiền đề. Không tính số liệu trả về bằng suy đoán; sẽ cần SQL live để xác nhận. |
| 4-1-2: phòng từ tám hồ sơ đang làm | Phạm vi/đếm hồ sơ theo MaPB hiện lưu và COUNT(*) đã dạy trực tiếp ở 3.2; CTE và WHERE cột số đếm có cùng nguyên tắc như cột tổng tại 4.1:35–37, 212–214; ORDER BY một cột ở 2.4. | Lọc NhanVien đang làm trước; nhóm theo MaPB và đếm dòng vào CTE tên cột SoHoSo. Câu ngoài giữ từ 8, trả mã/số, xếp mã tăng. Không thêm điều kiện ngày hoặc tái dựng phòng quá khứ. | Không thấy thiếu tiền đề. Số người/hồ sơ đã được tách bởi khóa/đơn vị ở 3.2 và prompt. |
| 4-1-3: mã có nhiều hợp đồng được lưu | HopDong/MaNV đã dùng trong 3.9 (và hồ sơ công ty); COUNT(*) đếm dòng ở 3.1; đổi khóa nhóm từ MaPB sang MaNV là quy tắc khóa nhóm 3.2; CTE và lọc cột đã có ở 4.1; ORDER BY ở 2.4. | Dùng toàn bộ hợp đồng, nhóm theo MaNV và đếm dòng thành SoHopDong trong CTE; câu ngoài giữ ít nhất 2, trả mã/số và xếp mã tăng. Không lọc ngày, loại hay hiệu lực. | Không cần định nghĩa hợp đồng hiệu lực vì đề chủ động loại yêu cầu đó. Không thấy thiếu tiền đề. Số dòng kết quả chưa xác minh DB. |

Bảng này được khóa trước khi mở YAML; không ghi câu SQL đáp án vào report. Chưa lấy answer làm lời giảng.

## Findings ưu tiên và phần giữ được

Không ghi nhận finding Cần sửa/Cần làm rõ/Cần cắt/Biên tập có căn cứ từ nội dung nguồn và public prompt.

**Giữ được:** cách kiểm một CTE được trình bày bằng khối chạy trọn, rồi mở sang hai CTE; giới hạn một câu và không vật chất hóa/tăng tốc nằm trước lời giải; mọi drawer có câu kiểm tự đủ; ba bài tập là chuyển cùng mô hình SUM/COUNT sang phạm vi và khóa nhóm đã học, không đòi kiến thức bài sau.

## Nguồn và giới hạn

Nguồn dùng: các file đã nêu đầu report, public-4.1.json và chính bài 4.1. Không dùng báo cáo trước, nhận xét khác, YAML hoặc tài liệu Microsoft bên ngoài.

Đã xác minh bằng đọc: mạch kiến thức, vị trí/logic các câu, độ tự đủ của khối CTE, sự khớp focus với query, rows/total nội bộ, phép cộng trên số được in, tiền đề từng đề và nội dung ôn. Chưa xác minh: dữ liệu/cú pháp thực thi SQL Server, bộ chấm, build, nháy và tab sau render, copy/paste, mở drawer, điều hướng, auth hoặc SSMS. Root kiểm SQL live/UI riêng; report này không thay bằng chứng các kiểm đó.

Giai đoạn 1 kết thúc và khóa tại đây, trước lần đọc YAML.

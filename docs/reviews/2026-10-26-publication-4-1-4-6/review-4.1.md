# Review độc lập bài 4.1 — CTE: giải bài toán từng bước

## Phạm vi, phiên bản và công cụ

- Đã đọc toàn bộ `src/content/lessons/4-1-cte-tung-buoc.mdx` dòng 1–253: mọi đoạn văn, hai Sql, hai Result, RunFlow bốn bước gồm đầy đủ câu kiểm/focus/meaning/detail/rows/total, ba mục Hay nhầm, ba Ứng dụng, Memo, ba tự kiểm tra và Bài tập.
- Source giao: `dd67309` trên `codex/review-lessons-4-1-4-6`; gói giao cho biết root chỉ thêm plan, chưa sửa bài. Không thao tác Git.
- Model thực tế: kế thừa model của phiên, không chỉ định model khác. Không tạo agent con.
- Công cụ thực tế: PowerShell và rg để đọc source. Không browser, không SQL/API/runner/DB, không nộp bài, không đọc seed/secret. Chưa được giao build mới khớp source, không dùng dist cũ.
- Đọc AGENTS, `docs/quy-uoc.md` (đầy đủ lời dặn 4.5/4.6), template, hồ sơ công ty, mẫu 1.1; bài trước 3.9, 3.2, 3.1, 2.3 và 2.4. Không đọc bài sau, report cũ hoặc nhận xét reviewer khác.
- Hai giai đoạn đã thực hiện: đọc `public-4.1.json`, lập và ghi `review-4.1-phase1.md`; khóa file đó trước khi mở `src/content/exercises/4-1-cte-tung-buoc.yaml`. Không sửa phase1 sau khi đọc answer. Báo cáo này chỉ ghi kết quả đối chiếu, không chép đáp án.

Vai học thử:

> Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
> Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
> Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
> Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

Nền giả định chỉ là Excel văn phòng cơ bản; không dùng kiến thức chuyên gia hoặc answer để bù tiền đề bài.

## Rà theo thứ tự bài

| Đoạn của bài | Đánh giá và bằng chứng nguồn |
|---|---|
| Tình huống, 17–25 | **Giữ được.** Đơn vị là đơn, chọn theo trạng thái và tháng bắt đầu, cộng nguyên SoNgay và ngưỡng từ 5. Giới hạn chưa phải số ngày thực nghỉ trong tháng nằm trước phần giảng. Key nêu việc đặt tên kết quả để kiểm, đúng mục tiêu CTE. |
| Cầu nối Excel/định nghĩa, 29–37 | **Giữ được.** Danh sách trung gian và bảng tổng là khái niệm đủ hiểu từ Excel cơ bản, không đòi thao tác PivotTable/VLOOKUP. CTE, WITH/AS, ngoặc, dấu phẩy cho nhiều CTE, quan hệ CTE trước/sau và bí danh nguồn được giải thích cạnh ví dụ. Cột tổng ở nguồn câu ngoài khác bí danh SELECT cùng cấp được nói rõ tại 37. |
| Kiểm riêng CTE, 39–59 | **Giữ được.** Khối kiểm đầu tự đủ một CTE và một SELECT; không hướng dẫn chạy riêng câu cuối. Chỉ dẫn thay SELECT cuối để xem TongTheoLoai có đủ hai định nghĩa cần thiết. Phạm vi một câu, không lưu bảng, không bảo đảm chạy một lần/vật chất hóa/tăng tốc nằm tại 41 và 57. Web nhận một khối; SSMS cần kết thúc câu trước bằng dấu chấm phẩy, được tách đúng tại 59. |
| SQL/Result/lời giải, 61–80 | **Giữ được.** Câu chính hai CTE phục vụ đúng chọn đơn/tổng theo loại; câu ngoài lọc TongNgay >=5 và sắp hai khóa. Result có hai cột, hai dòng, khép tình huống ngay cạnh kết quả. Từ chín dòng đã in, phép cộng nội bộ cho Phép năm 9, Nghỉ ốm 5, Việc riêng 2 khớp lời văn và mốc 9→3→2. Đây là đối chiếu số trong bài, chưa phải kiểm DB. |
| RunFlow FROM, 100–126 | **Giữ được.** Nguồn TongTheoLoai có ba dòng; focus khớp FROM của query. Câu kiểm có đủ hai CTE và sắp kết quả để so; detail có nói việc thêm sắp. rows ba loại/9/5/2, total 3 khớp nhau. |
| RunFlow WHERE, 127–149 | **Giữ được.** Focus đúng ngưỡng >=5, explanation nói TongNgay là cột nguồn. Giữ cả giá trị đúng 5; rows hai loại/9/5, total 2. Câu kiểm độc lập không mất định nghĩa CTE. |
| RunFlow SELECT, 150–172 | **Giữ được.** Chọn đúng LoaiNghi/TongNgay; không thêm MaDon làm đổi độ chi tiết. rows và total vẫn 2. Câu kiểm độc lập đầy đủ. |
| RunFlow ORDER BY, 173–196 | **Giữ được.** Sắp tổng giảm rồi loại tăng khi bằng tổng; rows vẫn hai dòng, total 2. Focus và câu kiểm khớp câu chính. |
| Phạm vi sơ đồ, 82–84 | **Giữ được.** Sơ đồ nói rõ chỉ diễn giải SELECT ngoài, không dựng mũi tên thành quá trình lưu các CTE. Thẻ xem nhanh và bảng trích/total được phân biệt. Bài này mỗi bước chỉ 3/2 dòng, không có cơ sở nghi tổng vì dữ liệu bị trích. |
| Hay nhầm, 198–206 | **Giữ được.** Mỗi lỗi có hậu quả: CTE không còn phạm vi, sai cách khai báo nhiều CTE, lẫn ngày/đơn/người. Không có kiến thức phải chờ bài sau mới hiểu. |
| Ứng dụng, 208–216 | **Giữ được.** Kiểm từng kết quả, lọc chỉ tiêu đã tính, đặt tên nói rõ phạm vi đều gắn với việc CTE vừa giảng; không hứa thay đổi dữ liệu hay tăng tốc. |
| Ghi nhớ và tự kiểm tra, 218–247 | **Giữ được.** Đặt sau Memo/trước Bài tập. Ba câu kiểm nguồn cột, khối cần giữ khi kiểm và không vật chất hóa; đáp án đã giảng trước tại 33–57. Không phát hiện dạy bù trong đáp án ôn. |
| Bài tập, 249–253 | **Giữ được.** Giải thích bộ chấm so giá trị và thứ tự, không ép cú pháp/bí danh; người học được dặn tự kiểm mục tiêu CTE. Ba đề mới không trùng nguyên câu tình huống tháng 9. |

Không có LineMap, Ssms, Erd hoặc hình Excel trong 4.1 cần kiểm thêm. Chữ đậm chọn lọc, tên bảng/cột/từ khóa/giá trị dẫn chứng có code ở lời văn. Source dùng escape tab theo cấp; cách hiển thị tab, nháy và copy chưa được xác minh bằng build. Độ dài 30 phút có chỗ dành cho đọc, kiểm hai mốc và ba đề; không thấy phần cần cắt có căn cứ vì lặp. Phần nhắc lại ở Hay nhầm/ôn phục vụ phòng lỗi và nhớ lại.

## Tại sao/để làm gì — lời giải người học tìm được

| Câu tự đặt | Chỗ đáp ứng |
|---|---|
| CTE thêm giá trị gì sau GROUP BY? | 31 và 39–55: đặt tên đầu vào/tổng để đọc và đổi SELECT cuối nhằm kiểm điều kiện từng mốc. |
| Tên CTE có phải bảng mới không? | 33, 41 và 57: chỉ là kết quả có tên trong một câu, không tạo bảng; không bảo đảm được lưu sẵn. |
| Nhiều CTE viết và phụ thuộc thế nào? | 35: một WITH, dấu phẩy, CTE sau đọc CTE trước; nhầm 2 chỉ hậu quả khi viết WITH lần nữa. |
| Vì sao lọc TongNgay bằng WHERE ngoài được? | 37 và drawer WHERE: nó đã là cột của nguồn, khác alias vừa đặt cùng SELECT. |
| Kiểm một phần có phải chạy riêng một tên không? | 41–55: giữ WITH và SELECT cuối cần dùng; khối đầu đầy đủ, bước sau thêm định nghĩa cần thiết. |
| Chia nhiều CTE có làm SQL chạy từng bước một lần hay nhanh hơn không? | 57 và 84 trả lời trực tiếp là không có bảo đảm đó; sơ đồ chỉ logic. |
| Tổng này có phải ngày thực nghỉ/số người không? | 23 và nhầm 3 tách tháng bắt đầu, nguyên SoNgay, đếm đơn và đếm người. |
| Sắp xếp có đổi tổng hoặc diễn tả thứ tự chạy CTE không? | Drawer FROM/ORDER BY và 84 tách câu kiểm có sắp để đối chiếu với logic câu ngoài. |
| Cần làm gì khác giữa web và SSMS? | 59 chỉ rõ một khối web và dấu chấm phẩy kết thúc câu trước ở SSMS; không buộc người dùng web kết nối SSMS. |

Không ghi nhận câu hỏi cần thiết cho mục tiêu hoặc ba đề bị bỏ ngỏ trong phần giảng.

## Tiền đề từng đề và đối chiếu YAML sau khi khóa phase1

| Đề | Tiền đề đã tìm trước answer | Cách làm đã xác định trong phase1 | Kết quả đối chiếu YAML |
|---|---|---|---|
| 4-1-1 | WHERE/AND/khoảng ngày 2.3; mẫu khoảng tháng nửa mở 3.1/3.9/4.1; N cho chuỗi Unicode trong bài và prompt; SUM 3.1; nhóm theo loại 3.2; CTE/cột tổng/câu ngoài 4.1:33–55; hai khóa sắp 2.4. | Lọc đơn đã duyệt tháng 8, cộng SoNgay theo LoaiNghi trong CTE, lọc tổng >=2 ở ngoài, trả hai cột và sắp tổng giảm/loại tăng. | Answer dùng đúng mô hình một CTE tổng; phạm vi, ngưỡng, cột và sắp xếp khớp cách tự xác định. Không có kiến thức ẩn phải biết sau khi đọc answer. |
| 4-1-2 | COUNT(*) và MaPB hiện lưu/trạng thái đang làm được giảng trực tiếp 3.2; WHERE trên chỉ tiêu của CTE ở 4.1; ORDER BY 2.4. | Lọc đang làm trước, nhóm MaPB và đếm dòng vào CTE; câu ngoài giữ từ 8, trả mã/số, sắp mã tăng. | Answer khớp hoàn toàn logic trước answer; không phát sinh yêu cầu lịch sử hoặc ngày. |
| 4-1-3 | HopDong/MaNV trong 3.9; COUNT(*) 3.1; quy tắc đổi khóa nhóm 3.2; CTE/WHERE ngoài 4.1; ORDER BY 2.4. | Đếm toàn bộ dòng hợp đồng theo MaNV trong CTE, giữ từ 2 ở câu ngoài, trả mã/số và sắp mã tăng; không tự lọc hiệu lực. | Answer khớp phạm vi và logic trước answer. Không phải dùng khái niệm hiệu lực hay kỹ thuật chưa giảng. |

Public prompt và YAML thống nhất yêu cầu/columns/ordered; không có khác biệt phải quay lại sửa nhận định tiền đề. Chưa chạy answer hoặc xác nhận kết quả trả về của DB/bộ chấm.

## Findings ưu tiên

Không có finding **Cần sửa / Cần làm rõ / Cần cắt / Biên tập** có căn cứ từ lượt đọc source và đối chiếu tiền đề/answer này. Không lấy việc không có finding làm xác nhận SQL hoặc UI đã chạy đúng.

Các điểm **Giữ được** quan trọng:

- `4-1-cte-tung-buoc.mdx:41`, “Chạy trọn khối dưới”: người mới có đường kiểm CTE thực sự tự đủ.
- `4-1-cte-tung-buoc.mdx:57`, “không được bảo đảm lưu sẵn”: chặn nhầm CTE là lưu dữ liệu hoặc cách tối ưu tự động.
- `4-1-cte-tung-buoc.mdx:84`, “chỉ diễn giải SELECT ngoài”: bốn drawer và số dòng có cùng phạm vi diễn giải.
- `4-1-cte-tung-buoc.mdx:251`, “không bắt buộc cú pháp”: không gây hiểu lầm bộ chấm đã chứng minh dùng CTE; bài yêu cầu người học tự đối chiếu mục tiêu.

## Nguồn, điều đã kiểm và giới hạn

Đã kiểm độc lập bằng đọc: toàn bộ bài và drawer, mạch Excel/SQL gộp, logic câu kiểm tự đủ, sự khớp query/focus, đơn vị/giới hạn, số rows/total và phép cộng giữa các số đã in, nội dung ôn, ba đường làm đề trước answer và khác biệt sau đối chiếu answer. Những phần này không phát hiện thiếu tiền đề hay mâu thuẫn nội bộ.

Nguồn: AGENTS; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; mẫu 1.1; 3.9/3.2/3.1/2.3/2.4; 4.1 MDX; public-4.1.json; YAML đúng slug chỉ đọc sau phase1. Phase1 được giữ nguyên tại `temp/review/2026-10-26-review-4-1-4-6/review-4.1-phase1.md`.

Chưa xác minh: dữ liệu và cú pháp chạy thật trên SQL Server, các con số live, đáp án đi qua bộ chấm, HTML/build, UI drawer, tab bốn cột sau render và copy/paste, nháy thẳng, điều hướng/auth hoặc hành vi SSMS. Không chạy test ở lượt review này. Root xác minh SQL live/UI riêng. Không có bằng chứng build mới được giao, không dùng bản cũ làm bằng chứng.

Kết luận giới hạn: về kiến thức và mô hình làm bài trên source, ba đề có đủ tiền đề đã học; không cần thêm nội dung để giải được chúng. Kết quả này không cấp quyền push/deploy và không thay các kiểm nguồn/build/SQL/UI của tác giả.

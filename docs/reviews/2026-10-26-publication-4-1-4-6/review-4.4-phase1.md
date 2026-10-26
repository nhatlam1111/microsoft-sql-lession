# Review 4.4 — giai đoạn 1, khóa trước đáp án

## Phạm vi, phiên bản và công cụ

- Reviewer mới, kế thừa model của phiên; đóng vai người học chỉ có Excel văn phòng cơ bản, không mặc định biết PivotTable.
- Bài đã đọc toàn bộ: `src/content/lessons/4-4-pivot-xoay-bang.mdx`, source được giao `dd67309` trên `codex/review-lessons-4-1-4-6`; root thông báo chưa sửa bài, chỉ thêm plan. Đã đọc cả bốn tự kiểm tra, ba khối Result và toàn bộ SQL/Memo.
- Đề đã đọc: `temp/review/2026-10-26-review-4-1-4-6/public-4.4.json`, đã bỏ answer/check. **Chưa mở YAML bài tập khi ghi báo cáo này. Báo cáo này được khóa về nội dung và sẽ không sửa sau khi mở YAML.**
- Đã đọc AGENTS, quy ước (đặc biệt 4.5/4.6), template, hồ sơ công ty, mẫu 1.1; đối chiếu phần nền cần thiết ở 4.1, 4.3, 3.10, 2.8, 2.5.
- Thực tế dùng PowerShell/Get-Content/rg để đọc source, lấy số dòng; chưa đọc HTML ở giai đoạn này. Không SQL, DB, API/runner, nộp bài, seed/secret, tài liệu ngoài, browser, Git mutation hoặc agent con. Chỉ ghi report được giao.

## Rà theo thứ tự bài

| Vị trí MDX | Nhận định khi học thử |
|---|---|
| 18–26, tình huống | Yêu cầu một hàng mỗi tháng và ba loại nằm cạnh nhau khớp mục tiêu. Phạm vi mọi trạng thái, khoảng tháng 8–10/2026, cộng nguyên ngày theo tháng bắt đầu và không suy thành ngày thực nghỉ/đã duyệt đều nằm trước câu lệnh. Giới hạn dữ liệu chưa chứng nhận đủ kỳ giữ đúng mạch 4.3. |
| 30–47, từ Excel sang nguồn SQL | PivotTable/Rows/Columns/Values được giải nghĩa tại chỗ và gán ngay vào yêu cầu, không đòi biết thao tác Excel nâng cao từ trước. CTE `Nguon` được dùng đúng phần đã giảng ở 4.1. `EOMONTH` vừa được nhắc chức năng vừa dẫn 2.8. Bảng mười dòng là trích đầu của tổng 20 dòng, không phải 20 dòng đều hiển thị. Nhiều dòng phép năm tháng 8 tạo nhu cầu tổng hợp thành một ô. |
| 49–66, cấu trúc PIVOT và ô thiếu | `SUM`, `FOR`, `IN`, ngoặc vuông, bí danh sau xoay được giải nghĩa; người học biết chỗ nào định phép tính/cột nguồn/cột trả ra. Dòng 53 nêu cơ chế chia nhóm ngầm và hậu quả giữ `MaDon`, kể cả khi bỏ ở SELECT ngoài. Dòng 55 nói đủ hai giới hạn: IN cố định và không tạo tháng thiếu. SUM thiếu trả NULL không bị diễn giải là đã chứng nhận 0. Biến thể COUNT có đủ ba vai trò, cơ sở khóa không NULL và mảnh cú pháp copy=false; biến thể tháng ngang có đủ nguồn, FOR/IN và chốt năm. |
| 68–87, CASE | Có điểm nối từ 3.10. Phần bỏ ELSE để có NULL đã được giải nghĩa trước ví dụ; không âm thầm đổi ô thiếu sang 0. Cả nguồn và CASE dùng cùng phạm vi với PIVOT. Câu về bảo trì/tốc độ không hứa PIVOT nhanh hơn và chốt giới hạn bài. |
| 89–107, câu chính/kết quả | Câu chính đủ nguồn ba cột, khoảng ngày đúng, phép cộng và IN đúng ba loại. SELECT cuối quyết định vị trí cột và ORDER BY theo tháng. Kết quả CASE và PIVOT trong source giống nhau. Dòng 107 khép tình huống cạnh bảng: tháng 9 cộng 12 + 5 + 3 = 20 ngày trên đơn; mark dòng 1 và 3 trỏ đúng hai dòng có ô thiếu. Chưa xác nhận số liệu bằng DB. Không cần thêm RunFlow chỉ để đủ khối. |
| 109–135, Hay nhầm/Ứng dụng/Ghi nhớ | Ba lỗi có hậu quả cụ thể, đều thuộc trọng tâm; Ứng dụng là đối chiếu chỉ tiêu, đổi góc nhìn và kiểm ma trận. Ghi nhớ nhắc cấu trúc PIVOT/CASE/COUNT, không đưa kiến thức mới. Mức 35 phút hợp lý với nội dung cộng ba đề; chưa đo thời gian thực học. |
| 137–171, ôn và bài tập | Bốn câu ôn đặt sau Memo, trước Bài tập. Phần bài tập công khai đúng cơ chế so giá trị/vị trí/thứ tự và không hứa bộ chấm ép PIVOT hoặc bí danh. Ba đề có biến đổi rõ, không lặp nguyên câu chính. |

## Các câu tại sao/để làm gì tự đặt ra

| Câu hỏi của người học | Bài đã đáp ở đâu? |
|---|---|
| Để so loại nghỉ theo tháng, vì sao cần đổi cách nhìn? | Tình huống và Key (21–26), gán Rows/Columns/Values (32), ứng dụng đối chiếu cùng dòng (123). |
| Vì sao không đưa tất cả cột đơn vào nguồn? Hàng được nhóm bằng gì? | Dòng 53 giải nghĩa phần cột nguồn còn lại và ví dụ MaDon làm tách nhóm, kể cả SELECT ngoài đã bỏ. |
| Vì sao tháng là ngày cuối tháng, có phải sửa TuNgay không? | Dòng 34 nói khóa chung và không đổi ngày bắt đầu thật; 4.3 cũng đã giải thích khóa tháng. |
| Vì sao NULL không đổi luôn sang 0? | Dòng 57 phân biệt không có giá trị để cộng và đã xác nhận 0; COALESCE là lựa chọn hiển thị có điều kiện, nền đã học ở 2.5. |
| Đếm đơn có giống cộng ngày không? | Dòng 59–64 đổi ba vai trò và giải thích COUNT khóa không NULL/ô vắng 0; Hay nhầm 2 nhắc đơn vị. |
| Loại nghỉ hoặc tháng mới có tự xuất hiện không? | Dòng 55 nói IN cố định và không sinh dòng tháng thiếu. |
| Muốn tháng 8, 9 nằm ngang cần đổi những gì, có lẫn năm không? | Dòng 66 nêu nguồn, cột xoay, IN, dòng loại và bộ lọc năm/khoảng tháng. |
| Vì sao ví dụ CASE bỏ ELSE 0; nên chọn kỹ thuật nào? | Dòng 70 và 87 giải nghĩa biểu diễn NULL, bảo trì và giới hạn không mặc định tốc độ. |

## Bốn tự kiểm tra

| Câu | Tiền đề đã có trước phần ôn | Kết quả học thử |
|---|---|---|
| Không giữ MaDon | Dòng 53 | Trả lời được từ phần giảng, không cần kiến thức ngoài. |
| SUM và COUNT có cùng NULL không | Dòng 57, 59 | Trả lời được, cùng nguồn và phép tính bài đã khoanh phạm vi. |
| Chọn ba vai trò khi đếm theo trạng thái | Dòng 59–64 | Trả lời được đủ hàng/cột/giá trị, không phải dùng đáp án ôn để học bù. |
| Giữ điều kiện nào khi dùng MONTH | Dòng 66 | Trả lời được chốt đúng năm và khoảng tháng. |

## Bảng tiền đề và cách làm riêng từng đề — trước YAML

| Đề công khai | Kiến thức cần và chỗ đã giảng | Cách làm tự xác định, không dùng đáp án | Thiếu tiền đề/khó tìm |
|---|---|---|---|
| 4-4-1 — Ma trận ngày trên đơn đã duyệt | Phạm vi ngày và Unicode/trạng thái đã dùng ở 4.1; EOMONTH ở 2.8/4.4 dòng 34; nguồn ba vai trò/PIVOT SUM ở 34–57, 91–103; tên và thứ tự cột ở 107. | Đổi điều kiện nguồn của mẫu chính sang chỉ đơn Đã duyệt, giữ ngày từ đầu tháng 8 đến trước đầu tháng 11/2026. Chỉ chiếu tháng cuối tháng/loại/ngày; xoay ba loại bằng SUM, đặt bốn cột theo đề và sắp tháng. Giữ NULL, không bù tháng. | Không thấy thiếu tiền đề. Thao tác thêm trạng thái trước xoay đã quen từ 4.1; đề tự nêu phạm vi và quy ước ô thiếu. |
| 4-4-2 — Đơn từng loại ở ba trạng thái | Dòng 59–64 đã giảng đúng biến thể này: LoaiNghi/TrangThai/MaDon; COUNT khóa không NULL và vắng = 0. Dòng 53 về cột thừa; SELECT/bí danh/sắp xếp đã có trong câu chính và bài trước. | Không áp dụng bộ lọc của mẫu chính. Tạo nguồn chỉ gồm loại/trạng thái/mã đơn từ toàn bộ bảng; xoay ba trạng thái bằng COUNT khóa, trả loại và ba cột đếm đúng vị trí, xếp loại tăng dần. Không đổi COUNT thành tổng ngày. | Không thấy thiếu tiền đề. Chỉ là ráp biến thể đã dạy vào khung câu đầy đủ, không cần đoán từ answer. |
| 4-4-3 — Tháng 8,9 nằm ngang | MONTH ở 2.8; dòng 66 nêu cả nguồn ba cột và SUM/FOR/IN cho tháng nằm ngang, chốt năm. Dòng 55/57 về không sinh nhóm thiếu và NULL; mẫu chính về lọc ngày, bí danh/SELECT. | Đổi nguồn thành loại, số tháng lấy từ TuNgay và ngày; lọc từ đầu tháng 8 đến trước đầu tháng 10/2026, giữ mọi trạng thái. Xoay số tháng thành hai cột 8/9 bằng SUM; SELECT loại trước hai cột tổng theo đề, sắp loại. Không tạo dòng loại ngoài nguồn hoặc thay NULL. | Không thấy thiếu tiền đề. Dạng `[8]`, `[9]` đã có ngay tại dòng 66; người học không phải tự phát minh cú pháp tên cột số. |

## Ưu tiên và phần giữ được

**Không có finding cần sửa/làm rõ/cắt có căn cứ ở giai đoạn học thử này.** Không thêm nhận xét chỉ để đủ số. Phần giữ được trọng yếu là định nghĩa ba vai trò bằng ví dụ, nguồn hẹp để tránh nhóm ngầm, phân biệt SUM NULL/COUNT 0, IN cố định, khóa năm khi xoay tháng và giữ đơn vị ngày trên đơn mọi trạng thái.

Ba đề công khai có đủ tiền đề từ bài và các bài trước đã đọc. Đây là đánh giá đường học và sự nhất quán source, chưa phải xác nhận query/result/answer chạy đúng. Không dùng kết luận học thử thay bằng chứng SQL/UI hoặc quyền xuất bản.

## Nguồn và giới hạn

Nguồn: các tài liệu nội bộ đã liệt kê, source bài 4.4 và public-4.4.json. Số liệu 20 đơn và tổng tháng khớp lời hồ sơ/4.3 về mặt nội bộ; chính reviewer chưa chạy DB, chưa xác minh từng dòng nguồn/ô tổng/COUNT và chưa đọc YAML. Chưa kiểm HTML, UI, sao chép/dán, bàn phím hoặc SSMS. Không đọc report cũ hay nhận xét reviewer khác.

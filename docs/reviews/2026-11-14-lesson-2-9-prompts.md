# Review tiền đề và source/HTML bài 2.9 — 14/11/2026

Phạm vi: source bài 2.9, các tiền đề được giao, đề công khai của ba bài tập và sáu Arcade; HEAD được giao `4554561` cùng worktree, build được giao 23:46:54. Không dùng report cũ, seed/secret, SQL/API/browser hoặc tương tác UI. Kiểm HTML tĩnh được trình bày riêng bên dưới.

## Bảng tự giải và tiền đề từng đề (trước đáp án)

| Đề | Tự giải bằng lời, kiểm biên | Tiền đề trong phần học bắt buộc |
|---|---|---|
| 2-9-1 | Lọc đồng thời IT, đang làm, ngày vào không sau ngày chốt; chọn mã và ngày, nhãn đủ khi mốc cộng 1 năm không sau ngày chốt, còn lại chưa đủ; sắp mã tăng. Ngày kỷ niệm bằng chốt thuộc nhóm đủ. | 2.1 chọn cột/AS; 2.2 so sánh ngày, N; 2.3 AND; 2.4 sắp; 2.8 mốc đủ năm; 2.9 CASE/ELSE. |
| 2-9-2 | Giữ KD và ngày vào trong phạm vi, kể cả đã nghỉ; xét mốc 3 năm trước 1 năm, còn lại dưới 1; giữ trạng thái và sắp mã. Mốc bằng chốt được tính đủ; thời gian không kết thúc ở ngày nghỉ. | 2.1–2.4 như trên; 2.8 DATEADD; 2.9 ví dụ ba nhánh và lý do thứ tự. |
| 2-9-3 | Lọc NS, đang làm, ngày vào không sau chốt; chọn một nhánh đạt mốc ba năm, bỏ ELSE cho NULL khi không đạt mà vẫn giữ dòng; sắp mã. | 2.1–2.4, 2.8 mốc đủ năm; 2.9 Vận dụng bỏ ELSE và giữ dòng. |
| nhan-hai-nhanh | Giữ mọi dòng, điểm từ 8 được Đạt, còn lại Chưa đạt; điểm không thiếu, không cần sắp. | 2.1, 2.2 so sánh/N, 2.9 CASE/ELSE. |
| ba-muc-thuong | Giữ mọi dòng; xét từ 500 trước, rồi từ 300, còn lại C; 500 thuộc A và 300 thuộc B. | 2.1, 2.2 so sánh, 2.9 thứ tự nhánh. |
| hang-nha-cung-cap | Giữ mọi dòng; xét từ 20 trước, rồi từ 5, còn lại Mới; 20 thuộc Thân thiết, 5 thuộc Quen. | 2.1, 2.2 N/so sánh, 2.9 thứ tự nhánh. |
| o-trong-trong-nhanh | Giữ mọi dòng; ngày nghỉ NULL thì Đang làm, có ngày thì Đã nghỉ, không suy theo ngày hiện tại. | 2.5 IS NULL; 2.9 WHEN/ELSE, nhánh kiểm ngày thiếu ở Vận dụng. |
| nhan-tham-nien | Giữ mọi dòng; mốc đủ ba năm xét trước mốc đủ một năm, rồi phần còn lại; đúng ngày kỷ niệm tính đủ; sắp mã. Đề đảm bảo ngày vào không sau chốt. | 2.4 ORDER BY; 2.8 DATEADD; 2.9 mốc, thứ tự nhánh và phạm vi. |
| bao-cao-tong-hop | Lọc KD hoặc IT; giữ mọi hợp đồng của hai phòng. Nhánh thiếu ngày trước, tiếp đến ngày không sau 20/10, tiếp đến ngày không sau 20/11 (các ngày trước đã được chọn), còn lại Còn hạn; sắp mã. Các ngày 20/10, 21/10 và 20/11 nằm đúng nhóm đề nêu. | 2.2 so sánh ngày/N; 2.3 IN; 2.4 ORDER BY; 2.5 IS NULL/UNKNOWN; 2.9 thứ tự nhánh và nhánh NULL. |

Ba câu tự kiểm: NV003 nhận nhãn một năm nếu đặt nhánh đó trước; ngày 2023-10-21 đạt ba năm đúng ngày chốt; NV025 vẫn qua lọc và nhận NULL nếu bỏ ELSE. Những kết luận này suy ra từ phần chính và Vận dụng.

## Phát hiện

Không phát hiện thiếu tiền đề hoặc sai nội dung có căn cứ trong phạm vi đã giao. Các đề đều giải được bằng kiến thức bắt buộc tới 2.9; không cần giả định dữ liệu hay lấy kiến thức bài sau. Việc 2-9-2 tính tới ngày chốt kể cả sau ngày nghỉ là lựa chọn nghiệp vụ khác thâm niên làm việc thực tế, nhưng đề nói rõ; giữ nguyên như yêu cầu.

## Phần giữ được

- Phần chính giải thích CASE, WHEN/THEN, ELSE/END và thứ tự nhánh trước câu SQL; ví dụ NV003 trả lời được tại sao kiểm ba năm trước. NV025 giải thích được tại sao đếm ranh giới năm không đủ để kết luận năm tròn.
- Ngày chốt, phạm vi đã vào làm, điều kiện NOT NULL và cảnh báo dữ liệu thiếu làm rõ vì sao nhánh còn lại là dưới một năm. Vận dụng nói rõ bỏ ELSE tạo NULL mà không loại dòng; câu tự kiểm kiểm lại cùng điểm này.
- Các đề phân rõ phạm vi, thứ tự cột/dòng và nhãn; hai Arcade yêu cầu sắp đã nêu mã không trùng. Báo cáo hợp đồng có nhánh thiếu ngày và các mốc không chồng lấn.

## Kiểm source và HTML tĩnh

- Source bài gồm cấu trúc mới → SQL đầy đủ → RunFlow → tóm tắt → Result → trả lời nghiệp vụ, tiếp đến Vận dụng, Hay nhầm, Ứng dụng, Ghi nhớ, tự kiểm, Bài tập. Đã đọc các trường drawer RunFlow và ba khối tự kiểm trong source.
- Trích xuất có chọn lọc HTML, loại script/style/svg: trang bài có đúng thứ tự các heading, các đoạn chính và nội dung bốn bước RunFlow được render trong HTML, ba summary tự kiểm; ba trang bài tập và sáu trang Arcade có tiêu đề và đề công khai khớp source được đọc. Đây là kiểm cấu trúc/nội dung HTML, không chứng minh thao tác đóng mở hay bố cục thực tế trên màn hình.
- Đã parse YAML chỉ lấy trường công khai theo gói giao; tự giải và ghi bảng tiền đề trước bất kỳ bước đọc đáp án. Không đọc trường `answer`, không chép đáp án; không kiểm answer/hidden test.

## Giới hạn

Không chạy SQL, API, test, browser hoặc kiểm UI; không xác minh số liệu 48/45 và các tổng nhóm với database, cũng không kiểm tính đúng của đáp án hoặc bộ chấm. HEAD `4554561` và thời điểm build 23:46:54 là thông tin được giao, không tự kiểm Git hoặc chứng minh build khớp source. Reviewer được điều phối với cấu hình gpt-6.1-terra/high theo gói giao; không có bằng chứng độc lập xác minh model thực tế trong phiên này.

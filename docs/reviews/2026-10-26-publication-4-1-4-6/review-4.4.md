# Review độc lập bài 4.4 — kết quả cuối

## Phạm vi, phiên bản và công cụ thực tế

- Bài: `src/content/lessons/4-4-pivot-xoay-bang.mdx`; bài tập: YAML cùng slug. Source được root giao là `dd67309` trên `codex/review-lessons-4-1-4-6`, chưa sửa nội dung bài; tôi không thay source/Git và không tự xác minh commit bằng thao tác Git.
- Reviewer mới, kế thừa model của phiên, chỉ giả định nền Excel văn phòng cơ bản. Đã đọc đủ bài, bốn tự kiểm tra, ba đề và mọi Sql/Result/Memo. Đã đọc AGENTS, quy ước, template, hồ sơ, mẫu 1.1 cùng phần nền cần thiết ở 4.1/4.3/3.10/2.8/2.5.
- Hai giai đoạn đã thực hiện đúng thứ tự: học từ MDX + `public-4.4.json`, ghi và khóa `review-4.4-phase1.md` lúc **19:13:08 ngày 26/10/2026**, sau đó mới mở YAML. Không sửa phase1 sau khi biết answer.
- Dùng PowerShell/Get-Content/rg và regex đọc HTML; không browser, SQL, DB, API/runner, nộp bài, seed/secret, tài liệu ngoài, Git mutation, agent con hoặc report cũ. Chỉ ghi hai report được giao.
- HTML đã tự đọc: `dist/bai/4-4-pivot-xoay-bang/index.html`, LastWriteTime **19:07:28 ngày 26/10/2026**; root giao đây là build mới 132 trang khớp source trên. Tôi đối chiếu trực tiếp bốn khối SQL source với HTML. Không coi đọc HTML là kiểm UI.

## Rà theo thứ tự bài

1. **Tình huống (18–26): Giữ được.** Chốt đầy đủ mọi trạng thái, tháng bắt đầu 8–10/2026, cộng nguyên SoNgay của đơn kéo tháng, không suy thành ngày thực nghỉ/đã duyệt hay chứng nhận đủ kỳ. Kế thừa đúng ý 4.3.
2. **Nguồn và ba vai trò (30–47): Giữ được.** PivotTable/Rows/Columns/Values được định nghĩa tại chỗ, gán ngay tháng/loại/ngày. Người chỉ biết Excel cơ bản không phải tự biết PivotTable. CTE và EOMONTH nối được từ bài trước. Bảng nguồn ghi rõ mười dòng trích đầu, tổng 20; không dùng số dòng trích để bác tổng.
3. **Cột xoay/ô thiếu (49–66): Giữ được.** SUM/FOR/IN, ngoặc vuông và bí danh được giải nghĩa. Cột nguồn thừa tham gia nhóm được giảng ngay trước câu chính, kể cả việc bỏ khỏi SELECT ngoài không sửa được nó. IN cố định và không sinh hàng tháng thiếu đều nói rõ. SUM NULL/COUNT khóa 0 không bị gộp một nghĩa. Biến thể đếm có đủ ba vai trò và mảnh SQL copy=false; biến thể tháng ngang có cả nguồn, FOR/IN và điều kiện năm.
4. **Đối chiếu CASE (68–87): Giữ được.** Giải thích bỏ ELSE để giữ NULL trước khi đưa ví dụ; dùng cùng nguồn/phạm vi với PIVOT. Không hứa kỹ thuật nào mặc định nhanh hơn. Khối này nối được từ 3.10 và không cần dùng đáp án làm kiến thức bù.
5. **Câu chính/kết quả (89–107): Giữ được về source và HTML.** Nguồn chỉ có ba vai trò, phạm vi đúng mọi trạng thái, SELECT có vị trí cột đúng và sắp tháng. CASE/PIVOT hiển thị cùng ba dòng. Lời đáp tháng 9 là 12 + 5 + 3 = 20 ngày trên đơn đặt cạnh bảng. Hai mark đúng dòng tháng 8 và 10 có NULL; không cần ép thêm RunFlow vào thiết kế hiện tại.
6. **Hay nhầm/Ứng dụng/Memo (109–135): Giữ được.** Lỗi có hậu quả, ứng dụng đúng việc đối chiếu và kiểm ma trận, ôn không bổ sung nội dung mới. Thời lượng 35 phút không có dấu hiệu thấp rõ rệt với ba đề, nhưng chưa được đo qua một lượt học có bấm/chạy.
7. **Tự kiểm tra/bài tập (137–171): Giữ được.** Đặt đúng sau Memo, trước Bài tập. Bốn câu đều có lời giảng trước: MaDon chia nhóm (53), SUM/COUNT thiếu (57/59), ba vai trò đếm trạng thái (59–64), MONTH và đúng năm (66). Dòng 169 mô tả đúng phạm vi chấm kết quả và không hứa bộ chấm buộc kỹ thuật PIVOT.

## Câu tại sao/để làm gì đã thử

| Câu hỏi | Chỗ đã đáp |
|---|---|
| Xoay bảng để làm gì? | Tình huống/Key 21–26, Rows/Columns/Values 32 và Ứng dụng 123: đặt loại cạnh nhau để so trong một tháng. |
| Vì sao nguồn không giữ MaDon? | 53: cột còn lại là nhóm hàng, thêm mã làm tách nhóm dù SELECT ngoài không hiện mã. |
| Vì sao dùng ngày cuối tháng, có đổi TuNgay thật không? | 34: khóa chung đại diện tháng, không đổi ngày bắt đầu; nền 2.8/4.3 đủ. |
| Vì sao ô thiếu không mặc định 0? | 57 và nền 2.5: chưa có giá trị để cộng khác với đã xác nhận 0; COALESCE là lựa chọn hiển thị có quy ước. |
| Đếm đơn khác cộng ngày và khác ô thiếu ở đâu? | 59–64: khóa không NULL, COUNT đếm đơn và tổ hợp vắng 0. |
| Loại mới/tháng thiếu có tự xuất hiện không? | 55: IN cố định và không sinh hàng tháng thiếu. |
| Đổi tháng thành cột cần giữ năm không? | 66 nêu nguồn, phép xoay và bộ lọc đúng năm/khoảng tháng. |
| CASE bỏ ELSE để làm gì, chọn CASE hay PIVOT thế nào? | 70/87: giữ cách biểu diễn thiếu NULL và cân nhắc cách đọc/bảo trì, không phán tốc độ. |

## Tiền đề từng đề và đối chiếu sau YAML

Cách làm đã khóa trước YAML nằm đầy đủ trong `review-4.4-phase1.md`; bảng dưới ghi kết quả đối chiếu, không chép đáp án.

| Đề | Tiền đề đã có trước bài tập | Cách làm độc lập đã xác định | Sau khi mở YAML |
|---|---|---|---|
| 4-4-1 | 4.1 về Unicode/trạng thái/ngày; 2.8/4.4:34 về EOMONTH; 4.4:34–57/91–107 về ba vai trò/SUM/NULL/SELECT/sắp xếp. | Thêm trạng thái đã duyệt vào bộ lọc nguồn; giữ khoảng tháng 8–10, xoay ba loại bằng SUM, không bù tháng/đổi NULL. | Answer cùng phạm vi, nguồn ba cột, phép tính, cột trả và thứ tự. Không phát hiện kiến thức mới ẩn trong answer. Chưa chạy SQL. |
| 4-4-2 | 4.4:59–64 giảng đúng hàng loại/cột trạng thái/giá trị khóa và COUNT 0; 53 về cột thừa; mẫu chính về khung câu/bí danh. | Bỏ lọc của ví dụ chính, chỉ lấy loại/trạng thái/mã đơn từ toàn bộ bảng; đếm khóa theo ba trạng thái và sắp loại. | Answer dùng đúng biến thể đã được giảng, không thêm bộ lọc hoặc cột nguồn thừa. Cột và thứ tự khớp đề. Chưa chạy SQL. |
| 4-4-3 | MONTH ở 2.8; 4.4:66 cho nguồn và SUM/FOR/IN hai tháng; 55/57 về nhóm và NULL; câu chính về lọc/SELECT. | Lọc đúng tháng 8–9/2026, giữ mọi trạng thái; nguồn loại/số tháng/ngày, xoay 8/9 bằng SUM, không thêm loại ngoài nguồn. | Answer đi đúng cách đã tự xác định, chốt năm bằng khoảng ngày và giữ nguồn ba vai trò; cột/thứ tự khớp đề. Chưa chạy SQL. |

**Không thấy thiếu tiền đề hoặc chỗ phải lấy answer làm lời giảng cho cả ba đề.** Những chỉ dẫn phục vụ đề 2/3 đã xuất hiện ở phần chính, không chỉ nằm trong tự kiểm tra.

## Nhận xét ưu tiên

Không có finding cần sửa/làm rõ/cắt về nội dung, SQL logic đọc được hoặc tiền đề bài tập. Một điểm biên tập nhỏ nhận thấy khi rà lại phần chữ cùng HTML:

| Mức | Vị trí/câu gốc ngắn | Tác động và căn cứ | Đề xuất |
|---|---|---|---|
| Biên tập, không chặn đường học | MDX 70: “khớp cách SUM trong PIVOT xử lý ở đây”; 87: “câu PIVOT bên dưới”; 149: “SUM ... còn COUNT” | Một vài lần gọi tên hàm/từ khóa trong lời văn chưa có code, trong khi quy ước 2.2 yêu cầu tên/từ khóa SQL dùng code. Chỉ là tính nhất quán định dạng, không làm thiếu nghĩa hoặc ảnh hưởng cách làm đề. | Bọc riêng SUM/PIVOT/COUNT bằng code ở các lời văn này khi làm lượt biên tập; không thay nội dung hoặc tăng khối. |

Điểm này là bổ sung biên tập sau khi đối chiếu HTML; không đổi đánh giá tiền đề đã khóa ở phase1.

## HTML đã xác minh và phần giữ được

- Đã lấy text từng `<pre>` sau giải mã entity và so với source sau giải mã escape MDX: **4/4 khối SQL giống nhau**, có tab thật, không còn hai ký tự `\t`, không có nháy cong trong SQL. CSS của bản build đặt `--sql-tab-size: 4` và các vùng SQL tham chiếu token này.
- Ba bảng Result trong HTML giữ đúng dữ liệu source, NULL hiện bằng phần tử có lớp `res-null`. Ở bảng Result cuối, hai dòng có lớp `res-mark` đúng dòng 1/tháng 8 và dòng 3/tháng 10. Memo giữ nháy thẳng của chuỗi Unicode, bốn summary có `<code>` đúng nội dung; text HTML không còn backtick hoặc escape tab lộ ra.
- Giữ trọng tâm ba vai trò, khóa nhóm ngầm, khác SUM/COUNT, IN cố định, phạm vi tháng mọi trạng thái và giới hạn ngày trên đơn. Không đề nghị thêm RunFlow, thao tác tạo dữ liệu hoặc SQL ngoài mục tiêu.

## Nguồn và giới hạn

Nguồn tự đọc: AGENTS, docs/quy-uoc.md, docs/lesson-template.md, docs/ho-so-cong-ty.md, mẫu 1.1, nền cần thiết ở 4.1/4.3/3.10/2.8/2.5; toàn bộ MDX 4.4; public-4.4.json trước YAML; YAML 4.4 sau khóa phase1; HTML/CSS mới được giao.

Các số 20 dòng nguồn, tổng ngày theo tháng/loại và kết quả COUNT mới được kiểm nhất quán giữa source/HTML/hồ sơ và các bài liên quan; **chính reviewer chưa xác minh bằng SQL live**. Root kiểm DB riêng, không phải kiểm do tôi làm. Không kiểm bộ chấm thực thi, copy/paste, bàn phím, drawer, responsive/viewport, bố cục bằng mắt hoặc SSMS. Không lấy kết quả đọc HTML làm nghiệm thu UI và không dùng báo cáo này làm quyền publish/push.

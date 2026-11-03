# Review tích hợp 3.8–3.9 — khóa tiền đề, giai đoạn 1

## Phạm vi và cách đọc

Học thử theo thứ tự 3.8 rồi 3.9, từ nền Excel cơ bản và các bài trước được giao. Phạm vi phiên bản do gói giao: HEAD `63f8f5c` cùng thay đổi chưa commit; gói mô tả build lúc 21:43:48 và snapshot cuối, nhưng giai đoạn này tôi không mở build hay evidence để xác nhận sự khớp phiên bản. Agent được giao cấu hình `gpt-6.1-terra`/`high`, ngữ cảnh mới; công cụ trong lượt này không tự xác nhận model runtime thực tế.

Tôi đọc đề đã tách trong `prompts-only.md` trước khi lập bảng; **chưa mở YAML, đáp án, diff, report hay evidence**, không viết lời giải SQL cho các đề, không chạy SQL/API, không dùng browser. Các câu SQL trong bài giảng là ví dụ tình huống, không phải đáp án sáu đề; không gặp đáp án bài tập ngoài ý muốn. Kết luận dưới đây là đánh giá khả năng tìm và vận dụng tiền đề trong nguồn, không phải xác nhận câu trả lời, số liệu, UI hay bộ chấm hoạt động đúng.

## Mạch học thử

- **3.8 — Giữ được:** từ chồng cột Excel sang hai nhánh, tự lọc và bỏ trùng; bài phân biệt một mã, một lần xuất hiện và một cặp mã–nguồn, rồi giải thích xếp kết quả chung. Đơn nghỉ 3.1 cùng khoảng ngày được mang sang 3.8; mốc giờ không bị diễn giải thành kết luận vi phạm. RunFlow cho biết hai nhánh độc lập, lượng dòng trích và tổng; các bước giữa không hứa thứ tự. Hai thẻ đầu tóm tắt sau lọc, nên không thể soi từng điều kiện từ bảng mã đó; lời dẫn nói rõ đây là tóm tắt. Tính đúng của các con số và hình chưa thể xác minh trong giai đoạn này.
- **3.9 — Giữ được:** tiếp nối phạm vi đơn của 3.1 và nhóm vừa rà ở 3.8, nhưng chuyển mục tiêu từ danh sách mã sang mỗi hồ sơ một dòng. Bài trình bày `IN` một cột, `EXISTS` có liên hệ, `NOT EXISTS` theo phạm vi; phân biệt không có dòng phù hợp với chưa từng có. `JOIN` có thể nhân dòng được nối về 3.6. RunFlow cho thấy danh sách trích và bốn mã còn lại, đồng thời nêu thứ tự trước sắp không được bảo đảm. Chưa xác minh số liệu hay render.
- Cả hai bài có tình huống, giả định, câu trả lời, Hay nhầm, Ứng dụng, Ghi nhớ và ba câu tự kiểm tra sau Ghi nhớ; các câu ôn theo mục tiêu đã được giảng trước đó. Theo nguồn đã xem chưa thấy thiếu tiền đề cốt lõi cho sáu đề; đây không bảo đảm mọi người học sẽ tự làm được.

## Bảng tiền đề đã khóa theo thứ tự đề

| Đề | Các bước cần tự xác định, không viết đáp án | Đã dạy ở đâu / phân loại khoảng trống |
|---|---|---|
| 3-8-1 | Chọn mã từ hai tập dòng lương, giới hạn từng kỳ riêng; gộp bỏ mã trùng trên một cột; xếp danh sách chung tăng dần. | 3.6 nêu một dòng lương theo cặp kỳ–mã và ví dụ lọc `KyLuong` bằng chuỗi `2026-09`; 3.8 phần chính giảng hai nhánh, `UNION`, bỏ trùng và một `ORDER BY` cuối; 2.4 giảng tăng dần. Áp dụng sang kỳ 08 là suy luận trực tiếp từ đề và ví dụ; chưa thấy thiếu tiền đề. |
| 3-8-2 | Giới hạn hai kỳ như đề 1, chỉ lấy mã, chồng giữ mọi lần, sắp chung; nhận ra cùng mã bằng nhau không cần thứ tự phụ. | 3.6 về kỳ lương; 3.8 phần `UNION ALL` nói giữ lần xuất hiện trong và giữa nhánh, cả khi mã lặp; 2.4 về sắp. Không cần chọn cột kỳ. Chưa thấy thiếu tiền đề. |
| 3-8-3 | Nhánh đơn chỉ lọc trạng thái, không lọc ngày; nhánh công lọc khoảng ngày và giờ; thêm hai nhãn Unicode cùng vị trí, gộp theo cả cặp và sắp mã rồi nguồn. | 3.8 câu chính dạy lọc ngày/giờ, Unicode và hai nhãn ở phần xét toàn bộ cột; 2.3 giảng `AND`, 2.4 giảng sắp nhiều cột và hướng mặc định. Cần bỏ điều kiện ngày của nhánh đơn theo đề, không sao chép nguyên câu tình huống. Vị trí ví dụ nhãn nằm sau đoạn `UNION ALL`, có thể phải tìm lại nhưng đã giảng trước bài tập; không xem là chưa dạy. |
| 3-9-1 | Dùng hồ sơ làm câu ngoài lấy hai cột; câu con lấy một cột mã đơn chờ duyệt không giới hạn ngày; kiểm thuộc danh sách, không lọc trạng thái hồ sơ; sắp mã. | 3.9 câu chính, LineMap và đoạn ngay sau giải thích `IN` một cột, nhiều dòng, nguồn ngoài/trong và không nhân dòng; thay trạng thái từ đề, bỏ khoảng ngày; 2.3 nhắc `N` cho chuỗi tiếng Việt, 2.4 về sắp. Chưa thấy thiếu tiền đề. |
| 3-9-2 | Giới hạn phòng ở câu ngoài; trong câu con kiểm ít nhất một hợp đồng cùng mã, không thêm điều kiện ngày hoặc loại; chỉ hai cột hồ sơ, sắp mã. | 3.9 đoạn `EXISTS` giải thích điều kiện liên hệ và `SELECT 1`; đoạn đổi yêu cầu cho bài tập nói rõ đặt điều kiện phòng ngoài, nối bằng `AND`, chỉ so mã khi cần bất kỳ dòng liên quan. 3.5/3.6 cung cấp quan hệ hồ sơ–hợp đồng và khả năng nhiều hợp đồng; 2.4 về sắp. Chưa thấy thiếu tiền đề. |
| 3-9-3 | Xét mọi hồ sơ; chỉ giữ người không có dòng lương cùng mã **và** đúng kỳ 09, rồi chọn ba cột và sắp. Người có lương kỳ khác vẫn có thể được giữ. | 3.9 đoạn `NOT EXISTS`, ví dụ NV001 và đoạn đổi phạm vi nêu rõ điều kiện kỳ đặt cùng điều kiện mã bên trong; 3.6 cho ví dụ kỳ `2026-09`, NV041 chỉ có kỳ 08; 2.4 về sắp. Đây là vận dụng hai mảnh ở hai bài, có thể phải quay lại 3.6 tìm ký hiệu kỳ nhưng đã có bài giảng; không xem là chưa dạy. |

Chưa thể kiểm kỹ thuật xem lược đồ thực tế, kết quả, thứ tự, alias hay bộ chấm chấp nhận câu trả lời thế nào; sẽ không dùng giả định đó để kết luận lỗi hoặc đạt.

## Các câu hỏi tại sao / để làm gì đã đối chiếu

| Câu hỏi của người học | Chỗ trả lời hoặc giới hạn |
|---|---|
| Vì sao không chỉ dán hai danh sách rồi gửi? | 3.8 phần Excel và `UNION`: cùng mã ở hai nguồn có thể xuất hiện nhiều lần, bỏ trùng để gửi mỗi mã một lần. |
| Vì sao `UNION ALL` nhiều dòng hơn, khi nào dùng? | 3.8 đoạn `UNION ALL` và Ứng dụng: giữ mọi lần, kể cả trong một nhánh, khi cần phân tích từng dòng; số lần không phải số mã. |
| Vì sao thêm nguồn làm một mã còn hai dòng? | 3.8 đoạn xét toàn bộ cột và Hay nhầm 2: khác nguồn thì hai cặp khác nhau. |
| Vì sao sắp cuối, hai nhánh phải cùng cấu trúc? | 3.8 LineMap và đoạn kiểu/vị trí: sắp toàn bộ kết quả; các nhánh cùng số cột, kiểu tương thích và kết theo vị trí. Chưa tự kiểm hành vi kỹ thuật. |
| Vì sao dùng câu con thay chép danh sách, và vì sao không chọn hai cột sau `IN`? | 3.9 phần Excel, đoạn mở và sau LineMap: lấy danh sách động không chép tay; một giá trị mã được so với một cột câu con. |
| Vì sao `EXISTS` phải liên hệ mã và không đếm bằng `SELECT 1`? | 3.9 ngay sau đoạn thay thế và Hay nhầm 2: liên hệ đúng người; `EXISTS` chỉ cần có dòng, hằng số không đếm hoặc chọn dòng đầu. |
| Vì sao `NOT EXISTS` không có nghĩa chưa từng có đơn/lương? | 3.9 đoạn `NOT EXISTS` và ví dụ NV001: chỉ phủ điều kiện trong câu con; 3.6 ví dụ NV041 có lương kỳ khác giúp chuyển sang đề 3.9-3. |
| Vì sao không dùng `JOIN` vô điều kiện để lấy một người một dòng? | 3.9 đoạn sau `EXISTS` và 3.6: nhiều dòng liên quan có thể nhân hồ sơ; việc tránh nhân dòng là lý do kiểm tồn tại. |
| Vì sao không cam kết một cách nhanh hơn? | 3.8 đoạn cuối lý thuyết và 3.9 đoạn giới hạn: thời gian tùy dữ liệu/cách thực thi, dẫn tới bài 5.7; chưa kiểm hiệu năng. |

## Findings và việc chờ xác minh

Không ghi finding cần sửa chỉ từ phần nguồn và đề đã xem: các bước cần thiết đều có chỗ dạy, kể cả hai điểm phải quay lại bài hoặc đoạn khác nêu trong bảng. Đây là kết luận tạm cho tiền đề; các khẳng định số lượng, SQL chạy được, sự khớp source/build, giao diện/drawer, đường thực hành và hành vi chấm chưa được kiểm. Giai đoạn 2 cần phân biệt bằng chứng được giao với thao tác trực tiếp và đối chiếu riêng từng đề, không suy ra đã chạy từ việc đọc nguồn.

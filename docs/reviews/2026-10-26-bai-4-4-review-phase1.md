# Học thử bài 4.4 — BƯỚC1, trước khi xem answer

## Phiên bản và cách kiểm

- Ngày 26/10/2026; reviewer kế thừa model của phiên. Góc nhìn: Business Consultant muốn chuyển sang BA/PM, chỉ biết Excel văn phòng cơ bản, dùng kiến thức đã giảng để thử hiểu và làm đề.
- Source được giao: working tree `codex/lesson-4-4-full`. SHA-256 MDX tự đọc được là `96d3588a064901694f461e775e18f2518c4b163ea7aa5643cfd3711179e7ceeb`, khớp `manifest-4-4.json`. Không kiểm hay đổi Git.
- Đã đọc toàn bộ hướng dẫn giao việc, `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1 và các bài 2.8, 3.2, 3.10, 4.1; chỉ đọc phần phạm vi/cách làm và mục 4.4 của spec ngày 26/10.
- Đã đọc toàn bộ MDX 4.4, đủ bốn khối `Sql`, ba khối `Result`, `Memo`, bốn câu tự kiểm tra; đọc ba đề từ JSON công khai được whitelist. Đã đọc nội dung và markup HTML `dist/bai/4-4-pivot-xoay-bang/index.html` cùng quy tắc tab của CSS build. Chỉ dùng lệnh đọc file, parser HTML chuẩn Python và ghi report này; thư viện `bs4` không có nên chuyển sang `html.parser`, không cài thêm gì.
- Không đọc YAML, answer, database seed, secret, API/dist API, report cũ hay ma trận tác giả; không chạy SQL, test, browser hoặc kết nối dịch vụ. Không phân việc, không sửa sản phẩm.

## Rà theo thứ tự bài

### Tình huống → chọn hàng, cột và giá trị

**Giữ được.** Mục tiêu chọn ba vai trò nối thẳng với lời chị Hạnh và `Key`: tháng làm hàng, loại nghỉ làm cột, tổng ngày cho từng ô. Dòng 24 chốt đủ mọi trạng thái, khoảng tháng 8–10/2026, cộng nguyên đơn theo tháng bắt đầu, không chứng nhận thực nghỉ hay đủ kỳ; không phải suy từ đáp án. Nhắc 4.3 không thay lời giảng vì giới hạn đã được nói ngay tại chỗ.

PivotTable, Rows, Columns, Values được giải nghĩa ở dòng 32; không đòi biết PivotTable trước. CTE đã học ở 4.1, hàm cuối tháng ở 2.8, khóa nhóm và độ chi tiết ở 3.2. Bảng nguồn ghi rõ chỉ trích mười trong `20` dòng, không giả là toàn bộ kết quả. Tháng 8 có `5 + 3 + 2 + 2 = 12` ngày phép năm và `2` ngày nghỉ ốm, khớp các ô tương ứng của bảng sau; đây chỉ là đối chiếu nội bộ những dòng đang thấy.

**4.4-A — Biên tập, ưu tiên thấp.** Dòng 32: “cần cập nhật nguồn và **refresh phù hợp**”. `refresh` là thuật ngữ thao tác chưa được giải nghĩa trong bài này hoặc bài PivotTable 3.2 đã giao đọc. Người mới hiểu cần cập nhật dữ liệu nhưng có thể không biết từ đó chỉ việc gì. Đổi ngắn thành “cập nhật nguồn và làm mới PivotTable phù hợp”; không cần thêm hướng dẫn thao tác Excel dài.

### Các cột được xoay và ô không có dữ liệu

**Giữ được.** Dòng 51 giải thích từng phần `SUM`, `FOR`, `IN`, ngoặc vuông và bí danh `p`; dòng 53 nói rõ cột còn lại quyết định nhóm, kể cả hậu quả giữ `MaDon` rồi chỉ bỏ nó ở `SELECT` ngoài. Đây là lời giải cần có để phản biện một báo cáo bị nhiều dòng hơn mong muốn. Không cần RunFlow theo phạm vi đã duyệt.

Dòng 55–57 phân biệt danh sách cột cố định, tháng vắng nguồn, `NULL` và quy ước hiển thị `0`; không hứa `PIVOT` tự bổ sung kỳ hoặc tự xác nhận thiếu dữ liệu bằng không. Phần đếm đã dạy đủ ba vai trò và `COUNT(MaDon)` cho tổ hợp vắng trước phần ôn. Mảnh cú pháp có `copy={false}` và được ghi rõ chỉ để đọc, không dẫn người học chạy riêng mảnh thiếu nguồn. Đổi tháng thành cột được giải thích ở dòng 66, gồm điều kiện tránh trộn năm; có cơ sở để tự chuyển cách làm sang đề 3.

### CASE → câu lệnh cho tình huống

**Giữ được.** Cách `CASE` dựa đúng kiến thức 3.10, giải thích vì sao bỏ `ELSE` thay vì âm thầm dùng `ELSE 0` rồi tuyên bố giống PIVOT. Hai bảng kết quả có cùng ba dòng và giá trị. Lời giải ở dòng 107 nằm cạnh câu chính/kết quả; `12 + 5 + 3 = 20` ngày tháng 9 khớp nội bộ. Đánh dấu dòng 1 và 3 phù hợp lời dẫn về hai ô `NULL`; không gán ý nghĩa người nghỉ hoặc ngày thực nghỉ cho tổng. Phạm vi kiến thức sâu được chốt ở dòng 87, không khẳng định CTE/PIVOT luôn nhanh hơn.

Về tải đọc: bốn tiểu mục có nhiệm vụ riêng, câu lệnh CASE là đối chiếu kiến thức đã học chứ không phải thêm một nhánh nghiệp vụ mới. Các ý lặp ở Hay nhầm/Ghi nhớ/Tự kiểm tra chủ yếu có chức năng nhắc lỗi và ôn; chưa có căn cứ buộc cắt một đoạn giảng cụ thể.

### Hay nhầm → Ứng dụng → Ghi nhớ → tự kiểm tra → Bài tập

**Giữ được.** Hay nhầm chỉ ra hậu quả sai nhóm, sai đơn vị và trộn năm. Ba ứng dụng đúng khả năng được giảng: đặt chỉ tiêu cạnh nhau, đổi vai trò và truy nguồn ô/hàng thiếu. Chữ đậm chọn các khái niệm chính, tên bảng/cột và dẫn chứng trong lời văn dùng code; không thấy backtick bị lộ trong nội dung HTML. Tự kiểm tra đúng vị trí sau Ghi nhớ, trước Bài tập; bốn đáp án đều có lời giảng trước đó, không dùng phần ôn để dạy bù.

**4.4-B — Cần làm rõ, ưu tiên vừa.** Mục tiêu dòng 13 là “chọn đúng hàng, cột và phép tổng hợp”; bốn câu tự kiểm tra dòng 140–163 hiện hỏi giữ `MaDon`, ô thiếu, cột mới và chốt năm. Chúng kiểm giới hạn tốt, nhưng chưa yêu cầu người học tự chọn đủ ba vai trò cho một yêu cầu cụ thể. Người chỉ nhớ các điều cấm có thể trả lời bốn câu mà chưa tự lập được báo cáo theo mục tiêu. Đề xuất thay một câu giới hạn bằng một câu ngắn, chẳng hạn yêu cầu xác định hàng/cột/giá trị đếm khi báo cáo số đơn từng loại theo trạng thái; lời đáp chỉ nhắc lại bộ vai trò đã giảng ở dòng 59. Không thiếu lý thuyết làm đề vì đoạn ấy đã có; đây là độ phủ của phần ôn.

Đường đi đọc được từ HTML có ba mục “Làm bài”, `Đã học xong` và gợi ý tự viết lại câu lệnh. Bài không bắt người học web tự kết nối SSMS. Chưa mở trang thực hành hay browser, nên chưa xác minh đường nhận mã, trạng thái đăng nhập, thao tác nộp hoặc hoàn thành thật; không suy từ liên kết HTML rằng những bước đó hoạt động.

## Các câu hỏi “tại sao/để làm gì” đã tự đặt

| Câu hỏi của người học | Bài trả lời ở đâu / phần còn thiếu |
|---|---|
| Xoay bảng để làm gì, mỗi ô thực sự nói gì? | `Key`, dòng 32–34 và câu trả lời dòng 107: đặt các loại cạnh nhau để so tổng ngày trên cùng tháng. Đủ trong phạm vi. |
| Vì sao lấy ngày cuối tháng thay cho ngày bắt đầu của từng đơn? | Dòng 34 dùng `EOMONTH` làm khóa chung; dòng 47, 53 nối khóa ấy với một dòng mỗi tháng, dựa trên 2.8 và 3.2. Đủ. |
| Vì sao không lấy mọi cột rồi chọn bớt ở ngoài? | Dòng 53 giải thích cột còn lại chia nhóm, `MaDon` tách theo từng đơn và bỏ ở ngoài không sửa được nhóm. Đủ. |
| Vì sao SUM thiếu là NULL, COUNT thiếu lại là 0? | Dòng 57, 59 và kiến thức 3.10: không có giá trị để cộng khác đếm số khóa không NULL. Đủ lời giảng để chọn phép tính; chưa kiểm hành vi live. |
| Có loại mới/tháng thiếu thì báo cáo có tự đầy đủ không? | Dòng 55: cột cố định, không tự tạo hàng tháng vắng nguồn; phải chuẩn bị yêu cầu/nguồn riêng. Đủ giới hạn, không cần mở bài động. |
| Đã có CASE thì PIVOT dùng làm gì, có nhanh hơn không? | Dòng 34, 70–87: chọn cách viết ba vai trò hoặc các biểu thức riêng theo cách đọc/bảo trì; không mặc định nhanh hơn. Đủ mức bài này. |
| Vì sao phải chốt năm nếu chỉ hiển thị số tháng? | Dòng 66: số tháng các năm có thể bị cộng lẫn; điều kiện ở nguồn giữ đúng kỳ. Đủ. |

## Bảng tiền đề từng đề — khóa trước khi xem answer

Chỉ dùng `public-exercises-4-4.json`. Cách làm dưới đây do reviewer tự xác định từ lời giảng, không lấy answer làm bài học và không chép một câu SQL đáp án.

| Đề công khai | Cách làm tự nghĩ | Kiến thức cần | Nơi đã giảng | Còn thiếu / điều chưa xác minh |
|---|---|---|---|---|
| `4-4-1` — Ma trận ngày trên đơn đã duyệt | Lọc trạng thái đã duyệt và khoảng tháng 8–10/2026 trong nguồn; chỉ giữ khóa cuối tháng, loại nghỉ và số ngày. Xoay ba loại bằng phép cộng, chọn bốn cột theo đề, giữ NULL và xếp tháng tăng. Không thêm MaDon hay tự dựng tháng vắng. | Lọc Unicode và khoảng ngày; CTE; EOMONTH; ba vai trò PIVOT; nhóm ngầm; SUM thiếu; chọn/sắp cột. | 4.1 có chính điều kiện đơn đã duyệt và CTE; 2.8 có ngày, EOMONTH; 4.4 dòng 34–57 và câu chính 91–103 có cấu trúc đầy đủ; 3.2 có nhóm/sắp. | Không thấy thiếu kiến thức bắt buộc. Chưa xem answer, chưa tính đủ dữ liệu của phạm vi đã duyệt hoặc kiểm bộ chấm. |
| `4-4-2` — Số đơn của từng loại ở ba trạng thái | Tạo nguồn chỉ có loại nghỉ, trạng thái và mã đơn, lấy toàn bộ bảng theo đề. Loại nghỉ là hàng; ba trạng thái là cột; đếm mã đơn. Chọn bốn cột đúng vị trí, đặt tên và xếp loại tăng; giữ số 0 ở tổ hợp vắng. | Phân biệt đếm đơn/cộng ngày; COUNT khóa không NULL; cột thừa chia nhóm; PIVOT đếm; bí danh cột; ORDER BY. | 4.4 dòng 53 và 59–64 dạy trực tiếp bộ vai trò/count; câu chính làm mẫu khối nguồn và chọn cột ngoài; 3.10 dạy COUNT bỏ NULL; 4.1 dạy CTE. | Không thấy thiếu kiến thức bắt buộc; đây là việc tự lắp bộ vai trò đã dạy vào cấu trúc đầy đủ, không phải kỹ thuật mới chỉ có trong answer. Chưa xác minh giá trị từng ô. |
| `4-4-3` — Hai tháng nằm ngang theo từng loại nghỉ | Lọc từ tháng 8 đến hết tháng 9 của đúng năm 2026 trước khi xoay; nguồn chỉ gồm loại nghỉ, số tháng từ ngày bắt đầu và số ngày. Giữ loại nghỉ làm hàng, xoay hai số tháng thành cột tổng ngày, đặt tên cột kết quả và xếp loại tăng. Không tự thêm loại vắng, không đổi NULL thành 0. | MONTH; khoảng ngày giữ đúng năm; nguồn ba cột; SUM, danh sách cột số trong ngoặc vuông; đổi alias và sắp. | 2.8 giải thích MONTH và khoảng ngày; 4.4 dòng 66 dạy đúng phép đổi vai trò và `[8]`/`[9]`; dòng 55–57 dạy hàng vắng/NULL; câu chính chỉ cấu trúc chọn cột ngoài. | Không thấy thiếu kiến thức bắt buộc. Chưa xem answer, chưa kiểm dữ liệu của từng loại/tháng hoặc khả năng chấm. |

## Ưu tiên và giới hạn kết luận

1. **4.4-B:** chỉnh một câu tự kiểm tra để trực tiếp ôn việc chọn ba vai trò theo mục tiêu; không cần thêm lý thuyết.
2. **4.4-A:** thay `refresh` bằng cụm tiếng Việt có nghĩa tại chỗ.

Trong phạm vi đọc, các đề đã có tiền đề ở bài hiện tại và các bài trước được giao; không thấy mâu thuẫn kiến thức đủ căn cứ để gọi là sai. Hai điểm trên không phải bằng chứng SQL hoặc dữ liệu sai.

HTML cho thấy bốn câu SQL giữ nháy thẳng, xuống dòng và tab thật; CSS build có `--sql-tab-size: 4` và `.sql-code` dùng token đó. Fragment COUNT không có nút Sao chép, ba câu đầy đủ có nút. Không có RunFlow/LineMap/Messages/Ssms/Erd riêng trong bài cần kiểm thêm; không yêu cầu bổ sung RunFlow. Đọc HTML/CSS không chứng minh kích thước hiển thị thực, sao chép/dán, bàn phím hay drawer đã hoạt động. Không có viewport vì không dùng browser.

Số liệu chỉ được đối chiếu nội bộ giữa các khối nhìn thấy và hồ sơ công ty đã cho phép đọc; chưa chạy SQL, chưa xác minh live toàn bộ nguồn, các ô không hiện trong bảng trích hoặc hành vi chấm. Không đánh giá answer cho đến khi có followup cho BƯỚC2. Phần bảng tiền đề ở trên được khóa; lần đối chiếu sau chỉ APPEND.

**CHƯA XEM ANSWER — DỪNG sau BƯỚC1.**

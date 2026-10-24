# Review độc lập bài 3.2 — GROUP BY

- Vai đọc: Business Consultant muốn học SQL Server để đủ hiểu và phản biện yêu cầu dữ liệu; chỉ dùng bài đang học và các bài trước để suy luận.
- Công cụ/model: Codex, kế thừa model của phiên; không chỉ định model khác.
- Phạm vi: đọc đầy đủ MDX, YAML, cả năm bước `RunFlow` và nội dung drawer; đối chiếu HTML production tại `dist/bai/3-2-group-by-pivottable/index.html`, có thời điểm ghi file 25/10/2026 00:20:11.
- Kết luận: chưa thấy lỗi kiến thức hoặc phạm vi khiến người học không giải được bài. Có một chỗ nên làm rõ thuật ngữ Excel và một điểm hoàn thiện tự kiểm tra; đều không cần đổi cấu trúc hay thêm bài.

## Rà theo thứ tự bài

### 1. Mục tiêu và tình huống — Giữ được

Nguồn: MDX dòng 11, 18–26.

> “Một hồ sơ là một dòng trong bảng có khóa chính `MaNV`.”

Yêu cầu đã chốt đủ đơn vị đếm, trạng thái, mã phòng hiện lưu, hai cột trả về và hai tiêu chí sắp xếp. Không gọi hồ sơ là số người khác nhau và không suy phòng hiện tại thành phòng lịch sử. `Key` nói đúng hình dạng kết quả. Mục tiêu nhóm một/nhiều cột và sắp báo cáo khớp nội dung sau đó.

### 2. Đoạn PivotTable đầu bài — Cần làm rõ, ưu tiên vừa

Nguồn: MDX dòng 32, 47; đối chiếu bài 3.1, đoạn sau bảng các hàm tổng hợp.

> “...kéo mã phòng vào **Rows** (nhãn dòng) và mã nhân viên vào **Values** (giá trị tổng hợp), chọn **Count**.”

Bài 3.1 vừa dạy “`COUNT` trong Excel chỉ đếm giá trị số”, còn ở đây lại chọn `Count` để đếm mã nhân viên dạng chữ. Bài 3.2 có khẳng định chọn Count cho mã chữ ở dòng 47, nhưng chưa nói đây là cách tổng hợp của PivotTable và nó đếm ô có dữ liệu. Người chưa biết PivotTable có thể thấy hai bài mâu thuẫn hoặc tưởng phép đếm mã sẽ bằng `0`. Bản thân PivotTable cũng xuất hiện lần đầu dưới dạng thao tác “bạn tạo”, chưa có câu định nghĩa ngắn.

Đề xuất: sửa ngay đoạn hiện có bằng một vế như “PivotTable tạo bảng tổng hợp từ danh sách; **Count** của PivotTable đếm các ô có dữ liệu, khác hàm `COUNT` trên sheet ở bài 3.1.” Có thể gộp vào câu dòng 47 thay vì thêm một đoạn hoặc hướng dẫn thao tác dài. Mã `MaNV` là khóa chính đã được nêu ở đầu bài, nên người học có căn cứ hiểu đếm mã tại đây tương ứng đếm hồ sơ.

### 3. Một cột, nhiều cột, tổng cộng — Giữ được

Nguồn: MDX dòng 34–76.

> “Các con số được tính lại cho từng tổ hợp, không sao chép tổng phòng vào mọi dòng.”

Hình Excel đánh đúng `A2`, `B2`, `B8`; lời giải phân biệt dòng tổng `45` với một phòng. SQL có lời chuyển ý rõ từ Excel, định nghĩa `GROUP BY` và khóa nhóm bằng hồ sơ cùng mã phòng. Đã trả lời trường hợp phòng không có dòng phù hợp và nhóm có `NULL` mà không biến thành bài kết bảng.

Ví dụ phụ báo trước việc đổi phạm vi sang toàn bộ `KD`, kể cả đã nghỉ, rồi đối chiếu `14` với hai nhóm `13`/`1`. Nhờ vậy người học không có lý do cộng thêm hồ sơ đã nghỉ vào tình huống chính. Quy tắc cột trực tiếp trong `SELECT` phải nằm trong `GROUP BY` được giới hạn vào cách nhóm theo cột đang học; lý do không lấy tùy ý `HoTen` được giải thích bằng nhiều họ tên trong cùng phòng. Đoạn dẫn bài 3.3/3.4 giữ đúng độ sâu.

### 4. Câu lệnh, kết quả và trả lời tình huống — Giữ được

Nguồn: MDX dòng 78–97; hồ sơ công ty mục 2, 3, 7.

> “`ORDER BY` dùng alias này để xếp số lượng giảm dần, rồi dùng `MaPB` tăng dần khi bằng số lượng.”

Lời giải nằm ngay cạnh SQL và kết quả, đáp ứng cả điều kiện lọc lẫn thứ tự. Alias đã học ở 2.1; nhiều tiêu chí sắp và dùng alias trong `ORDER BY` đã học ở 2.4. Kết quả `KD 13`, `IT 10`, `VH 8`, `KT 7`, `NS 5`, `BGD 2` cộng thành `45` và khớp hồ sơ công ty. Đây là đối chiếu nội bộ khóa học, chưa phải xác minh bằng chạy SQL.

### 5. RunFlow và cả năm drawer — Giữ được

Nguồn: MDX dòng 99–203; năm `rf-panel` trong HTML production.

> “...các câu này không phải những lệnh SQL Server tự chạy nối tiếp.”

Sơ đồ dùng thứ tự logic `FROM → WHERE → GROUP BY → SELECT → ORDER BY`, có giới hạn rõ về thực thi vật lý và thứ tự trước `ORDER BY`. Mỗi drawer bắt đầu giải thích từ đúng từ khóa và có số dòng: `48 → 45 → 6 → 6 → 6`. Hai bảng trước nhóm chỉ trích `10` hồ sơ; drawer ghi rõ phần trích và tổng. Drawer `GROUP BY` đã nói câu kiểm dùng `SELECT` để hiện kích thước nhóm, nên việc thấy số lượng ở bước này không bị trình bày như một câu lệnh nội bộ riêng của SQL Server.

Đã đối chiếu HTML: năm drawer có đúng các bảng và câu giải thích trên, từ khóa/giá trị dùng dạng code, không lộ backtick ở phần đã đọc. Câu gốc, `focus` từng bước và câu SQL kiểm bước khớp nhau trong nguồn. Các câu của bài này không có danh sách xuống dòng cần một/hai cấp thụt lề, nên không lấy bài này làm chứng cứ đã kiểm đủ quy tắc thụt lề bốn cột.

### 6. Hay nhầm, Ứng dụng, Ghi nhớ — Giữ được

Nguồn: MDX dòng 205–233.

Hay nhầm nêu đúng hậu quả của thêm `MaNV`, thay bằng `DISTINCT`, bỏ `WHERE` và tưởng nhóm tự sắp; không chỉ liệt kê tên lỗi. Ứng dụng đi từ đếm theo phòng/chức danh đến nhiều chiều và tổng đơn nghỉ, đều thuộc các khái niệm vừa học hoặc 3.1. Ghi nhớ tóm đúng khóa nhóm, chỉ tiêu, độ chi tiết và thứ tự; khái niệm trọng tâm được in đậm có chọn lọc, các dẫn chứng trong lời văn có kiểu code.

### 7. Tự kiểm tra — Biên tập, ưu tiên thấp

Nguồn: MDX dòng 11, 235–249.

> “Vì sao cùng các hồ sơ `KD`, thêm `TrangThai` lại thành hai dòng?”

Hai câu hiện có ôn được độ chi tiết khi nhóm nhiều cột và giới hạn không tự tạo nhóm rỗng; đáp án tự đủ nghĩa và đứng đúng sau Ghi nhớ. Chưa câu nào kiểm mục tiêu “sắp xếp báo cáo đúng yêu cầu”. Phần này đã được dạy đầy đủ và được kiểm trong bài tập 1/2, nên đây là thiếu phủ mục tiêu của phần tự kiểm tra, không phải thiếu kiến thức làm đề.

Đề xuất ngắn: thêm một câu “Muốn phòng đông nhất trước, bằng nhau thì mã tăng dần, cần phần nào?” với đáp án `ORDER BY [SoHoSo] DESC, MaPB ASC;`; hoặc điều chỉnh bộ câu để có một câu ôn ý đó. Không cần mở rộng lý thuyết.

### 8. Ba bài tập — Giữ được

Nguồn: YAML các id `3-2-1`, `3-2-2`, `3-2-3`; MDX dòng 251–255; ba liên kết “Làm bài” trong HTML production.

| Đề | Người học đã có căn cứ | Nhận xét |
|---|---|---|
| `3-2-1`: đang làm theo chức danh | Mẫu chính nhóm một cột; `MaCD` đã gặp ở 1.6/2.6; sắp hai tiêu chí đã học 2.4 | Đổi khóa nhóm tạo bài luyện thật, không chép nguyên câu mẫu. Đề chốt cột, phạm vi, thứ tự và không tổng cộng. |
| `3-2-2`: mỗi cặp phòng/trạng thái | Ví dụ phụ nhóm `MaPB`, `TrangThai`; nguyên tắc sắp từ trái sang phải ở 2.4 | Đã nói lấy toàn bộ trạng thái và chỉ cặp đang xuất hiện. Thứ tự MaPB rồi số lượng phù hợp phạm vi hiện có. |
| `3-2-3`: số đơn và tổng ngày theo loại | 3.1 đã dạy `COUNT(*)`, `SUM(SoNgay)` và phạm vi đơn; 3.2 dạy tính riêng từng nhóm | Đề nói rõ mọi ngày bắt đầu, cộng toàn bộ ngày trên đơn, không phân bổ tháng. Không đòi kiến thức bài sau. |

Phần dẫn bài tập giải thích đúng giá trị/thứ tự được chấm và alias không được chấm. Chưa xác minh kết quả bộ chấm hoặc thực thi các đáp án.

## Những câu “tại sao/để làm gì” khi học thử

| Câu tự đặt ra | Bài đã trả lời? |
|---|---|
| Vì sao không chỉ dùng `COUNT(*)` như 3.1? | Có: 3.1 là một dòng cả phạm vi, bài này cần một dòng mỗi mã phòng. |
| Vì sao phải lọc đang làm trước khi nhóm? | Có: dòng 45, 137 và Hay nhầm 3; nếu bỏ lọc, người đã nghỉ vẫn được tính. |
| Vì sao PivotTable dùng Count cho mã chữ trong khi 3.1 nói COUNT Excel chỉ đếm số? | Chưa giải thích rõ sự khác nhau của hai tính năng; xem mục 2. |
| Vì sao thêm trạng thái lại tăng số dòng? | Có: đổi khóa từ mã phòng sang cặp mã/trạng thái, mỗi tổ hợp tính lại. |
| Vì sao không lấy thêm họ tên cho dễ đọc? | Có: một phòng có nhiều họ tên, câu lệnh chưa chọn đại diện nào. |
| Vì sao không thấy dòng tổng hoặc phòng có `0` hồ sơ? | Có: chỉ có nhóm từ dữ liệu qua lọc; tổng chung được kiểm riêng. |
| Vì sao phải dùng `ORDER BY` sau nhóm? | Có: nhóm không bảo đảm thứ tự; câu chính chỉ rõ cả tiêu chí phụ. |
| Số phòng và số hồ sơ có ý nghĩa nghiệp vụ gì? | Có: phân bố của hồ sơ đang làm theo mã hiện lưu; không suy ngược lịch sử. |

## Ưu tiên và giới hạn

1. Nên sửa một vế về `Count` của PivotTable để nối nhất quán với 3.1 và định nghĩa ngắn PivotTable ở lần đầu.
2. Hoàn thiện câu tự kiểm tra về sắp xếp nếu muốn bộ ôn cuối bài phủ đủ mục tiêu đầu bài.
3. Giữ mạch, ví dụ, phạm vi và ba bài tập hiện tại. Không có finding cần đổi seed, URL, API, model hay khung gộp.

Nguồn đã đọc: `AGENTS.md`; brief của lượt review; toàn bộ `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; bài mẫu 1.1; các bài trước liên quan 1.6, 2.1, 2.2, 2.4, 2.6, 3.1; toàn bộ MDX/YAML 3.2; HTML production 3.2 ghi lúc 00:20 ngày 25/10/2026.

Giới hạn thực tế: chỉ đọc nguồn và HTML tĩnh; không mở/chạy tương tác trình duyệt, không kiểm nút sao chép hoặc dán, không thực hành SQL live, không chạy test/build/check hay bộ chấm. Không đọc seed, `.env`, tài liệu SQL ngoài khóa học, review khác, báo cáo học viên gốc hoặc ma trận tác giả. Không có bằng chứng để báo lỗi nền của các lệnh kiểm tra vì chưa chạy chúng. Số liệu chỉ được so tính nhất quán với bài trước/hồ sơ công ty; chưa xác minh trên database. Chỉ tạo tệp report này, không sửa sản phẩm.

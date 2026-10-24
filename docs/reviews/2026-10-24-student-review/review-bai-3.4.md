# Review độc lập bài 3.4 — INNER JOIN

- Vai trò học thử: Business Consultant muốn hiểu đủ để phản biện yêu cầu và kết quả dữ liệu; chỉ dùng bài đang review cùng kiến thức các bài trước.
- Công cụ/model: Codex, kế thừa model của phiên; không chỉ định model khác.
- Phạm vi: toàn bộ MDX 3.4, ba bài tập/đáp án YAML, bốn bước RunFlow cùng mọi drawer; đối chiếu HTML production tại `dist/bai/3-4-inner-join-vlookup/index.html`, mốc sửa file 25/10/2026 00:20:11.
- Không đọc review khác, báo cáo học viên gốc hay ma trận tác giả; không đọc seed, `.env`, không kết nối database và không tra SQL ngoài khóa học. Chỉ tạo report này, không sửa sản phẩm.

## Kết luận

Bài đủ nền tảng để hiểu kết hai bảng theo mã: đã dạy cặp cột `ON`, bí danh và dấu chấm, nguyên nhân dòng không khớp bị loại, điều kiện giữ đủ `48` hồ sơ và khả năng nhân dòng. Không thấy lỗi ngữ nghĩa trong câu chính hay ba đáp án khi đối chiếu với đề và cấu trúc được khóa học mô tả. Có một chỗ nên làm rõ thứ tự viết `JOIN` khi kết hợp các mệnh đề cũ và một thuật ngữ Excel có thể cắt. Các con số chưa được xác minh bằng SQL live trong lượt review này.

## Rà theo thứ tự bài

### 1. Tình huống và phạm vi — Giữ được

**Câu gốc:** “lấy mọi hồ sơ trong `NhanVien`, gồm cả người đã nghỉ”; “Tên phòng lấy theo `MaPB` hiện lưu”.

Yêu cầu nói đủ bốn cột, thứ tự dòng và phạm vi trạng thái; giả định tách phòng hiện lưu khỏi phòng lịch sử. Khớp hồ sơ công ty và nối đúng vấn đề của bài 1.5. Người học không phải tự đoán “danh sách nhân sự tháng 10” có loại người đã nghỉ hay không.

**Tự hỏi:** Lấy toàn bộ hay chỉ đang làm, và tên phòng ở thời điểm nào? **Đã trả lời.**

### 2. Từ Excel đến ON — một điểm biên tập nhẹ

**Vị trí:** MDX dòng 33 và frontmatter `excel` dòng 13.

**Câu gốc:** “dùng **VLOOKUP dò chính xác** hoặc **XLOOKUP** theo mã phòng”.

**Đánh giá: Biên tập / Cần cắt.** `VLOOKUP` đã được bài 1.5 giải thích bằng chính công thức này. `XLOOKUP` được gọi tên lần đầu mà không giải thích; bài sau đó chỉ đối chiếu cơ chế VLOOKUP, nên tên hàm thứ hai làm người chưa biết Excel phải dừng lại mà không giúp hiểu phép kết hiện tại. Đây không phải lỗi kiến thức và không chặn làm bài SQL.

**Đề xuất ngắn:** bỏ “hoặc XLOOKUP” và bỏ tên này ở trường `excel`; không cần mở thêm hướng dẫn hàm Excel trong bài JOIN đầu tiên.

**Tự hỏi:** Tôi cần biết XLOOKUP để học bài này không, và nó làm gì? **Bài chưa giải thích; thực tế không cần nó cho ví dụ hay bài tập.**

### 3. Cặp cột, bí danh và số dòng — Giữ được

**Câu gốc:** “hai cột cùng tên chưa đủ chứng minh quan hệ”; “Dấu chấm ngăn bí danh bảng với tên cột”; “mỗi hồ sơ có đúng một dòng phòng khớp”.

Bảng cặp `NhanVien.MaPB` ↔ `PhongBan.MaPB` đủ cho yêu cầu hai bảng và đúng quyết định đã duyệt; không cần khôi phục ERD toàn bộ. Bài 1.4–1.5 đã cho nền khóa chính/khóa ngoại và phía một/nhiều. Phần mới giải nghĩa rõ `NhanVien AS nv`, `PhongBan AS pb`, `nv.HoTen` và `pb.TenPB`, đồng thời phân biệt bí danh bảng với tiêu đề cột ở bài 2.1.

Đoạn số dòng nêu đủ ba điều kiện của bộ mẫu: `NOT NULL`, khóa ngoại và khóa chính danh mục. Nhờ đó không hứa mọi JOIN giữ số dòng. So sánh với VLOOKUP nêu được cả hai khác biệt cần có: không khớp thì SQL bỏ dòng, nhiều khớp thì SQL trả từng cặp. Phần giữ dòng chưa khớp và kiểm nhân dòng được dẫn sang đúng bài sau, không giảng quá sâu.

**Tự hỏi:** Vì sao chọn hai cột này, vì sao phải thêm tiền tố, vì sao `48` vẫn là `48`, và khi nào điều đó không còn đúng? **Đã trả lời.**

### 4. Câu lệnh cho tình huống — cần một vế nối sang bài tập

**Vị trí:** MDX dòng 60–67; đối chiếu YAML bài 3-4-1 dòng 13–17, 3-4-2 dòng 30–35 và 3-4-3 dòng 49–55.

**Câu gốc:** “Lấy bốn cột, kết bằng mã và xếp theo mã nhân viên”. Câu mẫu có `FROM` → `INNER JOIN … ON` → `ORDER BY`, không có `WHERE` hay `GROUP BY`.

**Đánh giá: Cần làm rõ.** Bài 3.3 đã chốt thứ tự viết `SELECT` → `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY`. Bài này thêm mảnh `INNER JOIN … ON` nhưng chưa nói thẳng nó nằm ở đâu trong khung cũ khi vẫn cần lọc/nhóm. Ba bài tập đều kết hợp phần mới với `WHERE`; bài cuối còn có `GROUP BY` và `HAVING`. Các thao tác riêng lẻ đã được học đủ, nhưng vị trí chèn phần mới hiện phải suy từ câu không có lọc/nhóm.

**Đề xuất ngắn:** ngay trước hoặc sau câu chính, thêm một vế: “Khi dùng thêm `WHERE`, `GROUP BY` hoặc `HAVING` như các bài trước, đặt phần `INNER JOIN … ON` sau `FROM` và trước các mệnh đề đó.” Không cần đưa thêm câu giải nguyên văn bài tập.

**Tự hỏi:** Tôi đã biết lọc và nhóm, nhưng khi có JOIN thì viết chúng trước hay sau ON? **Mẫu chỉ cho thấy JOIN trước ORDER BY; chưa nói rõ trường hợp có WHERE/GROUP BY.**

Phần còn lại **giữ được**: câu chính lấy đúng bốn cột theo yêu cầu và xếp `MaNV ASC`; lưới trích `10`/`48` dòng, đánh dấu đúng `NV001` với `KT`/`Kế toán`; câu trả lời nằm sát kết quả và giữ đúng phạm vi gồm người đã nghỉ. Hình Excel đánh dấu đúng `C2`/`D2` như lời dẫn.

### 5. RunFlow và toàn bộ drawer — Giữ được trong phạm vi kiểm tĩnh

**Câu gốc:** “Mỗi bước dùng một câu `SELECT` riêng để nhìn dữ liệu”; “không mô tả … thứ tự đọc vật lý”.

Đã đọc đủ bốn bước: `FROM` → `INNER JOIN` → `SELECT` → `ORDER BY`, cả `meaning`, `detail`, câu kiểm, cột, dữ liệu và tổng dòng. Drawer bắt đầu từ đúng từ khóa; số `48` nhất quán qua các bước. JOIN lấy thêm tên từ dòng danh mục; SELECT đưa bốn cột ra báo cáo; ORDER BY chốt thứ tự. Các câu kiểm ở hai bước JOIN/SELECT cùng trả bốn cột là minh họa trạng thái bằng SELECT riêng, đã được lời dẫn nói rõ, nên không nên đọc thành các lệnh SQL Server tự chạy nối tiếp.

Nguồn và HTML đều thống nhất; `focus` của SELECT giữ xuống dòng và tab như câu chính. HTML chứa tab thật trước `pb.TenPB` trong khối SQL, SQL drawer và `data-copy`; CSS nguồn dùng `--sql-tab-size: 4`. Đây là đối chiếu HTML/CSS, chưa phải xác nhận hiển thị bốn cột hoặc thao tác sao chép/dán trong trình duyệt.

**Tự hỏi:** SQL có thực sự chạy lần lượt bốn câu SELECT trong drawer không? Trước ORDER BY có bảo đảm thứ tự như hình không? **Đã trả lời: không; sơ đồ là thứ tự logic và thứ tự trước ORDER BY có thể khác.**

### 6. Hay nhầm, Ứng dụng, Ghi nhớ và tự kiểm tra — Giữ được

Ba lỗi thường gặp đúng trọng tâm: sai quan hệ, mất dòng không khớp, cột `MaPB` mơ hồ. Ứng dụng nêu việc làm bằng kết bảng, không biến thành lời khuyên chung; báo cáo có tên phòng kết hợp GROUP BY là bước vận dụng kiến thức 3.1–3.3. Ghi nhớ đối chiếu đúng VLOOKUP với JOIN, có cảnh báo mọi cặp khớp.

Ba câu tự kiểm tra đặt ngay sau Ghi nhớ và trước Bài tập; kiểm được lý do giữ `48` dòng, dòng không khớp và bí danh bảng. Khái niệm trọng tâm được in đậm, tên bảng/cột và giá trị dẫn chứng trong lời văn có code; không thấy dấu backtick lộ ra trong các drawer được đối chiếu HTML. Không thấy đoạn cần cắt lặp lớn ngoài tên XLOOKUP ở mục 2.

**Tự hỏi:** Sau bài này tôi làm được việc gì, và tự kiểm xem mình đã hiểu phần mới bằng cách nào? **Đã trả lời.**

### 7. Đủ tiền đề làm ba đề và đối chiếu đáp án YAML

| Bài tập | Tiền đề đã có | Đánh giá đáp án theo đề |
|---|---|---|
| 3-4-1: mọi hồ sơ KD | Chọn/thứ tự cột ở 2.1; WHERE ở 2.2; ORDER BY ở 2.4; ON và bí danh ở 3.4 | Đúng phạm vi mọi trạng thái, lấy tên từ danh mục và ba cột đúng vị trí; xếp mã tăng dần. |
| 3-4-2: VH đang làm | Thêm AND và Unicode đã học 2.2–2.3 | Hai điều kiện đúng; chuỗi `N'Đang làm'` có N, không lấy hồ sơ đã nghỉ; ba cột và thứ tự dòng đúng. |
| 3-4-3: phòng trên năm hồ sơ đang làm | COUNT(*) ở 3.1; nhiều khóa nhóm và cột không tổng hợp phải có trong GROUP BY ở 3.2; WHERE/HAVING và thứ tự ở 3.3 | Nhóm đủ `pb.MaPB`, `pb.TenPB`; đếm hồ sơ đã lọc; `HAVING COUNT(*) > 5` đúng nghĩa “trên 5”; xếp số giảm rồi mã tăng đúng đề. |

Không cần dạy thêm hàm mới để làm ba đề. Điểm cần nối chỉ là vị trí `JOIN` trong khung câu lệnh cũ ở mục 4. Đề cuối có thể chọn `nv.MaPB` thay cho `pb.MaPB` với quan hệ đang dùng; nội dung bài cũng nói bộ chấm nhận cách viết tương đương.

Không chạy các đáp án; bảng trên là đối chiếu ngữ nghĩa với đề, nội dung đã học và ràng buộc mà tài liệu khóa học mô tả, không phải kết quả của `check:exercises`.

## Ưu tiên

1. **Nên làm rõ:** thêm một vế về vị trí `INNER JOIN … ON` trước WHERE/GROUP BY/HAVING, để người mới kết hợp được kiến thức cũ khi làm cả ba đề.
2. **Biên tập nhẹ:** cắt tên XLOOKUP chưa dùng/giải thích; không mở rộng bài vì riêng thuật ngữ này.
3. Giữ bảng cặp cột đã duyệt, các điều kiện giải thích `48` dòng và giới hạn phòng hiện tại; không thấy căn cứ đề nghị thay khung hay sửa đáp án.

## Nguồn đối chiếu và giới hạn

Đã đọc: `AGENTS.md`; toàn bộ brief của lượt review; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; mẫu 1.1; toàn bộ các bài liên quan 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3; MDX/YAML 3.4; HTML production của 3.4. Đọc component RunFlow/Sql/Result/Excel và thư viện RunFlow để biết thẻ, drawer, bảng trích và code được đưa ra HTML như thế nào.

Giới hạn: không mở trình duyệt hay thao tác drawer/nút Sao chép/editor; không kiểm responsive hoặc clipboard. Không chạy database, seed, đáp án, test/build/check:dist trong lượt review. Dữ liệu và số dòng nhất quán với hồ sơ công ty cùng nguồn bài, nhưng kết quả live, nguyên trạng dữ liệu, hành vi bộ chấm và toàn bộ pipeline kiểm tự động đều chưa xác minh. Không phát hiện lỗi nền bằng máy vì không chạy bộ kiểm; không báo các kiểm đó đã đạt.

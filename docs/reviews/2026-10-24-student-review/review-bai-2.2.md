# Review độc lập bài 2.2 — lượt sửa theo kiểm thử học viên

Ngày: 24/10/2026. Công cụ: Codex, agent review độc lập kế thừa model của phiên; không chỉ định model khác.

Phạm vi: đọc toàn bộ `src/content/lessons/2-2-where-loc-nhu-autofilter.mdx`, YAML tương ứng và HTML build hiện có. Review trong vai người học Business Consultant muốn chuyển sang BA/PM, chỉ dùng kiến thức của bài này và các bài trước. Không đọc review cũ hoặc báo cáo học viên gốc.

## Kết luận

Không phát hiện lỗi nội dung hoặc khoảng trống kiến thức buộc sửa trước khi học tiếp. Bài đã giữ đúng mức nhập môn: một điều kiện, phân biệt chọn dòng với chọn cột, xử lý mã/chữ/ngày, rồi làm ba bài tập tương ứng. Phần `NULL` đủ ngắn và không buộc học viên hiểu `UNKNOWN` trước bài 2.5. Có một điểm biên tập nhỏ về kiểu code của số liệu.

## Rà theo thứ tự bài

### 1. Tình huống và phạm vi — Giữ được

Câu gốc (MDX 21–26): “kể cả người đã nghỉ”; “mã phòng hiện lưu, không phải phòng tại một thời điểm cũ”.

Người học biết rõ cần toàn bộ hồ sơ mang mã `KD`, bốn cột và tiêu đề tiếng Việt. Điều kiện không tự loại người đã nghỉ; phạm vi không đòi hỏi lịch sử chuyển phòng hoặc thứ tự dòng chưa học. Khớp mục 7 của hồ sơ công ty và nối đúng bài 2.1.

Tự hỏi: **Vì sao hồ sơ đã nghỉ vẫn có trong danh sách?** Bài đã trả lời ngay trong yêu cầu và phạm vi; không cần suy đoán nghĩa của “nhân viên phòng Kinh doanh”. Không đề nghị thêm điều kiện trạng thái.

### 2. Từ AutoFilter đến `WHERE` — Giữ được

Câu gốc (MDX 32–45): “Với câu `SELECT`, `WHERE` lọc dòng được trả về”; “Dấu `=` ở đây là so sánh, không phải gán mã mới”.

Chuyển từ Excel sang SQL rõ. Hình trích có số dòng `1, 3, 4, 21`; các ô đánh dấu khớp phần giải thích và vẫn giữ `NV020`. Không đánh đồng ẩn dòng với xóa dữ liệu, không nói Excel không lưu được bộ lọc. Giới hạn không sửa nguồn được đặt trong ngữ cảnh câu `SELECT`, phù hợp lời nhắc an toàn đã học ở 1.2 và 1.6. Các câu SQL thực sự có trong bài đều là câu đọc; không cần chèn câu ghi để minh họa.

Tự hỏi: **Lọc có làm mất dòng khỏi bảng không? Vì sao chỉ thêm cột trạng thái chưa đủ?** Bài đã trả lời bằng sự khác nhau giữa `WHERE` chọn dòng và `SELECT` chọn thông tin hiển thị.

Tự hỏi: **Chạy lại SQL có lấy dữ liệu mới hơn file xuất không?** Bài đã nói rõ mỗi bên xét nguồn nào lúc chạy và file cần lấy lại/làm mới kết nối.

### 3. Viết điều kiện theo giá trị đang lưu — Giữ được

Câu gốc (MDX 49–59): “Tên cột không đặt trong nháy đơn”; “Chữ tiếng Việt có dấu dùng tiền tố `N`”; “đây là chuyển kiểu ngầm đã gặp ở bài 1.3”.

Các thuật ngữ mới có nghĩa ngay cạnh chỗ dùng. `collation` được giới hạn ở một câu ngắn có định nghĩa và dẫn sang 2.7; không bắt học viên hiểu cơ chế bên dưới để viết điều kiện hiện tại. Đã phân biệt tên phòng với mã đang lưu; câu lọc trạng thái nhưng chỉ lấy mã và họ tên làm rõ cột điều kiện không phải cột bắt buộc xuất ra.

Tự hỏi: **Tại sao viết `KD` thay vì `Kinh doanh`, dùng `N` khi nào, và tại sao chuỗi ngày so được với cột ngày?** Bài đã trả lời; các điểm `nvarchar`, `date` và chuyển kiểu ngầm đã có nền ở 1.3.

Ví dụ ngày và bảng sáu phép so sánh (MDX 61–85) có giá trị cụ thể, phạm vi ba hồ sơ rõ, phân biệt lấy/loại ngày mốc. Câu “từ đầu năm” không bị hiểu thành giới hạn trong một năm; giới hạn cột `date` không có giờ được nói ngay cạnh ví dụ. Ba ngày dùng để đối chiếu khớp hồ sơ công ty.

Tự hỏi: **Vì sao dùng `>=` thay vì `>`, và có lấy cả hồ sơ của năm sau không?** Bài đã trả lời bằng `NV001` ở ngày mốc và ví dụ giả định năm 2027. Không cần đưa cú pháp nhiều điều kiện hoặc mốc cuối ngày có giờ vào bài này.

### 4. Phạm vi `NULL`/`UNKNOWN` — Giữ được

Câu gốc (MDX 87–89): “`WHERE` chỉ giữ dòng khi điều kiện đúng. Giá trị thiếu `NULL` cần cách kiểm riêng, học ở bài 2.5.”

Đủ để người mới tránh suy ra rằng mọi giá trị thiếu đều so như giá trị thường. Bài không đưa bảng chân trị hoặc thuật ngữ `UNKNOWN` vào phần giảng, còn cả ba bài tập không yêu cầu lọc `NULL`. Dẫn sang 2.5 ở đây không che một phần kiến thức cần để làm đề hiện tại.

Tự hỏi: **Tôi có cần hiểu trạng thái logic thứ ba để làm bài này không?** Không; quy tắc giữ dòng khi điều kiện đúng cùng giới hạn một điều kiện đã đủ. Giữ cách rút gọn này, không đề nghị khôi phục giảng sâu `UNKNOWN`.

### 5. Câu lệnh tình huống, kết quả và `RunFlow` — Giữ được

Câu gốc (MDX 109): “có `14` hồ sơ đang lưu mã phòng `KD`, gồm `13` hồ sơ `Đang làm` và `1` hồ sơ `Đã nghỉ` là `NV020`”.

Khép đúng yêu cầu cạnh câu lệnh và kết quả: bốn cột/tiêu đề đúng, sáu dòng chỉ là phần trích, `NV020` được đánh dấu đúng dòng 6. Cơ cấu `14 = 13 + 1` khớp hồ sơ công ty; chưa xem đây là xác nhận lại bằng SQL live. Lời giải không biến danh sách thành kết luận về phòng ban quá khứ.

Sơ đồ có ba bước `FROM → WHERE → SELECT`, giữ `48 → 14 → 14` hồ sơ, tách việc giảm dòng khỏi giảm cột. Lời dẫn xác định đây là thứ tự logic, không phải cách đọc dữ liệu vật lý. Drawer giải thích vì sao dùng cột nguồn ở điều kiện trước lúc đặt alias, đủ nền cho lỗi tại mục Hay nhầm.

Tự hỏi: **Tại sao SQL viết `SELECT` trước mà tôi đọc `FROM` trước? Vì sao không lọc bằng alias vừa đặt?** Bài đã trả lời bằng sơ đồ và Hay nhầm 1.

Đối chiếu HTML tĩnh: câu SQL nhiều cột và câu tương ứng trong drawer giữ tab thật trước `MaPB`; thuộc tính `data-copy` cũng chứa tab thật. Các caption kết quả ghi rõ trích sáu/ba dòng trên tổng 14, danh sách bài tập có đủ ba bài. Đây chỉ là kiểm HTML tĩnh; chưa kiểm thao tác bấm drawer, clipboard, dán vào editor hoặc độ rộng tab trên màn hình.

### 6. Hay nhầm: lỗi so với kết quả 0 dòng — Giữ được

Câu gốc (MDX 180–184): alias sai “báo `Invalid column name 'Mã phòng'.`”; hai điều kiện nhầm chuỗi/mã “chạy thành công nhưng trả `0` dòng”; “Kết quả 0 dòng chưa đủ để kết luận thiếu dữ liệu”.

Đã tách hai việc mà người mới dễ lẫn: câu bị từ chối với câu chạy được nhưng điều kiện không khớp. Ba nguyên nhân so tên nguồn/chuỗi cố định/mất dấu có hậu quả cụ thể, không chỉ bảo học viên kiểm cú pháp. Ví dụ mốc `>` loại `NV001` giúp đọc lại yêu cầu nghiệp vụ thay vì chỉ nhìn câu chạy được.

Tự hỏi: **Không có dòng có nghĩa là chương trình lỗi hoặc database thiếu dữ liệu không?** Bài đã trả lời là chưa đủ căn cứ; phải đối chiếu điều kiện và cách viết giá trị. Kết quả cụ thể của trường hợp bỏ `N` và nguyên văn lỗi alias chưa được reviewer chạy lại; không kết luận tác giả sai chỉ vì chưa xác minh live.

### 7. Một điểm biên tập nhỏ — Biên tập, P3

Câu gốc (MDX 182): “trả 0 dòng trên database khóa học”; “Kết quả 0 dòng chưa đủ”.

Số `0` lấy từ kết quả cụ thể đang để chữ thường, trong khi cùng loại dẫn chứng ở Hay nhầm 2 đã dùng code. Không ảnh hưởng hiểu bài, nhưng chưa đồng nhất mục 2.2 của quy ước.

Đề xuất: bọc hai số `0` trong code; không cần thêm câu giải thích. Có thể đồng nhất các số đếm hồ sơ `48`, `14` trong lời dẫn sơ đồ (MDX 115) khi rà định dạng.

### 8. Ứng dụng, ghi nhớ và độ tải — Giữ được

Ba ứng dụng đều dùng đúng năng lực vừa học: lọc theo phòng, trạng thái, mốc tiếp nhận. Không hứa kiểm chứng dữ liệu hoặc tự suy ra người đủ điều kiện nghiệp vụ. `Memo` ôn đúng các trục của bài; không đưa kiến thức mới vào phần ôn.

Mạch có bốn tiểu mục trong phần chính, không tách lại Excel/SQL hoặc trả lời tình huống ở một mục riêng. Thời lượng 20 phút phù hợp việc đọc ví dụ, sơ đồ và làm ba bài một điều kiện. Không phát hiện đoạn dài cần cắt để hạ tải. Bài 2.2 có thực hành, không thuộc nhóm bắt buộc thêm ba câu tự kiểm tra; ba đề đã phủ ba dạng giá trị của mục tiêu, nên không yêu cầu thêm khối tự kiểm tra chỉ để đủ khuôn.

### 9. Ba bài tập YAML — Giữ được

- **2-2-1:** xác định bảng, mã `KT`, ba cột theo thứ tự; cho biết bao gồm người đã nghỉ nếu có và không thêm bộ lọc khác. Học viên dùng được mẫu lọc mã phòng mà không chép nguyên câu ví dụ.
- **2-2-2:** điều kiện theo trạng thái `Đã nghỉ`, ở mọi phòng, không suy từ ngày nghỉ việc; bốn cột đúng phạm vi đề. `NgayNghiViec` đã được giới thiệu ở 1.3/1.6. Kiến thức chữ Unicode và việc chọn cột hiển thị đủ làm đề.
- **2-2-3:** nói rõ ngày 1 tháng 10, gồm ngày mốc và không có ngày kết thúc; chỉ cần đổi sang `yyyymmdd` cùng `>=`. Không buộc dùng `AND`/`BETWEEN` hoặc hiểu năm học viên đang mở trang.

Cả ba đề đều cho rõ thứ tự cột và không yêu cầu thứ tự dòng; YAML `columns` và `ordered: false` khớp mô tả. Đáp án chỉ dùng kiến thức đã dạy, là câu đọc, không thay đổi nguồn. Chưa chạy bộ chấm nên đây là đối chiếu đề–đáp án bằng đọc nguồn, không phải xác nhận chấm tự động.

## Ưu tiên và giới hạn thực tế

1. Không có finding nội dung bắt buộc sửa trong phạm vi review này.
2. P3: đồng nhất kiểu code của các số đếm nêu ở mục 7 khi biên tập; không cần mở rộng kiến thức.

Nguồn đối chiếu: `AGENTS.md`, `docs/quy-uoc.md` (đặc biệt 2.1–2.4, 3, 4.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; toàn bài 1.1, 1.2, 1.3, 1.6, 2.1; MDX/YAML bài 2.2; `dist/bai/2-2-where-loc-nhu-autofilter/index.html`.

Không kết nối database, không chạy SQL, không đọc seed, `.env`, secret hoặc tài liệu SQL ngoài khóa học. Không chạy test/build mới trong lượt review này và không kiểm tương tác trình duyệt. Các số đếm hồ sơ chính chỉ được đối chiếu với hồ sơ công ty; giá trị chỉ xác minh được bằng thực thi, nguyên văn lỗi và hành vi bỏ `N` vẫn cần kết quả kiểm của tác giả. Reviewer chỉ tạo report này, không sửa sản phẩm, test hoặc docs.

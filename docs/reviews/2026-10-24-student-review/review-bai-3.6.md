# Review độc lập bài 3.6 — Kết nhiều bảng

Ngày review: 25/10/2026. Công cụ: agent Codex, kế thừa model của phiên. Phạm vi: toàn bộ MDX 3.6, YAML ba bài tập và nội dung năm drawer `RunFlow`; đối chiếu HTML production có thời gian sửa 25/10/2026 00:20:11.

**Kết luận:** chưa thấy lỗi chặn hoặc thiếu kiến thức để làm ba đề. Mạch độ chi tiết → khoản lương bị lặp → kiểm ứng viên → đối chiếu 43 dòng làm rõ được rủi ro của kết nhiều bảng. Có một đề xuất biên tập nhỏ tại dòng 91; không cần thêm phần giảng hay ví dụ giải đề.

## Rà theo thứ tự bài

### 1. Tình huống, quy tắc ngày và Key — Giữ được

**Câu gốc:** “Quy tắc báo cáo: hợp đồng **ứng viên tại mốc** thỏa…”; “Một dòng lương được nhận diện bằng cặp kỳ lương và mã nhân viên…” (MDX dòng 24–26).

Phạm vi đã chốt đủ: kỳ `2026-09`, mốc `30/09`, nhận cả hai đầu bằng mốc, không lọc trạng thái hiện tại. Cách gọi “ứng viên” đi cùng điều kiện cụ thể, và câu giới hạn ngay tại đây ngăn hiểu nhầm đây là kết luận hiệu lực pháp lý hay cách tính lương cả tháng. Không cần thêm đoạn cảnh báo.

**Tự hỏi:** Tại sao chọn hợp đồng theo ngày mà chưa gọi là hợp đồng dùng để tính lương? **Bài đã trả lời:** đây là quy tắc đối chiếu theo ngày đã lưu; số tiền lấy từ bảng lương.

### 2. Độ chi tiết, Excel và hai quan hệ — Giữ được

**Câu gốc:** “**Độ chi tiết của dòng** là ý nghĩa của một dòng…” (dòng 32); “`BangLuong` không lưu `MaHD` để trỏ trực tiếp tới một hợp đồng.” (dòng 41).

Định nghĩa mới đứng cạnh ba khóa cụ thể, đủ hiểu vì sao cùng `MaNV` chưa đồng nghĩa một dòng ở mỗi bảng. Hình Excel được gọi đúng là minh họa; `B2` được giải thích là hợp đồng dò được, `C2` là tiền đã lưu. Hướng dẫn tạo `HopDongMoc` nói rõ lọc ngày và đếm ứng viên trước khi VLOOKUP, thay vì mặc định đã có một sheet sạch.

Bảng hai cặp cột thể hiện đúng `NhanVien` là điểm liên kết hai phía, đồng thời tách quan hệ theo mã khỏi phạm vi ngày/kỳ. Bảng này đủ cho bài; không cần đưa ERD toàn bộ trở lại.

**Tự hỏi:** Tại sao không kết thẳng bảng lương với hợp đồng bằng mã hợp đồng? **Bài đã trả lời:** bảng lương không có `MaHD`; hai bảng cùng trỏ tới hồ sơ qua `MaNV`.

### 3. NV021 và khoản tiền bị lặp — Giữ được

**Câu gốc:** “Khoản `16457000` xuất hiện ở cả `3` dòng vì cùng dòng lương khớp ba hợp đồng.” (dòng 80).

Câu SQL chỉ lấy một mã trong một kỳ, nên bảng ba dòng cho thấy rõ chính hợp đồng tạo thêm cặp. Ba mã hợp đồng khác nhau và một số tiền lặp lại làm lời giải về `DISTINCT` có căn cứ nhìn thấy được. Phép nhân `16457000 × 3 = 49371000` khớp nội bộ; không coi đây là kiểm lại số tiền bằng database.

Ví dụ này có vai trò mới so với NV021 ở bài 3.5: chuyển từ đếm dòng hợp đồng sang hậu quả cộng dư tiền. Không đề nghị cắt nó chỉ vì cùng sử dụng một hồ sơ.

**Tự hỏi:** Vì sao số dòng tăng lại ảnh hưởng báo cáo lương? **Bài đã trả lời:** mỗi cặp hợp đồng lặp lại cùng khoản tiền, nên cộng kết quả sẽ cộng dư. Vì sao `DISTINCT` không chữa được? **Bài đã trả lời:** còn `MaHD` thì các dòng khác nhau; bỏ mã sẽ mất căn cứ đối chiếu.

### 4. Kiểm ứng viên — Biên tập nhỏ

**Câu gốc:** “Điều kiện ngày không phải ràng buộc duy nhất: hai hợp đồng chồng ngày vẫn có thể cùng đạt.” (dòng 91).

“Không phải ràng buộc duy nhất” có hai cách đọc: không phải một luật bảo đảm duy nhất, hoặc đây không phải luật duy nhất cần xét. Người mới chưa học sâu `UNIQUE` có thể phải đọc lại, dù vế sau đã giúp hiểu đúng. Đây là vấn đề câu chữ, không phải sai logic của truy vấn.

**Đề xuất:** đổi ngay câu đang có thành: “Điều kiện ngày không bảo đảm mỗi mã chỉ có một ứng viên: hai hợp đồng chồng ngày vẫn có thể cùng đạt.” Không thêm đoạn giải thích `UNIQUE`.

**Tự hỏi:** Tại sao đã lọc ngày còn phải kiểm số ứng viên? **Bài đã trả lời:** các khoảng ngày có thể chồng nhau; câu `GROUP BY`/`HAVING` tìm mã cần xử lý tiếp. Bài cũng nói rõ người học không tự lấy dòng đầu hoặc mới nhất khi chưa có quy tắc chọn.

### 5. Đối chiếu số dòng và câu lệnh tình huống — Giữ được

**Câu gốc:** “Kiểm trùng trả `0` chỉ xác nhận **tối đa một** ứng viên mỗi mã, chưa kiểm báo cáo có bỏ dòng lương.” (dòng 93); “Chị Hạnh nhận đủ `43` dòng lương kỳ `2026-09`…” (dòng 190).

Đây là mắt xích cần giữ: kiểm trùng không chứng minh không thiếu, nên bài đếm nguồn lương riêng và đối chiếu kết quả cuối. Câu cuối chỉ khẳng định đủ sau cả hai bước, không suy rằng `INNER JOIN` tự giữ đủ nguồn. Nếu ít hơn thì đã dẫn về cách tìm không khớp ở 3.5.

Câu chính lấy tiền từ `bl.ThucLinh`, đặt hai điều kiện ngày ở phép kết hợp đồng và kỳ ở phép kết lương, rồi sắp thứ tự rõ. Kết quả trích 10 trong 43 dòng; câu trả lời nằm ngay cạnh kết quả, không giảng lại SQL. Đoạn “Ở bài này chỉ cần…” giới hạn hợp lý sang 4.2, 4.6–4.7.

**Tự hỏi:** Tại sao `0` mã trùng vẫn chưa đủ để gửi báo cáo? **Bài đã trả lời:** còn khả năng thiếu dòng lương do không khớp hợp đồng; phải đối chiếu số dòng gốc. Tại sao không thay tiền bằng lương cơ bản hiện tại? **Bài đã trả lời:** mục tiêu là đọc khoản tiền đã lưu của kỳ, không tính lại lương.

### 6. RunFlow và cả năm drawer — Giữ được

**Câu gốc:** “Đây không phải thứ tự thực thi vật lý; trước `ORDER BY`, thứ tự có thể khác hình.” (dòng 194).

Đã đọc đủ `FROM` → `INNER JOIN HopDong` → `INNER JOIN BangLuong` → `SELECT` → `ORDER BY`, gồm `focus`, `meaning`, `detail`, SQL quan sát, cột, dòng và tổng. Chuỗi 48 → 45 → 43 → 43 → 43 nhất quán với lời giảng và hồ sơ công ty. Mỗi drawer bắt đầu giải thích bằng từ khóa của bước; bước hợp đồng nói rõ chưa giới hạn lương, bước lương chỉ giữ kỳ cần lấy. Các bảng chi tiết đều trích tối đa 10 dòng và ghi tổng, không giả làm toàn bộ kết quả.

Đối chiếu HTML thấy SQL chính và SQL quan sát giữ tab thật, không hiện escape dạng chữ. Chưa kiểm thao tác mở drawer, Sao chép hoặc dán bằng trình duyệt.

**Tự hỏi:** Vì sao từ 45 ứng viên chỉ còn 43 dòng? **Bài đã trả lời:** phép kết thứ hai chỉ nhận mã có dòng lương kỳ `2026-09`; không phải 45 người đều có lương kỳ đó.

### 7. Hay nhầm, Ứng dụng, Ghi nhớ và tự kiểm tra — Giữ được

**Câu gốc:** “Kết lương chỉ bằng mã nhưng quên kỳ”; “Bổ sung thông tin cho bảng lương”; “Khóa của `BangLuong` là `MaNV` hay cặp `KyLuong`, `MaNV`?”

Bốn lỗi đều gắn với hậu quả của bài: lẫn kỳ, nhận hợp đồng chưa bắt đầu, nhiều hợp đồng cùng đạt và cộng tiền bị lặp. Ba ứng dụng đúng chủ đề kết bảng và kiểm số dòng; việc thêm tên phòng/chức danh có giới hạn “hiện lưu”. Ghi nhớ cô đọng được các điểm cần mang sang bài tập.

Ba câu tự kiểm tra phủ cơ chế lặp tiền, giới hạn của lọc ngày và khóa kỳ lương; đặt đúng sau Ghi nhớ, trước Bài tập. Khái niệm mới được in đậm có chọn lọc; dẫn chứng, tên bảng/cột và ô Excel dùng code. Không có lý do thêm câu tự kiểm tra chỉ để tăng số lượng.

### 8. Đủ kiến thức làm cả ba bài tập — Giữ được

Đã đọc đầy đủ prompt, thứ tự cột, điều kiện, đáp án và yêu cầu thứ tự dòng trong YAML. Không thấy đề dùng khái niệm bắt buộc chưa được dạy:

| Đề | Kiến thức cần dùng | Căn cứ người học đã có |
|---|---|---|
| `3-6-1` | Lương → nhân viên → phòng, kỳ tháng 8, phòng hiện tại | Bài 1.5 nêu đúng hai cặp cột; 3.4 dạy alias và `INNER JOIN`; 3.6 dạy nhiều phép kết và giới hạn kỳ; `WHERE`/`AND`/`ORDER BY` đã học ở Level 2. |
| `3-6-2` | Lương → nhân viên → chức danh, lọc `MaCD = 'TP'` | Bài 1.4 nêu trực tiếp `NhanVien.MaCD` trỏ `ChucDanh.MaCD`; 3.4 đã nêu đổi mã chức danh thành tên trong Ứng dụng. Đề tự chỉ rõ cột cần trả và phạm vi chức danh hiện lưu. |
| `3-6-3` | Kết toàn bộ lịch sử hợp đồng với người có lương một kỳ; đếm theo mã và tên rồi lọc trên 1 | 3.6 có ví dụ lịch sử NV021 và kiểm ứng viên bằng đếm/nhóm; 3.1 phân biệt `COUNT(*)` với `COUNT(cột)`; 3.2 dạy nhóm nhiều cột và mọi cột lấy trực tiếp phải nằm trong nhóm; 3.3 dạy `HAVING`. |

Đề 3 phân biệt rõ đếm lịch sử với đếm ứng viên theo ngày, nên không đánh đố người vừa đọc quy tắc mốc `30/09`. Bài tập đổi đường kết hoặc phạm vi, đủ để người học vận dụng thay vì chép nguyên câu tình huống. Không đề nghị chèn thêm một lời giải ba bảng có nhóm vào bài.

## Ưu tiên

1. **P3 — Biên tập:** sửa cụm “không phải ràng buộc duy nhất” ở dòng 91 bằng câu ngắn đề xuất tại mục 4.
2. Các mục còn lại giữ được. Chưa phát hiện yêu cầu cần thêm lý thuyết, đổi đề, đổi bảng quan hệ hoặc tăng độ sâu.

## Nguồn đối chiếu và giới hạn

- Đọc `AGENTS.md`, toàn bộ brief của lượt, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1; các bài trước liên quan 1.3–1.5, 2.3, 2.5, 3.1–3.5.
- Đọc toàn bộ `src/content/lessons/3-6-ket-nhieu-bang.mdx`, `src/content/exercises/3-6-ket-nhieu-bang.yaml`; đối chiếu `dist/bai/3-6-ket-nhieu-bang/index.html` cùng cách trình bày `RunFlow.astro` và CSS liên quan khi cần hiểu HTML.
- Không đọc seed, `.env`, bí mật, báo cáo kiểm thử học viên gốc, ma trận tác giả hoặc report reviewer khác. Không kết nối database, chạy SQL, tra SQL bên ngoài, chạy bộ chấm hay kiểm thử tương tác trình duyệt.
- Các tổng 45 ứng viên, 43 dòng lương, giá trị tiền và mã hợp đồng chỉ được đối chiếu nhất quán giữa nội dung/hồ sơ công ty; **chưa xác minh lại bằng database**. Review này không thay cho kiểm SQL live, kiểm copy/paste hoặc visual QA của người viết.
- Chỉ tạo report này, không sửa sản phẩm, test, tài liệu quy ước, spec/plan hay commit.

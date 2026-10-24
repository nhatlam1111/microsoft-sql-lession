# Hoàn thiện các bài kết bảng 3.4–3.7

Yêu cầu tiếp tục ngày 24/10/2026. Kế thừa hướng đã duyệt ở 1.1–3.3 và quy ước thụt lề 23/10: khung gộp Excel/SQL, trả lời tình huống cạnh kết quả, giữ các mục cuối, ba bài tập mỗi bài và review độc lập. Không mở lại lựa chọn bố cục hoặc thiết kế giao diện đã chốt.

## Phạm vi và hướng triển khai

| Bài | Tình huống / mục tiêu | Giới hạn phải giữ |
|---|---|---|
| 3.4 | Danh sách hồ sơ kèm tên phòng: INNER JOIN, ON, bí danh bảng và cột có tiền tố. | Chỉ giữ cặp khớp; cùng tên cột chưa chứng minh quan hệ; một dòng mỗi hồ sơ nhờ khóa phía danh mục là duy nhất. |
| 3.5 | Tìm hồ sơ chưa có bất kỳ hợp đồng nào: LEFT JOIN và IS NULL trên khóa NOT NULL. | Không đồng nhất NULL với #N/A mọi trường hợp; bảng phải có nhiều dòng khớp; ON khác WHERE khi cần giữ dòng không khớp. |
| 3.6 | Lương kỳ 2026-09 kèm hợp đồng ứng viên tại 30/09: kết ba bảng và kiểm độ chi tiết. | Mỗi cặp kỳ/mã NV là một dòng lương; kết mọi hợp đồng có thể nhân tiền; điều kiện ngày không tự bảo đảm duy nhất. Không dùng DISTINCT che sai hay dạy trước ROW_NUMBER/CTE. |
| 3.7 | Danh sách kèm quản lý trực tiếp: một bảng, hai vai trò/bí danh. | Giữ hồ sơ MaQuanLy NULL bằng LEFT JOIN; không dựng lịch sử hoặc suy nhiều cấp. COUNT(khóa con) khác COUNT(*) khi nhóm từ phía quản lý. |

Giữ chị Hạnh và tháng 10/2026. Phòng/chức danh/quản lý lấy theo dữ liệu hiện lưu; báo cáo kỳ lương không tự có tên phòng/quản lý tại quá khứ. Quy tắc chọn ứng viên hợp đồng theo hai mốc ngày là quy tắc báo cáo, không chứng nhận pháp lý. Thời lượng dự kiến 20–25 phút/bài gồm bài tập.

Tiếp tục MDX/YAML/RunFlow hiện có, không đổi UI/API/grader/schema/seed. Bài 3.5 chuyển khỏi danh sách khung cũ; ba bài tóm tắt chuyển full. Giữ ba bài tập 3.5 và làm rõ phạm vi/thứ tự; thêm chín bài tập cho 3.4/3.6/3.7. Câu minh họa không trùng đáp án nguyên vẹn. Dữ liệu literal lấy từ SELECT live, không tự suy số liệu từ seed.

## Kiểm chứng và review

Mỗi bài một agent mới kế thừa model Codex, không override; tác giả đọc hết report rồi đối chiếu SQL/Microsoft. Đối chiếu các Result/RunFlow/Excel, thử bài làm sai tiêu biểu qua core API; đáp án chạy qua runner luôn hoàn tác và check:data sau đó. Chạy test/check/build/check:dist, API build/typecheck, xem build 1280px/1440px và bàn phím/copy. Giữ lỗi nền ngoài phạm vi, ghi đúng giới hạn. Ghi tiến độ ở plan cùng ngày, evidence tạm trong temp/verification/2026-10-24-lessons-3-4-3-7/.

## Đã sửa sau review độc lập

Đọc hết bốn report trước khi sửa từng bài; [hồ sơ bàn giao và report gốc](../../reviews/2026-10-24-lessons-3-4-3-7/README.md). Mỗi bài một reviewer mới, không mang ngữ cảnh viết, kế thừa model Codex của phiên.

- **3.4:** giải nghĩa ON lần đầu bằng tên bảng đầy đủ; đọc rõ bí danh/dấu chấm; đối chiếu VLOOKUP giữ dòng với INNER JOIN bỏ dòng khi không khớp. Preview hiện TenPB bằng thuộc tính có sẵn, không đổi component; cắt câu đếm lặp, chỉnh nhãn lỗi/ứng dụng nhóm theo mã và tên, code cho drawer/tự kiểm. Đề đầu dùng KD thay IT vì mã IT trùng tên IT; đã thử trả mã thay tên và bỏ người đã nghỉ đều bị từ chối.
- **3.5:** ghi rõ bản xuất đầy đủ, #N/A chưa chứng minh thiếu hợp đồng; 57 dòng là trước WHERE; chú thích dòng đánh dấu và hình trích tối đa 10 dòng. Sửa tên bước WHERE, gọi đúng biểu thức thử việc làm mất dòng, bỏ thuật ngữ ứng viên chưa giải nghĩa và ứng dụng lặp định nghĩa. Chốt câu tự kiểm 3 là chỉ lấy hồ sơ chưa có thử việc; sửa code và tiêu đề dòng lương. Giữ ba đáp án hiện có.
- **3.6:** nhóm rõ nhánh OR ngay trong quy tắc; nói một mốc đối chiếu, hai phép so sánh nhận bằng mốc. Phân biệt kiểm tối đa một ứng viên với kiểm đủ dòng lương: thêm COUNT riêng kỳ 2026-09, đối chiếu 43 dòng sau khi đã kiểm trùng. Drawer giải thích 48 xuống 45 do không khớp; làm rõ BangLuong không lưu MaHD. Bỏ mark không có ý nghĩa riêng ở kết quả chính và vế phòng/chức danh không nằm trong query; cắt lời dặn lặp ở Hay nhầm. Chỉnh code và preview để thấy mã hợp đồng/số tiền.
- **3.7:** COUNT(cột) chỉ đếm giá trị khác NULL, không mô tả là bỏ dòng; nói rõ dòng NV048 được đánh dấu. Đề 3-7-2 gọi đúng mã của chính người quản lý, tránh hiểu ql.MaQuanLy là quản lý cấp tiếp; đáp án giữ ql.MaNV. Chỉnh dẫn bài 3.6, code trong Key/drawer/tự kiểm và preview tên quản lý; cắt vế sao chép bảng bị lặp.
- Cập nhật hồ sơ công ty, catalog/test/README; bỏ 3.5 khỏi allowlist khung cũ. Chỉ sửa câu tham chiếu 3.5 ở đầu template vốn còn gọi bố cục cũ; không đổi quy ước, schema hoặc mẫu cấu trúc.

## Không làm theo / giới hạn giữ có chủ đích

- Không thêm CASE, SSMS, Messages, LineMap hoặc câu tự kiểm thứ tư chỉ để đủ khối. Bốn bài không có CASE; kiểm hai cấp CASE của đợt định dạng trước không được tính lại là đã chạy ở đợt này.
- Không chèn backtick vào ô Excel/Memo hoặc prompt YAML thuần chữ; giữ định dạng của component. Không đảo cột đầy đủ để chữa preview: dùng preview hiện có, giữ SQL/Result nguyên thứ tự.
- Không thay INNER JOIN chính 3.6 hoặc tự chọn hợp đồng mới nhất. Dữ liệu hiện có một ứng viên mỗi mã sau kiểm; đã thêm kiểm không bỏ dòng lương. Trường hợp chồng ngày phải thống nhất nghiệp vụ; xếp hạng để 4.2, kiểm bất thường để 4.6–4.7.
- Không đổi phạm vi đề 3-7-2 để buộc LEFT/INNER khác kết quả: NS hiện đều có quản lý; mục tiêu đề là nguồn cột của hai vai trò. Bộ chấm theo kết quả không chứng minh mọi thao tác hay cú pháp học viên dùng là đúng; bài giảng chính và test giữ rõ NV004 NULL.
- Không mở rộng UI/API/grader, dữ liệu mẫu hoặc luồng truy cập; không sửa các hint deprecation nền. Kiểm người học và kiểm thực thi của tác giả được ghi riêng, không gọi report tĩnh là đã chạy DB/browser.

## Kết quả cuối

277/277 test; Astro check 0 errors/0 warnings, ba hint nền; build 108 trang, check:dist 1.740 link. API build 54 bài tập, typecheck đạt, 54 đáp án chạy hoàn tác và check:data không lệch. Đối chiếu live 34 SELECT khác nhau gồm toàn bộ SQL/Result/18 bước Flow, đếm riêng lương và trạng thái ba FK; 39 ô Excel khớp dữ liệu live. 60 cặp minh họa/đề bài không giải nguyên vẹn đáp án; 26 bài sai bị core API từ chối. Browser 1280/1440px không tràn trang; 18 drawer/12 tự kiểm bằng bàn phím, copy/dán giữ tab. Xem hồ sơ bàn giao để biết giới hạn và trạng thái Git thực tế.

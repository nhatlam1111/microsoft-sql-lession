# Kiểm tích hợp và đăng bài 2.5–2.9

## Phiên bản và phạm vi

- Base main/origin/main: `9a0762b393cc2674f262bf0ffa88f43cb4911c18`.
- Source được kiểm: `ee6e1b9d8b13974e216b800b3ab8f9fab4d4e467`, nhánh `feat/lesson-2-5-null`, sạch trước khi thêm hồ sơ này.
- 15 commit, 58 file: bài 2.5–2.9, drawer RunFlow, lời tương thích ở các bài còn lại, YAML 2.5/2.7/2.8/2.9, quy ước/template/hồ sơ công ty, test và hồ sơ review từng bài.
- Không thay seed, API, editor, mã bài tập hoặc khóa lưu nháp. Thay prompt/answer: 2-5-3 đổi VH thành KD; 2-7-2 đổi sang Latin1_General_CI_AI. Hai prompt ngày 2.8/2.9 được làm rõ, answer giữ nguyên.
- Hồ sơ review từng bài và RunFlow đã có trong cùng thư mục cha; các phép kiểm SQL/live trước đây là bằng chứng tác giả cũ, không coi là kiểm mới của reviewer tích hợp.

## Kiểm mới trên feature, 31/10/2026

Log: `temp/verification/2026-10-31-publish-2-5-2-9/`.

| Kiểm | Kết quả |
|---|---|
| npm test | 49 file, 366 test đạt |
| npm run check | 194 file; 0 lỗi, 0 warning, 3 hint nền |
| npm run build | 129 trang |
| npm run check:dist | 129 trang, 1951 link đạt |
| API typecheck/build | Đạt |
| API check:exercises | 76 đáp án chạy xong; 2.5: 3/13/14, 2.6: 6/7/2, 2.7: 7/2/10, 2.8: 4/4/1, 2.9: 10/14/5 dòng |
| API check:data sau runner | Không bảng nào lệch |

Runner hiện hành luôn hoàn tác câu ghi; không chạy câu ghi trực tiếp. Không đọc/in secret. Ba hint nền: hai chỗ `FormEvent` trong ExerciseWorkspace và `document.execCommand` trong SqlEditor; các file này không đổi trong lượt merge.

## Review tích hợp và ma trận xử lý

Reviewer Codex mới, ngữ cảnh mới, kế thừa model và không chỉ định model khác, chỉ ghi report được giao; không tạo reviewer con. [Report gốc](integration-review.md) được sao chép nguyên văn từ `temp/review/2026-10-31-publish-2-5-2-9/integration-review.md`. Reviewer đã đối chiếu 38 source và 128 HTML trong manifest khớp; không chạy test/SQL/API/browser. Không có lỗi source cần sửa trước merge; 15 đề đủ tiền đề theo kiểm tĩnh. Không dùng review như quyền push.

Đã đọc hết report trước khi xử lý. Không thay sản phẩm sau review; chỉ thêm hồ sơ và liên kết trạng thái trong spec/plan.

| Nhận xét | Quyết định | Căn cứ và xử lý |
|---|---|---|
| I1 — nền và giới hạn giữa bài | Làm theo | Giữ phần giảng hiện tại; không thêm lời giải phụ khi 15 đề đã có tiền đề. |
| I2 — UNKNOWN/CASE | Làm theo | Giữ biểu diễn đang dùng; có test, HTML, UI mới của tác giả và SQL lịch sử riêng, không đánh đồng các loại bằng chứng. |
| I3 — nháp/hoàn thành theo ID | Làm theo | Ghi hệ quả và quyết định giữ nháp/lịch sử ở dưới; không tự migrate/xóa dữ liệu học viên. |
| I4 — grader không kiểm cú pháp collation | Làm theo | Ghi giới hạn ở dưới, không đổi grader/seed ngoài phạm vi. |
| Mục 6 — drawer 440px ở mobile | Làm theo | Ghi lỗi responsive nền qua UI và Git; để sửa riêng, không báo mobile đạt. |
| Mục 6 — JOIN bảng trái, cột đầu vào bài sau (4.3 thiếu KyTruoc, 3.4 thiếu HoTen ở SELECT) | Làm một phần | Ghi giới hạn cụ thể; chưa chuyển nội dung các bài sau 2.9. Kiểm/bổ sung khi từng bài đó đến lượt, không tuyên bố toàn bộ drawer đã đạt chuẩn nội dung mới. |
| Mục 6 — UNION mẫu bốn bước | Làm theo | Giữ đúng mẫu hiện có; chỉ mở rộng khi có luồng khác, chưa có trường hợp hỏng trong source. |
| Mục 6 — bảng soi AND và CASE skip | Làm theo | Giữ cho các ví dụ hiện tại. Chưa hỗ trợ OR hay UNKNOWN của WHEN đã xét; phải mở rộng mô hình trước khi có bài cần. |
| Mục 6 — validator không tính SQL | Làm theo | Giữ phân biệt kiểm liên kết với kiểm số liệu SQL; không gọi build/test là chứng minh số liệu database. |
| Mục 6 — đề 2-8-3 chưa phân biệt biên >/>= bằng kết quả | Làm theo | Giữ đề/seed; đề và lời giảng nêu rõ bỏ ngày chốt. Một lần chấm đúng chưa chứng minh hiểu điểm biên. |
| Mục 6 — ngoại lệ kiến thức ngoài phạm vi | Làm theo | Không thêm sắp NULL, mọi loại khoảng trắng, CASE tổng hợp/lỗi hoặc pháp lý hợp đồng vì 15 đề không cần. |
| Mục 6 — UI/SSMS/SQL/thời lượng | Làm theo | Lưu riêng những gì tác giả đã thử và chưa thử; không chứng nhận screen reader, SSMS, submit production hoặc thời lượng học. |

### Quyết định về tương thích bài tập

- Giữ ID và cơ chế lưu hiện hành, không xóa/migrate nháp hoặc dấu hoàn thành của người học. Với 2-5-3, nháp cũ lọc VH vẫn mở được nhưng phải đổi sang KD theo đề mới khi làm lại. Dấu hoàn thành cũ là lịch sử, không tự xác nhận người học đã làm đúng phiên bản đề mới.
- Với 2-7-2, evidence tác giả từng bài cho thấy Vietnamese_CI_AI và Latin1_General_CI_AI tình cờ cùng trả hai dòng ở bộ mẫu. Grader so giá trị nên đáp án dùng collation cũ có thể vẫn được chấm đúng; giữ giới hạn đó, không mở rộng đổi grader hoặc seed trong lượt merge. Đề và lời dạy đã dùng Latin1_General_CI_AI.

## UI mới trên build feature

Kiểm bằng IAB trên preview localhost cổng 4327, không chạy SQL/Chạy/Nộp, không chạm editor/clipboard/nháp của người dùng.

- 1280×800, 2.8 WHERE: đầu vào có ngày NULL, bảng soi ghi hai UNKNOWN và Loại; tổng riêng 20/13/3. Next sang SELECT hiện đủ ngày bắt đầu/kết thúc, cột số ngày; ArrowLeft về WHERE, Escape đóng và trả focus về thẻ.
- 1280×800, 2.9 SELECT: đầu vào đủ mã/tên/ngày; bảng nhánh NV003 Đúng/Không xét, NV025 Sai/Đúng, NV045 Sai/Sai; tổng 33/8/4, ghi chú nêu ô cuối là ELSE. Ba nhãn Đầu vào/Thực hiện/Kết quả; không có nút copy câu kiểm trong drawer.
- 1280×800, 3.8: nhánh 02 dùng nguồn riêng; UNION hiện hai bảng đầu vào 9 và 76 dòng, mỗi bảng trích 5, kết quả 41 mã. Không lấy nhánh 01 làm đầu vào nhánh 02.
- 1280×800, 3.4 INNER JOIN: bảng đầu vào bên trái và bảng kết quả bốn cột hiển thị; chưa có bảng đầu vào bên phải là giới hạn đã duyệt, không tuyên bố kiểm đủ hai nguồn.
- 1024×768, 2.5 WHERE/SELECT: drawer nằm trong viewport; bộ lọc VH/chưa nghỉ 10/45/8, đầu vào SELECT đủ Email; NV044 từ NULL thành `(chưa có)`. Console trên tab lúc cuối không có error được ghi nhận.
- 390×844, 3.4: drawer rộng cố định 440px bị cắt bên trái, topbar/trang tràn ngang. Đối chiếu Git: dòng width và layout này giữ nguyên từ main, không nằm trong diff. Ghi lỗi responsive nền, để ngoài phạm vi merge bài mới; không báo mobile đạt.

Đã xem screenshot 2.8 desktop và 3.4 màn hình hẹp qua công cụ, không lưu ảnh vào repo. Đã đóng tab tạm và reset viewport. Chưa kiểm screen reader, SSMS thật, xác thực/submit production hoặc mọi trình duyệt. HTML/test không thay bằng chứng những thao tác đó.

## Merge và đăng bài

Đang thực hiện; chỉ ghi kết quả sau khi có bằng chứng. Giữ nguyên hai worktree khác của người dùng; không dọn nhánh hoặc worktree trong tác vụ merge.

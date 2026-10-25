# Rà lại toàn bài 3.8 — UNION

Ngày 25/10/2026. Nhánh `codex/review-lesson-3-8`, base `main` `19170bc`. Người dùng yêu cầu kiểm toàn bài, đặc biệt phần “SQL Server chạy câu này thế nào”. Lượt này không gộp nhánh workspace SSMS, không sửa API hay lỗi kết nối local đã được lưu riêng, không có quyền push/merge mới.

## Nguyên nhân và phạm vi sửa

Spec trước chủ động không dùng RunFlow vì hai nhánh độc lập; vì thế bài chỉ giải thích từng mảnh UNION/ALL và sắp xếp, chưa có mục giải thích trực tiếp toàn câu. Bộ kiểm sơ đồ cũng chưa nhận UNION, còn test nội dung chỉ bảo vệ RunFlow khi bài đã có khối này. Yêu cầu mới thay quyết định đó: bổ sung mô hình đúng quan hệ hai đầu vào, không ép chúng thành pipeline.

- Thêm `### SQL Server chạy câu này thế nào` sau lời giải tình huống. Nêu `FROM` → `WHERE` → `SELECT` trong từng nhánh; hai nhánh độc lập, rồi UNION và ORDER BY. Không mô tả thứ tự thực thi vật lý.
- Bốn thẻ có tổng `9 / 76 / 41 / 41`, cùng bốn drawer chứa câu kiểm, dòng trích và highlight riêng. Hai thẻ SELECT song song, cùng cấp dữ liệu cho UNION; không có mũi tên nhánh đầu → nhánh sau. Card và accessible name đều gọi hai đầu vào là “có”, không gọi nhánh hai là dữ liệu “còn” từ nhánh đầu.
- Mở rộng nhỏ trong RunFlow hiện có để nhận UNION/ALL và topology đúng bốn bước. Props/FlowStep không đổi; layout, drawer, phím và focus của các flow cũ giữ nguyên. Ghi cách dùng trong DESIGN/template.
- Gọi rõ **chuyển kiểu ngầm**, dẫn về 1.3; bỏ câu lặp hai tổng; gọi hình đầu là bảng trích chưa bảo đảm thứ tự. Không đổi câu chính, Result, mục tiêu, thời lượng, đề/đáp án, URL, seed hoặc nội dung các bài khác.

## Toàn bài và tiền đề bài tập

Reviewer mới đọc toàn bộ tình huống, lý thuyết, hai ví dụ SQL, bốn Result, Hay nhầm, Ứng dụng, Ghi nhớ, ba tự kiểm tra và ba đề. Đã xác định cách làm trước khi mở answer YAML; [report gốc](initial-review.md) ghi bảng tiền đề từng đề và phần chưa xác minh. Ba đề đều có kiến thức đã giảng, không cần dùng bài sau bù vào.

Giữ các trục đúng: UNION/ALL xử lý lặp trong và giữa nhánh; UNION so toàn bộ dòng; số/vị trí/ý nghĩa/kiểu cột phải phù hợp; tên kết quả theo nhánh đầu; ORDER BY cuối câu sắp chung. Nhãn nguồn thay đơn vị từ mã thành cặp mã–nguồn. Giữ giả định đơn bắt đầu tháng 9, chấm công sau 08:00, không tự kết luận vi phạm hoặc sửa dữ liệu nguồn.

## Ma trận xử lý nhận xét

| Nhận xét | Quyết định | Xử lý / bằng chứng |
|---|---|---|
| Người dùng và R1: thiếu giải thích toàn câu | **Làm theo** | Thêm mục và RunFlow hai đầu vào; test bảo vệ query trùng câu tình huống, focus thuộc nhánh đúng và 4 tổng. Lời dẫn phân biệt logic/vật lý; không giấu tiền đề trong drawer. |
| R2: cơ chế tự chuyển kiểu chưa gọi đúng tên | **Làm theo** | Thay một vế bằng “chuyển kiểu ngầm” và dẫn 1.3; không mở rộng sang luật ưu tiên kiểu. Metadata SELECT xác nhận cả hai MaNV là varchar(10). |
| R3: lặp cặp tổng ngay trước hình | **Làm theo** | Cắt câu lặp, giữ tổng tại đoạn trước/Result và dấu NV005 đúng vị trí. |
| Tích hợp RunFlow | **Giữ được** | Reviewer mới không tìm thấy finding cần sửa; mặc định 3.5/3.9 giữ ba cột/snake, SQL/focus/drawer khớp source/build. [Report](integration-review.md) phân biệt kiểm riêng và evidence tác giả. |

Các report gốc được sao chép nguyên văn. Reviewer Codex dùng ngữ cảnh mới, kế thừa model phiên, không đổi model, không chạy DB hoặc đọc secret. [Re-review nội dung](re-review.md) tiếp tục đúng agent ban đầu, kiểm đủ bốn drawer và tự chạy 38 unit/component test; R1–R3 đóng, không có finding mới. Reviewer tích hợp tự chạy 12 unit và 8 component test chọn lọc; không cộng các lượt này thành số test duy nhất.

## Xác minh SQL và kiểm bằng máy

Chỉ SELECT trực tiếp để kiểm bài, không dùng UI hoặc API đang lỗi để suy đoán số liệu. Đối chiếu [Microsoft Learn về UNION](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-union-transact-sql?view=sql-server-ver17): số/vị trí cột, kiểu tương thích, UNION/ALL và ORDER BY cuối câu. Không chạy các ví dụ ghi dữ liệu trên trang tài liệu.

| Kiểm tác giả thực hiện | Kết quả |
|---|---|
| RED → GREEN cho phần thiếu | 3 test mới thất bại đúng vì thiếu mục/UNION rank/layout; sau sửa 47/47 kiểm liên quan đạt. |
| `npm test` | **306/306**, 42 file, exit 0. |
| `npm run check` | **0 errors, 0 warnings**, 3 hint nền: hai FormEvent và một execCommand trong editor cũ. Không nới test hoặc sửa workspace ngoài phạm vi. |
| `npm run build` | **117 trang**, hoàn tất **23:03:03 +07**, exit 0. |
| `npm run check:dist` | **OK**, 117 trang / 1837 link, không lộ đáp án. |
| API build / typecheck | Cả hai đạt; 63 đề, backend source không đổi. |
| `check:exercises` / `check:data` | **63/63** đáp án qua runner luôn hoàn tác; sau đó không bảng nào lệch. |
| Đối chiếu source bằng SELECT | **9 câu SELECT khác nhau**, **4 Result**, **4 trạng thái**: cột, tổng và mọi dòng trích khớp; phần có ORDER BY khớp prefix đã sắp. Query cuối trùng câu tình huống; mỗi focus khớp query. |
| Premium strict audit | Báo 1 lỗi resize ở SqlEditor cũ. Là false positive đã đối chiếu CSS HEAD `.ed-input { resize: none; }` và computed style browser `none`; không báo auditor toàn bộ xanh. |

Nhánh đơn nghỉ có 9 dòng, nhánh chấm công 76 lần xuất hiện; UNION ALL 85, UNION 41 mã; thêm nhãn nguồn được 49 cặp. Riêng NV005 có một dòng ở mỗi nhánh, thành hai lần với ALL hoặc một với UNION. Script/log và dữ liệu kiểm ở `temp/verification/2026-10-25-union-3-8-recheck/`, không chứa mã truy cập hay mật khẩu.

## Browser và bản local

Preview production tại [bài 3.8](http://127.0.0.1:4334/microsoft-sql-lession/bai/3-8-union-gop-danh-sach/). Không dùng bản dist từ nhánh SSMS làm bằng chứng cho lượt này.

- Kiểm 1440px và 1280px: không tràn ngang trang; hai đầu vào cùng hàng, không có mũi tên giữa chúng; hai đường nối đi vào UNION, rồi mũi tên tới ORDER BY. Thẻ hiện đúng `có 9`, `có 76`, `còn 41`, `còn 41`; bảng trích/card không bị gọi thành tổng.
- Enter mở drawer; ArrowRight đi đủ bốn bước, highlight lần lượt đúng nhánh đơn, nhánh chấm công, UNION, ORDER BY. Escape đóng và trả focus về đúng thẻ. Câu kiểm drawer và text đọc được, cuộn nội bộ tới bảng/câu SQL.
- Sao chép từ drawer nhận tab thật, không nhận hai ký tự backslash–t; dán vào editor QA có đúng 10 dòng và thụt lề. Khôi phục clipboard; không nhập mã, không bấm chạy/nộp trên frontend không ghép API.
- Ba tự kiểm tra mở bằng Enter, đáp án đúng phần đã giảng và vẫn nằm trước bài tập. Điều hướng và TOC hiện hành giữ đủ các mục cấp 2.
- Mở flow 3.9: vẫn bốn thẻ trong snake ba cột, không nhận topology UNION; drawer và ArrowRight/Escape vẫn hoạt động. Test/render độc lập kiểm thêm 3.5.

Ảnh local: `union-1440.png`, `union-1280.png` trong thư mục verification. Chưa kiểm screen reader, SSMS thật, zoom/thiết bị ngoài phạm vi desktop; không lấy test/source audit thay tương tác thực tế. Lỗi API local của nhánh workspace SSMS vẫn là việc riêng chưa xử lý, không nằm trong commit bài học này.

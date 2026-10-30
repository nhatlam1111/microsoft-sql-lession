# Bài 1.1: kiểm và xử lý review — 30/10/2026

Triển khai kế hoạch người dùng đã duyệt: giảm tải, giữ mạch kể. Source từ HEAD `f5f6f2f7899dc30976d1d797559cffbc87366cdb`, checkout `chore/add-teach-skills`; thay đổi local chưa commit. Không push/deploy.

## Thay đổi và quyết định

| Nguồn / nhận xét | Quyết định | Kết quả |
|---|---|---|
| Review trong chat, F1: nhánh nhập file và dán/kéo điền ngoài mục tiêu | Làm theo | Cắt hai vế; giữ ràng buộc được khai báo/đang bật và Excel có Data Validation, cần thiết lập. Không coi các vế cũ là sai kỹ thuật. |
| Review trong chat, F2: câu cuối đoạn nguồn chung lặp | Làm theo | Bỏ câu nhắc không cần sửa từng bản; các giới hạn nguồn cũ/mã gán nhầm và câu trả lời Quân còn nguyên. |
| Review trong chat, F3: Ghi nhớ nghiêng về khóa | Làm theo theo kế hoạch đã duyệt | Một câu chốt database/SQL Server/SQL, Memo hai hàng workbook–database và file riêng–nguồn chung, kết hợp lệ chưa chắc đúng hồ sơ. Kiến thức khóa còn trong phần giảng. |
| Kế hoạch duyệt: đoạn “Ở bài này chỉ cần…” và câu ôn thứ ba | Làm theo | Đoạn chốt đứng cuối phần chính, phủ ba phần mục tiêu; câu Kế toán/KD dùng đúng ví dụ đã giảng, đáp án phân biệt mã có thật với đúng hồ sơ. |
| Test cũ khóa vào câu ở hàng Memo đã bỏ | Làm theo một phần: cập nhật assertion, giữ yêu cầu | Lượt đầu 321/322, thiếu chuỗi “mỗi mã tối đa một dòng”. Thay bằng “hai dòng không được trùng mã” ở định nghĩa khóa chính trong phần giảng; không bỏ test/đổi whitelist hoặc nới giới hạn. |

## Kiểm do tác giả thực hiện

- `npm test -- --reporter=dot`: **322/322**, 48 file; `npm run check`: **0 errors / 0 warnings / 3 hints**. Hint nền: `FormEvent` deprecated trong ExerciseWorkspace (hai vị trí), `document.execCommand` deprecated trong SqlEditor; hai component không đổi.
- `npm run build`: **132 trang**; `npm run check:dist`: **1997 liên kết**; cả hai exit 0. Chạy tuần tự test → check → build → dist, không có lỗi cache ở lượt kiểm cuối.
- `git diff --check`: exit 0. `source-contracts.json` đối chiếu với HEAD: frontmatter, toàn khối Excel, ba figure không đổi; vẫn bốn tiểu mục kể, bốn câu ôn và không SQL preview.
- Build của lượt: MDX SHA256 `1DF79A84E2647ADE8A34592F5F36B375BDC3F4566A17AD37875A3694FB2160E5`; HTML SHA256 `D9C24B1F13ECC798799CA6357986C7EA14B66CC698138537852A7FF5BB74402C`.

## Browser do tác giả thực hiện

In-app browser qua cua_repl, preview `http://127.0.0.1:4371/microsoft-sql-lession/bai/1-1-database-la-gi/`, đúng build trên. Đóng panel chào mừng; không bấm hoàn thành, đánh cờ, nộp SQL hoặc thay clipboard/nháp.

- **1363×871**: article 720px, document scrollWidth 1353px, không tràn ngang. Ba ảnh đều tải từ base `/microsoft-sql-lession/_astro/`, khoảng 334×167px, giữ tỉ lệ 2:1 và alt. Nội dung trang không lộ backtick. DOM xác nhận đoạn chốt đứng ngay trước Hay nhầm.
- Xem bảng Excel: A3/A5 có mã NV005 được tô, C4 là ngày chữ được tô, D4 được tô và chọn; ngày thật căn phải. Nội dung/mark/numeric/selected cũng đã đối chiếu nguyên khối với HEAD.
- Xem Ghi nhớ: ba vai trò in đậm chọn lọc; Memo đúng hai hàng; câu chốt không bị mất; câu ôn thứ ba có code cho Kế toán/KD.
- Dùng `press('Enter')` trên từng summary: cả bốn details lần lượt mở, focus tới đúng summary, đáp án có trong cây truy cập. Đóng lại câu 1/2/4 và giữ câu 3 mở để chụp bằng chứng; mục lục Ghi nhớ dẫn đúng anchor.
- **1024×871**: article và Memo đều 414px, Memo scrollWidth 413px, document scrollWidth 1014px; chữ xuống dòng, không tràn ngang. Đã reset viewport tạm sau kiểm.

Evidence ignored: `temp/verification/2026-10-30-lesson-1-1-reduce-load/`, gồm log initial/final, source diff/contracts, browser-matrix/keyboard-checks JSON, ảnh `memo-and-question-3.png`, `memo-1024.png`, `database-and-excel.png`.

## Review độc lập

Reviewer mới `review_implemented_1_1`, ngữ cảnh mới, Codex kế thừa model phiên. Gói có đúng MDX/HTML hash, quyết định duyệt, nền Excel cơ bản; cấm đọc report cũ, secret/DB/runner. Reviewer chỉ ghi report được giao; không giao browser. Đã đọc hết [report gốc](review.md), sao nguyên từng byte từ `temp/review/2026-10-30-lesson-1-1-reduce-load/review.md`; không sửa kết luận reviewer.

Reviewer xác nhận MDX/HTML đúng hash cả đầu và cuối lượt đọc, đã đọc toàn bài/HTML, xem ba PNG gốc, kiểm các ô Excel và bảng tiền đề bốn câu ôn. Không phát hiện mục Cần sửa/Cần làm rõ/Cần cắt/Biên tập có căn cứ yêu cầu thay đổi. Không nhận kết luận này thành xác nhận UI hoặc SQL live.

| Nhận xét trong report độc lập | Quyết định | Căn cứ / kết quả |
|---|---|---|
| Giữ được: nguồn chung là một cách tổ chức; Excel có làm việc chung | Làm theo: giữ | Hai điều kiện còn ở phần giảng; nguyên nhân lệch là bản sao riêng, không quy lỗi cho Excel. |
| Giữ được: luật được khai báo và đang bật | Làm theo: giữ | Điều kiện còn nguyên trong phần khóa; không khôi phục nhánh nhập file đã duyệt cắt. |
| Giữ được: ví dụ KD/Kế toán làm tiền đề câu ôn | Làm theo: giữ | Ví dụ ở phần giảng đủ để hiểu câu ôn; không thêm người hoặc dữ liệu thật. |
| Giữ được: bản xuất theo thời điểm | Làm theo: giữ | Giới hạn tự cập nhật/lịch sử đã có trong bài, không hứa file sống cùng nguồn. |
| Giữ được: chỉ kết luận dòng Quân | Làm theo: giữ | Giả định và câu trả lời không mở rộng thành xác nhận cả file. |
| Giữ được: đoạn chốt và Ghi nhớ đúng mục tiêu | Làm theo: giữ | Đã đối chiếu source/HTML/browser; không thêm hàng khóa hoặc lý thuyết ngoài mục tiêu. |
| Chưa xác minh UI/SQL live, kết quả test do reviewer không chạy, thời lượng/học viên thật | Làm theo: ghi riêng | Browser/test/build là kiểm tác giả ở trên; SQL/mobile/SSMS và đo thời gian không làm trong lượt này. Một lỗi stdout cp1252 của công cụ reviewer được khắc phục bằng UTF-8, không phải lỗi sản phẩm. |

Không có mục cần sửa hoặc để ngỏ; không có vòng sửa nội dung sau review. Chỉ hoàn thiện hồ sơ bàn giao, giữ source/HTML đúng bản đã kiểm. Không dùng kết luận review làm quyền commit/push/deploy.

## Giới hạn

Không chạy SQL/DB/API hoặc check:exercises vì không đổi câu lệnh, bộ đề hay dẫn chứng dữ liệu thật. Không kiểm SSMS thật, screen reader hoặc mobile; không đo 12 phút với người học thật. Đây là kiểm nội dung/build và tương tác web được liệt kê, không xác nhận toàn bộ công cụ khóa học.

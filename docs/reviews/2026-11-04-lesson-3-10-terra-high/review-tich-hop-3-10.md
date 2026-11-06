# Review tích hợp bài 3.10 và cuối chương 3

## Kết luận và phạm vi

Không thấy finding cần sửa có căn cứ trong phạm vi đối chiếu tĩnh được giao. Nhận định này không thay cho kiểm chạy SQL, kiểm giao diện hoặc quyền xuất bản. Tôi đọc bài như người chỉ biết Excel cơ bản, theo bốn dòng vai trò trong gói giao việc; không học mù lại ba đề vì reviewer từng bài đã khóa tiền đề trước YAML.

Source 3.10 SHA-256 `a9969ff3036611997ab87660a8e6633a8517f679a9abf6eaf3499e02559102de`, YAML `767ced88232a6105594ba7b260392df171e286d9e8ba73706b4f0014f24cb518`, snapshot HTML cuối và `dist` cùng SHA-256 `2ad9eb3b456647b8d7587fa4aa4821ed618fd61ba0fd8131bcf6f0c3d6bb6953`, khớp manifest cuối; log build ghi hoàn tất 20:20:51. Tôi tự tính hash, không tự build. Exact diff được giao có SHA-256 `569310339bad9b98c4584489d84b6f946030767bd3e5175d9df96f0af5fc682f`; nội dung Git diff có cùng Git blob hash với patch. Cấu hình giao là GPT-6.1 Terra/high, ngữ cảnh mới; công cụ không xác nhận độc lập model runtime thực tế.

## Tự kiểm tĩnh

- **Mạch và đơn vị.** 3.8 phân biệt lần xuất hiện và mã riêng, 3.9 giữ mỗi hồ sơ tối đa một lần khi kiểm đơn, còn 3.10 đếm dòng hồ sơ trong `NhanVien` theo phòng hiện lưu. 4.1 chuyển sang cộng ngày trên đơn theo loại; bài đó cũng cảnh báo số đơn và số ngày không mặc nhiên là số người. Các phạm vi khác nhau được nói rõ, không thấy chuyển số giữa các tình huống như thể cùng tập dữ liệu.
- **Cách làm và giới hạn.** 2.9 đã dạy `CASE`, 3.1 dạy tổng hợp và `NULL`, 3.2 dạy nhóm; 3.10 dùng lại các mảnh đó để giải thích `WHERE` chung, cờ riêng từng `CASE`, nhóm phòng, rồi đổi `THEN 1` sang cột số khi cộng giá trị. Không lọc mất giới còn lại, không nhóm thêm giới. Phần nhóm thiếu, phạm vi rỗng, `COUNT` đếm 0/bỏ `NULL`, và nguồn có giới tính ngoài hai nhãn nêu đủ điều kiện cho kết luận đang đưa ra.
- **Ba đề.** Đối chiếu YAML với bảng tiền đề đã khóa và nguồn 3.10: đề 1 áp dụng cờ cho mọi trạng thái; đề 2 giữ cả dòng dưới ngưỡng trong số đếm và cộng giá trị theo điều kiện riêng; đề 3 vận dụng `COUNT(CASE ... END)` với `NULL`. Không thấy mâu thuẫn giữa phạm vi đề, đáp án tĩnh và các tiền đề được chỉ ra. Đây là đối chiếu sau khi đã thấy đáp án, không phải một lần khóa độc lập mới và không bảo đảm mọi học viên làm được.
- **Flow và kết quả.** Source có năm bước 48/45/6/6/6, bảng `WHERE` có trạng thái và mẫu giữ/loại; bảng nhóm được ghi là kích thước minh họa. Hai ví dụ BGD và NS liệt kê đủ thành viên được nêu, cờ và phép cộng nhất quán với dòng tương ứng. Sáu dòng kết quả cộng nội bộ thành 45 hồ sơ, 22 nam, 23 nữ. Thứ tự trước `ORDER BY` được nói là không bảo đảm. Đó là đối chiếu nội bộ, không phải kiểm dữ liệu thật.
- **Source/build.** Hai HTML snapshot trước và sau review giống hệt sau khi loại các thẻ `code`; mỗi từ `WHERE`, `CASE`, `COUNT`, `NULL`, `0` có thêm một thẻ code. Do đó thay đổi markup hai định nghĩa không thêm chữ hoặc đổi số liệu trong HTML. Reviewer trước đã đối chiếu focus/SQL trên snapshot trước; đối chiếu bất biến HTML này cho thấy nội dung tương ứng của bản cuối không đổi. Hash và log không chứng minh hành vi UI.
- **Scope và test.** Patch chỉ có hồ sơ công ty, bài 3.10 và ba file test; không có YAML/API/seed/component/editor. Git status còn các hồ sơ review/spec/plan/evidence mới và `premium-audit.json` ngoài patch, nên kết luận này không giả định patch bao trùm mọi file chưa theo dõi. Test bỏ riêng 3.10 khỏi danh sách chờ, kiểm điều kiện và biểu thức sau chuẩn hóa khoảng trắng, tổng các bước, mẫu WHERE, hai nhóm và thứ tự trước/sau; không thấy thêm allowlist. Test bảo vệ các ví dụ và số liệu cụ thể nhưng không tự chứng minh SQL chạy đúng trên database hoặc mọi cách người học có thể trả lời.

## Evidence tác giả và giới hạn chưa kết luận

Evidence tác giả ghi live SELECT khớp 17 câu và ba đáp án, suite 574/574, check/build/check:dist và API đạt, cùng kiểm browser hai viewport, drawer, focus và copy/paste. Đó là kết quả tác giả báo cáo trong `docs/verification/2026-11-04-lesson-3-10.md`, không phải các thao tác tôi thực hiện.

- Tôi không chạy SQL, database, API, runner, test, build hoặc browser theo phạm vi giao; vì vậy không xác nhận độc lập số liệu live, bộ chấm, hành vi UI, focus, copy/paste, kích thước màn hình hoặc kết quả các lệnh. Tác giả cần giữ evidence tương ứng khi quyết định bàn giao.
- Không đọc seed/secret, không xác minh dữ liệu nguồn hay trạng thái database; các phép cộng trong báo cáo này chỉ là nhất quán nội bộ. Không kiểm Excel thật, SSMS, screen reader, cảm ứng hoặc mọi viewport.
- Không review lại toàn bộ 3.8, 3.9, 4.1, các bài khác, cơ chế editor/API/component hoặc tính đúng tổng quát của bộ chấm; chỉ đối chiếu phần liên quan mạch và phạm vi patch. Không tự thực hiện lại quy trình khóa tiền đề trước đáp án; báo cáo trước và bảng khóa là evidence riêng của reviewer trước.
- Quy trình xử lý nhận xét, cập nhật spec/plan sau vòng này và quyết định bàn giao thuộc tác giả. Review này không cấp quyền push/deploy.

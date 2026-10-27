# Xử lý review tích hợp bài 4.7–4.8

Đã đọc trọn report mới tại head `070fd5a2797f5463e8ef60061d1e20189f626875`, gồm hai findings và chín mục Declined-to-judge. Bản gốc được sao nguyên vào hồ sơ; kết luận reviewer không bị sửa thành chứng nhận bản sau sửa.

## Findings

| Mục | Quyết định | Sửa và bằng chứng tác giả |
|---|---|---|
| F1 — END của CASE bị miễn kiểm khi cùng khối có BEGIN | Làm theo | Tách logic kiểm lề thành hàm dùng chung cho kiểm source và một regression SQL cụ thể: CASE nằm trong BEGIN, END của CASE ở sai lề. Test mới RED đúng vì luật cũ bỏ qua; sửa ngoại lệ chỉ cho END cuối của CREATE PROCEDURE có BEGIN. CASE bên trong vẫn phải thụt; tab thật/khoảng trắng đầu dòng vẫn bị bắt. Regression kiểm cả mẫu sai và mẫu đúng. Không thêm parser SQL hoặc khóa câu chữ bài. |
| F2 — Chưa phân biệt >= và > tại đầu dưới | Làm theo | Mở rộng test biên hiện có cho cả SELECT thân mẫu và hai SELECT độc lập. Dòng giả định NV043 đúng 01/09 làm số dòng/số đếm thành 19, vẫn bỏ 31/08, 01/10 và mã khác. Ba mutation tạm, mỗi lần đổi >= thành > ở một trong ba nơi, đều làm test thất bại đúng 19 so 18. Khôi phục MDX byte-for-byte sau probe; seed và Result thật vẫn 18. |

Sau sửa: 332 tests / 50 files đạt trên Node 24.22.1 và Node 22.23.4; Astro 0 errors / 0 warnings / 3 hints nền; check-dist 135 trang / 2028 link; source–HTML của cả hai bài khớp. Không sửa MDX/YAML sau learner fix SSMS; build postreview vẫn đúng hash source. API build 81 đề/typecheck từ cùng YAML và API không đổi được giữ làm evidence đóng gói, không chạy engine.

## Chín mục chưa kết luận

| Mục của reviewer | Quyết định | Kết luận tác giả / phạm vi còn lại |
|---|---|---|
| 1. T-SQL, type/date/decimal, metadata/collation và ba đáp án live | Làm một phần | Đã kiểm source, số liệu, fixture subset và tài liệu Microsoft; CLI live thiếu bốn SQL env trước connection. Giữ engine/grader pending, không tạo procedure, đổi guard hoặc tự nối database khác. |
| 2. API live, xác thực, run/submit/grade, timeout/rollback/dữ liệu thật | Làm một phần | Build 81 đề và typecheck đạt; không gọi endpoint thật. Các hành vi live vẫn pending; 81 là số đề đóng gói, không phải số đề đã chạy. |
| 3. Runtime/helper/suite sau sửa và giới hạn dialect | Làm theo trong phạm vi | Đã chạy lại suite 332/50 ở cả Node 24 và 22, check TypeScript/Astro và các probe trên source cuối. Giữ helper là subset; làm rõ hồ sơ/plan: chỉ CAST/derived VALUES chưa hỗ trợ được chặn rõ, không hứa từ chối mọi T-SQL khác hoặc thay engine. |
| 4. Clipboard, tab hình học, viewport/scroll, keyboard/details/focus | Làm một phần | Source/HTML/payload copy/ô/marks và CSS tab-size 4 đã đối chiếu; không browser/SSMS. Giữ tương tác và hình học pending, không gán nhãn success của Result làm kết quả thực thi. |
| 5. Hành trình web cho SELECT 4.8, login, hoàn thành/lưu tiến độ | Làm một phần | Source `gioi-thieu.astro` dẫn người có mã vào Làm bài; `ExerciseWorkspace.tsx` nhận SQL đang soạn cho run riêng với grade; route bài tập hiện có của bài đã học dùng được cho SELECT. 4.8 không yêu cầu nộp bài, footer và giới thiệu cho phép hoàn thành sau năm câu ôn. Giữ noExercises, không thêm workspace hoặc đổi store/editor. Chưa đi hành trình UI, thử mã hay lưu/khôi phục tiến độ thật. |
| 6. SSMS/menu/quyền/hành vi thủ tục lạ | Làm một phần | Tác giả đã mở tài liệu Microsoft View definition ngày 27/10/2026, đối chiếu bước chọn đối tượng/nhấp phải và tên cửa sổ; đã sửa góp ý learner. Chưa thao tác SSMS hoặc xác minh quyền cụ thể; mẫu không phải thủ tục có sẵn để gọi. Không thêm quản trị/triển khai. |
| 7. Nghiệp vụ ngoài mô hình, đủ giờ/nửa ngày/chồng loại phép/tính tiền | Không làm theo — ngoài phạm vi | Giữ rõ một dòng công là một ngày theo bộ mẫu, phép năm theo lịch được cung cấp. Không suy ra đủ ca, quy tắc doanh nghiệp thật hoặc tính tiền; không sửa seed để mở rộng bài. Nếu đổi luật/dữ liệu phải thiết kế kiểm riêng. |
| 8. Thời lượng 45/25 phút và khả năng mọi người tự học | Không làm theo — giữ ước lượng | Chưa có quan sát/timing học viên; giữ ước lượng, không báo đã đo hay bảo đảm tự học. Mạch minh họa được review nguồn, không dùng quota component làm thay nghiên cứu học viên. |
| 9. Bản sau sửa, remote và quyền thao tác Git | Làm theo trong phạm vi local | Bản sau sửa chỉ đổi hai tệp test và hồ sơ; MDX/YAML/HTML vẫn khớp snapshot tích hợp. Chạy kiểm lại và đối chiếu hash. Giữ hai nhánh riêng, 4.8 kế thừa 4.7; không push, merge main hoặc deploy. Không lấy report làm quyền xuất bản. |

Không còn finding đã nhận mà chưa xử lý. Những giới hạn live/UI/SSMS và quan sát học viên được giữ trong hồ sơ bàn giao; chúng chưa được biến thành pass. Không mở thêm vòng reviewer chỉ để xác nhận sửa test/câu chữ; tác giả chịu trách nhiệm bằng evidence kiểm sau sửa.

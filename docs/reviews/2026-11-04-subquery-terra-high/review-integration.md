# Review tích hợp: subquery SELECT/FROM

## Phạm vi, phiên bản và cách kiểm

Review độc lập theo gói `integration-package.md`: 3.9–3.12, cầu nối 4.1 và diff tương thích. Base được giao `e0b419d6bdf0f932be9fbaf43395d0b1ad975800`, source local chưa commit; build được giao là dist 21:06 ngày 04/11/2026. Agent được cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; công cụ trong lượt này không tự xác nhận model thực tế. Tôi đối chiếu SHA-256 từng tệp trong manifest với source/dist hiện có, không thấy thiếu hay lệch; manifest không bao phủ toàn bộ tệp dự án.

Tôi đọc tĩnh source bài, phần liên quan của quy ước, template, hồ sơ, spec/plan, diff và các module tương thích; xem HTML bốn redirect. Không chạy test, browser, SQL, database, API hay runner. Không đọc seed, secret, báo cáo reviewer khác hoặc ma trận. Đối chiếu HTML không chứng minh tương tác giao diện. Đây là review tích hợp, không lặp đầy đủ từng bài hay xác nhận độc lập mọi số liệu.

## Nhận xét theo tác động

**Giữ được — mạch học và phạm vi.** 3.9 dùng IN/EXISTS để giữ hồ sơ theo sự tồn tại, giới thiệu liên hệ và phân biệt danh sách có thể nhiều dòng. 3.10 giải thích một ô chỉ nhận tối đa một dòng/một cột; COUNT không GROUP BY tạo 0, còn SUM/MAX trên phạm vi rỗng tạo NULL. 3.11 đổi đơn vị sang nhiều dòng/nhiều cột nguồn, nói rõ chỉ cột xuất ra mới dùng ở ngoài, phân biệt lọc dòng trước nhóm và lọc tổng sau nhóm, không tự tạo nhóm 0. 3.12 dùng nhóm và cờ để tạo chỉ tiêu; 4.1 nối trực tiếp từ nguồn có tên của 3.11 sang CTE và giải thích phạm vi một câu. Các phạm vi 48 hồ sơ, 55 hợp đồng/46 nhóm/7 mã, 45 hồ sơ đang làm, 9 đơn → 3 loại → 2 loại nhất quán với hồ sơ và với nhau. Đây là đối chiếu nội bộ, không phải xác minh dữ liệu live.

**Giữ được — tương thích theo source.** `parseProgress` nhận v1/v2, chuyển số bài, bài tập và lastLessonNum v1; xuất phiên bản 2. Load ưu tiên key v2, ghi v2 và giữ v1; listener chỉ nhận thay đổi key v2, phù hợp quyết định không gộp tab v1 ghi sau. Nháp ưu tiên v2 kể cả chuỗi rỗng; bài COUNT mới fallback ID cũ, hai bài mới không fallback, các ID khác giữ danh tính. Client thêm `course-v2:`; API phân giải prefix mới, ID cũ không prefix chuyển COUNT, từ chối prefix lạ và ID 3.11/3.12 không prefix. Diff cho thấy auth, rate limit, guard và phần chấm vẫn theo đường cũ sau bước phân giải. Arcade dùng kho nháp riêng và client riêng theo source tìm thấy.

**Giữ được — redirect theo base.** Bốn HTML redirect thực tế đều có refresh, canonical và liên kết dự phòng tới cùng đích COUNT 3.12 dưới `/microsoft-sql-lession`, kể cả ba trang bài tập. Không kiểm việc máy chủ triển khai hoặc browser thực sự theo redirect.

Không xác định được finding cần sửa từ các phần đã kiểm tĩnh. Điều này không thay cho kiểm thực thi hoặc review từng bài.

## Các điểm đã cân nhắc nhưng chưa kết luận / ngoài phạm vi

- Nếu v2 đã tồn tại nhưng hỏng, source sao lưu nội dung hỏng rồi khởi tạo tiến độ trống, không tự quay về v1; đây là hệ quả ưu tiên v2 và cơ chế xử lý dữ liệu hỏng, chưa kiểm UI/thông báo hay quyết định sản phẩm cho trường hợp này.
- Khi web mới gặp API cũ, prefix mới khiến API cũ không nhận bài; tránh chấm nhầm nhưng người học không thực hành được cho tới khi API cập nhật. Chưa kiểm triển khai thực tế hoặc phối hợp thứ tự phát hành.
- Khi tab cũ ghi thêm v1 sau khi v2 đã được tạo, tiến độ đó không tự hợp nhất; đúng quyết định đã duyệt, nhưng người học có thể cần biết giới hạn nếu tiếp tục dùng tab cũ. Chưa kiểm thông báo UI.
- Không kết luận copy/paste, focus/drawer, bố cục viewport, phản hồi bàn phím, khôi phục nháp/clipboard hoặc hành vi nhiều tab từ HTML/source. Không tự xác minh tất cả đầu vào/kết quả của từng drawer, từng bài tập hay độ đúng SQL/số liệu live; cần bằng chứng kiểm riêng và review từng bài.
- Chưa xác minh thực tế API cũ/mới, auth, guard, chấm và Arcade qua mạng; việc diff giữ đường xử lý không chứng minh môi trường triển khai, cấu hình hoặc kết quả chạy. Không kiểm các dữ liệu ngoài manifest hay các thay đổi ngoài diff được giao.

## Evidence tác giả và giới hạn

`verified-final.json` của tác giả ghi 23 SELECT riêng, 9 lỗi kiểm lại, 33 kiểm minh họa và số dòng bài tập; tôi không chạy lại. Log tác giả ghi 587 test đạt, `astro check` 0 lỗi/0 warning/7 hints deprecated, API build 82 bài tập và 50 Arcade, typecheck không hiện lỗi, `check:dist` OK 202 trang/3817 link, `check:exercises` có số dòng, `check:data` không bảng lệch. Các log là bằng chứng tác giả, không phải kết quả tôi thực hiện; thời điểm `check.log` 20:55 trước build được giao nên không tự khẳng định nó kiểm đúng source cuối chỉ từ log đó. Các thông báo lỗi giả lập trong log test Arcade không đồng nghĩa lỗi môi trường sản phẩm.

Nguồn: `docs/quy-uoc.md` §4.5, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, spec/plan lượt này, các MDX và YAML 3.9–3.12/4.1, `compatibility.diff`, `curriculum-version.ts`, `progress*.ts`, `exercise-storage.ts`, `lesson-redirects.mjs`, HTML redirect và evidence được giao. Không dùng Ready làm kết luận xác nhận SQL/UI hoặc quyền push.

# Tự kiểm — nút Sơ đồ database trên thanh điều hướng

Ngày 03/11/2026, checkout `codex/remake-lam-quen`, thay đổi local chưa commit. Đây là bằng chứng của người triển khai; người dùng tự review, không có agent reviewer.

## Thay đổi

TopBar thêm nút cạnh Luyện SQL. BaseLayout chứa một DbDiagramPopup dùng sự kiện chung; ExerciseWorkspace không tạo modal riêng. Schema vẫn được parse từ script HRM_Demo trong repo lúc build, không gọi database. Modal dùng lại toàn bộ bảng/cột/PK/FK/đường nối, bổ sung khóa nền/cuộn và trả focus. Thanh điều hướng dùng token/kiểu nút có sẵn, thu gọn thương hiệu và thanh tiến độ dưới 1200px.

## Kiểm tự động trên bản cuối

| Lệnh | Kết quả |
| --- | --- |
| `npm test` | 67 file, 561 test đạt |
| `npm run check` | 281 file; 0 lỗi, 0 warning, 7 hint có sẵn |
| `npm run build` | 190 trang |
| `npm run check:dist` | 190 trang, 3.568 link hợp lệ |
| `git -c core.safecrlf=false diff --check` | Đạt |
| `npx --yes -p @google/design.md designmd lint DESIGN.md` | 0 lỗi, 0 warning |

Log: `temp/header-diagram-{tests,check,build,dist,design-lint}.log`. Không thêm test chỉ để khớp câu chữ; bộ hiện có bảo vệ schema, renderer 7 bảng, đường nối và vòng focus; hành vi tích hợp kiểm trực tiếp trong browser.

Audit tĩnh của Frontend Design Premium chạy strict, ghi tại `temp/header-diagram-audit.json`: báo 1 lỗi `form.textarea-resize-missing` ở SqlEditor.tsx:53 ngoài phạm vi. Đây là false positive vì `.ed-input { resize: none; }` nằm trong `src/styles/exercise.css:27`; đã kiểm computed style textarea trong browser là `none`. Không sửa editor hoặc ghi đè file `premium-audit.json` có trước lượt này. Không có package formatter/linter khác hoặc premium-ui.json trong repo.

## Browser trên build local

URL gốc `http://127.0.0.1:4321/microsoft-sql-lession/`, dùng Astro preview. Sau lỗi lấy lại tab cũ, tạo tab mới trong cùng in-app browser và kiểm được bình thường.

- Mở từ mindmap, bài 1.5, phụ lục và bài tập 2.1/1: đúng tiêu đề HRM_Demo, đủ 7 bảng, một dialog duy nhất.
- Trong bài tập, cả hai nút mở cùng popup; Escape trả focus về nút trong workspace hoặc nút header đúng nơi mở.
- Enter mở từ header. Tab tới Đóng, Shift+Tab vòng sang vùng cuộn; Escape, nút Đóng và click nền đều đóng, trả focus về nút mở. Sau kiểm lần đầu đã sửa click nền và xác nhận lại focus `data-action="diagram"`.
- Khi mở: topbar có `inert`, body overflow hidden; khi đóng: gỡ inert, khôi phục overflow và focus. Không thực thi SQL hoặc nộp bài trong lượt kiểm.
- Header 1024, 1200, 1440px: cao 64px, các nút cao 38px, scrollWidth bằng viewport, không nhãn nào xuống dòng; quan sát thêm 1280px. Popup 1024×768 nằm trọn viewport (trái 81,3px, phải 942,7px, đáy 677,8px).
- Ảnh: `temp/header-diagram-1280.jpg`, `temp/header-diagram-open-1024.jpg`, `temp/header-diagram-open-1440.jpg`, `temp/header-diagram-final.jpg`.

## Giới hạn

Không có kiểm screen reader thủ công hoặc ma trận thiết bị cảm ứng. Khóa học giữ phạm vi desktop và thông báo dưới 1024px theo DESIGN.md; không có thiết kế lại mobile trong lượt này. Không kiểm SQL live vì thay đổi chỉ mở sơ đồ từ schema tĩnh. Không đổi dữ liệu, API hoặc storage. Không commit, push hay deploy.

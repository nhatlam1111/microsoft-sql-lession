# Thí điểm ảnh động bài 2.1

## Phạm vi và quyết định

Thực hiện kế hoạch người làm khóa học duyệt trong chat ngày 15/11/2026. Bài 2.1 thay RunFlow bằng AnimatedFlow, dùng lại dữ liệu bước inline; Xem từng bước là details với hình tĩnh và dữ liệu HTML. Bài 2.1 vẫn có hai bước FROM/SELECT; AS là cảnh trong SELECT. Tiền đề 1.2 và 1.3, mục tiêu chọn cột/thứ tự/bí danh và giải thích kết quả; bài tập/YAML không đổi trong lượt này.

Điều chỉnh đã duyệt sau bản sáng: giữ style GIF đầu tiên, nền tím đậm, hai bảng cạnh nhau, nhấn tím/hồng. Tự phát khi 25% ảnh vào vùng nhìn; nút dừng trả về bìa, cuộn lại không tự bật sau khi người học đã dừng. Reduced motion mặc định tĩnh và cho phép chủ động phát. Theme của ảnh ở scripts/animations/select.css, UI ngoài ảnh theo token bài giảng.

## Thay đổi

- Component AnimatedFlow, đăng ký trong lessonComponents; đọc dữ liệu query/steps của MDX và dùng checkFlow. HTML giữ đầu vào, thực hiện, kết quả, hình tĩnh và bảng.
- Nguồn dựng Chrome/Playwright, font repo, sprite pulse ImageGen từ bản thử đầu; encoder gifgen-local 1.0.7 được giữ trong scripts/animations. Manifest hash khóa dữ liệu và nguồn ảnh, font, theme, các file đầu ra.
- Bài 2.1 thí điểm; quy ước 2.6a, quy trình, template, DESIGN.md và hai bản course-author đồng bộ. Test cấu trúc chấp nhận hai hình thức luồng, giữ kiểm nội dung.
- Có thay đổi của người dùng từ trước trên nhiều bài/docs/test. Lượt này chỉ xử lý phạm vi ảnh động kể trên; reviewer không được quy mọi diff so với HEAD cho lượt này.

## Bằng chứng hiện tại

- SQL live: 2026-11-15-select-animation-sql.json. Đọc hai SELECT nguyên văn bằng cấu hình kết nối API hiện có; không in credential. Tất cả số dòng, cột, bốn dòng trích khớp. Không gọi MCP azure-sql vì phiên không có tool đó; kiểm qua pool chỉ đọc của runner hiện có.
- npm test: 71 file, 617 test đạt.
- npm run check: 0 lỗi, 0 warning, 7 hint deprecated ở các component sẵn có.
- npm run build: đạt, 204 trang theo output build; npm run check:dist: đạt, 286 trang/4241 link theo bộ kiểm.
- Ảnh: đã xem cảnh nguồn, chọn cột đang di chuyển, kết quả và bí danh; kiểm lại PNG/GIF bằng Pillow. GIF 1080×824, 150 frame đầu vào, 15 giây; bộ mã hóa dùng palette chung và loop.
- Audit frontend-design-premium strict báo form.textarea-resize-missing tại SqlEditor.tsx. Đối chiếu src/styles/exercise.css:27 đã có .ed-input { resize: none; }; đây là false positive của bộ quét, không phải lỗi mới của component. Giữ nguyên output ui-audit.json.
- UI: xem [browser.json](2026-11-15-select-animation/browser.json) và ảnh desktop/narrow-component. Đã thử auto phát vào viewport, dừng bằng bàn phím, phát lại URL mới, không tự phát sau dừng, native details, reduced motion, tắt JavaScript, tải GIF lỗi và thử lại. Giới hạn: full lesson shell desktop hiện co vùng main về 0 ở 390px; component kiểm riêng ở 390px hiển thị vừa vùng đọc, bảng HTML cuộn được. Không coi kiểm component riêng là full-page mobile đạt.

## Review và trạng thái

Review bài: docs/reviews/2026-11-15-select-animation/content.md.
Review tích hợp: docs/reviews/2026-11-15-select-animation/integration.md.
Hoàn tất phạm vi thí điểm desktop. Review nội dung không có finding. Report tích hợp và followup được giữ nguyên; xử lý theo bảng dưới. Giới hạn full-page mobile 390px thuộc shell desktop hiện có, được ghi rõ trong browser.json.

| Finding | Xử lý | Kiểm lại |
|---|---|---|
| Nguồn dựng chấp nhận SQL vượt kịch bản | Làm theo; select-story.ts từ chối WHERE, đổi bảng, đổi phép chiếu, dữ liệu đại diện không khớp | Test query đổi bảng/WHERE bị chặn; ảnh dựng lại thành công |
| Ngưỡng tự phát | Làm theo; intersectionRatio >= 0.25 | Chrome xác nhận 10% chưa chạy, trên 25% chạy |
| Kiểm width 0 ở màn hình hẹp | Làm theo; kiểm width >=300 ở component cô lập, ghi LIMIT full-page | narrow-shell.png và narrow-component.png, browser.json |
| Manifest thiếu hash ảnh tham chiếu | Làm theo; bắt buộc GIF/bìa/mọi scene có hash, step hợp lệ | Test thiếu hash và thiếu tệp |
| Followup P3 alt hardcode tổng hồ sơ | Làm theo; lấy result.total, dựng lại manifest | 4 test animation đạt, gồm alt khớp tổng của bước cuối; build/HTML/UI kiểm lại |

Sau sửa review: 95 test liên quan đạt; lần sửa alt cuối kiểm lại 4 test ảnh động, build, browser và check:dist đều đạt. Lần kiểm type cuối 0 lỗi/0 warning, 7 hint cũ. Bộ đầy đủ trước các sửa review đạt 617 test; không nhận đã chạy lại toàn bộ sau sửa nhỏ. Nguồn/bằng chứng hiện hành có hash trong sources.json và browser.json.

Bàn giao GIF 1080×824, 15 giây, 528780 byte cùng ảnh bìa và ba hình tĩnh, component, nguồn dựng, tài liệu, test và report. Nguồn dựng yêu cầu Pillow theo README; lượt này dùng Pillow 13.0.0 qua PYTHONPATH của thư mục tạm, không coi Python mặc định đã cài Pillow. Build hiện có dùng để xem local; quyền push/deploy theo mục 5.

## Theo dõi lượt

Tác giả model theo phiên, effort và thống kê input/cache/output không được tool cung cấp. Reviewer yêu cầu gpt-6.1-terra/high, ngữ cảnh mới. Không khẳng định model thực tế khi công cụ chỉ xác nhận cấu hình. Không có số liệu token đủ để so chi phí. Một hồ sơ lượt; plan trỏ về đây.

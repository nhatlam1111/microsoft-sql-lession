# Bài 1.1: triển khai lời dẫn và hình minh họa

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Thực hiện liên tục trong phiên; review một bài theo AGENTS, kế thừa model phiên.

**Goal:** người mới theo được chuyện hai file đến cách database giúp lưu/đọc dữ liệu mà không mất mạch.
**Architecture:** sửa MDX một bài, giữ hình Excel và khối có sẵn; thêm ảnh ImageGen cùng figure native. Root thực hiện, reviewer chỉ đọc; không đổi API/seed/bộ đề hoặc quy ước chung.
**Tech Stack:** Astro/MDX, CSS hiện có, built-in ImageGen.
**Spec:** `docs/superpowers/specs/2026-10-29-lesson-1-1-story-and-image-design.md`.

## Ràng buộc và review focus

- Nhánh `codex/lesson-1-1-story-and-image` từ main75278be; chỉ bàn giao local, không merge/push.
- Giữ URL/schema/12 phút/noExercises; bốn tự kiểm tra, giá trị/mark Excel và các giới hạn của database.
- Ảnh phải có alt/caption tự đủ nghĩa, co theo bài và dùng base path của site; không coi ảnh là kết quả dữ liệu thật.
- Lời văn tự đủ nếu ảnh không tải, không ngụ ý tự đồng bộ hay tự biết sự thật; nhân vật tiếp tục xuyên suốt.
- Tách các kiểm source/build/UI/DB; không nhận kết quả từ reviewer thành kiểm do tác giả đã chạy.

## Công việc

- [x] Đọc quy ước/template/hồ sơ/bài, chốt lựa chọn người dùng và phạm vi local. Ghi spec/plan; thực hiện native, không hỏi lại phương thức đã áp dụng trong phiên.
- [x] Tạo ba ảnh khái niệm bằng ImageGen theo điều chỉnh của người dùng: database, SQL Server, SQL; không có nhân vật. Inspect và lưu asset/prompt vào workspace, loại asset nháp kể chuyện.
- [x] Viết lại MDX theo bốn nhịp; đặt ảnh cạnh định nghĩa tương ứng; giữ kiến thức/giới hạn và bốn câu ôn. Sửa assertion cũ phân biệt hoa/thường thành kiểm ý nghĩa tương đương, giữ bảo vệ; không thêm test hình thức cho sửa nội dung.
- [x] Chạy test/check/build/dist, kiểm UI và ảnh ở1280/1440/1024; ghi log/ảnh local.390px có giới hạn shell desktop cũ, ghi riêng cùngauditnềneditor.
- [x] Review độc lập mới một bài, đọc hết report rồi xử lý đủ nhận xét, kiểm lại phần sửa. Cập nhật spec/plan và hồ sơ; bàn giao bản local.

Evidence: `temp/verification/2026-10-29-lesson-1-1/`; reviewer: `temp/review/2026-10-29-lesson-1-1/`; ledger: `.superpowers/sdd/2026-10-29-lesson-1-1-story-and-image/progress.md`.

Hoàn tất ba ảnh khái niệm và bốn nhịp kể; review mới cùng E1 đã sửa/kiểm lại. 322 tests, check 0 lỗi / 0 cảnh báo / 3 hint nền, build 132 trang và dist 1997 liên kết. Ảnh có base đúng; đã kiểm bốn câu ôn bằng bàn phím, mục lục và đối chiếu bài 1.2. [Hồ sơ/ma trận](../../reviews/2026-10-29-lesson-1-1/verification.md) ghi đủ kết quả và giới hạn; giữ nhánh local, không merge/push.

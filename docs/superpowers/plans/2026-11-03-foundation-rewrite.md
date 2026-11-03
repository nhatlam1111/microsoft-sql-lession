# Foundation Rewrite Implementation Plan

> For agentic workers: use superpowers:executing-plans inline. Người dùng đã yêu cầu triển khai kế hoạch, tự review và không dùng agent review; không cần hỏi lại cách thực hiện.

**Goal:** Viết mới năm bài Làm quen theo mục tiêu đã duyệt và bàn giao bản build local để người dùng review.

**Architecture:** Giữ collection MDX, slug, số bài và UI hiện có. Đổi nội dung/metadata, dùng hình internet có hồ sơ nguồn, cập nhật tham chiếu và hợp đồng kiểm nội dung theo phạm vi mới.

**Tech Stack:** Astro, MDX, TypeScript, Vitest.

**Spec:** ../specs/2026-11-03-foundation-rewrite-design.md

## Global Constraints

- 1.1/1.5: 12 phút, mục tiêu 800–1.000 từ, trần 1.100; 1.2–1.4: 7 phút, mục tiêu 500–700, trần 800.
- Giữ noScenario/noExercises, không SQL chạy, không vẽ lại hình, không đổi URL/tiến độ/database/API.
- Chỉ người dùng review; không agent, không push/deploy. Không tự commit file ngoài phạm vi.

## Review Focus

- Database chung không bị đồng nhất với mô hình quan hệ; NoSQL không bị gọi là không có schema hay quan hệ.
- Dùng sơ đồ khối bảng PUBS: đọc PK/FK/cặp cột; phía một không đồng nghĩa bắt buộc, không giả ảnh có tự tham chiếu.
- FK/NOT NULL/UNIQUE có vai trò riêng; luật chỉ áp dụng khi khai báo và bật, hợp lệ không bảo đảm đúng nghiệp vụ.
- Tham chiếu bảng/dòng/cột về 1.1; SQL/SSMS về 1.2; NULL về 1.4; phụ lục không thay tiền đề còn thiếu.
- Hình đủ đọc, mở được bản gốc; giữ credit và giấy phép MIT của nguồn MicrosoftDocs.

## Task 1: Khung, kiểm nội dung và nguồn

Files: docs/quy-uoc.md, docs/lesson-template.md, tests/content.test.ts, src/assets/lessons/SOURCES.md và ảnh PUBS.
Interfaces: frontmatter/schema/slug không đổi; trần bài nền theo số bài. Hồ sơ nguồn phục vụ cả MDX và kiểm browser.

- [x] Cập nhật test độ dài/thời lượng và chuyển các bảo vệ còn phù hợp sang bài sở hữu mới; chạy riêng content.test.ts để xác nhận bài cũ chưa đạt hợp đồng mới.
- [x] Cập nhật quy ước/template theo ngoại lệ đã duyệt; lưu nguyên ảnh PUBS, hồ sơ nguồn và giới hạn quyền sử dụng.

## Task 2: Viết lại năm bài

Files: src/content/lessons/1-{1..5}-*.mdx.
Interfaces: giữ số/slug và thành phần Memo/Mistakes/Apply/details; khái niệm có nguồn trực tiếp và lời giảng đủ trước tự kiểm tra.

- [x] Viết mới 1.1–1.5 theo spec; chỉ dùng ảnh internet, không Ssms/Erd mô phỏng trong năm bài.
- [x] Tự rà nguồn và ý nghĩa mọi ký hiệu trên hình PUBS, giữ một sơ đồ xuyên suốt; ghi kết quả ở spec.
- [x] Chạy test nội dung, kiểm số từ, đoạn văn và phần ôn; xử lý mọi lỗi trong phạm vi.

## Task 3: Tích hợp và xác minh

Files: bài sau có tiền đề/tham chiếu cũ, PL.1, metadata nguồn slide lam-quen; không đổi nội dung slide.
Interfaces: đường dẫn/anchor phụ lục tồn tại; catalog/nav/resume vẫn dùng cùng num/slug.

- [x] Sửa tham chiếu kiến thức theo vị trí mới và kiểm toàn bộ repo sản phẩm.
- [x] Chạy npm test/check/build/check:dist. Expected: đạt, hoặc ghi đầy đủ lỗi nền có bằng chứng, không nới test ngoài phạm vi.
- [x] Kiểm build bằng browser ở màn hình rộng/hẹp: bài, điều hướng, liên kết, ảnh lớn và details; lưu chứng cứ và giới hạn công cụ.
- [x] Cập nhật spec/plan với kết quả thực tế, bàn giao local để người dùng review; không agent review, không push/deploy.

## Ledger

- Pre-flight: Task 1 cung cấp quy ước/nguồn cho Task 2; Task 3 phải ánh xạ nguồn slide và tiền đề sau khi Task 2 chuyển khái niệm. Không thay public schema hoặc storage.
- Ruling: giữ tiến độ hiện hữu và URL dù slug 1.2 vẫn chứa tên cũ — đúng yêu cầu tương thích đã duyệt, tránh migration ngoài phạm vi.
- Ruling: không thêm test bắt câu chữ mới của lời giảng; cập nhật test nội dung có sẵn và dùng build/browser để kiểm kết quả người học nhìn thấy.

- Ruling theo phản hồi người dùng: chỉ dùng sơ đồ có hộp bảng và cột, bỏ ảnh COMPANY/Chen. Ảnh PUBS duy nhất bao phủ ba cardinality chính; tự tham chiếu là ví dụ HRM_Demo đã có ở 1.4, ghi rõ không nằm trong ảnh. Không tự bổ sung đường hoặc redraw để đủ dạng.

- Task 1: complete — quy ước/template/test và nguồn ảnh/giấy phép khớp bản sửa; test cũ đã thất bại theo hợp đồng mới trước khi viết.
- Task 2: complete — năm bài viết mới, số từ 999/698/698/699/994, không đoạn trên 120 từ; ảnh PUBS thay COMPANY theo phản hồi.
- Task 3: complete — 561 test đạt; check 0 lỗi/0 warning/7 hint; build 190 trang; check:dist 3.568 link. Browser 1366/1024px, 21 details, năm link phụ lục và ảnh gốc đã kiểm. Giới hạn 390px/SQL live ghi riêng trong docs/verification/2026-11-03-foundation-rewrite.md. Bàn giao local, chờ người dùng review; không agent review, không commit/push/deploy.

## Vòng 3 — điều chỉnh 1.1 theo hai nhóm

- [x] Đổi bảng so sánh sang database quan hệ / NoSQL; giải thích DBMS là tên chung, RDBMS là hệ quản lý quan hệ. Cập nhật metadata, đoạn chốt, Ghi nhớ và tự kiểm tra.
- [x] Cập nhật quy ước/spec/hồ sơ nguồn theo phạm vi mới; giữ ảnh nguồn, URL, số bài và phần bảng/dòng/cột.
- [x] Chạy test/check/build/check:dist và kiểm HTML build: 561 test, 190 trang/3.568 link, 0 lỗi/0 warning/7 hint; bảng ba cột, hai nhóm, bốn câu ôn; 1.000 từ.
- [x] Cập nhật hồ sơ kiểm và manifest. Browser lỗi “browser.user is unavailable” qua API viewport/tab/getTab nên chưa kiểm UI vòng 3; không dùng quan sát cũ thay bằng chứng mới. Bàn giao phần sửa, ghi đúng giới hạn công cụ.

# Chỉnh nhẹ năm bài Làm quen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Giảm chi tiết chưa cần trong 1.1–1.5, làm rõ điều kiện và tăng vận dụng ở câu ôn, giữ đủ nền cho SELECT/WHERE và kết bảng.

**Architecture:** Tác giả sửa năm MDX và test nội dung trong checkout hiện có, dùng nguyên các component; reviewer độc lập từng bài rồi review tích hợp. Phương án và phạm vi đã được người dùng chốt trong chat.

**Tech Stack:** Astro MDX, Vitest; database chỉ SELECT nếu cần đối chiếu dẫn chứng.

**Spec:** `docs/superpowers/specs/2026-10-31-foundation-teaching-refinement-design.md`

## Global Constraints

- Giữ năm bài/thứ tự/slug/prerequisite; noScenario/noExercises, minutes 7, ít nhất ba câu ôn; mục tiêu 500–700 từ, chặn 800.
- Không đổi component/ảnh/YAML/seed/API/editor/Giới thiệu; không push/deploy.
- Không cắt Unicode, NULL, chuyển kiểu ngầm hoặc nghĩa khóa nhiều cột cần để đọc sơ đồ.

## Review Focus

- Đủ cột bắt buộc chưa đủ để nhận dòng: phải thỏa các luật khác.
- FK chỉ kiểm giá trị khác NULL; kết luận mọi hồ sơ có phòng cần NOT NULL.
- Rút decimal nhưng vẫn đọc được p/s; ba kết quả chuyển kiểu còn rõ.
- Path ERD đổi sang hai bảng, caption/lời dẫn/phòng hiện lưu/cặp cột vẫn khớp.
- Câu ôn chỉ dùng tiền đề đã giảng, giữ đủ nền cho 2.1/2.2 và quan hệ một-nhiều.

## Task 1: Chỉnh nội dung năm bài

**Files:** `src/content/lessons/1-1-database-la-gi.mdx`, `1-2-bang-dong-cot.mdx`, `1-3-kieu-du-lieu.mdx`, `1-4-khoa-chinh-khoa-ngoai.mdx`, `1-5-doc-so-do-erd.mdx`; `tests/content.test.ts`.

- [x] Đối chiếu dẫn chứng dùng lại và khả năng kết nối SELECT; sáu query chỉ đọc đạt, evidence SQL ở thư mục temp của lượt.
- [x] Cập nhật assertion đang buộc ví dụ làm tròn đã được duyệt bỏ; bảo vệ điều kiện nhận dòng/FK NOT NULL và ERD hai bảng trước ba bảng; không nới allowlist.
- [x] Sửa MDX theo spec, thay chọn lọc câu ôn và giữ mọi tiền đề.
- [x] Chạy test nội dung: ba assertion mới thất bại trước sửa và 67/67 đạt sau sửa. Số từ 690/603/665/618/618, đoạn dài nhất 88; diff đúng phạm vi.

## Task 2: Kiểm bản build và review

**Files:** `docs/reviews/2026-10-31-foundation-teaching-refinement/`, spec, plan. Evidence local: `temp/verification/2026-10-31-foundation-teaching-refinement/`.

- [x] Chạy npm test (369 đạt), npm run check (0 lỗi/warning, 3 hint nền), npm run build (129 trang), npm run check:dist (1951 link).
- [x] Xem năm trang build, hình/Ssms/Erd, caption/đánh dấu/câu ôn; desktop 1280/1024, giới hạn ghi trong verification.
- [x] Giao reviewer mới từng bài, model kế thừa/fork none, source/build đúng phiên bản; giữ đủ năm report gốc và lập ma trận xử lý.
- [x] Sửa theo nhận xét có căn cứ, chạy lại test/check/build/dist đều đạt; cập nhật spec/plan mỗi vòng.
- [x] Review tích hợp mới trên eec184e, không thiếu tiền đề/mạch; làm theo mục Biên tập giảm khóa câu chữ của hai test, giữ điều kiện được bảo vệ. Xử lý mọi giới hạn theo verification; không sửa MDX sau build21:43.
- [x] Commit local và chốt bài/report/ma trận/checks để bàn giao, không push/deploy.

## Nhật ký review

- Source vòng1: ae7a2f3, build21:33. Đã đọc hết report1.1/1.2/1.3 trước sửa.
- 1.1: Làm theo mục độ phủ nguồn chung bằng một vế trong câu ôn1, giữ số câu; cắt câu ngoài mục tiêu để bù độ dài.
- 1.2: Làm theo Cần làm rõ câu ôn2 và Biên tập phạm vi ba dòng hợp đồng.
- 1.3: không finding, giữ nguồn.1.4: làm theo cách gọi đích khóa ngoại, không thêm kiến thức; đã đọc hết report trước sửa.
- 1.5: đã đọc hết report; làm một phần bằng vế “Ở đường tô xanh” để không áp mô tả chấm tròn cho tự tham chiếu. Đã đủ năm report, chuẩn bị kiểm cuối và review tích hợp.
- Review tích hợp mới: không thiếu tiền đề; đã giảm khóa câu chữ của hai test. Kiểm cuối 21:50: 369 test, check không lỗi/warning (3 hint nền), build129/dist1951 đạt. MDX không đổi từ eec184e; chỉ test và hồ sơ thay đổi sau đó. Hoàn tất trong nhánh local, chưa merge/push/deploy.

# Bài 1.1: giảm tải, giữ mạch kể — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Thực hiện trong phiên, reviewer cuối theo quy ước repo, kế thừa model phiên.

**Goal:** rút nhánh phụ và làm phần ôn bám ba phần mục tiêu mà giữ mạch kể đã duyệt.

**Architecture:** chỉ sửa MDX một bài và assertion cũ nếu khóa vào hàng Memo đã bỏ; không đổi component, dữ liệu hoặc API. Dùng checkout sạch hiện có, triển khai local và review nguồn/build đúng phiên bản.

**Tech Stack:** Astro/MDX, Vitest, browser qua cua_repl.

**Spec:** docs/superpowers/specs/2026-10-30-lesson-1-1-reduce-load-design.md.

## Global Constraints

- Giữ URL, frontmatter, 12 phút, noExercises, nhân vật/giả định, bốn nhịp, ba ảnh và hình Excel nguyên dữ liệu/thuộc tính.
- Giữ điều kiện/giới hạn của luật dữ liệu, T-SQL, nguồn chung/bản xuất/lịch sử và câu trả lời đúng phạm vi.
- Không tạo learning-workspace/HTML, sửa chuẩn chung, chạy DB, commit/push/deploy trong lượt này.

## Review Focus

- Người chỉ biết Excel cơ bản hiểu đủ các thuật ngữ ngay tại chỗ.
- Ghi nhớ phủ ba phần mục tiêu, không dạy thêm kiến thức.
- Câu ôn Kế toán/KD có tiền đề ở phần giảng và không ngụ ý database biết sự thật.
- Cắt nhánh phụ giữ giới hạn Excel và điều kiện ràng buộc.
- Bản build giữ code/nháy/ảnh, bốn câu ôn mở được bằng bàn phím; ghi riêng giới hạn viewport.

### Task 1: Nội dung bài và hồ sơ quyết định

**Files:** src/content/lessons/1-1-database-la-gi.mdx; tests/content.test.ts nếu assertion Memo không còn khớp; spec/plan của lượt.

**Interfaces:** giữ nguyên frontmatter và props; nội dung MDX là đầu vào build/review.

- [x] Đọc quy ước/template/hồ sơ, bài và thiết kế trước; xác nhận user duyệt hướng giảm tải giữ mạch.
- [x] Cắt ba đoạn đã duyệt, đưa đoạn chốt xuống cuối phần chính, chỉnh Ghi nhớ và câu ôn thứ ba.
- [x] Chạy test; assertion bám hàng Memo đã bỏ được chuyển sang lời định nghĩa khóa chính đang giữ, không giảm bảo vệ.

### Task 2: Kiểm bản build

- [x] npm test: 322/322; npm run check: 0 lỗi, 0 cảnh báo, 3 hint nền.
- [x] npm run build: 132 trang; npm run check:dist: 1997 liên kết; exit 0, có log.
- [x] Xem browser bản build ở 1363×871 và 1024×871; kiểm ảnh/Excel/Ghi nhớ/đoạn chốt/bốn câu ôn bằng Enter, lưu ảnh/JSON. Chưa kiểm mobile/SSMS hoặc đo thời lượng với học viên.

### Task 3: Review độc lập và bàn giao

- [x] Giao agent mới theo gói mục 4.5: source hash/build, quyết định duyệt, nền Excel cơ bản, chỉ ghi report.
- [x] Đọc hết report: không có mục cần sửa; xử lý đầy đủ các điểm giữ được/giới hạn. Lưu report nguyên byte và ma trận vào docs/reviews/2026-10-30-lesson-1-1-reduce-load/.
- [x] Cập nhật kết quả spec/plan; kiểm diff cuối, bàn giao local và ghi rõ những phần chưa xác minh.

## Kết quả

Hoàn tất đúng kế hoạch. 322/322 test; check 0 lỗi/0 cảnh báo/3 hint nền; build 132 trang; dist 1997 liên kết; browser 1363×871/1024×871 và bốn câu ôn bằng Enter. Reviewer mới xác nhận đủ tiền đề, không yêu cầu sửa; không có vòng sửa source sau review. [Hồ sơ và ma trận](../../reviews/2026-10-30-lesson-1-1-reduce-load/verification.md) giữ đầy đủ giới hạn, report gốc và bằng chứng thực hiện trong lượt ngày 30/10. Giữ thay đổi local chưa commit, không push/deploy.

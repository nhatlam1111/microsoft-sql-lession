# Cập nhật slide Làm quen — Implementation Plan

> For agentic workers: dùng superpowers:executing-plans, thực hiện trong phiên hiện tại; reviewer mới độc lập theo quy ước repo.

**Goal:** 25 slide bám năm bài 1.1–1.5 mới, 50 phút giảng + 10 phút hỏi đáp.

**Architecture:** Một MDX là nguồn nội dung/outline. Giữ shell, token và protocol; alias anchor giải quyết liên kết cũ. Component PUBS chỉ hiển thị ảnh gốc hoặc vùng CSS phóng lớn.

**Tech Stack:** Astro/MDX, TypeScript, CSS, Vitest.

**Spec:** docs/superpowers/specs/2026-11-04-lam-quen-slides-refresh-design.md

## Global Constraints

- 25 slide; sources 1.1–1.5; từng nhóm 10/8/10/9/13 phút; metadata 60 phút.
- Không sửa bài nguồn/seed/API/database; không push/deploy.
- Kiến thức cốt lõi và điều kiện phải hiện; ghi chú chỉ mở rộng.
- Giữ ảnh gốc/credit/license, kiểu chữ/màu/canvas và hai chế độ.
- Review gpt-6.1-terra/high/fork_turns none; ghi giới hạn model thực tế nếu tool không chứng thực.

## Review Focus

- ID cũ trong query/hash vẫn đi đúng chủ đề, được chuẩn hóa sang ID chính.
- Mọi condition về NULL/khóa/cardinality hiện cho lớp, không chỉ notes.
- PUBS có khóa sales ba cột; không đồng nhất với HRM_Demo.
- Crop/nhãn và chữ không tràn khung; đọc được trên bản build.
- Notes không lọt HTML lớp; điều hướng/sync/no-JS không đổi.

## Task 1 — Liên kết tương thích

- [x] Viết và chạy test RED cho alias query/hash, canonical precedence, reload/share, fallback và toàn bộ 21 ID cũ.
- [x] Thêm SlideSpec.aliases; normalize ưu tiên ID chính rồi alias. Controller lấy anchor data-slide-alias trong mỗi slide. Giữ state/protocol canonical.
- [x] Chạy test state và outline; ghi kết quả.

## Task 2 — Nội dung và hình

- [x] Cập nhật test coverage theo spec (25 slide/50+10/5 nguồn/notes/điều kiện/PUBS).
- [x] Viết lại lam-quen.mdx theo kịch bản; giữ ID có nghĩa và đủ anchor alias cũ.
- [x] Thêm PubsFigure với ảnh gốc, khung CSS phóng vùng, alt/caption/credit/link đầy đủ. Giữ style hiện hành và cập nhật DESIGN.md phần slide đã lỗi thời.
- [x] Chạy test nội dung/outline và toàn bộ suite, check/build/check:dist.

## Task 3 — UI và review

- [ ] Kiểm build đủ 25 slide, cả hai chế độ; canvas, hình/credit/link, bàn phím, sync, share/reload, alias và no-JS.
- [x] Lập hồ sơ kiểm: source/HTML/UI/SQL live/lỗi nền/giới hạn tách riêng.
- [x] Reviewer mới học thử cả bộ; reviewer tích hợp mới kiểm alias/navigation/mạch bài. Chỉ ghi report được giao, không sửa sản phẩm/database/secret/Git.
- [x] Đọc hết report, ghi Làm theo/Làm một phần/Không làm theo và căn cứ từng mục; sửa, chạy lại các kiểm cần thiết, cập nhật spec/plan.

## Ledger

- Pre-flight: Task 1 consumes DOM anchors authored by Task 2; khóa cùng data-slide-alias/id. Task 2 notes/source/minutes dùng literal như parser hiện tại. Không đổi metadata schema.
- Ruling: dùng nhánh riêng trong checkout hiện tại thay vì tạo worktree — giữ đúng repo người dùng chỉ định và tái sử dụng dependencies sẵn có.
- Kết quả 04/11/2026: Task 1 và 2 xong (test state/outline/content, toàn bộ suite 572/572, check, build, check:dist). Task 3: kiểm UI canvas/phím/đồng bộ/alias bằng browser pane, hồ sơ ở `docs/verification/2026-11-04-lam-quen-slides.md`; hai review độc lập (Sonnet/high) và ma trận ở `docs/reviews/2026-11-04-lam-quen-slides-sonnet-high/`. Chưa kiểm: no-JS thực, cửa sổ chiếu `window.open`, máy chiếu thật.
- Quyết định sau review: link phụ lục dùng `appendixUrl`; nháy SQL viết bằng chuỗi JSX; vùng phóng PUBS không có đường nối nên caption nói rõ và slide 20 dạy quy tắc đọc đầu đường; `PubsFigure` có tham số `zoom`.

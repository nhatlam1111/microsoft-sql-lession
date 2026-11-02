# Lesson 3.3 Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Làm lại 3.3 theo khung mới, giải rõ WHERE/HAVING và SELECT trên nhóm còn lại.

**Architecture:** Tác giả triển khai trực tiếp trên branch codex/lesson-3-3-refresh từ main ebaa187 đã push. Giữ query/tình huống/đề, dùng RunFlow/checks/FlowExamples đã có; reviewer mới học thử bài và mạch từ 3.2, kế thừa model theo AGENTS.md.

**Tech Stack:** Astro/MDX, TypeScript/Vitest, SQL Server qua runner hiện hành luôn hoàn tác, IAB.

**Spec:** [Thiết kế 3.3 đã duyệt](../specs/2026-11-02-lesson-3-3-refresh-design.md).

## Global Constraints

- Giữ slug, tiêu đề, tình huống, tháng 10/2026, trạng thái đang làm, MaPB hiện lưu, yêu cầu sắp; câu SQL chính và kết quả KD/13.
- Giữ ba đề/ID, phạm vi, thứ tự cột/dòng và logic đáp án YAML; chỉ căn lại AND của đáp án 3-3-2 theo bốn cột.
- Chỉ chuyển 3.3, không sửa 3.4 hoặc bài khác/seed/API/editor, không thêm allowlist; gỡ riêng 3.3 khỏi PENDING_TWO_SUBSECTIONS.
- Dùng RunFlow/FlowExamples/checks hiện có; Đầu vào tối đa năm dòng, ví dụ tối đa hai nhóm/mỗi bảng tối đa năm dòng, ghi rõ trích/đủ phạm vi.
- SQL tác giả chỉ SELECT; câu ghi của check:exercises chỉ qua runner luôn hoàn tác rồi check:data. Không đọc/in secret.
- Giữ report gốc, xử lý hết nhận xét và ghi riêng SQL/nguồn/HTML/UI/lỗi nền/giới hạn. Phát hành trước đã hoàn tất ở ebaa187; bài 3.3 làm trên branch riêng.

## Review Focus

1. HAVING giữ nhóm KD đủ13 hồ sơ, không biến số đếm thành1: test rows/totals và SELECT calculations (Task 1).
2. IT đúng10 phải bị loại khi >10: test checks của HAVING với KD/IT và tổng trên cả6 nhóm (Task 1).
3. SoHoSo không xuất hiện như alias khả dụng trước SELECT: test caption/input và query HAVING dùng COUNT, review lời dạy (Tasks 1–2).
4. Ví dụ trích5/13 hoặc5/10 không thành toàn nhóm: test thành viên thật và total/caption, UI xem nhãn phạm vi (Tasks 1–2).
5. Ba đề chuyển sang hai biên/SUM/nhiều khóa vẫn đủ tiền đề: giữ test số liệu và gói reviewer đọc đề trước YAML (Tasks 1–2).

### Task 1: Bài 3.3 và các kiểm nội dung

**Files:** sửa src/content/lessons/3-3-having-loc-sau-khi-gop.mdx, src/content/exercises/3-3-having-loc-sau-khi-gop.yaml, tests/content-3-3.test.ts, tests/content-flow-checks.test.ts, tests/content.test.ts. Tạo helper/evidence tại temp/verification/2026-11-02-lesson-3-3/.

**Interfaces:** lessonBlocks giữ sáu bước FROM48/WHERE45/GROUP BY6/HAVING1/SELECT1/ORDER BY1. GROUP BY/HAVING dùng ['MaPB','Số hồ sơ trong nhóm'], SELECT/ORDER BY dùng ['MaPB','SoHoSo']; output cuối [['KD',13]]. WHERE checks totals[45,45]; HAVING conditions['COUNT(*) > 10'], rows[['KT',false],['KD',true],['BGD',false],['IT',false],['VH',false]], totals[1,1]. GROUP BY examples KD/IT mỗi table trích ≤5; SELECT một example KD nối MaPB='KD'/COUNT(*)=13 và mark[1].

- [ ] Chạy SELECT mới kiểm nguồn/active/nhóm/câu chính/>=10/bỏ WHERE/thành viên KD/IT và hai lỗi COUNT trong WHERE/alias trong HAVING. Expected: nguồn48/active45/nhóm6, >10 chỉ KD13, >=10 thêm IT10, bỏ WHERE KD14; truy vấn sai có error, không errorKind kết nối. Lưu log/JSON, không đọc/in .env.
- [ ] Thêm test input/checks caption/alias, đối chiếu từng boolean với seed groups, ví dụ KD/IT là trích thành viên đúng nhóm, COUNT SELECT=13 và mark đúng dòng. Thêm 3.3 vào hai bảng kiểm flow chung và gỡ khỏi danh sách chờ hai tiểu mục, giữ mọi kiểm ngưỡng/bài tập cũ.
- [ ] Run npx vitest run tests/content-3-3.test.ts tests/content-flow-checks.test.ts tests/content.test.ts. Expected: FAIL vì bài cũ chưa có input/checks/examples/LineMap/hai tiểu mục.
- [ ] Viết lại MDX theo spec: Excel→Sql→LineMap, chỉ tình huống; phần sau RunFlow→Result→câu trả lời; hai drawer nhóm mẫu trích rõ, HAVING soi nhóm, SELECT giải hai ô. Giữ ba đề, chỉ sửa indent AND của3-3-2; thêm câu ôn thứ ba và rút ý lặp/ngoài tình huống.
- [ ] Run nhóm test PASS; kiểm SQL live mỗi step của MDX mới và so query/YAML với base (YAML chỉ khác leading whitespace của answer). Run npm test Expected: full suite PASS. Cập nhật spec/plan và commit bài.

### Task 2: Kiểm bản build và review độc lập

**Files:** tạo docs/reviews/2026-11-02-lesson-3-3/{verification.md,review-3-3.md}; cập nhật spec/plan sau sửa review. Log/manifest ở temp/verification/2026-11-02-lesson-3-3/.

**Interfaces:** source commit đã chốt và dist khớp; reviewer fork none/model kế thừa, chỉ ghi report, không seed/SQL/DB/API/secret/browser. Gói/lời dặn đúng §4.5; không cấp report/kết luận tác giả cũ cho reviewer từng bài; đọc ba đề HTML và ghi cách làm trước answer YAML.

- [ ] npm run check/build/check:dist; npm --prefix api run typecheck/build/check:exercises/check:data; static UI audit theo skill, ghi false positive có căn cứ nếu còn. Expected: các kiểm repo PASS với ba hint nền, không nới kiểm; lưu kết quả thật.
- [ ] IAB trên đúng build ở desktop/1024, WHERE giữ/loại, GROUP BY trích2 nhóm, HAVING KD13/IT10 và totals6→1, SELECT một nhóm13→hai ô, ORDER BY một dòng; next/prev/Escape/Tab/mũi tên, query highlight/tab4 và chép/dán nếu kiểm thì bảo toàn clipboard/nháp. Expected: đọc được, đúng phạm vi, không suy mọi câu từ screenshot.
- [ ] Giao reviewer mới theo §4.5, đủ nguồn/build/tiền đề/quyết định. Đọc hết report, xử lý mọi mục theo §4.6 và giữ bản gốc. Có sửa thì thêm kiểm đúng lỗi và chạy lại §4.4; không cần review tích hợp thứ hai nếu không đổi công cụ và chỉ chuyển một bài.
- [ ] Commit hồ sơ và bàn giao kết quả/thay đổi/giới hạn. Giữ branch3.3; phần merge/push đã được yêu cầu trước đó có receipt/CI riêng, không lẫn trạng thái hai lượt.

## Tự rà kế hoạch

Hai task phủ thiết kế: Task1 toàn bộ nội dung/dữ liệu/formatting/di chuyển khung; Task2 build/UI/review/giới hạn. Interface caption/checks/examples thống nhất, không có thay đổi shared schema hoặc dependency dự kiến. Cách triển khai trực tiếp đã có trong phiên và thiết kế đã duyệt; không thêm vòng hỏi phương pháp hoặc quyền cho các bước cần thiết. Phát hiện cần đổi công cụ thì cập nhật thiết kế/phạm vi trước khi làm.

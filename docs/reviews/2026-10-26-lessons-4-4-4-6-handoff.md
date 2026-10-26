# Bàn giao local — bài 4.4–4.6

Đã soạn ba bài theo thiết kế duyệt26/10/2026, mỗi bài có learner review mới và xử lý từng nhận xét. Công việc nằm trên ba branch xếp kế tiếp từ4.3; chưa push, merge main hay deploy. SQL Server live và UI còn pending, không gọi kiểm source/HTML là nghiệm thu hai phần đó.

| Bài | Branch | Commit nội dung | Nội dung |
|---|---|---|---|
| [4.4 PIVOT](../../src/content/lessons/4-4-pivot-xoay-bang.mdx) | codex/lesson-4-4-full |6826d9e| Chọn ba vai trò, nhóm nguồn, NULL/0 và CASE;3đề query. |
| [4.5 VIEW](../../src/content/lessons/4-5-view-bao-cao-luu-san.mdx) | codex/lesson-4-5-full |a4b4bc5| View thường lưu định nghĩa, quyền/phạm vi,5câu ôn;2mẫu chỉ đọc, không YAML/Result. |
| [4.6 Chất lượng dữ liệu](../../src/content/lessons/4-6-soi-chat-luong-du-lieu.mdx) | codex/lesson-4-6-full |9bab24a| Rà trùng/thiếu/ngày đảo và đơn vị đếm;3đề query. |

Hai branch sau chứa commit của branch trước (đã kiểm ancestry). Worktree riêng microsoft-sql-lesson-4-4/-4-5/-4-6 được giữ. Bảng dùng commit nội dung trước commit hồ sơ tích hợp, không tự tham chiếu hash của chính tài liệu.

## Review và xử lý

| Bài | Report gốc | Ma trận |
|---|---|---|
|4.4|[Học thử](2026-10-26-bai-4-4-review.md)|[Hai góp ý](2026-10-26-bai-4-4-disposition.md)|
|4.5|[Học thử](2026-10-26-bai-4-5-review.md)|[Một góp ý](2026-10-26-bai-4-5-disposition.md)|
|4.6|[Học thử](2026-10-26-bai-4-6-review.md)|[Một góp ý](2026-10-26-bai-4-6-disposition.md)|

4.4/4.6 đều khóa bảng cách làm trước khi cấp YAML; snapshot-phase1 và report APPEND giữ riêng. Đã làm mới thuật ngữ PivotTable, thay câu ôn4.4 bằng chọn ba vai trò, gộp kiểm cột/nguồn vào câu3 của4.5 và đặt haiSELECT4.6 trong code. Không thêm lý thuyết sau Memo hoặc lời giải SQL nguyên văn vào report. Phần sâu PIVOT động, tạo view trên môi trường chung, tuning, cấp quyền thực tế và chặn ghi để ngoài phạm vi như đã duyệt.

Review tích hợp mới: [report](2026-10-26-lessons-4-4-4-6-integration-review.md) và [ma trận mọi finding/Declined-to-judge](2026-10-26-lessons-4-4-4-6-integration-disposition.md). Không Critical/Important; một Minor về hướng dẫn hoàn thành đã sửa và chuyển đúngbranch. Kết quả/15mục giới hạn cụ thể trong hai file, không dùng assessment làm quyền push hoặc nghiệm thu live/UI.

## Kiểm thực tế

[Hồ sơ kiểm nguồn/build](2026-10-26-lessons-4-4-4-6-verification.md) ghi RED/GREEN và lệnh theo mức bằng chứng. Bản nội dung cuối có322/322test,48files; Node24.22.1 và Node22.23.4 đều đạt. Astro0error/0warning/3hints nền; build132pages,1994links; API78exercises/typecheckPASS. Có9khốiSQL/6payloadcopy khớp source;4.5khôngcopy/Result/trangBài tập. Dữ liệu đối chiếu bằng JS thuần từ seed và fixture subset; không chứng nhận compiler/typing/collation SQL Server.

`check:exercises` và `check:data` dừng trước kết nối vì thiếu bốn biếnSQL, chưa có kết quả SQLgrader/live. Chưa thao tác browser/viewport/copy-paste/bàn phím/drawer/SSMS; HTML chỉ chứng minh markup/payload. Chỉ sửa copy hướng dẫn hoàn thành trong trang giới thiệu/README; không đổi seed, API, guard, schema hoặc component/UI; không tạo view/đổi database. Ba hints nền là FormEvent(2) và execCommand(1); cảnh báo môi trường npm/Node ghi nguyên trong log.

## Quyết định trong lượt

- Dùng native execution và đi tiếp sau plan theo thiết kế đã duyệt; không hỏi lại phương thức. Skill cloud không có executor scripts nên dùng ledger/log thật thay task-start/task-done; chi phí nếu sai là giảm tự động hóa lưu dấu, đã bù bằng commit/check/report.
- Reviewer ngữ cảnh mới kế thừa model theo AGENTS, cao hơn generic skill đổi model; learner từng bài và integration đều có. Chi phí nếu sai là lệch quy trình, không có bằng chứng dùng model khác.
- Xử lý cả góp ý biên tập nhỏ theo quyước4.6, không dùng generic “defer minors”; không thêm prose snapshots. Chi phí nếu sai là công biên tập nhỏ, không đổi dữ liệu hoặc runner.
- Giữ các branch/worktree local theo lựa chọn trong thiết kế, không hỏi lại menu merge/push; giữ temp evidence cho lần kiểm sau. Chi phí là dung lượng nhỏ, main/DB không bị ảnh hưởng.
- 4.5 đọc hiểu/noExercises vì view chưa được triển khai và CREATE bị chặn; không mở guard/seed để ép có bài nộp. Nếu cần thực hành tạo view thật thì là việc riêng cần môi trường/quyền phù hợp.
- Các hành vi integration chưa kết luận được xử lý từng dòng trong ma trận tích hợp; không có minor bị âm thầm bỏ qua.

Quyết định bổ sung ở lượt tích hợp: F1 copy-only dùng existing checks/render thay test mới khóa câu chữ; comment nội bộ noExercises ởDJ12 giữ nguyên vì không ảnh hưởng schema/hành vi hoặc hướng dẫn học viên. Chi phí là mô tả cho maintainer còn hẹp; đã ghi riêng trong ma trận, không coi là sửa xong comment ấy. Không có minor deferred khác.

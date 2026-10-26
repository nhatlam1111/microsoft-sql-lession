# Kiểm tra và xuất bản bài 4.1–4.6

Người dùng yêu cầu kiểm tra, hoàn thiện sáu bài rồi đưa lên main ngày 26/10/2026. Main ban đầu `0081807`; nhánh tổng hợp `codex/review-lessons-4-1-4-6` từ `origin/codex/lesson-4-6-full` (`dd67309`), đã chứa đủ lịch sử các nhánh 4.1–4.5. Không ghép nhánh workspace SSMS đang lưu riêng.

Quy ước/template hiện hành, hồ sơ công ty và mẫu 1.1 chi phối nội dung. Giữ mục tiêu các spec 4.1–4.3 và 4.4–4.6 đã duyệt; 4.5 là đọc hiểu view đề xuất, noExercises, không tạo view trên nguồn chung. Giữ 51 URL, 78 đề, dữ liệu mẫu, API, schema và thiết kế chung. Không thêm bài hoặc nới test để né lỗi.

## Công việc

- [x] Fetch và kiểm ancestry/phạm vi từng nhánh; dùng nhánh tổng hợp riêng, không sửa main trực tiếp.
- [x] Rà toàn bộ sáu bài, lời giải, tự kiểm tra và tiền đề từng đề; review mới độc lập từng bài theo 4.5, kế thừa model phiên.
- [x] Đối chiếu SQL/Result/RunFlow bằng SELECT; xác minh các giới hạn với Microsoft. Không chạy mẫu CREATE VIEW hoặc SELECT đòi view chưa có; ghi rõ giới hạn của bài đọc hiểu.
- [x] Xử lý từng finding có căn cứ và ghi ma trận; bảo vệ kiến thức/điều kiện bằng test phù hợp. Giữ report gốc.
- [x] API build/typecheck, 78 đáp án qua runner luôn hoàn tác và check:data; npm test/check/build/check:dist. Kiểm bản build ở 1280/1440, hình/bảng/drawer/highlight, copy/paste và tự kiểm tra bằng bàn phím.
- [x] Review tích hợp mới sau sáu bài, đọc hết report rồi xử lý cả mục nhỏ/chưa kết luận; cập nhật hồ sơ nghiệm thu và giới hạn.
- [x] Commit, merge vào main và kiểm main sau merge. Không lấy review thay cho bằng chứng kiểm.
- [ ] Push main theo yêu cầu đã cho và theo dõi triển khai Pages/API.

## Quyết định thực hiện

Root tự tích hợp và sửa; reviewer chỉ đọc và ghi report, không sửa source/Git/DB. Quy định repository về reviewer mỗi bài, xử lý mọi nhận xét và kế thừa model ưu tiên hơn các mặc định của skill. Không xin lại quyền push main vì yêu cầu hiện tại đã cho phép.

Evidence mới: `temp/verification/2026-10-26-review-4-1-4-6/`; review mới: `temp/review/2026-10-26-review-4-1-4-6/`. Các hồ sơ từng bài hiện có là lịch sử, không đổi kết luận và không gọi kiểm fixture/HTML cũ là SQL/UI live.

Sáu review mới hoàn tất, 15 đề đủ tiền đề trước answer; 4.5 đủ năm tự kiểm tra. Một finding biên tập 4.4 đã làm theo, reviewer kiểm lại source/HTML; không đổi SQL/Result/YAML. 13 Result/11 trạng thái flow khớp SELECT live; 78 đáp án rollback/check:data không lệch. 322 tests; check không lỗi/cảnh báo, ba hint nền; build mới sau biên tập 132 trang/dist 1994 liên kết. Giao diện sáu bài kiểm 1280/1440, 24 tự kiểm tra, 11 drawer, copy/paste/Tab/undo. Hồ sơ và ma trận tại [verification](../../reviews/2026-10-26-publication-4-1-4-6/verification.md). Reviewer tích hợp mới đã hoàn tất, không finding nội dung; đủ bốn DJ đã có ruling, gồm giới hạn vô tình thấy ma trận nên không gọi là blind audit. Quyền main/push đã có trong yêu cầu, không xin lại.

Đã commit `3e9890f`, merge main `74e1b30` không xung đột/cây khớp nhánh review. Main kiểm lại cùng 322 tests/0 lỗi/0 cảnh báo/3 hint/132 trang/1994 link (19:31). Chỉ ghi thêm tài liệu kiểm trước push; không đổi source so với bản đã kiểm. Nhánh SSMS vẫn nguyên ngoài lần merge.

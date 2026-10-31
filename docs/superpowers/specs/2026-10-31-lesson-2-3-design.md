# Bài 2.3 theo mạch mới của 2.1–2.2

## Phạm vi và căn cứ

Yêu cầu: cập nhật riêng bài 2.3 theo quy ước/template hiện hành và hai bài 2.1, 2.2 mới. Source base `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`, checkout `feat/lesson-2-1-excel-first`; thay đổi bài 2.2 từ lượt trước đang có và được giữ nguyên. Không đổi YAML, seed, API, component hoặc bài ngoài phạm vi.

## Thiết kế được áp dụng

Chuyển đầy đủ mạch Excel → câu SQL tình huống → LineMap; tiểu mục sau RunFlow → Result → trả lời chị Hạnh. Chỉ gộp tiêu đề sẽ vẫn còn nhiều truy vấn minh họa và không đạt quy ước. Đổi tình huống/bài tập không cần thiết. Người làm khóa học đã chọn quy ước và mẫu cụ thể nên thực hiện trực tiếp trong checkout phù hợp.

Giữ tình huống KD hoặc IT, ngày vào làm từ 01/01 đến hết 30/06/2023; mã phòng hiện lưu, không lọc trạng thái. Câu chính IN/BETWEEN và bốn cột không đổi. FROM 48 → WHERE 2 → SELECT 2, kết quả NV003/NV043; giữ hình Excel và số dòng nhảy cóc. Bước cuối nói rõ đây là danh sách cần gửi chị Hạnh.

LineMap giải thích SELECT/AS, FROM, IN, AND và BETWEEN bằng giá trị của tình huống. Dạy OR/ngoặc/AND trước OR bằng biến thể của điều kiện phòng và ngày. Không thêm câu SELECT hoặc bảng kết quả khác. LIKE được nhắc ngắn để đủ tiền đề đề 3–4, dùng ngay HoTen/NV003 của tình huống, không dựng tình huống phụ. Giải thích % (từ 0 ký tự), _ (đúng một ký tự), mẫu khác từ riêng, tìm chuỗi ở mọi vị trí và phạm vi so hoa thường của DB. Không lộ đáp án đầy đủ.

Hay nhầm dùng biến thể sai của câu chính: thiếu ngoặc, đảo mốc, nhầm danh sách IN hoặc thiếu phép so sánh OR. Giữ tối thiểu ba tự kiểm tra sau Ghi nhớ, đáp án chỉ ôn kiến thức đã dạy; đổi câu LIKE không phụ thuộc ví dụ cũ ngoài mạch. Giữ đủ bốn bài tập hiện có.

`teach` áp dụng vào tiền đề, giải thích từ việc cụ thể, giảm tải và câu tự kiểm tra; không tạo learning-workspace/HTML riêng, hồ sơ học cá nhân hoặc gọi các teach-skills khác. Superpowers dùng để ghi thiết kế/kế hoạch, thực hiện và kiểm bằng chứng, tuân thủ ưu tiên quy ước repo về model reviewer và quyền thao tác.

## Nghiệm thu

Gỡ 2.3 khỏi danh sách cho phép khung cũ; giữ test dữ liệu và bổ sung kiểm phạm vi một câu chính/tiền đề mẫu chữ. SELECT live kiểm từng bước, mọi dòng trích, điều kiện sai và ví dụ mẫu trước khi viết. Không có MCP azure-sql trong phiên thì dùng kết nối local hiện có, chỉ SELECT và không in credential.

Chạy API build/check:exercises/check:data, npm test/check/build/check:dist; xem build, drawer/highlight, copy/paste/tab bốn cột ở desktop. Reviewer mới fork none, model kế thừa, học thử từng đề từ bài trước khi xem answer; không đọc DB/secret hoặc chạy SQL. Sau review từng bài, thêm review tích hợp mạch 2.1–2.3 vì đang chuyển liên tiếp nhiều bài; reviewer tích hợp mới được đọc bằng chứng được giao, không thay tác giả kiểm SQL/UI.

Lưu report gốc, ma trận quyết định, phiên bản source/build và giới hạn; cập nhật spec/plan mỗi vòng. Thời lượng là ước tính biên tập, chưa đo học viên thật. Không commit/push/deploy.

## Trạng thái

Hoàn tất: hai tiểu mục, một câu chính, LineMap, LIKE dùng NV003, ba câu ôn và bốn đề giữ nguyên; ước tính 20 phút. SELECT-only có 17 bản ghi; 329 test, check và build/check:dist đạt, ba hint deprecated sẵn có. API 76 bài đạt, data không lệch. Browser kiểm hai viewport desktop/drawer/self-check/highlight/copy-paste/tab4.

Review độc lập không có finding sửa, đủ tiền đề bốn đề; review tích hợp agent mới không thấy thiếu tiền đề ở 11 đề của mạch 2.1–2.3. Không sửa sản phẩm sau source/build đã kiểm. Đã xử lý mọi mục tích hợp cần tác giả kết luận: giữ phạm vi chấm kết quả của bộ mẫu (không chứng minh tương đương mọi dữ liệu), giữ giới hạn UI/web/SSMS và thời lượng ước tính; không mở sửa API/editor/nháp. [Report gốc, ma trận và bằng chứng](../../reviews/2026-10-31-lesson-2-3/verification.md). Chưa kiểm SSMS hoặc xác thực/chạy/nộp SQL trên web. Không commit/push/deploy.

Sau bàn giao, người dùng đã yêu cầu merge main và push ngày 31/10/2026; xem [hồ sơ tích hợp/kiểm trước xuất bản](../../reviews/2026-10-31-publish-2-2-2-4/verification.md). Quyền mới này áp dụng cho thao tác Git, không thay đổi nội dung hoặc kết luận review đã lưu.

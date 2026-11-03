# Chuyển bài 3.4–3.5 sang quy ước hiện hành

Yêu cầu: tiếp tục làm bài 3.4 và 3.5 theo `docs/quy-uoc.md`, `docs/lesson-template.md` và bài mẫu 2.1. Đối tượng chỉ biết Excel cơ bản; không mặc định biết VLOOKUP.

## Phạm vi

- Giữ tình huống, giả định, số bài, slug, tiến độ và sáu đề bài tập hiện có. Không đổi schema, seed hoặc API.
- 3.4: mọi hồ sơ kèm tên phòng theo mã hiện lưu. Giảng INNER JOIN/ON, bí danh bảng và nguồn cột; giải thích một dòng kết quả là một cặp khớp, khác VLOOKUP chỉ lấy lần khớp đầu. Nêu điều kiện thực tế giúp 48 hồ sơ vẫn thành 48 dòng. Bài tập tổng hợp cần biết GROUP BY theo cả mã và tên.
- 3.5: tìm hồ sơ không có bất kỳ hợp đồng nào, không phải không có hợp đồng còn hiệu lực. Giảng giữ bên trái, NULL được tạo trong kết quả, kiểm khóa không nhận NULL và số dòng tăng do một–nhiều. Giữ kiến thức ON/WHERE đủ chuyển sang đề đối chiếu theo kỳ nhưng bỏ truy vấn phụ đổi tình huống sang hợp đồng thử việc.
- Phần chính mỗi bài có đúng hai tiểu mục: Excel → câu SQL đầy đủ → LineMap; sau đó RunFlow → Result → câu trả lời chị Hạnh. Giữ Hay nhầm, Ứng dụng, Ghi nhớ, tự kiểm tra, Bài tập.
- RunFlow dùng đúng câu chính, giải thích gọn ba phần; đầu vào thấy đủ cột được xét. 3.5 có bảng soi WHERE, gồm dòng bị loại và giữ, và ví dụ nhân viên có ba hợp đồng trong cùng bản trích.
- Gỡ hai slug khỏi danh sách chờ chuyển bố cục; giữ các kiểm về số liệu và tính đúng. Không thêm test khóa câu chữ mới.

## Kiểm và bàn giao

Đối chiếu tài liệu Microsoft về JOIN/ON/WHERE và VLOOKUP. Chạy SELECT trên database khóa học nếu kết nối khả dụng; ghi riêng bất kỳ điều chưa xác minh, không lấy kết quả seed hoặc log cũ làm bằng chứng live mới. Theo quy ước chạy API build/check:exercises/check:data, npm test/check/build/check:dist và kiểm browser trên build.

Theo xác nhận mới của người dùng ngày 03/11/2026, ngoại lệ tự review đã kết thúc cùng phần 1. Lượt 3.4–3.5 chạy agent review riêng từng bài rồi review tích hợp, dùng GPT-6.1 Terra/effort high với ngữ cảnh mới. Tác giả xử lý từng nhận xét theo mục 4.6. Bàn giao local, không mặc định kéo quyền merge/push của lượt trước sang thay đổi mới. Giữ file premium-audit.json ngoài phạm vi.

## Kết quả triển khai

Hai bài đã chuyển khung, gỡ khỏi PENDING_TWO_SUBSECTIONS, giữ nguyên đề và câu trả lời nghiệp vụ. Bản trước review có 3/4 câu ôn, 4/5 bước sơ đồ; WHERE 3.5 có bảng soi với cột khóa đủ nhìn thấy. Đã kiểm SELECT thật, đủ 76 đề API và dữ liệu không lệch; 564 test, check, build và check:dist đạt (7 hint nền). Browser kiểm 1280/1024px, các drawer/câu ôn/link bài tập và Ctrl+V; ghi chi tiết và giới hạn trong hồ sơ verification. Tiếp tục review độc lập theo quyết định mới; không commit/push/deploy.

## Review độc lập đã thực hiện

Hai agent riêng và một agent tích hợp dùng GPT-6.1 Terra/high với ngữ cảnh mới. 3.4 thêm bảng danh mục trong Thực hiện của drawer hiện có theo mục 2.6, đối chiếu được mã/tên hai phía; 3.5 làm rõ AND trong ON và cắt một vế lặp. Không thêm truy vấn phụ, không đổi câu chính, đề, dữ liệu hoặc component. Sau sửa 565 test, check/build/check:dist đạt; 76 đề API và checksum dữ liệu đạt, 17 SELECT và UI phần đổi đã kiểm. Review tích hợp không phát hiện finding mới; giới hạn thứ tự xem đáp án của lượt tích hợp được ghi riêng, không thay cho học thử đúng thứ tự của hai reviewer từng bài. Xem report gốc và ma trận tại docs/verification/2026-11-03-lessons-3-4-3-5-review.md. Không commit/push/deploy.

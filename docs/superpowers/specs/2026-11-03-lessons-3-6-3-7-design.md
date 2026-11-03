# Chuyển bài 3.6–3.7 sang quy ước hiện hành

Ngày: 03/11/2026. Phạm vi theo yêu cầu tiếp tục của người làm khóa học; áp dụng quy ước đã chốt, không mở một vòng chọn thiết kế mới.

## Mục tiêu và giới hạn

Người học chỉ biết Excel cơ bản, đã học đến 3.5. Viết lại hai bài đọc, giữ URL, số bài, tình huống, mục tiêu dữ liệu, ba bài tập mỗi bài và cơ chế tiến độ. Không sửa schema, seed, API, đáp án hay công cụ dùng chung. Không push/deploy.

- 3.6: kết `NhanVien`, `HopDong`, `BangLuong`; kỳ `2026-09`, hợp đồng ứng viên tại `20260930`. Phân biệt khóa/độ chi tiết; ngày chỉ giới hạn ứng viên, không bảo đảm duy nhất. Kiểm trùng ứng viên và độ phủ dòng lương; không cộng lặp tiền hoặc chứng nhận hiệu lực pháp lý.
- 3.7: hai vai trò `nv` và `ql` của `NhanVien`; đọc quản lý trực tiếp hiện lưu, giữ mọi hồ sơ, kể cả mã quản lý `NULL`. Có đủ cầu nối để làm bài tập đếm phía phải và lọc trạng thái riêng hai vai trò.

## Cách thực hiện

Chọn chuyển chính tình huống cũ sang khung mới: Excel → một câu SQL đầy đủ → LineMap; tiểu mục sau RunFlow → Result → trả lời chị Hạnh. Bỏ cách nhiều câu SQL độc lập vì trái mục 2.1. Đổi 3.6 thành ví dụ chỉ kết danh mục sẽ dễ hơn nhưng làm mất mục tiêu kiểm nhân dòng, nên không chọn. Đây là quyết định biên tập của tác giả trong phạm vi người dùng đã giao.

Các phép kiểm phụ được giải thích bằng kiến thức COUNT/GROUP BY/HAVING đã học và dữ liệu đối chiếu, không đưa thêm truy vấn giải tình huống khác. Mỗi RunFlow dùng bản trích tối đa năm dòng để theo được đường kết; ví dụ bên phải dùng `examples` hiện có theo §2.6, không sửa component. Lời giải luôn hiển thị; tự kiểm tra chỉ ôn kiến thức đã dạy.

## Nguồn và kiểm

Đối chiếu Microsoft Learn về JOIN/FROM và COUNT; lưu URL và phần đã xác minh trong hồ sơ kỹ thuật. Chạy mọi SQL và dẫn chứng qua kết nối local hiện có, chỉ SELECT; các kiểm bài tập dùng runner luôn hoàn tác và check:data. Kiểm nguồn, HTML, thao tác browser tách riêng.

Review riêng từng bài, sau đó review tích hợp, đều agent mới `gpt-6.1-terra`, effort `high`, `fork_turns: "none"`. Reviewer chỉ ghi report, tự giải đề trước khi xem answer; không dùng script/DB/tài liệu SQL ngoài khóa học để bù kiến thức.

## Hiện trạng đầu lượt

Tiếp tục checkout đang có thay đổi 3.4–3.5, không commit/reset chúng. Có thay đổi song song 3.8–3.9; baseline `npm test`: 562 đạt, 3 lỗi ở `content-3-tail` và bố cục 3.8. Không sửa các lỗi đó bằng nới test. `premium-audit.json` ngoài phạm vi, giữ nguyên.

## Kết quả và vòng sửa

Vòng viết: đã chuyển hai bài sang hai tiểu mục và một SQL chính, thêm LineMap; gỡ hai bài khỏi danh sách khung cũ. Giữ truy vấn, YAML và tổng các bước. 3.6 có dữ liệu bên phải ở cả hai JOIN, phân biệt hồ sơ thiếu hợp đồng với thiếu lương đúng kỳ; 3.7 có dữ liệu vai trò ql và giữ NULL xuyên suốt. Bỏ các truy vấn phụ, giữ cách kiểm và cầu nối bài tập trong lời giảng trước phần ôn. Đã quan sát kiểm mới thất bại trước sửa rồi đạt sau sửa.

Vòng review riêng: hai agent Terra/high đã tự giải sáu prompt trước answer; không phát hiện lỗi chắc chắn. Xử lý điểm khó tìm của đề danh mục bằng đường tra nút Sơ đồ database trước Exercises, không mở rộng tình huống chính; cắt câu NV041 lặp, rút bảng ví dụ ngày xuống 4 cột để đọc ở 1024. Bản sau sửa: 569 test, check 0 lỗi/0 warning/7 hint nền, build 190 trang, 3567 liên kết; 21 SELECT và 27 so sánh không lộ lời giải đạt. UI đủ 9 drawer/8 câu ôn/6 trang bài tập, copy/paste và khôi phục nháp đã kiểm.

Vòng tích hợp: agent Terra/high mới không phát hiện lỗi chắc chắn; ba điểm cân nhắc đã xử lý ở hồ sơ verification. Giữ bảng ON 4 cột vì mục tiêu xét mã/ngày và ảnh hẹp xác nhận đọc được; kiểm thêm popup schema ở 1024 để xác nhận đường tra chức danh; giữ cầu nối COUNT vì kiến thức đã giảng và reviewer riêng tự giải được, không suy thành kết luận về mọi học viên. Chỉ thêm code cho tên bảng trong Key 3.7 sau review; không thay truy vấn, dữ liệu, bài tập hay công cụ.

Bản cuối: 569 test đạt; check 0 lỗi/0 warning/7 hint nền; 190 trang/3567 liên kết. Có 85 lỗi check do ba bản sao TS trong gói review, đã truy đúng nguyên nhân và đổi đuôi bản sao (hash không đổi), không nới cấu hình hoặc test sản phẩm. API kiểm lại đủ 76 bài và check:data không bảng nào lệch. Giữ nguyên ba report gốc và hồ sơ phiên bản. Không còn công việc bắt buộc trong phạm vi; bàn giao local, không commit/push/deploy.

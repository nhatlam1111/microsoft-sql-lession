# Chuyển bài 3.8–3.9 sang quy ước hiện hành

Yêu cầu ngày 03/11/2026: tiếp tục hai bài theo `docs/quy-uoc.md`, `docs/lesson-template.md` và bài mẫu 2.1. Đây là lượt chuyển nội dung đã có; quy ước hiện hành thay các quyết định bố cục cũ của lượt 25/10.

## Quyết định triển khai

- Giữ số bài, URL, mục tiêu và sáu đề/đáp án YAML. Không sửa API, seed, component chung hoặc bài khác; dùng checkout hiện có, giữ các thay đổi 3.4–3.5 đang chờ bàn giao.
- Mỗi phần chính có đúng hai tiểu mục: việc Excel kèm hình → một câu SQL đầy đủ → LineMap giải câu đó; tiếp theo RunFlow → Result → câu trả lời chị Hạnh. Không giữ tiểu mục câu lệnh riêng.
- 3.8 giữ danh sách một cột MaNV: đơn đã duyệt bắt đầu tháng 9 hoặc chấm công tháng 9 có GioVao sau 08:00. Giảng UNION/ALL, cùng số/vị trí/kiểu cột, nhãn nguồn và thứ tự chung; bỏ câu phụ hai cột, giữ giải thích cặp mã–nguồn bằng lời và dẫn chứng. Hai SELECT của sơ đồ là đầu vào độc lập, không phải thứ tự thực thi vật lý.
- 3.9 giữ câu chính IN trên NhanVien/DonNghiPhep và phạm vi đơn như 3.1. Giảng EXISTS/SELECT 1/điều kiện liên hệ bằng đoạn điều kiện thay thế trên đúng hai bảng của tình huống, không thêm câu độc lập. Đoạn trích này dùng Sql copy=false theo quy ước mục 2 để đọc được nhiều dòng/thụt lề, thay vì ép vào cột trái LineMap rộng 150px. Test khung kiểm một câu chạy đầy đủ, cho phép đoạn chỉ đọc theo quy ước. NOT EXISTS dùng lại phạm vi đơn đó, thay ví dụ hợp đồng cũ; nói rõ cách đặt điều kiện hồ sơ ở ngoài và điều kiện dòng liên quan ở trong để đủ tiền đề bài tập. Không dùng bài ôn dạy bù. Không biến câu con thành danh sách mã chép tay hay cam kết hiệu năng.
- Drawer 3.9 có thông tin hồ sơ đủ cho SELECT, danh sách mã câu con trong Thực hiện và checks WHERE gồm hồ sơ giữ/loại. Dòng/cột/số tổng và các bảng minh họa đều kiểm trực tiếp bằng SELECT.
- Gỡ hai bài khỏi PENDING_TWO_SUBSECTIONS, sửa test phụ thuộc truy vấn hợp đồng/tiêu đề cũ thành bảo vệ cùng kiến thức và số liệu trong phạm vi mới; không nới allowlist.
- Hồ sơ công ty mục 7 cập nhật những gì bài thực sự kể, bỏ dẫn chứng truy vấn đã cắt. Giữ các số liệu kiểm được trong hồ sơ verification.

## Kiểm và review

Tự kiểm SELECT và nguồn Microsoft; API build/check:exercises/check:data, npm test/check/build/check:dist, browser trên build khớp source. Review độc lập mỗi bài và tích hợp bằng agent mới GPT-6.1 Terra/high, fork none, theo đúng gói/lời dặn mục 4.5. Ghi riêng bằng chứng, lỗi nền, giới hạn và xử lý từng nhận xét theo mục 4.6.

Tiếp tục triển khai theo yêu cầu đã có, không thêm bước xin xác nhận lại kế hoạch. Không commit chung thay đổi đang có, không push/deploy. Spec/plan và hồ sơ verification được cập nhật sau mỗi vòng sửa.

## Vòng sửa theo review từng bài

Làm rõ ORDER BY cuối dùng tên cột kết quả từ nhánh đầu ở 3.8, trước câu ôn. 3.9 dùng cùng bản trích chưa xếp ở WHERE/SELECT để đầu vào ORDER BY cho thấy thao tác đổi vị trí; kết quả cuối vẫn tăng dần. Hai góp ý đều làm theo, giữ mọi số liệu/phạm vi/đề. Cần kiểm lại SQL, build và UI phần đổi. Giới hạn lộ answer khi hai reviewer đọc YAML được giữ trong report gốc; giai đoạn đọc prompt riêng của review tích hợp bổ sung bằng chứng tiền đề theo đúng thứ tự.

## Kết quả cuối

Review tích hợp hai giai đoạn đã khóa đủ sáu đề trước answer rồi mới đối chiếu, không phát hiện finding cần sửa. Giới hạn test được xử lý bằng nhận dạng thuộc tính không phụ thuộc vị trí và đối chiếu con số 49 trong lời văn với SELECT có nhãn; không đổi nội dung thêm sau review. Cả hai bài đủ khung, phạm vi và bài tập; kiểm 569 test, check/build/check:dist, API 76 đề/data và SELECT/UI đã ghi đúng phạm vi trong hồ sơ verification. Giữ nguyên sáu YAML và các thay đổi khác trong checkout; bàn giao local, không commit/push/deploy.

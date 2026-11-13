# Định hướng phần 4–5 của khóa học

Chốt ngày 13/11/2026 theo yêu cầu áp dụng đề xuất audit. Đây là chuẩn phạm vi cho các lượt hoàn thiện bài tiếp theo; không tuyên bố 19 bài hiện có đã được viết lại hoặc nghiệm thu. Giữ nguyên ID, URL, tiến độ và menu trong pilot này.

Phần 4 hướng tới **đọc hiểu logic và kiểm chứng dữ liệu**; phần 5 hướng tới **an toàn dữ liệu và phối hợp xử lý sự cố**. Học viên BA/PM không cần tự vận hành backup/restore hoặc sửa Production để hoàn thành khóa.

## Ma trận quyết định cho từng bài

| Bài hiện tại | Định hướng đã chốt | Đầu ra và giới hạn khi hoàn thiện bài |
|---|---|---|
| 4.1 Thiết kế bảng và chuẩn hóa | Giữ, đổi trọng tâm | Đọc mô hình, giải thích một dòng đại diện cho gì, nhận biết thông tin lặp và dữ liệu chốt theo kỳ. Đề xuất mô hình ở mức nghiệp vụ, không yêu cầu tự triển khai DDL |
| 4.2 Ràng buộc | Giữ, bổ sung đối chiếu luật | Chuyển quy tắc nghiệp vụ thành điều kiện có thể kiểm; phân biệt dữ liệu hợp lệ theo ràng buộc với đúng thực tế. Biết luật nào cần kiểm ở ứng dụng/DB; không yêu cầu cấp quyền hay tạo constraint |
| 4.3 INSERT/UPDATE/DELETE | Chuyển thao tác ghi thành tùy chọn | Phần bắt buộc: đọc câu lệnh và dự đoán phạm vi bị tác động. Bỏ đầu ra hứa “không làm hỏng dữ liệu khác”. Phần viết chỉ qua môi trường được phép, luôn hoàn tác |
| 4.4 Transaction | Giữ khái niệm, chuyển trước thực hành ghi | Đọc phạm vi một giao dịch, biết ý nghĩa commit/rollback và giới hạn phục hồi. Học trước nhánh chạy lệnh 4.3; không đồng nhất “có lỗi” với “mọi thay đổi tự hoàn tác” |
| 4.5 Import Excel | Giữ, đổi từ vận hành sang nghiệm thu import | Chốt mapping cột, kiểu/giá trị, luật từ chối, số dòng nhận/loại và đối soát sau import. Thao tác Wizard/INSERT là tùy chọn; không dạy hai công cụ như cùng một đường nhập mọi loại file |
| 4.6 Index | Giữ ở mức nhận biết | Biết index hỗ trợ một số cách truy cập và có chi phí; thu thập query, tham số, số dòng, thời gian để trao đổi. Không hứa thêm index là nhanh, không tự tạo index |
| 4.7 Execution plan | Chuyển chuyên sâu sang đọc thêm | Phần cốt lõi: hiểu plan giúp đặt giả thuyết, phân biệt ước tính với kết quả quan sát. Không dùng seek/scan hoặc phần trăm chi phí làm kết luận duy nhất; bỏ yêu cầu tự tìm “bước tốn công nhất” nếu chưa có đủ tiền đề |
| 4.8 View | Giữ làm mẫu định hướng | Bài hiện tại đã phân biệt đọc định nghĩa với tạo view, nguồn với bản chốt, quyền đọc với quyền tạo. Giữ mô hình này cho các đối tượng tiếp theo; không kéo thêm thực hành CREATE |
| 4.9 Stored procedure | Giữ, bổ sung cách lần logic | Xác định tham số, nguồn, bộ lọc, phép tính, đầu ra và đoạn có tác dụng ghi. Mặc định đọc script được cung cấp; không khuyến khích EXEC hay chạy rời đoạn khi chưa hiểu phụ thuộc và tác động |
| 4.10 Function | Giữ ngắn, tùy chọn đào sâu | Đọc tham số và kết quả một giá trị/bảng; phân biệt với view/procedure qua một việc dùng lại quy tắc. Không yêu cầu học VBA, viết UDF hoặc tối ưu UDF |
| 4.11 Trigger và nhật ký | Giữ nhận biết; gộp khung lịch sử với 5.7 | Biết thay đổi có thể kích hoạt logic khác; xác định hệ thống có lưu gì về trước/sau/người sửa. Đổi mục tiêu “biết ai sửa” thành “biết cần bằng chứng nào để xác định”; trigger không đồng nghĩa luôn có audit đầy đủ |
| 5.1 Nhạy cảm và phân quyền | Giữ bắt buộc; giới thiệu sớm | Chọn dữ liệu tối thiểu và quyền phù hợp, biết giới hạn khi xuất/chia sẻ báo cáo. Tách quyền truy cập, che hiển thị và bảo vệ bản xuất; không coi Protect Sheet là tương đương bảo mật DB |
| 5.2 Dev/UAT/Production | Giữ bắt buộc; giới thiệu sớm | Chọn đúng môi trường, dữ liệu thử và người phê duyệt; viết tiêu chí nghiệm thu thay vì học quy trình tự sửa Production |
| 5.3 Lock/blocking/deadlock | Giữ ở mức phối hợp | Phân biệt chờ với thất bại, ghi triệu chứng/thời điểm/thao tác để báo IT. Không tự kill phiên, sửa isolation hoặc thêm NOLOCK làm cách chữa mặc định |
| 5.4 Backup/restore | Giữ nền tảng, gộp mạch với 5.5 | Biết bản sao dùng làm gì, ai chịu trách nhiệm, dữ liệu có thể mất đến mốc nào. Bổ sung RPO là mức mất dữ liệu chấp nhận, RTO là thời gian phục hồi mục tiêu; không yêu cầu chạy lệnh |
| 5.5 Point-in-time restore | Giữ như phần tiếp của 5.4 | Hiểu chọn mốc, phạm vi ảnh hưởng và nhu cầu kiểm dữ liệu phát sinh sau mốc. Phân biệt mô hình vận hành SQL Server và dịch vụ quản lý; không biến mặc định lưu backup của một nền tảng thành cam kết của hệ thống |
| 5.6 Sự cố UPDATE | Giữ tình huống, ưu tiên chuyển vai | Đầu ra: ngừng thao tác làm tình hình xấu thêm, ghi bằng chứng, báo đúng người, xác định báo cáo bị ảnh hưởng và kiểm lại sau khôi phục. Không đóng vai người tự chạy câu “cứu” trên hệ thống thật; script ghi chỉ để đọc |
| 5.7 Temporal | Giữ tùy khả năng hệ thống; gộp đối chiếu với 4.11 | Biết lịch sử chỉ có nếu hệ thống đã lưu theo thiết kế; đọc mẫu truy vấn lịch sử khi có dữ liệu/phân quyền phù hợp. Phân biệt lịch sử giá trị, nhật ký người sửa và bản backup; không cần phụ thuộc kiến thức restore để hiểu mục đích xem lịch sử |
| 5.8 Checklist Production | Đổi thành checklist đọc/đối soát/bàn giao | Bắt buộc: môi trường, nguồn, quyền, phạm vi, dữ liệu nhạy cảm, đối chiếu số liệu và báo bất thường. Checklist chạy lệnh ghi là phần riêng cho người được giao quyền, không là chuẩn tốt nghiệp của mọi học viên |

“Gộp” ở đây là gộp mạch giải thích và dẫn chiếu, **không xóa bài hoặc đổi ID**. Có thể giữ 5.4/5.5 là hai trang liên tiếp và 4.11/5.7 cùng dẫn tới một bảng phân biệt lịch sử. Nếu muốn giảm số trang sau pilot, cần quyết định riêng về URL/tiến độ.

## Các điểm cần xử lý trước khi mở rộng

- 4.3 chỉ có tiền đề 2.2, còn 4.4 phụ thuộc 4.3: phù hợp đọc cú pháp trước, chưa phù hợp mở thực hành ghi trước kiến thức giao dịch. Tách “đọc 4.3” và “thực hành ghi sau 4.4”.
- 5.1/5.2 nên có hướng dẫn ngắn tại đường thực hành đầu tiên và dẫn tới bài đầy đủ, không chờ cuối khóa mới giới thiệu môi trường/quyền. Giữ số bài hiện tại.
- 5.6 vẫn theo bố cục cũ và các khối UPDATE không có copy=false. Đây là điểm cần đưa vào lượt sửa riêng; không lấy bài này làm mẫu cho bài mới.
- Các câu tuyệt đối ở đề cương như mọi người thấy thay đổi “ngay”, “có index làm đọc nhanh”, “đếm số dòng đúng thì COMMIT” có thể làm người mới suy rộng. Khi hoàn thiện bài cần đặt đủ điều kiện, dùng ví dụ phục vụ mục tiêu; không giải quyết bằng cách thêm một chương ngoại lệ DBA.
- Số liệu, thông báo lỗi, backup retention và hành vi công cụ trong 5.4–5.6 chưa được xác minh ở đợt này. Không dùng báo cáo để xác nhận tính đúng hiện hành của chúng.

## Khoảng trống và cách bổ sung không tăng số bài

| Năng lực cần có | Đã có gì | Bổ sung ở đâu |
|---|---|---|
| Đối soát một báo cáo | 3.6 nói đơn vị một dòng; 3.19 tìm trùng/thiếu/sai theo luật, phân biệt nhóm và hồ sơ | Cuối 3.19 thêm tình huống đối soát hai kết quả: chốt kỳ/phạm vi, đơn vị đếm, nguồn và các dòng gây chênh; không viết lại lý thuyết kiểm chất lượng |
| Kiểm chứng yêu cầu/UAT | 5.2 hiện chủ yếu nêu tên môi trường; 4.2 có luật dữ liệu | 5.2 thêm tiêu chí nghiệm thu và bảng ca thử từ yêu cầu, gồm trường hợp bình thường/biên/thiếu dữ liệu; kết quả mong đợi phải suy ra từ luật đã chốt |
| Bài tổng hợp BA/PM | Có nhiều bài kỹ thuật riêng; chưa thấy một bài bàn giao kết luận xuyên các bước trong mẫu đã đọc | Bài tổng hợp cuối 3.19: nhận yêu cầu, viết SELECT, đối soát vài dòng, trình bày kết luận/giới hạn và câu hỏi cần xác minh. Không tạo level hoặc hệ thống chấm mới trong pilot |
| Phối hợp khôi phục | 5.4–5.6 có khái niệm đường cứu | 5.6 thêm mẫu bàn giao sự cố và checklist kiểm sau khôi phục: phạm vi, số dòng/tổng nghiệp vụ, dữ liệu mới sau mốc, báo cáo đã xuất; không thực hiện restore |

Ba năng lực đầu là đề xuất sư phạm từ mục tiêu BA/PM, không tuyên bố đã rà hết mọi bài tập toàn khóa. Khi triển khai phải đối chiếu bài tập liên quan để tránh trùng; trong audit này chỉ kiểm toàn bộ tiền đề của ba bài mẫu được giao.

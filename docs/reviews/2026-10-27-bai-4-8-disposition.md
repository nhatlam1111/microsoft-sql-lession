# Xử lý học thử bài 4.8

Đã đọc trọn report learner mới, kế thừa model của phiên. Report gốc được giữ nguyên; source được review có SHA-256 `d08efb59bb02627a24bced8ba0945ee4d98fca34cba94895f58c1f1c2c98c9dd`. Một phase vì bài không có YAML.

| Nhận xét / giới hạn | Quyết định | Xử lý và căn cứ |
|---|---|---|
| Thiếu bước chọn thủ tục/nhấp phải trong SSMS | Làm theo | Sửa câu phần chính và câu ôn 5: mở đúng database, chọn thủ tục rồi nhấp phải; dùng đầy đủ tên New Query Editor Window. Đối chiếu Microsoft View definition ngày 27/10/2026. Không thêm khối/hình/thực hành tạo thủ tục. |
| Giữ phiếu → tham số → SELECT chi tiết → COUNT và đủ năm câu ôn | Làm theo | Giữ mạch và phạm vi, không dùng ôn để giảng bù, không thêm YAML hoặc kết quả giả cho EXEC. |
| Số 18/2/20 mới đối chiếu nội dung, chưa SQL live | Làm một phần | Tác giả kiểm source fixture/body và tính thuần: 18 dòng NV043 + 2 ngày phép; đổi mã/biên ngày có test. API build 81 đề, không nhận là chạy engine; live thiếu bốn SQL env, vẫn chưa xác minh. |
| HTML chưa chứng minh tab bốn cột, clipboard/UI/SSMS | Làm một phần | Checker tác giả đối chiếu SQL/payload copy/Excel/Result/marks; CSS hiện có dùng tab-size: 4. Build/HTML sau sửa được kiểm lại. Không thao tác browser/SSMS, nên tương tác và hình học thực vẫn pending. |
| 25 phút chưa được đo với học viên thật | Không làm theo — giữ ước lượng | Chưa có nghiên cứu thời lượng; không hứa học viên nào cũng học xong trong 25 phút. Ngoài phạm vi soạn hai bài. |

Sửa nội dung chỉ là hai câu chỉ dẫn. Dùng kiểm nội dung/format/SQL và build/HTML hiện có, không thêm test khóa câu chữ và không gọi reviewer học lại chỉ để xác nhận sửa biên tập. Hồ sơ kiểm chung ghi riêng source, HTML, UI và SQL live; kết luận học thử không thay quyền push.

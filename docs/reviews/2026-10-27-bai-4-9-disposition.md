# Xử lý học thử bài 4.9

Đã đọc trọn report learner mới, một phase vì không có YAML. Report gốc giữ nguyên; source hash8ac3f2176d39db358c20d5d47b707497f003b9da2ebfcb697bf0e534a5566a0e và HTML hash81ae7328774f0cc482fc7a758acb747af4476b94898b5c3ac7920827fccfe714 khớp gói.

| Nhận xét / giới hạn | Quyết định | Xử lý và bằng chứng tác giả |
|---|---|---|
| Giữ mạch ô/dòng→SQL→kết quả→connect/load/Refresh; đủ5câu ôn | Làm theo | Giữ nguyên source. Không có finding cần sửa đủ căn cứ; không thêm quota hình/RunFlow hoặc chấm Excel để tạo việc. |
| Source/HTML không là SQL Server/live | Làm một phần | 3 data tests và tính Python độc lập khớp10 mã/cột/tên, hai probe đổi trạng thái/phòng trả9. Bốn SQLenv thiếu, không có SQLtool; chưa kết nối/chạy engine, không gọi fixture là T-SQL pass. |
| Menu/đăng nhập/preview/load/Refresh/lưu/chia sẻ Excel chưa thao tác | Làm một phần | Tác giả đối chiếu Microsoft native query/About Power Query/Refresh/SQLconnector ngày27/10. Tài liệu không chứng minh đã chạy Excel; giữ Excel desktop thực pending, không đổi DB/quyền/secret để ép kiểm. |
| HTML/copy/CSS không thay browser/clipboard/viewport/keyboard/hoàn thành | Làm một phần | Kiểm source→HTML SQL/copy/Result30ô/Excel12ô/marks đúng; CSS tab4 có sẵn. Playwright launch thiếu Chromium binary, không tải/cài hoặc tự đổi cấu hình; tương tác vẫn chưa kiểm. |
| Link/menu trước sau và lối web mới đối chiếu HTML | Làm một phần | check-dist135trang/2030link đạt; noExercises và5câu ôn khớp footer. Chưa thao tác login/điều hướng/lưu tiến độ thật. Không sửa editor/store vì không có căn cứ regression. |
| Thời lượng30phút chưa đo thực tế | Không làm theo — giữ ước lượng | Chưa quan sát học viên; không cam kết thời lượng đã đo hoặc mọi học viên tự thao tác được. Điều chỉnh khi có dữ liệu học thực. |

Suite335tests/51files; Astro0errors/0warnings/3hints nền; build135; HTML/source đúng phiên bản. Không thay source sau review, không push/merge main/deploy. Toàn bộ giới hạn được giữ khi bàn giao, không gọi kết luận học thử là quyền xuất bản.

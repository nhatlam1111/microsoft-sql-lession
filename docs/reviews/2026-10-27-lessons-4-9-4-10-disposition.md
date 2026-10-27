# Xử lý review tích hợp bài 4.9–4.10

Đã đọc trọn report tại head f2d7b8e453b8fc51b0d496c8c0d050cb23fc3529: không có finding Critical/Important/Minor cần sửa, có D1–D11 cần kết luận riêng. Bản gốc được giữ nguyên. Reviewer tự kiểm 18 hash, Git chỉ đọc, public seed bằng tính thuần, HTML và Microsoft docs; không chạy test, SQL, Excel hoặc UI.

## Điểm giữ được

Giữ mạch 4.8 → 4.9 → 4.10, hai định nghĩa danh sách khác nhau, đường web/Excel có điều kiện rõ, năm câu ôn mỗi bài và mẫu yêu cầu dùng được. Không thêm hình, bài nộp, gateway hay parser để thay cho kiểm thực tế. Nhánh Load To đầu tiên đã được tác giả bổ sung trước integration và reviewer đọc đúng bản đó.

## D1–D11

| Mục | Quyết định | Kết luận và xử lý của tác giả |
|---|---|---|
| D1 — SQL Server/Azure SQL, nguồn hiện hành, quyền, schema/collation/metadata | Làm một phần | Public seed, query thực trong MDX, fixture subset và goldens khớp 10/2 hồ sơ. Bốn SQL env thiếu, không có SQL tool, không chạy live. Giữ engine/quyền/dữ liệu hiện hành pending; không thay secret hoặc cấu hình database. |
| D2 — Excel Windows: menu, authentication, native SQL, preview và cả hai đường load | Làm một phần | Đối chiếu tài liệu Microsoft, đã thêm fallback khi Load To mờ lần đầu ngay bước tải. Source/HTML sau sửa đúng; chưa mở Excel mục tiêu nên connect/load thực vẫn pending, không gọi tài liệu là thao tác đã chạy. |
| D3 — Refresh/cache, thay ô, kiểm lỗi, lưu/mở lại workbook | Làm một phần | Nội dung phân biệt worksheet với preview và định nghĩa đã lưu; query probes chỉ kiểm lọc dữ liệu. Refresh/lưu/mở lại trong Excel vẫn pending, không sửa dữ liệu chung để tạo demo. |
| D4 — Tự động hóa/gateway/file đóng/Excel host khác | Làm theo — giữ ngoài phạm vi | Thiết kế chốt Excel desktop Windows và Refresh thủ công. Không hứa hỗ trợ lịch chạy hoặc mọi host; mở rộng cần yêu cầu và kiểm riêng, không thêm triển khai trong lượt này. |
| D5 — Chia sẻ workbook/quyền/credentials/mạng/chứng chỉ thực | Làm một phần | Đã nói rõ dữ liệu có thể còn trong file nhưng quyền nguồn không được cấp bằng gửi file. Không tạo workbook, dùng hai tài khoản hoặc kiểm Refresh thực; giữ pending, không tự sửa quyền/bảo mật. |
| D6 — Website auth, điều hướng, hoàn thành/tiến độ/nháp SQL | Làm một phần | Diff không đổi API/editor/store/guard/draft; HTML noExercises/footer/nav và check-dist đúng. Browser launch thiếu binary, không thử đăng nhập/đánh dấu/lưu tiến độ/nháp người dùng. Chưa có căn cứ sửa runtime cũ. |
| D7 — Clipboard, details/keyboard, viewport/màu/tab thực và thời lượng | Làm một phần | HTML/payload/marks/CSS tab4 đã đối chiếu, không có browser interaction hoặc nghiên cứu học viên. Giữ UI/accessibility pending và 30/25 phút là ước lượng; không dùng snapshot/prose hoặc thêm hình để thay kiểm. |
| D8 — Tái lập suite/runtime/check/build/API sau head | Làm theo trong phạm vi tác giả | Tác giả đã chạy 338/52 trên Node24.22.1 và Node22.23.4, Astro0/0/3 hints nền, build135/dist2032 và HTML cả hai sau sửa/carry. Sau integration chỉ hồ sơ/spec/plan thay đổi; source/test/metadata/HTML vẫn khớp snapshot, không chạy lại suite không có thay đổi liên quan. Không có YAML/API mới và không nhận package cũ là live pass. |
| D9 — Fixture toàn T-SQL/guard-grade-hardening/runtime cũ | Làm theo — giữ ngoài phạm vi | Helper và runtime không đổi; các ví dụ là SELECT đơn bảng. Không hứa fixture chứng minh engine hoặc từ chối mọi cú pháp; không mở rộng parser/guard vì giả định ngoài bài. Regression cụ thể nếu có cần bằng chứng riêng. |
| D10 — Mọi báo cáo biến động, nghiệp vụ sản xuất và lịch sử | Làm theo — giữ phạm vi đã chốt | Chỉ danh sách vào mới 01/10–21/10, một dòng/MaNV; mã phòng hiện lưu không chứng minh lịch sử. Yêu cầu nghỉ việc/chuyển phòng/thuộc tính quá khứ cần định nghĩa và nguồn mới, không tự đổi seed hoặc nghĩa báo cáo. |
| D11 — Bản sau review, remote/main/push/merge/deploy | Làm theo trong phạm vi local | Giữ raw report và hash; kiểm source cuối không đổi sau review, hồ sơ bàn giao mới không thay sản phẩm. Giữ hai branch riêng, 4.9 là ancestor 4.10, hai worktree sạch; không push, merge main hoặc deploy. Review không tạo quyền xuất bản. |

Không còn nhận xét tích hợp nào chưa có quyết định. Các mục pending là phần chưa kiểm thực tế, không phải pass hoặc lỗi được suy đoán. Không cần thêm vòng reviewer để chứng nhận hồ sơ; evidence tác giả và reviewer vẫn được phân biệt trong verification/handoff.


# Kế hoạch và nhật ký nghiên cứu

Ngày: 02/11/2026, múi giờ Asia/Saigon. Phạm vi được duyệt: nghiên cứu Arcade cũ theo `temp/rea_promt.md`; chưa triển khai sản phẩm.

## Quyết định phạm vi

- CodeFights Arcade 2016–2018 là đối tượng chính; Databases Arcade được ưu tiên. CodeSignal Arcade về sau và sandbox Database hiện tại phải có nhãn phiên bản riêng.
- Chỉ thêm tài liệu trong thư mục này; artifact thô và bản nháp ở `temp/research-codefights-2026-11-02/`, không đưa code/tài nguyên độc quyền vào sản phẩm.
- Không SQL live trên database khóa học, không sửa lesson/YAML/source/config, không commit/push/deploy. Giữ nguyên các thay đổi có sẵn của người dùng.
- REA dùng cho artifact JavaScript của đối tượng nghiên cứu; source repo khóa học được kiểm bằng công cụ đọc source thông thường.

## Các vòng thực hiện

| Vòng | Công việc | Trạng thái |
|---|---|---|
| 1 | Thu nguồn lịch sử, timeline, map, điểm và hidden tests; ghi độ tin cậy | Hoàn tất khảo sát có giới hạn; U-H01–U-H18 giữ mở |
| 2 | REA trên JavaScript thu được và khảo sát sandbox SQL; tách giới hạn CDP | Hoàn tất static một chunk và Run/Submit/error sandbox hiện tại; không historical runtime |
| 3 | Inventory, luật, trạng thái, flow và wireframe | Hoàn tất tài liệu và render 7/7 sơ đồ; đã sửa theo review |
| 4 | Gap source thực tế, đề xuất MVP, kiến trúc và hợp đồng dữ liệu/API | Hoàn tất đặc tả phương án khuyến nghị; DEC-01–05 chờ duyệt cho triển khai |
| 5 | Kiểm tài liệu, kiểm repo, review độc lập, xử lý nhận xét | Hoàn tất kiểm và hai lượt review; xử lý IR-01–06, delta không finding mới |

## Quy tắc chứng cứ

Mỗi kết luận lịch sử có nguồn, phiên bản và nhãn CONFIRMED / STRONGLY SUPPORTED / INFERRED / UNKNOWN / CONFLICTING. Đề xuất mới ghi RECOMMENDATION. Chứng cứ HTML/ảnh, browser, REA tĩnh và SQL live không thay thế nhau. Không lấy thiếu kết quả tìm kiếm làm bằng chứng tính năng chưa từng tồn tại.

## Điểm xuất phát đã kiểm

- Source khóa học: commit `8de5a4f407ef4c0740ba571f108ecedfbed975b4`; có file chưa theo dõi `premium-audit.json` từ trước, không thuộc phạm vi.
- Browser đã đăng nhập mở được sandbox Database tại URL người dùng cung cấp; `/arcade/db` hiện 404. Các quan sát này không xác nhận luật Arcade lịch sử.
- REA MCP đã phản hồi; chưa có endpoint CDP được hỗ trợ cho browser tích hợp. Không đổi cấu hình hoặc chuyển cookie để nối.

## Nhật ký sửa sau review

Vòng trước review: bổ sung truy vết FR-06/FR-14 còn thiếu; hạ mốc UPV chỉ tiếp cận gián tiếp sang INFERRED; chốt 404 cho token job sai; thống nhất số scenario và privacy boundary. Lượt Astro check đầu quét các bundle nghiên cứu trong temp và OOM; đã chuyển JavaScript thô ra cache ngoài project, không sửa tsconfig, chạy lại đạt. Kết quả cuối và ma trận xử lý ở validation/review-resolution.

Vòng sửa review: làm theo toàn bộ IR-01–06; chốt cửa sổ idempotency 24 giờ và mode trong digest; retry lỗi terminal bằng hành động/key mới; hạ nghĩa node xanh về đúng điều nhìn thấy; sửa hai minh họa. Thêm AC-31/32. Nguồn bổ sung H-11/T-03 khôi phục được HTML shell Wayback 2017, chưa có logic runtime; cập nhật các báo cáo liên quan. Ma trận quyết định tại [review-resolution](review-resolution.md), report gốc không sửa.

Ngoại lệ vị trí artifact: `public-js/`, `rea-input/` và script kiểm tài liệu nằm tại `C:/Users/Lam/AppData/Local/Temp/codex-codefights-arcade-2026-11-02-01a19bfc/`; manifest/ảnh/raw REA JSON ở temp repo. Đây là thay đổi lưu trữ để giữ nguyên phạm vi kiểm kiểu source ứng dụng, không đổi artifact bytes hay lịch sử Evidence.

Chốt bàn giao: đủ 00–17, các sổ evidence/open/trace, hai receipt REA và hồ sơ review/kiểm. Kiểm link cuối đổi permalink HEAD trả404 sang file source local đã đọc, không thay source hay push. Các khoảng trống lịch sử tiếp tục mở đúng nghĩa; hoàn thành nghiên cứu không đồng nghĩa đã phục hồi mọi hành vi hoặc đã duyệt sản phẩm.

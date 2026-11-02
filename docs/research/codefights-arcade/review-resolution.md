# Xử lý review độc lập

Report gốc giữ nguyên tại [evidence/independent-review.md](evidence/independent-review.md), sao từ `temp/review/2026-11-02-codefights-research/independent-review.md`. Reviewer dùng ngữ cảnh mới, kế thừa model phiên; không SQL/API/browser account hoặc test/build. Phạm vi/hash của bản được review có trong report; source ứng dụng không đổi.

Tác giả đã đọc hết report trước khi sửa. Ma trận dưới là quyết định tác giả, không sửa kết luận gốc thành xác nhận của reviewer.

| Mục | Quyết định | Căn cứ xử lý | Kết quả sửa / kiểm |
|---|---|---|---|
| IR-01 — expiry/tombstone | Làm theo | UUID không có mốc được server xác thực không thể nhận ra sau purge | Chọn bảo đảm idempotency 24h; phút15–trước purge trả410 khi còn record, sau purge GET404/POST có thể admission mới; đồng bộ BR/14/16/AC-23 |
| IR-02 — service error terminal | Làm theo | Job terminal bất biến, replay key cũ không chạy lại | Tách mất mạng/chưa biết kết quả khỏi lỗi terminal; người học chủ động tạo job/key mới; sửa state/flow/wireframe/API và thêm AC-31 |
| IR-03 — map completed | Làm theo | Ảnh chỉ có node xanh và khóa, không legend/transition xác nhận Completed | Đổi claim sang node xanh không hiện khóa; completed state lịch sử UNKNOWN; mô hình MVP vẫn RECOMMENDATION |
| IR-04 — scope mode | Làm theo | Run/Submit cùng body có thể bị lẫn nếu chỉ digest body | Key cho một hành động; digest gồm mode/challenge/version/normalizedSQL; Run→Submit cùng key409, key mới không cần đổi SQL; thêm AC-32 |
| IR-05 — số minh họa P1 | Làm theo | Danh sách chỉ có một bài hoàn thành | W1 đổi2/4→1/4, không đổi luật đếm |
| IR-06 — C05 hai nhánh | Làm theo | Một MaPB không bằng hai mã khác nhau cùng lúc | Brief đổi thành dataset có dòng đạt ở mỗi nhánh phòng |

## Các mục giữ được và giới hạn

Reviewer đã kiểm tiền đề từng C01–C10 ở mức brief; không xác nhận statement/fixture/answer chưa được viết. Các giới hạn H-04, video, persistence, quyền SQL, precision live và UI mới tiếp tục nằm trong Open Questions. Không đổi chúng thành “đạt” chỉ vì review không có finding.

## Bổ sung sau manifest review đầu

HTTP trực tiếp lấy được CDX/HTML shell Wayback sau khi web tool thất bại; thêm H-11/T-03 và receipt lịch sử. Không có logic Arcade cũ được khôi phục: external bundle replay trả 404, CDX cho bundle timeout, REA HTML có 0 JS parsed và chưa phân tích inline body. Đồng bộ 00/01/02/03/register/open-questions để không còn câu nói Wayback hoàn toàn chưa truy cập được.

Mermaid đã render lại 7/7 bằng trang QA tạm dùng CDN chính thức, không cài dependency vào repo. [Review delta](evidence/delta-review.md) đã đối chiếu 23/23 file đúng manifest, xác nhận IR-01–06 được xử lý nhất quán và không có finding mới trong delta. Reviewer giữ riêng các giới hạn acquisition HTTP và filename exact-DB, không tự nhận đã chạy các phép kiểm của tác giả.

Kiểm link cuối phát hiện permalink HEAD khóa học trên GitHub trả404. Register đổi 20 link source R-* sang file local đã kiểm, giữ commit/manifest, không push source. Đây là sửa con trỏ nguồn, không thay kết luận kỹ thuật. Đường dẫn exact-DB tác giả dùng thực tế là `wayback-cdx-response.txt`; gói giao delta ghi nhầm tên, report gốc vẫn giữ nguyên ghi nhận đó. Kết quả kiểm cuối và giới hạn tại [validation](validation.md).

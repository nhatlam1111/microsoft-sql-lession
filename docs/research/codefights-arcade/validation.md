# Kiểm tra và review bộ nghiên cứu

Source ứng dụng đối chiếu: `8de5a4f407ef4c0740ba571f108ecedfbed975b4`. Phạm vi thay đổi: tài liệu mới trong `docs/research/codefights-arcade/`; artifact ngoài Git trong temp. File `premium-audit.json` chưa theo dõi có từ trước, không thuộc lượt này.

## Kiểm đã chạy trước review

| Kiểm | Kết quả thực tế | Giới hạn |
|---|---|---|
| Đủ báo cáo/liên kết/ID/JSON | 18 báo cáo; 152 local links, 386 evidence references; 3 JSON examples hợp lệ; không issue ở lượt trước review | Script kiểm consistency, không tự xác nhận nội dung lịch sử đúng |
| Mermaid browser | 7/7 sơ đồ render bằng Mermaid 12.2.0 trên trang QA localhost tạm | Không phải prototype SQL Arcade; chưa QA mọi renderer Markdown |
| `npm test` | 56 test files, 441 tests đạt | Test repo hiện có, không test tính năng Arcade chưa xây |
| `npm run check` | Lượt sạch: 252 files, 0 errors, 0 warnings, 3 hints | FormEvent (2) và execCommand (1) deprecated ở source có sẵn |
| `npm run build` | Đạt, 139 pages | Build ứng dụng hiện có, không chứa UI Arcade mới |
| `npm run check:dist` | Đạt, 139 pages/2.771 links | Kiểm dist theo checker hiện có |
| `npm --prefix api run typecheck` | Đạt | Không gọi SQL/API live |
| Diff source ứng dụng | `git diff --exit-code` cho src/api/database/tests/scripts/manifests/config trả 0 | Docs mới chưa commit; file untracked có sẵn không thuộc lượt |

Lượt `astro check` đầu exit 134 do heap exhaustion: tsconfig có `allowJs` và include toàn project, nên quét cả 19 MB bundle bên thứ ba mới thu trong temp. Đây là lỗi bố trí artifact của lượt nghiên cứu, không được gọi là lỗi nền ứng dụng. Đã chuyển thư mục JS và script QA ra cache ngoài project rồi chạy lại bằng nguyên lệnh/cấu hình cũ đạt; không tăng heap hay nới kiểm.

Log raw, document-check JSON, ảnh và `mermaid-render-status.json` ở `temp/research-codefights-2026-11-02/` ngoài Git. Các số kiểm tài liệu sẽ được ghi lại sau sửa review nếu file/link thay đổi.

## Phân biệt bằng chứng

- Historical: xem ảnh tĩnh và một PDF render; không xem video động.
- Browser: đã Run/Submit starter, thử lỗi MySQL, đọc menu môi trường, phục hồi starter. Không SQL Server live hoặc thành công 100%.
- REA: static parse một bundle hiện tại; partial semantics, đã export raw Evidence. Không CDP/runtime/backend.
- Repo: đọc source/test/script quyền; không truy vấn database, không gọi API khóa học, không đọc secret.
- Đặc tả MVP: chưa triển khai, chưa chạy acceptance tests của tính năng mới.

## Review độc lập và vòng sửa

[Report gốc](evidence/independent-review.md) đối chiếu 22/22 file manifest đầu, có bảng tiền đề C01–C10 và sáu finding. Reviewer kế thừa model phiên, ngữ cảnh mới, không đọc nhật ký/kết luận tác giả; không SQL/API/account, không sửa sản phẩm hoặc Git. Tác giả đã xử lý cả IR-01–06 theo [ma trận](review-resolution.md).

[Report delta](evidence/delta-review.md) kiểm 23/23 file manifest sau sửa và nguồn H-11/T-03; xác nhận sáu mục được xử lý nhất quán, không finding mới trong phạm vi delta. Đây là review tài liệu, không là xác nhận runner/API/challenge đã được triển khai. Reviewer không tự gửi lại HTTP acquisition; tên exact-DB trong gói giao bị ghi nhầm, còn payload `wayback-cdx-response.txt` được tìm và ghi giới hạn riêng. Không sửa các report gốc để xóa giới hạn đó.

## Kiểm cuối và bàn giao

- Đủ 18 báo cáo theo tên trong prompt, các sổ nguồn/câu hỏi/truy vết, hai receipt REA và hai report review giữ nguyên.
- Đã kiểm lại links/IDs/JSON trong cả hồ sơ review và render lại 7/7 sơ đồ sau sửa. Kết quả máy cuối và SHA-256 log ở [verification-results.json](evidence/verification-results.json).
- Permalink HEAD trên GitHub trả404 ở phép kiểm cuối; source links R-* đổi sang file local đã đọc, giữ commit/manifest để không coi URL chưa public là nguồn đã truy cập. Không push để sửa link.
- Source ứng dụng không đổi sau vòng kiểm app; không lặp unit/type/build chỉ vì sửa Markdown. Kiểm tài liệu/render và diff source được chạy lại sau sửa. Chưa mở/kiểm UI ứng dụng hiện có qua browser build; build/check-dist không thay bằng chứng tương tác.
- Chưa chạy database khóa học, tạo fixture/answer thật, dựng Arcade, thay hạ tầng hoặc deploy. Các AC của sản phẩm mới vẫn là test specification tương lai.
- Trang QA và HTTP server tạm chỉ dùng để render sơ đồ; được đóng khi bàn giao. Browser CodeSignal của người dùng giữ nguyên tab và starter đã phục hồi; timer/kết quả thử không được coi là đã hoàn tác.

Tiêu chí nghiên cứu được đối chiếu theo nhóm: lịch sử/nguồn/timeline (01/02), feasibility REA và limitations (03), tính năng/luật/test/điểm (04–07), UI/flow/wireframe (08–10), Databases và gap (11/12), adaptation/MVP/architecture/API/acceptance (13–17), confidence/open/trace (các sổ chung). Các câu chưa biết được ghi rõ và không thay bằng kết luận suy diễn. Hoàn tất bộ nghiên cứu không phải phê duyệt triển khai/push/deploy.

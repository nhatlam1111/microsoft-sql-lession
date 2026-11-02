# Review delta — sau sửa IR-01–IR-06

Ngày: 02/11/2026, Asia/Saigon. Reviewer tiếp tục cùng agent và model kế thừa phiên. Báo cáo này bổ sung cho `independent-review.md`, không thay hoặc sửa kết luận của bản gốc.

## Phạm vi và phiên bản

Chỉ kiểm delta của sáu nhận xét IR-01–IR-06 và nguồn mới H-11/T-03. Không review lại toàn bộ bộ nghiên cứu hoặc bảng tiền đề C01–C10.

Đã đối chiếu **23/23 file** với `post-fix-manifest.json`: không có SHA-256 lệch tại thời điểm kiểm. Source app được gói giao việc giữ ở commit `8de5a4f407ef4c0740ba571f108ecedfbed975b4`; lượt delta không gọi Git để xác nhận lại hoặc thay đổi trạng thái đó.

Công cụ thực tế: đọc/tìm file và kiểm hash bằng PowerShell; Python đọc JSON raw REA, so summary với receipt và tính hash HTML/bundle. Không chạy SQL/API/runner, không điều khiển account/browser, không chạy test/build/REA lại. Không đọc `validation.md`, `research-plan.md`, `review-resolution` hoặc report khác. Chỉ tạo file báo cáo delta này.

## Kết quả sáu nhận xét

| Nhận xét | Kết quả đối chiếu delta | Kết luận nội dung |
|---|---|---|
| IR-01 — retention/idempotency | BR-10 và đoạn sau bảng ở `06-business-rules.md:31,41`; `14-technical-architecture.md:51–53`; `16-data-and-api-design.md:31,47`; AC-23 ở `17-acceptance-tests.md:32` cùng ghi token 15 phút, record/tombstone 24 giờ, 410 khi hết hạn nhưng còn record, GET 404 sau purge và POST reuse key có thể là admission mới. `07-testing-and-scoring.md:15` đã giới hạn retry theo thời hạn hợp đồng. | **Đã xử lý.** Không còn hứa nhận diện key cũ vô hạn sau khi xóa dấu của nó. AC-23 đã có phút 16, giờ 23 và giờ 25; việc UI dừng auto retry được ghi rõ. |
| IR-02 — retry terminal service error | `04-state-machines.md:63,77–78`, `09-user-flows.md:36,53–57`, P3 tại `10-wireframes.md:77–79`, `14-technical-architecture.md:55`, `16-data-and-api-design.md:49,53` tách kết quả chưa biết do mạng khỏi lỗi terminal đã biết. FR-08 tại `15-functional-specification.md:16` và AC-31 tại `17-acceptance-tests.md:34` khớp cách xử lý. | **Đã xử lý.** Poll/replay không mở lại terminal; nút Thử lại chủ động tạo job/key mới. Không có yêu cầu auto submit lặp để phục hồi. |
| IR-03 — node xanh chưa chứng minh hoàn thành | `evidence-register.md:21` chỉ xác nhận màu xanh/không hiện khóa; completed/đang chọn/khả dụng chưa xác minh. `04-state-machines.md:9`, F-16 tại `05-feature-inventory.md:29` và H1 tại `10-wireframes.md:9` đã dùng cùng phạm vi. | **Đã xử lý.** Trong các vùng liên quan không còn gán `CONFIRMED` cho node đã hoàn thành chỉ từ ảnh H-03-M. Trạng thái Completed của MVP vẫn là thiết kế mới. |
| IR-04 — mode trong idempotency digest | `14-technical-architecture.md:51` định nghĩa lookup theo code scope + key; digest canonical chứa mode/challenge/version/SQL, chỉ chuẩn hóa newline. `16-data-and-api-design.md:47` xác định mode từ route, cùng UUID Run→Submit là 409; BR-10 và AC-32 tại `17-acceptance-tests.md:35` khớp. Traceability dòng 18 đã dẫn AC-31/32. | **Đã xử lý.** Key thuộc một hành động trên snapshot; Submit SQL không đổi vẫn dùng UUID mới. Không còn khả năng diễn giải hợp đồng là trả lại job chỉ visible cho hành động Submit hợp lệ. |
| IR-05 — P1 đếm completion | `10-wireframes.md:31,36–39` hiện W1=1/4, C01 hoàn thành, C02 đang làm, C03/C04 khóa. | **Đã xử lý.** Con số và danh sách minh họa khớp nhau. |
| IR-06 — C05 mỗi nhánh phòng | `13-sql-arcade-proposal.md:31` ghi “có dòng đạt ở mỗi nhánh phòng”. | **Đã xử lý.** Đã rõ đây là dataset có dòng thuộc mỗi nhóm; không ngụ ý một dòng có mã bằng hai giá trị khác nhau. |

Không phát hiện finding mới cần sửa trong delta được giao. Đây là kết luận về tính nhất quán của tài liệu đã sửa, không phải xác nhận API, runner hoặc AC đã chạy.

## Nguồn mới H-11/T-03

Đã đọc HTML từ đường dẫn cache được giao. File dài **3.552 byte**, SHA-256:

`1d4aa901fce9339c270165d4ca9d3cf292a666ee6cbfa472eef4bdeb3b027634`.

Nội dung có title CodeFights, một inline runtime-config body và external bundle `b204e24bbb952f7c72440e0bab935da56969234b.js?meteor_js_resource=true`; body không chứa nội dung map/challenge đã render. Không thực thi HTML hoặc JavaScript. Mô tả “HTML shell” tại `03-technical-observation.md:35` và H-11 tại `evidence-register.md:32` phù hợp phần đã đọc. URL nguồn và timestamp được giữ ở [snapshot Intro](https://web.archive.org/web/20170624125417id_/https://codefights.com/arcade/intro).

Đã parse `wayback-cdx-arcade-response.txt`: có header và **8 record**; record Intro có timestamp `20170624125417` và URL gốc đúng với snapshot. Bộ tài liệu nói rõ đây là kết quả truy vấn prefix cụ thể, có filter/collapse/limit, không tuyên bố chỉ tồn tại tám capture toàn bộ lịch sử.

Đã đối chiếu raw `rea-with-historical-evidence-bundle.json` với `historical-rea-receipt.json`:

- Raw bundle SHA-256: `5602ee5a0f1964d9507e300dc8e26dba330de9364ba332c81baf02f5642709ef`.
- Parent `ev_fbf46be95e4ab8fa2dd76cfc4448a155368504185e92db2ef2144920b73bd824` có operation `analyze_javascript_application`.
- Summary `ev_33256a595c6cf112e8ebb28a939cd7ad88ddaac7c46d65b9815ef20fe49df96c` có operation `inspect_analysis_view`; trường summary raw **bằng đúng** `normalized_summary` của receipt.
- Số liệu khớp: một relevant file, 3.552 byte đọc, **0 JavaScript parsed, 0 module, 0 visited AST nodes**, 3 findings; application graph `partial`, semantic `unknown`.
- Raw giữ nguyên limitation rằng một inline JavaScript body bắt đầu dòng 39 chưa được phân tích; không được hiểu absence trong Evidence là không có endpoint/storage/import trong body đó.

`00-executive-summary.md:17`, timeline và giới hạn tại `01-historical-research.md:18,96`, catalog tại `02-source-catalog.md:19,54–55,77`, quan sát tại `03-technical-observation.md:35–39`, H-11/T-03 trong register và U-T01/U-T03 trong open questions đều giữ được ranh giới trên. Không thấy nguồn mới được dùng để khẳng định runtime, luật mở khóa, comparator, backend hoặc logic JavaScript Arcade đã phục hồi. Lỗi replay bundle/CDX timeout cũng được giới hạn ở các yêu cầu cụ thể, không bị nâng thành kết luận archive không có script ở nơi khác.

## Những phần chưa xác minh trong delta

1. Không tự gửi lại HTTP Wayback/CDX. Đã kiểm payload và raw artifact được giao; không xác nhận độc lập header/status HTTP 200, replay bundle 404 hay thời gian timeout 15 giây. Đây vẫn là tường trình acquisition của tác giả.
2. Tên file exact-DB trong gói giao việc không có tại đường dẫn tôi thử. Tìm file thấy `wayback-cdx-response.txt`, nội dung `[]`; chỉ từ file này không tự xác nhận được query/URL nào đã tạo response. Vì vậy kết quả exact `/arcade/db` được giữ là observation của tác giả, không phải phép kiểm HTTP của reviewer. Tài liệu hiện cũng không suy từ mảng rỗng thành archive trống.
3. Không phân tích từng semantic finding hoặc chạy REA bằng công cụ khác. Việc summary khớp receipt chỉ xác nhận provenance/nội dung record được giao, không biến inventory HTML thành phân tích logic hay browser capture.
4. AC-23/31/32 mới là kịch bản cần chạy sau triển khai. Không có kiểm live về hết hạn, purge, mode conflict hoặc retry terminal trong lượt delta.
5. Phạm vi không bao gồm thay đổi ngoài manifest/vùng sửa đã giao, hoặc toàn bộ source/build app. Bảng tiền đề và các giới hạn chưa xác minh của report gốc tiếp tục giữ hiệu lực.

Không có phê duyệt triển khai, push hoặc deploy từ báo cáo này.

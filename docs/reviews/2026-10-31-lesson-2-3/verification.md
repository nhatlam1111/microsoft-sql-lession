# Hồ sơ kiểm bài 2.3 theo mạch 2.1–2.2

## Phạm vi và phiên bản

Sửa riêng MDX bài 2.3, `tests/content-2-3.test.ts` và gỡ bài khỏi danh sách chờ trong `tests/content.test.ts`; giữ bài 2.2 và các thay đổi của lượt trước. Không đổi YAML, seed, API, component hoặc bài khác. Base `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`, working tree `feat/lesson-2-1-excel-first`, không commit/push/deploy.

Build vòng 1: **15:41:21 ngày 31/10/2026 +07:00**. Manifest đầy đủ ba bài và YAML: `temp/verification/2026-10-31-lesson-2-3/source-build-manifest.json`.

- MDX 2.3 SHA256 `5f76307a16604f5fdd87a340aa1c1740979d8c423260bf3cce94c8f3d24115c3`.
- YAML SHA256 `8695c1a88f35884718bc992cd2527913fb752f54a5406fa1d0eee984c7ff8191`.
- HTML SHA256 `e61adaa30fdf265cba6f5ccd9712acd6399f3df51af85a040bd51a29c3310211`.

## Nội dung gộp/rút và phần để bài sau

Phần chính có hai tiểu mục: Excel → một câu SQL → LineMap; RunFlow → Result → trả lời. Bỏ hai khối trích điều kiện cũ, bảng ví dụ LIKE rời tình huống, câu SELECT/Result tìm họ tên riêng; giữ OR/ngoặc bằng biến thể cùng điều kiện phòng/ngày. LIKE dùng chính Nguyễn Thu Hà của tình huống, đủ %/_, cách tìm mọi vị trí và quy tắc so chữ để làm hai đề cuối. Không chép đáp án đầy đủ, không dùng ôn để dạy bù.

Giữ hai mã KD/IT, thời gian nửa đầu năm 2023, bốn cột, không tự lọc trạng thái hoặc dựng phòng lịch sử. Giữ bốn bài tập và ba tự kiểm tra. Sắp xếp, NULL, collation chi tiết, mốc cuối với cột có giờ để bài 2.4/2.5/2.7/2.8. Thời lượng 25 → 20 phút là ước tính biên tập, chưa đo học viên thật.

Áp dụng teach vào tiền đề/giảm tải, Superpowers vào thiết kế/kế hoạch/kiểm và review; theo giới hạn repo không tạo learning-workspace, HTML riêng, hồ sơ học cá nhân hoặc gọi các teach-skills khác.

## Bằng chứng tác giả, tách khỏi review học thử

Log nằm trong `temp/verification/2026-10-31-lesson-2-3/`.

| Kiểm | Kết quả thực tế | Log |
|---|---|---|
| RED trước sửa MDX | Hai test chặn bố cục bốn tiểu mục cũ | content-red.log |
| Test nội dung sau sửa | 68/68 đạt | content-green.log |
| Toàn bộ test | 48 file, 329/329 đạt | tests.log |
| Astro check | 0 errors, 0 warnings, 3 hints deprecated sẵn có | check.log |
| API build | 76 bài tập | api-build.log |
| check:exercises | 76 bài, exit 0; riêng 2.3 lần lượt 21/6/22/2 dòng | exercises.log |
| check:data sau runner | Không bảng nào lệch | data.log |
| Build | 129 trang | build.log |
| check:dist | 129 trang/1951 link đạt, không lộ đáp án | dist.log |
| SQL live | 17 bản ghi SELECT-only; query 48/2/2 và mọi preview; OR đúng/thiếu ngoặc, AND sai, IN sai, khoảng đảo/hai đầu, LIKE/_/%/Unicode/so hoa thường/dấu | sql-live.log, sql-live-final.log, sql-results.json, verify-live.mjs |
| Browser | CUA IAB; 1280×800, 1024×720, Excel/drawer/highlight/copy-paste/tab4 và ba details | browser-checks.json |

MCP azure-sql không có trong phiên nên script dùng mssql/kết nối local hiện có, chỉ SELECT và không in credential. Câu ghi của bộ check:exercises đi qua runner rollback; check:data chạy sau đó. Không chạy SQL từ browser/SSMS. Ba hint liên quan FormEvent ở ExerciseWorkspace và execCommand ở SqlEditor đã có trước, không sửa ngoài phạm vi.

Browser đã khôi phục nháp và clipboard sau thử dán, đóng tab bài tập tạm, reset viewport; không lưu screenshot ra đĩa. Chưa kiểm SSMS thật, luồng nhập mã/xác thực hoặc chạy/nộp SQL trên web, chưa đo thời lượng người học thật. CASE hai cấp chỉ kiểm định dạng DOM trên bài 2.9 cùng build, không sửa nội dung bài đó.

## Nguồn kỹ thuật

- [Microsoft Learn — Operator precedence](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/operator-precedence-transact-sql).
- [Microsoft Learn — OR](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/or-transact-sql).
- [Microsoft Learn — LIKE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql).

Đối chiếu tài liệu chính thức và SQL live là việc của tác giả; reviewer không dùng kiến thức/tài liệu ngoài khóa học bù tiền đề.

## Review và quyết định

[Report độc lập bài 2.3](review.md) đã hoàn tất bằng agent mới, ngữ cảnh mới, model kế thừa phiên. Reviewer xác minh đủ bảy hash và đọc cả ba drawer tĩnh/HTML/CSS; tự xác định cách làm bốn đề trước khi mở answer, không phát hiện finding yêu cầu sửa có căn cứ. Không sửa report gốc hoặc biến đánh giá học thử thành xác nhận SQL/UI.

| Nhận xét/kết luận | Quyết định tác giả | Căn cứ và xử lý |
|---|---|---|
| Không có finding yêu cầu sửa; đủ tiền đề bốn đề | **Giữ nội dung** | Giữ phạm vi, query, khung hai tiểu mục và các lời giảng trước ôn. Không thêm khối hoặc câu chữ chỉ để có finding. |
| Ranh span/mark trong textContent có thể nối chữ | **Đã xác minh, không sửa sản phẩm** | Reviewer tự đọc CSS: query dùng grid, dim/focus là block. Tác giả quan sát drawer và đọc visible innerText thấy các dòng tách đúng; pre/mark tab-size 4. Không lấy textContent nối khối làm lỗi render. |
| SQL/bộ chấm/UI chưa được reviewer kiểm | **Giữ nguyên giới hạn; tác giả kiểm riêng** | SQL SELECT-only, runner/check:data và UI có log riêng trong bảng trên. Không báo reviewer đã chạy chúng, không suy copy/paste thành nộp/chấm trên web hoặc SSMS. |

[Review tích hợp mạch 2.1–2.3](integration.md) hoàn tất bằng agent mới, ngữ cảnh mới/model kế thừa. Không có finding cần sửa MDX/test, không thấy thiếu tiền đề ở 11 đề. Reviewer tự đối chiếu đủ bảy hash và đọc nguồn/HTML; các log/UI/SQL của tác giả được ghi là evidence tác giả, không phải phép kiểm của reviewer.

Bản HTML 2.1/2.2 đã được dựng lại trong build hiện tại và có hash riêng trong manifest; không gọi bằng chứng UI của build cũ ở lượt 2.2 là UI mới của cả ba bài. Lượt này kiểm tương tác trực tiếp 2.3, đọc tĩnh mạch trước đó và đối chiếu evidence được giao.

### Quyết định cho các mục tích hợp cần tác giả kết luận

| Mục trong report tích hợp | Quyết định | Căn cứ/phạm vi cuối |
|---|---|---|
| Phạm vi bộ chấm theo kết quả bộ mẫu, tên cột/metadata kiểu không là điều kiện riêng | **Làm theo** | Giữ bộ chấm hiện tại và lời tự đối chiếu tiêu đề ở 2.1. Không diễn giải “cách viết tương đương” thành chứng minh cùng ngữ nghĩa trên mọi dữ liệu. Siết tên/kiểu hoặc thay đặc tả chấm nằm ngoài lượt cập nhật nội dung, không sửa API. |
| Chưa thử xác thực, Chạy/Nộp, SSMS và lưu tiến độ thật | **Làm theo** | Giữ các giới hạn khi bàn giao. 76 answer chạy qua runner chứng minh các câu đó chạy trên bộ mẫu trong luồng rollback; không chứng minh luồng người học đầu cuối. Không lấy dán SQL làm bằng chứng đã chạy/nộp. |
| TextContent nối ranh giới khối query | **Làm theo** | Không sửa renderer: CSS tĩnh chia khối, tác giả kiểm visible innerText/screenshot và tab-size 4. Tách cấu trúc HTML/CSS của reviewer khỏi thao tác UI tác giả. |
| Editor/nháp, rollback, seed/API/ID không đổi | **Làm theo** | Không mở thêm đợt sửa/tổng kiểm công cụ; không có thay đổi mới cần di trú nháp. Chưa thử undo/khôi phục nháp người học giữa phiên; thao tác thử dán đã hoàn trả giá trị trước đó. |
| 15/15/20 phút và viewport khác | **Làm theo** | Giữ nhãn thời lượng là ước tính, chưa đo học viên thật. UI 2.3 chỉ kiểm hai viewport desktop đã ghi, không khẳng định mọi thiết bị. |
| Cập nhật trạng thái hồ sơ sau review | **Làm theo** | Lưu nguyên report từng bài và tích hợp, cập nhật spec/plan/matrix sang hoàn tất. Không biến report thành quyền commit/push/deploy. |

## Trạng thái bàn giao

Hoàn tất nội dung, test và hai vòng review; không có sửa sản phẩm sau bản source/build đã kiểm và giao reviewer. Vì không đổi MDX/test/YAML/API sau review, không lặp các bộ kiểm đã đạt chỉ để có log mới. Manifest vẫn khớp file hiện tại; `git diff --check` đạt. Bài 2.2 giữ nguyên SHA256 `1c4261fac141161ab0fb0b452b0f985054d4b91c4b0e502471dceb3acd73af5f` từ lượt trước. Không cập nhật hồ sơ công ty vì tình huống/sự việc 2.3 không đổi.

Đã đóng tab kiểm thử và dừng preview server do tác giả mở. Không commit/push/deploy.

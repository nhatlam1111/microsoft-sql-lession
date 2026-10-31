# Hồ sơ kiểm bài 2.4 theo mạch mới

## Phạm vi và phiên bản

Sửa MDX 2.4, `tests/content-2-4.test.ts`, gỡ 2.4 khỏi danh sách chờ trong `tests/content.test.ts`. Giữ nguyên thay đổi 2.2/2.3 và hồ sơ các lượt trước. Không đổi YAML, seed, API/editor/component. Base `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`, working tree `feat/lesson-2-1-excel-first`, chưa commit/push/deploy.

Build **16:06:18 ngày 31/10/2026 +07:00**, manifest `temp/verification/2026-10-31-lesson-2-4/source-build-manifest.json`:

- MDX SHA256 `4fa7363b1b4a13520c7e01a43f555febe3aee4a844e51c88370745081f16e6d2`.
- YAML SHA256 `418dd1377a870c6cda8acf4494c85751542e52bd05a36c626d63aafefe029e38`.
- HTML SHA256 `8c67494e14783553b6b431495566c4d72ee292fbf76759b15a334abcc338b0b6`.

## Nội dung gộp/rút

Phần chính hai tiểu mục: Excel → một Sql → LineMap; RunFlow → Result → trả lời. Hình Excel trích đúng bốn cột/năm hồ sơ đầu của tình huống, thay hình sắp theo phòng khác yêu cầu. Bỏ câu sắp phòng trước ngày và ví dụ giả A02/A03; giữ lời giải thích có điều kiện khi ngày trùng, hướng riêng từng cột, mặc định ASC, alias, TOP tối đa/trên toàn tập sau lọc và thứ tự logic.

Giữ năm bước 48/45/45/45/5, mọi câu SQL/focus/columns/rows/totals/preview không đổi sau rút định dạng mảng (script rewrite có assert đối chiếu trước/sau). Bước TOP thêm lời chốt danh sách chị Hạnh cần. Ba bài tập và tính ordered giữ nguyên; không thêm quiz cho đủ khối. Thời lượng 20 phút vẫn là ước tính, chưa đo học viên thật. Giữ chi tiết NULL/so chữ/tối ưu cho các bài sau.

Tiếp tục teach/Superpowers trong giới hạn repo; không tạo learning-workspace, HTML hoặc hồ sơ học cá nhân. Không cập nhật hồ sơ công ty vì tình huống không đổi.

## Bằng chứng tác giả

Log ở `temp/verification/2026-10-31-lesson-2-4/`.

| Kiểm | Kết quả thực tế | File |
|---|---|---|
| RED trước sửa | Hai test chặn bốn tiểu mục cũ | content-red.log |
| Test nội dung sau sửa | 67/67 đạt | content-green.log |
| Toàn bộ test | 48 file, 330/330 đạt | tests.log |
| Astro check | 0 errors/0 warnings; 3 hints deprecated sẵn có | check.log |
| API build | 76 bài tập | api-build.log |
| check:exercises | Exit 0; 2.4 lần lượt 12/3/4 dòng | exercises.log |
| check:data sau runner | Không bảng nào lệch | data.log |
| Build/check:dist | 129 trang/1951 liên kết đạt, không lộ đáp án | build.log, dist.log |
| SQL live | 13 bản ghi bằng chứng từ SELECT: năm bước/mọi dòng trích/thứ tự 10/5 dòng, Result/Excel, alias, ASC mặc định, cap-only và ít hơn năm dòng, khóa MaNV, quan sát nhóm ngày trùng | sql-live.log, sql-live-final.log, sql-results.json, verify-live.mjs |
| UI build | CUA IAB, 1280×800/1024×720, năm drawer/highlight/copy-paste/tab4 và hình Excel | browser-checks.json |

MCP azure-sql không có trong phiên; dùng mssql/kết nối local hiện có, chỉ SELECT, không in credential. Toàn bộ câu ghi của check:exercises đi qua runner rollback; check:data thực hiện sau đó. Không chạy/nộp SQL từ browser hoặc SSMS. Bộ kiểm answer/runner không chứng minh đã thử luồng người học đầu cuối hoặc tương đương ngữ nghĩa trên mọi dữ liệu.

Trong 45 hồ sơ đang làm hiện tại không có nhóm trùng NgayVaoLam. Không gọi trường hợp giả thành dữ liệu thật hoặc tuyên bố bộ mẫu đã kiểm chọn người ở ranh giới nhóm trùng ngày. Lời giảng điều kiện cùng ngày dựa vào tiêu chí ORDER BY và MaNV được khai báo khóa chính; đã kiểm metadata khóa, hướng mặc định và thứ tự thật.

Ba hint sẵn có thuộc FormEvent trong ExerciseWorkspace và execCommand trong SqlEditor; không có lỗi nền test. Browser giữ nháp/clipboard trước thử dán và đã hoàn trả, đóng tab bài tập, reset viewport. Không lưu screenshot ra đĩa; ảnh chỉ quan sát qua tool. CASE hai cấp đối chiếu DOM của bài 2.9 trên cùng build, không sửa bài đó. Chưa kiểm SSMS thật, xác thực/Chạy/Nộp/lưu tiến độ web hoặc thời lượng học thật.

## Nguồn kỹ thuật

- [Microsoft Learn — SELECT, thứ tự logic và alias](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql).
- [Microsoft Learn — ORDER BY](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql).
- [Microsoft Learn — TOP](https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql).

Đối chiếu tài liệu chính thức và SQL live là phép kiểm tác giả, không phải reviewer dùng kiến thức ngoài khóa học để bù tiền đề.

## Review và quyết định

[Report độc lập 2.4](review.md) hoàn tất bằng agent mới/ngữ cảnh mới/model kế thừa. Reviewer tự tính cả ba hash, đọc đủ năm drawer/HTML/CSS và xác định cách làm ba đề trước khi đọc answer. Không có finding cần sửa/làm rõ/cắt/biên tập; kiến thức cần dùng đã được giảng. Giữ nguyên report gốc, không biến nhận định học thử thành xác nhận SQL/UI.

| Nhận xét/kết luận | Quyết định tác giả | Căn cứ/phạm vi |
|---|---|---|
| Nội dung giữ được, ba đề đủ tiền đề | **Làm theo — giữ nội dung** | Không thêm quiz hoặc ví dụ phụ. Giữ một câu chính, năm bước và các bảo vệ ordered/số liệu; không sửa thêm sản phẩm sau bản đã kiểm. |
| SQL/schema/khóa/số liệu chưa được reviewer chạy | **Làm theo — giữ giới hạn và kiểm tác giả riêng** | Tác giả có 13 record từ SELECT, kiểm metadata khóa và mọi preview/thứ tự/cap. Dữ liệu hiện không có nhóm ngày trùng; không nói đã thử chọn ở ranh giới nhóm trùng ngày live. |
| HTML/CSS không chứng minh drawer/copy-paste/ordered grader hoạt động | **Làm theo — tách lớp bằng chứng** | Tác giả đã thử năm drawer, copy/dán vào editor, tab4 và hai viewport; runner chạy 76 answer và test so thứ tự. Chưa thử xác thực/Chạy/Nộp/lưu tiến độ web hoặc SSMS thật; không coi dán SQL là đã nộp/chấm. |
| Thời lượng 20 phút và đường thực hành đọc tĩnh | **Làm theo — giữ phạm vi đã ghi** | Thời lượng chưa đo học viên thật. Giới thiệu và trợ giúp nguồn nối web có mã/SQL Server riêng; chưa kiểm luồng đăng nhập. Không mở đợt sửa API/editor ngoài phạm vi. |

Lượt trước đã có review tích hợp 2.1–2.3; lượt này một bài kế tiếp và không sửa công cụ, không lặp toàn bộ vòng đó. Reviewer 2.4 vẫn đọc mạch trước để kiểm tiền đề.

## Trạng thái bàn giao

Hoàn tất nội dung, kiểm và review. MDX/YAML/HTML không đổi sau phiên bản manifest đã kiểm; không lặp bộ kiểm đã đạt khi không có sửa mới. `git diff --check` đạt; bài 2.2/2.3 giữ nguyên hash từ lượt trước. Đã đóng tab kiểm thử, hoàn trả nháp/clipboard, reset viewport và dừng preview do tác giả mở. Không commit/push/deploy.

## Yêu cầu xuất bản sau bàn giao

Ngày 31/10/2026, người làm khóa học đã yêu cầu merge main và push. Trạng thái không commit/push ở trên thuộc lượt soạn trước yêu cầu này. [Hồ sơ tích hợp và kiểm trước xuất bản](../2026-10-31-publish-2-2-2-4/verification.md) ghi quyền mới, commit/merge và kiểm trên main; report gốc vẫn giữ nguyên.

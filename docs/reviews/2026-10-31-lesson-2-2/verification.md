# Kiểm bài 2.2 theo khung ngày 31/10/2026

## Phạm vi và phiên bản

- Bài sửa: `src/content/lessons/2-2-where-loc-nhu-autofilter.mdx`; đối chiếu bài 2.1 hiện hành.
- Base: `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`; thay đổi chưa commit trong checkout `feat/lesson-2-1-excel-first`.
- Build lần đầu ngày 31/10/2026 lúc 15:24:49 +07:00. Manifest: `temp/verification/2026-10-31-lesson-2-2/source-build-manifest.json`.
- MDX SHA256: `F5AE57B44008AF1EC062CC6D0CDD4AF2A3C06F52DC0C09F094DCD97584C6332B`.
- HTML SHA256: `114CF8CA907BBD627A7CDF6E829570C7E818930AF13007DFF2D637C1CA96AA77`.

## Thay đổi

Gộp phần chính từ bốn xuống hai tiểu mục: Excel → một câu SQL → LineMap; RunFlow → kết quả → trả lời chị Hạnh. Bỏ các truy vấn minh họa khác trên PhongBan/HopDong, bảng sáu phép so sánh và hai lỗi ngoài câu chính. Giữ lời giảng Unicode/ngày cần cho ba đề trước phần ôn; không đổi tình huống, YAML, API, seed hay component. Thời lượng 20 → 15 phút là ước tính biên tập, chưa đo thời gian của học viên thật.

Gỡ bài khỏi danh sách chờ hai tiểu mục; cập nhật test cũ khóa nội dung ngoài phạm vi và bổ sung kiểm số dòng/cột/NV020. Không nới bảo vệ dữ liệu hoặc đáp án.

## Kiểm của tác giả

| Kiểm | Kết quả thực tế | Bằng chứng trong temp/verification/2026-10-31-lesson-2-2 |
|---|---|---|
| Test RED trước sửa MDX | Test chặn bốn tiểu mục và tiền đề cần giữ | content-red.log |
| Toàn bộ Vitest | 48 file, 328/328 test đạt | tests.log |
| Astro check | Exit 0; 0 errors, 0 warnings, 3 hints deprecated | check.log |
| API build | 76 bài tập | api-build.log |
| API check:exercises | Exit 0, đủ 76; riêng 2.2 lần lượt 7/3/2 dòng | exercises.log |
| API check:data sau runner | Không bảng nào lệch | data.log |
| Astro build | 129 trang | build.log |
| check:dist | 129 trang, 1951 liên kết; không lộ đáp án | dist.log |
| SQL live | 9 bản ghi SELECT-only: FROM 48, WHERE 14, SELECT 14; 13 đang làm/NV020 đã nghỉ; preview từng bước/kết quả; điều kiện sai 0 dòng, Unicode, mốc ngày; lỗi 207 đúng nguyên văn | sql-live.log, sql-live-final.log, sql-results.json, verify-live.ts |
| Browser build | CUA IAB, 1280×800 và 1024×720; hình Excel, ba drawer, đánh dấu, sao chép chính/drawer, dán vào editor, tab 4 cột | browser-checks.json |

SQL không có công cụ MCP azure-sql trong phiên này nên dùng localConfig hiện có bằng mssql và chỉ SELECT; không in credential. `check:exercises` có câu ghi qua runner luôn rollback; `check:data` chạy sau cùng xác nhận dữ liệu. Không chạy SQL từ browser hoặc SSMS.

Ba hint sẵn có thuộc `ExerciseWorkspace.tsx` (FormEvent) và `SqlEditor.tsx` (execCommand); không có lỗi nền test. Lỗi import dotenv trong script kiểm tạm được sửa và chạy lại check đạt. Script viết nội dung tạm từng lỗi cú pháp trước khi ghi sản phẩm, đã sửa; kết quả kiểm cuối đọc từ log thành công, không dùng lần lỗi làm bằng chứng đạt.

Browser ban đầu có viewport 695px, dưới giao diện desktop của khóa học; dùng override desktop để kiểm và đã reset. Đã khôi phục nháp editor và clipboard sau copy/paste, đóng tab bài tập tạm. Không lưu screenshot ra đĩa; ảnh chỉ quan sát qua tool. CASE hai cấp được đối chiếu DOM trên bài 2.9 cùng build, không sửa bài đó. Chưa kiểm SSMS thật, xác thực/chạy SQL trên web hoặc đo thời lượng học thật.

## Nguồn kỹ thuật đã đối chiếu

- [Microsoft Learn: Constants — Unicode](https://learn.microsoft.com/en-us/sql/t-sql/data-types/constants-transact-sql).
- [Microsoft Learn: Write International Transact-SQL Statements — ngày dạng yyyymmdd](https://learn.microsoft.com/en-us/sql/relational-databases/collations/write-international-transact-sql-statements).
- Source/db live là hai lớp kiểm riêng; reviewer học thử không được giao chạy SQL.

## Review độc lập

Agent Codex mới, ngữ cảnh mới, kế thừa model của phiên; chỉ đọc nguồn/HTML và ghi report riêng. [Report gốc](review.md) được lưu nguyên vẹn; reviewer không phát hiện thiếu tiền đề chặn ba đề. Có một finding C1 mức thấp và đã được xử lý, cùng reviewer [kiểm lại riêng C1](recheck.md), không review từ đầu.

| Nhận xét | Quyết định | Căn cứ và kết quả |
|---|---|---|
| C1: vế cuối dòng 56 lặp Hay nhầm 3 | **Làm theo** | Cắt vế “có cột TrangThai…” khỏi phần chính, giữ nguyên lỗi/hậu quả ở Hay nhầm 3. Không thêm lời thay thế, không đổi SQL/YAML/số liệu. Reviewer xác nhận nguồn/HTML cuối đã xử lý đúng. |
| Các mục Giữ được và giới hạn chưa xác minh của reviewer | **Giữ nguyên; kiểm kỹ thuật riêng** | Giữ phạm vi KD, các tiền đề, hình/drawer và ba bài tập. Tác giả kiểm SQL/UI riêng như bảng bằng chứng; không đổi report để biến nhận định học thử thành xác nhận kỹ thuật. |

## Kiểm cuối sau C1

Build cuối lúc **15:32:24 ngày 31/10/2026 +07:00**. Manifest cuối: `temp/verification/2026-10-31-lesson-2-2/source-build-final-manifest.json`.

- MDX SHA256: `1C4261FAC141161AB0FB0B452B0F985054D4B91C4B0E502471DCEB3ACD73AF5F`.
- HTML SHA256: `AF0541FF124BAFB886AC911BEE0F8C0B7D285C5E9FDFB90B51BD0E59A4D9479E`.
- YAML giữ hash `EA6D87C86445A15FED27DDEC81609F5AE41ADC81DE92B81C62D588FB40578BE0`.
- Chạy lại `npm test`: 328/328 đạt; `npm run check`: 0 errors/0 warnings/3 hints; build và check:dist: 129 trang/1951 liên kết đạt. Log mang hậu tố `-final`.
- Chạy lại API build, check:exercises (76 bài, ba đề 2.2 là 7/3/2 dòng) và check:data: exit 0, không bảng nào lệch. Log `api-build-final.log`, `exercises-final.log`, `data-final.log`.
- Tác giả reload trang build cuối qua browser: đúng hai tiêu đề, vế lặp đã bỏ, Hay nhầm 3 còn nguyên. SQL và các component không đổi sau kiểm tương tác lần đầu; không lặp lại kiểm SSMS hay SQL trên web và không báo đã kiểm chúng.

Không có lỗi nền test; ba hint deprecated còn như cũ. Không đổi source bài khác, YAML, API, dữ liệu hoặc component; không tạo learning-workspace/HTML riêng. Không commit, push hoặc deploy. Review tích hợp nhiều bài/công cụ không áp dụng vì lượt này chỉ sửa bài 2.2 và test nội dung liên quan.

## Yêu cầu xuất bản sau bàn giao

Ngày 31/10/2026, người làm khóa học đã yêu cầu merge main và push. Trạng thái không commit/push ở trên thuộc lượt soạn trước yêu cầu này. [Hồ sơ tích hợp và kiểm trước xuất bản](../2026-10-31-publish-2-2-2-4/verification.md) ghi quyền mới, commit/merge và kiểm trên main; report gốc vẫn giữ nguyên.

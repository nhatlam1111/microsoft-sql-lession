# Bàn giao bài 2.2 — WHERE lọc như AutoFilter

## Phạm vi và quyết định

- [Bài 2.2](../../src/content/lessons/2-2-where-loc-nhu-autofilter.mdx) giúp người học biết Excel cơ bản tự viết một điều kiện theo mã phòng, trạng thái hoặc mốc ngày và giải thích dòng được giữ. Tình huống đối chiếu phòng `KD` cùng [ba đề và đáp án](../../src/content/exercises/2-2-where-loc-nhu-autofilter.yaml) giữ nguyên.
- Phải hiểu để làm bài gồm cách đặt và đọc `WHERE`, tên cột nguồn và giá trị trong nháy đơn, chọn cột theo thứ tự đề yêu cầu, tiền tố `N` cho chữ có dấu và mốc `yyyymmdd` với `>=`. Bài 2.1 cung cấp `SELECT`, `FROM`, thứ tự cột và bí danh. Bài 1.3 cung cấp Unicode, kiểu ngày và chuyển kiểu ngầm.
- Phần hiện trên trang giải thích cấu trúc trước câu đầy đủ, lần từ `NV001` bị loại và `NV020` được giữ tới bảng kết quả. Drawer chứa chi tiết từng bước. Thứ tự logic, bí danh và thứ tự dòng ở mức nhận biết. Các biến thể trạng thái và ngày nằm trong mục Vận dụng hiển thị trên trang. Lọc nhiều điều kiện, sắp xếp, `NULL` và so chữ dẫn tới bài riêng.

| Đề | Tiền đề dùng để tự làm |
|---|---|
| 2.2.1 | Bài 2.1 dạy liệt kê cột đầu ra theo thứ tự. Khuôn và lời giải thích ở 2.2 dạy đặt `WHERE` sau nguồn, lấy mã cần so từ đề và đặt trong nháy đơn. |
| 2.2.2 | Vận dụng dạy thay điều kiện bằng so sánh `TrangThai` với chuỗi Unicode. Cột `NgayNghiViec` cần lấy theo đề, còn điều kiện chọn hồ sơ xét trạng thái. |
| 2.2.3 | Vận dụng dạy chuyển yêu cầu từ ngày mốc thành `>=`, viết ngày trong nháy đơn theo `yyyymmdd` và giải thích so sánh ngày. Đề chỉ cho mốc đầu và thứ tự ba cột đầu ra. |

## Review và xử lý

[Report gốc](../reviews/2026-11-14-lesson-2-2-where.md) từ reviewer cấu hình `gpt-6.1-terra`, effort `high`, `fork_turns: none` ghi cách tự giải từng đề trước khi xem đáp án. Công cụ xác nhận tạo agent với cấu hình đã gửi, không cung cấp bằng chứng về model thực tế. Reviewer đọc source và HTML trước hai chỉnh sửa dưới đây.

- **Làm theo** nhận xét về hình Excel. Ghi rõ đây là hình minh họa và giữ đúng số dòng cùng ô đánh dấu.
- **Làm theo** gợi ý giúp tìm tiền đề. Đặt liên kết Vận dụng ở mục Bài tập, nơi người học quay lại khi viết lọc trạng thái hoặc ngày. Đã mở liên kết trên bản local và xác minh đích đúng heading.
- Đã tự rà lại các đoạn sửa, nội dung Vận dụng và đường dẫn tới cả ba đề. Không còn finding mở trong phạm vi review.

## Bằng chứng và giới hạn

| Phạm vi | Kết quả |
|---|---|
| Source | Đối chiếu với `455456116077839099d41941984e5184f8780b97` và diff cuối. Câu chạy được, SQL của các bước, dữ liệu RunFlow, Result, YAML và seed giống bản trước. `npm test` đạt 599/599 trên 70 file. `npm run check` kiểm 314 file, có 0 lỗi, 0 cảnh báo và 7 hint về API deprecated ở các component hiện có. |
| HTML | `npm run build` tạo 198 trang. `npm run check:dist` đạt 280 trang và 4.142 liên kết. Đối chiếu HTML bài 2.2 theo thứ tự khuôn → SQL → RunFlow → tóm tắt → Result → trả lời → Vận dụng. Khuôn không có nút sao chép, nháy SQL thẳng, Result trích sáu dòng và đánh dấu `NV020`. |
| UI | Playwright với Chrome headless và browser context riêng trên Astro preview local. Đóng hộp Lộ trình, mở liên kết Vận dụng, mở drawer `WHERE` và đối chiếu `NV001` Sai, `NV020` Đúng. Phím Esc đóng drawer và trả focus về thẻ. Nút Sao chép báo Đã chép, thao tác dán vào editor bài tập giữ nguyên câu SQL, xuống dòng và tab. Không nộp bài. |
| SQL / dữ liệu | Đối chiếu literal trong `database/HRM_Demo.sql` và schema source. Có 48 hồ sơ, 14 mã `KD` gồm một hồ sơ đã nghỉ `NV020`, 7 mã `KT`, 3 hồ sơ đã nghỉ và hai hồ sơ vào làm từ mốc `2026-10-01` gồm `NV047` đúng mốc và `NV048` sau mốc. Phiên này không có kết nối MCP `azure-sql`. Chưa chạy lại trên SQL Server dùng chung, kể cả thông báo lỗi alias và chuyển kiểu thực tế. Các kết quả ở đây là đối chiếu source, không phải bằng chứng SQL live. |

SHA-256 cuối lượt. Dùng lại bằng chứng chỉ khi source, công cụ kiểm và các phụ thuộc tương ứng khớp.

| Đối tượng | SHA-256 |
|---|---|
| MDX 2.2 | `900D8F0F123F635FC86BD54FB3399F253A316C9585E46E9EE2AC0AF22E5DA6D1` |
| YAML 2.2 | `EA6D87C86445A15FED27DDEC81609F5AE41ADC81DE92B81C62D588FB40578BE0` |
| HTML 2.2 trong `dist` | `95170E56435083AA221EFA3DFF4858EB544992D470D500CFC3167AC946A5C767` |
| `database/HRM_Demo.sql` | `07CDDEC81AC719F3E63081555E349F1FD6CEA1DAD48C2545133E24D98764F4F2` |
| `RunFlow.astro` | `8E0D2A64C432ED42AFC9441BF4DE7000103C3A19A643F47BC2D69EF34022EEEB` |
| `Sql.astro` | `18977601D216F3198C3EFA12CE64504BC29D2D469A4658EAF3D53006F700AE05` |

Tác giả theo model và effort của phiên, reviewer cấu hình như trên. Có một lượt review độc lập và một đợt sửa theo report. Thiếu log tách riêng input/cache/output, số lần gọi model, số lượt đọc tài liệu và chi phí theo giai đoạn.

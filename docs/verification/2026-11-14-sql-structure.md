# Tách cấu trúc SQL mới khỏi luồng dữ liệu

## Phạm vi và quyết định đã duyệt

Áp dụng cho 2.1, 3.9, 3.12; chuẩn chung áp dụng cho các lượt biên soạn tiếp theo bằng Codex/Claude qua quy ước, template, bien-soan và hai bản course-author. Mục tiêu: người chỉ biết Excel cơ bản phân biệt cách viết cấu trúc mới với cách câu SQL tạo kết quả. HEAD đầu lượt: `455456116077839099d41941984e5184f8780b97`; working tree đầu lượt sạch.

Mạch: cấu trúc mới → SQL đầy đủ → lời dẫn ngắn → RunFlow → tóm tắt nguyên nhân → Result/câu trả lời → vận dụng khi cần. Bỏ ba bảng LineMap, giữ component và bài khác. Không đổi SQL cũ, dữ liệu, YAML/ID bài tập, API, URL, tiến độ hay database; không push/deploy.

| Bài | Cấu trúc mới / tiền đề | Phần hiện và phần drawer |
|---|---|---|
| 2.1 | SELECT/FROM, danh sách cột, AS, ngoặc vuông; tiền đề 1.2–1.3 | Cấu trúc và lý do giữ 48 hồ sơ hiện trên trang; drawer lần bảng nguồn tới ba cột. Bốn đề giữ nguyên |
| 3.9 | IN/câu con một cột; tiền đề 2.3, 2.5, 3.5 | SQL và luồng đối chiếu mã ở phần chính; EXISTS/NOT EXISTS, liên hệ và phạm vi lọc hiện ở Vận dụng, vẫn bắt buộc cho ba đề. Drawer soi mã giữ/loại |
| 3.12 | WITH, tên/ngoặc/AS, nhiều CTE, phạm vi một câu; tiền đề 3.11, 3.2 | Giải thích khai báo trước SQL; 9 đơn → 3 tổng → 2 loại và phép cộng đại diện hiện bên ngoài; cách kiểm CTE hiện ở Vận dụng. Drawer chi tiết từng bước. Giữ ID bài tập 4-1-1/2/3 |

Các nguồn cần đọc cho tác giả/reviewer: toàn bài và đề; tiền đề trực tiếp nêu trên; quy ước mục 1–2, 4.5; template “Bài có câu lệnh và kết quả”. Hồ sơ công ty mục 1–5 dùng đối chiếu tình huống. Không cần đọc lại toàn lịch sử.

## Kiểm kỹ thuật

| Kiểm | Kết quả và giới hạn |
|---|---|
| Đối chiếu trước–sau | Toàn bộ khối Sql cũ, RunFlow, Result và frontmatter của ba bài giữ nguyên sau chuẩn hóa xuống dòng. Các khuôn thêm mới chỉ để đọc, copy=false. Ba YAML giữ nguyên từng byte |
| Phạm vi file | 11 file tracked đổi đúng phạm vi; 855 file tracked còn lại giữ nguyên hash. Bao gồm component, API, database, curriculum và bài khác |
| npm test | 595/595 đạt ở 70 file trước sửa theo review. Bỏ một assertion cũ bắt mọi dòng LineMap có chữ “Ví dụ”, vì quy tắc này đã được thay; không bỏ kiểm SQL/số liệu |
| Kiểm sau review | 84/84 đạt trong content, content-level-2, docs và content-3-tail; gồm ba case mới giữ cấu trúc trước SQL, cùng câu SQL trong sơ đồ và không giấu nội dung chính trong details. Không lặp toàn bộ bộ kiểm sau sửa câu nối |
| npm run check | 314 file, 0 errors, 0 warnings, 7 hints nền: FormEvent ở ArcadeHome/ArcadeWorkspace/ExerciseWorkspace và execCommand ở SqlEditor; các file này không đổi |
| Build cuối / check:dist | 198 trang; check:dist đạt 280 trang và 4.141 liên kết sau sửa finding |
| Hướng dẫn/skill | Hai bản course-author giống từng byte; frontmatter YAML hợp lệ qua thư viện yaml của repo; 27 liên kết local trong tài liệu/skill hiện hành tồn tại. AGENTS/CLAUDE vẫn trỏ về quy trình chung. Không chạy lại validator Python vốn thiếu PyYAML; không coi kiểm thay thế là validator chính thức |
| git diff --check | Đạt; Git báo riêng việc LF của bài 2.1 sẽ đổi về CRLF khi Git xử lý, không phải lỗi nội dung |

Các lần test đầu bắt heading/cụm từ theo bố cục cũ; đã cập nhật assertion theo nội dung tương đương và mạch đã duyệt. Các kiểm SQL, kết quả, tiền đề, số bài và an toàn được giữ. Không thêm bài vào danh sách miễn khung cũ.

Log và snapshot local: `temp/verification/2026-11-14-sql-structure/` gồm baseline.json, preservation.json, test.log, final-test.log, review-retest.log, check.log, final-build.log, final-dist.log. Snapshot chứa hash toàn bộ file tracked đầu lượt và bằng chứng bảo toàn; không chứa dữ liệu kết nối hoặc SQL live.

SHA-256 bài cuối, sau review:

| Bài | Hash |
|---|---|
| 2.1 | fa09476797ce5b1737d8388cc9aa8fa46121b85782716259c6c6af3767f36401 |
| 3.9 | 2397c8a75634744dd958ccc5b01693bb7240c82d066a38db22670821458ab8f4 |
| 3.12 | e55d3d0d35460b766efa87eab00cb5d19fae81216e937ae730cc957f28fc2aff |

## Kiểm tương tác trên bản build

Dùng trình duyệt trong ứng dụng qua localhost preview, trên ba trang thực tế. Kiểm thứ tự tiêu đề/câu lệnh/sơ đồ, sao chép câu đầy đủ và đọc clipboard: cả ba đúng nội dung, dấu tiếng Việt, xuống dòng và tab thật. Khuôn/đoạn trích không có nút sao chép. Mở và đóng SELECT của 2.1, WHERE của 3.9, CTE tổng hợp của 3.12; đều hiện Đầu vào/Thực hiện/Kết quả. Bài 3.9 còn được đóng bằng Escape. Đã xem ảnh trình duyệt của drawer 3.9 và phần cấu trúc/SQL 3.12.

Clipboard trình duyệt ban đầu rỗng, đã trả về văn bản rỗng sau kiểm; lần gọi khôi phục danh sách clipboard rỗng bị từ chối nên dùng writeText rỗng. Không dán vào bản nháp, bấm chấm bài, chạy query hay đánh dấu hoàn thành. Việc mở trang localhost có thể tự cập nhật trạng thái “đã xem” như hành vi sẵn có; không đổi cơ chế hoặc dữ liệu tiến độ trên bản triển khai.

Kiểm tương tác diễn ra trước hai chỉnh chữ cuối: bỏ tham chiếu sai ở 3.9 và đặt lời dẫn “Kết quả cuối…” cạnh bảng ở 2.1. Build/HTML cuối đã kiểm lại phần chữ bị tác động; các widget, SQL và dữ liệu không đổi nên không lặp thao tác UI. Chưa kiểm responsive/mobile đầy đủ, SQL live, API hoặc học thử với học viên thật.

## Review và xử lý

Cấu hình giao các reviewer: gpt-6.1-terra, high, fork_turns none. Công cụ không cung cấp xác nhận độc lập model thực tế. Report gốc được giữ nguyên, phần xác nhận thêm dưới dạng addendum.

| Report | Kết quả / xử lý |
|---|---|
| [2.1](../reviews/2026-11-14-sql-structure/review-2-1.md) | Không có finding có căn cứ. Reviewer ghi nhận đã nhìn thấy answer YAML trước khi tự giải, nên không nhận lượt này chứng minh việc tự giải trước đáp án |
| [Tiền đề 2.1](../reviews/2026-11-14-sql-structure/prerequisites-2-1.md) | Bổ sung một lượt ngữ cảnh mới chỉ đọc bốn đề đã bỏ answer và bài giảng/tiền đề, không review lại cả bài. Đủ tiền đề cú pháp; việc tra tên bảng/cột bằng công cụ và schema thực tế chưa xác minh trong lượt đó |
| [3.9](../reviews/2026-11-14-sql-structure/review-3-9.md) | Làm theo: bỏ câu “EXISTS như trên” vì EXISTS chuyển xuống Vận dụng. Cùng reviewer đã xác nhận đoạn source/HTML sau sửa; ba đề và ba câu tự kiểm đủ tiền đề theo report |
| [3.12](../reviews/2026-11-14-sql-structure/review-3-12.md) | Không có finding có căn cứ; ba đề và bốn câu tự kiểm đủ tiền đề theo report |

Không mở review tích hợp: không đổi component hay quan hệ tiền đề giữa bài. Tác giả đối chiếu quy ước/template/skill và test chung; không gọi đó là review độc lập của chính sách.

## Usage và bàn giao

Lượt này trộn biên tập ba bài, cập nhật hướng dẫn/test và kiểm trình duyệt; không tính toàn chat là chi phí viết một bài. Tách hoạt động: chuẩn bị nguồn → biên tập → kiểm bảo toàn/test/build/UI → review → sửa một finding → kiểm lại phần ảnh hưởng.

Đã gọi ba reviewer toàn bài, một reviewer giới hạn tiền đề 2.1 và một lượt tiếp tục reviewer 3.9. Lượt bổ sung 2.1 phát sinh vì thiếu bằng chứng tự giải trước answer, không phải tầng review mặc định mới. Model/effort tác giả theo phiên người dùng; tool không báo usage cho từng giai đoạn. Input/cache/output, số lần gọi model và số lượt đọc tài liệu: **thiếu log đo riêng**, không thay bằng số lượt gọi tool/agent. Chưa có baseline tương đương và chưa kết luận tiết kiệm token.

Đã hoàn tất ba bài local, hướng dẫn chung và kiểm trong phạm vi trên; không còn finding trọng yếu chưa xử lý trong report. Bước tiếp theo: người làm khóa học xem ba bài mẫu; chỉ chuyển bài khác khi có yêu cầu. Nếu SQL, dữ liệu, component hoặc tiền đề đổi, kiểm lại bằng chứng bị tác động; các hash ở đây không xác nhận database live. Chưa push/deploy.

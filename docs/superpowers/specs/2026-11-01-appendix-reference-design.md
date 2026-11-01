# Phụ lục PL.1–PL.6

## Quyết định đã duyệt

Người làm khóa học duyệt triển khai ngày 01/11/2026: mỗi bài vừa tra nhanh vừa giải thích đủ để biết dùng, có một vài câu tự kiểm tra; ưu tiên PL.1–PL.6. Chuẩn nội dung là SQL Server 2025 và Azure SQL hiện hành, không cần tương thích ngược. Phân biệt trạng thái phát hành của từng nền tảng nếu tính năng mới chưa đồng đều. Quyền triển khai lần này gồm sửa và kiểm tại máy, chưa gồm push/deploy.

Chương Phụ lục đứng riêng, không biến thành cấp độ thứ bảy và không tham gia tiến độ của 50 bài học. Hai bài đầu luôn là chi tiết kiểu dữ liệu và chuyển đổi kiểu. Không sửa hàng loạt bài cũ, seed, API, đáp án hay dữ liệu dùng chung.

## Mục tiêu và phạm vi

| Bài | Phạm vi sở hữu |
|---|---|
| PL.1 Chi tiết các kiểu dữ liệu | Đủ kiểu dựng sẵn trong danh mục Microsoft hiện hành; nhóm số, ngày giờ, chuỗi, nhị phân và kiểu đặc biệt. Tên đồng nghĩa, kiểu cũ, kiểu không dùng làm cột; đơn vị, dung lượng, miền giá trị, precision/scale và tình huống chọn kiểu. Phân biệt tải dữ liệu với chi phí lưu vật lý. |
| PL.2 Chuyển đổi kiểu dữ liệu | Ngầm/tường minh, ưu tiên kiểu so với kiểu đích khi gán; CAST, CONVERT, TRY_CAST, TRY_CONVERT, PARSE, TRY_PARSE; style/culture, chuyển được về kỹ thuật so với giữ nguyên ý nghĩa; mất chữ/số/thời gian, tràn, lỗi và trường hợp TRY vẫn báo lỗi. |
| PL.3 Hàm xử lý chuỗi | Độ dài/khoảng trắng, lấy phần chuỗi, tìm/thay, nối, định dạng và tách/gộp; kiểu trả về, NULL, collation, Unicode và thứ tự. |
| PL.4 Tính toán và làm tròn | Các phép toán, chia nguyên, decimal, ROUND/CEILING/FLOOR/ABS, chia cho không, overflow, độ chính xác và thời điểm làm tròn. |
| PL.5 Hàm ngày giờ | Tạo/đọc mốc, DATEADD/DATEDIFF, cuối tháng, DATETRUNC/DATE_BUCKET, mốc hiện tại và múi giờ; phân biệt ranh giới lịch với khoảng thời gian trọn vẹn, lọc khoảng nửa mở. |
| PL.6 NULL và điều kiện | UNKNOWN, IS NULL, ISNULL/COALESCE/NULLIF, CASE/IIF/CHOOSE, điều kiện chồng nhau, kiểu kết quả; CASE là biểu thức, không phải hàm hoặc điều khiển luồng. |

Phụ lục không cần đọc theo thứ tự. Mỗi bài nêu ngắn kiến thức cần biết, cách đọc cú pháp và giới hạn; kiến thức cốt lõi không được thay bằng một đường dẫn. Các bài chính vẫn tự đủ nghĩa. Không đòi học viên quản trị hệ thống hoặc biết lập trình để đọc ví dụ cơ bản.

## Biến thể bài tra cứu

Đây là biến thể mới được ghi đồng thời vào quy ước/template, không nằm trong danh sách cho phép khung cũ. Không ép tình huống đơn, hai tiểu mục, giới hạn độ dài bài nền, Memo/Exercises hoặc tiến độ hoàn thành của bài chính.

1. Mở đầu nói bài giúp làm gì, cách tra và kiến thức tối thiểu; có bảng tra nhanh tên/tác vụ/cú pháp hoặc liên kết tới phần chi tiết.
2. Mỗi nhóm giải thích dùng khi nào, cú pháp và tham số, đầu vào/kiểu trả về, ví dụ tối thiểu và kết quả đã kiểm, lý do lựa chọn cùng giới hạn thực tế. PL.1 dùng bảng danh mục đầy đủ và ví dụ đại diện nhóm thường dùng; không buộc mỗi kiểu hiếm có truy vấn riêng.
3. Đổi một điều kiện trong ví dụ để làm rõ lỗi thường gặp và cách sửa; không lôi thêm concurrency hay tình huống hiếm ngoài mục tiêu.
4. Ba câu tự kiểm tra mỗi bài: chọn công cụ/kiểu, đoán kết quả, sửa cách dùng. Đáp án mở bằng details, giải thích vì sao; không dùng câu hỏi để dạy bù điều chưa có trong phần giảng.
5. Nguồn Microsoft gần phần liên quan hoặc cuối bài. Liên kết chéo PL.1/PL.2 để tránh lặp danh mục; lưu ý quan trọng vẫn có tại chỗ.

Được dùng SELECT trên hằng số và bảng dẫn xuất VALUES để cô lập cơ chế mà không cần thêm bảng/cột công ty. Giải thích VALUES và bí danh ngay ví dụ đầu nếu dùng. Câu lệnh chạy được chỉ đọc; khuôn cú pháp hoặc ví dụ chỉ để đọc có copy=false. Không hứa mọi ví dụ chạy ở bài tập web có allowlist riêng. Các phép kiểm SQL chỉ đọc database dùng chung, không bật tính năng preview hoặc đổi thiết lập.

## Kiến trúc và hành vi

- Collection `appendices`, schema/catalog riêng; URL `/phu-luc/` và `/phu-luc/<slug>/`. Thứ tự PL.1–PL.6; không thêm level/area vào main catalog.
- Layout riêng dùng khung ba cột, typography, Sql/Result và TOC hiện có. Không mount LessonStatus hoặc ghi seen/lastLessonNum. Previous/next chỉ trong Phụ lục.
- Thêm chương Phụ lục ở sidebar và liên kết đầu trang. Tìm kiếm chung qua adapter, có nhãn Phụ lục, từ khóa chứa tên kiểu/hàm; giữ ranking và bàn phím hiện có. Kiểm cả tên có dấu/không dấu và PL.1.
- Bảng tra có vùng cuộn riêng, không làm tràn toàn trang. Giữ desktop/narrow notice theo DESIGN.md; không đổi palette, font hay định nghĩa breakpoint. details dùng bàn phím được.
- Không thêm bài tập chấm tự động/YAML/API. Tự kiểm tra nằm trong MDX; không chứa nguyên văn đáp án bài tập hiện có.

## Kiểm và nghiệm thu

Kiểm catalog chính vẫn 50 bài và tiến độ/resume không đổi; schema, thứ tự, từ khóa/đường dẫn, đủ sáu bài và index, fragment và nội dung tra cứu có bảo vệ riêng. Mọi SQL/kết quả xuất hiện phải được kiểm SELECT trên database khóa học trước nghiệm thu; giới hạn hiếm hoặc preview dựa tài liệu Microsoft, ghi rõ phần engine hiện tại không xác minh được. Không giả nhận đã chạy kiểu không hỗ trợ.

Chạy npm test, check, build, check:dist; mở build tương ứng source để thử điều hướng, tìm tên hàm/kiểu, không kết quả/xóa tìm kiếm, TOC, đáp án details, cuộn bảng và bàn phím ở 1280px và viewport hẹp theo hợp đồng. Chạy audit UI và DESIGN lint, phân biệt lỗi nền. API build/check:exercises/check:data không cần khi không thay bài tập/runner và không chạy câu ghi.

Sáu reviewer mới độc lập học từng bài theo §4.5; sau đó một reviewer mới kiểm tích hợp content/navigation/search/progress. Giữ report nguyên gốc, xử lý mọi finding kể cả minor/ngoài phạm vi trong ma trận; cập nhật spec/plan sau từng vòng. Không lấy Ready làm bằng chứng chạy SQL/UI hoặc quyền push.

## Tiến độ

- Đã hoàn tất hạ tầng và PL.1–PL.6 trên nhánh `codex/appendix-reference-pl-1-6`. Builder check mới: “nothing important left”; quy ước §2.7/template/DESIGN đã ghi biến thể tra cứu, không dùng allowlist cũ hoặc thêm grader.
- Cả sáu review bài độc lập và một review tích hợp mới đã hoàn tất, kế thừa model phiên. Giữ report nguyên gốc; mọifinding/minor/undetermined có quyết định tại hồ sơ review. Các điểm sửa gồm dữ kiện đề hiện trước đáp án, đơn vị/ký hiệu, đường vào SELECT/CAST, PATINDEX NULL, nguồn giờ, câu thừa và metadata tìm kiếm tên đã giảng.
- Kiểm cuối:385tests/51files; check0errors/0warnings và3hints nền; build136trang10:44:38; check:dist2.502link.53SELECT/47Result khớp live evidence, thêm9probe ngưỡng sau review. UI tại1280/1024/1440, tìm kiếm/bàn phím/details/copy/resume đã kiểm; giữ50bài và tiến độ độc lập.
- Giữ rõ giới hạn tài liệu/live theo nền tảng, PATINDEX có khác biệt, audit tĩnh editor nền và những phép kiểm chưa làm. Origin thử riêng xác nhận resume3.1 quaPL/reload/Back/Forward; không đổi progress owner hoặc tự mở nhóm chính theo snapshot mới trên trangPL.
- Đã chốt triển khai local; không merge/push/deploy trong phạm vi này. Bằng chứng và ma trận ở `docs/reviews/2026-11-01-appendix-reference/`.
- Sau bàn giao local, người làm khóa học đã yêu cầu đẩy lên main ngày01/11/2026. Phạm vi lượt đăng mới gồm merge/push và kiểm Pages/public routes; không thay nội dung đã duyệt hoặc API. Snapshot trước push lưu cùng hồ sơ review, kết quả đăng chỉ kết luận sau kiểm run đúng SHA.
- Evidence và kết quả thực tế sẽ ghi trong `docs/reviews/2026-11-01-appendix-reference/`.

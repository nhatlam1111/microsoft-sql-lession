# Ma trận xử lý review Phụ lục

Giữ nguyên các report gốc. Các quyết định dưới đây do người viết xác minh và xử lý, không đổi kết luận học thử thành kết quả chạy SQL/UI. Đối chiếu source sau sửa bằng kiểm tra tự động/build và hồ sơ kỹ thuật riêng.

## Vòng PL.1 và PL.2

| Nhận xét gốc | Quyết định | Xử lý và căn cứ |
|---|---|---|
| PL1-01 — UTF-8/UTF-16/UCS-2, đơn vị và ký tự bổ sung chưa rõ | Làm theo | Thêm nghĩa mã hóa, một đơn vị UTF-16 bằng hai byte, ký tự ngoài vùng cơ bản cần hai đơn vị. Giữ cảnh báo độ dài không luôn bằng số ký tự, không thêm bài mã hóa riêng. |
| PL1-02 — ký hiệu `[, base]` | Làm theo | Giải thích phần tùy chọn không gõ ngoặc vuông; đặt cạnh hai dạng `vector(3)` và `vector(3, float16)`. |
| PL1-03 — SQL đề câu 2 ẩn cùng đáp án | Làm theo | Đưa Sql trước details, sửa câu hỏi thành “câu SQL trên”; đáp án vẫn đóng. Câu và kết quả không đổi nên dùng bằng chứng SQL nguyên câu đã có. |
| PL1-04 — code cho dữ kiện trong summary | Làm theo | Đánh dấu `12.345`, `00123`, `123` bằng code, giữ ý câu hỏi. |
| PL2-F1 — bảng tra chưa dẫn tới nhóm hàm | Làm theo | Bổ sung link tới ba anchor riêng CAST/TRY_CAST, CONVERT/TRY_CONVERT, PARSE/TRY_PARSE. Chờ check:dist của source sau sửa xác nhận đích. |
| PL2-F2 — `s`, literal/tham số NULL chưa rõ | Làm theo | Định nghĩa `s`; thay thuật ngữ literal/tham số bằng NULL viết trực tiếp và NULL đã có kiểu chuỗi. SELECT bổ sung `PARSE(CAST(NULL AS nvarchar(4000)) AS int)` trả NULL, khác lỗi8116 của NULL không có kiểu đã kiểm trước đó. |
| PL2-F3 — ngưỡng TRY_CAST thiếu đơn vị | Làm theo | Ghi8.000byte varchar(max),4.000đơn vịUTF-16/8.000byte nvarchar(max), kiểm bằng DATALENGTH gồm dấu cách cuối. Chín SELECT bổ sung xác minh ngưỡng ASCII/UTF-8/ký tự bổ sung và NULL có kiểu: đúng biên có kết quả hoặc NULL theo giá trị; vượt biên báo8152 dù dùng TRY. Kết quả ở review-limits-sql-results.json; không suy mọi hướng chuyển có cùng cách thất bại. |
| PL2-F4 — dữ kiện đề câu 2–3 ẩn cùng đáp án | Làm theo | Đưa hai Sql của đề ra trước details; Sql sửa đúng vẫn ở trong lời giải. Không thêm lý thuyết hoặc đổi đáp án. |

Các mục “Giữ được” được giữ: phạm vi tra cứu, bảng năm kiểu có chủ đích, phân biệt ngầm/tường minh/ưu tiên/gán, kiểu đích so với giữ ý nghĩa, ví dụ hằng số và SSMS/web allowlist. Những phần reviewer chưa xác minh kỹ thuật được đối chiếu hồ sơ SELECT/tài liệu riêng, không coi là lỗi hoặc tự nhận reviewer đã chạy. Có test bảo vệ dữ kiện SQL của ba câu ôn từng bị ẩn; không đổi câu truy vấn/kết quả của chúng.

## Vòng PL.3–PL.5

| Nhận xét gốc | Quyết định | Xử lý và căn cứ |
|---|---|---|
| PL3-F1 — char(32) dễ nhầm kiểu | Làm theo | Đổi thành dấu cách thường, mã ký tự32; không mở thêm phần dạy hàm CHAR. |
| PL3-F2 — “chữ nguyên vẹn” | Làm theo | Gọi đúng tìm cụm ký tự viết trực tiếp, không dùng ký tự đại diện; tránh hiểu là khớp cả từ. |
| PL3-F3 — chưa rõ hai đầu vào NULL của PATINDEX | Làm theo | Đọc lại Microsoft và đối chiếu case pl3-search-null đã chạy. Mẫu NULL trả NULL; chuỗi NULL có khác biệt tài liệu/Azure khóa học. Bài ghi rõ khác biệt và cách COALESCE có điều kiện nghiệp vụ, không lấy một lần thử Azure để khẳng định mọi engine. Không thay vào một bảng kết quả không được kiểm trên SQL Server cài riêng. |
| PL3-F4 — “các ví dụ sau” thừa | Làm theo | Bỏ câu dẫn không có ví dụ tương ứng sau đó. |
| PL3-F5 — jargon FORMAT/remoting | Làm theo | Bỏ mệnh đề từ xa mơ hồ và tên bộ xử lý không cần cho ví dụ; giữ khuyến nghị định dạng ở phần mềm với báo cáo nhiều dòng. Nguồn FORMAT vẫn để tra các giới hạn chuyên sâu. |
| PL4-R1 — max trong công thức | Làm theo | Thêm một vế: đây là công thức toán, max chọn số lớn hơn; phân biệt với MAX SQL tổng hợp dòng. Không thêm ví dụ tính kiểu thứ hai vì không cần để giải ba câu ôn và quy tắc đã đủ khi đọc ký hiệu. |
| PL5-01 — đọc SELECT hằng số/CONVERT và UTC | Làm theo | Giải thích không FROM/AS, CONVERT ngoài cùng tạo chuỗi, chuyển định nghĩa UTC lên lần đầu; giữ bảng style đầy đủ ở PL.2. |
| PL5-02 — từ “nên” lặp | Làm theo | Bỏ từ lặp, không đổi quy tắc DATEADD. |
| PL5-03 — cấu hình giờ quá rộng | Làm theo | Đọc lại GETDATE Microsoft: Azure SQL Database theoUTC, SQL Server lấy đồng hồ máy chủ. Bỏ khả năng hiểu là đổi giờ qua database/phiên; giữ xác nhận quy ước hệ thống, AT TIME ZONE và ngày chốt báo cáo. |

Giữ các nhóm đã được công nhận, không thêm mục ngoài phạm vi. Các mục reviewer chỉ “chưa xác minh” (type/range/SQL/platform/clipboard/UI) được đối chiếu bằng hồ sơ riêng hoặc ghi giới hạn ở verification.md, không chuyển thành xác nhận của reviewer.

## Vòng PL.6

| Nhận xét gốc | Quyết định | Xử lý và căn cứ |
|---|---|---|
| PL6-01 — SELECT hằng số chưa giải thích tại chỗ | Làm theo | Thêm một câu SELECT không FROM/AS trước các ví dụ; giữ tiên quyết2.1–2.2 và định nghĩa biểu thức. Không thêm SQL hoặc dữ kiện công ty. |
| PL6-02 — câu metadata/cột tính toán ngoài tiền đề | Làm theo | Bỏ câu không giúp chọn nhãn trong SELECT; giữ giới hạn COALESCE có thể đánh giá lại đầu vào. Chi tiết metadata còn ở nguồn Microsoft để tra khi học thiết kế. |
| PL6-03 — MAX/hàm tổng hợp chưa có nghĩa | Làm theo | Giải thích lấy một kết quả từ nhiều dòng, MAX chọn lớn nhất, và phép1/X ở từng dòng có thể tính sớm; giữ NULLIF ở mẫu số. Case lỗi và cách sửa đã có trong phép kiểm bổ sung của tác giả. |

Giữ các phần được công nhận về UNKNOWN, ba câu ôn, quy tắc kiểu và nhánh; không mở thêm bài tổng hợp hoặc bài thiết kế database.

## Các lượt đang tiếp tục

PL.3/PL.4 bị ngắt do hạn mức, đã tiếp tục đúng agent và đúng lượt sau yêu cầu “tiếp tục” của người làm khóa học rồi hoàn tất. Không tạo reviewer thay thế hoặc đổi model. Sáu review bài đã hoàn tất, mọi finding trong report đã có quyết định. Review tích hợp và kiểm bản sửa cuối còn tiếp tục; chưa có kết luận nghiệm thu cả chương.

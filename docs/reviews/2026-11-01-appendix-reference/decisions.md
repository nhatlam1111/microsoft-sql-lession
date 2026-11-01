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

PL.3/PL.4 bị ngắt do hạn mức, đã tiếp tục đúng agent và đúng lượt sau yêu cầu “tiếp tục” của người làm khóa học rồi hoàn tất. Không tạo reviewer thay thế hoặc đổi model. Sáu review bài và review tích hợp đã hoàn tất; các quyết định cuối ở dưới.

## Review tích hợp — commit được review `35b35ab`

Root đã đọc đầy đủ report gốc `integration-review.md`; giữ nguyên kết luận và bằng chứng của reviewer. Bản sửa sau report không đổi thuật toán tìm kiếm, progress owner, câu SQL hoặc kết quả.

| Mục của reviewer | Quyết định | Xử lý và căn cứ |
|---|---|---|
| INT-01 — tên đồng nghĩa/nhóm SUM khó tìm | Làm theo | Thêm toàn bộ tên đồng nghĩa đang giảng vào PL.1 và SUM vào PL.4. Test dùng frontmatter thực tái hiện lỗi integer trước sửa, sau sửa cả sáu truy vấn hồi quy đạt; không lập chỉ mục toàn văn hoặc đổi ranking. Browser xác nhận integer/double precision/character varying tới PL.1, SUM có PL.4 trong kết quả và vẫn giữ các bài chính phía trước. |
| SQL_VARIANT_PROPERTY — trường hợp cùng cơ chế để root chọn | Làm theo | Thêm vào từ khóa PL.5 vì bài đã giải nghĩa hàm hỗ trợ kiểm kiểu này. Có test và browser tìm ra PL.5; không mở thêm bài metadata. |
| Minor1 — SELECT không FROM/CAST tại PL.3–PL.4 | Làm theo | Đồng bộ một vế đọc SELECT hằng số/AS; giải thích CAST ngay trước lần dùng cần thiết. Giữ đường dẫn PL.1/PL.2 cho danh mục sâu, không thêm ví dụ SQL hoặc kiến thức trong đáp án. |
| Undetermined2 — hydrate/nhóm sidebar và resume ở level khác | Làm một phần | Kiểm trên origin thử riêng4333, ban đầu chào mới/0 bài. Mở3.1 rồi PL.5, reload trực tiếp, Back/Forward: Lộ trình vẫn dừng3.1; bấm Học tiếp mở3.1 và nhóm3 mở đúng, console không lỗi. Trên trang PL, nhóm chính3 không tự mở sau hydrate; giữ hành vi khởi tạo nhóm hiện có vì PL có nhóm đang mở riêng và không có cam kết tự mở nhóm chính theo resume tại đây. Không có mất dữ liệu để sửa progress owner; không tự nhận đã chứng minh cơ chế bfcache nội bộ. Origin4332 của lượt trước không bị đổi vị trí. |
| Undetermined3 — IME/screenreader/thiết bị | Không làm theo việc mở rộng kiểm | Giữ đúng giới hạn chưa kiểm IME thật, toàn bộ screenreader/zoom200%/thiết bị. Đã thử keyboard, focus, inert qua luồng tìm kiếm và native details; source có guard composition. Không gọi các giới hạn chưa có tái hiện là bug, không suy thành đạt mọi tổ hợp. |
| Giới hạn4 — SQLServer2025 cài riêng/MI và cực trị | Không làm theo việc thử thêm nền tảng | Nguồn Microsoft và phép SELECT Azure đã tách rõ; không có môi trường cài riêng/MI được giao. Không tạo tài nguyên, bật preview hoặc đổi DB để mở rộng bằng chứng. Giữ giới hạn tài liệu/live, gồm PATINDEX. |
| Ngoài phạm vi5 — API/editor/draft/auth/câu ghi và audit nền | Không làm theo việc mở rộng sửa/chạy | Không đổi API/YAML/runner/editor/seed, chỉ thêm reference đọc; không có câu ghi để cần check:data. Giữ audit nền và ba hint đúng kết quả thực tế, không sửa ngoài phạm vi hoặc báo kiểm chưa chạy là đạt. |

Sau sửa: 385/385test,51files; check219files/0errors/0warnings/3hints nền; build136trang10:44:38; check:dist2.502link. Source SQL coverage vẫn53SELECT/47Result, hash được cập nhật theo source cuối. Không còn finding được chấp nhận chưa xử lý; mọi minor/undetermined/ngoài phạm vi đều có quyết định và giới hạn ở trên.

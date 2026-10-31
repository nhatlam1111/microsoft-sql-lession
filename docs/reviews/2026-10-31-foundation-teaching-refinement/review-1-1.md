# Review độc lập bài 1.1

## Phạm vi, phiên bản và công cụ

- Vai học thử: Business Consultant khó tính, muốn chuyển sang BA/PM; chỉ biết Excel cơ bản, chưa biết SQL/lập trình. Không dùng kiến thức bài sau để bù bài này.
- Công cụ/model: Codex, **kế thừa model của phiên**; không xác định hoặc đoán tên model cụ thể.
- Đã đọc toàn bộ `src/content/lessons/1-1-database-la-gi.mdx` (110 dòng), ba ảnh nguồn, caption/alt, `Memo` và cả ba câu tự kiểm tra; không có YAML hay bài tập.
- Source được giao: `ae7a2f3a0aa3c60e39babe0aeae356d49d8ea534`, MDX sạch. HTML được giao và đã đọc: `dist/bai/1-1-database-la-gi/index.html`, build 31/10/2026 lúc 21:33 giờ Việt Nam, từ đúng MDX theo gói giao việc. Không tự chạy lại build.
- Đã đọc `AGENTS.md`, toàn bộ quy ước/template/hồ sơ công ty; spec `docs/superpowers/specs/2026-10-31-foundation-teaching-refinement-design.md` chỉ các mục Mục đích và giới hạn, Các hướng đã cân nhắc, Nội dung cụ thể. Không đọc report cũ, trạng thái tác giả hoặc nhận xét người khác.
- Thực tế chỉ dùng PowerShell đọc nguồn/HTML tĩnh và công cụ xem ảnh cục bộ; chỉ ghi report này.

## Rà theo thứ tự bài

Các vị trí dưới đây thuộc `src/content/lessons/1-1-database-la-gi.mdx`.

| Vị trí / trích ngắn | Đánh giá | Tác động và căn cứ | Đề xuất tối thiểu |
|---|---|---|---|
| Dòng 24–30: “mỗi phòng giữ một bản sao”; “Một workbook đặt ở nơi dùng chung cũng làm được phần này” | **Giữ được** | Bắt đầu từ Excel quen thuộc, trả lời vì sao cần nguồn chung mà không khẳng định Excel không thể dùng chung. So sánh workbook/sheet được giới hạn bằng “có thể hình dung”. Hình trống chỉ minh họa, caption nói rõ. | Giữ. |
| Dòng 35–46: “mọi yêu cầu đi qua phần mềm quản lý”; “SQL: ngôn ngữ” | **Giữ được** | Trả lời SQL Server làm gì và SQL để làm gì. “Máy chủ” có nghĩa tại chỗ. Caption giải quyết được nguy cơ hiểu khung ứng dụng trong hình là cửa sổ SQL Server mà người học phải mở. | Giữ, không cần thêm kiến trúc hay cú pháp. |
| Dòng 51–53: “Dữ liệu nằm ở máy chủ, không nằm trong SSMS” | **Giữ được** | Phân biệt công cụ với dữ liệu bằng hệ quả cụ thể. Có đường dẫn chọn nơi thực hành và mốc bắt đầu viết lệnh; không bắt người chọn web phải cài/kết nối SSMS trong bài này. | Giữ. |
| Dòng 57–61: “Khi luật đang bật”; “hợp lệ chưa chắc đã đúng” | **Giữ được** | Luật có điều kiện khai báo/đang bật; ví dụ phòng có thật nhưng chọn nhầm giải thích đủ tại sao vẫn cần người đối chiếu. Data Validation có giải nghĩa công dụng, không đòi người mới biết sẵn tính năng. Phần đi sâu được chỉ sang đúng bài. | Giữ ví dụ gọn hiện có. |
| Dòng 67, 75–87: “sửa trong file không đổi dữ liệu ở nguồn”; hai ứng dụng và Ghi nhớ | **Giữ được** | Lỗi file xuất có hậu quả cụ thể; ứng dụng đi từ phân biệt tên tới xin quyền/báo lỗi và kiểm dữ liệu. Ghi nhớ nhắc lại đúng phần đã giảng, không sinh thuật ngữ hoặc lời hứa mới. | Giữ. |
| Dòng 10 và 89–108: mục tiêu “biết nguồn dữ liệu chung giúp gì”, nhưng ba câu ôn hỏi bốn tên / đóng SSMS / phòng ghi nhầm | **Cần làm rõ** | **Thiếu độ phủ kiểm tra, không thiếu lời giảng.** Lợi ích nguồn chung đã giảng ở dòng 24–26 nhưng chưa được câu nào yêu cầu người học tự nêu. Trả lời đủ ba câu hiện tại vẫn có thể chưa giải thích được tại sao chuyển từ các bản sao sang nguồn chung. Quy ước 2 và template mục Bài khái niệm yêu cầu bộ câu ôn phủ mục tiêu. | Thêm một vế hỏi/đáp ngắn về lợi ích cùng đọc nguồn đã cập nhật vào câu 1 là đủ; giữ câu suy luận đóng SSMS theo quyết định đã duyệt. Không cần thêm lý thuyết. |

## Tiền đề từng câu tự kiểm tra

| Câu / vị trí | Cần kiến thức gì | Được dạy trước ôn ở đâu | Còn thiếu / đánh giá |
|---|---|---|---|
| 1 — dòng 92: phân biệt database, SQL Server, SQL, SSMS | Chức năng và quan hệ của bốn tên | Dòng 26, 35, 42, 51; chuỗi quan hệ được ôn lại ở dòng 82 | Đủ tiền đề; đáp án không dạy bù. Chưa đo trực tiếp lợi ích nguồn chung như finding trên. |
| 2 — dòng 99: đóng rồi mở lại SSMS, dữ liệu có mất không và vì sao | SSMS là công cụ kết nối; nơi lưu dữ liệu tách khỏi cửa sổ | Dòng 51, quan hệ ở dòng 82 | Đủ tiền đề; hệ quả đã được giải thích trước ôn. Kiểm quan hệ công cụ–nơi lưu, không chỉ nhớ tên. |
| 3 — dòng 106: nhân viên bị ghi nhầm vào phòng có trong danh mục | Luật kiểm phòng tồn tại khác với kiểm người thuộc đúng phòng | Dòng 57–59 | Đủ tiền đề; đáp án giữ điều kiện “nếu luật chỉ kiểm…”, không hứa database không thể có bất kỳ kiểm tra bổ sung nào. |

Không có bài tập cần thao tác. Không phát hiện câu ôn dùng kiến thức chưa dạy hoặc phải đọc bài sau mới trả lời được. Câu 2 và câu 1 cùng chạm SSMS nhưng yêu cầu khác nhau; chưa có căn cứ cần cắt câu suy luận đã duyệt.

## Các câu “tại sao / để làm gì” khi học thử

| Tự hỏi | Bài đã trả lời |
|---|---|
| Vì sao gom dữ liệu thay vì gửi các bản sao? | Dòng 24–26: bản sao cập nhật lệch nhau; cùng đọc nguồn đã cập nhật. Đây là ý còn thiếu yêu cầu ôn trực tiếp. |
| SQL Server, SQL và SSMS mỗi thứ làm việc gì? | Dòng 35, 42, 51 và câu chuỗi quan hệ dòng 82. |
| Vì sao đóng SSMS không làm mất dữ liệu? | Dòng 51; không phải tìm câu trả lời lần đầu trong đáp án. |
| Vì sao có luật vẫn phải đối chiếu dữ liệu? | Dòng 57–59: luật kiểm phòng có thật không xác nhận nhân viên thuộc đúng phòng. |
| Sửa bản Excel xuất ra có cập nhật nguồn không? | Dòng 67 nêu rõ phạm vi và hậu quả. |

## Ưu tiên và kết luận

Một mục **Cần làm rõ** ở độ phủ câu ôn; không thấy lỗi nội dung có căn cứ cần sửa hoặc đoạn cần cắt. Giữ được bốn tên, nguồn chung, giới hạn hợp lệ/đúng, cấu trúc bài nền, `noScenario/noExercises`, 7 phút ước tính và ba câu ôn. Về tiền đề nội dung, cả ba câu hiện có đều trả lời được từ phần đã giảng; nhận xét này không xác nhận học viên thực tế chắc chắn tự học được.

## Nguồn và giới hạn chưa xác minh

- Đã đối chiếu chữ trong MDX với HTML bài, ba thẻ ảnh/alt/caption, bảng Memo, ba khối `details` và đường dẫn thực hành trong HTML. Ảnh nguồn là hình khái niệm, không có số liệu/kết quả SQL cần suy ra. Chưa xem ảnh WebP trên trang bằng browser.
- Không mở browser, không đo viewport/thời gian đọc, không kiểm tải ảnh thực tế, bố cục, thao tác mở đáp án, bàn phím hoặc điều hướng tới trang Giới thiệu. HTML tĩnh không chứng minh các thao tác đó hoạt động.
- Không chạy test/check/build, không kết nối SQL, API/runner; không đọc `database/HRM_Demo.sql`, secret hay tài liệu SQL ngoài khóa học. Không xác nhận độc lập số từ theo `proseParagraphs`, nguồn dữ liệu mẫu hoặc hành vi SQL Server bằng chạy thật. Không có nghi vấn kỹ thuật cụ thể cần suy đoán thêm từ bài này.
- Không sửa sản phẩm, test, docs, Git hoặc tạo reviewer khác. Kết luận trên là review học thử trong phạm vi kiểm tĩnh, không thay bằng chứng kiểm kỹ thuật và không tạo quyền push/deploy.

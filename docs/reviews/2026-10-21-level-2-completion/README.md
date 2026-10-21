# Review và hoàn thiện bài 2.3–2.9

Ngày 21/10/2026, theo yêu cầu review trên nhánh riêng rồi đưa vào `main`. Nhánh thực hiện: `codex/review-lessons-2-3-2-9`, tạo từ `origin/main` tại `da5ead5`; thu thập bảy commit nối tiếp tới `d70da7c`, giữ nguyên lịch sử các nhánh tác giả.

Mỗi bài có một reviewer Codex mới, không mang lịch sử viết và kế thừa model của phiên, không truyền model override. Reviewer học từ bài/bài trước/hồ sơ công ty, không dùng seed hoặc database. Người thực hiện xác minh các nhận xét bằng seed, SQL Server thật và tài liệu Microsoft trước khi sửa.

| Bài | Report gốc của lượt này | Xử lý chính |
|---|---|---|
| 2.3 | [AND/OR/IN/BETWEEN/LIKE](review-bai-2-3-and-or-in-between-like.md) | Bỏ câu loại `NV002` lặp; đổi bài tập `_` sang họ tên có độ dài khác nhau. |
| 2.4 | [ORDER BY/TOP](review-bai-2-4-sap-xep-va-top.md) | Thay câu lặp bằng ví dụ giả định `A02`/`A03`, giải thích khóa phụ tại ranh giới `TOP`. |
| 2.5 | [NULL](review-bai-2-5-null-o-trong.md) | Rút dẫn bài sau, gộp đoạn trả lời; đổi phạm vi bài tập email từ `KT` sang `KD` để có cả email thiếu và có giá trị. |
| 2.6 | [DISTINCT](review-bai-2-6-distinct-bo-dong-trung.md) | Giữ nội dung; không thấy lỗi bắt buộc sửa. Xác minh cả ba bài phát hiện bỏ `DISTINCT`. |
| 2.7 | [Chuỗi/Unicode](review-bai-2-7-ham-chuoi-tieng-viet.md) | Highlight `IT`; thêm hai câu tự kiểm `TRIM`/Unicode; đổi mẫu tìm sang `ho%` và bài nhãn email sang chữ hoa. |
| 2.8 | [Ngày](review-bai-2-8-ham-ngay-tham-nien.md) | Chốt lại Key, giải nghĩa UTC, bổ sung đầu trên mở cho cột có giờ, bỏ thuật ngữ `index` ngoài mục tiêu. |
| 2.9 | [CASE](review-bai-2-9-case-when-ham-if.md) | Làm rõ dòng phải qua `WHERE` trước khi xử lý `NULL`; bài tập 2 dùng ngày `2026-08-14` để kiểm đúng ngày kỷ niệm của `NV038`. |

[Review tích hợp cuối](review-integration.md) được giao cho một agent mới khác, không đọc spec/plan/report cũ. Agent học trọn 2.9 và rà diff sửa sau thu thập của các bài còn lại; không phát hiện lỗi cần sửa. Reviewer 2.9 đầu tiên ghi rõ đã nhìn thấy vài dòng lịch sử sửa khi tra quyết định trong spec; lượt tích hợp độc lập không có giới hạn này.

## Kiểm chứng

- `npm test`: **258/258**, 35 file. Ba regression mới đã ghi nhận RED trước sửa; bảo vệ trường hợp phân biệt `_`/`%`, lọc email và ngày kỷ niệm. Test 2.7 được đổi kỳ vọng và chạy RED trước khi sửa đề.
- `npm run check`: **0 lỗi, 0 warning**, còn 3 hint deprecation có sẵn. `npm run build`: **90 trang**. `npm run check:dist`: **1.561 liên kết**, không lộ đáp án.
- API build/typecheck đạt; `check:exercises` chạy đủ **36/36** đáp án trên SQL Server thật. Các câu ghi có sẵn chỉ qua runner luôn hoàn tác; `check:data` sau đó báo **Không bảng nào lệch**.
- Bộ kiểm riêng chạy **44 truy vấn SELECT khác nhau**, đối chiếu toàn bộ `Sql` chạy được, 17 khối `Result`, 28 bước `RunFlow` của bảy bài: cột, giá trị, tổng dòng và thứ tự khi có `ORDER BY` đều khớp. Bảy hình Excel, **73 ô dữ liệu**, khớp dữ liệu live và phép tính minh họa.
- Kiểm qua `handleGrade` với SQL Server thật: ba đề cũ không phân biệt được bỏ bước đã được xác nhận; đề mới phân biệt `_`/`%` (**2/42 dòng**), bỏ `IS NOT NULL` (**13/14**), bỏ `UPPER` (khác nhãn), bỏ `COLLATE` (**2/1**). Ba bài DISTINCT phân biệt bỏ `DISTINCT` (**6/48, 7/15, 2/3**). CASE dùng `<` thay `<=` bị chấm sai tại `NV038`; lời giải đúng vẫn có **14** hồ sơ và đủ ba nhóm.
- Kiểm riêng cột có giờ: giữ cả đầu ngày và cuối ngày `2026-11-20`, loại đúng `00:00` ngày `2026-11-21`. Ví dụ giả định xử lý ngày thiếu và khóa phụ `TOP` cũng chạy SELECT, không ghi nguồn.
- Browser bản build: bảy bài ở **1280px/1440px**, không tràn trang; mục lục, hình Excel, bảng, code/highlight và công thức dài đọc được. Bảy RunFlow mở bằng Enter, đổi bước bằng mũi tên, Escape đóng và trả focus. Hai câu tự kiểm 2.7 mở bằng Enter/Space; link bài tập, Tab trong editor và sơ đồ database hoạt động bằng bàn phím.

Lỗi nền đầu lượt: test 2.8 so chuỗi SQL có CRLF với literal JavaScript đã chuẩn hóa LF, làm 254/255 test đạt dù build thành công. Sửa riêng cách đọc fixture của test để chuẩn hóa xuống dòng; giữ nguyên SQL/flow và toàn bộ assertion. Bản cuối không còn test thất bại.

## Quyết định giữ và giới hạn

- Giữ ba bài tập đại diện của 2.6; không thêm câu tự kiểm tùy chọn chỉ để lặp lại giải thích đã có về `MaNV`. Các bài DISTINCT vẫn không chứng minh người học hiểu mọi biến thể lọc khi biến thể đó tình cờ cho cùng kết quả.
- Không đổi seed, component, API, frontmatter schema, giao diện chung hoặc quy ước đã duyệt. Bộ chấm tiếp tục so kết quả, nhận SQL tương đương; không chấm tên cột hoặc cưỡng chế từ khóa. Kiểm `ORDER BY` qua kết quả không chứng minh câu nộp luôn có mệnh đề đó.
- Hình Excel là mô phỏng; phép tính đã đối chiếu nhưng không điều khiển Excel thật. Browser kiểm thực hiện trên bản build local; CI và web sau nhập `main` được ghi riêng trong nhật ký tích hợp.
- Evidence local ở `temp/verification/2026-10-21-level-2-review/`, không chứa cấu hình kết nối trong tài liệu bàn giao. Các giới hạn SQL/browser của lượt viết trước được bổ sung bằng bằng chứng mới này; không sửa lại kết quả lịch sử thành “đã đạt”.

Tài liệu chính đã đối chiếu: Microsoft Learn về [LIKE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql), [TOP](https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql), [ISNULL](https://learn.microsoft.com/en-us/sql/t-sql/functions/isnull-transact-sql), [TRIM](https://learn.microsoft.com/en-us/sql/t-sql/functions/trim-transact-sql), [GETDATE](https://learn.microsoft.com/en-us/sql/t-sql/functions/getdate-transact-sql), [DATEADD](https://learn.microsoft.com/en-us/sql/t-sql/functions/dateadd-transact-sql), [DATEDIFF](https://learn.microsoft.com/en-us/sql/t-sql/functions/datediff-transact-sql) và [CASE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/case-transact-sql).

## Nhật ký tích hợp

Nhánh review đã push tại `b4500fd`. Local `main` cập nhật từ `origin/main` bằng fast-forward rồi merge không force tại `05a4a48`; cây tệp sau merge giống hệt nhánh review và kiểm lại đạt 258/258 test. Theo yêu cầu người làm khóa học, phát hành main với cả lịch sử bảy bài và bản sửa review. Trạng thái web/API được đối chiếu theo commit main tại [GitHub Actions](https://github.com/nhatlam1111/microsoft-sql-lession/actions); kết quả local nêu trên không tự chứng nhận CI thành công.

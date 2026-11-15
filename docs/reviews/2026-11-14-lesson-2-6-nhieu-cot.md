# Review độc lập bài 2.6 — nhiều cột

Phạm vi: đọc source bài, toàn bộ thuộc tính các khối/drawer, prompt ba đề được trích bằng lệnh được giao, các tiền đề trực tiếp và hồ sơ công ty. Bản được giao là HEAD `4554561` cùng diff local. Reviewer được cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; không có bằng chứng trong lượt này để xác minh model thực tế.

## Nhận xét

**Biên tập — bảng nguồn chưa nói thứ tự có thể khác.** Ở `2-6-distinct-bo-dong-trung.mdx:63–64`, drawer FROM ghi “Hình trích năm hồ sơ” cho câu không có `ORDER BY`, nhưng không nói thứ tự không được bảo đảm. Người mới có thể hiểu năm dòng được hiển thị là thứ tự cố định khi chạy; bước SELECT sau đó có nói “theo thứ tự minh họa”, nhưng lời đó không hiện trong drawer FROM. Đề xuất bổ sung ngay tại mô tả bảng nguồn rằng thứ tự có thể khác khi chạy.

Không thấy lỗi có căn cứ về cơ chế hoặc thiếu tiền đề của ba đề trong phạm vi source đã đọc.

## Phần giữ được

- Phần bắt buộc đặt cách viết và đối tượng so trước SQL; giải thích `DISTINCT` so toàn bộ cột được chọn và không sửa bảng nguồn. Ví dụ `NV003`/`NV013` cùng cả hai mã so với `NV002` chỉ cùng mã phòng giúp phân biệt hai trường hợp.
- Câu chính xét toàn bảng, sắp hai tiêu chí; phần tóm tắt nối hồ sơ với kết quả và trả lời đúng phạm vi. Bảng kết quả trích tám dòng và nêu tổng 19; không trình bày tám dòng là toàn bộ danh sách.
- Phần vận dụng nối được `WHERE` trước chọn cột và bỏ trùng, chỉ chọn một cột, sắp theo hướng yêu cầu và nhận biết `NULL`. Cảnh báo thêm `MaNV` gắn với khóa chính đã học, giải thích vì sao cặp không còn gộp.
- Drawer có dữ liệu đầu vào để lần hai dòng trùng và một cặp khác; bước sắp giải thích tiêu chí phụ. SQL đầy đủ, sơ đồ, tóm tắt, kết quả và câu trả lời nằm đúng mạch.

## Tiền đề và cách tiếp cận từng đề

Đã tự xác định cách làm từ prompt và bài học trước, không mở đáp án; không chép câu đáp án.

| Đề | Cách tiếp cận từ đề | Tiền đề đã có | Đánh giá |
|---|---|---|---|
| 2-6-1 | Xét toàn bảng, chọn riêng mã chức danh, bỏ trùng rồi sắp tăng. | Chọn cột/bảng ở 2.1; `DISTINCT` một cột và sắp ở 2.6:134, 138; hướng tăng ở 2.4. | Đủ. |
| 2-6-2 | Lọc hai mã phòng, chọn đúng cặp theo thứ tự đề, bỏ trùng cả cặp và sắp theo hai tiêu chí. | `WHERE` ở 2.2, `IN` ở 2.3; cặp và thứ tự xử lý ở 2.6:42–52, 136; tiêu chí phụ ở 2.4 và ví dụ 2.6:103–106. | Đủ. |
| 2-6-3 | Lọc hồ sơ đã có ngày nghỉ, chỉ trả mã phòng không trùng và sắp giảm. | `IS NOT NULL` ở 2.5:43; lọc trước so trùng và không cần trả cột lọc ở 2.6:136; một cột và `DESC` ở 2.6:134, 138; sắp giảm ở 2.4. | Đủ. |

## Giới hạn

Chỉ review source; không đọc HTML, không tương tác UI/drawer/copy, không chạy SQL/API, không xem answer, fixtures, seed hay report cũ. Số liệu SQL live, khóa chính và thứ tự tám dòng được giao là bằng chứng tác giả, chưa được reviewer xác minh độc lập; đối chiếu hồ sơ công ty chỉ xác nhận sự nhất quán với tài liệu đó. Không suy từ source rằng UI hay kiểm kỹ thuật đã đạt; không kết luận quyền push/deploy.

# Review bài 3.10 — pilot biên tập

**Phạm vi:** source HEAD `4066c0f3e589c7b34a02106702aa1351cc3ade23` và diff bài 3.10 hiện tại; toàn bài, YAML, các tiền đề 2.5, 3.1, 3.9 và tài liệu quy định được giao. Đọc HTML tĩnh build lúc 22:12 ngày 13/11/2026, gồm nội dung các drawer; không dùng browser, SQL, API hoặc web. Cấu hình giao reviewer: `gpt-6.1-terra`, effort `high`, `fork_turns: none`; không có bằng chứng độc lập để xác minh model thực tế.

## Findings

Không thấy finding có căn cứ trong phạm vi lời giảng và giải thích drawer được giao. `COUNT(MaHD)` được nối với điều kiện khóa chính để giải thích vì sao đếm mã bằng đếm dòng; trường hợp không khớp được phân biệt rõ với câu con không trả dòng. Phần đặt điều kiện giải thích được vì sao lọc hợp đồng trong câu con vẫn giữ danh sách ngoài. HTML tĩnh có các lời sửa chính và hai ví dụ NV021/NV047 trong drawer SELECT.

## Tiền đề từng đề và tự kiểm

| Mục | Cách làm hoặc lý do có thể tự suy ra trước đáp án | Tiền đề |
|---|---|---|
| 3.10-1 | Giữ hồ sơ ở câu ngoài, đếm các đơn cùng mã và trạng thái trong câu con; sắp mã. | Mẫu tương quan và vị trí điều kiện ở 3.10; `COUNT(*)` ở 3.1; chuỗi Unicode, lọc và sắp xếp đã học. Đủ. |
| 3.10-2 | Cộng `SoNgay` trong câu con theo mã, trạng thái và hai mốc ngày; giữ `NULL` khi không khớp. | `SUM` và khoảng ngày ở 3.1; liên hệ, phạm vi rỗng ở 3.10. Đủ. |
| 3.10-3 | Lấy `MAX(NgayBatDau)` trong câu con theo mã và giới hạn ngày; giữ `NULL` khi không khớp. | `MAX` trên ngày ở 3.1; liên hệ và phạm vi rỗng ở 3.10. Đủ. |
| Tự kiểm 1 | Một ô cần một cột và tối đa một dòng; `IN` đối chiếu danh sách nhiều dòng. | 3.10 và 3.9. Đủ. |
| Tự kiểm 2 | `COUNT` không `GROUP BY` trả dòng tổng hợp bằng 0; câu lấy mã trực tiếp không có dòng mới cho `NULL`. | Giảng chính 3.10 và 3.1. Đủ. |
| Tự kiểm 3 | Không nhất thiết lỗi: phép đếm vẫn trả một dòng nhưng đếm toàn bộ hợp đồng. | Hay nhầm 3 và giảng chính. Đủ. |
| Tự kiểm 4 | Đổi sang `SUM` trên cột số, giữ liên hệ; không có dòng thì `NULL`. | 3.10 và 3.1. Đủ. |

## Giữ được và giới hạn

Ví dụ hai hồ sơ lần được từ các hợp đồng cùng mã tới ô kết quả; ví dụ rỗng không tạo dòng hợp đồng giả. Bài phân biệt số hợp đồng đang lưu với hiệu lực và thứ tự logic với thực thi vật lý. Các kết quả và thông báo lỗi được đọc như nội dung bài, chưa xác minh bằng SQL; chưa kiểm hoạt động, bố cục hay khả năng truy cập bằng UI/browser. HTML tĩnh không chứng minh chạy tương tác hoặc bộ chấm đúng. Không đánh giá dữ liệu nguồn độc lập hay cấp quyền push/deploy.

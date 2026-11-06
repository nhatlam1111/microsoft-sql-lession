# Review độc lập bài 3.10 — subquery trong SELECT

## Phạm vi và cách kiểm

Agent được giao `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; công cụ giao việc ghi cấu hình đó, tôi không có bằng chứng độc lập về model thực tế. Học như người mới chỉ biết Excel văn phòng cơ bản, đọc quy ước, template, hồ sơ công ty, bài mẫu 2.1 và các bài 2.3, 2.5, 3.1, 3.5, 3.9 theo gói. Nguồn 3.10 ở checkout chưa commit, base `e0b419d6bdf0f932be9fbaf43395d0b1ad975800`. SHA-256 MDX `a72bec72ed9882c22502fc5fc2edee523faf6a30f0d27a3cd351a8a3034b39ad`, HTML build `acba5cbc83397a68a4b4aa9ca3e6e25e054c0f7ad7d6c2bc3784affb438316fc`: tự đối chiếu khớp gói build 04/11/2026 20:56. Đọc HTML tĩnh, không tương tác browser.

Đọc đề tách không đáp án và khóa [bảng tiền đề](locked-prerequisites-3-10.md) trước, sau đó mới đọc YAML được giao. Không đọc report khác, seed, secret, database hay SQL ngoài khóa; không chạy SQL, API, runner, kiểm chấm hoặc nộp bài. Các khẳng định về kết quả SQL, dữ liệu, thông báo lỗi và quyền thao tác chưa được tôi xác minh live.

## Nhận xét theo thứ tự bài

1. **Cần làm rõ — công thức Excel khi sao chép xuống.** MDX dòng 34–36: công thức `=COUNTIF(HopDong!B2:B56,A2)` dùng vùng tương đối. Nếu người học kéo công thức xuống để tính cả danh sách, vùng hợp đồng cũng dịch theo và có thể bỏ sót các mã ở đầu vùng; ví dụ ở `C3` không nói cách giữ nguyên vùng. Đề xuất cố định vùng hợp đồng bằng tham chiếu tuyệt đối và giữ `A2` tương đối, kèm một vế ngắn giải thích khi sao chép. Tôi chưa thao tác Excel thật; nhận xét nhằm vào cách áp dụng công thức, không kết luận giá trị minh họa `C3` đang sai.

2. **Giữ được — chuyển ý và phạm vi.** Tình huống nói rõ mọi hồ sơ, đếm hợp đồng đang lưu, không kết luận hiệu lực; hình Excel được gọi là minh họa trích. Từ câu 3.9 lọc hồ sơ sang câu con trong danh sách chọn để giữ mọi hồ sơ là chuyển ý có lý do. Câu ngoài, câu con, tương quan, giới hạn một cột/tối đa một dòng và sự khác nhau giữa không có dòng với dòng tổng hợp `COUNT = 0` được giải thích trước phần ôn.

3. **Giữ được — vì sao đếm mã hợp đồng tương ứng số dòng trong ví dụ.** Bài chính dùng `COUNT(hd.MaHD)` (dòng 46); bài 3.1 đã phân biệt đếm cột với đếm dòng, bài 3.5 nói `MaHD` là khóa chính không nhận `NULL` trên hợp đồng thật. Người học có căn cứ từ bài trước, dù cần nối lại hai ý. Một vế nhắc `MaHD` không `NULL` có thể giúp đọc nhanh hơn nhưng không coi là thiếu kiến thức bắt buộc.

4. **Giữ được — sơ đồ và kết quả.** Đầu vào `FROM` có 48 dòng/12 cột; `SELECT` hiện mã, tên từ bước trước, có thêm ví dụ riêng về toàn bộ hợp đồng của `NV021` và trường hợp rỗng của `NV047`, kết quả 48 dòng/3 cột; `ORDER BY` nhận ba cột từ bước trước và vẫn 48 dòng. Bảng kết quả cuối được nói rõ là trích; câu trả lời ngay sau bảng phân biệt số hợp đồng đang lưu với hiệu lực. Các số liệu chỉ được đối chiếu nội bộ trong nguồn/HTML, chưa kiểm database.

5. **Giữ được — lỗi và ranh giới.** Phần Hay nhầm nêu cả lỗi nhiều dòng, nhiều cột và câu chạy nhưng đếm sai do bỏ liên hệ; phân biệt việc `TOP`/`MAX` tạo một giá trị với việc trả đúng số hợp đồng. Giới hạn tối ưu thực thi không bị hứa quá. Các thông báo là nội dung trong bài, tôi chưa tái hiện lỗi.

6. **Giữ được — ứng dụng và tự kiểm tra.** Các ứng dụng gắn với giữ danh sách, tính trong phạm vi, đọc lỗi; bốn câu tự kiểm tra nằm sau Ghi nhớ, trước Bài tập và bao phủ tương quan, vô hướng, `NULL`/0, `SUM`. Kiến thức trả lời đã xuất hiện ở phần chính. Lời giảng và phần ôn có nhắc lại nhưng chưa thấy đoạn dài nên cắt; phần nhắc trong ghi nhớ/tự kiểm tra là ôn tập.

## Tiền đề từng đề và đối chiếu đáp án

Bảng trước khi mở đáp án giữ nguyên trong file đã khóa. Đối chiếu sau đây dựa trên cấu trúc YAML, không chép toàn bộ câu và không chạy SQL:

| Đề | Đối chiếu đáp án với yêu cầu và kiến thức | Kết luận |
|---|---|---|
| 3-10-1 | Câu ngoài giữ hồ sơ và sắp mã; câu con liên hệ mã, lọc đúng trạng thái, tổng hợp và không giới hạn ngày. Đáp án dùng `COUNT(dp.MaDon)` thay cho `COUNT(*)` mà bảng tiền đề chọn theo yêu cầu đếm dòng. Bài 3.1 nói rõ phép đếm cột bỏ `NULL`; trong tài liệu đã đọc tôi chưa thấy chứng cứ riêng rằng `MaDon` không thể `NULL`. | **Cần xác minh**, không kết luận đáp án sai: tác giả kiểm ràng buộc `MaDon` và kết quả; cân nhắc `COUNT(*)` để thể hiện trực tiếp yêu cầu đếm dòng, tránh cần giả định cột. Kiến thức làm đề bằng `COUNT(*)` đã được dạy. |
| 3-10-2 | Câu con dùng `SUM`, điều kiện cùng mã, trạng thái và hai mốc; không thay `NULL`; câu ngoài giữ danh sách và sắp mã. Các thành phần đều được dạy tại 3.1 và 3.10 như bảng đã khóa. | **Giữ được về ý định và tiền đề**; chưa chạy để xác minh kết quả. |
| 3-10-3 | Câu con dùng `MAX` trên ngày, liên hệ mã và lấy cả mốc ngày đề cho; không xét loại hoặc ngày kết thúc; không đổi `NULL`. Bài 3.1 đã nói `MAX` áp dụng cho ngày, bài 3.10 chuyển phép tổng hợp vào câu con theo từng hồ sơ. | **Giữ được về ý định và tiền đề**; chưa kiểm kiểu cột hoặc chạy kết quả. |

## Các câu hỏi tự đặt và mức trả lời

- Vì sao đặt câu con trong `SELECT`? Phần chuyển từ Excel sang SQL và định nghĩa câu ngoài/câu con trả lời: cần thêm một giá trị mà vẫn giữ hồ sơ.
- Vì sao cần liên hệ mã? `LineMap` và Hay nhầm 3 chỉ ra việc thiếu liên hệ đếm toàn bộ hợp đồng cho từng hồ sơ.
- Vì sao người không có hợp đồng nhận 0 mà không phải `NULL`? Phần ngay sau định nghĩa vô hướng giải thích dòng tổng hợp `COUNT` không `GROUP BY`; đối chiếu với câu lấy mã trực tiếp không có dòng.
- Vì sao không dùng `TOP` để hết lỗi? Hay nhầm 4 nói nó chọn một dòng chứ không tính số hợp đồng và cần quy tắc thứ tự khi chọn.
- Muốn tính tổng hoặc ngày lớn nhất theo phạm vi thì làm thế nào? Phần cuối tiểu mục đầu chỉ `SUM`/`MAX`, điều kiện liên quan trong câu con, và dẫn kiến thức tổng hợp bài 3.1; đề 2 và 3 đủ tiền đề để tự chuyển sang bảng/cột được nêu trong đề.

## Ưu tiên và giới hạn

Ưu tiên sửa công thức Excel nếu hình được dùng làm mẫu sao chép cho cả danh sách; kiểm giả định `MaDon` ở đáp án 3-10-1 trước khi kết luận đúng hay sai. Ba đề có đủ kiến thức cốt lõi để tự chọn cách làm từ bài và bài trước; điều này không chứng minh mọi học viên chắc chắn làm được hoặc bộ chấm sẽ nhận mọi cách tương đương.

Không có viewport, thao tác mở drawer, bàn phím, copy/paste, SSMS hay đường đăng nhập/thực hành được thử; đọc HTML tĩnh không xác nhận các hành vi đó. HTML cho thấy nội dung và các bước được xuất ra, không xác nhận giao diện đang hiển thị hay focus thực tế. Chưa kiểm SQL live, tính đúng số liệu, kiểu/ràng buộc `MaDon`, chấm bài hoặc tính chính xác nguyên văn lỗi so với server.

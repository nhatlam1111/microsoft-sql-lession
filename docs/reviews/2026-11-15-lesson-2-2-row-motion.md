# Review độc lập — chuyển động bài 2.2

Ngày 15/11/2026. Phạm vi: working tree chưa commit; bài MDX, YAML, nguồn dựng, manifest, ảnh tĩnh và hai ảnh ghép được giao. Vai trò/cấu hình được giao: gpt-6.1-terra, high, ngữ cảnh mới; công cụ trong lượt này không cung cấp bằng chứng xác minh model thực tế.

## Finding

Không tìm thấy lỗi có căn cứ trong phạm vi chuyển động và nội dung đã đối chiếu. Không suy ra SQL live, HTML hay UI đã đạt từ kết quả này.

## Tiền đề từng đề

| Đề | Cách xác định và tiền đề trong phần bắt buộc | Đánh giá |
|---|---|---|
| 2-2-1 | Chọn ba cột theo thứ tự bằng SELECT/FROM (2.1); so MaPB với mã KT bằng WHERE và `=` (2.2, Cấu trúc mới). Không thêm điều kiện trạng thái/ngày. | Đủ tiền đề; phạm vi và thứ tự dòng rõ. |
| 2-2-2 | Chọn bốn cột bằng SELECT/FROM (2.1); so TrangThai với giá trị tiếng Việt dùng N (2.2, Vận dụng; Unicode ở 1.3). Không lọc ngày nghỉ. | Đủ tiền đề. |
| 2-2-3 | Chọn ba cột bằng SELECT/FROM (2.1); dùng `>=` gồm mốc, viết ngày yyyymmdd trong nháy và không đặt mốc cuối (2.2, Vận dụng; date/chuyển kiểu ở 1.3). | Đủ tiền đề. |

Giới hạn quan trọng: lệnh đọc YAML đã hiển thị cả `answer` cùng đề, trước khi tôi ghi riêng cách làm. Vì vậy không thể nhận đã tự xác định cách làm từng đề trước khi xem đáp án theo yêu cầu; bảng trên là đối chiếu tiền đề sau khi đã thấy đáp án. Cần một lượt kiểm độc lập đúng trình tự nếu điều kiện này bắt buộc để nghiệm thu.

## Phần giữ được và bằng chứng

- Bài giải thích điều kiện trước SQL đầy đủ, đặt minh họa cạnh SQL, sau đó nêu nguyên nhân NV001 bị loại và NV020 được giữ, kết quả trích và câu trả lời cho chị Hạnh. Phân biệt thứ tự logic với cách thực thi. Phạm vi 14 hồ sơ có mã KD và việc chưa yêu cầu thứ tự được nêu rõ.
- Nguồn dựng lấy dữ liệu từ steps và kiểm quan hệ các dòng, tổng và cột. Manifest ghi rõ phần trích và alt cho từng cảnh. Hash bốn PNG và GIF thực tế khớp manifest.
- Ảnh ghép được giao cho thấy bản sao NV002, NV003, NV020 lần lượt chuyển sang bảng phải; NV001 nằm bên trái và không tới bảng phải. Bảng sau WHERE hiển thị trích 3/14 dòng, 5/12 cột, có GioiTinh; chú thích nêu đủ 12 cột và NV020 đã nghỉ vẫn được giữ. Ảnh SELECT cho thấy cùng ba dòng, bốn tiêu đề tiếng Việt và GioiTinh bị thu; thông báo giữ 14 dòng. Ảnh 720 px được giao đọc được khi xem ở kích thước cung cấp. Đây là nhận xét từ các khung hình và ảnh tĩnh, không phải thử phát hoặc tương tác trong trình duyệt.
- Script kiểm browser có các phép kiểm cho phát/dừng, bàn phím, giảm chuyển động, không JavaScript, lỗi tải và màn hẹp; riêng kiểm màn hẹp ghi nhận có thể shell toàn trang không vừa rồi tách component để kiểm. Chỉ đọc script, chưa chạy và chưa xác nhận kết quả hay độ đọc được thực tế của bảng trên màn hẹp.

## Phiên bản và giới hạn

SHA-256 tại lúc đọc: MDX `2baece33603aaec1ddc8ee0aedba065282725d5af4bc4d469c31fc79296b8609`; YAML `ea6d87c86445a15fed27ddec81609f5ae41adc81de92b81c62d588fb40578be0`; nguồn dựng `15a1e12d39b6930b222968dd1c4e4449005b9a749429bae0bc866fbd6f774954`; GIF `2a95c1a716788b97fc7f81c5a734fae0696823d603159464057a55753b647eb6`; manifest `c704d124cda9f38e4fb0daec523ad5cbb118699d47860d0e20a369ffb1a738a9`. Ảnh ghép và ảnh 720 được giao lần lượt có hash `b5e6cb78ac8eff43e3cc05997315b6bb8c1f763ef77cbb8b53e097abc08457513`, `b7554eef3f2b8f83a99647d0d787141002415379182865c9bb91e3ec8d9f8b63`; chưa tự xác minh quá trình tạo hai ảnh đó từ GIF. Không chạy SQL/API, build hay browser, không kiểm HTML; không xác minh dữ liệu 48/14/13/1 trên database, tốc độ đọc thực tế, kích thước màn hẹp hoặc các trạng thái tương tác. Hash không chứng minh ảnh ghép tương ứng GIF nếu thiếu bằng chứng giải mã.

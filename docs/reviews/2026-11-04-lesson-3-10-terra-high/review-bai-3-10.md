# Review độc lập bài 3.10

## Phạm vi, phiên bản, phương pháp

Học thử như người mới chỉ có Excel văn phòng cơ bản, theo bốn dòng vai trò trong gói giao việc. Source là MDX/YAML chưa commit trên base `e0b419d6bdf0f932be9fbaf43395d0b1ad975800`. SHA-256 tự tính của MDX `98c486656bc5987e9e45446f803693818ca83398607512faeb57e66180dec066`, YAML `767ced88232a6105594ba7b260392df171e286d9e8ba73706b4f0014f24cb518`, HTML snapshot `8dd37c0e7cfa2d7be43f5499ec6aaa6718586a1ca3addd94c27301332c784665`; cả ba khớp manifest `source-build-before-review.json`. Manifest ghi build lúc 20:14:45; tôi không tự chạy build.

Đọc đề trước đáp án, khóa phân tích tại `locked-prerequisites.md`, sau đó mới mở YAML; bảng khóa được giữ nguyên. Đã đọc nguồn bài, các bước và ví dụ trong `RunFlow`, đối chiếu nội dung HTML bằng parser, tìm cách CSS trình bày các mảnh highlight. Cấu hình giao là GPT-6.1 Terra/high trong ngữ cảnh mới; công cụ không cung cấp bằng chứng xác nhận runtime model thực tế.

## Rà theo thứ tự bài

- **Giữ được — tình huống và phạm vi.** “Mỗi phòng một dòng” và “nhóm theo `MaPB` hiện lưu” cho biết đơn vị nhóm và không nhầm với lịch sử. Chỉ lấy hồ sơ đang làm; tại sao cần nhiều chỉ tiêu trên một dòng đã được chị Hạnh nêu. Không suy diễn số này phản ánh mốc quá khứ.
- **Giữ được — Excel sang SQL.** Hình `COUNTIFS` là minh họa bốn hồ sơ, các cờ cộng thành 2; công thức dùng đồng thời phòng và giới tính. Chuyển sang `SUM` cộng cờ, `CASE` gán cờ và `GROUP BY` chia phòng là mạch hiểu được. `LineMap` nối từng mệnh đề với ví dụ cụ thể. Các dẫn chứng được đánh dấu chọn lọc; ứng dụng nói việc làm được nhờ chủ đề.
- **Giữ được — điều kiện chung và điều kiện riêng.** Phần “`WHERE` chọn phạm vi chung, `CASE` chọn phần đóng góp” giải thích vì sao không lọc một giới ở `WHERE`, và vì sao không thêm giới vào `GROUP BY`. Ví dụ đối chiếu `COUNT` không có `ELSE` với `ELSE 0` trả lời được vì sao số 0 vẫn bị đếm. Cầu nối `SUMIFS`/cộng cột số nằm trước phần ôn, đủ hướng để chuyển sang đề tiền lương.
- **Giữ được — ranh giới.** Đoạn `ELSE 0` không tự sinh nhóm thiếu và phần trả lời sau kết quả phân biệt dữ liệu hai nhãn trong bộ mẫu với nguồn có nhãn khác hoặc thiếu. Tại sao hai cột có thể không cộng bằng tổng trong nguồn khác đã được trả lời; không hứa thay người làm nghiệp vụ phân loại.
- **Giữ được — sơ đồ.** `FROM`: đầu vào là bảng nguồn, trích 5 trong 48 hồ sơ; `WHERE`: đầu vào hiển thị mã, phòng và trạng thái, đủ soi 5 mã, trong đó `NV020` bị loại; 45 hồ sơ còn lại. `GROUP BY`: đầu vào có mã, phòng, giới; sáu dòng kích thước nhóm được ghi là minh họa, không coi như mất các thành viên. `SELECT`: bảng đầu vào chỉ trích nhóm và kích thước, nhưng hai ví dụ đủ thành viên `BGD`/`NS` bắc cầu từ giới tính qua cờ đến từng ô; 6 dòng, 4 cột. `ORDER BY` nhận bốn cột, giữ sáu dòng và xếp mã; thẻ/đầu vào trích năm dòng không phải tổng thật. Đây là kiểm nối dữ liệu trên nguồn/HTML, không xác nhận số liệu trong database.
- **Giữ được — kết quả và kết bài.** Câu trả lời cho chị Hạnh đặt ngay sau `Result`, nêu 45 hồ sơ, 22 nam, 23 nữ, và nhóm `KT` có 0 nam. Bốn câu tự kiểm tra sau Ghi nhớ và trước Bài tập bao quát phạm vi/nhóm, `COUNT`–`NULL`, cộng giá trị và nhóm thiếu; lời giải nằm trước phần ôn. Những ý trong Ghi nhớ và tự kiểm tra là nhắc lại có chủ đích. Có lặp giữa giải thích `WHERE`/`GROUP BY` và Hay nhầm 1, 3, nhưng tại Hay nhầm chúng nêu lỗi và hậu quả ngắn, chưa thấy cần cắt để người mới khỏi mất cảnh báo.
- **Giữ được có giới hạn — HTML.** Snapshot chứa hai khối SQL với nháy thẳng và tab thật; năm highlight lần lượt là `FROM`, `WHERE`, `GROUP BY`, `SELECT`, `ORDER BY` khớp câu nguồn. HTML tách phần trước/focus/sau thành các phần tử; CSS khai báo chúng dạng block, do đó chuỗi text gộp qua parser không giữ dấu xuống dòng tại ranh giới không đủ để kết luận hiển thị bị dính. Không thấy căn cứ từ kiểm tĩnh để kết luận lỗi render hay ký tự escape lộ ra. Chưa kiểm trực quan, kích thước tab trên màn hình hoặc tương tác.

## Đối chiếu đề với đáp án sau khi khóa tiền đề

| Đề | Kết quả đối chiếu |
|---|---|
| 3-10-1 | **Giữ được.** Đáp án áp dụng cờ theo hai trạng thái trên toàn bộ hồ sơ, đếm tổng mỗi phòng và sắp mã; phù hợp các tiền đề đã khóa. Không cần mang `WHERE` đang làm từ ví dụ vào. |
| 3-10-2 | **Giữ được.** Đáp án giới hạn kỳ ở phạm vi chung, đếm mọi dòng rồi cộng `ThucLinh` theo ngưỡng riêng, phù hợp cầu nối đã dạy và phân tích khóa. Chuyển từ tình huống giới tính sang tiền là vận dụng, không phải kiến thức chưa giảng. |
| 3-10-3 | **Giữ được.** Đáp án dùng hai kiểm tra `NULL` trong các biểu thức đếm bỏ `ELSE`, giới hạn ba phòng và không lọc trạng thái; phù hợp các mảnh ở 2.3, 2.5 và 3.10. Chuỗi rỗng khác `NULL` đã được dạy ở 2.5. |

Các nhận xét này là đối chiếu tĩnh, không xác nhận bộ chấm hoặc kết quả chạy. Bảng chi tiết kiến thức cần/đã dạy/khó tìm trước đáp án ở `locked-prerequisites.md`.

## Ưu tiên và giới hạn

Không có finding cần sửa hoặc làm rõ được chứng minh trong phạm vi kiểm này; không đề xuất thêm nội dung chỉ để đủ finding. Các đề có đủ tiền đề để vận dụng theo tài liệu đã xét, nhưng đây không phải bảo đảm mọi học viên sẽ tự làm được.

Chưa xác minh SQL thực thi, kết quả thật, trạng thái dữ liệu, runner/API hay tính đúng của bộ chấm. Không dùng browser, không thử drawer, viewport, bàn phím, sao chép/dán hoặc SSMS. Không chạy test/build và không dựa vào kết quả kiểm của tác giả như kết quả do reviewer tự thực hiện. Không đọc database, seed, secret, report khác hoặc evidence tác giả; không sửa sản phẩm/Git. Mọi số lượng trong bài được đối chiếu nội bộ giữa các khối, chưa đối chiếu database.

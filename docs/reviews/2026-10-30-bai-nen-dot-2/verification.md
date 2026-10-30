# Đợt 2 năm bài nền: hồ sơ xử lý review từng bài

Đợt 2 của [thiết kế năm bài nền](../../superpowers/specs/2026-10-30-level-1-foundation-lessons-design.md), ngày 30/10/2026. Các report trong thư mục này giữ nguyên byte so với `temp/review/2026-10-30-bai-nen-dot-2/`.

Bốn reviewer là agent mới, Claude Sonnet, effort high, đọc commit `2cc3293` và build 17:28, chỉ đọc nguồn và HTML. Reviewer bài 1.3 bị ngắt vì hết hạn mức sau khi đã ghi report; khi có lại hạn mức, đúng agent đó xác nhận report đủ phần, không review lại. Bản sau khi sửa ở commit `9176c0a`, chưa có reviewer từng bài đọc lại; review tích hợp đọc bản này.

## Bài 1.2 Bảng, dòng và cột

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 hai nghĩa "loại thông tin" | Làm theo | Hai gạch đầu dòng kề nhau dùng cùng cụm | Bảng là một loại đối tượng, cột là một chi tiết của mọi dòng; đổi tiêu đề tiểu mục |
| F2 dòng chỉ là hồ sơ | Làm theo | Phần sau nói về dòng hợp đồng | Dòng là một đối tượng của bảng, có ví dụ hai bảng |
| F3 hình chỉ nói trích cột | Làm theo | Database có 12 cột, 48 hồ sơ | Lời dẫn và chú thích nói ba cột, ba dòng |
| F4 `MaNV` chưa có nghĩa | Làm theo | Quy ước 2 | Thêm vào chú thích hình |
| F5 "chưa đặt giới hạn" | Làm theo | Gợi nhầm sang Data Validation | Bỏ cụm này |
| F6 hứa quá về dòng ghi chú (Cần sửa) | Làm theo | Database không chặn dòng tổng do người gõ | Bỏ câu hứa; Memo và câu ôn 1 sửa theo; Hay nhầm 1 nói rõ database không tự chặn |
| F7 hình mâu thuẫn với chữ | Làm theo | Hình có hàng tên cột | Nói rõ tên cột thuộc thiết kế bảng, hình hiện ở trên chỉ để dễ đọc |
| F8 vì sao tách bảng | Làm theo | `NV021` có ba hợp đồng theo database | Nêu cái giá nếu gộp; bỏ lời "một dòng cho người đó" |
| F9 hợp đồng của ai | Làm theo | `HopDong.MaNV` có trong script và database | Nói rõ mỗi dòng ghi `MaNV` |
| F10, F11 hậu quả Hay nhầm | Làm theo | Quy ước 1: Hay nhầm nêu hậu quả | Hai mục đều có hậu quả cụ thể |
| F12 Memo thiếu cột | Làm theo | Mục tiêu bài gồm cột | Sửa các hàng Memo |
| F13 lặp ý | Làm theo | Quy ước 1 | Cắt câu lặp, bỏ bold thừa |
| Đề xuất câu ôn 2 | Làm theo | Chưa câu nào phủ "cột" | Hỏi `NV005`, `HoTen` thuộc dòng hay cột |
| G1–G4 | Giữ | Reviewer công nhận | Không đổi |

## Bài 1.3 Kiểu dữ liệu

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 chữ `n` | Làm theo | Hình có nhiều kiểu kèm số | Ghi `n` là độ dài tối đa; không viết "số ký tự" vì `varchar(n)` tính theo byte |
| F2 vì sao `01/02/2024` đổi | Làm theo | Database dùng `us_english`, `mdy` | Nói database khóa học đọc tháng trước, ngày sau |
| F3 Memo nêu ý chưa dạy | Làm theo | Quy ước 1 | Viết lại hàng 3 theo ý đã có ở Hay nhầm |
| F4 câu ôn thiếu "vì sao" | Làm theo | Quy ước 2 | Thêm câu về lý do khai báo kiểu cho cả cột; bài có bốn câu |
| F5 Ứng dụng 2 | Làm một phần | Nêu dạng ngày cụ thể sẽ thêm kiến thức ngoài bài | Đổi thành chốt với IT cách gửi |
| F6 tiêu đề chứa nhiều ý | Làm theo | Khung cho 0–3 tiểu mục | Tách tiểu mục chọn kiểu theo ý nghĩa |
| F7 ví dụ không nằm trong hình | Làm theo | Quy ước 2.2 | Sửa câu dẫn; chú thích ghi mô phỏng |
| F8 mục tiêu thiếu chữ | Làm theo | Đối chiếu đoạn chốt | Sửa `goal` |
| F9 chưa có ví dụ thứ tự chữ | Làm theo | Dùng ngày 15 và 20 để không lẫn với tháng | Thêm ví dụ `15/02/2024`, `20/01/2024` |
| F10 Ứng dụng 1 lặp | Làm theo | Quy ước 1 | Thay bằng ý cột có được để trống không |
| F11 chữ và chuỗi | Làm một phần | Mức thấp | Câu ôn dùng "kiểu chuỗi"; giữ bold `NULL` ở chỗ định nghĩa |
| Ghi chú chuyển kiểu khi so sánh | Làm theo | Bài 2.2 dùng chuyển kiểu ngầm khi so sánh | Mở rộng định nghĩa sang so sánh |
| G1–G9 | Giữ | Reviewer công nhận | Không đổi |

Khác thiết kế: `N'…'` đặt ngay sau bảng kiểu thay vì trong Hay nhầm, để Hay nhầm giữ 1–2 ý.

## Bài 1.4 Khóa chính và khóa ngoại

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 khóa ngoại để làm gì | Làm theo | `PhongBan.MaPB` là khóa chính theo database | Nối với khóa chính bảng kia, nêu lợi ích và lý do không xóa được phòng |
| F2 caption dạy `MaQuanLy` | Làm theo | `NV004` là hồ sơ duy nhất không có quản lý theo database | Chuyển vào thân bài, rút caption |
| F3 điểm tựa Excel | Làm theo | Quy ước 2 | Nêu cách Excel chỉ có tác dụng trong file; làm rõ "không phải ô chọn"; sửa Memo |
| F4 câu ôn thiếu nhãn | Làm theo | Mục tiêu có đọc nhãn | Thêm câu đọc nhãn `MaQuanLy` |
| F5 "bộ mẫu", `UNIQUE` | Làm theo | Spec không giới thiệu HRM_Demo trong bài | Dùng "dữ liệu mẫu", "ràng buộc cấm trùng" |
| F6 `dbo`, `Bảng.Cột` | Làm một phần | Một vế là đủ | Giải thích `dbo` ở 1.4, `Bảng.Cột` ở 1.3; giữ chữ "mở" |
| F7 nạp hàng loạt, trỏ 5.3–5.4 | Làm theo | Dùng "theo cách thông thường" như bài 1.1 | Cắt, thêm trỏ sang bài 1.5; "câu ghi" không còn dùng |
| F8 "tham chiếu", "đúng người" | Làm theo | Từ chưa giải thích | Đổi tiêu đề và Memo |
| F9 Ứng dụng | Làm theo | Quy ước 2.3 | Ý 1 thành việc cụ thể, ý 2 thêm trường hợp mã đã có |
| F10 hình mô phỏng | Làm theo | Quy ước 2.2 | Chú thích ghi mô phỏng |
| G1–G4 | Giữ | Reviewer công nhận | Không đổi |

## Bài 1.5 Đọc sơ đồ quan hệ

| Mục | Quyết định | Căn cứ | Kết quả |
|---|---|---|---|
| F1 quy tắc đọc đường | Làm theo | `DbDiagram.tsx` đặt `∞` ở đầu khóa ngoại | Nói cách tìm đường, ký hiệu từng đầu, chiều làm tăng dòng |
| F2 "lấy hồ sơ qua", "kết bảng" | Làm theo | Quy ước 2 | Viết "lấy hồ sơ kèm hợp đồng"; giải nghĩa kết bảng |
| F3 "cặp" hai nghĩa | Làm theo | Dễ lẫn | Đổi thành "hai chặng"; khóa nhiều cột nói rõ từng cột vẫn được lặp |
| F4 "một nhân viên có nhiều dòng lương" (Cần sửa) | Làm theo | `NV046` chỉ có một kỳ theo database | Đổi thành "có thể có nhiều", thêm ví dụ kỳ, giải nghĩa một-một |
| F5 Hay nhầm 1 | Làm theo | Tiêu đề không khớp nội dung | Đổi tên lỗi, thêm ví dụ `ChamCong`, `BangLuong` |
| F6 "0, 1 hoặc nhiều" | Làm theo | Sơ đồ không phân biệt được | Đổi thành khóa ngoại không bắt phòng nào cũng phải có người |
| F7 vế cấm cài sơ đồ | Làm một phần | Đây là lời dặn an toàn dữ liệu dùng chung | Giữ, thêm lý do |
| F8 Ghi nhớ, câu ôn 2 | Làm theo | Mục tiêu có phần tăng dòng | Sửa Memo; câu ôn 2 đổi sang đường mới của hợp đồng |
| F9 bold thừa | Làm theo | Quy ước 2.2 | Bỏ bold thuật ngữ đã học |
| F10 "thực thể" | Làm theo | Không dùng lại | Cắt |
| F11 Ứng dụng | Làm theo | Quy ước 2.3 | Thêm ví dụ, đổi tên ý 2 |
| F12 "lần sau" | Làm theo | Dễ hiểu nhầm | Đổi thành dò lần một, lần hai |
| F13–F15 | Giữ | Reviewer công nhận | Không đổi |

## Kiểm thực tế

- Bản `9176c0a`: `npm test` 323/323; `npm run check` 0 lỗi, 0 cảnh báo, 3 hint nền; `npm run build` 132 trang; `npm run check:dist` 132 trang, 1994 liên kết.
- Độ dài theo `proseParagraphs` ở bản này: 1.1 là 698, 1.2 là 551, 1.3 là 691, 1.4 là 611, 1.5 là 645. Số cuối ở hồ sơ review tích hợp.
- Đối chiếu trên database khóa học bằng `SELECT`, lượt này chạy được:
  - Chuyển kiểu: `01/02/2024` thành `2024-01-02`; `chưa rõ`, `9.610.000`, `1000.0` vào `decimal(4,1)` không đổi được; `9610000` giữ nguyên; `21.25` thành `21.3`.
  - Thiết lập phiên: `us_english`, `mdy`.
  - Cấu trúc: kiểu và khả năng nhận `NULL` của các cột được nêu; khóa chính, khóa ngoại của `NhanVien`, `PhongBan`, `BangLuong`, `HopDong`, `ChamCong`; `NhanVien` có 12 cột.
  - Dữ liệu: 48 hồ sơ; `NV021` có ba hợp đồng; `NV046` một kỳ lương, `NV001` hai kỳ; `KT` là `Kế toán`, `KT01` không có; chỉ `NV004` không có quản lý; `SoNgay` có giá trị `2.0`.
- Bản `2cc3293` đã xem ở 1280×800: năm bài và trang Giới thiệu hiển thị đúng, hai link cũ trả 404 như đã thống nhất.

## Giới hạn

- Câu database "chặn xóa phòng còn hồ sơ trỏ tới" lấy từ kết quả đã kiểm ở bài 1.4 cũ, không chạy lại vì là câu ghi.
- 7 phút là nhãn dự kiến, chưa đo với người học thật.

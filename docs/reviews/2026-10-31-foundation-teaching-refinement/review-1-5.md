# Review độc lập bài 1.5

## Phạm vi, phiên bản và cách kiểm

- Công cụ: Codex, **kế thừa model của phiên**, không đổi model, không tạo agent khác.
- Bài: `src/content/lessons/1-5-doc-so-do-erd.mdx`, không có YAML. Phiên bản được giao: `ae7a2f3a0aa3c60e39babe0aeae356d49d8ea534`; người giao xác nhận target không đổi trong lượt review.
- HTML: `dist/bai/1-5-doc-so-do-erd/index.html`, build được giao ngày 31/10/2026 lúc 21:33 giờ Việt Nam; thời gian file đọc được là 21:33:11. Đã đối chiếu phần bài, toàn bộ Erd/caption, các nhãn khóa và ba câu ôn với MDX.
- Đã đọc AGENTS.md, quy ước (gồm nguyên lời dặn 4.5), template, hồ sơ công ty, mẫu 1.1 và bài 1.2–1.4; spec chỉ ba mục quyết định được giao. Không đọc report cũ hoặc kết luận của tác giả. Bài trước được đọc khi bắt đầu lượt này; không đọc lại thay đổi 1.1/1.2 phát sinh sau đó.
- Góc học thử: chỉ biết Excel cơ bản, chưa SQL/lập trình; dùng lời giảng bài trước và 1.5 để thử trả lời, sau đó mới đối chiếu đáp án. Chỉ đọc nguồn/HTML tĩnh bằng PowerShell; không browser, SQL, API/runner hay test.

## Nhận xét cần xử lý

**Biên tập — mô tả chấm tròn có một ngoại lệ ngay trong hình.** `src/content/lessons/1-5-doc-so-do-erd.mdx:30`: “Đầu có chấm tròn và `∞` nằm ở cột khóa ngoại”. Trong HTML, đường tự tham chiếu `NhanVien.MaQuanLy` → `NhanVien.MaNV` (`path d="M510 235 H532 V55 H510"`) có nhãn `∞` nhưng không có phần tử `circle` ở đầu khóa ngoại; các đường khác có. CSS `.er-link` chỉ vẽ nét, không bổ sung marker. Người mới thử áp dụng chỉ dẫn cho đường quản lý có thể tìm mãi chấm tròn. Tác động nhỏ: dấu `∞` và nhãn cột vẫn đủ đọc đúng. Đề xuất tối thiểu: đổi thành “Đầu có `∞` nằm ở cột khóa ngoại…”, không cần mở rộng bài hay sửa component.

Không thấy lỗi kiến thức cốt lõi hoặc thiếu tiền đề làm ba câu ôn trong phạm vi đọc này.

## Rà theo thứ tự bài và những điều giữ được

| Phần | Câu hỏi tự đặt khi học và kết quả |
|---|---|
| Mở bài, Erd, đọc đường (dòng 20–32) | **Giữ được.** Dò mã để làm gì? Ví dụ `NV001` → `KT` → `Kế toán` trả lời ngay. Vì sao biết cặp cột? Dòng 28 chỉ rõ hai đầu `MaPB`, tiếp đó nhắc PK/FK đã học. HTML tô đúng hai bảng, hai cột `MaPB` và đường giữa chúng; caption khớp. Giải thích cuộn ngang và không lưu sơ đồ vào database chung rõ mục đích. |
| Một-nhiều (dòng 36–41) | **Giữ được.** Vì sao một phòng có nhiều hồ sơ mà một hồ sơ chỉ có một phòng? Bài đọc hai phía, phân biệt phòng có thể không có người với hồ sơ có `MaPB` bắt buộc. Vì sao số dòng tăng? Ví dụ ba hợp đồng của `NV021` nối được với ý mỗi dòng là gì ở 1.2, không cần biết cú pháp kết bảng. |
| Ba bảng, khóa nhiều cột (dòng 45–54) | **Giữ được.** Vì sao phải qua `NhanVien`? Bảng hai chặng chỉ rõ nơi lấy `MaPB` rồi `TenPB`. Vì sao không gọi đây là phòng tại kỳ lương? Giới hạn phòng hiện lưu nói ngay tại chỗ. Một câu khóa nhiều cột đủ giải thích hai nhãn PK ở `BangLuong` và “tối đa một dòng mỗi kỳ”, không kéo sang phân tích lương. |
| Hay nhầm, Ứng dụng, Ghi nhớ (dòng 60–79) | **Giữ được.** Không có đường trực tiếp có phải hết cách lấy dữ liệu? Ví dụ `ChamCong`/`BangLuong` qua `NhanVien` trả lời bằng chính cách tìm đường vừa học. Hai ứng dụng bám việc chọn nguồn và hiểu đơn vị dòng. Ghi nhớ ôn đúng mục tiêu. |

Khung bài nền được giữ: không tình huống/bài tập SQL, `minutes: 7` là ước tính, ba tiểu mục chính, ba câu ôn sau Ghi nhớ. Thuật ngữ ERD, một-nhiều được giải thích tại chỗ; ký hiệu bảng.cột, PK/FK và NULL đã có ở bài trước. Không cần thêm cú pháp JOIN hoặc khôi phục phần phân tích lương đã chốt rút.

## Tiền đề từng câu ôn

| Câu ôn | Kiến thức cần để tự làm | Đã dạy ở đâu trước đáp án | Còn thiếu / độ phủ |
|---|---|---|---|
| Hộp và đường nối thể hiện gì? (84) | Phân biệt bảng/cột với quan hệ khóa ngoại. | 1.2 về bảng/cột; 1.4 về khóa; 1.5 dòng 22, 28–30. | Không thiếu. Kiểm nền để đọc sơ đồ. |
| Hợp đồng kèm tên phòng đi qua đâu? (91) | Tìm đường mới, đọc đầu đường tại từng cột, dùng `NhanVien` làm chặng giữa. | 1.2 đã biết `HopDong.MaNV` nhắc tới hồ sơ; Erd hiện đường `HopDong.MaNV` → `NhanVien.MaNV`; dòng 28 và 45–50 dạy dò một và hai chặng. | Không thiếu. Có chuyển giao sang bảng đầu khác ví dụ chính; không phải học đường đi mới từ đáp án. |
| Vì sao một mã nhân viên có thể ra nhiều dòng? (98) | Mỗi dòng hợp đồng đại diện một hợp đồng; đọc phía nhiều. | 1.2 về ba hợp đồng `NV021`; 1.5 dòng 36–41. | Không thiếu. Kiểm trực tiếp mục tiêu giải thích tăng số dòng. |

Ba câu phủ mục tiêu đầu bài: đọc sơ đồ, chỉ đường/cặp cột và giải thích nhiều dòng. Không có bài tập SQL cần kiểm tiền đề hoặc đáp án YAML.

## Ưu tiên và giới hạn

Chỉ có một chỉnh sửa câu chữ nhỏ ở dòng 30; không có mục Cần sửa/Cần làm rõ/Cần cắt. Với nguồn và HTML được giao, đã có đủ kiến thức trước đáp án để thử làm cả ba câu ôn.

Đây không phải xác nhận SQL/UI đã chạy đúng: chưa kiểm database thực, ràng buộc/số hợp đồng bằng truy vấn, thao tác cuộn ngang, bàn phím, nút Sơ đồ database, viewport hoặc thời gian học thực tế. `NV021` có ba hợp đồng và phòng chỉ lưu hiện tại khớp hồ sơ công ty cùng lời giảng trước; chưa xác minh live. Đối chiếu HTML chỉ chứng minh nội dung và cấu trúc tĩnh, không chứng minh trải nghiệm nhìn hình trong browser. Không sửa sản phẩm, test, docs hay Git.

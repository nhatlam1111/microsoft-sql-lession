# Review độc lập bài 1.3 — Kiểu dữ liệu

**Phạm vi và phiên bản.** Review toàn bộ `src/content/lessons/1-3-kieu-du-lieu.mdx`, gồm hình Ssms, caption, Memo và bốn câu tự kiểm tra; không có YAML hay bài tập SQL. Source được giao và HEAD đã đọc: `ae7a2f3a0aa3c60e39babe0aeae356d49d8ea534`; `git diff --exit-code HEAD -- src/content/lessons/1-3-kieu-du-lieu.mdx` trả mã 0. HTML: `dist/bai/1-3-kieu-du-lieu/index.html`, lần ghi 31/10/2026 21:33:11 giờ Việt Nam, theo gói giao việc được build từ đúng MDX này. Đã đối chiếu nội dung article của HTML với nguồn.

**Công cụ và góc nhìn.** Codex, **kế thừa model của phiên**, không đoán tên model. Chỉ đọc file bằng PowerShell, đọc Git ở chế độ chỉ đọc và ghi report này. Học thử với nền Excel cơ bản, chưa SQL/lập trình; không lấy bài sau bù tiền đề. Đã đọc AGENTS.md, quy ước (gồm nguyên lời dặn mục 4.5), template, hồ sơ công ty, mẫu 1.1, bài trước 1.2 và đúng ba mục quyết định được giao trong spec.

**Kết luận.** Không ghi nhận mục **Cần sửa / Cần làm rõ / Cần cắt / Biên tập** có căn cứ trong phạm vi học thử này. Nội dung đã giảng đủ để trả lời cả bốn câu ôn; kết luận này không xác nhận SQL hoặc giao diện tương tác đã chạy đúng.

**Rà theo thứ tự bài**

| Vị trí và trích ngắn | Đánh giá, tác động và câu hỏi đã tự đặt | Đề xuất |
|---|---|---|
| `src/content/lessons/1-3-kieu-du-lieu.mdx:20` — “một kiểu dữ liệu dùng cho mọi dòng”; dòng 22 | **Giữ được.** “Vì sao khai báo kiểu cho cả cột?” được trả lời bằng việc sắp ngày và tính tiền. Cặp ngày dạng ngày/tháng cho thấy hậu quả của thứ tự chữ, không chỉ đưa định nghĩa để học thuộc. Data Validation đã có nghĩa ở bài 1.1; Format Cells được giải thích bằng tác dụng ngay tại đây. | Giữ. |
| `src/content/lessons/1-3-kieu-du-lieu.mdx:26` — “cột có nhận NULL hay không”; dòng 28–39 | **Giữ được.** “Đọc phần nào trong SSMS, các nhãn có nghĩa gì?” có lời chỉ Object Explorer/Columns, giải thích NULL/NOT NULL và bảng bốn kiểu. Ký hiệu `NhanVien.MaNV`, “chuỗi”, Unicode và hai tham số decimal đều có lời giải đủ dùng tại chỗ. Hình là mô phỏng; HTML đánh dấu đúng `(date, null)` và `(decimal(18,0), not null)`, khớp caption. PK/FK chỉ được nhận diện và hẹn bài sau, không cần hiểu khóa để đọc hai nhãn đang học. | Giữ độ sâu hiện tại. |
| `src/content/lessons/1-3-kieu-du-lieu.mdx:43` — “giữ số 0 đầu” | **Giữ được.** “Toàn chữ số thì vì sao không dùng kiểu số?” được trả lời bằng ý nghĩa mã định danh và việc không cộng trừ; không cần thêm lý thuyết thiết kế. | Giữ. |
| `src/content/lessons/1-3-kieu-du-lieu.mdx:47` — “kết quả có ba khả năng”; dòng 49–55 | **Giữ được.** “Tự đổi kiểu thì có luôn đúng không?” có ba kết quả đối chiếu rõ; ví dụ ngày nêu điều kiện riêng của database khóa học. “Vì sao vẫn phải đối chiếu hồ sơ?” được trả lời bằng ngày hợp lệ nhưng sai hồ sơ và số âm khi thiếu luật chặn. Các bài sau chỉ để đi sâu, không thay phần giảng cần cho câu ôn. | Giữ; không khôi phục làm tròn, tràn số hay giới hạn 999.9. |
| `src/content/lessons/1-3-kieu-du-lieu.mdx:61` — “NOT NULL là đã nhập đầy đủ”; dòng 69–70 | **Giữ được.** “Có NOT NULL rồi còn thiếu được không?” có phân biệt chuỗi rỗng/dấu cách và điều kiện không có luật khác. Hai ứng dụng trả lời được “học để làm gì”: mô tả cột mới và thống nhất dữ liệu gửi IT trước khi nhập. Không đòi người học tự thực hiện import. | Giữ. |
| `src/content/lessons/1-3-kieu-du-lieu.mdx:76` — Memo; dòng 82–108 | **Giữ được.** Phần ôn đứng đúng sau Ghi nhớ, nhắc lại ý đã dạy. Ba tiểu mục chính, một lỗi thường gặp, hai ứng dụng và bốn câu ôn không tạo thêm nhánh kiến thức sâu. Giữ `noScenario`, `noExercises`, 7 phút ước tính; chưa đo thời gian đọc với người học thật. | Giữ. |

**Tiền đề từng câu tự kiểm tra**

| Câu và vị trí | Kiến thức cần trước khi mở đáp án | Đã được dạy ở đâu | Kết quả học thử |
|---|---|---|---|
| 1 — dòng 85: vì sao khai báo kiểu cả cột | Phân biệt kiểu từng ô và kiểu cả cột; lợi ích so sánh/sắp xếp/tính toán | Dòng 20–22; bảng/dòng/cột đã có ở 1.2 | Đủ; đáp án không thêm tiền đề. Phủ mục tiêu “vì sao”. |
| 2 — dòng 92: đọc nhãn LuongCoBan | Cách đọc nhãn SSMS; `decimal(p,s)`; `NOT NULL` | Dòng 26, hình/caption dòng 28, bảng dòng 37 và ví dụ dòng 39 | Đủ; không cần kiến thức làm tròn hoặc tràn số. Phủ đọc kiểu và khả năng nhận NULL. |
| 3 — dòng 99: ngày lưu được có đúng ý chưa | Chuyển kiểu ngầm; cách đọc tháng/ngày của database khóa học; hợp lệ khác đúng ý | Dòng 47, ví dụ dòng 50 và giới hạn dòng 53 | Đủ; người học có thể kết luận trước khi xem đáp án. Phủ rủi ro đổi giá trị. |
| 4 — dòng 106: SoCCCD dùng chuỗi | Mã định danh khác số dùng tính toán; giữ số 0 đầu | Dòng 43 | Đủ; đáp án chỉ nhắc lại lý do đã giảng. |

Không có bài tập SQL cần kiểm thêm tiền đề. Bốn câu bao phủ mục tiêu đầu bài, gồm ý nghĩa nền tảng và đọc nhãn, không chỉ hỏi ngoại lệ.

**Ưu tiên và giới hạn.** Không đề xuất chỉnh nội dung từ lượt này. HTML tĩnh có đủ bảng bốn kiểu, caption và bốn cặp câu hỏi/đáp án; `N'Trần Thị Mai'` giữ nháy thẳng qua mã HTML `&#39;`, không lộ backtick/escape. Không có đoạn SQL để sao chép hay drawer trong bài.

Chưa xác minh trực tiếp cấu hình phiên SQL Server, dữ liệu thật hoặc ba kết quả chuyển kiểu bằng SQL. Ví dụ ngày có điều kiện nội bộ phù hợp hồ sơ công ty; đó không phải bằng chứng đã chạy. Không dùng browser, SSMS, SQL, API/runner, test/build/check:dist; chưa kiểm tương tác, bàn phím, viewport hoặc thời gian học thật. Không đọc `database/HRM_Demo.sql`, secret, tài liệu SQL bên ngoài, report cũ hay kết luận của tác giả/reviewer khác. Chỉ ghi report được giao, không sửa sản phẩm, test, docs hoặc Git.

# Xử lý review 4.2 — 26/10/2026

Đã đọc toàn bộ [report gốc](2026-10-26-bai-4-2.md) trước khi sửa; giữ nguyên report. Source sau review chỉ đổi cụm B1, YAML không đổi.

| Mục | Quyết định | Căn cứ, xử lý và trạng thái |
|---|---|---|
| B1 — “các dòng bằng ngày” | Làm theo | Đổi thành “các đơn có cùng SoNgay” với tên cột kiểu code. Tránh nhầm lượng ngày với NgayBatDau/TuNgay; không thêm lý thuyết. Đã sửa; prose không cần snapshot test. |
| Tình huống/mốc/hiệu lực | Làm theo | Giữ mới nhất theo NgayBatDau <=21/10, MaHD DESC; không thêm hiệu lực hoặc trạng thái nhân viên. |
| Hàm cửa sổ/OVER/chia nhóm | Làm theo | Giữ ví dụ ba hợp đồng NV021 và đánh số không gộp dòng; thứ tự trong/ngoài và WHERE sau CTE đã giảng. |
| Đồng hạng/top n | Làm theo | Giữ ma trận 9 đơn và cắt 3/5/9; không thêm mã duy nhất vào khóa RANK/DENSE_RANK. Đã kiểm fixture chín dòng và ba cutoff khác nhau của đề 3 là 9/14/19. |
| Câu chính/kết quả/flow | Làm theo | Giữ flow55/46/46/46 và trích10; fixture khớp kết quả/câu kiểm, thêm trường hợp giả lập cùng ngày và sau mốc. Đây không phải SQL live. |
| HTML/CSS/highlight | Làm theo | Giữ focus ngoài duy nhất và SQL khớp payload; CSS khai báo tab4 không thay cho đo layout/copy thực tế. |
| Hay nhầm/Ứng dụng/Memo/ôn | Làm theo | Giữ cấu trúc, ba câu ôn sau Memo, không giảng bù từ answer. Chưa đo thời gian người học thật. |
| Bài tập/đường thực hành | Làm theo | Giữ ba đề và lời giới hạn bộ chấm; ba route tĩnh có nội dung đúng. Không coi client-only HTML là mất UI. |
| Bảng tiền đề ba đề | Làm theo | Giữ cách luyện đủ ROW_NUMBER/RANK/DENSE_RANK và CTE; không thêm đáp án vào bài. |
| Giới hạn SQL/UI | Làm theo | Chưa nghiệm thu live/SSMS/clipboard/nháp/drawer/viewport. Thiếu cấu hình SQL như 4.1; browser không khả dụng. Không đổi UI/API để lách giới hạn. |

Kiểm tác giả trước review: 311 test/44 files; Astro0 errors/0 warnings/3 hints nền; build123 trang, dist1898 link; API69 bài/typecheck. HTML13 payload hai bài khớp source. Sau sửa prose kiểm lại test/check/build/dist/HTML; log tại temp/verification/2026-10-26-4-1-4-3. Chưa có phần kỹ thuật reviewer từ chối phán định nào ngoài giới hạn live/UI đã ghi.

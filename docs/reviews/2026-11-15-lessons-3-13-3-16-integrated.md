# Review tích hợp 3.13–3.16 và đường thực hành

## Kết luận

Chưa thấy lỗi tích hợp có căn cứ trong phạm vi source/HTML được giao. Mạch học có lý do rõ: 3.13 giới thiệu chia nhóm và thứ tự; 3.14 dùng lại để lấy dòng theo vị trí; 3.15 giữ chi tiết bên cạnh số tổng hợp; 3.16 kết hợp tổng hợp theo tháng, khung cộng dồn và LAG. 3.14 và 3.15 đều nói trước 3.16 sẽ bổ sung gì; 3.16 khai báo cả hai là tiền đề. Phân biệt lọc tập để tính với lọc dòng hiển thị được nhắc ở 3.14 và vận dụng tiếp ở 3.16. Đúng khi 3.16 lưu ý dòng trước không nhất thiết là tháng lịch trước và phạm vi mọi trạng thái không phải số ngày nghỉ đã duyệt.

Không có finding cần đề xuất sửa ở mức tích hợp. Đây không phải review thay thế review chi tiết từng bài.

## Tiền đề sáu đề mới

| Đề | Cách tiếp cận và tiền đề nhìn thấy trước đề | Nhận xét tích hợp |
|---|---|---|
| 3-14-1 | Lọc hai kỳ, chia theo MaNV và sắp KyLuong, LAG lấy ThucLinh; 3.14 phần Cấu trúc mới giải thích nhóm, thứ tự, dòng trước và NULL. | Cùng cơ chế ngày công, đổi cột đọc; không cần kiến thức bài sau. |
| 3-14-2 | Chia hợp đồng theo MaNV, xếp ngày rồi mã; lấy đầu/cuối bằng khung bao nhóm. 3.14 giải thích FIRST_VALUE/LAST_VALUE và khung; phần Vận dụng chỉ rõ thứ tự hợp đồng, 3.13 giải thích phân định cùng ngày. | Đề xác định thứ tự và giới hạn lịch sử đang lưu. |
| 3-14-3 | Giữ cả hai kỳ khi tính LEAD trong CTE, lọc tháng 8 ở câu ngoài; 3.14 Vận dụng giải thích vì sao lọc sớm làm mất dòng tháng 9, CTE là tiền đề qua 3.13/3.12. | Đề mở rộng từ các mã ví dụ sang mọi dòng. |
| 3-15-1 | Kết lương và nhân viên, lọc kỳ, tính SUM và COUNT theo phòng; 3.15 ví dụ chính trình bày toàn bộ cơ chế và phòng hiện lưu. | Phạm vi đổi sang kỳ tháng 8 và mọi phòng; độ chi tiết vẫn là dòng lương. |
| 3-15-2 | Lọc trạng thái rồi AVG theo LoaiNghi; 3.15 Vận dụng giải thích đổi khóa nhóm và lọc trạng thái; 3.1 mục Chọn cột/Làm tròn giải thích AVG và kiểu decimal của SoNgay. | 3.1 được khai báo trực tiếp là tiền đề của 3.15. |
| 3-15-3 | Lọc kỳ rồi MIN/MAX OVER() trên tập còn lại; 3.15 Vận dụng giải thích OVER() và đổi phạm vi sang cả kỳ. | Không cần ORDER BY trong OVER để trình bày kết quả. |

## Đường đi và tương thích đã tự kiểm

- Hai trang bài 3.14, 3.15 trong `dist` có liên kết tới đủ ba bài tập tương ứng; liên kết trước/sau giữa 3.13 → 3.14 → 3.15 → 3.16 đúng. Sáu HTML bài tập có đường về bài học và liên kết bài tập kề hợp lý. Đối chiếu nội dung `p.ex-prompt` sau chuẩn hóa khoảng trắng với trường `prompt` trong YAML: 6/6 khớp; mỗi HTML chứa ID tương ứng 3-14-1..3 hoặc 3-15-1..3.
- `src/lib/exercises.ts` loại `answer` và `check` khi tạo đối tượng công khai; trang bài tập dùng `publicExercises`. Đây là kiểm luồng source và biểu hiện HTML trong phạm vi được giao, không đọc đáp án thô và không khẳng định đã kiểm toàn bộ asset công khai hoặc an ninh API.
- `exerciseLessonNum` cho 3.13 → 4.2, 3.14 → 3.14, 3.15 → 3.15, 3.16 → 4.3; YAML cũ giữ 4-2-1..3 và 4-3-1..3. Hàm redirect được gọi trực tiếp với base `/microsoft-sql-lession`: cả ba URL 4.2 cũ chuyển đến đúng số bài tập của 3.13; cả ba URL 4.3 cũ chuyển đến đúng số bài tập của 3.16. `progress.ts` lưu tiến độ bài tập theo ID; khi nhập version >1 giữ nguyên ID. Ánh xạ version 4 → 5 chuyển 3.14 cũ sang 3.16, 3.15 cũ sang 3.18, 3.16 cũ sang 3.19 và giữ 3.13. Đây là suy luận từ source và gọi hàm ánh xạ, chưa thử import/storage trên UI.

## Bằng chứng và giới hạn

Tự đọc frontmatter/đoạn chuyển tiếp 3.13–3.16, phần liên quan của 3.14/3.15 và tiền đề AVG tại 3.1; dùng YAML chỉ lấy ID và prompt, đọc tám HTML, đối chiếu chuỗi đề và liên kết bằng HTML parser; đọc schema/redirect/progress/public exercise ở phần liên quan, gọi hàm redirect và chuyển số. Không dùng browser, không chạy SQL/API, không xem seed/secret/report cũ, không sửa sản phẩm. Không kiểm đáp án YAML; không chứng minh lời giải chạy đúng, tính đúng số liệu, đáp ứng chấm bài, render tương tác, copy/drawer hoặc khôi phục tiến độ thực tế. Không khẳng định HTML build khớp toàn bộ dependencies chỉ từ hash sau đây.

Tác giả cung cấp `npm run build` 204 trang và `check:dist` 286 trang/4232 link; đó là kết quả tác giả, reviewer không chạy lại và chưa có bằng chứng phiên bản của lần chạy để tự nhận là kết quả kiểm của mình.

SHA-256 nguồn tại lúc tự kiểm:

- 3.13 MDX `0A382EA93DC2825FD53D82E812E14F238327676E60D483C861EC5439AF3F1BE7`
- 3.14 MDX `F81809C083716490321B344971A4A790E7F45A3633DDFB897A48B02019C410AC`
- 3.15 MDX `24927A81E9CEEDB0E6E1345F8C97BB048E3E963439E40558A0ACFFE4E25DE43A`
- 3.16 MDX `EDD21E8226F1EF64A684E0D14C909B2CC409CEF718CB48297AA2EA90FDB98BAA`
- 3.14 YAML `A924386A533800A8790BB2CEA03C2321D085502EAAA31DEECDF93D3A70477CD0`
- 3.15 YAML `4247EBCF19F1DC4E1B78A318A289767E7262DE8C009D2B9779576399280BC953`

SHA-256 HTML theo thứ tự trang bài, bài tập 1, 2, 3:

- 3.14: `BEF7755A51137492865B20B3438FF0F331084126C6D52EE7658EC88279F9167C`, `982571B1D80DA0BEF20A2B54891B7AAD595ADE0A80AE03079DBD4B434EE2B953`, `0919C5ED33EF6118429844A72815CFCE7AFC7E0633FC247240808E85404C517B`, `7FA27A707C2C2DAA3B3B0C090E385BF2936BCCD721CC73660C776FD158AC486B`.
- 3.15: `5C6ECD395E4B046ED58297ABDCAFE671B22991D93FA5B5C48221B3FFDCDF76D9`, `0653F195539ACECDD40AAEA906B8F5F47EDD41B6A2BCF8AEF43E17C93163029D`, `1B5672C15150812BCA53AA0B5DE984556B8EFE511D12FE8D72949F7997347268`, `61CF47118895BB0AD653341142943A72BE93F9919BE664097692E154396D4F2A`.

Hash chỉ xác định file đã đọc tại thời điểm này; thay source, HTML hoặc phụ thuộc liên quan thì phải đánh giá lại kiểm tương ứng.

# Review độc lập bài 3.11 — Subquery trong FROM

## Phạm vi và cách kiểm

Góc nhìn người học mới biết Excel cơ bản, không giả định biết PivotTable hay SQL ngoài các bài trước. Đọc nguồn bài 3.11, HTML build 20:56 ngày 04/11/2026 và đề đã tách; tham chiếu quy ước/template/hồ sơ và các bài 2.1, 3.1, 3.2, 3.3, 3.9, 3.10. Một số lượt đọc nhóm tài liệu bị cắt đầu ra, nên chưa thể xác nhận đã đọc hết từng dòng của mọi tài liệu và bài trước theo gói. Đọc spec đã duyệt mục 1–3 để hiểu phạm vi. Đã khóa `locked-prerequisites-3-11.md` trước khi đọc YAML; sau đó đối chiếu ba đáp án với bảng đã khóa, không sửa bảng.

SHA-256 nguồn `eb132d65cd0a6d2e17336344b915c377904072730feb716473e9592ac4b787a2`, YAML `5db5af969acc35a29568b3ae99250a010d7f05328c4d3a60cf035cef815900cf`, HTML `79340a69827189b598ef99228e16d978529a4b59f408fc006e7a94d6e60f4603` khớp gói. Đọc tĩnh HTML, không dùng browser. Không chạy SQL, API/runner, không nộp bài hoặc truy cập database/seed/secret. Không đọc tài liệu SQL ngoài khóa học hay report khác.

## Nhận xét cần xem xét

1. **P3 — Cụm “tên cột không được chấm” dễ bị hiểu là cấm dấu chấm trong câu SQL.** Vị trí: cuối prompt cả ba bài tập trong `src/content/exercises/3-11-subquery-trong-from.yaml`. Bài chính lại viết `t.MaNV`, `t.SoHopDong` ở câu ngoài và giải thích `t` là tên nguồn; bảng kết quả hiển thị tiêu đề `MaNV`, `SoHopDong` không có tiền tố. Người mới có thể hiểu yêu cầu là phải bỏ tiền tố đang được bài khuyến khích dùng, dù ý có vẻ là tên **tiêu đề kết quả** không chứa dấu chấm. Đề xuất đổi một vế thành “Tiêu đề cột kết quả không có dấu chấm; trong câu lệnh vẫn có thể dùng bí danh nguồn trước tên cột.” Đây là nhận xét về độ rõ, không phải kết luận đáp án sai.

2. **P3 — Giới hạn tương quan lặp lại, làm đoạn cuối nặng hơn.** Vị trí: bài 3.11 dòng 73 và 392. Dòng 73 đã nói không chuyển nguyên câu con tương quan 3.10 sang bảng dẫn xuất thông thường để tham chiếu bí danh ngoài; cuối Hay nhầm nhắc lại cùng giới hạn bằng `nv.MaNV`. Nội dung quan trọng và đã được duyệt, không đề nghị bỏ giới hạn. Có thể giữ câu giải thích và ví dụ ở một chỗ, cắt câu nhắc lại ở chỗ còn lại; giữ lời dẫn `APPLY` ngoài phạm vi nếu chọn giữ đoạn 73.

## Những phần giữ được

- Tình huống xác định đơn vị là dòng hợp đồng đang lưu, một mã một dòng; không biến số hợp đồng thành hiệu lực hay kết luận nghiệp vụ. Excel mô tả bảng trung gian trước lọc; câu chính, LineMap, sơ đồ và câu trả lời bám cùng yêu cầu.
- Vì sao cần hai tầng: bảng tổng hợp là nguồn cho câu ngoài; `WHERE` ngoài đọc cột đã xuất, khác lọc hợp đồng gốc trước khi đếm (dòng 43, 63–69). Vì sao cần tên nguồn và tên cột: để câu ngoài tham chiếu; phạm vi `hd` và các cột không xuất được giải thích tại dòng 63–65, với lỗi tại dòng 361–381. Vì sao xếp ngoài: nguồn trung gian không bảo đảm thứ tự cuối, dòng 71 và 383–388. Vì sao có mã không hiện số 0: không có hợp đồng thì không có nhóm, dòng 69 và bước FROM.
- Sơ đồ cho thấy 46 dòng/2 cột sau nguồn, 7/2 sau lọc, 7/2 sau chọn và xếp. Trong HTML tĩnh, đầu vào của WHERE có hai cột để xét ngưỡng; năm dòng kiểm khớp bảng đầu vào, các dòng giữ/loại khớp kết quả, tổng 7 giữ trên 46. Đầu vào SELECT và ORDER BY nối được từ kết quả bước trước; phần trích có nhãn, không coi thẻ xem nhanh là toàn bộ. Ví dụ FROM nêu đầy đủ từng nhóm mẫu nhưng không nhầm chúng là toàn bộ nguồn.
- Bốn câu tự kiểm tra sau Ghi nhớ bao phủ nguồn nhiều dòng/cột, lọc, phạm vi cột và thứ tự; lời giải đã được giảng ở phần chính hoặc Hay nhầm. Không thấy cần thêm bài giảng để trả lời các câu này.
- Cách đánh dấu dữ liệu và từ khóa trong lời văn, trình tự Excel → SQL → kết quả, ba ứng dụng gắn chủ đề, và các đoạn sai đặt `copy={false}` phù hợp mục đích đọc. HTML tĩnh thể hiện nội dung câu chính, ví dụ và kết quả; không thấy dấu backtick lộ trong văn bản được trích.

## Đối chiếu ba đề và đáp án sau khi khóa

- **3-11-1:** đáp án lọc trạng thái trong nguồn, đếm theo phòng, dùng cột đếm ở tầng ngoài và hai khóa sắp xếp. Các phần tương ứng đã có ở 3.2 và 3.11 như bảng khóa; không thấy tiền đề mới bắt buộc.
- **3-11-2:** đáp án giữ cùng ba điều kiện trạng thái/mốc ngày như 3.1, cộng theo mã rồi lọc tổng ở ngoài. Việc đưa `SUM` và bộ lọc nguồn vào bảng dẫn xuất được giảng bằng lời trong 3.11, còn cách nhóm từ 3.2; cần tự chuyển thành câu cụ thể như đã ghi trước khi mở đáp án.
- **3-11-3:** đáp án cộng cột thực lĩnh theo mã từ toàn bộ bảng, lọc tổng và sắp ở tầng ngoài; các phép và tổ chức đã dạy ở 3.1, 3.2 và 3.11. Cần tự chuyển từ ví dụ đếm sang `SUM` trên cột đề cho. Chưa xác minh dữ liệu hoặc kết quả thực tế.

Ba đối chiếu trên là kiểm ý và tiền đề qua văn bản, không khẳng định kết quả SQL hay bộ chấm đã chạy đúng.

## Chưa xác minh

Không kiểm dữ liệu nguồn, số 55/46/7, từng giá trị mẫu, thông báo lỗi SQL, tính thực thi hoặc kết quả ba đáp án. Không kiểm thao tác mở drawer, focus bằng bàn phím, viewport, sao chép/dán, SSMS hay đường chạy bài tập; HTML tĩnh không chứng minh các tương tác này. Không kiểm các phép thử tự động, trạng thái build ngoài SHA hoặc hành vi bộ chấm.


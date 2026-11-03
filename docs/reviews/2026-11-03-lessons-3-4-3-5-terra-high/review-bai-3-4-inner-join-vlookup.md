# Review độc lập bài 3.4 — INNER JOIN

## Phạm vi và cách kiểm

- Review source MDX, đề và đáp án YAML, HTML build của bài 3.4; đọc quy ước, khung, hồ sơ, bài mẫu 2.1 và các bài tiền đề được giao. Đối chiếu phần Phạm vi của spec và Review Focus của plan. Không dùng kết luận triển khai làm bằng chứng.
- Phiên bản: working tree trên base `63f8f5c67782726a78fe794d617dfe0ae422e4cb`; SHA-256 của các file thuộc gói 3.4, gồm source, YAML, HTML và tài liệu tiền đề, khớp manifest. Source bài `e6ed2e14…cec2404`, YAML `087c2f6e…a616843`, HTML `b1b9a537…33ececc`.
- Cấu hình agent được giao: GPT-6.1 Terra (`gpt-6.1-terra`), effort `high`, ngữ cảnh mới. Đây là cấu hình giao việc, không phải phép tự xác minh model ở runtime. Công cụ thực dùng: PowerShell, Python đọc HTML/source và tính SHA-256; không dùng browser, database, API hay runner.
- Tự lập hướng giải từng đề từ prompt trước khi mở answer; sau đó đối chiếu answer, không chạy SQL. Nhận xét từ góc nhìn người biết Excel cơ bản, chưa mặc định biết VLOOKUP.

## Rà theo thứ tự bài

1. **Tình huống — Giữ được.** Mục tiêu lấy toàn bộ hồ sơ và tên phòng có phạm vi rõ, gồm người đã nghỉ; tên phòng là theo mã hiện lưu. Câu hỏi vì sao phải kết hai bảng được trả lời bằng vị trí mã và tên.
2. **Excel → SQL — Giữ được.** Bài giải thích VLOOKUP, vùng dò, cột trả về và `FALSE`; ví dụ `KT` nối với câu SQL và LineMap. `nv`, `pb`, dấu chấm và `ON` được giải thích trước khi cần tự làm đề. Vì sao 48 vẫn là 48 được giải bằng NOT NULL, khóa ngoại và khóa chính; trường hợp không khớp/nhiều khớp được phân biệt với VLOOKUP. Tiền đề nhóm theo mã và tên, lọc sau JOIN, đếm sau kết được dạy trước phần ôn.
3. **Sơ đồ xử lý — Cần làm rõ, mức P2.** Tại bước `INNER JOIN` (source dòng 95–115), đầu vào viết “Bảng bên phải là `PhongBan`; so `nv.MaPB` … với `pb.MaPB`”, nhưng bảng đầu vào trong HTML chỉ hiển thị năm dòng của `NhanVien` và không hiện giá trị mã/tên từ `PhongBan`. Đầu ra hiện tên phòng, song người mới không thể đối chiếu cả hai giá trị được so hoặc thấy tên lấy từ dòng danh mục nào ngay trong bước này. Đây là thiếu bằng chứng trực quan cho thao tác chính theo yêu cầu đầu vào đủ cột, không phải kết luận SQL hoặc dữ liệu sai. Gợi ý ngắn: thêm bản trích danh mục với ít nhất `pb.MaPB`, `pb.TenPB` tương ứng, đặt cạnh/ở đầu vào bước kết.
4. **Các bước còn lại — Giữ được.** FROM có 48 tổng, trích năm dòng ba cột; SELECT nhận đủ bốn cột từ kết quả JOIN; ORDER BY nhận bốn cột và đổi thứ tự, vẫn 48 dòng. Thẻ nhanh chỉ trích ba dòng/ba cột, drawer ghi rõ số cột và số dòng; không coi phần trích là toàn bộ. Focus trong nguồn khớp các phần của query; câu chính và query cùng nội dung. Kết quả cuối trích năm trong 48 và trả lời ngay sau bảng.
5. **Hay nhầm / Ứng dụng / Ghi nhớ — Giữ được.** Hay nhầm nêu sai điều kiện tự so, cột mơ hồ và thiếu khóa nhóm; ứng dụng gắn việc lấy tên và tổng hợp với kết bảng. Các giới hạn số dòng và khớp nhiều lần đặt trong mạch chính, không dựa vào câu ôn để giảng bù.
6. **Tự kiểm tra và Bài tập — Giữ được.** Ba câu ôn nằm sau Ghi nhớ, trước bài tập; bao phủ điều kiện giữ dòng, 48 cặp và bí danh. Chưa thấy đoạn vòng vo cần cắt: lời giải thích, sơ đồ, kết quả và ôn có chức năng khác nhau.

## Tiền đề từng đề

| Đề | Hướng giải tự lập trước khi xem answer; kiến thức cần và nơi đã học | Đối chiếu answer / thiếu |
|---|---|---|
| 3-4-1 | Kết hồ sơ với danh mục theo mã, chọn đúng ba cột từ hai nguồn, lọc mã KD không lọc trạng thái và sắp mã tăng. JOIN/ON, bí danh: phần chính 3.4; WHERE: 2.2; ORDER BY: 2.4. | Answer cùng hướng. Không thấy thiếu tiền đề; chưa chạy để kiểm kết quả. |
| 3-4-2 | Kết như trên; lọc đồng thời VH và trạng thái Unicode đang làm, chọn ba cột và sắp mã. AND: 2.3; chuỗi Unicode: 2.2; kết và nguồn cột: 3.4. | Answer cùng hướng. Không thấy thiếu tiền đề; chưa chạy để kiểm kết quả. |
| 3-4-3 | Kết theo mã; lọc đang làm trước khi nhóm; nhóm mã và tên, đếm các dòng sau kết, giữ số đếm lớn hơn 5, sắp số giảm rồi mã tăng. 3.4 đoạn trước RunFlow dạy kết hợp JOIN/WHERE/GROUP BY và đơn vị đếm; 3.1–3.3 dạy COUNT, nhóm, HAVING; 2.4 dạy sắp nhiều tiêu chí. | Answer cùng hướng, nhóm cả hai cột và đếm hồ sơ; không thấy thiếu tiền đề. Giá trị và thứ tự kết quả chưa được chạy xác minh. |

## Giữ được và câu hỏi vì sao

- Vì sao phải chỉ rõ nguồn `MaPB`? Cả hai bảng đều có cột này; đoạn bí danh và Hay nhầm giải thích. Vì sao `ON` cần viết? Bài nói không tự sinh từ tên cột và minh họa so hai mã. Vì sao không mặc định số dòng không đổi? Đoạn sau LineMap nêu điều kiện khóa, không khớp và nhiều khớp; câu trả lời sau Result nhắc giới hạn.
- Vì sao VLOOKUP và JOIN có thể khác? Đoạn sau LineMap chỉ rõ không khớp và nhiều dòng khớp. Vì sao nhóm theo hai cột? Đoạn trước RunFlow cho quy tắc và Hay nhầm nêu hệ quả lỗi nếu chọn tên mà không nhóm; bài 3.2 cung cấp nền nhóm nhiều cột.
- Bản HTML thể hiện SQL, kết quả và các phần drawer; không thấy backtick bị lộ trong văn bản bài, không thấy chuỗi escape `\\t` hiển thị. Các ký tự backtick còn lại nằm trong script HTML. Định dạng đánh dấu khái niệm và dẫn chứng nhìn chung nhất quán.

## Chưa xác minh

Không kiểm database thật, ràng buộc, số liệu 48 dòng hoặc dữ liệu tên/mã; không chạy SQL, answer hay bộ chấm, không gọi API. Chỉ đọc HTML nên không chứng minh được thao tác mở drawer, focus/highlight khi tương tác, copy/paste, bàn phím, SSMS, viewport hoặc CSS thực tế. Cần tác giả kiểm trực quan sau khi bổ sung bảng đầu vào bên phải; không suy diễn kết quả UI từ source.

## Những mục cân nhắc nhưng để ngoài phạm vi

- Không yêu cầu thêm ví dụ không khớp hay nhiều khớp vào dữ liệu thật của tình huống: bài đã nêu hành vi và giới hạn; kiểm giữ dòng không khớp học ở 3.5. Không kết luận ví dụ hoặc tổng sai từ thẻ xem nhanh/trích năm dòng.
- Không đề xuất khôi phục khung cũ hoặc yêu cầu người chỉ học web dùng SSMS; bài này không bắt người học thao tác SSMS. Không đánh giá các bài khác, các báo cáo khác, kiểm tích hợp hay trạng thái push/deploy.

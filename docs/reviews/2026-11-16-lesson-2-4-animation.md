# Review độc lập — bài 2.4, minh họa ORDER BY và TOP

## Finding

1. **Ảnh tĩnh `select.png` và cảnh SELECT trong `animation.gif`: đầu vào không cho thấy hai cột được chọn.** Bên trái ghi “Bảng nguồn / NhanVien”, trích `MaNV`, `NgayVaoLam`, `TrangThai`, còn bên phải có thêm `Họ tên`, `Mã phòng`. Tôi không lần được `Trần Thị Mai` và `KT` từ đầu vào nào sang kết quả; hình cũng quay về bảng trước lọc với `NV020` gạch ngang thay vì hiển thị trực tiếp đầu ra WHERE làm đầu vào SELECT. Nhãn trích là đúng nhưng không đủ giải thích thao tác chọn cột, nhất là khi hai giá trị xuất hiện mới ở đầu ra. Đề xuất: dùng bảng trích sau WHERE ở bên trái, hiện đủ bốn cột nguồn sẽ chọn, rồi đối chiếu với bốn cột đã đổi tiêu đề ở bên phải; giữ rõ tổng 45 và phạm vi trích. Đây là finding về khả năng theo dõi minh họa, không phải kết luận SQL hoặc kết quả sai.

## Điều giữ được

- Lời giảng nêu rõ mỗi tiêu chí có hướng riêng, thứ tự ưu tiên, mặc định ASC, TOP là tối đa và cùng ngày thì dùng mã phân thứ tự; ví dụ giả định NV040/NV044 giải thích được vì sao tiêu chí phụ ảnh hưởng người được chọn ở ranh giới.
- Source đặt cấu trúc mới trước SQL đầy đủ; minh họa sát SQL; sau đó có giải thích NV044 so với NV040, bảng kết quả và câu trả lời nghiệp vụ. Thứ tự logic trong source là FROM → WHERE → SELECT → ORDER BY → TOP, phân biệt vị trí viết TOP với lúc giới hạn dòng. Bài 2.2 đã nêu SQL Server tự chọn cách đọc dữ liệu khi thực thi.
- Kiểm trực tiếp poster và năm ảnh tĩnh: nhãn 48 nguồn, 45 sau lọc, 45 khi chọn/xếp, 5 sau TOP và phạm vi dòng/cột trích nhất quán với bước dữ liệu. Các dòng ORDER BY và TOP trong ảnh khớp source; TOP hiện đủ năm dòng, trích hai trong bốn cột. WHERE minh họa NV020 bị loại, không đồng nhất ba dòng trích với 45 dòng tổng.
- Đã xem các khung được lấy mẫu từ GIF, gồm các khung giữa khi các dòng chuyển ở ORDER BY và TOP. Trong các khung xem được, mã đi cùng ngày; thứ tự sáu dòng và năm dòng đầu phù hợp ảnh tĩnh, ORDER BY trước TOP. Đây là kiểm mẫu khung, không khẳng định đã xem mọi khung hay đo khả năng đọc thực tế trên màn hình hẹp.

## Tiền đề từng đề

Đã tự xác định hướng giải từ đề trước khi đọc `answer`; không chép đáp án vào report.

| Đề | Cách làm và tiền đề | Kết quả đối chiếu |
|---|---|---|
| 2-4-1 | Chọn bốn cột theo thứ tự (2.1), lọc một trong hai mã bằng IN hoặc OR (2.3), không lọc trạng thái, không TOP, xếp phòng/ngày/mã tăng (2.4, Vận dụng). | Đủ tiền đề; answer cùng hướng và đáp ứng phạm vi, thứ tự cột/dòng. |
| 2-4-2 | Lọc đồng thời mã IT và trạng thái đang làm bằng AND (2.2–2.3), chuỗi tiếng Việt có N, chọn ba cột (2.1), TOP tối đa ba, ngày giảm rồi mã tăng (2.4). | Đủ tiền đề; answer cùng hướng. |
| 2-4-3 | Lọc đồng thời KT và đang làm, chọn ba cột như trên; TOP tối đa bốn, ngày tăng rồi mã tăng (2.4, Vận dụng). | Đủ tiền đề; answer cùng hướng. |

## Phạm vi và giới hạn

- Review source MDX, YAML, nguồn dựng và ảnh xuất; không dùng bài sau để bù tiền đề, không đọc report cũ, không chạy SQL/API. Không xác minh độc lập số liệu trên database hay tính đúng dữ liệu thực tế chỉ từ source/ảnh.
- Manifest mới hơn các ảnh tĩnh; SHA-256 của GIF và ảnh ghi trong manifest được đối chiếu với nội dung tệp. Bản đã xem: MDX `2de230d6ab778f6bc5acf2fe4da6c2a51e84b21382693c3dc689321999d14eda`; YAML `418dd1377a870c6cda8acf4494c85751542e52bd05a36c626d63aafefe029e38`; nguồn dựng `066148fe11761efbf5237a1db4b447914f64a06500459e47f4c0704e537066f7`; manifest `b6e1747429caf4aad1bcc0657fa5686b210a3c3a7fec7d06f5810dfb02b29c59`. Hash không thay cho kiểm từng phụ thuộc hoặc kiểm SQL.
- HTML: không kiểm bản build khớp. Theo thông tin được giao, build đầy đủ dừng ở tài nguyên bài 2.5 lỗi thời; không coi dist hiện tại là bằng chứng. UI: không thử trình duyệt, nút phát/dừng, bàn phím, giảm chuyển động, lỗi tải ảnh hoặc màn hình hẹp; đọc source/ảnh không chứng minh các tương tác này.
- Reviewer được giao cấu hình `gpt-6.1-terra`, high, ngữ cảnh mới; không có bằng chứng độc lập trong lượt này để xác minh model thực tế. Không sửa bài, test hay Git.


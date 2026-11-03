# Review độc lập bài 3.7 — bản nháp trước khi mở YAML

Nguồn: snapshot 2026-11-03T14:42:10Z, MDX SHA-256 `613b9074ddfde0cb27d4079b02540660cd7990d18767ba1d046a95a83d698727`; HTML SHA-256 `bea0f2023ff34836183fe4f4ca12aaf4b698239fe1f45735786abd68975f8a6e`. Manifest ghi build 21:40:42, 190 trang. Reviewer GPT-6.1 Terra/high, ngữ cảnh mới.

## Tự làm từ đề không đáp án

| Đề | Cách dự kiến và tiền đề từ bài | Thiếu/chưa xác minh |
|---|---|---|
| 3-7-1 | Đặt `NhanVien` vai trò nhân viên rồi kết chính bảng vai trò quản lý theo `ql.MaNV = nv.MaQuanLy`; lọc `nv.MaQuanLy = 'NV007'`, chọn mã/tên phía nhân viên và tên phía quản lý đặt `HoTenQuanLy`, xếp mã nhân viên. Bài 3.7 giải thích hai vai trò, trực tiếp và điều kiện kết; 2.1, 2.2, 2.4 dạy chọn/đặt tên, lọc và xếp. | Với khóa ngoại và mã cần tìm có thật, INNER hoặc LEFT đều có thể phù hợp; chưa xác minh dữ liệu. |
| 3-7-2 | Giữ phía nhân viên bằng LEFT JOIN, kết mã quản lý sang mã nhân viên của vai quản lý; WHERE lọc `nv.MaPB = 'NS'`. Chọn mã/tên nhân viên, `ql.MaNV` đặt `MaQuanLy`, `ql.MaPB` đặt `MaPhongQuanLy`, xếp mã nhân viên. 3.7 nói phân biệt cột của mỗi vai và giữ NULL; 3.5 giải thích LEFT JOIN, 2.1/2.2/2.4 chọn, lọc, xếp. | Không thấy thiếu tiền đề; chưa xác minh dữ liệu. |
| 3-7-3 | Đặt vai người được thống kê `ql` ở FROM, LEFT JOIN vai cấp dưới `nv` qua `nv.MaQuanLy = ql.MaNV`, đặt trạng thái cấp dưới đang làm trong ON; WHERE chọn trạng thái đang làm của `ql`; nhóm theo cả mã/tên `ql`, đếm `COUNT(nv.MaNV)`, đặt tên và xếp mã. Bài 3.7 giảng rõ đảo phía, hai trạng thái và COUNT; 3.1–3.2 giải thích đếm và nhóm, 3.5 ON/WHERE. | Không thấy thiếu tiền đề; chưa xác minh số kết quả. |

## Đối chiếu YAML sau lời giải độc lập

Ba cách dự kiến tương ứng với answer: 3-7-1 dùng LEFT JOIN và lọc mã phía nhân viên; 3-7-2 chọn mã và phòng từ phía quản lý; 3-7-3 giữ người thống kê, đặt điều kiện trạng thái cấp dưới ở ON rồi lọc người thống kê ở WHERE. Thứ tự cột và ORDER BY trong answer phù hợp đề khi đọc tĩnh. Không chạy đáp án nên không xác nhận kết quả thực tế hoặc hành vi bộ chấm. Không thấy thiếu tiền đề cần bổ sung để bắt đầu cả ba đề; đề 3 cần kết hợp nhiều mảnh kiến thức, nhưng phần 3.7 chỉ vị trí các điều kiện và bài 3.1–3.2 đã dạy COUNT/GROUP BY.

## Nhận xét

Không phát hiện lỗi nội dung cần sửa từ việc đọc tĩnh trong phạm vi được giao. Đây không phải chứng nhận số liệu hoặc khả năng tự học của mọi học viên. Không có nhận xét bắt buộc cắt/gộp: đoạn phân vai và đoạn đếm nhìn giống bổ sung, nhưng phục vụ hai hướng kết khác nhau và ba bài tập; ba mục Hay nhầm nêu ba sai sót khác nhau. Có thể giữ các nhắc lại trong Ghi nhớ và tự kiểm tra vì chúng là phần ôn.

- Vì sao cùng một bảng phải có hai bí danh? Bài giải thích hai vai trò và nói không tạo thêm bảng, ngay sau LineMap. Vì sao mã NV005 đưa ra tên Vũ Thị Lan? LineMap và ví dụ phía quản lý cho thấy `nv.MaQuanLy` đối chiếu `ql.MaNV` và chọn `ql.HoTen`.
- Vì sao dùng LEFT JOIN? Bài chỉ rõ NV004 có mã quản lý NULL và INNER JOIN loại dòng. Vì sao vẫn 48 dòng? Bài nêu khóa chính duy nhất và khóa ngoại cho phép NULL, rồi giải thích tối đa một cặp cho mỗi hồ sơ. Vì sao không suy cấp gián tiếp? Chuỗi NV001 → NV005 → NV004 được phân biệt thành hai quan hệ trực tiếp.
- Để làm gì khi đảo vai? Phần đếm giải thích đặt người thống kê bên trái, nhóm và đếm mã cấp dưới; phân biệt điều kiện hai phía ở ON/WHERE và hậu quả COUNT(*). Giới hạn phòng và quản lý hiện lưu, không suy lịch sử, được nêu trước và sau kết quả.
- Excel minh họa đúng nội dung chính: mã ở C2 dò hai cột A:B của cùng sheet, ô D2 nhận tên; `IF` giữ ô trống theo cách trình bày Excel, không khẳng định đã đổi NULL nguồn. Tình huống, giả định, kết quả trích và câu trả lời liền sau kết quả khớp hồ sơ công ty; ứng dụng nói việc làm cụ thể. Bốn câu ôn nằm sau Ghi nhớ, đáp án đã có trong lời giảng và bao gồm hai vai, dò mã, giữ NULL, đếm.

## Rà các khối và bản render

- `LineMap` có năm dòng, mỗi dòng có ví dụ cụ thể; SQL chính và query của RunFlow trùng nhau trong nguồn. Mỗi focus là đoạn tương ứng; `SELECT` tiếp dòng có tab escape nhất quán. Mọi bước `sql` đã đọc trong nguồn, không coi đó là chữ hiện trên trang.
- FROM: đầu vào chỉ bảng NhanVien và vai `nv`; bản trích ba cột, ba dòng, tổng 48. LEFT JOIN: đầu vào lấy ba cột bước trước, có `MaQuanLy`; bảng phải ghi rõ trích ba trong 48, đủ mã và tên để đối chiếu NV001, NV005, NV004. Kết quả năm cột thể hiện hai phía, giữ NULL. SELECT: đầu vào có cả tên phía quản lý, kết quả còn bốn cột, tiếp tục 48 dòng. ORDER BY: đầu vào có cột mã để thấy thứ tự trích NV005/NV004/NV001 được đổi; kết quả trích năm dòng đầu, vẫn 48 dòng và bốn cột. Không có WHERE/CASE trong câu chính nên không cần bảng soi điều kiện/nhánh. Các số tổng được đối chiếu nội bộ với lời và hồ sơ công ty, chưa tự chạy xác minh database.
- Đã đọc các lời `input`, `meaning`, `detail`, `examples`, tiêu đề và chú thích; ví dụ bên phải đủ lần đường khớp, nêu rõ là bản trích. Không phát hiện đứt cột hoặc mâu thuẫn giữa ba dòng trích liên tiếp; hai dòng NV002/NV003 xuất hiện ở bước sắp xếp là bổ sung trong năm dòng đầu toàn kết quả, không phải tuyên bố chỉ sắp ba dòng trích.
- HTML snapshot của bài và ba trang bài tập có các tiêu đề tương ứng. Đọc text HTML cho thấy câu chính, dữ liệu ví dụ, tự kiểm tra; không thấy backtick hoặc chuỗi `\\t` lộ trong phần text ngoài script/style. SQL trong text chứa tab thật ở dòng tiếp. Đọc HTML không xác minh được độ rộng tab bốn cột, focus khi tương tác, copy/paste, bàn phím hay việc mở drawer; không khẳng định các thao tác đó đã đạt. Không có Messages/Ssms/Erd trong bài cần rà.

## Giới hạn

Review chỉ đọc source và HTML snapshot, prompt và YAML sau khi lập nháp. Không đọc report cũ, database hay tài liệu SQL ngoài khóa học; không chạy SQL, API, runner, test, build hoặc browser. Chưa tự kiểm SQL live, tổng thực, bộ chấm, UI tương tác, SSMS, copy/paste hay bàn phím. Manifest cung cấp thời điểm và hash snapshot/build; không suy từ đó rằng reviewer đã chạy build hoặc kiểm backend.

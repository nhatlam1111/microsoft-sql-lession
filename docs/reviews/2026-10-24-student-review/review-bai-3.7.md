# Review độc lập bài 3.7 — Self join: ai quản lý ai

- Công cụ: Codex; kế thừa model của phiên, không chỉ định model khác.
- Phạm vi: toàn bộ MDX 3.7, YAML ba bài tập, bốn bước `RunFlow` cùng nội dung drawer; đối chiếu bài trước và HTML production có thời gian sửa 25/10/2026 00:20:11.
- Góc đọc: học viên học tuần tự, chỉ dùng lời giảng của khóa học; không dùng kiến thức bên ngoài để bù chỗ thiếu.

## Kết luận

Không phát hiện mục cần sửa trong phạm vi lượt này. Ba câu tự kiểm đã nằm ngay sau `Memo`, trước `## Bài tập`, cả trong MDX (dòng 487–508) và HTML production. Các câu hỏi phủ đúng ba ý: hướng dò mã, giữ người không có quản lý và đếm cấp dưới không tính dòng `NULL` được giữ lại. Giữ nguyên bộ câu hỏi và ví dụ SQL/Result `6/6/0`; không cần thêm truy vấn hoặc câu hỏi trùng.

## Rà theo thứ tự bài

| Vị trí, câu gốc ngắn | Đánh giá | Lý do và đề xuất |
|---|---|---|
| Tình huống: “mọi hồ sơ nhân viên kèm mã và tên quản lý trực tiếp” | Giữ được | Giả định chốt gồm người đã nghỉ, quản lý hiện lưu, bốn cột và một cấp trực tiếp. Người học không phải tự suy phạm vi thời gian hoặc cấp gián tiếp. Giữ nguyên. |
| Excel: “`C2` là mã quản lý `NV005`, `D2` là tên `Vũ Thị Lan`” | Giữ được | Công thức dò đúng vai trò trong chính sheet, ô đánh dấu khớp lời; điều kiện ô trống giải thích cách hiển thị chuỗi rỗng. Phần SQL sau đó phân biệt chuỗi rỗng với `NULL`. Không cần bổ sung một hình khác. |
| Định nghĩa: “Self join là kết một bảng với chính nó bằng các bí danh khác nhau” | Giữ được | Nêu rõ vẫn dùng `INNER JOIN`/`LEFT JOIN`, không có từ khóa riêng hoặc hai bảng mới. Cặp `nv`/`ql` và ví dụ `NV001` → `NV005` làm rõ cả hướng kết và nguồn họ tên. Bí danh cùng dấu chấm đã được dạy ở 3.4. |
| Giữ hồ sơ: “Chọn `LEFT JOIN` từ vai trò `nv`” | Giữ được | Có lý do giữ `NV004`, giải thích `NULL` có thể có chủ đích và điều kiện khóa chính/khóa ngoại làm số dòng giữ ở `48`. Không hứa mọi self join đều giữ số dòng; không gọi giám đốc là hồ sơ lỗi. |
| Đếm: “`COUNT(nv.MaNV)` chỉ đếm mã cấp dưới khác `NULL`” | Giữ được | SQL chọn ba mã, không lọc trạng thái; Result và lời giải cùng là `NV004 = 6`, `NV005 = 6`, `NV048 = 0`, đánh dấu dòng số `0`. Giải thích `COUNT(*)` thành `1` đủ để hiểu bẫy. Lời dẫn tách trạng thái của hai vai trò, nối đúng kiến thức `ON`/`WHERE` ở 3.5. Giữ nguyên ví dụ đã có. |
| Câu lệnh cho tình huống: “Chị Hạnh nhận `48` dòng; hình trích `10` dòng đầu” | Giữ được | Đủ bốn cột, sắp theo mã nhân viên, giữ mã quản lý nguồn và tên quản lý `NULL` của `NV004`. Lời giải đóng tình huống ngay cạnh kết quả; cặp `NV001` → `NV005` và `NV005` → `NV004` ngăn suy nhầm quản lý gián tiếp. |
| `RunFlow`: `FROM` → `LEFT JOIN` → `SELECT` → `ORDER BY` | Giữ được | Đọc đủ `query`, `focus`, `meaning`, `detail`, `sql`, cột, dòng trích và tổng của cả bốn drawer. Các bước cùng phạm vi `48` dòng; giải thích bắt đầu từ từ khóa và cho biết dòng/cột được giữ. Có giới hạn thứ tự logic, câu quan sát riêng và thứ tự trước `ORDER BY`. Không thấy mâu thuẫn giữa sơ đồ với câu chính. |
| Hay nhầm, Ứng dụng, Ghi nhớ | Giữ được | Bốn lỗi nêu hậu quả cụ thể, ba ứng dụng đúng chủ đề quản lý trực tiếp và đếm hồ sơ phụ trách. Ghi nhớ nối với thao tác dò trong Excel. Khái niệm trọng tâm có bold, giá trị và tên bảng/cột trong lời văn dùng code. |
| “Tự kiểm tra” → “Bài tập” | Giữ được | Đúng vị trí hiện hành; ba đáp án ngắn, đều dựa trên phần đã giảng, không dùng tự kiểm để dạy bù. HTML còn đủ thẻ `details`/`summary` và mã trong `code`, không thấy nháy cong phát sinh ở các câu hỏi. Giữ nguyên, không thêm câu trùng. |

## Tiền đề học và khả năng làm đề

Tiền đề khai báo `3.5` đủ qua chuỗi `3.5` → `3.4` → `3.3` → `3.2` → `3.1`: học viên đã biết bí danh bảng, lọc từng phía, hàm đếm và nhóm nhiều cột. Không cần đưa 3.6 thành điều kiện bắt buộc cho self join hai vai trò.

| Đề YAML | Căn cứ người học đã có | Đánh giá |
|---|---|---|
| 3-7-1: mọi hồ sơ có `MaQuanLy = 'NV007'`, lấy tên quản lý | 3.7 dạy hướng `ql.MaNV = nv.MaQuanLy`, nguồn `nv.HoTen`/`ql.HoTen`, một cấp trực tiếp; lọc và xếp mã đã xuất hiện ở bài trước. | Đủ làm. Yêu cầu không lọc trạng thái, thứ tự cột và dòng rõ. |
| 3-7-2: hồ sơ `NS`, lấy mã/phòng của chính quản lý, giữ `NULL` | Hai vai trò ở 3.7 và quy tắc tiền tố ở 3.4 cho phép chọn `ql.MaNV`, `ql.MaPB`; `WHERE` giới hạn nhân viên bên trái và `LEFT JOIN` giữ hồ sơ. | Đủ làm. Đề nói rõ mã quản lý lấy từ người quản lý, không bắt người học đoán nguồn cột. |
| 3-7-3: mỗi hồ sơ đang làm, đếm cấp dưới cũng đang làm, giữ số `0` | Ví dụ 3.7 đã đảo vai trò, đếm khóa khác `NULL` và chỉ nơi đặt trạng thái cấp dưới; 3.5 giải thích `ON`/`WHERE`; 3.2 nêu cột không tổng hợp phải có trong `GROUP BY`. | Đủ làm, gồm việc nhóm cả mã và họ tên. Không cần thêm nguyên câu lời giải hoặc một ví dụ gần trùng đáp án. |

## Các câu “tại sao/để làm gì” tự đặt khi học

| Câu hỏi | Bài đã trả lời? |
|---|---|
| Vì sao một bảng lại cần hai bí danh? | Đã: cùng nguồn có hai vai trò và hai cột họ tên cần phân biệt. |
| Vì sao đem `MaQuanLy` dò sang `MaNV`, thay vì dò lại mã chính mình? | Đã: ví dụ `NV001` lưu `NV005`, kèm hậu quả kết sai cặp mã. |
| Vì sao không dùng `INNER JOIN` cho yêu cầu mọi hồ sơ? | Đã: `NV004` có mã quản lý `NULL` sẽ mất; phần tự kiểm ôn đúng lý do. |
| Vì sao người chưa có cấp dưới vẫn phải có số `0`? | Đã: danh sách cần thống kê đặt bên trái, đếm mã của phía cấp dưới thay vì đếm dòng giữ lại. |
| Vì sao lọc trạng thái cấp dưới ở `ON`? | Đã: 3.7 chỉ đúng vị trí và mục đích giữ `0`; cơ chế chọn cặp trước, lọc kết quả sau đã học ở 3.5. |
| Có suy được toàn bộ cây quản lý từ câu này không? | Đã: bài giới hạn một cấp và tách hai quan hệ trực tiếp trong lời trả lời chị Hạnh. |

## Ưu tiên và giới hạn kiểm tra

1. Không có finding bắt buộc sửa.
2. Giữ nguyên SQL/Result `6/6/0` và ba câu tự kiểm, với vị trí mới trước Bài tập.

Nguồn đối chiếu: `AGENTS.md`; toàn bộ brief của lượt; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; mẫu 1.1; bài 1.5, 2.1, 3.1, 3.2, 3.4, 3.5, 3.6; phần `AND`/`IN` của 2.3 và frontmatter 3.3 để xác nhận chuỗi tiền đề; MDX/YAML 3.7 và `dist/bai/3-7-self-join-quan-ly/index.html`.

Đã đối chiếu tĩnh nguồn và HTML build, chưa kiểm tương tác mở drawer, sao chép/dán hoặc chạy SQL trên trình duyệt. Đối chiếu số liệu với hồ sơ công ty không thay cho chạy database: `48/47`, các dòng trích và `6/6/0` chưa được reviewer xác minh live. Không kết nối database, không đọc seed/`.env`, không tra SQL ngoài khóa học, không đọc review cũ/review khác hoặc báo cáo gốc/ma trận tác giả. Không chạy lại test/build và không tuyên bố các kiểm đó đạt. Chỉ tạo tệp report này; không sửa sản phẩm, test, spec/plan hay commit.

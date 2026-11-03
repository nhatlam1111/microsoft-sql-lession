# Review độc lập bài 3.4–3.5

## Quyết định hiện hành

Người dùng xác nhận ngày 03/11/2026: phần 1 đã xong; từ lượt này chạy ngay agent review theo quy ước, không chờ người dùng tự review. Review bằng Codex dùng GPT-6.1 Terra, effort high. Quyết định này thay phần tự review trong hồ sơ vòng soạn đầu; không cấp quyền commit/push/deploy.

Đã cập nhật AGENTS.md, CLAUDE.md, docs/quy-uoc.md mục 4.5, spec và plan của lượt. Hồ sơ `2026-11-03-lessons-3-4-3-5.md` giữ bằng chứng tự kiểm trước review, không dùng thay report độc lập.

## Gói giao và phiên bản

- Nền Git `63f8f5c`, source working tree trên nhánh `codex/lessons-3-4-3-5-refresh`.
- Gói `temp/review/2026-11-03-lessons-3-4-3-5-terra-high-r1/`: hai brief riêng, manifest hash source/build và source.patch.
- Trước giao đã đối chiếu SHA-256 của hai MDX và tám HTML (hai bài + sáu trang bài tập) với build đã kiểm ở vòng viết.
- Hai agent dùng `fork_turns: "none"`, `model: "gpt-6.1-terra"`, `reasoning_effort: "high"`. Chỉ đọc source/HTML và ghi report được giao; không database/API/browser, không đọc tự kiểm hoặc report reviewer khác để hình thành nhận xét.
- Agent 3.4: `/root/review_34_terra`; agent 3.5: `/root/review_35_terra`. Tên model/effort ở đây là cấu hình giao qua công cụ, không suy đoán từ lời tự nhận của agent.
- Agent tích hợp: `/root/review_integration_terra`, cùng cấu hình và ngữ cảnh mới; đọc bản `integration-v2` sau sửa. Source/build được khóa bằng manifest mới, không gửi nhận xét của hai reviewer trước để dẫn hướng.

## Report gốc

Bản lưu nguyên byte tại `docs/reviews/2026-11-03-lessons-3-4-3-5-terra-high/`:

- `review-bai-3-4-inner-join-vlookup.md`: một điểm P2 về dữ liệu phía danh mục trong drawer JOIN; ba đề có đủ tiền đề theo đánh giá học thử của reviewer.
- `review-bai-3-5-left-join.md`: một điểm cần làm rõ cách nối điều kiện ON bằng AND và một góp ý cắt câu lặp.
- `review-tich-hop-3-4-3-5.md`: không phát hiện finding tích hợp có thể chứng minh trong phạm vi đã kiểm; có giới hạn quy trình nêu riêng bên dưới.
- `versions.json`: SHA-256 của ba report và hai manifest source/build trước/sau sửa. Không sửa kết luận gốc thành lời xác nhận của tác giả.

## Ma trận xử lý

| Nguồn / nhận xét | Quyết định | Căn cứ và kết quả |
| --- | --- | --- |
| 3.4, P2: chỉ thấy hồ sơ ở đầu vào JOIN, chưa thấy mã/tên phía PhongBan | **Làm theo** | Bổ sung bảng trích BGD/KD/KT và tên phòng ngay trong Thực hiện của cùng drawer bằng FlowExamples hiện có theo mục 2.6; kết luận minh họa NV001/KT → Kế toán và đánh dấu dòng kết quả đó. Không thêm component hay cơ chế đầu vào mới. Cả ba mã đều có trong năm hồ sơ đang hiện; ghi rõ trích 3 trong 6 dòng danh mục. |
| 3.5: biết đặt phạm vi vào ON nhưng chưa rõ nối với điều kiện mã | **Làm theo** | Thêm một vế “nối thêm … với điều kiện mã bằng AND trong ON” ngay phần giảng. Tận dụng AND đã học ở 2.3, không thêm truy vấn phụ hoặc dạy bù ở đáp án. |
| 3.5: có thể cắt câu lặp về hai mã được giữ vì không có cặp | **Làm theo** | Cắt vế lý do lặp, giữ câu “Câu lệnh không lọc riêng người mới” vì phân biệt phạm vi yêu cầu với việc kết quả tình cờ là người mới. |
| 3.4: đã cân nhắc thêm tình huống không khớp/nhiều khớp | **Giữ phạm vi** | Không dựng dữ liệu giả hoặc thêm truy vấn ngoài yêu cầu. Giới hạn đã được giảng bằng lời; 3.5 tiếp tục bằng dữ liệu có cả nhiều cặp và không khớp. |
| 3.5: đã cân nhắc bảng riêng toàn bộ HopDong phía phải | **Không thêm** | Mục 2.6 cho phép nêu bảng phải bằng input; 3.5 tập trung giữ phần không khớp, kết quả trích cho thấy ba MaHD khác nhau và hai NULL. Khái niệm tìm cặp nay đã có bảng danh mục cụ thể ở 3.4; không cần in toàn bộ hợp đồng hoặc mở rộng component. |
| 3.5: đã cân nhắc truy vấn thử việc hoặc định nghĩa riêng cho giá trị 2026-09 | **Không thêm** | Giữ một câu chính; chuỗi kỳ là dữ kiện của đề, còn khóa ghép có ở 1.4. Vế AND mới đáp ứng phần chuyển cú pháp cần thiết mà không đổi tình huống. |
| Tích hợp: suy luận từ khóa ghép tới cột kiểm, thứ tự khi ngày bằng nhau | **Giữ được** | Quy tắc PK không NULL và BangLuong có khóa ghép đã được giảng ở 1.4; 3.5 dạy cách chọn khóa kiểm. Đề 3.5-1 chỉ yêu cầu sắp theo ngày, không tự thêm tie-break hay đổi đề/đáp án/API. |
| Tích hợp: không đánh giá lại toàn bộ 3.6 và schema/API | **Giữ phạm vi** | Chỉ kiểm mạch tiếp nối; 3.6 chưa thuộc lượt chuyển khung. YAML, API và schema/seed không đổi. |
| Cả ba report: SQL/UI và dữ liệu chưa do reviewer tự chạy | **Xác minh kỹ thuật riêng** | Tác giả chạy SELECT, API rollback/check:data và browser như mục kiểm bên dưới. Không gán các kiểm này cho reviewer hoặc lấy kết luận review làm quyền push. |

Không còn nhận xét nội dung hoặc biên tập của hai report riêng chưa được xử lý. Review tích hợp không có finding mới cần sửa.

## Kiểm sau sửa

- Test hồi quy cho 3.4 kiểm từng mã của hồ sơ đang hiện có mã/tên thật ở bảng danh mục: đã quan sát RED do thiếu dữ liệu bên phải, GREEN sau bổ sung. Bộ test đầy đủ **565/565**, 67 file; không thêm test khóa câu chữ phần AND.
- `npm run check`: **0 lỗi, 0 warning, 7 hint nền**. `npm run build`: **190 trang**. `npm run check:dist`: **190 trang / 3.568 link**, không lộ đáp án. `git diff --check`: đạt.
- Tác giả chạy SELECT danh mục: đủ 6 phòng; bản trích 3 dòng được kiểm đúng mã/tên và bao phủ toàn bộ mã của bản trích hồ sơ. Script kiểm nội dung sau sửa có **17 SELECT duy nhất**, 24 lần đối chiếu minh họa không giải đúng bài tập; giữ tổng 48 hồ sơ/55 hợp đồng/57 dòng sau kết/2 không khớp.
- API build và **76 đề** đạt sau sửa; `check:data` sau luồng hoàn tác báo **Không bảng nào lệch**. Không chạy câu ghi ngoài API, không sửa database.
- Browser: mở lại drawer INNER JOIN ở 1280×900 và 1024×768; bảng danh mục, câu đối chiếu và dấu dòng NV001 hiển thị đúng. Bảng trích có ba dòng, kết quả có NV001 ở dòng thứ 5 với class đánh dấu; trang không tràn ngang. Kiểm câu nối AND trên bài 3.5 có trên bản render; khôi phục viewport mặc định. Không chạy/nộp SQL trong browser của vòng này.
- Không thay SQL chính/RunFlow query hoặc chức năng editor; bằng chứng Ctrl+V/khôi phục nháp và clipboard ở vòng trước vẫn được giữ riêng, không nhận là phép kiểm mới.
- Log vòng sau sửa có tiền tố `review-` trong `temp/verification/2026-11-03-lessons-3-4-3-5/`; ảnh `review-3-4-catalog-1280.jpg`, `review-3-4-catalog-1024.jpg`, dữ liệu `review-browser.json`. Bản trước review có 16 SELECT/564 test; bản sau sửa là 17 SELECT/565 test.

## Giới hạn quy trình của review tích hợp

Reviewer tích hợp ghi rõ đã xuất prompt và answer cùng lượt, nên **ma trận của report tích hợp không phải phép tự giải trước khi xem đáp án**. Tác giả không dùng ma trận đó để xác nhận học thử độc lập. Hai reviewer từng bài đã lập hướng giải trước khi đọc answer cho đủ sáu đề và ghi rõ trong report; finding thiếu vế AND đã được sửa, còn review tích hợp kiểm mạch và đối chiếu tĩnh trên bản sau sửa. Không tạo thêm lượt review trùng để nhận một kết luận giả về việc đã “quên” đáp án.

Cả ba reviewer chỉ đọc source/HTML, không tự chạy SQL/UI. Excel thật, screen reader, SSMS và các thiết bị cảm ứng chưa được kiểm. Không có quyền push/deploy phát sinh từ các review này.

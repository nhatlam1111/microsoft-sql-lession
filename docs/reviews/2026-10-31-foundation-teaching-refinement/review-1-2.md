# Review độc lập bài 1.2 — Bảng, dòng và cột

## Phạm vi, phiên bản và cách kiểm

- Reviewer: **Codex, kế thừa model của phiên**, không đổi model; học thử theo nền tảng Excel văn phòng cơ bản, chưa biết SQL/lập trình. Không dùng bài sau hoặc đáp án để bù tiền đề.
- Nguồn: `src/content/lessons/1-2-bang-dong-cot.mdx`, commit `ae7a2f3a0aa3c60e39babe0aeae356d49d8ea534`; `git rev-parse HEAD` khớp gói giao việc, `git diff -- <MDX>` không có thay đổi. Không có YAML.
- HTML: `dist/bai/1-2-bang-dong-cot/index.html`, thời gian file 31/10/2026 21:33:11 giờ Việt Nam, sau MDX 21:31:47. Đã đọc toàn bộ phần article và đối chiếu nội dung với MDX; chưa có bằng chứng độc lập về quy trình build ngoài gói giao việc và đối chiếu này.
- Đã đọc `AGENTS.md`, toàn bộ quy ước/template/hồ sơ công ty, bài 1.1, và chỉ ba mục quyết định được giao trong spec `2026-10-31-foundation-teaching-refinement-design.md`. Không đọc trạng thái tác giả, report cũ hay nhận xét người khác.
- Công cụ thực tế: PowerShell đọc file/HTML, Git chỉ đọc, `view_image` xem PNG nguồn và WebP được HTML tham chiếu. Không mở browser, chạy SQL/API/runner/test, đọc script database, secret hay tài liệu SQL ngoài khóa học.

Giữ đúng phạm vi: `noScenario: true`, `noExercises: true`, 7 phút ước tính, ba câu ôn sau Ghi nhớ; không cần thêm cú pháp hoặc bài tập SQL.

## Rà theo thứ tự bài

Các vị trí dưới đây đều thuộc `src/content/lessons/1-2-bang-dong-cot.mdx`.

| Vị trí | Đánh giá và căn cứ | Tác động / đề xuất tối thiểu |
|---|---|---|
| Dòng 23–32; ảnh/caption dòng 25–27 | **Giữ được.** Mở từ sheet rồi định nghĩa bảng, dòng/bản ghi và cột ngay cạnh hình. Văn bản nói rõ hình chỉ trích ba dòng/ba cột, không phải toàn bảng. Ảnh nguồn và WebP đều đánh dấu đúng dòng `NV005` và cột `HoTen`; ba hồ sơ và ngày trong ảnh khớp hồ sơ công ty. | Người mới có điểm nhìn cụ thể để phân biệt hai hướng của bảng. Không cần thêm bảng thuật ngữ hoặc hình. |
| Dòng 36–38 | **Giữ được.** Phân biệt tên cột với dòng dữ liệu, nói bảng không gộp ô, rồi nối sang việc lọc đúng cột và cái giá khi thêm cột. | Đã trả lời được bảng chặt hơn sheet để làm gì, không chỉ liệt kê khác biệt. |
| **Dòng 42** | **Biên tập.** Trích: “Tách bảng thì `HopDong` có ba dòng”. Câu trước đang nói riêng `NV021`, nên ngữ cảnh đủ để hiểu đúng; tuy nhiên câu này bỏ mất phạm vi khi nhắc số dòng của bảng. | Có thể đọc lướt thành toàn bảng `HopDong` chỉ có ba dòng. Đổi thành “Riêng `NV021`, `HopDong` có ba dòng…”; không cần thêm đoạn hoặc bảng số liệu. Đây là vấn đề diễn đạt, không kết luận số liệu sai. |
| Dòng 42–46 | **Giữ được.** Dạy đơn vị mỗi dòng của hai bảng, lý do tách để tránh lặp thông tin và mã liên hệ trước câu ôn. Đặc biệt, dòng 44 nói rõ mã nhân viên lặp ở hợp đồng không đồng nghĩa nhiều hồ sơ nhân viên. | Đủ tiền đề để suy luận số dòng theo một mã, chưa cần học khóa hay cách kết bảng. Lời trỏ bài sau đúng mức nhận diện. |
| Dòng 52–53 | **Giữ được.** Dòng tổng được đặt dưới điều kiện thỏa luật đã khai báo; bài 1.1 đã giải thích luật dữ liệu và “hợp lệ chưa chắc đúng”. Giới hạn thứ tự dòng có cách ứng xử cụ thể: dùng mã để chỉ hồ sơ, yêu cầu thứ tự khi lấy dữ liệu. | Không hứa database tự nhận biết dòng tổng hay tự giữ thứ tự như sheet. Không cần thêm câu SQL minh họa. |
| Dòng 61–73 | **Giữ được.** Hai ứng dụng bám việc mô tả bảng/dòng/cột và chuẩn bị cấu trúc file. Memo ôn lại các ý đã có; phần chính không bị giấu sau khối mở. | Độ tải phù hợp bài nền; không thấy đoạn nào cần cắt vì lặp thừa ngoài Ghi nhớ/ôn. |
| Dòng 78–94 | Ba câu ôn đặt đúng chỗ và phủ các mục tiêu; riêng cách hỏi câu 2 cần làm rõ như mục dưới. | Không cần tăng số câu ôn hoặc thêm lý thuyết. |

### Finding cần làm rõ ở câu ôn 2

**Vị trí:** `src/content/lessons/1-2-bang-dong-cot.mdx:85`.

**Trích ngắn:** “`NV005` và `HoTen` mỗi cái thuộc dòng hay cột?”

**Đánh giá: Cần làm rõ.** `NV005` là giá trị mã, còn `HoTen` là tên cột. Với cách hỏi “thuộc”, người mới có thể trả lời `NV005` thuộc cột `MaNV`, điều đúng với chính hình, nhưng lệch hướng mà đáp án muốn kiểm. Phần giảng không thiếu kiến thức: dòng 27 đã giải nghĩa mã, dòng 31 đã nói dòng của `NV005`. Vướng ở cách đặt hai loại thông tin vào cùng lựa chọn dòng/cột.

**Sửa tối thiểu:** hỏi trực tiếp theo hình, chẳng hạn “Trong hình, chỉ ra dòng mang mã `NV005` và cột `HoTen`. Mỗi dòng của `NhanVien` là gì?” Cách này kiểm đúng mục tiêu nhận diện và đơn vị dòng, không phải thêm khái niệm ô hay dạy bù trong đáp án.

## Tiền đề từng câu tự kiểm tra

Đã thử xác định cách trả lời từ phần giảng trước khi đối chiếu phần đáp án. Không có bài tập SQL/YAML.

| Câu | Kiến thức cần | Được dạy trước ôn ở đâu | Đánh giá |
|---|---|---|---|
| 1 — so bảng với Excel, dòng 78 | Bảng gần với sheet; cấu trúc cột, ô gộp, tên cột và dòng dữ liệu khác nhau | Dòng 23, 30–38; được nhắc lại ở Memo 69–72 | Đủ tiền đề, kiểm trực tiếp mục tiêu so sánh. Đáp án không thêm kiến thức. |
| 2 — `NV005` / `HoTen`, dòng 85 | Đọc dấu dòng/cột trên hình; hiểu mã nhận diện hồ sơ và tên cột | Caption 27, định nghĩa 31–32, hình minh họa | Đủ kiến thức nhưng câu hỏi mơ hồ về “thuộc”, như finding trên. Đáp án không phải nơi dạy bù. |
| 3 — một mã có ba hợp đồng, dòng 92 | Mỗi dòng `NhanVien` là hồ sơ; mỗi dòng `HopDong` là hợp đồng; lặp `MaNV` không phải nhiều hồ sơ | Dòng 31, 42–44 | Đủ tiền đề. Đề nói rõ “riêng mã này”, nên không nhầm ba dòng của mã với tổng toàn bảng. Có suy luận theo đơn vị dòng và lý do tách bảng. |

## Những câu “vì sao / để làm gì” khi học thử

| Câu tự đặt ra | Bài trả lời được ở đâu |
|---|---|
| Vì sao phải quan tâm bảng khác sheet? | Dòng 36–38: cấu trúc cột giúp đọc/lọc và đổi lại là phải sửa thiết kế khi thêm cột. |
| Vì sao không để hồ sơ và hợp đồng chung một bảng? | Dòng 42: thông tin nhân viên sẽ lặp theo hợp đồng, dễ sửa sót. |
| Vì sao ba lần xuất hiện một mã không phải ba nhân viên? | Dòng 31 và 44: đơn vị dòng tùy bảng; ở hợp đồng là một hợp đồng. |
| Vì sao không thêm dòng tổng như Excel? | Dòng 52: có thể tạo một “hồ sơ” không phải người; tổng được tính khi lấy dữ liệu. |
| Vì sao không dùng “dòng số 2” để chỉ hồ sơ? | Dòng 53: thứ tự không cố định; dùng mã để chỉ hồ sơ. |

Không còn câu hỏi nền tảng nào trong phạm vi mục tiêu phải lấy bài sau mới trả lời được.

## Ưu tiên và giới hạn

1. Làm rõ cách hỏi câu ôn 2; kiến thức cần thiết đã có, chỉ cần sửa câu hỏi.
2. Biên tập phạm vi ba dòng ở dòng 42; một vế ngắn là đủ.

Không thấy lỗi kiến thức có căn cứ cần mở rộng bài. Phần giảng hiện cung cấp đủ tiền đề cho cả ba câu ôn, với vướng diễn đạt ở câu 2. Các khối HTML đã đối chiếu không lộ backtick/escape, tên cột/mã giữ dạng code, ảnh có alt/caption và các khối ôn hiện đủ trong HTML.

Đây là review nội dung và HTML tĩnh, không phải xác nhận UI tương tác hoặc kỹ thuật live. Chưa kiểm viewport, bàn phím, thao tác mở câu ôn/nút hoàn thành hay bố cục trong browser. Không kiểm trực tiếp database: 48 hồ sơ và ba hợp đồng của `NV021` chỉ đối chiếu được với hồ sơ công ty; con số 12 cột chưa được xác minh từ schema. Thời lượng 7 phút là ước tính của bài, chưa có đo người học thực tế. Không có SQL/RunFlow/SSMS hay bài tập thực hành trong bài này để kiểm.

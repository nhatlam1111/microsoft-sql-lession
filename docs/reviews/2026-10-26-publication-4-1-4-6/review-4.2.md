# Review độc lập bài 4.2 — kết quả học thử source

Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

## Phạm vi, phiên bản và công cụ thực tế

- Đọc hết `src/content/lessons/4-2-xep-hang-row-number-rank.mdx` (dòng 1–466), gồm từng SQL/Result và đủ bốn drawer RunFlow, rồi học thử cả ba đề từ `public-4.2.json`.
- Phiên bản theo gói giao: source `dd67309`, nhánh `codex/review-lessons-4-1-4-6`; root báo chỉ thêm plan sau source này, chưa sửa bài. Không tự xác nhận commit bằng Git. Chưa có build mới được giao, không dùng dist cũ.
- Đã đọc AGENTS.md, `docs/quy-uoc.md` đầy đủ (gồm 4.5/4.6), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1 và toàn bộ các bài trước được chỉ định: 4.1, 3.6, 2.4, 3.1. Không dùng kiến thức bài sau để bù lời giảng.
- Dùng PowerShell đọc file có số dòng, `rg --files` tìm đường dẫn và kiểm chuỗi/cấu trúc source bằng PowerShell. Không thực thi SQL, không đọc seed/secret, không gọi API/runner/DB, không browser, không sửa sản phẩm/test/docs/Git, không tạo agent con. Không đọc report cũ hoặc nhận xét reviewer khác. Model kế thừa phiên, không chọn model khác.
- Phép kiểm source ban đầu lỗi cú pháp pipe của PowerShell, sau đó được sửa lệnh và chạy lại thành công; đây không phải lỗi sản phẩm.

Giai đoạn 1 được ghi và khóa ở `review-4.2-phase1.md` trước khi mở YAML. Hash SHA-256 lúc khóa: `9D8284721AB3F1FC53D07BAD9BFA379F84F70C2583A94F3C1FC20A4BD178B5C0`. Sau đó mới đọc duy nhất YAML cùng slug, dòng 1–52, để đối chiếu; không sửa phase1 sau khi biết đáp án. Report này không chép đáp án SQL.

## Rà theo thứ tự bài

| Phần | Bằng chứng và đánh giá |
|---|---|
| Mục tiêu và tình huống — MDX 8–24 | **Giữ được.** Mục tiêu tập trung chọn một dòng gần nhất trong mỗi nhóm và phân biệt đánh số/đồng hạng. Mốc 21/10/2026, điều kiện ngày, phạm vi trạng thái và khóa phân định đều rõ. Câu gốc “không xác nhận hợp đồng còn hiệu lực hay hợp lệ pháp lý” tránh suy ra bài toán khác từ thao tác chọn dòng. |
| Excel → cửa sổ — MDX 30–36 | **Giữ được.** “vẫn giữ các dòng chi tiết” giải nghĩa hàm cửa sổ bằng điều người học đang cần; không dựa vào PivotTable/VLOOKUP chưa chắc biết. ROW_NUMBER, OVER, PARTITION BY và thứ tự trong nhóm được giải thích trước câu mẫu. MaHD duy nhất phân định khi cùng ngày; không bị hiểu thành chứng nhận hồ sơ đúng. CTE/lọc ở câu ngoài nối đủ bài 4.1. |
| Kiểm NV021 — MDX 38–54 | **Giữ được.** Result có đủ ba dòng mang số 1/2/3; học viên nhìn thấy đánh số chưa làm mất hợp đồng cũ. Điều kiện ngày có trước đánh số; lời giảng nói rõ hợp đồng sau mốc không được chiếm số 1. Câu kiểm này lọc MaNV, còn câu chính phía sau mới lọc SoThuTu=1; không thấy mâu thuẫn giữa hai mục đích. |
| Đồng hạng và giới hạn — MDX 58–82 | **Giữ được.** Chín dòng được hiển thị đầy đủ, cho phép tự kiểm RANK 1/3/6 và DENSE_RANK 1/2/3. Có lý do thêm MaDon cho ROW_NUMBER nhưng không cho hai hàm đồng hạng. “ngoài cùng chỉ sắp bảng trả về” tách đúng hai vai trò ORDER BY. Mẫu từng loại có copy=false và được giới thiệu là biểu thức đọc. So sánh giới hạn 3/5/9 dòng đúng từ chính bảng, không cần đáp án hay DB để hiểu. |
| Phạm vi/lời giải — MDX 84–104 | **Giữ được.** Có đoạn “Ở bài này chỉ cần…”. Câu chính dùng CTE tính số thứ tự trên nguồn đạt mốc rồi lọc số 1 ở ngoài, trả đúng ba cột. Lời đáp nằm cạnh Result; “bảng trên trích mười dòng đầu” phân biệt bảng trích với tổng 46. Nêu rõ hai mã chưa có hợp đồng không xuất hiện; chưa biến “mới nhất” thành “còn hiệu lực”. |
| RunFlow — MDX 108–409 | **Giữ được từ source.** Phạm vi sơ đồ chỉ là SELECT ngoài, nói rõ logic và không lưu bảng trung gian. Đã đọc đủ bốn meaning/detail/sql và mọi rows/columns/total; xem bảng kiểm riêng bên dưới. |
| Hay nhầm — MDX 415–417 | **Giữ được.** Nêu hệ quả MAX ngày chưa chọn cả dòng, bỏ ORDER BY cuối và nhầm với hiệu lực; các ý bám trực tiếp mục tiêu. Không thấy cần thêm ngoại lệ SQL để học viên làm đề. |
| Ứng dụng — MDX 425–427 | **Giữ được.** Cả ba ý là việc làm được nhờ chủ đề: một dòng gần nhất, tối đa số dòng theo nhóm, giữ đồng hạng tại điểm cắt. |
| Memo/ôn — MDX 433–458 | **Giữ được.** Ba hàm ở Memo, ba câu ôn đúng vị trí và phủ phân nhóm/khóa phụ, hạng nhảy/liền, số dòng tại điểm cắt. Đáp án đã được giảng tại 32–34, 71–73, 75–82; không dạy bù trong phần ôn. |
| Đề thực hành — MDX 464, public JSON và YAML đúng bài | **Giữ được.** Lời nhắc chấm kết quả/thứ tự và tự đối chiếu kỹ thuật giúp hiểu giới hạn bộ chấm. Ba đề có đường làm độc lập từ phần đã học; đối chiếu hai giai đoạn bên dưới. |

Không phát hiện đoạn cần cắt vì vòng vo hoặc mở rộng ngoài mục tiêu. Phần giải thích, ví dụ và giới hạn nằm đúng chỗ sử dụng; Memo/tự kiểm tra lặp để ôn là có mục đích. 35 phút có cơ sở theo độ tải ba hàm/CTE/ba đề, nhưng chưa đo với người học thật. Bold/code hợp lý trên source; chưa có render để xác nhận hiển thị ký tự.

### Kiểm đủ bốn drawer và SQL lọc cửa sổ

| Drawer | Kết quả rà từng thành phần |
|---|---|
| FROM — MDX 124–198 | Meaning bắt đầu từ FROM; CTE có nguyên điều kiện ngày và ROW_NUMBER. Câu kiểm lấy bốn cột gồm số thứ tự và sắp để đối chiếu như detail đã nói. Bảng trích 10 dòng, total=55. Những mã đầu có số 1 không làm sai tổng 55/46; bài đã dùng NV021 để cho thấy nhóm có nhiều hợp đồng. |
| WHERE — MDX 201–275 | WHERE ngoài nhận cột đã có từ CTE, giữ số 1; câu kiểm còn SoThuTu để nhìn điều kiện. 10 dòng trích đều có số 1, bốn cột, total=46. Không có thao tác lọc kết quả cửa sổ trong WHERE cùng cấp tính nó. |
| SELECT — MDX 278–341 | Chỉ bỏ cột dùng để lọc khỏi báo cáo, giữ ba cột được hỏi. 10 dòng trích, total=46. Câu kiểm và trạng thái cột khớp mô tả. |
| ORDER BY — MDX 344–407 | MaNV tăng dần ở câu ngoài, không dùng thứ tự OVER thay thế thứ tự bảng cuối. Ba cột, 10 dòng trích, total=46; khớp Result chính. |

Phép kiểm source tự động xác nhận: SQL chính trùng RunFlow.query; cả bốn focus đều nằm trong query sau giải mã tab; mọi hàng trích có số ô khớp số cột; tổng source lần lượt 55/46/46/46. Việc thêm ORDER BY trong câu kiểm để xem bảng không bị giới thiệu là thứ tự thực thi vật lý. Không có LineMap/Excel/SSMS/Erd/Messages trong bài để bỏ sót.

## Câu “tại sao/để làm gì” và nơi bài đã đáp

| Câu tự đặt ra | Nơi đã trả lời |
|---|---|
| Tại sao không GROUP BY/MAX ngày để lấy hợp đồng? | 30 và 415: cần giữ các cột trên cùng dòng chi tiết; MAX chỉ cho ngày. |
| Tại sao phải chia theo MaNV và thêm MaHD? | 30–34: bắt đầu số 1 cho mỗi mã; phân định cùng ngày bằng khóa duy nhất. |
| Tại sao lọc ngày trước, số thứ tự sau? | 36, 54: phạm vi trước cửa sổ; WHERE cùng cấp chưa lọc kết quả vừa tính. Có nền CTE ở 4.1. |
| Vì sao hai dòng hạng 1 làm hạng sau 3 hoặc 2? | 58, 69–71: số dòng đứng trước khác số mức SoNgay. |
| Vì sao cùng khóa phụ lại làm mất đồng hạng? | 73: MaDon duy nhất làm hai dòng không còn bằng nhau theo toàn khóa hạng. |
| Tại sao hạng đến 3 có thể nhiều hơn ba dòng? | 75–82: ROW_NUMBER riêng từng dòng; hai hàm còn lại giữ đồng hạng, có so sánh đủ 3/5/9. |
| Tại sao vẫn cần ORDER BY cuối? | 73, 348, 416: thứ tự dùng tính khác thứ tự bảng trình bày. |
| Vì sao thiếu hai người mới và có được gọi là hợp đồng hiệu lực không? | 22, 104, 417: không có hợp đồng thì không có dòng; chỉ áp quy tắc chọn theo ngày đã lưu. |

Không có câu hỏi cốt lõi nào ở trên phải mượn answer hoặc bài 4.3 trở đi mới trả lời được.

## Tiền đề từng đề và đối chiếu sau khi khóa phase1

| Đề | Tiền đề đã xác định trước YAML | Cách làm học thử trước YAML | Đối chiếu YAML và phần còn vướng |
|---|---|---|---|
| 4-2-1 — đánh số đơn chờ duyệt theo loại | WHERE/Unicode từ bài 3.1 và 4.1; ROW_NUMBER/PARTITION BY tại MDX 30–34; thay nhóm thành LoaiNghi tại 75–80; nhiều khóa sắp/alias ở 2.4. | Lọc đúng trạng thái; đánh số riêng từng loại theo số ngày giảm rồi mã đơn tăng; giữ mọi dòng; sắp loại rồi số thứ tự. | Khớp YAML 3–18 về phạm vi, phân nhóm, thứ tự đánh số, bốn cột và thứ tự cuối. Không phát sinh kỹ thuật phải học từ answer. |
| 4-2-2 — hai cách đồng hạng Phép năm | RANK/DENSE_RANK, không PARTITION BY và hai ORDER BY tại MDX 58–73; điều kiện LoaiNghi là áp dụng WHERE đã biết. | Chỉ lọc loại đề nêu; tính hai hạng chung theo SoNgay; mã đơn chỉ dùng ngoài để sắp; không thêm điều kiện ngày/trạng thái hoặc giới hạn. | Khớp YAML 19–32. Đáp án không dùng mã duy nhất để tính hạng và không lén chia nhóm/lọc khác đề. Không thiếu tiền đề. |
| 4-2-3 — tối đa ba đơn mỗi loại | CTE/phạm vi tên ở 4.1; kết quả cửa sổ rồi WHERE ngoài ở MDX 36–54; <=n/từng loại ở 75–82. | Dùng toàn bộ đơn; đánh số riêng theo loại với SoNgay giảm/MaDon tăng; lọc số thứ tự đến ngưỡng ở câu ngoài; trả bốn cột và sắp ba khóa theo đề. | Khớp YAML 33–52 về đầu vào, CTE, điều kiện ngoài và thứ tự. Đổi ngưỡng hai trong minh họa thành ba là áp dụng trực tiếp. Không cần kiến thức chưa giảng. |

**Khác biệt sau đối chiếu:** không có khác biệt có ý nghĩa giữa cách làm đã khóa và kỹ thuật trong YAML. Không thấy tiền đề còn thiếu hoặc đã dạy nhưng khó tìm. YAML công khai đề đúng như public JSON được giao; cả ba có ordered=true. Chưa chạy để xác nhận số dòng/giá trị thực của ba đáp án hoặc hoạt động bộ chấm.

## Ưu tiên và kết luận

- **Cần sửa / Cần làm rõ / Cần cắt / Biên tập:** không có finding cần tác giả sửa từ review source này. Không có điểm số hoặc nhãn nghiệm thu thay cho bằng chứng.
- **Giữ được:** định nghĩa cửa sổ giữ dòng; khóa phân định và đồng hạng; đúng phạm vi trước/sau tính số thứ tự; không vật chất hóa CTE; lời đáp sát Result; ba đề có đủ tiền đề từ phần đã học.
- **Chưa xác minh, không phải finding:** số liệu DB thật cho 55/46 hợp đồng, dữ liệu từng hợp đồng và kết quả ba bài tập; SQL live/cảnh báo của runner; HTML/build đúng source; nháy/tab bốn cột, copy/paste, drawer/keyboard và UI thực tế. 3/5/9 dòng thì đã tự kiểm từ đủ chín hàng source, không cần suy đoán tổng ẩn.

Nguồn tự đọc chỉ gồm brief của lượt, AGENTS/quy ước/template/hồ sơ/mẫu 1.1, MDX 4.2 và bốn bài nền được giao, public JSON, cuối cùng YAML 4.2 sau khi khóa phase1. Hồ sơ công ty và bài trước giúp đối chiếu nội bộ, không thay bằng chứng DB.

Từ nội dung source và các bài nền đã đọc, tôi xác định được đường làm cả ba đề trước khi xem đáp án; đối chiếu YAML không lộ thiếu tiền đề. Kết luận này giới hạn ở học thử nguồn, không xác nhận SQL/UI đã chạy đúng và không phải quyền push/publish.

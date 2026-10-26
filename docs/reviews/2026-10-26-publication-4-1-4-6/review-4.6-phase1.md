# Học thử độc lập bài 4.6 — giai đoạn 1 đã khóa

## Phạm vi, phiên bản và công cụ

- Ngày review: 26/10/2026. Model: kế thừa model của phiên, không chỉ định model khác, không tạo agent con.
- Đọc đầy đủ `reviewer-brief.md`, `AGENTS.md`, `docs/quy-uoc.md` (gồm 4.5/4.6), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, mẫu 1.1 và toàn bộ bài `src/content/lessons/4-6-soi-chat-luong-du-lieu.mdx` (168 dòng).
- Source được giao: `dd67309f91f75b6e4fd9e98ca46dba839d99a96f`, nhánh được giao `codex/review-lessons-4-1-4-6`. Đã tự đọc `git rev-parse HEAD`, khớp commit này. Root thông báo chỉ bổ sung plan, chưa sửa bài.
- Tiền đề đã đọc đầy đủ: 2.5, 2.7, 3.3, 3.4, 3.5, 3.8, 3.10, 4.1. Dùng nền Excel văn phòng cơ bản; không mặc định biết PivotTable/VLOOKUP ngoài phần các bài trước đã giải thích.
- Đề bài chỉ lấy từ `temp/review/2026-10-26-review-4-1-4-6/public-4.6.json`, không có answer/check. **Chưa mở YAML khi ghi xong file này. Không sửa giai đoạn 1 sau khi đọc YAML.**
- Đã tự đọc HTML `dist/bai/4-6-soi-chat-luong-du-lieu/index.html`, thời gian ghi file `26/10/2026 19:07:28` theo đồng hồ máy. Root giao đây là build 132 trang khớp source; tôi không tự chạy build hay đếm 132 trang. Đã đối chiếu toàn bộ phần bài trong HTML, ba khối SQL được trích từ `pre`, ba bảng kết quả và năm `summary` với MDX. Không dùng dist cũ làm bằng chứng.
- Công cụ thực tế: PowerShell đọc file, `rg --files` tìm đường dẫn, Git chỉ đọc HEAD. Không browser/UI, SQL, DB, API/runner/nộp bài; không đọc seed, secret, báo cáo cũ, ma trận tác giả hay tài liệu ngoài khóa học. Không sửa sản phẩm, test, docs hoặc Git. Chỉ ghi hai report được giao.

## Rà theo thứ tự bài

| Phần | Đánh giá và căn cứ |
|---|---|
| Frontmatter, tình huống (dòng 2–28) | **Giữ được.** Mục tiêu là tìm dấu hiệu theo luật và phân biệt nhóm với dòng; phạm vi toàn bộ `NhanVien`/`HopDong`, mọi trạng thái được chốt trước truy vấn. Email thiếu cho danh sách liên hệ được tách khỏi cột bắt buộc khi lưu. Có nhắc bộ mẫu giữ dấu hiệu để học và không sửa nguồn chung. |
| Chốt luật (32–36) | **Giữ được.** `Conditional Formatting` có định nghĩa tại chỗ. Chuyển từ tô trùng/lọc trống/so ngày trong Excel sang `SELECT` trong SQL nằm cùng mạch. Không cần kiến thức VLOOKUP hay PivotTable mới để hiểu bài. |
| Nhóm trùng và hồ sơ (38–44) | **Giữ được.** `GROUP BY SoCCCD`/`HAVING COUNT(*) > 1` trả một dòng mỗi nhóm; kích thước nhóm là số hồ sơ. Bài nói rõ CTE chứa một dòng cho mỗi số trùng, cách kết lại `NhanVien` bằng `INNER JOIN`, và vì sao không nhân thêm dòng. CTE không bị mô tả là bảng được lưu/vật chất hóa. Đã có tiền đề 4.1 về CTE và 3.4 về bí danh, `ON`, từng cặp khớp; 3.5 củng cố đơn vị dòng sau kết. |
| Email thiếu, ngày và cách đếm (46–56) | **Giữ được.** Email thiếu được định nghĩa đủ ba trường hợp: `NULL`, rỗng, chỉ dấu cách thông thường; phép lọc không hứa kiểm định dạng/nhận thư. Luật ngày chỉ là `<`, giải thích cả bằng nhau và `NULL` trước phần ôn. Cách cộng cờ giữ phòng có hồ sơ nhưng số thiếu bằng 0, đồng thời nói rõ không tạo phòng không có hồ sơ. Mỗi nhánh tổng theo luật có mã hằng và `COUNT(*)`, không `GROUP BY` nên có một dòng kể cả 0; đếm hồ sơ sau kết nhóm CCCD. Quy tắc vị trí cột, bí danh nhánh đầu và sắp xếp chung được nêu. |
| SQL 1 và Result 1 (60–70) | **Giữ được về nguồn và logic đọc.** Đã đọc đủ câu `SELECT` nhóm CCCD, nguồn không lọc trạng thái, `GROUP BY`, ngưỡng `> 1`, `ORDER BY SoCCCD ASC`. Result có một dòng `000092242242`, số lượng 2, `total=1`; lời giải phân biệt 1 nhóm/2 hồ sơ. Hồ sơ công ty xác nhận có một cặp hồ sơ mang CCCD trùng; số CCCD chính xác chưa được tôi kiểm bằng DB. |
| SQL 2 và Result 2 (72–81) | **Giữ được về nguồn và logic đọc.** Đã đọc đủ ba cột, điều kiện `IS NULL OR TRIM(Email) = ''`, thứ tự `MaNV ASC`. Result hiện đủ hai dòng `NV044`/`VH`/`NULL`, `NV045`/`KD`/`NULL`, `total=2`; khớp hồ sơ công ty và ví dụ trước ở 2.5. Bài không giả rằng mẫu đang có chuỗi rỗng/dấu cách: câu ngay sau bảng nói hai giá trị thật đang là `NULL`. |
| SQL 3 và Result 3 (83–94) | **Giữ được về nguồn và logic đọc.** Đã đọc đủ bốn cột, điều kiện ngày đảo và thứ tự mã hợp đồng. Result hiện một dòng `HD2025-003`/`NV029`/`2025-03-01`/`2025-02-28`, `total=1`; diễn giải 28/02 trước 01/03 khớp hai ngày trong bảng. Hồ sơ công ty xác nhận dấu hiệu của NV029; mã hợp đồng/ngày cụ thể chưa được tôi kiểm DB. Câu khép tình huống giữ riêng ba đơn vị và yêu cầu xác minh bản gốc. |
| Hay nhầm (96–105) | **Giữ được.** Bốn lỗi có hậu quả trực tiếp: nhầm nhóm với hồ sơ, bỏ sót `NULL`, kết luận lỗi/sửa quá sớm, tưởng `SELECT` chặn dữ liệu khi ghi. Không có kiến thức cốt lõi phải đợi tới mục này mới được học. |
| Ứng dụng (107–116) | **Giữ được.** Bốn việc đúng chủ đề, có mục đích: giấy tờ, liên hệ theo phòng, ngày hợp đồng, so số theo mã luật cùng phạm vi. Không mở thêm quyền sửa dữ liệu hay bộ kiểm email ngoài luật. |
| Ghi nhớ, tự kiểm tra (118–162) | **Giữ được.** Memo bốn hàng gắn điểm tựa Excel với ý SQL. Năm câu tự kiểm tra nằm ngay sau Memo, trước bài tập; đáp án đều đã xuất hiện trong phần chính, xem bảng bên dưới. |
| Dẫn bài tập (164–168) | **Giữ được.** Chốt lại mọi trạng thái, liên kết đúng 4.1/3.4/3.10/3.8, nói rõ bộ chấm chưa kiểm cú pháp/tên alias và yêu cầu tự đối chiếu tiêu đề. Không cần lấy lời giải YAML làm bài giảng. |

Ba truy vấn chính là ba kiểm độc lập. Không thấy căn cứ phải thêm một RunFlow chung, LineMap hoặc bảng Excel chỉ để đủ khối; bài hiện không có nội dung drawer/RunFlow/LineMap nào bị bỏ qua. Câu SQL chính ngắn, không có phần tiếp dòng cần thụt hai cấp; không suy từ đó rằng đã kiểm hành vi tab/copy của UI.

## Các câu “tại sao/để làm gì” khi học thử

| Câu tự đặt ra | Bài đã trả lời ở đâu |
|---|---|
| Vì sao có database rồi vẫn cần rà? | 26, 34–36: `SELECT` chỉ đối chiếu luật cho yêu cầu cụ thể; có lưu được không đồng nghĩa đủ thông tin liên hệ. |
| Một dòng CCCD trùng có phải một hồ sơ hoặc một người? | 40–44, 70: một nhóm có số hồ sơ; chưa suy ra cùng người. |
| Muốn thấy từng mã hồ sơ thì làm gì, vì sao kết không đếm lặp thêm? | 42: nhóm trùng trong CTE có một dòng cho mỗi số, rồi kết với hồ sơ theo số đó. Tiền đề 3.4 giải thích từng cặp khớp. |
| Vì sao không chỉ lọc `TRIM` hoặc chỉ `IS NULL`? | 48, đối chiếu 2.5/2.7: hai loại kiểm nhận các giá trị khác nhau. |
| Ngày bằng nhau hoặc chưa có kết thúc có sai không? | 50: không khớp luật `<`, nhưng điều ấy chưa chứng nhận hợp lệ theo mọi luật nghiệp vụ. |
| Tại sao không lọc email thiếu trước khi nhóm? | 52: phòng có hồ sơ nhưng không có dòng thiếu sẽ mất khỏi nhóm; cờ 1/0 giữ nó. |
| Vì sao luật không có dòng khớp vẫn cần một dòng 0? | 54 và đề công khai 4-6-3: báo cáo phải giữ đủ ba mã luật; `COUNT(*)` không nhóm cho số 0, khác truy vấn chi tiết không có dòng. |
| Vì sao không cộng ba số thành người có lỗi? | 56, 94: có thể chồng luật, lại khác đơn vị hồ sơ/hợp đồng; kết quả còn chờ xác minh. |
| Dùng SELECT xong có ngăn sai về sau hoặc sửa nguồn không? | 26, 94, 102–103: không; việc ngăn khi ghi có bài 5.2, ở đây chỉ đọc và mô tả dấu hiệu. |

## Năm câu tự kiểm tra — tự trả lời trước bài tập

| Câu | Ý trả lời tự lập | Tiền đề đã giảng trước Memo |
|---|---|---|
| 1: dòng CCCD, `SoHoSo = 2` | Một số xuất hiện ở hai hồ sơ; kết lại hồ sơ để xem chi tiết, chưa kết luận cùng một người. | 40–44, 70. |
| 2: `IS NULL` và `TRIM` | Nhánh `IS NULL` nhận thiếu giá trị; so chuỗi sau `TRIM` nhận rỗng/chỉ dấu cách thường. Có chữ chưa đủ xác nhận nhận thư. | 48, 81; 2.5/2.7. |
| 3: ngày bằng nhau/`NULL` | Không xuất hiện theo luật `<`; trường hợp khác cần luật riêng. | 50. |
| 4: giữ mọi hồ sơ trước cộng | Giữ nhóm phòng có hồ sơ dù không có email thiếu, cho số 0; lọc thiếu trước làm nhóm biến mất. | 52; 3.10. |
| 5: cộng ba số | Không ra số người riêng biệt vì chồng luật và nhánh hợp đồng khác đơn vị; chưa kết luận cần sửa. | 56, 94. |

Đủ năm câu, không thấy câu nào dùng phần ôn để dạy bù tiền đề còn thiếu.

## Đề công khai — tiền đề và cách làm tự lập trước YAML

| Đề | Kiến thức cần và đã được dạy | Cách làm tự xác định từ bài/tiền đề | Thiếu/khó tìm/chưa xác minh |
|---|---|---|---|
| `4-6-1` — Hồ sơ mang số CCCD trùng | Gom nhóm/lọc nhóm ở 3.3 và 4.6:40; CTE một câu, `WITH … AS (…)` ở 4.1; bí danh, kết theo `ON`, từng cặp khớp ở 3.4; số dòng sau kết ở 3.5; cách kết CTE nhóm trùng nêu ngay 4.6:42. | Đặt tập số trùng trong một CTE trên mọi hồ sơ; câu ngoài kết hồ sơ vào CTE theo số CCCD. Chọn hai cột mã nhân viên/phòng theo đúng thứ tự và xếp mã nhân viên tăng. Mỗi số trong CTE chỉ một dòng nên một hồ sơ khớp cho một dòng. Không gắn kết luận cùng người hoặc xóa hồ sơ. | Không thấy thiếu tiền đề. 3.4 được trỏ ngay phần giảng và dẫn bài tập dù không liệt kê trực tiếp trong frontmatter; 3.5 đã yêu cầu 3.4. Kết quả live và bộ chấm chưa xác minh. |
| `4-6-2` — Email thiếu theo từng phòng có hồ sơ | `NULL`/so sánh ở 2.5; `TRIM` dấu cách thường ở 2.7; nhóm theo mã ở 3.3; cộng cờ/giữ nhóm số 0 ở 3.10; biểu thức và giới hạn có sẵn ngay 4.6:48,52. | Đọc mọi dòng `NhanVien`, nhóm theo mã phòng; mỗi dòng thiếu email góp 1, dòng khác 0, cộng cờ thành số thiếu. Không dùng `WHERE` lọc thiếu. Chỉ tạo nhóm từ phòng đang có hồ sơ, giữ số 0; không cần kết danh mục phòng. Đặt tiêu đề đề yêu cầu và xếp mã phòng tăng. | Không thấy thiếu tiền đề hoặc điểm khó tìm. Không cần PivotTable/VLOOKUP riêng. Chưa kiểm SQL/DB và kiểu giá trị trả về. |
| `4-6-3` — Số dòng cần rà của ba luật | Tập số trùng và kết hồ sơ như đề 1; ba luật tại 4.6:40,48,50; đếm nhánh không nhóm kể cả 0 tại 54; `UNION ALL`, vị trí cột, nhãn hằng, tên cột nhánh đầu và một `ORDER BY` cuối ở 3.8, được nối lại tại 54–56. | Dùng CTE nhóm trùng; nhánh CCCD đếm hồ sơ sau kết CTE; nhánh email đếm hồ sơ theo luật thiếu; nhánh ngày đếm hợp đồng có ngày đảo. Mỗi nhánh chỉ trả mã luật hằng và số đếm không nhóm. Gộp ba nhánh, đặt tên cột nhánh đầu và xếp mã luật cuối câu. Giữ đủ ba dòng khi số đếm là 0 và không cộng thành người. | Không thấy thiếu tiền đề. Bài đã dạy kết hợp mã hằng với số đếm và phạm vi cả câu, nên không phải suy đáp án nhờ kiến thức ngoài. Chưa kiểm SQL/DB hoặc trường hợp nguồn thay đổi thật. |

Từ phần đã giảng có đường làm riêng cho đủ cả ba đề. Đề 3 cần kết hợp nhiều kiến thức cũ nhưng yêu cầu đã chia nhánh và chốt đơn vị rõ. Tôi chưa dùng answer để đi đến nhận định này.

## Ưu tiên, hình thức và độ tải

- **Không có finding Cần sửa/Cần làm rõ/Cần cắt/Biên tập có căn cứ ở giai đoạn 1.** Các mục Giữ được đã ghi vị trí và tác động trong bảng trên; không thêm nhận xét cho đủ số.
- Bold có chọn lọc ở khái niệm trọng tâm; tên bảng/cột, điều kiện, mã và ngày trong lời giải dùng code. Năm summary dùng thẻ `code` đúng chỗ. Ba khối SQL trong HTML giữ nháy thẳng, `<`/`>` và xuống dòng so với MDX; không thấy escape/backtick bị lộ trong phần văn bản đã đọc. Không có SQL ghi hoặc đoạn SQL có chỗ khuyết bị cho sao chép như câu chạy đầy đủ.
- Có lặp ý ở Memo và tự kiểm tra đúng chức năng ôn. Hay nhầm đi từ thao tác sai tới hậu quả, Ứng dụng chuyển sang việc cần làm; chưa thấy một câu có thể cắt mà không mất nhịp hoặc điều kiện hữu ích. Phần chính hiện hữu trong bài; không giấu kiến thức để tạo cảm giác ngắn.
- Mốc 40 phút phù hợp tương đối với ba kiểm và ba đề tổng hợp kiến thức cũ; đây là nhận định về độ tải nội dung, **chưa đo thời gian người học thực tế**.
- Không đề nghị mở thêm NBSP, kiểm định dạng email, DDL, ràng buộc thật hoặc sửa/xóa dữ liệu: ngoài ba luật đã chốt, không cần để làm các đề công khai.

## Nguồn và giới hạn

Đã đọc toàn bộ MDX, mọi `Sql`/`Result`/`Memo`/tự kiểm tra, đề công khai, các tiền đề nêu trên và HTML bài từ build được giao. Hồ sơ công ty và 2.5 là nguồn đối chiếu nội dung mẫu, **không thay bằng chứng chạy DB**. Không thấy mâu thuẫn nội bộ hoặc số liệu đáng nghi có căn cứ từ những nguồn được phép đọc.

Chưa tự xác minh SQL live, kết quả đầy đủ từ DB, đáp án/check YAML, bộ chấm, auth/runner, UI/viewport, bấm tự kiểm tra/drawer, bàn phím, sao chép/dán, SSMS, build/test/check:dist. Root đang kiểm SQL riêng; kết quả đó không được tính là tôi tự chạy DB. Có hai lần dò đường dẫn đầu tiên không trúng (`dist/lessons/...` và tên rút gọn 3.4); đã tìm đúng bằng `rg --files` rồi đọc đủ, không phải lỗi của bài.

**Khóa giai đoạn 1:** nội dung trên được ghi trước lần đầu mở YAML bài 4.6 và sẽ giữ nguyên khi đối chiếu ở báo cáo cuối. Đây là đánh giá học thử nguồn/HTML, không phải chứng nhận SQL/UI chạy đúng hay quyền đưa bài lên web.

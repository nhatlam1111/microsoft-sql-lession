# Cải thiện bài 1.1–3.7 theo kiểm thử học viên

Nhánh local: `codex/student-review-1-1-3-7`, từ main `df7e810`. Triển khai 24–25/10/2026; chưa push hoặc nhập main. Giữ 51 bài/URL, schema frontmatter, 54 bài tập/đáp án, seed, API và xác thực. Bài 2.1 giữ nguyên; 21 bài còn lại có sửa, trong đó 3.3/3.7 chỉ chuyển tự kiểm tra lên trước bài tập.

## Hồ sơ

- [Ma trận 80 nhận xét, quyết định và căn cứ](verification.md).
- [Báo cáo học viên gốc](source-student-report.md) và [prompt gốc](source-review-prompt.txt): bản sao nguyên byte, không sửa nội dung nhận xét.
- [Spec](../../superpowers/specs/2026-10-24-student-review-1-1-3-7-design.md), [plan và tiến độ](../../superpowers/plans/2026-10-24-student-review-1-1-3-7.md).
- [Review tích hợp độc lập](review-integration.md): **Ready** cho bàn giao local, không có finding Critical/Important/Minor. Reviewer tự chạy lại test/check/check:dist; phân biệt rõ phần SQL/browser của tác giả với phần tự kiểm của mình. Commit nội dung được review: `5e988b1`.

## Thay đổi chính

- Giới thiệu, 1.2 và trang bài tập giải thích hai nơi thực hành: web có mã; chưa có mã thì SQL Server riêng theo hướng dẫn/script đã có. Người chỉ dùng web không phải tự kết nối SSMS ở 1.2; bắt đầu viết SQL từ 1.6.
- Editor mới rỗng với placeholder đọc được; giữ nguyên mọi nháp đã lưu, kể cả rỗng/comment. Không đổi khóa lưu trữ, cơ chế đăng nhập, API hoặc bộ chấm.
- Chương 1 giải nghĩa câu ghi, phiên SQL/DATEFORMAT, byte, VLOOKUP và cách đọc thẻ/drawer. Giữ các điều kiện chuyển kiểu và an toàn đã đúng, không thêm preview SQL cho bài khái niệm.
- Chương 2 rút phần ngoài mục tiêu, giải thích UNKNOWN/tập kết quả/bản chốt; giữ tám hàm chuỗi và COLLATE phục vụ đề. Hàm ngày theo mốc cố định; MONTH/EOMONTH thành bảng ngắn. Thêm ba tự kiểm ở 2.3/2.8, giữ ba câu của 2.7.
- Chương 3 phân biệt ba dòng trên thẻ với mười dòng trong drawer; thêm COUNT đúng phạm vi đang làm ở 3.2; dùng bảng cặp cột thay ERD lặp ở 3.4/3.6. Giữ nguyên đối chiếu ON/WHERE và kết quả 6/6/0 đã đúng.
- Quy ước/template ghi cách giải nghĩa lần đầu, phân biệt hình minh họa với dữ liệu đã kiểm, vị trí tự kiểm và bảo toàn nháy SQL trong summary. `check:dist` bắt nháy cong phát sinh sau build.

## Review độc lập và xử lý

Mỗi bài có một agent mới, không mang ngữ cảnh tác giả, kế thừa model Codex của phiên, không override model. Reviewer học từ bài và các bài trước, không đọc seed/secret, không kết nối database, không đọc nhận xét reviewer khác. Tác giả đã đọc hết từng report trước khi xử lý; các report được giữ nguyên tại đây.

| Bài / report | Xử lý sau khi xác minh |
|---|---|
| [1.1](review-bai-1.1.md) | Đã sửa: định nghĩa workbook/sheet và câu ôn lợi ích nguồn chung. |
| [1.2](review-bai-1.2.md) | Đã sửa: một dấu `\` trong địa chỉ local; tự kiểm đủ hai lối thực hành. |
| [1.3](review-bai-1.3.md) | Đã sửa: nghĩa phiên SQL; câu ôn ba khả năng chuyển kiểu qua C2/C4/D4. |
| [1.4](review-bai-1.4.md) | Đã sửa: dùng “danh sách chọn” thay dropdown. |
| [1.5](review-bai-1.5.md) | Đã sửa: nhãn ba dòng Excel minh họa kỳ tháng 9; cắt danh sách đường đi lặp bảng. |
| [1.6](review-bai-1.6.md) | Đã sửa: tên database riêng, dẫn “đã thấy” thay bắt buộc “đã chạy”, bước bấm Làm bài trước khi thử SQL trên web. |
| [2.2](review-bai-2.2.md) | Đã sửa: code highlight số 0, 48 và 14 trong lời giải. |
| [2.3](review-bai-2.3.md) | Đã sửa: nháy SQL trong ba summary; cắt câu NV030 lặp drawer và câu giảng lại mẫu họ/tên. |
| [2.4](review-bai-2.4.md) | Giữ: không có finding cần sửa. |
| [2.5](review-bai-2.5.md) | Đã sửa: cắt cảnh báo chung không giúp làm bài; giữ điều kiện Unicode và chuyển kiểu. |
| [2.6](review-bai-2.6.md) | Giữ: không có finding cần sửa. |
| [2.7](review-bai-2.7.md) | Đã sửa: nói rõ UPPER và LOWER cùng giữ NULL. Lỗi nháy ở hai summary được sửa từ kiểm chéo 2.3; reviewer đã đối chiếu lại HTML mới. |
| [2.8](review-bai-2.8.md) | Đã sửa: giải nghĩa DATE trong hình Excel; ngoặc vuông cho alias cột, đồng bộ query/focus/SQL bước. |
| [2.9](review-bai-2.9.md) | Không sửa định dạng answer YAML trong lượt này: người dùng chốt giữ bộ đáp án. Không có lỗi nội dung hoặc kết quả được xác lập; đáp án không được xuất ra màn học. Ghi nhận biên tập nguồn cho lượt phù hợp. |
| [3.1](review-bai-3.1.md) | Như 2.9: giữ answer YAML theo phạm vi. Nội dung/thẻ/drawer không có finding cần sửa. |
| [3.2](review-bai-3.2.md) | Đã sửa: định nghĩa PivotTable, phân biệt Count với COUNT trên sheet; thêm câu ôn sắp báo cáo, cắt vế chọn Count lặp. |
| [3.3](review-bai-3.3.md) | Giữ: không có finding cần sửa. |
| [3.4](review-bai-3.4.md) | Đã sửa: vị trí JOIN trước WHERE/GROUP BY/HAVING; cắt tên XLOOKUP không dùng tiếp. |
| [3.5](review-bai-3.5.md) | Giữ: không có finding cần sửa; đối chiếu ON/WHERE vẫn đầy đủ. |
| [3.6](review-bai-3.6.md) | Đã sửa: nói thẳng điều kiện ngày không bảo đảm một ứng viên mỗi mã. |
| [3.7](review-bai-3.7.md) | Giữ: không có finding cần sửa; không thêm câu đếm trùng. |

Bài 2.7 từng bị giới hạn sử dụng ở lượt đầu; đã tiếp tục đúng reviewer đó sau khi khả dụng, không tạo agent khác hoặc đổi model để thay thế.

Reviewer tích hợp cũng bị ngắt bởi hạn mức sau khi đã ghi đủ report; đã tiếp tục đúng agent đó để xác nhận không còn phần thiếu. Không thay reviewer hoặc model.

### Những phần reviewer tích hợp để tác giả kết luận

- **Vị trí luật DISTINCT/ORDER BY ở 2.6:** giữ theo chỉ dẫn cụ thể đã duyệt, thay cho focus khái quát không dạy bù ở Hay nhầm. Cả ba đề chỉ sắp theo cột trả về, phần chính đã đủ cách viết; không thiếu tiền đề làm đề. Nếu vị trí này vẫn khiến học viên vấp, đó là lựa chọn bố cục cần review lại, không phải lý do chép quy tắc hai nơi ngay trong lượt này.
- **SQL live:** chấp nhận giới hạn của reviewer và dùng 79 SELECT cùng kiểm runner/check:data của tác giả làm bằng chứng. Không đổi số liệu chỉ vì reviewer không chạy DB; không suy rằng kiểm nguồn thay cho thực thi.
- **SSR so với tương tác:** SSR chỉ kiểm khởi tạo/markup. Các thao tác browser, clipboard, undo, F5 và storage bị chặn có evidence riêng; không gán độ bao phủ tương tác cho unit test.
- **Audit resize:** giữ kết quả strict exit 1 cùng bằng chứng computed style resize:none; không nới scanner hoặc sửa CSS trùng chỉ để báo xanh. Scanner vẫn có giới hạn nhận diện class/CSS.
- **SSMS native và học bấm giờ:** chưa kiểm thực tế, giữ giới hạn được công bố; tài liệu Microsoft/hình mô phỏng không được coi là đã thử cài SSMS trên máy mới.
- **Auth/API/answer YAML:** giữ nguyên phạm vi được duyệt. Đã kiểm 54 đáp án luôn hoàn tác và dữ liệu không lệch; không tuyên bố đã audit lại toàn bộ backend chỉ vì diff không đổi.

## Kiểm bằng máy

Evidence local: `temp/verification/2026-10-24-student-review/`. Log không chứa cấu hình kết nối hoặc secret.

| Kiểm | Kết quả thực tế |
|---|---|
| Baseline | 277/277 test, 39 file. |
| Editor mới | RED 2 fail/4 pass → GREEN 6/6 bằng component React thật; nháp rỗng/comment/nhiều dòng và storage bị chặn. |
| Vị trí tự kiểm | RED 7 fail/4 pass → GREEN 11/11. |
| Nháy summary sau build | Test helper RED → GREEN; check:dist tái hiện 5 code span lỗi ở 2.3/2.7 → không còn sau JSX literal. |
| `npm test` | 295/295, 41 file; kiểm lại trước bàn giao lúc 11:32 ngày 25/10, `tests-handoff.log`. |
| `npm run check` | 0 errors, 0 warnings, 3 hints deprecated đã có: FormEvent (2 vị trí), document.execCommand; `check-handoff.log`. |
| `npm run build` | 108 trang; `build-handoff.log`. |
| `npm run check:dist` | 108 trang, 1.742 link; không lộ đáp án; `dist-handoff.log`. |
| API build / typecheck | Đạt; build giữ đủ 54 bài tập. |
| `check:exercises` | 54/54 đáp án đạt qua runner luôn hoàn tác; `exercises.log`. |
| `check:data` | Không bảng nào lệch, cả sau runner và sau kiểm UI; `data-check.log`, `check-data-after-ui.log`. |
| SQL / Result / RunFlow | 79 SELECT duy nhất, 38 khối Sql, 36 Result, 68 bước, 22 bài; `verify-live-final.log`, `verified-live.json`. Năm đoạn ghi/trích chỉ để đọc không chạy trực tiếp. |
| Premium UI audit strict | Exit 1, còn `form.textarea-resize-missing`: scanner không nối được class với CSS. Browser xác nhận resize:none, tab-size:4, editor đủ cao. Thiếu noValidate của baseline đã sửa. Không báo audit đạt. |

Verifier SQL ban đầu bị lỗi parser khi Result có thuộc tính mark; đã sửa verifier và chạy lại đạt. Đây là lỗi công cụ kiểm, không phải SQL sai. Phiên live giữ us_english/mdy, các phép đổi ngày/làm tròn giữ kết quả đã nêu; UPPER(NULL)/LOWER(NULL) đều trả NULL.

Đối chiếu mới: [Microsoft về Count của PivotTable](https://support.microsoft.com/en-us/excel/sum-values-in-a-pivottable). Các nguồn DATEFORMAT/kiểu số/varchar/SSMS/Azure nằm trong spec. Đã xác nhận bằng SELECT riêng cho các phát biểu SQL mới; không dựa vào suy đoán của reviewer để đổi số liệu.

## Kiểm bản build bằng trình duyệt

- Đã mở 22 trang ở **1280×900 và 1440×900 thực tế**, lưu DOM metrics tại `browser-layout-1280.json` / `browser-layout-1440.json`; không tràn ngang toàn trang, không ảnh lỗi, mục lục có đủ các phần. Có một lượt đo đầu mang tên 1280 nhưng tab còn 1440; đã loại kết quả đó và chạy lại đúng kích thước, ghi đè evidence bằng lượt đúng.
- Đã xem Excel và SSMS đánh dấu ở 1.3, ERD đầy đủ ở 1.5, bảng quan hệ ở 3.6; bảng nằm gọn trong chiều rộng đọc, ERD giữ vùng cuộn riêng. Có kiểm selfcheck bằng Enter ở 1.2/2.3/2.7, nháy SQL thẳng trong DOM và vị trí trước bài tập.
- Thẻ FROM ở 3.1 hiện 3 dòng và +17; mở bằng Enter được drawer trích 10/20, qua Bước sau còn đủ 9 dòng, Escape đóng và trả focus về thẻ. Highlight/query trong drawer giữ tab.
- Editor ở hai kích thước: placeholder đọc được trên nền trắng, nhãn truy cập giữ nguyên, resize:none; hai lớp cùng tab-size:4. Sao chép CASE hai cấp từ 2.9, dán vào editor giữ nguyên chuỗi và tab thật, highlight khớp. Tab thêm 4 dấu cách, Ctrl+Z hoàn tác được.
- Ô mới rỗng; nháp rỗng, SQL nhiều dòng, comment và comment mặc định cũ giữ nguyên qua reload/chuyển bài. Đã quan sát nháp comment cũ trên origin local trước đây; không sửa nháp đó. Toàn bộ thao tác soạn thử sau đó dùng origin loopback riêng cổng 4324.
- F5 mở form mã khi chưa có mã; mã kiểm thử sai có thông báo; mã dev chỉ ở API local chạy được SELECT 48 dòng và CASE 45 dòng. Không gửi mã local tới API public, không nộp thay bài của người dùng.
- Kiểm storage bị chặn bằng iframe sandbox trên server QA tạm: browser từ chối localStorage thật, ô mới vẫn rỗng và gõ được, F5 mở form; reload không giữ nháp đúng giới hạn đã công bố. Không đổi thiết lập bảo mật trình duyệt của người dùng.
- Ảnh tại `temp/verification/2026-10-24-student-review/screenshots/`. Đọc HTML của reviewer không được tính thay cho các thao tác browser trên.

## Giới hạn và quyết định triển khai

- Chưa kiểm cài đặt/kết nối bằng ứng dụng SSMS thực tế trên máy mới. Hướng dẫn đã đối chiếu Microsoft; browser chỉ kiểm hình mô phỏng. Chưa đo thời gian học thật với nhóm học viên.
- API local và server QA đã dừng sau kiểm để đóng kết nối. Preview được khởi động lại ẩn, chỉ nghe loopback cổng 4322, sau lượt tiếp tục ngày 25/10; [mở bản local](http://127.0.0.1:4322/microsoft-sql-lession/gioi-thieu/) trả HTTP 200 và đã mở trong app. Không deploy/push.
- Giữ checkout sạch ban đầu trên nhánh riêng theo lựa chọn người dùng, không tạo worktree khác. Nếu cần cách ly thư mục sau này thì có thể tạo worktree từ commit của nhánh, không phải chỉnh lại nội dung.
- Dùng ledger/PowerShell tương đương vì bash không có trên PATH; các kiểm bắt buộc vẫn chạy bằng lệnh thực tế. Nếu môi trường khác cần script bash của skill thì log hiện tại vẫn giữ đủ kết quả để đối chiếu.
- Yêu cầu mỗi bài một reviewer mới, giữ model và xử lý cả nhận xét nhỏ của người dùng/AGENTS thay mặc định một reviewer cuối và bỏ qua minor của skill. Chi phí là nhiều lượt review, không đổi tiêu chí kiến thức hay dữ liệu.
- Lệnh xóa build QA tạm bị duyệt tự động từ chối (“blocked by policy”). Đã **giữ toàn bộ** bằng Move-Item sang `C:/Users/Lam/AppData/Local/Temp/sql-student-review-browser-dist-2026-10-25` sau kiểm đường dẫn; không xóa hoặc nới policy. Một lần Astro check quét bundle QA tạo 65 hints; sau lưu artifact ngoài workspace chạy lại còn đúng 3 hints nguồn đã có.

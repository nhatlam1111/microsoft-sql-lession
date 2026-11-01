# Review tích hợp bài 3.1–3.2 sau sửa

Ngày: 01/11/2026. Model: kế thừa model của phiên; không đổi model/effort, không tạo agent con. Góc nhìn kiểm tiền đề: người học chỉ biết Excel văn phòng cơ bản, chưa biết SQL/lập trình hoặc PivotTable trước lời giảng.

## Phạm vi, phiên bản và công cụ

- Base `a67c37a4872daaee7711dbab8bb794fbb8a1f681` → head `4af339b667c442f38f934236887b51c212f8c84f`, nhánh `codex/lessons-3-1-3-2-refresh`. Tự đọc HEAD/nhánh; `git status --short` sạch ở đầu lượt và trước khi ghi report.
- Đã đối chiếu `temp/verification/2026-11-01-lessons-3-1-3-2/integration-range.patch` với `git diff base..head`: nội dung khớp sau chuẩn hóa xuống dòng. Có 13 file trong range, gồm hai MDX, bốn test, hồ sơ công ty và hồ sơ thiết kế/review; không mở thêm report ngoài ba evidence được giao.
- Tự kiểm SHA-256 của cả bảy mục trong `source-sha256.json` và hai HTML trong `build-sha256.json` ở thư mục lượt tích hợp: đều khớp. MDX 3.1: `D1472665547E1C627F41976340759E05C36A4AF1E65FE14005EED2301BFB3CED`; MDX 3.2: `366511F7C1FF324DE7E937B360FC6A033DD1E3A1CA008B6999B0CA7D0BBAB669`.
- HTML 3.1: `3FC02392B48AE2C69094E883BF99DBC32BEF411DD65E5AEC8A8DA21FAC31F556`; HTML 3.2: `A4BD70DAD03AF21F153B533DD912951476DB7A579EE3F6BE0D93F9AD8E4D0775`. Thời điểm build 21:21 ngày 01/11 là thông tin giao việc, được log tác giả ghi hoàn tất lúc 21:21:04; reviewer xác nhận file/hash và nội dung tĩnh, không tự chứng nhận quy trình compiler.
- Công cụ thực tế: PowerShell để đọc/so chuỗi và hash; `rg`; Git chỉ đọc; `apply_patch` chỉ ghi report này. Không browser, viewport, test/build/compiler, SQL, DB, API/runner, seed, `.env` hoặc secret. Không sửa source/test/docs/Git.
- Đã đọc đủ hai MDX cuối, tám bước và mọi thuộc tính drawer, hai YAML, bốn test đổi, HTML hai bài và sáu trang đề, CSS build liên kết, phần liên quan của RunFlow/Sql/Excel/Exercises, trang bài tập, ExerciseWorkspace, storage và Giới thiệu. Đọc 2.9 và 3.3 để kiểm nối; 3.3 không được dùng bù tiền đề cho hai bài đang review.

Đây là review tích hợp được phép đọc evidence tác giả/reviewer cũ, không phải lặp học thử mù. Thứ tự thực tế: đọc hai MDX và YAML, rồi các nền/điểm nối, quyết định, test/diff và evidence. Lệnh trích YAML đầu tiên lọc sai mức thụt lề nên hiện cả answer cùng prompt; bảng tiền đề dưới đây là rà lời giảng để đối chiếu, không phải lời giải được ghi trước khi thấy answer. Hai review từng bài đã giữ thứ tự prompt → tiền đề → answer, nhưng đều ghi đã vô tình thấy đoạn trạng thái triển khai khi trích spec/plan; họ không mở verification/report cũ và không dùng trạng thái ấy làm bằng chứng. Giữ nguyên giới hạn đó, không gọi hai lượt ấy là mù hoàn toàn.

## Kết quả và ưu tiên

Không thấy finding mới thuộc **Cần sửa / Cần làm rõ / Cần cắt / Biên tập** trong phần sản phẩm đổi. Có đủ kiến thức được giảng trước phần ôn để xác định cách làm sáu đề; các câu trả lời mẫu phù hợp prompt và không cần kiến thức bài sau. Đây là kết luận về nội dung và tính nhất quán tĩnh, không khẳng định mọi học viên chắc chắn tự học được hoặc SQL/UI đã được reviewer chạy đúng.

Các nhóm **Giữ được** dưới đây có vị trí, căn cứ và tác động. Các mục còn cần tác giả quyết định về phạm vi/bằng chứng được liệt kê riêng ở cuối; không có yêu cầu khôi phục query phụ, đổi YAML hay chuyển thêm bài.

## Mạch 2.9 → 3.1 → 3.2 → 3.3

| Đoạn nối và câu gốc ngắn | Đánh giá, tác động và căn cứ | Đề xuất |
|---|---|---|
| 2.9, đoạn sau LineMap: “một giá trị cho mỗi dòng”; 3.1:48,73: “tính một giá trị từ nhiều dòng”, “trả một dòng chung” | **Giữ được.** Từ tạo nhãn từng hồ sơ sang tổng hợp là đổi đơn vị kết quả rõ ràng. 3.1 không gọi nhãn CASE là nhóm tổng hợp; tình huống mới nói một dòng là một đơn trước khi đếm. Không cần lấy kiến thức GROUP BY ở bài sau để hiểu câu chính. | Giữ mạch hiện tại. |
| 3.1:24,71–79,169: “Cộng toàn bộ SoNgay”, “COUNT(cột)”, “không phải số người nghỉ” | **Giữ được.** Mốc dưới/mốc trên, trạng thái và đơn vị được chốt trước SQL. Bỏ query NhanVien vẫn giữ quy tắc đếm cột áp dụng được cho Email; NULL/0, mẫu số, tập rỗng và AVG trên int được giảng trước ôn. DP018 bị loại do TuNgay, không bị dùng làm ngày thực nghỉ tháng 9. | Không khôi phục query phụ. |
| 3.2:24,32,66–74: “MaPB hiện tại”, “PivotTable tạo bảng tổng hợp”, “một nhóm cho mỗi cặp giá trị” | **Giữ được.** Filters/Rows/Values/Count có nghĩa tại chỗ; Count của PivotTable được tách khỏi COUNT của sheet vừa học. COUNT của SQL được tính riêng từng khóa; thêm trạng thái khi đã lọc đang làm không tự tăng số nhóm. Lời nhiều khóa và cột trực tiếp trong SELECT đủ cho đề hai khóa. | Giữ đoạn ngắn trên chính MaPB/TrangThai. |
| 3.2:76,193 → 3.3 tình huống và câu chính: “Lọc nhóm… học ở bài 3.3”, “trên 10 hồ sơ đang làm” | **Giữ được.** Cùng nguồn, điều kiện đang làm, MaPB hiện lưu, sáu nhóm và cách sắp; 3.3 thêm ngưỡng giữ KD 13, loại IT đúng 10. Không có thay đổi phạm vi ngầm từ ngày/tháng hoặc lịch sử phòng. 3.3 tự định nghĩa Value Filters/HAVING; 3.2 không cần giảng trước chúng. | Không sửa 3.3 trong lượt này; xem mục ngoài phạm vi. |

Tình huống 3.1 và 3.2 dùng hai bảng theo quyết định giữ nguyên, nhưng đều chốt “một dòng kết quả đại diện cho gì”. Câu trả lời nằm ngay sau Result; không suy từ tổng đơn thành người riêng biệt, từ mã hiện lưu thành lịch sử, hoặc từ số lượng thành kết luận thiếu người. Hai bài đều đúng hai tiểu mục và một khối Sql chính, theo mẫu 2.1.

Các câu “tại sao/để làm gì” cốt lõi đã có lời đáp: vì sao SUM cần vùng đúng (3.1:32); vì sao hai COUNT có thể khác và tại sao ví dụ thật lại bằng nhau (71); vì sao AVG không chia cho năm dòng đang nhìn (75 và SELECT:150); vì sao không có đơn vẫn có một dòng (79); vì sao mỗi khóa tạo một dòng và không sao chép tổng toàn công ty (3.2:66–70); vì sao không có phòng số 0/Grand Total (72); vì sao ORDER BY dùng được alias nhưng GROUP BY không tự sắp (74 và bước SELECT/ORDER BY). Không thấy phải dùng đáp án tự kiểm tra để học bù.

## Nối dữ liệu trong tám drawer và HTML cuối

Đã tự đối chiếu nguồn và văn bản/bảng trong cả tám panel HTML; bảng dưới không phải log tương tác mở drawer.

| Bước | Đầu vào, kiểm và kết quả đã đọc tĩnh |
|---|---|
| 3.1 FROM, MDX 95–112 | Nêu DonNghiPhep; chưa lọc/chọn cột kết quả/tổng hợp. Tổng 20; bảng trích năm đơn, bốn cột theo dõi. Không giả nguồn chỉ có bốn cột. |
| 3.1 WHERE, 115–143 | Đầu vào đủ MaDon/TrangThai/TuNgay. DP001 giữ; DP010 sai trạng thái; DP018/DP005 sai mốc dưới; DP008 sai trạng thái và mốc trên. Mọi mã checks có trong năm dòng đầu vào; dòng loại không nằm trong chín dòng kết quả. HTML ghi “Cả 20 dòng”, 14/15/16 đúng độc lập và 9 giữ, không mô tả ba lượt lọc. Tổng nguồn không tự được chứng minh bằng năm dòng trích; có evidence tác giả riêng. |
| 3.1 SELECT, 146–161 | Đầu vào có MaDon/SoNgay, ghi trích 5 trong 9 dòng và 2 trong 4 cột. Lời Thực hiện nói tính cả chín; chín số ngày trình bày cộng được 16, chia 9 làm tròn 1.78, min 1/max 3. Kết quả một dòng/năm cột khớp Result. |
| 3.2 FROM, 88–104 | Nêu NhanVien, chưa lọc/chọn cột kết quả/gom. Tổng 48, trích năm hồ sơ/ba cột, có cả đã nghỉ. |
| 3.2 WHERE, 107–134 | Năm mã đầu vào và checks trùng nhau; NV020/NV033 loại, NV001/NV002/NV003 giữ. Điều kiện có tên TrangThai; HTML tách năm dòng trích với “Cả 48 dòng”, 45 đúng/45 giữ. Kết quả trích mười trong 45, đủ cột chuyển sang bước nhóm. |
| 3.2 GROUP BY, 137–149 | Đầu vào trích năm trong 45, thấy KD lặp ở NV002/NV003 và KT lặp ở NV001/NV005. Sáu mã và kích thước 7/13/2/10/8/5 cộng thành 45. Caption “Số hồ sơ trong nhóm” được giải nghĩa là nhãn minh họa, chưa phải alias SoHoSo của câu chính. SQL kiểm chỉ nằm trong source. |
| 3.2 SELECT, 152–164 | Hai cột MaPB/kích thước nhóm có trong đầu vào, trích năm trong sáu nhóm; đặt alias SoHoSo ở bước này. Kết quả đủ sáu dòng/hai cột. Không lấy năm nhóm trích làm tổng. |
| 3.2 ORDER BY, 167–180 | Có MaPB/SoHoSo; thứ tự đầu vào khác đầu ra. Kết quả KD/IT/VH/KT/NS/BGD cùng 13/10/8/7/5/2 khớp Result. Alias được dùng sau SELECT; bước này không đổi phạm vi/giá trị nhóm. |

**Giữ được về dựng trang:** tự so chuỗi thấy hai câu Sql chính vẫn có nguyên văn trong base; Sql hiển thị và thuộc tính `data-copy` HTML khớp literal nguồn sau giải mã tab. 3.1 có bảy dòng/bốn tab thật; 3.2 có năm dòng, không cần tab tiếp dòng. Hai HTML có ba/năm panel và đúng thứ tự h2/h3. Dấu nháy SQL thẳng; các đoạn focus là vùng dim/mark theo component, CSS build dùng block/grid, nên việc nối text thô dính `FROM` không chứng minh mất xuống dòng trên UI. CSS có token `--sql-tab-size: 4`.

Excel 3.1 trong HTML đánh đúng 2/1/16 ở C2/C10/C11; 3.2 đánh KD/13/45 ở A2/B2/B8. Chú thích nói rõ minh họa và Grand Total không phải phòng. Chữ đậm/code của định nghĩa, dẫn chứng và drawer giữ được; không thấy cần thêm bảng/đoạn hoặc cắt lặp bắt buộc. Các sửa sau từng bài — “số nguyên int”, “chưa chọn cột kết quả”, vế “giữ dòng chưa khớp” và SELECT 3.2 gọn — đã có trong HTML cuối.

## Tiền đề sáu đề và đối chiếu answer

Bảng này rà tiền đề từ lời giảng sau lần đọc YAML đã có answer, theo giới hạn phương pháp nêu ở đầu. Không chép nguyên đáp án và không chạy/nộp bài.

| Đề | Cần làm, phạm vi và đơn vị | Tiền đề có trước phần ôn | Kết luận đối chiếu |
|---|---|---|---|
| 3-1-1 | Hai phép đếm trên cùng tập hồ sơ đang làm; không lọc Email NULL trước; đúng thứ tự hai cột, một dòng. | SELECT/AS/thứ tự cột ở 2.1; Unicode/WHERE ở 2.2; Email/NULL/IS NOT NULL ở 2.5; quy tắc COUNT(cột) và thay tên cột ở 3.1:71. | **Giữ được.** Chuyển SoNgay sang Email áp dụng đúng quy tắc đã dạy. Prompt và answer cùng phạm vi, không cần query phụ NhanVien làm lời giảng. |
| 3-1-2 | Đơn đã duyệt bắt đầu tháng 8; năm chỉ tiêu, cộng cả ngày trên đơn xuyên tháng; AVG trực tiếp, không làm tròn. | AND và ngày yyyymmdd ở 2.2–2.3; năm hàm/CAST tách khỏi AVG và đơn vị đơn/ngày ở 3.1:24,50–79,169. | **Giữ được.** Đổi hai mốc ngày, giữ năm phép tính; prompt/answer không tự phân bổ ngày hay thêm CAST. |
| 3-1-3 | Mọi trạng thái, tháng 11; không GROUP BY, giữ COUNT 0 và bốn NULL, không thay bằng 0/chữ NULL. | NULL khác 0/chuỗi ở 2.5; quy tắc tập rỗng được giảng tại 3.1:79 trước Memo/câu ôn. | **Giữ được.** Không thiếu quy tắc mới chỉ xuất hiện trong answer; đề nêu đúng một dòng/năm cột. |
| 3-2-1 | Lọc đang làm, đổi khóa sang MaCD; đếm từng nhóm, sắp số giảm/mã tăng; không Grand Total. | MaCD là mã chức danh ở 2.6:58; sắp nhiều tiêu chí/alias ở 2.4; COUNT ở 3.1; khóa nhóm, SELECT/GROUP BY và thứ tự ở 3.2:66–74. | **Giữ được.** Answer đổi đúng khóa, scope và hai tiêu chí. Không cần đã biết PivotTable để giải. |
| 3-2-2 | Mọi hồ sơ/mọi trạng thái; mỗi cặp MaPB/TrangThai xuất hiện một dòng, ba cột; mã phòng trước, số lượng sau. | 2.6 có nghĩa tổ hợp nhiều cột; 3.2:68–72 dạy cột trực tiếp, cú pháp hai khóa, scope đang làm khác mọi trạng thái và không sinh tổ hợp rỗng. | **Giữ được.** Answer bỏ bộ lọc đang làm, nhóm cả hai cột. Sáu nhóm active/tám nhóm all được test và evidence tác giả bảo vệ; không cần dựng lại query KD phụ. |
| 3-2-3 | Đơn đã duyệt ở mọi ngày bắt đầu; LoaiNghi là khóa; đếm đơn/cộng ngày riêng từng nhóm, sắp loại tăng. | Đơn vị/COUNT/SUM ở 3.1; 3.2:66 nói SUM tính trong từng nhóm và 212 gắn SUM(SoNgay) với LoaiNghi; 2.4 dạy ASC. | **Giữ được.** Answer không bê giới hạn tháng 9 sang đề, không đếm người hay ngày thực nghỉ. |

Tự kiểm tra của hai bài đều đặt sau Memo, trước Bài tập và chỉ ôn điều đã giảng. Sáu HTML đề tồn tại, prompt/metadata cột và sắp xếp khớp YAML; ba link Làm bài mỗi bài trỏ đúng đích. Lời bộ chấm nói so giá trị/thứ tự cột và, với 3.2, thứ tự dòng; không hứa chấm alias hoặc bắt buộc cú pháp. Hướng dẫn chọn web có mã, SSMS được cấp hoặc bản riêng ở Giới thiệu không mâu thuẫn với hai bài; web không bị bắt kết nối SSMS. Đây là kiểm văn bản/đích file, không phải kiểm đăng nhập hay hydration.

## Test, phạm vi công cụ và tương thích nháp

**Giữ được — tests/content-3-1.test.ts, content-3-2.test.ts, content-flow-checks.test.ts, content.test.ts:** test bỏ yêu cầu phải có query/result phụ, vẫn giữ các số và điều kiện chính. 3.1 kiểm chín mã đơn, kết quả năm chỉ tiêu, DP018, câu WHERE/CAST, COUNT trên cùng tập active 45/43 và các đề tháng 8/tập rỗng; thêm cột SoNgay đầu vào, ba điều kiện độc lập và mã checks. 3.2 giữ 45 hồ sơ/sáu nhóm/sắp, thêm sáu cặp active bảo toàn 45, giữ tám cặp all bảo toàn 48 và KD 13/1 trong test; thêm caption trước alias, cột đầu vào và thứ tự đổi khi ORDER BY. Các lời giảng mới thực tế vẫn có NULL/0/mẫu số/tập rỗng và nhiều khóa; không lấy một assertion chỉ chứa chữ NULL làm chứng minh đủ toàn bộ ý nghĩa. Danh sách chờ chỉ gỡ 3.1/3.2, không thêm allowlist hay chuyển 3.3/bài khác.

Tự dùng `git diff --exit-code base..head -- src/content/exercises api database src/components src/lib src/styles src/pages`: không có thay đổi. Vì vậy YAML/ID/answer, API, seed, renderer, editor, cấu trúc trang và storage không thuộc phần triển khai đổi. `ExerciseWorkspace` vẫn load/save theo `exercise.id`; `draftKey` vẫn là `sqlserver-course:draft:${id}`. Nhận định thực tế: không thấy đổi khóa/định dạng nào cần migration nháp do lượt sửa này. Đây không phải chứng nhận browser có nháp đã được thử lại, hay chứng nhận trạng thái tồn tại của khóa storage sau phép thử tác giả.

## Bằng chứng tác giả và reviewer: tách nguồn

Được đọc `docs/reviews/2026-11-01-lessons-3-1-3-2/{verification.md,review-3-1.md,review-3-2.md}` và các log được chỉ tới. Những kết quả sau là **bằng chứng tác giả được đọc**, không phải phép kiểm tôi chạy:

| Evidence đã đọc | Kết quả được ghi và giới hạn sử dụng |
|---|---|
| sql-live.log, verification | 19 SELECT qua Node runner hiện hành vì inventory tác giả không có MCP SQL; chỉ SELECT, rollback theo mô tả hồ sơ. Có 20→9, 14/15/16, kiểu SoNgay, NULL/0/rỗng/toàn NULL/int; 48→45, sáu nhóm active, tám cặp all, rỗng/nhóm NULL giả định. Không đọc seed hoặc kết nối để kiểm lại. |
| mdx-sql.log; sql-revision-comparison.log | 10 exact SELECT khớp literal và số dòng/cột/dòng trích; ORDER BY khớp thứ tự ở bản 665e91a. Comparison ghi query/SQL/rows/columns/checks/input không đổi sau sửa lời. Không gọi comparison là SQL live mới trên head cuối. |
| tests-final/check-final/build-final/dist-final.log | 55 file/416 test; check 247 file, 0 error/0 warning/3 hint; 139 trang build hoàn tất 21:21:04; 2771 link. Ba hint nền là FormEvent tại hai chỗ ExerciseWorkspace và document.execCommand tại SqlEditor, các file không đổi; không đổi thành “không có hint”. |
| api-build-final/exercises-final/data-final.log | API build ghi 76 đề; log đáp án gồm 3.1:1/1/1 dòng, 3.2:6/8/3 dòng; data ghi “Không bảng nào lệch”. Hồ sơ tác giả ghi toàn bộ 76 chạy xong. Không tự kiểm transaction/API/DB từ các dòng log này. |
| Mô tả UI trong verification | Build đầu 665e91a có 1280×800/1024×768, drawer/next/prev/arrow/Escape và copy/paste 3.1 vào editor, giữ tab-size 4; khôi phục nội dung nháp/clipboard. Build cuối mở kiểm lời sửa int/FROM/SELECT và dẫn 3.5 ở 1280×800. Tôi không xem lại browser hay ảnh UI; không gán toàn bộ thao tác build đầu thành thao tác đã lặp ở build cuối. |
| Hai review từng bài | Đã giữ report gốc, B1 int và F1 FROM được xử lý trong chính câu hiện có; HTML cuối của tôi xác nhận lời đã sửa. Không lấy kết luận reviewer cũ thay cho dữ kiện tự đọc hoặc quyền push. Giới hạn lộ trạng thái spec vẫn được giữ ở đầu report. |

## Các hành vi đã cân nhắc nhưng chưa kết luận hoặc ngoài phạm vi

Các mục dưới đây để tác giả ghi quyết định theo §4.6; không phải finding mới buộc mở rộng scope.

| Mục | Điều đã biết, phần chưa xác minh và lý do để ngoài phạm vi | Hướng quyết định đề xuất cho tác giả |
|---|---|---|
| Mobile/drawer | CSS build còn `width:440px` của drawer; verification đã ghi giới hạn mobile nền. Tôi không có viewport hay tương tác nên không báo UI mobile đạt hoặc tái chứng minh lỗi cụ thể; renderer/CSS không đổi. | Giữ giới hạn hiện có cho lượt nội dung, xử lý responsive riêng nếu được giao. |
| SSMS, auth/nộp production, screen reader/trình duyệt khác | Không được reviewer thử và không có kiểm mới từ tác giả; HTML không chứng minh các luồng đó. Sửa lời hai bài không đổi các cơ chế này. | Không ghi đạt; không yêu cầu kiểm mở rộng chỉ để thay review tĩnh thành runtime. |
| Khôi phục nháp và clipboard | Tác giả ghi đã khôi phục nội dung, không khẳng định trạng thái tồn tại của khóa storage; tôi không đụng môi trường người dùng. Diff/ID cho thấy không cần migration mới. | Giữ đúng phạm vi lời xác nhận trong hồ sơ, không nâng thành kiểm toàn bộ storage. |
| Thứ tự đồng hạng của đề 3-2-2 nếu sau này đổi dữ liệu | Đề/answer hiện sắp MaPB rồi số lượng; evidence hiện tại có KD 13/1 và VH 8/2, không có hai trạng thái bằng số trong cùng phòng. Đây không phải thiếu tiền đề hoặc lỗi thứ tự có căn cứ trên bộ mẫu hiện hành. YAML được yêu cầu giữ nguyên. | Không thêm tie-break hoặc đổi đáp án ở lượt này; xem lại nếu seed/phạm vi chấm thay đổi. |
| Bài 3.3 còn khung cũ/caption trước SELECT | Đã đọc để kiểm nối. Bảng GROUP BY/HAVING của 3.3 còn nhãn SoHoSo trước bước SELECT, nhưng lời SELECT nói alias câu gốc tạo tại đó; phạm vi/giá trị/điều kiện nối vẫn nhất quán. Bài 3.3 chưa được giao chuyển, không dùng làm mẫu hay bù tiền đề cho 3.1/3.2. | Giữ ngoài scope; khi chuyển 3.3 có thể áp dụng cách caption kích thước nhóm của 3.2. Không tự sửa bài này. |
| Thời lượng 25/20 phút và khả năng tự học thực tế | Có thể rà độ tải/cắt query phụ từ nguồn, nhưng không có đo người học hoặc học thử UI của tôi. | Giữ là ước lượng metadata; không tuyên bố thời gian đã đo hay mọi học viên chắc chắn làm được. |
| Tình trạng DB/runtime ở thời điểm bàn giao | Chỉ có evidence tác giả được giao, không có truy vấn live của reviewer. Hash/so chuỗi xác nhận file được đọc, không xác nhận trạng thái DB hiện tại. | Dùng đúng evidence đã có; không gọi review tích hợp là một lần chạy SQL/test/UI mới. |

## Nguồn và giới hạn cuối lượt

Nguồn quy tắc: AGENTS.md; docs/quy-uoc.md (nhất là §2.1, §2.6, §4.4–4.6); docs/lesson-template.md; docs/ho-so-cong-ty.md; mẫu 2.1 và 1.1. Nền liên quan đã đọc: 1.3, phần giảng được trích của 2.2–2.6, toàn bộ 2.9; bản cuối hai MDX/YAML; 3.3 chỉ cho điểm nối. Nguồn quyết định: spec/plan 2026-11-01-lessons-3-1-3-2. Nguồn sản phẩm/evidence: exact range patch, test đổi, source/build manifests, HTML/CSS và các component/phần trang nêu ở trên; chỉ ba report được giao và log tương ứng.

Không dùng tài liệu SQL ngoài khóa học hoặc kiến thức từ bài sau để bổ sung phần chưa giảng. Không có thao tác DB/API/chạy/nộp, không đọc seed/secret, không mở browser hoặc đo viewport, không chạy check/test/build. Mọi đánh giá SQL/số liệu trong phần tôi tự kiểm chỉ là tính nhất quán của nguồn, giá trị đang trình bày và hồ sơ công ty; evidence kỹ thuật và tương tác thuộc tác giả được ghi riêng. Report không cấp quyền merge/push/deploy và không dùng “Ready” thay các bằng chứng ấy.

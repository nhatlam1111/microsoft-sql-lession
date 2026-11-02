# Kiểm drawer SELECT 3.1–3.2

Lượt bắt đầu 01/11/2026, tiếp tục 02/11/2026 sau khi hai reviewer bị ngắt do hạn mức. Đã tiếp tục đúng hai agent/lượt cũ, không tạo reviewer thay thế hoặc đổi model. Người dùng duyệt thiết kế B có vài nhóm đại diện; không merge/push/deploy trong lượt này.

## Phiên bản và phạm vi

- Base sản phẩm của lượt sửa drawer: `7743a7e`; source đã kiểm: `8de5a4f407ef4c0740ba571f108ecedfbed975b4`.
- Build UTC `2026-11-01T15:20:45.6555704Z`, manifest tại `temp/verification/2026-11-01-drawer-select/build-manifest.json`. Hai reviewer tự xác nhận bảy hash khớp. HTML đề không có hash trong manifest đầu; phần đối chiếu đề/YAML của họ không được gọi là xác nhận hash riêng.
- Bổ sung FlowExample/FlowExamples tĩnh, validation và mark vào RunFlow. Chỉ SELECT 3.1, GROUP BY/SELECT 3.2 dùng examples. Không đổi JS điều khiển drawer, query chính, SQL bằng chứng, columns/rows/total, YAML/ID/answer, API, seed hoặc editor.
- 3.1 có một minh họa tần suất ba dòng cho cả chín đơn, năm biểu thức tới năm ô. 3.2 chỉ giải BGD/NS, đủ thành viên của riêng hai nhóm mẫu (2/5), không duyệt 45 hồ sơ. Các ví dụ có nhãn phạm vi; bảng Đầu vào vẫn trích tối đa năm dòng.

## Kiểm nguồn và SQL live

- `tests/flow-examples.test.ts`: 20 test âm đã FAIL trước khi có validation; sau sửa nhóm 43/43 PASS. Kiểm giới hạn, thiếu phạm vi, bảng sai chiều, ô ghép khác nhóm và mark ngoài dòng đang hiện. Ba test nội dung mới cũng FAIL khi thiếu examples, rồi PASS sau sửa.
- `npm test`: **441/441**, 56 file PASS. Log `.superpowers/sdd/2026-11-01-drawer-3-1-3-2-select/task-2-tests.log`.
- `npm run check`: 0 lỗi, 0 cảnh báo; ba hint nền deprecated (FormEvent ở ExerciseWorkspace hai chỗ, execCommand ở SqlEditor). Không chỉnh các file này hoặc báo 0 diagnostic.
- `npm run build`: **139 trang**; `npm run check:dist`: **2771 link**, PASS.
- API typecheck/build PASS; build nhận **76 bài tập**. `check:exercises` chạy **76 đáp án** qua runner hiện hành có giao dịch luôn hoàn tác; `check:data` sau đó báo **Không bảng nào lệch**. Không có câu ghi tác giả chạy trực tiếp trên DB.
- Tác giả chỉ chạy SELECT qua createRunner/localConfig (không đọc/in secret). `verify.mjs`, `sql-live.log`, `sql-evidence.json` trong thư mục temp cùng lượt ghi **12 trường hợp PASS**: câu chính/từng bước hai bài, tần suất 1.0×4/2.0×3/3.0×2 và thành viên đầy đủ BGD/NS. Bằng chứng này được chạy mới trước khi viết số liệu minh họa; không dùng SQL của prototype thay thế.
- `compare-source.mjs` và `source-comparison.json`: query và từng SQL/columns/rows/total, cùng hai YAML giữ nguyên so với 7743a7e. Helper từng có một dấu ngoặc thừa; đã sửa và chỉ ghi PASS sau khi chạy thành công.
- Log check/build/dist/API/exercises/data, manifest và helper giữ trong `temp/verification/2026-11-01-drawer-select/`. Không ghi đè hồ sơ kiểm của lượt làm lại bài trước.

## UI đúng build

Kiểm bằng IAB qua CUA, URL preview `http://127.0.0.1:4331/microsoft-sql-lession/`. Preview được khởi động lại khi tiếp tục ngày 02/11, vẫn đọc cùng dist/hash; không rebuild hoặc đổi sản phẩm trong khoảng bị ngắt.

| Phép kiểm đã thực hiện | Kết quả thực tế |
|---|---|
| 3.2 GROUP BY, 1280×720 | Đầu vào 5/45 dòng; chỉ hai ví dụ BGD/NS với 2/5 dòng; không lộ backtick. |
| 3.2 SELECT, 1280×720 và 1024×768 | Mỗi ví dụ có bảng thành viên và hai hàng biểu thức. MaPB/COUNT(*) đi đúng BGD/2 và NS/5; hai dòng Results thứ 3/6 được đánh dấu. Các bảng minh họa rộng 360px, scrollWidth=clientWidth; không gây tràn ngang tài liệu. |
| 3.1 SELECT, 1440×900 và 1024×768 | Đầu vào 5/9 dòng, tần suất ba dòng; đủ năm biểu thức/ô, kết quả 9/16.0/1.78/1.0/3.0. Các bảng minh họa không tràn ngang, không lộ backtick; biểu thức CAST dài được xuống dòng trong ô. |
| Highlight SQL 3.1 và CASE 2.9 | Query/focus chứa tab thật, computed tab-size=4; CASE còn hai cấp tab. Không dùng textContent ghép sát ranh giới khối làm kết luận về mất xuống dòng. |
| Bước trước/sau và mũi tên | GROUP BY→SELECT→ORDER BY đúng panel; chuyển bước reset scrollTop=0; bước cuối khóa Bước sau; ←/→ khi focus drawer lần lượt về GROUP BY/SELECT. |
| Escape và focus | Đóng drawer, trả focus về thẻ bước hiện tại (đã kiểm ORDER BY/WHERE). |
| Tab vào bảng minh họa | Vùng cuộn có tên và focus outline; Tab từ bảng dữ liệu vào bảng phép tính. ArrowRight trong bảng không đổi bước, giữ hành vi cuộn bảng. |
| Bài cũ 2.1 và 2.9 ở 1280×800 | 2.1 không có examples, giữ bốn dòng trích có sẵn/ba cột tiêu đề. 2.9 không có examples, giữ bảng nhánh, Không xét và các tổng 33/8/4. |
| Console và viewport | Không có console error trong lượt đã xem; reset override viewport khi xong. |

Giới hạn: không thử lại copy/paste vào editor, xác thực mã, nộp bài trong UI, Excel/SSMS thật, điện thoại dưới 1024, ma trận zoom 200% hoặc thời lượng học thực tế. Không đổi các hành vi đó và không báo đã đạt trong lượt này. Minh họa được render tĩnh, không có bước tải/chạy SQL runtime mới để kiểm offline/retry/loading.

## Static UI audit và phần ngoài phạm vi

`audit_project.py --mode strict` trả exit 1 với một finding `form.textarea-resize-missing` ở SqlEditor.tsx:53. Đã đối chiếu: textarea dùng class ed-input, CSS dùng chung `src/styles/exercise.css:27` có `resize: none`; file editor/CSS không có diff so với base. Đây là false positive của phép tìm bằng chữ trong auditor, không phải thiếu resize ở giao diện. Giữ log JSON gốc, không nới script hoặc sửa editor để làm xanh auditor. Các kiểm repo/UI bên trên được ghi riêng, không báo static audit hoàn toàn đạt.

Khi tiếp tục, workspace có thêm file ngoài scope `docs/research/` và `premium-audit.json`; không đọc nội dung, sửa, stage hoặc commit các file này. Không dùng chúng làm evidence của lượt sửa drawer.

## Review độc lập và xử lý

Report gốc: [3.1](review-3-1.md), [3.2](review-3-2.md). Hai agent mới từ ngữ cảnh rỗng, kế thừa model phiên; chỉ đọc nguồn/HTML, không SQL/seed/secret/API/browser. Đã đọc hết hai report. Không có finding Cần sửa/Cần làm rõ/Cần cắt/Biên tập có đủ căn cứ; kết luận của reviewer không thay các phép kiểm kỹ thuật.

| Nguồn và nhóm nhận xét | Quyết định | Căn cứ và thực hiện |
|---|---|---|
| 3.1: tình huống, phần chính, thuật ngữ | Làm theo — giữ | Phạm vi/đơn vị, COUNT(cột), NULL/0, CAST và tập rỗng đã có trước phần ôn. Không thêm lý thuyết lặp vào drawer. |
| 3.1: FROM/WHERE và bảng trích | Làm theo — giữ | Có dòng giữ/loại và cột điều kiện; tổng độc lập đã kiểm SQL. |
| 3.1: SELECT, tần suất và năm phép tính | Làm theo — giữ | Tần suất đủ chín đơn đã kiểm live; từng ô cùng khớp dòng kết quả, UI đã xem ở hai viewport. |
| 3.1: kết quả, Hay nhầm, Ứng dụng, ôn và định dạng | Làm theo — giữ | Chốt đúng tình huống, thứ tự mục, dẫn chứng code; không có đề nghị cắt hàng tính nào. |
| 3.1: các câu tại sao và tiền đề ba đề | Làm theo — giữ | Reviewer xác định cách làm trước YAML, không cần bài sau bù kiến thức; API đã chạy đáp án riêng. |
| 3.1: đường thực hành/HTML và giới hạn hash đề | Làm theo — giữ, ghi giới hạn | Không biến đọc HTML thành kiểm tương tác. Bổ sung manifest đề/YAML cho integration ở lượt tác giả, không sửa report để nhận reviewer đã kiểm phần đó. |
| 3.2: tình huống, Excel/SQL, khóa nhóm/nhiều khóa/giới hạn | Làm theo — giữ | Đủ thuật ngữ và điều kiện trước ôn; không đổi phạm vi để minh họa. |
| 3.2: FROM/WHERE/GROUP BY | Làm theo — giữ | Hai nhóm mẫu đủ thành viên trong toàn phạm vi; bảng sáu mã/kích thước được gọi đúng là đối chiếu. |
| 3.2: SELECT và việc lặp nhóm giữa hai drawer | Làm theo — giữ | Hai drawer có mục đích khác nhau; giữ tự đủ để không phải quay lại, chỉ dùng hai nhóm nhỏ. |
| 3.2: ORDER BY, kết quả, phần cuối | Làm theo — giữ | Hai dòng mẫu nối đúng Results; sắp xếp không làm đổi số đếm. |
| 3.2: các câu tại sao và tiền đề ba đề | Làm theo — giữ | Cách làm xác định trước YAML khớp phạm vi đề, khóa nhóm và thứ tự cột/dòng. |
| 3.2: đường thực hành/HTML, giới hạn live/UI/hồi quy | Làm theo — giữ, tách bằng chứng | SQL/API/UI tác giả ghi riêng ở trên; reviewer tích hợp kiểm công cụ theo gói mới. Không gọi review nguồn là xác nhận toàn bộ kiểm đã chạy. |

## Review tích hợp cuối và quyết định

[Report gốc](integration-review.md) của agent mới/ngữ cảnh mới đã đọc hết: không có finding Critical/Important/Minor cần sửa. Reviewer tự kiểm 15/15 hash, validator bằng dữ liệu giả, sáu flow nguồn, tính từ dữ liệu bài và HTML; giữ rõ các lệnh SQL/API/full suite/UI là bằng chứng tác giả. Năm Review Focus và mạch 2.9→3.1→3.2→3.3 đều Giữ được: **Làm theo — giữ sản phẩm**; không sửa code chỉ để tạo thêm vòng kiểm/review.

Tám mục reviewer cân nhắc được xử lý đủ theo §4.6:

| Mục trong report tích hợp | Quyết định | Căn cứ/giới hạn còn lại |
|---|---|---|
| Nhãn SoHoSo sớm trong minh họa 3.3 | Làm theo — giữ ngoài phạm vi | 3.3 có lời rõ alias tạo ở SELECT, không cho dùng ở HAVING; không phải hồi quy mới. Chỉ thống nhất nhãn khi người dùng yêu cầu sửa 3.3. |
| Lặp BGD/NS ở GROUP BY và SELECT | Làm theo — giữ | Mỗi drawer tự đủ cho một việc: gom thành viên hoặc tạo từng ô; không bắt quay lại bước trước. |
| Validator không tự chứng minh ngữ nghĩa lời giải/đủ nhóm | Làm theo — giữ giới hạn có chủ đích | Mã kiểm hình dạng và các ô cùng dòng; SQL/test dữ liệu/review tác giả kiểm tính đúng. Không thêm máy tính SQL/runtime framework; các ví dụ tương lai vẫn cần kiểm số liệu theo quy ước. |
| Mở hết sáu nhóm/45 hồ sơ | Không làm theo việc mở hết | Đi ngược quyết định người dùng; hai nhóm đủ thành viên đã giải cơ chế đếm. |
| Static audit resize textarea | Không làm theo finding | Reviewer tự đối chiếu class/CSS được nạp, xác nhận có resize:none/chiều cao/overflow. Giữ log exit 1 và căn cứ false positive; không nói strict audit PASS. |
| Bàn phím/scroll/clipping chưa do reviewer tự thử | Làm theo — giữ phân biệt bằng chứng | UI tác giả đã kiểm ở các viewport nêu trên, reviewer chỉ nguồn/HTML. Screen reader, zoom 200% và matrix reduced motion chưa thử ở lượt này, không coi chưa thử là lỗi hoặc báo đã đạt. |
| Copy/paste, mã, nộp bài, nháp, Excel/SSMS thật | Làm theo — giữ giới hạn kiểm | Các chủ sở hữu không đổi; chưa chạy lại các luồng UI đó. Không sửa editor/API ngoài yêu cầu. API check:exercises riêng không được gọi là đã nộp bài qua UI. |
| Chuyển khung 3.3 | Không làm theo việc mở rộng | Chỉ đọc để kiểm mạch HAVING; chưa được yêu cầu chuyển bài này, không thêm allowlist hoặc sửa hàng loạt. |

Giới hạn provenance bốn HTML sibling 2.1/2.9/3.3/3.8: reviewer đã đọc cấu trúc hiện có và đối chiếu nguồn giữ nguyên nhưng không có hash riêng trong gói, không được ghi thành đã kiểm provenance từng HTML. Tác giả trực tiếp mở 2.1/2.9 trên cùng preview/dist, không mở 3.3/3.8 qua browser trong lượt này. Không cần thêm kiểm để phủ một tuyên bố rộng hơn phạm vi thực hiện.

Đã hoàn tất việc sửa/kiểm/review theo phạm vi được duyệt, không có sửa sản phẩm sau source 8de5a4f. Các cập nhật tiếp theo chỉ là hồ sơ; không chạy lại test/build/SQL đã đạt khi không có thay đổi sản phẩm, thất bại mới hoặc vấn đề chưa giải quyết cần chúng. Giữ branch codex/lessons-3-1-3-2-refresh, không merge/push/deploy.

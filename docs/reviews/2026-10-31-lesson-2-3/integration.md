# Review tích hợp 2.1–2.3 — 31/10/2026

## Phạm vi, phiên bản và công cụ thực tế

Review các điểm nối của mạch 2.1 → 2.2 → 2.3 sau vòng từng bài, từ góc nhìn người chỉ biết Excel văn phòng cơ bản. Không review lại toàn bộ từng bài. Không dùng bài sau hoặc kiến thức ngoài khóa học để bù tiền đề. Công cụ: Codex, **kế thừa model của phiên**, không đổi hoặc đoán tên model; PowerShell/Get-Content/Get-FileHash, `rg`, Python chuẩn `html.parser`/`re` để đọc HTML/CSS tĩnh. Không dùng các teach-skills, không tạo agent khác.

Đã đọc `integration-brief.md`, AGENTS, quy ước/template/hồ sơ công ty, spec 2.2, spec/plan 2.3, nguồn và YAML ba bài, bài 1.3, HTML ba bài, HTML 11 trang bài tập và Giới thiệu liên quan đường thực hành. Đã đọc đúng hai hồ sơ verification được giao, report từng bài 2.3, manifest, browser-checks và các log kiểm của lượt 2.3. Không mở các report khác theo liên kết trong hồ sơ.

Theo gói giao việc: base/HEAD `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`, working tree trên `feat/lesson-2-1-excel-first`; diff sản phẩm là `integration-range.patch`, không phải HEAD..HEAD. Tôi không gọi Git để kiểm lại branch/HEAD. Patch chỉ có hai MDX 2.2/2.3 và ba test liên quan; không có thay đổi YAML/seed/API/editor/component.

**Tôi tự tính lại SHA-256 cả bảy file trong manifest; tất cả khớp**: MDX 2.1/2.2/2.3, YAML 2.3 và HTML ba bài của build 15:41:21 +07 ngày 31/10/2026. MDX 2.3 là `5f76307a16604f5fdd87a340aa1c1740979d8c423260bf3cce94c8f3d24115c3`; HTML 2.3 là `e61adaa30fdf265cba6f5ccd9712acd6399f3df51af85a040bd51a29c3310211`. YAML 2.2 cũng tự đối chiếu khớp hash cuối trong verification 2.2 (`EA6D87C86445A15FED27DDEC81609F5AE41ADC81DE92B81C62D588FB40578BE0`).

HTML 2.2 của build trước trong verification 2.2 có hash khác HTML build hiện tại; không gọi chúng là cùng artifact. MDX 2.2 hiện tại vẫn khớp hash nguồn cuối của lượt trước. Review tích hợp dùng HTML trong manifest mới; kiểm browser cũ của 2.2 chỉ là evidence tác giả ở lượt trước. HTML Giới thiệu/trang bài tập và CSS hiện hành được đọc làm ngữ cảnh tĩnh; chúng không thuộc bảy hash của manifest. Log build ghi các trang này được tạo trong lượt 15:41.

## Kết quả tại các điểm nối

**Không phát hiện finding Cần sửa / Cần làm rõ / Cần cắt / Biên tập có đủ căn cứ đối với nội dung hoặc test trong phạm vi tích hợp.** Những giao điểm sau giữ được:

| Điểm nối, vị trí và câu gốc ngắn | Tác động với người mới, căn cứ và đề xuất |
|---|---|
| 2.1 MDX dòng 50–60, 152: “Các cột … hiện theo thứ tự bạn viết”; “không so tên tiêu đề”. | Chọn cột, thứ tự, `AS`, ngoặc vuông và phân biệt tên với chuỗi đã có trước khi 2.2 dùng lại. Alias chỉ đổi tiêu đề, không sửa nguồn hoặc kiểu của cột được chọn. Đề đặt tiêu đề có lời tự đối chiếu cả trong YAML và HTML. **Giữ được.** |
| 1.3: bảng kiểu/Unicode và chuyển kiểu ngầm; 2.2 dòng 53–62: “`>=` (lớn hơn hoặc bằng)”, “không đặt ngày kết thúc”. | Từ một điều kiện mã sang trạng thái/ngày có tiền đề cụ thể: nháy, `N`, `date`, `yyyymmdd`, gồm ngày mốc và không tự có mốc cuối. Nằm trong phần chính, trước ôn; 2.3 không cần khôi phục bảng sáu phép so sánh hoặc ví dụ ngoài tình huống. **Giữ được.** |
| 2.3 dòng 53–66: “Yêu cầu cả điều kiện phòng và điều kiện ngày cùng đúng”; “`AND` trước `OR`”; “đúng một ký tự”. | Người học chuyển từ AutoFilter một cột sang nhiều cột, phân biệt nhóm giá trị trên cùng cột với hai yêu cầu đồng thời, biết lý do cần ngoặc. `BETWEEN` nêu hai đầu và giới hạn cột không có giờ. `LIKE`, `%`, `_`, vị trí chuỗi, Unicode và collation được giảng trước Ghi nhớ/tự kiểm tra, bằng dữ liệu NV003 của tình huống. **Giữ được.** |
| 2.1 dòng 25, 117; 2.2 dòng 24, 138; 2.3 dòng 24, 140. | Cùng phạm vi hồ sơ hiện lưu: 48 hồ sơ toàn bộ → 14 hồ sơ KD gồm NV020 đã nghỉ → 2 hồ sơ KD/IT trong nửa đầu 2023 là NV003/NV043. Không tự loại người đã nghỉ; mã phòng hiện tại không được biến thành phòng tại năm 2023. Các con số nhất quán với hồ sơ công ty và nhau; đây chưa phải xác minh DB của tôi. **Giữ được.** |
| Các tiểu mục “SQL Server chạy câu này thế nào”, 2.1 dòng 66; 2.2 dòng 68; 2.3 dòng 72. | Cùng cách đọc logic: FROM → [WHERE] → SELECT; không mô tả thứ tự đọc vật lý hoặc mỗi điều kiện là một lượt quét. Bảng nguồn/bảng trích/thẻ nhanh và tổng thật được phân biệt. SELECT không sửa nguồn, cảnh báo không bảo đảm thứ tự khi thiếu ORDER BY có ở cả ba bài. **Giữ được.** |
| HTML ba bài: hai tiểu mục, câu chính → LineMap; RunFlow → Result → câu trả lời. | Mẫu trình bày liên tục, không buộc người mới đổi cách đọc giữa bài. HTML giữ nháy SQL thẳng, data-copy có xuống dòng/tab thật ở 2.2/2.3; ba summary 2.3 nằm sau Ghi nhớ, trước Bài tập. Đây là đối chiếu tĩnh, không phải đã thao tác UI. **Giữ được.** |

Không có câu “tại sao/để làm gì” thiết yếu ở điểm nối phải dựa vào answer mới trả lời được: chọn cột để giới hạn thông tin, WHERE để chọn hồ sơ, AND để buộc cả hai yêu cầu, OR/IN để chọn một trong các mã, ngoặc để áp dụng ngày cho cả nhóm, BETWEEN để lấy hai mốc, LIKE để tìm phần chữ còn nhớ. Mạch này đã nói ngay ở phần chính tương ứng. Không đề nghị thêm truy vấn/kết quả phụ.

## Tiền đề của từng bài tập trong mạch

Đã đọc YAML gồm cả answer; đây không phải một lượt thử mù đáp án riêng. Bảng dưới đối chiếu yêu cầu với phần giảng hiện hành, không coi answer là lời giảng và không chép nguyên câu đáp án. Review từng bài 2.3 được giao ghi riêng cách học thử đề trước khi xem answer; tôi không nhận công việc đó là kiểm do mình làm.

| Đề | Kiến thức cần và nơi đã có trước phần ôn | Phần thiếu tại điểm nối |
|---|---|---|
| 2-1-1, mọi hợp đồng | `FROM`, `SELECT *` ở 2.1; tên bảng/cột tra qua Object Explorer hoặc Sơ đồ database theo hướng dẫn trước danh sách đề. NULL được giải thích ngay trong đề. | Không thấy thiếu kiến thức SQL thiết yếu; không phải lọc NULL. |
| 2-1-2, hai cột email | Danh sách cột, dấu phẩy và không lọc dòng ở 2.1 dòng 50–60. | Không thấy; đề yêu cầu lấy mọi hồ sơ để rà, không đòi tự lọc email thiếu. |
| 2-1-3, đổi vị trí cột | Thứ tự cột là thứ tự viết, 2.1 dòng 50. | Không thấy. |
| 2-1-4, danh mục có tiêu đề | AS/ngoặc vuông ở 2.1 dòng 51–58; đường tra tên bảng/cột trước đề, tự kiểm tiêu đề ở dòng 152 và prompt. | Không thấy; chấm đúng không thay phần tự đối chiếu tiêu đề. |
| 2-2-1, mã KT | Chọn ba cột từ 2.1; WHERE/so sánh mã với chuỗi ở LineMap và dòng 56 của 2.2. | Không thấy. |
| 2-2-2, trạng thái Đã nghỉ | Một điều kiện, tên cột khác chuỗi ở 2.2; Unicode từ 1.3 được nhắc ở 2.2 dòng 60. | Không thấy; không cần biết lọc ngày nghỉ hoặc NULL. |
| 2-2-3, từ 01/10/2026 | `>=`, gồm mốc, yyyymmdd, date/chuyển kiểu ngầm và không giới hạn mốc cuối ở 2.2 dòng 60–62. | Không thấy. |
| 2-3-1, hai phòng và đang làm | Chọn/thứ tự cột ở 2.1; trạng thái Unicode ở 2.2; IN hoặc nhóm OR, AND/ngoặc ở 2.3 dòng 53–60. | Không thấy; chuyển điều kiện ngày sang trạng thái dùng cùng cơ chế kết hợp. |
| 2-3-2, hai phòng trong khoảng | Thứ tự cột ở 2.1; yyyymmdd ở 2.2; IN/AND/BETWEEN, hai mốc và date ở 2.3 dòng 53–62. | Không thấy; đề nói rõ không thêm trạng thái. |
| 2-3-3, chuỗi ở mọi vị trí | Hai cột từ 2.1, N từ 1.3/2.2; LIKE và hai đầu mẫu, chuỗi khác từ riêng ở 2.3 dòng 64–66. | Không thấy. |
| 2-3-4, H áp chót | `%` có thể dài bất kỳ hoặc rỗng, `_` đúng một ký tự, mẫu so chuỗi và không phân biệt hoa thường ở 2.3 dòng 64–66. | Không thấy; có thể ghép mẫu từ hai ký tự đại diện, không cần học hàm độ dài hoặc tách tên. |

Cột/kiểu/thứ tự của bộ chấm đã được đọc thêm trong `src/lib/grade.ts` dòng 56–103 và `exercise-types.ts`: so số cột, số dòng và giá trị theo vị trí; tên cột không được so; `ordered: false` ở cả 11 đề nên không đòi thứ tự dòng, vẫn giữ số lần xuất hiện của dòng trùng. Kiểu SQL phục vụ định dạng/chuẩn hóa giá trị, không phải một kiểm tra bắt buộc metadata kiểu phải trùng. Không có đề nào ở mạch này đòi dùng ép kiểu. Các đề và bài không hứa chấm nghiêm tên/kiểu; chưa thấy mâu thuẫn cần sửa.

## Đường thực hành và phạm vi công cụ

- Bài 2.1 dòng 148–152 dẫn thẳng tới Giới thiệu về chọn nơi thực hành/đọc kết quả. HTML Giới thiệu nêu ba lối: mã web từ người phụ trách/người gửi khóa học; tài khoản SSMS được cấp; hoặc SQL Server riêng, tự đối chiếu và không có chấm tự động. Người chỉ dùng web được nói rõ bỏ qua kết nối SSMS. Không thấy câu bắt họ tự kết nối SSMS.
- HTML 11 trang bài tập khớp prompt/cột/không yêu cầu sắp xếp trong YAML. Thành phần workspace là island phía client, nên HTML tĩnh không có toàn bộ form/ô nhập để chứng minh đã tương tác. Đọc `ExerciseWorkspace.tsx` dòng 49–100 cho thấy thiếu mã thì hỏi mã, có lời chỉ nơi nhận mã và đường tạo bản riêng; Chạy và Nộp là hai hành động. Không gọi các hàm đó.
- Điều kiện hoàn thành không bị đổi: cuối HTML ba bài nhắc tự viết lại câu lệnh mà không nhìn bài; Giới thiệu phân biệt Đã xem với Đã học. Trong nguồn workspace, Nộp đúng đánh dấu bài tập hoàn thành; đọc nguồn không xác nhận đã lưu tiến độ thật.
- Patch không sửa runner/dữ liệu/editor/component, không thay ID 11 đề. Nguồn editor nhận/lưu nguyên nháp, loadDraft theo ID bài tập; không có thay đổi chuyển đổi nháp trong phạm vi này. Không cần biến lượt chuyển bài thành đợt sửa công cụ.

## Bằng chứng tác giả đã đọc, không phải phép kiểm tôi chạy

| Evidence của tác giả | Điều có thể ghi nhận từ artifact được giao | Giới hạn |
|---|---|---|
| `tests.log`, `check.log` | 48 file/329 test đạt; Astro check 0 errors/0 warnings, 3 hints deprecated ở FormEvent/execCommand. | Tôi không chạy lại. Hồ sơ 2.2 cũng ghi các hint này; không gọi chúng là lỗi mới của 2.3. |
| `build.log`, `dist.log` | Build hoàn tất 15:41:21, 129 trang; check:dist OK 129 trang/1951 link. | Pass của check:dist là bằng chứng tác giả về kiểm bản build, không phải tôi tự chạy kiểm rò đáp án mọi trang. |
| `api-build.log`, `exercises.log`, `data.log` | 76 bài; 2.1: 55/48/48/6 dòng, 2.2: 7/3/2, 2.3: 21/6/22/2; check:data ghi không bảng nào lệch. | Theo verification, câu ghi của toàn bộ bộ kiểm đi qua runner rollback. Tôi không chạy API/runner hoặc xác minh DB. |
| `sql-live-final.log` | Summary PASS 17 SELECT-only records, 48 → 2 → 2, previews và biến thể OR/IN/BETWEEN/LIKE. | Không dùng summary này để nói tôi đã kiểm từng giá trị hoặc câu SQL; không mở seed/DB. |
| `browser-checks.json` | Tác giả ghi CUA IAB ở 1280×800 và 1024×720; drawer/highlight, details, copy/paste/tab4; khôi phục nháp/clipboard. | Không lưu screenshot; đây là checklist tác giả. Chính file ghi chưa kiểm SSMS thật, xác thực/chạy/nộp SQL trên web. Dán vào editor không chứng minh đã chạy hoặc nộp. |
| Verification 2.2 và report từng bài 2.3 | Lượt trước 2.2 đã xử lý một ý lặp, source cuối khớp; reviewer 2.3 không ghi finding, đủ tiền đề bốn đề trong phạm vi học thử tĩnh. | Không thay việc tôi tự đọc nguồn/HTML bằng kết luận reviewer; không suy đó là kiểm SQL/UI live. |

Đọc patch và phần test hiện hành: 2.2/2.3 đã được gỡ đúng khỏi `PENDING_TWO_SUBSECTIONS`, không thêm vào danh sách ngoại lệ khác. Test chung bảo vệ hai tiểu mục và thứ tự khối; test 2.2 thay assertion về ví dụ đã bỏ bằng kiểm câu KD không thêm AND/OR/ORDER BY, tổng 48/14/14, bốn cột và NV020. Test 2.3 giữ câu chính, hai đầu khoảng, thứ tự logic, kết quả NV003/NV043, 48/2/2, bốn đề chỉ đọc và không chép answer, đồng thời thêm bảo vệ bố cục/LIKE/%/_. Kiểm seed của test được chú thích đúng là source-fixture, không chứng nhận thực thi T-SQL. Không thấy gỡ bảo vệ số liệu/phạm vi để làm lượt chuyển khung đi qua.

## Hành vi đã cân nhắc, phần tác giả cần kết luận và giới hạn

Các mục dưới đây được nêu riêng để tác giả xử lý hồ sơ theo mục 4.6; chúng không phải finding yêu cầu đổi bài/API.

| Mục | Kết luận của lượt review / việc tác giả còn cần ghi |
|---|---|
| Bộ chấm dựa trên kết quả của bộ mẫu; tên cột/metadata kiểu không là điều kiện riêng | Giữ được trong phạm vi đã công bố; 2.1 đã yêu cầu tự đối chiếu tiêu đề. Tác giả nên ghi rõ quyết định giữ cách chấm hiện tại, không diễn giải “cách viết tương đương” thành chứng minh cùng ngữ nghĩa trên mọi dữ liệu. Nếu muốn siết tên/kiểu thì đó là thay đổi công cụ/đặc tả khác, ngoài lượt này. Không đề nghị thêm chi tiết chấm vào bài cho người mới. |
| Chưa kiểm xác thực web, Chạy/Nộp/SSMS và lưu tiến độ thật | Tác giả cần giữ nguyên giới hạn khi bàn giao, hoặc chỉ bổ sung bằng chứng nếu thực sự làm thêm. Không bắt buộc tự chạy lại để bù một phép kiểm không được giao cho reviewer. Không lấy copy/paste hoặc 76 answer qua runner làm bằng chứng luồng người học đã được thử end-to-end. |
| Query trong drawer có ranh giới khối không mang newline trong textContent | CSS build dùng `.rf-q` dạng grid, `.rf-q-dim`/`.rf-q-on` là block; có token tab-size 4 cho câu SQL, drawer và editor. Không có căn cứ chỉ từ chuỗi DOM để kết luận lỗi dính dòng. Tương tác/hình thực tế chỉ có evidence tác giả, tôi chưa quan sát. |
| Editor/nháp, rollback, dữ liệu và API không đổi | Không mở đợt sửa/tổng kiểm công cụ khác vì patch không đụng các phần này. Tính tương thích nháp theo ID không có thay đổi mới để di trú; chưa thử nháp/undo trong browser. Không đọc seed hay secret để kiểm sâu hơn. |
| 15/15/20 phút và bố cục ở viewport khác | Là ước tính biên tập, chưa đo học viên thật; checklist chỉ có hai viewport desktop. Không kết luận thời lượng đúng hoặc giao diện trên mọi thiết bị. |
| Trạng thái hồ sơ 2.3 còn “đang chờ report”/checkbox review chưa hoàn tất | Đây là trạng thái đang làm việc khi giao tích hợp. Trước bàn giao, tác giả cần cập nhật verification/spec/plan, lưu report gốc và ghi quyết định cho cả các mục ngoài phạm vi ở bảng này. Không tự đánh dấu hoàn tất thay tác giả. |

Tôi chỉ đọc nguồn/HTML/evidence và ghi report này. Không đọc `.env`/secret, `database/HRM_Demo.sql` hay bài sau; không kết nối DB, chạy SQL/API/runner, nộp bài, dùng browser hoặc chạy test/build. Không có viewport hay thao tác UI do chính tôi kiểm; không có kết quả DB/test live của tôi. Không sửa sản phẩm/test/docs/Git. Một lần trích HTML ban đầu gặp encoding stdout cp1252; đọc lại bằng Python `-X utf8` thành công, không dùng lần lỗi làm bằng chứng nội dung.

Mạch 2.1–2.3 không lộ thiếu tiền đề hoặc mâu thuẫn tích hợp có căn cứ trong lượt đọc này. Kết luận chỉ nói về nội dung và bằng chứng đã phân loại; không xác nhận mọi người học tự hoàn thành, không dùng Ready và không cấp quyền commit/push/deploy.

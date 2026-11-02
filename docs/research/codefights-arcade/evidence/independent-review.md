# Review độc lập — nghiên cứu CodeFights Arcade

Ngày: 02/11/2026, Asia/Saigon. Reviewer: agent Codex mới, **kế thừa model của phiên**, không chỉ định model khác, không tạo reviewer khác.

## Phạm vi, phiên bản và cách kiểm

- Review 18 báo cáo `00`–`17`, `evidence-register.md`, `open-questions.md`, `traceability-matrix.md` và receipt trong `docs/research/codefights-arcade/`. Đây là nghiên cứu/đặc tả chưa triển khai; không yêu cầu app Arcade chạy được trong lượt này.
- Source app HEAD được đọc: `8de5a4f407ef4c0740ba571f108ecedfbed975b4`. Đã chạy `git rev-parse HEAD` và đối chiếu **22/22 file** trong `temp/review/2026-11-02-codefights-research/source-manifest.json`: không có hash lệch tại thời điểm review. Hai file nhật ký `validation.md`/`research-plan.md` không thuộc nội dung đã đọc.
- Đã đọc AGENTS.md, quy ước, template, hồ sơ công ty, bài nền 1.1–1.5 và đầy đủ source bài 2.1–2.6, gồm các khối/drawer. Không đọc answer YAML để bù lời giảng. Góc học thử: chỉ Excel văn phòng cơ bản, tự hỏi tại sao/để làm gì trước khi dùng kiến thức chuyên môn để kiểm kỹ thuật.
- Đã đối chiếu source `grade.ts`, `shape.ts`, `core.ts`, `runner.ts`, `sql-guard.ts`, `index.ts`, `limiter.ts`; không đọc `.env`, secret hoặc `database/HRM_Demo.sql`; không kết nối SQL, chạy API/runner, nộp bài hay thay Git.
- Công cụ thực tế: PowerShell qua `exec_command` để đọc/tìm nguồn và kiểm hash; Python chỉ parse JSON REA; `view_image` xem bốn ảnh lịch sử và ba ảnh sandbox đã giao; web read đọc nguồn ngoài; GitHub connector đọc README, hai bài mẫu, LICENSE và Git tree ở commit đã khóa. Không điều khiển browser/account.
- Đã kiểm SHA-256 raw REA bundle là `726be04b3a7c1595cc630e71b95c11968212afb36af81349c5b4621a626b9f97`; summary raw có ID `ev_2a08a2fa71a9199becf2cc4b2fe98dfd2f3bf354c4bea2f0f0ad8b6eedfebf52` bằng đúng trường `summary` trong receipt. Không chạy REA lại.
- Bản build app được giao là build từ source app trên, chưa có Arcade. Tôi không mở build hoặc kiểm tương tác mới; không dùng build đó làm bằng chứng tính năng Arcade. Không lặp test/build của tác giả.
- Trong khi review, tác giả báo có thu thêm Wayback CDX/HTML shell và phân tích REA HTML, **ngoài bản manifest**. Tôi không dùng thông tin được báo này để xác nhận hành vi lịch sử và không review lại bản khác. Khi tích hợp, cần cập nhật nhất quán các câu về khả năng truy cập Wayback và provenance theo evidence mới.

## Kết luận chính

Bộ tài liệu giữ đúng ranh giới nghiên cứu và trình bày thẳng những phần chưa phục hồi được. Các quyết định local/server, host/cost, Coin, DML và nội dung mới đều được công khai là chờ duyệt; tôi không thấy cơ sở gọi đây là thay đổi đã triển khai hoặc quyền push/deploy.

Cần sửa ba điểm trước khi coi bản đặc tả nhất quán: cam kết key hết hạn sau khi đã xóa tombstone; đường chạy lại sau `service_error` terminal; nhãn `CONFIRMED` cho node đã hoàn thành trong ảnh map. Cần làm rõ thêm cách gắn idempotency với Run/Submit. Hai lỗi minh họa nhỏ ở wireframe/brief có thể sửa gọn, không cần tăng phạm vi nghiên cứu.

## Findings theo ưu tiên

### IR-01 — Cần sửa — cam kết 410 không còn thực hiện được sau khi xóa tombstone

**Vị trí:** `14-technical-architecture.md:51–53`, `16-data-and-api-design.md:45`, `17-acceptance-tests.md:32`.

**Câu gốc ngắn:** “Sau expiry trả 410”; “idempotency tombstone giữ tối đa 24 giờ rồi xóa”; “Sau 15 phút trả 410, không cấp job mới từ key cũ”.

**Căn cứ:** key chỉ là UUID của client, trong hợp đồng không có mốc phát hành được server xác thực. Sau khi xóa cả job và tombstone, cùng một UUID/body gửi lại sau 24 giờ không còn phân biệt được với key chưa từng dùng. Nếu admission coi nó là key mới thì chạy suite lại; nếu từ chối mọi key chưa thấy thì không tạo được job mới. AC-23 hiện không chặn khoảng thời gian kiểm và hứa 410 cả khi key đã hết hạn.

**Tác động:** frontend, backend và test có thể cùng làm đúng từng đoạn nhưng bất đồng về việc một retry muộn có được tạo execution mới không. Đây là lỗi hợp đồng, không phải bằng chứng hệ thống hiện tại đang chạy lặp.

**Đề xuất:** chọn rõ cửa sổ idempotency và hành vi sau purge; hoặc thêm cơ chế phát hành key có tuổi được server kiểm. Nếu chọn bảo đảm trong 24 giờ, sửa BR/flow/API/AC cùng phạm vi đó, nói rõ sau purge và vẫn cấm client tự retry vô hạn. Thêm ca tại phút 16, trước giờ 24 và sau purge. Không cần giữ SQL/job payload vô hạn để giữ một dấu chống replay nhỏ.

### IR-02 — Cần sửa — “thử lại” sau service error chưa có đường thực thi nhất quán

**Vị trí:** `04-state-machines.md:63`, `09-user-flows.md:36–37`, `10-wireframes.md:77–78`, `16-data-and-api-design.md:45,49`.

**Câu gốc ngắn:** “ServiceError --> Idle: thử lại cùng yêu cầu”; flow “Lỗi dịch vụ → Giữ nháp và lấy lại job → Nộp”; “Trạng thái terminal bất biến”.

**Căn cứ:** cùng key/payload được trả lại job cũ và không thực thi lại. Nếu job đã terminal `service_error`, poll hoặc POST lại key đó sẽ tiếp tục trả cùng lỗi; không thể trở lại queued/running. Khôi phục sau mất mạng khi chưa biết kết quả là trường hợp khác với chạy mới sau một lỗi terminal đã biết. Wireframe có cả “Lấy lại kết quả job” và “Thử lại” nhưng hợp đồng không chỉ rõ thao tác thứ hai tạo gì.

**Tác động:** học viên có thể bấm thử lại nhưng mã không bao giờ chạy; hoặc client tự tạo key mới để thoát vòng lặp và vi phạm cách retry đang được mô tả. Không cần đổi quyết định MVP để xử lý.

**Đề xuất:** ghi hai nhánh: chưa biết kết quả thì poll/replay cùng key; đã biết terminal `service_error` thì giữ job cũ, người học chủ động tạo job/key mới. Nếu muốn worker retry nội bộ, mô tả nó trước khi đóng terminal cùng giới hạn retry; không mở lại kết quả terminal. Thêm AC cho nút “Thử lại” sau service error và kiểm không tự nộp vô hạn.

### IR-03 — Cần sửa — ảnh map chưa xác nhận node xanh là đã hoàn thành

**Vị trí:** `evidence-register.md:21`, `04-state-machines.md:9`, `05-feature-inventory.md:29`, `10-wireframes.md:9`.

**Câu gốc ngắn:** “CONFIRMED node/world khóa và node đã qua”; “Node hoàn thành/khóa”.

**Căn cứ trực tiếp:** ảnh `triadworks-arcade.png` cho thấy node 30 màu xanh kèm avatar, các node 31–33 khóa và world kế khóa. Không có chữ hoàn thành, checkmark, legend hoặc chuỗi trước/sau Submit trong ảnh. Vì vậy màu xanh có thể chỉ node hiện tại/khả dụng; tôi không kết luận nó chắc chắn chưa hoàn thành. Phần ghi chép raw được giao cũng chỉ mô tả “30 xanh, 31–33 khóa”. [Ảnh gốc](https://silvrback.s3.amazonaws.com/uploads/2e9f79f0-7c7b-4bb1-8608-7c9940d7eebf/arcade.png).

**Tác động:** một diễn giải UI bị nâng thành trạng thái lịch sử đã xác nhận, rồi đi vào wireframe. Điều này đi ngược chính nguyên tắc không suy transition/state ẩn từ ảnh tĩnh trong bộ nghiên cứu.

**Đề xuất:** giữ `CONFIRMED` cho node xanh/không có khóa, node khóa và world khóa; đổi phần “đã qua/hoàn thành” thành `UNKNOWN` hoặc `INFERRED` có giải thích. Thiết kế Completed của MVP vẫn giữ được vì đã có nhãn đề xuất. Đồng bộ các chỗ lặp, không cần tìm đủ màu cho mọi trạng thái.

### IR-04 — Cần làm rõ — key của một snapshot có bao gồm mode Run/Submit không?

**Vị trí:** `14-technical-architecture.md:51`, `16-data-and-api-design.md:29–36`, BR-10 tại `06-business-rules.md:31`.

**Câu gốc ngắn:** “key UUID do client tạo cho một snapshot SQL”; “ràng buộc key với access-code scope và payload digest”; “mode do route định”.

**Căn cứ:** body Run và Submit giống nhau, mode không nằm trong body. Với cùng key, code, challenge/version và SQL, `POST /runs` rồi `POST /submissions` có cùng payload nếu digest chỉ là body. Hợp đồng chưa cho biết trả job Run cũ, từ chối conflict, hay tạo job Submit theo namespace endpoint. Đây là trường hợp cần định nghĩa, không phải lỗi đã tái hiện ở code.

**Tác động:** đội triển khai có thể coi key là của SQL snapshot và tái dùng nó khi chuyển từ Chạy thử sang Nộp; yêu cầu Submit lại nhận kết quả chỉ visible, làm hỏng ý nghĩa FR-05.

**Đề xuất:** key cho một lần hành động và một snapshot; digest gồm mode/route canonical cùng challenge/version/SQL, hoặc scope key theo endpoint. Chốt một lựa chọn và thêm AC dùng lại key Run cho Submit; không yêu cầu người học đổi SQL để được nộp.

### IR-05 — Biên tập — con số tiến độ trong P1 không khớp danh sách

**Vị trí:** `10-wireframes.md:31,36–39`.

**Câu gốc ngắn:** W1 “2/4”, nhưng chỉ C01 “Đã hoàn thành”; C02 “Đang làm”, C03/C04 khóa.

**Tác động/căn cứ:** cùng một khung có hai trạng thái khác nhau của W1. Dù là số minh họa, developer có thể sao cả hai thành fixture UI và BA không biết “đang làm” có được tính hoàn thành không.

**Đề xuất:** đổi thành 1/4, hoặc thể hiện C02 đã hoàn thành và cập nhật khóa C03 tương ứng. Không đổi BR đếm completion.

### IR-06 — Biên tập — phản ví dụ C05 nên nói rõ là mỗi nhánh có dòng đạt

**Vị trí:** `13-sql-arcade-proposal.md:31`.

**Câu gốc ngắn:** hidden scenario “đúng cả hai nhánh”.

**Căn cứ:** với một cột `MaPB` so hai mã khác nhau, một dòng không đồng thời đúng cả hai nhánh; bài 2.3 giải thích rõ điều này ở dòng 58. Có thể ý brief là một dataset chứa dòng đạt của cả hai nhóm, nhưng cách viết hiện không phân biệt hai nghĩa.

**Đề xuất:** viết “có dòng đạt ở mỗi nhánh phòng” hoặc tương đương. Đây là làm rõ brief, không phải thiếu kiến thức AND/OR trong bài nguồn.

## Rà theo thứ tự tài liệu

| Tài liệu | Đánh giá và câu hỏi đã đối chiếu |
|---|---|
| 00 Executive | **Giữ được.** Trả lời được tái hiện đến đâu, cần thiết kế mới gì, vì sao không coi sandbox mới là Arcade. Phân biệt tiêu chí nghiệm thu tương lai với kết quả hiện tại. |
| 01 Historical | **Giữ được.** Tách ngày đăng, ngày chụp và ngày khảo sát; hai sao/5.000 Coin không bị nâng thành luật mọi năm. Không buộc phải tìm ra backend để hoàn tất nghiên cứu. |
| 02 Sources | **Giữ được.** Không tính ảnh/blog/repost là nguồn độc lập; giới hạn giấy phép rõ. Câu Wayback cần đồng bộ bằng chứng bổ sung tác giả vừa báo, chưa thuộc bản review này. |
| 03 Technical | **Giữ được.** Tách browser automation, REA static và backend. Receipt khớp raw summary: một file, 211 modules, 262.559 AST nodes, semantic partial/truncated, 3.000 unknowns; các con số không bị gọi là module runtime đã chạy. |
| 04 States | **Cần sửa IR-02/03.** Mô hình local unlock và job nhìn chung tách đúng; Run passed không bị dùng như Submit completion. |
| 05 Inventory | **Cần sửa IR-03.** Những feature chỉ có control nhìn thấy không bị tự gán persistence/entitlement. Hint không bị nhận nhầm là dialog mua hidden. |
| 06 Rules | **Giữ được.** BR-01–18 là thiết kế mới. XP cá nhân, không chấm alias, giữ duplicate, version và private fixture đều có lý do. IR-01/04 cần phản ánh đồng bộ vào BR-10 nếu làm rõ scope. |
| 07 Testing | **Giữ được.** Nêu hữu hạn test chỉ tăng độ tin cậy; null/rỗng/zero, multiset, order và truncation có tiêu chí. Không hứa decimal/float đầy đủ bằng JS Number. Số 2+3 scenario là workload đề xuất. |
| 08 UI/UX | **Giữ được.** Wireframe chưa bị gọi là prototype chạy; có map/list, tiếng Việt, schema riêng, bàn phím/màn nhỏ và đường khôi phục. Không yêu cầu đem thương hiệu/asset CodeSignal vào sản phẩm. |
| 09 Flows | **Cần sửa IR-02.** Cho Submit trực tiếp, không bắt web-only mở SSMS; access code không được coi là identity/ví. |
| 10 Wireframes | **Cần sửa IR-03; biên tập IR-05.** Các khung P có nhãn thiết kế mới; số ví dụ không bị gọi là người học thật. Hành động retry theo IR-02. |
| 11 Databases | **Giữ được.** Tôi kiểm lại 16 tiêu đề nhóm, 84 README challenge, 264 tree entries, `truncated:false` và MIT thiếu tên chủ thể ở commit khóa. Hai README mẫu hỗ trợ các mô tả về schema/sample/sort/NULL và 10s MySQL; không làm bằng chứng comparator/backend. |
| 12 Gap analysis | **Giữ được trong phạm vi source đã đọc.** Core chạy learner rồi answer, comparator multiset/ordered, alias bỏ qua, số/trailing zeros, giới hạn 200/5000, guard nhận DML và limiter RAM khớp source. Không xác nhận quyền live/production. |
| 13 Proposal | **Giữ được ở mức brief; biên tập IR-06.** Chuỗi kỹ năng phù hợp 2.1–2.6. Tác giả nói thẳng chưa có statement/fixture/answer; DEC-05 chưa duyệt không bị che. |
| 14 Architecture | **Cần sửa IR-01, làm rõ IR-04.** Query principal/loader, private bundle, sandbox riêng, lease, fencing, resource cap và distributed admission có ranh giới rõ; các spike chưa bị giả thành bảo đảm đã kiểm. |
| 15 Functional | **Giữ được.** FR/NFR có AC tương ứng, privacy và accessibility có mục tiêu; chưa tự tuyên bố WCAG hay SLA đã đạt. Không có yêu cầu giấu kiến thức cốt lõi để nhường editor. |
| 16 Data/API | **Cần sửa IR-01/02, làm rõ IR-04.** Scope/version/hash và kết quả hidden tổng rõ; không nhận client pass list. Cần chốt recovery và tuổi key để contract có một nghĩa. |
| 17 Acceptance | **Giữ được là test specification.** Nêu đúng môi trường/evidence phải thu sau triển khai; AC-23 cần giới hạn/hành vi purge theo IR-01; bổ sung retry terminal/mode theo IR-02/04. |
| Evidence/Open/Trace | **Giữ được cấu trúc, sửa confidence IR-03.** Traceability đủ dẫn tới BR/FR/AC quan trọng; câu hỏi lịch sử không bị đóng bằng thiết kế thay thế. Phần Wayback mới cần nguồn/version riêng. |

## Bảng tiền đề C01–C10

Đánh giá dưới đây thử xác định cách làm từ bài đã học, không từ đáp án. “Đủ ở mức brief” không xác nhận statement/fixture hoặc SQL live chưa được viết.

| Challenge | Kiến thức cần | Nơi đã dạy trước bài tập | Còn thiếu/điều kiện cần giữ khi soạn |
|---|---|---|---|
| C01 | Bảng/cột, SELECT/FROM, liệt kê cột đúng vị trí; thứ tự dòng không bắt buộc | 1.2 về bảng/cột; 2.1 dòng 50–56 về thứ tự cột, dấu phẩy và không dùng `*` khi cần cột cụ thể | **Đủ mức brief.** Đề phải cho schema hai cột; hidden rỗng kiểm metadata ở grader, không đòi học viên học API metadata. |
| C02 | Đọc bảng PhongBan, đổi vị trí cột trong SELECT | 1.2/1.5 nêu PhongBan/MaPB/TenPB; 2.1 dòng 50 | **Đủ mức brief.** Không được ngầm yêu cầu kết bảng hoặc ORDER BY khi mới tới C02; tên trùng không làm mã trùng. |
| C03 | WHERE so sánh bằng mã, nháy đơn, phân biệt mã với tên | 2.2 dòng 43–56; 2.1 chọn cột | **Đủ mức brief.** Chốt các cột cần trả trong statement; không biến kết quả rỗng thành lỗi SQL. |
| C04 | Chuỗi Unicode với N, WHERE theo trạng thái | 1.3 phần Unicode; 2.2 dòng 60 và 168 | **Đủ mức brief.** Schema/giá trị trạng thái được nêu; không bắt suy trạng thái từ ngày hoặc quy tắc nghiệp vụ chưa cho. |
| C05 | OR/AND, ngoặc, ưu tiên AND, mỗi vế có phép so sánh | 2.3 dòng 58–60 và Hay nhầm dòng 149/152 | **Đủ mức brief.** Sửa cụm “đúng cả hai nhánh” theo IR-06; không yêu cầu cùng một mã bằng hai giá trị khác nhau. |
| C06 | date không giờ, khoảng gồm hai đầu, mốc nhỏ/lớn, ngày yyyymmdd | 1.3 kiểu date; 2.2 dòng 60–62; 2.3 dòng 55,62 và Hay nhầm dòng 150 | **Đủ mức brief.** Giữ cột là date như đã nói; không đổi thành datetime rồi dùng hidden ở cuối ngày để bắt kỹ thuật chưa học. |
| C07 | LIKE, `%`, `_`, vị trí wildcard, Unicode và quy tắc hoa/dấu | 2.3 dòng 64–66, Memo và tự kiểm tra dòng 191–194 | **Đủ mức brief có điều kiện.** Brief công khai chưa chốt mẫu cụ thể; điều này đã nói ở 13 dòng 38. Khi soạn không đòi escape nâng cao; public hóa collation/hoa/dấu như đã hứa. |
| C08 | TOP tối đa N, ORDER BY nhiều cột, DESC/ASC, khóa chính làm tie-break | 1.4 khóa chính; 2.4 dòng 55,61–67 | **Đủ mức brief.** Public schema phải khai báo MaNV duy nhất; đồng ngày phải có ở ranh giới ba dòng để phản ví dụ thiếu tie-break có tác dụng. Không coi thứ tự chèn đảo tự nó bảo đảm mọi query thiếu ORDER BY đều trượt. |
| C09 | NULL khác rỗng/chữ NULL, IS NULL không phải = NULL | 1.3 NULL; 2.5 dòng 41,60–64 và Hay nhầm dòng 184/186 | **Đủ mức brief.** Không cần COALESCE, TRIM hoặc chuẩn hóa email; đề chỉ giữ null thật như brief. |
| C10 | DISTINCT một cột, giữ mỗi mã một lần, ORDER BY; phân biệt mã xuất hiện với danh mục đủ phòng | 2.6 dòng 24,41–60 và Hay nhầm dòng 147; ORDER BY từ 2.4 | **Đủ mức brief.** Giữ MaPB không null như 13 dòng 38; đề nói mã xuất hiện trong NhanVien, không hứa có mọi phòng của PhongBan. |

Không thấy yêu cầu cú pháp mới chưa được dạy trong mười brief. Chưa thể kết luận học viên chắc chắn làm được mười đề thực tế: chưa có câu chữ statement, mẫu, schema cuối cùng và fixtures để học thử. Đây là giới hạn được tài liệu công khai, không phải yêu cầu xây nội dung ngoài nhiệm vụ nghiên cứu.

## Các câu hỏi “tại sao/để làm gì”

| Câu hỏi khi đọc | Bài/tài liệu đã trả lời hay chưa |
|---|---|
| Vì sao Run đạt chưa đủ hoàn thành? | 06 BR-01/03 và 07 mục 2: mẫu công khai không chứng minh các trường hợp khác; Submit tự chạy lại cả suite. |
| Vì sao cần hidden riêng, không chỉ HRM_Demo? | 00 mục E, 12 ma trận và 14 public/private: một dataset/đáp án công khai dễ hardcode; không hứa test hữu hạn chứng minh tổng quát. |
| Vì sao chưa đưa Coin vào bản đầu? | 13 DEC-03, 06 mục 3 và 16 mục 5: cần identity, giá/quyền, ledger và atomic grant; không lấy giá lịch sử đơn lẻ làm giá mới. |
| Vì sao local unlock không phải chứng nhận? | 04 dòng 48, 13 DEC-01 và 14 mục 6: người dùng sửa/mất local data được; XP chỉ tự theo dõi. |
| Vì sao rollback chưa đủ cho runner mới? | 12 mục 4 và 14 mục 2: còn quyền đọc ngoài fixture, contention/CPU/I/O và cleanup; sandbox/lease cần kiểm riêng. |
| Vì sao phải tie-break ở C08? | 2.4 dòng 61–65: ngày trùng cần mã duy nhất để chọn đúng nhóm ở biên TOP. |
| Vì sao C09 không coi chuỗi rỗng/chữ NULL là thiếu thật? | 2.5 phần chính: đó vẫn là giá trị, khác null token; không cần tự thêm quy tắc làm sạch. |
| Vì sao retry service error có thể chạy lại nếu terminal bất biến? | **Chưa có câu trả lời nhất quán** — IR-02. |
| Vì sao biết key đã hết hạn khi đã xóa dấu của nó? | **Chưa được giải quyết** — IR-01. |

## Nguồn ngoài đã đối chiếu và giới hạn nguồn

- Hai thông cáo [launch 2016](https://www.prnewswire.com/news-releases/codefights-unveils-code-arcade-to-make-honing-your-skills-a-thrilling-game-300332143.html) và [rebrand 2018](https://www.prnewswire.com/news-releases/codefights-becomes-codesignal-launches-the-coding-score-for-developers-300678041.html) khớp các phát biểu có phạm vi trong báo cáo; không xác minh runtime từ thông cáo.
- [TriadWorks](https://blog.triadworks.com.br/praticando-algoritmos-de-forma-divertida-com-o-code-fights) và [Lun Wai](https://lunwai.medium.com/codesignal-arcade-intro-56-digitsproduct-484af6937f59) là hai tác giả/trải nghiệm độc lập có lời kể dùng Coin xem hidden; phù hợp nhãn STRONGLY SUPPORTED cho sự tồn tại cơ chế. Không đủ chốt ngày giao dịch, giá hay entitlement. Không dùng lời giải của họ.
- [InfoWorld CEO interview](https://www.infoworld.com/article/2262046/q-a-can-coding-games-progress-developer-careers.html) nêu các nhóm thưởng và mở bài khó hơn; tài liệu đang giữ đúng phạm vi phát biểu. [Practice guide hiện tại](https://support.codesignal.com/hc/en-us/articles/21025134150423-How-do-I-practice-coding-questions-on-CodeSignal) có updated 19/10/2026 và nói đây là practice assessment, không thay luật Arcade cũ.
- GitHub connector đọc [README pinned](https://github.com/code-signal/code-signal-arcade-databases/blob/f85efe2ede2dd2721216c89e0c9e765a7f5ca000/README.md), [Project List](https://github.com/code-signal/code-signal-arcade-databases/blob/f85efe2ede2dd2721216c89e0c9e765a7f5ca000/1_projectList/README.md), [Null Intern](https://github.com/code-signal/code-signal-arcade-databases/blob/f85efe2ede2dd2721216c89e0c9e765a7f5ca000/25_nullIntern/README.md), [LICENSE](https://github.com/code-signal/code-signal-arcade-databases/blob/f85efe2ede2dd2721216c89e0c9e765a7f5ca000/LICENSE) và [tree](https://api.github.com/repos/code-signal/code-signal-arcade-databases/git/trees/f85efe2ede2dd2721216c89e0c9e765a7f5ca000?recursive=1). Chỉ đối chiếu cấu trúc/loại dữ kiện, không chép nguyên đề/đáp án. Tên tổ chức và MIT repo chưa chứng minh quyền với tài sản gốc CodeSignal.
- Microsoft [NULL/UNKNOWN](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql?view=sql-server-ver17), [decimal/numeric](https://learn.microsoft.com/en-us/sql/t-sql/data-types/decimal-and-numeric-transact-sql?view=sql-server-ver17), [collation/Unicode](https://learn.microsoft.com/en-us/sql/relational-databases/collations/collation-and-unicode-support?view=sql-server-ver17) hỗ trợ ranh giới kỹ thuật được nêu. Không dùng chúng để chứng minh driver, quyền sandbox hoặc comparator mới đã hoạt động.

## Chưa xác minh độc lập

1. Không có runtime Arcade lịch sử, video động/timestamp, request lịch sử hoặc backend/hidden fixtures. Ảnh đã xem chỉ xác nhận pixels và nhãn hiện diện.
2. H-04: chưa tải/render được PDF UPV. Lần mở URL canonical của reviewer trả lỗi kích thước, khác lỗi Anubis được tác giả ghi ở lượt trước; hai kết quả có thể thuộc hai lần truy cập khác nhau. Tìm kiếm còn trả bản text qua Scribd, chỉ là bản chuyển tải cùng luận văn, không là nguồn độc lập và không xác nhận pixels. Giá 5.000, Fig 13, ngày khảo sát và Coin mở world không được nâng confidence trong review này.
3. Chưa tái kiểm H-08/H-09/H-10, D-06 Intro và toàn bộ 51 JavaScript asset; không xác nhận mọi URL/version/historical rule của catalog từ việc đã kiểm một phần. Nhãn unknown trong tài liệu phải tiếp tục giữ.
4. REA raw được kiểm hash và summary, không thẩm định từng semantic node, quan hệ hoặc syntax parse bằng một parser khác. Receipt tự ghi authored; phần số liệu đã đối chiếu không biến nó thành runtime capture.
5. Ba ảnh sandbox khớp 0/2 Run, 0/4 Submit và MySQL 1064; không tự chứng minh sequence click, disable/cancel, menu Env/version, clipboard đã phục hồi hoặc persistence. Đó là lời tường trình đã giao của tác giả, không phải thao tác reviewer làm.
6. Không SQL live về quyền, precision, reset, fencing, timeout/cancellation, contamination hoặc throughput. Không kiểm resource/cost/SLA. Đây đều là spike/AC tương lai trong tài liệu, chưa phải lỗi thực thi đã chứng minh.
7. Không statement/fixture/ref/mutant thật cho C01–C10; chưa thử câu lời giải hay chứng minh phản ví dụ loại đúng cách làm sai. Bảng tiền đề chỉ xác nhận kỹ năng dự kiến đã được giảng.
8. Không prototype UI Arcade, keyboard/viewport/copy/paste thật hoặc regression build hiện có trong lượt review. Không chạy test/build hay ghi kết quả của tác giả thành kiểm của reviewer.

Đầu ra của reviewer chỉ là file này. Không có sửa sản phẩm, seed, hạ tầng hoặc Git; kết luận review không thay phê duyệt triển khai/push/deploy.

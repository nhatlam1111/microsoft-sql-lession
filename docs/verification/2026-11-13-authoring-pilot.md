# Áp dụng quy trình biên soạn và pilot

Ngày 13/11/2026. HEAD nền: 4066c0f3e589c7b34a02106702aa1351cc3ade23; thay đổi ở working tree, chưa commit/push/deploy.

## Phạm vi hoàn thành

- [Quy trình chung](../bien-soan.md): đọc theo tác động, kiểm sớm ví dụ đại diện, prompt giao tác giả/reviewer.
- AGENTS.md và CLAUDE.md dẫn về nguồn chung, giữ khác biệt model/công cụ; quy ước mục 4 đã thay quy trình cũ. Bài mới/sửa đáng kể vẫn có reviewer độc lập; chỉ mở review tích hợp khi có phụ thuộc xuyên bài/công cụ.
- Skill course-author ở .agents/skills và .claude/skills giống nhau từng byte; giữ nguyên bốn teach-skills, chỉ dùng chúng khi được gọi rõ cho dạy tương tác.
- [Định hướng phần 4–5](../dinh-huong-khoa-hoc.md) đã thành chuẩn phạm vi cho lượt viết tiếp. Chưa viết lại 19 bài hay đổi menu/ID/URL/tiến độ.
- Pilot bài 1.1 giải nghĩa liên hệ bằng mã chung, cụ thể hóa khóa–giá trị và sửa khoảng cách hai chú thích.
- Pilot bài 3.10 giải thích vì sao COUNT(MaHD) đếm được số dòng trong thiết kế bộ mẫu, tách quyết định tính/lọc và thay lời lặp trong hai ví dụ drawer bằng lý do ra 3 và 0.

Không sửa SQL, YAML, bảng kết quả, API, runner, component, test hoặc dữ liệu. Không sửa file premium-audit.json có từ trước.

## Bằng chứng kiểm

| Kiểm | Kết quả thực tế |
|---|---|
| npm test sau sửa chính | 596/596 đạt, 70 file. Lần đầu có một assertion về định dạng chữ “effort high”; đã khôi phục phần in đậm của quy ước, không sửa/nới test |
| npm run check | 0 errors, 0 warnings, 7 hints ở 314 file |
| npm run build | Đạt, 198 trang; build cuối 22:16:31 giờ Việt Nam sau sửa theo review |
| npm run check:dist sau build cuối | Đạt: 280 trang, 4.141 liên kết |
| Kiểm lại sau sửa hai finding 1.1 | 83/83 đạt trong content.test.ts, content-student-review.test.ts và docs.test.ts; không lặp cả bộ khi SQL/YAML/component không đổi |
| SQL và dữ liệu 3.10 so với HEAD | Cùng câu SQL, query, focus, dữ liệu các bước, Result và Messages. Đối chiếu RunFlow bằng cách đọc literal như helper lesson-blocks; chỉ bỏ trường explanation của calculations khi so sánh vì đó chính là lời văn được sửa |
| Schema MaHD | Source database/HRM_Demo.sql dòng 75 khai báo NOT NULL và PRIMARY KEY. Câu giảng ghi rõ “trong thiết kế bộ mẫu”; chưa kiểm schema database live |
| HTML tĩnh 1.1 | Có ví dụ mã nhân viên → hồ sơ; không còn “NoSQLĐường” hoặc “cột.Ví dụ”; hai chú thích có khoảng trắng |
| HTML tĩnh 3.10 | Có lời giải thích mới, reviewer đã đọc phần chính và hai ví dụ drawer |
| Skill | Hai bản giống nhau; YAML/name/description và liên kết hợp lệ qua thư viện yaml sẵn trong repo |
| Tài liệu và phạm vi | Liên kết tương đối của tài liệu hiện hành tồn tại; git diff --check đạt; không đổi exercises/API/components/tests/database |

Bảy hint nằm ở các file không sửa: FormEvent deprecated trong ArcadeHome.tsx, ArcadeWorkspace.tsx, ExerciseWorkspace.tsx (mỗi file hai vị trí) và document.execCommand deprecated trong SqlEditor.tsx. Đây là cảnh báo nền của công cụ, không phải bảy lỗi bài giảng.

Validator Python đi kèm skill-creator đã được thử nhưng không chạy được vì thiếu PyYAML. Không cài thêm dependency; kiểm thay thế như trên, không gọi đó là kết quả của validator chính thức. Phép so chuỗi sơ bộ cho SQL/MDX không phù hợp đã được thay bằng đối chiếu literal có cấu trúc; không có sửa SQL để làm kiểm đạt.

Log local ở temp/verification/2026-11-13-authoring-pilot/: test.log, check.log, build.log, retest.log, rebuild.log và source-preservation.json. Hash 1.1 trong source-preservation.json thuộc lần trước sửa hai finding; build cuối và addendum reviewer là bằng chứng cho bản 1.1 sau sửa. Hash/source 3.10 không đổi sau review.

## Review và xử lý

Hai agent được cấu hình Terra/high, fork_turns none; không có công cụ xác nhận độc lập model thực tế. Cả hai đã bị ngắt do hạn mức, rồi tiếp tục đúng agent/lượt sau yêu cầu “continue”; không tạo agent thay thế.

| Report | Nhận xét | Xử lý |
|---|---|---|
| [1.1](../reviews/2026-11-13-authoring-pilot/review-1-1.md), finding 1 | Khóa–giá trị chưa có ví dụ cụ thể | Làm theo: mã nhân viên là khóa, hồ sơ là giá trị. Giữ phạm vi nhập môn |
| 1.1, finding 2 | Hai chú thích dính chữ trong HTML | Làm theo: thêm dấu câu/khoảng trắng; kiểm HTML cuối |
| 1.1, addendum | Hai đoạn sau sửa | Reviewer xác nhận đã xử lý cả hai, không còn vướng trong phạm vi được kiểm |
| [3.10](../reviews/2026-11-13-authoring-pilot/review-3-10.md) | Không có finding có căn cứ | Giữ; đủ tiền đề ba đề và bốn câu tự kiểm theo source |

Giữ nguyên findings gốc; reviewer bổ sung addendum cùng lượt. Không mở thêm review tích hợp: hai bài độc lập chỉ sửa lời giảng, không đổi quan hệ tiền đề hoặc phần mềm dùng chung. Quy trình/adapter được tác giả đối chiếu liên kết và nội dung, không tuyên bố đã có một review tích hợp riêng.

## Usage và giới hạn nghiệm thu

[Snapshot usage](2026-11-13-authoring-pilot-usage.json) tách hai lượt tác giả với hai reviewer (12 và 10 response tại thời điểm chụp). Đây là số đo trước bàn giao, gồm cả sửa quy trình/skill/tài liệu và xử lý gián đoạn; không phải giá thành viết riêng hai bài. Reasoning nằm trong output, không cộng thêm. Chưa có baseline cùng nhiệm vụ/model nên không kết luận giảm bao nhiêu phần trăm usage.

Chỉ kiểm source và HTML tĩnh, chưa kiểm tương tác browser, bố cục trực quan, khả năng học thực tế của học viên hoặc SQL live. Không gọi UI/SQL/API là đã đạt; không cần chạy lại mọi đáp án vì SQL/YAML/runner không đổi. Các câu lệnh kỹ thuật được giữ nguyên và đã đối chiếu với source/test, không có thao tác ghi database.

Phần sẵn sàng dùng ngay là quy trình và skill mới cùng hai bài pilot local. Việc hoàn thiện từng bài phần 4–5 theo định hướng mới là công việc tiếp theo, không được tính là đã hoàn tất trong pilot.

## Bổ sung sau đối chiếu quy trình Claude — 13/11/2026

Phạm vi lượt này: bổ sung gói giao việc, mức nội dung, bằng chứng có điều kiện dùng lại và bàn giao trong bien-soan.md; đồng bộ mục 4 quy ước và hai bản course-author. Không sửa bài hay repo senior-database-knowledge. AGENTS.md/CLAUDE.md tiếp tục trỏ về cùng nguồn; giữ adapter reviewer Terra/high và Sonnet/high. Đây là kiểm quy trình và mẫu giao việc, không phải lượt review lại hai bài hoặc phép đo khả năng học.

Nguồn tham khảo đã đọc trực tiếp: E:/Projects/senior-database-knowledge/.claude/skills/write-week/SKILL.md, .claude/agents/lesson-writer.md, .claude/agents/lesson-reviewer.md, docs/templates/lesson-packet.md, CLAUDE.md và docs/reviews/A5.md. Pipeline v3 đặt mục tiêu 250k token/bài chưa đo; log A5 tự báo khoảng 300k qua năm lượt, chưa tách cache. README review vẫn mô tả v2. Chỉ tiếp thu gói bài và đọc theo nhiệm vụ; không lấy mục tiêu đó làm mức tiết kiệm đã chứng minh, không chép giới hạn hai vòng, độ sâu Senior hoặc lệnh check theo file sang repo này.

### Thử điền gói giao việc: bài nền 1.1

| Trường | Gói thử trên bài đã có |
|---|---|
| Bài/mục tiêu | [1.1](../../src/content/lessons/1-1-database-la-gi.mdx): giải thích database/DBMS, phân biệt quan hệ/NoSQL, nhận diện bảng/dòng/cột |
| Tiền đề/tình huống | Excel cơ bản; bài không có tiền đề SQL và không bắt buộc tình huống. Ví dụ workbook nhân viên/hợp đồng làm điểm tựa |
| Phải hiểu để làm bài | Dữ liệu khác phần mềm quản lý; quan hệ và NoSQL tổ chức khác nhau; mỗi dòng đại diện gì; giới hạn của phép so với Excel |
| Cần nhận biết | Các ví dụ mô hình NoSQL và việc dữ liệu chung vẫn cần quy tắc/người kiểm |
| Tùy chọn | Không bổ sung trong lượt thử; không đi vào triển khai engine, tuning hoặc DDL |
| Giữ/sửa | Giữ nguyên toàn bài, ảnh, tự kiểm. Chỉ điền gói; không giao viết lại |
| Đề cần đáp ứng | Bốn câu tự kiểm dưới “Ghi nhớ”; noExercises: true, không tạo YAML giả. Tiền đề nằm ở “Từ Excel đến những cách tổ chức dữ liệu”, “Hai nhóm: database quan hệ và NoSQL”, “Bảng, dòng và cột trong mô hình quan hệ” |
| Nguồn cần đọc khi thực sự biên tập | Toàn bài; quy ước mục 1–2, 4; template “Bài nền” khi đổi cấu trúc. Không cần mở cả hồ sơ công ty khi không thay số liệu/tình huống |
| Trạng thái kiểm | Review cũ có bảng bốn tiền đề và addendum xử lý hai finding; xem liên kết trong phần Review ở trên. Không gọi đó là review mới; chưa kiểm khả năng tiếp thu thực tế |

### Thử điền gói giao việc: bài truy vấn 3.10

| Trường | Gói thử trên bài đã có |
|---|---|
| Bài/mục tiêu | [3.10](../../src/content/lessons/3-10-subquery-trong-select.mdx): tạo một giá trị theo từng dòng ngoài, phân biệt 0/NULL, nhận ra lỗi nhiều dòng/cột |
| Tình huống | Giữ mọi hồ sơ NhanVien; thêm số dòng HopDong cùng MaNV, không suy ra hợp đồng đang hiệu lực |
| Tiền đề cần đọc | [2.5](../../src/content/lessons/2-5-null-o-trong.mdx), “Lọc và ghi nhãn ở những ô chưa có giá trị”; [3.1](../../src/content/lessons/3-1-count-sum-avg.mdx), “Từ công thức Excel đến các hàm tổng hợp”; [3.9](../../src/content/lessons/3-9-subquery.mdx), “Từ danh sách mã trong Excel đến câu truy vấn con” |
| Phải hiểu để làm bài | Liên hệ mã dòng ngoài/câu con; phạm vi lọc; một ô nhận một giá trị; COUNT và SUM/MAX trên phạm vi rỗng; đủ tiền đề lọc Unicode/khoảng ngày/sắp xếp |
| Cần nhận biết | Bỏ điều kiện liên hệ có thể vẫn chạy nhưng sai ý nghĩa; thứ tự giải thích logic không phải kế hoạch thực thi vật lý |
| Tùy chọn | Không thêm trong lượt thử; tuning và biến đổi kế hoạch thực thi ngoài phạm vi |
| Giữ/sửa | Giữ toàn bộ bài, SQL, RunFlow, kết quả và YAML. Chỉ điền gói |
| Đề cần đáp ứng | [YAML](../../src/content/exercises/3-10-subquery-trong-select.yaml): 3-10-1 đếm, 3-10-2 cộng, 3-10-3 lấy ngày lớn nhất; bốn câu tự kiểm dưới “Ghi nhớ”. Phần giảng chính/Hay nhầm cùng tiền đề trên phải đủ trước khi xem đáp án |
| Nguồn cần đọc khi thực sự biên tập | Toàn bài/YAML và tiền đề; quy ước mục 1–2, 4. Dữ liệu đổi: thêm mục 3, 5 và hồ sơ công ty mục 3–4. Cấu trúc đổi: template “Bài có câu lệnh và kết quả” |
| Trạng thái kiểm | Report cũ có bảng ba đề/bốn câu tự kiểm; schema MaHD mới chỉ đối chiếu source. Chưa kiểm SQL live, API hoặc UI tương tác; không suy ra các kiểm đó đã đạt |

Hai gói dùng mục tiêu/frontmatter, đường dẫn, heading thực tế và bảng tiền đề đã có; không tạo thêm brief, agent hay bản sao report. Gói không thay source và không cấm reviewer mở thêm tiền đề có liên quan.

### Dấu phiên bản và điều kiện dùng lại

SHA-256 đầu lượt bổ sung (là mốc bảo toàn của lượt này, không xác nhận ngược phiên bản đã review):

| File | SHA-256 |
|---|---|
| Bài 1.1 | f20c18e651dcacb2e8e8c95801e31ed2a560b122b3c4d4d8a580ae63f29cb14a |
| Bài 3.10 | 36acf12a182166261af4b9a7a648f5fa924cd8f996f426d960502cdfa20bdd48 |
| YAML 3.10 | 44f5fa27025dc0a9d72903bc38a9a60e6849fd728f30530b91a1fa2bf3beeb2d |

- Report review/kiểm cũ được dùng để tham chiếu tiền đề và giới hạn của mẫu giao việc. Không nâng thành bằng chứng nghiệm thu bản phát hành hiện tại khi chưa khóa đủ phiên bản/phụ thuộc.
- Hash 1.1 trong source-preservation.json cũ có trước sửa review, nên không dùng nó chứng minh bản cuối; addendum ghi phần đã kiểm riêng. Source 3.10 cũ không thay sau review theo hồ sơ, nhưng chưa có đủ hash mọi phụ thuộc để xác nhận lại toàn bộ kiểm cũ.
- Quy ước đổi trong lượt này: chạy lại test tài liệu liên quan. Chỉ hồ sơ quy trình/skill đổi, không cần dựng lại bài hoặc kiểm SQL/API. Bộ kiểm phát hành vẫn giữ nguyên khi có nghiệm thu phát hành.

### Kiểm lượt bổ sung và bàn giao

- `npm test -- tests/docs.test.ts`: 5/5 đạt lúc 22:28:38, 13/11/2026. Không gọi đây là lần chạy lại bộ 596 test.
- Validator skill-creator Python vẫn bị chặn bởi thiếu PyYAML. Không cài dependency; kiểm thay thế bằng Node/thư viện yaml sẵn có đạt: metadata/name/description hợp lệ, không còn placeholder TODO, hai skill giống từng byte. Đây không phải kết quả validator Python.
- Kiểm 33 liên kết local trong tài liệu/skill liên quan: tất cả tồn tại. AGENTS.md và CLAUDE.md có cùng hướng dẫn chung, chỉ khác đoạn adapter công cụ. `git diff --check` đạt. Không thêm test chỉ để khóa câu chữ quy trình.
- SHA-256 tổng hợp của 842 file tracked ngoài AGENTS.md, CLAUDE.md và quy-uoc.md giống đầu lượt: `cbb0d5e2b73a844b0c99380b62ae1ad08fbc883b4eb2fd43a43b0fe1bd477b50`. Xác nhận lượt bổ sung giữ nguyên bài, YAML, template, test, component/API/database; những diff bài đã có từ pilot trước không phải thay đổi của lượt này.
- Việc đã xong: cập nhật quy trình/skill và điền hai gói thử. Không mở finding mới về bài giảng; không viết lại hoặc tạo review để lấy số đo.
- Bước tiếp theo: áp dụng gói này vào hai lượt biên soạn thật tiếp theo do người dùng giao. Ghi mỗi vai/giai đoạn: model/effort, số lần gọi, input/cache/output theo log, số lần đọc tài liệu, vòng sửa; không có log ghi thiếu. Chưa có hai mẫu mới, chưa kết luận giảm token hay cải thiện học tập.

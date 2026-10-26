# Review tích hợp mới — bài 4.4–4.6

## Phiên bản, phạm vi và công cụ

- Ngày 26/10/2026; vai Senior Code Reviewer; model kế thừa model của phiên. Tự thực hiện toàn bộ review, không phân agent hay nhờ review thay.
- Root: `/workspace/scratch/2f7a56f40308/microsoft-sql-lesson-4-6`; branch `codex/lesson-4-6-full`; range chính xác `106701b7a53c3ad738987f4076418822792d7a44..e0745bb0e662b0f15a815bbef496411d7773ef6c`. Đọc status/log/stat/diff/show; HEAD đúng head được giao, cây làm việc sạch lúc bắt đầu. Range có 24 file thay đổi; `git diff --check` không báo lỗi khoảng trắng.
- Đã đọc AGENTS, quy ước, template, hồ sơ công ty, mẫu 1.1, spec/plan và đủ ba MDX/hai YAML/test/helper mới. Đối chiếu các phần tiền đề liên quan ở 2.5/2.7/2.8/3.3/3.4/3.5/3.8/3.10/4.1/4.3, code public exercise/route/guard/grader/copy/status, hướng dẫn công khai và hồ sơ learner/disposition được phép đọc. Không lặp lại learner review từng câu.
- **Kiểm do tôi thực hiện:** đọc Git/source/HTML; Python chuẩn để SHA-256, parse HTML/INSERT literal và tính toán thuần. Cả 10 fingerprint trong integration manifest và 8 fingerprint source/build trong manifest cuối đều khớp. Tự đối chiếu 9 SQL render, 6 payload copy, 6 bảng Result/tiêu đề/dòng/đánh dấu, các heading/câu ôn/liên kết; scan 153 file HTML/JS/JSON của web build tìm cả sáu answer; tính riêng từ 20 đơn, 48 hồ sơ, 55 hợp đồng. Không gọi fixtureQuery, SQLite, PIVOT adapter, test, API, runner, SQL Server, browser hoặc secret; không cài gói, không thay Git/sản phẩm.
- **Bằng chứng tác giả, không phải tôi chạy:** verification chung và các log được giao ghi Node 22.23.4: 322 test/48 file; Astro 0 error/0 warning/3 hint nền; API build 78 bài/typecheck; build 132 trang/check:dist 1994 link. Log live/data dừng vì thiếu bốn biến SQL trước connection. Tôi đọc các kết quả này, không đổi chúng thành bằng chứng chạy SQL/UI của reviewer. Hash và đối chiếu HTML xác nhận artifact đang đọc; tôi không tự build lại.

## Điểm giữ được

- **Mạch giữa bài và đường học phù hợp công cụ:** 4.4 nối đúng báo cáo tháng 4.3 và CTE 4.1; 4.5 phân biệt tên CTE trong một câu với định nghĩa view được lưu; 4.6 dùng lại nhóm/kết bảng/CASE/UNION ALL và dạy cách ráp trước phần ôn. Sáu đề đều có phạm vi, vị trí cột và thứ tự rõ. Hướng dẫn nhận mã/bản SQL Server riêng không buộc người chỉ học web kết nối SSMS; riêng 4.5 có lối hoàn thành bằng năm câu ôn và hint tương ứng.
- **Giới hạn và đơn vị được giữ nhất quán:** ngày trên đơn khác thực nghỉ; cộng nguyên theo tháng bắt đầu, không chia đơn qua tháng; nhóm CCCD khác hồ sơ và người; nhánh hợp đồng có đơn vị khác hồ sơ. 4.6 nói rõ nhiều cờ có thể cùng thuộc một hồ sơ, và kết quả không tự là quyết định sửa/xóa.
- **Phạm vi kiến trúc được giữ:** diff không đổi UI/component/API/guard/grader/schema/seed. Sáu bài mới đều là query. `publicExercises` bỏ answer/check trước khi truyền ra web; 4.5 không YAML/route bài tập. Hai thay đổi helper nằm trong test, không được đưa vào đường chạy production; không thêm RunFlow không hỗ trợ PIVOT hoặc ép DDL vào runner.
- **Test mới kiểm hành vi có nghĩa:** goldens kiểm giá trị/cột/nhóm, MaDon thừa, NULL so với 0, đổi trục/phạm vi/phép tính; overrides 4.6 kiểm email thiếu, ngày biên, giữ phòng có 0, nhiều cờ và ba nhánh COUNT bằng 0. Không thêm prose snapshot cho 4.5. Adapter tự ghi rõ chỉ là mô hình số học hẹp, không phải trình biên dịch T-SQL. Source/HTML và ghi chép giới hạn không quảng cáo fixture là SQL Server.
- **Artifact tĩnh khớp:** 4.4 có 4 SQL/3 copy/3 Result/4 câu ôn; 4.5 có 2 SQL/0 copy/0 Result/5 câu ôn; 4.6 có 3 SQL/3 copy/3 Result/5 câu ôn. SQL source đã giải mã trùng từng code/payload render; nháy thẳng, tab thật, không lộ `\\t`; dấu dòng 1/3 ở Result chính 4.4 khớp lời dẫn. Câu ôn nằm sau Memo; bài có đề đặt trước Bài tập. Không có success status giả cho hai mẫu view.

## Năm Review Focus theo nguyên văn plan

1. PIVOT giữ MaDon ngoài ý muốn: nguồn chỉ ba vai trò cần thiết, nhóm hàng đúng tháng/type. Task1 kiểm nhóm nguồn, fixture và biến thể có thêm mã đơn.

   Nguồn 4.4 dòng 36–43/91–103 chỉ có Thang/LoaiNghi/SoNgay; answer đổi trục vẫn chỉ giữ ba vai trò tương ứng. Dòng 53 giải thích đúng hậu quả MaDon thừa và việc bỏ nó ở SELECT ngoài không sửa nhóm. Tính thuần cho 20 đơn xác nhận 3 khóa tháng; thêm mã đơn làm 20 khóa tháng–mã. Test dòng 26/33–34 bảo vệ điều này; tôi đọc test, không chạy adapter.

2. Ô không có tổ hợp: SUM/CASE không ELSE cho NULL, COUNT(MaDon) cho0; không đổi nghĩa bằng ELSE0. Task1 kiểm cả các ô thiếu và COUNT theo trạng thái.

   4.4 dòng 57–87 giải thích đủ hai nghĩa. CASE minh họa không ELSE; nguồn MaDon có PRIMARY KEY/NOT NULL trong script. Tính thuần khớp ba dòng ngày `[12,2,NULL] / [12,5,3] / [10,NULL,1]`; phạm vi đã duyệt chỉ có tháng 8/9, lần lượt `[12,2,NULL] / [9,5,2]`. Số đơn theo loại/trạng thái là Nghỉ ốm `[4,0,0]`, Phép năm `[8,3,1]`, Việc riêng `[2,1,1]`; đổi tháng thành trục cho `[2,5] / [12,12] / [NULL,3]`. Đây là đối chiếu từ literal, không chứng nhận SUM/COUNT/PIVOT đã chạy trên SQL Server.

3. View chưa có trong DB: không offer copy/run hoặc giả kết quả thành công; quyền tạo/đọc và định nghĩa/snapshot phải rõ. Task2 kiểm render noExercises, copy payload và tự kiểm tra bằng đọc HTML/manual, không viết prose snapshots.

   4.5 dòng 33–73 phân biệt định nghĩa/bản chốt, CTE/schema/batch, quyền tạo/quyền đọc, đối tượng phải tồn tại và giới hạn bảo mật. Source guard chặn CREATE; script không có CREATE VIEW. HTML có 5 h2/5 câu ôn, đúng hint khái niệm, không copy payload, Result/Messages, placeholder hay route Bài tập. Không có lời mời thực thi view chưa được tạo. Đã kiểm tĩnh, chưa kiểm quyền hay trạng thái đối tượng live. Một chỗ hướng dẫn hoàn thành toàn khóa chưa theo kịp ngoại lệ này: F1 bên dưới.

4. Một nhóm trùng khác số hồ sơ; email NULL/rỗng/dấu cách, ngày bằng/NULL/trước và một hồ sơ nhiều cờ. Task3 kiểm golden/overrides, không sửa seed.

   4.6 dòng 40–56 dạy nhóm→CTE→kết lại, cờ email giữ cả 0, ba nhánh COUNT và đơn vị. Script khai báo SoCCCD NOT NULL; tính thuần xác nhận một nhóm gồm NV015/VH, NV038/KD; hai email thiếu NV044/VH, NV045/KD; một hợp đồng HD2025-003/NV029 có ngày đảo. Sáu phòng có số thiếu `0/0/1/0/0/1`; ba mã luật có `2/2/1`. Tự kiểm quy tắc thuần cho NULL/rỗng/dấu cách thường nhận thiếu, email có chữ không nhận; ngày NULL/bằng không khớp, trước mới khớp. Tests dòng 23–40 có overrides nhiều cờ và ba số 0; seed không đổi. Không suy tổng cờ thành số người riêng biệt.

5. Ví dụ giải nguyên bài tập hoặc reviewer thấy answer quá sớm. Task4 so kết quả minh họa×sáu đề, check:dist scan; Task1/3 dùng public JSON rồi khóa report trước YAML.

   Tự so 6 kết quả minh họa đầy đủ (kể cả bảng nguồn 20 dòng thay vì chỉ mười dòng trích) với 6 kết quả đề bằng số học thuần: 36 cặp, không cặp nào giống toàn bộ giá trị/vị trí/thứ tự; không dựa alias để coi là khác. Mảnh COUNT và hai mẫu view không phải câu giải trọn một đề. Tự scan 153 file web với cả sáu answer đã chuẩn hóa entity/whitespace/escape không thấy rò nguyên answer. Tôi xác nhận hai phase1 có hash đúng `a3285cd…` và `827317e…`, và final report bắt đầu bằng toàn bộ byte phase1; bảng tiền đề có trước append đối chiếu. Đây là bằng chứng artifact, không tự chứng minh được thời điểm/công cụ đã truy cập của các phiên learner. Tôi được phép đọc YAML trong lượt tích hợp; không tự nhận đây là một lượt learner mù answer mới.

## Issues

### Critical

Không phát hiện trong phạm vi đã kiểm.

### Important

Không phát hiện trong phạm vi đã kiểm.

### Minor

**F1 — Hướng dẫn toàn khóa chưa cập nhật điều kiện hoàn thành cho bài 4.5.**

- **Vị trí:** `src/pages/gioi-thieu.astro:33`; `README.md:174`. Đây là hai chỗ cũ bị ảnh hưởng bởi biến thể 4.5 mới, dù không đều nằm trong dòng diff.
- **Bằng chứng:** trang giới thiệu giới hạn ngoại lệ bằng “với các bài khái niệm 1.1–1.5”, còn README ghi “Bài có câu lệnh có bài tập, còn bài khái niệm 1.1–1.5 có câu tự kiểm tra”. Tôi thấy cùng câu giới thiệu trên HTML build. 4.5 hiện có hai khối SQL nhưng noExercises, không được chạy hai mẫu và chỉ cần trả lời câu ôn; lesson/footer đang hướng dẫn đúng.
- **Tác động:** người dựa hướng dẫn chung có thể nghĩ 4.5 còn thiếu bài tập hoặc phải tự viết/chạy SQL để được đánh dấu đã học. Lời giải tại bài 4.5 đủ rõ nên đây là mâu thuẫn hướng dẫn nhỏ, không phải lỗi runner hay chặn học.
- **Sửa:** cập nhật hai câu để dùng điều kiện “bài không có mục Bài tập”/`noExercises` và trả lời tự kiểm tra; bỏ khẳng định mọi bài có SQL đều có bài tập, hoặc ghi đủ ngoại lệ 4.5. Chỉ sửa copy hướng dẫn, không cần sửa component/schema/runner hay thêm test khóa câu chữ.

## Recommendations

Sửa F1 trong phần hướng dẫn liên quan 4.5 rồi chuyển tiếp đúng các branch xếp chồng. Giữ nguyên sáu đề/đáp án/seed và biến thể view đã duyệt. Đối chiếu lại HTML của câu đã sửa và chạy các kiểm local phù hợp theo quy ước; các kết quả tác giả cũ không tự xác nhận source sau sửa. Khi bàn giao, tiếp tục tách rõ kiểm source/HTML/số học, test của tác giả, SQL live và tương tác UI.

## **Declined to judge**

- SQL Server thực thi các ví dụ/answer, cú pháp PIVOT, metadata/decimal scale, collation, Unicode và kết quả runtime: không có phép chạy engine trong phạm vi; phép tính literal không thay được kiểm này.
- Database live hiện có đúng seed, view thực sự chưa tồn tại, hay quyền tạo/đọc/schema/nguồn thực tế: chỉ biết script và quyết định được giao; không kết nối hoặc suy hiện trạng live từ source.
- Mã truy cập, lỗi kết nối, runner/transaction/rollback/check:data và grader thật khi chạy/nộp: đọc hợp đồng nguồn, không gọi API/database/test; log tác giả dừng trước connection.
- Bấm Sao chép/dán vào editor, clipboard permission, F5/Ctrl+Enter, mở details/drawer và nút hoàn thành/lưu tiến độ: chỉ kiểm HTML/payload/source, không browser; chưa có bằng chứng tương tác.
- Viewport, tràn bảng, màu dấu ô, layout, accessibility/focus/keyboard và SSMS thật: markup/data đúng không chứng nhận hình ảnh hoặc hành vi người dùng.
- Tương thích nháp đã lưu sau triển khai: editor/progress không đổi trong range; không thử trạng thái trình duyệt cũ hoặc chạy migration ngoài phạm vi.
- Thời lượng 35/25/40 phút và khả năng mọi người mới tự học thành công: chỉ là ước lượng; không có buổi học quan sát/timing hay nghiên cứu người học.
- PIVOT động/UNPIVOT/indexed view/snapshot/cấp quyền DDL thật, dữ liệu ngoài luật và hiệu năng/tuning: đã chủ ý để ngoài bài; không đòi thêm công cụ hoặc DB mới để chấp nhận phạm vi đọc hiểu.
- PIVOT helper như parser/transpiler tổng quát, MONTH với NULL/ngày không phải ISO hoặc aggregator/cú pháp khác: helper chỉ dùng trong test cho nguồn hiện tại có TuNgay NOT NULL và tập mẫu hẹp; không khẳng định hỗ trợ ngoài đó.
- Tabs/NBSP/định dạng email/khả năng nhận thư, CCCD NULL và tính hợp lệ nghiệp vụ của ngày bằng/NULL: bài giới hạn dấu cách thông thường, SoCCCD NOT NULL và phép `<`; không mở luật kiểm dữ liệu ngoài yêu cầu.
- Bảo mật toàn hệ thống/pentest, lỗi có sẵn ngoài range và độ bao phủ đầy đủ của các kiểm cũ: đã đọc ranh giới có liên quan nhưng không audit lại toàn API/UI; không đổi hint nền thành lỗi mới của chuỗi bài.
- Comment nội bộ cũ của `noExercises` còn mô tả bài trước SELECT: không ảnh hưởng schema/hành vi tổng quát hiện có, không phải trở ngại người học; không yêu cầu thay schema vì comment này.
- Thứ tự truy cập answer thật trong các phiên reviewer trước: snapshot/hash/prefix nhất quán với quy trình, nhưng artifact không đủ chứng minh lịch sử mọi lần đọc; không gọi đó là kiểm forensic.
- Tái tạo build và chạy lại suite/typecheck/check:dist: bị loại khỏi quyền chạy của seat; tôi xác minh fingerprint/HTML và đọc log, không tự nhận kết quả chạy của tác giả.
- Push/merge/deploy, branch protection và readiness production: không thuộc đánh giá local; review này không cấp quyền thao tác ra ngoài.

## Assessment cho bàn giao local

Nội dung/đề và hợp đồng nguồn của chuỗi 4.4–4.6 bám thiết kế đã duyệt; số học độc lập, artifact HTML và chống rò answer nhất quán trong phạm vi kiểm. Không có Critical/Important; cần xử lý hoặc disposition rõ F1 theo quy ước 4.6 trước bàn giao. Có thể bàn giao phần soạn và kiểm local với các giới hạn đã nêu; SQL Server live, bộ chấm thật và UI tương tác vẫn chưa nghiệm thu. Kết luận không phải quyền push/merge/deploy.

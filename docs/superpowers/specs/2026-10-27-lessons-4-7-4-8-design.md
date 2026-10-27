# Bài4.7–4.8: đối soát ngày công và đọc thủ tục

Ngày27/10/2026. **Trạng thái: người dùng duyệt27/10/2026, đang triển khai theo plan.** Base main `75278be2e779e3f86d98397e468d626100157129`; branch4.7 `codex/lesson-4-7-full`, branch4.8 tạo từ commit hoàn tất4.7. Giữ từng bài trên branch riêng; không push/merge main/deploy trong lượt soạn.

## Ý định và mốc chất lượng

Người làm khóa học yêu cầu tiếp tục4.7/4.8 theo quy ước, áp dụng kết luận vừa đối chiếu phần2. Mốc cụ thể:2.1 nhìn cột Excel trước SELECT/AS;2.5 thấy ô trống trước NULL/lọc/nhãn;2.8 thấy ngày và phép trừ trước hàm. Mỗi khái niệm đứng cạnh dữ liệu hoặc thao tác minh họa, SQL và kết quả. Chỉ chọn hình/bảng/sơ đồ giúp hiểu; không đếm component để kết luận chất lượng.

Giữ template gộp Excel/SQL,2–4tiểu mục chính, lời giải tình huống cạnh kết quả, tự kiểm tra sau Memo/trước Bài tập nếu có. Không dồn tiền đề nhiều bài tập thành một đoạn giảng dài. Giới hạn cần thiết viết một lần đúng chỗ; không lặp lời cảnh báo môi trường/quyền trong cả phần chính.

## Approaches và quyết định đề xuất

1. **Đề xuất:** dùng công cụ khóa học hiện có.4.7 là bài truy vấn với ba đề chấm;4.8 đọc thủ tục mẫu kèm SELECT độc lập để kiểm từng bước và năm câu tự kiểm tra, không YAML. Phù hợp mục tiêu đọc hiểu, vẫn có dữ liệu nhìn thấy/chạy được bằng SELECT trên web.
2. Tạo stored procedure thật/mở EXEC trong runner cần đổi guard, quyền hoặc database chung. Không phù hợp phạm vi hai bài; không chọn.
3. Chỉ viết khái niệm/điều kiện bằng văn bản sẽ bỏ mất cách lần ra con số. Không chọn vì trái điều chỉnh người dùng vừa yêu cầu.

Người dùng đã duyệt cách1 ngày27/10/2026. MDX/YAML/schema/component/runner hiện có được giữ. Các lựa chọn triển khai nhỏ về alias, dòng trích và vị trí đánh dấu giao người viết tự chốt, có kiểm source/render.

## 4.7 — Đối soát chấm công và bảng lương

Dự kiến40–45phút gồm ba đề. Giữ tiền đề4.1/4.6, bổ sung3.8 và2.8 cho phép tập hợp/lịch ngày.

**Mục tiêu:** đặt hai nguồn về cùng kỳ/cách tính và một dòng mỗi MaNV, dùng FULL OUTER JOIN giữ được cả phía thiếu, đọc EXCEPT đúng chiều để tìm phần khác; không gọi mọi chênh lệch thô là lỗi.

- Tình huống chị Hạnh cần rà số **ngày công** kỳ2026-09. Chỉ dùng các cột mã/kỳ/ngày công, không giảng số tiền hoặc công thức thu nhập.
- Bắt đầu bằng Excel/bảng đối chiếu thu gọn NV013 và NV043: số ngày chấm công, phép năm được tính trong tháng, tổng đối chiếu, ngày công trên bảng lương. Đánh dấu đúng ô lệch và ô khớp sau bổ sung phép.
- Chốt quy ước bộ mẫu: một dòng ChamCong tính một ngày theo mô hình của bài, chưa chứng nhận đi đủ giờ; ngày công đối chiếu = số dòng chấm công + số ngày phép năm đã duyệt rơi vào **ngày làm việc trong tháng**. Không cộng SoNgay theo TuNgay như bài4.1–4.4.
- Đặt ví dụ DP018 cạnh bảng lịch31/08–04/09:31/08 thuộc tháng8;01/09,02/09 là ngày nghỉ trong lịch công ty mẫu; chỉ03/09,04/09 đóng góp hai ngày phép tháng9. Giữ dữ liệu gốc, không chia SoNgay theo tỷ lệ hoặc coi mọi ngày lịch là ngày công.
- Cung cấp lịch20ngày làm tháng9 đã chốt, dùng CTE gồm danh sách ngày tường minh. Giải nghĩa nguồn VALUES ngắn tại chỗ; không dùng ngày có người chấm công để suy ra lịch công ty, không đưa recursive CTE hoặc bài sinh lịch vào đây.
- Tách ba nguồn kiểm được: chấm công theo MaNV, phép năm theo MaNV sau kết với lịch/ngày nằm trong đơn, bảng lương đã lọc đúng kỳ. Gộp chấm công và phép theo mã bằng kỹ thuật đã học để tạo nguồn đối chiếu, một dòng mỗi mã. Kiểm đơn vị và khóa trước khi so với bảng lương.
- Giảng FULL OUTER JOIN từ hai bảng trích minh họa có một mã chung/mã chỉ ở từng bên; ghi rõ nếu cố ý bỏ dòng để minh họa thì không phải source đang thiếu. Dựa khóa MaNV không NULL để nhận diện bên vắng. Không thay NULL thành0 trước khi phân biệt vắng nguồn với nguồn có số0; chỉ coalesce phần phép vắng thành0 theo quy ước không có ngày phép phù hợp.
- Câu chính so hai nguồn đã tổng hợp, trả MaNV/NgayChamCong/NgayPhepNam/CongDoiChieu/CongBangLuong/ChenhLech cho dòng lệch hoặc vắng bên. ChênhLech = bên bảng lương trừ bên đối chiếu, không gán chênh lệch số cho mã thiếu nguồn. Cùng đủ nguồn mới kết luận số công chênh.
- EXCEPT minh họa ngắn trên bảng trích: trái trừ phải, đảo chiều để tìm phía còn lại; so cả dòng theo vị trí, bỏ trùng, không kết bảng để đặt hai số cạnh nhau. Ví dụ/bài tập cần nói rõ dùng mã hay cặp mã–số; hai NULL được coi giống khi xét dòng DISTINCT của EXCEPT, khác phép so sánh thông thường. Không mở INTERSECT/EXCEPT ALL/tuning.
- Chọn2–4nhịp: thấy bảng lệch → làm rõ lịch/phép và nguồn → kết/so hai bên → câu lệnh và lời trả lời. Chỉ thêm RunFlow nếu kiểm từng trạng thái giúp hiểu phép kết; có thể dùng bảng nguồn/kết quả được đánh dấu để tránh giảng trùng.

**Ba đề query đề xuất**, mọi trạng thái, kỳ2026-09, cùng lịch/quy ước của bài:

1. Trả toàn bộ các mã có ở ít nhất một nguồn cùng sáu cột đối chiếu, gồm cả dòng khớp; sắp MaNV. Minh họa chính chỉ trả dòng cần rà nên không nộp nguyên được.
2. Luyện EXCEPT: trả cặp MaNV/ngày công có trên bảng lương nhưng không có trong nguồn đối chiếu đã chuẩn hóa, sắp MaNV.
3. Đảo EXCEPT: trả cặp MaNV/ngày công có ở nguồn đối chiếu chuẩn hóa nhưng không có trên bảng lương, sắp MaNV. Phân biệt giá trị được trả từ phía nào.

Bộ chấm hiện so kết quả/vị trí/thứ tự, không buộc cú pháp hoặc alias; nêu rõ kỹ thuật luyện và người học tự đối chiếu tiêu đề. Không thêm SQL ví dụ giống nguyên đáp án về giá trị/vị trí/thứ tự.

## 4.8 — Đọc hiểu stored procedure

Dự kiến20–25phút gồm tự kiểm tra. Giữ4.1, bổ sung4.5/4.7 để dùng nghĩa schema và tình huống18+2ngày đã học.

**Mục tiêu:** nhận diện tham số/nguồn/điều kiện/cách tính/kết quả của một thủ tục và tự kiểm một con số. **Đã duyệt kind full/noExercises:true**, thay YAML bằng năm câu tự kiểm tra; có các câu SELECT độc lập kiểm được trên web.

- Chị Hạnh hỏi vì sao một báo cáo lấy từ thủ tục cho18ngày ở NV043 trong tháng9, trong khi cột ngày công trên bảng lương là20. Dùng chính hai ngày phép đã minh họa ở4.7 để khép tình huống, không viết lại cả bài đối soát.
- Dùng phiếu đầu vào/bảng minh họa MaNV=NV043, TuNgay=01/09/2026, DenNgay=01/10/2026 (đầu cuối không lấy) rồi nối sang ba tham số @MaNV/@TuNgay/@DenNgay, kiểu varchar/date đã học. Giải nghĩa macro bằng nhóm thao tác nhận đầu vào tại chỗ, không yêu cầu biết VBA.
- Mẫu dbo.usp_XemCong chỉ có ba tham số trên và một SELECT: đọc ChamCong, lọc mã/khoảng ngày, GROUP BY MaNV, COUNT(*) thành SoNgayChamCong. CREATE PROCEDURE/AS/BEGIN/END/EXEC giải nghĩa ngay cạnh mẫu; không bảng tạm/SQL động/OUTPUT/RETURN/điều khiển rẽ nhánh.
- Mẫu định nghĩa và lời gọi EXEC chỉ đọc, copy=false. Một ghi chú trước hai mẫu nói rõ source khóa học không cung cấp thủ tục này để gọi, web chặn CREATE/EXEC. Không dựng Result/Messages thành công cho lời gọi chưa chạy.
- Lần theo đầu vào bằng SELECT độc lập thay tham số bằng hằng: xem các dòng mã/ngày đã lọc rồi COUNT theo mã. Đặt Result và lời giải cạnh từng câu; đánh dấu con số18 và bước nào chưa tính phép. Không dán một đoạn còn @thamso vào web, không cần tạo thủ tục để chạy các câu kiểm.
- Nêu ngắn cách đọc định nghĩa có sẵn trong SSMS: Programmability→Stored Procedures→Script Stored Procedure as→CREATE To→New Query Editor, cần quyền xem phù hợp; chỉ xem script, không F5 để tạo/sửa. Không dạy Modify/ALTER, cấp quyền hoặc quản trị.
- Chốt một lần: tên thủ tục không bảo đảm chỉ đọc; xem toàn bộ thân/gọi tiếp trước khi chạy thủ tục lạ. Bài không yêu cầu EXEC trên database chung. Các chi tiết sâu/triển khai để phần quyền và các bài sau, không biến thành bài cảnh báo.
- Năm câu ôn: xác định đầu vào/biên ngày; chỉ nguồn và điều kiện; vì sao COUNT ra18 và chưa gồm phép; cách tự kiểm SELECT bằng giá trị cụ thể; đọc thủ tục khác ở đâu và điều kiện trước khi chạy. Mọi đáp án đã có trước Memo; không dùng ôn để dạy bù.

## Dữ liệu, kiểm và review

Tính Python thuần từ literal và công thức sinh seed (không SQL Server) cho806dòng chấm công/43mã và43dòng bảng lương tháng9. So thô chênh sáu mã; sau thêm phép đúng lịch chỉ còn NV013:17+2=19 so20, NV032:18+0=18 so19. NV043:18+2=20 khớp; EXCEPT hai chiều trả các giá trị khác nhau19/18 và20/19 theo phía lấy. Các con số là căn cứ source để lên thiết kế, chưa chứng nhận live.

Khi soạn: kiểm SQL/Result/nhánh/ô đánh dấu bằng source fixture và phép tính độc lập, lịch/vắt tháng/thiếu bên/số0/nhân dòng/EXCEPT chiều và duplicate.4.8 kiểm SELECT thật bên trong, không viết test khóa câu chữ hoặc giả EXEC passed. Chạy suite/check/build/dist/API theo phạm vi; kiểm copy/tab/nháy và đường học. SQLenv hiện thiếu, không có tool SQL trực tiếp; thiếu live/UI phải ghi pending theo thực tế, không sửa DB/guard để ép kiểm.

Mỗi bài có learner reviewer mới/model kế thừa theo AGENTS, không dùng model override của skill generic;4.7 khóa cách làm từ đề công khai trước cấp YAML,4.8 rà mục tiêu→nơi giảng→câu ôn. Sau hai bài có fresh integration review; đọc đủ và disposition mọi mục, giữ report gốc. Author native theo mạch đã thống nhất; không tạo author agents. Sau duyệt thiết kế lập plan rồi đi tiếp trong phiên, không hỏi lại phương thức thực thi. Các bài4.4–4.6 chỉ là bài học rút ra để viết tiếp, không tự sửa ngoài phạm vi hai bài mới.

## Nguồn và tệp bị ảnh hưởng

MDX4.7/4.8; YAML4.7; EXPECTED/README/hồ sơ công ty/chú thích noExercises nếu cần; spec/plan/reports; test và helper fixture khi cần. Không đổi seed, schema, component/UI, API, guard hoặc luật chấm. Căn cứ đọc lại: quyước/template/1.1/2.1/2.5/2.8/4.1/4.6; bổ sung3.4/3.5/3.8 và khối lịch/công của script. Người viết chốt alias/cắt bảng trích trong phạm vi này, không đổi luật ngày hay mở đối tượng DB.

- [Microsoft EXCEPT/INTERSECT](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-except-and-intersect-transact-sql)
- [Microsoft Execute a stored procedure](https://learn.microsoft.com/en-us/sql/relational-databases/stored-procedures/execute-a-stored-procedure)
- [Microsoft View definition](https://learn.microsoft.com/en-us/sql/relational-databases/stored-procedures/view-the-definition-of-a-stored-procedure)

## Kiểm thiết kế trước duyệt

Builder check ngữ cảnh mới/model kế thừa ngày27/10/2026 trả “nothing important left”; không sửa source/test/DB. Baseline main qua322test/48file (logtemp/verification), không dùng kết quả đó thay kiểm các bài sắp viết. Người dùng đã duyệt noExercises4.8; tiếp tục plan/triển khai/review, không hỏi lại phương thức.

## Tiến độ thực hiện

4.7đãsoạn với Excel/lịch/nguồn/SQLkếtquả. Learnerfresh hai giaiđoạn không nêu findingcần sửa; đã đọc đủ/disposition mọi giới hạn.328tests/49files,API81,build135/dist2026; không claimSQLlive/UI đã kiểm.

# Kiểm nguồn và build — bài 4.4–4.6

Ngày26/10/2026. Base `106701b7a53c3ad738987f4076418822792d7a44` (4.3 đã push); ba branch local xếp kế tiếp, không merge main/push/deploy. Các kết quả dưới là kiểm của tác giả, không gán cho learner reviewer.

| Mức kiểm | Bằng chứng / kết quả | Giới hạn |
|---|---|---|
| Baseline |315test/46file trước soạn | Không dùng baseline thay kiểm phần mới. |
| TDD4.4 |3test RED vì thiếu helper/Result/YAML →3GREEN; suite318/47; sau sửa prose64/64 content checks | PIVOT adapter test-only chỉ biến mẫu một CTE SUM/COUNT thành mô hình CASE; không parse/compile T-SQL. |
| TDD4.5 |Existing catalog test1fail/60pass vì summary chưa đổi →61pass; suite318/47; sau sửa câu3,61pass | Không thêm prose snapshots, không thực thi CREATE VIEW. |
| TDD4.6 |4test RED thiếu Result/YAML →4GREEN; suite322/48 | Overrides chỉ ở fixture RAM; không sửa seed/DB. |
| Type check4.6 |Astro phát hiện1error ở test do spread Record làm mất MaHD trong kiểu suy luận, thêm2hints dead-return; sửa annotation SeedRow và bỏ return sau expect.fail →0error/0warning/3hints nền | Không nới cấu hình hoặc bỏ assertion. |
| Node22 |322/322test,48files trên22.23.4 và24.22.1; sau sửa type/copy và merge feature cũng chạy lại cả hai runtime | Major CI22; cảnh báo môi trường EnvHttpProxyAgent/SQLite experimental và npm http-proxy vẫn ghi trong log. |
| Build web |132pages; check:dist1994links PASS | Scan build không chứng minh giao diện tương tác hoặc bộ chấm thật. |
| HTML/source |9khối SQL,6payload copy trùng source đã giải mã;4.4=4/3,4.5=2/0,4.6=3/3; nháy thẳng/tab thật; heading và vị trí self-check đúng | Không thao tác copy/paste, bàn phím, viewport, details/drawer hoặc SSMS. |
| 4.5 concept |5h2/5self-checks; không route Bài tập, YAML, Result/Messages hoặc copy cho hai mẫu | View chưa được tạo bởi công việc này; hiện trạng/quyền live chưa kiểm. |
| API |Build78exercises, typecheck PASS; thêm6query ở4.4/4.6, không thêm4.5 | Chỉ build/typecheck, không là kết quả chạy SQL. |
| SQL live |check:exercises và check:data exit1: thiếu SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD trước connection | Chưa kiểm cú pháp/kết quả/typing/collation PIVOT trên SQL Server, SQLgrader, quyền hoặc trạng thái DB thật. Không có thao tác DB. |
| UI |Chưa mở browser trong lượt4.4–4.6 | Lượt trước thiếu Chromium và tải shell không hợp lệ; không lặp phép cài không đổi hoặc gọi HTML là UI pass. |

## Đối chiếu dữ liệu độc lập với adapter

`temp/verification/2026-10-26-4-4-4-6/source-audit.mjs` dùng JS thuần đọc INSERT literal của source (`20`đơn,`48`hồ sơ,`55`hợp đồng), không gọi fixtureQuery/PIVOT adapter/SQL/DB. Kết quả khớp các golden trong test:

- 4.4 mọi trạng thái: tháng8=`12/2/NULL`, tháng9=`12/5/3`, tháng10=`10/NULL/1`; CASE cùng ô thiếu. Approved chỉ tháng8/9=`12/2/NULL`, `9/5/2`.
- Đếm loại/trạng thái: Nghỉ ốm=`4/0/0`, Phép năm=`8/3/1`, Việc riêng=`2/1/1`. Hai cột tháng8/9 theo loại: `2/5`, `12/12`, `NULL/3`.
- 4.6 một nhóm CCCD có2hồ sơ NV015/VH,NV038/KD; email thiếu NV044/VH,NV045/KD; hợp đồng HD2025-003/NV029 có2025-02-28 trước2025-03-01. Đếm email theo BGD/IT/KD/KT/NS/VH=`0/0/1/0/0/1`; mã luật CCCD_TRUNG/EMAIL_THIEU/NGAY_HD=`2/2/1`.

Test4.6 còn kiểm NULL/rỗng/dấu cách so với email có chữ; ngày kết thúc NULL/bằng/trước; nhiều cờ cùng hồ sơ; ba COUNT vẫn có ba dòng0 khi không luật nào khớp. Ví dụ minh họa không là lời giải nộp nguyên cho đề, so giá trị không dựa alias. `check:dist` không thấy answer SQL rò vào build. Mô hình số học, so seed hoặc tài liệu Microsoft không thay cho SQL Server live.

Nguồn kỹ thuật Microsoft Learn PIVOT/CREATE VIEW đọc lại ngày26/10/2026; link trong spec. API/guard/schema/component/seed không đổi; chỉ copy hướng dẫn hoàn thành trang giới thiệu/README được sửa để bao phủ4.5. Helper MONTH/PIVOT chỉ dùng trong test. Ghi chép kiểm và ledger riêng cho plan ở temp/verification/2026-10-26-4-4-4-6; các giới hạn live/UI được giữ khi bàn giao.

## Sau review tích hợp

Reviewer mới tự tính các giá trị và36cặp minh họa×đề, scan153HTML/JS/JSON, đọc66ô Result, hash/prefix snapshot,9SQL/6copy; không chạy tests/SQL/UI. Một MinorF1 hướng dẫn hoàn thành đã sửa branch4.5(a4b4bc5) và chuyển sang4.6(9bab24a). Kiểm4.5saucopy318/318,Astro0/0/3,build129/dist1961 và HTMLquy tắc mới. Bản nguồn4.6 cuối chạy kiểm lại sau merge, ghi logfinalmerged và manifest cuối; dữ liệu/answer/testhelper không đổi trong lượt copy. Giữ report/15DJ riêng, không yêu cầu re-review prose.

Final sau merge9bab24a: native322/322,48files; Astro0error/0warning/3hints; build132/dist1994; HTML9SQL6copy và quy tắc hoàn thành giới thiệu mới khớp source. Node22final322/322 cũng đạt, ghi log riêng sau cùng. Từ đó chỉ bổ sung Markdown hồ sơ, không sửa source/test/answer.

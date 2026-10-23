# Bàn giao mốc tab SQL toàn màn học

Ngày 23/10/2026. Nhánh `codex/sql-indentation` từ main `921730e`. Yêu cầu người làm khóa học: SQL có mốc tab rõ như ảnh tham chiếu, áp dụng mọi màn và cập nhật quy ước.

## Đã thay đổi

- Rà 111 khối Sql.code/RunFlow.query/steps[].sql trên 17 bài, chỉnh 42 chuỗi có phần tiếp dòng ở tám bài. Main clause thẳng cột, cột/điều kiện tiếp dòng lùi một cấp, CASE/END một cấp và WHEN/ELSE hai cấp. Câu ngắn giữ một dòng; không đổi token/literal/comment hoặc dữ liệu/kết quả.
- MDX ghi escape tab để compiler không xóa thụt lề. Focus nhiều dòng khớp query; nút Sao chép lấy đúng chuỗi đang thấy. Token `--sql-tab-size: 4` dùng chung cho Sql, query highlight, LineMap/Memo và cả hai lớp editor. Không tự định dạng lại draft.
- Cập nhật quy ước mục 2.4, mẫu MDX chép được ở lesson-template và DESIGN.md. Các test đọc đúng literal có escape trước khi so; kiểm số liệu/điều kiện cũ còn nguyên. Không đổi YAML bài tập, API/grader, schema, database hay khung bài.

## Review và bằng chứng

[Report độc lập đầy đủ](review-formatting.md): agent mới kế thừa model Codex của phiên, không override; đã đọc hết, không có finding cần sửa. Reviewer kiểm source/build và tự chạy kiểm cục bộ; người thực hiện kiểm browser/DB riêng. Đây là review định dạng toàn hệ thống, không thay review học thử nội dung đã duyệt của từng bài.

- **269/269 test, 38 file**; Astro check 0 errors/0 warnings, ba hint deprecation nền. Build **99 trang**, check:dist **1.651 link**; API build **45 bài tập**, typecheck đạt.
- Lượt đầu có hai test thất bại vì còn so chuỗi capture có escape với literal đã giải mã (2.3 và 2.8); đã sửa cách đọc literal, giữ assertion nghiệp vụ. Component test mới lúc đầu chưa giải mã entity HTML ở text, đã sửa đọc đúng entity; không phải lỗi SQL/render.
- Script đối chiếu trước/sau dùng lexer SQL: đủ **111/111** khối, **42** thay whitespace, **0** thay token. Không dùng việc bỏ hết khoảng trắng trong string/comment để so. Một CASE ngắn thêm dòng, không đổi token; câu báo lỗi và dữ liệu Result/Messages không đổi.
- Browser bản build trên **17 bài**: **97/97 Sql** đúng chuỗi nguồn đã giải mã; **92** nút copy giữ nguyên text, năm đoạn chỉ đọc vẫn không có nút. **55/55 query highlight** dựng lại cùng token với query nguồn, giữ đúng tab; LineMap/Memo và các khung đều computed tab-size 4, không tràn trang.
- Xem SELECT tổng hợp và CASE ở **1280px/1440px**; code dài cuộn trong khối. Drawer CASE mở bằng Enter/đóng Escape, giữ hai cấp. Nút Sao chép báo Đã chép; đọc clipboard đúng chuỗi và tab thật; **Ctrl+V** vào editor giữ nguyên, lớp highlight khớp input và cùng tab-size 4. Tab chèn bốn dấu cách, Ctrl+Z hoàn tác; đã trả draft về đúng nội dung ban đầu. Không nộp/chạy bài từ browser.
- **45/45 đáp án** chạy thành công trên SQL Server qua runner luôn hoàn tác; `check:data` sau đó báo **Không bảng nào lệch**. Đây là kiểm API theo quy trình; không thực thi toàn bộ ví dụ đọc/ghi trong bài lên database dùng chung.

Evidence local: `temp/verification/2026-10-23-sql-indentation/` gồm before/expected/browser-all-surfaces, verify-source, log test/build/API, ảnh SELECT/CASE/drawer/editor và JSON copy/paste. Không commit secret hoặc cấu hình DB.

## Giới hạn và quyết định giữ

Audit Frontend Design Premium strict trả **exit 1**, hai finding nền: form mã truy cập thiếu noValidate; scanner không thấy resize:none trong JSX dù CSS đã có và browser xác nhận computed none. Giữ nguyên form/logic editor, ghi đúng kết quả audit thay vì gọi toàn bộ UI audit đạt. Report độc lập mô tả file/dòng cụ thể. Công cụ lint DESIGN.md chuyên dụng không có trong runtime/plugin; giữ nguyên frontmatter và token cũ, chỉ bổ sung quy tắc và mapping đã kiểm computed style.

Không thay luồng mạng/đăng nhập/chạy SQL, không làm audit mobile/200% hoặc mọi trạng thái sản phẩm. Không định dạng lại database script hay đáp án API vì chúng không phải nơi hiển thị SQL và token đang giữ nguyên. Các quy ước cũ về nội dung/review/an toàn dữ liệu vẫn áp dụng.

## Git và xuất bản

Nhánh review push tại `d6fd028`; main trước nhập vẫn `921730e`. Merge `8f3de6418097c4062215817b3424badabcee74d3` không xung đột, 269 test đạt trên cây đã nhập; push và kiểm SHA remote trùng. [Workflow web của đúng SHA](https://github.com/nhatlam1111/microsoft-sql-lession/actions/runs/39988144178) đã success; không có workflow API mới vì source/YAML API không thay đổi.

Browser đã mở [bài 3.1 công khai](https://nhatlam1111.github.io/microsoft-sql-lession/bai/3-1-count-sum-avg/#câu-lệnh-cho-tình-huống): câu chính chứa tab thật trước SUM/CAST/MIN/AND, computed tab-size 4 ở Sql và query highlight, không tràn trang. Lưu `published-sql-indentation.png` và `published-evidence.json` trong evidence local. Commit hồ sơ sau đó chỉ ghi kết quả này, không đổi sản phẩm so với bản đã triển khai.

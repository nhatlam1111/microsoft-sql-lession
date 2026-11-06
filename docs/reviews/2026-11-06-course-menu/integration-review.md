# Review tích hợp sắp menu — 06/11/2026

## Phạm vi và bằng chứng

Gói được giao: base `e53eb6f` cùng working tree tracked/untracked, trừ `premium-audit.json`; bản build được giao tại `http://127.0.0.1:4437/microsoft-sql-lession/`. Tự đối chiếu SHA-256 `dist/index.html`: `A3679939E5DE06115B55D3FDDE48AACFE1A33F6FCFFC6767BBA0637AED2BA0F7`, khớp gói; hash một file không chứng minh toàn bộ dist khớp nguồn. Đọc source, diff, danh mục, chuyển hướng, tiến độ, đề và các bài liên quan; không điều khiển browser, chạy SQL/API/runner hay nộp bài. Reviewer được giao cấu hình Codex `gpt-6.1-terra`/`high`, ngữ cảnh mới; không có công cụ riêng xác nhận model thực tế. Số 590 test, 243 trang/4069 links và 82 bài tập là evidence tác giả báo, không phải tôi chạy lại.

## Nhận xét cần xử lý

1. **Cần sửa — trạng thái bài tập cũ có thể hiện sai khi lần đầu mở thẳng bài sau nâng cấp.** `src/components/lesson/Exercises.astro:35–45` đọc duy nhất khóa v3 và tô một lần, rồi chỉ tô lại khi `pageshow`; `src/lib/progress-store.ts:45–57` chuyển v1/v2 và lưu v3 trong `useEffect` của island. Nếu script tô chạy trước effect, danh sách hiện “Chưa làm” dù bài đã đúng; sau khi effect lưu v3 không có tín hiệu yêu cầu tô lại. Điều này phụ thuộc thứ tự thực thi thực tế, chưa thử browser. Đề xuất dùng cùng progress store đã migrate và subscribe, hoặc bảo đảm tô sau khi migrate; kiểm mở trực tiếp một bài với storage chỉ có v1/v2, không cần chạy SQL.

2. **Cần làm rõ — đề 5.6.1 thiếu tiền đề cú pháp cập nhật theo bảng khác.** `src/content/exercises/5-6-update-quen-where.yaml:4–8` yêu cầu sửa lương theo phòng nằm ở bảng nhân viên; bài 4.3 chỉ nêu `UPDATE … SET … WHERE`, bài 3.4–3.6 dạy JOIN trong SELECT, còn 5.6 không giải thích cách dùng nguồn bảng khác trong UPDATE. Người mới không suy ra được cấu trúc câu cần thiết chỉ từ phần học. Đây là nội dung bài tập chuyển nguyên trạng, không kết luận lỗi do đổi số. Đề xuất khi biên soạn bài 4.3 hoặc 5.6 dạy ngắn cách gắn nguồn và điều kiện kết trong UPDATE, có ví dụ đọc được trước bài tập.

3. **Cần làm rõ — bài đối soát tóm tắt chưa cho người học tự thực hiện mục tiêu.** `src/content/lessons/3-18-doi-soat-cham-cong-luong.mdx:13–25` nêu tổng hợp và FULL OUTER JOIN/EXCEPT nhưng không có câu hay kết quả để hiểu cách đối chiếu, lại lấy VLOOKUP hai chiều làm liên hệ dù chỉ giả định Excel cơ bản. Bài là bản tóm tắt nguyên trạng từ 4.7, không phải hồi quy đổi menu; cần ghi vào phạm vi biên soạn sau, không coi là bài hoàn chỉnh. Theo hồ sơ công ty, ngày công bảng lương còn cộng phép năm đã duyệt, nên diễn đạt so trực tiếp với số ngày chấm công cần xác định luật đối soát trước khi kết luận lệch.

## Mạch và tiền đề từng đề chuyển vị trí

Đọc đề và xác định cách làm từ bài học trước, sau đó đối chiếu cấu trúc answer; đây là rà tiền đề chứ không chạy hay chứng nhận kết quả. Số trong ngoặc là bài cung cấp kiến thức chính.

| Đề | Tiền đề và đánh giá |
|---|---|
| 3.13.1 | Lọc ngày, tổng nhóm, thứ tự (2.2–2.4, 3.1–3.2), CTE lọc ngoài (3.13): có. |
| 3.13.2 | Lọc trạng thái, đếm nhóm, CTE (2.2, 3.2, 3.13): có. |
| 3.13.3 | Đếm nhóm, lọc tổng trong CTE (3.2, 3.13): có. |
| 3.14.1 | ROW_NUMBER theo loại và thứ tự (3.14), lọc/sắp (2.2, 2.4): có. |
| 3.14.2 | RANK, DENSE_RANK và đồng hạng (3.14): có. |
| 3.14.3 | Đánh số theo nhóm rồi lọc ngoài (3.13–3.14): có. |
| 3.15.1 | EOMONTH, tổng theo tháng, khung lũy kế (2.8, 3.1–3.2, 3.15): có. |
| 3.15.2 | Chia nhóm cửa sổ, cộng theo loại/tháng (3.14–3.15): có. |
| 3.15.3 | Hai CTE, LAG, lọc sau cửa sổ (3.13, 3.15): có. |
| 3.16.1 | CTE, EOMONTH, PIVOT SUM và ô thiếu (3.13, 3.15–3.16): có. |
| 3.16.2 | PIVOT COUNT, nhóm theo loại (3.16): có. |
| 3.16.3 | MONTH (2.8), CTE và PIVOT (3.13, 3.16): có. |
| 3.17.1 | GROUP BY/HAVING, CTE, INNER JOIN (3.2–3.4, 3.13, 3.17): có. |
| 3.17.2 | NULL, TRIM, CASE/SUM nhóm (2.5, 2.7, 2.9, 3.12, 3.17): có. |
| 3.17.3 | CTE, JOIN, TRIM, UNION ALL, COUNT (3.4, 3.8, 3.13, 3.17): có. |
| 5.6.1 | UPDATE/WHERE (4.3, 5.6), JOIN trong SELECT (3.4); cú pháp UPDATE theo bảng khác chưa được dạy đủ: xem nhận xét 2. |
| 5.6.2 | DELETE và điều kiện WHERE (4.3, 2.2): có khuôn tối thiểu; 4.3 là bài tóm tắt, không có ví dụ thực hành hoàn chỉnh. |

Chuỗi CTE 3.13 → xếp hạng 3.14 → lũy kế 3.15 → PIVOT 3.16 → chất lượng 3.17 có các tiền đề chính theo thứ tự; 3.18 là tóm tắt như trên. Rà các tham chiếu số hiển thị trong source tìm được bằng `rg` thấy các tham chiếu CTE, view, quyền, transaction, index và cấp cứu đã chuyển về chủ đề phù hợp. Hai đề cương 3.19/4.10 không được đánh giá như bài đã viết. Các bài 4 và 5 phần lớn là summary nên việc đủ tiền đề sâu còn phụ thuộc lượt viết tiếp.

## Công cụ và phần chưa xác minh

`lesson-moves.mjs` ánh xạ bài chuyển và giữ mã bài tập cũ; `progress.ts` chuyển số bài v1 qua lớp v2 rồi qua mapping mới, loại hai mục cũ 4.9/4.10; ID bài tập và nháp được giữ qua mã cũ. `lesson-redirects.mjs` tạo redirect bài và từng URL bài tập tương ứng; hai bài gỡ không có redirect trong mapping. Đây là nhận xét đọc mã, chưa kiểm mọi tổ hợp storage/import, chuyển hướng HTTP, tính đồng bộ tab hoặc nháp thật. Sidebar/lộ trình/tìm kiếm dùng danh mục chung theo source; chưa thao tác giao diện, kiểm thứ tự hiển thị, responsive hoặc tìm kiếm thực tế. Không chứng nhận số liệu, an toàn thực thi SQL, copy/paste hay đáp án chấm đúng. Không đọc seed, bí mật, review cũ hoặc tài liệu SQL ngoài khóa học.

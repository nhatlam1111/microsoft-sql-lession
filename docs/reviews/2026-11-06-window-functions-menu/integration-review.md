# Review tích hợp menu hàm cửa sổ — 06/11/2026

## Phạm vi và cách kiểm

- Review độc lập theo gói giao: base `e53eb6f`, working tree hiện tại gồm các lượt trước chưa commit; bỏ qua `premium-audit.json`. Quyết định: spec và plan `2026-11-06-window-functions-menu`. Đọc AGENTS, quy ước §4.5–4.6, template, hồ sơ, mẫu 1.1/2.1; rà mạch 3.12–3.19, source đề, code danh mục/tìm kiếm/chuyển hướng/lưu tiến độ/nháp và HTML build. Không dùng báo cáo review cũ.
- Công cụ: đọc source/HTML bằng PowerShell, `rg`, Node; agent được giao cấu hình `gpt-6.1-terra`/`high`, công cụ không cung cấp xác nhận độc lập model thực tế. Không dùng browser; không đọc seed/secret, không chạy SQL, API, runner hoặc nộp bài; không sửa sản phẩm/test/Git. Đây là review tích hợp, không thay kiểm từng dòng mọi drawer của từng bài.
- Tự đối chiếu SHA-256 `dist/index.html` đúng `A7F275D1E871CCA26205634247E4AB6B9FE6C08C8E92AA12A7CDE6A2CAA8D186`; bảy HTML bài 3.13–3.19 tồn tại. Node đọc 82 tuyến redirect trong source: cả 82 file HTML tương ứng tồn tại và chứa đích khai báo. Kiểm này chưa chứng minh browser chuyển trang, canonical, tương tác hay toàn bộ liên kết.
- Bằng chứng **tác giả báo**, không phải tự chạy lại: 596 test; check:dist 280 trang/4141 link; API build 82 đề. Không kết luận SQL, số liệu, live UI hay API đúng từ các báo cáo đó.

## Findings và mạch bài

1. **Cần làm rõ — lỗi có sẵn, không phải hồi quy do đổi menu**: `src/content/lessons/3-13-xep-hang-row-number-rank.mdx:36–56` nói “Câu ngoài mới dùng `WHERE SoThuTu = 1`”, sau đó lại nói “chỉ câu ngoài lọc `SoThuTu = 1` mới giữ hợp đồng `HD2024-005`”, nhưng câu ngay trước bảng chỉ lọc `MaNV = 'NV021'` và bảng còn cả ba dòng. Người mới có thể tưởng câu vừa chạy đã lọc số thứ tự hoặc không hiểu vì sao ba dòng vẫn hiện. Nói rõ đây là bước kiểm ba dòng, còn câu ngoài của câu chính bên dưới mới lọc số thứ tự. Câu tương tự đã có ở `e53eb6f:src/content/lessons/4-2-xep-hang-row-number-rank.mdx`.

2. **Giữ được — 3.12 → 3.13 → 3.16**: 3.12 giải thích nhiều CTE và lọc kết quả; 3.13 giải thích cửa sổ giữ dòng, chia nhóm, đồng hạng và lọc ngoài; 3.16 tự giải thích `SUM OVER`, `ROWS`, `LAG`, phân nhóm và lọc sau tính. Dù 3.14/3.15 mới là đề cương, không cần giả đã học nội dung đầy đủ để làm các đề 3.16. `NTILE`, `RANGE`, trung bình trượt được ghi là sẽ bổ sung.
3. **Giữ được — 3.14, 3.15, 3.17**: nội dung ghi rõ đề cương, nêu các hàm/phạm vi dự kiến; không khẳng định đã dạy chi tiết. 3.14 dẫn ví dụ LAG đã giải thích tại 3.16.
4. **Giữ được — 3.18 → 3.19**: 3.18 nêu ba vai trò pivot, phạm vi và sự khác nhau giữa thiếu với 0; 3.19 tách nhóm CCCD khỏi hồ sơ, luật email, hợp đồng và đơn vị đếm; tình huống thực tế có nguồn được ghi sẽ bổ sung. Các tham chiếu nội dung đã rà tại 2.6, 3.6, 3.9, 3.11, 3.12–3.19 và 4.2 trỏ số phù hợp với menu mới.

## Tiền đề từng đề — đọc yêu cầu trước đối chiếu answer

| Đề (ID được giữ) | Kiến thức cần và nơi đã dạy | Đánh giá |
|---|---|---|
| 3.13.1 `4-2-1` | Lọc Unicode, xếp nhiều cột (2.2–2.4); `ROW_NUMBER`, `PARTITION BY` và thứ tự ngoài (3.13:32, 73–80). | Đủ cách làm trong bài. |
| 3.13.2 `4-2-2` | Lọc, sắp; `RANK`/`DENSE_RANK`, không chia nhóm và không thêm mã vào khóa đồng hạng (3.13:57–73). | Đủ. |
| 3.13.3 `4-2-3` | CTE (3.12), đánh số riêng loại và lọc ngoài (3.13:75–80). | Đủ; lỗi diễn đạt ở finding 1 cần phân biệt với câu chính. |
| 3.16.1 `4-3-1` | Lọc ngày/EOMONTH (2.8), nhóm/tổng (3.1–3.2), CTE (3.12), khung lũy kế (3.16:35–53). | Đủ. |
| 3.16.2 `4-3-2` | Nhóm hai cột; phân nhóm tính lũy kế (3.16:63). | Đủ, cần tự kết hợp các mảnh đã giảng. |
| 3.16.3 `4-3-3` | Hai CTE, LAG, NULL, lọc sau cửa sổ (3.12; 3.16:57–65, 71–89). | Đủ; không cần đợi bài 3.14 hoàn chỉnh. |
| 3.18.1 `4-4-1` | CTE, EOMONTH, PIVOT ba vai trò, lọc và alias (3.18:34–57, 91 trở đi). | Đủ. |
| 3.18.2 `4-4-2` | COUNT khóa và đổi vai trò trạng thái (3.18:59–64). | Đã dạy bằng mảnh cú pháp và diễn giải, người học phải tự ráp CTE/câu ngoài. |
| 3.18.3 `4-4-3` | MONTH, lọc đúng năm, xoay số tháng (2.8; 3.18:66). | Đã nêu vai trò và mảnh cú pháp; cần tự ráp câu. |
| 3.19.1 `4-6-1` | GROUP BY/HAVING, CTE, INNER JOIN nhóm về từng hồ sơ (3.3–3.4, 3.12, 3.19:40–44). | Đủ. |
| 3.19.2 `4-6-2` | NULL/TRIM, `SUM(CASE...)`, nhóm phòng giữ 0 (2.5, 2.7, 3.1–3.2; 3.19:48–52). | Đủ. |
| 3.19.3 `4-6-3` | CTE kết nhóm trùng, COUNT không GROUP BY, UNION ALL và alias (3.1, 3.8, 3.12; 3.19:42, 54–56). | Đủ về tiền đề, là bài tổng hợp nhiều bước; chưa xác minh thực thi hoặc dữ liệu. |

Các đề dùng kiến thức đã giảng trước phần bài tập; không cần dùng answer làm lời dạy. Đây là đánh giá tiền đề từ source, không chứng nhận người học cụ thể tự giải hoặc kết quả SQL chính xác.

## Công cụ, tương thích và các điểm chưa kết luận

- Mã `lesson-moves.mjs`, `progress.ts` ánh xạ lần lượt v1→v3→v4→v5; bài đối soát bị gỡ thành null; bản đề cương chất lượng gộp chỉ tạo trạng thái `seen`, giữ cờ, còn trạng thái của bài thực hành được ưu tiên. Đọc cả test trường hợp v1–v4, nhưng không tự chạy test và không chứng minh thao tác import/storage thực trên browser.
- YAML vẫn dùng ID `4-2-*`, `4-3-*`, `4-4-*`, `4-6-*`; `exerciseLessonNum` nối theo danh tính cũ và `exercise-storage.ts` đọc nháp theo ID. Theo mã, nháp và trạng thái hoàn thành giữ danh tính; chưa thực nghiệm localStorage, API hoặc editor. Các tuyến cũ cho bài còn lại đi thẳng đích hiện hành; tuyến đối soát bị gỡ không có redirect theo quyết định.
- Tìm kiếm lấy summary và Excel metadata (`src/lib/search.ts`); summary 3.14/3.15/3.17 có tên các hàm cần tìm, 3.13/3.16 có NTILE/RANGE. Đã rà metadata và thuật toán, chưa tương tác ô tìm kiếm hoặc đo hiển thị mobile.
- Đã đối chiếu một số HTML hiện hữu/redirect, chưa kiểm giao diện, thao tác copy, bàn phím, drawer, điều hướng browser, quyền truy cập hoặc SQL live. Không đọc seed nên không xác nhận số liệu. Chưa soát toàn bộ tham chiếu bằng ngữ nghĩa trên mọi trang ngoài phạm vi và chưa kiểm tương tác khi nhiều tab cũ cùng ghi storage; không coi các phần này là đã đạt.

## Ưu tiên

Xử lý finding 1 khi tác giả cân nhắc phạm vi lỗi nền; không thấy hồi quy menu có căn cứ từ các kiểm tĩnh nêu trên. Kết luận này không thay review từng bài, kiểm thực thi hay quyền push/deploy.

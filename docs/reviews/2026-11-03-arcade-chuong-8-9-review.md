# Review Arcade chương 8 và 9 (bài 2.8 hàm ngày, bài 2.9 CASE WHEN)

## 1. Phạm vi, phiên bản, công cụ thực tế

- Phạm vi: 12 đề trong `src/content/arcade/2-8/` (6 đề) và `src/content/arcade/2-9/` (6 đề), thứ tự chơi theo `order`.
- Phiên bản: nhánh `feat/arcade-mvp`, commit giao việc `606e7d8`. Lúc ghi report, HEAD đã là `c356b37` (thêm một commit sửa việc quét trang Arcade). `git diff 606e7d8 HEAD` trên `src/content/arcade/2-8`, `2-9`, `src/content/lessons`, `api/src`, `src/lib` không có thay đổi, nên nội dung review vẫn đúng với `606e7d8`.
- Công cụ thực tế: agent Claude chạy Sonnet 5.5 (theo thông tin phiên), chỉ dùng Read, Grep và Bash đọc nguồn (`cat`, `sed`, `grep`, `git log/diff`). Không mở browser, không kết nối database, không chạy SQL/API/`check:arcade`, không nộp bài. Không đọc `HRM_Demo.sql`, `.env`, `temp/review` cũ, `docs/reviews`, `src/content/exercises`.
- Đã đọc: `AGENTS.md`, `docs/quy-uoc.md` (mục 2.8, 4.5), spec Arcade (mục 6, 8, 9), bài 2.8 và 2.9 đầy đủ, phần chữ của bài 2.2, các dòng liên quan của 2.3 và 1.3, 12 file YAML. Bài 1.1–1.5, 2.1, 2.4–2.7 chỉ đọc lướt qua tìm từ khóa (grep), chưa đọc toàn bộ: kết luận "đã dạy / chưa dạy" cho `<`, `>`, `decimal`, `BETWEEN` dựa trên grep, không phải đọc từng bài.
- Có đọc thêm mã chấm (`api/src/arcade-check.ts`, `arcade-sql.ts`, `src/lib/grade.ts`, một đoạn `arcade.ts`) để hiểu hidden test chạy thế nào. Đây là đọc nguồn, không phải chạy.

## 2. Rà theo thứ tự bài

Quy ước đọc: bước 1 là tự giải bằng kiến thức đã học, chưa xem `answer`/`catches`; bước 2 mới mở hidden test.

### Chương 8

**8.1 `mot-thang-sau` (Dễ), "Ngày hết thử việc".**
Tự giải: đủ. Cần `DATEADD(month, 2, NgayBatDau)`; bài 2.8 giải thích bộ ba (đơn vị, số lượng, ngày gốc) và nói rõ đơn vị `month` dùng được. Hidden test công bằng. Unit test hay ở chỗ cả bốn cặp đều cách nhau đúng 61 ngày, nên người nghĩ "hai tháng = 61 ngày" qua unit test và trượt test 3 (01-15 sang 03-15 chỉ 59 ngày). Đây là bẫy thật mà người mới có thể mắc.
Tồn tại: xem F9 (nghĩa "ngày hết") và F7 (test 4, 5 là bộ lọc gượng).

**8.2 `so-ngay-giua-hai-moc` (Vừa), "Số ngày chờ duyệt".**
Tự giải: đủ. `DATEDIFF(day, ngày đầu, ngày cuối)` có trong ví dụ của 2.8, hướng đầu rồi cuối rõ. Đề nói đúng ngày nộp và ngày duyệt; bảng có thêm `NgayTao` làm nhiễu, unit test cố ý để `NgayTao` bằng `NgayNop`, test 3 mới tách ra. Thiết kế tốt, hợp lý. Test 5 (0 ngày) đã được đề nói trước ("duyệt ngay trong ngày thì ra 0") nên công bằng. Một hàm đơn, nhiễu nhẹ: nhãn Vừa hơi cao (F6).

**8.3 `cuoi-thang-luong` (Vừa), "Ngày chốt lương".**
Tự giải: đủ, và gần như chép được. Bảng hàm của 2.8 ghi `EOMONTH` là "ngày cuối tháng chứa ngày gốc", gần như nguyên văn đề. Unit test chỉ có tháng 3, 5, 7, 8 (đều 31 ngày); hidden test thêm tháng 4, 6, 10, 1 và tháng 2 năm nhuận. Công bằng. Nhãn Vừa nên là Dễ (F6). Test 3 và 5 chặn các cách làm gượng (F7). "Ngày chốt" trùng tên với "ngày chốt" của bài 2.8/2.9 (F9).

**8.4 `het-han-trong-30-ngay` (Vừa), "Hợp đồng sắp hết hạn".**
Tự giải: đủ, nhưng đây gần như đúng ví dụ trong 2.8 (cùng bảng `HopDong`, cùng mốc 21/10/2026, cùng 30 ngày, cùng thứ tự), chỉ bớt cột `DATEDIFF`. Học viên chép `WHERE` và `ORDER BY` từ bài là xong (F6). Vấn đề thật: "đến hết 30 ngày sau mốc" (F3), và không test nào kiểm tiêu chí phụ `MaHD` (F1).

**8.5 `du-ba-nam` (Khó), "Đủ ba năm công tác".**
Tự giải: đủ nhưng không khó. Đề tự định nghĩa "đủ ba năm" là "ngày kỷ niệm ba năm không muộn hơn mốc, gồm cả đúng ngày đó"; bài 2.8 nói "so mốc tạo bằng `DATEADD`" và bài 2.9 có đúng biểu thức `DATEADD(year, 3, NgayVaoLam) <= '20261021'`. Hidden test hợp lý và bắt đúng bẫy `DATEDIFF(year)` đã nêu trong 2.8/2.9 (test 3), biên đúng ngày kỷ niệm (test 4), tiêu chí phụ (test 5). Đây là bài có hidden test tốt nhất chương. Nhãn Khó lệch (F6).

**8.6 `sinh-nhat-thang-sau` (Khó), "Sinh nhật tháng sau".**
Tự giải: đủ. `MONTH(NgaySinh)` kết hợp `MONTH(DATEADD(month, 1, ...))` có trong bảng hàm của 2.8; vì mốc cố định là tháng 12 nên học viên có thể gõ thẳng `= 1`, vẫn đúng đề. `DATEDIFF` với đơn vị `month` chưa được dạy riêng (2.8 chỉ mô tả `day` và `year`), nhưng đề ghi sẵn "dùng DATEDIFF với đơn vị month" và "số ranh giới", và unit test 2 (vào làm 2025-12-31, ra 12) cho thấy cách đếm. Đủ để làm. Vấn đề: ba hidden test chỉ thêm bộ lọc gượng, không bẫy thật (F7); không test nào ép `ORDER BY` (F1); đề ghép hai việc không liên quan (F9).

### Chương 9

**9.1 `nhan-hai-nhanh` (Dễ), "Nhãn đủ điều kiện".**
Tự giải: đủ. `CASE WHEN ... THEN ... ELSE ... END` và `>=`. Biên tốt: điểm đúng bằng 8 (test 3), 7.9 (test 4), thiếu `ELSE` ra `NULL` (test 5, bẫy thật và đúng mục tiêu bài). Nhãn không trong “…” (F4).

**9.2 `ba-muc-thuong` (Vừa), "Ba mức thưởng".**
Tự giải: đủ, gần như đúng ví dụ ba nhóm của 2.9 với số khác. Hidden test là biên 500, 300 và ngưỡng dưới, công bằng. "thưởng A" chưa phân biệt nhãn là `A` hay `Thưởng A` (F4). Lặp với 9.3 (F6).

**9.3 `thu-tu-nhanh` (Vừa), "Xếp hạng nhà cung cấp".**
Tự giải: đủ. Đề viết "nếu không thì" đúng theo thứ tự `WHEN`, nên không có chỗ nào để người học tự suy. Sai thứ tự nhánh bị unit test bắt ngay (tốt). Cấu trúc trùng 9.2 (F6). Tên "Xếp hạng" dễ nhầm với xếp hạng bằng `ORDER BY`/`RANK` (F9).

**9.4 `o-trong-trong-nhanh` (Vừa), "Tình trạng ngày nghỉ việc".**
Tự giải: đủ. Cần `IS NULL` (bài 2.5) bên trong `WHEN`; bài 2.9 chỉ cho thấy `WHEN Email IS NULL` ở mục Ứng dụng, nhưng `WHEN` nhận mọi điều kiện và 2.9 đã nhắc ô `NULL` so sánh cho `UNKNOWN`, nên đủ. Vấn đề: hidden test 4 dùng ngày nghỉ việc 2026-12-31 và đòi nhãn "Đã nghỉ" (F2).

**9.5 `nhan-tham-nien` (Khó), "Nhóm thâm niên tại mốc".**
Tự giải: đủ, và chép được: đây là truy vấn của 2.9 viết lại (cùng mốc 21/10/2026, cùng hai mốc 3 năm và 1 năm, cùng `<= '20261021'`), thêm `ORDER BY MaNV`. Hidden test 3, 4, 5 trùng các mục "Hay nhầm" của 2.9, công bằng. Nhãn Khó không đúng (F6); ORDER BY không được ép (F1); `Bài cần biết` thiếu 2.4 (F5).

**9.6 `bao-cao-tong-hop` (Khó), "Báo cáo hợp đồng".**
Tự giải: đủ nhưng cần suy nghĩ, đây là bài tổng hợp thật (lọc bằng `IN`, nhánh `NULL` đứng trước, hai mốc ngày, `ORDER BY`). Hai vướng: "trước mốc" cần toán tử `<` hoặc `DATEADD` số âm, cả hai chưa được dạy rõ (F8); "đến hết 30 ngày sau mốc" (F3). Các hidden test còn lại hợp lý: thiếu bộ lọc phòng (test 3), biên đúng ngày mốc (test 4). `ORDER BY` không được ép (F1). Link thiếu 2.3, 2.4 (F5).

## 3. Bảng tiền đề từng đề

"Dạy ở" chỉ ghi nơi nội dung được giảng; "Thiếu" ghi phần chưa được dạy hoặc chỉ nhắc thoáng.

| Đề | Cần biết | Dạy ở | Thiếu |
|---|---|---|---|
| 8.1 | `DATEADD(month, n, cột)` | 2.8 (cú pháp, đơn vị `month`) | Không thiếu |
| 8.2 | `DATEDIFF(day, đầu, cuối)` | 2.8 (ví dụ chính) | Không thiếu |
| 8.3 | `EOMONTH(cột)` | 2.8 (bảng hàm) | Không thiếu |
| 8.4 | `WHERE` hai mốc, `>=`, `<=`, `AND`, `DATEADD(day, 30, ...)`, `ORDER BY` hai khóa | 2.2, 2.3, 2.4, 2.8 | Không thiếu |
| 8.5 | `DATEADD(year, 3, ...)` so với mốc, `<=` | 2.8 (đoạn "đủ năm"), 2.9 | Không thiếu; đề gần như đã chỉ cách |
| 8.6 | `MONTH`, lồng `MONTH(DATEADD(month, 1, ...))` hoặc gõ `= 1`, `DATEDIFF(month, ...)`, `ORDER BY` | 2.8 (bảng hàm, ranh giới), 2.4 | `DATEDIFF` đơn vị `month` chưa dạy riêng; đề tự nhắc dùng nó |
| 9.1 | `CASE WHEN THEN ELSE END`, `>=`, nhãn `N'...'` | 2.9, 2.2, 1.3 | Không thiếu |
| 9.2 | Như 9.1, hai nhánh `WHEN` | 2.9 | Không thiếu |
| 9.3 | Như 9.2, thứ tự nhánh | 2.9 (đoạn "xét từ trên xuống") | Không thiếu |
| 9.4 | `IS NULL` trong `WHEN` | 2.5; 2.9 (mục Ứng dụng, ô `NULL` rơi vào `ELSE`) | `IS NULL` trong `WHEN` chỉ xuất hiện ở mục Ứng dụng |
| 9.5 | `DATEADD(year, ...)` trong `WHEN`, `ORDER BY` | 2.9, 2.8, 2.4 | Không thiếu |
| 9.6 | `IN`, nhánh `NULL` đầu tiên, nhiều `WHEN`, "trước mốc", mốc +30 ngày, `ORDER BY` | 2.3, 2.5, 2.8, 2.9, 2.4 | "Trước mốc" cần `<` hoặc `DATEADD` số âm, chưa được dạy rõ (F8) |

Ghi chú về `<` và `>`: grep trong 2.2–2.9 chỉ thấy `<` thoáng qua một lần ở đoạn "đầu trên `< DATEADD(day, 1, ...)`" của 2.8, chưa thấy định nghĩa. Quy ước 2.8 cũng liệt kê chúng là "chỉ dùng khi bài học đã dạy". Số âm trong `DATEADD` không xuất hiện ở bài nào của chương 2.

## 4. Finding

### F1. Thứ tự dòng (`ORDER BY`) không bị ép ở ba đề; tiêu chí phụ không bị ép ở một đề — **Cần sửa**

- Câu gốc: `ordered: true` ở `sinh-nhat-thang-sau` ("Xếp mã tăng dần"), `bao-cao-tong-hop` ("Xếp mã tăng dần"), `nhan-tham-nien` ("xếp mã tăng dần"); `het-han-trong-30-ngay` ("cùng ngày thì mã tăng dần").
- Vị trí: mọi `tests[].rows` của ba đề đầu (dòng chèn đã sắp sẵn theo mã); `het-han-trong-30-ngay` chỉ test 4 có chèn lệch thứ tự nhưng không có hai dòng cùng ngày kết thúc.
- Tác động tới người mới: học viên quên `ORDER BY` vẫn đạt toàn bộ test, nhận coin và tưởng đã làm đúng thứ tự. Đề vẫn dạy sai điều quy ước muốn kiểm ("ORDER BY là thứ duy nhất bảo đảm thứ tự").
- Căn cứ: `arcade.ts:89` chạy câu học viên với `buildSetup(c.tables, t.rows)` không đảo; `reverse` chỉ dùng trong `arcade-check.ts:37` cho `answer`. Kết quả không có `ORDER BY` trên bảng vừa tạo thường ra theo thứ tự chèn, nên trùng với kết quả mong đợi. Đây là suy luận từ code, chưa xác minh bằng chạy câu thiếu `ORDER BY` trên SQL Server thật. Chiều sắp xếp (ASC/DESC) thì vẫn được bảo vệ ở các đề có hai dòng kết quả.
- Đề xuất: ở mỗi đề trên, chèn một hidden test mà thứ tự chèn lệch thứ tự yêu cầu (và với `het-han-trong-30-ngay` thêm hai hợp đồng cùng ngày kết thúc chèn mã lớn trước). Có thể chỉnh luôn một hidden test hiện có thay vì thêm test mới.

### F2. Hidden test 4 của `o-trong-trong-nhanh` đòi nhãn "Đã nghỉ" cho ngày nghỉ việc ở tương lai, trong khi đề không có mốc — **Cần làm rõ**

- Câu gốc đề: "NgayNghiViec là NULL thì ghi Đang làm, có ngày thì ghi Đã nghỉ"; dữ liệu test 4: `NV321` có `NgayNghiViec` = `2026-12-31`.
- Tác động: đề đúng chữ ("có ngày thì ghi Đã nghỉ") nên học viên đọc kỹ vẫn làm đúng. Nhưng người có óc nghiệp vụ sẽ tự hỏi "ngày nghỉ việc sau hôm nay thì đã nghỉ chưa?", đề không có mốc nào để trả lời, và chương này vừa dạy mốc cố định 21/10/2026. Dữ liệu cũng mâu thuẫn với dữ liệu khóa học, nơi mọi người "Đã nghỉ" đều có ngày nghỉ trong quá khứ. Hidden test 4 phạt người suy nghĩ nghiệp vụ và thưởng người đọc máy móc.
- Đề xuất: thêm vào đề vế "bất kể ngày đó là khi nào", hoặc đổi dữ liệu test 4 sang ngày nghỉ rõ ràng đã qua và bỏ mốc "2026-12-31" khỏi `catches` ngầm.

### F3. "Đến hết 30 ngày sau mốc" có thể hiểu hai cách, và chỉ hidden test quyết định — **Cần làm rõ**

- Câu gốc: `het-han-trong-30-ngay`: "từ chính mốc đó đến hết 30 ngày sau mốc, gồm cả hai đầu"; `bao-cao-tong-hop`: "từ mốc đến hết 30 ngày sau mốc".
- Vị trí: hidden test 4 của `het-han-trong-30-ngay` (ngày 2026-11-20 phải vào; test 4 `catches` dùng 29 ngày) và hidden test 5 của `bao-cao-tong-hop` (2026-11-20 là "Sắp hết", 2026-11-21 là "Còn hạn").
- Tác động: đọc đúng chữ thì "30 ngày sau mốc" là ngày 20/11, "gồm cả hai đầu" khớp. Nhưng "hết 30 ngày" cũng gợi cách đếm 30 ngày gộp ngày mốc (đến 19/11). Không unit test nào có ngày kết thúc ở 19, 20 hay 21/11, nên người hiểu theo cách thứ hai qua unit test, rồi trượt hidden test và phải tốn coin mở xem. Bài 2.8 đã giải thích ("30 ngày có 31 ngày lịch") nên người đọc kỹ bài vẫn làm đúng.
- Đề xuất: nói "đến ngày cách mốc đúng 30 ngày" hoặc đưa một dòng vào unit test ở ngày 20/11.

### F4. Nhãn phải ghi đúng từng chữ nhưng không đặt trong “…” — **Biên tập** (lệch quy ước 2.8)

- Câu gốc: "điểm từ 8 trở lên ghi Đạt, còn lại ghi Chưa đạt" (`nhan-hai-nhanh`); "doanh số từ 500 trở lên thưởng A" (`ba-muc-thuong`); "thì ghi Từ 3 năm, ... Dưới 1 năm" (`nhan-tham-nien`); tương tự `thu-tu-nhanh`, `o-trong-trong-nhanh`, `bao-cao-tong-hop`.
- Căn cứ: quy ước 2.8 yêu cầu nhãn phải ghi đúng chữ thì đặt trong “…”; chương 5 và 7 đã làm vậy; bộ chấm so chuỗi chính xác (`JSON.stringify`, phân biệt hoa thường và dấu).
- Tác động: giảm nhẹ nhờ unit test của mỗi đề đều hiện đủ các nhãn. Riêng `ba-muc-thuong`, "thưởng A" đọc được là nhãn `A` hoặc `Thưởng A`; chỉ unit test giải được.
- Đề xuất: đặt nhãn trong “…”, ví dụ ghi “A”. Với `nhan-hai-nhanh`, `thu-tu-nhanh` nên cân nhắc một vế "ghi đúng chữ" như các đề chương 5.

### F5. "Bài cần biết" là danh sách chung theo chương, không theo đề — **Cần làm rõ**

- Câu gốc/vị trí: trường `lessons` của 12 file. Chương 8 đều ghi 2.3, 2.4, 2.8; chương 9 đều ghi 2.5, 2.8, 2.9.
- Tác động: link thừa ở nhiều đề (ví dụ `cuoi-thang-luong` chỉ cần 2.8, `nhan-hai-nhanh` chỉ cần 2.9). Thiếu thật ở hai đề chương 9: `bao-cao-tong-hop` dùng `IN` (2.3) và `ORDER BY` (2.4) nhưng không link tới; `nhan-tham-nien` dùng `ORDER BY` nhưng không link 2.4. Học viên đang kẹt sẽ bấm link trong mục này trước.
- Đề xuất: sửa theo từng đề (bảng mục 3). Việc nhỏ, không đổi test.

### F6. Nhãn độ khó lệch thực tế; hai cặp đề lặp nhau và lặp với bài học — **Biên tập**

- 8.3 `cuoi-thang-luong` (Vừa): một hàm duy nhất, bảng hàm của 2.8 nói đúng câu đề. Nên là Dễ.
- 8.4 `het-han-trong-30-ngay` (Vừa) và 9.5 `nhan-tham-nien` (Khó): gần như chép ví dụ cuối bài 2.8 và 2.9. Học viên sao chép `WHERE`/`CASE` từ bài là qua; không cần suy nghĩ thêm. 9.5 xếp Khó là hơi cao.
- 8.5 `du-ba-nam` (Khó): đề đã định nghĩa "ngày kỷ niệm ba năm không muộn hơn mốc", gần như đã chỉ ra biểu thức; cùng logic với 9.5 (cùng `DATEADD(year, 3, NgayVaoLam)` và cùng mốc). Hai đề Khó này lặp nhau liên chương.
- 9.2 `ba-muc-thuong` và 9.3 `thu-tu-nhanh`: cùng cấu trúc ba mức theo ngưỡng số, cùng độ khó, chỉ đổi số và nhãn. Hai đề liền kề cho cùng kỹ năng nên đọng lại không sâu hơn. Bẫy thứ tự nhánh của 9.3 vẫn bị unit test bắt, còn hidden test không thêm điều gì mới.
- Nhịp chương 8: Dễ, Vừa, Vừa, Vừa, Khó, Khó; ba đề đầu thực chất đều là "một hàm", đề 4 mới là bước nhảy (nhiều điều kiện cộng sắp xếp). Chương 9: Dễ, Vừa, Vừa, Vừa, Khó, Khó; đề 6 là đề tổng hợp thật sự và xứng đáng Khó.
- Đề xuất: không bắt buộc đổi nhãn; nếu giữ quy ước 1/3/2 và 1/3/2 thì hạ 8.3 xuống Dễ và nâng một đề khác (ví dụ thêm yêu cầu cho 9.3 hoặc 8.5) để Khó thật sự Khó; hoặc đổi dữ liệu/ngưỡng của 9.3 để có bẫy riêng (ví dụ ngưỡng có hai đầu, hoặc một dòng `NULL`).

### F7. Nhiều `catches` là bộ lọc gượng, hidden test ít bảo vệ lỗi người học thật sự mắc — **Biên tập**

- Câu gốc: `sinh-nhat-thang-sau` test 3–5 (thêm điều kiện năm sinh, ngày sinh từ 2 trở đi, sinh trước 2001); `mot-thang-sau` test 4–5 (thêm lọc tháng, lọc khoảng ngày); `cuoi-thang-luong` test 3 và 5 (chỉ xét một số tháng); `o-trong-trong-nhanh` test 3.
- Tác động tới người mới: không ai tự thêm các bộ lọc đó khi đề đã nói "mọi dòng"; hidden test chỉ là cổng tốn coin mà không dạy thêm gì. Trong khi các bẫy mà bảng quy ước nêu (năm nhuận, `DATEDIFF` đếm ranh giới, tháng 12 sang tháng 1, biên tháng) chủ yếu chỉ có trong dữ liệu chứ không có `catches` thực tế nào bắt: ví dụ cách làm "cứ cộng 30 ngày vào đầu tháng" ở `cuoi-thang-luong` test 4 là catches thật và tốt, nhưng test 3 và 5 thì không.
- Căn cứ: so `catches` với `answer` và với các lỗi nêu trong "Hay nhầm" của 2.8/2.9. Đây là đánh giá giá trị sư phạm, không phải lỗi chấm (mọi `expected` đúng, mục 5).
- Đề xuất: thay các hidden test gượng bằng bẫy thật: với `sinh-nhat-thang-sau` dùng ngày vào làm cùng tháng với mốc (kết quả 0) hoặc ngày vào làm 31/12 và 01/01 (đếm ranh giới); với `mot-thang-sau` dùng ngày bắt đầu 31/12 (kết quả 28 hoặc 29/02); với `cuoi-thang-luong` giữ test 4, đổi test 3 và 5 thành năm nhuận và hai tháng 30 ngày liên tiếp.

### F8. `bao-cao-tong-hop` cần "trước mốc", dạy bằng toán tử chưa có hoặc số âm chưa có — **Cần làm rõ**

- Câu gốc: "ngày kết thúc trước mốc thì ghi Đã hết".
- Tác động: với kiến thức tới 2.8, học viên chỉ có `>=` và `<=`. Làm được bằng cách đảo thứ tự nhánh (xét "từ mốc + 31 ngày trở đi" rồi "từ mốc trở đi" rồi phần còn lại) hoặc đoán `<`; đáp án mẫu dùng `DATEADD(day, -1, ...)`, kỹ thuật chưa được dạy. Học viên bí có thể đoán đúng `<` (khả năng cao nhưng chưa xác minh) hoặc kẹt.
- Căn cứ: grep 2.2–2.9 (mục 3); quy ước 2.8 nói `<` chỉ dùng khi bài đã dạy. Lưu ý quy ước chỉ ràng buộc từ khóa trong đề/đáp án trả lời; `catches` được phép dùng từ khóa chưa dạy theo quyết định đã duyệt.
- Đề xuất: hoặc bổ sung một câu dạy `<`/`>` ở bài 2.8 hoặc 2.2 (đề xuất sửa bài, ngoài phạm vi review này), hoặc ghi chú rằng đề giải được bằng `>=` theo thứ tự nhánh đảo. Phương án thứ hai trái với quy ước "không gợi ý trong đề", nên nghiêng về dạy `<` ở bài.

### F9. Biên tập nhỏ về nghĩa nghiệp vụ, tên và id — **Biên tập**

1. `mot-thang-sau`: tiêu đề "Ngày hết thử việc" nhưng đáp án là ngày sau ngày bắt đầu hai tháng (03-10 sang 05-10), trong khi "đúng hai tháng từ 10/3" cũng có thể kết thúc ngày 09/5. Unit test giải quyết nhưng người làm BA sẽ hỏi. Gợi ý: ghi "ngày đầu tiên sau thử việc" hoặc nói rõ "cùng ngày số của tháng sau hai tháng". Id `mot-thang-sau` nói một tháng trong khi đề hai tháng.
2. `cuoi-thang-luong`: "Lương chốt vào ngày cuối của tháng chứa ngày vào làm" lạ về nghiệp vụ (lương cả đời chốt vào tháng vào làm?). Cột "Ngày chốt" trùng nghĩa với "ngày chốt" của bài 2.8/2.9 (mốc báo cáo 21/10/2026), dễ gây rối thuật ngữ. Gợi ý: "kỳ lương đầu tiên", đổi nhãn cột.
3. `sinh-nhat-thang-sau`: ghép sinh nhật tháng sau với "số ranh giới tháng từ ngày vào làm" không có chuyện nghiệp vụ chung; cột `Số tháng` trông được thêm để ép dùng `DATEDIFF`. Gợi ý: gắn với một việc (ví dụ phát quà sinh nhật kèm thông tin thâm niên) hoặc bỏ.
4. `thu-tu-nhanh`: tên "Xếp hạng" dễ nhầm với `ORDER BY`/xếp hạng (sẽ học ở 4.2); nhãn "Lâu năm" gán theo số đơn chứ không theo năm; nhà cung cấp hơi ngoài mảng nhân sự/phúc lợi. Id `thu-tu-nhanh`, `nhan-hai-nhanh`, `bao-cao-tong-hop`, `o-trong-trong-nhanh` không còn khớp tiêu đề.
5. `bao-cao-tong-hop`: "các hợp đồng đang lưu" đọc được như "đang hiệu lực"; ý đề là mọi dòng của hai phòng. Gợi ý: "mọi dòng hợp đồng của phòng KD hoặc IT".
6. `ba-muc-thuong`: chưa nói đơn vị doanh số (500 triệu hay 500 đồng); bảng và cột cùng tên `DoanhSo`.
7. `nhan-hai-nhanh`, `ba-muc-thuong`, `thu-tu-nhanh` đều có "luôn có giá trị" trong đề và `NOT NULL` trong bảng; trùng nhau, có thể bỏ một trong hai.

### F10. Điểm đúng, giữ được — **Giữ được**

- Đã đọc từng `expected` (mọi test của 12 đề, 60 test) và đối chiếu bằng tay với dữ liệu vào và đề: **khớp hết**, gồm các phép đếm tháng (33, 6, 12, 79, 53, 71, 11, 10), ngày cuối tháng, năm nhuận 2024-02-29, các biên 20/11, 21/10, 500, 300, 5, 20.
- Unit test chọn dữ liệu để học viên tự thấy quy tắc: bộ 61 ngày của `mot-thang-sau`, `NgayTao` bằng `NgayNop` ở `so-ngay-giua-hai-moc`, 12 ranh giới tháng ở `sinh-nhat-thang-sau`, nhánh `NULL` hiện ngay ở `bao-cao-tong-hop`.
- Hidden test của `du-ba-nam` và `nhan-tham-nien` bám đúng các mục "Hay nhầm" của 2.8/2.9 (`DATEDIFF(year)`, biên ngày kỷ niệm, tiêu chí phụ) và công bằng với đề.
- Chương 8 và 9 không có đề nào cần hàm chưa dạy ngoài F8 và `DATEDIFF(month)` (đã được đề tự nhắc). Không đề nào phụ thuộc ngày hiện tại.
- Đề nói đủ cột, thứ tự cột, phạm vi dòng, mốc cố định ở các đề có ngày; không tìm thấy chỗ thiếu thứ tự cột hay phạm vi dòng.

## 5. Ưu tiên

1. F1 — thêm hidden test ép `ORDER BY` và tiêu chí phụ (ảnh hưởng đúng/sai của việc cấp coin).
2. F2, F3 — hai chỗ hidden test phạt người đọc hợp lý đề (làm rõ đề hoặc đổi dữ liệu).
3. F8 — quyết định cách dạy hoặc chấp nhận "trước mốc" cho `bao-cao-tong-hop`.
4. F5, F4 — sửa nhanh, không đổi test.
5. F7, F6, F9 — biên tập chất lượng bài, làm khi có thời gian.

## 6. Nguồn và giới hạn

- Nguồn: các file đã nêu ở mục 1, tại commit `606e7d8` (nội dung phạm vi không đổi ở HEAD `c356b37`).
- Chưa xác minh (cần chạy mới biết): hành vi thực của SQL Server với câu thiếu `ORDER BY` trên bảng vừa tạo (F1); học viên có đoán được `<` hay không (F8); giao diện thật của trang bài (link "Bài cần biết", nhãn, hiển thị dữ liệu), vì không dùng browser; `check:arcade` đạt (tin theo mô tả giao việc, không chạy lại).
- Đã tự tính bằng tay, không do máy chạy: toàn bộ `expected` (F10). Phép tính tháng dựa trên quy tắc đếm ranh giới được bài 2.8 mô tả.
- Chưa đọc đầy đủ các bài 1.1–1.5, 2.1, 2.3–2.7; các nhận định "chưa dạy" cho `<`, `>`, số âm trong `DATEADD` dựa trên grep, có thể bỏ sót nếu bài dùng cách diễn đạt khác.
- Không có phát hiện nào về dữ liệu hoặc `expected` sai. Các finding là về độ công bằng, độ phủ test, độ rõ của đề và biên tập.

## Kết luận

Kiến thức đã dạy đủ để làm cả 12 đề; không đề nào buộc dùng hàm chưa dạy, chỉ riêng `bao-cao-tong-hop` cần "trước mốc" mà `<` và số âm trong `DATEADD` chưa được dạy rõ (F8), và `sinh-nhat-thang-sau` dùng `DATEDIFF(month)` do đề tự chỉ dẫn. Mọi `expected` khớp dữ liệu vào theo mắt đọc. Điều còn vướng: hidden test không ép `ORDER BY` ở ba đề (F1), hai chỗ đề mơ hồ mà chỉ hidden test quyết định (F2, F3), nhãn độ khó và nội dung lặp (F6, F7). Đây là đánh giá học thử bằng đọc nguồn, không xác nhận SQL hay giao diện đã chạy đúng.

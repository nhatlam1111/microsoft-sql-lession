# Review bài 2.8 "Hàm ngày: thâm niên, sinh nhật, hết hạn hợp đồng" (học thử)

## 1. Phạm vi, phiên bản, công cụ thực tế

- **Bài:** `src/content/lessons/2-8-ham-ngay-tham-nien.mdx`; **đề:** `src/content/exercises/2-8-ham-ngay-tham-nien.yaml` (3 đề).
- **Source:** commit `513c81b` trên `feat/lesson-2-5-null`; `git status` sạch lúc bắt đầu.
- **Build:** `dist/bai/2-8-ham-ngay-tham-nien/index.html` (và 3 trang `bai-tap/1..3`). Dấu thời gian build 20:18 sau file MDX 20:17 và trước commit 20:19, nên khớp về thời điểm; tôi không có cách chứng minh build sinh từ đúng commit ngoài việc đối chiếu nội dung: câu chính, bốn bước `RunFlow` (query, focus), `Result`, `Memo`, ba câu tự kiểm tra và lời đề trong HTML đều trùng nguồn.
- **Đã đọc:** `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài mẫu 2.1, bài 1.3, 2.2, 2.3, 2.4, 2.5; mục "Cách đã cân nhắc", "Bảng soi", "Bài 2.8", "Quyết định của người viết" trong `docs/superpowers/specs/2026-10-31-lessons-2-8-2-9-design.md` (chỉ để biết phạm vi). Không đọc report cũ, `docs/reviews`, `HRM_Demo.sql`, `.env`.
- **Cách kiểm:** chỉ đọc nguồn và HTML build (tách chữ bằng một script Python đọc file, đặt ở thư mục scratchpad ngoài repo). Không mở browser, không chạy SQL, không kết nối database, không chạy API/runner. Lời đề YAML đọc trước và tự xác định cách làm; đáp án đọc sau.
- **Model:** model của phiên (Sonnet 5.5 theo thông tin hệ thống); effort không xác định được từ trong phiên nên không ghi.
- **Kiến thức nền giả định:** Excel cơ bản; chỉ dùng bài 2.8 và các bài 1.3, 2.1–2.5.

## 2. Rà theo thứ tự bài

### 2.1 Tình huống và phạm vi

**Giữ được.** Yêu cầu của chị Hạnh có đủ cột, thứ tự cột, chiều sắp xếp và luật tie-break; phạm vi (toàn bộ `HopDong`, mỗi dòng một hợp đồng), ngày chốt và khoảng `21/10` đến hết `20/11` được nói ngay dưới tin nhắn. Tôi tự cộng: `21/10` + 30 ngày = `20/11` (tháng 10 có 31 ngày), đúng. `Key` khớp yêu cầu. Khớp dòng 2.8 trong `ho-so-cong-ty.md` (3 hợp đồng, NV025/NV046/NV036).

**F1. "gồm cả hợp đồng lịch sử nếu thỏa khoảng ngày" (Tình huống, đoạn Phạm vi)**
- Đánh giá: **Biên tập**.
- Tác động: "hợp đồng lịch sử" không được định nghĩa (hợp đồng cũ đã có hợp đồng nối tiếp? đã hết hạn?). Người mới phải tự đoán, và đoạn cuối bài ("chưa xác định hợp đồng cuối của từng người") mới gợi ý nghĩa.
- Đề xuất: bỏ cụm "lịch sử" hoặc thay bằng "kể cả hợp đồng của người có hợp đồng khác nối tiếp".

### 2.2 Tiểu mục "Từ phép trừ ngày trong Excel đến DATEADD và DATEDIFF"

**Giữ được.**
- Hình Excel đúng điều nó nói: `B2–B4` được đánh dấu, `C2` có công thức, ba số `10/23/24` tôi tự trừ bằng tay và khớp `Result` về sau.
- Mạch đúng quy ước 2.1: Excel → `Sql` → `LineMap`; mọi dòng `LineMap` có "Ví dụ:" bằng giá trị thật (HD2025-014, HD2026-002, HD2023-003).
- Ví dụ ranh giới năm của `HD2024-008`: `DATEDIFF(year, 2024-11-15, 2026-11-14)` = 2 (2026 trừ 2024) và `DATEADD(year, 2, 2024-11-15)` = `2026-11-15` là đúng theo phép tính, và là ví dụ tốt vì lấy từ chính dữ liệu của bài.
- Bảng nhỏ `MONTH`/`EOMONTH` trên `HD2024-008` (`11`, `2026-11-30`) đúng theo ngày `2026-11-14`.
- Dòng `NULL` → `UNKNOWN` nối về bài 2.5 đúng chỗ.
- Không thấy nhắc vai trò người đọc.

**F2. Excel chỉ có nửa "trừ"; chưa nói vì sao SQL cần `DATEADD`/`DATEDIFF`**
- Câu gốc: "Trong Excel, ... bạn lấy ngày kết thúc trừ ngày chốt" (Excel chỉ có phép trừ) rồi "Trong SQL, `DATEADD` tạo ngày mới ..., `DATEDIFF` đếm khoảng cách".
- Đánh giá: **Cần làm rõ**. Loại: **chưa được dạy** (câu "tại sao").
- Tác động: người mới hỏi ngay "Excel cộng 30 ngày bằng `+30` và trừ hai ngày bằng dấu `-`, sao SQL phải dùng hai hàm?". Tiêu đề tiểu mục hứa "từ phép trừ ... đến DATEADD" nhưng chỉ có đối ứng của `DATEDIFF` (phép trừ); đối ứng của `DATEADD` (cộng ngày) không có trong Excel. Excel/SQL chưa đối xứng.
- Căn cứ: đọc nguồn (dòng 32–41). Nghi (chưa xác minh bằng cách chạy): kiểu `date` trong SQL Server có thể không cho trừ trực tiếp hai ngày hay cộng số nguyên; nếu đúng thì đó là lý do cần hàm và nên nói một vế.
- Đề xuất: một vế ở dòng 41, kiểu "Excel cộng/trừ ngày bằng `+`/`-`; SQL Server dùng hàm để nói rõ đơn vị (ngày, tháng, năm)". Người viết kiểm lại điều này bằng `SELECT` trước khi viết.

**F3. `CAST('20261021' AS date)` không có lý do, trong khi bài 2.2/2.3 dùng chuỗi trần**
- Câu gốc: LineMap "Chuyển chuỗi tám chữ số dạng năm-tháng-ngày thành kiểu `date`, chỉ có ngày".
- Đánh giá: **Cần làm rõ**. Loại: **chưa được dạy** (câu "tại sao"); phần "làm gì" thì đã được dạy tại chỗ.
- Tác động: bài 2.2 viết `>= '20261001'` và nói SQL Server tự chuyển kiểu ngầm. Ở 2.8 xuất hiện `CAST` ba lần mà không nói vì sao lần này phải ép kiểu. Người học dễ kết luận "ngày nào cũng phải CAST", hoặc "2.2 viết thiếu".
- Căn cứ: so dòng 54 với bài 2.2 (dòng 62) và 2.3 (dòng 62).
- Chưa xác minh: nếu bỏ `CAST` thì kết quả có đổi không (cần chạy). Người viết kiểm rồi mới chọn lý do; nếu không đổi kết quả thì không viết "bắt buộc".
- Đề xuất: một vế trong dòng `LineMap` hoặc đoạn `DATEADD`, nêu lý do đã kiểm.

**F4. Đoạn `GETDATE()`/ngày chốt và Hay nhầm 2 dễ dạy thành "đừng bao giờ dùng ngày hiện tại"**
- Câu gốc: "...nên báo cáo cần lặp lại không dùng hàm này" (dòng 62); Hay nhầm 2 "Dùng ngày giờ hiện tại cho báo cáo cần lặp lại".
- Đánh giá: **Cần làm rõ**. Loại: **đã dạy nhưng dễ hiểu lệch**.
- Tác động: chị Hạnh nói "từ hôm nay". Một báo cáo chạy hằng tuần để rà hợp đồng sắp hết hạn thường *muốn* mốc đổi theo ngày. "Báo cáo cần lặp lại" mơ hồ giữa "chạy định kỳ" và "chạy lại ra đúng số cũ". Người mới có thể rút ra quy tắc sai (mọi báo cáo phải gõ cứng ngày), trái nguyên tắc "không tuyệt đối hóa" ở mục 2 quy ước. Lý do thật của khóa học (kết quả cố định để so với bài, đề không đổi theo ngày) không được nêu.
- Ngoài ra "Azure dùng UTC, chậm hơn Việt Nam 7 giờ" dừng ở dữ kiện; hệ quả (sáng sớm giờ Việt Nam, ngày của máy chủ vẫn là hôm trước) không được nói, nên người mới chưa thấy vì sao quan trọng.
- Chưa xác minh: máy chủ khóa học thật sự trả giờ UTC (cần `SELECT GETDATE()` trên database khóa học).
- Đề xuất: phân biệt hai việc bằng một vế: ngày chốt khi cần số liệu tái lập/đối chiếu (như bài này), `GETDATE()` khi thật sự cần "hôm nay" (cảnh giác lệch múi giờ). Sửa Hay nhầm 2 theo cùng ý.

**F5. `DATEDIFF(day, ...)` cũng là đếm ranh giới, nhưng bài chỉ nói vấn đề với `year`**
- Câu gốc: "đếm số **ranh giới** của đơn vị đã đi qua, như bước sang năm mới" (dòng 68) và "không dùng chênh lệch năm hay số ngày chia `365`".
- Đánh giá: **Cần làm rõ**. Loại: **chưa được dạy** (câu "tại sao").
- Tác động: câu chính dùng chính `DATEDIFF(day, ...)`. Người mới sẽ hỏi "vậy `day` có bị lệch như `year` không, vì sao ở đây tin được số `10/23/24`?". Bài trả lời ngầm (phép trừ trong hình Excel khớp) nhưng không nói thẳng: với kiểu `date`, ranh giới của `day` là nửa đêm nên số đếm bằng đúng số ngày giữa hai mốc. Cụm "số ngày chia 365" xuất hiện lần đầu ngay trong lời cấm, không có lý do (năm nhuận).
- Căn cứ: đọc nguồn dòng 33, 41 và 68.
- Đề xuất: thêm một vế "với `day` trên cột `date` thì ranh giới chính là từng ngày, nên số đếm khớp phép trừ ở hình Excel"; hoặc bỏ cụm "số ngày chia 365" vì chưa ai nghĩ tới.

**F6. "số ngày còn lại" 10 so với cách đếm "31 ngày lịch"**
- Câu gốc: "còn `10`, `23`, `24` ngày" (dòng 180) cạnh "khoảng cách `30` ngày có `31` ngày lịch" (dòng 66).
- Đánh giá: **Cần làm rõ**. Loại: **đã dạy nhưng khó tìm** (định nghĩa nằm ở `LineMap`: "bằng 0 là kết thúc đúng ngày chốt").
- Tác động: hợp đồng kết thúc `31/10` còn `10` ngày theo hiệu hai ngày; nếu tính cả ngày chốt và ngày kết thúc như bài vừa làm với `31` ngày lịch thì ra `11`. Câu trả lời cho chị Hạnh không nhắc quy ước, người nhận có thể hiểu `10` là số ngày làm việc/nghỉ còn dùng được.
- Đề xuất: ở câu trả lời, thêm vế "(ngày kết thúc trừ ngày chốt, không tính cộng ngày chốt)".

**F7. Hợp đồng `NULL` được phát biểu như sự thật, không như quy ước dữ liệu**
- Câu gốc: "`NgayKetThuc` là `NULL` ở hợp đồng không xác định thời hạn" (dòng 77).
- Đánh giá: **Biên tập**. Loại: **đã dạy nhưng chưa nhất quán** với 2.5 và quy ước mục 3.
- Tác động: bài 2.5 nói "theo quy ước của bộ mẫu" và "ý nghĩa dựa vào quy ước dữ liệu". Ở đây câu khẳng định tuyệt đối; hợp đồng bị nhập thiếu ngày cũng thành `NULL` và cũng bị loại. Hệ quả cho báo cáo hết hạn là thật.
- Căn cứ: `ho-so-cong-ty.md` mục 4 xác nhận 25/55 hợp đồng `NULL` là không xác định thời hạn trong bộ mẫu.
- Đề xuất: "Trong bộ mẫu, `NgayKetThuc` là `NULL` nghĩa là không xác định thời hạn; ...".

**F8. Các câu hỏi "vì sao" phụ**
- "Vì sao không dùng `BETWEEN` vừa học ở 2.3?" Bài chưa trả lời; lý do thật (bài tập 3 cần đầu mở, cột có giờ cần `<`) có trong bài nhưng không nối với `BETWEEN`. **Biên tập**: một vế là đủ, hoặc bỏ qua vì `>=`/`<=` không sai.
- "Cột có giờ" (dòng 66): bài chưa từng có cột như vậy ở 1.3; là câu bên lề để trả nợ bài 2.3. Đúng thì giữ, nhưng ngắn hơn được: **Cần cắt** phần "tức trước `00:00` ngày `2026-11-21`".

### 2.3 Tiểu mục "SQL Server chạy câu này thế nào"

**Giữ được.**
- Lời dẫn nói rõ thứ tự là logic và `55` còn `3`.
- Bốn bước khớp nhau: 55 → 3 → 3 → 3; số cột nối được (4 cột ở FROM/WHERE, thêm `SoNgayConLai` ở SELECT, sau đó giữ nguyên).
- Bảng soi bước `WHERE` có ô `UNKNOWN` cho `HD2015-001` (giữ đúng quyết định đã duyệt). Tiêu đề có tên cột (`NgayKetThuc >= ngày chốt`, `NgayKetThuc <= mốc 30 ngày`); mã hồ sơ đều nằm trong 5 dòng ở Đầu vào; bốn trường hợp (NULL, vượt mốc trên, giữ, quá khứ) đủ để thấy mỗi dòng bị loại vì lý do khác nhau. Hàng cuối "20 / 13 / 3" tự nhất quán với dữ liệu: 30 dòng có ngày (55 − 25 NULL); 20 từ ngày chốt trở đi; 13 không vượt mốc 20/11 gồm 10 dòng trước ngày chốt và 3 dòng giữ.
- Thực hiện không lặp Kết quả; bước `FROM` gọn đúng mục 2.6; bước `ORDER BY` có cột `SoNgayConLai` trong Đầu vào.
- Câu trả lời đặt ngay sau `Result` và tách việc database làm với quyết định nghiệp vụ ("không phải số nhân viên cần gia hạn"); Hay nhầm 4 khớp (NV021, NV030 có nhiều hợp đồng).

**F9. Bước `SELECT`: Đầu vào thiếu `MaNV`, `NgayBatDau`; vùng sáng chỉ phủ dòng `DATEDIFF`**
- Câu gốc: Thực hiện "`SELECT` giữ bốn cột, `DATEDIFF` tính thêm số ngày..."; Đầu vào "Trích 2 trong 4 cột" (`MaHD`, `NgayKetThuc`); vùng sáng là dòng `DATEDIFF(...) AS [SoNgayConLai]`.
- Đánh giá: **Biên tập**.
- Tác động: nhỏ. Mục 2.6 viết "bước `SELECT` thấy cột sắp lấy"; ở đây hai trong bốn cột sắp lấy không hiện ở Đầu vào, và dòng `SELECT MaHD, MaNV, NgayBatDau, NgayKetThuc,` không được sáng dù lời Thực hiện nói về nó. Các bài khác (2.5, 2.3) đặt `inputColumns` cho bước `SELECT`.
- Đề xuất: đặt `inputColumns` gồm bốn cột và để `focus` bắt đầu từ dòng `SELECT`.

**F10. Số cột thật của `HopDong` không được nêu**
- Câu gốc: Kết quả bước FROM "`55` hợp đồng. Hình trích năm dòng và bốn cột..."; các thẻ ghi "+2 cột".
- Đánh giá: **Biên tập** (thấp).
- Tác động: các bài trước nói "48 hồ sơ, 12 cột"; ở đây không có số cột, nên "vẫn bốn cột trong hình" nối được nhưng người đọc không biết bảng còn bao nhiêu cột. Thẻ "+2 cột" có thể bị hiểu là bảng chỉ có 4 cột.
- Chưa xác minh: số cột thật (bài này không cho; 1.3 có `Ssms` của `HopDong` nhưng tôi không đếm).
- Đề xuất: nêu số cột thật nếu tiện, hoặc để nguyên vì đã nói "trong hình".

### 2.4 Hay nhầm, Ứng dụng, Ghi nhớ, tự kiểm tra

**Giữ được.** Hay nhầm 1 và 3 dùng đúng biến thể sai của chính câu lệnh (`HD2026-002`, `HD2024-008`). Ứng dụng 1 và 2 nói việc làm được nhờ chủ đề. Ba câu tự kiểm tra nằm sau `Memo`, trước Bài tập, và đáp án đã được giảng (Q1: 31 ngày lịch; Q2: ranh giới năm; Q3: `MONTH`/`EOMONTH`).

**F11. Đáp án Q3 dạy thêm điều bài chưa dạy**
- Câu gốc: "Cùng tháng sinh không tự có nghĩa sinh nhật đã qua trong tháng đó."
- Đánh giá: **Cần cắt** (hoặc đưa lên thân bài).
- Tác động: quy ước 4.5: không dùng tự kiểm tra để dạy bù. Câu này không xuất hiện trong thân bài; nó chỉ có thêm trong lời đề 2-8-1. Câu hỏi cũng không hỏi điều đó.
- Đề xuất: bỏ khỏi đáp án; nếu muốn giữ ý thì đặt một vế cạnh bảng `MONTH` ở thân bài.

**F12. Ghi nhớ có ô khó hiểu hoặc lẫn bên**
- Hàng 4, cột SQL: "Cùng mục đích với MONTH và EOMONTH trong SQL" tự quy chiếu, không nói gì mới (cả cột Excel và cột SQL cùng tên hàm); người chưa dùng `EOMONTH` trong Excel không biết Excel dùng thế nào. Hàng 1: cột Excel chứa lời khuyên của SQL ("báo cáo đối chiếu giữ ngày chốt"); cột SQL nói "`CAST(... AS date)` chỉ giữ ngày", trong khi thân bài dùng `CAST` để đổi chuỗi sang ngày, không để cắt giờ của `GETDATE()`. Hàng 3 nhắc `DATEDIF` mà thân bài chỉ nhắc một lần.
- Đánh giá: **Biên tập**.
- Đề xuất: viết lại hàng 4 thành "Excel: `MONTH`, `EOMONTH` cùng tên hàm | SQL: `MONTH(NgayKetThuc)` ra 11; `EOMONTH(...)` ra 2026-11-30"; hàng 1 chỉ nói đúng cái thân bài đã nói về `CAST`.

**F13. Ứng dụng 3 mơ hồ về mục đích**
- Câu gốc: "dùng `MONTH` cho danh sách tháng sinh và `EOMONTH` cho việc cần chốt tới cuối tháng".
- Đánh giá: **Biên tập**. "việc cần chốt tới cuối tháng" không nêu việc cụ thể; hai hàm chỉ được dạy qua một bảng nhỏ.
- Đề xuất: một ví dụ cụ thể (vd: lấy hồ sơ có hạn xử lý tới hết tháng) hoặc bỏ chữ "lập lịch".

**F14. Thuật ngữ "kỷ niệm", "thâm niên", "ngày lịch" chưa được nêu nghĩa**
- Câu gốc: "phân nhóm theo các mốc kỷ niệm" (dòng 79), "ngày kỷ niệm thật" (Hay nhầm 3), "thâm niên" (tiêu đề), "31 ngày lịch".
- Đánh giá: **Biên tập**. Người đọc có thể suy ra, nhưng "ngày kỷ niệm" lần đầu xuất hiện sau thân bài mà thân bài chỉ nói "đủ số năm"; "thâm niên" xuất hiện ở tiêu đề/goal nhưng ví dụ trong thân bài là độ dài hợp đồng (`NgayBatDau` của `HopDong`), chỉ trùng với ngày vào làm của NV036 ở dữ liệu này.
- Ghi chú: tiêu đề bài đã khóa theo quyết định đã duyệt, nên không đề xuất đổi; chỉ đề nghị thân bài dùng đúng một từ ("mốc đủ năm") rồi gắn một lần "ngày kỷ niệm" với nghĩa đó.

**F15. Một số cụm có thể cắt hoặc gộp (tải)**
- "số âm để lùi lại" (dòng 64): không bài nào ở 2.8 dùng. **Cần cắt** nếu cần rút.
- Bold lặp: `DATEADD`/`DATEDIFF` bold ở dòng 41 rồi bold lại cả mẫu cú pháp ở dòng 64, 68. **Biên tập**, ưu tiên thấp.
- Dòng 68 (74 chữ) gộp định nghĩa, ví dụ, quy tắc và lời cấm; chưa vượt 120 chữ nhưng là đoạn nặng nhất. Nếu thêm vế ở F5 thì tách thành hai đoạn.

### 2.5 Trả lời các câu hỏi "tại sao / để làm gì"

| Câu hỏi | Bài đã trả lời ở đâu |
|---|---|
| Vì sao lấy cả hai đầu? | Có: Tình huống và dòng 66 ("31 ngày lịch"); tự kiểm tra Q1 |
| Vì sao phải có mốc trên (`<=`)? | Có: Hay nhầm 1 |
| Vì sao dùng ngày chốt thay vì ngày hiện tại? | Một phần: dòng 62 và Hay nhầm 2, xem F4 |
| Vì sao cần `DATEADD`/`DATEDIFF` thay cho `+`/`-` của Excel? | Chưa: F2 |
| Vì sao `CAST` ở đây khi 2.2 không cần? | Chưa: F3 |
| Vì sao `DATEDIFF(year, ...)` ra 2 mà chưa đủ 2 năm, còn `DATEDIFF(day, ...)` thì dùng được? | Nửa đầu có (dòng 68, Q2); nửa sau chưa: F5 |
| Vì sao dòng `NULL` biến mất? | Có: dòng 77 và bảng soi `UNKNOWN` (nhưng xem F7) |
| Vì sao danh sách này không phải số người cần gia hạn? | Có: đoạn cuối phần trả lời, Hay nhầm 4 |
| Học `MONTH`/`EOMONTH` để làm gì trong bài này? | Có một phần: "Hai hàm bài tập sẽ dùng"; Ứng dụng 3 mơ hồ (F13) |

## 3. Bảng tiền đề từng bài tập

Cách làm do tôi tự xác định từ lời đề trước khi đối chiếu `answer`; `answer` chỉ dùng để kiểm xem cách đó đủ hay không. Tôi không chép đáp án.

| Đề | Cần kiến thức gì | Đã dạy ở đâu | Còn thiếu / vướng |
|---|---|---|---|
| **2-8-1** Tháng sinh của tháng kế tiếp | (a) tạo ngày sau chốt một tháng bằng `DATEADD(month, 1, ngày chốt)`; (b) lấy số tháng của ngày đó và của `NgaySinh` bằng `MONTH`; (c) so hai số trong `WHERE`; (d) ép ngày chốt từ chuỗi; (e) sắp mã tăng dần; (f) chọn đúng ba cột | (a) đơn vị `month` được kể ở dòng 64, chưa có ví dụ chạy; (b) bảng `MONTH` ở dòng 74 (trên cột `NgayKetThuc`); (c) `WHERE` và so sánh từ 2.2; (d) dòng 54 và `LineMap`; (e) 2.4; (f) 2.1 | Chưa thấy ví dụ **lồng** `MONTH(DATEADD(...))` hoặc đặt hàm lên cột bên trái `=` trong `WHERE`; người mới tự ghép được nhưng phải đoán. Lời đề nói "ngày cách ngày chốt một tháng" mà không nói trước hay sau; chỉ tiêu đề và tóm tắt ("kế tiếp") giải quyết (xem F16). Không đủ căn cứ để biết `NgaySinh` có `NULL` hay không (chưa xác minh). **Làm được, vướng nhẹ.** |
| **2-8-2** Đang làm và chưa đủ một năm | (a) lọc `TrangThai` bằng chuỗi Unicode; (b) ba điều kiện nối bằng `AND`; (c) `NgayVaoLam` không sau ngày chốt (`<=`); (d) mốc đủ năm `DATEADD(year, 1, NgayVaoLam)` phải **sau** ngày chốt (`>`); (e) trả lại mốc làm cột thứ ba; (f) sắp hai cột | (a) 2.2, 2.4; (b) 2.3; (c) dòng 66; (d) ý "so mốc tạo bằng `DATEADD`" ở dòng 68 và Q2; công thức đã cho trong đề; (e) 2.1 (`AS`), dòng 64; (f) 2.4 | Dấu `>` (nghiêm ngặt) chưa được gọi tên trong bài; suy ra từ `>=` ở 2.2. Phải lặp biểu thức `DATEADD` trong `WHERE` vì alias không dùng được ở đó (2.2 Hay nhầm 1 đã dạy). Đề tự nêu rõ biên (không lấy mốc đúng ngày chốt). **Làm được.** |
| **2-8-3** Kết thúc sau ngày chốt đến hết tháng | (a) lọc `HopDong`: `NgayKetThuc` sau ngày chốt; (b) mốc trên là cuối tháng chứa ngày chốt bằng `EOMONTH`; (c) cột `SoNgayConLai` bằng `DATEDIFF(day, ...)`; (d) loại `NULL`; (e) sắp hai cột | (a), (c), (e) câu chính của bài; (b) bảng `EOMONTH` dòng 75, nhưng chỉ trên cột `NgayKetThuc`; (d) dòng 77 và bảng soi; đề cũng nói rõ | `EOMONTH` chưa được thấy với đối số là ngày chốt (biểu thức `CAST`), chỉ với cột; người học phải suy ra. Dữ liệu của chính bài cho thấy không có hợp đồng nào kết thúc đúng `21/10`, nên chưa chắc đề phân biệt `>` với `>=` ở biên (xem F17, chưa xác minh). **Làm được.** |

**Kết luận về kiến thức làm đề:** từ bài 2.8 cùng 2.1–2.5, người học đủ khái niệm để làm cả ba đề. Chỗ vướng thực tế chỉ là ghép hàm lồng nhau (đề 1), `EOMONTH` trên biểu thức (đề 3) và lời đề 1 chưa nói rõ chiều "một tháng". Không thấy đề nào cần kiến thức của bài sau.

**F16. Lời đề 2-8-1 nói "cách ngày chốt một tháng" không rõ trước hay sau**
- Đánh giá: **Cần làm rõ**. Loại: **mơ hồ ở đề**, không phải thiếu kiến thức.
- Tác động: người chỉ đọc thân đề có thể hiểu tháng 9 (lùi một tháng); chỉ tiêu đề "kế tiếp" và tóm tắt cho biết là tháng sau. Bài số 2.8 đã khóa YAML (spec "Không làm"), nên xử lý ở thân bài: thêm một dòng ví dụ `DATEADD(month, 1, ngày chốt)` ra `2026-11-21` để người học biết chiều. Nếu người viết được phép sửa đề, đổi "cách ... một tháng" thành "một tháng sau".

**F17. Đề 2-8-3: biên `>` có thể không thấy qua dữ liệu (chưa xác minh)**
- Câu gốc: "Bỏ ngày chốt" trong đề; bảng soi của bài cho thấy chỉ có ba dòng nằm trong `21/10`–`20/11` và đều không rơi đúng `21/10`.
- Đánh giá: **Chưa xác minh**, chỉ là quan sát. Nếu đúng thì lời giải dùng nhầm `>=` vẫn cho đúng kết quả mẫu.
- Đề xuất: người viết kiểm bằng `SELECT` xem có hợp đồng nào kết thúc đúng `2026-10-21` không; nếu không thì ghi nhận giới hạn của bộ chấm, không cần đổi dữ liệu.

## 4. Ưu tiên

Không có mục **Cần sửa**: tôi không tìm thấy câu sai về kiến thức hay số liệu trong những gì đọc được (các phép tính ngày, số `10/23/24`, `31` ngày lịch, `2`/`2026-11-15`, `11`/`2026-11-30` đều khớp khi tính tay).

1. **Cần làm rõ, nên làm trước:** F4 (ngày chốt hay `GETDATE`, rủi ro dạy quy tắc tuyệt đối), F2 (Excel/SQL chưa đối xứng, thiếu "vì sao hàm"), F3 (`CAST` không lý do), F5 (`DATEDIFF(day)` an toàn vì sao), F6 (cách đếm ngày còn lại), F16 (đề 1 mơ hồ chiều).
2. **Cần cắt:** F11 (đáp án Q3 dạy bù), một phần F8 (`00:00 ngày 2026-11-21`), F15 ("số âm để lùi lại").
3. **Biên tập:** F1, F7, F9, F10, F12, F13, F14.
4. **Chưa xác minh (cần người viết chạy `SELECT`):** F3 (bỏ `CAST` có đổi kết quả không), F4 (`GETDATE()` trả UTC), F2 (hành vi trừ/cộng trực tiếp trên `date`), F10 (số cột `HopDong`), F17 (biên `21/10`), và toàn bộ số liệu của bài.

Về độ tải: các đoạn văn đều dưới 120 chữ, tiểu mục đầu dày nhưng chủ yếu vì ba ý phụ (`GETDATE`/UTC, cột có giờ, `NULL`) chen vào giữa chuỗi `DATEADD` → `DATEDIFF` → bảng hàm. Sau khi làm F4/F5, nên đổi thứ tự hoặc cắt bớt như F8/F15 để không đẩy thêm vào bài 20 phút.

## 5. Nguồn và giới hạn

- **Đã kiểm bằng đọc nguồn và HTML:** mọi khối `Excel`, `Sql`, `LineMap`, `RunFlow` (4 bước và nội dung drawer từ HTML), `Result`, `Memo`, `details`, lời đề của ba đề; tab bốn cột trong `data-copy` của khối `Sql` (HTML có tab thật, không lộ `\t`, không lộ backtick trong thân bài); `query`/`focus` bốn bước khớp nhau, riêng bước 3 chỉ sáng dòng `DATEADD`/`DATEDIFF` (F9); số liệu so với `ho-so-cong-ty.md` (55 hợp đồng, 25 `NULL`, ba hợp đồng kết quả).
- **Chưa thể xác minh vì không chạy SQL/không tương tác:** mọi con số lấy từ database (`55`, `20`, `13`, `3`, các ngày của từng `MaHD`), kết quả thật của ba đề, UTC của `GETDATE()`, tác động của việc bỏ `CAST`, hành vi trừ ngày trực tiếp, `NgaySinh` có `NULL` không, số cột `HopDong`; không kiểm sao chép/dán, bàn phím, mở drawer, hiển thị trên viewport, SSMS thật hay bộ chấm của trang bài tập.
- **Đánh giá là học thử, không phải xác nhận SQL/UI đã chạy đúng.** Việc xác minh kỹ thuật và quyết định xử lý từng mục theo 4.6 thuộc người viết.

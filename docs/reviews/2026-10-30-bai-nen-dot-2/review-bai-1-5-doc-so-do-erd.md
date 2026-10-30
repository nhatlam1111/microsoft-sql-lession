# Review bài 1.5 Đọc sơ đồ quan hệ (ERD)

## 1. Phạm vi, phiên bản, công cụ

- Bài: `src/content/lessons/1-5-doc-so-do-erd.mdx`, không có YAML. Source ở commit `2cc3293`, working tree sạch. File MDX sửa lần cuối 17:27, `dist/bai/1-5-doc-so-do-erd/index.html` dựng 17:28 cùng ngày, nên build khớp source.
- Đã đọc: `AGENTS.md`, `docs/quy-uoc.md` (kể cả mục 2.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài mẫu 1.1, các bài 1.2, 1.3, 1.4, mục "Khung bài nền" và "Nội dung từng bài" của spec `2026-10-30-level-1-foundation-lessons-design.md`, `Erd.astro`, `DbDiagram.tsx`, `db-diagram.ts`. Đọc HTML dựng của bài 1.5 và phần cây cột của bài 1.4.
- Model và công cụ: Claude Sonnet 5.5, đọc nguồn và HTML bằng công cụ đọc file và script đếm/phân tích văn bản. Không mở browser, không chạy SQL, không đọc `database/HRM_Demo.sql`, `.env`, không đọc report cũ.
- Độ dài: 557 từ theo cách đếm của `proseParagraphs` (tôi tự dựng lại đúng quy tắc của helper, chưa chạy `npm test`). Trong khung 500–700, còn dư khoảng 140 từ.
- Mục tiêu (frontmatter): "bạn tìm được đường đi và cặp cột liên kết trên sơ đồ, giải thích được vì sao một hồ sơ có thể xuất hiện nhiều dòng khi lấy dữ liệu qua bảng khác".

## 2. Rà theo thứ tự bài

### 2.1 Mở bài và "Tìm đường lấy dữ liệu trên sơ đồ"

Mở bằng hai lần dò trong Excel (mã nhân viên sang mã phòng, mã phòng sang tên phòng), rồi nói database cũng có hai bước như vậy. Đây là cầu nối đúng và dễ theo; không cần biết VLOOKUP. Ví dụ `NV001` / `KT` / `Kế toán` khớp hồ sơ công ty (NV001 thuộc KT, KT là Kế toán, kỳ 2026-08 và 2026-09 đều có lương cho NV001 vì mỗi kỳ 43 dòng và NV001 không thuộc nhóm bị loại).

Các câu hỏi tôi tự đặt:
- Vì sao phải đi qua ba bảng thay vì có sẵn tên phòng trong bảng lương? Bài không nói thẳng. Bài 1.2 mới nói "mỗi bảng một loại thông tin". Chấp nhận được, xem F12.
- ERD để làm gì? Câu "Sơ đồ cho bạn biết phải đi qua những bảng nào" trả lời, nhưng chỉ nói mục đích, chưa nói cách đọc (F1).

Đoạn định nghĩa ERD:
- "thực thể là loại đối tượng cần lưu" là vế không được dùng lại ở đâu trong bài (F10).
- Bảng, cột, khóa ngoại in đậm lại dù đã định nghĩa ở 1.2 và 1.4 (F9).
- Câu "Sơ đồ rộng nên có thể cuộn ngang" là thông tin thao tác hợp lý. Tôi không kiểm được cuộn thật (không mở browser).

### 2.2 "Đọc đường liên kết"

- "Đường tô xanh gồm hai cặp cột." Đối chiếu HTML: 4 cột sáng `PhongBan.MaPB`, `NhanVien.MaNV`, `NhanVien.MaPB`, `BangLuong.MaNV`, 3 hộp sáng, 2 đường sáng, các ký hiệu `1`/`∞` tương ứng sáng. Khớp với bảng và caption.
- "Tên phòng lấy theo phòng ban đang lưu hiện tại, không phải phòng tại kỳ lương." Đúng với hồ sơ công ty mục 1 (không lưu lịch sử chuyển phòng) và là bẫy thật. Xem F13.
- Bảng "Đường liên kết / Cặp cột / Thông tin tìm được": đúng và đủ dùng. Dấu `→` trong cột hai theo hướng khóa ngoại sang khóa chính, trùng cách Memo viết "khóa ngoại → khóa chính". Bài không nói thẳng nghĩa của dấu `→`, nhưng người học suy được.
- "Đầu có chấm tròn nằm ở cột khóa ngoại": đúng với mã (`DbDiagram.tsx` vẽ chấm ở đầu cột FK). Riêng đường tự tham chiếu `NhanVien.MaQuanLy` không có chấm; bài không nhắc, không cần.
- "Một bảng có thể dùng nhiều cột làm khóa: `BangLuong` có cả `KyLuong` và `MaNV` là `PK`, nghĩa là cả cặp không trùng." Đúng, nhưng có vấn đề về từ (F3).
- "Trên database khóa học, dùng sơ đồ trong bài hoặc nút Sơ đồ database ở trang bài tập; không tự cài/lưu sơ đồ vào database khóa học." Tên nút đúng (có trong `ExerciseWorkspace.tsx`). Vế cấm thì người mới không hiểu (F7).

Tiêu đề "Đọc đường liên kết" mở đúng cho bảng cặp cột và PK/FK; phần chỉ nơi xem sơ đồ và khóa nhiều cột nằm hơi lệch khỏi lời hứa của tiêu đề, nhưng không gây vướng.

### 2.3 "Quan hệ một-nhiều"

- Nội dung chính của bài nằm ở đây, nhưng ký hiệu `1`/`∞` chưa được gắn vào đầu khóa ngoại hay khóa chính (F1).
- "một phòng có thể có 0, 1 hoặc nhiều hồ sơ": đúng với khóa ngoại thông thường, nhưng sơ đồ không cho biết 0 hay không (F6).
- "mỗi hồ sơ thuộc đúng một phòng ban trong thiết kế này, vì `MaPB` không nhận `NULL`": xác minh được từ bài 1.4 build, cây cột ghi `MaPB (FK, varchar(10), not null)`. Đúng, có điều kiện "trong thiết kế này".
- "`NV021` có ba hợp đồng, nên lấy hồ sơ qua `HopDong` sẽ ra ba dòng": con số khớp hồ sơ công ty. Cụm "lấy hồ sơ qua `HopDong`" mơ hồ (F2).
- "Đây không phải lỗi; bạn cần xác định mỗi dòng kết quả là một người hay một hợp đồng." Tốt, có hành động cụ thể.
- Đoạn "Ở bài này chỉ cần…" có đủ. "kết bảng" xuất hiện lần đầu ở đây mà chưa có nghĩa (F2). Các bài trỏ tới đúng: `3-4-inner-join-vlookup`, `3-6-ket-nhieu-bang`.

### 2.4 Hay nhầm, Ứng dụng, Ghi nhớ

Xem F4, F5, F8, F11.

### 2.5 Bold, code, render

- Không lộ backtick hay `\n`/`\t` trong văn bản. Chuỗi backtick duy nhất trong HTML nằm trong script khởi tạo Astro, không phải lời bài.
- Dẫn chứng (`NV001`, `KT`, `Kế toán`, tên bảng/cột, `NULL`, `PK`, `FK`) đều dùng code. Memo bọc cả vế phải bằng kiểu code là hành vi chung của component (đã so với Memo bài 1.4), không phải lỗi riêng của bài này.
- Bold nhiều hơn mức "chọn lọc" (F9).
- Hình: là sơ đồ dựng từ schema của database khóa học, không phải ảnh tự vẽ, và có caption nói rõ phần tô xanh. Bài không ghi "đây là toàn bộ 7 bảng", nhưng không câu nào hứa vậy.

### 2.6 Bảng "vì sao / để làm gì"

| Câu hỏi tôi đặt | Bài trả lời ở đâu |
|---|---|
| ERD dùng để làm gì | Câu "Sơ đồ cho bạn biết phải đi qua những bảng nào" và Ứng dụng 1. Trả lời ở mức mục đích. |
| Cách tìm đường trên một sơ đồ lạ | Chỉ có qua một ví dụ đã tô sẵn; chưa có quy tắc nói thành lời (F1). |
| `1` và `∞` nằm ở đầu nào | Caption nói "1 là phía một, ∞ là phía nhiều", nhưng chưa nối với đầu khóa ngoại/khóa chính (F1). |
| Vì sao một hồ sơ ra nhiều dòng | Có: một người có nhiều hợp đồng nên mỗi hợp đồng thành một dòng. Còn thiếu chiều đi (F1). |
| Đường tô xanh có làm tăng số dòng không | Không có. Đây là so sánh tự nhiên nhất mà người học sẽ muốn (F1). |
| Vì sao tên phòng không theo kỳ lương | Nêu là sự thật, không nói lý do (F13, mức Giữ được). |
| Vì sao khóa chính của BangLuong gồm hai cột | Trả lời gián tiếp ở Hay nhầm 2 ("mỗi kỳ tối đa một dòng"). Đủ. |
| Vì sao kết quả không gộp ba hợp đồng vào một dòng | Không trả lời. Có thể để bài 3.x; không cần thêm ở bài nền. |

## 3. Bảng tiền đề từng câu tự kiểm tra

Tôi tự trả lời từng câu từ nội dung bài và các bài trước trước khi mở đáp án.

| Câu | Cần gì để trả lời | Dạy ở đâu | Thiếu gì |
|---|---|---|---|
| 1. Hộp và đường nối thể hiện gì? | Hộp là bảng cùng các cột; đường nối là khóa ngoại. | Đoạn định nghĩa ERD (hộp, cột, khóa ngoại) và bài 1.2, 1.4. | Không thiếu. Đáp án đủ. |
| 2. Lấy lương kèm tên phòng thì đi qua bảng và cặp cột nào? | Chuỗi `BangLuong → NhanVien → PhongBan` và hai cặp khóa ngoại → khóa chính. | Đoạn mở bài, caption hình, bảng cặp cột. | Đáp án chỉ liệt kê cặp cột, chưa nêu thứ tự bảng dù câu hỏi hỏi "bảng". Câu này lặp đúng ví dụ đã tô sẵn, nên kiểm trí nhớ hơn kiểm khả năng đọc một đường mới (F8). |
| 3. Vì sao lấy hồ sơ qua bảng hợp đồng có thể ra nhiều dòng cho cùng một mã? | Một người có nhiều hợp đồng; `HopDong` là phía nhiều; mỗi hợp đồng thành một dòng. | Đoạn "Đi sang phía nhiều…" và ví dụ `NV021`. | Cụm "lấy hồ sơ qua bảng hợp đồng" chưa được định nghĩa (F2). Bài chưa nối "phía nhiều" với dấu `∞` thấy trên hình (F1). |

Phần chưa có câu kiểm: đọc `1`/`∞`, khóa chính nhiều cột, lưu ý "phòng hiện tại". Quy ước chỉ đòi tối thiểu ba câu bao phủ mục tiêu, và bài đạt; ghi để biết, không đề nghị thêm.

Không câu nào dùng để dạy bù: cả ba đáp án nhắc lại điều đã giảng.

## 4. Finding

Mỗi finding gồm câu gốc, vị trí, đánh giá, tác động tới người mới, căn cứ, đề xuất.

### F1. Chưa nói quy tắc đọc đường và chiều đi (Cần làm rõ, ưu tiên cao)

- Câu gốc: "Sơ đồ cho bạn biết phải đi qua những bảng nào." (mở bài); "Đầu có chấm tròn nằm ở cột khóa ngoại, đầu kia tới cột khóa chính được tham chiếu." (Đọc đường liên kết); "Đi sang phía nhiều có thể làm tăng số dòng." (Quan hệ một-nhiều).
- Tác động: mục tiêu nói "tìm được đường đi" và "vì sao ra nhiều dòng", nhưng bài chưa cho người học ba mối nối cần có. (1) Cách tìm đường: từ bảng đang có đi theo các đường nối tới bảng chứa cột cần lấy; bài chỉ có một ví dụ tô sẵn. (2) `∞` nằm ở đầu khóa ngoại, `1` ở đầu khóa chính; caption chỉ nói "∞ là phía nhiều", câu về chấm tròn không nhắc `∞`. (3) Đường tô xanh đi từ phía nhiều sang phía một nên mỗi dòng lương vẫn ra một dòng; chỉ đi ngược (một sang nhiều) mới tăng dòng. Người học không có căn cứ để biết "đi sang phía nhiều" là hướng nào trên hình, và có thể hiểu nhầm đường tô xanh cũng làm tăng dòng. Chiều của mũi tên cũng đổi không báo: `BangLuong → NhanVien` đi từ nhiều sang một, trong khi phần một-nhiều đọc `1 — ∞` từ phía một.
- Căn cứ: `DbDiagram.tsx` đặt chấm và `∞` ở đầu khóa ngoại, `1` ở đầu khóa chính; HTML dựng: `BangLuong.MaNV`: phía nhiều, `NhanVien.MaNV`: phía một, `HopDong.MaNV`: phía nhiều.
- Đề xuất (gần như không tăng từ): sửa câu về chấm tròn thành "Đầu có chấm tròn và ký hiệu `∞` nằm ở cột khóa ngoại (phía nhiều); đầu có `1` tới cột khóa chính được tham chiếu." Ở đoạn "Đi sang phía nhiều" thêm một vế: "đường tô xanh đi từ nhiều sang một nên mỗi dòng lương vẫn ra một dòng; đi từ một sang nhiều, như từ `NhanVien` sang `HopDong`, mới tăng." Chỗ cắt: xem F7 và F10.

### F2. "Lấy hồ sơ qua HopDong" và "kết bảng" chưa có nghĩa (Cần làm rõ)

- Câu gốc: "nên lấy hồ sơ qua `HopDong` sẽ ra ba dòng" (Quan hệ một-nhiều); "Cú pháp kết bảng học ở bài 3.4" (Ở bài này chỉ cần…); "lấy dữ liệu qua bảng khác" (mục tiêu); câu tự kiểm tra 3.
- Tác động: bài chưa gọi tên hành động "lấy cột từ nhiều bảng, mỗi dòng khớp thành một dòng kết quả". "Lấy hồ sơ qua `HopDong`" có thể đọc là lấy hồ sơ nhân viên bằng cách xét bảng hợp đồng, hoặc lấy hợp đồng kèm hồ sơ; đúng là ghép mỗi hợp đồng với hồ sơ của người đó. "Kết bảng" là thuật ngữ chính thức của khóa (quy ước mục 2) nhưng lần đầu xuất hiện không có nghĩa tại chỗ, thuộc "thuật ngữ mới cần có nghĩa tại chỗ".
- Căn cứ: quy ước mục 2 và lời dặn review; ví dụ trong bài là cách nói của người viết, không phải thuật ngữ đã học.
- Đề xuất: đổi câu thành "khi lấy hồ sơ kèm hợp đồng (ghép mỗi hợp đồng với hồ sơ của người đó), `NV021` hiện ba dòng", và ở câu cuối "Cú pháp lấy dữ liệu từ nhiều bảng, gọi là kết bảng, học ở bài 3.4…". Đổi tương ứng câu tự kiểm tra 3 thành "lấy hồ sơ kèm hợp đồng".

### F3. "Cặp" có hai nghĩa trong ba câu liền nhau (Cần làm rõ)

- Câu gốc: "Đường tô xanh gồm hai cặp cột." và "Một bảng có thể dùng nhiều cột làm khóa: `BangLuong` có cả `KyLuong` và `MaNV` là `PK`, nghĩa là cả cặp không trùng."
- Tác động: "cặp cột" ở trên là hai cột của hai bảng (khóa ngoại và khóa chính được tham chiếu); "cả cặp" ở dưới là hai cột cùng một bảng đi với nhau. Người mới dễ gộp hai nghĩa. "Làm khóa" cũng chưa nói rõ là khóa chính; bài 1.4 chỉ định nghĩa khóa chính một cột ("từ chối hai dòng trùng mã"), nên người học có thể nghĩ mỗi cột `PK` phải không trùng riêng, tức `MaNV` không lặp trong `BangLuong`, mâu thuẫn với "hai kỳ lương".
- Căn cứ: bài 1.4 mục "Khóa chính xác định đúng một dòng"; HTML hình: `BangLuong` có `KyLuong PK`, `MaNV PK FK`.
- Đề xuất: "Khóa chính có thể gồm nhiều cột: `BangLuong` dùng cả `KyLuong` và `MaNV`, nên tổ hợp hai giá trị này không trùng giữa hai dòng, còn từng cột vẫn được lặp." Dùng "tổ hợp" thay "cặp" cho trường hợp này. Số từ gần như giữ nguyên.

### F4. "Một nhân viên có nhiều dòng lương" nói quá; "kỳ" và "một-một" chưa có ví dụ (Cần sửa)

- Câu gốc: Hay nhầm 2, "một nhân viên có nhiều dòng lương qua các kỳ, tối đa một dòng lương mỗi kỳ". Cũng "kết luận quan hệ một-một".
- Tác động: (a) Không phải nhân viên nào cũng có nhiều dòng: hồ sơ công ty ghi NV046 chỉ có lương kỳ 2026-09, NV041 chỉ có kỳ 2026-08, NV047/NV048 không có dòng nào. Câu viết như quy luật, trái yêu cầu "scope mọi con số/không hứa quá". (b) "Kỳ" chưa có giá trị mẫu; người học chưa biết `KyLuong` lưu giá trị như `2026-09`. (c) "Quan hệ một-một" chưa từng được định nghĩa trong bài, nên bullet lỗi phải đọc hiểu một khái niệm mới.
- Căn cứ: `docs/ho-so-cong-ty.md` mục 1, 3, 4; spec ghi Hay nhầm 1–2 ý.
- Đề xuất: "…`BangLuong.MaNV` chỉ là một phần của khóa `(KyLuong, MaNV)`: một nhân viên có thể có nhiều dòng lương qua các kỳ (như `2026-08`, `2026-09`), nhưng tối đa một dòng mỗi kỳ." Sau "một-một" thêm vế "(mỗi hồ sơ chỉ ứng với một dòng lương)". Giá trị `2026-09` đúng với `KyLuong char(7)` và hồ sơ công ty.

### F5. Hay nhầm 1: tiêu đề và nội dung không khớp (Cần làm rõ)

- Câu gốc: "Coi sơ đồ là toàn bộ luật nghiệp vụ. Sơ đồ chỉ thể hiện quan hệ đã khai báo bằng khóa ngoại; không có đường nối chưa chắc các bảng không liên quan."
- Tác động: tiêu đề nói về luật nghiệp vụ (cụm chưa được giải nghĩa, và sơ đồ cũng không có các ràng buộc như `UNIQUE`), còn phần giải thích chỉ nói về đường nối thiếu. Vế "không có đường nối chưa chắc … không liên quan" là phủ định kép, không có ví dụ để bám. Ví dụ có sẵn trên hình: `ChamCong` và `BangLuong` đều có `MaNV` nhưng không có đường nối trực tiếp; chúng liên quan gián tiếp qua `NhanVien`. Người mới không biết đây là lỗi hậu quả gì.
- Căn cứ: HTML hình: chỉ có đường `ChamCong.MaNV`, `BangLuong.MaNV`, `HopDong.MaNV`, `DonNghiPhep.MaNV` về `NhanVien`.
- Đề xuất: đổi tên lỗi cho đúng nội dung và thêm ví dụ, như "**Cho rằng hai bảng không đường nối là không liên quan.** `ChamCong` và `BangLuong` không nối trực tiếp, nhưng cùng liên quan đến `NhanVien` qua `MaNV`; sơ đồ chỉ vẽ quan hệ đã khai báo bằng khóa ngoại." Nếu muốn giữ ý "luật nghiệp vụ" thì phải giải nghĩa; tôi đề nghị bỏ.

### F6. "0, 1 hoặc nhiều" không đọc được từ sơ đồ (Cần làm rõ)

- Câu gốc: "một phòng có thể có 0, 1 hoặc nhiều hồ sơ nhân viên" (và lặp ở Memo).
- Tác động: ký hiệu `1`/`∞` trên hình không phân biệt "0 hay nhiều" với "ít nhất 1"; con số 0 đến từ cách khóa ngoại hoạt động (khóa ngoại không bắt phòng nào phải có người). Bài 1.4 chưa nói điều này tường minh. Người học phản biện được ngay: "sơ đồ đâu có ghi phòng được rỗng".
- Căn cứ: `DIAGRAM_LEGEND` chỉ nói "1 là phía một, ∞ là phía nhiều"; chỉ có khóa ngoại được khai báo. Dữ liệu: cả 6 phòng đều có hồ sơ, nên "0" không thấy trong dữ liệu mẫu (không cần kiểm DB để biết điều này, hồ sơ công ty mục 2).
- Đề xuất: "một phòng có thể có nhiều hồ sơ; khóa ngoại không bắt phải có ít nhất một" (cùng độ dài). Hoặc giữ "nhiều" và bỏ "0, 1 hoặc" cho khớp việc sơ đồ chỉ nói "nhiều".

### F7. Vế cấm "không tự cài/lưu sơ đồ" không có lý do và lạc khỏi mạch (Cần cắt)

- Câu gốc: "Trên database khóa học, dùng sơ đồ trong bài hoặc nút **Sơ đồ database** ở trang bài tập; không tự cài/lưu sơ đồ vào database khóa học."
- Tác động: người học chưa biết có công cụ vẽ sơ đồ nào có thể "cài" hay "lưu" vào database, nên vế cấm chỉ gây hoang mang. Bài không nói vì sao. Đoạn cũng nằm giữa phần giải thích PK/FK và phần một-nhiều, không phục vụ mục tiêu đọc sơ đồ. Phần chỉ nơi xem sơ đồ thì hữu ích (đến bài 1.6 và 2.1 còn trỏ lại nút này).
- Căn cứ: tên nút đúng (`ExerciseWorkspace.tsx`); bài 1.1–1.4 chưa nhắc công cụ vẽ sơ đồ nào khác. Nguyên tắc an toàn (database dùng chung chỉ đọc) có ở quy ước mục 5, nhưng việc viết ra ở bài này mà không giải thích thì chỉ có tác dụng cảnh báo mơ hồ. Tôi chưa biết cấu hình thực tế của SSMS nên không xác minh gì thêm.
- Đề xuất: cắt vế sau dấu chấm phẩy, còn "Muốn xem lại sơ đồ khi làm bài, dùng nút **Sơ đồ database** ở trang bài tập." Tiết kiệm khoảng 10–12 từ để dành cho F1. Nếu người làm khóa học vẫn muốn giữ lời cấm, thêm một vế lý do (thao tác đó ghi vào database dùng chung).

### F8. Ghi nhớ và câu tự kiểm tra 2 chưa phủ phần thứ hai của mục tiêu (Cần làm rõ)

- Câu gốc: Memo hàng 3 "Dò mã NV rồi dò mã phòng | BangLuong → NhanVien → PhongBan"; hàng 1 "Dò mã qua các sheet | Đọc đường khóa ngoại → khóa chính trên ERD".
- Tác động: hàng 1 và hàng 3 cùng nói chuyện đi theo đường; điều quan trọng nhất của nửa sau mục tiêu (đi sang phía nhiều làm tăng dòng) không có trong Ghi nhớ. Người học ôn bằng Ghi nhớ sẽ không nhớ được điều này.
- Đề xuất: giữ hàng 1, đổi hàng 3 thành "Một mã nhân viên ở nhiều dòng hợp đồng | Đi từ một sang nhiều: một hồ sơ có thể ra nhiều dòng". Hàng 2 chỉnh theo F6.
- Câu tự kiểm tra 2: câu hiện lặp đúng ví dụ đã tô sẵn và đáp án thiếu thứ tự bảng. Có thể đổi thành câu chuyển: "Muốn lấy hợp đồng kèm tên phòng, đi qua bảng và cặp cột nào?" (đáp án `HopDong` → `NhanVien` → `PhongBan`, qua `MaNV` rồi `MaPB`). Câu này trả lời được từ hình và quy tắc ở F1, kiểm đúng kỹ năng "tìm đường". Tôi không cho đây là bắt buộc.

### F9. In đậm nhiều hơn "có chọn lọc" (Biên tập)

- Câu gốc: "mỗi hộp là một **bảng**, trong hộp có các **cột**, đường nối thể hiện **khóa ngoại**"; "**`PK`** là khóa chính, **`FK`** là khóa ngoại như ở bài 1.4".
- Tác động: bảng, cột (1.2) và khóa ngoại, PK, FK (1.3, 1.4) đã được định nghĩa, nên in đậm lần nữa làm loãng điểm nhấn. Quy ước 2.2 chỉ in đậm ở chỗ định nghĩa và đối chiếu. Chỗ cần đậm thật sự là ERD, sơ đồ thực thể–quan hệ, một-nhiều.
- Đề xuất: bỏ bold ở bảng, cột, khóa ngoại, PK, FK; giữ code cho PK/FK.

### F10. Vế "thực thể" không dùng lại; ba cách gọi sơ đồ (Cần cắt, nhẹ)

- Câu gốc: "**sơ đồ thực thể–quan hệ**; thực thể là loại đối tượng cần lưu, như nhân viên hoặc phòng ban." Tiêu đề và mục tiêu gọi "sơ đồ quan hệ", và còn nút "Sơ đồ database".
- Tác động: "thực thể" không xuất hiện ở đâu nữa và bài cũng không nói thực thể là bảng. Tên đầy đủ của ERD giúp nhận diện từ viết tắt, nhưng việc giải nghĩa "thực thể" thêm một từ mới cho người mới mà không có việc làm. Có ba tên gần nhau (sơ đồ quan hệ, sơ đồ thực thể–quan hệ, Sơ đồ database) mà chưa nói chúng là một.
- Đề xuất: cắt vế "thực thể là loại đối tượng cần lưu, như nhân viên hoặc phòng ban" (khoảng 14 từ), giữ "ERD (Entity–Relationship Diagram) là sơ đồ quan hệ giữa các bảng". Có thể giữ "thực thể–quan hệ" nếu người làm khóa học muốn khớp tên gốc.

### F11. Ứng dụng 1 chung chung; Ứng dụng 2 "dự đoán" hơi quá (Biên tập)

- Câu gốc: "**Tìm đủ nguồn cho báo cáo:** xác định bảng chứa dữ liệu và cặp cột liên kết trước khi viết câu lệnh." / "**Dự đoán số dòng kết quả:** nhận ra một nhân viên có nhiều hợp đồng hoặc kỳ lương để chọn đúng ý nghĩa của mỗi dòng báo cáo."
- Tác động: ý 1 đúng chủ đề nhưng chưa có ví dụ công việc cụ thể; quy ước 2.3 đòi mục đích hoặc ví dụ. Ý 2 có giá trị thật (đây là bẫy báo cáo hay gặp), nhưng bài chỉ dạy nhận ra phía có thể lặp dòng, không dạy dự đoán số dòng.
- Đề xuất: ý 1 thêm ví dụ ngắn, như "lương kèm tên phòng cần ba bảng `BangLuong`, `NhanVien`, `PhongBan`". Ý 2 đổi "Dự đoán số dòng kết quả" thành "Nhận ra dòng bị lặp".

### F12. "Lần đầu / lần sau" dễ đọc thành hai lần khác nhau (Biên tập)

- Câu gốc: "Với `NV001`, lần đầu được `KT`, lần sau được `Kế toán`."
- Tác động: "lần sau" trong tiếng Việt thường là "lần kế tiếp/lần khác", trong khi ý ở đây là hai phép dò liên tiếp trong cùng một lần lấy. Người học nhanh vẫn hiểu từ ngữ cảnh, nhưng câu này đứng ngay sau hai "dò", nên cụm "lần dò thứ nhất / thứ hai" sẽ rõ hơn.
- Đề xuất: "Với `NV001`, dò lần một được `KT`, dò lần hai được `Kế toán`." Cũng có thể giải thích luôn vì sao không có tên phòng sẵn trong bảng lương bằng "tên phòng chỉ được lưu một nơi, ở `PhongBan`", nhưng chỉ khi còn chỗ.

### F13. Giữ được: "Tên phòng lấy theo phòng ban đang lưu hiện tại, không phải phòng tại kỳ lương."

- Nội dung đúng với hồ sơ công ty mục 1 (không lưu lịch sử chuyển phòng) và chặn một hiểu nhầm thật: người đọc báo cáo có thể nghĩ phòng gắn với kỳ lương. Chỉ thiếu lý do, có thể thêm một vế: "vì `NhanVien` chỉ lưu một mã phòng cho mỗi người". Đoạn đứng một mình 23 từ nên đoạn tốt hơn nếu gắn vào dưới bảng; không bắt buộc.

### F14. Giữ được: mở bài bằng hai lần dò Excel và bảng cặp cột

- Mở bằng hai phép dò quen thuộc, nhắc đúng bước tìm mã phòng rồi tên phòng, không đòi biết VLOOKUP. Bảng ba cột "Đường liên kết / Cặp cột / Thông tin tìm được" đủ và hữu ích, cho thấy rõ khóa ngoại → khóa chính và thông tin lấy được. Không nên thu gọn.

### F15. Giữ được: ý chính của Hay nhầm 2

- Thấy `PK` và `FK` cùng ở `BangLuong.MaNV` rồi kết luận một-một là hiểu nhầm có thật, vì bài 1.4 vừa dạy khóa chính "không trùng". Câu trả lời bằng khóa `(KyLuong, MaNV)` đúng với hình (`KyLuong PK`, `MaNV PK FK`). Chỉ cần sửa theo F3 và F4, không cần đổi ý.

## 5. Ưu tiên

1. F1: quy tắc đọc đường và chiều đi (ảnh hưởng trực tiếp tới cả hai nửa của mục tiêu).
2. F4 (nói quá, sửa nhẹ), F3 (từ "cặp"), F5 (Hay nhầm 1), F6 (0, 1 hoặc nhiều), F2 (lấy hồ sơ qua, kết bảng).
3. F8 (Ghi nhớ không phủ phần nhiều dòng), F7 (cắt vế cấm).
4. Biên tập nhẹ: F9, F10, F11, F12.

Cân đối độ dài: hiện 557 từ. Thêm khoảng 40–50 từ cho F1, F2, F3, F4, F5 và cắt khoảng 25–30 từ ở F7, F10, F9 (bold không đổi số từ). Kết quả khoảng 570–580 từ, còn xa mốc 700.

## 6. Nguồn và giới hạn

- Kiểm theo nguồn và HTML. Chưa xác minh: cuộn ngang của sơ đồ, màu thực của "tô xanh" (CSS dùng biến `--accent`), khoảng cách và chồng lấn nét vẽ trên hình (đặc biệt đường tự tham chiếu `MaQuanLy` và đường `HopDong`), thời gian đọc 7 phút bằng đồng hồ, copy/paste, bàn phím.
- Số liệu `NV001`, `NV021`, `KT`, `NV046` đối chiếu với `docs/ho-so-cong-ty.md`, không đối chiếu với database. Việc `MaPB` không nhận `NULL` đối chiếu qua cây cột của bài 1.4 build; không tự kiểm.
- Cấu trúc sơ đồ (7 bảng, cột, PK/FK) đọc từ HTML dựng của bài. Tôi không mở `HRM_Demo.sql`, dù `Erd.astro` import file này để dựng hình.
- Khi tìm các chỗ nhắc tới "Sơ đồ database" bằng lệnh grep trên `src` và `docs`, đầu ra có hiện mấy dòng trích từ `docs/reviews/…` và các spec cũ của khóa học. Tôi không mở file đó, không dùng các dòng này để lập finding; nhận xét ở F7 viết dựa trên việc người mới chưa được dạy các công cụ vẽ sơ đồ, tôi đã soạn ý này trước khi chạy grep.
- Thư mục `temp/review/2026-10-30-bai-nen-dot-2` đã có sẵn một report của bài khác; tôi không đọc.
- Không sửa source, test, docs, index, HEAD hay branch. Chỉ ghi file report này.

## 7. Kết luận

Bài ngắn, đúng, bám Excel tốt, các con số khớp hồ sơ công ty, không lộ markup khi dựng. Người học đọc xong chắc chắn nói lại được ví dụ `BangLuong → NhanVien → PhongBan` và hai cặp cột, và hiểu lý do `NV021` ra ba dòng. Còn vướng: chưa có quy tắc nói thành lời để tự tìm đường mới, chưa nối ký hiệu `∞` với đầu khóa ngoại và chiều đi tăng dòng, từ "cặp" dùng hai nghĩa, và một câu Hay nhầm nói quá (nhân viên "có nhiều dòng lương"). Kiến thức hiện đủ cho câu tự kiểm tra 1 và 2 (ở mức nhớ ví dụ), câu 3 trả lời được nhưng chưa chắc hiểu "phía nhiều" là phía nào trên hình. Đây là đánh giá học thử, không xác nhận SQL hay giao diện đã chạy đúng.

## 8. Thống kê finding

| Mức | Số lượng | Mã |
|---|---|---|
| Cần sửa | 1 | F4 |
| Cần làm rõ | 6 | F1, F2, F3, F5, F6, F8 |
| Cần cắt | 2 | F7, F10 |
| Biên tập | 3 | F9, F11, F12 |
| Giữ được | 3 | F13, F14, F15 |

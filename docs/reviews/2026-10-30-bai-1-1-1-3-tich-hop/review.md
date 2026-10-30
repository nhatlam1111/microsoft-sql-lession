# Review tích hợp: mạch giữa các bài sau khi sửa 1.1 và 1.3 (30/10/2026)

## 1. Phạm vi, phiên bản và công cụ thực tế

- **Vai trò:** agent mới, Claude Sonnet 5.5 (kế thừa cấu hình giao việc), học thử như Business Consultant khó tính; không tạo agent khác.
- **Base:** HEAD `f5f6f2f7899dc30976d1d797559cffbc87366cdb`. **Head:** working tree chưa commit.
- **Source đã đối chiếu:** tôi tự tính lại sha256, khớp gói giao việc: `1-1-database-la-gi.mdx` = `bc4f4490…b43c`, `1-3-bang-cot-kieu-du-lieu.mdx` = `53099234…88cd`.
- **Build:** `dist/bai/1-1-…/index.html` và `dist/bai/1-3-…/index.html` ghi 16:17:55; source 1.1 sửa 16:17:34, 1.3 sửa 15:38, nên bản build sau source. Tôi chỉ grep nội dung HTML (các câu mới có, các câu cũ như "báo cáo chốt" không còn, ảnh `1-3-database-table` có trong `dist/_astro`, không lộ backtick). **Không mở browser**, không kiểm giao diện, copy/paste, bàn phím.
- **Đã đọc đủ:** bài 1.1 đến 1.6; `docs/quy-uoc.md` (kể cả 4.5, 4.6), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`; diff `git diff HEAD` của 1.1, 1.3, `tests/content.test.ts`, `ho-so-cong-ty.md`; hai spec "one-story" và "reorder" (spec 1.1 đọc đủ; spec 1.3 chỉ đọc qua các dòng Grep trích); hai `verification.md` của tác giả; `database/HRM_Demo.sql` (chỉ đối chiếu tên cột, kiểu); component `Ssms.astro` để biết hình Object Explorer hiện gì.
- **Phần tự kiểm của tôi:** grep mọi chỗ trỏ về bài 1.1/1.3 trong `src/` và `docs/`, đối chiếu câu trỏ với nội dung đích, đối chiếu kiểu/NULL với script, đối chiếu mã `NV049`–`NV052` và tên nhân vật với hồ sơ công ty, đọc từng assertion mới trong test.
- **Phần chỉ là hồ sơ của tác giả (không tự kiểm lại):** `npm test` 329/329, `npm run check`, `npm run build` 132 trang, `check:dist` 1998 liên kết, kiểm ở 1280×800/1024×720. Tôi không chạy lại các lệnh này vì quy định giao việc chỉ cho phép ghi một report; kết quả của chúng ghi nhận là "tác giả báo", không phải "tôi xác nhận".
- **Chưa xác minh được trong lượt này:** mọi kết quả SQL Server thực tế trong 1.3 (`'01/02/2024'` thành `2024-01-02`, `'2024.02.01'` đổi được, `'9.610.000'` bị từ chối, làm tròn `9610001`/`21.3`, tràn số). Không có database/SQL; hồ sơ tác giả cũng ghi "chưa chạy riêng" cho nguyên nhân hai dấu chấm. Các giá trị này giữ từ lượt trước; lượt này chỉ đổi cách giải thích.
- Tôi có chạy `ls temp/review` để biết thư mục đích đã có chưa, chỉ thấy tên thư mục, không mở file nào.

## 2. Kết quả từng mục

### Mục 1. Kiến thức nền và thuật ngữ giữa các bài

Đã truy từng thuật ngữ. Điểm đáng nói chỉ có "câu ghi" (F1), vế "ngay lúc lưu" (F2) và cầu nối "luật dữ liệu" sang "ràng buộc" (F3).

| Thuật ngữ | Định nghĩa lần đầu | Dùng trước khi định nghĩa? |
|---|---|---|
| workbook, sheet, database, SQL Server, SQL, T-SQL, bảng, dòng, cột | 1.1 (in đậm, dòng 63–81) | Không. 1.2:35 nhắc lại đúng ý của 1.1 |
| bản ghi | 1.1:70 | Không dùng ở 1.2, 1.3; dùng lại ở 1.4:115 (Ứng dụng) với "hồ sơ" ngay cạnh, đọc được |
| luật dữ liệu | 1.1:94 | 1.3 và 1.4 dùng "luật" nối tiếp ("luật chặn", "luật kiểm khi ghi") |
| kiểu dữ liệu | 1.3:53 | 1.1:106 và 1.2:92 chỉ trỏ "bài 1.3" |
| `NULL`, `NOT NULL` | 1.3:62 | 1.2:92 (chú thích hình) nhắc `NULL` kèm "bài 1.3 và 1.4 giải thích kỹ hơn": có chỉ dẫn. 1.1 không còn nhắc `NULL` (đã kiểm cả file) |
| `PK`, `FK` (nhãn trong ngoặc) | 1.3:62 nêu nghĩa nhãn, "học ở bài 1.4"; 1.4:56 | 1.2:92 nhắc "khóa" với chỉ dẫn. Hình `HopDong` ở 1.3 có `FK`; câu giải nhãn đứng trước hình |
| khóa chính, khóa ngoại | 1.4:33, 1.4:50 | 1.1:106 và 1.3:62 chỉ trỏ tên kèm số bài |
| ràng buộc (constraint) | 1.4:33 | 1.1:106 và 1.3:99 chỉ nhắc "bài 5.2". Xem F3 |
| **câu ghi** | **Không bài nào định nghĩa nữa** | 1.4:52 và 1.4:62 dùng. Xem F1 |
| chuyển kiểu ngầm, `DATEFORMAT`, phiên SQL, chuỗi | 1.3:67, 82–84 | Trước đó không dùng. Test cũng khóa thứ tự này |
| Data Validation | 1.1:112 (kèm nghĩa trong câu), in đậm lại ở 1.3:49 | Có nghĩa tại chỗ ở cả hai nơi |
| Object Explorer, Columns | 1.2:90–94 | 1.3, 1.4, 1.5 dùng sau khi đã dạy |

1.4 mở đầu (dòng 17–37) **không** giả định điều gì chỉ có trong phần đã gỡ khỏi 1.1: không nhắc `NV005` lặp, không nhắc "Ke toan", không dùng định nghĩa khóa của 1.1. Nó tự định nghĩa khóa chính, khóa ngoại. Các từ nền nó dùng (dòng, bảng, danh mục, `NULL`, "khai báo") đều đã có ở 1.1–1.3. Đây là điểm tốt.

1.3 không còn dạy `char`, `time`, byte và không dùng "bản ghi": đúng (grep `\bchar\(`, `time(0)`, `\bbyte\b` trong 1.3 và dist đều 0 kết quả). 1.1 không còn dạy khóa chính, khóa ngoại, ràng buộc, `câu ghi`, `NULL`: đúng ở thân bài; các tên chỉ còn trong câu trỏ ở dòng 106, sau "Ở bài này chỉ cần".

### Mục 2. Các câu trỏ về bài 1.1 và 1.3

Đã Grep mọi chỗ trong `src/` (bài, exercise, component, page). Không có exercise YAML hay trang nào trỏ về 1.1/1.3.

| Chỗ trỏ | Điều nó hứa | Có tìm thấy đúng không |
|---|---|---|
| 1.2:35 "Nhắc lại bài 1.1" | database, SQL Server | Có (1.1:63, 74) |
| 1.2:92 chú thích hình | `NULL`, kiểu, khóa ở 1.3 và 1.4 | Có |
| 1.1:106 | kiểu 1.3; khóa 1.4; ràng buộc 5.2 | Có; 5.2 tên "Ràng buộc: Data Validation của database" |
| 1.1:100, 126 | lịch sử ở 6.6 | Có (6.6 Temporal table) |
| 1.3:53 "đã gặp ở bài 1.1" | bảng `NhanVien` | Chỉ có tên và ánh xạ sheet–bảng (1.1:70); xem F5 |
| 1.3:62 | `PK`, `FK` học ở 1.4 | Có (1.4:56) |
| 1.3:99 | 2.2 chuyển kiểu ngầm; 2.5 `NULL`; 2.7 Unicode; 5.2; 5.5 | Có (2.2:59, 2.5, 2.7:86, 5.2, 5.5) |
| 1.3:72 "chi tiết độ dài ở bài 2.7" | độ dài của `nvarchar(100)` | **Không có**: 2.7 dạy `LEN` và Unicode, không nói giới hạn độ dài cột. Câu có từ trước lượt này; xem F7 |
| 2.2:59 "đã gặp ở bài 1.3" | chuyển kiểu ngầm | Có, rõ (1.3:82, bảng ô `C2`/`C3`) |
| 2.1:52 `N'Trần Thị Mai'` (bài 1.3) | tiền tố `N` | Có (1.3 Hay nhầm 3) |
| 2.5:78 "đã gặp ở bài 1.3" | chuỗi rỗng với `NOT NULL` | Có (1.3 Hay nhầm 2). Câu tự kiểm về `HoTen NOT NULL` đã bị gỡ khỏi 1.3 nhưng Hay nhầm 2 vẫn còn nên chỉ dẫn vẫn đúng |
| 2.5:92, 2.5:103 | chuyển kiểu ngầm, kiểu | Thuật ngữ có; ca `COALESCE` (`varchar` thành `nvarchar`) rộng hơn điều 1.3 dạy; xem F7 |
| 3.1:81 "xem kiểu số ở bài 1.3" | `decimal(p,s)` | Có (1.3:74–76) |
| 3.8:46 "(bài 1.3)" | chuyển kiểu ngầm về kiểu chung | Thuật ngữ có; "kiểu chung của hai nhánh" 1.3 không dạy; xem F7 |
| 2.7:105 | kiểu và chuyển kiểu | Có |
| 2.9:79 "như cách chọn kiểu ở bài 1.3" | trộn chữ và số | Lỏng; xem F7 |
| 1.5:57, 1.5:68 | `PK`/`FK` ở 1.4; xem Columns như 1.3 | Có |
| 1.4 các chỗ `NULL` | `NULL` đã học | Có (1.3:62) |

Cách xem Columns: 1.2:90, 94 dạy trước; 1.3:62 dạy đọc nhãn; không bị đứt.

### Mục 3. Nhất quán chuyện kể

- **Quân, `NV052`, phòng cũ:** 1.1 ghi `NV052`, `Trương Anh Quân`, `IT` (bản chị Hạnh) và `Kinh doanh` (bản chị Thảo). `ho-so-cong-ty.md` dòng 101, 105, 123 khớp. Đã tách khỏi `NV048 Đỗ Minh Quân` (IT, vào 05/10/2026) bằng họ tên đầy đủ và dòng 81, 105 của hồ sơ. Đây là cải thiện rõ so với bản cũ.
- **`NV049`–`NV052` không đụng 48 hồ sơ:** đối chiếu `HRM_Demo.sql` (mã cuối là `NV048`, dòng 188) và danh sách mục 3 của hồ sơ: không trùng mã, không trùng họ tên (Lý Thu Hằng, Mai Văn Tâm, Đinh Gia Bảo, Trương Anh Quân đều mới). `Kinh doanh`, `IT`, `Kế toán` có trong `PhongBan` (1.2:108–115). Nhưng hồ sơ công ty **không ghi** `NV049`–`NV051` (F10).
- **Giả định 1.1 với hồ sơ và bài 1.2:** dòng "Các nhân vật là giả định, không phải hồ sơ trong bộ dữ liệu mẫu" khớp mục 5 của hồ sơ. Câu "bảng `NhanVien` của bộ mẫu chỉ giữ phòng hiện tại" khớp hồ sơ dòng 11. Một chỗ mơ hồ nhỏ đã cân nhắc, để ở mục 4 phần "chưa kết luận" (công ty đã có database hay đang đề xuất).
- **"Luật dữ liệu" (1.1) sang "ràng buộc" (1.4):** ba ví dụ của 1.1:94 (cột ngày chỉ nhận ngày, mã không trùng, mã phòng có trong danh mục) khớp với bài 1.3, 1.4 và 1.4 vẫn dùng từ "luật". Nhưng không câu nào nói "luật dữ liệu" chính là "ràng buộc"; chỉ 1.1:106 ngầm xếp "các loại ràng buộc khác" cạnh kiểu và khóa. Xem F3.

### Mục 4. Tài liệu chung có còn nói khác bài không

- `quy-uoc.md:38` còn "ba tiểu mục của bài 1.1"; 1.1 hiện có bốn (test `content.test.ts:320–325` khóa bốn). Xem F9.
- `quy-uoc.md:5`, `lesson-template.md:3`, `CLAUDE.md:11` gọi 1.1 là bài "đã duyệt" làm mẫu, ghi mốc 20/10; bài đã viết lại 30/10 và theo hồ sơ tác giả chưa có reviewer từng bài đọc lại bản cuối. Xem F9.
- `quy-uoc.md:27`, `:41`, `lesson-template.md:31` (tiêu đề "Từ hai bản Excel đến một nguồn dữ liệu chung" vẫn đúng với 1.1:33) không mâu thuẫn bài.
- `ho-so-cong-ty.md` dòng 102: "Bên IT … 1.2, 1.3, 1.4" nhưng 1.1:124 (Ứng dụng) giờ có "hỏi IT"; dòng 125 (mục 7 bài 1.3) không nói `NV049`–`NV051`. Xem F10.
- Spec cũ chỉ là lịch sử, không tính.

### Mục 5. Test

Các thay đổi đã đọc từng assertion (`tests/content.test.ts`):

- **Không thấy nới bảo vệ vô lý.** Phần bị bỏ đều gắn với nội dung đã gỡ có chủ ý: `byte`, `dấu cách ở cuối` (1.3:170–171); `Khi ràng buộc đang bật`, `thêm, sửa hoặc xóa dữ liệu`, `mỗi mã tối đa một dòng`, `một ngày hợp lệ vẫn có thể sai hồ sơ`, `constraint` (1.1:265–267); 1.1 khỏi test ngày căn phải (`:304`) vì hình mới không có ngày; `không phải ô chọn trên màn hình` khỏi 1.1 (`:409`) vì câu đó đã được `:412` giữ ở 1.4. Các `absent` cũ giữ nguyên.
- **Có thắt thêm đúng chỗ:** 1.1 không được nhắc khóa chính, khóa ngoại, ràng buộc, `constraint`, `câu ghi` trước "Ở bài này chỉ cần" (`:343–346`); 1.3 không có `char(`, `time(0)`, `byte` (`:380–383`); thứ tự dạy trước/dùng sau ở cả hai bài.
- **Còn thiếu:** F11 (định nghĩa chuyển sang 1.4 không có test; `2099-03-01` hợp lệ nhưng sai ở 1.3 không có test; test 1.1 không chặn `NULL`; không test cấm "bản ghi" ở 1.3). **Biên tập:** F12 (khóa cứng tiêu đề).
- Giữ nguyên các test sống ở nơi khác (`:77–84` không có Bài tập, `:226` có "bài [2-6].x" trong "Ở bài này chỉ cần") và đúng với cả hai bài.

### Mục 6. Đường thực hành, bài tập, API, dữ liệu

Xác nhận từ `git diff HEAD --stat` và `git status --short`: các file đổi chỉ gồm `docs/ho-so-cong-ty.md`, 2 file spec/plan 29/10 (thêm một dòng trỏ sang lượt 30/10), `1-1`, `1-3`, `tests/content.test.ts`. Không có thay đổi ở `src/content/exercises`, `api/`, `database/`, component, CSS. Không có hướng dẫn thực hành mới. Đúng như gói giao việc nêu. Ghi chú bàn giao: `src/assets/lessons/1-3-database-table.png` đang **chưa được track** (`??`); bài 1.3 import file này nên phải đưa vào cùng commit, nếu không build ở máy khác sẽ lỗi.

## 3. Danh sách finding theo tác động thực tế

Không có mục **Cần sửa** (không thấy lỗi kiến thức hay mâu thuẫn làm người mới làm sai). Không có **Cần cắt**.

### F1. "Câu ghi" không còn được định nghĩa ở đâu, nhưng 1.4 vẫn dùng. **Cần làm rõ**
- **Vị trí:** `1-4-khoa-chinh-khoa-ngoai.mdx:52` ("các câu ghi thông thường đều bị kiểm"), `:62` ("Một câu ghi được chỉnh cho hợp lệ sẽ thay đổi dữ liệu dùng chung").
- **Tác động tới người mới:** bản 1.1 cũ định nghĩa "câu ghi — lệnh thêm, sửa hoặc xóa dữ liệu"; lượt này gỡ ra (đúng ý spec) nhưng 1.4 không được bổ sung. Người học đã gặp "câu đọc" (1.2:53) và `DELETE` hiện ngay bên dưới nên đoán được, tác động thấp; nhưng "khi ghi" và "câu ghi" là khái niệm nền để hiểu vì sao khóa ngoại "chỉ kiểm khi ghi".
- **Căn cứ:** Grep `câu ghi` trong `src/content/lessons`: chỉ còn 1.4 (2 chỗ); 1.1 và 1.3 đều không. Test mới của 1.1 chủ động chặn từ này (`content.test.ts:344`). Spec 1.1 mục 54 ghi "Bài khác: không sửa", nên khoảng trống là hệ quả chưa được tính.
- **Đề xuất:** thêm một vế ở 1.4:52, như "các câu ghi (thêm, sửa, xóa dữ liệu) thông thường". Sau đó thêm vế đó vào test 1.4 (xem F11).

### F2. Câu về luật ở 1.1 hứa rộng hơn 1.4 và 5.2 cho phép. **Cần làm rõ**
- **Vị trí:** `1-1-database-la-gi.mdx:94` "Khi luật đang bật, SQL Server từ chối dữ liệu vi phạm ngay lúc lưu."
- **Tác động tới người mới:** người học đọc là mọi đường đưa dữ liệu vào đều bị chặn. 1.4:52 lại nói "các câu ghi thông thường đều bị kiểm; nạp hàng loạt … tùy cách nạp (bài 5.5)", và 5.2:20 nói `BULK INSERT`/bcp mặc định bỏ qua `CHECK` và khóa ngoại. Tác động thấp ở bài 1.1 nhưng sẽ gây cảm giác bị "dạy sai" khi tới 5.5. Quy ước mục 2 (dòng 27) yêu cầu không hứa quá.
- **Căn cứ:** bản cũ có vế "kiểm các câu ghi — lệnh thêm, sửa hoặc xóa dữ liệu"; bản mới bỏ vế phạm vi khi bỏ thuật ngữ. Vế "đang bật" chỉ bao đủ trường hợp luật bị tắt, không bao trường hợp nạp hàng loạt.
- **Đề xuất:** đổi bằng một vế, như "SQL Server từ chối dữ liệu vi phạm khi thêm hoặc sửa theo cách thông thường (nhập file hàng loạt có thể khác, bài 5.5)", không cần nêu tên ràng buộc.

### F3. Cầu nối "luật dữ liệu" (1.1) với "ràng buộc" (1.4) chưa được nói ra. **Cần làm rõ**
- **Vị trí:** `1-1-database-la-gi.mdx:94` và `:106` ("các loại ràng buộc khác ở bài 5.2"); `1-4-khoa-chinh-khoa-ngoai.mdx:33` ("Đây là **ràng buộc (constraint)** của dữ liệu").
- **Tác động tới người mới:** thấp. Ở 1.1:106 từ "ràng buộc" xuất hiện lần đầu mà chưa giải thích, chỉ ngầm nói khóa/kiểu là các luật có tên riêng; ở 1.4:33 "ràng buộc" được đưa ra như từ mới, không nói là cái đã gọi "luật dữ liệu" ở 1.1. Người học sẽ tự nối, nhưng đây chính là điểm gánh toàn bộ ý "luật" của bài đầu.
- **Căn cứ:** 1.4 tiếp tục dùng cả "luật" (dòng 50, 52, 105) và "ràng buộc" (33, 52, 56, 70) mà không nối hai từ.
- **Đề xuất:** ở 1.4:33 thêm một vế "(các luật dữ liệu nói ở bài 1.1)" hoặc ở 1.1:106 viết "các luật này có tên chung là ràng buộc, riêng khóa chính… ở bài 1.4".

### F5. Hình bảng `NhanVien` ở 1.3 chỉ có ba cột nhưng lời dẫn nói như toàn bảng. **Cần làm rõ**
- **Vị trí:** `1-3-bang-cot-kieu-du-lieu.mdx:53` ("Hình dưới là bảng `NhanVien` đã gặp ở bài 1.1 … Cột `NgayVaoLam` ngoài cùng bên phải"), `:56–57` (alt và figcaption).
- **Tác động tới người mới:** hình có `MaNV`, `HoTen`, `NgayVaoLam` (đã xem ảnh `src/assets/lessons/1-3-database-table.png`). Ở bài 1.4 và 1.6 bảng đó có 12 cột và `NgayVaoLam` là cột thứ bảy; người học có thể nghĩ hình 1.3 là cấu trúc đầy đủ hoặc "ngoài cùng bên phải" là thuộc tính của cột. Và 1.1 chỉ nói tên `NhanVien` chứ không "đã gặp" bảng cụ thể.
- **Căn cứ:** `HRM_Demo.sql:59–72` có 12 cột; 1.6:87 nói 12 cột; quy ước mục 3 (dòng 72) yêu cầu nói rõ khi hình chỉ trích.
- **Đề xuất:** figcaption thêm "trích ba trong 12 cột"; đổi "đã gặp ở bài 1.1" thành "tên đã gặp ở bài 1.1"; bỏ "ngoài cùng bên phải", chỉ nói theo hình ("cột cuối trong hình").

### F11. Test không còn bảo vệ các định nghĩa vừa chuyển sang 1.4 và vài giới hạn của 1.3. **Cần làm rõ**
- **Vị trí:** `tests/content.test.ts:278–282` (1.4), `:273–277` (1.3), `:265–267` (1.1).
- **Tác động tới người mới:** gián tiếp. Khóa chính, khóa ngoại, ràng buộc giờ chỉ được định nghĩa ở 1.4; test 1.4 chỉ kiểm `REFERENCE constraint`, `**Keys**`, `NO ACTION`, `không nhận NULL` … nhưng không có `khóa chính (primary key)`, `khóa ngoại (foreign key)`, `ràng buộc (constraint)`. Trước lượt này, test 1.1 (`constraint`, `mỗi mã tối đa một dòng`) còn giữ phần nào các định nghĩa đó; nay không test nào giữ. Ngoài ra `2099-03-01` hợp lệ nhưng có thể sai hồ sơ (1.3:95) và "cột tiền vẫn nhận số âm" không có test; test 1.1 không chặn `NULL`; không có test cấm "bản ghi" ở 1.3 dù spec bỏ từ này.
- **Căn cứ:** đọc từng danh sách `present`/`absent`; quy-uoc 4.4 (dòng 117) yêu cầu không xóa bảo vệ về giới hạn của database.
- **Đề xuất:** thêm vào `present` của 1.4 ba định nghĩa song ngữ (và vế "câu ghi" nếu sửa F1); thêm `2099-03-01` và `số âm` vào test 1.3; thêm `NULL` vào regex chặn của 1.1.

### F6. Hai dạng ngày được khuyên dùng chưa được nói rõ cùng đúng. **Biên tập**
- **Vị trí:** `1-3-…mdx:89`, `:97` ("gửi ngày theo dạng `2024-02-01`") và `2-2-where-loc-nhu-autofilter.mdx:59`, `:85`, `2-3-…mdx:58` ("khóa học dùng chuỗi tám chữ số `yyyymmdd`").
- **Tác động tới người mới:** thấp. 1.3 nói đúng "với cột `date`, dạng này không phụ thuộc `DATEFORMAT`"; 2.2 dạy dạng khác và nói nó "tránh nhầm ngày với tháng", mà không nói dạng có gạch cũng an toàn với cột `date`. Người học hỏi "nên dùng dạng nào" sẽ không thấy trả lời.
- **Căn cứ:** hai chỗ dạy hai dạng; 2.2:85 chỉ so với `'01/03/2024'`.
- **Đề xuất:** thêm một vế ở 2.2:85, như "dạng `2024-02-01` cũng an toàn với cột `date`; khóa học giữ `yyyymmdd` cho mọi kiểu ngày". Việc có đúng hay không cần người chạy lại; tôi chỉ nêu khả năng lệch lời khuyên.

### F7. Một số câu trỏ về 1.3 rộng hơn điều 1.3 dạy. **Biên tập**
- **Vị trí:** `1-3-…mdx:72` ("chi tiết độ dài ở bài 2.7"), `2-9-case-when-ham-if.mdx:79` ("như cách chọn kiểu ở bài 1.3"), `2-5-null-o-trong.mdx:92` ("chuyển kiểu ngầm như bài 1.3"), `3-8-union-gop-danh-sach.mdx:46` ("kiểu chung (bài 1.3)").
- **Tác động tới người mới:** thấp; chủ yếu mất công. 2.7 không có nội dung về giới hạn độ dài `nvarchar(100)` (chỉ có `LEN`), nên người học muốn biết "tối đa 100" xử lý ra sao sẽ không tìm thấy. 1.3 dạy chuyển kiểu ngầm theo hướng chuỗi từ ô sang cột; các bài trên dùng cùng tên cho ca khác (trộn nhãn chữ với số, `varchar` với `nvarchar`, hai nhánh `UNION`).
- **Căn cứ:** đọc 2.7 (Grep `độ dài`, `tối đa`, `nvarchar` không có nội dung giới hạn cột), đọc các câu ở 2.5, 2.9, 3.8. Các câu này có từ trước lượt này, không do sửa 1.3 gây ra; nêu vì mục 2 gói giao việc yêu cầu.
- **Đề xuất:** 1.3:72 bỏ "chi tiết độ dài ở bài 2.7" hoặc đổi thành "ký tự có dấu ở bài 2.7"; 2.9:79 đổi thành "chuyển kiểu ngầm như bài 1.3" (bỏ "cách chọn kiểu").

### F8. Không bài nào còn nói `GioVao` là kiểu giờ. **Biên tập**
- **Vị trí:** `3-8-union-gop-danh-sach.mdx:24`, `:60` (`AND GioVao > '08:00'`); `1-3-…mdx:67` (câu "SSMS còn hiện một số kiểu khác").
- **Tác động tới người mới:** thấp. Hàng `time(0)` đã gỡ khỏi 1.3 (đúng spec); Grep không thấy bài nào khác nhắc kiểu `time` hay `char(7)` của `KyLuong`. 1.3:67 đã báo trước có kiểu khác và cách đọc tên kiểu; 3.8 so chuỗi `'08:00'` với `GioVao` nhờ chuyển kiểu ngầm đã học.
- **Căn cứ:** Grep `kiểu \`time\``, `char(`, `time(0)` trong `src/`: 0 kết quả. `HRM_Demo.sql:86, 102` có `time(0)`, `char(7)`.
- **Đề xuất:** không cần sửa 1.3. Nếu muốn chắc, thêm một vế ở 3.8:24, như "`GioVao` là cột giờ".

### F9. Tài liệu chung còn mô tả 1.1 theo bản cũ. **Biên tập**
- **Vị trí:** `docs/quy-uoc.md:38` ("không bắt buộc chép đúng ba tiểu mục của bài 1.1"), `docs/quy-uoc.md:5`, `docs/lesson-template.md:3`, `CLAUDE.md:11` ("Bài 1.1 đã duyệt").
- **Tác động tới người mới:** không ảnh hưởng người học; ảnh hưởng người viết bài sau lấy 1.1 làm mẫu.
- **Căn cứ:** 1.1 hiện có bốn tiểu mục (test `content.test.ts:320–325`); 1.1 chưa có review từng bài sau bản cuối (`verification.md` của tác giả); quy-uoc ghi "duyệt 20/10/2026".
- **Đề xuất:** đổi "ba tiểu mục" thành "các tiểu mục"; ghi rõ bản 30/10 đã được người làm khóa học duyệt thiết kế, hoặc giữ "mẫu" nhưng chú thích ngày.

### F10. Hồ sơ công ty chưa ghi đủ những gì lượt này thêm. **Biên tập**
- **Vị trí:** `docs/ho-so-cong-ty.md:102` (Bên IT: 1.2, 1.3, 1.4), `:125` (mục 7, bài 1.3).
- **Tác động tới người mới:** không có; ảnh hưởng tính nhất quán khi viết bài sau.
- **Căn cứ:** 1.1:124 có "hỏi IT"; 1.3:40–42 dùng `NV049`–`NV051` (Lý Thu Hằng, Mai Văn Tâm, Đinh Gia Bảo); spec 1.1 dòng 43 ghi "Ghi các chi tiết này vào `ho-so-cong-ty.md` mục 5 và 7" cho cả `NV052` lẫn dãy `NV049`–`NV051`, mới thực hiện cho `NV052`.
- **Đề xuất:** thêm vào mục 7 dòng 1.3 "ba hồ sơ minh họa `NV049`–`NV051`, ngoài 48 hồ sơ"; thêm 1.1 vào cột "Xuất hiện" của Bên IT.

### F12. Test khóa cứng tiêu đề tiểu mục. **Biên tập**
- **Vị trí:** `tests/content.test.ts:320–325` (1.1) và `:357–362` (1.3, hằng `fileHeading`, `columnHeading`, `answerHeading`).
- **Tác động tới người mới:** không có.
- **Căn cứ:** quy-uoc 4.6 mục 2 "tránh khóa cứng câu chữ chỉ vì đổi cách diễn đạt"; test thứ tự (hình trước, `Ssms` trước phần đối chiếu, "Ở bài này chỉ cần" ở cuối) đã bảo vệ cấu trúc, chuỗi tiêu đề thì chỉ cần số lượng.
- **Đề xuất:** giữ test thứ tự, đổi so sánh tiêu đề thành kiểm số lượng (4 và 3) hoặc cho phép chỉnh tên.

### G1. Bỏ `char`, `time`, byte, "bản ghi" khỏi 1.3 và bỏ khóa/ràng buộc/`NULL` khỏi 1.1 không làm hỏng bài nào. **Giữ được**
- Căn cứ: grep toàn `src/` như mục 2; không bài sau dùng tên kiểu hay thuật ngữ đã gỡ mà không tự giải thích hoặc chỉ dẫn (trừ F1). 1.2:92 nhắc `NULL` có chỉ dẫn "bài 1.3 và 1.4".

### G2. Chuỗi 1.1 → 1.2 → 1.3 → 1.4 nối đúng ở các điểm trỏ chính. **Giữ được**
- Căn cứ: các dòng bảng mục 2; khóa chính, khóa ngoại, `NULL` mỗi thứ có một nơi định nghĩa, các bài khác chỉ trỏ.

### G3. Nhân vật và mã minh họa đã khớp hồ sơ. **Giữ được**
- Căn cứ: `NV052` và `NV049`–`NV051` ngoài 48 hồ sơ, không trùng mã, họ tên; `NV048 Đỗ Minh Quân` được ghi riêng trong hồ sơ để không nhầm với Quân của 1.1.

**Tổng số:** Cần sửa 0; Cần làm rõ 5 (F1, F2, F3, F5, F11); Cần cắt 0; Biên tập 6 (F6, F7, F8, F9, F10, F12); Giữ được 3 (G1–G3). Tất cả mục Cần làm rõ ở mức tác động thấp tới trung bình thấp; không mục nào chặn người mới hoàn thành bài.

## 4. Hành vi đã cân nhắc, chưa kết luận hoặc để ngoài phạm vi

1. **Công ty đã có database hay đang đề xuất?** 1.1:63 viết "Một cách tổ chức nguồn chung … là lưu hồ sơ trong database", rồi "Nhân sự và Kế toán cùng đọc dữ liệu từ đó"; hồ sơ công ty mục 1 nói hệ thống nhân sự đã dùng SQL Server; 1.2:19 bắt đầu từ việc được cấp quyền vào database nhân sự. Đọc theo thứ tự có thể thấy chưa mượt, nhưng tác giả đã chủ ý (verification mục C3: "Làm một phần") và hồ sơ công ty không mâu thuẫn. Không kết luận là lỗi; tác giả quyết có thêm một vế nối hay không.
2. **Ai là người có quyền cập nhật?** 1.1 nói "thường là Phòng Nhân sự"; 1.3 và 1.4 cho IT nhập file và xóa dữ liệu theo yêu cầu. Không mâu thuẫn trực tiếp, nhưng hồ sơ không ghi mô hình phân quyền; chưa đọc bài 6.1 để biết bài đó nói gì, nên không kết luận.
3. **Lặp ý "hợp lệ chưa chắc đúng"** ở 1.1 (Memo, Hay nhầm 2, câu ôn 3), 1.3 (dòng 95) và 1.4 (Hay nhầm 1). Đây là chủ đề xuyên suốt có chủ ý, nội dung nhất quán; tôi xem là giữ được, không tính là lặp ý.
4. **Dòng "bản ghi" ở 1.1:70** chỉ được dùng lại ở 1.4:115. Giữ theo quyết định X1 của tác giả; tác động không đáng kể.
5. **Kết quả SQL thực tế ở 1.3** (xem mục 1): không xác minh được. Riêng câu "dạng `2024-02-01` không phụ thuộc `DATEFORMAT` với cột `date`" tôi không mở lại tài liệu Microsoft trong lượt này (quy định giao việc không cho tìm tài liệu SQL ngoài khóa học); tác giả dẫn `SET DATEFORMAT` và `date` làm nguồn. Cần người có database xác nhận trước khi coi là đã kiểm.
6. **Giao diện và hành vi trình duyệt** (hai hình Excel ở 1.1, hình bảng ở 1.3, tab, thanh cuộn): chỉ kiểm bằng grep HTML; hồ sơ tác giả báo đã xem ở 1280 và 1024 px, tôi không xác nhận lại.
7. **Test, build, check:dist:** dùng số liệu tác giả báo, không chạy lại.
8. **Độ tải và thời lượng** (12 phút cho 1.1, 15 phút cho 1.3): không đo; ngoài phạm vi review tích hợp.
9. **File untracked và hồ sơ review** (`docs/reviews/...`, `docs/superpowers/...`): không đọc ngoài hai `verification.md` và hai spec được chỉ định; chỉ ghi nhận file ảnh 1.3 chưa track để tác giả đưa vào commit.

## 5. Nguồn và giới hạn

- **Nguồn đã mở:** hai bài sửa và bốn bài kế (1.2, 1.4, 1.5, 1.6); `quy-uoc.md`, `lesson-template.md`, `ho-so-cong-ty.md`, `CLAUDE.md`; diff của 1.1, 1.3, test, hồ sơ; hai `verification.md`; spec `2026-10-30-lesson-1-1-one-story-design.md` (đọc đủ); các dòng liên quan của spec 1.3-reorder qua Grep; các bài 2.1, 2.2, 2.3, 2.5, 2.7, 2.9, 3.1, 3.8, 5.2 (đoạn có Grep); `database/HRM_Demo.sql`; `Ssms.astro`; ảnh `1-3-database-table.png`; HTML trong `dist/` bằng grep.
- **Không đọc:** `.env`/secret, bất kỳ report ở `temp/review`, mọi thư mục trong `docs/reviews` ngoài hai hồ sơ được chỉ định, tài liệu SQL ngoài khóa học.
- **Không làm:** chạy database, SQL, API, `npm test/check/build`, mở browser, tạo agent khác, sửa source/test/docs/index/HEAD/branch. File duy nhất được ghi: report này (và thư mục chứa nó).
- **Giới hạn:** không có điểm số; "không có Cần sửa" nghĩa là tôi không thấy lỗi kiến thức hay mâu thuẫn chặn người mới, không phải khẳng định SQL, UI hay build đã đúng.

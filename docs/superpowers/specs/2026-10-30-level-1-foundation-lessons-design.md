# Level 1: chuyển 1.1–1.5 thành năm bài nền ngắn

Trạng thái: người làm khóa học đã duyệt ngày 30/10/2026; đã triển khai cả hai đợt trên nhánh, chưa push, xem mục Kết quả. Tài liệu này thay các quyết định về cấu trúc và độ sâu của bài 1.1–1.5 ở mọi spec trước, gồm [bài 1.1 một câu chuyện](2026-10-30-lesson-1-1-one-story-design.md) và [bài 1.3 sắp xếp lại](2026-10-30-lesson-1-3-reorder-design.md).

## Vì sao làm

Người làm khóa học thấy phần Làm quen quá nặng cho người mới: mỗi bài kể một tình huống riêng, dài 1.500–2.300 từ theo `wc -w`, dạy cả những chi tiết chưa cần. Họ muốn năm bài đầu là phần nền ngắn gọn, nối khái niệm với Excel, để người học nắm nhanh rồi vào SQL ở bài 1.6.

## Mục tiêu, không làm, coi là hỏng

- **Mục tiêu:** người chỉ biết Excel cơ bản đọc mỗi bài trong khoảng 7 phút và nói lại được các khái niệm chính; đọc xong 1.5 thì đủ nền để vào 1.6 mà không cần tình huống nào.
- **Không làm:** không đổi số bài (vẫn 51), không đổi bài 1.6 trở đi ngoài các lời trỏ và phần nêu ở mục Sửa theo; không đổi seed, API, bộ đề, component bài học; không đăng lên web.
- **Coi là hỏng nếu:**
  - Bài ngắn nhưng chỉ là danh sách định nghĩa, không nói vì sao và để làm gì.
  - Hay nhầm hoặc Ứng dụng được thêm cho đủ khuôn, không có giá trị.
  - Bài sau mất điểm tựa, hoặc người chỉ dùng web không còn biết bắt đầu thực hành thế nào.
  - Cắt ngắn làm câu văn hứa quá khả năng của database.

## Các hướng đã cân nhắc

- **Làm bài mẫu trước, rồi nhân ra:** được chọn. Viết bài 1.1 mới và đổi khung, người làm khóa học đọc bài thật rồi chốt giọng văn, sau đó mới viết bốn bài còn lại. Cái giá là thêm một lần dừng; đổi lại không phải sửa năm bài nếu sai giọng.
- **Làm một lượt:** không chọn. Ít lần dừng hơn nhưng rủi ro phải làm lại cả năm bài.

Các quyết định người làm khóa học đã chốt trong lúc trao đổi:

- Gộp 1.1 với 1.2, tách 1.3 thành hai bài, rút gọn 1.4 và 1.5.
- Hướng dẫn kết nối và chọn nơi thực hành chuyển sang trang Giới thiệu, không sang bài 1.6.
- Khung bài nền theo bản B của [bản mẫu](../../../.superpowers/brainstorm/160-1793353724/content/bai-nen-v2.html): giải thích, Hay nhầm ngắn, Ứng dụng ngắn, Ghi nhớ, Tự kiểm tra. Không có tình huống. Thư mục `.superpowers/` không được commit, nên hình dạng được ghi lại ở mục Khung bài nền bên dưới.
- Các bài không giới thiệu HRM_Demo.

## Năm bài mới

| Bài | Tiêu đề | Slug | Nguồn nội dung |
|---|---|---|---|
| 1.1 | Database là gì và SSMS dùng để làm gì | `1-1-database-la-gi` | 1.1 cũ, phần nhận diện SSMS của 1.2 cũ |
| 1.2 | Bảng, dòng và cột | `1-2-bang-dong-cot` | Phần bảng, dòng, cột của 1.1 và 1.3 cũ |
| 1.3 | Kiểu dữ liệu | `1-3-kieu-du-lieu` | Phần kiểu dữ liệu của 1.3 cũ |
| 1.4 | Khóa chính và khóa ngoại | `1-4-khoa-chinh-khoa-ngoai` | 1.4 cũ, rút gọn |
| 1.5 | Đọc sơ đồ quan hệ (ERD) | `1-5-doc-so-do-erd` | 1.5 cũ, rút gọn |

Link cũ của bài 1.2 và 1.3 sẽ không còn; người làm khóa học đã biết điều này, không tạo redirect. Tiến độ học lưu theo số bài nên vẫn giữ, dù nội dung số đó đổi. `prerequisites` đi tuần tự 1.1 → 1.5; bài 1.6 đổi thành `"1.1"`, `"1.4"`.

### Khung bài nền

- Frontmatter giữ `kind: full`, `noExercises: true`, thêm `noScenario: true`; `minutes: 7`.
- Thứ tự cấp 2: **phần chính theo chủ đề → Hay nhầm ở đâu → Ứng dụng → Ghi nhớ**, sau đó tự kiểm tra như bài khái niệm hiện nay. Không có `## Tình huống`, không có `Key`, `Chat`.
- Phần chính dùng 0–3 tiểu mục. Mở bằng câu nối với Excel, không mở bằng định nghĩa khô.
- Hay nhầm 1–2 ý, Ứng dụng 1–2 ý, tự kiểm tra ít nhất ba câu. Vẫn có đoạn "Ở bài này chỉ cần…" cuối phần chính.
- Ví dụ dùng bảng và giá trị có thật trong dữ liệu mẫu, như `NhanVien`, `NV005`, nhưng không có nhân vật hay chuyện kể. Hình Excel là tùy chọn, dùng khi giúp hiểu, và phải nói rõ là minh họa.
- Độ dài: 500–700 từ, đếm bằng `proseParagraphs` của `tests/helpers/lessons.ts`. Test chặn cứng ở 800.
- Mọi quy tắc khác ở `docs/quy-uoc.md` vẫn áp dụng: đoạn tối đa 120 chữ, phần giảng nói vì sao và để làm gì, không hứa quá, in đậm có chọn lọc, code cho giá trị và tên.

### Nội dung từng bài

**1.1 Database là gì và SSMS dùng để làm gì.** Từ workbook gửi qua email đến một nguồn chung. **Database** là gì, SQL Server là phần mềm quản lý nó, SQL (T-SQL) là ngôn ngữ để hỏi dữ liệu, **SSMS** là công cụ cài trên máy để kết nối và gửi câu lệnh; đóng SSMS không làm mất dữ liệu. Giữ ba ảnh khái niệm hiện có. Nêu ý chính về luật dữ liệu: người thiết kế khai báo, SQL Server từ chối dữ liệu vi phạm khi thêm hoặc sửa theo cách thông thường, hợp lệ chưa chắc đã đúng. Trỏ sang trang Giới thiệu để chọn nơi thực hành và sang bài 1.6 là nơi bắt đầu viết SQL.

**1.2 Bảng, dòng và cột.** Theo bản B: bảng giống sheet có cột cố định, dòng là một hồ sơ, còn gọi là bản ghi, cột là một loại thông tin; khác sheet ở chỗ không có ô gộp hay dòng tổng xen giữa. Dùng ảnh `1-2-database-table.png`, nhớ nói hình chỉ trích ba cột và ba dòng.

**1.3 Kiểu dữ liệu.** Excel để từng ô tự mang kiểu, database khai báo kiểu cho cả cột, vì vậy so sánh, sắp xếp và tính toán mới đúng. Đọc kiểu và `NULL` ở **Object Explorer → bảng → Columns**, giải nghĩa Object Explorer ngay tại chỗ. Bảng bốn kiểu `varchar`, `nvarchar`, `date`, `decimal(p,s)`. Giữ ở dạng ngắn vì bài sau trỏ về:

- chuyển kiểu ngầm (2.2, 2.5, 2.7, 2.9, 3.8)
- `decimal(p,s)` (3.1)
- `N'…'` (2.1), đặt trong Hay nhầm
- chuỗi rỗng với `NOT NULL` (2.5), đặt trong Hay nhầm
- chọn kiểu theo ý nghĩa, như `SoCCCD` là kiểu chữ (2.9)

Bỏ bảng đối chiếu sáu ô, `DATEFORMAT`, phiên SQL, `char`, `time`, byte.

**1.4 Khóa chính và khóa ngoại.** Khóa chính xác định một dòng, khóa ngoại giữ mã tham chiếu có thật; cả hai là **ràng buộc**, tức luật dữ liệu đã nói ở 1.1. Khóa ngoại kiểm khi ghi dữ liệu, không phải ô chọn trên màn hình, và chỉ xác nhận mã có thật, không xác nhận mã đúng. Nhãn `PK`, `FK` trong Columns. Bỏ ca xóa phòng, thông báo lỗi, `NO ACTION`, khóa nhiều cột, thư mục Keys.

**1.5 Đọc sơ đồ quan hệ (ERD).** Hộp là bảng, đường nối là khóa ngoại, `1 — ∞` là một-nhiều. Ví dụ đường `BangLuong → NhanVien → PhongBan` và cặp cột liên kết; giải thích bằng lời việc dò mã qua hai sheet, không mặc định biết VLOOKUP. Một vế nói một bảng có thể dùng nhiều cột làm khóa, vì sơ đồ hiện `KyLuong` và `MaNV` đều là `PK`. Giữ ý đi sang phía nhiều làm một hồ sơ thành nhiều dòng (3.4, 3.6). Bỏ nhân vật, câu chuyện Kế toán và tên HRM_Demo trong tiêu đề.

## Trang Giới thiệu

`src/pages/gioi-thieu.astro` nhận phần thực hành của bài 1.2 cũ, đặt dưới mục "Chọn nơi thực hành" có `id="chon-noi-thuc-hanh"`:

- Hai lối thực hành: web có mã truy cập, SQL Server riêng; Chạy (F5), Nộp bài, luôn hoàn tác chỉ có trên trang bài tập.
- Đường máy chủ → database → bảng, schema `dbo`, bốn thông tin kết nối, bảng so sánh nguồn dùng chung với bản riêng.
- Các bước kết nối SSMS, hộp kết nối kiểu mới và cũ, New Firewall Rule, tìm bảng, New Query, ô chọn database, câu kiểm tra `SELECT * FROM PhongBan;` với kết quả sáu phòng, cảnh báo Edit Top 200 Rows.
- Tạo bản riêng, gộp với mục "Database mẫu HRM_Demo" đang có, không lặp ý.
- Lỗi `18456`, gõ thiếu tên máy chủ, `40613`; ngắt kết nối khi học xong; quy tắc chỉ đọc trên database dùng chung.

Dùng lại các component `Ssms`, `Sql`, `Result` bằng import trong trang; CSS đã có ở `BaseLayout`. Giữ nguyên nội dung kỹ thuật, không viết mới thông tin kết nối. Sửa các câu đang trỏ về "bài 1.2" ở dòng 14, 19, 21, 49. `ExerciseWorkspace.tsx:92` đổi link sang `/gioi-thieu/#chon-noi-thuc-hanh`.

## Sửa theo ở các nơi khác

- **Bài 1.6:** đoạn "đã thấy ở bài 1.2" (dòng 42) đổi thành giới thiệu câu lệnh ngay tại chỗ; "giới thiệu ở bài 1.2" (dòng 207) trỏ trang Giới thiệu; thêm một câu ở giả định để người học biết mình vừa được cấp quyền đọc database nhân sự, vì bài này là lần đầu gặp chị Hạnh; đổi `prerequisites`; bài vẫn có tình huống và bài tập.
- **Bài 2.2:** dòng 49 "đã học trong bài 1.2" đổi thành trỏ đúng chỗ còn thấy danh mục `PhongBan`.
- **Lời trỏ khác:** rà mọi chỗ "bài 1.x" trong `src/`, sửa chỗ nào lệch nội dung mới. Các lời trỏ về 1.3, 1.4, 1.5 vẫn giữ số bài.
- **`src/data/curriculum.ts`:** giữ nguyên.
- **`docs/quy-uoc.md`, `docs/lesson-template.md`:** thêm dạng bài nền và khung của nó; đổi "chuẩn hiện hành": bài 1.1 là mẫu của bài nền, bài 2.2 là mẫu của bài có tình huống. Áp dụng ngay ở đợt 1 theo quy định ghi quy ước trong cùng commit với thay đổi đầu tiên.
- **`AGENTS.md`, `CLAUDE.md`:** cập nhật dòng "Bài 1.1 đã duyệt" theo hai mẫu trên.
- **`docs/ho-so-cong-ty.md`:** bỏ các sự việc 1.1–1.5 ở mục 7, bỏ Quân và chị Thảo, các mã minh họa `NV049`–`NV052`; sửa cột "Xuất hiện" của các nhân vật còn lại; câu "bài 1.1 nói rõ điều này" trỏ sang chỗ mới.

## Thay đổi kỹ thuật

- `src/lib/lesson-schema.ts`: thêm `noScenario: z.boolean().optional()`; `sectionHeadings(kind, noExercises, mainSectionTitle, noScenario)` bỏ `Tình huống` khi cờ bật. Giữ `kind: full` để nhãn thời lượng, mọi bảo vệ dành cho bài đầy đủ và danh sách `EXPECTED` không đổi. Đây là lựa chọn của tác giả; khung cũ ghi không thêm trường frontmatter để chọn khung, nên mục đó trong template phải sửa.
- `tests/content.test.ts`: test tiêu đề truyền `noScenario`; thêm test bài nền không có `Tình huống`, `Chat`, `Key`, tổng từ không quá 800, có ít nhất ba câu tự kiểm tra.
- Test về nội dung vẫn còn được chuyển theo nội dung: quy trình kết nối, lời hứa hoàn tác, `40613`, `PhongBan` chuyển sang đọc `src/pages/gioi-thieu.astro`; các ý giữ lại của 1.3, 1.4, 1.5 chuyển sang slug và câu mới.
- Test về nội dung đã bỏ có chủ ý thì xóa và ghi vào hồ sơ: bảng sáu ô, `DATEFORMAT`, ca xóa phòng, `NO ACTION`, khóa nhiều cột, các describe "one story" và "cell to column" của lượt trước, "approved narrative reference".
- `tests/docs.test.ts`: phần đầu template phải nhắc cả hai bài mẫu.

## Trình tự

**Bước 0.** Commit toàn bộ bản hiện tại lên nhánh `chore/add-teach-skills`, gồm cả `src/assets/lessons/1-3-database-table.png`, làm mốc quay lại. Tạo nhánh `feat/level-1-foundation-lessons` từ đó. Không push.

**Đợt 1.** Đổi schema, test khung, quy ước và template; viết bài 1.1 mới. Bài 1.2 cũ, 1.3, 1.4, 1.5 giữ nguyên tạm thời để site build được; phần SSMS sẽ tạm trùng, điều này chấp nhận được vì chưa đăng. Chạy kiểm tra, giao reviewer độc lập theo mục 4.5, xử lý theo mục 4.6, rồi dừng để người làm khóa học đọc bài trên bản chạy thử ở máy và chốt giọng văn.

**Đợt 2.** Sau khi 1.1 được duyệt: viết 1.2, 1.3, 1.4, 1.5 theo mẫu đã chốt, xóa file bài cũ, cập nhật trang Giới thiệu, các lời trỏ, tài liệu và test. Review độc lập từng bài, rồi review tích hợp vì đây là nhiều bài. Bàn giao để người làm khóa học đọc; commit trong nhánh mới, không push hay merge nếu chưa được đồng ý.

## Kiểm và nghiệm thu

- Mỗi đợt chạy tuần tự `npm test`, `npm run check`, `npm run build`, `npm run check:dist`, xem bản build ở 1280px và 1024px. Trang Giới thiệu kiểm thêm các hình SSMS, kết quả `PhongBan` và link từ trang bài tập.
- Không có câu lệnh hay số liệu mới. Giá trị dùng lại phải đối chiếu với `docs/ho-so-cong-ty.md` hoặc `database/HRM_Demo.sql`. Kết quả chuyển kiểu của bài 1.3 cũ nếu còn dùng thì giữ nguyên giá trị đã kiểm.
- Đạt yêu cầu khi: học viên chỉ dùng web đi từ 1.1 tới bài tập 1.6 mà không gặp lời trỏ gãy; mỗi bài nền đạt giới hạn độ dài; người làm khóa học duyệt giọng văn ở đợt 1.

## Để người viết tự quyết

- Câu chữ cụ thể và số tiểu mục của từng bài, trong giới hạn của khung.
- Có đặt hình `Ssms` trong bài 1.1 hay chỉ dùng lời; có giữ hình Excel ở bài 1.3 hay không.
- Thứ tự mục trong trang Giới thiệu.
- Đổi tên file ảnh `1-3-database-table.png` hay giữ.
- Hình thức ghi hồ sơ review cho từng đợt, miễn đủ theo mục 4.6.

## Kết quả

**Đợt 1:** mốc `44b2ae6` trên `chore/add-teach-skills`; nhánh `feat/level-1-foundation-lessons` có cờ `noScenario`, bài 1.1 mới dài 698 từ, quy ước và khung bài đã có dạng bài nền. Khác thiết kế ở một điểm: review cho thấy T-SQL không được bài nào khác dùng ngoài bài 1.2 cũ nên đã cắt khỏi 1.1. Bài có một ý Hay nhầm, nằm trong khung 1–2 ý. [Ma trận xử lý review](../../reviews/2026-10-30-lesson-1-1-bai-nen/verification.md).

**Đợt 2:** người làm khóa học duyệt giọng văn bài 1.1; đã viết 1.2–1.5, chuyển hướng dẫn thực hành sang trang Giới thiệu, sửa lời trỏ, tài liệu và test. Bốn bài dài 561–697 từ. Bản cuối đạt 323/323 test, check 0 lỗi, build 132 trang, `check:dist` 1997 liên kết; các giá trị trong bài đã đối chiếu với database bằng `SELECT`. [Hồ sơ review từng bài](../../reviews/2026-10-30-bai-nen-dot-2/verification.md), [review tích hợp](../../reviews/2026-10-30-bai-nen-tich-hop/verification.md).

Khác thiết kế ở các điểm sau:

- Trang Giới thiệu có ba lối thực hành, thêm lối cho người có tài khoản SSMS; `ExerciseWorkspace.tsx` link tới `#tao-ban-rieng`.
- `N'…'` đặt ngay sau bảng kiểu ở bài 1.3, không nằm trong Hay nhầm, để giữ 1–2 ý Hay nhầm.
- Bài 1.3 có ví dụ `01/02/2024` thành `2024-01-02` nhưng không dùng tên `DATEFORMAT`; bài 1.5 bỏ tên thực thể.
- `README.md` cũng được sửa vì còn mô tả khung cũ; ảnh đổi tên thành `1-2-database-table.png`.

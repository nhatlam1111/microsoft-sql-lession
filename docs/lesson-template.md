# Khung một bài học

Chép phần khung dưới đây vào `src/content/lessons/<số>-<slug>.mdx` (ví dụ `2-2-where-loc-nhu-autofilter.mdx`), rồi thay nội dung. Bài mẫu để đối chiếu giọng văn và cách dùng khối: [`3-5-left-join.mdx`](../src/content/lessons/3-5-left-join.mdx). Quy định gốc nằm ở [spec Level 1, mục 3](superpowers/specs/2026-10-18-level-1-full-lessons-design.md) và [spec đợt 1, mục 4.7](superpowers/specs/2026-10-17-sql-server-course-site-design.md).

## Phần đầu file

```yaml
---
num: "2.2"                     # số bài, đúng bảng 51 bài
title: "WHERE: lọc như AutoFilter"
shortTitle: WHERE              # tối đa 28 ký tự, hiện ở sidebar và mindmap
level: 2                       # trùng số đầu của num
area: A2                       # mảng kiến thức A1–A8
kind: full                     # full (bài đầy đủ) hoặc summary (bản tóm tắt)
minutes: 12                    # thời gian đọc, chỉ hiện với bài đầy đủ
prerequisites:                 # các bài cần biết trước, phải là bài đứng trước
  - "2.1"
goal: bạn tự lọc được danh sách nhân viên theo một điều kiện   # không bắt đầu bằng "Học xong"
excel: AutoFilter              # liên hệ Excel, một cụm ngắn
summary: Một câu tóm tắt bài, hiện trong drawer trên mindmap và khi tìm kiếm.
# noExercises: true            # chỉ khi bài không có mục "Bài tập" (bài 1.1–1.5)
---
```

## Thân bài đầy đủ

Tên mục và thứ tự cố định; `npm test` kiểm.

````mdx
## Tình huống

Một yêu cầu hay gặp từ phòng nhân sự:

<Chat who="Chị Hạnh · Phòng Nhân sự" time="16:05" initial="H">
Nội dung tin nhắn, giọng nói chuyện bình thường.
</Chat>

Nói gọn lại, chị Hạnh đang hỏi:

<Key>Câu hỏi dữ liệu, một câu.</Key>

## Với Excel

Cách quen thuộc để làm việc đó trên Excel, và chỗ Excel bắt đầu chật vật.

<Excel sheets="NhanVien" cell="D3" formula="=VLOOKUP(A3,HopDong!A:B,2,FALSE)" selected="D3" rows={[
  ['Mã NV', 'Họ tên', 'Phòng ban'],
  ['NV001', 'Trần Thị Mai', 'Kế toán'],
]} />

## Làm bằng SQL

### Lý thuyết cơ bản

Một câu nói khái niệm là gì.

<Sql title="Cú pháp chung" code={`SELECT các cột
FROM bảng
WHERE điều kiện;`} />

Ví dụ thu gọn, viết bằng bảng Markdown (không dùng khối `Result`, vì khối đó ghi dòng trạng thái của database thật):

| MaNV | MaPB |
|---|---|
| NV001 | KT |

Từng phần nghĩa là gì:

<LineMap rows={[
  ["WHERE MaPB = 'KT'", 'Chỉ giữ người phòng Kế toán, giống chọn một giá trị trong AutoFilter.'],
]} />

### Câu lệnh cho tình huống

<Sql code={`SELECT MaNV, HoTen
FROM NhanVien
WHERE MaPB = 'KT'
ORDER BY MaNV;`} />

<Result columns={['MaNV', 'HoTen']} rows={[
  ['NV001', 'Trần Thị Mai'],
]} total={9} />

### SQL Server chạy câu này thế nào

<RunFlow query={`…đúng câu ở trên…`} steps={[
  {
    clause: 'FROM',                 // từ khóa của bước, theo thứ tự SQL Server chạy
    title: 'Một câu trên thẻ và đầu drawer.',
    focus: 'FROM NhanVien',         // phần của câu lệnh bước này chạy, được tô vàng
    meaning: 'Từ khóa làm gì nói chung. Chữ trong `…` là code.',
    detail: 'Dữ liệu ở bước này thay đổi ra sao, có số dòng thật.',
    sql: `SELECT * FROM NhanVien;`, // câu ra đúng kết quả của bước này
    columns: ['MaNV', 'HoTen'],
    rows: [['NV001', 'Trần Thị Mai']],  // tối đa 10 dòng
    total: 48,                      // tổng số dòng khi rows chỉ là trích
    excel: 'Cách làm tương ứng bên Excel (không bắt buộc).',
  },
]} />

## Hay nhầm ở đâu

<Mistakes>

1. **Lỗi hay gặp.** Hậu quả cụ thể (ra 0 dòng, ra thừa dòng…).
2. **Lỗi thứ hai.** …

</Mistakes>

## Ứng dụng

<Apply>

- Một cách dùng trong việc thật, không gắn với vị trí của người đọc.

</Apply>

## Ghi nhớ

<Memo rows={[
  ['AutoFilter chọn một giá trị', "WHERE cột = 'giá trị'"],
]} />

## Bài tập

<Exercises />
````

Bài khái niệm (`noExercises: true`) không có mục "Bài tập"; thay vào đó, ngay sau khối `Memo` có dòng `**Tự kiểm tra trước khi bấm "Đã học xong":**` và ít nhất ba câu hỏi, mỗi câu một khối:

````mdx
<details>
<summary>Câu hỏi?</summary>

Câu trả lời ngắn.

</details>
````

Gợi ý dưới nút "Đã học xong" của các bài này là "Bấm khi bạn trả lời được các câu tự kiểm tra cuối bài mà không nhìn bài."

Ghi chú về các tiểu mục của "Làm bằng SQL":

- `### Lý thuyết cơ bản` luôn đứng đầu, gồm bốn phần: khái niệm, cú pháp chung, ví dụ thu gọn, bảng từng phần nghĩa là gì.
- Lý thuyết tự trả lời câu "vì sao" bằng lời dẫn dắt, không đặt câu hỏi vào bài: vì sao cần khái niệm này (ví dụ vì sao mỗi cột có một kiểu, vì sao cần khóa chính), nó giải quyết chuyện gì, và cái giá phải trả. Cơ chế nào SQL Server tự làm thì gọi đúng tên (ví dụ chuyển kiểu ngầm) và nói nó gặp lại ở bài nào.
- Mỗi dòng của `LineMap` có một giá trị ví dụ, bắt đầu bằng "Ví dụ:", cho thấy giá trị nào qua, giá trị nào bị từ chối hay bị đổi.
- Cuối lý thuyết có một đoạn "Ở bài này chỉ cần…", kể các bài đi sâu hơn ("bài 5.2", "bài 3.4"…) để người học biết phần còn lại sẽ được học sau.
- Câu minh họa trước bài 3.1 cho xem dữ liệu, không tóm tắt bằng `COUNT`, `SUM`, `GROUP BY`: liệt kê 10 hồ sơ thay cho con số 10. Phân tích và tổng hợp để dành cho các level sau.
- Hình minh họa đánh dấu đúng chỗ phần chữ đang nói: `Ssms` có `mark` (cột), `Result` có `mark` (số dòng), `Excel` có `mark` (ô), `Erd` có `path` (đường đi qua các bảng). Chú thích hình nói phần nào được đánh dấu.
- Có sơ đồ thứ tự chạy (câu lệnh từ 2 bước xử lý trở lên) thì hai tiểu mục cuối là `### Câu lệnh cho tình huống` rồi `### SQL Server chạy câu này thế nào`.
- Không viết tiểu mục "Bước 1, Bước 2…": phần đi từng bước nằm trong drawer của sơ đồ.
- Bài chỉ có khái niệm (như 1.2–1.5) thì phần lý thuyết là chính, có thể kèm câu minh họa ngắn, không có sơ đồ.
- Bài 6.5 viết theo kiểu xử lý sự cố, không theo khuôn này.

## Thân bản tóm tắt

```mdx
## Nội dung chính

- 3–5 ý chính.

## Liên hệ Excel

Một đoạn.

## Tình huống ví dụ

Một câu.

## Bài tập

<Exercises />
```

Bản tóm tắt không có khối `Sql`, `Result`, `Messages` hay `RunFlow`.

## Các khối dùng được

Dùng thẳng trong MDX, không cần import.

| Khối | Thuộc tính | Dùng để |
|---|---|---|
| `Chat` | `who`, `time`, `initial`; nội dung là tin nhắn | Bong bóng tin nhắn ở mục Tình huống |
| `Key` | nội dung | Câu "nói gọn lại" chốt câu hỏi dữ liệu |
| `Excel` | `rows`, `cell?`, `formula?`, `sheets?`, `selected?`, `mark?` (ô như `'C4'`) | Lưới Excel; ô `#N/A`, `#VALUE!`… tự tô đỏ; ô trong `mark` tô kiểu Neutral của Excel |
| `Sql` | `code`, `title?` (mặc định "SQL Server"), `copy?` (mặc định `true`) | Câu lệnh tô màu kiểu SSMS, có nút "Sao chép". `copy={false}` cho đoạn chỉ để đọc: câu ghi dữ liệu, đoạn trích có `...`, khuôn cú pháp có chỗ cần thay |
| `Result` | `columns`, `rows`, `total?`, `db?`, `mark?` (số dòng, đếm từ 1) | Tab Results kiểu SSMS; `null` hiện `NULL` nền vàng; `total` khi chỉ trích; dòng trong `mark` tô màu dòng được chọn của SSMS |
| `Messages` | `lines`, `db?` | Tab Messages: số dòng bị ảnh hưởng, lỗi |
| `LineMap` | `rows`: `[đoạn lệnh, nghĩa]` | Bảng từng phần nghĩa là gì |
| `RunFlow` | `query`, `steps`, `note?` (câu nhắc trên sơ đồ, mặc định "Bạn viết SELECT trước, nhưng theo thứ tự logic, SQL Server xét FROM trước.") | Sơ đồ thứ tự xử lý logic, mỗi thẻ có drawer |
| `Mistakes` | nội dung (danh sách đánh số) | Mục Hay nhầm ở đâu |
| `Apply` | nội dung (danh sách) | Mục Ứng dụng |
| `Memo` | `rows`: `[bên Excel, bên SQL]` | Mục Ghi nhớ |
| `Exercises` | không có | Danh sách bài tập, đọc từ `src/content/exercises/<slug>.yaml` |
| `Ssms` | `view`: `connect`, `explorer` hoặc `toolbar`; `table?`; `mark?` (tên cột, chỉ với `explorer`); `caption?` | Mô phỏng SSMS: hộp Connect to Server, Object Explorer, thanh công cụ; phần "(khóa, kiểu, null)" của cột trong `mark` có viền xanh |
| `Erd` | `caption?`, `path?` (tên bảng theo thứ tự đi) | Sơ đồ quan hệ của HRM_Demo đặt thẳng trong bài; `path` tô xanh các bảng, cột nối và đường nối |

Dòng trạng thái của `Result` và `Messages` mặc định ghi `free-sql-db-8797714`, đúng tên database học viên thấy trong SSMS.

## Quy tắc viết

- Xưng "bạn", câu ngắn, mỗi đoạn một ý. Giải thích thuật ngữ ngay lần đầu xuất hiện.
- Dùng "kết bảng" cho `JOIN`, không dùng "nối bảng" hay "ghép".
- Không nhắc vai trò hay xuất thân của người đọc; tình huống là yêu cầu công việc trung tính.
- Không dùng các cụm "máy viết" trong `BANNED_PHRASES` (`src/lib/lesson-schema.ts`), không dùng emoji.
- Chuỗi tiếng Việt trong SQL có `N`: `N'Đang làm'`.
- Dòng code trong `Sql` và `RunFlow` không bắt đầu bằng dấu cách (MDX sẽ xóa).
- Câu có kết quả mà thứ tự có ý nghĩa thì có `ORDER BY`. `TOP` đi cùng `ORDER BY`, trừ khi bài đang nói đúng về chuyện không có `ORDER BY`.
- Level 1 không bảo học viên chạy câu `INSERT`, `UPDATE`, `DELETE` trong SSMS; câu sửa dữ liệu chỉ đưa ra để đọc.
- Không hứa điều database không tự bảo đảm. Ràng buộc chỉ có khi được khai báo, nên viết "khi `MaNV` được khai báo là khóa chính…" thay cho "database chặn hẳn…". Tách "hợp lệ" với "đúng": mã có thật vẫn có thể gán nhầm người. Khóa ngoại là luật kiểm khi ghi dữ liệu, không phải ô chọn trên màn hình.
- Không tuyệt đối hóa Excel (Excel có Data Validation, có làm việc chung trên một workbook); nói rõ điều kiện của tình huống ("trong file chưa thiết lập kiểm tra…").
- Tình huống ở đầu bài phải được khép lại trong bài: có giả định rõ (mốc thời gian, phạm vi), và có câu trả lời cho người hỏi. Bài không có `RunFlow` có thể kết "Làm bằng SQL" bằng `### Trả lời chị Hạnh`. Câu trả lời tách phần database làm được với phần là quyết định nghiệp vụ (ví dụ chuyển phòng ai, từ ngày nào, giữ lịch sử ra sao).
- Con số lấy từ dữ liệu mẫu phải nói rõ đang đếm gì và trên phạm vi nào: "10 hồ sơ còn trỏ tới VH, gồm 2 người đã nghỉ", "đếm trên toàn bộ dữ liệu mẫu", "43 người có lương kỳ 2026-09". Phân biệt "tối đa một" với "đúng một", và quy ước của bộ mẫu (NULL ở `NgayNghiViec` là chưa nghỉ) với điều SQL Server tự bảo đảm.
- Kết quả không có `ORDER BY` thì nói thứ tự dòng có thể khác hình. `TOP (n)` là "tối đa n dòng". Thứ tự trong `RunFlow` là thứ tự xử lý logic, không phải cách SQL Server thực sự đọc dữ liệu.
- Lời hứa của công cụ phải nói rõ phạm vi: việc hoàn tác chỉ có trên trang bài tập, SSMS chạy thật; lỗi 40613 thường do database đang thức dậy, nhưng không phải lúc nào cũng vậy; gặp lỗi kéo dài thì gửi nguyên văn lỗi cho người phụ trách.

## Quy trình làm một bài

Level 1 phải sửa ba vòng sau khi lên web (review bài 1.1, review bài 1.2–1.6, lượt đọc của người làm khóa học; xem spec Level 1 mục 11–13). Các bước dưới đây đưa những gì học được từ ba vòng đó vào ngay lúc viết, để bài mới không phải sửa lại theo cùng một kiểu.

### 1. Trước khi viết

- Đọc lại các bài đứng trước có liên quan, để không giải thích lại hoặc nói khác đi.
- Chốt giả định của tình huống: mốc thời gian, phạm vi dữ liệu, ai hỏi và cần câu trả lời gì.
- Chạy bằng MCP `azure-sql` (chỉ `SELECT`) mọi câu lệnh và mọi con số sẽ đưa vào bài, kể cả các giá trị ví dụ (làm tròn, ngày không có thật, chuỗi bị đệm…).

### 2. Viết theo khung và quy tắc ở trên

### 3. Tự rà từng câu trước khi đưa review

- [ ] Lý thuyết trả lời "vì sao, để làm gì, cái giá là gì" bằng lời dẫn dắt; không có câu hỏi trong phần lý thuyết.
- [ ] Mỗi dòng `LineMap` có "Ví dụ:" với giá trị cụ thể.
- [ ] Có đoạn "Ở bài này chỉ cần…" kể các bài học sâu hơn.
- [ ] Không câu nào hứa quá: ràng buộc chỉ khi đã khai báo; hợp lệ khác đúng; `TOP` là tối đa n dòng; thứ tự trong `RunFlow` là thứ tự logic; lời hứa của công cụ có phạm vi.
- [ ] Con số nói rõ đếm gì, trên phạm vi nào, và đã chạy lại.
- [ ] Trước bài 3.1 không có `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`; cho xem dữ liệu thay cho con số.
- [ ] Hình đánh dấu đúng chỗ phần chữ nói (`mark`, `path`), chú thích hình nói phần nào được đánh dấu.
- [ ] Tình huống được khép lại; câu trả lời tách việc database làm với quyết định nghiệp vụ.
- [ ] Excel được tả đúng (có Data Validation, có cùng sửa), chỉ nêu điều kiện của file trong tình huống.
- [ ] Đoạn chỉ để đọc có `copy={false}`; bài khái niệm có ba câu tự kiểm tra.

### 4. Kiểm bằng máy

1. Câu làm đổi dữ liệu (để lấy nguyên văn lỗi) chỉ chạy qua API bài tập trên máy, có hoàn tác; xong thì `npm --prefix api run check:data`.
2. Bài có bài tập: `npm --prefix api run build` rồi `npm --prefix api run check:exercises`.
   - `check:dist` báo lỗi nếu bất kỳ trang nào chứa nguyên văn một câu đáp án (bỏ qua khoảng trắng và dấu `;` cuối). Đáp án ngắn như `SELECT * FROM HopDong;` (bài tập 1.6) vì thế không được xuất hiện trong bài nào, kể cả làm ví dụ. Bài tập mới nên dùng đáp án không trùng với câu nào đã có trong bài.
3. `npm test`, `npm run check`, `npm run build`, `npm run check:dist`.
4. Mở bản build trên máy, xem các hình có đánh dấu và các khối mới.

### 5. Review độc lập (bắt buộc, mỗi bài một lần)

Làm xong một bài thì giao cho một agent mới, không mang ngữ cảnh lúc viết, review bài đó. Dùng model mạnh nhất đang có, chạy nền. Lời dặn cho agent gồm đúng đoạn vai trò dưới đây, rồi phần bối cảnh:

```text
Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

Bối cảnh:
- Bài cần review: src/content/lessons/<slug>.mdx (và src/content/exercises/<slug>.yaml nếu có). Đọc cả các khối Excel, Sql, Result, Messages, LineMap, RunFlow, Ssms, Erd như người học thấy trên trang; bản build ở dist/bai/<slug>/index.html nếu đã build.
- Đối chiếu dữ liệu với database/HRM_Demo.sql, đối chiếu kiến thức SQL Server và Excel với tài liệu Microsoft (ghi link nguồn).
- Không kết nối database và không chạy câu lệnh nào trên database của khóa học. Điều gì chỉ xác minh được bằng cách chạy thì ghi "chưa xác minh".
- Khung bài và quy tắc viết: docs/lesson-template.md. Các quyết định đã chốt nằm ở mục "Không làm theo" của spec level đang làm; nếu vẫn thấy nên đổi thì ghi rõ là đi ngược quyết định đã chốt.
- Với mỗi câu "tại sao, để làm gì" tự đặt ra, ghi bài đã trả lời hay chưa.
- Kết quả viết vào temp/review/review-bai-<slug>.md: rà theo thứ tự bài, mỗi mục có câu gốc, đánh giá (Cần sửa / Cần làm rõ / Biên tập / Giữ được), lý do và đề xuất; cuối file là thứ tự ưu tiên sửa và nguồn đối chiếu.
- Không sửa file nào của dự án.
```

Sau khi có bản review:

1. Đọc hết bản review rồi mới sửa. Kiểm từng mục với script và với database (chỉ `SELECT`); mục nào đúng thì sửa, mục nào sai hoặc đi ngược quyết định đã chốt thì không làm theo và ghi lý do.
2. Viết test cho các câu đã sửa (cụm cũ không còn, ý mới có mặt), chạy lại bước 4.
3. Ghi "Đã sửa" và "Không làm theo" vào spec của level, như spec Level 1 mục 11–13.
4. Gửi người làm khóa học: bài đã sửa, đường dẫn bản review, tóm tắt những gì đã sửa và chưa sửa. Chỉ push khi người làm khóa học đồng ý.

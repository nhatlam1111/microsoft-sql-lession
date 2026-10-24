# Khung một bài học

Chuẩn hiện hành từ 20/10/2026, sau khi người làm khóa học duyệt [`bài 1.1`](../src/content/lessons/1-1-database-la-gi.mdx). Dùng bài này để đối chiếu mạch kể, độ sâu, chữ đậm và giá trị được highlight. [`Bài 3.5`](../src/content/lessons/3-5-left-join.mdx) là ví dụ kỹ thuật `RunFlow`, đã chuyển sang khung gộp từ 24/10/2026.

File này hướng dẫn dựng bài và dùng các khối. Quy tắc viết, định dạng, số liệu, review và an toàn database nằm ở [`quy-uoc.md`](quy-uoc.md); bối cảnh, nhân vật và dữ liệu mẫu ở [`ho-so-cong-ty.md`](ho-so-cong-ty.md). Các spec/plan/mockup cũ ghi hai phần Excel/SQL là lịch sử thiết kế; khi viết tiếp dùng hai tài liệu hiện hành này.

## Phần đầu file

Không thêm trường frontmatter để chọn khung. Giữ `kind: full` hoặc `summary`; tiêu đề phần chính được đọc trực tiếp từ MDX.

```yaml
---
num: "2.2"                     # đúng bảng 51 bài
title: "WHERE: lọc như AutoFilter"
shortTitle: WHERE              # tối đa 28 ký tự
level: 2
area: A2
kind: full
minutes: 12                    # ước lượng theo bài thực tế, không mặc định mọi bài 12 phút
prerequisites:
  - "2.1"
goal: bạn tự lọc được danh sách nhân viên theo một điều kiện
excel: AutoFilter
summary: Một câu nói đúng vấn đề và nội dung chính của bài.
# noExercises: true            # bài khái niệm không có mục Bài tập, hiện là 1.1–1.5
---
```

## Thân bài đầy đủ

Thứ tự cấp 2: **Tình huống → phần chính theo chủ đề → Hay nhầm ở đâu → Ứng dụng → Ghi nhớ → Bài tập**. Tiêu đề phần chính được đặt theo bài, như "Từ hai bản Excel đến một nguồn dữ liệu chung" ở bài 1.1 hoặc "Lọc danh sách nhân viên theo điều kiện" ở bài `WHERE`. Các tên mục còn lại giữ đúng như khung.

Khung dưới chép vào file MDX được; thay toàn bộ lời chỉ dẫn bằng nội dung thật. Các tiểu mục chỉ gợi ý nhịp kể, chọn khoảng 2–4 tiểu mục theo mục tiêu bài. Ví dụ và hình đặt ngay cạnh ý cần minh họa.

````mdx
## Tình huống

Chị Hạnh gửi bạn một yêu cầu công việc:

<Chat who="Chị Hạnh · Phòng Nhân sự" time="16:05" initial="H">
Yêu cầu cụ thể, giọng nói chuyện bình thường.
</Chat>

Giả định: nêu gọn mốc thời gian và phạm vi cần để kết luận.

<Key>Một câu chốt điều cần tìm hoặc xử lý.</Key>

## Hiểu và xử lý yêu cầu

### Từ cách làm Excel đến khái niệm đang học

Xuất phát từ vấn đề trong tình huống. Nêu cách làm quen thuộc với Excel,
rồi dẫn sang cách database hoặc SQL xử lý ngay trong cùng ý.
Giải thích khái niệm mới bằng lời thường và in đậm có chọn lọc.

### Giải thích bằng dẫn chứng

Đặt hình hoặc ví dụ cạnh ý cần làm rõ. Giá trị dẫn chứng, tên bảng/cột
và địa chỉ ô trong lời giải thích dùng code có nền, như `NV005`, `MaNV`, `C4`.
Chọn khối phù hợp trong bảng thuộc tính cuối tài liệu; chỉ dùng khi cần.
Nêu giới hạn quan trọng và cái giá của cách làm bằng một vế câu.

Ở bài này chỉ cần nắm ý chính đang học; chỉ sang đúng bài đào sâu hơn.

### Áp dụng ngay vào yêu cầu

Trả lời chị Hạnh ngay trong mạch này, đủ điều kiện và đúng phạm vi dữ kiện.
Tách căn cứ nghiệp vụ với thao tác mà database hay người có quyền thực hiện.
Bài truy vấn thay tiểu mục này bằng biến thể có câu lệnh ở phần hướng dẫn bên dưới.

## Hay nhầm ở đâu

<Mistakes>

1. **Lỗi thường gặp.** Hậu quả cụ thể, không giảng lại phần chính.
2. **Lỗi thứ hai.** Hậu quả cụ thể.

</Mistakes>

## Ứng dụng

<Apply>

- **Tên ứng dụng của chủ đề:** việc làm được nhờ kiến thức của bài, kèm mục đích cụ thể.
- **Một ứng dụng khác:** ví dụ công việc đúng khả năng đã giải thích, có điều kiện nếu cần.

</Apply>

## Ghi nhớ

<Memo rows={[
  ['Điểm tựa Excel đã dùng trong bài', 'Ý chính SQL hoặc database cần nhớ'],
]} />

## Bài tập

<Exercises />
````

### Bài khái niệm

Giữ lời giải ngay trong phần chính, không thêm preview SQL hay mục trả lời riêng. Với `noExercises: true`, bỏ toàn bộ mục "Bài tập" ở khung trên; ngay sau `Memo` đặt dòng dưới cùng ít nhất ba câu tự kiểm tra. Bộ câu hỏi phải kiểm được các mục tiêu, gồm thuật ngữ nền tảng, không chỉ hỏi lỗi và trường hợp ngoại lệ.

````mdx
**Tự kiểm tra trước khi bấm "Đã học xong":**

<details>
<summary>Câu hỏi kiểm một ý chính đã học?</summary>

Đáp án ngắn, đủ nghĩa và không dạy thêm kiến thức ngoài bài.

</details>
````

Gợi ý dưới nút "Đã học xong" là "Bấm khi bạn trả lời được các câu tự kiểm tra cuối bài mà không nhìn bài."

### Bài có câu lệnh và kết quả

Giữ lý thuyết, Excel và ví dụ trong phần chính theo chủ đề. Cuối phần đó dùng `### Câu lệnh cho tình huống`, đặt câu SQL đầy đủ và kết quả đã kiểm chứng, rồi trả lời người hỏi ngay cạnh kết quả. Nếu có `RunFlow`, tiểu mục cuối cùng là `### SQL Server chạy câu này thế nào`. Không chép thêm một phần giải SQL độc lập hay "Trả lời chị Hạnh" ở sau.

Sơ đồ đặt khối dưới đây là **mã minh họa thuộc tính**, không dán nguyên các tên biến vào bài. Thay `sqlDaKiemChung`, `cacCot`, `cacDong`, `tongSoDong`, `cacBuocDaKiemChung` bằng các giá trị literal đã chạy và kiểm trước khi viết.

````mdx
### Câu lệnh cho tình huống

<Sql code={sqlDaKiemChung} />

<Result columns={cacCot} rows={cacDong} total={tongSoDong} />

Câu trả lời nghiệp vụ từ kết quả này, đúng giả định đầu bài.

### SQL Server chạy câu này thế nào

<RunFlow query={sqlDaKiemChung} steps={cacBuocDaKiemChung} />
````

- `Sql` dùng câu lệnh đầy đủ giải đúng tình huống. Đoạn trích, khuôn cú pháp và câu ghi dữ liệu chỉ để đọc có `copy={false}`. Kết quả lỗi dùng `Messages` với nguyên văn đã kiểm; không tự sáng tác thông báo.
- SQL nhiều dòng theo mục 2.4 của `quy-uoc.md`: mệnh đề chính thẳng cột, phần tiếp dòng lùi một cấp 4 cột. Ghi `\t` trong template literal MDX để giữ thụt lề sau build; `focus` phải dùng cùng khoảng trắng với `query`. Không dán khoảng trắng/tab literal đầu dòng vào MDX rồi chỉ kiểm file nguồn.
- `Result.rows` là các dòng đã chạy, `total` là tổng thật khi chỉ trích; không lấy vài dòng minh họa rồi gắn tổng ước lượng. Ví dụ thu gọn giả lập dùng bảng Markdown, ghi rõ phạm vi, không giả làm kết quả database thật.
- Mỗi phần tử `RunFlow.steps` có `clause`, `title`, `focus`, `meaning`, `detail`, `sql`, `columns`, `rows`, `total`; `excel` là tùy chọn. `query` trùng câu cho tình huống, `focus` thuộc câu đó, `sql` trả đúng trạng thái dữ liệu của bước. Chỉ thêm sơ đồ khi có từ hai bước xử lý logic trở lên và sơ đồ giúp hiểu bài.
- `rows` mỗi bước trích tối đa 10 dòng; `total` là số dòng thật sau bước đó. Giải thích trong drawer bắt đầu từ từ khóa, nêu dòng nào giữ/bỏ/đổi. Thứ tự logic không mô tả cách SQL Server đọc vật lý.
- `LineMap` là khối tùy chọn khi cần tách nghĩa từng phần. Mỗi dòng có "Ví dụ:" và giá trị cụ thể được nhận, loại hoặc đổi; không chép lại cùng lời giải thích ở cả bảng lẫn đoạn văn.
- Bài xử lý sự cố như 6.5 có thể đặt tên tiểu mục theo diễn biến sự cố; vẫn đi từ tình huống tới lời giải, giữ giới hạn an toàn và các mục cuối.

### Ví dụ thụt lề SQL trong MDX

Đây là mẫu **định dạng để đọc**, không phải câu cho học viên chạy hay kết quả đã kiểm. Trong file MDX dưới đây, `\t` được viết bằng dấu gạch chéo ngược và chữ `t`; khi render và sao chép nó trở thành một tab rộng 4 cột. Với chuỗi `focus` một dòng có escape xuống dòng, dùng `\n\t` cho phần điều kiện tiếp theo.

````mdx
<Sql copy={false} code={`SELECT MaNV,
\tHoTen,
\tCASE
\t\tWHEN Email IS NULL THEN N'Chưa có'
\t\tELSE Email
\tEND AS [Email hiển thị]
FROM NhanVien
WHERE TrangThai = N'Đang làm'
\tAND MaPB = 'IT';`} />
````

Kết quả cần thấy: `SELECT`/`FROM`/`WHERE` cùng cột; `HoTen`, `CASE`, `END` và `AND` lùi 4 cột; `WHEN`/`ELSE` lùi 8 cột. Các dòng trong `RunFlow.query` và `steps[].sql` ghi cùng cách này; ví dụ `focus: "WHERE TrangThai = N'Đang làm'\n\tAND MaPB = 'IT'"`. Khi kiểm, thử nút Sao chép và dán vào editor để xác nhận tab thật, không chỉ nhìn file MDX.

## Trình tự dùng khung

1. Đọc quy ước và hồ sơ công ty; chốt mục tiêu, giả định và câu trả lời cần có.
2. Chọn biến thể khái niệm hoặc truy vấn; đặt tiêu đề phần chính theo vấn đề cụ thể.
3. Chọn ví dụ tối thiểu và các khối thật sự cần; chạy, đối chiếu dữ liệu theo quy trình trước khi điền.
4. Viết mạch Excel → khái niệm/cách SQL xử lý → giải yêu cầu; không tách lại hai phần Excel/SQL.
5. Rà chữ đậm, code của giá trị dẫn chứng, dấu ô trong hình, ứng dụng đúng chủ đề và câu tự kiểm tra phủ mục tiêu.
6. Chạy kiểm tra và review theo mục 4 của `quy-uoc.md`. Bài cũ chuyển khung thì cập nhật các assertion về tiêu đề, giữ các kiểm về kiến thức và số liệu.

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
| `Excel` | `rows`, `cell?`, `formula?`, `sheets?`, `selected?`, `mark?` (ô như `'C4'`), `numeric?` (ô ghi bằng chữ nhưng là ngày, số thật trong Excel) | Lưới Excel; ô `#N/A`, `#VALUE!`… tự tô đỏ; ô trong `mark` tô kiểu Neutral của Excel; ô số và ô trong `numeric` căn phải |
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

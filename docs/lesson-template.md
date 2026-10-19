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

Ghi chú về các tiểu mục của "Làm bằng SQL":

- `### Lý thuyết cơ bản` luôn đứng đầu, gồm bốn phần: khái niệm, cú pháp chung, ví dụ thu gọn, bảng từng phần nghĩa là gì.
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
| `Excel` | `rows`, `cell?`, `formula?`, `sheets?`, `selected?` | Lưới Excel; ô `#N/A`, `#VALUE!`… tự tô đỏ |
| `Sql` | `code`, `title?` (mặc định "SQL Server") | Câu lệnh tô màu kiểu SSMS, có nút "Sao chép" |
| `Result` | `columns`, `rows`, `total?`, `db?` | Tab Results kiểu SSMS; `null` hiện `NULL` nền vàng; `total` khi chỉ trích |
| `Messages` | `lines`, `db?` | Tab Messages: số dòng bị ảnh hưởng, lỗi |
| `LineMap` | `rows`: `[đoạn lệnh, nghĩa]` | Bảng từng phần nghĩa là gì |
| `RunFlow` | `query`, `steps`, `note?` (câu nhắc trên sơ đồ, mặc định "Bạn viết SELECT trước, nhưng SQL Server làm FROM trước.") | Sơ đồ thứ tự chạy, mỗi thẻ có drawer |
| `Mistakes` | nội dung (danh sách đánh số) | Mục Hay nhầm ở đâu |
| `Apply` | nội dung (danh sách) | Mục Ứng dụng |
| `Memo` | `rows`: `[bên Excel, bên SQL]` | Mục Ghi nhớ |
| `Exercises` | không có | Danh sách bài tập, đọc từ `src/content/exercises/<slug>.yaml` |
| `Ssms` | `view`: `connect`, `explorer` hoặc `toolbar`; `table?`; `caption?` | Mô phỏng SSMS: hộp Connect to Server, Object Explorer, thanh công cụ |
| `Erd` | `caption?` | Sơ đồ quan hệ của HRM_Demo đặt thẳng trong bài |

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
- Tình huống ở đầu bài phải được khép lại trong bài: có giả định rõ (mốc thời gian, phạm vi), và có câu trả lời cho người hỏi.

## Kiểm trước khi commit

1. Chạy lại mọi câu lệnh trong bài bằng MCP `azure-sql` (chỉ `SELECT`) và so từng ô với bảng kết quả trong bài.
2. Câu làm đổi dữ liệu (để lấy nguyên văn lỗi) chỉ chạy qua API bài tập trên máy, có hoàn tác; xong thì `npm --prefix api run check:data`.
3. Bài có bài tập: `npm --prefix api run build` rồi `npm --prefix api run check:exercises`.
   - `check:dist` báo lỗi nếu bất kỳ trang nào chứa nguyên văn một câu đáp án (bỏ qua khoảng trắng và dấu `;` cuối). Đáp án ngắn như `SELECT * FROM HopDong;` (bài tập 1.6) vì thế không được xuất hiện trong bài nào, kể cả làm ví dụ. Bài tập mới nên dùng đáp án không trùng với câu nào đã có trong bài.
4. `npm test`, `npm run check`, `npm run build`, `npm run check:dist`.

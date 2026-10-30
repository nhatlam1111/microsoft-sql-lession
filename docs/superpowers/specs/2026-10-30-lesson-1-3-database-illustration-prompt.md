# Prompt bản database và bản giảm chữ — bài 1.3

Công cụ: built-in image_gen, chế độ edit với local referenced_image_paths, transparent_background false; không CLI/API. User chọn khối database phía sau + bảng NhanVien phía trước, sau đó yêu cầu đơn giản hơn/giảm chữ.

Bản cuối: src/assets/lessons/1-3-database-table.png. Gốc công cụ: C:/Users/Lam/.codex/generated_images/01a18b96-f552-7d90-9b81-01ea1c2b27d8/exec-e23efab4-787f-45fa-9c38-e281a6b5810c.png. Không xóa/sửa file gốc. Đã xem trực tiếp: đúng tên cột/ba hồ sơ/ngày, chỉ ba callout Bảng/Dòng/Cột; giữ dòng NV005 vàng và toàn cột HoTen xanh.

## Bước 1: từ nháp Excel sang database

Input lúc gọi: src/assets/lessons/1-3-bang-dong-cot.png (đã loại khỏi assets sau khi thay, bản gốc của công cụ vẫn giữ). Output trung gian: C:/Users/Lam/.codex/generated_images/01a18b96-f552-7d90-9b81-01ea1c2b27d8/exec-37b193b0-d64a-4b76-944d-5fa5cd8ace5c.png.

```text
Edit the supplied infographic into an educational illustration of a DATABASE TABLE, not an Excel worksheet. Preserve its clean flat 2D style, white background, readable Vietnamese callouts, exact employee names and dates, and the amber selected record / blue selected column concept.

Main composition: a SMALL blue database cylinder in the background, clearly labeled "Database"; in front, a LARGE database table card labeled "NhanVien". The table is the dominant subject. The cylinder connects gently to the table to communicate containment, not a query or synchronization flow. Keep ample whitespace and unobstructed callouts. Landscape 3:2.

Remove all spreadsheet-specific elements from the old image: no A/B/C column letters, no 1/2/3/4 row numbers, no sheet bar, no green Excel toolbar, no formula bar, no word Excel anywhere.
Replace the subtitle "Nhìn từ một sheet Excel" with "Một bảng trong database".
Keep the main title "Bảng, dòng và cột".

Table contents EXACTLY, with technical database column names in the header:
"MaNV" | "HoTen" | "NgayVaoLam"
"NV001" | "Trần Thị Mai" | "2024-03-01"
"NV005" | "Vũ Thị Lan" | "2016-03-14"
"NV014" | "Hồ Thị Bích" | "2017-10-02"

The table has exactly one header row and three data records, no row-number column.
Use a restrained SQL-blue title strip with the table name "NhanVien".
Retain a subtle outline around the full table data region, including its header.
Highlight the WHOLE NV005 record horizontally in pale amber, across all three values.
Outline the WHOLE HoTen column vertically in blue, including its header and all three name values. Keep the amber intersection clear.

Three outside callouts, with accurate, non-overlapping leaders:
"Bảng" / "NhanVien" points to the whole table boundary.
"Dòng / bản ghi" / "Một hồ sơ nhân viên" points to the entire NV005 row.
"Cột" / "Một loại thông tin" points to the outlined HoTen column.
Footer "Hình minh họa".

All field names, codes, Vietnamese accents and dates must match exactly. Do not add SQL syntax, datatype badges, primary-key icons, extra records, cell addresses, an SSMS interface, or any suggestion that tables have spreadsheet coordinates. This is a conceptual database illustration with familiar rows and columns. Make the distinction from the supplied Excel-style draft unmistakable.
```

## Bước 2: giảm chữ theo phản hồi người dùng

Input: output trung gian bước 1. Output: bản cuối ở trên.

```text
Simplify this DATABASE TABLE infographic by reducing annotation text, while preserving the database cylinder, the NhanVien table, the exact technical headers and all data values.

Remove the large top title "Bảng, dòng và cột" and the subtitle "Một bảng trong database".
Keep only three SHORT callout labels: "Bảng", "Dòng", "Cột".
For the Bảng callout, remove the duplicated "NhanVien" line.
For the Dòng callout, remove "/ bản ghi" and remove "Một hồ sơ nhân viên".
For the Cột callout, remove "Một loại thông tin".
Remove the small footer "Hình minh họa"; the lesson will supply its caption outside the image.
Keep the small cylinder label "Database" and the table title "NhanVien".
Use compact callouts with thin, clear leader lines. Rebalance the composition to use the freed space, keeping the table large and dominant. Preserve the clean flat 2D style and white background.

Data invariants, exact:
MaNV | HoTen | NgayVaoLam
NV001 | Trần Thị Mai | 2024-03-01
NV005 | Vũ Thị Lan | 2016-03-14
NV014 | Hồ Thị Bích | 2017-10-02

Keep the whole NV005 row highlighted amber and the whole HoTen column outlined blue, including its header and all three values. The Bảng leader points to the whole table boundary, Dòng to the entire amber record, Cột to the entire vertical HoTen column.
Keep the small database cylinder behind the table. No Excel elements, spreadsheet coordinates, row numbers, extra text, datatype badges or SQL query. Exactly one header and three data rows. Preserve all Vietnamese accents and dates.
```

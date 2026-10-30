# Prompt hình bảng–dòng–cột, bài 1.3

**Bản nháp bị loại:** người dùng yêu cầu minh họa bảng trong database, không phải worksheet Excel. Prompt và ảnh gốc dưới đây giữ để truy vết; source không dùng ảnh này. Bản thay thế được ghi ở 2026-10-30-lesson-1-3-database-illustration-prompt.md.

Công cụ: built-in image_gen, không CLI/API; transparent_background false. PNG gốc: C:/Users/Lam/.codex/generated_images/01a18b96-f552-7d90-9b81-01ea1c2b27d8/exec-74f6b0bf-e091-43c3-9c7f-b78b8472de96.png. Bản project: src/assets/lessons/1-3-bang-dong-cot.png. Không sửa/xóa ảnh gốc. Đã xem trực tiếp output: đủ ba cột/ba hồ sơ, giá trị và dấu tiếng Việt đúng; dòng NV005 và cột Họ tên được chỉ rõ.

## Prompt nguyên văn

```text
Use case: infographic-diagram.
Asset type: one educational illustration for a Vietnamese SQL Server lesson, placed inside a reading article.
Primary request: Show TABLE, ROW and COLUMN so a basic Excel user recognizes the structure immediately.
Create a clean, precise, flat 2D editorial infographic on a white background, landscape 3:2. Large readable Vietnamese sans-serif type, crisp thin grid lines, restrained Excel green and SQL blue, with one amber highlighted record. No perspective, no 3D, no people, no database cylinders, no server icons.
Composition: One central, large Excel-like worksheet. A small familiar green sheet bar, gray column letters A B C and gray row numbers 1 2 3 4. Inside it, EXACTLY three columns and four rows including the header. The data region is surrounded by one subtle blue bracket/outline to identify the whole table. Do not count the gray Excel letters or row numbers as database data.
Cell text, verbatim, row by row:
Header row 1: "Mã NV" | "Họ tên" | "Ngày vào làm"
Data row 2: "NV001" | "Trần Thị Mai" | "2024-03-01"
Data row 3: "NV005" | "Vũ Thị Lan" | "2016-03-14"
Data row 4: "NV014" | "Hồ Thị Bích" | "2017-10-02"
Show the ENTIRE data row 3 (NV005, Vũ Thị Lan, 2016-03-14) with a pale amber horizontal fill, including all three data cells but excluding the gray row number.
Show the ENTIRE Họ tên column with a clear blue vertical outline from its column header through all three name cells. Keep the amber fill of the intersecting selected row visible.
Three clear callouts outside the grid, with thin leader lines and NO overlap:
"Bảng" with smaller explanation "Danh sách nhân viên", pointing to the outline of the whole data region.
"Dòng / bản ghi" with smaller explanation "Một hồ sơ nhân viên", pointing to the entire highlighted NV005 row.
"Cột" with smaller explanation "Một loại thông tin", pointing to the vertically outlined Họ tên column.
Small title above: "Bảng, dòng và cột"
Small subtitle: "Nhìn từ một sheet Excel"
Small footer label: "Hình minh họa"
Constraints: all Vietnamese accents and employee codes/dates must be exact; single unified worksheet, exactly 3 data records, no duplicated or missing cells, no arrows suggesting Excel automatically syncs with SQL, no SQL query text, no software UI controls beyond the minimal worksheet frame. Callouts must unmistakably point to the whole table, one horizontal record, and one vertical field. Leave comfortable margins. The image must be clear at approximately 670px wide in a lesson.
```

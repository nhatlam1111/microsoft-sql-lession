# ImageGen: ba khái niệm của bài 1.1

Built-in ImageGen, 29/10/2026, theo điều chỉnh của người dùng: ảnh gắn với database, SQL Server và SQL; không có nhân vật. Ba ảnh được lưu trong src/assets/lessons/ và Astro sinh WebP360/720 khi build. Không dùng CLI/API key riêng.

## 1. database

Asset: `src/assets/lessons/1-1-database.png`.

Prompt nguyên văn:

Create a single compact educational concept illustration for a beginner Vietnamese SQL lesson, to be displayed at only 320–400 CSS pixels wide. Landscape canvas around 2:1, very tight useful framing with comfortable margins. Mature clean textbook object illustration, subtle isometric depth, crisp clear forms, white background, navy #172B4D, royal blue #215CE5, pale blue #EDF3FF, a little muted sage. Consistent visual language, minimal objects, no glossy 3D, no heavy gradients, no enclosing decorative card. Absolutely NO people, faces, hands, characters, offices, desks, plants or mascots. No logos, watermarks, tiny writing, invented numbers or fake software screenshot. This is a conceptual illustration, not verified database results. Labels and definitions will be accessible real HTML outside the image. Subject: DATABASE as an organized collection of stored data. One clear blue database repository shown as a low stacked cylinder, with exactly three tidy table sheets partially visible from it, each visibly organized into rows and columns. Table sheets show blank structured cells, no text and no data values. Make the grid structure the main explanatory detail. No server hardware, gears, application-window chrome, arrows, speech bubbles or code. No text anywhere. The illustration must suggest stored structured tables, not a computer or a programming language.

## 2. sql-server

Asset: `src/assets/lessons/1-1-sql-server.png`.

Prompt nguyên văn:

Create a single compact educational concept illustration for a beginner Vietnamese SQL lesson, to be displayed at only 320–400 CSS pixels wide. Landscape canvas around 2:1, very tight useful framing with comfortable margins. Mature clean textbook object illustration, subtle isometric depth, crisp clear forms, white background, navy #172B4D, royal blue #215CE5, pale blue #EDF3FF, a little muted sage. Consistent visual language, minimal objects, no glossy 3D, no heavy gradients, no enclosing decorative card. Absolutely NO people, faces, hands, characters, offices, desks, plants or mascots. No logos, watermarks, tiny writing, invented numbers or fake software screenshot. This is a conceptual illustration, not verified database results. Labels and definitions will be accessible real HTML outside the image. Subject: SQL SERVER as management SOFTWARE. A recognizable abstract application window with a simple title bar, containing two small blue database repositories and a distinct settings/management gear in its side area. A tiny orderly blank table preview in the window is fine. The window frame enclosing the databases is the key idea: software manages storage and access. No physical server rack, tower, building, cloud, padlock, shield or checkmark. No command prompt, code or conversation bubbles. No text anywhere, including no product logo or SQL Server wording; the real label outside the image will say SQL Server. Do not imitate SSMS or a real software screenshot.

## 3. sql-language

Asset: `src/assets/lessons/1-1-sql-language.png`.

Prompt nguyên văn:

Create a single compact educational concept illustration for a beginner Vietnamese SQL lesson, to be displayed at only 320–400 CSS pixels wide. Landscape canvas around 2:1, very tight useful framing with comfortable margins. Mature clean textbook object illustration, subtle isometric depth, crisp clear forms, white background, navy #172B4D, royal blue #215CE5, pale blue #EDF3FF, a little muted sage. Consistent visual language, minimal objects, no glossy 3D, no heavy gradients, no enclosing decorative card. Absolutely NO people, faces, hands, characters, offices, desks, plants or mascots. No logos, watermarks, tiny writing, invented numbers or fake software screenshot. This is a conceptual illustration, not verified database results. Labels and definitions will be accessible real HTML outside the image. Subject: SQL as a LANGUAGE FOR REQUESTING DATA, distinct from stored data and management software. A prominent simple message/code document on the left with only the large exact uppercase word SQL, followed by one subtle right-pointing arrow toward a small clean table-result card on the right. The table result has blank rows and columns. Behind the result card, a small understated blue repository symbol may indicate its data comes from stored tables, but the primary focus is the request document and returned tabular answer. SQL is the request language, not the repository or a server machine. No executable SELECT statement, no syntax lesson, no fictitious data values, no UI toolbar. The ONLY text anywhere is the large exact word SQL. Do not include letters inside the table. No double-headed arrows, no synchronization or file-editing symbols.

## Kiểm và phạm vi

Đã xem cả ba ảnh: database là kho có nhiều bảng; SQL Server là phần mềm bao quanh các database với biểu tượng quản lý; SQL là yêu cầu và bảng kết quả. Ảnh không có người, mã hồ sơ, số liệu hoặc câu SELECT để chạy. Chữ SQL trong ảnh cuối đúng ba ký tự; alt và nhãn/caption HTML vẫn tự đủ nghĩa. Các grid là minh họa, không phải Result đã kiểm.

Bản nháp kể chuyện có nhân vật đã bị người dùng loại; không tham chiếu hay lưu ảnh đó trong project. Các bản nháp gốc tại thư mục generated_images của công cụ được giữ nguyên, không xuất bản.

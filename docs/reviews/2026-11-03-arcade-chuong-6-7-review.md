# Review Arcade chương 6 (2-6) và chương 7 (2-7)

## 1. Phạm vi, phiên bản, công cụ thực tế

- Phạm vi: 10 bài luyện. `src/content/arcade/2-6/` (4 bài) và `src/content/arcade/2-7/` (6 bài). Mỗi bài có 2 unit test và 3 hidden test, tổng 20 unit test và 30 hidden test.
- Phiên bản: nhánh `feat/arcade-mvp`, commit `606e7d8`. Không có bản build HTML được giao, nên giao diện chỉ được đánh giá qua đọc mã nguồn.
- Vai trò: học viên chỉ biết Excel văn phòng cơ bản. Kiến thức nền lấy từ `src/content/lessons/1-1` tới `1-5` và `2-1` tới `2-7`. Không dùng bài sau, không dùng đáp án để bù phần chưa dạy.
- Công cụ thực tế (chỉ đọc):
  - Đọc `AGENTS.md`, `docs/quy-uoc.md` (mục 2.8, 4.5), spec Arcade mục 6 và 8, và các bài học nêu trên.
  - Dùng một script Node nhỏ trong thư mục scratchpad để in YAML. Script chỉ đọc file, không chạm database, API hay `.env`. Nó có hai chế độ: chế độ "học viên" (đề, bảng, unit test, `expected`) và chế độ "ẩn" (`answer`, hidden test, `catches`).
  - Đọc mã giao diện và chấm để biết học viên thật sự thấy gì: `src/components/islands/ArcadeTable.tsx`, `src/styles/lesson.css` (dòng 118-120), `src/lib/grade.ts`, `src/pages/luyen-sql/[id].astro`.
  - Không chạy SQL, API, `check:arcade` hay trình duyệt. Việc `check:arcade` đạt chỉ được ghi nhận theo lời giao, không tự kiểm.
- Thứ tự làm việc: đọc bài học, rồi xem phần học viên thấy của từng bài và ghi nhận xét về đề, rồi mới mở `answer`, hidden test và `catches`. Phần "Học thử" ở mục 2 được viết từ phần học viên thấy. Tôi đã đọc bảng "Bẫy chính" trong quy ước 2.8 trước khi bắt đầu, nên không giả vờ chưa biết chương này nhắm bẫy nào.
- Không chép đáp án vào report. Tên hàm hoặc từ khóa chỉ nêu ở mức "cần kiến thức gì".

## 2. Rà theo thứ tự bài

Thứ tự theo trường `order`. Các bài học chương này dạy: `DISTINCT` (2.6); `UPPER`, `LOWER`, `LEN`, `LEFT`, `RIGHT`, `SUBSTRING`, `TRIM`, `CONCAT`, `COLLATE ... LIKE` (2.7). Bài học chưa dạy `<>`, `>`, `<`, `NOT`, `+` nối chuỗi, `REPLACE`, `CHARINDEX`. Không có bài Arcade nào trong hai chương dùng các thứ này làm đáp án. Các `catches` có dùng, điều này đã được duyệt.

### Chương 2-6 (DISTINCT)

#### 2-6 / bài 1: `cac-phong-dang-co` (Dễ)

- Học thử: đề chỉ yêu cầu "mã phòng xuất hiện trong bảng, mỗi mã một dòng". Cần `SELECT DISTINCT` một cột. Dạy ở bài 2.6, nguyên văn ví dụ chính của bài. Không thiếu gì.
- Đề: đủ cột, đủ phạm vi, không chấm thứ tự (hợp lý). "Mã phòng" ánh xạ sang `MaPB` đã được bài 2.2 và 2.6 cho biết. Một cách hiểu duy nhất.
- Unit test: khớp với dữ liệu vào theo mắt đọc. UT1 (KD, KD, IT) cho IT, KD. UT2 (KT, KT, NS) cho KT, NS.
- Hidden: H3 (VH, KD) đúng. H4 (KD, IT, NS) đúng. H5 (BGD, KT, VH) đúng. Cả ba đều công bằng với đề.
- Nhận xét về `catches`: cả ba bắt kiểu "khớp riêng với dữ liệu unit test" (danh sách mã cố định, `TOP (2)`, ghép MIN và MAX). Không bài học nào dạy học viên làm vậy. Xem nhận xét X3.
- Giữ được. Bài này gần như chép ví dụ của bài 2.6 (đổi tên bảng, bỏ `ORDER BY`). Hợp với mức Dễ.

#### 2-6 / bài 2: `cap-phong-chuc-danh` (Dễ)

- Học thử: cần `DISTINCT` hai cột. Bài 2.6 dạy rõ, kể cả ví dụ "19 cặp thay vì 6 mã". Không thiếu gì.
- Đề: "những cặp phòng và chức danh đang có ... mỗi cặp khác nhau một dòng". Thứ tự cột là mã phòng rồi mã chức danh, khớp `columns`. Chữ "đang có" không thêm điều kiện lọc nào. Một cách hiểu duy nhất. `MaCD` = mã chức danh có định nghĩa tại 2.6.
- Unit test khớp dữ liệu vào (UT1 ra IT/NV và KD/CV; UT2 ra KT/TP).
- Hidden: H3 (KD/CV, KD/TP) đúng. H4 (KD/CV, IT/CV) đúng. H5 đúng. Công bằng. H3 và H4 kiểm đúng chỗ người mới hay hiểu sai, tức "chỉ bỏ trùng theo một cột". Đây là các `catches` có nghĩa nhất của chương.
- Giữ được. Lại gần như chép ví dụ của bài 2.6.

#### 2-6 / bài 3: `o-trong-mot-dong` (Vừa)

- Học thử: cần `DISTINCT` một cột và `ORDER BY ... ASC`, không được lọc bỏ `NULL`. Đã dạy ở 2.4 và 2.6. Hai ý chưa được dạy ở đâu:
  - Chỗ dòng `NULL` đứng khi "xếp tăng dần".
  - `DISTINCT` gộp nhiều `NULL` thành một dòng.
- **F6.1 Cần làm rõ: vị trí dòng NULL.**
  - Câu gốc: "xếp tăng dần. Những người chưa được phân chi nhánh (ô NULL) cũng phải hiện thành một dòng trong kết quả." Vị trí: `o-trong-mot-dong.yaml`, `prompt`; `expected` của test 1 và 2.
  - Tác động: bài chấm thứ tự dòng (`ordered: true`) mà đề không nói dòng `NULL` ở đầu hay cuối. Người quen Excel thường kỳ vọng ô trống nằm cuối khi sắp tăng dần. Bài 2.4 chỉ nói "NULL học ở bài 2.5". Bài 2.5 không nói gì về `ORDER BY` với `NULL`. Người làm đúng cú pháp vẫn đạt, vì SQL Server tự đặt `NULL` lên đầu và unit test hiển thị đúng điều đó (ô `NULL` hiện chữ NULL trong bảng). Nhưng nếu học viên cố ép `NULL` xuống cuối thì không có công cụ nào đã học để làm, và bài không giải thích vì sao `NULL` đứng đầu.
  - Căn cứ: grep bài 2.4, 2.5, 2.6 không có câu nào về thứ tự của `NULL`. `expected` UT1 là `[NULL, Cần Thơ, Hà Nội]`.
  - Đề xuất: thêm một vế vào đề, ví dụ "dòng NULL xếp đầu tiên", hoặc thêm một câu vào bài 2.5 hoặc 2.4 về chỗ đứng của `NULL`. Đây là thông số thứ tự dòng chứ không phải gợi ý cách làm.
- **F6.2 Cần làm rõ (nằm ở bài học 2.6): DISTINCT coi nhiều NULL là một.**
  - Câu gốc trong đề: "cũng phải hiện thành một dòng". Vị trí: `prompt`; UT2 có hai `NULL` ra một dòng.
  - Tác động: bài 2.5 vừa dạy "so sánh với NULL cho UNKNOWN". Người học hoàn toàn có thể thắc mắc vì sao `DISTINCT` lại coi hai `NULL` là một giá trị. Bài 2.6 không nhắc `NULL` nào. Đề và UT2 đủ để làm đúng, nhưng không trả lời được câu "vì sao".
  - Đề xuất: một câu ở 2.6 ("`DISTINCT` coi các ô `NULL` là cùng một giá trị nên chỉ giữ một dòng `NULL`"). Không cần sửa bài Arcade.
- Đề khác: tiêu đề bài "Danh sách nơi làm việc" còn đề nói "chi nhánh". Không gây hiểu nhầm.
- Hidden: H3 (NULL, Vinh) đúng. H4 (An Giang, Bắc Ninh, Cà Mau, Đồng Nai, NULL) đúng với thứ tự bảng chữ cái. H5 (Hà Nội, NULL, HN) cho `[NULL, Hà Nội, HN]`. Thứ tự "Hà Nội" trước "HN" phụ thuộc collation (`a` đứng trước `N` khi so chữ không phân biệt dấu ở mức đầu). Với từ điển cũng hợp lý, nhưng tôi **chưa xác minh bằng chạy**.
- Công bằng: ba hidden không đòi gì ngoài đề. Nhưng cả ba `catches` đều là kiểu "khớp riêng dữ liệu" hoặc "cắt bớt". Xem X3.
- Độ khó: nhãn Vừa hợp lý về khối lượng, thực chất khó nhờ phần `NULL` nên F6.1 càng cần nói rõ.

#### 2-6 / bài 4: `danh-muc-co-loc` (Khó)

- Học thử: cần `WHERE` với chữ tiếng Việt `N'Đã thanh toán'` (2.2), `AND` (2.3), `>=` với ngày dạng `yyyymmdd` (2.2), `DISTINCT` hai cột (2.6), `ORDER BY` hai tiêu chí (2.4). Tất cả đã dạy. Không thiếu gì.
- Đề: rất rõ. Tên cột và giá trị trạng thái được nêu ("TrangThai là Đã thanh toán"), mốc ngày kèm "gồm cả ngày đó", thứ tự hai cấp nêu đủ. Đổi `01/07/2026` sang `'20260701'` đúng điều bài 2.2 dạy ("`'20261001'` là `01/10/2026`").
- Unit test: khớp dữ liệu vào. Lưu ý cả hai unit test đều không có dòng nào bị lọc, và không có hai dòng cùng nơi đến khác mã phòng. Nên unit test không cho học viên thấy lọc có tác dụng. Đây là thiết kế chủ ý để hidden test bắt. Người quên lọc vẫn qua unit test rồi trượt H3/H4 và mất công đoán. Không phải lỗi, vì đề nêu rõ.
- Hidden: H3 (Chờ duyệt bị loại) đúng. H4 (ngày đúng mốc được giữ, 30/06 bị loại) đúng. H5 (ba dòng Huế, mã phòng tăng dần: IT, KD, KT) đúng. Cả ba kiểm đúng điều đề đã nói: trạng thái, biên ngày, tiêu chí phụ. `catches` ở đây là loại lỗi người học thật sự mắc. Giữ được.
- **F6.3 Biên tập: nhãn đúng từng chữ không nằm trong “…”.**
  - Câu gốc: "(TrangThai là Đã thanh toán)". Quy ước 2.8 yêu cầu nhãn phải ghi đúng từng chữ thì đặt trong dấu nháy kép “…”. Hậu quả thực tế rất nhỏ vì dữ liệu cho thấy đúng chữ, nhưng nên theo quy ước.
- **F6.4 Biên tập: nhãn Khó.** Độ khó do số bước, không do khái niệm mới. Học viên đã xong 2.2 tới 2.6 chỉ cần ghép các mảnh đã học. Phân bố 2/1/1 đã được duyệt nên chỉ ghi chú, không đề nghị bàn lại.

### Chương 2-7 (hàm chuỗi)

#### 2-7 / bài 1: `viet-hoa-ho-ten` (Dễ)

- Học thử: cần `UPPER`. Bài 2.7 có hàm này kèm nói rõ "giữ dấu". Không thiếu gì.
- Đề: "họ tên đã đổi thành chữ hoa cho mọi dòng". Hai cột, thứ tự rõ. Không có chỗ nào hiểu hai cách.
- Unit test khớp, UT1 có cả dòng đã viết hoa sẵn.
- Hidden: H3 và H5 đúng. H4 có tên bắt đầu bằng dấu cách (` Giáp Thị Vân`) và `expected` giữ nguyên dấu cách đó.
- **F7.1 Cần sửa: H4 đòi giữ dấu cách đầu, đề không nói gì, và học viên không nhìn thấy sự khác biệt.**
  - Câu gốc: đề "họ tên đã đổi thành chữ hoa". Hidden 4: `["NV121"," Giáp Thị Vân"]` với `expected` `" GIÁP THỊ VÂN"`. `catches` là kiểu có thêm `TRIM`.
  - Tác động: người thêm `TRIM` "cho sạch", một việc bài 2.7 vừa dạy và hoàn toàn hợp lý với thẻ in, sẽ trượt H4. Đề không yêu cầu bỏ dấu cách, nhưng cũng không dặn giữ nguyên. Quan trọng hơn: bảng dữ liệu và kết quả trên trang dùng `white-space: nowrap` nên dấu cách đầu và cuối ô bị trình duyệt gộp mất (xem X1). Nếu học viên tốn 10 coin mở H4, họ sẽ thấy hai ô giống hệt nhau, và lý do trả về chỉ là "dòng ... không có trong đáp án". Họ không có cách nào hiểu mình sai ở đâu.
  - Căn cứ: `grade.ts` so chuỗi chính xác (`JSON.stringify`), nên một dấu cách cũng làm sai. `quy-uoc.md` 2.8: "đề đã nói phạm vi thì dữ liệu ẩn chỉ kiểm phạm vi đó".
  - Đề xuất, chọn một: (a) thay H4 bằng một lỗi nhìn thấy được; (b) giữ H4 nhưng thêm vào đề "chỉ đổi sang chữ hoa, không sửa gì khác" và làm giao diện hiện được dấu cách (X1); không nên chỉ giữ như hiện nay.
- Hidden còn lại: H3 (`MaNV LIKE 'NV1%'`) và H5 (`TOP (1)` ghép `UNION ALL`) là `catches` khớp dữ liệu unit test, xem X3. Công bằng nhưng không dạy được gì.

#### 2-7 / bài 2: `ba-so-cuoi-cua-ma` (Dễ)

- Học thử: cần `RIGHT`, bài 2.7 có ví dụ `NV007` ra `007` và mục "Coi phần số của mã là số". Không thiếu gì.
- Đề: "Mã hợp đồng có dạng năm, dấu gạch và ba số, như 2026-007. ... lấy mã hợp đồng và ba ký tự cuối của mã, giữ nguyên các số 0 ở đầu." Hai cột rõ. Câu "giữ nguyên các số 0 ở đầu" hơi nói trước bẫy chuyển sang số (chấp nhận được, vì đây là yêu cầu kết quả).
- Unit test khớp.
- **F7.2 Cần sửa: hidden test nằm ngoài khuôn dạng đề đã nêu.**
  - Câu gốc: đề "có dạng năm, dấu gạch và ba số". Hidden 4: `["2024-1001","NV121"]` ra `"001"`. Hidden 3: `["26-007"]`.
  - Tác động: H4 có bốn số sau dấu gạch, trái với "ba số" ở đề. Cột trả về lại tên "Số thứ tự", mà số thứ tự của `2024-1001` phải là `1001`, không phải `001`. Đề có hai mô tả cho cùng một việc ("ba số" và "ba ký tự cuối") và hai mô tả này tách nhau chỉ trên dữ liệu ngoài khuôn dạng. Người đọc đề và dùng cách tính theo vị trí cố định (hợp với khuôn dạng đề tả) sẽ trượt H3 và H4 dù đã làm theo khuôn dạng. Đề chỉ rõ "ba ký tự cuối" nên phán quyết có cơ sở, nhưng người làm đã nghe đề tả khuôn dạng khác.
  - Căn cứ: `quy-uoc.md` 2.8 như trên. `catches` của H4 là câu cố ý kèm `WHERE LEN(MaHD) = 8`, không phải lỗi người học nào thật sự mắc. Còn H3 và H4 cùng bắt một lỗi (vị trí cố định), nên H4 gần như thừa.
  - Đề xuất: đổi H4 thành mã đúng khuôn dạng (hoặc thay bằng ca khác), giữ H3 nếu đề nói rõ năm có thể ngắn hơn. Cách khác: bỏ câu tả khuôn dạng trong đề, chỉ giữ "ba ký tự cuối của mã".
- H5 (`1999-100`, `2026-200`): đúng. `catches` lọc theo tiền tố `202`, kiểu khớp dữ liệu (X3).

#### 2-7 / bài 3: `bo-khoang-trang-thua` (Vừa)

- Học thử: cần `TRIM` và `LEN`, lồng hàm. Dạy ở 2.7 (bảng hàm, đoạn "hàm nằm trong được tính trước"). Đủ.
- Đề: rõ. "dấu cách ở hai đầu", "số ký tự ... sau khi bỏ", ba cột đúng thứ tự.
- **F7.3 Cần làm rõ (nhẹ): LEN và dấu cách đầu.**
  - Câu gốc trong bài 2.7: "`LEN` của SQL không tính dấu cách cuối". Hidden 4 và 5 dựa vào việc `LEN` vẫn tính dấu cách đầu, điều bài không nói thẳng.
  - Tác động: UT1 và UT2 chỉ có dấu cách ở cuối, nên `LEN` không cần bọc `TRIM` vẫn qua unit test. Chữ "cuối" trong bài đủ để suy ra điều ngược lại, nhưng người học dễ khái quát thành "LEN bỏ qua dấu cách". Đề đã nói "sau khi bỏ" nên làm đúng đề vẫn đạt, vì vậy không ảnh hưởng tính công bằng.
  - Đề xuất: thêm vế "còn dấu cách đầu thì có tính" vào dòng LEN của bài 2.7.
- **Dữ liệu vào không nhìn thấy được.** Dấu cách thừa trong cột `HoTen` của unit test không hiện ra trên trang (X1), nên học viên không thấy được dữ liệu "bẩn" mà đề tả. Họ chỉ đoán được qua cột số ký tự.
- Hidden: H3 (có tên 3 ký tự), H4 (3 dấu cách đầu), H5 (cả hai đầu) đều đúng và công bằng. H4 và H5 là các lỗi người học thật có thể mắc (`LEN` trên chuỗi chưa cắt; chỉ cắt cuối). H3 có `catches` là `WHERE LEN(HoTen) >= 5`, khớp dữ liệu (X3). `RTRIM` ở `catches` H5 chưa được dạy, nhưng được phép vì học viên không thấy.
- Các `LEN` tôi đếm tay đều khớp `expected`: 11, 13, 10, 7, 3, 8, 8, 7, 8, 7.

#### 2-7 / bài 4: `ghep-nhan-phieu` (Vừa)

- Học thử: cần `CONCAT` và chuỗi `N' - '`. Bài 2.7 dạy trực tiếp, kể cả việc dấu phân cách phải tự viết. Đủ.
- Đề: nhãn tả bằng lời "mã nhân viên, dấu cách, dấu gạch ngang, dấu cách rồi họ tên", ví dụ `NV101 - Lê Ánh`. Dấu gạch trong dữ liệu là ký tự gạch nối thường, trùng với bài 2.7.
- **F7.4 Cần làm rõ: cột "mã phòng" của người chưa có phòng.**
  - Câu gốc: "lấy mã phòng và nhãn đó cho mọi dòng. Người chưa có mã phòng vẫn phải có nhãn." Vị trí: `ghep-nhan-phieu.yaml` `prompt`; H3 `expected` `[NULL, "NV311 - Tăng Linh"]`.
  - Tác động: cả hai unit test không có dòng `MaPB` rỗng, nên học viên chưa bao giờ thấy ô này sẽ ra gì. Đề không nói cột mã phòng của họ hiện `NULL` hay hiện nhãn thay thế. Bài 2.5 vừa dạy đúng việc ghi "(chưa có)" vào ô thiếu bằng `COALESCE`, nên làm vậy là một cách hiểu khá hợp lý, và học viên sẽ trượt H3 mà không biết vì sao (hidden chưa mở chỉ báo chưa đạt).
  - Đề xuất: thêm một dòng `MaPB` rỗng vào một unit test, hoặc nêu "giữ mã phòng như trong bảng".
- Nhận xét thêm (Biên tập): `NULL` ở đây nằm ở cột không đưa vào nhãn (`MaNV`, `HoTen` đều `NOT NULL`). Bài không kiểm chuyện `CONCAT` coi `NULL` là chuỗi rỗng như bài 2.7 dạy, chỉ kiểm việc không lọc bỏ dòng. Câu "vẫn phải có nhãn" có thể làm học viên nghĩ `NULL` ảnh hưởng nhãn. Không sai, chỉ lệch khỏi ý định ghi ở bảng bẫy "ô NULL".
- Hidden: H4 (mã `VH` lạ) và H5 (tên 19 ký tự) đúng. Các `catches` khớp dữ liệu (danh sách phòng cố định, `LEFT(HoTen, 15)`), xem X3.
- Quy ước nhãn: ví dụ `NV101 - Lê Ánh` không đặt trong “…”. Câu kết thúc bằng dấu chấm ngay sau tên. Nhỏ, nhưng đây đúng là nhãn ghi từng chữ nên nên đặt trong dấu nháy.

#### 2-7 / bài 5: `ma-giua-trong-chuoi` (Khó)

- Học thử: cần `SUBSTRING`, `LEN`, và lọc theo phần giữa của mã. Có hai cách theo kiến thức đã học: hàm trong `WHERE`, hoặc `LIKE` với `_` (bài 2.3). Đủ nhưng xem F7.5.
- Đề: rõ về khuôn dạng và vị trí 5, 6 (chuẩn: HS26KD014, `K` ở vị trí 5, `D` ở vị trí 6). Ba cột khớp thứ tự.
- **F7.5 Biên tập: đề đưa gần như trọn tham số, và chưa có ví dụ dùng hàm trong WHERE.**
  - Câu gốc: "mã phòng lấy từ vị trí 5 và 6 của mã hồ sơ". Đề tả khuôn dạng bằng lời rồi lại cho vị trí, nên vị trí 5 và độ dài 2 gần như được trao sẵn (tính chất gợi ý, quy ước nói "không gợi ý"). Chấp nhận được vì cần nói rõ khuôn dạng, nhưng một trong hai cách tả là đủ. Mặt khác, bài 2.7 chỉ minh họa hàm chuỗi trong `SELECT` (và `COLLATE` trong `WHERE`). Học viên mới có thể không chắc `WHERE` cho phép hàm ở vế trái. Lối `LIKE 'HS__KD%'` học ở 2.3 vẫn giải được, nên không chặn.
- Unit test khớp: 15, 7, 11 đếm tay đúng.
- Hidden: H3 (`HS26ITKD1` có `KD` nằm ở chỗ khác) bắt lỗi thật (tìm `KD` ở mọi nơi). Dòng này có số thứ tự `KD1` không phải số, trái chữ "số thứ tự" của đề, nhưng đề định nghĩa mã phòng theo vị trí nên không mơ hồ. H4 (năm khác 2x) và H5 (tiêu đề dài 34 ký tự) đúng; `catches` là kiểu khớp dữ liệu (`'HS2_KD%'`, cắt 20 ký tự).
- Công bằng: người làm đúng đề (kể cả bằng `LIKE 'HS__KD%'`) đều đạt cả ba hidden.
- Độ khó: xem F6.4, tương tự.

#### 2-7 / bài 6: `tim-khong-dau` (Khó)

- Học thử: cần `LIKE` với `%`, `COLLATE Latin1_General_CI_AI`, `N'...'`, `ORDER BY`. Bài 2.7 có đoạn nói đúng điều này kèm mục "Hay nhầm" 2 và 4. Đủ.
- Đề: rõ và có lý do tình huống ("Lễ tân chỉ gõ được không dấu"). "Bắt đầu bằng ngo", "ví dụ Ngô hay Ngọc đều được tính". Xếp mã tăng dần, mã không trùng. Một cách hiểu duy nhất.
- Quy ước nhỏ: `ngo` nên đặt trong “…” để không đọc nhầm dính vào câu.
- Unit test khớp. UT1 đã có `Ngô`, nên người chọn `Vietnamese_CI_AI` hay chỉ `LIKE N'ngo%'` trượt ngay ở unit test, không mất coin vào hidden.
- Hidden: H3 (`Lê Ngọc Châu` có ngo ở giữa), H4 (`Ngoan Nguyễn`, `Ngộ Không`, bắt người chỉ liệt kê hai ví dụ trong đề), H5 (`Nguyễn An` bắt tiền tố quá ngắn). Cả ba đúng với đề và đều là lỗi người học thật có thể mắc. Đây là bộ hidden test tốt nhất của hai chương. Giữ được.
- Chưa xác minh: việc `Latin1_General_CI_AI` coi mọi dấu của chữ `o` (ô, ọ, ộ) là cùng chữ. Bài 2.7 chỉ chứng minh với `Đ`, `Â`. Dữ liệu test dùng ô, ọ, ộ nên `expected` phụ thuộc điều này và đã được tạo từ database thật.
- Độ khó: gần như ví dụ `bui%` của bài 2.7 đổi chữ, xem F6.4.

## 3. Bảng tiền đề từng bài

| Bài | Cần | Dạy ở | Còn thiếu |
|---|---|---|---|
| 2-6 `cac-phong-dang-co` | `SELECT DISTINCT` một cột | 2.6 | Không |
| 2-6 `cap-phong-chuc-danh` | `DISTINCT` nhiều cột | 2.6 | Không |
| 2-6 `o-trong-mot-dong` | `DISTINCT`, `ORDER BY ASC`, không lọc `NULL` | 2.4, 2.5, 2.6 | `NULL` đứng đầu khi sắp tăng dần (F6.1); `DISTINCT` gộp `NULL` (F6.2) |
| 2-6 `danh-muc-co-loc` | `WHERE =` với `N'...'`, `AND`, `>=` ngày `yyyymmdd`, `DISTINCT` hai cột, `ORDER BY` hai cột | 2.2, 2.3, 2.4, 2.6 | Không |
| 2-7 `viet-hoa-ho-ten` | `UPPER` | 2.7 | Không (xem F7.1 về hidden) |
| 2-7 `ba-so-cuoi-cua-ma` | `RIGHT` | 2.7 | Không (xem F7.2 về hidden) |
| 2-7 `bo-khoang-trang-thua` | `TRIM`, `LEN`, lồng hàm | 2.7 | `LEN` tính dấu cách đầu (F7.3) |
| 2-7 `ghep-nhan-phieu` | `CONCAT`, `N' - '` | 2.7 | Cột mã phòng của người thiếu phòng hiện gì (F7.4) |
| 2-7 `ma-giua-trong-chuoi` | `SUBSTRING`, `LEN`, `WHERE` (hàm hoặc `LIKE` với `_`) | 2.3, 2.7 | Không chặn; hàm trong `WHERE` chưa có ví dụ (F7.5) |
| 2-7 `tim-khong-dau` | `LIKE`, `COLLATE ... CI_AI`, `N'...'`, `ORDER BY` | 2.3, 2.4, 2.7 | Không |

## 4. Nhận xét chung

#### X1 Cần làm rõ (công cụ): dấu cách đầu và cuối ô bị gộp trên trang, chưa xác minh trên trình duyệt

- Căn cứ đọc nguồn: `ArcadeTable.tsx` dòng 14 in `String(v)` trong `<td>`, `lesson.css` dòng 120 đặt `.res-grid td { white-space: nowrap }`. Với `nowrap`, trình duyệt gộp dãy dấu cách và bỏ dấu cách đầu và cuối ô. `grade.ts` thì so chuỗi chính xác.
- Tác động: bài `bo-khoang-trang-thua` và hidden 4 của `viet-hoa-ho-ten` có dữ liệu mà cả khác biệt giữa đúng và sai chỉ là dấu cách. Học viên không thể thấy dữ liệu "bẩn" ở unit test, và khi mở hidden chỉ thấy hai chuỗi giống nhau.
- Chưa xác minh trên bản render. Đề xuất: hiện dấu cách đầu và cuối rõ ràng (ví dụ bọc giá trị trong dấu nháy hoặc đổi dấu cách đầu cuối thành chấm giữa) trong bảng dữ liệu của bài Arcade. Cần nói cả trong F7.1.

#### X2 Biên tập: danh sách "Bài cần biết" đồng loạt, không theo từng bài

- Mọi bài 2-6 cùng ghi 2.2, 2.4, 2.6; mọi bài 2-7 cùng ghi 2.3, 2.4, 2.7.
- Bài 1 và 2 của 2-6 không chấm thứ tự và không lọc, nhưng vẫn ghi 2.2 và 2.4. `viet-hoa-ho-ten` chỉ cần 2.7. `o-trong-mot-dong` và `ghep-nhan-phieu` xoay quanh `NULL` nhưng không ghi 2.5.
- Tác động: người mới không biết mình thực sự cần đọc lại bài nào. Đề xuất: ghi theo từng bài, và thêm 2.5 ở hai bài trên.

#### X3 Biên tập: nhiều `catches` chỉ là "khớp riêng dữ liệu unit test"

- Có khoảng sáu hidden test bắt kiểu viết cứng mã, tiền tố hoặc mã nhân viên của unit test, cắt `TOP`, hoặc cắt ký tự: `cac-phong-dang-co` H3, H4, H5; `o-trong-mot-dong` H3, H4; `viet-hoa-ho-ten` H3, H5; `ba-so-cuoi-cua-ma` H5; `ghep-nhan-phieu` H4, H5; `bo-khoang-trang-thua` H3.
- Công bằng và đạt yêu cầu "qua unit test, trượt hidden". Nhưng quy ước 2.8 ưu tiên lỗi người học chương đó có thể mắc. Học viên bỏ 10 coin mở các test này sẽ chỉ học được "đừng viết cứng", điều ít người mới sẽ làm. Mạnh nhất là các test kiểu `tim-khong-dau` H3 tới H5, `bo-khoang-trang-thua` H4 và H5, `danh-muc-co-loc` H3 tới H5, `cap-phong-chuc-danh` H3 và H4. Đề xuất: ở bài 1 của 2-6 và 1 của 2-7, thay dần bằng ca người mới thật sự gặp (ví dụ hoa thường khác nhau trong cùng mã khi `DISTINCT` chạy với collation không phân biệt hoa thường). Mục này không chặn phát hành.

#### X4 Biên tập: nhịp độ khó phẳng, nhiều bài chép ví dụ bài học

- 2-6: bài 1 và 2 gần như chép ví dụ ở bài 2.6. Bài 3 (Vừa) thực chất là câu của bài 2.6 cộng ý `NULL`. Bài 4 (Khó) là ghép ba mảnh đã học, khó ở độ dài.
- 2-7: `viet-hoa-ho-ten`, `ba-so-cuoi-cua-ma`, `ghep-nhan-phieu`, `tim-khong-dau` là ví dụ của bài 2.7 đổi cột hoặc chữ. Hai bài Khó của 2-7 thuộc nhóm đó (`tim-khong-dau`) hoặc là ghép hai hàm (`ma-giua-trong-chuoi`). Chỉ có `bo-khoang-trang-thua` (lồng hai hàm) và `ma-giua-trong-chuoi` đòi ghép mới.
- Nhãn Khó theo phân bố đã duyệt nên chỉ ghi nhận. Khó cảm nhận thực sự nằm ở các bẫy hidden, không ở bài toán. Không có bài lặp nhau trong cùng chương; mỗi bài một hàm khác.

#### X5 Đã kiểm và đúng

- 50 `expected` (20 unit test và 30 hidden test) đối chiếu với dữ liệu vào theo mắt đọc, gồm đếm tay mọi `LEN`: khớp hết.
- Tên bảng tự khai, kiểu cột chỉ `varchar`, `nvarchar`, `date`; ngày có dấu nháy; chuỗi tiếng Việt có chữ hoa đúng chuẩn NFC; không có ký tự gạch hay nháy đặc biệt trong đề.
- Không bài nào dùng `<>`, `>`, `<`, `NOT`, `+`, `REPLACE`, `CHARINDEX` trong `answer`.
- Chưa tìm thấy đề cần hàm hay từ khóa chưa dạy.

## 5. Ưu tiên

| Mức | Mã | Bài | Việc |
|---|---|---|---|
| 1 | F7.1 | `viet-hoa-ho-ten` | Thay hoặc làm rõ H4 (dấu cách đầu, không nhìn thấy, đề không nói) |
| 1 | F7.2 | `ba-so-cuoi-cua-ma` | Đưa H4 (và nếu cần H3) về đúng khuôn dạng đề, hoặc bỏ câu tả khuôn dạng |
| 1 | X1 | công cụ | Hiện dấu cách đầu và cuối trong bảng của Arcade |
| 2 | F7.4 | `ghep-nhan-phieu` | Nói rõ cột mã phòng của người thiếu phòng, hoặc đưa một dòng như vậy vào unit test |
| 2 | F6.1 | `o-trong-mot-dong` | Nêu chỗ dòng `NULL` trong thứ tự dòng |
| 3 | F6.2, F7.3 | bài học 2.6, 2.7 | Mỗi chỗ một câu: `DISTINCT` gộp `NULL`; `LEN` tính dấu cách đầu |
| 3 | X2, X3, F6.3, F7.5 | nhiều bài | Biên tập: "Bài cần biết", nháy kép quanh nhãn, bớt `catches` khớp dữ liệu |
| 4 | X4 | cả hai chương | Chỉ ghi nhận về độ khó |

## 6. Nguồn và giới hạn

- Nguồn: source tại commit `606e7d8`, chỉ đọc. Không có bản build HTML nào được giao, nên không có đối chiếu bản render.
- Kết luận về giao diện (X1) dựa trên đọc `ArcadeTable.tsx`, `lesson.css` và `grade.ts`. Chưa xác minh trong trình duyệt.
- Chưa xác minh bằng chạy: thứ tự collation của `Hà Nội` và `HN` (2-6 `o-trong-mot-dong` H5), chữ `Đ` so với các chữ khác khi sắp xếp, việc `Latin1_General_CI_AI` coi mọi dấu của `o` như nhau, và việc `check:arcade` thực sự đạt (nhận theo lời giao).
- Không đọc report cũ, `database/HRM_Demo.sql`, `.env`, `src/content/exercises`; không chạy SQL, API hay nộp bài.
- Không có tác nhân phụ nào được tạo. Chỉ ghi file này.

## 7. Kết luận

Kiến thức đã dạy tới hết bài 2.7 đủ để làm cả 10 đề. Không đề nào cần hàm hay từ khóa chưa dạy. Chỗ còn vướng:

1. Ba hidden test có thể làm mất coin oan hoặc khó hiểu vì sao sai: `viet-hoa-ho-ten` H4 (dấu cách đầu không nhìn thấy, đề không nói), `ba-so-cuoi-cua-ma` H4 (dữ liệu ngoài khuôn dạng đề), và `ghep-nhan-phieu` H3 (cột mã phòng khi thiếu phòng không được nêu).
2. Hai khoảng trống kiến thức ở bài học: `NULL` đứng đầu khi sắp tăng dần và `DISTINCT` gộp `NULL` (bài `o-trong-mot-dong` vẫn làm được nhờ unit test), cùng chuyện `LEN` có tính dấu cách đầu.
3. Giao diện hiện chưa cho học viên nhìn thấy dấu cách đầu và cuối, điều hai bài của 2-7 dựa vào.

Các hidden test của `tim-khong-dau`, `danh-muc-co-loc`, `cap-phong-chuc-danh` và `bo-khoang-trang-thua` (H4, H5) công bằng và bắt đúng lỗi người học thật.

# Review nội dung độc lập — Làm quen SQL Server

Ngày: 02/11/2026. Reviewer: agent mới, kế thừa model của phiên; không chỉ định hoặc suy đoán tên model khác.

## Phạm vi, phiên bản và cách kiểm thực tế

- Học thử toàn bộ 21 slide trong `src/content/presentations/lam-quen.mdx`, theo thứ tự trình chiếu, cùng toàn bộ 21 khối ghi chú. Đóng vai Business Consultant muốn hiểu đủ để trao đổi và phản biện yêu cầu dữ liệu; giả định chỉ biết Excel cơ bản, chưa biết SQL, lập trình, quản trị, VLOOKUP hoặc PivotTable.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/presentation-template.md`, `docs/ho-so-cong-ty.md`, bài mẫu 1.1 và các bài 1.2/1.4/1.5. Dùng các mục Mục tiêu/Kịch bản/Hình trong spec ngày 02/11 và công việc/trọng tâm trong plan cùng ngày để xác định quyết định đã duyệt; không dùng nhật ký tác giả làm bằng chứng chất lượng. Không đọc report cũ hoặc nhận xét reviewer khác.
- Giữ phạm vi đã duyệt: 21 slide, ID hiện hành, 48 phút giảng + 7 phút hỏi đáp, đối chiếu hai nhóm quan hệ/NoSQL, cầu Excel, ERD tổng quan → bảng/khóa → quay lại ERD. Không áp khung bài đầy đủ hoặc giới hạn từ bài nền, không đề nghị thêm quiz, cú pháp hay thao tác thực hành.
- Phiên bản được nhận dạng bằng `docs/reviews/2026-11-02-lam-quen-narrative/build-manifest.json`: base commit `a67c37a4872daaee7711dbab8bb794fbb8a1f681`, working tree chưa commit, MDX SHA256 `7810930fff8a942ea8a90e43cf60dd757df58a54ac7bb5813897e54a53a469f8`. Cả 11 mục source và hai HTML khớp SHA256 trong manifest khi bắt đầu và khi kiểm lại lúc **04:50:16 UTC ngày 02/11/2026**; không phát hiện source thay đổi trong lúc đọc.
- HTML đã đọc: `dist/bai-giang/lam-quen/index.html` (SHA256 `fa16b468b0281f2604a171e5149d326295c73e667386db0ddd46f9248153ccdf`) và `dist/bai-giang/lam-quen/nguoi-giang/index.html` (SHA256 `d7fbaa1a9a14d59712c78b0619acc84776241c8fdbd3cdfd5bfd730a4586cd4d`). Manifest ghi modifiedAtUTC lần lượt `04:44:36.815895` và `04:44:36.846882`, capturedAtUTC `04:45:02.202926`. Người giao đã làm rõ mốc 11:44 trong gói là giờ host Asia/Saigon, không phải UTC; report dùng mốc manifest.
- Công cụ thực tế: PowerShell `Get-Content`, `rg`, `Get-FileHash`; Python chuẩn `html.parser` để đọc text/alt/notes của HTML; `view_image` để xem bốn PNG nguồn (database, SQL Server, SQL, đồ thị). Đọc toàn bộ SVG phân loại để đối chiếu nhãn; không tuyên bố đã xem SVG trong browser. Lần trích HTML đầu gặp lỗi encoding cp1252 ở stdout; đã đổi stdout của chính tiến trình Python sang UTF-8 và đọc lại đầy đủ.
- Đã đọc nội dung hiển thị của `ConceptFigure.astro`, `ProjectionTable.astro`, `ProjectionRelation.astro`, cùng cách `Slide`/`PresenterNotes` đưa nội dung vào HTML. Chỉ đọc file component tham chiếu schema; **không mở `database/HRM_Demo.sql`**, secret, SQL ngoài khóa học; không kết nối DB, chạy SQL, API/runner hay nộp bài. Không tương tác browser và không chạy lại bộ test/build.
- HTML có đúng 21 slide, tổng `data-minutes` là 48; trang người giảng có 21 khối notes. Đây là kiểm cấu trúc/text của HTML, không phải kiểm thời gian giảng thật hoặc UI.

## Rà theo thứ tự 21 slide

Trong bảng, “giữ được” đánh giá nội dung đọc được, không xác nhận dữ liệu live hoặc hành vi UI. Các vị trí dòng là của phiên bản MDX nêu trên; hình dùng component được đọc tới nội dung render tương ứng.

| # / slide | Tự hỏi và đối chiếu với lời/hình đang có | Đánh giá |
|---|---|---|
| 1 — `database-la-gi`, dòng 21–34 | “Database … là tập dữ liệu được tổ chức…” trả lời database là gì; “ở một nguồn chung” cho mục đích dùng chung. Hình các bảng được ghi rõ “Ví dụ dạng quan hệ”, nên không lấy hình này làm định nghĩa cho mọi database. Notes nhắc quyền và giảm lệch bản sao, không đổi nghĩa phần chiếu. | **Giữ được.** Không hứa nguồn chung tự bảo đảm nghiệp vụ đúng; không đồng nhất database với cửa sổ phần mềm. |
| 2 — `cac-mo-hinh-luu-tru`, dòng 36–52 | Vì sao có hai ảnh khác nhau? Hình bảng và đồ thị, cùng câu “Ảnh đồ thị chỉ minh họa một dạng NoSQL”, trả lời đúng phạm vi. Nhưng “tài liệu, khóa–giá trị” mới được gọi tên trên màn chiếu; nghĩa ngắn chỉ có trong notes. Alt ảnh bảng nói tới một ô, trong khi SVG đánh dấu dòng, cột và cả bảng. | **Cần làm rõ F2; Biên tập F4.** Credit/tác giả/giấy phép có ở phần chiếu và notes; không yêu cầu đọc nhãn tiếng Anh để tiếp tục bài. |
| 3 — `so-sanh-cac-dang-database`, dòng 54–68 | Tại sao khóa học đi theo quan hệ, và tên sản phẩm có phải dữ liệu không? Hàng “Trong khóa học” và “Phần mềm ví dụ” trả lời được. Bảng có đủ bốn tiêu chí đã duyệt; “nhu cầu ví dụ” không phải tuyên bố mỗi nhóm độc quyền một tác vụ. Từ “tài liệu/khóa–giá trị” tiếp tục dựa vào phần chỉ nói trong notes của slide 2. | **Giữ được cấu trúc so sánh; F2 áp dụng chung.** Không có lời khẳng định NoSQL không có cấu trúc/quan hệ/SQL hoặc luôn nhanh hơn. |
| 4 — `tu-excel-den-database-quan-he`, dòng 70–84 | Workbook/sheet nghĩa là gì, vì sao phép so sánh hữu ích và giới hạn ở đâu? Bảng giải nghĩa tại chỗ, rồi câu “Đây là phép so sánh…” tách Excel khỏi SQL Server. “Cột được thiết kế sẵn” chuẩn bị cho bảng ở phần sau. Notes thừa nhận Excel chia sẻ/kiểm nhập được và không hứa đồng bộ file. | **Giữ được.** Không cần biết hàm dò; chưa cần giải thích đầy đủ mọi khác biệt của sheet. |
| 5 — `sql-server-la-gi`, dòng 86–99 | SQL Server làm gì, có phải máy chủ không? Định nghĩa phần mềm của Microsoft và định nghĩa máy chủ nằm ngay phần chiếu; hình ghi rõ chỉ minh họa việc quản lý. Luật dữ liệu được giới hạn bằng “đã khai báo”. | **Giữ được.** Hình ứng dụng khái niệm không bị trình bày thành ảnh SSMS thật. |
| 6 — `sql-la-gi`, dòng 101–114 | SQL dùng để làm gì, phần mềm nào xử lý? Câu định nghĩa SQL/truy vấn, nhãn “Lấy họ tên nhân viên” và câu sau ví dụ trả lời đủ cho mục tiêu nhận diện vai trò. Kết quả ghi “trích”, thứ tự được cảnh báo có thể khác. | **Giữ được.** Không dùng việc chưa dạy cú pháp SELECT làm lỗi: đây là minh họa đã duyệt, không có yêu cầu chạy hoặc tự viết. Kết quả live chưa xác minh. |
| 7 — `bon-ten-can-phan-biet`, dòng 116–130 | SSMS ở đâu trong bốn tên, đóng cửa sổ có mất dữ liệu không? Sơ đồ công cụ → ngôn ngữ → phần mềm → dữ liệu và hai câu chiếu trả lời rõ; caption nói kết quả trả ngược. Câu dẫn HRM_Demo đưa người học từ vai trò công cụ sang cấu trúc. | **Giữ được.** Notes mở rộng tên tiếng Anh SSMS nhưng nghĩa cần dùng đã có trên chiếu. |
| 8 — `du-lieu-trong-database`, dòng 132–146; `ConceptFigure` dòng 6–13 | Mỗi vùng là gì, có phải toàn bộ database không? Caption “trích dữ liệu từ ba bảng”, nhãn danh mục/hồ sơ/hợp đồng và các cặp mã–giá trị phân biệt được ba nhóm. Hai hợp đồng hiện trong hình không bị gọi là tổng số hợp đồng của NV021. “ERD biểu diễn…” gọi chữ viết tắt trước định nghĩa ở slide 9. | **Giữ được hình trích; Biên tập F3.** Không kết luận hình thiếu dòng vì chỉ có hai hợp đồng. |
| 9 — `so-do-quan-he-erd`, dòng 148–164 | Vì sao ERD khác dữ liệu vừa xem? “Hộp… bảng và các cột”, “Đây là cấu trúc, không phải các dòng hồ sơ” trả lời trực tiếp. Cùng bố trí ba bảng được giữ để chuẩn bị phóng vào NhanVien. HTML tổng quan chỉ có nét trung tính, không có PK/FK/1/∞. | **Giữ được.** Không yêu cầu người mới đọc khóa trước khi dạy; notes giải thích đường của schema lấy từ FK khai báo, không gọi hình là dữ liệu hồ sơ. |
| 10 — `bang-trong-database`, dòng 166–182 | Bảng chứa gì, tên cột có phải hồ sơ đầu tiên? Định nghĩa bảng, caption “ba cột và hai hồ sơ”, cùng lời phân biệt thiết kế với dòng trả lời đủ. Hai dòng nối đúng các giá trị đã thấy ở hình trước. | **Giữ được.** Chưa trích các cột khác không làm ví dụ thành toàn bộ bảng. |
| 11 — `bang-dong-cot`, dòng 184–200 | Một dòng/một cột mang nghĩa gì? Định nghĩa dòng–bản ghi và cột ở phần chiếu; caption chỉ cả dòng NV001 và cột HoTen. `markRow=0`, `markColumn=1` đúng dữ liệu chỉ. Câu về HopDong ngăn đồng nhất mọi dòng với một người. | **Giữ được.** Hình giúp chỉ phần đang nói; chưa thể kết luận màu/độ đọc thực tế từ HTML. |
| 12 — `thong-tin-o-nhieu-bang`, dòng 202–216; `ConceptFigure` dòng 14–21 | Vì sao tách bảng, có phải ba người NV021 không? Hình một hồ sơ với ba mã hợp đồng, câu “để nhắc tới một hồ sơ” và lý do giảm chép lại/sửa sót trả lời đủ. Mũi tên MaNV từ hợp đồng về hồ sơ phù hợp ý tham chiếu. | **Giữ được.** Ba hợp đồng nhất quán với hồ sơ công ty/bài 1.2; từng mã hợp đồng chưa xác minh live. |
| 13 — `nhan-dien-mot-ho-so`, dòng 218–232; `ConceptFigure` dòng 22–24 | Vì sao cần mã nếu đã có họ tên, tên cột có tự cấm trùng không? Hai câu trả lời đủ và giải nghĩa “ràng buộc” tại chỗ. Hình chỉ hai hồ sơ khác tên, không giả tạo một cặp trùng tên để chứng minh. | **Giữ được.** Một phút tương xứng với vai trò chuyển từ nhu cầu sang luật, không tự thêm chuyện công ty. |
| 14 — `khoa-chinh`, dòng 234–248; `ConceptFigure` dòng 25–31 | Khi nào mã được bảo đảm duy nhất, PK có biết trùng người không? Điều kiện khai báo, cấm trùng/NULL và giới hạn hai mã cho một người đều nằm trên chiếu. Cách viết `NhanVien.MaNV` được giải thích bằng bảng+cột ngay trong câu. Hình chỉ nói “qua luật duy nhất”, không hứa qua mọi luật. | **Giữ được.** NULL được giải nghĩa ngắn; không bắt phải học khóa nhiều cột vì ví dụ đã giới hạn ở một cột. |
| 15 — `bang-khong-co-khoa-chinh`, dòng 250–264; `ConceptFigure` dòng 25–31 | Bảng thiếu PK có tồn tại/đọc được không, có chắc đang trùng không? Phần chiếu nói “minh họa giả định”, “nếu không có luật khác”, “có thể”; hình đối chiếu có/không khai báo PK. | **Giữ được.** Không giả là schema thật đã bỏ khóa, không tuyệt đối hóa rằng thiếu PK luôn có trùng. |
| 16 — `ma-phong-trong-ho-so`, dòng 266–284 | Muốn biết tên phòng cần dò gì, vì sao chỉ mã trong hồ sơ chưa đủ? Hai bảng trích đặt mã KT cạnh nhau và câu “dò cùng mã” đưa tới Kế toán. Câu về mã không có trong danh mục nêu đúng vấn đề cần luật ở slide sau. | **Giữ được.** Hướng từ hồ sơ bên phải sang danh mục bên trái có nghĩa rõ; không đòi VLOOKUP. |
| 17 — `khoa-ngoai`, dòng 286–300; `ConceptFigure` dòng 32–38 | FK kiểm gì và không kiểm gì, có cấm lặp/NULL không? Điều kiện FK đang bật, mã khác NULL, nullability do cột, mã phòng được lặp và gán nhầm mã có thật đều có trên chiếu. Hình phân biệt KT với KT01 và giới hạn “qua luật tham chiếu”. | **Giữ được.** Không trình bày FK là ô chọn hay tự lấy tên phòng. Không có thao tác ghi dữ liệu. |
| 18 — `bang-khong-co-khoa-ngoai`, dòng 302–316; `ConceptFigure` dòng 32–38 | Thiếu FK có còn đọc qua hai bảng được không? Phần chiếu định nghĩa kết bảng ngắn, tách so khớp lúc đọc khỏi luật kiểm khi ghi. Giả định không FK/không luật khác hiện trên chiếu, hình không giả là schema thật đã đổi. | **Giữ được.** “Có thể lọt” không biến thành khẳng định dữ liệu đang sai. |
| 19 — `ky-hieu-erd`, dòng 318–335 | Đọc 1/∞ thế nào; một phòng/hồ sơ có thể có 0 bên kia không; vì sao mỗi hợp đồng lại bắt buộc thuộc một hồ sơ? Hai hướng và trường hợp 0 được nói đúng, không coi ∞ là số dòng thật. Tuy nhiên điều kiện `HopDong.MaNV` không nhận NULL chỉ nằm trong notes; người học vừa được dạy FK có thể nhận NULL nên chưa tự suy ra tính bắt buộc của chặng này từ chiếu. | **Cần làm rõ F1.** Hình đúng vai trò cấu trúc; chưa có căn cứ nói kết luận quan hệ sai. |
| 20 — `ten-phong-cua-nv001`, dòng 337–355 | Bắt đầu ở đâu, so cặp cột nào, lấy thuộc tính gì, phòng của thời điểm nào? Danh sách mục tiêu → NhanVien/NV001/KT → cặp MaPB → TenPB cùng đáp án Kế toán trả lời đủ. Nguồn giá trị KT đã có ở slide 16; sơ đồ không cần giả làm bảng chứa dòng NV001. | **Giữ được.** “Tên phòng hiện lưu, không phải lịch sử” hiện trên chiếu và khớp hồ sơ công ty. |
| 21 — `hop-dong-kem-ten-phong`, dòng 357–374 | Muốn mỗi dòng là hợp đồng kèm tên phòng phải qua đâu, mã lặp có thành thêm người không? Hai cặp cột hiện đầy đủ, dòng được chốt là hợp đồng; ba hợp đồng NV021 vẫn là ba dòng. Câu cuối xét hướng ngược từ hồ sơ sang nhiều hợp đồng để chỉ khả năng tăng dòng, không nói chính hai chặng nhiều→một vừa đọc làm tăng dòng. | **Giữ được, với điều kiện cần bổ sung ở F1.** Đã dùng “phòng hiện lưu”, không biến thành phòng ngày ký; notes dành 7 phút hỏi đáp trên bản đồ. |

## Tiền đề bài tập và ví dụ

Không có YAML/bài tập hoặc câu hỏi mở đáp án trong bộ này. Bảng tiền đề từng đề: **không áp dụng**. Không lấy đáp án ở bài 1.5 hoặc kiến thức JOIN chuyên gia để bù phần đang học.

| Ví dụ cần theo được | Kiến thức cần có | Đã được dạy trước hoặc ngay tại ví dụ | Còn vướng / giới hạn |
|---|---|---|---|
| SELECT minh họa, slide 6 | Phân biệt SQL với SQL Server; biết yêu cầu tiếng Việt là lấy họ tên và phần tên bên dưới là kết quả trích | Slide 5 định nghĩa SQL Server; slide 6 định nghĩa SQL/truy vấn và ghi “Lấy họ tên nhân viên”, rồi nói phần mềm trả cột họ tên. | Đủ để nhận diện vai trò. SELECT/FROM, tên bảng/cột chưa được dạy thành cú pháp, nhưng không có yêu cầu tự viết/chạy nên không phải thiếu tiền đề trong phạm vi. Ba tên là minh họa trích, không chứng minh kết quả live hoặc thứ tự. |
| Tìm tên phòng NV001, slide 20 | Dòng hồ sơ, bảng/cột; PK duy nhất; mã phòng tham chiếu; cặp mã khớp; ý nghĩa TenPB; phòng hiện lưu | Slide 10–11 dạy bảng/dòng/cột; 14 dạy PK; 16 đưa đủ NV001→KT→Kế toán và hai tên cột; 17 nói `MaPB` không nhận NULL; 19 dạy 1/∞; slide 20 ghi đầy đủ đường đọc và tên phòng hiện lưu. | Đủ tiền đề đọc đường, không cần SQL/VLOOKUP. Sơ đồ chỉ chứa cấu trúc được phân biệt rõ, giá trị được lấy lại từ bảng trích trước. Không xác minh SQL live. |
| Hợp đồng kèm tên phòng, slide 21 | Mỗi dòng là hợp đồng; một hồ sơ có thể có nhiều hợp đồng; MaNV và MaPB dẫn qua bảng nào; mỗi chặng tới một khóa duy nhất; phạm vi hiện lưu | Slide 11–12 dạy ý nghĩa dòng và ba hợp đồng của NV021; 14/17 dạy PK/FK; 19 cho ký hiệu và hai phía; slide 21 nêu cả hai cặp cột, TenPB và mỗi dòng là một hợp đồng. | Đủ để chỉ đường và nhận ra lặp MaNV không phải thêm người. **Chưa đủ phần chiếu để giải thích tính bắt buộc một hồ sơ cho mỗi hợp đồng**: nullability `HopDong.MaNV` mới có trong notes (F1). Điều này không làm đường đọc đang nêu thành sai. |

## Findings ưu tiên

### F1 — Cần làm rõ: đưa điều kiện bắt buộc của quan hệ hợp đồng lên màn chiếu

- **Ưu tiên:** xử lý trước khi chốt nội dung vì liên quan trực tiếp mục tiêu đọc ERD hai phía.
- **Vị trí/câu gốc:** slide 19 `ky-hieu-erd`, MDX dòng 323: “Mỗi hợp đồng thuộc một hồ sơ”; điều kiện ở notes dòng 332: “MaNV ở HopDong không nhận NULL, FK đang bật”. Slide 21 dựa tiếp vào chặng này.
- **Tác động:** người mới vừa học ở slide 17 rằng nhận NULL do thiết kế cột và một FK có thể nhận NULL. Hình ERD chỉ hiện PK/FK và 1/∞, không hiện nullability; vì vậy họ có thể thuộc câu kết luận nhưng chưa trả lời được **vì sao** hợp đồng bắt buộc tìm đúng một hồ sơ, thay vì không có hồ sơ.
- **Căn cứ:** quy ước 4.7 yêu cầu điều kiện ảnh hưởng kết luận hiện cùng ví dụ; bài 1.5 cũng phân biệt số tối thiểu với ký hiệu một–nhiều. Đây là điều đã có trong notes nhưng thiếu ở phần chiếu, **không phải kết luận sai đã được chứng minh**, và không phải yêu cầu thêm ví dụ ngoại lệ.
- **Đề xuất ngắn:** sửa ngay câu hiện có, chẳng hạn thêm vế “`HopDong.MaNV` không nhận `NULL` và FK đang bật, nên…”; giữ câu về hồ sơ có thể có 0/nhiều hợp đồng. Không thêm slide hoặc dạy cú pháp khai báo.

### F2 — Cần làm rõ: tên các dạng NoSQL chưa có nghĩa tại nơi dùng

- **Ưu tiên:** làm rõ trước khi chốt phần phân loại; có thể thay chữ trong hai slide hiện có.
- **Vị trí/câu gốc:** slide 2, MDX dòng 39: “NoSQL còn có dạng tài liệu, khóa–giá trị, đồ thị”; slide 3, dòng 56: “Tài liệu, khóa–giá trị, đồ thị… tùy mô hình”. Giải nghĩa ngắn của hai tên đầu chỉ có ở notes dòng 43.
- **Tác động:** người chỉ biết Excel nhận ra hai hình bảng/đồ thị nhưng chưa biết “tài liệu” có phải file Word/PDF hay không, hoặc “khóa–giá trị” khác một cột mã trong bảng ở đâu. Cột nhu cầu “Lưu tài liệu; tra giỏ hàng theo mã” chưa tự giải thích cách tổ chức; phần so sánh đang phải dựa vào người giảng dạy bù nghĩa các từ ở notes.
- **Căn cứ:** quy ước 2 yêu cầu thuật ngữ mới có nghĩa tại chỗ; 4.7 giữ diễn giải cốt lõi ở màn chiếu. Đây là **thiếu giải nghĩa trên chiếu**, không phải nhận định phân loại sai. Ảnh đồ thị và câu “một dạng NoSQL” đã xử lý tốt việc không đồng nhất NoSQL với đồ thị.
- **Đề xuất ngắn:** thay tên đứng riêng bằng chú giải rất ngắn trong câu/bảng đang có: tài liệu gom các chi tiết thành một bản; khóa–giá trị tra một giá trị theo mã; đồ thị dùng đối tượng và liên hệ. Không cần thêm mô hình hoặc khảo sát kiến trúc/sản phẩm.

### F3 — Biên tập: ERD được gọi tên trước lời giải nghĩa

- **Ưu tiên:** thấp; sửa tại chỗ.
- **Vị trí/câu gốc:** slide 8, MDX dòng 135: “ERD biểu diễn cấu trúc…”, trong khi “ERD (sơ đồ quan hệ)” mới ở slide 9 dòng 153.
- **Tác động:** một khoảng vấp ngắn do chữ viết tắt chưa có nghĩa; bài có trả lời ngay ở slide kế nên đây không phải thiếu kiến thức kéo dài.
- **Căn cứ:** quy ước giải nghĩa thuật ngữ lần đầu; HTML xác nhận thứ tự và chính câu này, không có phần giải nghĩa ERD sớm hơn.
- **Đề xuất ngắn:** dùng “Sơ đồ ở slide sau…” tại slide 8, giữ định nghĩa ERD ở slide 9 để mạch tổng quan không dài thêm.

### F4 — Biên tập: alt ảnh bảng chỉ nhầm phạm vi đánh dấu

- **Ưu tiên:** thấp; sửa mô tả alt, giữ ảnh gốc.
- **Vị trí/câu gốc:** slide 2, MDX dòng 38, alt: “các nhãn chỉ một dòng, một cột và một ô”.
- **Tác động:** người tiếp cận hình qua mô tả nhận sai phần nhãn cuối, dễ hiểu nhầm bảng với ô ngay trước phần học bảng/dòng/cột.
- **Căn cứ:** SVG nội bộ có các nhãn `Tuple`, `Attribute`, `Relation`; nhãn cuối gắn với toàn bảng, không phải một ô. Đã đối chiếu XML/đường bao của asset và alt trong HTML, chưa kiểm cách screen reader phát âm hoặc render SVG trong browser.
- **Đề xuất ngắn:** đổi đoạn cuối thành “một dòng, một cột và toàn bộ bảng”. Không cần bắt lớp học các tên tiếng Anh.

## Những phần nên giữ và kết luận học thử

- Giữ mạch database chung → hai nhóm → Excel → bốn vai trò → dữ liệu trích → ERD tổng quan → bảng/khóa → trở lại bản đồ. Việc dùng lại đúng ba bảng và các mã NV001/NV021/KT giúp người mới nối các hình thay vì phải học thêm bộ dữ kiện.
- Phần PK/FK đã nêu điều kiện khai báo/đang bật, luật khác, NULL và giới hạn hợp lệ so với đúng nghiệp vụ ở mức phù hợp. Hai slide giả định không khóa được gắn nhãn; không dùng schema thật để giả là đã gỡ ràng buộc. Không thấy căn cứ cần cắt một slide hoặc thêm quiz/thực hành.
- Phần đọc ERD chốt cặp cột, ý nghĩa mỗi dòng, khả năng 0/nhiều ở phía được tham chiếu và tên phòng hiện lưu. Tiền đề đủ để chỉ đường cho hai ví dụ; cần bổ sung vế điều kiện F1 để người học còn giải thích được tính bắt buộc của chặng hợp đồng.
- Bold có chọn lọc ở định nghĩa chính, tên bảng/cột và giá trị dẫn chứng trong lời giảng chính dùng code; các bảng/hình giữ trình bày dữ liệu riêng. Không có backtick/escape lộ trong text HTML đã trích. Không coi mọi mã xuất hiện trong hình là thuật ngữ mới cần một bảng định nghĩa.
- Lặp lại các mã và quan hệ ở đây có chức năng phóng vào/quay lại theo thiết kế, không đề nghị cắt chỉ vì chúng xuất hiện nhiều lần. Khối so sánh là nơi tải thuật ngữ lớn nhất; F2 có thể xử lý bằng thay lời đang có, không tăng số slide. Thời gian giảng thật chưa được đo.

## Nguồn và giới hạn

Nguồn nội dung đã đối chiếu là các file khóa học nêu ở đầu report, các component và hai HTML đúng manifest. Credit ảnh đã hiện trên chiếu và notes; file `src/assets/presentations/SOURCES.md` có tác giả/giấy phép/URL và hash khớp asset. Không truy cập nguồn internet trong lượt chỉ đọc này nên **chưa xác minh độc lập nội dung trang Wikimedia/Microsoft Learn, giấy phép hiện hành hoặc khả năng truy cập link**. Không biến việc có credit thành xác nhận pháp lý.

Các tên NV001/Trần Thị Mai/KT, NV005/Vũ Thị Lan và NV021/Tôn Thất Long/IT khớp hồ sơ công ty; số ba hợp đồng của NV021 khớp hồ sơ và bài 1.2. Các mã hợp đồng cụ thể và kết quả SELECT chưa được chạy/đối chiếu database trong lượt này; cần bằng chứng kỹ thuật riêng của người viết. Quan hệ bắt buộc được đánh giá theo lời bài/notes và HTML, không xác nhận schema live.

Chưa kiểm: kích thước và độ đọc thực tế của hình/chữ/credit, tràn canvas, giao diện đáp án, bàn phím, đồng bộ hai cửa sổ, reload/theo lại, no-JavaScript, copy/paste, SSMS thật, test/check/build/check:dist hoặc SQL live. Việc đọc HTML chỉ xác nhận có nội dung/cấu trúc, không chứng minh các hành vi này đạt. Không có quyền push/deploy phát sinh từ report.

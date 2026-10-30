# Review bài 1.2 "Bảng, dòng và cột" (học thử, bài nền)

## 1. Phạm vi, phiên bản, công cụ

- Bài: `src/content/lessons/1-2-bang-dong-cot.mdx` (không có YAML). Mục tiêu frontmatter: "bạn chỉ ra được bảng, dòng và cột trong database, biết chúng giống và khác sheet Excel ở đâu"; `minutes: 7`, `noScenario`, `noExercises`.
- Source: commit `2cc3293`, nhánh `feat/level-1-foundation-lessons`, cây làm việc sạch lúc đọc (mtime MDX 17:27:50). Build `dist/bai/1-2-bang-dong-cot/index.html` dựng 17:28:07, sau source nên coi là khớp; tôi đối chiếu nội dung HTML với MDX và không thấy lệch.
- Công cụ: Claude Code, model Sonnet 5.5 (`claude-sonnet-5-5`); effort theo cấu hình phiên giao việc, tôi không tự xác định. Chỉ đọc nguồn và HTML, đọc hình PNG gốc `src/assets/lessons/1-2-database-table.png`. Không mở browser, không chạy SQL/API, không đọc `HRM_Demo.sql`, `.env`, report/review cũ.
- Đếm từ theo `proseParagraphs` (tái hiện bằng script ngoài repo): **488 từ**, 14 đoạn/mục, đoạn dài nhất 55 từ. Dưới mốc 500 của quy ước 2.5 khoảng 12 từ, còn dư chỗ khoảng 210 từ tới 700. Test chỉ chặn ở 800 nên không vướng.
- Đã đọc để đối chiếu: AGENTS.md, quy-uoc.md (nhất là 2.5), lesson-template.md, ho-so-cong-ty.md, bài 1.1, spec phần Khung bài nền và Nội dung từng bài. Tôi có mở nhanh đầu bài 1.3 và vài dòng bài 1.6 chỉ để kiểm tính nhất quán của con số "12 cột" và lời trỏ; không dùng chúng để bù kiến thức cho người học. Một lệnh liệt kê thư mục `temp/review` có hiện tên các file report cũ; tôi không mở file nào.

## 2. Rà theo thứ tự bài

Tôi đọc như người chỉ biết Excel và vừa xong bài 1.1 (database, SQL Server, SQL, SSMS, luật dữ liệu "hợp lệ chưa chắc đúng").

### Mục "Từ sheet Excel đến bảng trong database" (mở bài, hình, ba gạch đầu dòng)

**F1. "Bảng lưu một loại thông tin" và "Cột là một loại thông tin" dùng cùng một cụm**
- Câu gốc: "**Bảng** lưu một loại thông tin, như `NhanVien`…" và "**Cột** là một loại thông tin của mọi dòng".
- Đánh giá: **Cần làm rõ**.
- Tác động: người mới phải tự đoán "loại thông tin" ở cấp bảng khác "loại thông tin" ở cấp cột chỗ nào. Hai gạch đầu dòng kề nhau, đọc nhanh sẽ thấy là cùng một thứ. Cụm này lại lặp ở tiêu đề tiểu mục "Mỗi bảng lưu một loại thông tin".
- Căn cứ: nguồn MDX dòng 30 và 32; HTML khớp.
- Đề xuất: đổi một trong hai, ví dụ bảng = "một nhóm đối tượng cùng loại (nhân viên, hợp đồng, phòng ban)", cột = "một chi tiết của mỗi hồ sơ, như họ tên, ngày vào làm". Đổi, không thêm câu.

**F2. "Dòng là một hồ sơ" chỉ đúng với `NhanVien`**
- Câu gốc: "**Dòng**, còn gọi là **bản ghi**, là một hồ sơ, như dòng của `NV005`."
- Đánh giá: **Cần làm rõ**.
- Tác động: phần sau bài chính nó nói `HopDong` có nhiều dòng; dòng ở đó là một hợp đồng, không phải "hồ sơ" theo nghĩa hồ sơ nhân viên. Người học dễ hiểu "dòng = hồ sơ nhân viên" rồi vấp ở mục 3 và ở Ứng dụng 1 ("mỗi dòng là gì"). Câu tự kiểm tra 2 cũng chỉ hỏi dòng của `NhanVien`.
- Căn cứ: dòng 31, 42, 61, 87.
- Đề xuất: "…là một đối tượng của bảng: một nhân viên ở `NhanVien`, một hợp đồng ở `HopDong`". Chỉ thêm khoảng 8 từ.

**F3. Hình: nói thiếu một nửa phạm vi trích**
- Câu gốc: "Hình dưới trích ba trong 12 cột của bảng này."; chú thích "Hình minh họa ba trong 12 cột…".
- Đánh giá: **Biên tập**.
- Tác động: hình chỉ có ba dòng (`NV001`, `NV005`, `NV014`, nhảy cóc mã) nhưng chỉ nói trích cột, không nói trích dòng. Người mới có thể tưởng bảng chỉ có ba hồ sơ, hoặc không hiểu vì sao mã nhảy cóc. Chú thích mô tả dòng tô vàng và cột khung xanh nhưng không nói gì về nhãn "Bảng" (khung `NhanVien`), trong khi quy ước mục 3 muốn chú thích nói phần được đánh dấu.
- Căn cứ: PNG: ba hàng dữ liệu; nhãn Bảng chỉ góc phải thanh tiêu đề. Giá trị `NV001/NV005/NV014`, họ tên, ngày vào làm khớp `ho-so-cong-ty.md` mục 3. "12 cột" khớp với bài 1.6, 2.1, 2.2 (nhất quán nội bộ; chưa đối chiếu được với database).
- Đề xuất: "…ba cột và ba dòng của bảng `NhanVien`; khung bảng là `NhanVien`…". Chưa kiểm hiển thị ở màn hình hẹp: hình hiển thị 414 px rộng với chữ nhãn khoảng 11 px, tôi không mở được trang để nhìn.

**F4. `MaNV` và `NV005` không được giải nghĩa**
- Câu gốc: "…như dòng của `NV005`"; "Các bảng liên quan với nhau qua mã, như `MaNV`."
- Đánh giá: **Cần làm rõ** (nhẹ).
- Tác động: `HoTen` có "(họ tên)" ở chú thích, nhưng `MaNV` (mã nhân viên) xuất hiện lần đầu trong hình rồi được dùng làm ví dụ "mã liên kết" mà không có nghĩa. Người mới đoán được `NV` là nhân viên, nhưng "mã" ở đây là gì và để làm gì (phân biệt dòng, nối bảng) chưa được nói.
- Căn cứ: dòng 27, 31, 44. Quy ước 2: thuật ngữ cần nghĩa tại chỗ.
- Đề xuất: thêm "(mã nhân viên)" ở chú thích, cùng chỗ với "(họ tên)".

### Tiểu mục "Bảng chặt hơn sheet"

**F5. "Trong một sheet chưa đặt giới hạn" mơ hồ và dễ hiểu sai**
- Câu gốc: "Trong một sheet chưa đặt giới hạn, bạn có thể thêm dòng ghi chú, gộp ô hoặc chèn dòng tổng cộng giữa danh sách."
- Đánh giá: **Cần làm rõ**.
- Tác động: bài 1.1 chỉ dạy một "giới hạn" của Excel là Data Validation. Người học sẽ suy ra "đặt Data Validation thì không gộp ô/thêm dòng tổng được", mà theo hiểu biết của tôi về Excel Data Validation chỉ giới hạn giá trị nhập vào ô, không chặn gộp ô hay dòng tổng (chưa kiểm trên Excel thật, chỉ là kiến thức Excel ngoài bài). Câu này sinh ra từ quy ước "không tuyệt đối hóa Excel" nhưng hedge mơ hồ lại gây hiểu nhầm khác.
- Căn cứ: dòng 36 so với 1.1 dòng 57.
- Đề xuất: "Trong sheet thông thường, ai cũng có thể thêm…". Nghĩa chính là sheet không có cấu trúc bắt buộc.

**F6. Hứa quá: "không lo một dòng ghi chú lẫn vào danh sách" và Memo "Không có"**
- Câu gốc: "…chỉ cần chỉ ra cột `HoTen`, không lo một dòng ghi chú lẫn vào danh sách." Memo: "Ô gộp, dòng tổng xen giữa → Không có: mọi dòng cùng các cột".
- Đánh giá: **Cần sửa**.
- Tác động: database không có khái niệm ô gộp, nhưng không ngăn ai gõ chữ "Tổng cộng" hoặc một ghi chú vào cột `HoTen` của một dòng mới; kiểu dữ liệu nhận chữ, nên giá trị đó "hợp lệ". Đó chính là lỗi Hay nhầm 1 nói tới ("Dòng đó sẽ bị tính như một hồ sơ"). Phần giảng và Memo mâu thuẫn với Hay nhầm trong cùng bài, và với nguyên tắc 1.1 "hợp lệ chưa chắc đúng". Người học có thể kết luận sai là "database tự chặn dòng tổng".
- Căn cứ: dòng 38, 52, 72; quy ước 2 ("Không hứa điều database không tự bảo đảm"), mục 2.5.
- Đề xuất: bỏ vế "không lo một dòng ghi chú lẫn vào danh sách" (cắt khoảng 11 từ), giữ "SQL Server đọc và lọc dữ liệu theo đúng cột". Memo: "Không có ô gộp; dòng thêm vào vẫn là một hồ sơ".

**F7. "Tên cột được khai báo khi tạo bảng, không nằm ở dòng đầu" mâu thuẫn với hình và chưa nói vì sao**
- Câu gốc: "…tên cột được khai báo khi tạo bảng, không nằm ở dòng đầu như tiêu đề trong sheet." Memo: "Tiêu đề ở dòng đầu → Tên cột khai báo khi tạo bảng".
- Đánh giá: **Cần làm rõ** (đây là chỗ gây vấp nhất của bài).
- Tác động: hình ngay phía trên vẽ `MaNV / HoTen / NgayVaoLam` ở hàng đầu của lưới, giống hệt tiêu đề Excel. Người đọc sẽ hỏi: "vậy hình đang sai, hay chữ sai?". Câu cũng không nói điều khác nhau thực sự là gì (tên cột là một phần thiết kế của bảng, tách khỏi các dòng dữ liệu, không bị đếm như một hồ sơ, không bị trộn vào khi sắp xếp), nên "để làm gì" không được trả lời. "Khai báo" từng xuất hiện ở 1.1 nhưng không có định nghĩa; "tạo bảng" không nói ai tạo.
- Căn cứ: dòng 36, 71; PNG hàng tiêu đề; 1.1 dòng 57.
- Đề xuất: viết lại một vế: "tên cột nằm trong thiết kế của bảng, không phải một dòng dữ liệu; hình hiển thị chúng ở trên cùng cho dễ đọc, nhưng 3 dòng bên dưới mới là hồ sơ". Nếu thấy dài thì bỏ hẳn so sánh tiêu đề và Memo dòng 3, vì không phục vụ mục tiêu "chỉ ra được bảng/dòng/cột".

### Tiểu mục "Mỗi bảng lưu một loại thông tin"

**F8. Vì sao tách bảng: nêu kết quả nhưng chưa nêu cái bị tránh; "một dòng cho người đó" hứa hơn thiết kế**
- Câu gốc: "Một người có nhiều hợp đồng thì `HopDong` có nhiều dòng, còn `NhanVien` vẫn chỉ một dòng cho người đó." Câu tự kiểm tra 3: "Tách bảng giúp `NhanVien` vẫn giữ một dòng cho mỗi người."
- Đánh giá: **Cần làm rõ**.
- Tác động: (a) "Vì sao" được trả lời vòng tròn: tách để `NhanVien` giữ một dòng/người, nhưng vì sao một dòng/người quan trọng thì không nói. Hậu quả nếu gộp (thông tin người đó lặp ở mỗi hợp đồng, sửa một chỗ sót chỗ khác, đếm dòng ra nhiều hơn số người) chính là vấn đề bài 1.1 đã dựng, nhưng bài này không nối lại. (b) "Một dòng cho người đó" là ý đồ thiết kế, không phải điều database tự bảo đảm khi khóa chưa được nói tới (quy ước 2). Hồ sơ công ty mục 6 còn cho biết NV015 và NV038 trùng số CCCD, tức "một hồ sơ" chưa chắc là "một người khác nhau".
- Căn cứ: dòng 42, 94; `ho-so-cong-ty.md` mục 6; quy ước 3 ("hồ sơ khác người"); 1.1 dòng 24.
- Đề xuất: "…nếu gộp, thông tin của người đó lặp lại ở mỗi hợp đồng và phải sửa nhiều chỗ" (khoảng 15 từ), và đổi "chỉ một dòng cho người đó" thành "theo thiết kế, mỗi người một hồ sơ". Nếu muốn dẫn chứng, thay "một người có nhiều hợp đồng" bằng `NV021` có ba hợp đồng (khớp hồ sơ công ty).

**F9. `HopDong` có nhiều dòng, nhưng làm sao biết dòng nào của ai**
- Câu gốc: "Các bảng liên quan với nhau qua mã, như `MaNV`. Cách liên kết này học ở bài 1.4 và 1.5."
- Đánh giá: **Cần làm rõ** (nhẹ).
- Tác động: người học vừa nghe `HopDong` có nhiều dòng của một người; câu hỏi tự nhiên là hợp đồng nào của ai. "Qua mã" trả lời được, nhưng câu không nói bảng `HopDong` cũng có cột `MaNV` ghi người đó. Hợp đồng và cột đó chưa được thấy ở đâu.
- Đề xuất: "…mỗi dòng `HopDong` ghi `MaNV` của người đó" thay cho "liên quan với nhau qua mã, như `MaNV`". Số từ gần như giữ nguyên.

### "Hay nhầm ở đâu"

**F10. Hay nhầm 1: hậu quả còn trừu tượng**
- Câu gốc: "Dòng đó sẽ bị tính như một hồ sơ. Số tổng được tính khi lấy dữ liệu, không lưu xen giữa các hồ sơ."
- Đánh giá: **Biên tập**.
- Tác động: "bị tính như một hồ sơ" chưa nói hậu quả cụ thể. Người học chưa biết đếm/cộng nên khó thấy "tính" là gì. Lỗi có thật và đúng với người quen Excel, nên giữ ý; nhưng nên một vế cụ thể: danh sách có thêm một "hồ sơ" không phải người nào. Tránh `COUNT` hoặc `SUM` sớm (quy ước: dùng dòng, chưa dùng hàm).
- Căn cứ: dòng 52; quy ước 2 và 3.

**F11. Hay nhầm 2: có lỗi và cách làm, thiếu hậu quả**
- Câu gốc: "Bảng không có dòng 1, dòng 2 như sheet; muốn thứ tự nhất định thì phải yêu cầu khi lấy dữ liệu."
- Đánh giá: **Cần làm rõ** (nhẹ).
- Tác động: người đọc không biết hậu quả: cùng một yêu cầu có thể ra thứ tự khác nhau giữa các lần, nên "dòng đầu tiên" không phải một dòng xác định. Câu cũng chưa nói muốn chỉ một dòng thì dùng mã (như `NV005`), không dùng vị trí. Lỗi có giá trị thật với người từng gọi "dòng 5 của sheet", nên giữ; chỉ bổ sung vế hậu quả.
- Căn cứ: dòng 53; quy ước 2 (nói thứ tự có thể khác). Câu tuyên bố đúng với hiểu biết về SQL Server nhưng "chưa xác minh trên database"; bài 1.6 dòng 60 có nói cột số thứ tự trong Results là số tự đánh lại, khớp ý.

### "Ứng dụng"

- Ứng dụng 1 ("Mô tả yêu cầu dữ liệu: nói rõ cần bảng nào, mỗi dòng là gì và lấy những cột nào, thay vì chỉ nói 'lấy danh sách'") dùng đúng ba khái niệm của bài và nêu mục đích. Người học có thể làm ngay khi biết tên bảng và cột (biết bằng cách nào là bài 1.3/1.6, không phải việc của bài này). Đánh giá: **Giữ được**.
- Ứng dụng 2 ("Chuẩn bị file trước khi gửi IT nhập: bỏ ô gộp, dòng tổng và dòng ghi chú…") đúng chủ đề (bảng chặt hơn sheet) và có việc làm cụ thể. Điều kiện chưa viết: chỉ áp dụng khi tổ chức dùng quy trình IT nhập file (hồ sơ công ty mục 1 có nói IT nhập file; bài 1.1 chưa nói). "Mỗi dòng trong file là một hồ sơ" nên hiểu là các dòng dữ liệu, không tính hàng tiêu đề, và liên quan F7. Đánh giá: **Giữ được**, kèm mong muốn chỉnh F7 để thống nhất.

### "Ghi nhớ"

**F12. Memo thiếu "Cột" và hàng 2 gần như lặp**
- Câu gốc: ['Một dòng trong sheet', 'Một dòng, còn gọi là bản ghi']; không có hàng cho cột.
- Đánh giá: **Biên tập**.
- Tác động: mục tiêu của bài là chỉ ra bảng, dòng **và cột**, nhưng Memo không có hàng nào nói cột (hàng 3 nói tên cột chứ không nói cột là gì). Hàng 2 chỉ lặp tên, không thêm ý. Các cột bên SQL hiển thị bằng kiểu code (kể cả chữ giải thích, dấu phẩy và hai chấm tô xám); đó là hành vi chung của component `Memo`, giống bài 1.1, ngoài phạm vi bài này.
- Đề xuất: thay hàng 2 bằng "Một cột trong sheet → Một cột: một chi tiết của mọi dòng, như `HoTen`", hoặc gộp hàng dòng-cột. Không tăng số hàng.

### Chuyển ý, độ tải, lặp ý

**F13. Lặp ý và bold lặp**
- Đánh giá: **Cần cắt** (nhỏ).
- Chi tiết: (a) para đầu "bảng `NhanVien` lưu hồ sơ nhân viên, giống một sheet danh sách nhân viên" và gạch đầu dòng 1 "`NhanVien` lưu hồ sơ nhân viên" nói cùng một ví dụ trong chưa đầy 60 từ; (b) "mỗi bảng như một sheet" đã là ý chính của đoạn giữa bài 1.1, nên 1.2 mở bằng nhắc lại cũng được, nhưng không cần nói hai lần; (c) `**bảng**` in đậm ở câu đầu và `**Bảng**` ở gạch đầu dòng ngay sau, quy ước muốn in đậm chọn lọc; (d) "dòng tổng/ô gộp" xuất hiện ở phần giảng, Hay nhầm 1, Ứng dụng 2, Memo, Q1; chỉ Memo và Q1 là chỗ được lặp.
- Đề xuất: cắt vế "giống một sheet danh sách nhân viên" ở para đầu (khoảng 8 từ) hoặc gạch đầu dòng 1 đặt ví dụ `PhongBan`; bỏ in đậm một trong hai chữ "bảng"; Ứng dụng 2 giữ vì là việc làm, rút Hay nhầm 1 phần "không lưu xen giữa các hồ sơ" (đã ở phần giảng).

**Chuyển ý:** mượt. Mở bằng Excel, hai tiểu mục theo hai ý rõ ràng ("chặt hơn", "một loại thông tin"), đoạn "Ở bài này chỉ cần…" ở cuối phần chính đúng quy ước. Không có đoạn nào vượt 55 từ. Số lời trỏ sang bài sau nhiều (1.4, 1.5, 1.6, 2.4, 3.1: năm bài trong ba câu), nhưng ba bài sau cùng khớp Hay nhầm 1 và 2; không đề nghị cắt.

**Mức hứa quá khác đã soi:** "SQL Server đọc và lọc dữ liệu theo đúng cột" (đúng ý), "Cái giá là thêm cột không đơn giản…: người có quyền phải đổi thiết kế bảng" (đúng và nêu cái giá; "người có quyền" chưa nói là ai nhưng 1.1 có "người thiết kế database"). Không phát hiện số liệu sai.

## 3. Các câu "vì sao / để làm gì" tôi tự đặt

| Câu hỏi | Bài trả lời ở đâu |
|---|---|
| Vì sao dữ liệu xếp thành bảng, dòng, cột? | Một phần: "Nhờ vậy SQL Server đọc và lọc dữ liệu theo đúng cột" (tiểu mục 1). Chấp nhận được cho bài 7 phút. |
| Vì sao mọi dòng phải cùng các cột, cái giá? | Có: lọc theo cột, giá là phải đổi thiết kế khi thêm cột. Vướng ở F6 (hứa quá). |
| Vì sao tên cột không ở dòng đầu? Khác gì? | **Chưa**. F7. |
| Vì sao tách hợp đồng khỏi nhân viên? | Có một nửa: kết quả, chưa có hậu quả khi gộp. F8. |
| Làm sao biết hợp đồng của ai? | Gợi ý "qua mã" nhưng không nói rõ. F9. |
| Vì sao "dòng" còn gọi "bản ghi"? | Chưa, và không cần trong bài này; nên giữ như synonym. |
| "Loại thông tin" của bảng khác "loại thông tin" của cột thế nào? | **Chưa**. F1. |
| Để làm gì với BA/PM? | Có: Ứng dụng 1 và 2. |
| Vì sao thứ tự không cố định? Hậu quả? | Chưa, bài 2.4 sẽ trả lời; hậu quả nên có vế ngắn (F11). |

## 4. Tiền đề của từng câu tự kiểm tra

Tôi thử trả lời mỗi câu chỉ bằng bài 1.1 và bài này, trước khi mở đáp án.

| Câu | Cần gì | Dạy ở đâu | Còn thiếu |
|---|---|---|---|
| Q1. "Bảng giống gì trong Excel, và khác ở điểm nào?" | Bảng ≈ sheet; mọi dòng cùng cột; không ô gộp/dòng tổng | Para đầu; tiểu mục "Bảng chặt hơn sheet"; Memo | Trả lời được. Nếu người học theo đúng chữ bài sẽ nói "không có dòng ghi chú" nên đáp án đang lặp lỗi F6. Đáp án không nhắc cái giá hoặc tên cột. |
| Q2. "Một dòng trong `NhanVien` chứa gì?" | Dòng = hồ sơ; giá trị ở mọi cột | Gạch đầu dòng 2 và 3 | Trả lời được, nhưng gần như chép lại định nghĩa; "giá trị ở mọi cột" nối bằng suy ra từ định nghĩa cột, không có câu nói thẳng. Chỉ kiểm dòng của `NhanVien` (F2). |
| Q3. "Vì sao hợp đồng nằm ở bảng riêng?" | Một người nhiều hợp đồng; `NhanVien` một dòng/người | Tiểu mục "Mỗi bảng lưu một loại thông tin" | Trả lời được theo chữ bài. Chưa nối "vì sao một dòng/người cần thiết" (F8). |

Độ phủ mục tiêu: mục tiêu có ba phần (chỉ ra bảng, dòng và cột; giống; khác). Q1 phủ giống/khác; Q2 phủ dòng; **không câu nào phủ cột** và không câu nào bắt người học chỉ ra bảng/dòng/cột trong một ví dụ cụ thể. **Cần làm rõ**: đổi Q2 thành "Trong `NhanVien`, `NV005` và `HoTen` mỗi cái là một dòng hay một cột? Vì sao?" Câu này dùng đúng thứ bài đã dạy, đáp án ngắn, và bù độ phủ cột mà không thêm câu. Không dạy bù: cả ba đáp án đều có chỗ dạy trước trong bài.

## 5. Ưu tiên

1. **F6 (Cần sửa).** Câu giảng và Memo hứa database "không lo/không có" dòng ghi chú, dòng tổng, trái Hay nhầm 1 và nguyên tắc 1.1.
2. **F7 (Cần làm rõ).** Hình có hàng tiêu đề, chữ nói tên cột không nằm ở dòng đầu; chưa nói lý do.
3. **F1, F2, F8 (Cần làm rõ).** Hai nghĩa "loại thông tin"; "dòng = hồ sơ" chỉ đúng một bảng; tách bảng chưa nêu cái tránh và hứa quá "một dòng cho người đó".
4. **F5, F9, F4, F11 (Cần làm rõ, nhẹ).** "Sheet chưa đặt giới hạn"; HopDong nối qua `MaNV`; `MaNV`/`NV` chưa có nghĩa; hậu quả thứ tự dòng.
5. Câu tự kiểm tra: đổi Q2 để phủ cột.
6. **F3, F10, F12 (Biên tập), F13 (Cần cắt).** Hình, hậu quả Hay nhầm 1, Memo, lặp ý.

Ngân sách từ: bài 488 từ. Thêm khoảng 40 từ (F2, F8, F9, hậu quả F11, F3) và cắt khoảng 30 từ (F6, F13, F5, hậu quả F10) thì ở khoảng 500; nhẹ hơn mốc 700 nên không cần cắt thêm.

## 6. Những chỗ đã tốt (Giữ được)

- **G1. Mạch Excel, rồi bảng.** Mở bằng sheet quen thuộc, mỗi tiểu mục một ý, đoạn ngắn, có "cái giá" cho cột cố định ("thêm cột không đơn giản như chèn cột trong Excel"). Không phải danh sách định nghĩa thuần túy. **Giữ được**.
- **G2. Hay nhầm 1 và 2 đều là lỗi thật** của người quen Excel (thêm dòng tổng; coi số thứ tự dòng là cố định), mỗi mục khớp một lời trỏ ở "Ở bài này chỉ cần…" (3.1, 2.4). Chỉ cần bổ sung hậu quả (F10, F11). **Giữ được**.
- **G3. Dữ liệu và hình.** Ba dòng trong hình khớp hồ sơ công ty; ví dụ dùng bảng thật (`NhanVien`, `HopDong`, `PhongBan`) mà không kể chuyện; chú thích có nói "Hình minh họa". **Giữ được**.
- **G4. Bản render.** Không lộ backtick, dấu `\` hay `**` trong phần thân; `<code>` đúng cho tên bảng, cột, mã; bold dùng đúng cho `bảng`, `dòng`, `bản ghi`, `cột`; tiêu đề HTML là "1.2 Bảng, dòng và cột"; điều hướng bài trước/sau đúng. Chưa kiểm cuộn, drawer hay tương tác, và không có drawer trong bài này. **Giữ được**.

## 7. Nguồn và giới hạn

- Đã dùng: MDX 1.2 (đọc hết), HTML build, PNG nguồn của hình, AGENTS.md, quy-uoc.md, lesson-template.md, ho-so-cong-ty.md, bài 1.1, spec nền, kiểm hàm `proseParagraphs`.
- Không thể xác minh: số "12 cột" và việc `HopDong`, `PhongBan` tồn tại với đúng tên cột được nói tới (chỉ đối chiếu nhất quán nội bộ với 1.6, 2.1, 2.2 và hồ sơ công ty); hình hiển thị thực tế ở 1280/1024/414 px; đánh giá về Excel Data Validation (F5) chưa chạy trong Excel; hành vi thứ tự dòng của SQL Server chưa chạy.
- Không tương tác browser, không chạy SQL/API, không chạm vào source, test, docs, index, HEAD hay nhánh. Chỉ ghi file report này.

## 8. Kết luận

Kiến thức trong bài đủ để người mới nói lại bảng, dòng, cột và điểm giống sheet, và trả lời được cả ba câu tự kiểm tra bằng đúng chữ trong bài. Phần còn vướng không phải thiếu nội dung mà là một câu hứa quá (F6), một điểm hình và chữ mâu thuẫn mà không giải thích (F7), hai chỗ khái niệm nửa vời ("loại thông tin" hai lần, "dòng = hồ sơ") và câu tự kiểm tra chưa chạm tới cột. Các mục này sửa được bằng cách thay câu hơn là thêm đoạn, trong giới hạn 500-700 từ. Không có số liệu sai phát hiện được; những gì cần chạy mới biết đã ghi "chưa xác minh" ở mục 7.

## Tổng số finding

- Cần sửa: 1 (F6)
- Cần làm rõ: 8 (F1, F2, F4, F5, F7, F8, F9, F11), cộng một đề xuất đổi Q2 ở mục 4 (đếm riêng, không tính F)
- Cần cắt: 1 (F13)
- Biên tập: 3 (F3, F10, F12)
- Giữ được: 4 (G1–G4), cộng hai mục Ứng dụng đã nêu ở mục 2

# Review độc lập bài 3.4 — INNER JOIN: VLOOKUP bằng SQL

Ngày review: 24/10/2026. Vai đọc: Business Consultant khó tính, đang học để hiểu và phản biện yêu cầu dữ liệu khi chuyển sang BA/PM. Công cụ: Codex; agent kế thừa model của phiên, không chỉ định model khác.

Phạm vi: bài `src/content/lessons/3-4-inner-join-vlookup.mdx`, YAML bài tập cùng slug, HTML build của bài và ba trang bài tập. Không sửa source hoặc test. Không đọc review cũ, spec/plan, script database, dữ liệu kiểm chứng tạm hoặc tài liệu ngoài; không kết nối database, API, trình duyệt và không chạy SQL.

Bản YAML chốt để review có bài tập 1 là **Kinh doanh / KD**, sau thông báo tác giả đã sửa trong lúc review. HTML build đã đọc vẫn là **IT** ở bài tập này. Các nhận xét về YAML dưới đây theo bản mới; không coi lỗi lựa chọn IT của bản trước là lỗi còn tồn tại trong source.

## Nhận định chung

Trong phạm vi đọc, chưa phát hiện lỗi SQL cốt lõi hoặc mâu thuẫn số liệu với hồ sơ công ty. Bài giải đúng yêu cầu đã chốt: mọi hồ sơ, phòng đang lưu, bốn cột, mã nhân viên tăng dần. Giải thích `48` hồ sơ vẫn ra `48` dòng có đủ ba điều kiện quan trọng, không biến thành lời hứa cho mọi phép kết.

Điểm cần làm rõ nhất là giới hạn của phép so sánh với VLOOKUP: bài đã nói khác nhau khi có nhiều dòng khớp, nhưng chưa đối chiếu trực tiếp trường hợp không tìm thấy mã. Những việc còn lại chủ yếu là trình tự giải nghĩa bí danh và biên tập. Không cần khôi phục khung Excel/SQL tách riêng, thêm một mục trả lời riêng hay mở rộng sang kỹ thuật của bài 3.5–3.6.

## Rà theo thứ tự bài

### 1. Tên bài, mục tiêu và thời lượng — Giữ được

**Câu gốc:**

> INNER JOIN: VLOOKUP bằng SQL
>
> bạn lấy tên từ danh mục bằng INNER JOIN và giải thích được dòng nào được giữ
>
> minutes: 20

**Lý do:** Tên bài tạo điểm tựa quen thuộc; mục tiêu vừa có thao tác vừa có giải thích phạm vi kết quả. Nội dung thực tế có câu kết hai bảng, bí danh, điều kiện khớp, số dòng và ba bài tập. Khoảng `20` phút không có dấu hiệu quá ngắn so với lượng cần đọc và làm; chưa đo thời gian học thật.

**Tại sao/để làm gì:** “Học phép kết để giải quyết việc gì?” — **Đã trả lời:** bổ sung tên phòng từ danh mục, thay vì chỉ có mã ở hồ sơ. “INNER JOIN có hoàn toàn giống VLOOKUP không?” — **Trả lời chưa đủ ở trường hợp không khớp**, xem mục 8; đây là giới hạn của phép ví von, chưa phải lý do phải bỏ tên bài.

**Đề xuất:** Giữ tên, mục tiêu và thời lượng; bổ sung đối chiếu tối thiểu tại đúng đoạn nói về dòng không khớp.

### 2. Yêu cầu của chị Hạnh — Giữ được

**Câu gốc, dòng 19–23:**

> Chị Hạnh chuẩn bị danh sách nhân sự tháng 10/2026:
>
> Em lấy tất cả hồ sơ nhân viên, thêm tên phòng ban đầy đủ bên cạnh mã phòng giúp chị. Chị cần mã nhân viên, họ tên, mã phòng và tên phòng; xếp mã nhân viên tăng dần nhé.

**Lý do:** Người hỏi, tháng và nội dung khớp hồ sơ công ty. Yêu cầu nói rõ bốn cột và thứ tự dòng, không bắt người học đoán một danh sách đang làm hay danh sách theo kỳ lương. Từ “tất cả” được làm rõ ngay ở giả định tiếp theo.

**Tại sao/để làm gì:** “Vì sao cần tên phòng khi đã có mã?” — **Đã trả lời ở mức công việc:** chị Hạnh cần bản danh sách có tên đầy đủ. “Cần gửi những thông tin nào, theo thứ tự nào?” — **Đã trả lời:** câu hỏi và câu SQL thống nhất.

**Đề xuất:** Giữ. Không cần thêm một câu hỏi nghiệp vụ khác.

### 3. Giả định và câu Key — Giữ được

**Câu gốc, dòng 25–27:**

> Giả định: lấy mọi hồ sơ trong `NhanVien`, gồm cả người đã nghỉ. Tên phòng lấy theo `MaPB` hiện lưu, không phải phòng tại thời điểm vào làm hay một kỳ lương cũ.
>
> Mã phòng nằm ở hồ sơ, còn tên phòng nằm trong danh mục; cần tìm đúng cặp dòng theo mã.

**Lý do:** Chốt được phạm vi hồ sơ và nghĩa thời gian của thông tin phòng. Điều này khớp bài 1.5, 2.2, 3.2–3.3 và hồ sơ công ty: bộ mẫu không lưu lịch sử chuyển phòng. Key nêu đúng vấn đề hai bảng, không hứa tìm được lịch sử từ mã hiện tại.

**Tại sao/để làm gì:** “Có loại người đã nghỉ không?” — **Đã trả lời:** không. “Tên phòng này là của lúc nào?” — **Đã trả lời:** theo mã đang lưu. “Tại sao phải kết hai bảng?” — **Đã trả lời:** mã và tên ở hai nguồn; lợi ích tách danh mục đã có nền ở bài 1.1 và 1.5.

**Đề xuất:** Giữ; không giảng lại toàn bộ lý do chuẩn hóa dữ liệu.

### 4. Lời dẫn và hình Excel — Giữ được

**Câu gốc, dòng 33–40:**

> Trong Excel, bạn xuất hồ sơ và danh mục sang hai sheet, rồi dùng **VLOOKUP dò chính xác** hoặc **XLOOKUP** theo mã phòng. Hình trích ba hồ sơ; ô `C2` là mã `KT`, ô `D2` là tên `Kế toán` lấy từ danh mục. Sheet `PhongBan` trong công thức có mã ở cột đầu, tên ở cột thứ hai.
>
> `=VLOOKUP(C2,PhongBan!A:B,2,FALSE)`

**Lý do:** Công thức khớp cách bố trí đã nói: dò `C2`, lấy cột thứ hai, dò chính xác. Không chỉ nêu tên hàm rồi bỏ mặc người học đoán vùng danh mục. `C2` và `D2` đúng ô được tô; HTML có `xl-mark` ở mã `KT` và `xl-sel xl-mark` ở tên `Kế toán`. Ba hồ sơ và tên phòng khớp hồ sơ công ty.

Hình nói là “trích ba hồ sơ”, không nói đây là ba dòng đầu hay kết quả AutoFilter, nên việc dùng `NV001`, `NV002`, `NV004` không đủ căn cứ để kết luận sai số dòng Excel. Không yêu cầu thêm số dòng nhảy cóc cho một thao tác lọc chưa hề được mô tả.

**Tại sao/để làm gì:** “Ô tên phòng đến từ đâu?” — **Đã trả lời:** từ sheet danh mục theo mã. “Vì sao công thức lấy cột `2` và dùng `FALSE`?” — **Đã trả lời đủ qua bố trí mã/tên và cụm dò chính xác**, phù hợp điểm tựa người đã dùng Excel. “Vì sao không có công thức XLOOKUP riêng?” — Không gây vấp: bài chọn VLOOKUP làm minh họa, mục tiêu là SQL, không phải dạy hai hàm Excel.

**Đề xuất:** Giữ. Không cần bổ sung một hình danh mục hoặc công thức XLOOKUP chỉ để đủ cặp.

### 5. Định nghĩa phép kết và ON; bí danh xuất hiện sớm — Cần làm rõ

**Câu gốc, dòng 42:**

> **Kết bảng** là tạo kết quả từ những dòng có quan hệ giữa các bảng. **`INNER JOIN`** giữ các cặp dòng thỏa điều kiện **`ON`**. Ở đây, điều kiện là mã phòng của hồ sơ bằng mã của dòng danh mục: `pb.MaPB = nv.MaPB`. SQL lấy tên từ dòng đã khớp; không cần chép tên phòng vào từng hồ sơ nguồn.

**Lý do:** Định nghĩa theo “cặp dòng” đúng và hữu ích: tránh coi JOIN là thao tác điền một ô. `ON` được giải thích bằng một điều kiện cụ thể, đủ cho bài nhập môn. Tuy nhiên, tại lần gặp `pb` và `nv` đầu tiên, người học chưa được biết đây là tên ngắn của bảng nào; định nghĩa nằm ở tiểu mục sau. Người đã đọc bài 2.1 chỉ biết bí danh cột, không tự suy chắc được bí danh bảng.

**Tại sao/để làm gì:** “`ON` quyết định cặp nào được lấy?” — **Đã trả lời:** hai mã bằng nhau. “`pb` và `nv` tự xuất hiện từ đâu?” — **Chưa trả lời tại chỗ**, dù có trả lời ngay sau sơ đồ. “Có phải phép kết chép tên vào bảng hồ sơ?” — **Đã trả lời:** không.

**Đề xuất:** Sửa ngay biểu thức đầu tiên thành `PhongBan.MaPB = NhanVien.MaPB`; các bài 1.4–1.5 đã dùng cách chỉ rõ bảng/cột này. Sau khi định nghĩa bí danh mới dùng `pb`/`nv` như hiện có. Không cần thêm một đoạn giải nghĩa lặp ở đây.

### 6. Sơ đồ ERD và lựa chọn cột kết — Giữ được

**Câu gốc, dòng 44–46:**

> Sơ đồ đánh dấu đường từ `NhanVien.MaPB` đến `PhongBan.MaPB`. Chọn cột kết theo quan hệ dữ liệu, không chỉ vì hai cột tình cờ cùng tên hoặc cùng chứa chữ.
>
> Đường lấy tên phòng: mã phòng trên hồ sơ trỏ tới mã duy nhất của danh mục.

**Lý do:** Dùng lại kỹ năng bài 1.5 đúng lúc. `path={['NhanVien','PhongBan']}` đúng đường cần dùng. HTML có đường và nhãn `NhanVien.MaPB`/`PhongBan.MaPB` mang trạng thái `is-on`, phía nhiều và phía một đúng với giải thích. Chú thích không chỉ bảo “xem hình” mà nói được ý của đường được đánh dấu.

**Tại sao/để làm gì:** “Vì sao lấy `MaPB` thay vì một cột mã khác?” — **Đã trả lời:** vì quan hệ dữ liệu, không vì cùng kiểu chữ. “Có cần đọc lại toàn bộ ERD?” — **Đã có nền ở bài 1.5**; không cần mở rộng ở bài này.

**Đề xuất:** Giữ cả lời dẫn và đường đánh dấu.

### 7. Định nghĩa bí danh; từ “vai trò” và dấu chấm — Biên tập

**Câu gốc, dòng 50:**

> **Bí danh bảng** là tên ngắn dùng trong câu lệnh: `NhanVien AS nv`, `PhongBan AS pb`. `nv.HoTen` là cột của vai trò `nv`; `pb.TenPB` là cột của vai trò `pb`. Dấu chấm phân biệt bảng với cột. Hai bảng đều có `MaPB`, nên viết rõ `nv.MaPB` và `pb.MaPB` để tránh mơ hồ. Đây là bí danh bảng, khác tiêu đề cột đặt bằng `AS` ở bài 2.1; không đổi tên bảng thật.

**Lý do:** Bài phân biệt đúng bí danh bảng với bí danh cột và nói rõ phạm vi câu lệnh. Cụm “cột của vai trò” lại tạo thêm một thuật ngữ chưa cần dùng cho hai bảng khác nhau. “Dấu chấm phân biệt bảng với cột” hiểu được nhưng chưa chỉ rõ cách đọc phần trước/sau dấu chấm.

**Tại sao/để làm gì:** “Tại sao cần `nv.`/`pb.`?” — **Đã trả lời:** cùng có `MaPB`. “Có đổi tên bảng thật không?” — **Đã trả lời:** không. “Vai trò là khái niệm gì ở đây?” — **Chưa giải thích và chưa cần cho mục tiêu hiện tại**.

**Đề xuất:** Thay hai câu giữa bằng: “`nv.HoTen` đọc cột `HoTen` của bảng mang bí danh `nv`; `pb.TenPB` đọc cột `TenPB` của bảng mang bí danh `pb`. Dấu chấm ngăn bí danh bảng với tên cột.” Giữ phần đối chiếu với bài 2.1; không thêm bài giảng về alias.

### 8. Dòng không khớp và khác biệt với VLOOKUP — Cần làm rõ

**Câu gốc, dòng 52:**

> Một dòng không có cặp khớp sẽ bị `INNER JOIN` loại khỏi kết quả.

**Lý do:** Mệnh đề SQL đúng. Nhưng vì tên bài và hình đầu dựa vào VLOOKUP, người học cần nhận ra khác biệt ngay ở tình huống cơ bản này: công thức VLOOKUP đang minh họa không tự xóa dòng hồ sơ trong sheet khi mã không tìm thấy. Bài đã đối chiếu khi nhiều dòng khớp, chưa đối chiếu khi không có dòng khớp. Nếu bỏ qua khác biệt này, người đọc dễ hiểu INNER JOIN chỉ là “điền tên phòng”, rồi không giải thích được vì sao danh sách thiếu hồ sơ ở nguồn khác.

**Tại sao/để làm gì:** “Vì sao cũng là dò mã mà SQL có thể trả ít hồ sơ hơn sheet Excel?” — **Chưa đối chiếu trực tiếp**. “Dòng bị loại có bị xóa ở bảng nguồn không?” — **Đủ căn cứ để hiểu là không:** câu nói rõ khỏi kết quả, phần trả lời còn nói chỉ đọc; nền bài 2.2 cũng đã phân biệt.

**Đề xuất:** Sửa đúng câu đang có, thêm một vế: “Không có cặp khớp thì `INNER JOIN` bỏ dòng khỏi kết quả, còn công thức VLOOKUP trong hình giữ dòng ở sheet và trả `#N/A`.” Không cần thêm một dataset lỗi, hình lỗi hoặc câu SQL mới; cách giữ dòng để bài 3.5 như hiện tại.

### 9. Vì sao 48 hồ sơ vẫn ra 48 dòng — Giữ được

**Câu gốc, dòng 52:**

> Trong bộ mẫu, `NhanVien.MaPB` có `NOT NULL`, khóa ngoại tới danh mục và `PhongBan.MaPB` là khóa chính: mỗi hồ sơ có đúng một dòng phòng khớp, nên `48` hồ sơ vẫn thành `48` dòng. Đây là hệ quả của cấu trúc hiện có, không phải mọi `JOIN` đều giữ số dòng.

**Lý do:** Có đủ căn cứ cho “đúng một”, không chỉ “tối đa một”: `NOT NULL` loại khả năng thiếu mã, khóa ngoại giữ mã tham chiếu có thật, khóa chính giữ một dòng cho mỗi mã danh mục. Bài 1.3–1.5 đã giải thích các nền này. Tách được điều kiện của thiết kế mẫu với tính chất chung của JOIN.

**Tại sao/để làm gì:** “Vì sao không mất hồ sơ?” — **Đã trả lời**. “Vì sao không nhân hồ sơ?” — **Đã trả lời**. “Có suy ra câu kết bất kỳ cũng đủ `48` dòng không?” — **Đã phủ định rõ**.

**Đề xuất:** Giữ nguyên ý và độ sâu. Không cần thêm những ngoại lệ về quản trị ràng buộc ở đây. Con số `48` khớp hồ sơ công ty và bài trước; **chưa xác minh bằng chạy truy vấn**.

### 10. Nhiều dòng khớp và giới hạn phạm vi — Giữ được

**Câu gốc, dòng 54:**

> Nếu phía được dò có nhiều dòng cùng khớp, SQL trả từng cặp, trong khi VLOOKUP thông thường lấy dòng khớp đầu tiên. Khóa danh mục duy nhất làm hai cách cùng lấy được một tên trong tình huống này. Ở bài này chỉ cần kết hai bảng theo mã; giữ dòng không khớp học ở bài 3.5, kiểm dòng nhân lên ở bài 3.6.

**Lý do:** Đúng trọng tâm và khớp bài 1.5. Câu điều kiện đủ ngắn; không kéo bài thành hướng dẫn kết hợp đồng hay sửa số dòng nhân lên. “Trong tình huống này” tránh hứa hai công cụ luôn tương đương.

**Tại sao/để làm gì:** “Vì sao không được nghĩ JOIN cũng chỉ lấy dòng khớp đầu tiên?” — **Đã trả lời**. “Ở bài này phải xử lý cả kết quả không khớp và nhân dòng chưa?” — **Đã trả lời bằng chỉ dẫn 3.5–3.6**.

**Đề xuất:** Giữ. Ghép sửa ở mục 8 sẽ hoàn thiện đối chiếu Excel mà không cần thêm một tiểu mục.

### 11. Câu SQL chính và thụt lề — Giữ được

**Câu gốc, dòng 58–64:**

> Lấy bốn cột, kết bằng mã và xếp theo mã nhân viên:

```sql
SELECT nv.MaNV, nv.HoTen, nv.MaPB,
    pb.TenPB
FROM NhanVien AS nv
INNER JOIN PhongBan AS pb ON pb.MaPB = nv.MaPB
ORDER BY nv.MaNV ASC;
```

**Lý do:** Cột, nguồn và thứ tự đúng yêu cầu. Không lọc trạng thái vì đề lấy cả người đã nghỉ. Chọn `pb.TenPB` để lấy tên từ danh mục; không gõ một nhãn cố định. Câu đầy đủ, chỉ đọc, nên có nút Sao chép là phù hợp. Không cần `N` vì câu này không có literal tiếng Việt.

Nguồn MDX dùng escape `\t` cho dòng cột tiếp theo; `RunFlow.query`, các câu SQL tương ứng và `focus` của SELECT dùng cùng mốc. HTML build chứa tab thật trước `pb.TenPB`, kể cả thuộc tính `data-copy`; không thấy hai ký tự `\` và `t` bị lộ trong câu sao chép. Đây là đối chiếu tĩnh, **chưa kiểm bấm Sao chép/dán editor hoặc độ rộng tab bằng mắt trên trình duyệt**. Bài không có CASE để kiểm hai cấp, không cần tự thêm CASE.

**Tại sao/để làm gì:** “Vì sao chọn mã từ `nv` và tên từ `pb`?” — **Đã có lời giải ở phần bí danh và cặp khớp**. “Vì sao phải có ORDER BY?” — **Đã có yêu cầu tình huống và nền bài 2.4**.

**Đề xuất:** Giữ câu lệnh và cách xuống dòng; không yêu cầu một mẫu cú pháp trừu tượng bổ sung.

### 12. Hình Result và các giá trị — Giữ được

**Câu gốc/dữ liệu, dòng 66–127:**

> Bốn cột `MaNV`, `HoTen`, `MaPB`, `TenPB`; trích `NV001` đến `NV010`; `total={48}`, `mark={[1]}`.

**Lý do:** Mười dòng hiển thị khớp hồ sơ công ty: `NV001`/`NV005` thuộc `KT`, `NV002`/`NV003`/`NV006` thuộc `KD`, `NV004`/`NV009` thuộc `BGD`, `NV007` thuộc `IT`, `NV008` thuộc `VH`, `NV010` thuộc `NS`. Tên phòng đi đúng mã. Dòng đầu được đánh dấu đúng hồ sơ mà đoạn sau giải thích. Vì có ORDER BY theo khóa chính, gọi đây là mười dòng đầu là nhất quán.

**Tại sao/để làm gì:** “Mỗi dòng kết quả đại diện cho gì?” — **Đã trả lời:** một hồ sơ trong thiết kế này, kèm tên phòng. “Mười dòng có phải toàn bộ kết quả không?” — **Đã trả lời:** không, hình và dòng trạng thái ghi tổng `48`.

**Đề xuất:** Giữ. Chỉ công nhận tính nhất quán giữa các tài liệu được phép đọc; **chưa xác minh kết quả thực thi**.

### 13. Câu trả lời cạnh kết quả; câu đếm lặp — Cần cắt

**Câu gốc, dòng 129:**

> Kết quả có `48` dòng; hình trích `10` dòng đầu. Dòng `NV001` được đánh dấu: mã `KT` đi cùng tên `Kế toán`. Chị Hạnh có đủ tên phòng cho mọi hồ sơ trong phạm vi đã chốt, gồm cả người đã nghỉ; câu lệnh chỉ đọc dữ liệu.

**Lý do:** Câu trả lời khép tình huống đúng vị trí, không chỉ dừng ở cú pháp. Tuy nhiên, HTML ngay trên đã có “Trích 10 dòng (kết quả có 48 dòng)”, còn quan hệ `48`–`48` đã giảng ở phần chính. Câu đầu không cần lặp lại cả hai số.

**Tại sao/để làm gì:** “Cuối cùng chị Hạnh đã có danh sách nào?” — **Đã trả lời đầy đủ**. “Có thay dữ liệu nguồn không?” — **Đã trả lời:** chỉ đọc.

**Đề xuất:** Cắt riêng câu “Kết quả có `48` dòng; hình trích `10` dòng đầu.”; giữ hai câu sau. Đây là cắt lặp nhỏ, không phải lỗi nội dung hoặc lý do phải dời phần trả lời.

### 14. Lời dẫn RunFlow — Giữ được

**Câu gốc, dòng 133:**

> Sơ đồ là **thứ tự xử lý logic**: lấy hồ sơ, tìm cặp phòng khớp, chọn cột rồi sắp xếp. Mỗi bước dùng một câu `SELECT` riêng để nhìn dữ liệu, không mô tả các lệnh SQL Server chạy nối tiếp hay thứ tự đọc vật lý. Trước `ORDER BY`, thứ tự dòng có thể khác hình; các bảng chi tiết trích tối đa `10` dòng.

**Lý do:** Phân biệt tốt thứ tự logic và thực thi vật lý. Câu SELECT riêng trong drawer được nói rõ là công cụ quan sát, tránh hiểu SQL Server tự chạy lần lượt bốn truy vấn đang trưng ra. Có giới hạn số dòng trích và cảnh báo đúng về thứ tự trước ORDER BY.

**Tại sao/để làm gì:** “Vì sao SELECT viết trước nhưng xét sau?” — **Đã trả lời bằng thứ tự logic và chú thích mặc định của sơ đồ**. “Những câu trong drawer có phải các lệnh nội bộ SQL Server chạy nối tiếp?” — **Đã phủ định rõ**.

**Đề xuất:** Giữ. Không cần mô tả execution plan ở bài này.

### 15. Drawer FROM — Biên tập

**Câu gốc, dòng 142–147:**

> Lấy hồ sơ đang lưu.
>
> `FROM` lấy NhanVien với bí danh `nv`; chưa tìm tên phòng.
>
> `FROM` có `48` hồ sơ; bảng chi tiết trích mã, họ tên và mã phòng để đối chiếu.

**Lý do:** Bắt đầu từ đúng từ khóa, có số dòng thật được tuyên bố, nói rõ chưa có tên phòng. Câu SELECT dùng để xem bước này chỉ lấy ba cột như lời dẫn, không giả là toàn bộ cấu trúc bảng. Chỗ `NhanVien` trong `meaning` chưa có kiểu code; HTML cũng đang hiện như chữ thường trong khi `nv` có code.

**Tại sao/để làm gì:** “Bước này đã dò danh mục chưa?” — **Đã trả lời:** chưa. “Vì sao bảng dưới chỉ có ba cột?” — **Đã trả lời:** trích để đối chiếu.

**Đề xuất:** Chỉ đổi `NhanVien` thành code bằng cú pháp mà `meaning` đang hỗ trợ; giữ nội dung. Số `48` chưa được kiểm bằng chạy câu drawer.

### 16. Drawer INNER JOIN — Giữ được

**Câu gốc, dòng 205–212:**

> Tìm dòng phòng khớp mã.
>
> `INNER JOIN` tạo các cặp thỏa điều kiện mã phòng bằng nhau.
>
> `INNER JOIN` vẫn có `48` dòng: mỗi mã phòng của hồ sơ khớp đúng một mã duy nhất trong danh mục.

**Lý do:** Điều kiện và hệ quả số dòng nhất quán với phần giảng. Bảng chi tiết có tên phòng thật; các dòng khớp Result chính. Không xuất hiện một phép lọc ngầm chỉ giữ người đang làm.

**Tại sao/để làm gì:** “Bước tìm cặp đã thêm thông tin gì?” — **Đã trả lời trong drawer:** `TenPB`. “Vì sao vẫn là `48`?” — **Đã trả lời**, với nền ràng buộc ở mục 9.

**Đề xuất:** Giữ nội dung. Không thêm một bảng nhân dòng giả định vào bước đang giải tình huống hiện tại.

### 17. Drawer SELECT và ORDER BY — Giữ được

**Câu gốc, dòng 280–287 và 355–363:**

> `SELECT` chọn mã, họ tên, mã phòng và tên lấy từ dòng danh mục.
>
> `SELECT` giữ `48` dòng và `4` cột; `NV001` có `MaPB` là `KT`, `TenPB` là `Kế toán`.
>
> `ORDER BY` quy định thứ tự trả dòng.
>
> `ORDER BY` giữ `48` dòng; hình hiện `10` dòng đầu theo mã, bắt đầu bằng `NV001`.

**Lý do:** SELECT của câu không có DISTINCT/tổng hợp nên giữ số dòng, chọn đúng bốn cột. ORDER BY không bị trình bày như thao tác lọc. Query, focus và câu xem bước cuối thống nhất. Hai bảng JOIN/SELECT trông giống nhau là hệ quả của việc dùng SELECT riêng để nhìn mốc dữ liệu, đã được lời dẫn giải thích; không có căn cứ từ đó kết luận sơ đồ sai logic.

**Tại sao/để làm gì:** “SELECT có làm mất hồ sơ ở câu này không?” — **Đã trả lời:** không. “ORDER BY thay dữ liệu gì?” — **Đã trả lời:** thứ tự trả dòng, không số hồ sơ.

**Đề xuất:** Giữ. Các tổng và dữ liệu của drawer chưa xác minh bằng thực thi.

### 18. Bản xem nhanh của các thẻ RunFlow — Biên tập

**Nội dung gốc trên HTML build:**

> `02 INNER JOIN` — Tìm dòng phòng khớp mã. — còn 48 dòng — MaNV / HoTen / MaPB — +1 cột
>
> `03 SELECT` — Đưa bốn cột ra báo cáo. — còn 48 dòng — MaNV / HoTen / MaPB — +1 cột

**Lý do:** Cả ba thẻ sau bước FROM vẫn chỉ xem nhanh `MaNV`, `HoTen`, `MaPB`; thông tin mới quan trọng nhất là `TenPB` nằm sau “+1 cột”. Đây là giới hạn bản xem nhanh ba cột đang quan sát trong build; không có bằng chứng dữ liệu bị thiếu khỏi bước kết. Drawer có đủ và Result chính cũng đã có tên, nên đây không phải lỗi dữ liệu. Tuy nhiên, người học nhìn sơ đồ sẽ khó thấy ngay tác dụng của phép kết.

**Tại sao/để làm gì:** “JOIN vừa mang tên phòng vào chỗ nào trên sơ đồ?” — **Đã trả lời khi mở drawer, chưa rõ ở bản xem nhanh**.

**Đề xuất:** Ưu tiên bản xem nhanh gồm `MaNV`, `MaPB`, `TenPB` cho các bước đã kết danh mục, giữ nguyên danh sách cột của câu SQL và bảng đầy đủ. Các bài trước đã có lựa chọn cột `preview`, nên không cần đổi component chung hoặc thêm lời văn nếu thuộc tính hiện có đáp ứng. Đây là cải thiện nhẹ, không chặn duyệt kiến thức.

### 19. Hay nhầm 1: nhãn và ví dụ hơi lệch — Biên tập

**Câu gốc, dòng 435:**

> **Kết vì tên cột giống nhau.** `MaPB` và `MaCD` đều là mã nhưng chỉ phòng ban mới dò sang `PhongBan`; sai quan hệ có thể ra rỗng hoặc dữ liệu không đúng nghĩa.

**Lý do:** Hậu quả đúng và hữu ích. Nhưng ví dụ thân câu là hai cột **khác tên**, cùng mang nghĩa “mã”, còn nhãn lại nói giống tên. Người học vẫn hiểu cảnh báo chung, nhưng ví dụ chưa soi thẳng vào lỗi được đặt tên.

**Tại sao/để làm gì:** “Vì sao hai cột cùng dạng mã chưa chắc kết được?” — **Đã trả lời:** phải có đúng quan hệ, nếu không kết quả rỗng hoặc sai nghĩa. “Ví dụ đang minh họa cùng tên ở đâu?” — **Chưa khớp nhãn**.

**Đề xuất:** Đổi nhãn thành “**Kết sai quan hệ.**”, giữ phần hậu quả; hoặc dùng một ví dụ đúng cùng tên nếu tác giả đã có, không cần tự thêm dataset.

### 20. Hay nhầm 2 và 3 — Giữ được

**Câu gốc, dòng 436–437:**

> **Coi INNER JOIN luôn giữ mọi hồ sơ.** Dòng không khớp bị loại; muốn giữ nó phải chọn cách kết phù hợp như bài 3.5.
>
> **Viết riêng MaPB khi cả hai bảng đều có.** SQL không biết bạn muốn cột nào; thêm tiền tố bí danh cho rõ nguồn.

**Lý do:** Nêu được lỗi và hậu quả trực tiếp của bài. Đây là nhắc lại dưới dạng sai lầm, không thêm một đoạn giảng nguyên cú pháp. Không cần bổ sung một câu SQL gây lỗi chỉ để có Messages; người học đủ nền để hiểu tên cột mơ hồ.

**Tại sao/để làm gì:** “Vì sao danh sách có thể thiếu hồ sơ?” — **Đã trả lời**. “Vì sao cùng tên cột cần chỉ rõ nguồn?” — **Đã trả lời**. Với câu hiện tại, `MaPB` không có tiền tố là mơ hồ; không cần đào sâu những trường hợp đặt alias cột đặc biệt ở ORDER BY.

**Đề xuất:** Giữ nội dung; định dạng code cho `INNER JOIN`/`MaPB` ở nhãn như mục 28.

### 21. Ứng dụng 1 — Giữ được

**Câu gốc, dòng 445:**

> **Đổi mã thành tên trong báo cáo:** lấy tên phòng hoặc chức danh từ danh mục, theo mã đang lưu trên hồ sơ.

**Lý do:** Đúng khả năng của phép kết đã giảng và quan hệ `MaCD` đã học ở bài 1.4. “Trong báo cáo” phân biệt được với sửa mã trong bảng nguồn. Có điều kiện thời gian “theo mã đang lưu”, không hứa dựng lại phòng/chức danh quá khứ.

**Tại sao/để làm gì:** “Học xong áp dụng ngoài tên phòng được không?” — **Đã trả lời:** tên chức danh theo cùng cách lấy danh mục.

**Đề xuất:** Giữ.

### 22. Ứng dụng 2: nên giữ rõ đơn vị nhóm — Biên tập

**Câu gốc, dòng 446:**

> **Tổng hợp theo tên dễ đọc:** kết danh mục rồi dùng `GROUP BY` và `COUNT` đã học, giữ rõ phạm vi trạng thái cần đếm.

**Lý do:** Kết hợp kiến thức cũ đúng phạm vi, bài tập 3 thực tế nhóm theo cả mã và tên. Riêng nhãn “theo tên” có thể làm người mới nghĩ chỉ cần tên làm khóa nhóm; tên danh mục chưa được các bài trước xác nhận là duy nhất. Không kết luận câu hiện tại là sai SQL, vì nó không hề viết `GROUP BY TenPB`.

**Tại sao/để làm gì:** “Làm báo cáo theo từng phòng mà dễ đọc hơn bằng cách nào?” — **Đã trả lời**. “Có bỏ mã khỏi đơn vị nhóm chỉ vì đã có tên không?” — **Ứng dụng chưa nói; bài tập 3 lại làm đúng**.

**Đề xuất:** Sửa gọn nhãn và một vế, chẳng hạn: “**Tổng hợp theo phòng có tên dễ đọc:** kết danh mục rồi nhóm theo mã và tên, dùng `COUNT` trên phạm vi trạng thái cần đếm.” Không thêm một đoạn về tên danh mục trùng nhau.

### 23. Ứng dụng 3 — Giữ được

**Câu gốc, dòng 447:**

> **Đối chiếu dữ liệu có cặp khớp:** lấy các dòng tồn tại ở cả hai nguồn theo khóa đã xác định, đồng thời kiểm số dòng để hiểu phạm vi kết quả.

**Lý do:** Phù hợp INNER JOIN: lấy phần có cặp, không hứa tìm ra toàn bộ dòng thiếu ở một bên. Kiểm số dòng là ứng dụng cụ thể của cảnh báo giữ/bỏ/nhân dòng, không biến thành lời khuyên chung chung về đọc đặc tả.

**Tại sao/để làm gì:** “Có thể dùng phép kết cho việc đối chiếu nào?” — **Đã trả lời:** lấy các cặp khớp theo khóa xác định. “Có tìm được cả hồ sơ không khớp bằng câu trên không?” — **Phần chính đã trả lời là không**, bài sau mới giữ chúng.

**Đề xuất:** Giữ. Không cần thêm bảo đảm dữ liệu nghiệp vụ đúng, vì bài không hứa điều đó.

### 24. Memo — Giữ được

**Nội dung gốc, dòng 453–458:**

> Dò mã sang sheet danh mục → INNER JOIN … ON tìm các cặp dòng khớp
>
> Mã duy nhất trong danh mục → Một dòng danh mục khớp cho mỗi mã hợp lệ
>
> Phân biệt cột giữa các sheet → nv.MaPB và pb.MaPB chỉ rõ nguồn cột
>
> VLOOKUP lấy dòng khớp đầu tiên → JOIN trả mọi cặp khớp; kiểm quan hệ trước khi đếm

**Lý do:** Ôn đúng bốn ý của bài, không dạy thêm nội dung. “Mỗi mã hợp lệ” giữ được điều kiện, không hứa một mã không có trong danh mục vẫn khớp một dòng. Định dạng chữ trong Memo đúng phạm vi component; không nên tự chèn backtick vào chuỗi ô khi chưa có hỗ trợ.

**Tại sao/để làm gì:** “Sau bài cần nhớ cơ chế nào để đọc câu SQL?” — **Đã trả lời:** tìm cặp, tính duy nhất, nguồn cột và mọi cặp khớp.

**Đề xuất:** Giữ. Không cần chép toàn bộ câu SQL hoặc luật ràng buộc thêm một lần vào Memo.

### 25. Lời dẫn bài tập và hợp đồng chấm — Giữ được, có giới hạn xác minh

**Câu gốc, dòng 462:**

> Bộ chấm so giá trị, thứ tự cột và thứ tự dòng theo đề; không so alias hay bắt buộc một cách viết. Tên phòng cần lấy từ danh mục, không tự gõ tên thay cho phép kết.

**Lý do:** Nói rõ tiêu chí sản phẩm đầu ra và yêu cầu học đúng kỹ năng, không đồng nhất “đúng giá trị trong bộ dữ liệu này” với “đã thực hiện đúng cách lấy nguồn”. YAML cả ba bài có `ordered: true`, danh sách cột và thứ tự trong lời đề khớp nhau. Phần câu ví dụ trong bài không nguyên vẹn giải được bất kỳ đề nào: mỗi đề có lọc hoặc tổng hợp thêm.

**Tại sao/để làm gì:** “Đúng số liệu nhưng đảo cột/dòng có được không?” — **Đã trả lời:** không nếu khác đề. “Có bắt buộc sao chép y hệt alias không?” — **Đã trả lời là không**, nhưng đây là lời hứa về bộ chấm, chưa kiểm bằng chạy API.

**Đề xuất:** Giữ. Không yêu cầu ép người học một cú pháp duy nhất; **chưa xác minh hành vi thật của grader**.

### 26. Bài tập 1 hiện tại: Kinh doanh — Giữ được

**Câu gốc, YAML dòng 4–17 bản mới:**

> Tên phòng của hồ sơ Kinh doanh
>
> Lấy mọi hồ sơ hiện mang MaPB bằng KD, gồm mọi trạng thái. Trả ba cột MaNV, HoTen, TenPB theo thứ tự này; tên phòng lấy từ PhongBan theo mã phòng của hồ sơ. Xếp MaNV tăng dần.

**Lý do:** `KD` và `Kinh doanh` khác nhau, nên trả thẳng mã phòng không tạo cùng giá trị với tên cần lấy. Phạm vi mọi trạng thái còn có ý nghĩa thật: bài 2.2 và hồ sơ công ty có `NV020` đã nghỉ nhưng vẫn mang `KD`. Câu mẫu trong YAML dùng đúng cặp mã, lấy `pb.TenPB`, lọc `nv.MaPB = 'KD'`, không tự thêm lọc trạng thái, rồi ORDER BY mã.

**Tại sao/để làm gì:** “Tại sao nhấn mọi trạng thái?” — **Đã có nền và lời đề rõ:** không bỏ người đã nghỉ. “Bài có phân biệt lấy tên với trả mã không?” — **Có ở bản KD hiện tại**.

**Đề xuất:** Giữ bản YAML mới. Chỉ cần build lại để bài và trang bài tập không tiếp tục hiển thị IT; đây là chênh lệch build được quan sát trong lượt review, không phải lỗi source KD. Suy từ hồ sơ công ty là `14` hồ sơ; **chưa chạy truy vấn hoặc chấm bài**.

### 27. Bài tập 2 và 3 — Giữ được

**Câu gốc, YAML dòng 21–24:**

> Vận hành đang làm
>
> Lấy hồ sơ có MaPB bằng VH và TrangThai bằng chuỗi Unicode Đang làm. Trả MaNV, HoTen, TenPB; tên phòng lấy từ PhongBan. Xếp MaNV tăng dần. Không lấy người đã nghỉ.

**Câu gốc, YAML dòng 39–43:**

> Phòng có trên năm hồ sơ đang làm
>
> Nhóm hồ sơ TrangThai bằng chuỗi Unicode Đang làm theo phòng hiện lưu, lấy tên từ PhongBan. Chỉ giữ phòng có trên 5 hồ sơ. Trả MaPB, TenPB, SoHoSo theo thứ tự này; xếp SoHoSo giảm dần, cùng số thì MaPB tăng dần. Đếm hồ sơ, không đếm phòng.

**Lý do:** Bài 2 tăng một điều kiện đã biết, thay vì thêm khái niệm chưa giảng; `VH`/`Vận hành` khác nhau và có người đã nghỉ trong dữ liệu mẫu, nên phạm vi lọc có ý nghĩa. Câu mẫu có Unicode `N'Đang làm'`, AND thụt một cấp bốn dấu cách trong YAML, đúng thứ tự JOIN → WHERE → ORDER BY.

Bài 3 nối kiến thức GROUP BY/HAVING vừa học ở 3.2–3.3 với tên danh mục. Câu mẫu nhóm cả `pb.MaPB` và `pb.TenPB`, đáp ứng luật mọi cột chọn trực tiếp phải thuộc khóa nhóm; `COUNT(*)` đếm hồ sơ vì phép kết này giữ đúng một dòng mỗi hồ sơ. `HAVING COUNT(*) > 5` và thứ tự sắp khớp lời đề. Không cần thêm một bài giải mẫu GROUP BY + JOIN trong lý thuyết: các mảnh kiến thức đã có.

**Tại sao/để làm gì:** “WHERE chọn gì, HAVING chọn gì?” — **Đã có nền 3.2–3.3, đề phân biệt đủ rõ**. “Vì sao nhóm cả mã và tên?” — **Nền GROUP BY đã trả lời**, không phải kiến thức bị giấu trong đáp án. “Một dòng bài 3 là một hồ sơ hay một phòng?” — **Đã trả lời trong đề:** một nhóm phòng, còn chỉ tiêu đếm hồ sơ.

**Đề xuất:** Giữ cả hai đề. Theo hồ sơ công ty, bài 2 kỳ vọng `8` hồ sơ; bài 3 kỳ vọng các nhóm `KD`/`13`, `IT`/`10`, `VH`/`8`, `KT`/`7`. Đây là suy từ tài liệu đã cho, **chưa xác minh bằng chạy SQL**.

### 28. Tự kiểm tra: nội dung phủ mục tiêu, định dạng còn sót — Biên tập

**Câu gốc, dòng 469–485:**

> Vì sao 48 hồ sơ vẫn ra 48 dòng ở câu này?
>
> Mỗi mã phòng trên hồ sơ có đúng một dòng danh mục khớp nhờ các ràng buộc đã khai báo. Không thể suy số dòng này cho mọi phép kết.
>
> Một mã không có trong danh mục có còn trong kết quả INNER JOIN không?
>
> Không. INNER JOIN chỉ giữ cặp dòng thỏa ON; bài 3.5 dùng LEFT JOIN để giữ phía cần đối chiếu.
>
> AS nv có đổi tên bảng NhanVien trong database không?
>
> Không. Đó là bí danh dùng trong câu lệnh; nv.MaPB vẫn đọc cột MaPB của NhanVien.

**Lý do:** Ba câu kiểm đúng những nút cần hiểu: điều kiện giữ đủ số dòng, tác dụng loại dòng không khớp, phạm vi bí danh bảng. Cộng với ba bài tập, đủ bao phủ lấy tên từ danh mục và giải thích dòng được giữ. Không cần thêm một câu ngoại lệ chỉ để tăng số câu; vấn đề nhân dòng đã được cảnh báo và dành cho 3.6.

Định dạng còn thiếu code ở các giá trị/tên kỹ thuật trong lời văn. Riêng `AS nv` ở summary đã có `<code>` trong source; không yêu cầu sửa lại phần đó. Các chỗ còn sót cụ thể: hai số `48` trong câu đầu; `INNER JOIN` ở summary câu 2; `INNER JOIN`, `ON`, `LEFT JOIN` trong đáp án; `NhanVien` ở summary câu 3; `nv.MaPB`, `MaPB`, `NhanVien` trong đáp án cuối. Nhãn Hay nhầm 2–3 cũng còn `INNER JOIN` và `MaPB` chưa có code; drawer FROM có `NhanVien` như mục 15.

**Tại sao/để làm gì:** “Tôi đã hiểu điều kiện giữ dòng và bí danh chưa?” — **Đã có câu tự kiểm thích hợp**. “Cần kiểm trực tiếp cách lấy tên không?” — **Đã được kiểm bằng bài tập**, không nhất thiết thêm câu hỏi thứ tư.

**Đề xuất:** Chỉ sửa định dạng: dùng `<code>` ở summary, Markdown code trong lời văn MDX và định dạng mà drawer đã hỗ trợ. Không chèn backtick hàng loạt vào các chuỗi ô Memo/Excel hoặc lời đề YAML thuần chữ khi chưa biết renderer hỗ trợ. Giữ nguyên nội dung đáp án.

## Ưu tiên xử lý

1. **Cần làm rõ, đáng sửa trước:** đối chiếu VLOOKUP/INNER JOIN khi không có mã khớp, bằng một vế ở câu đang giảng việc loại dòng (mục 8). Đây là khoảng trống dễ gây hiểu sai phép ví von nhất.
2. **Cần làm rõ, sửa rất nhỏ:** dùng tên bảng đầy đủ trong ví dụ ON đầu tiên trước khi đã định nghĩa bí danh (mục 5).
3. **Biên tập có lợi cho người học:** bỏ từ “vai trò”, nói rõ cách đọc dấu chấm; đưa `TenPB` vào bản xem nhanh của RunFlow; chỉnh nhãn Hay nhầm 1 và tên ứng dụng tổng hợp (mục 7, 18, 19, 22). Các mục này không phải lỗi SQL bắt buộc phải thay toàn bộ ví dụ.
4. **Cắt và định dạng:** bỏ câu đếm lặp dưới Result; sửa code ở drawer, nhãn Hay nhầm và tự kiểm tra (mục 13, 15, 28).
5. **Đối chiếu build sau vòng sửa:** bản build đang đọc chưa phản ánh bài tập 1 KD. Build lại và kiểm trang bài tập 1, bản xem nhanh, drawer và thao tác sao chép nếu có sửa. Không gộp việc build cũ này thành một lỗi kiến thức của YAML hiện tại.

Không có bằng chứng trong phạm vi review để yêu cầu sửa câu SQL chính, thay số `48`, thay kết quả mười dòng, cắt các điều kiện NOT NULL/khóa ngoại/khóa chính hoặc viết thêm một bài giảng sâu về LEFT JOIN và nhân dòng.

## Nguồn đã đọc và giới hạn

**Nguồn quy ước và bối cảnh:**

- `AGENTS.md`.
- `docs/quy-uoc.md`, gồm quy trình review độc lập ở mục 4.5 và quy tắc đọc database ở mục 5.
- `docs/lesson-template.md`.
- `docs/ho-so-cong-ty.md`.
- Bài mẫu `src/content/lessons/1-1-database-la-gi.mdx`.

**Bài đang review và các bài nền đã đối chiếu:**

- `src/content/lessons/3-4-inner-join-vlookup.mdx` và `src/content/exercises/3-4-inner-join-vlookup.yaml` (bản đầu để học thử, đọc lại đầy đủ bản KD khi chốt).
- `src/content/lessons/1-3-bang-cot-kieu-du-lieu.mdx`: NOT NULL, kiểu dữ liệu, Unicode.
- `src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx`: khóa, tham chiếu, mã phòng/chức danh.
- `src/content/lessons/1-5-doc-so-do-erd.mdx`: đường liên kết, một-nhiều, VLOOKUP và các cặp khớp.
- `src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx`: danh sách cột và bí danh cột.
- `src/content/lessons/2-2-where-loc-nhu-autofilter.mdx`: lọc hồ sơ theo mã/trạng thái, Unicode, kết quả KD.
- `src/content/lessons/2-4-sap-xep-va-top.mdx`: các phần liên quan ORDER BY/ASC, thứ tự logic và bản xem nhanh của RunFlow.
- `src/content/lessons/3-1-count-sum-avg.mdx`, `3-2-group-by-pivottable.mdx`, `3-3-having-loc-sau-khi-gop.mdx`: đếm hồ sơ, chọn khóa nhóm, WHERE/HAVING.

**Bản build đã đọc tĩnh:**

- `dist/bai/3-4-inner-join-vlookup/index.html`.
- `dist/bai/3-4-inner-join-vlookup/bai-tap/1/index.html`.
- `dist/bai/3-4-inner-join-vlookup/bai-tap/2/index.html`.
- `dist/bai/3-4-inner-join-vlookup/bai-tap/3/index.html`.

Đã đọc nội dung HTML hiển thị, dữ liệu và lời giải thích của cả bốn drawer; đối chiếu lớp đánh dấu Excel/đường ERD và chuỗi SQL/tab trong HTML. Không mở trình duyệt, không chụp hoặc đánh giá trực quan bố cục, không tương tác drawer/copy/editor, không kiểm được CSS thực tế bằng mắt. Không kết luận có lỗi xuống dòng của highlight chỉ từ phép trích text HTML, vì cách hiển thị còn phụ thuộc CSS.

Không chạy `npm test`, `npm run check`, `npm run build`, `check:dist`, API hoặc bộ chấm; đây là lượt review học viên độc lập chỉ tạo report, không phải lượt kiểm máy của tác giả. Không xác nhận các số liệu đã được chạy lại. Các nhận xét số liệu chỉ có nghĩa **khớp hồ sơ công ty/bài trước và nhất quán trong bài**, còn kết quả SQL, hành vi grader và dữ liệu database hiện tại đều **chưa xác minh**.

Lần trích HTML đầu gặp lỗi encoding đầu ra Python trên Windows; đã đọc lại thành công với UTF-8, không làm thay đổi nội dung được review. Chênh lệch IT/KD của build được ghi đúng thời điểm đọc, sau khi tác giả thông báo đã đổi source. Không đọc review/spec/plan của tác giả, không dùng kết quả review khác để dựng nhận xét.

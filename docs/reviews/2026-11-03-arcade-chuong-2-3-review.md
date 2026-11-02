# Review Arcade chương 2-2 và 2-3 (học thử từ góc nhìn người mới)

## 1. Phạm vi, phiên bản, công cụ thực tế

**Phạm vi.** 13 đề Arcade: `src/content/arcade/2-2/` (6 đề) và `src/content/arcade/2-3/` (7 đề). Thứ tự chơi theo trường `order` trong từng chương (2-2: order 1 đến 6; 2-3: order 1 đến 7). Cách trang ghép `order` của các chương với nhau chưa xác minh vì không mở trang.

**Phiên bản.** Nhánh `feat/arcade-mvp`, commit `c1eec47`. `git status` cho thấy hai thư mục 2-2 và 2-3, cùng `src/content/lessons` và `docs/quy-uoc.md`, không có thay đổi chưa commit. Trong lúc review xuất hiện thêm `src/content/arcade/2-6/` và `2-7/` (chưa theo dõi bởi git); ngoài phạm vi, không đọc.

**Công cụ thực tế.** Claude Sonnet 5.5 (`claude-sonnet-5-5`); effort `high` do giao việc yêu cầu, không tự kiểm được effort thực tế. Chỉ dùng Read, Grep, Bash (`awk`, `grep`, `git` chỉ đọc). Không build, không mở trình duyệt, không chạy SQL, API hay `check:arcade`, không nộp bài.

**Đã đọc.** `AGENTS.md`, `docs/quy-uoc.md` mục 2.8 và 4.5 đến 4.6, spec Arcade (cả bản, gồm mục 6, 8, 9), các bài `1-1` đến `1-5`, `2-1`, `2-2`, `2-3`. Không đọc `temp/review`, `docs/reviews`, `src/content/exercises`, `HRM_Demo.sql`, `.env`.

**Cách học thử.** Dùng một bộ lọc `awk` tự viết trong thư mục tạm của phiên: in phần đầu file bỏ dòng `answer:`, và chỉ in các test có `visible: true`. Với mỗi đề, tôi nghĩ cách làm từ kiến thức đã học và ghi bằng lời (không chép đáp án), rồi mới mở `answer`, hidden test và `catches`. Sau đó dò tay: `expected` của cả 5 test mỗi đề so với dữ liệu vào, và cả 39 câu `catches` so với hai unit test và hidden test của nó (không chạy SQL, chỉ đọc dữ liệu và suy luận). Kết quả dò tay nằm ở mục 2.

## 2. Rà theo thứ tự bài

Hai khái niệm dùng xuyên suốt:

- **Đề nói đủ** nghĩa là có cột ra, thứ tự cột, phạm vi dòng; `ordered: false` ở cả 13 đề nên không cần thứ tự dòng.
- **Dò tay** nghĩa là tôi tự suy kết quả từ dữ liệu vào, không phải kết quả chạy trên SQL Server.

### 2.1 Chương 2-2 (bài 2.2: `WHERE`, `=`, `>=`, `N'…'`, ngày `yyyymmdd`)

**Bài 1. `ung-vien-mot-vi-tri` (Dễ)**
- Học thử: lọc một cột bằng phép bằng với mã chữ có nháy, chọn hai cột. Dạng câu giống hệt ví dụ `WHERE MaPB = 'KD'` ở bài 2.2.
- Đề: đủ. Câu "lấy mã và họ tên của các hồ sơ có MaViTri là KT" chỉ ra cả cột lọc lẫn cột ra; chỉ có một cách hiểu.
- Hidden: T3 bắt `>=` (mã đứng sau KT theo bảng chữ cái), T4 bắt mã gần giống `KTT`, T5 bắt việc thêm `OR` trên cột dự phòng. Công bằng với đề. Cả ba đều bắt câu mà người học chương này khó viết (xem F6).
- Dò tay: `expected` khớp dữ liệu ở cả 5 test.
- Đánh giá: **Giữ được.**

**Bài 2. `de-xuat-da-duyet` (Dễ)**
- Học thử: lọc cột chữ có dấu tiếng Việt bằng `N'…'`. Bài 2.2 nói đúng điều này với `N'Đã nghỉ'`.
- Đề: đủ. Phạm vi "có TrangThai là Đã duyệt" rõ.
- Hidden: T3 bắt `LIKE '%duyệt'` (dính "Chờ duyệt"), T4 bắt lọc theo số tiền lớn, T5 bắt `LIKE 'Đ%'` (dính "Đang xét"). Công bằng, nhưng cả ba đều là câu "bịa" so với chương này (LIKE chưa dạy; lọc theo `SoTien` chỉ xảy ra nếu suy diễn từ dữ liệu hiển thị). Xem F6.
- Dò tay: khớp.
- Đánh giá: **Giữ được.**

**Bài 3. `lop-mo-tu-ngay` (Dễ)**
- Học thử: `>=` với ngày viết `yyyymmdd`, chọn đúng một trong hai cột ngày gần tên. Câu 01/10/2026 chính là ví dụ `'20261001'` của bài 2.2, nên bước đổi định dạng ngày có thể chép từ bài học.
- Đề: đủ; nói rõ "gồm cả đúng ngày 01/10/2026" và đủ cột.
- Hidden: T3 biên ngày 01/10 (bắt `>= '20261002'`), T4 nhầm sang `NgayDangKy`, T5 không dòng nào đạt (kết quả rỗng; câu bắt dùng mốc tháng 9, là câu làm sẵn để qua unit test). Đây là bộ hidden test tốt nhất của chương 2-2: T3 và T4 gắn với lỗi người học có thể mắc, T5 kiểm tập rỗng, và hai unit test không tách được hai cột ngày (đã dò tay: câu dùng `NgayDangKy` qua cả hai unit test).
- Dò tay: khớp. T5 `expected: []` hợp lệ về dữ liệu; cách chấm xử lý tập rỗng chưa xác minh.
- Đánh giá: **Giữ được.** Nhãn Dễ so với bài 4: xem F2.

**Bài 4. `thuc-chi-tu-muc` (Vừa)**
- Học thử: `>=` với số, đổi thứ tự cột ra khác thứ tự trong bảng, chọn `SoTienThucChi` thay vì `SoTienDuKien`. Bài 2.2 chỉ dạy `>=` cho ngày; sang số là suy ra.
- Đề: đủ về cột và thứ tự ("ba cột theo thứ tự"), có biên "gồm cả đúng 2.000.000". Nhưng số viết kiểu Việt `2.000.000`, mà bài học chưa nói cách viết số (xem F1).
- Hidden: T3 nhầm cột `SoTienDuKien` (hai unit test để hai cột bằng nhau), T4 biên đúng 2.000.000, T5 ngưỡng quá thấp (1.000.000, có dòng đúng 1.000.000). Công bằng.
- Dò tay: khớp.
- Đánh giá: **Cần làm rõ** (F1, ngoài đề) cho phần cách viết số; phần còn lại **Giữ được**.

**Bài 5. `tai-san-tang-5` (Vừa)**
- Học thử: lọc cột chữ có dấu (`N'Tầng 5'`), chọn đúng cột "hiện tại" trong hai cột `NoiDatTruoc` và `NoiDatHienTai`.
- Đề: đủ. Câu "Bảng lưu cả nơi đặt hiện tại và nơi đặt trước đó" là mô tả dữ liệu, các đề khác không có; xem F8.
- Hidden: T3 nhầm cột trước, T4 `Tầng 5A` (bắt `LIKE 'Tầng 5%'`), T5 bắt `OR` cả hai cột, có `NULL` ở `NoiDatTruoc`. Công bằng; `NULL` chỉ nằm ở cột người làm đúng không đụng tới.
- Dò tay: khớp.
- Đánh giá: **Giữ được.**

**Bài 6. `ket-thuc-thu-viec` (Vừa)**
- Học thử: `>=` với ngày `yyyymmdd` (15/10/2026 phải tự đổi), ba cột theo thứ tự, không lọc theo `NgayBatDau`.
- Đề: đủ. Cụm "kể cả người chưa có kết quả đánh giá" là phạm vi dòng: người học đúng không phải làm gì thêm, vì chỉ cần không thêm điều kiện lên `KetQua`. Bài 2.2 chỉ nói "giá trị thiếu `NULL` cần cách lọc riêng ở bài 2.5", nên người học cẩn thận có thể đi tìm một mệnh đề `NULL` mà chưa được dạy. Hai unit test không có dòng `KetQua` trống nên không tự kiểm được.
- Hidden: T3 biên 15/10 (bắt `>= '20261016'`), T4 dòng `KetQua` trống phải có mặt (bắt `IS NOT NULL`, chưa dạy), T5 nhầm sang `NgayBatDau` kèm mốc khác. T5 là câu làm sẵn để qua unit test; nhầm cột thật với cùng mốc 15/10 đã trượt unit test 1 (xem F6).
- Dò tay: khớp. Cách giao diện hiện ô `NULL` trong `expected` (T4) chưa xác minh.
- Đánh giá: **Giữ được**, kèm ghi chú nhẹ ở F6.

### 2.2 Chương 2-3 (bài 2.3: `AND`, `OR`, ngoặc, `IN`, `BETWEEN`, `LIKE`, `%`, `_`)

**Bài 1. `don-nghi-da-duyet` (Dễ)**
- Học thử: hai điều kiện chữ có dấu nối bằng `AND`. Bài 2.3 dạy `AND` bằng ví dụ khoảng ngày cộng phòng; hai phép bằng chữ là suy ra thẳng.
- Đề: đủ; "đơn phải đạt cả hai điều kiện" nói rõ phạm vi.
- Hidden: T3 và T4 bắt việc bỏ một trong hai điều kiện, T5 bắt `OR`. Công bằng (đề đã nói "cả hai"). T3 và T4 là hai mặt của cùng một lỗi nhưng dữ liệu khác nhau, chấp nhận được.
- Dò tay: khớp; `SoNgay` hiện `2.0` do `decimal(4,1)`, người học sẽ thấy cùng dạng ở kết quả của mình.
- Đánh giá: **Giữ được.**

**Bài 2. `ba-khoan-phuc-loi` (Dễ)**
- Học thử: `IN` với ba giá trị chữ có dấu, mỗi giá trị `N'…'`. Bài 2.3 chỉ minh họa `IN ('KD', 'IT')` không `N`; viết `N` cho từng giá trị là suy từ bài 2.2 (xem F5).
- Đề: đủ.
- Hidden: T3 thiếu "Ăn trưa" (hai unit test không có dòng này nên chỉ hidden mới lộ), T4 bắt mẫu `LIKE 'Đ%' OR 'Ă%'`, T5 bắt khoảng `BETWEEN` theo số vừa thấy. Công bằng; T4 và T5 là câu bịa (xem F6).
- Dò tay: khớp.
- Đánh giá: **Giữ được.**

**Bài 3. `trong-khoang-luong` (Dễ)**
- Học thử: `BETWEEN` với số, chọn `LuongDeXuat` thay vì `LuongToiDa`. Bài 2.3 dạy `BETWEEN` bằng ngày; sang số là suy ra, kèm vấn đề cách viết số (F1).
- Đề: đủ; "gồm cả hai mức đó".
- Hidden: T3 biên dưới 10.000.000, T4 biên trên 15.000.000, T5 nhầm cột `LuongToiDa`. Công bằng và đúng bẫy chính của chương.
- Dò tay: khớp. Trong unit test `LuongToiDa` bằng `LuongDeXuat` ở mọi dòng, về nghĩa hơi lạ (mức đề xuất đúng bằng mức tối đa) nhưng cần để hai unit test không tách cột.
- Đánh giá: **Cần làm rõ** (F1) cho cách viết số; còn lại **Giữ được.**

**Bài 4. `ngoac-doi-ket-qua` (Vừa)**
- Học thử: dùng `IN` cho hai phòng rồi `AND` với trạng thái. Nếu dùng `OR` thì phải đặt ngoặc; cách làm nào cũng dựa trên bài 2.3.
- Đề: đủ. Câu "Điều kiện trạng thái áp dụng cho cả hai phòng" cần giữ: không có nó, "KD hoặc IT, và Đang làm" có thể hiểu hai cách.
- Hidden: T3 và T4 là hai thứ tự của cùng lỗi thiếu ngoặc (KD đứng trước hoặc IT đứng trước), T5 bắt `IN` có thêm `KT`. Công bằng; T3 và T4 hợp lý vì mỗi thứ tự `OR` là một câu sai khác nhau.
- Điểm vướng: người dùng `IN` không bao giờ cần ngoặc, nên đề tên "ngoặc" này không buộc ai phải dùng ngoặc (F3).
- Dò tay: khớp.
- Đánh giá: **Giữ được** về tính đúng; **Biên tập** ở F3.

**Bài 5. `ho-bat-dau-bang` (Vừa)**
- Học thử: `LIKE N'Nguyễn%'`. Ví dụ `N'Nguy_n%'` và tên `Nguyễn Thu Hà` ở bài 2.3 nằm sát đề này.
- Đề: đủ về cột và phạm vi "bắt đầu bằng chữ Nguyễn". Câu mở đầu "nhớ ứng viên mang họ Nguyễn" hơi lạ nhưng câu sau đã định nghĩa (F8).
- Hidden: T3 bắt `%Nguyễn%` (Nguyễn ở giữa tên, đúng lỗi "Contains" mà bài 2.3 vừa nhắc), T4 bắt mẫu `Nguyễn %` kèm điều kiện có dấu cách (cần dòng tên chỉ một chữ "Nguyễn"), T5 bắt tiền tố `Ng%`. T4 công bằng theo chữ ("bắt đầu bằng") nhưng dữ liệu hơi gượng: một họ tên chỉ có một chữ.
- Dò tay: khớp.
- Đánh giá: **Giữ được**; chi tiết nhỏ ở F8.

**Bài 6. `ma-dung-mau` (Vừa)**
- Học thử: `LIKE` với `_` ở vị trí ký tự thứ ba, ba ký tự cuối cố định. Đúng nội dung "`_` thay đúng một ký tự" của bài 2.3.
- Đề: đủ và chính xác ("đúng sáu ký tự", "ký tự thứ ba", "số thứ tự 001").
- Hidden: T3 mã 7 ký tự `26AB001` (bắt `%` thay `_`), T4 nhóm ngoài A, B (bắt liệt kê nhóm), T5 mã năm khác (bắt `%001`). Công bằng; T3 là bẫy chính của chương, T5 nối với "mẫu đứng đầu".
- Dò tay: khớp.
- Đánh giá: **Giữ được.**

**Bài 7. `khoa-hoc-quy-4` (Khó)**
- Học thử: `BETWEEN` hai mốc ngày, `IN` hai nhóm, một điều kiện bằng; tất cả `AND`. Ba điều kiện đều có sẵn dạng trong bài 2.3.
- Đề: đủ; biên "đến hết 31/12/2026" rõ.
- Hidden: T3 thiếu trạng thái, T4 thiếu nhóm, T5 biên hai đầu (01/10, 31/12) và một ngày sau mốc (04/01/2027). Công bằng và gọn.
- Dò tay: khớp. Tên mẫu "Khai xuân sớm" mở ngày 01/10 là chi tiết gượng (F8).
- Đánh giá: **Giữ được**; nhãn Khó xem F2.

### 2.3 Các nhận xét xuyên đề (finding)

**F1. Cách viết số trong đề: chưa dạy, và số kiểu Việt dễ gây lỗi**
- Đánh giá: **Cần làm rõ.** Loại: chưa được dạy (cách viết số trong câu SQL); nội dung sai: không có.
- Câu gốc: "số tiền thực chi từ 2.000.000 đồng trở lên" (`2-2/thuc-chi-tu-muc.yaml:8`); "mức lương đề xuất từ 10.000.000 đến 15.000.000 đồng" (`2-3/trong-khoang-luong.yaml:8`).
- Tác động: người mới viết theo mặt chữ của đề sẽ gõ `2.000.000`. Tôi nghi (chưa chạy) đây là lỗi cú pháp ở SQL Server, vì dấu chấm là dấu thập phân; họ sẽ phải tự đoán nên bỏ dấu chấm. Nếu họ đoán đặt số vào nháy thì theo suy luận (chưa chạy) vẫn được nhờ chuyển kiểu ngầm, nhưng bài học chưa nói điều đó cho số.
- Căn cứ: tôi tìm trong `1-1` đến `2-3` không có ví dụ so sánh hoặc `BETWEEN` với số, và không có câu nào về dấu phân cách hàng nghìn. Bài 2.2 chỉ dạy `>=` với ngày; bài 2.3 chỉ dạy `BETWEEN` với ngày (và câu tự kiểm còn ghi "Với cột `date` trong bài").
- Đề xuất: một vế ngắn ở bài 2.2 hoặc 2.3: số viết liền, không nháy, không dấu chấm phân cách hàng nghìn. Không đổi đề (đề không được có gợi ý).

**F2. Nhãn độ khó**
- Đánh giá: **Biên tập** (cảm nhận từ đọc đề, chưa có người làm thử).
- Chương 2-2: `lop-mo-tu-ngay` (Dễ, order 3) cần đổi ngày kiểu 01/10/2026 sang `yyyymmdd`, `>=` và chọn một trong hai cột ngày; `thuc-chi-tu-muc` (Vừa, order 4) cần `>=` với số và đổi thứ tự cột. Tôi thấy bài 3 không dễ hơn bài 4. `ket-thuc-thu-viec` (Vừa) là `lop-mo-tu-ngay` cộng thứ tự cột.
- Chương 2-3: `ho-bat-dau-bang` và `ma-dung-mau` (Vừa) là một điều kiện `LIKE` đơn, về độ phức tạp ngang `ba-khoan-phuc-loi` (Dễ). `khoa-hoc-quy-4` (Khó) là ví dụ trong bài 2.3 (`IN` cộng `BETWEEN` cộng `AND`) thêm một phép bằng; không khó hơn `ngoac-doi-ket-qua` (Vừa) bao nhiêu.
- Tác động: người mới không hỏng gì, nhưng nhãn Khó không báo trước một bước nhảy; thưởng coin theo nhãn (10/20/30) lệch với công sức thật một chút.
- Đề xuất: đổi nhãn `thuc-chi-tu-muc` xuống Dễ hoặc đưa `lop-mo-tu-ngay` lên Vừa (giữ 3/3 của chương 2-2); với `khoa-hoc-quy-4`, nếu muốn đúng nghĩa Khó thì thêm một lớp khó thật (xem F3), nếu không thì chấp nhận nhãn theo hạn ngạch 3/3/1.

**F3. Thứ tự `AND`/`OR` và ngoặc không bị ép ở bất kỳ đề nào**
- Đánh giá: **Biên tập.**
- Câu gốc: tên đề "Hai phòng cùng một điều kiện" và câu "Điều kiện trạng thái áp dụng cho cả hai phòng" (`2-3/ngoac-doi-ket-qua.yaml:4, 8`).
- Tác động: hai phòng cùng một cột nên giải được bằng `IN`, không cần `OR` hay ngoặc. Trong 7 đề của chương, không đề nào buộc dùng `OR` trên hai cột khác nhau; kiến thức "`AND` xét trước `OR`" (điều bài 2.3 nhấn là lỗi hay gặp, ở "Hay nhầm" mục 1) có thể được bỏ qua mà vẫn đạt mọi đề. Hidden test T3, T4 chỉ chạm tới ai chủ động chọn `OR`.
- Căn cứ: dò tay đáp án thay thế bằng `IN` qua cả 5 test của bài 4; bài 2.3 tự nói `IN` "không thay mọi cách dùng `OR`".
- Đề xuất: giữ đề, nhưng cân nhắc một đề (có thể thay phần thêm của `khoa-hoc-quy-4`) có `OR` trên hai cột khác nhau cộng `AND` để ngoặc là thật sự cần.

**F4. `columns` lúc ghi tên cột, lúc ghi tiêu đề nghiệp vụ**
- Đánh giá: **Biên tập.**
- Câu gốc: `columns: [ Nơi đến, Số tiền thực chi, Mã nhân viên ]` (`2-2/thuc-chi-tu-muc.yaml:9`) so với `columns: [ MaLop, TenLop, NgayKhaiGiang ]` (`2-2/lop-mo-tu-ngay.yaml:9`).
- Tác động: ở 2-2 ba đề ghi tiêu đề (`thuc-chi`, `tai-san`, `ket-thuc`) và ba đề ghi tên cột; ở 2-3 cả bảy đề ghi tên cột. Với tên cột, hộp "các cột cần ra" nói luôn cột nào là cột "mã" hay "lương đề xuất", nên bẫy "hai cột gần tên" ở `lop-mo-tu-ngay` T4 và `trong-khoang-luong` T5 yếu đi (người học chỉ cần lọc đúng cột đang xuất). Với tiêu đề, một số người sẽ tự hỏi có phải đặt `AS` giống vậy hay không; bài 2.1 đã nói bộ chấm không so tiêu đề, nên chỉ là băn khoăn nhỏ.
- Đề xuất: không bắt buộc; nếu muốn đều, nên dùng tiêu đề từ đầu 2-3 trở đi hoặc ghi chú cách dùng ở trang bài.

**F5. Hai chỗ bài học nhắc liên quan nhưng dễ bỏ sót**
- Đánh giá: **Cần làm rõ** (thấp). Loại: đã dạy nhưng khó tìm.
- Câu gốc: `lessons: [ 2-3-and-or-in-between-like ]` ở cả 7 đề của 2-3.
- Tác động 1: phần `N'…'` cho chuỗi tiếng Việt chủ yếu ở bài 2.2 và 1.3 (5 trong 7 đề 2-3 cần `N`); bài 2.3 chỉ nhắc `N` ở đoạn `LIKE` ("giữ `N` trước mẫu tiếng Việt như bài 2.2"). Cách đổi ngày `yyyymmdd` cũng nằm ở bài 2.2 (bài 2.3 trỏ lại). Nếu trang chỉ hiện các bài trong `lessons`, người học 2-3 chỉ thấy một link.
- Tác động 2: bài 2.3 minh họa `IN` bằng hai mã không có `N`. Với `ba-khoan-phuc-loi`, ghi `N` thiếu ở `Điện thoại` hoặc `Đi lại` thì trượt unit test (suy luận từ bài 1.3, chưa chạy), người học thấy ngay; thiếu ở `Ăn trưa` thì chỉ hidden T3 lộ ra, và đề không nói gì thêm.
- Căn cứ: nội dung `2-3-and-or-in-between-like.mdx` (đoạn `IN`, đoạn `LIKE`); chưa xác minh cách trang hiển thị `lessons`.
- Đề xuất: thêm `2-2-where-loc-nhu-autofilter` vào `lessons` của các đề 2-3 dùng `N` hoặc ngày; có thể thêm vế "mỗi giá trị `N` riêng" vào đoạn `IN` của bài 2.3 nếu muốn.

**F6. Một số hidden test bắt câu người học chương này khó viết ra**
- Đánh giá: **Biên tập** (thấp, tùy chọn). Không phải lỗi; phù hợp quyết định "`catches` được dùng từ khóa chưa dạy".
- Câu gốc ví dụ: catch dùng `LIKE 'KT%'` (`2-2/ung-vien-mot-vi-tri.yaml` T4), `SoTien >= 1000000` (`de-xuat-da-duyet.yaml` T4), `KetQua IS NOT NULL` (`ket-thuc-thu-viec.yaml` T4), `NgayBatDau >= '20260815'` (T5), `BETWEEN 300000 AND 730000` (`ba-khoan-phuc-loi.yaml` T5), `IN (…, 'KT')` (`ngoac-doi-ket-qua.yaml` T5).
- Tác động: người làm đúng đề không bao giờ trượt các test này, nên 10 coin mở chúng cho ít bài học. Các test thực sự bắt lỗi người mới mắc nằm ở: biên ngày/số (`lop-mo` T3, `thuc-chi` T4, `ket-thuc` T3, `trong-khoang` T3 và T4, `khoa-hoc` T5), nhầm cột gần tên (`lop-mo` T4, `thuc-chi` T3, `tai-san` T3, `trong-khoang` T5), mã gần giống (`ung-vien` T4, `tai-san` T4), thiếu ngoặc (`ngoac` T3 và T4), `%` thay `_` (`ma-dung` T3), Contains thay Starts-with (`ho-bat-dau` T3).
- Đề xuất: giữ nguyên. Nếu sửa một bài nào đó thì ưu tiên thay các catch "bịa" bằng lỗi thật. Với hai bài đầu của 2-2 có rất ít lỗi thật để bắt (chỉ có một đường làm), nên chấp nhận.

**F7. Lặp giữa các đề**
- Đánh giá: **Biên tập** (thấp).
- Chương 2-2 gồm hai kỹ năng lặp ba lần: phép bằng với chữ (`ung-vien`, `de-xuat`, `tai-san`) và `>=` (`lop-mo`, `thuc-chi`, `ket-thuc`), trong đó `lop-mo` và `ket-thuc` gần như song sinh (ngày, `>=`, cột ngày thứ hai gây nhiễu), chỉ khác thứ tự cột và cụm về `NULL`. Điều này phần lớn do chương chỉ có `=`, `>=`, `N'…'`, ngày.
- Giữa hai chương: `lop-mo-tu-ngay` và `khoa-hoc-quy-4` cùng mốc 01/10/2026 và cùng đề tài đào tạo (cũng lặp tên "Sơ cấp cứu", "Pháp luật lao động" ở `LopHoc` 2-2, `KhoaHoc` và `LopHoc` 2-3); `ung-vien-mot-vi-tri` và `ho-bat-dau-bang` cùng bảng `UngVien` với `UV02 Trần Quốc Việt`. Việc mỗi đề tự khai bảng riêng đã được duyệt nên bảng cùng tên khác cột là chấp nhận được.
- Đề xuất: không bắt buộc. Nếu chỉnh, đổi mốc ngày hoặc đề tài của một trong hai bài đào tạo để người chơi không có cảm giác làm lại.

**F8. Chi tiết nhỏ về câu chữ và dữ liệu**
- Đánh giá: **Biên tập** (rất thấp).
- `tai-san-tang-5.yaml:8`: "Bảng lưu cả nơi đặt hiện tại và nơi đặt trước đó." Các đề khác không báo trước cột gây nhiễu; câu này mô tả chứ không chỉ cách làm, nhưng nó làm lộ bẫy và không đồng nhất. Có thể cắt, vì "hiện đang đặt" đã đủ.
- `ho-bat-dau-bang.yaml:8`: "nhớ ứng viên mang họ Nguyễn" nghe như tìm một người; câu sau đã làm rõ phạm vi. Có thể nói "cần các ứng viên mang họ Nguyễn".
- `ho-bat-dau-bang.yaml:44`: dòng `"Nguyễn"` (họ tên một chữ) hơi gượng, nhưng đúng chữ đề ("bắt đầu bằng").
- `khoa-hoc-quy-4.yaml:53`: tên "Khai xuân sớm" cho khóa mở 01/10; "Tổng kết năm" mở 31/12. Đổi tên cho hợp mùa.
- `ket-thuc-thu-viec.yaml:4`: tiêu đề "Người sắp hết thử việc" nhưng điều kiện chỉ "từ 15/10/2026 trở đi", không có mốc trên. Người cẩn thận có thể hỏi "sắp" là bao xa.
- Tiêu đề nhiều đề nói thẳng kỹ thuật ("Ba khoản phúc lợi", "Mức lương trong khoảng", "Tìm theo họ", "Mã lớp đúng mẫu", "Hai phòng cùng một điều kiện"). Với người mới, tiêu đề đóng vai gợi ý nhỏ trong khi quy ước nói đề không có gợi ý; chỉ ghi nhận, không có quyết định đã duyệt nào cấm.
- `lop-mo-tu-ngay`: mốc 01/10/2026 trùng đúng ví dụ `'20261001'` ở bài 2.2, nên bước đổi định dạng ngày cho bài này có thể chép từ bài học; `ket-thuc-thu-viec` (15/10/2026) mới là bài buộc tự đổi.

**Điểm đã dò và thấy ổn (công nhận)**
- Cả 13 đề giải được bằng từ khóa đã dạy tới hết bài 2.3, không cần `NOT`, `<>`, `<`, `>`, hàm hay `IS NULL`. Kiểu cột chỉ dùng `varchar`, `nvarchar`, `date`, `decimal`.
- Cả 13 đề có đúng 2 unit test và 3 hidden test; 39 hidden test đều có `catches`.
- Dò tay `expected` ở 65 test (5 test × 13 đề): khớp dữ liệu vào, không thấy sai. Dò tay 39 câu `catches`: mỗi câu cho kết quả giống đáp án ở cả hai unit test và khác `expected` ở hidden test của nó. Ràng buộc `NOT NULL`, độ dài `varchar`/`nvarchar`, `decimal(4,1)` và `decimal(3,0)` đều không bị dữ liệu vi phạm.
- Cột ra, thứ tự cột và phạm vi biên ("gồm cả", "đến hết") đều được đề nói rõ; `ordered: false` ở mọi đề là hợp lý vì đề không đòi thứ tự dòng.
- Các bẫy ghi ở bảng quy ước 2.8 (biên, mã gần giống, không dòng nào đạt; thiếu ngoặc, hai đầu `BETWEEN`, `_` với `%`, tiền tố gần giống) đều có mặt ở hidden test. Riêng "không có dòng nào đạt" chỉ có một lần (`lop-mo-tu-ngay` T5).
- Nhịp chương 2-3 hợp lý: một từ khóa mới mỗi bài (`AND`, `IN`, `BETWEEN`, ngoặc, `%`, `_`) rồi đến bài kết hợp.

## 3. Bảng tiền đề từng bài

"Dạy ở" ghi bài học và (nếu cần) phần cụ thể. "Còn thiếu / vướng" chỉ ghi điều người mới chưa có.

| Đề | Cần làm được | Dạy ở | Còn thiếu / vướng |
|---|---|---|---|
| 2-2 · 1 `ung-vien-mot-vi-tri` | `SELECT` hai cột, `WHERE` bằng mã chữ có nháy | 2.1; 2.2 (`MaPB = 'KD'`) | Không |
| 2-2 · 2 `de-xuat-da-duyet` | `WHERE` bằng chữ có dấu, `N'…'` | 2.2 (`N'Đã nghỉ'`); 1.3 | Không |
| 2-2 · 3 `lop-mo-tu-ngay` | `>=` với ngày `yyyymmdd`, chọn đúng cột ngày | 2.2 (đoạn `>=` và `yyyymmdd`) | Không; đổi định dạng ngày có sẵn ví dụ cùng mốc 01/10/2026 |
| 2-2 · 4 `thuc-chi-tu-muc` | `>=` với số, đổi thứ tự cột, chọn đúng cột số tiền | 2.1 (thứ tự cột); 2.2 (`>=`, chỉ cho ngày) | Cách viết số (bỏ dấu chấm phân nghìn, không nháy): chưa dạy, F1 |
| 2-2 · 5 `tai-san-tang-5` | `N'Tầng 5'`, chọn cột "hiện tại" | 2.2; 1.3 | Không |
| 2-2 · 6 `ket-thuc-thu-viec` | `>=` với ngày, ba cột theo thứ tự; hiểu rằng ô trống ở cột ra không cần xử lý | 2.1; 2.2 | Ô trống của `KetQua` không có ví dụ; bài 2.5 dạy `NULL` sau, nhưng người đúng không cần dùng (F6) |
| 2-3 · 1 `don-nghi-da-duyet` | hai điều kiện chữ có dấu bằng `AND` | 2.2 (`N'…'`); 2.3 (`AND`) | Không |
| 2-3 · 2 `ba-khoan-phuc-loi` | `IN` ba giá trị chữ có dấu, mỗi giá trị `N` | 2.3 (`IN`, mỗi giá trị cặp nháy riêng); 2.2/1.3 (`N`) | `N` trong từng giá trị của `IN` chỉ suy ra, F5 |
| 2-3 · 3 `trong-khoang-luong` | `BETWEEN` với số, chọn đúng cột lương | 2.3 (`BETWEEN` hai đầu, mốc nhỏ trước) | `BETWEEN` với số và cách viết số: suy ra / chưa dạy, F1 |
| 2-3 · 4 `ngoac-doi-ket-qua` | `IN` hoặc `OR` có ngoặc, cộng điều kiện chữ có dấu | 2.3 (`IN`, `OR`, `AND` trước `OR`, ngoặc) | Không; ngoặc không bị ép, F3 |
| 2-3 · 5 `ho-bat-dau-bang` | `LIKE N'…%'` (bắt đầu bằng) | 2.3 (`LIKE`, `%`, ví dụ `N'Nguy_n%'`) | Không |
| 2-3 · 6 `ma-dung-mau` | `LIKE` với `_` và chữ số cố định | 2.3 (`_` thay đúng một ký tự) | Không |
| 2-3 · 7 `khoa-hoc-quy-4` | `BETWEEN` ngày, `IN` hai nhóm, phép bằng chữ có dấu, nối bằng `AND` | 2.2 (ngày, `N`); 2.3 (`BETWEEN`, `IN`, `AND`) | Không; link bài chỉ 2.3, F5 |

## 4. Ưu tiên

| Mức | Việc | Finding |
|---|---|---|
| Nên làm | Thêm một vế dạy cách viết số trong câu SQL (số liền, không nháy, không dấu chấm nghìn) ở bài 2.2 hoặc 2.3, vì hai đề số dùng số kiểu Việt | F1 |
| Nên cân nhắc | Một đề thật sự buộc `OR` giữa hai cột khác nhau cùng `AND`, để ngoặc không bỏ qua được | F3 |
| Nên cân nhắc | Chỉnh nhãn: `lop-mo-tu-ngay` và `thuc-chi-tu-muc`; xem lại nhãn Khó của `khoa-hoc-quy-4` | F2 |
| Nên cân nhắc | Thêm bài 2.2 vào `lessons` các đề 2-3 dùng `N` hoặc ngày | F5 |
| Tùy chọn | Thống nhất kiểu `columns` (tên cột hay tiêu đề) | F4 |
| Tùy chọn | Thay catch "bịa" bằng lỗi thật nếu sửa đề; giảm lặp giữa `lop-mo`/`khoa-hoc`, `ung-vien`/`ho-bat-dau`; chi tiết câu chữ và dữ liệu | F6, F7, F8 |

**Kết luận.** Người chỉ biết Excel và đã học tới hết bài 2.3 đủ kiến thức để làm cả 13 đề: mọi đề dùng từ khóa đã dạy, các dạng câu (`=`, `>=`, `AND`, `IN`, `BETWEEN`, `LIKE`) đều có ví dụ gần như tương đương trong bài. Vướng mắc duy nhất tôi thấy là **cách viết số** ở `thuc-chi-tu-muc` và `trong-khoang-luong` (F1), vì đề dùng dấu chấm phân nghìn kiểu Việt và bài học chưa dạy số; còn lại chỉ là chỉnh nhãn độ khó, ngoặc không bị ép và vài chi tiết biên tập. Không thấy `expected` hay hidden test sai so với dữ liệu, không thấy test đòi điều đề chưa nói. Kết luận này là từ đọc nguồn và dò tay, không phải xác nhận SQL hay giao diện đã chạy đúng.

## 5. Nguồn và giới hạn

**Nguồn dùng.** `AGENTS.md`; `docs/quy-uoc.md` mục 2.8, 4.5, 4.6; spec `docs/superpowers/specs/2026-11-03-sql-arcade-mvp-design.md`; bài `src/content/lessons/1-1` đến `1-5`, `2-1`, `2-2`, `2-3`; 13 file YAML của 2-2 và 2-3; `src/lib/arcade-schema.ts` (chỉ xem trường `order`, `resultTypes`).

**Chưa xác minh (cần chạy hoặc mở giao diện).**
- Dòng `2.000.000` có thật sự báo lỗi cú pháp ở SQL Server (F1) và thông báo lỗi người học sẽ thấy.
- Cách trang hiện ô `NULL` trong `expected` (`ket-thuc-thu-viec` T4), hiện tập kết quả rỗng (`lop-mo-tu-ngay` T5) và hiện số thập phân `2.0` (`don-nghi-da-duyet`); cách `compareResults` xử lý các trường hợp này.
- Cách trang hiển thị danh sách bài cần biết từ `lessons` (F5) và mô tả "các cột cần ra" (F4).
- Toàn bộ hành vi của collation `SQL_Latin1_General_CP1_CI_AS` với `Đ`, `Ă` trong `LIKE` và `=`; `expected` do công cụ điền từ đáp án trên database thật, nên tôi không kiểm lại bằng suy luận về collation.
- Kết quả `check:arcade`: không chạy; chỉ dò tay.
- Nhãn độ khó (F2) là cảm nhận đọc đề, không có người làm thử.

**Giới hạn khác.** Review này không chạy bất kỳ câu SQL nào, không nộp bài, không mở trình duyệt; mọi "dò tay" là suy luận từ dữ liệu YAML. Tôi không thay đổi file nào ngoài report này.

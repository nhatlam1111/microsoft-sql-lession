# Review chương 1 SQL Arcade (bài 2.1): học thử như người mới

## 1. Phạm vi, phiên bản, công cụ thực tế

- **Phạm vi:** 5 file `src/content/arcade/2-1/*.yaml`, theo `order`: `chon-hai-cot`, `dao-thu-tu-cot`, `lay-toan-bo-cot`, `ba-cot-cong-tac`, `cot-co-khoang-trang`.
- **Source:** commit `c0aec83a11f717a93717058a2cf4f2a10d9991ab` (nhánh `feat/arcade-mvp`). Cây làm việc chỉ có thêm `premium-audit.json` chưa theo dõi, không liên quan.
- **Build/HTML:** không dùng. Trang `/luyen-sql/` chưa được mở, nên mọi điều về cách giao diện hiển thị đề (nhãn, thứ tự dòng, cấu trúc bảng) là **chưa xác minh**.
- **Công cụ thực tế:** chỉ đọc file (Read, grep, `cat -n`) và `git rev-parse`. Không kết nối database, không chạy SQL/API/`check:arcade`, không nộp bài. Mọi kết luận "qua unit test, trượt hidden test" bên dưới là suy ra bằng mắt từ dữ liệu, chưa chạy.
- **Agent:** Claude, model Sonnet 5.5 (`claude-sonnet-5-5`); mức effort do phiên giao không cho tôi biết nên không ghi.
- **Đã đọc:** `AGENTS.md`, `docs/quy-uoc.md`, mục 6 và 8 của spec Arcade (đọc cả file spec), bài 1.1 đến 1.5, bài 2.1. Không đọc `docs/lesson-template.md`, `docs/ho-so-cong-ty.md` vì Arcade không kể tiếp chuyện công ty (spec 8.2). Không đọc report cũ, `HRM_Demo.sql`, `.env`.
- **Thứ tự làm:** tôi đọc từng đề với `answer` và `catches` đã lọc ra, tự xác định cách làm từ kiến thức bài 1.x và 2.1 (ghi ở mục 3), rồi mới mở `answer`/`catches`.
- **Một lần lộ ngoài ý muốn:** để so mức trùng lặp với bài tập trong bài 2.1 (`src/content/exercises/2-1-chon-cot-dat-ten-cot.yaml`), lệnh lọc của tôi không che hết dòng đáp án, nên đã thấy đáp án của bốn bài tập trong bài học (không phải đáp án Arcade). Điều này không ảnh hưởng đến phần học thử Arcade vì đã làm xong trước đó, nhưng ghi lại cho minh bạch.

## 2. Rà theo thứ tự bài

### Bài 1: `chon-hai-cot` (Dễ) "Danh sách gọi phỏng vấn"

Đọc đề: tên bảng `UngVien`, cần mã và họ tên, mọi dòng, thứ tự cột theo đề. Bài 2.1 dạy đúng việc này (LineMap `SELECT`, câu "số dòng không đổi vì câu chưa lọc gì"). Làm được ngay, không vướng. Dữ liệu và `expected` của 5 test khớp mắt đọc.

**Finding 1.1: Biên tập (nhẹ).** Câu gốc: "cần danh sách để gọi điện hẹn phỏng vấn" (dòng 8 của prompt). Bảng chỉ có `Email`, không có số điện thoại, và danh sách yêu cầu cũng không có cột liên hệ nào. Người học làm nghề tư vấn sẽ thắc mắc "gọi điện bằng gì". Tác động: không cản bài, chỉ làm tình huống kém thuyết phục. Đề xuất: đổi "gọi điện" thành "liên hệ" hoặc "lên lịch".

**Finding 1.2: Giữ được, kèm lưu ý.** Hidden test 5 có hai dòng cùng `UV31`, khác `ViTri`. Bài 1.4 dạy "khi `MaNV` được khai báo là khóa chính thì SQL Server từ chối trùng mã", nên người học có thể ngạc nhiên vì mã ứng viên trùng. Đề đã chặn nhầm lẫn bằng "Mỗi dòng trong bảng cho một dòng kết quả", và cấu trúc bảng của đề không khai khóa (theo YAML; cách trang hiển thị chưa xác minh), nên dữ liệu hợp lệ và nhất quán với bài 1.4 ("khi được khai báo"). Không cần sửa.

### Bài 2: `dao-thu-tu-cot` (Dễ) "Sổ kiểm kê tài sản"

Đọc đề: biểu ghi tên tài sản ở cột đầu, mã ở cột thứ hai; bảng lại có `MaTS` đứng trước `TenTS`. Cần viết hai cột theo thứ tự đề, ngược thứ tự bảng. Bài 2.1 nói rõ "các cột ... hiện theo thứ tự bạn viết" kèm ví dụ. Làm được.

**Finding 2.1: Giữ được.** Câu gốc: "ghi tên tài sản ở cột đầu và mã tài sản ở cột thứ hai". "Cột đầu" có thể bị đọc nhầm là cột đầu của bảng, nhưng chủ ngữ là "Biểu kiểm kê" và câu sau nói "theo đúng thứ tự đó", nên hiểu một cách. Hai unit test đều đảo thứ tự nên sai là thấy ngay. Công nhận là đề rõ.

**Finding 2.2: Giữ được.** Tên đề "Sổ kiểm kê" và prompt "Biểu kiểm kê" khác nhau một chữ, không gây hiểu nhầm.

### Bài 3: `lay-toan-bo-cot` (Dễ) "Toàn bộ danh mục khóa học"

Đọc đề: mọi cột theo thứ tự bảng, mọi dòng, giữ ô chưa có giảng viên, giữ dòng giống hệt. Bài 2.1 có dấu `*` ("thay danh sách cột sẽ lấy mọi cột") và Ghi nhớ "SELECT *: lấy mọi cột". Cách khác là liệt kê đủ bốn cột đúng thứ tự cũng đúng. Cả hai đều làm được từ bài học.

**Finding 3.1: Biên tập (nhẹ).** Câu gốc: `SoBuoi: int NOT NULL` (khai báo bảng). Bài 1.3 liệt kê bốn kiểu (`varchar`, `nvarchar`, `date`, `decimal`) và dặn "gặp kiểu khác thì đọc cùng cách", nhưng chưa nói `int` là số nguyên. Tác động: người mới có thể tự đoán được, và kiểu này không ảnh hưởng cách làm bài. Xếp vào "đã dạy nhưng chưa phủ". Đề xuất: giữ nguyên, hoặc dùng `decimal(4,0)` cho khớp bài 1.3 nếu muốn tránh thuật ngữ mới (chưa xác minh trang hiển thị `int` ra sao).

**Finding 3.2: Giữ được.** Đề này nói thẳng hai bẫy ("Giữ cả những ô chưa có giảng viên", "Bảng có thể có hai dòng giống hệt nhau; dòng nào cũng phải có"). Hidden test 3, 4, 5 chỉ kiểm đúng hai điều này và phạm vi "mọi dòng". Công bằng với đề. Người đã đọc câu "số dòng không đổi vì câu chưa lọc gì" ở bài 2.1 sẽ biết mặc định đã giữ hết.

### Bài 4: `ba-cot-cong-tac` (Dễ) "Bảng kê công tác phí"

Đọc đề: bảng có 6 cột, lấy 3 cột `MaNV`, `NoiDen`, `SoTien` (đề nói bằng chữ "mã nhân viên, nơi đến, số tiền"). Ba cột này nằm đúng thứ tự trong bảng nên không cần đảo. Làm được bằng đúng kiến thức bài 1.

**Finding 4.1: Cần cắt hoặc đổi (trung bình).** Bài này không dạy thêm gì so với bài 1: chọn một tập con cột theo thứ tự của bảng, giữ mọi dòng. Chỉ khác ở chỗ thêm cột và có một số tiền 0. Bài 2.1 cũng đã có đúng các bài tập này (xem Finding 6.3). Tác động: học viên làm bài thứ tư mà không có kỹ năng mới, hiệu ứng "luyện" giảm. Đề xuất: đổi thành bài kết hợp nhiều ý (chọn 3 cột, một số cột nằm sau, thứ tự khác bảng) hoặc cột có tên gần nhau để buộc đọc kỹ đề, miễn vẫn chỉ dùng `SELECT`, `FROM`.

**Finding 4.2: Cần làm rõ (nhẹ).** Câu gốc: "kể cả dòng số tiền bằng 0 và các dòng có nội dung giống nhau" (prompt, dòng 8). Bài 3 viết "hai dòng giống hệt nhau" và đúng với dữ liệu (K31 lặp nguyên). Bài này viết "nội dung giống nhau" nhưng hidden test 5 chỉ giống nhau ở ba cột được lấy, còn `MaCT`, `NgayDi`, `GhiChu` khác nhau. Người học mở test sẽ thấy dòng không hề "giống nhau". Đề xuất: "các dòng giống nhau ở ba cột được lấy".

**Finding 4.3: Biên tập (nhẹ).** Hai chuyến cùng `NV107`, cùng nơi đến, cùng số tiền, chỉ phân biệt được bằng ngày và mã chuyến, mà bảng kê của Kế toán lại bỏ hai cột đó. Hợp lý để làm bẫy nhưng thực tế một bảng kê công tác phí không có ngày là khó dùng. Không cản bài.

### Bài 5: `cot-co-khoang-trang` (Vừa) "Bảng phúc lợi có tên cột dài"

Đọc đề: bảng có tên cột chứa khoảng trắng (`Loại phúc lợi`, `Mức hỗ trợ`), cần hai cột theo thứ tự đề. Người học biết: SELECT, FROM, thứ tự cột, và ngoặc vuông dùng để bao tên có khoảng trắng. Chưa biết: ngoặc vuông cũng dùng cho tên cột có sẵn của bảng.

**Finding 5.1: Cần làm rõ (cao nhất của chương).** Câu gốc trong bài 2.1, LineMap dòng 52: "Ngoặc vuông bao một tên có khoảng trắng và không hiện trong tiêu đề" và dòng 58: "Khóa học dùng ngoặc vuông cho mọi alias". Mọi ví dụ trong bài 2.1 chỉ có ngoặc vuông sau `AS` (kiểm bằng cách tìm `[` trong file; không câu nào bao một tên cột có sẵn). Bài này đòi dùng ngoặc vuông cho tên cột của bảng. Suy từ "một tên có khoảng trắng" là khả thi nhưng là bước suy luận, không phải điều được dạy. Tác động: đây là bài "Vừa" duy nhất, và nó vướng vì thiếu một vế câu chứ không vì khó. Người học thử gõ tên không ngoặc sẽ nhận lỗi cú pháp; nội dung lỗi chưa xác minh. Hai hướng chữa: (a) thêm một vế vào LineMap của bài 2.1 nói tên cột có sẵn chứa khoảng trắng cũng bao bằng ngoặc vuông; (b) xác nhận đây là suy luận có chủ ý và chấp nhận, vì thưởng "Vừa" 20 coin. Theo quy ước 2.8 "đề không có gợi ý", chữa ở bài học là đúng chỗ.

**Finding 5.2: Biên tập (nhẹ).** Tên bài "tên cột dài" không khớp nội dung ("có khoảng trắng"); "Loại phúc lợi" không dài. Đề xuất: "tên cột có khoảng trắng". Prompt đã nói sự thật này nên không coi là gợi ý.

**Finding 5.3: Giữ được.** Hidden test 3, 4, 5 không đòi gì ngoài đề (mức hỗ trợ trống, dòng trùng ở hai cột được lấy, nhiều hơn hai dòng). Các `expected` khớp dữ liệu.

## 3. Bảng tiền đề từng bài

| Bài | Cần biết | Được dạy ở đâu | Còn thiếu |
|---|---|---|---|
| 1 `chon-hai-cot` | Cú pháp `SELECT cột, cột FROM bảng`; không lọc thì giữ mọi dòng; đọc tên bảng, tên cột từ cấu trúc bảng | 2.1 (LineMap, đoạn "số dòng không đổi"); cấu trúc bảng đã đọc ở 1.2, 1.3 | Không |
| 2 `dao-thu-tu-cot` | Thứ tự cột kết quả theo thứ tự viết trong `SELECT` | 2.1 LineMap dòng `SELECT` kèm ví dụ | Không |
| 3 `lay-toan-bo-cot` | `*` lấy mọi cột theo thứ tự bảng, hoặc liệt kê đủ cột; `NULL` là chưa có giá trị; không lọc thì giữ dòng trùng | 2.1 (dòng `*` và Ghi nhớ); 1.3 (`NULL`) | Cú pháp đầy đủ của `SELECT *` không in nguyên câu trong bài (câu có `*` nằm trong `sql` của `RunFlow`, theo 2.6 không hiện), phải suy từ "thay danh sách cột"; kiểu `int` chưa giải thích ở 1.3 |
| 4 `ba-cot-cong-tac` | Như bài 1, chọn 3 trong 6 cột | 2.1 | Không |
| 5 `cot-co-khoang-trang` | Như bài 1 và ngoặc vuông bao tên cột có khoảng trắng | Ngoặc vuông chỉ được dạy cho alias sau `AS` (2.1 dòng 44, 52, 58) | Ngoặc vuông cho tên cột có sẵn (Finding 5.1) |

Các thuật ngữ trên màn bài (unit test, hidden test, coin, "Bộ chấm") không có trong bài 1.x hay 2.1. Chúng có thể được giải thích ở trang Luyện SQL, nhưng tôi **chưa xác minh** vì không mở giao diện.

## 4. Hidden test: công bằng không, dạy thêm gì

Kiểm bằng mắt từng `catches` với từng test:

- Mọi hidden test chỉ đòi điều đề đã nói hoặc hệ quả của "mọi dòng, mọi cột được nêu". Không có test nào làm trượt một người làm đúng đề. **Công bằng.**
- Mỗi `catches` qua hai unit test và trượt đúng hidden test tương ứng, theo dữ liệu (chưa chạy `check:arcade`). Lỗi được bắt thuộc ba loại: bỏ dòng có ô trống hoặc giá trị 0 (lọc dòng), giới hạn số dòng, bỏ dòng trùng.
- **Finding 6.1: Cần làm rõ (trung bình).** Cả ba loại này đều cần từ khóa chưa dạy (`WHERE` ở bài 2.2, `TOP` ở bài 2.4, `DISTINCT` ở bài 2.6). Người chỉ học tới bài 2.1 không thể viết câu sai như vậy. Còn lỗi thật của người mới (thiếu dấu phẩy, bọc tên cột trong nháy đơn, nhầm thứ tự cột, quên một cột) đều bị unit test nhìn thấy bắt ngay. Hệ quả:
  - Ở chương này hidden test thực chất chỉ chặn hai thứ: ghi cứng kết quả của unit test và người đã biết trước `WHERE`/`TOP`/`DISTINCT`. Đó là giá trị thật, nhưng cần ghi rõ cho người làm khóa học khỏi nghĩ rằng chúng bắt lỗi người mới.
  - Khi mở một hidden test (10 coin, bằng đúng thưởng một bài Dễ), học viên chỉ thấy thêm một ô `NULL`, một giá trị 0 hoặc hai dòng trùng. Có tác dụng củng cố "SELECT không lọc dòng", nhưng người đã qua hết unit test và đúng đề không cần mở. Cách ôn tốt hơn cho người làm sai là unit test công khai.
  - Ba kiểu bẫy lặp lại gần như nguyên xi ở cả 5 bài (ô trống, trùng, giới hạn số dòng), nên mở thêm ở bài sau không học thêm gì.
  - Đề xuất: không bắt buộc đổi. Chỉ cần ghi rõ giới hạn này, và đa dạng hóa bẫy giữa các bài nếu có thể trong phạm vi `SELECT`, `FROM`.
- **Finding 6.2: Giữ được, ghi nhận.** Vì ba bài có `NULL` hoặc trùng chỉ xuất hiện trong hidden test, lần đầu học viên thấy ô `NULL` trong bảng mong đợi sẽ phải trả coin. Đề của bài 3 đã nêu bằng chữ "ô chưa có giảng viên", đủ để hiểu. Không cần sửa; chỉ nêu để người làm khóa học biết đây là hệ quả của nguyên tắc "unit test không lộ bẫy".

## 5. Dữ liệu mẫu và `expected`

- Đọc bằng mắt cả 25 test: `expected` khớp dữ liệu vào ở mọi test, kể cả thứ tự cột đảo của bài 2, ô `NULL` ở bài 3 và bài 5, dòng trùng ở bài 1, 3, 4, 5, giá trị 0 ở bài 4.
- Dữ liệu không mâu thuẫn với đề. Mã dùng dải riêng (`UV`, `TS`, `K`, `CT`, `NV101` trở lên, `NV201` trở lên), tránh nhầm với hồ sơ `NV001` đến `NV048` của bài học.
- Mỗi bài có đúng 2 unit test (`visible: true`) và 3 hidden test, đạt mức tối thiểu của quy ước 2.8.
- **Chưa xác minh:** kiểu số (`decimal`, `int`) so khớp với `expected` dạng chuỗi (ví dụ "3500000"), do không chạy `compareResults`; cách trang hiển thị `null`, ngày và số.

## 6. Nhịp độ, độ khó, lặp lại

- Bốn bài đầu đều là "Dễ" và thực chất cùng một động tác: chọn cột từ một bảng, không lọc. Bài 2 thêm đảo thứ tự, bài 3 dùng `*`, bài 4 gần như bài 1. Bài 5 "Vừa" khác ở chỗ cần ngoặc vuông.
- Cảm nhận độ khó: bài 3 là bài dễ nhất, rồi bài 1, bài 4, bài 2, và bài 5 khó nhất (vì thiếu kiến thức chứ không vì nội dung). Nhãn "Dễ/Dễ/Dễ/Dễ/Vừa" khớp thứ tự đó đủ gần. Việc bài 3 dễ hơn bài 2 mà đứng sau là lệch nhẹ, chấp nhận được.
- **Finding 6.3: Cần cắt hoặc đổi (trung bình).** Câu gốc trong bài 2.1: "Bốn bài đi từ xem cả bảng tới chọn cột, đổi vị trí và đặt tiêu đề." Bốn bài tập này (mục 2.1-1 đến 2.1-4) đúng là chọn mọi cột, chọn hai cột, đổi vị trí, đặt tiêu đề. Arcade bài 3 tương ứng bài tập xem mọi cột, bài 1 và bài 4 tương ứng bài tập chọn hai cột, bài 2 tương ứng bài tập đổi vị trí cột; chỉ đổi bảng và tình huống. Giá trị của Arcade ở đây là dữ liệu mới và hidden test, không phải kỹ năng mới. Nếu người làm khóa học muốn Arcade là bước "luyện thêm" thì chấp nhận; nếu muốn là bước "cao hơn", cần ít nhất một bài gộp các ý (xem Finding 4.1). Quyết định này thuộc người làm khóa học.
- **Finding 6.4: Ghi nhận.** `AS` (đặt tiêu đề) là một trong ba mục tiêu của bài 2.1 và nằm trong danh sách "Từ khóa thêm ở chương" của quy ước 2.8, nhưng không bài nào trong chương này luyện được, vì bộ chấm không so tiêu đề (quyết định đã duyệt). Người học chỉ luyện `AS` ở bài tập 2.1-4 của bài học. Không phải lỗi.
- **Finding 6.5: Ghi nhận.** Trang hiển thị "các cột cần ra" bằng tên cột thật (ví dụ `TenTS, MaTS`), nên bước "đổi lời nghiệp vụ thành tên cột" mà người làm BA cần luyện gần như được cho sẵn. Đúng với quyết định "đề không có gợi ý" nếu danh sách đó vốn được hiển thị, và chương 1 chưa có bài nào buộc người học tự tìm tên cột từ lời nghiệp vụ. Chưa xác minh trang hiển thị.

## 7. Ưu tiên

1. **Finding 5.1** (Cần làm rõ): thêm một vế vào bài 2.1 về ngoặc vuông cho tên cột có sẵn, hoặc ghi nhận đây là suy luận có chủ ý.
2. **Finding 6.3 và 4.1** (Cần cắt/đổi): bài 4 lặp bài 1, cả chương lặp bốn bài tập của bài 2.1; cân nhắc đổi bài 4 thành bài gộp nhiều ý.
3. **Finding 6.1** (Cần làm rõ): ghi nhận rằng hidden test chương 1 chỉ chặn ghi cứng và người biết trước từ khóa sau.
4. **Finding 4.2** (Cần làm rõ nhẹ): "nội dung giống nhau" đổi thành "giống nhau ở các cột được lấy".
5. Biên tập nhẹ: 1.1 (gọi điện), 3.1 (`int`), 4.3, 5.2 (tên bài).

## 8. Kết luận

Với kiến thức bài 1.1 đến 1.5 và 2.1, người học **đủ để làm bốn đề đầu** mà không cần kiến thức ngoài: đề nói rõ cột, thứ tự cột và phạm vi dòng, dữ liệu và `expected` nhất quán, hidden test công bằng với đề. **Đề thứ năm còn vướng** một điều chưa được dạy rõ: ngoặc vuông cho tên cột có sẵn (Finding 5.1). Điểm đáng cân nhắc nhất về thiết kế là chương lặp lại bài tập của chính bài 2.1 và hidden test ở chương này không bắt được lỗi nào mà người mới có thể mắc (Finding 6.1, 6.3).

## 9. Nguồn và giới hạn

- **Nguồn:** năm file YAML trong `src/content/arcade/2-1/`, các bài `1-1` đến `1-5` và `2-1`, `docs/quy-uoc.md` (mục 2.8, 4.5), spec Arcade mục 6 và 8, `src/data/arcade.ts` (số coin, tên chương), và dòng tiêu đề, `prompt` của bốn bài tập trong `src/content/exercises/2-1-chon-cot-dat-ten-cot.yaml` để đo mức lặp.
- **Chưa xác minh:** hiển thị giao diện (nhãn thứ tự dòng, cấu trúc bảng, thuật ngữ unit/hidden test, coin), nội dung thông báo lỗi khi gõ tên cột có khoảng trắng không ngoặc, so khớp kiểu số của bộ chấm, cổng `check:arcade`, việc các `catches` thực sự qua unit test và trượt hidden test khi chạy.
- **Giới hạn học thử:** tôi chỉ có một người đọc, không có học viên thật. "Người học tự làm được" là suy luận từ kiến thức đã dạy, không phải kết quả đã chạy.

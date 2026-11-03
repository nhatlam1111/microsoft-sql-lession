# Review Arcade chương 4 (bài 2.4) và chương 5 (bài 2.5)

## 1. Phạm vi, phiên bản, công cụ thực tế

- Phạm vi: 10 đề Arcade ở `src/content/arcade/2-4/` (5 bài) và `src/content/arcade/2-5/` (5 bài), chơi theo trường `order`.
- Phiên bản: nhánh `feat/arcade-mvp`, HEAD `c1eec47` (đã đối chiếu bằng `git rev-parse`). Cây làm việc còn thư mục chưa theo dõi `2-6/`, `2-7/`; không thuộc phạm vi và không đọc.
- Vai trò: Business Consultant khó tính, người mới, chỉ biết Excel văn phòng. Chỉ dùng bài học tới hết 2.5 để hiểu.
- Đã đọc: `AGENTS.md`, `docs/quy-uoc.md` (mục 2.8, 4.5), spec Arcade mục 6 và 8, bài `1-1`, `1-2`, `1-3`, đoạn đầu `1-4`, `1-5`, và đủ `2-1` tới `2-5`. Không đọc `docs/lesson-template.md`, `docs/ho-so-cong-ty.md` vì đề Arcade tự khai bảng riêng (quy ước 2.8).
- Công cụ thực tế: Read/Bash (`cat`, `sed`, `grep`) và một script Node nhỏ trong thư mục scratchpad, nạp `js-yaml` có sẵn trong `node_modules` của repo, chỉ để in phần học viên thấy (đề, cột, bảng, unit test) cho tới trước `answer`. Sau khi tự phân tích từng đề mới in `answer`, `catches` và hidden test. Có đọc mã `src/components/islands/ArcadeTable.tsx` để biết ô `NULL` được vẽ thế nào (chỉ đọc, không chạy).
- Model: Sonnet 5.5 (`claude-sonnet-5-5`); mức effort theo phiên, không xác định được con số cụ thể.
- Không làm: không đọc report cũ, `database/HRM_Demo.sql`, `.env`, `src/content/exercises`; không kết nối database, không chạy SQL, API, `check:arcade`, không mở trình duyệt, không nộp bài. Mọi nhận định "đạt/trượt" ở dưới là suy luận từ dữ liệu YAML, không phải kết quả chạy.

## 2. Rà theo thứ tự bài

Quy ước ghi: **U** là unit test (hiện cho học viên), **H** là hidden test. Không chép đáp án; chỉ mô tả cách làm bằng lời.

### Chương 4 (bài 2.4: sắp xếp và `TOP`)

#### 4.1 `xep-theo-ten-khoa` (Dễ)

- Học thử: chọn hai cột theo thứ tự đề, xếp tăng dần theo tên khóa. Toàn bộ nằm trong 2.1 và 2.4 (mục `ORDER BY`, `ASC`).
- Đề: đủ cột, thứ tự cột, thứ tự dòng, phạm vi ("mọi dòng"); có nói tên khóa không trùng nên không cần tiêu chí phụ. Không có chỗ hiểu hai cách.
- U/H: U1 và U2 đều có dữ liệu chèn đã đúng thứ tự tên, nên câu không có `ORDER BY` qua U. H3 đảo thứ tự chèn (bắt thiếu `ORDER BY`), H4 làm mã khóa ngược thứ tự tên (bắt xếp theo `MaKH`), H5 làm số buổi ngược thứ tự tên (bắt xếp theo `SoBuoi`). Cả ba là lỗi người mới thật sự mắc. Expected khớp dữ liệu vào theo mắt đọc.
- **Giữ được.** Lưu ý (không phải lỗi): H5 có `Đàm phán` đứng đầu; bài 2.4 nói rõ quy tắc sắp chữ tiếng Việt học ở bài 2.7. Người làm đúng đề vẫn đạt; chỉ ai mở H5 bằng coin sẽ thấy `Đ` xếp trước `P`, `V`. Thứ tự này do SQL Server quyết định nên tôi chưa xác minh được (không được chạy); `expected` do cổng `check:arcade` sinh từ database thật thì đã phản ánh đúng.

#### 4.2 `don-moi-nhat-truoc` (Dễ)

- Học thử: chọn hai cột, xếp ngày nộp giảm dần. Đã dạy ở 2.4 (`DESC`).
- Đề: đủ; có nói ngày nộp không trùng. Bảng có cả `NgayNghi` và `NgayNop` nên đề phải gọi đúng "ngày nộp": đã gọi đúng.
- U/H: dữ liệu chèn của U1, U2 đã sắp sẵn giảm dần theo ngày nộp, mã đơn và ngày nghỉ cùng chiều, nên ba câu sai (không xếp, xếp theo `MaDon`, xếp theo `NgayNghi`) đều qua U và lần lượt bị H5, H3, H4 bắt. Expected khớp.
- **Giữ được.** Ghi chú dữ liệu nhỏ ở mục 3.5.

#### 4.3 `hai-cap-sap-xep` (Vừa)

- Học thử: ba tiêu chí xếp (phòng tăng, ngày giảm, mã tăng). Bài 2.4 chỉ có ví dụ hai tiêu chí nhưng nói "xét từ trái sang phải" nên mở rộng ra ba tiêu chí là tự nhiên.
- Đề: đủ; đề nói riêng từng tiêu chí và hướng. Thứ tự cột kết quả khác thứ tự cột bảng (cố ý, đề đã ghi).
- U/H: U không có hòa. H3 hòa phòng và ngày (bắt thiếu `MaNV`), H4 làm tiêu chí ngày lên đầu cho kết quả khác (bắt đảo thứ tự tiêu chí), H5 hai người cùng phòng khác ngày (bắt thiếu tiêu chí ngày). Cả ba tiêu chí đều được kiểm. Expected khớp.
- **Giữ được.**

#### 4.4 `ba-khoan-lon-nhat` (Vừa)

- Học thử: lấy tối đa ba dòng đầu sau khi xếp số tiền giảm dần, mã tăng dần. Đủ trong 2.4 (`TOP`, "ít hơn n thì trả hết", tiêu chí phụ).
- Đề: đủ; câu "Bảng có ít hơn ba dòng thì lấy hết" khớp U2 (2 dòng).
- U/H: H3 có bốn khoản hòa tiền (bắt tiêu chí phụ sai hướng), H4 có bốn dòng (bắt con số `TOP` sai và bắt quên `TOP`), H5 toàn khoản nhỏ (xem 3.5). Expected khớp.
- **Giữ được.** Nhãn Vừa hợp lý; thực chất là ví dụ của bài 2.4 bỏ điều kiện lọc.

#### 4.5 `top-sau-khi-loc` (Khó)

- Học thử: lọc hai điều kiện, xếp ba tiêu chí, lấy tối đa hai dòng. Mọi thành phần đều nằm trong 2.2, 2.3, 2.4; câu mẫu của 2.4 chính là khung này.
- Đề: đủ cột, thứ tự, phạm vi, tiêu chí phụ. Cụm "đã có trạng thái Đạt vòng 1" đọc hơi lạ ("đã có" có thể hiểu là "có giá trị") nhưng nghĩa so sánh bằng vẫn rõ. Học viên phải nhớ `N'...'` cho chữ có dấu (bài 2.2 đã dạy).
- U/H: U không lọc theo trạng thái (mọi dòng đều `Đạt vòng 1`), nên bỏ điều kiện trạng thái qua U và bị H3 bắt; bỏ điều kiện vị trí bị H4 bắt; bỏ tiêu chí ngày nộp bị H5 bắt. Expected khớp.
- **Giữ được**, kèm hai ghi chú ở mục 3.3 (tiêu chí thứ ba không có test) và 3.4 (nhãn Khó).

### Chương 5 (bài 2.5: `NULL`)

#### 5.1 `chua-co-email` (Dễ)

- Học thử: một điều kiện kiểm ô chưa có giá trị. Đã dạy ở 2.5 (`IS NULL`, nêu rõ vì sao `= NULL` không dùng được).
- Đề: đủ. Câu "Ô chứa chuỗi rỗng hoặc chữ NULL không tính là ô trống" nói rõ phạm vi, đúng tinh thần 2.5 (`NULL` khác chuỗi rỗng).
- U/H: H3 có ô `''`, H4 có ô là chữ `NULL`, H5 không dòng nào thiếu email nên kết quả rỗng. Cả ba nằm trong phạm vi đề đã nói. Expected khớp (H5 rỗng là đúng).
- **Giữ được**, nhưng xem 3.2 về cách hiển thị ô `NULL` và chữ `NULL`.

#### 5.2 `da-co-quan-ly` (Dễ)

- Học thử: kiểm ô đã có giá trị. 2.5 dạy `IS NOT NULL` bằng một câu trong thân bài, đủ để làm.
- Đề: đủ, ngắn. Cột `NgayNghiViec` có trong bảng nhưng đề không yêu cầu nên là cột gây nhiễu hợp lý.
- U/H: U luôn để `NgayNghiViec` trống; H3 có người đã nghỉ vẫn phải giữ. H4 và H5 là hai câu "viết cứng" (xem 3.5). Expected khớp.
- **Giữ được.** Bài này gần như bản đối ngẫu của 5.1 (mục 3.4).

#### 5.3 `thay-o-trong` (Vừa)

- Học thử: thay ô thiếu bằng nhãn. Câu mẫu của 2.5 có đúng khuôn này (hàm gộp, `N` trước nhãn, đặt tiêu đề); đề nhắc thêm "giữ nguyên, kể cả chuỗi rỗng", khớp Hay nhầm 3 của bài.
- Đề: đủ cột, phạm vi ("mọi dòng"). Nhãn viết là `(chưa phân công)` không có dấu nháy; U1 cho thấy kết quả mong đợi có ngoặc nên mơ hồ được giải quyết, xem 3.1.
- U/H: U đã có dòng `NULL` và dòng có giá trị. H4 có `''` (bắt hàm biến chuỗi rỗng thành nhãn). Expected khớp.
- **Giữ được.**

#### 5.4 `dang-lam-chua-co-email` (Vừa)

- Học thử: hai điều kiện `IS NULL` nối `AND`, rồi xếp mã tăng dần. Y như khung câu mẫu của 2.5 bỏ phần hàm gộp.
- Đề: đủ; đề giải thích "chưa nghỉ việc" là `NgayNghiViec` trống, đúng quy ước 2.5.
- U/H: U cho hai điều kiện cùng thay đổi nên mỗi điều kiện đơn lẻ vẫn qua U; H3 (có người nghỉ nhưng thiếu email) và H4 (không ai thiếu email, kết quả rỗng) bắt từng vế, H5 bắt thiếu `ORDER BY` do chèn đảo thứ tự. Expected khớp.
- **Giữ được**, nhịp độ ở 3.4.

#### 5.5 `lien-he-du-phong` (Khó)

- Học thử: ưu tiên cột thứ nhất, không có thì cột thứ hai, không có cả hai thì nhãn; lọc trạng thái; xếp theo mã. Hàm gộp của 2.5 làm được, nhưng bài chỉ có ví dụ hai tham số (3.6). Có thể làm bằng hai lớp hàm gộp lồng nhau.
- Đề: đủ cột, thứ tự, phạm vi, nhưng nhãn không có dấu nháy và U không có dòng nào dùng nhãn: xem 3.1 (finding quan trọng nhất).
- U/H: U chỉ có một trong hai số điện thoại mỗi dòng. H3 có cả hai (bắt đảo ưu tiên), H4 có dòng cả hai trống (bắt thiếu nhãn), H5 có nhà cung cấp trạng thái khác (bắt thiếu lọc). Mỗi lỗi đúng với một yêu cầu trong đề. Expected khớp.

## 3. Finding

### 3.1 Nhãn `(chưa có số)` mơ hồ về ngoặc và chữ, unit test không soi được

- Đánh giá: **Cần làm rõ.**
- Vị trí: `2-5/lien-he-du-phong.yaml`, `prompt`: "cả hai đều không có thì ghi (chưa có số)"; U1 và U2 không có dòng nào cả hai cột trống.
- Câu hỏi của người học: dấu ngoặc là một phần của chữ cần hiện, hay là lời chú thích trong câu? Ngay trong câu đầu của đề, ngoặc cũng được dùng làm chú thích: "(TrangThai là Đang hợp tác)". Bài 2.5 viết nhãn trong dấu nháy kiểu “(chưa có)”; đề này thì không.
- Tác động: người mới viết nhãn không ngoặc (hoặc sai hoa thường) vẫn đạt cả hai unit test vì nhánh nhãn không bao giờ chạy trong U, rồi trượt H4 mà chỉ thấy "chưa đạt". Muốn biết lý do phải mất 10 coin mở H4; người hiểu sai đề bị phạt coin vì chỗ đề mơ hồ chứ không phải chỗ học. (Bộ chấm có phân biệt hoa thường/dấu hay không tôi chưa xác minh.)
- Căn cứ: đọc `prompt` và hai unit test; so với `thay-o-trong` có U1 cho thấy nhãn có ngoặc.
- Đề xuất: đặt nhãn trong dấu nháy kiểu “(chưa có số)” như bài 2.5, hoặc thêm một dòng cả hai cột trống vào U2 (như `thay-o-trong` đã làm). Nên sửa luôn cho `thay-o-trong` (thêm dấu nháy) để thống nhất, dù ở đó U1 đã cứu.

### 3.2 `NULL` thật, chữ `NULL` và chuỗi rỗng có thể khó phân biệt trên màn hình

- Đánh giá: **Cần làm rõ**, chưa xác minh trên giao diện thật.
- Vị trí: `2-5/chua-co-email.yaml` H4 (ô chữ `NULL`); `2-5/thay-o-trong.yaml` H4 (ô `''`); cách vẽ ở `ArcadeTable.tsx`.
- Căn cứ: mã vẽ ô `NULL` thật là chữ `NULL` có thêm lớp tô màu `res-null`; ô chứa chuỗi chữ `NULL` cũng hiện chữ `NULL` nhưng không tô màu; chuỗi rỗng hiện ô trắng. Giữa ô `NULL` thật và ô chữ `NULL` chỉ còn khác nhau ở màu nền. Tôi chỉ đọc mã, chưa nhìn bản dựng.
- Tác động: chỉ xảy ra khi học viên mở hidden test. Người mới không biết quy ước màu có thể thấy hai ô giống hệt, một ô bị loại một ô được giữ, và tưởng test sai. Đề đã nói trước nên không bắt buộc phải sửa; chỉ cần kiểm bằng mắt.
- Đề xuất: khi người dựng xem bản dựng, mở H4 của `chua-co-email` để xem màu có đủ phân biệt (cả khi tắt màu hoặc người mù màu). Nếu không, hiện chuỗi chữ với dấu nháy hoặc ghi chú dưới bảng.

### 3.3 `top-sau-khi-loc`: tiêu chí thứ ba (mã tăng dần) không có test nào kiểm

- Đánh giá: **Biên tập** (khoảng trống kiểm tra, không làm người đúng bị trượt).
- Vị trí: `2-4/top-sau-khi-loc.yaml`, `prompt`: "vẫn trùng thì mã tăng dần"; U1, U2, H3, H4, H5.
- Căn cứ: không test nào có hai hồ sơ cùng điểm và cùng ngày nộp. H5 chỉ làm hòa điểm để kiểm tiêu chí ngày nộp.
- Tác động: người bỏ tiêu chí mã vẫn đạt toàn bộ test trong khi đề yêu cầu có nó. Lệch với ý quy ước 2.8 ("sắp xếp phải có tiêu chí phụ để không hòa"). Chương này dạy chính việc chốt thứ tự khi hòa, và hai đề kia (`hai-cap-sap-xep`, `ba-khoan-lon-nhat`) đã kiểm tiêu chí cuối.
- Đề xuất: đổi dữ liệu H5 thành có hai hồ sơ trùng cả điểm lẫn ngày nộp (nhưng giữ một hồ sơ nộp sớm hơn để vẫn bắt thiếu `NgayNop`), hoặc thêm một test. Nếu thêm hidden test thì cần thêm `catches` tương ứng.

### 3.4 Nhịp độ và nhãn độ khó

- Đánh giá: **Biên tập.**
- Chương 4: nhãn 2 Dễ, 2 Vừa, 1 Khó đúng bảng quy ước. Nhưng bài Khó cuối (`top-sau-khi-loc`) là câu mẫu của bài 2.4 với thêm một điều kiện `AND` và một tiêu chí xếp; cảm nhận gần "Vừa cao" hơn "Khó". Nó có vai trò tích hợp (lọc, xếp, giới hạn đúng thứ tự) nên giữ nhãn cũng chấp nhận được; nếu người làm khóa học muốn thưởng 30 coin chỉ cho thử thách thực sự thì cân nhắc.
- Chương 5: bài 3 `thay-o-trong` (Vừa) dùng hàm gộp lần đầu, còn bài 4 `dang-lam-chua-co-email` (Vừa) chỉ lặp lại khung `IS NULL` + `AND` + xếp mà bài 2.5 đã làm; bài 4 nhẹ hơn bài 3. Người chơi theo thứ tự sẽ gặp bước khó rồi lại dễ. Đổi chỗ hai bài (3 và 4) hoặc hạ nhãn bài 4 xuống Dễ (khi đó phải bù một bài Vừa để giữ 2/2/1).
- Lặp: `chua-co-email` và `da-co-quan-ly` gần như đối ngẫu (một cột, một điều kiện, hai dạng `NULL`); `thay-o-trong` và `lien-he-du-phong` đều là hàm gộp, bài sau thêm một cột, lọc và xếp. Với hai Dễ đầu chương thì lặp là chấp nhận được, vì mỗi bài tập một chiều của `IS NULL`; bài hàm gộp thứ hai có thêm phần mới nên không lặp thừa.
- Một nhận xét đi kèm cho chương 5: bài 1, 2, 4 viết yêu cầu gần như bằng từ khóa SQL ("Email là NULL", "cả NgayNghiViec lẫn Email đều là NULL"), nên người học ít phải tự chuyển yêu cầu nghiệp vụ thành điều kiện. Không phải lỗi (đề cần nói rõ phạm vi), chỉ ghi để người làm khóa học biết đề đang gần bài mẫu. Có thể để câu "chưa có email" ở mức nghiệp vụ và chỉ giữ lời giải thích chuỗi rỗng.

### 3.5 Một số `catches` và dữ liệu mang tính "viết cứng" hoặc gượng

- Đánh giá: **Biên tập** (không ảnh hưởng người làm đúng đề).
- `catches` không giống lỗi người học thật, chỉ chống viết cứng theo dữ liệu U: `ba-khoan-lon-nhat` H5 (tự thêm ngưỡng tiền mà đề không nói), `da-co-quan-ly` H4 (liệt kê cứng mã quản lý) và H5 (mẫu `NV%`), `chua-co-email` H5 (mẫu đuôi email cứng), `thay-o-trong` H3 (mẫu có dấu cách) và H5 (ghép hai truy vấn với mã cứng). Quy ước 2.8 ưu tiên lỗi người học chương đó có thể mắc; các test này vẫn công bằng với đề, chỉ là ít giá trị dạy học cho người trả 10 coin mở chúng. Test tốt hơn là test làm lộ lỗi có thật, như người bỏ tiêu chí thứ ba ở mục 3.3.
- Dữ liệu `don-moi-nhat-truoc`: nhiều đơn có ngày nộp sau ngày nghỉ (U1: nghỉ 12/09, nộp 20/09; H4: nghỉ 20/08, nộp 01/10). Mục đích là tách hai cột ngày, nhưng người đọc kiểu BA có thể hỏi vì sao đơn nghỉ nộp sau ngày nghỉ hơn một tháng. Không sai, chỉ hơi gượng.
- `da-co-quan-ly` dùng mã quản lý `NV100`, `NV120`, `GD01` không xuất hiện thành dòng trong bảng đó; bài 1.4 đã dạy khóa ngoại nên người học có thể thắc mắc. Bảng của Arcade không khai khóa nên không vi phạm gì.
- `lien-he-du-phong`: số điện thoại chỉ 4 chữ số (`0901`, `0243`), nhìn như mã hơn là số điện thoại; vô hại.

### 3.6 Hàm gộp ba tham số chưa có trong ví dụ của bài 2.5

- Đánh giá: **Cần làm rõ** (nhẹ), thuộc bài học chứ không phải đề.
- Vị trí: `2-5-null-o-trong.mdx`, LineMap: "Trả giá trị đầu tiên khác NULL, xét từ trái sang phải"; ví dụ chỉ có hai tham số. `lien-he-du-phong` cần ba.
- Tác động: câu định nghĩa đủ để đoán ra danh sách dài hơn, và người học vẫn giải được bằng cách lồng hai lần. Nên người mới không bị chặn, nhưng bài Khó đầu tiên đòi một cách dùng mà bài chưa nói rõ.
- Đề xuất: nếu muốn giữ bài Khó như hiện tại, thêm một vế vào bài 2.5, kiểu "có thể liệt kê nhiều hơn hai giá trị". Nếu không thì chấp nhận được vì đây là bài khó.

### 3.7 Chi tiết hiển thị và khai báo nhỏ

- Đánh giá: **Biên tập** (chưa xác minh trên giao diện).
- `top-sau-khi-loc`: dữ liệu vào trong YAML là số `9` và `7`, mã vẽ in `String(v)` nên có thể hiện `9`, `7` ở bảng vào nhưng `9.0`, `7.0` ở kết quả mong đợi (cột `decimal(4,1)`). Bài 1.3 đã dạy `decimal(4,1)` hiện `2.0` nên người học theo kịp; chỉ là hai bảng cạnh nhau không cùng định dạng.
- Các đề sắp xếp theo cột mã (`MaNV`, `MaNCC`, `MaUV`) không nói mã không trùng, trong khi `xep-theo-ten-khoa` và `don-moi-nhat-truoc` có nói về tên khóa và ngày nộp. Bảng hiển thị cho học viên chỉ có kiểu và `NOT NULL`, không có khóa chính. Dữ liệu thực tế không trùng nên không ảnh hưởng chấm.
- Mục `lessons` mỗi đề chỉ trỏ bài của chương (2.4 hoặc 2.5), trong khi đề dùng thêm `N'...'`, `AND`, `WHERE` từ 2.2, 2.3. Hai bài 2.4 và 2.5 đều nhắc lại các phần đó bằng "như bài 2.x" nên không thiếu kiến thức; chỉ là link "bài cần biết" chưa liệt kê hết.

## 4. Bảng tiền đề từng bài

| Đề | Kiến thức cần | Dạy ở đâu | Còn thiếu / khó tìm |
|---|---|---|---|
| 4.1 `xep-theo-ten-khoa` | Chọn cột; xếp tăng dần | 2.1; 2.4 (`ORDER BY`, `ASC`) | Quy tắc xếp chữ tiếng Việt không cần để làm; hoãn sang 2.7 (đã nói trong 2.4) |
| 4.2 `don-moi-nhat-truoc` | Xếp giảm dần theo ngày | 2.4 (`DESC`) | Không |
| 4.3 `hai-cap-sap-xep` | Xếp nhiều cột, mỗi cột một hướng | 2.4 ("xét từ trái sang phải", Hay nhầm 1) | Ví dụ chỉ hai tiêu chí; ba tiêu chí là mở rộng tự nhiên |
| 4.4 `ba-khoan-lon-nhat` | `TOP (n)` sau `ORDER BY`; tiêu chí phụ; ít hơn n dòng | 2.4 | Không |
| 4.5 `top-sau-khi-loc` | `WHERE` hai điều kiện `AND`; `N'...'`; xếp ba tiêu chí; `TOP` | 2.2, 2.3, 2.4 | Không; link `lessons` chỉ nêu 2.4 |
| 5.1 `chua-co-email` | `IS NULL`; `''` và chữ `NULL` không phải ô trống | 2.5 | Không |
| 5.2 `da-co-quan-ly` | `IS NOT NULL` | 2.5 (một câu trong thân bài) | Dạy ngắn nhưng đủ |
| 5.3 `thay-o-trong` | Hàm gộp; nhãn `N'...'`; đặt tiêu đề; chuỗi rỗng không bị thay | 2.5 (ví dụ, LineMap, Hay nhầm 3); 2.1 (đặt tiêu đề) | Không |
| 5.4 `dang-lam-chua-co-email` | Hai `IS NULL` nối `AND`; xếp mã | 2.5 (câu mẫu), 2.3, 2.4 | Không |
| 5.5 `lien-he-du-phong` | Hàm gộp nhiều giá trị; lọc trạng thái có dấu; xếp mã | 2.5 (chỉ ví dụ hai tham số), 2.2 | Mục 3.6; nhãn mơ hồ ở mục 3.1 |

Không có đề nào cần từ khóa ngoài danh sách đã dạy tới hết 2.5. `ISNULL` chỉ xuất hiện trong Hay nhầm 2 của bài 2.5 và không bắt buộc; `NULLIF` chỉ có trong `catches` (học viên không thấy).

## 5. Những điều đã tự đặt câu hỏi "tại sao" và bài đã trả lời chưa

| Câu hỏi | Trả lời ở |
|---|---|
| Vì sao phải thêm tiêu chí phụ khi hòa? | 2.4 ("chốt thứ tự trong nhóm đó"); các đề nói rõ tiêu chí phụ hoặc cho biết khóa không trùng |
| Vì sao `TOP` đứng sau `ORDER BY` dù viết trước? | 2.4 (thứ tự logic và RunFlow) |
| Vì sao `= NULL` trả 0 dòng? | 2.5 (`UNKNOWN`, `WHERE` chỉ giữ dòng đúng) |
| Chuỗi rỗng và chữ `NULL` khác `NULL` ở đâu? | 2.5 (đoạn về `NULL` khác `0` và `''`), đề 5.1 nhắc lại |
| Vì sao nhãn phải có `N`? | 2.2 và 2.5 (chuyển kiểu ngầm, `varchar` mất dấu) |
| Vì sao hàm gộp không đổi dữ liệu nguồn? | 2.5 ("lọc và hiển thị là hai việc") |
| Vì sao bộ chấm không so tiêu đề? | Phần mở bài tập của 2.1 |
| Vì sao có hidden test và mất coin để xem? | Spec mục 6, không phải bài học; học viên không cần biết để làm |

## 6. Ưu tiên

1. **Sửa trước khi phát hành:** mục 3.1 (nhãn `lien-he-du-phong`, cùng việc U không có dòng dùng nhãn). Đây là chỗ duy nhất người đọc đúng, làm hợp lý, vẫn có thể mất coin vì đề.
2. **Nên xem hoặc sửa:** mục 3.3 (tiêu chí thứ ba của `top-sau-khi-loc` không được kiểm); mục 3.2 (xem bản dựng, không bắt buộc đổi mã).
3. **Biên tập tùy ý:** mục 3.4 (đổi chỗ bài 3 và 4 chương 5, hoặc nhãn), 3.5, 3.6, 3.7.
4. Mọi thứ khác **giữ được**: các đề, unit test, hidden test và `catches` còn lại nhất quán với đề, expected khớp dữ liệu vào theo thứ tự dòng.

## 7. Nguồn và giới hạn

- Nguồn: các file YAML trong `src/content/arcade/2-4/` và `2-5/`; bài `1-1` tới `1-5`, `2-1` tới `2-5`; `docs/quy-uoc.md`; spec Arcade; `src/components/islands/ArcadeTable.tsx` (chỉ để biết cách vẽ ô `NULL`).
- Chưa xác minh (cần chạy hoặc nhìn bản dựng): kết quả `check:arcade` thật; thứ tự sắp xếp chữ có `Đ` (`xep-theo-ten-khoa` H5); việc câu sai mà `catches` nêu quả thật qua U và trượt H (tôi chỉ lập luận trên dữ liệu và thấy nhất quán cho cả 30 hidden test); các câu không có `ORDER BY` trả theo thứ tự chèn (các bài dựa vào đó để bắt lỗi); độ nhạy hoa thường và dấu của bộ chấm với nhãn; cách hiển thị `NULL`, chữ `NULL`, `''`, `9` và `9.0`; việc `TOP 3` không ngoặc có được bộ chặn nhận hay không.
- Không kiểm: UI, bàn phím, tab test, hộp mở khóa, coin, API, vì không chạy gì. Phần UI duy nhất nhắc tới (mục 3.2, 3.7) dựa trên đọc mã.
- Không đọc: report cũ, `HRM_Demo.sql`, `.env`, `src/content/exercises`, các đề chương khác.

## 8. Kết luận

Kiến thức đủ để làm cả 10 đề: mọi từ khóa cần (`ORDER BY`, `ASC`, `DESC`, `TOP`, `WHERE`, `AND`, `IS NULL`, `IS NOT NULL`, hàm gộp, `N'...'`) đã được dạy tới hết 2.5, và không đề nào buộc dùng thứ chưa dạy. Về mặt tiền đề, người học không bị chặn ở đâu; chỗ còn vướng là bài 5.5, nơi đề không nói rõ nhãn cần hiện có ngoặc hay không và unit test không cho xem nhãn. Các hidden test còn lại công bằng với đề, dữ liệu hợp lý ở mức giả định, và `expected` khớp dữ liệu vào cùng thứ tự dòng. Còn lại là các điểm biên tập về nhịp độ và độ phủ test (bài 4.5 chưa kiểm tiêu chí xếp thứ ba), cùng vài điều cần nhìn bằng mắt trên bản dựng.

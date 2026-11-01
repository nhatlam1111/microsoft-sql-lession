# Review độc lập bài 3.2 — GROUP BY: PivotTable bằng SQL

Ngày review: 01/11/2026. Model: kế thừa model của phiên, không đổi model/effort và không tạo agent con.

## 1. Phạm vi, phiên bản và cách kiểm thực tế

- Review bài `src/content/lessons/3-2-group-by-pivottable.mdx`, ba đề trong YAML cùng slug và bản HTML `dist/bai/3-2-group-by-pivottable/index.html`. Không review lại bài 3.1 hoặc bài sau.
- Git HEAD đọc được: `665e91acaa13a074fab6f13e9147c45b785047ac`. `git status --short` ở lần kiểm phiên bản ban đầu không liệt kê thay đổi. MDX, YAML, HTML 3.2 và tất cả mục trong hai manifest `source-sha256.json`/`build-sha256.json` của gói giao đều có SHA-256 khớp. Cuối lượt source MDX 3.2 vẫn khớp hash; trạng thái Git lúc đó có thay đổi ở hồ sơ kiểm của phiên làm việc chung, tôi không đọc hoặc sửa các file đó. Nhãn build 21:08 ngày 01/11/2026 là thông tin được giao; tôi xác nhận hash file, không tự chạy lại build.
- Dùng PowerShell, `rg`, Git chỉ đọc và `apply_patch` chỉ để ghi report này. Không browser, SQL, database, API/runner, seed, secret/.env, test, build hay compiler; không sửa sản phẩm hoặc Git.
- Đọc toàn bộ bài 3.2, gồm Excel, Sql, sáu dòng LineMap, năm bước RunFlow và mọi thuộc tính drawer, Result, Hay nhầm, Ứng dụng, Memo, ba câu tự kiểm tra và ba prompt. Đọc HTML tĩnh của bài, đủ năm panel drawer và ba trang bài tập; đọc CSS liên kết của build và source component để hiểu cách trích đầu vào/highlight.
- Nền đã đọc: bài 1.3, toàn bộ mẫu 2.1, phần giảng liên quan của 2.2–2.9 và toàn bộ bản 3.1 hiện tại. Không lấy 3.3 hoặc bài sau làm tiền đề.
- Lần xem YAML đầu tiên chỉ xuất `id/title/summary/prompt/columns/ordered`. Bảng tiền đề ở mục 3 đã được ghi vào report trước khi mở `answer`; sau đó mới đối chiếu. Không đọc report cũ, nhận xét reviewer khác hoặc file verification/matrix của tác giả.

## 2. Rà theo thứ tự bài

### Mục tiêu, tình huống và cách chuyển từ Excel sang SQL — Giữ được

Vị trí: MDX dòng 11–76. Câu gốc: “mỗi mã phòng cần một dòng với số hồ sơ của phòng đó” (26).

Yêu cầu đầu bài chốt đủ đơn vị đếm, phạm vi đang làm, mã phòng hiện lưu và hai tiêu chí sắp xếp. Điều kiện khóa chính `MaNV` ở dòng 24 giúp người mới hiểu vì sao đếm dòng là đếm hồ sơ ở đây; bài không suy diễn phòng lịch sử.

PivotTable được định nghĩa tại dòng 32 trước khi dùng làm điểm tựa; Filters, Rows, Values và Count đều có nghĩa gắn với việc đang làm. Hình ghi rõ minh họa, đánh dấu đúng `A2`/`B2`/`B8`; các giá trị được đánh dấu trong HTML lần lượt là `KD`, `13`, `45`. Grand Total được phân biệt với phòng. Không cần mặc định đã biết thao tác PivotTable để hiểu câu SQL.

Câu chính xuất hiện trước LineMap, chỉ có một khối Sql và đúng hai tiểu mục. Sáu dòng LineMap đều có “Ví dụ:”. Khóa nhóm, COUNT riêng từng nhóm, giới hạn cột trực tiếp trong SELECT, nhóm nhiều cột, nhóm rỗng/NULL, Grand Total, DISTINCT, thứ tự và alias đều được giảng trước Ghi nhớ và phần ôn. Đoạn nhiều khóa ở dòng 70 đủ cú pháp và ý nghĩa cho đề 3-2-2; không cần khôi phục câu phụ khác phạm vi.

### RunFlow và drawer — Giữ được; một góp ý biên tập thấp

Vị trí: MDX dòng 80–182; các panel `data-panel="0"` đến `"4"` trong HTML được giao.

| Bước | Đầu vào và phần trích đã đọc | Thực hiện/Kết quả và đường sang bước sau |
|---|---|---|
| FROM | Nêu bảng `NhanVien`. Kết quả trích năm hồ sơ, ba cột `MaNV/MaPB/TrangThai`, nói rõ đây là cột cần theo dõi, không khẳng định bảng nguồn chỉ có ba cột. | Tổng 48; có đang làm và đã nghỉ để soi ở WHERE. Có góp ý F1 dưới đây về lời Thực hiện. |
| WHERE | Đủ ba cột của năm hồ sơ từ FROM; thấy trực tiếp trạng thái. | Bảng soi dùng đúng năm mã đầu vào: NV001/NV002/NV003 giữ, NV020/NV033 loại. Tiêu đề điều kiện có `TrangThai`; tổng 45 đúng/45 giữ trên cả 48 được phân biệt với năm dòng trích. Kết quả trích mười trong 45 hồ sơ, không còn hai mã bị loại. |
| GROUP BY | Năm trong 45 hồ sơ từ WHERE, đủ mã nhân viên/phòng/trạng thái; có KD lặp ở NV002/NV003 và KT lặp ở NV001/NV005 đúng lời giảng. | Sáu nhóm đủ các mã KT/KD/BGD/IT/VH/NS, số lượng 7/13/2/10/8/5 cộng được 45. Caption “Số hồ sơ trong nhóm” được gọi rõ là nhãn minh họa, chưa phải alias của câu chính. Hai cột này có mặt ở đầu vào SELECT. |
| SELECT | Đủ mã và kích thước nhóm, trích năm trong sáu nhóm, có chú thích về phần trích. | Đặt alias `SoHoSo` từ bước này; giữ sáu dòng, hai cột. Không lấy năm nhóm đang nhìn làm toàn bộ kết quả. |
| ORDER BY | Hai cột `MaPB/SoHoSo`, năm trong sáu dòng từ SELECT. | Đổi thứ tự KT/KD/BGD/IT/VH/NS thành KD/IT/VH/KT/NS/BGD, giữ số lượng và sáu dòng. Kết quả cuối khớp Result của bài. |

Không lấy số dòng trên thẻ xem nhanh hoặc bảng trích làm tổng thật. Các mã và trạng thái trích khớp hồ sơ công ty; sáu số lượng khớp bảng tổ chức trong hồ sơ công ty và cộng thành 45. Đây là đối chiếu nội dung được phép đọc, không phải kiểm SQL live.

**F1 — Biên tập, ưu tiên thấp: lời FROM thiếu vế “chưa chọn cột” theo quy ước drawer.**

- Vị trí: MDX dòng 92, `meaning` của FROM; HTML panel 0, phần Thực hiện.
- Câu gốc: “`FROM` chọn bảng hồ sơ làm nguồn, chưa lọc hoặc gom nhóm.”
- Tác động: bảng bên dưới chỉ theo dõi ba cột; nêu thêm vế này giúp tách rõ chọn nguồn với chọn cột, tránh để người mới phải nhớ lại bài 2.1. Tác động nhỏ vì dòng 93 đã nói hình chỉ trích các cột cần theo dõi, và bài 2.1 đã giảng FROM/SELECT.
- Căn cứ: `docs/quy-uoc.md` §2.6, dòng 81 yêu cầu bước FROM có Thực hiện nói “chưa lọc, chưa chọn cột”. Đây là thiếu một vế theo quy ước, không phải kết luận FROM hiện bị giảng sai hay thiếu tiền đề để làm ba đề.
- Đề xuất: sửa ngay câu đang có thành “`FROM` chọn bảng hồ sơ làm nguồn, chưa lọc dòng, chưa chọn cột, chưa gom nhóm.” Không cần thêm đoạn hay đổi bảng.

### Bản HTML, dấu đánh và SQL — Giữ được trong phạm vi kiểm tĩnh

Nháy đơn trong câu chính, LineMap và drawer là nháy thẳng; không thấy literal `\t`, `\n` hoặc backtick bị lộ. Năm focus trỏ đúng mệnh đề của câu chính. Focus ORDER BY tô cả dấu `;` theo cơ chế chọn cả dòng, không phải khác câu. `sql` kiểm của bước nằm trong source, không bị đưa vào phần lời giảng trên trang.

CSS của build có `--sql-tab-size: 4`, Sql/drawer dùng token đó; các vùng query trước/focus/sau là khối theo CSS. Bản 3.2 không có dòng tiếp phải thụt lề trong câu chính, nên không lấy nó làm bằng chứng đã thử câu nhiều cấp hoặc thao tác sao chép. Cột giải nghĩa LineMap là chuỗi thuần trong component hiện hành như bài mẫu; không chèn backtick vào chỗ component không hỗ trợ. Lời văn MDX và drawer dùng code cho các dẫn chứng/tên cột; in đậm tập trung ở định nghĩa và các lỗi, không bôi đậm cả bài.

### Kết quả, Hay nhầm và phần cuối — Giữ được

Vị trí: MDX dòng 184–252. Câu gốc: “Cộng sáu số lượng được `45`, không gồm ba hồ sơ đã nghỉ” (193).

Câu trả lời nằm ngay sau Result, khép yêu cầu số phòng, phòng đông nhất, tổng và phạm vi hiện lưu; không biến số liệu thành kết luận nghiệp vụ khác. Bốn Hay nhầm có lỗi và hậu quả tương ứng: thêm khóa nhân viên đổi đơn vị, DISTINCT thiếu số đếm, bỏ WHERE sai phạm vi, thiếu ORDER BY sai yêu cầu thứ tự. Các ý có nhắc lại khái niệm nhưng phục vụ hậu quả của lỗi; chưa thấy câu cần cắt/gộp vì vòng vo.

Ba Ứng dụng nói đúng việc làm được từ nhóm và tổng hợp; ý về đơn nghỉ dùng SUM trên ngày của đơn, không hứa ngày thực nghỉ. Memo và ba câu tự kiểm tra ôn khóa nhiều cột, nhóm không có hồ sơ, thứ tự báo cáo; đáp án đều có lời giảng trước đó, đặt đúng sau Ghi nhớ và trước Bài tập. Không thấy việc dùng đáp án ôn để dạy bù.

Lời bộ chấm ở dòng 250 thống nhất với metadata ba đề: so giá trị, thứ tự cột/dòng; không so alias. Ba link Làm bài đều trỏ tới HTML bài tập tồn tại và phần prompt/metadata render khớp YAML. Tiêu chí “Đã học xong” trong HTML là tự viết lại được câu lệnh, không ép phải có tài khoản nộp bài. Đối chiếu phần Giới thiệu được dẫn từ 2.1: người dùng web có mã do người phụ trách/người gửi khóa học cấp, chỉ hỏi mã khi chạy/nộp; người chỉ dùng web được nói rõ không cần kết nối SSMS; bản SQL Server riêng tự đối chiếu và không chấm tự động. Tôi chỉ kiểm văn bản/đường dẫn, chưa thử luồng tương tác.

## 3. Tiền đề từng bài tập — ghi trước khi xem answer

Đã đọc toàn bộ MDX bài 3.2, gồm năm bước RunFlow và mọi thuộc tính drawer; đọc bài 1.3, mẫu 2.1, các phần giảng liên quan của 2.2–2.9 và toàn bộ bản 3.1 hiện tại. Lần xem YAML đầu tiên chỉ xuất `id/title/summary/prompt/columns/ordered`. Bảng dưới được ghi trước khi mở trường `answer`; không lấy đáp án làm lời giảng.

| Đề | Cần biết và cách xác định trước khi xem answer | Đã được dạy ở đâu | Còn thiếu trước khi làm |
|---|---|---|---|
| 3-2-1 | Lọc hồ sơ đang làm; đổi khóa nhóm từ mã phòng sang mã chức danh; đếm dòng riêng từng nhóm; chọn đúng hai cột; sắp số lượng giảm dần, mã tăng dần. | 2.6 giải nghĩa `MaCD` là mã chức danh; 2.2/2.4 dạy lọc trạng thái Unicode và sắp nhiều tiêu chí; 3.1 dạy `COUNT(*)`; 3.2 dòng 47–74 dạy khóa nhóm, cột trực tiếp trong SELECT, COUNT trong nhóm và alias ở ORDER BY; dòng 210 gắn nhóm theo chức danh với ứng dụng. | Không thấy thiếu tiền đề. Đề nói rõ phạm vi, đơn vị, thứ tự cột/dòng và không thêm tổng. |
| 3-2-2 | Dùng toàn bộ hồ sơ, không giữ điều kiện đang làm của câu mẫu; nhóm theo cả mã phòng và trạng thái; đưa cả hai khóa cùng số đếm ra kết quả; sắp mã phòng trước, số lượng sau. | 2.4 dạy thứ tự tiêu chí; 2.6 có cặp giá trị nhiều cột; 3.2 dòng 68–72 giải thích SELECT/GROUP BY, cú pháp hai khóa, mỗi cặp có hồ sơ thành nhóm và không sinh cặp thiếu; dòng 211 nêu ứng dụng cùng phạm vi. | Không thấy thiếu tiền đề. Đề phân biệt rõ mọi trạng thái với tình huống mẫu và ghi rõ không sinh nhóm rỗng. |
| 3-2-3 | Chuyển sang bảng đơn đã học; lọc đã duyệt ở mọi ngày, bỏ giới hạn tháng của 3.1; dùng loại nghỉ làm khóa; tính số đơn và cộng toàn bộ số ngày riêng từng nhóm; sắp loại nghỉ tăng dần. | 3.1 dòng 24, 48–79 dạy đơn vị một dòng/một đơn, COUNT/SUM, lọc trạng thái và giới hạn cộng ngày trên đơn; 3.2 dòng 66 nói SUM/AVG tính riêng từng nhóm, dòng 68 dạy cột khóa trong SELECT, dòng 212 nêu `SUM(SoNgay)` theo `LoaiNghi`; 2.4 dạy ASC. | Không thấy thiếu tiền đề. `LoaiNghi` xuất hiện có nghĩa trong ứng dụng và đề; không cần tự biết cơ chế PivotTable hoặc bài sau. |

Sau khi ghi bảng trên mới đọc `answer`: cả ba đáp án mẫu dùng đúng phạm vi, khóa nhóm, chỉ tiêu, thứ tự cột và thứ tự dòng đã suy ra. Không có đáp án nào buộc kiến thức chưa được dạy hoặc mâu thuẫn với đề. Không chép nguyên answer vào report và không chạy/nộp các câu đó.

## 4. Các câu “tại sao/để làm gì” đã tự đặt ra

| Câu tự hỏi của người học | Bài trả lời ở đâu |
|---|---|
| Vì sao không chỉ đếm chung như 3.1? Một dòng phải đại diện gì? | Key dòng 26, định nghĩa GROUP BY dòng 47, khóa nhóm dòng 66–68: mỗi phòng một dòng, COUNT riêng nhóm. |
| Vì sao phải lọc trạng thái trước khi nhóm? | LineMap dòng 61, drawer WHERE dòng 111–116 và Hay nhầm 3: người đã nghỉ sẽ làm sai phạm vi nếu bỏ WHERE. |
| Vì sao không chọn thêm mã nhân viên cho rõ từng người? | Dòng 68 nói kết quả đại diện cả phòng; Hay nhầm 1 dòng 199 chỉ rõ thêm khóa chính làm mỗi nhóm còn một hồ sơ. |
| Thêm một khóa thì số dòng thay đổi thế nào? Tại sao thêm TrangThai chưa chắc tăng nhóm? | Dòng 70 giảng mỗi cặp và trường hợp mọi hồ sơ cùng trạng thái; tự kiểm tra chỉ ôn lại ý này. |
| Vì sao không thấy Grand Total hoặc phòng bằng 0 như mong đợi từ Excel? | Dòng 34 và 72 phân biệt tổng với phòng, không sinh nhóm thiếu; dẫn cách giữ phòng không có hồ sơ tới bài 3.5 nhưng kiến thức hiện tại đã đủ hiểu giới hạn. |
| Vì sao NULL có thể thành nhóm khi so sánh NULL ở WHERE lại không đúng? | Dòng 72 nêu quy tắc nhóm NULL; 2.5 đã dạy quy tắc so sánh/WHERE. Bài không khẳng định dữ liệu mẫu có MaPB NULL. |
| Vì sao cần ORDER BY và dùng được tên SoHoSo ở đó? | Dòng 74, bước SELECT/ORDER BY dòng 156–172 và nền 2.4: alias có sau SELECT, GROUP BY không bảo đảm thứ tự. |
| DISTINCT đã có mỗi mã một dòng thì còn cần GROUP BY để làm gì? | Dòng 74 và Hay nhầm 2: yêu cầu còn có chỉ tiêu số hồ sơ cho từng mã. |
| Muốn cộng ngày theo loại có cần học hàm khác hay bê nguyên điều kiện tháng 9 không? | Dòng 66/212 nối SUM của 3.1 với từng nhóm; đề 3-2-3 nêu rõ mọi ngày, cộng toàn bộ SoNgay. Không cần lấy đáp án hay bài sau bù kiến thức. |
| Báo cáo nói về phòng hiện tại hay phòng tháng trước? | Giả định dòng 24 và câu trả lời dòng 193 chặn suy ngược lịch sử. |

Không thấy câu hỏi cốt lõi nào trong các mục tiêu/ba đề bị bỏ ngỏ ở mức đọc nguồn. Đây không phải khẳng định mọi học viên đều tự học thành công.

## 5. Ưu tiên và kết luận

- Không thấy lỗi nội dung có căn cứ hoặc thiếu tiền đề chặn ba đề.
- F1 là góp ý biên tập thấp, chỉ cần bổ sung một vế trong câu FROM đang có để khớp §2.6; không cần mở rộng bài, đổi tình huống/query/YAML hay thêm ví dụ phụ.
- Với nền được giao, có đủ kiến thức trong phần giảng và bài trước để xác định cách làm cả ba đề. Đối chiếu answer sau bước học thử không làm phát sinh chỗ thiếu mới.

## 6. Nguồn và giới hạn

Nguồn nội bộ đã dùng: AGENTS.md; `docs/quy-uoc.md`; `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; các phần quyết định được giao của spec và plan `2026-11-01-lessons-3-1-3-2`; các bài nền nêu ở mục 1; source/HTML/CSS được nêu ở trên và hai manifest của gói review.

Giới hạn thực tế:

- Khi xuất các mục quyết định của spec, output có kèm đoạn trạng thái “Triển khai” ở dòng 121 trước tiêu đề Tiến trình. Tôi không dùng đoạn đó làm bằng chứng số liệu/SQL/UI, không mở link hồ sơ kiểm trong đó; đây là giới hạn cách lọc tài liệu quyết định của lượt này. Bảng tiền đề vẫn được ghi trước khi thấy answer YAML.
- Không kiểm SQL live, tính đúng của dữ liệu gốc, mọi câu kiểm từng bước, hiệu lực API/chấm bài, thực thi giao dịch hay hoàn tác. Các số trong bài chỉ được kiểm nhất quán với nhau và với hồ sơ công ty được giao. Các quy tắc kỹ thuật không được đối chiếu tài liệu ngoài khóa học theo giới hạn gói review.
- Không mở browser, nên không có viewport thực tế, kiểm trực quan layout, bấm mở drawer, bước trước/sau, bàn phím/Escape, clipboard/copy-paste, xác thực web, lưu nháp, chạy/nộp hoặc SSMS. HTML/CSS chỉ chứng minh nội dung/thuộc tính tĩnh, không chứng minh những thao tác này hoạt động.
- Hash khớp manifest xác nhận đúng file được giao; không thay cho nhật ký compiler hay bằng chứng tương tác. Tôi không chạy test/build và không xác nhận các kiểm của tác giả đạt.
- Không đo thời gian học nên không chứng nhận 20 phút là thời gian thực tế. Không dùng kết luận review làm quyền push/deploy.


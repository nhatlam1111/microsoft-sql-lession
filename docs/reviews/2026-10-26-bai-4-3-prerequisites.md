# Review độc lập tiền đề ba bài tập 4.3 — trước khi xem answer

**CHƯA XEM ANSWER.** Báo cáo được lập ngày 26/10/2026 chỉ từ đề công khai và nội dung khóa học. Chưa mở YAML bài tập, answer, API, dist, script dữ liệu hoặc tài liệu SQL ngoài khóa học; chưa chạy SQL, API, runner, test hay browser.

## Phạm vi, phiên bản và công cụ thực tế

- Vai học thử: Business Consultant khó tính, muốn đủ hiểu để trao đổi và phản biện yêu cầu dữ liệu khi chuyển sang BA hoặc PM; chỉ biết Excel văn phòng cơ bản và đã học các bài trước. Không dùng kiến thức chuyên gia hoặc bài sau để lấp phần giảng còn thiếu.
- Phạm vi hẹp của lượt này: xác định riêng từng đề có đủ tiền đề đọc hiểu và tự xây cách làm hay không. Không làm lại review HTML, tương tác, biên tập hoặc kiểm SQL live.
- Root được giao: `/workspace/scratch/2f7a56f40308/microsoft-sql-lesson-4-3`. Branch theo gói giao việc: `codex/lesson-4-3-full`; không thao tác Git để đổi hoặc sửa trạng thái.
- MDX đã đọc: `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx`, SHA-256 thực đọc `714ea8da4e7e5d6525d3ce96585c7e7fc7a71291b026469fb857ea3f2705cdbb`, khớp giá trị trong `temp/review/2026-10-26-doc-lap/4-3-manifest.json`.
- Nguồn duy nhất của ba đề: `temp/review/2026-10-26-doc-lap-prerequisites/public-exercises-4-3.json`, SHA-256 thực đọc `f54615b4b6f95b9a8e1812b85ccc2cbda96a9b0c6dc30637de7cd232ab0d9979`. Không đọc hoặc tính hash trực tiếp YAML; hash YAML xuất hiện trong manifest không được coi là bằng chứng tôi đã đối chiếu nội dung YAML với bản đề công khai.
- Công cụ: Codex agent dùng `functions.exec` gọi `tools.exec_command`, shell `bash`; các thao tác đọc nguồn dùng `rg`, `cat`, `nl`, `sed`, `wc`, `sha256sum` và kiểm sự tồn tại đường dẫn. Dùng `tools.apply_patch` chỉ để tạo chính báo cáo này. Có đọc hướng dẫn `using-superpowers`; hướng dẫn đó ghi agent được giao một nhiệm vụ cụ thể bỏ qua skill này. Không tạo agent khác.
- Model: **kế thừa model của phiên**; không truyền tham số đổi model. Tên model cụ thể, phiên bản model và số phiên bản triển khai của các công cụ không được công bố trong ngữ cảnh/công cụ của lượt này, nên không đoán tên hoặc số phiên bản.
- Toàn bộ kết luận dưới đây là kiểm đọc nguồn. Không xác nhận câu lệnh đã chạy đúng, số liệu database còn đúng tại thời điểm hiện tại, giao diện hoạt động hoặc bộ chấm chấp nhận lời giải.

## Kết luận trước đối chiếu answer

**Cả ba đề đều có đủ tiền đề trong phần giảng và các bài trước để hình thành cách làm.** Tôi không tìm thấy kiến thức bắt buộc bị bỏ qua hoặc phải lấy từ đáp án/bài sau để làm các đề công khai này. Đây là kết luận về đường suy luận người học có thể theo, không phải lời bảo đảm mọi học viên sẽ tự viết đúng ngay lần đầu.

Đề 4.3-2 cần vận dụng lời hướng dẫn chia theo loại vào câu mẫu chung, thay vì có sẵn một câu mẫu đầy đủ cho đúng yêu cầu ấy. Tuy nhiên, đoạn 4.3:61 đã chỉ rõ cả bước nhóm theo cặp loại–tháng, vị trí `PARTITION BY`, khung `ROWS` cần giữ và điểm bắt đầu lại; bài 4.2 cũng đã giải thích cú pháp chia nhóm. Tôi không coi bước ghép những điều đã dạy này là thiếu tiền đề.

## Đường đi đọc bài 4.3 đã kiểm

| Vị trí nguồn | Điều tôi hiểu được khi học thử | Đánh giá trong phạm vi tiền đề |
|---|---|---|
| 4.3:17–25, tình huống và phạm vi | Câu hỏi đổi sang số ngày trên mọi trạng thái đơn đang lưu, theo tháng `TuNgay`; cộng nguyên `SoNgay`, không tính ngày thực nghỉ trong tháng. | **Giữ được.** Không cần tự đoán có giữ đơn chờ duyệt/từ chối hay có cắt đơn qua tháng không. |
| 4.3:29–51, cộng dồn sau tổng hợp | Công thức Excel đi từ ô đầu cố định tới dòng hiện tại. Sang SQL, gom tháng bằng `EOMONTH`, cộng ngày mỗi tháng, rồi cửa sổ cộng các dòng tổng; đã phân biệt cửa sổ với `GROUP BY`. | **Giữ được.** Có lời giải nghĩa khung tính và mẫu cú pháp trước phần ôn. |
| 4.3:53–63, dòng trước/nhóm/thời điểm lọc | `LAG` lấy dòng trước theo thứ tự; đầu phạm vi giữ `NULL`; thiếu tháng không tự sinh dòng; có hướng dẫn riêng cho từng loại và cho lọc tháng 10 sau cửa sổ. | **Giữ được.** Ba thay đổi chính mà bài tập yêu cầu đều xuất hiện trong phần giảng, không nằm lần đầu ở tự kiểm tra. |
| 4.3:67–90, câu mẫu và kết quả | Nhìn được vai trò hai CTE, cột tổng tháng, hai cột cửa sổ và phép trừ ở câu ngoài. Lời trả lời tách số ngày trên đơn với ngày thực nghỉ. | **Giữ được.** Mẫu đủ để người học nhận ra chỗ cần thay đổi cho từng đề; không dùng số mẫu để đoán kết quả bài tập. |
| 4.3:92–227, toàn bộ `RunFlow` | Đã đọc `query` cùng `focus`, `meaning`, `detail`, `sql`, `columns`, `rows`, `total` của cả ba drawer `FROM`, `SELECT`, `ORDER BY`. Sơ đồ giải thích câu ngoài đọc nguồn đã tính cửa sổ, rồi thêm chênh lệch và sắp bảng. | **Giữ được.** Không hiểu nhầm sơ đồ thành quá trình lưu lần lượt các bảng trung gian; cũng không dùng nó làm bằng chứng đã chạy SQL. |
| 4.3:229–292, các mục cuối | Hay nhầm nêu phạm vi cộng dồn và `NULL`; Ứng dụng nối lại bốn việc làm được; Memo ôn cú pháp; đã đọc đủ bốn `<details>` và phần giới thiệu bài tập. | **Giữ được.** Tự kiểm tra nhắc kiến thức đã có ở 33–63, không dạy bù tiền đề. `<Exercises />` không chứa đề tại chỗ; đề được đọc từ JSON công khai được giao. |

Trong MDX 4.3 có các khối `Chat`, `Key`, `Sql`, `Result`, `RunFlow`, `Mistakes`, `Apply`, `Memo`, bốn `<details>` và `Exercises`; đã đọc toàn bộ. Phần Excel là lời giải thích công thức, không có khối `Excel` trong bài này. Không có `LineMap`, `Messages`, `Ssms` hoặc `Erd` để kiểm thêm ở 4.3.

## Tiền đề đề 4.3-1 — Lũy kế ngày trên các đơn Phép năm

| Hạng mục bắt buộc | Nhận định từ đề đã che answer |
|---|---|
| **Cách làm tự nghĩ từ đề** | Chọn các đơn thuộc loại Phép năm và trong khoảng ngày bắt đầu được yêu cầu; không thêm điều kiện trạng thái. Gom các ngày bắt đầu cùng tháng bằng ngày cuối tháng, cộng nguyên số ngày mỗi đơn thành tổng tháng. Từ bảng mỗi tháng một dòng, cộng dồn các tổng theo tháng tăng dần từ đầu phạm vi. Chỉ đưa ra ba cột theo thứ tự đề và sắp tháng tăng dần; giữ đúng những tháng có dữ liệu. |
| **Kiến thức cần** | Lọc một loại bằng chuỗi Unicode; kết hợp điều kiện loại và khoảng ngày. `EOMONTH` làm khóa tháng, `GROUP BY` và `SUM` cho tổng tháng. CTE làm nguồn ở bước sau. `SUM` với `OVER`, thứ tự tháng, khung `ROWS` từ đầu tới dòng hiện tại. Phân biệt thứ tự tính trong cửa sổ với thứ tự bảng trả về. |
| **Chỗ đã giảng chính xác** | Unicode: bài 2.7:86–90 giải thích chữ `N` trước nháy đơn và lý do giữ dấu; đây là phần bài trước tôi đọc bổ sung đúng mục để kiểm yêu cầu “chuỗi Unicode” trong đề. Lọc và kết hợp khoảng ngày đã có mẫu ở 4.1:43–55; riêng phạm vi tháng 8–10 và việc không lọc trạng thái có ngay ở 4.3:23, 35–47. Ý nghĩa `EOMONTH` ở 2.8:86–91, cách dùng làm khóa tháng và tổng tháng ở 4.3:33–43. `GROUP BY` tạo nhóm sau `WHERE` và chỉ tạo nhóm có dòng ở 3.2:47–51. CTE ở 4.1:31–41. Cộng dồn và khung `ROWS` ở 4.3:49–51, mẫu áp dụng ở 69–86. `ORDER BY` ngoài vẫn cần ở 4.2:73 và 415–416. |
| **Chỗ còn thiếu hoặc khó tìm** | **Không thấy thiếu tiền đề bắt buộc.** Người học phải thêm điều kiện loại vào mẫu tổng tháng và chỉ chọn các cột được yêu cầu; đây là vận dụng lọc/chọn cột đã gặp trong bài trước. `LAG` và phép trừ không cần cho đề này. Khung cộng dồn được giải nghĩa ngay trước câu mẫu, không phải tìm trong drawer hoặc đáp án tự kiểm tra. |
| **Kết luận đủ hay vướng** | **Đủ tiền đề đọc hiểu.** Tôi xác định được đầu vào, độ chi tiết một dòng, phạm vi cộng dồn và thứ tự trả về mà không cần answer. Chưa xác minh dữ liệu thực tế của riêng loại Phép năm hoặc kết quả chấm. |

## Tiền đề đề 4.3-2 — Lũy kế bắt đầu lại theo từng loại nghỉ

| Hạng mục bắt buộc | Nhận định từ đề đã che answer |
|---|---|
| **Cách làm tự nghĩ từ đề** | Lấy mọi đơn trong khoảng ngày bắt đầu, không lọc trạng thái. Tổng hợp theo cặp loại nghỉ và ngày cuối tháng; giữ loại trong kết quả trung gian để bước sau còn dùng. Trên các dòng tổng ấy, chia phép cộng dồn riêng theo loại rồi đi theo tháng tăng dần trong từng loại. Mỗi loại bắt đầu từ tháng đầu có dữ liệu trong phạm vi, không chèn tháng hoặc số không. Trả bốn cột yêu cầu và sắp loại tăng dần rồi tháng tăng dần. |
| **Kiến thức cần** | Nhóm theo hai khóa để đổi độ chi tiết thành cặp loại–tháng. Phân biệt `GROUP BY` tạo dòng tổng với `PARTITION BY` chia các dòng tổng thành nhóm tính riêng. Đặt `PARTITION BY` trước thứ tự tháng trong `OVER` của phép cộng; giữ khung `ROWS` từ đầu nhóm tới dòng hiện tại. Chuyển cột loại qua CTE và sắp kết quả bằng hai tiêu chí ở câu ngoài. Không coi tháng không có dòng là tháng bằng không. |
| **Chỗ đã giảng chính xác** | 3.2:59–76 giải thích mỗi tổ hợp khóa cho một dòng và thêm khóa làm đổi độ chi tiết, kèm ví dụ nhóm hai cột. 4.2:30–34 giải nghĩa hàm cửa sổ, `OVER`, `PARTITION BY`; 75–80 có biểu thức chia riêng theo `LoaiNghi`. Quan trọng nhất, **4.3:61** nói trực tiếp: nhóm theo cả loại và `EOMONTH`; thêm `PARTITION BY LoaiNghi` trước `ORDER BY Thang` trong `SUM(TongNgay)`; giữ khung `ROWS`; khi đổi loại thì bắt đầu lại từ dòng tháng đầu có dữ liệu; không sinh tháng thiếu. Khung cộng dồn chung đã giải ở 49–51 và hiện đầy đủ ở 69–86. Việc sắp kết quả nhiều tiêu chí đã có ở 3.2:82–88; thứ tự ngoài khác thứ tự cửa sổ ở 4.2:73 và 415–416. |
| **Chỗ còn thiếu hoặc khó tìm** | **Không thấy thiếu tiền đề bắt buộc.** Hướng dẫn riêng theo loại tập trung trong một đoạn 4.3:61, không có câu mẫu hoàn chỉnh riêng cho tổng theo loại. Tuy vậy đoạn này nêu đúng các thay đổi cần thực hiện, có nền nhóm hai khóa và cú pháp phân nhóm từ bài trước; không phải tự phát minh cú pháp chưa học. Cần đọc kỹ và mang cột loại qua các bước, nhưng đó là phần vận dụng CTE/chọn cột đã có. |
| **Kết luận đủ hay vướng** | **Đủ tiền đề đọc hiểu**, với mức vận dụng cao hơn đề đầu. Tôi phân biệt được một dòng đại diện cặp loại–tháng với một nhóm cộng dồn theo loại. Không phải dùng bài sau về lịch tháng đầy đủ; đề đã loại yêu cầu đó. Chưa xác minh những cặp loại–tháng có dữ liệu hoặc giá trị lũy kế thực tế. |

## Tiền đề đề 4.3-3 — Chỉ gửi tháng 10 sau khi tính trên ba tháng

| Hạng mục bắt buộc | Nhận định từ đề đã che answer |
|---|---|
| **Cách làm tự nghĩ từ đề** | Giữ toàn bộ khoảng tháng 8–10 trong đầu vào, mọi trạng thái. Tạo tổng theo tháng bắt đầu trước. Trên bảng tháng ấy tính cộng dồn từ đầu phạm vi và lấy tổng của dòng trước theo thứ tự tháng. Ở câu ngoài đọc kết quả đã có, tạo chênh lệch từ hai cột, đồng thời chỉ giữ tháng 10 bằng khóa ngày cuối tháng; cuối cùng trả năm cột đúng thứ tự và sắp tháng. Giữ nguyên giá trị thiếu, không tự thay số không. |
| **Kiến thức cần** | Tổng tháng và khung cộng dồn như đề đầu. `LAG` lấy dòng trước theo thứ tự, mặc định `NULL` khi không có dòng trước. Phép trừ với `NULL` vẫn thiếu. Đặt kết quả cửa sổ trong CTE để câu ngoài dùng được cột đã có; không dùng bí danh vừa tạo ở cùng cấp để trừ/lọc. Thời điểm lọc tháng hiển thị phải sau cửa sổ, còn lọc phạm vi tháng 8–10 phải nằm ở nguồn. |
| **Chỗ đã giảng chính xác** | 4.3:55 định nghĩa `LAG` và giá trị mặc định khi không có dòng trước; 57 giải thích dùng CTE có `KyTruoc` rồi mới trừ và quy tắc phép trừ với `NULL`. Bài 2.5:67–101 đã phân biệt `NULL` với số không và giải thích vì sao thay thiếu bằng không là thêm một lựa chọn ý nghĩa. Bài 4.1:35–41 dạy hai CTE và dùng cột đã có ở câu ngoài; 4.2:36 chỉ rõ không lọc kết quả cửa sổ ở `WHERE` cùng cấp. **4.3:63** hướng dẫn chính xác giữ cả ba tháng trong hai CTE, thêm điều kiện tháng 10 ở câu ngoài trước `ORDER BY`, đồng thời nêu hậu quả nếu lọc sớm. Câu mẫu hai CTE và phép trừ hiện ở 69–86. |
| **Chỗ còn thiếu hoặc khó tìm** | **Không thấy thiếu tiền đề bắt buộc.** Vị trí và dạng điều kiện hiển thị tháng 10 đã nằm trong phần giảng 4.3:63. Tự kiểm tra 275–277 chỉ nhắc lại chứ không phải nơi đầu tiên cung cấp bước làm. Không cần đoán tháng 10 phải so với ngày đầu hay ngày cuối vì đề định nghĩa `Thang` là ngày cuối tháng và phần giảng đã nối điều đó với điều kiện lọc. |
| **Kết luận đủ hay vướng** | **Đủ tiền đề đọc hiểu.** Tôi xác định được hai phạm vi khác nhau: phạm vi tham gia tính và phạm vi được gửi ra. Không phải đọc answer để biết chỗ đặt bộ lọc. Chưa chạy câu tự viết hoặc kiểm số liệu live. |

## Những câu hỏi “tại sao/để làm gì” tôi tự đặt

| Câu hỏi từ góc nhìn người học | Bài có trả lời không, ở đâu? |
|---|---|
| Vì sao phải tổng hợp mỗi tháng một dòng trước, không đưa từng đơn thẳng vào cửa sổ? | **Có**, 4.3:49–51: cửa sổ giữ các dòng đầu vào, không thay bước gom nhóm. Một dòng tháng giúp mỗi bước cộng/lấy trước có đúng đơn vị kỳ đang báo cáo. |
| Vì sao `Thang` lại là một ngày cuối tháng, có phải đơn bắt đầu ngày đó không? | **Có**, 4.3:33: mọi ngày cùng tháng chung một khóa; ngày cuối tháng chỉ đại diện tháng, không sửa hoặc mô tả ngày bắt đầu thật. |
| Vì sao vẫn cộng cả đơn từ chối/chờ duyệt, khác bài 4.1? | **Có**, yêu cầu đổi sang mọi trạng thái ở 20–23; 47 chỉ rõ khác phạm vi đơn đã duyệt trước đó. Không được mang nguyên bộ lọc cũ sang. |
| Vì sao đơn kéo qua tháng sau vẫn cộng nguyên số ngày vào tháng đầu? | **Có**, phạm vi 23 quy định cộng theo tháng bắt đầu; ví dụ đơn kéo qua tháng ở 47 cho thấy cách áp dụng. Đây là định nghĩa báo cáo, không phải ngày thực nghỉ trong tháng. |
| “Đầu” của khung là đầu năm hay đầu dữ liệu tôi đã lấy? | **Có**, 49–51 nói từ dòng đầu nhóm tính; Hay nhầm 233 nhắc đầu phạm vi sau lọc không tự tìm các tháng trước. Phần giảng đã đủ trước khi đến ôn. |
| Vì sao cần giữ khung `ROWS` được chỉ định? | **Có đủ cho phạm vi bài**, 49–51 giải nghĩa nó chọn từ dòng đầu tới dòng hiện tại; 61 yêu cầu giữ nguyên khi chia theo loại. Không cần tự biết các khung mặc định hoặc loại khung khác để làm ba đề. |
| Đã nhóm theo loại rồi, `PARTITION BY` còn để làm gì? | **Có**, 61 tách hai việc: nhóm theo cặp loại–tháng để có dòng tổng, rồi cộng dồn riêng theo loại; 4.2:30–32 đã phân biệt cửa sổ giữ dòng với `GROUP BY` gom dòng. |
| Thiếu một tháng thì có phải tự thêm dòng số không để “lũy kế tháng” đúng không? | **Có**, 59 và 61 nói cửa sổ chỉ dùng dòng có sẵn, không sinh tháng hoặc kết luận số không; đề 4.3-1/2 cũng nói rõ không tạo tháng thiếu. |
| Vì sao dòng đầu không có kỳ trước lại để `NULL`, không lấy không cho dễ tính? | **Có**, 55–57 nêu mặc định của `LAG` và việc trừ với `NULL`; 234 nói đổi sang không là thêm giả định kỳ trước bằng không. Bài 2.5 đã dạy nền ý nghĩa thiếu khác không. |
| Vì sao phải có bước chứa `KyTruoc` trước khi tính chênh lệch? | **Có**, 57 nói rõ dùng cột đã có từ nguồn, không dùng bí danh vừa tạo ở `SELECT` cùng cấp; nối được với 4.1:37. |
| Vì sao chỉ gửi tháng 10 mà vẫn phải giữ tháng 8–9 trong nguồn? | **Có**, 63 giải thích lọc sớm làm mất các dòng tham gia cộng dồn và lấy kỳ trước, kèm hậu quả cụ thể; không phải chờ tới tự kiểm tra mới biết. |
| `ORDER BY` trong cửa sổ đã tăng dần rồi, vì sao còn sắp ở câu cuối? | **Có nền từ bài trước**, 4.2:73 và 415–416 phân biệt thứ tự tính với thứ tự trả về; drawer `ORDER BY` 4.3:189–194 tiếp tục nói sắp bảng ngoài. |
| Có các tổng ngày này rồi, có thể gọi là ngày đã nghỉ hoặc kết luận đủ dữ liệu cả kỳ không? | **Có trả lời giới hạn**, 4.3:23 không cho suy ra như vậy. Đề chỉ yêu cầu số ngày trên các đơn đang lưu trong phạm vi. |

## Ưu tiên và giới hạn còn lại

- **Không có finding “Cần sửa” hoặc “Cần làm rõ” đủ căn cứ trong phạm vi kiểm tiền đề ba đề.** Các phần then chốt của cả ba đề đã được giảng trước Memo. Không đề nghị thêm một lời giải hoàn chỉnh chỉ để giảm bước vận dụng.
- **Giữ được:** phạm vi mọi trạng thái; định nghĩa tổng theo `TuNgay` và nguyên `SoNgay`; một dòng tháng trước cửa sổ; khung `ROWS`; ý nghĩa `LAG`/`NULL`; phân nhóm theo loại; tháng thiếu; lọc tháng hiển thị sau cửa sổ.
- **Chưa xác minh:** sự tương ứng giữa bản đề công khai và YAML hiện tại; tính đúng khi thực thi, dữ liệu live và bộ chấm; render, drawer tương tác, sao chép/dán hoặc UI. Không biến việc đọc nguồn, hash MDX hay nội dung bảng mẫu thành bằng chứng các phần ấy đã đạt.
- Chưa đối chiếu answer nên chưa kết luận answer thực tế có đúng với đề, có dùng kỹ thuật ngoài phần đã giảng hoặc có lỗi riêng nào. Không tự suy đoán số dòng hay số kết quả của ba bài tập.

## Nguồn đã đọc

- Đọc toàn bộ `AGENTS.md`, `docs/quy-uoc.md` (đặc biệt 4.5), `docs/lesson-template.md`, `docs/ho-so-cong-ty.md` và mẫu `src/content/lessons/1-1-database-la-gi.mdx`.
- Đọc toàn bộ các bài được giao: `2-5-null-o-trong.mdx`, `2-8-ham-ngay-tham-nien.mdx`, `3-2-group-by-pivottable.mdx`, `4-1-cte-tung-buoc.mdx`, `4-2-xep-hang-row-number-rank.mdx`, gồm nội dung các block/drawer trong nguồn.
- Đọc bổ sung mục “Giữ dấu khi viết chuỗi, chọn luật khi so sánh” của bài trước `2-7-ham-chuoi-tieng-viet.mdx`, dòng 84–105, để xác minh tiền đề Unicode của đề 4.3-1; không dùng tài liệu ngoài khóa học.
- Đọc toàn bộ `src/content/lessons/4-3-luy-ke-so-thang-truoc.mdx`, dòng 1–292, cùng JSON đề công khai và manifest được chỉ định.
- Chỉ đọc phần mục tiêu/phạm vi/quyết định triển khai, bài tập, bố cục và quy trình bàn giao trong spec `docs/superpowers/specs/2026-10-26-lessons-4-1-4-3-design.md` (dòng 1–34 và 41–74); không đọc phần nguồn kỹ thuật, theo dõi triển khai, report, ma trận hoặc evidence tác giả. Nội dung quyết định chỉ dùng để nhận đúng phạm vi, không thay việc kiểm tiền đề từ bài học.

**Trạng thái kết thúc: CHƯA XEM ANSWER. Dừng tại đây, chờ nhiệm vụ riêng cho bước đối chiếu.**

## Đối chiếu answer sau khi khóa tiền đề

Bước đối chiếu được giao riêng ngày 26/10/2026, sau khi phần tiền đề phía trên đã được khóa. Trạng thái **CHƯA XEM ANSWER** ở phần trước ghi đúng thời điểm lập phần đó; ở bước này tôi đã được phép đọc ba answer trong `src/content/exercises/4-3-luy-ke-so-thang-truoc.yaml`.

Trước khi thêm mục này, SHA-256 của chính report là `821379a591e6b37e047c898929365138a00c159b71f15a745f23cb5b78a390f6`, khớp hash bản khóa do người giao việc cung cấp. Chỉ thêm mục mới ở cuối, không viết lại nhận định hoặc cách làm đã khóa. Không mở bản sao tiền đề hoặc report khác.

### Nguồn và cách đối chiếu

- Đã đọc YAML của đúng bài 4.3. SHA-256 thực đọc là `44edad558b5427d3f14bd709f76f5a8ed9f485d2cc61e43f4c8bdef4230957d1`, khớp manifest đã được giao.
- Đối chiếu thủ công trường `lesson` và các trường công khai `id`, `title`, `summary`, `prompt`, `columns`, `ordered`, `kind` của từng đề với JSON đã đọc ở bước trước. **Cả ba đề khớp**, gồm nguyên văn phạm vi ngày, trạng thái, cách cộng ngày, cột và thứ tự. Trường `answer` chỉ có ở YAML, đúng với việc JSON công khai đã che answer.
- Đối chiếu cách tổ chức từng answer với cách làm đã ghi trước khi được phép xem answer; không dùng answer làm lời giảng mới và không chép câu SQL đáp án vào báo cáo.

### Kết quả từng đề

| Đề | Đề công khai so với YAML | Answer so với cách làm đã khóa | Khác biệt hoặc tiền đề phát sinh |
|---|---|---|---|
| **4.3-1 — Lũy kế ngày trên các đơn Phép năm** | Khớp các trường công khai. Vẫn là loại Phép năm ở mọi trạng thái, trong khoảng tháng 8–10 theo ngày bắt đầu; cộng nguyên ngày, chỉ giữ tháng có dữ liệu. | Answer lọc loại bằng chuỗi Unicode và lọc khoảng ngày tại nguồn, không thêm điều kiện trạng thái. CTE tạo tổng theo khóa ngày cuối tháng; câu ngoài cộng dồn tổng tháng với thứ tự tháng và khung `ROWS` đã học, rồi trả ba cột và sắp tăng dần. Đúng đường làm đã khóa. | **Không có khác biệt cần sửa kết luận tiền đề.** Answer không đòi thêm kỹ thuật ngoài phần đã chỉ ra. Việc chỉ cần một CTE thay vì hai CTE của câu mẫu chính phù hợp vì đề không yêu cầu lấy kỳ trước hoặc tính chênh lệch. |
| **4.3-2 — Lũy kế bắt đầu lại theo từng loại nghỉ** | Khớp các trường công khai, gồm một dòng cho mỗi cặp loại–tháng có dữ liệu, không chèn tháng/số không, sắp loại rồi tháng. | Answer tổng hợp theo cả loại và khóa ngày cuối tháng, giữ cột loại trong nguồn. Phép cộng cửa sổ chia theo loại, đi theo tháng và giữ khung `ROWS`; câu ngoài trả bốn cột rồi sắp hai tiêu chí. Đúng các thay đổi tôi đã suy ra từ đoạn 4.3:61 và nền bài trước. | **Không phát sinh tiền đề mới.** Nhận định trước đó vẫn giữ: người học cần ghép chỉ dẫn bằng lời vào mẫu chung, nhưng answer không có bước cú pháp nào mà phần giảng chưa cung cấp. |
| **4.3-3 — Chỉ gửi tháng 10 sau khi tính trên ba tháng** | Khớp các trường công khai, gồm phạm vi tính ba tháng, năm cột theo thứ tự, chỉ hiển thị tháng 10 sau cửa sổ và giữ `NULL`. | Answer giữ khoảng tháng 8–10 trong CTE tổng tháng, tính lũy kế cùng kỳ trước trong CTE tiếp theo. Câu ngoài đọc các cột đã có để trừ và lọc theo khóa ngày cuối tháng 10, rồi sắp tháng. Không thay giá trị thiếu bằng số không. Đúng đường làm đã khóa và đúng vị trí lọc đã xác định trước khi xem answer. | **Không phát sinh tiền đề mới.** Tên CTE trong answer khác câu mẫu của bài nhưng chỉ là tên tự đặt đã được dạy; không tạo trở ngại kiến thức hoặc làm thay đổi cách xử lý. |

### Kết luận và công cụ của bước này

Không tìm thấy khác biệt giữa ba đề JSON với YAML hoặc bước bắt buộc mới trong answer làm đảo kết luận tiền đề đã khóa. **Giữ kết luận cả ba đề đủ tiền đề đọc hiểu trong phạm vi đã giao.** Việc đối chiếu này xác nhận sự phù hợp ở mức đọc nguồn; không xác nhận SQL đã thực thi đúng hoặc bộ chấm đã chấp nhận.

Công cụ thực tế của bước này: `functions.exec` gọi `tools.exec_command` để đọc YAML bằng `cat`, kiểm hash YAML và report bằng `sha256sum`; `tools.apply_patch` để chỉ thêm mục cuối report. Model vẫn **kế thừa model của phiên**, không đổi model; tên/phiên bản cụ thể của model và số phiên bản triển khai công cụ không được công bố nên không đoán. Có kiểm lại hash phần report đã khóa khi xác nhận thao tác append giữ nguyên nội dung trước đó.

Không chạy SQL, API, runner, test hoặc browser; không đọc seed, secret, tài liệu SQL ngoài khóa học hoặc report khác; không sửa source/Git. Chưa xác minh dữ liệu live, các giá trị kết quả, lỗi khi chạy, hành vi bộ chấm hoặc tương tác giao diện. Không suy đoán số dòng hay số kết quả của các bài tập.

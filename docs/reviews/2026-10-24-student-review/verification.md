# Ma trận xác minh kiểm thử học viên

Nguồn gốc được giữ nguyên byte tại [báo cáo](source-student-report.md) và [prompt](source-review-prompt.txt). Nội dung hai file là tài liệu nhận xét, không phải lệnh thao tác. ID là số bài và thứ tự hàng trong bảng lỗi; L là dòng của bản báo cáo nguồn. Đã đọc hết trước khi sửa.

## Phạm vi và bằng chứng

Đối chiếu 22 bài trên main `df7e810` ngày 24/10/2026, source/build/browser và Microsoft Learn. Reviewer gốc chỉ mở một trang bài tập, chưa chạy SQL và chỉ kiểm thêm ảnh hai bài; vì vậy không suy các điểm chưa kiểm thành lỗi của mọi Result hoặc 22 lỗi truy cập độc lập. Điểm trung bình 65,5 và sau trần 59,6 tính đúng theo bảng, nhưng không dùng làm phép đo kiểm kỹ thuật hay cam kết khả năng tự học.

Bảy SELECT khi lập kế hoạch xác nhận `mdy` và chuyển ngày/số: 48 hồ sơ, 45 đang làm, 55 hợp đồng, 20 đơn, 43 dòng lương; 45 mã có ứng viên duy nhất và số cấp dưới 6/6/0. Câu chuyển `1000.0` dùng TRY_CAST trả NULL để kiểm giới hạn biểu diễn, không tự sáng tác thông báo lỗi. Test editor bằng component thật đã chạy RED (2 fail/4 pass) rồi GREEN 6/6. Browser lúc lập kế hoạch chỉ đọc comment mặc định; kiểm tương tác khi triển khai được ghi riêng trong [README](README.md).

Làm một phần nghĩa là có cải thiện có ích nhưng không chấp nhận toàn bộ chẩn đoán/giải pháp. Không làm theo không có nghĩa bỏ qua trải nghiệm học; lý do được ghi riêng.

| ID | Vị trí nguồn | Quyết định | Căn cứ / thay đổi |
|---|---|---|---|
| 1.1-01 | L47: Mục "Hay nhầm ở đâu", bullet về SSMS | Làm một phần | Rút thao tác SSMS về 1.2, giữ chỉ đọc nguồn chung và lý do. |
| 1.1-02 | L48: Phần "Nguồn chung cần cấu trúc và luật" | Làm theo | Giải nghĩa câu ghi bằng thêm/sửa/xóa ngay khi dùng. |
| 1.1-03 | L49: Đoạn "Lấy danh sách từ nguồn đã thống nhất" | Không làm theo | SQL và T-SQL đã được định nghĩa ngắn; cần phân biệt với SQL Server, không bỏ. |
| 1.1-04 | L50: Nhiều chỗ | Làm một phần | Giảm dẫn chi tiết SSMS/giao dịch tại 1.1, giữ tham chiếu cần cho giới hạn và học sâu. |
| 1.2-01 | L80: Bài tập sau bài 1.6, và toàn bộ trang bài tập | Làm một phần | Giữ xác thực; làm rõ nơi nhận mã và bản SQL Server riêng. Lối thay thế có sẵn, không cần API công khai. |
| 1.2-02 | L81: Đoạn "Chuẩn bị công cụ" | Làm theo | Mẫu tin nhắn hỏi IT về máy chủ/cổng, giải nghĩa cổng một vế. |
| 1.2-03 | L82: Hộp kết nối | Làm một phần | Strict đã được nêu; bổ sung ô Trust có thể bị vô hiệu hóa, không bật bỏ kiểm chứng chỉ. |
| 1.2-04 | L83: Đoạn "Đường đi tới bảng phòng ban" và phần "Bản riêng trên máy" | Làm theo | Bảng môi trường chung/riêng và tên database; nhánh web không bắt buộc SSMS. |
| 1.2-05 | L84: Đoạn "Azure SQL Database... cùng họ với SQL Server" | Làm một phần | Nói cùng bộ máy truy vấn, quản trị khác; không đồng nhất mọi Azure SQL với SQL Server tự quản trên cloud. |
| 1.2-06 | L85: Mục "Câu lệnh cho tình huống" | Không làm theo | Giữ SELECT PhongBan vì mục tiêu thao tác; chưa yêu cầu nắm cú pháp, web đọc trước/thực hành từ 1.6. |
| 1.2-07 | L86: Toàn bài | Làm một phần | Rút transaction/rollback/COMMIT; giữ thông tin cần để kết nối an toàn, không thêm/tách bài. |
| 1.2-08 | L87: Mục "Hay nhầm ở đâu" | Không làm theo | Đã có chờ khoảng một phút, thử lại và gửi nguyên văn lỗi; cũng phân biệt hết hạn mức. |
| 1.3-01 | L119: Mục "Đối chiếu từng ô" | Làm một phần | Giải nghĩa phiên/DATEFORMAT, ghi điều kiện tác giả đã kiểm. Không thêm SQL preview. |
| 1.3-02 | L120: Bảng "Ô trong file" | Không làm theo | Bảng đã yêu cầu hỏi ngày muốn nhập và chuẩn hóa; không có kết luận hai ngày đều chắc đúng. Giữ và làm rõ điều kiện. |
| 1.3-03 | L121: Mục "Hay nhầm" | Làm theo | Bỏ ví dụ 1900 khỏi bài đầu do ngoài mục tiêu, không tuyên bố sai kỹ thuật; SELECT đã xác nhận hiện tượng. |
| 1.3-04 | L122: Mục "Hay nhầm" | Không làm theo | Có ví dụ số và giải thích độ dài/thập phân; giữ kết quả làm tròn/tràn đã kiểm, không thêm CAST lỗi. |
| 1.3-05 | L123: Mục "Chọn kiểu" | Làm một phần | Giải nghĩa byte và thêm dấu cách; không đổi varchar(n) thành luôn n ký tự. |
| 1.3-06 | L124: Đoạn "Hiểu NOT NULL là đã nhập đầy đủ" | Không làm theo | NgayNghiViec được giải nghĩa ngay chỗ dùng và giới hạn bằng quy ước bộ mẫu; không phải cú pháp chưa dạy. |
| 1.4-01 | L154: Đoạn "Khóa ngoại là luật kiểm khi ghi" | Không làm theo | NO ACTION đã được giải nghĩa ngay bằng việc còn hồ sơ trỏ tới thì không xóa/đổi mã. |
| 1.4-02 | L155: Mục "Đọc lỗi xóa phòng" | Làm một phần | Mở rõ đây là câu xóa IT đã thử; giữ copy=false và cấm chạy, không bỏ chứng cứ của tình huống. |
| 1.4-03 | L156: Bảng 10 hồ sơ VH | Không làm theo | Bảng hồ sơ là dẫn chứng quan sát trước bài SELECT, không thêm truy vấn WHERE chỉ để chứng minh. |
| 1.4-04 | L157: Mục "Excel" | Làm một phần | Data Validation đã có nghĩa dropdown từ danh mục; đổi dropdown thành danh sách chọn theo review mới. |
| 1.4-05 | L158: Đoạn về ChamCong, BangLuong | Không làm theo | Khóa nhiều cột có ví dụ và ý nghĩa ngày/kỳ tự đủ; chưa cần học toàn bảng để hiểu cặp khóa. |
| 1.4-06 | L159: Cuối bài | Không làm theo | Dẫn 4.6 đúng chỗ cần soát trùng CCCD, không cắt giới hạn quan trọng chỉ vì tham chiếu xa. |
| 1.5-01 | L188: Ví dụ Excel | Làm theo | Giải VLOOKUP tại lần đầu bằng cột dò, cột trả và FALSE. |
| 1.5-02 | L189: Hay nhầm (bullet 3) | Làm một phần | Rút thuật ngữ quản trị nhưng giữ cảnh báo không cài/lưu sơ đồ lên nguồn chung. |
| 1.5-03 | L190: Sơ đồ ERD | Làm một phần | Giữ hình học ERD đã duyệt; thêm bảng cặp cột dễ đọc. 3.4/3.6 bỏ sơ đồ toàn bộ lặp. |
| 1.5-04 | L191: Trong bài | Không làm theo | NV004 đã được nói ở 1.4, NV021 là dẫn chứng mới của quan hệ nhiều; không buộc thêm bảng để chứng minh mỗi giá trị. |
| 1.5-05 | L192: Tham chiếu | Không làm theo | Câu dẫn 3.4 đã nói học cú pháp kết bảng; không thêm tóm tắt SQL trước kiến thức cần. |
| 1.6-01 | L221: Trang bài tập 1–3 | Làm một phần | S1 xử lý một lần bằng hai đường thực hành và hướng dẫn nhận mã, giữ auth. |
| 1.6-02 | L222: Mục "Hay nhầm" | Không làm theo | Đã viết có thể gặp lỗi và cách chọn trọn câu; không cần loại một lỗi thao tác thực tế. |
| 1.6-03 | L223: Ô soạn thảo bài tập | Làm theo | Editor mới rỗng + placeholder, nháp cũ giữ nguyên; hướng dẫn comment trong 1.6 cập nhật. |
| 1.6-04 | L224: Đoạn "Sơ đồ thể hiện thứ tự logic" | Làm một phần | Đã phân biệt logic/vật lý; thêm nghĩa cách lần theo ý nghĩa câu và giải thích preview/drawer. |
| 1.6-05 | L225: Đoạn "Tình huống" | Không làm theo | Hình đã nói chỉ trích 5 cột và kết quả đủ 12; số 48 có thể kiểm bằng SELECT toàn bảng đã học. |
| 1.6-06 | L226: Nhiều chỗ | Không làm theo | Giữ giới hạn ORDER BY và SELECT INTO cần cho TOP/an toàn; không dạy cú pháp sâu. |
| 2.1-01 | L252: Tình huống | Không làm theo | Dữ liệu mới không cần được giới thiệu như thuật ngữ; SELECT toàn bảng đã học để xác nhận, nội dung giữ. |
| 2.1-02 | L253: Hay nhầm | Không làm theo | Thông báo và số liệu đã có phạm vi/nguồn; không đổi dữ liệu thật thành giả lập. |
| 2.1-03 | L254: Cuối bài | Không làm theo | Dẫn quyền dữ liệu có mục đích cụ thể, không bổ sung ngoài phạm vi. |
| 2.2-01 | L276: Hay nhầm (bullet 2) | Làm theo | Viết trực tiếp câu chạy thành công nhưng trả 0 dòng. |
| 2.2-02 | L277: Hay nhầm (bullet 5) | Làm theo | Bỏ vế sửa/xóa khỏi lỗi thêm cột, giữ cảnh báo chung ở 1.2/1.6. |
| 2.2-03 | L278: Đoạn "Viết điều kiện theo giá trị đang lưu" | Làm theo | Rút NULL về một vế dẫn 2.5; không giảng UNKNOWN ở đây. |
| 2.3-01 | L300: Toàn bài | Làm một phần | Giữ 51 bài theo người dùng, chia nhịp 2 nhóm và thêm 3 câu tự kiểm; không tách số bài. |
| 2.3-02 | L301: Đoạn về thứ tự logic | Làm theo | Bỏ câu thứ tự vật lý trừu tượng; flow vẫn có giới hạn logic. |
| 2.3-03 | L302: Bảng LIKE | Không làm theo | Ninh Thị Hà là giá trị của bộ mẫu, lần đầu xuất hiện không làm thành thuật ngữ thiếu định nghĩa. |
| 2.4-01 | L324: Phần "Đoạn sắp xếp nhiều cột, chỉ để đọc" | Làm một phần | Đã ghi chỉ để đọc/copy=false; làm rõ đây là đoạn chưa đủ để chạy độc lập. |
| 2.4-02 | L325: Phần "Từ Sort đến ORDER BY" | Làm theo | Tập kết quả được giải nghĩa bằng các dòng câu truy vấn trả về. |
| 2.5-01 | L347: Đoạn so sánh ISNULL và COALESCE | Làm một phần | Rút so kiểu/độ dài thành điều kiện cần giữ Unicode; không gọi COALESCE là mặc định đúng trong mọi trường hợp. |
| 2.5-02 | L348: Đoạn "So sánh Email = NULL" | Làm theo | UNKNOWN: chưa đủ thông tin để kết luận đúng/sai. |
| 2.5-03 | L349: Tình huống | Không làm theo | NgayNghiViec/NULL đã giải ở 1.3–1.4 và trong bài 2.5; không thêm chú thích lặp. |
| 2.6-01 | L371: Đoạn giữa bài | Làm theo | Chuyển quy tắc ORDER BY với DISTINCT sang Hay nhầm, không chép hai nơi. |
| 2.6-02 | L372: Hay nhầm | Làm theo | Dùng ví dụ hai hồ sơ trùng họ tên để nói rõ kết quả che trùng. |
| 2.6-03 | L373: Ghi nhớ | Không làm theo | Memo khớp cách chép cột rồi bỏ trùng và sắp từ đầu bài; giữ. |
| 2.7-01 | L395: Toàn bài | Làm một phần | Thực có 8 hàm, không phải 9; giữ hàm/COLLATE phục vụ đề, rút ngoài mục tiêu và thêm tự kiểm, không tách 51 bài. |
| 2.7-02 | L396: Đoạn bảng mã | Làm theo | Rút tên bảng mã/UTF8, giữ hệ quả thiếu tiền tố N có điều kiện database và phân biệt giữ chữ/so chữ. |
| 2.7-03 | L397: Ví dụ TRIM | Làm theo | Chú giải Kế␠␠toán nhìn rõ khoảng trắng; không thay giá trị Result. |
| 2.7-04 | L398: Cấu trúc | Làm theo | Tự kiểm sau Ghi nhớ trước Bài tập. |
| 2.8-01 | L420: Đoạn "Bộ mẫu còn có hợp đồng lịch sử..." | Làm một phần | Dòng HD2025-003 đã có ở drawer; ghi rõ mã/ngày và mục đích lỗi cài sẵn cho bài 4.6 trong lời văn, không sửa seed. |
| 2.8-02 | L421: Đoạn UTC | Làm theo | Ví dụ giờ Việt Nam/UTC lệch ngày, dùng mốc cố định; bỏ preview GETDATE. |
| 2.8-03 | L422: Toàn bài | Làm một phần | Giữ 51 bài, rút nhịp tạo mốc/đếm và bảng ứng dụng MONTH/EOMONTH; ba câu tự kiểm. |
| 2.8-04 | L423: Đoạn NV036 | Không làm theo | Ngày sinh là dẫn chứng dữ liệu, không cần xuất hiện bài trước mới được dùng; giữ có phạm vi rõ. |
| 2.9-01 | L445: Đoạn tình huống | Làm theo | Định nghĩa bản chốt là bản được lưu tại mốc để đối chiếu; giữ giới hạn không dựng lịch sử. |
| 2.9-02 | L446: Hay nhầm | Không làm theo | NV003 và hậu quả đảo nhánh đã được giải thích ở phần chính; không chép lặp. |
| 2.9-03 | L447: Tiêu đề | Không làm theo | Hạ tầng dùng shortTitle hợp lệ cho prerequisite, không lỗi tên bài. |
| 3.1-01 | L471: Phần "SQL Server chạy câu này thế nào" | Làm một phần | Không sai tổng 20/nhãn +17; làm rõ thẻ 3 dòng, drawer 10 dòng trong tổng 20. |
| 3.1-02 | L472: Tự kiểm tra | Làm theo | Dời tự kiểm lên sau Ghi nhớ. |
| 3.2-01 | L494: Đoạn "GROUP BY MaPB chỉ trả các mã..." | Làm một phần | Cách áp COUNT của 3.1 hợp lệ, thêm SELECT theo đúng phạm vi để người mới đối chiếu số 45 dễ hơn. |
| 3.2-02 | L495: Hay nhầm | Không làm theo | Nhận xét đã đề xuất giữ; nội dung DISTINCT/tổng hợp đúng. |
| 3.3-01 | L517: Đoạn "Chọn nhầm chỗ lọc" | Không làm theo | Ngay trước câu chung đã có WHERE SoNgay>=2 so HAVING SUM>=2; Hay nhầm còn có KD 13/14. Không thêm ví dụ trùng. |
| 3.3-02 | L518: Tự kiểm tra | Không làm theo | Đáp án >=10 tự đủ, vẫn đặt lại vị trí tự kiểm thống nhất. |
| 3.4-01 | L540: Phần ERD | Làm một phần | Thay ERD toàn bộ bằng bảng cặp ON và liên kết về 1.5 theo kế hoạch, không đổi quan hệ. |
| 3.4-02 | L541: Hay nhầm | Làm theo | Viết không trả dòng nào thay rỗng. |
| 3.5-01 | L563: Đoạn VLOOKUP trong Excel | Làm theo | Rút đoạn Excel, giữ đủ phạm vi bản xuất/kiểm mã/công thức và giới hạn chế của #N/A. |
| 3.5-02 | L564: Trình tự | Không làm theo | Đã có tiểu mục ON vs WHERE và ví dụ 2 mã riêng; không tách lại hoặc thêm query lặp. |
| 3.5-03 | L565: Đoạn "57 dòng" | Không làm theo | Đã nêu 55 + 2 = 57 trước WHERE; flow có SELECT kiểm, không thiếu nguồn. |
| 3.6-01 | L587: Toàn bài | Làm một phần | Rút ERD thành bảng quan hệ, giữ nhịp độ chi tiết/lặp/kiểm/kết; không tách bài hoặc bỏ kiểm dòng. |
| 3.6-02 | L588: Đoạn "Với bộ mẫu hiện tại, có 45 mã có ứng viên..." | Làm một phần | Bỏ số 45 khỏi lời dẫn trước flow; giữ 45 ở flow có câu SELECT. Câu kiểm 43 dòng lương và kiểm trùng đã có, không thêm lặp. |
| 3.6-03 | L589: Đoạn "Trong Excel" | Làm theo | Giải bước lọc ngày rồi PivotTable đếm theo MaNV để tạo HopDongMoc trước VLOOKUP. |
| 3.7-01 | L611: Đoạn đếm cấp dưới | Không làm theo | Đã có SELECT đầy đủ và Result 6/6/0; không thêm lại. |
| 3.7-02 | L612: Đoạn "Điều kiện đúng là ql.MaNV = nv.MaQuanLy" | Không làm theo | Đoạn phân biệt hai vai trò có mã cụ thể và đủ nghĩa, không cần tăng sửa ngoài mục tiêu. |
| 3.7-03 | L613: Cuối bài | Không làm theo | Đây là ranh giới chỉ một cấp, không phải hứa có bài cây quản lý; không tạo link sai. |

## Nhận xét hệ thống

- S1: một điều kiện truy cập dùng chung, xử lý bằng hai lối đã được người dùng chọn; không bỏ auth/không tạo sandbox mới.
- Kết quả có thật và SQL đã kiểm không đổi thành giả lập chỉ vì reviewer chưa chạy được. Kết quả 1.4 là dẫn chứng quan sát của bài khái niệm; các bài truy vấn và drawer có câu kiểm.
- Giữ 51 bài/URL và phép đối chiếu Excel, giải lần đầu đủ dùng, không tạo glossary mới hoặc yêu cầu khôi phục khung cũ.
- Giữ mọi cảnh báo an toàn ở nơi thao tác; không biến mỗi bài đầu thành hướng dẫn giao dịch/quyền.
- Giới thiệu: sửa lời “không dạy cài đặt” thành có hướng dẫn chuẩn bị, không đi sâu quản trị. Tám mảng và sáu level là hai cách phân loại đã giải thích, không mâu thuẫn.
- ERD font nhỏ có căn cứ (11,5px/canvas 820px ở viewport 1280px); giữ hình học đã duyệt, thêm bảng cặp cột và bỏ hình lặp ở 3.4/3.6. Không tuyên bố đã thiết kế lại sơ đồ.
- Kết quả kiểm/review mới, quyết định với findings và giới hạn công cụ được ghi trong README bàn giao, không sửa lịch sử báo cáo nguồn.

# Review tích hợp 1.1–1.5

## Phạm vi và bằng chứng

Ngày 31/10/2026. Codex, **kế thừa model của phiên**, không override. Góc học thử: chỉ biết Excel cơ bản, chưa SQL/lập trình. Công cụ thực tế: `functions.exec`/`exec_command`, PowerShell và Git chỉ đọc; chỉ ghi report này.

Đã đối chiếu base `740c5694f6f6fd337c93cee2f7e3d9f899344dcb` → head `eec184e97a90dbc47899082dbf9205f95592212a`; HEAD khớp, working tree sạch khi bắt đầu. Đọc AGENTS, quy ước/template/hồ sơ công ty, spec/plan, năm bài, phần giảng 2.1/2.2, bảy đề YAML tương ứng, Giới thiệu và các lời trỏ được giao. Có đọc năm report cùng hồ sơ xử lý; nhận xét dưới đây dựa trên nguồn cuối, không lấy kết luận cũ thay học thử.

HTML được giao thuộc build 21:43:06 giờ Việt Nam. Tôi tự đọc HTML năm bài, đối chiếu chữ sửa, số khối ôn, SVG ERD và anchor Giới thiệu. Thời gian file quan sát được 21:43:05–06; liên hệ build–commit còn dựa vào gói giao việc, không tự build lại.

**Bằng chứng tác giả:** logs cuối ghi 369 test/49 file đạt, check 0 lỗi/0 warning/3 hint, build 129 trang, dist 1951 link. `word-counts.json` ghi 692/608/665/620/622 từ, 3/3/4/4/3 câu ôn. `sql-results.json` có sáu kết quả SELECT; tôi chỉ đọc, không chạy hoặc xác nhận live. Browser/viewport/bàn phím trong verification là kiểm của tác giả.

## Mạch nội dung — Giữ được

- **1.1 → 1.2:** nguồn chung và “hợp lệ chưa chắc đúng” dẫn được tới bảng/dòng/cột. Tại 1.2:52, “thỏa các luật đã khai báo” thay đúng lời hứa chỉ cần đủ cột. Dòng 42–44 giới hạn ba hợp đồng vào riêng NV021, giữ đơn vị hồ sơ khác hợp đồng.
- **1.3 → 2.1/2.2:** bảng kiểu ở 1.3:34–39 vẫn giải nghĩa `p`, `s`, đọc được `decimal(4,1)` và `(18,0)`. Dòng 47–51 giữ cả ba kết quả chuyển kiểu; `N`, mã giữ số 0, `NULL`/`NOT NULL` vẫn có trước ôn. Vì vậy lời phân biệt alias với chuỗi ở 2.1:58 và lọc Unicode/ngày/chuyển kiểu ở 2.2:60–62 không mất tiền đề. Không cần khôi phục ví dụ tràn số/làm tròn.
- **1.4 → 1.5 → 3.4:** 1.4:30 nêu mã khác NULL, rồi riêng MaPB không nhận NULL; 1.5:38–41 đọc hai phía và không bắt phòng phải có người. Điều này nối đúng với giải thích 48 dòng ở 3.4:54. “Bảng được trỏ tới” bao gồm tự tham chiếu; không sinh mâu thuẫn mới.
- **ERD:** 1.5:24–30 đi từ hai bảng/cặp MaPB; HTML có đúng đường, chấm và nhãn `1`/`∞` mang `is-on`. Lời “Ở đường tô xanh” không áp chấm tròn cho tự tham chiếu. Ba bảng xuất hiện sau một-nhiều, vẫn giữ phòng hiện lưu và khóa cặp kỳ–mã (45–52). Câu ôn HopDong có tiền đề ở 1.2, hình ERD và cách đọc từng chặng, không dạy bù bằng đáp án.
- **Lời trỏ sau:** 2.7:77/203 còn Unicode và mã dạng chữ ở 1.3; 3.1:81 tự giải thích làm tròn và nhắc đúng p/s; 3.6:48 còn hai quan hệ trong ERD; 3.8:46 còn định nghĩa chuyển kiểu ngầm. Không thấy lời trỏ đòi phần vừa cắt. Các đoạn nhắc lại phục vụ ôn hoặc ứng dụng, chưa có lặp gây cần cắt thêm.

## Tiền đề thực hành nối sang 2.1/2.2

Đọc đề trước khi đối chiếu answer; không chép đáp án. Năm bài nền không có đề SQL; các câu ôn đã sửa đều dùng phần giảng trước đó.

| Đề | Tiền đề và nơi đã dạy | Thiếu |
|---|---|---|
| 2.1-1 | Bảng/cột ở 1.2; NULL và HopDong ở 1.3; FROM, dấu * ở 2.1 | Không thấy |
| 2.1-2 | Liệt kê hai cột, không lọc: 2.1:49–56 | Không thấy |
| 2.1-3 | Thứ tự cột theo SELECT: 2.1:50 | Không thấy |
| 2.1-4 | Tìm bảng/cột bằng ERD; AS/ngoặc vuông: 2.1:51–58; tự kiểm tiêu đề: 152 | Không thấy |
| 2.2-1 | Mã khác tên; WHERE bằng mã: 2.2:43–56 | Không thấy |
| 2.2-2 | N/Unicode: 1.3:39, nhắc tại 2.2:60; chọn cột khác điều kiện | Không thấy |
| 2.2-3 | >= gồm mốc, yyyymmdd và không tự có mốc cuối: 2.2:60–62 | Không thấy |

Giới thiệu:20–27 tách ba lối, chỉ web không cần SSMS, nói nơi nhận mã và hoàn tác. Bài 1.1:53/2.1:150 trỏ đúng anchor có trong HTML. Không có thay đổi component/ảnh/YAML/seed/API/editor/Giới thiệu trong diff; giữ thứ tự/frontmatter và 7 phút ước tính.

## Một nhận xét Biên tập, ưu tiên thấp

**`tests/content.test.ts:364,369`:** regex buộc “dòng tổng…thỏa…luật đã khai báo” và “MaPB không nhận NULL…hồ sơ nào cũng tìm được phòng” trên cùng dòng. Một cách viết tương đương như “MaPB là NOT NULL, nên mỗi hồ sơ có phòng hợp lệ” sẽ không khớp. Đây là độ cứng của bảo vệ nội dung, không phải lỗi kiến thức đang xuất bản. Theo quy ước 4.6, đề xuất tối thiểu: chuẩn hóa khoảng trắng/Markdown, kiểm các ý điều kiện trong cùng đoạn với vài cách diễn đạt tương đương; giữ kiểm phủ định phát biểu cũ. Không bỏ bảo vệ NULL/FK hoặc quan hệ hai bảng. Hai assertion bỏ `21.3`/“một-một” tương ứng nội dung được duyệt cắt; các giới hạn cốt lõi còn trong nguồn/test.

## Chưa kết luận và ngoài phạm vi

Không có finding Cần sửa/Cần làm rõ/Cần cắt đối với mạch bài. Chưa tự kiểm SQL, schema/ràng buộc thực, lỗi chuyển kiểu, browser/SSMS, chạy/nộp/lưu nháp, mobile/zoom hay thời lượng với người học thật. Riêng query `TRY_CONVERT` trong evidence trả NULL chỉ chứng minh không đổi được ngày, không phải bản ghi thông báo lỗi khi ghi; không coi đó là kiểm từ chối do tôi thực hiện. Không có nghi vấn kỹ thuật mới cần đoán từ nguồn.

Những luồng trên không đổi trong diff nên để ngoài lượt tích hợp này; tác giả giữ giới hạn đã ghi khi bàn giao. Đã đủ tiền đề nội dung cho bảy đề trên trong kiểm tĩnh; không suy ra học viên chắc chắn tự học được, không dùng kết luận này thay kiểm kỹ thuật hoặc quyền push/deploy.

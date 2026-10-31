# Chỉnh nhẹ năm bài Làm quen theo góc nhìn người dạy SQL

Ngày: 31/10/2026. Người làm khóa học đã chọn làm theo đề xuất chỉnh nhẹ trong chat: giữ năm bài và thứ tự; rút độ sâu 1.3, dẫn 1.5 từ hai bảng quen thuộc, sửa hai phát biểu thiếu điều kiện và thay chọn lọc câu tự kiểm tra. Đây là bản ghi phương án đã được chốt, không mở lại thiết kế chương.

Source bắt đầu: `740c5694f6f6fd337c93cee2f7e3d9f899344dcb`, working tree sạch. Nhánh thực hiện: `codex/refine-foundation-lessons`.

## Mục đích và giới hạn

Người chỉ biết Excel cơ bản đọc được cấu trúc dữ liệu trước khi vào SELECT; phần nền giúp giải thích mỗi dòng và quan hệ giữa các bảng mà không tăng số thuật ngữ phải nhớ. Giữ quy ước bài nền ở mục 2.5: noScenario/noExercises, 7 phút ước tính, khoảng 500–700 từ và tối đa 800, ít nhất ba câu tự kiểm tra sau Ghi nhớ. Quy ước/template hiện hành thắng các thiết kế lịch sử.

Phạm vi là năm MDX 1.1–1.5, test bảo vệ kiến thức liên quan và hồ sơ kiểm/review. Giữ số bài, slug, prerequisite, ảnh và component hiện có, YAML, seed, API, editor, trang Giới thiệu. Không thêm bài, không đưa cú pháp truy vấn vào bài nền, không chuyển hàng loạt bài khác. Không push/deploy.

## Các hướng đã cân nhắc

| Hướng | Được và mất | Quyết định |
|---|---|---|
| Giữ năm bài, chỉnh độ sâu và câu tự kiểm tra | Giữ mạch đã duyệt và các tiền đề; thay đổi tập trung | Người dùng chọn đề xuất này |
| Rút chương hoặc đổi thứ tự để vào SELECT sớm hơn | Ít thời gian đọc ban đầu nhưng đổi mạch và lời trỏ nhiều bài | Không triển khai trong lượt này |
| Thêm loại dữ liệu, chuẩn hóa, cú pháp hoặc bài mới | Tăng phạm vi nền nhưng tăng tải trước thực hành | Không cần cho mục tiêu hiện tại |

## Nội dung cụ thể

- **1.1:** giữ bốn tên, nguồn chung và hợp lệ chưa chắc đúng; gọn ví dụ luật dữ liệu. Thay một câu tự kiểm tra bằng suy luận từ việc đóng SSMS, dùng tiền đề đã giảng.
- **1.2:** làm rõ mỗi dòng đại diện cho gì, cùng MaNV trong nhiều hợp đồng không phải nhiều hồ sơ nhân viên; dùng NV021 đã có trong bài. Câu dòng tổng đổi thành điều kiện thỏa các luật đã khai báo. Thay một câu tự kiểm tra bằng đọc số dòng ở hai bảng.
- **1.3:** giữ bốn kiểu hiện có, cách đọc decimal(p,s) đủ để đọc nhãn, NULL/NOT NULL, mã giữ số 0, N cho Unicode, ba kết quả chuyển kiểu và ngày bị đọc khác ý. Bỏ ví dụ làm tròn/tràn số và giới hạn 999.9; phần này để bài tính toán/ghi dữ liệu đi sâu, không tự mở sửa bài sau. Thay câu tự kiểm tra kể lại chuyển kiểu bằng dự đoán trên ví dụ ngày đã giảng.
- **1.4:** thêm điều kiện MaPB không nhận NULL để kết luận mọi hồ sơ có phòng; giữ PK/FK, mã hợp lệ khác đúng nghiệp vụ, tự tham chiếu ở mức nhận diện. Rút giải thích xóa phòng thành một vế. Thay câu hỏi lặp mã KT/KD bằng phân biệt hai hồ sơ trùng mã với nhiều hồ sơ cùng mã phòng, dùng luật đã giảng.
- **1.5:** mở bằng NhanVien → PhongBan và mã KT; đổi path của chính sơ đồ hiện có sang hai bảng này. Giảng đọc cặp cột và một-nhiều trước; sau đó mở rộng bằng lời/bảng ngắn sang BangLuong → NhanVien → PhongBan. Giữ một câu đọc khóa nhiều cột vì sơ đồ đầy đủ vẫn hiện các nhãn PK/FK; bỏ lặp phân tích kỳ lương trong Hay nhầm. Giữ giới hạn phòng hiện lưu, quan hệ không bắt phía một phải có dòng con, số dòng khi đi từ một sang nhiều và quy tắc không ghi sơ đồ vào database chung. Giữ câu tự kiểm tra tìm đường từ HopDong để đo chuyển giao.

Không cắt phần giải thích chỉ để đạt số từ; không kéo dài câu ôn để dạy bù. Những lựa chọn câu chữ và câu ôn cụ thể do người viết xử lý trong các giới hạn trên.

## Kiểm và review

Không thêm câu SQL chạy được hoặc số liệu nguồn mới; mọi dẫn chứng thay đổi được kiểm lại bằng SELECT khi có kết nối. Không có tool azure-sql thì dùng kết nối local hiện có, không in secret. Không chạy câu ghi hoặc runner vì năm bài không có bài tập và YAML/API không đổi. Ghi riêng phần chưa kiểm khi môi trường thiếu.

Chạy npm test/check/build/check:dist; xem năm trang build và hình/Ssms/Erd, đánh dấu, câu ôn. Năm reviewer mới theo quy ước 4.5, model kế thừa và ngữ cảnh mới, mỗi agent chỉ ghi report được giao, không DB/secret/SQL. Sau đó reviewer tích hợp mới kiểm mạch 1.1–1.5 → 2.1/2.2 và lời trỏ từ các bài sau. Đọc hết report trước sửa; ma trận Làm theo/Làm một phần/Không làm theo giữ cả mục nhỏ, kết quả và giới hạn thật. Không dùng review tĩnh thay bằng chứng SQL/UI.

## Trạng thái

- Đã sửa năm bài và test bảo vệ ba điều kiện; không đổi phạm vi. Sáu SELECT-only kiểm lại dẫn chứng đạt. Số từ theo proseParagraphs lần lượt 690/603/665/618/618, đoạn dài nhất 88 từ; số câu ôn 3/3/4/4/3.
- Kiểm vòng đầu: 369 test đạt, check 0 lỗi/0 warning và 3 hint deprecated nền; build 129 trang, check:dist 1951 link. Đang kiểm UI và review độc lập.

### Điều chỉnh sau review từng bài

- 1.1: làm theo nhận xét về độ phủ mục tiêu, thêm một vế về lợi ích nguồn chung vào câu ôn1/đáp án; giữ ba câu và câu suy luận đóng SSMS. Cắt câu về người không viết SQL để bù độ dài, không mất tiền đề.
- 1.2: làm theo hai nhận xét, câu ôn2 hỏi đúng dấu dòng/cột trên hình thay lựa chọn giá trị mã thuộc dòng hay cột; nói rõ ba dòng HopDong là riêng NV021.
- 1.3: reviewer không có finding cần sửa; giữ nguyên source đã kiểm.
- 1.4: làm theo nhận xét diễn đạt đích khóa ngoại: “bảng kia” thành “bảng được trỏ tới”, tiêu đề thành “Khóa ngoại giữ mã tham chiếu có thật”, để định nghĩa bao gồm ví dụ tự tham chiếu đã có.
- 1.5: làm một phần nhận xét chấm tròn: giới hạn lời mô tả vào đường tô xanh NhanVien→PhongBan, nơi dấu này thực sự có, thay vì bỏ dấu nhận diện; không áp lời đó cho đường tự tham chiếu MaQuanLy không có chấm tròn.

### Kiểm sau sửa

Đã đọc đủ năm report và xử lý các mục có căn cứ. Vòng2 vẫn đạt 369 test, check 0 lỗi/0 warning/3 hint nền, build 129 trang, check:dist 1951 link. Số từ cuối 692/608/665/620/622, giữ 3/3/4/4/3 câu ôn. Browser đã mở năm bài; kiểm desktop 1280×900 và 1024×900 trên các hình/khối liên quan, mở câu ôn bằng bàn phím; sau build21:43 kiểm lại riêng chữ sửa ở1.1/1.2/1.4/1.5. Đang review tích hợp; hồ sơ ở `docs/reviews/2026-10-31-foundation-teaching-refinement/verification.md`.

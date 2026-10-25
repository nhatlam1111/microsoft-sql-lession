# Hợp đồng tương tác của màn bài tập

Được duyệt cùng thiết kế SSMS workspace ngày 25/10/2026. Áp dụng cho các trang bài tập; nội dung bài, URL và cách chấm theo dữ liệu vẫn giữ như hiện tại. Màu, font, khoảng cách và runtime token theo `DESIGN.md` và `src/styles/tokens.css`.

## Owner dùng chung

| Khả năng | Owner | Quy tắc chính | Bằng chứng cần có |
|---|---|---|---|
| Nhập SQL và gợi ý | SqlEditor / CodeMirror MSSQL | Một document, Tab bốn cột, undo/IME, gợi ý từ schema | Test completion/state và browser |
| Điều phối chạy/chấm/xem bảng | ExerciseWorkspace và controller | Một thao tác DB đang chạy; revision và request identity | Fake deferred client + browser |
| Bảng chỉ đọc | Grid React của workspace, CSS Results hiện có | Giữ kiểu NULL, cuộn trong khung, không giả sort/edit | Test dữ liệu và browser |
| Tab và splitter | Workspace | Tab bàn phím; resize pointer/keyboard | Browser focus và kích thước |
| Nhập mã truy cập | Form workspace | Mask mặc định, reveal có nhãn, không có mã trong URL/log | Test auth và browser |
| Sơ đồ | DbDiagramDialog hiện có | Focus trap, Escape, trả focus về nút mở | Browser và test modal |
| Lưu nháp | exercise-storage | Khóa cũ, phân biệt không có với chuỗi rỗng, lỗi lưu không mất text | Test storage + reload |
| Thông báo | Status/alert nội tuyến của workspace | Phân biệt đang chờ, lỗi, kết quả cũ, đúng/sai | Test state và browser |
| Cuộn và lớp nổi | CSS global + giới hạn trong workspace | Không giấu scrollbar; completion dưới modal, không bị cắt | Computed style và browser |

## Chạy thử và nộp bài

1. Trang mới khôi phục nháp, giữ Nộp bài chưa khả dụng. Placeholder là hướng dẫn ngoài câu SQL, không tự thêm comment.
2. Chạy thử dùng toàn bộ document, kiểm guard trước khi gửi. Trong lúc chờ vẫn gõ được; toolbar chặn kích hoạt thao tác DB thứ hai.
3. Ghi snapshot SQL và revision của lần chạy. Chỉ kết quả thành công, không lỗi SQL của đúng revision mới cấp quyền nộp. Kết quả không có dòng vẫn là chạy thành công.
4. Mọi sửa document, kể cả undo về text cũ, hủy quyền nộp. Lần chạy mới cũng hủy quyền cũ trước khi chờ kết quả. Reload hoặc đổi mã yêu cầu chạy lại.
5. Phản hồi cũ được ghi rõ là của bản trước; không cấp quyền nộp hoặc gán điểm cho bản đang viết. Preview không thay thế kết quả chạy/chấm.
6. Nộp gọi `/grade` như hiện tại, vẫn được hoàn tác. Chỉ kết quả chấm đúng được ghi tiến độ hoàn thành; Chạy thử và xem bảng không ghi điểm.

Nút Nộp bị khóa có lý do hiển thị ngay cạnh thao tác, không chỉ giải thích bằng tooltip.

## Dữ liệu và cấu trúc bảng

- Explorer dùng đúng bảy bảng của bộ mẫu, metadata chung với sơ đồ. Tên bảng/cột, kiểu, NULL, PK/FK không lấy từ đáp án.
- Xem cấu trúc hoặc mở sơ đồ không cần mã, không thực thi SQL. Dữ liệu trực tiếp yêu cầu mã truy cập và chỉ tải sau khi chọn xem.
- API chỉ chấp nhận tên bảng trong whitelist cùng số trang hợp lệ; server tự chọn cột, thứ tự đầy đủ khóa chính và đọc tối đa 51 dòng để trả 50 dòng cùng `hasMore`.
- Hiển thị khoảng dòng và Trước/Sau/Làm mới; không giả tổng số dòng. Không chỉnh ô, tự lọc/sort hoặc xuất file trong vòng này.
- Giữ riêng selected table/page/cache với document, run result và verdict. Cache chỉ trong phiên, xóa khi đổi mã; Làm mới đọc lại trang hiện tại.
- Cancel hoặc đổi bảng phải bỏ phản hồi không còn đúng request. Abort phía client không được mô tả là bảo đảm đã dừng câu SQL tại server.
- Bảng xem nhanh là dữ liệu nguồn sau khi các thao tác mô phỏng đã được hoàn tác, không phải phần sửa tạm của lần chạy trước.

## Editor và khả năng truy cập

- Gợi ý từ khóa, bảng và cột; dùng Ctrl+Space, mũi tên, Enter, Escape theo editor. Không cung cấp đáp án hoặc gợi ý các lệnh bị cấm. Gợi ý không khẳng định câu SQL đã hợp lệ.
- F5/Ctrl+Enter chạy toàn document; Tab bốn cột, Shift+Tab giảm lề, Escape rồi Tab rời editor. Các phím workspace không kích hoạt xuyên modal hoặc trong lúc IME đang ghép chữ.
- Trước khi React mount, route có khung chờ tĩnh với textarea/toolbar disabled và hướng dẫn tải lại hoặc SSMS riêng; không hứa nhập/chạy SQL bằng HTML server. Sau React mount, textarea dự phòng có nhãn/placeholder và nhập/chạy được khi chunk CM lỗi.
- Nếu học viên đã nhập hoặc bắt đầu composition trong textarea trước khi chunk sẵn sàng, giữ nguyên ô này suốt phiên trang để giữ undo/IME; hint nói rõ tải lại để dùng gợi ý. Ô chưa dùng được nâng cấp sang CM với selection/focus hiện tại. Không ghi đè nháp khi mount hoặc chuyển editor.
- Khi mở modal, focus ở modal; đóng bằng nút/Escape trả về trigger. Completion không che modal hoặc tạo bẫy focus. Tab kết quả có role/selected/panel và thao tác mũi tên/Home/End đúng nghĩa.
- Splitter hỗ trợ kéo cùng bàn phím, giới hạn editor/result tối thiểu 180/160px. Khung tối thiểu 560px; trên màn thấp cuộn trang vẫn tới được mọi thao tác.

## Auth, lỗi và khôi phục

- Mã đi qua header hiện có; giữ storage key hiện tại, không đưa mã vào URL, log hoặc nội dung lỗi. Form mask mặc định và có nút xem/ẩn có nhãn.
- Sai mã xóa quyền dùng mã/cache/quyền nộp của phiên, giữ nháp. Nhập mã khác không tự nộp bằng quyền Execute của mã cũ; cần chạy lại.
- Mất mạng, timeout, rate limit, quota và server error là trạng thái riêng, có lời hướng dẫn thử lại; giữ text và bố cục khung ổn định.
- Không thể lưu trình duyệt thì báo nháp chỉ còn trong phiên; không tự xóa text, không báo đã lưu thành công khi storage thất bại.
- Không xóa được mã khỏi storage thì cảnh báo riêng rằng reload có thể lấy lại mã cũ; auth/cache/permit trong bộ nhớ vẫn xóa và nháp còn nguyên.
- Client guard là phản hồi sớm; server vẫn kiểm độc lập. Transaction thật không thuộc quyền học viên: COMMIT/ROLLBACK/BEGIN TRAN/SAVE bị chặn, kể cả gọi API trực tiếp. Chữ trong literal/comment/quoted identifier không phải lệnh.
- Runner giữ giới hạn hiện tại và `finally` rollback. Không giữ transaction giữa các HTTP call và không có nút commit dữ liệu gốc.

## Nghiệm thu

Kiểm 1280/1440/1920px, màn thấp, bảng rộng, draft/reload/undo/IME, keyboard, modal và reduced motion. Giữ phạm vi desktop từ 1280px và notice dưới 1024px của khóa học. Xác minh API bằng fake deps cho lệnh cấm, SELECT chỉ đọc cho preview, 63 đáp án qua runner luôn hoàn tác và check:data. Review mới về UI, security và tích hợp phải ghi riêng source/HTML/browser/live SQL cùng giới hạn; bản local dùng frontend/API cùng phiên bản.

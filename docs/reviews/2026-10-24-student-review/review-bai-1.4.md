# Review độc lập bài 1.4 — lượt sửa theo kiểm thử học viên

- Ngày: 24/10/2026.
- Bài: `src/content/lessons/1-4-khoa-chinh-khoa-ngoai.mdx`.
- Vai review: Business Consultant khó tính, học để chuyển sang BA hoặc PM; chỉ dùng bài này, bài trước và tài liệu nội bộ được phép đọc để hiểu.
- Công cụ/model: Codex, kế thừa model của phiên; đọc MDX và HTML đã build bằng công cụ đọc tệp. Không kiểm tương tác trình duyệt.

**Kết luận:** chưa thấy lỗi nội dung cần sửa hoặc thiếu kiến thức làm người mới không giải được tình huống. Lời giải đã phân biệt điều khóa ngoại chặn với quyết định chuyển phòng của nghiệp vụ. Câu `DELETE` được dùng đúng vai trò chứng cứ đọc lỗi, có `copy={false}` và lời cấm chạy trên nguồn chung. Có một đề nghị biên tập nhỏ về thuật ngữ `dropdown`.

## Rà theo thứ tự bài

### 1. Tình huống và giả định — Giữ được

**Câu gốc:** “đây là phương án gộp phòng riêng của bài, dữ liệu mẫu vẫn như ban đầu” (dòng 25).

Giả định khép phạm vi rõ: việc gộp thuộc tình huống học, không làm bài sau phải coi `VH` đã bị xóa. Chị Hạnh hỏi nguyên nhân bị chặn; người học không bị giao nhiệm vụ tự sửa dữ liệu. Chỉ dẫn xin IT nguyên văn lỗi giúp nối từ lỗi chung của phần mềm tới chứng cứ sắp đọc.

**Tự hỏi:** Tại sao bài trước còn sáu phòng mà ở đây đã gộp? **Bài đã trả lời** bằng giả định riêng; khớp hồ sơ công ty mục 7.

**Đề xuất:** giữ.

### 2. Khóa chính — Giữ được

**Câu gốc:** “khi `NhanVien.MaNV` được khai báo là khóa chính…” (dòng 33); “Chỉ cả cặp không được trùng; riêng `MaNV` vẫn lặp…” (dòng 37).

Định nghĩa có điều kiện khai báo, ví dụ `NV001` đứng ngay cạnh lý do dùng mã thay họ tên. Hai cặp khóa ở `ChamCong`, `BangLuong` giải thích được vì sao một mã nhân viên lặp mà không vi phạm. Cách nói “tối đa một dòng” không hứa mỗi ngày/kỳ nhất thiết phải có dữ liệu. Phần Hay nhầm sau đó bổ sung đúng giới hạn: khóa chính không nhận ra cùng một người có hai mã.

**Tự hỏi:** Dùng mã để làm gì khi đã có họ tên? **Bài đã trả lời:** tên có thể trùng hoặc thay đổi, mã xác định hồ sơ được bảng khác nhắc tới. Vì sao không dùng riêng `MaNV` làm khóa cho chấm công? **Bài đã trả lời:** cần phân biệt cả ngày.

**Đề xuất:** giữ; không cần thêm cú pháp khai báo khóa ở bài này.

### 3. Khóa ngoại — một chỗ Biên tập nhỏ, phần còn lại Giữ được

**Câu gốc cần biên tập:** “Data Validation dạng List, tức dropdown lấy từ sheet danh mục” (dòng 41).

`Data Validation` đã được bài 1.3 giải nghĩa là giới hạn dữ liệu nhập, nhưng `dropdown` xuất hiện ở đây mà chưa có lời Việt. Người không quen tên thành phần giao diện vẫn phải tự suy ra hình thức chọn mã; hình hiện ô nhập sai, không hiện danh sách đang mở.

**Đề xuất ngắn:** đổi thành “Data Validation dạng List, tức danh sách chọn lấy từ sheet danh mục”. Chỉ thay từ, không thêm đoạn hay hình. Đây là biên tập mức thấp, không chặn việc học.

**Các câu giữ được:** “mã khác `NULL` phải trỏ tới một giá trị khóa có thật” (dòng 50); “còn hồ sơ trỏ tới `VH` thì không xóa hoặc đổi mã `VH`…” (dòng 52).

Ví dụ `KT`/`KT01` phân biệt mã được nhận và mã bị từ chối; `NO ACTION` được giải thích ngay bằng hậu quả trong tình huống. Bài nói rõ khóa ngoại là luật kiểm khi ghi, không phải ô chọn; trường hợp nạp hàng loạt chỉ dùng một vế và trỏ bài 5.5. Ví dụ quản lý là nhân viên giúp hiểu quan hệ trỏ về cùng bảng, còn hình SSMS chỉ đúng bốn cột trọng tâm.

**Tự hỏi:** Vì sao một mã phòng được dùng nhiều lần vẫn hợp lệ? **Bài đã trả lời:** danh mục có một dòng mỗi mã, nhiều hồ sơ cùng tham chiếu. Có khóa ngoại thì cột có bắt buộc nhập không? **Bài đã trả lời** qua `MaQuanLy`, `NULL`, `NOT NULL` trong Hay nhầm và tự kiểm tra. Khóa ngoại có bảo đảm gán đúng người/phòng không? **Bài đã trả lời:** ví dụ gán nhầm `KD` cho người thuộc `KT` vẫn hợp lệ.

**Đối chiếu HTML:** ô `C4` mang `Van hanh` có cả lớp chọn và tô; phần thông tin khóa của `MaNV`, `MaPB`, `MaCD`, `MaQuanLy` có lớp đánh dấu. Nội dung chú thích khớp tên cột và khả năng nhận `NULL`. Đây là đối chiếu cấu trúc HTML, chưa phải kiểm màu/khung bằng trình duyệt.

### 4. Đọc lỗi xóa phòng — Giữ được

**Câu gốc:** “chỉ để đọc, không chạy trong SSMS trên database khóa học” (dòng 62); `<Sql copy={false} …>` (dòng 64).

Lời nhắc đặt ngay trước câu xóa, chỉ rõ câu là thao tác IT đã thử. Bài nhắc phạm vi hoàn tác của trang bài tập, nên không dựa vào việc câu hiện đang bị khóa ngoại chặn để coi nó an toàn. HTML có câu `DELETE` và phần lỗi, không có nút sao chép trong đầu khối SQL này. Không cần đưa thêm SQL preview hoặc cho người học chạy lại câu xóa để chứng minh.

**Câu gốc:** “Thông báo không liệt kê các hồ sơ đó, nên cần kiểm dữ liệu liên quan” (dòng 70).

Bài giải nghĩa `REFERENCE constraint` và chỉ ra đúng ba dấu vết để tìm: tên ràng buộc, bảng, cột. Bảng 10 hồ sơ là dẫn chứng riêng sau lỗi, không bị nói thành nội dung do lỗi liệt kê. Phạm vi đã ghi là dữ liệu mẫu ban đầu có `MaPB = VH`; tổng 10, gồm 8 đang làm và 2 đã nghỉ, khớp hồ sơ công ty. Trong HTML, hai dòng có lớp tô là dòng 7 `NV033` và dòng 9 `NV041`, đúng lời dẫn và ngày nghỉ.

**Tự hỏi:** Tại sao người đã nghỉ vẫn làm lỗi xóa xảy ra? **Bài đã trả lời:** hồ sơ vẫn tham chiếu; khóa ngoại không xét trạng thái làm việc. Chỉ từ thông báo lỗi có biết đủ 10 hồ sơ không? **Bài đã trả lời:** không, phải kiểm dữ liệu liên quan.

**Đề xuất:** giữ. Số liệu và nguyên văn thông báo lỗi chưa được tôi xác minh trên database; chỉ xác nhận chúng nhất quán trong các nguồn được phép đọc.

### 5. Chốt cách xử lý — Giữ được

**Câu gốc:** “Lỗi này chưa quyết định phải chuyển tất cả sang Kinh doanh” (dòng 91); “Nếu quyết định cuối là xóa, người có quyền phải xử lý hết các dòng đang tham chiếu rồi mới xóa danh mục” (dòng 97).

Đây là lời giải đủ cho câu hỏi “sao không xóa được”: database bảo vệ liên kết, còn chuyển ai và khi nào cần quyết định nghiệp vụ. Ba điểm chốt không bỏ qua người đã nghỉ, báo cáo kỳ trước hoặc phương án ngừng dùng mã. Điều kiện chưa có cột đánh dấu ngừng dùng ngăn người học tưởng đây là khả năng sẵn có của bộ mẫu. Giới hạn phòng hiện tại và bản xuất không tự đổi nối đúng với bài 1.1–1.2.

Lời nhắc chuyển phòng không tự đổi quản lý/chức danh là giới hạn có ích của việc “lưu được”, không mở thành một bài cập nhật dữ liệu. Câu cấm xóa hồ sơ/tắt khóa chỉ để hết lỗi giúp chặn lối giải làm mất ý nghĩa dữ liệu. Các bài sâu được dẫn sau đó.

**Tự hỏi:** Hết lỗi có đồng nghĩa gộp phòng đã đúng nghiệp vụ? **Bài đã trả lời:** không; cần chốt người chuyển, hiệu lực và lịch sử. Nếu xóa là quyết định cuối thì điều kiện kỹ thuật là gì? **Bài đã trả lời:** xử lý hết dòng tham chiếu trước. Có thể chỉ chuyển 8 người đang làm rồi xóa ngay không? **Bài đã trả lời:** còn hai hồ sơ đã nghỉ vẫn cản xóa.

**Đề xuất:** giữ. Không cần buộc bài khái niệm cung cấp câu `UPDATE`/`DELETE` thực hiện phương án cuối.

### 6. Hay nhầm, Ứng dụng, Ghi nhớ, tự kiểm tra — Giữ được

**Câu gốc đại diện:** “Tìm nguyên nhân thao tác bị chặn: đọc tên ràng buộc, bảng và cột trong lỗi…” (dòng 117); câu tự kiểm tra “Lỗi xóa `VH` có bắt buộc chuyển cả 10 hồ sơ sang Kinh doanh không?” (dòng 154).

Ba lỗi nhầm có hậu quả/giới hạn cụ thể, không thành lời khuyên chung. Ba ứng dụng đúng chủ đề khóa và đều dựa trên phần đã giảng. Năm câu tự kiểm tra đứng sau Ghi nhớ, bao phủ phân biệt khóa chính/khóa ngoại, khóa nhiều cột, `NULL`, quyết định nghiệp vụ và đọc lỗi. Đáp án không đòi người học biết thêm cú pháp chưa học. Không có bài tập YAML tương ứng; MDX khai báo `noExercises: true` phù hợp.

Các khái niệm trọng tâm được in đậm có chọn lọc; mã, tên bảng/cột, ô và ví dụ dữ liệu trong lời văn dùng code. Bốn tiểu mục chính đi từ mã hồ sơ đến quan hệ rồi tới lỗi và cách xử lý. Với phần tự kiểm tra, mức 15 phút không thấy thiếu thực tế rõ rệt từ việc đọc nguồn; chưa đo thời gian học của một người mới thực tế. Không thấy đoạn dài/lặp cần cắt bắt buộc ngoài các phần ôn được phép nhắc lại.

**Tự hỏi:** Học xong có thể tự giải thích lỗi cho chị Hạnh mà không biết cú pháp xóa không? **Bài đã trả lời đủ:** có, bằng tên ràng buộc, các dòng tham chiếu và quyết định cần chốt.

**Đề xuất:** giữ.

## Ưu tiên và giới hạn

1. Không có mục Cần sửa/Cần làm rõ chặn duyệt trong phạm vi review này.
2. Biên tập mức thấp: thay `dropdown` bằng “danh sách chọn” ở dòng 41; không cần tăng độ dài bài.

**Nguồn đối chiếu:** `AGENTS.md`; `docs/quy-uoc.md` (đặc biệt mục 1–4.5); `docs/lesson-template.md`; `docs/ho-so-cong-ty.md`; toàn văn bài 1.1, 1.2, 1.3, 1.4; phần nội dung bài 1.4 trong `dist/bai/1-4-khoa-chinh-khoa-ngoai/index.html`; danh sách tên tệp bài/bài tập liên quan.

**Giới hạn thực tế:** không đọc seed, `.env`, review cũ hay báo cáo kiểm thử gốc; không tra tài liệu SQL bên ngoài; không kết nối/chạy database. Không chạy test/build, vì nhiệm vụ chỉ review trên bản build đã được cập nhật trước dispatch. Chưa xác minh số liệu live, nguyên văn lỗi từ lần chạy thật, thao tác trình duyệt, sao chép hay bố cục thị giác. HTML chỉ cho phép xác nhận văn bản, cấu trúc đánh dấu và không có nút sao chép ở khối xóa; không được coi là đã kiểm tương tác.

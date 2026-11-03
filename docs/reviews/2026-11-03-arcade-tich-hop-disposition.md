# Xử lý review tích hợp SQL Arcade

- Report gốc: [review tích hợp](2026-11-03-arcade-tich-hop-review.md), review tại commit `3dbcf86`, Claude Sonnet, effort high. Reviewer không chạy database, API hay trình duyệt.
- Kiểm của tác giả: các phần reviewer ghi "chưa kiểm được" được chạy thật, kết quả ở [ghi chú bàn giao](2026-11-03-arcade-mvp-ban-giao.md).

| Nhận xét | Quyết định | Căn cứ và kết quả |
|---|---|---|
| I1 Lần nộp đúng ghi trước khi trả thưởng | Làm theo | `Store.submit` gộp ghi lần nộp, ghi hoàn thành và cộng coin vào một transaction. Có test lỗi giữa chừng không để lại gì. `check:arcade:store` kiểm trên database thật: hai lần nộp đúng cùng lúc chỉ trả thưởng một lần |
| M1 Số coin trả về lệch khi hai tab | Làm theo | `submit` trả số dư sau khi ghi; `handleOpen` đọc lại số dư sau khi mở. Có test cho cả hai |
| M2 Lỗi hạ tầng có mã SQL bị tính là sai | Làm theo | `isTransientSqlError` với 1205, 10928, 10929, 40501, 40613; đường Arcade trả `unavailable`, đường bài tập cũ giữ nguyên. Lô `SET` đầu đi qua cùng nhánh này. Chưa gây được lỗi thật, chỉ kiểm bằng test |
| M3 "limit" bị coi là hết quota | Làm một phần | Đường Arcade chỉ còn khớp `free`. Đường bài tập cũ (`runner.ts`, `core.ts`) giữ nguyên vì ngoài phạm vi nhánh này |
| M4 Không chặn `DECLARE … CURSOR` | Làm theo | `guardArcade` từ chối `declare`, `cursor`, đáp án 50 bài không dùng; `open` không chặn vì cả hai từ trên đã đủ. Có test, và thử trên trình duyệt |
| M5 Kết quả cũ sau khi sửa câu | Làm theo | Sửa câu lệnh thì xóa câu kết luận, kết quả cũ có ghi chú; thử trên trình duyệt |
| M5 Lỗi `locked` không tắt nút | Làm theo | Phản hồi `locked` đặt `unlocked = false`; thử trên trình duyệt bằng phản hồi thật của API |
| M5 Bản đồ như tiến độ 0 khi lỗi tải | Làm theo | Có mã mà chưa đọc được tiến độ thì không vẽ bản đồ; thử trên trình duyệt |
| M5 Lần tải đầu thất bại không có nút thử lại | Không làm theo | Reviewer đánh giá chấp nhận được cho MVP; tải lại trang là đủ. Ghi trong bàn giao |
| M5 Hai nút bật khi `state` còn `null` | Không làm theo | Bấm sớm vẫn được server kiểm, không gây hại |
| M6 `check:dist` không quét số | Làm theo | Chú thích trong `scripts/check-dist.mjs` nói rõ đây là lớp thứ hai |
| M7 Gợi ý `DATEDIFF` ở `sinh-nhat-thang-sau` | Không làm theo | Đơn vị `month` không được dạy riêng nên đề phải nói; bỏ gợi ý làm bài thành không công bằng. Ghi trong bàn giao |
| M7 Hai cặp bài giống ý nghiệp vụ, `NhanSu` lặp 14 bài | Không làm theo | Quy ước cho phép, bài sau thêm `CASE`; chưa có người làm thử để chỉnh theo cảm nhận |
| M7 Câu về `ordered: true` trong quy ước | Làm theo | `docs/quy-uoc.md` thêm "hoặc đề nói rõ giá trị dùng để xếp không trùng" |
| M8 README, spec, bước kiểm sau deploy | Làm theo | Bảng Deploy có đường dẫn mới; An toàn dữ liệu có `SELECT`/`WITH` và 5 giây; spec sửa tên `publicChallenge`; workflow gọi `arcade/me` không mã và đòi 401 |
| M8 Biến `ARCADE_*`, hồ sơ thử trong database | Để người làm khóa học quyết | Cần thao tác trên Azure và database dùng thật, ghi trong bàn giao |

# Bàn giao SQL Arcade MVP

Nhánh `feat/arcade-mvp`, PR tới `main`. Chưa merge, chưa deploy. Push `main` sẽ tự deploy cả web lẫn API.

## Đã làm

- Trang **Luyện SQL** (`/luyen-sql/`): bản đồ 50 bài cấp Cơ bản, 9 chương, mở tuần tự. Mỗi bài có đề, lược đồ bảng, 2 unit test công khai và 3 hoặc 4 hidden test.
- Coin: 20 coin khởi đầu, thưởng 10/20/30 theo độ khó, mở hidden test giá 10 coin. Tiến độ lưu theo mã truy cập, sang máy khác vẫn còn.
- Database riêng `arcade` trên server `sql-lession`, gói miễn phí. `arcade_runner` chạy câu học viên trong transaction luôn hoàn tác, `arcade_store` lưu coin. `HRM_Demo` không bị đụng tới.
- Cổng chất lượng `check:arcade`: đáp án khớp kết quả, mỗi câu sai điển hình qua unit test và trượt đúng hidden test của nó, `dbo` rỗng trước và sau.
- Review: 9 chương theo cặp và một review tích hợp toàn nhánh, cùng hồ sơ xử lý ở `docs/reviews/2026-11-03-arcade-*`.

Cách vận hành và thêm bài nằm ở `README.md`, `docs/quy-uoc.md` mục 2.8. Thiết kế ở `docs/superpowers/specs/2026-11-03-sql-arcade-mvp-design.md`, mục 15 là hiện trạng.

## Kết quả kiểm trên bản cuối

| Kiểm | Kết quả |
|---|---|
| `npm test` | 67 file, 561 test đạt |
| `npm run check`, `npm --prefix api run typecheck` | Không lỗi |
| `npm run build`, `npm run check:dist` | Đạt, 190 trang, 3.544 link, không lộ đáp án |
| `check:arcade` trên database `arcade` | 50/50 bài đạt, `dbo` rỗng trước và sau |
| `check:arcade:store` | Đạt: hai lần nộp đúng cùng lúc chỉ thưởng một lần, mở test thiếu coin không bị trừ |
| `check:exercises`, `check:data` trên database bài học | Đạt, không bảng nào lệch |
| Đi trọn 50 bài qua API bằng mã mới | 50/50 được nhận, thưởng 900, còn 920 coin; nộp bài 2 trước bài 1 bị từ chối |
| Trình duyệt, phần sửa cuối | Đạt: bản đồ theo tiến độ và khi lỗi tải, nộp sai và đúng, cộng coin, mở test 10 coin, tải lại không trừ thêm, ghi chú kết quả cũ, chặn con trỏ, phản hồi `locked` tắt nút, dấu cách hiện được |
| Trình duyệt, đủ 9 kịch bản mục 10 của spec | Đạt ở lượt trước review tích hợp, gồm trang bài tập cũ, máy thứ hai cùng mã, bàn phím và rộng 390 px. Lượt cuối không chạy lại những phần không đổi |

Chưa kiểm được: tốc độ thật trên Azure, CORS của Function App cho header `x-access-code` trên đầu gọi GET mới, và lỗi hạ tầng thật (mã 40501, 40613…) mới chỉ kiểm bằng test giả lập.

## Cần làm trước khi merge

1. Đặt năm biến trên Function App: `ARCADE_SQL_DATABASE` (`arcade`), `ARCADE_RUNNER_USER`, `ARCADE_RUNNER_PASSWORD`, `ARCADE_STORE_USER`, `ARCADE_STORE_PASSWORD`. Thiếu thì trang Luyện SQL vẫn lên web nhưng mọi lần gọi trả 503. Bài tập cũ không bị ảnh hưởng.
2. Nên đổi mật khẩu cho `arcade_runner` và `arcade_store` thành hai mật khẩu khác nhau: hiện hai user dùng chung một mật khẩu.
3. Nếu muốn database sạch cho học viên: dọn hồ sơ thử bằng tài khoản admin, vì `arcade_store` không có quyền xóa. Các mã thử chỉ có trên máy phát triển nên không ai vào được từ web, hồ sơ chỉ nằm yên trong bảng.

## Kiểm sau khi deploy

1. Workflow đã tự gọi `/api/arcade/me` không mã và đòi 401.
2. Làm một bài trên web thật bằng mã của học viên hoặc mã thử. Xem thời gian nộp năm test: đây là con số tốc độ thật đầu tiên, số 1,09 giây một vòng trong spec đo từ máy phát triển.
3. `npm --prefix api run check:data`: mong đợi không bảng nào lệch.

## Cần bạn quyết

- **Sửa bài học** (ngoài phạm vi nhánh này): nêu rõ `DISTINCT` gộp các `NULL` thành một dòng, `LEN` tính dấu cách ở đầu, cách viết số và `<`, `>` trong câu lệnh. Bài luyện đã tránh đòi những chỗ này hoặc nói rõ trong đề.
- **Gợi ý `DATEDIFF` ở `sinh-nhat-thang-sau`**: giữ vì đơn vị `month` chưa được dạy riêng, nên đề phải nói. Nếu bài học thêm phần này thì bỏ gợi ý được.
- **Nhãn độ khó và các bài gần nhau** (`du-ba-nam` với `nhan-tham-nien`, `het-han-trong-30-ngay` với `bao-cao-tong-hop`): giữ theo phân bố 20/20/10, chỉnh sau khi có người làm thử.

## Đã biết, để nguyên

- Thanh đầu trang tràn dưới 1024 px trên mọi trang, kể cả trang bài tập cũ. Nội dung Luyện SQL vừa khung 390 px.
- Lần tải đầu của trang làm bài thất bại thì học viên tải lại trang, không có nút thử lại.
- Dữ liệu hidden test nằm trong repo public, và kết quả nộp cho biết từng test đạt hay trượt. Đã chấp nhận vì chỉ có một học viên.
- `check:arcade` chạy tay vì cần database thật, không nằm trong CI, giống `check:exercises`.
- `premium-audit.json` ở gốc repo không thuộc nhánh này nên không commit.

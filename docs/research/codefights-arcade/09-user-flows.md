# 09. Luồng người dùng

Flow dưới đây là **RECOMMENDATION cho SQL Arcade**, không phải recording Arcade gốc. Bằng chứng lịch sử dẫn tới mục tiêu trải nghiệm nằm ở [01](01-historical-research.md); state guards ở [04](04-state-machines.md).

## 1. Lần đầu và tiếp tục học

```mermaid
flowchart TD
    A[Menu Luyện SQL] --> B[Giới thiệu cách chấm và lưu tiến độ]
    B --> C[Danh sách world và bài cần biết]
    C --> D{Đã có nháp hoặc tiến độ cá nhân?}
    D -->|Có| E[Tiếp tục challenge gần nhất]
    D -->|Chưa| F[Mở challenge đầu]
    E --> G[Đọc yêu cầu và schema]
    F --> G
    G --> H{Đã học tiền đề?}
    H -->|Chưa| I[Mở liên kết bài nguồn]
    I --> G
    H -->|Rồi| J[Soạn T-SQL]
```

Không bắt người chỉ dùng web mở SSMS. Mã truy cập dùng cơ chế hiện có của khóa học; vị trí nhận mã giữ theo hướng dẫn khóa học, không tự thêm thông tin liên hệ. Mã không phải identity hay ví Coin. [R-06, R-19]

## 2. Thử, sửa, nộp và mở tiếp

```mermaid
flowchart TD
    A[Soạn code] --> B[Chạy thử visible suite]
    B --> C{Kết quả}
    C -->|Lỗi SQL hoặc sai mẫu| D[Xem mẫu và sửa code]
    D --> A
    C -->|Visible đạt| E[Nộp toàn bộ suite]
    E --> F{Kết quả}
    F -->|Hidden trượt| G[Chỉ hiện tổng và gợi đọc tiêu chí]
    G --> A
    F -->|Lỗi dịch vụ terminal| H[Giữ nháp; chủ động tạo job và key mới]
    H --> E
    F -->|Toàn bộ đạt| I[Hoàn thành cá nhân một lần]
    I --> J{Hết world?}
    J -->|Chưa| K[Mở bài kế]
    J -->|Rồi| L[World hoàn thành và world kế]
    K --> A
```

Có thể Submit trực tiếp; không bắt Run đạt trước. Sơ đồ thể hiện nhịp học được khuyến nghị, không phải điều kiện API. Run không cấp XP. Luyện lại challenge hoàn thành không cộng lần hai. [BR-01–BR-06]

## 3. Lỗi và khả năng khôi phục

| Tình huống | Đường đi bắt buộc |
|---|---|
| Thiếu/sai mã truy cập | Giữ SQL, mở form mã hiện có, gửi lại sau khi người học nhập |
| Version không còn được chấm | Báo đề đã đổi; giữ nháp cũ, cho mở bản mới; không tự nộp SQL vào version khác |
| Rớt mạng sau create job | Lưu idempotency key, gửi lại đúng payload/key hoặc poll job đã biết |
| Refresh khi job chạy | Đọc nháp/job token trong session; tiếp tục poll; nếu hết hạn thì thông báo cần nộp lại |
| SQL quá lâu | Trả query timeout; chỉ ghi lần thử thất bại, không xóa completion cũ |
| Worker reset lỗi | Service error, cách ly slot; không gán sai cho học viên |
| Đã biết service_error terminal | Poll hoặc key cũ vẫn là job cũ; nút Thử lại do người học chọn tạo job/key mới; không tự lặp |
| localStorage bị chặn | Cảnh báo không lưu nháp/progress trên thiết bị; phiên hiện tại vẫn làm được |
| Hai tab cùng hoàn thành | Completion set theo challenge/version, XP tính từ tập completion, không cộng event vào số dư |
| Sang máy khác | Xuất/nhập JSON Arcade để mang tiến độ; không hứa đồng bộ tự động |

## 4. Reveal tương lai, chưa bật

```mermaid
flowchart TD
    A[Yêu cầu xem phản ví dụ] --> B{Tính năng đã được duyệt và bật?}
    B -->|Chưa| C[Không có thao tác mua trong MVP]
    B -->|Rồi| D{Đã có quyền xem?}
    D -->|Có| E[Trả phản ví dụ đã được phép]
    D -->|Chưa| F{Đủ Coin?}
    F -->|Không| G[Báo thiếu Coin, không debit]
    F -->|Có| H[Debit và cấp quyền nguyên tử]
    H --> E
```

Sơ đồ này là ràng buộc cho thiết kế sau, không phải mô phỏng giao dịch đã thử. Identity, giá, nội dung reveal và holdout còn cần duyệt. Xem [06](06-business-rules.md) và AC-25/AC-26 tại [17](17-acceptance-tests.md).

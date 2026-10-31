# Tích hợp và chuẩn bị xuất bản bài 2.2–2.4

## Quyền thực hiện và phạm vi

Sau các lượt soạn/review, người làm khóa học yêu cầu rõ trong chat ngày 31/10/2026: “merge vào main giúp mình và push lên nhé”. Đây là quyền commit, merge vào main và push lên origin; workflow GitHub Pages tự chạy khi main thay đổi. Các dòng “không commit/push/deploy” trong hồ sơ soạn trước đó mô tả trạng thái trước yêu cầu mới này, không phải lệnh cấm còn hiệu lực.

origin/main sau fetch là `e3d496f`, đã có 2.1 qua PR #6; tree của nó bằng source base `f344099` của nhánh làm việc. Chỉ tích hợp các thay đổi 2.2–2.4, test và report/spec/plan được tạo trong chat này; không sửa YAML, seed, API hoặc secret.

## Commit và merge đã kiểm

- Commit nội dung: `4c289ed44da79aa7f7376171a9b427213b498ecd` — 21 file, gồm ba MDX, bốn test và hồ sơ gốc/ma trận/spec/plan.
- Main local được fast-forward tới origin/main, sau đó merge không xung đột bằng merge commit `9dcef04498a3b1e13d12c7c1becfc5d7f0100973`.
- `git diff --exit-code 4c289ed HEAD` sau merge đạt: tree merge bằng tree nhánh đã review. Không sửa sản phẩm hoặc kết luận reviewer khi tích hợp.
- Đây là checkout chính, không tạo/xóa worktree. Giữ các worktree khác của người dùng.

## Kiểm mới cho lần tích hợp

Log riêng trong `temp/verification/2026-10-31-publish-2-2-2-4/`:

| Phép kiểm | Kết quả | Log |
|---|---|---|
| Test trước merge trên nhánh làm việc | 48 file, 330/330 đạt | tests-feature.log |
| Test trên kết quả merge main | 48 file, 330/330 đạt | tests-main.log |
| Astro check main | 0 errors, 0 warnings, 3 hint deprecated sẵn có | check-main.log |
| Build main | 129 trang, hoàn tất 16:18:29 +07 ngày 31/10/2026 | build-main.log |
| check:dist main | 129 trang/1951 liên kết đạt, không phát hiện rò đáp án | dist-main.log |

API/YAML/SQL/renderer không thay đổi khi merge. Evidence runner 76 bài, check:data và SQL/UI của từng lượt được giữ trong các hồ sơ 2.2–2.4; không chạy câu ghi hoặc thêm kiểm DB cho riêng tác vụ Git này. Không gọi pass test hoặc push thành bằng chứng SSMS/xác thực/Chạy/Nộp web đã được thử.

## Xuất bản

Push đích: `git push origin main`, không force-push. Commit ghi hồ sơ này chỉ đổi tài liệu; nội dung và test giữ nguyên tree sản phẩm đã kiểm trên main. Kết quả remote và run GitHub Pages được đối chiếu sau push và báo trong bàn giao chat; file này ghi bằng chứng kiểm trước push, không dự đoán thành công của deploy.

[Workflow GitHub Pages](https://github.com/nhatlam1111/microsoft-sql-lession/actions/workflows/deploy.yml) chạy khi push main. Workflow API có lọc đường dẫn; lượt này không thay các đường dẫn kích hoạt API. Báo đúng kết quả thực tế, không dùng trạng thái review để thay quyền xuất bản hoặc chứng nhận deploy.

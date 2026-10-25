# Kiểm main trước khi xuất bản ngày 25/10/2026

Người dùng yêu cầu cập nhật hướng dẫn review cho agent, sau đó merge vào main và push. Đây là quyền phát hành mới sau mốc bàn giao local `60faba9`.

## Hướng dẫn và review

Mục 4.5–4.6 của [quy ước](../../quy-uoc.md), [AGENTS](../../../AGENTS.md) và [CLAUDE](../../../CLAUDE.md) được cập nhật tại `f906640`. Gói giao review ghi rõ source/build, nền tảng Excel cơ bản, tiền đề từng đề, phạm vi xác minh, report mới và review tích hợp. Giữ Claude Sonnet/high, Codex kế thừa model; không dùng Ready thay cho kiểm thực tế hoặc quyền push.

[Review độc lập phần hướng dẫn](review-guidance-2026-10-25.md) kết luận Ready, không finding. Tác giả đã đọc hết report; không coi lần review này là kiểm lại SQL/UI/SSMS hoặc bảo đảm mọi học viên tự học được. Những giới hạn đó vẫn được công bố trong hồ sơ của lượt nội dung.

## Main đã hợp nhất và kiểm

- Origin: `nhatlam1111/microsoft-sql-lession`; fetch trước merge xác nhận main local/remote cùng `df7e810`.
- Merge local: `76ad587`, dùng merge commit giữ lịch sử nhánh; không có conflict hoặc thay đổi remote bị bỏ.
- Nội dung, editor và hướng dẫn đã nằm trong main. Từ mốc `60faba9`, không sửa thêm bài/đáp án/API/seed; phần mới chỉ là hướng dẫn và hồ sơ.

| Lệnh trên main sau merge | Kết quả |
|---|---|
| `npm test` | 295/295, 41 file |
| `npm run check` | 0 errors, 0 warnings, 3 hints deprecated đã có |
| `npm run build` | 108 trang |
| `npm run check:dist` | 108 trang, 1.742 link; không lộ đáp án |

Log local tại `temp/verification/2026-10-24-student-review/`, hậu tố `main-publication.log`. Không chạy lại database chỉ vì thay hướng dẫn; các bằng chứng 79 SELECT, 54 đáp án luôn hoàn tác và check:data của lượt nội dung được giữ nguyên, không gọi là kết quả mới của lượt phát hành.

## Mốc ghi hồ sơ

Hồ sơ này ghi sau khi kiểm main và trước lệnh push, không khẳng định workflow chưa chạy đã đạt. Lệnh được người dùng cho phép là push main bình thường, không force. Sau push, đối chiếu SHA remote và workflow đúng commit; gửi SHA, đường dẫn run cùng kết quả thật trong bàn giao và evidence local.

[Các lần xuất bản main trên GitHub Actions](https://github.com/nhatlam1111/microsoft-sql-lession/actions?query=branch%3Amain) là nguồn trạng thái phát hành; [website khóa học](https://nhatlam1111.github.io/microsoft-sql-lession/) là nơi kiểm bản đã xuất bản.

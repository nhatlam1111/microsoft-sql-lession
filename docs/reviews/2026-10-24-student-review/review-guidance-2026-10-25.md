# Review độc lập: hướng dẫn giao review cho agent

## Phạm vi và phương pháp

- Ngày: 25/10/2026.
- Vai trò: Senior Code Reviewer; Codex, kế thừa model của phiên, không đổi model và không phân tiếp công việc.
- Diff được review: `60faba9..f906640`; HEAD đã đối chiếu là `f906640938c576adb9aa6dee0c64c45f39d847c3`.
- Đã đọc toàn bộ diff của 5 file: `AGENTS.md`, `CLAUDE.md`, `docs/quy-uoc.md` và hai phần bổ sung của spec/plan ngày 24/10. Đã đọc toàn bộ AGENTS/CLAUDE/quy ước hiện hành, đối chiếu kỹ mục 4.5–4.6.
- Kiểm độc lập: `git diff --check 60faba9..f906640` exit 0, không báo lỗi; working tree sạch trước khi ghi report. Công cụ thực tế: Git và PowerShell qua exec_command, chỉ đọc các file trong phạm vi và chỉ ghi report này.
- Không đọc report review cũ hay nguồn nhận xét học viên để hình thành kết luận; không truy cập database, seed, .env hoặc secret.

## Strengths

- Gói giao việc buộc nêu phạm vi, quyết định, source/build, phương pháp và đường dẫn đầu ra; xử lý rõ build thiếu/cũ và không coi HTML là bằng chứng đã kiểm tương tác (`docs/quy-uoc.md:129`, `:141`, `:162`).
- Góc nhìn người mới được định nghĩa đủ cụ thể: Excel cơ bản, không lấy bài sau/đáp án/kiến thức SQL có sẵn bù tiền đề; từng đề cần chỉ ra kiến thức và nơi đã dạy. Đồng thời tránh đòi thêm định nghĩa cho mọi giá trị dữ liệu hoặc chứng minh mọi thẻ trích (`docs/quy-uoc.md:156`, `:158`, `:161`, `:168`).
- Quy định model, fresh context, tiếp tục đúng agent khi bị hạn mức, bảo toàn report và review tích hợp đều được nêu rõ. Hướng dẫn tách bằng chứng của reviewer khỏi evidence được giao và giữ quyền merge/push theo sự đồng ý của người dùng (`docs/quy-uoc.md:123`, `:125`, `:127`, `:172`, `:181`, `:182`). AGENTS và CLAUDE dẫn về cùng nguồn quy ước, không tạo quy trình cạnh tranh.

## Findings

- **Critical:** Không có.
- **Important:** Không có.
- **Minor:** Không có.

Không phát hiện mâu thuẫn hoặc thiếu sót có tác động thực tế cần sửa trong diff này. Yêu cầu không đọc ma trận tác giả áp dụng cho review học thử từng bài; đoạn review tích hợp cho phép đọc evidence được giao và yêu cầu phân biệt nguồn, nên hai trường hợp có phạm vi rõ. Lệnh cấm tự đổi đáp án/seed/API cũng phù hợp phạm vi sửa theo review, không buộc tác giả bỏ qua nhận xét: mục 4.6 vẫn yêu cầu quyết định từng nhận xét và ghi căn cứ.

## Declined to judge

- Không xác nhận lại kết quả của 21 bài, SQL live, UI hoặc các lượt review trước. Đây là thông tin lịch sử trong context của spec/plan, không phải kết quả do reviewer này thực hiện; không có thay đổi nội dung/runtime trong diff được giao.
- Không khẳng định quy trình mới chắc chắn cho chất lượng học thử cụ thể hoặc học viên chắc chắn tự học được. Đánh giá ở đây là tính rõ ràng, nhất quán và khả năng thực hiện của hướng dẫn.
- Chưa xác minh trạng thái main sau hợp nhất, remote SHA hoặc workflow xuất bản: các bước đó thuộc giai đoạn phát hành kế tiếp theo plan. Không coi chúng là đã đạt trong report này.

## Assessment

**Ready** cho diff hướng dẫn `60faba9..f906640`; không có nhận xét cần sửa trước khi hợp nhất.

Kết luận này chỉ đánh giá 5 file hướng dẫn/spec/plan đã giao. Không thay cho kiểm test/check/build/check:dist trên main, kiểm remote/workflow sau push, hoặc quyền xuất bản; quyền xuất bản phải đến từ phạm vi người dùng đã cho phép. Không chạy lại toàn bộ SQL hoặc review lại 21 bài vì diff không đổi bài học, đáp án, API hay dữ liệu.

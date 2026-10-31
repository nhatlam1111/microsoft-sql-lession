# Bài 2.4 theo mạch mới của 2.1–2.3

## Phạm vi và căn cứ

Người làm khóa học yêu cầu tiếp tục 2.4 theo cùng quy ước/template và mạch đã áp dụng ở 2.1–2.3. Source base `f344099d9e3f9fa58b33a5c0762e6cfbaa467f93`, working tree `feat/lesson-2-1-excel-first`; giữ nguyên thay đổi 2.2/2.3 và hồ sơ các lượt trước. Chỉ sửa MDX 2.4, test liên quan và hồ sơ lượt này; không đổi YAML, seed, API/editor/component.

## Thiết kế

Chọn chuyển đầy đủ Excel → câu chính → LineMap; tiểu mục sau RunFlow → Result → trả lời. Chỉ gộp tiêu đề sẽ còn hình/câu sắp theo phòng ngoài yêu cầu chính nên không đạt quy ước. Đổi tình huống hoặc bài tập không cần thiết.

- Giữ yêu cầu tối đa năm hồ sơ đang làm có ngày vào làm gần nhất, mọi phòng/không giới hạn năm; cùng ngày thì MaNV tăng dần. Giữ bốn cột/alias, query và kết quả NV048/NV047/NV046/NV045/NV044.
- Hình Excel dùng đúng năm dòng đầu sau lọc/sắp, ngày thật và đánh dấu hai đầu danh sách. Bỏ ví dụ sắp phòng trước ngày và A02/A03 giả định; điều kiện cùng ngày được giải thích bằng lời, không gán trường hợp giả thành dữ liệu thật.
- Giảng ASC/DESC, mặc định ASC riêng từng cột, xét nhiều cột trái sang phải, khóa duy nhất chốt thứ tự khi dữ liệu không đổi, TOP là tối đa/toàn tập sau lọc/không phải mỗi phòng. Không nhầm vị trí cột với thứ tự dòng, thứ tự logic với thao tác vật lý hoặc TOP viết sau SELECT là giới hạn ngay ở bước SELECT.
- Alias trong ORDER BY giải thích ngắn, đối chiếu WHERE đã học. Hay nhầm chỉ dùng biến thể sai của chính điều kiện/sắp xếp trong tình huống. Giữ ba đề, hướng dẫn chấm thứ tự dòng; không thêm quiz chỉ để đủ khối. Giữ ước tính 20 phút, chưa đo học viên thật.
- RunFlow giữ năm bước và dữ liệu/câu SQL: 48 → 45 → 45 → 45 → 5. Rút định dạng mảng cho dễ đọc nhưng không thay literal hoặc dòng trích; bước cuối là danh sách chị Hạnh cần.

Teach tiếp tục áp dụng vào tiền đề và giảm tải; không tạo learning-workspace/HTML riêng/hồ sơ học cá nhân hoặc gọi teach-skills khác. Superpowers dùng cho thiết kế/kế hoạch, thực hiện và kiểm bằng chứng; yêu cầu đã chốt theo mẫu nên triển khai trực tiếp.

## Nghiệm thu

SELECT-only live kiểm từng bước, thứ tự 10/5 dòng trích, dữ liệu Excel/Result, alias, hướng mặc định và giới hạn tối đa; ghi rõ trường hợp trùng ngày có hay không trong dữ liệu thật, kiểm khóa MaNV. Không có azure-sql tool thì dùng kết nối local hiện có, không in credential.

Gỡ bài khỏi danh sách chờ, giữ test số liệu/ba đề ordered và thêm bảo vệ khung/kiến thức còn cần. Chạy API build/check:exercises/check:data, npm test/check/build/check:dist; xem build, năm drawer, highlight/copy-paste/tab4 ở hai viewport desktop. Reviewer mới fork none/model kế thừa theo mục 4.5, chỉ nguồn/HTML, kiểm tiền đề từng đề và ghi giới hạn. Xử lý mọi nhận xét mục 4.6, lưu report nguyên vẹn và ma trận; cập nhật spec/plan sau mỗi vòng.

Lượt trước đã review tích hợp 2.1–2.3. Lượt này là một bài kế tiếp, không sửa công cụ; reviewer 2.4 đọc mạch trước để kiểm tiền đề, không lặp lại toàn bộ review tích hợp vừa hoàn tất. Không commit/push/deploy.

## Trạng thái

Hoàn tất: chuyển khung, hình Excel và rút định dạng mảng; assert giữ nguyên năm câu SQL/focus/columns/rows/totals/previews. SQL live có 13 bản ghi bằng chứng; 45 hồ sơ đang làm không có nhóm trùng ngày, lời giảng dùng điều kiện chung, không ví dụ giả. 330 test, check/build/check:dist và 76 bài tập runner đạt, data không lệch; ba hint deprecated sẵn có. UI hai viewport/năm drawer/highlight/copy-paste/tab4 đã thử.

Review độc lập agent mới/model kế thừa không có finding cần sửa; đủ tiền đề ba đề và ba hash khớp. Giữ nguyên source/build sau kiểm, không lặp kiểm khi không sửa. [Report gốc, ma trận, bằng chứng và giới hạn](../../reviews/2026-10-31-lesson-2-4/verification.md). Chưa kiểm xác thực/Chạy/Nộp/lưu tiến độ web, SSMS thật, thời lượng với học viên thật hoặc chọn ở ranh giới nhóm ngày trùng live. Không commit/push/deploy.

Sau bàn giao, người dùng đã yêu cầu merge main và push ngày 31/10/2026; xem [hồ sơ tích hợp/kiểm trước xuất bản](../../reviews/2026-10-31-publish-2-2-2-4/verification.md). Quyền mới này áp dụng cho thao tác Git, không thay đổi nội dung hoặc kết luận review đã lưu.

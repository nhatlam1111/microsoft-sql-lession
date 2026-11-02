# Làm lại bài 3.3 — lọc nhóm bằng HAVING

Trạng thái: **đã duyệt** trong chat: “Duyệt, triển khai theo thiết kế”. Không thay quyền/phạm vi phát hành 3.1–3.2 và research đã được yêu cầu riêng. Quy ước/template hiện hành thắng các hồ sơ lịch sử.

Base: main `ebaa187` đã push; nhánh làm 3.3 là `codex/lesson-3-3-refresh`.

## Ý định và cách tiếp cận

Giữ tình huống chị Hạnh nhận báo cáo 3.2 rồi chỉ muốn phòng có trên 10 hồ sơ đang làm. Học viên cần thấy WHERE chọn hồ sơ đem đếm, GROUP BY hình thành nhóm, HAVING loại nhóm theo số liệu, SELECT tạo các ô từ nhóm còn lại; không hiểu lọc nhóm là xóa hồ sơ nguồn hoặc chỉ có SELECT mới tính được hàm tổng hợp.

Hai cách đã so sánh ở lượt drawer: A bổ sung lời giải trên bảng trích; B nối dữ liệu/phép tính với ô kết quả bằng ví dụ đại diện. Người dùng chọn B và yêu cầu không giải hết mọi nhóm/dữ liệu. Đề xuất tiếp tục hướng B trong 3.3 bằng các khối hiện có, trọng tâm mới là HAVING; không mở lại lựa chọn giao diện hoặc làm công cụ mới. Các chi tiết áp dụng dưới đây là đề xuất tác giả để duyệt, không coi yêu cầu “làm tiếp” là đã duyệt từng chi tiết.

## Phần giữ và phần sửa

- Giữ slug, tiêu đề, tình huống, tháng 10/2026, trạng thái đang làm, MaPB hiện lưu, yêu cầu sắp; câu SQL chính và kết quả KD/13.
- Giữ ba đề/ID, phạm vi, thứ tự cột/dòng và logic đáp án YAML. Chỉ căn lại AND của đáp án 3-3-2 nếu cần cho thụt lề bốn cột, đối chiếu token/giá trị để không đổi nghĩa.
- Chỉ chuyển 3.3, không sửa 3.4 hoặc các bài khác/seed/API/editor, không thêm allowlist. Gỡ riêng 3.3 khỏi PENDING_TWO_SUBSECTIONS khi chuyển xong.
- Dùng RunFlow/FlowExamples/checks hiện có; không có truy vấn runtime hoặc bảng duyệt toàn bộ dữ liệu mới. Bảng Đầu vào vẫn tối đa năm dòng; ví dụ tối đa hai nhóm, mỗi bảng tối đa năm dòng và ghi rõ trích/đủ phạm vi.

## Mạch bài

Phần chính có đúng hai tiểu mục:

1. **Từ Value Filters đến HAVING:** giải nghĩa Value Filters ngay trên báo cáo 3.2, hình PivotTable còn KD/13; chuyển sang SQL, đặt câu chính trước LineMap. Giải từng phần của chính câu này với dẫn chứng cụ thể. Phân biệt lọc hồ sơ/nhóm, ngưỡng >10 loại IT đúng10, alias SoHoSo chưa có ở HAVING nhưng dùng được ở ORDER BY. Giữ phần giảng luôn hiện, không dùng câu ôn để bổ sung tiền đề.
2. **SQL Server chạy câu này thế nào:** lời dẫn thứ tự logic → RunFlow → Result cuối → câu trả lời chị Hạnh. Không tả thứ tự vật lý. Đặt giới hạn báo cáo số lượng, phòng hiện lưu và không tự kết luận thiếu người ngay cạnh câu trả lời.

Giải thích đủ tiền đề ba đề bằng lời gọn: AND/OR nối được các điều kiện HAVING như đã học; điều kiện dùng đúng chỉ tiêu tổng hợp (COUNT trong tình huống này, SUM khi đề hỏi tổng); khi có nhiều khóa nhóm thì HAVING xét từng tổ hợp như 3.2. Bỏ ví dụ SQL ngoài tình huống về WHERE SoNgay/HAVING SUM hiện có trong phần chính, không thay bằng query phụ. Kiến thức SUM/ngày/nhiều khóa đã học ở 3.1–3.2, không chép đáp án ba đề vào bài.

Hay nhầm chỉ dùng chính câu của tình huống: đặt COUNT vào WHERE, bỏ lọc trạng thái, dùng alias ở HAVING; nêu hậu quả ngắn. Ứng dụng 2–4 ý theo việc dùng được, Memo ôn; ba câu tự kiểm tra về thời điểm lọc, ngưỡng và alias, sau Ghi nhớ/trước Bài tập. Các đáp án đều dựa vào phần đã giảng. Giữ hoặc chỉnh minutes theo nội dung thực tế, không gọi đó là thời lượng đã đo.

## Drawer từng bước

Giữ sáu bước và các tổng dự kiến `48 → 45 → 6 → 1 → 1 → 1`:

| Bước | Cách giải thích đề xuất |
|---|---|
| FROM | Nêu bảng NhanVien, chưa lọc/chọn cột/gom; năm dòng đầu có cả đang làm/đã nghỉ để bước sau đọc đủ điều kiện. |
| WHERE | Đầu vào đủ MaNV/MaPB/TrangThai, checks có giữ/loại; tổng trên cả 48 hồ sơ, giữ 45. Không tính số nhóm ở bước này. |
| GROUP BY | Nhóm theo MaPB, vẫn giữ các hồ sơ bên trong nhóm. Chỉ minh họa KD/IT để nối tới ngưỡng: mỗi nhóm trích tối đa năm hồ sơ, ghi rõ toàn nhóm là 13/10, không suy số đếm từ riêng năm dòng. Bảng sáu mã/kích thước nhóm dùng nhãn minh họa “Số hồ sơ trong nhóm”, chưa dùng alias SoHoSo của SELECT. |
| HAVING | Đầu vào trích năm trong sáu nhóm, có KD/13 và IT/10. Dùng checks của bước lọc với điều kiện COUNT(*) > 10: KD đúng/giữ, IT đúng 10 sai/loại, thêm các nhóm thấp hơn từ bảng trích. Hàng tổng tính trên cả sáu nhóm, giữ 1. Nói rõ giữ cả nhóm KD với đủ 13 hồ sơ, không đếm lại thành 1 hoặc xóa hồ sơ nguồn. |
| SELECT | Giải một nhóm KD còn lại. MaPB lấy mã chung KD; COUNT(*) dùng cả 13 hồ sơ trong nhóm, không đếm một dòng bảng đối chiếu hoặc năm hồ sơ trích; AS đặt tiêu đề SoHoSo. Hai biểu thức nối tới hai ô rồi ghép KD/13. Ví dụ có thể trích tối đa năm thành viên để nhận diện nhóm, không hiển thị đủ 13. |
| ORDER BY | Đầu vào có MaPB/SoHoSo; một dòng nên không đổi vị trí. Giữ tiêu chí sắp mà chị Hạnh yêu cầu; không bịa thêm phòng vượt ngưỡng để diễn hoạt sắp. |

Chỉ các câu sql bằng chứng ở GROUP BY/HAVING đổi caption để nhất quán với 3.2; chúng vẫn là SELECT hợp lệ và không hiện trên trang. Số/giá trị/nhóm không đổi; query chính giữ nguyên. Không viết rằng aggregate chỉ được tính ở SELECT, vì HAVING phải xét được COUNT trước bước xuất cột.

## Ba đề giữ nguyên và kiến thức cần có

| Đề | Tiền đề cần được giảng trước phần ôn |
|---|---|
| 3-3-1, số lượng giữa hai biên | WHERE trước nhóm; AND kết hợp điều kiện HAVING; phân biệt > và <=; sắp theo hai tiêu chí đã học ở bài 2.4. |
| 3-3-2, loại nghỉ có tổng từ 5 | Phạm vi theo trạng thái/TuNgay của 3.1; GROUP BY và COUNT/SUM trong từng nhóm của 3.2; HAVING so đúng chỉ tiêu SUM, >= gồm đúng ngưỡng. |
| 3-3-3, cặp phòng/chức danh từ 3 | Nhiều khóa nhóm của 3.2; HAVING xét mỗi cặp, không lọc tổng phòng; >= và sắp nhiều cột. |

## Kiểm và bàn giao

Trước viết: chạy SELECT mới kiểm câu chính/từng bước, checks/tổng, thành viên KD/IT, > 10 / >= 10 và các giới hạn có dẫn chứng. Kiểm câu SELECT sai về COUNT/alias nếu đưa vào Hay nhầm; không có câu ghi tác giả trên DB. Con số phía trên là dự kiến từ bài/hồ sơ hiện có, chưa được gọi là SQL live của lượt 3.3.

Test bảo vệ các tổng/nhóm/ngưỡng, input/checks và ví dụ trích so với toàn nhóm, caption/alias, đủ tiền đề ba đề; không khóa nguyên câu văn. Kiểm theo §4.4: API build/check:exercises qua runner hoàn tác rồi check:data; npm test/check/build/check:dist; UI đúng build, highlight/tab/đổi bước và màn hẹp. Review độc lập một bài theo §4.5, model kế thừa/ngữ cảnh mới/report-only, đọc đề trước answer; tác giả xử lý hết nhận xét theo §4.6. Nếu phải sửa công cụ ngoài khối hiện có thì cập nhật thiết kế và thêm review tích hợp.

Lưu spec/plan/evidence mới cho 3.3, giữ report gốc; không tự sửa hồ sơ research hoặc triển khai Arcade. Phần lựa chọn câu chữ/dòng trích/mark và bố trí ví dụ giao tác giả quyết định trong giới hạn trên. Triển khai trực tiếp trong phiên theo [kế hoạch](../plans/2026-11-02-lesson-3-3-refresh.md), giữ cách làm đã dùng cho 3.1–3.2; reviewer là agent mới theo quy ước repo.

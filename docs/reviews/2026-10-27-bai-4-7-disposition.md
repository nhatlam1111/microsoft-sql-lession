# Xử lý học thử bài4.7

Đã đọc trọn report BƯỚC1/APPEND BƯỚC2. Snapshot trước answer SHA2560488f6d446b221d1b8915b8a3b27b8f9924bc3475c66235858885569834901ad; root kiểm prefix byte của report cuối khớp snapshot. Learner mới kế thừa model; chưa có finding cần sửa có căn cứ, không coi đó là chứng nhận SQLServer/UI.

| Nhận xét / giới hạn | Quyết định | Xử lý và bằng chứng |
|---|---|---|
| Giữ mạch đối chiếu theo2.1/2.5/2.8 | Làm theo | Giữ bảng công→lịchDP018→đóng góp→nguồn SQL→FULL/EXCEPT→kết quả/lời giải. Không cắt minh họa để bài trông ngắn hoặc thêm RunFlow cho đủ. |
| Tiền đề ba đề và đối chiếu answer | Làm theo | Giữ đề/giảng: reviewer tự suy đủ cách trướcYAML, đối chiếu sau không có lệch. Không đưa answer bù lý thuyết, không sửa seed/guard. |
| Chưa xác minh toàn nguồn43mã/sốliệu/runtime/grader | Làm một phần | Tác giả sourcefixture kiểm806CC/43mã, ngàyphép11, tổngđốichiếu817/BL819; hai lệch+1, EXCEPTđúngphía; purePython riêng từscript. Live/data CLI exit1 thiếu4SQLenv trướcconnection; engine/grader vẫn pending. |
| HTML khác UI/copy/paste/viewport/keyboard/drawer/SSMS/login/nộp | Làm một phần | Source/HTML5SQL5copy/5Result41ô+marks/5Excel+marks khớp; không có thao tác browser/SSMS. Không gọi nhãn success củaResult là phép chạy đã làm. |
| Thời lượng45phút chưa đo thực tế | Không làm theo — giữ ước lượng | Có nội dung/bađề tương ứng nhưng chưa learnerstudy; không mở phạmvi đo buổihọc hoặc hứa mọi họcviên tự học được. Có thể điều chỉnh sau quan sát. |

TDD6test REDthiếuhelper/Result/YAML→GREEN; suite328/49; Astro0error/0warning/3hints nền; API81/typecheck; build135/dist2026links PASS. Sau định dạng keyword trongsummary/Mistakes, build/HTML kiểm lại đúngsource. SQL ngày/VALUES chỉ được mô hình hóa ở test utility hẹp, không parser/compiler/metadata/collation TSQL. Kiểm biên nguồnvắng/0, kỳkhác, DP018pending/đơnchồng/ngàykhác, EXCEPTduplicate/NULL. Các Result/answer được so theo giátrị/vịtrí/thứtự, không dựa alias. Chưa push/mainmerge/deploy.

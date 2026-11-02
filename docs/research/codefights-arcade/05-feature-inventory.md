# 05. Danh mục tính năng

Phạm vi mỗi bằng chứng được giữ trong [Evidence Register](evidence-register.md). `UNKNOWN` nghĩa chưa xác minh, không có nghĩa tính năng không tồn tại. State trong cột cuối là mô hình phân tích của [04](04-state-machines.md). Luật lịch sử ở [06](06-business-rules.md), không suy từ thiết kế MVP.

## 1. Map, challenge và workspace

| ID / tính năng / mục đích | Tiền đề; trigger; input và tương tác | Output/phản hồi quan sát; tác động tiến độ | Luật/state/lỗi và độ tin cậy |
|---|---|---|---|
| F-01 Arcade Home — chọn nhóm luyện | Người dùng vào Arcade; chọn địa điểm/chủ đề | Map có địa điểm và node khóa/mở | H-01, H-03-M: CONFIRMED về map; lỗi tải/navigation UNKNOWN |
| F-02 World — gom kỹ năng tăng độ khó | Vào world đã mở; chọn node | Nhìn thấy nhóm challenge | H-01: CONFIRMED cho launch; prerequisite của Databases UNKNOWN |
| F-03 Unlock — dẫn học theo mức | Giải nhiệm vụ hoặc cơ chế mở của phiên bản | Địa điểm tiếp theo khả dụng | H-01 có luật sao; H-04 có thông tin Coin gián tiếp; không chốt một luật cho mọi năm |
| F-04 Challenge description — hiểu yêu cầu | Mở challenge; đọc đề, input/output, ví dụ | Bố cục đề/editor và giới hạn trong ảnh | H-03-I, H-06: CONFIRMED về vùng nhìn thấy; lỗi nội dung/resize cũ UNKNOWN |
| F-05 Chọn ngôn ngữ — viết lời giải phù hợp | Chọn từ dropdown của editor | Ảnh có JavaScript/ES6; chưa thao tác chuyển | H-03-I/H-06: CONFIRMED control; tập ngôn ngữ SQL theo năm, giữ code sau đổi UNKNOWN |
| F-06 Editor — soạn lời giải | Code/starter và thao tác gõ | Highlight, số dòng, Saved trong ảnh | H-03-I: CONFIRMED trạng thái; autocomplete, phím tắt, reset/autosave failure UNKNOWN |
| F-07 Run Tests — phản hồi trước nộp | Có code, nhấn Run Tests | Có sample passed trong ảnh cùng nút | H-03-I: CONFIRMED UI; exact test selection/error/time/rate của Arcade UNKNOWN |
| F-08 Custom tests — thử ví dụ riêng | Chọn Add custom test | Control nhìn thấy trong ảnh | H-03-I: CONFIRMED control; validation/giới hạn/persistence UNKNOWN; không mặc định có ở SQL |
| F-09 Hidden tests — kiểm ngoài mẫu | Code được đánh giá trên input chưa hiện | Test khóa nhìn thấy; người dùng báo sample đạt, hidden trượt | H-03-I, H-08: CONFIRMED phân biệt; tổng test và từng status trước unlock UNKNOWN |
| F-10 Reveal hidden — giúp tìm phản ví dụ | Có Coin theo tài khoản trải nghiệm; yêu cầu mở test | Nguồn nói có mua quyền xem | H-03-T/H-05: STRONGLY SUPPORTED cơ chế; giá/phạm vi/thời hạn/error số dư UNKNOWN |
| F-11 Submit — đánh giá hoàn thành | Code và nhấn Submit | Nút riêng, screenshot có score | H-06: CONFIRMED UI; all-tests guard, partial scoring, timeout/resubmit/reward cũ UNKNOWN |

## 2. Phần thưởng, lưu và xã hội

| ID / tính năng / mục đích | Tiền đề; trigger; input và tương tác | Output/phản hồi; tác động tiến độ | Luật/state/lỗi và độ tin cậy |
|---|---|---|---|
| F-12 Score — biểu thị kết quả bài | Lời giải được chấm | Ảnh có 300/300 | H-06: CONFIRMED nhãn; công thức/chấm từng test UNKNOWN; không phải Coin |
| F-13 XP — phản hồi tích lũy luyện tập | Giải bài theo phát biểu CEO | XP cùng Coin/badge được kể riêng | H-07: CONFIRMED phát biểu; nguồn/cap/mất XP/level formula UNKNOWN |
| F-14 Coin — tài nguyên trò chơi | Giải bài/chi tiêu theo nguồn trải nghiệm | Có kiếm/chi Coin; không thấy ledger | H-03-T/H-05/H-07: STRONGLY SUPPORTED; double reward, hoàn tiền, giá động UNKNOWN |
| F-15 Stars/badges/level/rank — dấu mốc | Tùy cơ chế và phiên bản | Launch có stars, CEO nhắc badge | H-01/H-07: CONFIRMED phạm vi phát biểu; level/rank/achievement conditions UNKNOWN |
| F-16 Saved solutions/progress/profile — tiếp tục học | Có phiên/tài khoản và code đã viết | Ảnh Saved, map có node xanh không hiện khóa | H-03-I/H-03-M: CONFIRMED nhãn/màu; completed state, cross-device/history/replay reward UNKNOWN |
| F-17 Hint — trợ giúp khi mắc | Mở dialog hint | Code che bằng dấu hỏi trong ảnh | H-03-H: CONFIRMED nội dung dialog; giá/điều kiện/ảnh hưởng score UNKNOWN |
| F-18 Community solutions — học cách khác | Mở Solutions | Tab nhìn thấy trong screenshot | H-06: CONFIRMED control; quyền truy cập/chấm điểm/xếp hạng lời giải UNKNOWN |
| F-19 Discussion/leaderboard/daily/social — cộng đồng | Tùy mode CodeFights | Nguồn toàn nền tảng không đủ gán cho Arcade | UNKNOWN cho từng tính năng Arcade cụ thể; tránh đưa Challenges/Interview vào inventory đã xác nhận |
| F-20 Animation/responsive/accessibility — phản hồi và tiếp cận | Hover, unlock, loading, viewport khác | Chưa quan sát chuỗi động lịch sử | UNKNOWN; mọi timing/breakpoint mới phải RECOMMENDATION |

## 3. Những gì khảo sát live bổ sung được

F-04–F-11 của **sandbox hiện tại** có bằng chứng B-01–B-06 riêng: sample/hidden và lỗi được mô tả tại [03](03-technical-observation.md). Chúng không nâng confidence của các luật Arcade lịch sử tương ứng. Thiếu hoàn thành thành công, Coin, profile và map live.

## 4. Quyết định áp dụng

MVP đề xuất giữ F-01–F-04, F-06–F-09, F-11 và tiến độ cá nhân của F-16. Chọn một dialect T-SQL. F-12 chỉ báo đúng/chưa đúng; XP cá nhân là đề xuất mới. F-10/F-14/F-17–F-19 để sau hoặc cần duyệt. Cụ thể tại [13](13-sql-arcade-proposal.md), không coi danh mục lịch sử là backlog tự động phải xây hết.

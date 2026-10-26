# Xử lý review tích hợp4.4–4.6

Đã đọc trọn report mới, range106701b..e0745bb. Không Critical/Important. F1 vẫn xếp Minor: lời hướng dẫn tại4.5/footer đúng, mâu thuẫn ở hướng dẫn chung chưa chặn thao tác; làm theo quyước4.6 để sửa cả góp ý nhỏ. Giữ report gốc, không thay assessment thành xác nhận live/UI hoặc quyền push.

## Finding và một lượt sửa

| Mục | Quyết định | Xử lý / kiểm |
|---|---|---|
| F1, giới thiệu/README giới hạn ngoại lệ1.1–1.5 và mặc định cóSQL thì cóbài tập | Làm theo | Dùng “bài không có mục Bài tập”, sửa mô tả bài đọc hiểu; bỏ danh sách nhóm cố định khỏi hướng dẫn hoàn thành. Sửa ở branch4.5 commit a4b4bc5, chuyển tiếp4.6 bằng merge9bab24a, không main. |
| Recommendations: kiểm bản sau sửa và giữ sáu đề/seed | Làm theo | 4.5 sau sửa318tests/check0/0/3/build129/dist1961/HTML2SQL0copy và câu hoàn thành mới. 4.6 kiểm lại source/build cuối theo verification/handoff; không sửa answer/guard/seed. |
| Các điểm giữ được / năm Review Focus | Không làm theo — giữ sản phẩm | Reviewer tự tính seed, so36cặp minh họa×đề, đọc66ô hiển thị/9SQL6copy, scan web, kiểm hash/prefix; không phát hiện số liệu/đề/metadata bị giấu. Không thêm tool/phạm vi. |

Ruling: F1 là copy hướng dẫn có thể hoàn tác, không thêm test khóa câu chữ theo chỉ dẫn phát triển và quyước. Trạng thái trước sửa được chứng kiến trên source/HTML trong report; sau sửa dùng existing suite/check/build/dist và đọc HTML quy tắc mới. Không gọi observation này là một test TDD mới. Không re-review chỉ để xác nhận prose; một lượt sửa, không có minor treo lại. Chi phí là mô tả completion cần tiếp tục giữ đồng bộ; dùng điều kiện không có mụcBài tập giảm phụ thuộc danh sách số bài.

## Từng mục Declined to judge

Các sốDJ theo đúng thứ tự report; không dòng nào bị bỏ. Quyết định giữ phạm vi không có nghĩa đã nghiệm thu hành vi.

| DJ | Quyết định | Kết luận tác giả / giới hạn và chi phí nếu sai |
|---|---|---|
|1.SQLServer syntax/PIVOT/metadata/decimal/collation/Unicode/runtime | Làm một phần | Fixture, primary docs và số học khớp; live pending do thiếu4biến. Không nâng thành engine pass; rủi ro runtime còn phải kiểm khi có kết nối. |
|2.DBhiệnthời/view/quyền | Làm một phần | Script không tạo view, bài dùng đề xuất và điều kiện tồn tại/quyền. Không triển khai view, không chứng nhận DBlive từ seed; hiện trạng live vẫn chưa kiểm. |
|3.Accesscode/kếtnối/API/rollback/data/graderthật | Làm một phần | Source guard/API không đổi, build78/typecheck; CLI exit1 trước connection. Luồng xác thực/chấm thật pending, không bỏ bảo vệ để ép chạy. |
|4.Copy/paste/F5/CtrlEnter/details/drawer/done/progress | Làm một phần | Payload/source đúng, chưa thao tác browser. Không khẳng định clipboard/phím/trạng thái thực tế hoạt động. |
|5.Viewport/overflow/màu/layout/accessibility/SSMS | Làm một phần | Dữ liệu/markup đúng trong phạm vi đọc; UI/SSMS chưa nghiệm thu. Có thể còn lỗi chỉ thấy bằng tương tác/hình ảnh, không gọi HTML là kiểm thị giác. |
|6.Nháp trình duyệt cũ/migration | Không làm theo — giữ phạm vi | Editor/progress/IDs/schema lưu trạng thái không đổi; không tạo migration hoặc claim đã thử nháp cũ. Nếu có lỗi nền, lượt này chưa chứng nhận khả năng tương thích đó. |
|7.Thời lượng35/25/40và tự học mọi người | Không làm theo — giữ ước lượng | Có lý thuyết/ôn/đề phù hợp nội dung, không có learner study/timing. Thời lượng có thể lệch; không hứa mọi học viên tự học thành công. |
|8.PIVOTđộng/UNPIVOT/indexedview/snapshot/DDL/quyềnthật/tuning | Không làm theo — ngoài thiết kế duyệt | Giữ giới hạn và dẫn bài sau; không mở backend/seed để bổ sung. Muốn học sâu hoặc triển khai là phạm vi riêng, không thuộc khả năng được hứa ở đây. |
|9.Helper nhưtranspiler tổngquát/MONTHNULL/ngàykhácISO/aggregatekhác | Không làm theo — không phải hợp đồng hiện tại | Test-only mô hình hẹp, sourceTuNgayNOTNULL/ISO; helper từ chối mẫu ngoài regex, không bảo đảm dialect tổng quát. Nếu tái dùng cho lớp đầu vào mới phải thêm kiểm riêng, không dùng cho production. |
|10.Tabs/NBSP/emailformat/deliverability/CCCDNULL/ngàyhợplệ | Không làm theo — luật đã chốt | Bài giới hạn dấu cách thường, SoCCCDNOTNULL, phép< và dấu hiệu cần xác minh. Không suy khôngkhớp là hợp lệ; các luật chất lượng khác chưa được bao phủ. |
|11.Pentest/bảomật toàn hệ thống/lỗi nền/coverage cũ | Không làm theo — không mở audit | Không đổi API/guard/grader; scananswer và kiểm liên quan đạt trong phạm vi. Không hứa pentest/coverage toàn hệ thống;3hints nền được ghi, không che thành lỗi mới. |
|12.Comment noExercises cũ nói bài trướcSELECT | Không làm theo — giữ comment nội bộ | Schema boolean/hành vi tổng quát đã dùng4.5, comment không hiển thị cho người học. Không đổi schema để sửa một mô tả nội bộ ngoài finding; chi phí là comment còn hẹp, maintainer nên đọc trường/usage thật. |
|13.Forensic thứ tự đọc answer ở các reviewer | Làm một phần | Root trực tiếp khóa snapshot trước followup cấpYAML; hash/prefix và report giữ nguyên, không có bằng chứng vi phạm. Không claim artifact chứng minh mọi lần đọc riêng tư của agent; độc lập review được hiểu theo giao việc/cổng đã thực hiện, không phải audit forensic. |
|14.Reviewer không tự chạy suite/build/typecheck/dist | Làm theo — tác giả kiểm | Log của tác giả tách khỏi purechecks của reviewer. Tác giả chạy kiểm bản cuối; không gán các pass cho reviewer. Chi phí giới hạn độc lập thực thi được công khai, không có “review pass thay tests”. |
|15.Push/merge/deploy/protection/productionready | Không làm theo — giữ local | Chưa push/merge main/deploy, không dùng assessment làm quyền mới. Local feature merge chỉ chuyển fix4.5 vào4.6; publish/live/UI cần công việc riêng theo quyền của người làm khóa học. |

Không có Critical/Important mới hoặc minor deferred. Comment ởDJ12 được quyết định giữ riêng, không âm thầm coi là đã sửa. Source/HTML và số học không thay nghiệm thu SQLlive/UI; người nhận có đủ đường dẫn report/ma trận/verification để xem chi tiết.

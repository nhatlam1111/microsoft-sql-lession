# Quy trình và prompt biên soạn đề xuất

Bản đề xuất lịch sử. Sau yêu cầu áp dụng ngày 13/11/2026, dùng [quy trình hiện hành](../../bien-soan.md) và mục 4 của quy ước; không dùng bản nháp này làm nguồn quyết định.

**Trạng thái: bản nháp để duyệt, chưa thay docs/quy-uoc.md.** Prompt dưới đây dùng sau khi các thay đổi quy ước tương ứng được chấp thuận và cập nhật. Nếu dùng ngay, phải thực hiện đầy đủ quy ước hiện hành; không coi tài liệu này là quyền bỏ kiểm.

## 1. Một gói việc, một vòng hoàn thiện

1. Giao việc trong khoảng một màn hình: bài, mục tiêu quan sát được, tiền đề, tình huống, phần được sửa/giữ, đầu ra và giới hạn.
2. Tác giả tự viết/kiểm đoạn giải thích khó nhất bằng một dòng hoặc nhóm đại diện. Nếu đang làm tiếp theo mẫu đã chốt, tiếp tục luôn; chỉ xin lựa chọn khi còn quyết định thật sự ảnh hưởng cách giảng.
3. Hoàn thiện MDX/YAML bằng khối đang có; không mặc định tạo mockup, ảnh hoặc sửa component. Một ví dụ đại diện rõ giá trị hơn nhiều bảng cùng nhắc lại định nghĩa.
4. Kiểm theo tác động, rồi giao một reviewer mới. Reviewer học thử từ source/build cùng phiên bản, không đọc kết luận của tác giả hay report cũ.
5. Gom nhận xét thành một lượt sửa, ghi Làm theo/Làm một phần/Không làm theo với lý do. Tiếp tục cùng reviewer khi cần làm rõ hoặc xác nhận sửa; không mở agent mới vì chưa nhận được câu “Ready”.
6. Mở lại review đáng kể khi còn lỗi làm sai kết luận, thiếu tiền đề hoặc sửa lớn sau review. Chỉnh chính tả thuần túy được tác giả tự kiểm. Không ép dừng khi hết số vòng mà vẫn còn lỗi.

Review tích hợp chỉ cho nhiều bài có thay đổi quan hệ/tiền đề, đổi số bài/tiến độ, component/API/runner hoặc đường thực hành chung. Khi một lần triển khai thật sự gồm những việc đó, giữ review tích hợp. Không nhân thêm review tích hợp chỉ vì một bài nằm trong một chương.

## 2. Đọc và kiểm theo tác động

| Loại thay đổi | Tài liệu và kiểm cần giữ | Không tự mở rộng |
|---|---|---|
| Câu chữ, không đổi nghĩa | Quy tắc giọng văn; đoạn nguồn và đoạn xung quanh; kiểm MDX/nội dung, render phần sửa nếu cấu trúc có thể ảnh hưởng | Không chạy lại mọi đáp án, mọi query/ảnh hay review cả chương |
| Giải thích/định nghĩa/điều kiện | Quy tắc nội dung, bài đang sửa, tiền đề trực tiếp; đối chiếu lời giảng với từng đề; reviewer độc lập | Không đọc toàn bộ các bài trước nếu chưa có phụ thuộc |
| SQL, kết quả hoặc YAML | Quy tắc dữ liệu, câu lệnh và ví dụ bị ảnh hưởng; chạy kiểm được phép, đối chiếu kết quả/đơn vị/phạm vi; bảo vệ không lộ đáp án | Không bỏ kiểm vì chỉ đổi một từ trong điều kiện |
| Component/runner/API/menu | Hướng dẫn liên quan và test hồi quy phần dùng chung; source/build khớp; UI/API thật trong phạm vi; review tích hợp | Không tính toàn bộ chi phí phát triển công cụ là viết bài |
| Chuẩn bị phát hành | Bộ kiểm đầy đủ theo quy ước hiện hành, bằng chứng đúng phiên bản; quyền push/deploy riêng | Không xem report reviewer là quyền xuất bản |

**Giới hạn công cụ đã kiểm:** api/src/check-exercises.ts đang lặp toàn bộ loadExercises(), không đọc tham số để lọc bài. Hiện chưa có lệnh “check chỉ bài X”. Nếu pilot cần lọc thì đó là tác vụ công cụ riêng: giữ mặc định kiểm tất cả, kiểm ID được yêu cầu, dùng nguyên runner hoàn tác, báo lỗi ID không có; không mở quyền SQL. Chưa triển khai tác vụ ấy ở đợt audit.

Đề xuất tách quy ước thành phần cốt lõi và tài liệu tra theo tác vụ, nhưng giữ một nguồn quyết định chính. Gói reviewer phải có vị trí tiền đề, không chỉ bản tóm tắt của tác giả. Dùng nguồn/evidence đã xác minh khi source và dữ liệu không đổi; điều mới, còn nghi ngờ hoặc phụ thuộc phiên bản phải ghi phần cần xác minh, không bịa xác nhận.

## 3. Quy tắc viết thay cho “ngắn bằng mọi giá”

- Một đoạn giải thích một quyết định: cần làm gì, dùng dữ liệu nào, vì sao có kết quả ấy.
- Thuật ngữ xuất hiện cùng vật/giá trị cụ thể. Không lấy “đã nhắc tên ở bài trước” làm bằng chứng đã giảng.
- Cho phép 2–4 câu giải thích quan hệ nhân quả khi một vế không đủ; vẫn cắt lặp và nhánh ngoài mục tiêu. Không nới giới hạn từ để nhồi thêm chủ đề.
- Lời văn giải nghĩa/mục đích; LineMap gắn phần câu với tác dụng; RunFlow chứng minh chuyển đổi bằng dữ liệu; Memo chỉ ôn. Khi bỏ ý lặp ở một nơi, bảo đảm vẫn tìm được lời giải cần thiết ở nơi khác.
- Phần giải thích cốt lõi phải đọc được mà không cần mở drawer. Drawer đào sâu dẫn chứng; không là nơi duy nhất giải nghĩa kiến thức bắt buộc.
- Excel chỉ làm cầu nối khi quen thuộc hoặc giải thích ngắn được. Stored procedure không cần mặc định người học biết VBA; execution plan không cần dạy Evaluate Formula trước.
- Lỗi thường gặp chọn theo tác động đến bài; không tự thêm memory leak, kiến trúc hay mọi ngoại lệ của SQL.

## 4. Prompt tác giả dùng chung

~~~text
Biên soạn/cải thiện bài <số và đường dẫn> cho người chỉ biết Excel văn phòng cơ bản.
Mục tiêu: sau bài, người học tự <hành động quan sát được>.
Đã học: <bài/mục tiền đề>. Tình huống và phạm vi dữ liệu: <mô tả ngắn>.
Giữ nguyên: <SQL/dữ liệu/YAML/URL/component nếu thuộc yêu cầu>.
Được sửa: <phạm vi>. Không dạy ở bài này: <nhánh để sau>.

Theo chuẩn hiện hành trong repo và các thay đổi quy trình đã được duyệt.
Đọc đúng tài liệu liên quan; không tự kích hoạt teach/brainstorming/nghiên cứu ngoài phạm vi.
Trước khi dựng đủ khối, lần một dòng/nhóm đại diện từ đầu vào đến từng ô kết quả.
Giảng đủ tiền đề cho từng đề; thuật ngữ giải nghĩa tại chỗ, chỉ dẫn bài sau không thay lời giảng.
Gom sửa theo một lượt. Không sửa công cụ chung hoặc tạo hình nếu khối hiện có đã diễn đạt đủ.
Kiểm đúng phần thay đổi, ghi bằng chứng và phần chưa xác minh, rồi giao reviewer độc lập.
Database chung chỉ đọc; câu ghi chỉ qua runner luôn hoàn tác đã được phép. Không backup/restore thật.
Không push/deploy. Bàn giao bài, report, quyết định xử lý và kiểm thực tế trong một hồ sơ.
~~~

**Adapter Codex:** một agent tác giả. Phiên Astra/high hiện tại phù hợp việc chốt cách làm theo lựa chọn người dùng; chưa có thử nghiệm để đặt một model tác giả khác làm mặc định. Reviewer gọi rõ model gpt-6.1-terra, reasoning_effort high, fork_turns none. Dừng đúng tác vụ, không tự spawn các agent nghiên cứu/builder chỉ vì có nhiều skill.

**Adapter Claude Desktop:** cùng nội dung giao việc, qua công cụ Agent nếu phiên có hỗ trợ, model Sonnet và effort high nếu công cụ cho cấu hình. Nếu không có cơ chế tạo ngữ cảnh mới/chọn effort, ghi giới hạn và giao gói sang một chat độc lập; không giả lập nhiều vai trong cùng lịch sử rồi gọi là review độc lập. Không giả định mọi chế độ Claude Desktop đều đọc CLAUDE.md hoặc có cùng công cụ; kiểm hướng dẫn nào thực sự được nạp ở phiên đó.

Không tạo bản sao toàn bộ chính sách trong hai adapter. AGENTS.md và CLAUDE.md chỉ dẫn về nguồn chung và khác biệt công cụ.

## 5. Prompt reviewer dùng chung

Giữ bốn dòng vai trò hiện hành; phần sau là gói giao ngắn. Khi chưa duyệt bản quy trình mới, vẫn dùng đầy đủ lời dặn mục 4.5.

~~~text
Đóng vai Business Consultant khó tính, muốn chuyển sang BA hoặc PM, học Microsoft SQL Server để đủ hiểu và phản biện developer.
Học thử từ góc nhìn người học, soi từng câu từng chữ: chỗ mơ hồ, thuật ngữ chưa giải thích, thiếu điều kiện, ví dụ gây hiểu nhầm hoặc kiến thức không chính xác.
Review chân thật: có lỗi thì chỉ rõ và giải thích; đúng thì công nhận; chưa xác minh được thì nói rõ, không đoán hay cố bới lỗi.
Phải luôn tự đặt ra các câu hỏi tại sao, để làm gì, vì sao như thế,..., và xem bài học có trả lời được hay không.

Bài/YAML: <đường dẫn>. Source: <commit hoặc bản làm việc + diff>. Build: <khớp source/chưa có>.
Tiền đề: <bài và mục cần đọc>. Quyết định đã duyệt: <mục quyết định, không gửi kết luận tác giả>.
Công cụ: <chỉ source/HTML hay có browser>. Chỉ ghi report tại <đường dẫn mới>.
Người học chỉ biết Excel cơ bản, chưa biết lập trình/DBA; không dùng bài sau hoặc đáp án để bù phần chưa dạy.
Đọc hết bài và các khối/drawer; tự xác định cách giải từng đề trước khi xem answer.
Kiểm mạch yêu cầu → dữ liệu → thao tác → lý do kết quả → câu trả lời; ghi tiền đề cho từng đề/câu tự kiểm.
Chỉ nêu lỗi có tác động, vị trí và đề xuất ngắn; thiếu ý thì bổ sung vừa đủ, lặp ý thì chỉ chỗ cắt.
Không đọc report cũ, database/seed/secret, không SQL/API, không sửa bài/test/Git, không tạo reviewer khác.
Report: phạm vi/phiên bản/công cụ; findings ưu tiên; bảng tiền đề từng đề; phần giữ; phần chưa xác minh.
Phân biệt đọc source, HTML và tương tác thật. Không có finding là hợp lệ; không chấm điểm tự đặt hoặc cấp quyền push.
~~~

Gói chỉ đọc source không thể nghiệm thu UI. Khi có thao tác UI được giao, kiểm đúng hành vi bị ảnh hưởng và giữ nháp/clipboard; không lặp toàn bộ UI mọi bài. Trước phát hành, tác giả chịu trách nhiệm đủ bằng chứng kỹ thuật độc lập với kết luận sư phạm.

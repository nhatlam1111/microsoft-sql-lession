# Rà soát cách biên soạn bài SQL Server cho BA/PM

Ngày 13/11/2026 · Source HEAD: 4066c0f3e589c7b34a02106702aa1351cc3ade23.

**Cập nhật sau audit:** người dùng đã yêu cầu áp dụng. Quy trình hiện hành ở [bien-soan.md](../../bien-soan.md); phạm vi pilot và kết quả ở [kế hoạch pilot](../../superpowers/plans/2026-11-13-authoring-pilot.md). Phần dưới giữ kết luận và trạng thái tại thời điểm audit, không thay các tài liệu hiện hành.

**Kết luận:** ưu tiên sửa cách chốt lời giải thích và phạm vi công việc trước khi tăng review hoặc đổi model. Mẫu lịch sử cho thấy có kiểm kỹ thuật và review đầy đủ nhưng người làm khóa học vẫn chưa hiểu cách đi từ đầu vào tới kết quả. Phần 4–5 cần chuyển đầu ra từ tự vận hành database sang đọc hiểu, đối soát và phối hợp.

Đây là báo cáo và đề xuất, **chưa thay quy ước hiện hành**. Không sửa bài, skill, test, API, dữ liệu, menu hay số bài; không chạy SQL, không push/deploy. File premium-audit.json đã có trước đợt này, không thuộc phạm vi.

## 1. Ba ưu tiên có bằng chứng

| Ưu tiên | Bằng chứng trong mẫu | Đề xuất | Rủi ro khi cắt quá mức |
|---|---|---|---|
| 1. Kiểm sớm cách giải thích, trước khi dựng đủ khối | Chat “Đọc quy ước mới nhất”: lượt làm 3.1–3.2 dài 39,18 phút, 59 response của tác giả, 3 agent review. Sau đó người dùng vẫn nói drawer GROUP BY/SELECT chưa giúp hiểu kết quả. Phát sinh prototype, thu gọn prototype và sửa drawer | Tác giả tự lần một dòng/nhóm đại diện: dữ liệu nào → phép xử lý nào → vì sao ra từng ô. Chỉ làm khối tương tác sau khi đoạn này rõ; cần đổi thiết kế giảng thì cho người làm khóa học xem đoạn ngắn | Cắt minh họa quá sớm sẽ lại biến cơ chế thành lời khẳng định |
| 2. Giới hạn đọc lại, kiểm lại và review tích hợp | Bài đếm có điều kiện mang số 3.10 tại thời điểm log giữ ba đề; vẫn có 2 reviewer, 3 lần xuất hiện npm test, 2 check:exercises và 2 bộ check/build/dist trong command | Gom sửa; phân loại tác động; giữ review độc lập bài, chỉ review tích hợp khi thật sự có thay đổi xuyên bài/công cụ | Không được bỏ kiểm SQL/YAML khi đổi nghĩa; không mặc định mọi lần kiểm thứ hai đều thừa |
| 3. Chốt gói việc và skill theo đúng mục tiêu | “Review bài học 1.1” chuyển sang 1.3 và tạo/chỉnh hình theo yêu cầu mới. Chat 3.8–3.9 sau đó thêm bài, migration tiến độ/API và deploy. Teach mặc định hướng Principal/Master | Một gói biên soạn có phạm vi rõ; việc hình/công cụ/curriculum ghi thành hạng mục riêng. Skill biên soạn dùng mục tiêu BA/PM, không kéo theo dạy tương tác/kiến trúc | Không tách đến mức mất liên hệ giữa bài và bài tập; không từ chối sửa công cụ khi thật sự cần |

Đây là thứ tự ưu tiên theo tác động và bằng chứng, không phải tỷ lệ tiền/token tiết kiệm đã đo. Nhiều thay đổi do người dùng yêu cầu: không quy thành lỗi agent tự mở phạm vi.

## 2. Usage: đo được gì

Đã đọc 28 lượt của ba chat Codex và log của 27 agent con trực tiếp được tìm thấy. Các lượt tác giả trong mẫu ghi Sol/xhigh; không dùng chúng để kết luận Astra/high của phiên hiện tại đắt hay rẻ hơn. Đã đọc thêm một log Claude của công việc biên soạn, tách khỏi log phát triển Arcade.

| Công việc lịch sử | Thời gian lượt | Response tác giả | Input / cache / output của tác giả | Agent con bắt đầu |
|---|---:|---:|---|---:|
| Sửa bài đếm có điều kiện, số 3.10 lúc đó | 25,65 phút | 36 | 13.074.654 / 13.004.288 / 39.951 | 2 |
| Sửa 1.1 theo kế hoạch giảm tải | 10,72 phút | 26 | 4.086.830 / 4.025.472 / 24.534 | 1 |
| Hoàn thiện 3.1–3.2, trước phản hồi drawer | 39,18 phút | 59 | 17.988.753 / 17.885.568 / 76.060 | 3 |
| Thêm hai bài subquery cùng thay đổi tiến độ/API | 37,17 phút | 77 | 14.659.645 / 14.536.576 / 68.238 | 3 |
| Merge/push/deploy cuối chat 3.8–3.9 | 4,49 phút | 21 | 6.041.857 / 5.756.928 / 4.167 | 0 |

**Phân biệt số bài:** số 3.10 trong dòng đầu là bài đếm có điều kiện ngày 04/11, không phải bài Subquery trong SELECT hiện đang được lấy mẫu sư phạm. Không dùng hai bài này làm cặp trước/sau.

Riêng hai reviewer của bài đếm có điều kiện có tổng 32 response, input 1.791.872, cache 1.676.928, output 10.837. Đây là tổng các log con, để riêng với tác giả; thời gian review có thể chồng lấp nên không cộng thời gian thành thời gian hoàn thành.

Log Claude được chọn có 351 message assistant duy nhất có usage, 15 lần giao Agent, 79 Read, 185 Bash và 167 Edit. Usage agent chính: input 698, tạo cache 2.899.183, đọc cache 165.082.740, output 553.646 theo các trường của log. Đây là công việc nhiều bài qua 19–20/10, không phải một bài; chưa thu usage các agent con Claude. Tám lượt giao reviewer dùng opus trước khi có yêu cầu đổi sang sonnet; bảy lượt sau dùng sonnet. Không áp quy ước mới hồi tố để gọi các lượt cũ là vi phạm. Effort Claude chưa được xác lập từ mẫu log.

### Cách tính và giới hạn

- Codex: cộng usage một lần mỗi response_id trong token_usage_record; không cộng token_count hoặc các trường cộng dồn lần nữa. Tổng từng lượt khớp trường turn_token_usage cuối của cả 28 lượt. Reasoning nằm trong output, không cộng thêm.
- Claude: lấy usage cuối mỗi message.id, khử trùng tool_use.id. Trường input/cache của hai hệ thống có cách biểu diễn khác nhau; không so trực tiếp số response Codex với message Claude.
- Các command kiểm đếm bằng chuỗi lệnh xuất hiện, không khẳng định mọi lệnh trong chuỗi đều chạy xong. Số đọc tài liệu là số command đọc/tìm có nhắc tên tài liệu, không phải số lần đọc toàn bộ.
- Giai đoạn công việc được gắn theo yêu cầu và diễn biến. Một lượt có thể chứa viết, kiểm, review và sửa; không phân bổ token giả cho từng giai đoạn. Một lượt tạo hình thiếu task_complete nên thời gian để trống.
- Input cộng dồn gồm cache lặp qua nhiều lần gọi, không phải lượng văn bản độc nhất hay hạn mức bị trừ tương ứng. Không quy đổi ra tiền, phần trăm quota hoặc số bài/tuần.
- Chỉ phân tích mẫu được chọn; không đọc toàn bộ lịch sử tài khoản. Nội dung thô, secret và reasoning không được sao chép vào báo cáo.

Một lỗi thao tác có thể giảm ngay: lượt lập kế hoạch thêm subquery có 7 command trả mã khác 0, nhưng chỉ xác nhận trực tiếp 3 command gặp đường dẫn không có hoặc wildcard đường dẫn không hợp lệ trên Windows. Các command còn lại có thể gồm tìm kiếm không có kết quả; không gọi cả 7 là lỗi công cụ. Đề xuất tìm đường dẫn bằng rg --files trước khi đọc, và dùng glob của rg thay vì đoán tên file.

[Bằng chứng định lượng](usage-evidence.json) chứa ID lượt, hash log, số liệu từng lượt, nhãn giai đoạn và agent con. Các log gốc vẫn ở máy người dùng.

## 3. Quy trình và skill cần thay đổi

Đề xuất quy trình **giao việc ngắn → viết lời giải thích cốt lõi → hoàn thiện bài → kiểm theo tác động → reviewer độc lập → gom sửa → nghiệm thu**. Chi tiết và prompt dùng cho hai công cụ ở [workflow-prompts.md](workflow-prompts.md).

Ba tài liệu hiện hành có khoảng 72.482 ký tự, chưa gồm bài mẫu và bài trước. Không phải tất cả đều thừa: cần tách quy tắc cốt lõi khỏi hướng dẫn theo loại thay đổi. Hướng đọc theo nhu cầu và skill chỉ dẫn tới tài liệu cần thiết phù hợp với [hướng dẫn OpenAI đã đối chiếu trong phiên lập kế hoạch](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra). Không tra cứu SQL/Excel trên web trong đợt này.

| Skill/hướng dẫn | Nhận xét | Quyết định đề xuất |
|---|---|---|
| teach | Tạo workspace/HTML; mục tiêu Principal/Master; tự kích hoạt tìm nguồn; so Junior/Principal | Giữ cho dạy tương tác khi được gọi rõ. Không dùng làm quy trình biên soạn mặc định; tạo hướng dẫn biên soạn riêng nếu áp dụng đề xuất |
| source-verifier | Hứa bảo đảm 100%, điểm 0–100 và badge bắt buộc chưa chứng minh chất lượng lời giảng | Thay tiêu chí điểm bằng nguồn hỗ trợ đúng khẳng định và phần chưa xác minh. Không tự nghiên cứu lại kiến thức không thay đổi |
| hidden-case-trainer | Bẫy memory leak, race condition và kiến trúc vượt mục tiêu thường nhật | Với bài BA/PM chỉ chọn lỗi ảnh hưởng kết luận như trùng dòng, thiếu dữ liệu, sai phạm vi; không mặc định bài nào cũng có bẫy nâng cao |
| cognitive-pacer | Suy mệt mỏi từ độ trễ, quay về RAM/OS và gắn “Master” sau lịch ôn | Không suy trạng thái người học từ thời gian người làm khóa học trả lời. Chỉ dùng phản hồi/bài làm thật khi có học viên |
| brainstorming/Superpowers | Có giá trị khi chưa rõ cách giảng; lịch sử còn thêm thiết kế, builder check, prototype vào công việc | Dùng khi có quyết định sư phạm hoặc công cụ mới; cập nhật bài đã có mẫu không tự mở lại toàn bộ thiết kế |
| AGENTS/CLAUDE/quy ước/template | Phạm vi đọc và kiểm rộng; một số yêu cầu hình thức dễ lấn át tiêu chí hiểu | Giữ một chuẩn chung, adapter theo công cụ, đọc theo tác động và kiểm ý nghĩa thay cho khóa câu chữ |

Bốn cặp SKILL.md trong .agents và .claude **giống nhau từng byte** tại lúc kiểm; không có lỗi lệch bản sao. Đây là vấn đề phù hợp mục tiêu, không phải lỗi đồng bộ.

## 4. Nội dung và chương trình

[Review sư phạm độc lập](pedagogy.md) đã kiểm từng câu tự kiểm của 1.1/3.10 và từng đề 2.1/3.10, đọc đầy đủ các khối trong source và các đoạn tiền đề cần thiết. Có ba mẫu trước/sau, chưa áp dụng vào bài.

Kết luận mẫu: phần lớn tiền đề đã được dạy; vấn đề nổi bật là nối lý do với ví dụ và chia nhịp giải thích. Không có căn cứ từ mẫu này để kết luận toàn khóa “sai kiến thức” hay bảo đảm học viên thực tế hiểu.

| Nhận xét reviewer | Xử lý trong đề xuất |
|---|---|
| 1. COUNT(MaHD) cần cầu nối với số dòng | Làm một phần: đề xuất giải thích điều kiện mã khác NULL; chưa đổi câu sang COUNT(*) hay xác nhận ràng buộc thật khi chưa kiểm |
| 2. “giá trị khóa” xuất hiện sớm | Làm theo: giải thích bằng mã chung ngay tại chỗ, để chi tiết khóa ở bài 1.4 |
| 3. Đoạn 3.10 trộn nhiều quyết định | Làm theo: chia theo tính gì, lọc ở đâu; giữ điều kiện cần cho bài tập |
| 4. Lặp giữa LineMap và drawer | Làm một phần: cắt diễn giải trùng, giữ hai ví dụ tạo ra 3 và 0 |
| 5–6. Phần giữ được | Giữ; không thêm cảnh báo cho đủ số finding |

[Ma trận phần 4–5](curriculum.md) đánh giá đủ 19 bài và đề xuất giữ/gộp/chuyển tùy chọn/bổ sung. Ưu tiên sửa định hướng 4.3, 5.6, 5.8; giữ cách phân biệt đọc hiểu với triển khai ở bài 4.8. Chưa đổi số, URL hoặc tiến độ.

## 5. Thử nghiệm sau đợt này và nghiệm thu

Đề xuất pilot đúng hai bài hiện có: **1.1** (bài nền) và **3.10 Subquery trong SELECT** (bài truy vấn). Chỉ sửa lời giảng theo mẫu, giữ mục tiêu, dữ liệu và bài tập; chưa chạy pilot trong đợt audit.

- Cùng một người làm khóa học xem ba tiêu chí: hiểu thuật ngữ tại chỗ, giải thích được vì sao ra một ô kết quả, biết dữ liệu đó trả lời được gì. Reviewer kiểm đủ tiền đề từng đề; kiểm thực tế với học viên thì ghi riêng, không mô phỏng thành bằng chứng.
- Đo tác giả/reviewer riêng; ghi input/cache/output, lần gọi, thời gian, số vòng sửa, lỗi trọng yếu và command kiểm. Cố định model/effort giữa các mẫu muốn so; ghi rõ thay đổi phạm vi.
- Chỉ gọi là cải thiện khi giảm công việc lặp và không tăng lỗi trọng yếu hoặc thiếu tiền đề. Không đặt trước mức giảm phần trăm.
- Không có baseline cùng nhiệm vụ/model thì chỉ báo số đo pilot và hạn chế so sánh, không kết luận nhân quả. Không cố tạo thêm hai lần viết đầy đủ chỉ để có phép đo.

Đợt audit hoàn tất khi có bảng usage có nguồn, quy trình/prompt, ba mẫu biên tập, bảng tiền đề và ma trận 19 bài; kiểm JSON, liên kết nội bộ, phép cộng và diff. Không cần build/SQL/UI cho các tài liệu báo cáo này; không báo những kiểm đó là đạt.

**Kết quả kiểm ngày 13/11:** JSON đọc được; tổng usage từng lượt khớp dữ liệu cộng dồn của 28/28 lượt; 27 ID agent con không trùng giữa ba mẫu; liên kết tương đối trong bộ tài liệu tồn tại; ma trận có đủ 19 bài. Kiểm phạm vi cho thấy chỉ thêm thư mục audit và kế hoạch audit, không sửa tracked source. Đã kiểm trực tiếp cả file mới vì git diff --check không bao phủ file untracked. Không phát hiện lỗi cấu trúc tài liệu chặn bàn giao.

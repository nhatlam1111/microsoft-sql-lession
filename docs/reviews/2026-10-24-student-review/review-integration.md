# Review tích hợp: Giới thiệu, bài 1.1–3.7 và editor

Ngày review: 25/10/2026. Vai trò: Senior Code Reviewer, một lượt độc lập sau review từng bài; kế thừa model Codex của phiên, không override model, không tạo agent khác.

Phạm vi đã đọc: toàn bộ diff code/nội dung/quy ước/test liên quan trong `df7e810efef8329bfdf6634ff75e8f27d06c54fe..5e988b1a1764f35cc1a1fa0aa93119412d6b92ac`; đọc ngữ cảnh các đoạn thay đổi và mạch Giới thiệu → 1.1 → 1.2 → 1.6 → lọc/chuỗi/ngày → tổng hợp/kết bảng. Đã đọc `AGENTS.md`, quy ước, template, hồ sơ công ty, spec, plan và integration brief. Không đọc lại 21 report từng bài để hình thành kết luận; có đọc README hồ sơ và các hàng ma trận liên quan để đối chiếu quyết định/evidence.

## Strengths

1. **Hai lối thực hành nhất quán và không chặn người chỉ dùng web ở 1.2.** Giới thiệu nói rõ điều kiện hoàn thành theo lối web (`src/pages/gioi-thieu.astro:21`); bài 1.2 lặp đúng tại chỗ chọn công cụ, trước câu mẫu và tại tự kiểm (`src/content/lessons/1-2-sql-server-ssms-hrm-demo.mdx:51`, `:98`, `:154`). Bài 1.6 đổi “đã chạy” thành “đã thấy” và chỉ rõ bấm Làm bài trước khi thử câu mẫu (`src/content/lessons/1-6-cau-select-dau-tien.mdx:41`, `:207`). Với SSMS, tên database riêng và chung được phân biệt; cảnh báo script xóa/tạo bảng và SSMS không tự hoàn tác vẫn còn.

2. **Sửa editor nhỏ, đúng nơi dùng chung và giữ tương thích nháp.** `loadDraft(exercise.id) ?? ''` chỉ dùng giá trị mới khi không có nháp, không loại chuỗi rỗng và không so khớp/xóa comment cũ (`src/components/islands/ExerciseWorkspace.tsx:28`). Hướng dẫn nằm trong thuộc tính `placeholder`, tách khỏi value SQL (`src/components/islands/SqlEditor.tsx:56`); CSS đặt màu đọc được trên lớp textarea vốn trong suốt (`src/styles/exercise.css:28`). Không đổi khóa lưu trữ, hàm lưu nháp, Tab/undo, bộ gửi câu hoặc API. Test mới render component thật, bảo vệ nháp rỗng, nhiều dòng, comment cũ và storage ném lỗi (`tests/exercise-workspace.test.ts:18`, `:30`, `:35`).

3. **Việc rút bài nhìn chung giữ tiền đề và giới hạn cần thiết.** UNKNOWN được tập trung ở 2.5, không còn bắt người học nắm sớm ở 2.2. Bài 2.7 vẫn có tám hàm và COLLATE; ba đề công khai vẫn có kiến thức để làm, gồm giữ Email NULL, UPPER và CONCAT. Bài 2.8 giữ cách tạo mốc, ranh giới DATEDIFF, MONTH/EOMONTH và giới hạn ngày có giờ; ba đề không cần phần bị cắt. Bài 3.6 đi từ độ chi tiết tới dòng lương lặp, kiểm tối đa một ứng viên và đối chiếu đủ dòng; không biến điều kiện ngày thành bảo đảm duy nhất (`src/content/lessons/3-6-ket-nhieu-bang.mdx:82`, `:91`, `:99`).

4. **Các phạm vi hiển thị được nối rõ hơn.** Bài 1.6 định nghĩa thẻ ba dòng và số `+n`, bài 3.1 phân biệt 3 trên thẻ/10 trong drawer/20 tổng, còn bước WHERE là 9. Bài 3.2 có COUNT đúng phạm vi đang làm để đối chiếu tổng PivotTable. ERD đầy đủ vẫn ở 1.5; bảng cặp cột tại 3.4/3.6 đủ nối trở lại ERD mà không mất điều kiện quan hệ/ngày/kỳ.

5. **Bảo vệ sau build và thứ tự học có kiểm riêng.** Câu tự kiểm chuyển về sau Memo, trước Bài tập; summary có nháy SQL dùng JSX literal. `findCodeTypographyProblems` được gọi trên HTML build và có test phân biệt nháy cong trong code với nháy trong lời văn (`scripts/check-dist.mjs:78`, `:109`; `tests/check-dist.test.ts:7`). Các assertion bị rút ở 2.2 chuyển trọng tâm về NULL và tham chiếu 2.5, không xóa kiểm số dòng, Unicode hoặc điều kiện ngày.

6. **Scope được giữ.** `git diff --quiet base..head -- src/content/exercises api database src/content/lessons/2-1-chon-cot-dat-ten-cot.mdx` trả exit 0. Có 51 file bài; không có thay đổi bài tập/đáp án, API hoặc seed trong nhánh được review. Không thấy đường code mới đưa answer/check ra component hoặc trang web.

## Issues

### Critical

Không có finding được xác lập.

### Important

Không có finding được xác lập.

### Minor

Không có finding được xác lập.

## Declined to judge

- **Không ép đưa luật DISTINCT/ORDER BY về phần chính của 2.6 chỉ để theo focus khái quát.** Ở `src/content/lessons/2-6-distinct-bo-dong-trung.mdx:183`, đây đúng là nơi duy nhất giải thích luật cột sắp phải nằm trong danh sách chọn. Điều đó có sức căng với focus “Hay nhầm không thành chỗ dạy kiến thức mới”. Tuy nhiên chỉ dẫn riêng đã được duyệt là chuyển quy tắc này vào Hay nhầm, không chép lặp; ma trận cũng ghi quyết định đó tại `docs/reviews/2026-10-24-student-review/verification.md:64`, và người điều phối đã xác nhận trong lượt review. Đã kiểm tác động thực tế: phần chính có mẫu DISTINCT một/nhiều cột và thứ tự DISTINCT → ORDER BY; cả ba đề 2.6 đều sắp theo chính cột được trả. Không xác lập thiếu kiến thức để hiểu câu chính hoặc làm đề, nên giữ quyết định cụ thể và không tạo finding bố cục trái yêu cầu đã duyệt.

- **Không xác nhận lại số liệu SQL, Result, RunFlow hoặc lỗi database bằng live SQL.** Không kết nối database, không chạy câu SQL, không đọc seed, .env hoặc secrets; không chạy API/runner đáp án. Đã xét tính nhất quán giữa phần thay đổi, giả định và hồ sơ công ty. Các con số 79 SELECT/36 Result/68 bước, rollback 54 đáp án và check:data là evidence tác giả được README dẫn, không phải các kiểm tôi tự chạy.

- **Không coi unit test SSR là kiểm tương tác browser.** Test editor mới bảo vệ state khởi tạo/markup; nó không chứng minh focus, gõ/dán, undo, F5, reload, storage bị từ chối thật hoặc sự khớp hai lớp tô màu. Không lặp thao tác browser trong lượt này, không xác nhận độc lập ma trận 22 trang ở 1280/1440. README có evidence browser riêng của tác giả; đây là giới hạn xác minh, không tự suy thành lỗi.

- **Không nhận finding resize của scanner là lỗi runtime đã được chứng minh.** Strict audit tôi tự chạy trả exit 1, một finding `form.textarea-resize-missing` tại `SqlEditor.tsx:53`. Source có `resize: none` cho chính `.ed-input` (`src/styles/exercise.css:27`), owner cao 280px và có vùng cuộn (`:19`–`:23`); finding không nhận được liên hệ class/CSS. Chưa kiểm computed style trong browser ở lượt này; không đổi scanner hoặc báo audit PASS.

- **Không xác nhận cài đặt/kết nối bằng SSMS native, thời gian học thật hoặc khả năng học độc lập của cả nhóm người mới.** Đây không phải kết quả có thể suy từ diff, HTML hoặc test. Phần chỉ dẫn đã được giữ các lựa chọn môi trường và giới hạn cần thiết; thực hành trên một máy Windows mới vẫn là khoảng trống kiểm thực tế được tác giả công bố.

- **Không mở rộng sang auth/API, định dạng answer YAML hoặc đổi các lựa chọn đã chốt.** Các đường code đó không đổi trong diff. Không thấy hệ quả mới từ placeholder hoặc đoạn hướng dẫn buộc phải thay chúng. Không xác nhận lại toàn bộ an toàn backend hoặc bộ chấm chỉ từ việc không có diff; cũng không yêu cầu bỏ SELECT ở 1.2, đổi tổng 20/+17 ở 3.1, thêm COUNT ở 3.7 hay sửa đáp án ngoài phạm vi.

## Kiểm độc lập đã chạy

| Kiểm | Kết quả thực tế của lượt này |
|---|---|
| `npm test` | Exit 0; 41/41 file, 295/295 test. |
| `npm run check` | Exit 0; 161 file, 0 errors, 0 warnings, 3 hints deprecated: FormEvent hai vị trí và document.execCommand. Các dòng tương ứng đã tồn tại ở base, không phải hồi quy của diff. |
| `npm run check:dist` | Exit 0; 108 trang, 1.742 link trên dist hiện có. Không tự chạy lại build trong lượt này; không gọi đây là một build độc lập mới. |
| `audit_project.py . --mode strict --no-write` | Exit 1; 1 error resize nêu trên, 0 warnings. Không viết file audit vào dự án. |
| Kiểm scope bằng git | HEAD đúng `5e988b1a1764f35cc1a1fa0aa93119412d6b92ac`; nhóm exercise/API/database/2.1 không đổi; working tree sạch trước khi ghi report. |

Không sửa source/test/docs/index/HEAD/branch; chỉ ghi report này. Không merge hoặc push.

## Assessment

**Ready** để bàn giao local theo phạm vi đã chốt. Không có finding Critical, Important hoặc Minor cần sửa sau lượt tích hợp này. Mạch hai lối thực hành, placeholder/nháp và các tiền đề bị ảnh hưởng bởi rút bài phù hợp yêu cầu; khác biệt 2.6 đã đối chiếu với quyết định cụ thể thay vì áp dụng máy móc focus khái quát.

Kết luận là đánh giá diff và mạch học kèm các kiểm local ở trên. Nó không thay cho xác minh live SQL/browser/SSMS mà tôi không thực hiện, không chứng nhận premium audit đạt và không cấp quyền xuất bản.

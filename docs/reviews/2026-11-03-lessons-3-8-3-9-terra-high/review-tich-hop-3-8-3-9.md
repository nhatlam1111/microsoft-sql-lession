# Review tích hợp 3.8–3.9 — giai đoạn 2

## Phạm vi và bằng chứng

Agent được giao cấu hình `gpt-6.1-terra` / `high`, `fork_turns: none`; công cụ trong lượt không xác nhận model/effort runtime độc lập. Giai đoạn 1 đã khóa đánh giá trước khi mở answer tại `locked-prerequisites.md`; file đó được giữ nguyên. Giai đoạn 2 đọc hai YAML, spec/plan, hai report từng bài, verification của tác giả, hai patch được giao, manifest và snapshot HTML **final**, log build cuối. Không chép answer, không sửa sản phẩm/Git, không đọc seed/secret, không chạy SQL/DB/API/browser.

Bản giao mô tả HEAD `63f8f5c` cộng thay đổi chưa commit. Tôi tự tính SHA-256: hai MDX, hai YAML hiện tại và hai snapshot `*-final.html` đều khớp đầy đủ sáu hash trong `source-build-final.json`. Log ghi build 190 trang hoàn tất 21:43:48. Điều này chứng minh các file đọc khớp manifest được giao, không tự chứng minh quá trình build thực sự lấy mọi đầu vào từ đúng source; tôi không tự build lại. Snapshot vòng đầu không được dùng.

## Findings

**Không phát hiện finding cần sửa** trong phạm vi đã kiểm. Các kết luận dưới đây có giới hạn của kiểm tĩnh và bằng chứng tác giả, không phải xác nhận chạy độc lập.

### Mạch nội dung và kết quả vòng từng bài

- 3.8 giữ cùng phạm vi đơn đã duyệt bắt đầu tháng 9 như 3.1, sau đó 3.9 tiếp tục phạm vi đó nhưng chuyển từ hợp mã sang chọn thông tin hồ sơ. Số đơn, số lần chấm công, số mã và số hồ sơ có đơn được gọi đúng đơn vị; không đồng nhất nghỉ thực tế hay vi phạm với điều kiện chọn. Khác biệt `UNION`/`JOIN` và tránh nhân hồ sơ khi dùng `IN`/`EXISTS` được nối về 3.4–3.6. Bài 4.1 khai báo 3.9 là tiền đề; 3.9 dẫn CTE sang 4.1, không dùng CTE làm điều kiện để hiểu đề hiện tại.
- Hai phát hiện riêng trước đó đã được xử lý trong source cuối: 3.8 nói `ORDER BY` cuối dùng tên cột chung từ nhánh đầu trước tự kiểm tra; 3.9 thay thứ tự bản trích trước sắp để thấy kết quả sắp đổi vị trí và giữ cảnh báo không bảo đảm thứ tự. Không coi report từng bài là học mù vì cả hai báo rõ answer đã lộ trước khi khóa tiền đề; giai đoạn 1 của lượt này là kiểm mù bổ sung.
- Mỗi phần chính có một câu tình huống đầy đủ; đoạn `EXISTS` 3.9 được ghi là thay thế sau `WHERE`, `copy={false}`, cùng bảng và phạm vi tình huống. Tôi đọc tĩnh snapshot final: các khối `pre` chứa SQL có tab thật, không thấy chuỗi gạch chéo-t hoặc nháy cong trong các khối đó; có đoạn `EXISTS` trong snapshot 3.9. Đây không kiểm hiển thị bốn cột, nút copy, drawer hay tương tác.

### Sáu đề sau khi đối chiếu answer

| Đề | Đối chiếu với tiền đề đã khóa |
|---|---|
| 3-8-1 | Answer dùng hai nhánh theo hai kỳ, bỏ trùng mã và sắp chung; khớp đường làm đã khóa. |
| 3-8-2 | Giữ mọi lần xuất hiện và một cột, sắp chung; khớp. |
| 3-8-3 | Điều kiện từng nguồn, hai nhãn và mức trùng theo cặp khớp đề và bài giảng; không áp điều kiện ngày sang nhánh đơn. |
| 3-9-1 | Câu con một cột lấy đơn theo trạng thái, không đặt ngày; khớp. |
| 3-9-2 | Điều kiện phòng nằm ngoài, liên hệ hợp đồng bên trong, không giới hạn loại/ngày; khớp. |
| 3-9-3 | Phủ định sự tồn tại theo đúng mã và kỳ bên trong, không loại trạng thái hồ sơ; khớp. |

Không thấy answer đòi kiến thức bổ sung ngoài bảng đã khóa. Nhận xét này không thay cho thực thi SQL, xác minh kiểu dữ liệu, đủ mọi kết quả hay bộ chấm.

### Phạm vi và test

Patch scoped được giao gồm hai MDX và `tests/content-3-tail.test.ts`; patch chung gồm `tests/content.test.ts`. Phần gỡ 3.4–3.7 trong patch chung thuộc lượt khác theo gói, không quy công cho lượt này. Trong phần đường dẫn đã kiểm bằng `git diff --name-only`, chỉ hai MDX có thay đổi unstaged; hai YAML, API, component, database và `src/lib` không hiện thay đổi unstaged. Đây không phải kiểm toàn bộ trạng thái staged/untracked hay chứng minh mọi file ngoài danh sách không đổi.

Test nội dung mới vẫn kiểm hai nhánh và kết quả, sự liên hệ `EXISTS`, phạm vi đơn, kết quả và bước sơ đồ 3.9; kiểm thứ tự trước/sau sắp và cột đầu vào. Test khung kiểm một `Sql` không có `copy={false}` ở vị trí thuộc tính đầu, cho phép đoạn chỉ đọc, và xử lý `note` sau RunFlow. Thay test dựa trên Result hai cột cũ bằng kiểm 49 trong thân bài là bảo vệ yếu hơn cho kết quả cặp; song Result đó đã được chủ ý bỏ, và evidence tác giả báo đã chạy riêng biến thể hai cột. Không coi chuỗi `49` trong test tự nó là bằng chứng kết quả đúng; không yêu cầu phục hồi Result đã bỏ. Quy tắc regex dựa vào thứ tự thuộc tính là giới hạn bảo trì: với source hiện tại đoạn chỉ đọc đặt `copy` đầu nên kiểm hoạt động; chưa khảo sát tất cả biến thể component ngoài phạm vi.

### Bằng chứng tác giả, không phải kiểm của reviewer

Verification báo đã chạy SQL live trong luồng hoàn tác: 3.8 trả 9/76 dòng nhánh, 41 mã, 85 lần, 49 cặp; 3.9 có 9 hồ sơ, 39 hồ sơ ở phần bù và kết quả IN/EXISTS trùng. Tác giả cũng báo sáu answer trả lần lượt 44/86/54 và 4/9/5 dòng, cùng 33 đối chiếu minh họa không trùng answer. Tôi chưa chạy lại hay đối chiếu hồ sơ live chi tiết; các con số này chỉ là báo cáo tác giả.

Verification báo `npm test` 569/569, `npm run check` không lỗi/warning có 7 hint, build 190 trang, check:dist 3567 link; API build/check:exercises/check:data được báo đạt. Có một vòng trước ghi 5 test RED của 3.6–3.7 và 185 lỗi script đang soạn của lượt đó; tác giả báo vòng sau đã đạt. Tôi không tự chạy các lệnh này và không xác nhận độc lập lỗi nền đã hết. Browser do tác giả báo đã kiểm hai viewport, drawer, phím và copy/paste, sáu đường bài tập, không nộp hay chạy SQL trên UI; không đồng nhất với thao tác reviewer.

## Chưa kết luận và ngoài phạm vi

- **SQL/data và bộ chấm:** chưa tự chạy, không đọc seed hay chi tiết live để đối chiếu từng dòng; tác giả quyết định nghiệm thu dựa bằng chứng live và các kiểm của mình. Không thể khẳng định kết quả kỹ thuật chỉ từ answer hoặc snapshot.
- **Runtime UI:** chưa mở browser; HTML tĩnh và hash không chứng minh trạng thái drawer, thứ tự focus, sao chép, viewport hay đường nộp bài. Chưa kiểm SSMS, Excel thật, screen reader hoặc cảm ứng; không suy kết quả từ browser của tác giả.
- **Toàn bộ thay đổi checkout:** patch được giao là phạm vi lượt này, checkout có việc song song. Chỉ xem diff đường dẫn đã nêu và hai patch, không kiểm từng thay đổi ngoài phạm vi, staged/untracked hoặc nháp/editor runtime. Tác giả cần bảo đảm phạm vi commit khi bàn giao.
- **Test bảo vệ 49 cặp và regex:** đây là giới hạn đã cân nhắc ở trên, không kết luận lỗi nội dung hiện tại. Tác giả cân nhắc bổ sung kiểm ngữ nghĩa nếu muốn tăng độ bền, không cần khôi phục Result trái quyết định bố cục.
- **Kế hoạch:** các mục 3–5 vẫn chưa đánh dấu hoàn thành dù verification mô tả phần lớn kiểm đã chạy và review tích hợp đang xử lý; cập nhật trạng thái sau khi xử lý report, không đánh dấu trước khi các bước còn lại xong.

Kết luận chỉ áp dụng source/hash trong manifest và sáu đề được giao. Không dùng kết quả review làm bằng chứng có quyền push/deploy.

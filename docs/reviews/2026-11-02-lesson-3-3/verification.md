# Kiểm và bàn giao bài 3.3

Lượt bắt đầu 02/11, hoàn tất kiểm/review sau khi sang 03/11/2026. Người dùng đã duyệt thiết kế bằng “Duyệt, triển khai theo thiết kế”. Trước đó main `ebaa187` đã được push, chứa 3.1–3.2 và 29 file research; Pages run `41484289314` đã success. Không dùng trạng thái phát hành trước thay cho trạng thái của bài 3.3.

## Phiên bản và thay đổi

- Bài 3.3 làm trên `codex/lesson-3-3-refresh`, base main `ebaa187`. Source sản phẩm đã kiểm: `0b4527eb73b0694a382417557f0d2ced975a964c`.
- Build UTC `2026-11-02T16:56:23.6157865Z`; manifest 12 mục tại `temp/verification/2026-11-02-lesson-3-3/build-manifest.json` gồm bài/YAML, nền3.1–3.2, công cụ/style và HTML bài/ba đề. Reviewer tự xác nhận đủ12 hash khớp.
- Chuyển sang đúng hai tiểu mục: Excel→câu chính→LineMap; RunFlow→Result→câu trả lời. Giữ tình huống chị Hạnh, câu chính, KD/13, mốc/phạm vi và ba đề.
- WHERE có input/checks với dòng giữ/loại. GROUP BY minh họa KD/IT trích5/13 và5/10; GROUP BY/HAVING dùng caption “Số hồ sơ trong nhóm” để không coi alias SoHoSo khả dụng sớm. HAVING có bảng soi năm nhóm, tổng trên cả6 nhóm, giữ1. SELECT giải một nhóm vẫn đủ13 hồ sơ thành hai ô KD/13, không đếm một dòng đối chiếu hoặc năm hồ sơ trích.
- Bỏ ví dụ SQL ngoài tình huống về đơn nghỉ trong phần chính; giữ cầu nối bằng lời cho AND/OR, SUM và nhiều khóa nhóm. Hay nhầm bám câu chính; thêm câu ôn alias đã được giảng trước đó.
- YAML chỉ căn AND của đề3-3-2 thêm bốn cột; metadata, prompt, thứ tự và SQL sau chuẩn hóa leading whitespace giữ nguyên. Không đổi shared renderer/types/styles/API/editor/seed hoặc bài khác. Gỡ riêng3.3 khỏi danh sách chờ, không nới allowlist.

## Kiểm tác giả đã chạy

| Kiểm | Kết quả thực tế |
|---|---|
| RED trước sửa | 5 lỗi đúng kỳ vọng: thiếu input/checks/examples và khung còn4 tiểu mục; 94 kiểm khác trong nhóm qua. |
| Test nội dung sau sửa | 99/99, gồm toàn bộ kiểm ngưỡng/bài tập cũ và bảo vệ caption, checks, ví dụ trích so với toàn nhóm. |
| Full `npm test` | **57 file,451/451 test đạt**. |
| `npm run check` | **256 file,0 errors,0 warnings,3 hint deprecated có sẵn**: FormEvent hai chỗ ở ExerciseWorkspace, execCommand ở SqlEditor. |
| `npm run build` / `check:dist` | **139 trang/2801 link**, đạt. |
| API typecheck/build | Đạt; build nhận76 bài tập. |
| API check:exercises / check:data | **76 đáp án** qua runner giao dịch luôn hoàn tác, sau đó báo **Không bảng nào lệch**. Không có câu ghi tác giả chạy trực tiếp. |
| SQL tác giả chỉ đọc | **9 case preflight +7 câu MDX đạt kỳ vọng**, gồm hai SELECT sai cố ý được xác nhận SQL error, không errorKind kết nối. Câu chính/từng bước, strict/inclusive, bỏ WHERE, thành viên KD/IT đều được kiểm mới. |
| So sánh base | Câu chính không đổi; câu hiển thị bằng query flow; YAML không đổi ngoài leading indentation của answer. |

Chín case preflight xác nhận nguồn48/active45/nhóm6, strict chỉ KD13, inclusive thêm IT10, bỏ WHERE thành KD14; đủ23 thành viên KD/IT và các dòng trích, COUNT trong WHERE/alias trong HAVING có lỗi. Bảy câu đọc từ chính MDX mới xác nhận main và từng bước trả đúng columns/rows/total, kể cả caption trung gian. Không in/đọc .env hoặc cấu hình kết nối. Lỗi SQL không được trích thành thông báo nguyên văn trong bài khi không cần thiết.

Log/helper/source-comparison/SQL JSON được giữ tại `temp/verification/2026-11-02-lesson-3-3/`; log RED/full test trong `.superpowers/sdd/2026-11-02-lesson-3-3-refresh/`. Không dùng evidence lượt trước thay số liệu mới của3.3.

## UI đúng build

Dùng CUA/IAB qua preview4331, không chạy/nộp SQL bằng UI hoặc sửa nháp/clipboard. Đã mở các bước trên đúng dist sau build.

| Phép kiểm | Kết quả thực tế |
|---|---|
| FROM/WHERE ở desktop | FROM nêu nguồn NhanVien, Bước trước disabled. WHERE hiện5 dòng có3 giữ/2 loại; tổng48→45, đầu vào đủ cột trạng thái. |
| GROUP BY ở1280×720 | Hai ví dụ có5 dòng mỗi nhóm, nhãn trích5/13 và5/10 rõ; kết quả sáu nhóm/45 hồ sơ. Không lộ backtick, các bảng minh họa vừa khung. |
| HAVING ở1280×720 và1024×768 | Header COUNT(*) >10; KD đúng/giữ, IT đúng10 sai/loại; các nhóm thấp hơn bị loại. Footer6 dòng đối chiếu1 đúng/1 giữ, lời giải nói rõ là6 nhóm; kết quả còn KD/13. Bảng không tràn ngang, nguồn không bị tả là xóa. |
| SELECT ở1280×720 và1024×768 | Input một dòng đối chiếu KD/13; ví dụ ghi trích5/13, hai biểu thức tạo KD và13 đúng cột, Result đánh dấu dòng1. Không đếm lại thành1 hoặc5, không lộ backtick; không tràn ngang tài liệu. |
| ORDER BY và điều hướng | Một dòng KD/13, Bước sau disabled. Chuyển bước reset scrollTop=0; Escape trả focus về thẻ đang mở; ArrowRight từ HAVING sang SELECT, ArrowLeft trở lại HAVING. |
| Tab trong ví dụ | Tab từ vùng dữ liệu sang vùng phép tính có tên/focus outline; ArrowRight ở bảng giữ SELECT, không đổi bước. |
| Excel/phần chính ở1440×900 | Xem hình và câu SQL: mark hai ô KD/13, selected13; đúng hai h3 và câu chính trước phần giải thích. Không tràn ngang tài liệu. |
| SQL và trạng thái cuối | Focus đúng mệnh đề, computed tab-size=4. Không có console error trong lượt đã xem; reset viewport override. |

Giới hạn: không thử lại copy/paste vào editor, đăng nhập mã web, nộp/chấm qua UI, desktop SSMS/Excel thật, điện thoại dưới1024, screen reader, zoom200% hoặc matrix reduced motion; không đo thời lượng bằng người học. Câu chính3.3 không có dòng cần thụt tiếp nên không dùng nó chứng minh CASE hai cấp hay clipboard. YAML AND đã kiểm source/parse/API, không gọi là đã dán vào editor. UI tĩnh này không có request/loading/retry mới để kiểm.

## Static UI audit và file ngoài phạm vi

Auditor strict chạy với `--output temp/verification/2026-11-02-lesson-3-3/ui-audit.json`, exit1 chỉ có `form.textarea-resize-missing` tại SqlEditor.tsx:53. Đây là false positive đã được xác minh ở lượt trước: class ed-input có `resize: none` ở exercise.css:27, CSS được nạp; các chủ sở hữu đó không đổi. Không nới script hoặc sửa editor, không nói audit hoàn toàn PASS. Root `premium-audit.json` có từ trước được để nguyên/ngoài Git, không dùng làm evidence lượt này.

## Review độc lập và quyết định

Đã đọc hết [report gốc](review-3-3.md). Reviewer mới/ngữ cảnh rỗng, kế thừa model phiên, chỉ nguồn/HTML và Git read-only; không seed/secret/SQL/API/test/browser. Đã lập cách làm/tiền đề từng đề trước khi đọc answer YAML; kiểm đủ12 hash. Không có finding Cần sửa/Cần làm rõ/Cần cắt/Biên tập cần sửa.

| Nhóm nhận xét/giới hạn của reviewer | Quyết định | Căn cứ/thực hiện |
|---|---|---|
| Mục tiêu/tình huống/Value Filters/LineMap | Làm theo — giữ | Một yêu cầu nối từ3.2, định nghĩa ngay chỗ cần, câu chính trước giải thích và minh họa đúng ô. |
| Lọc dòng/nhóm, AND/SUM/nhiều khóa, alias | Làm theo — giữ | Đủ phần giảng trước ôn, không phải lấy bài sau/answer bù kiến thức. Không tăng lý thuyết ngoài mục tiêu. |
| FROM/WHERE | Làm theo — giữ | Dòng soi nằm trong input, có giữ/loại và tổng toàn48; tác giả đã kiểm SQL live riêng. |
| GROUP BY và ví dụ trích | Làm theo — giữ | Thành viên đúng nhóm, ghi rõ5/13 và5/10; số tổng nhóm dùng toàn45, không suy từ bảng trích. |
| HAVING và SELECT | Làm theo — giữ | Nhóm KD còn đủ13, IT10 bị loại; hai ô nối đúng dòng, caption không dạy alias sớm. UI và SQL tác giả có bằng chứng riêng. |
| ORDER BY/câu trả lời/giới hạn nghiệp vụ | Làm theo — giữ | Một dòng không đổi vị trí nhưng giữ tiêu chí; báo cáo không kết luận thiếu người. |
| Hay nhầm/Ứng dụng/Memo/ba câu ôn | Làm theo — giữ | Chỉ bám câu chính khi giải SQL, phần ôn không đưa quy tắc mới; minutes20 vẫn là ước lượng. |
| Ba đề và YAML | Làm theo — giữ | Reviewer xác định được hai biên/SUM/nhiều khóa trước answer; tác giả kiểm toàn76 đáp án và YAML chỉ đổi indent. |
| Các câu tại sao, định dạng/HTML/đường thực hành | Làm theo — giữ | Không thiếu lời giải cốt lõi; giữ phân biệt nguồn/HTML với UI, không thêm nơi nhận mã hoặc yêu cầu web phải dùng SSMS. |
| SQL/API/test/UI/clipboard/viewport chưa do reviewer kiểm | Làm theo — giữ giới hạn | Các lệnh/thao tác tác giả được ghi riêng; không sửa report gốc thành lời xác nhận đã chạy những phần này. Copy/paste/auth/SSMS/screen reader vẫn chưa thử trong lượt này. |

Chỉ một bài được chuyển và không đổi công cụ; review độc lập đã kiểm cả nền3.2 và diff của branch, không tạo thêm reviewer lặp lại cùng nội dung khi không có finding hoặc sửa công cụ. Không có sửa sản phẩm sau source0b4527e; các cập nhật tiếp chỉ là hồ sơ. Không lặp test/build/SQL đã đạt khi chỉ chốt tài liệu.

## Phát hành

Tiếp tục yêu cầu merge/push main của người dùng cho sản phẩm đã hoàn tất. Giữ branch tham chiếu3.3; fetch main trước merge, không ghi đè thay đổi mới trên remote, chỉ fast-forward khi cây đã kiểm chứa origin/main. Kết quả Git/SHA remote/CI thực tế của lần phát hành3.3 sẽ ghi receipt trong temp cùng lượt và báo trong chat; không coi report review là quyền push hoặc bằng chứng deploy đã thành công trước khi có kết quả thật.

# Bài 1.1: kiểm và xử lý review — 29/10/2026

Nhánh local `codex/lesson-1-1-story-and-image`, base main `75278be`. Người dùng chọn viết lại kèm hình, rồi xác định hình cần gắn với database/SQL Server/SQL và không cần nhân vật. Chỉ sửa bài 1.1 và phần trình bày hình; không đổi quy ước/template chung, bộ đề, API hoặc seed. Không merge/push/deploy trong lượt này.

## Nội dung và ảnh

Mạch bốn nhịp: hai bản nhân sự khác nhau → nguồn chung và bảng/dòng/cột → luật kiểm dữ liệu → SQL Server/SQL và lấy lại danh sách cho chị Hạnh. Câu chuyện Quân nối các phần; giữ tình huống/giả định và giới hạn kết luận ở dòng của Quân. Rút đoạn giới thiệu dồn nhiều thuật ngữ, giới thiệu phần mềm/ngôn ngữ ở lúc cần đọc dữ liệu; giữ dẫn sang bài đi sâu. Bốn tự kiểm tra bắt đầu bằng phân biệt ba khái niệm, sau đó nguồn chung và các giới hạn.

Hình Excel cũ giữ nguyên toàn bộ thuộc tính/rows/mark/numeric/selected. Ba ảnh mới không có người: database là kho có bảng; SQL Server là phần mềm quản lý; SQL là yêu cầu và kết quả. PNG gốc trong `src/assets/lessons/1-1-database.png`, `1-1-sql-server.png`, `1-1-sql-language.png`; Astro sinh WebP360/720 (khoảng3–12kB mỗi bản), giữ base path và aspect ratio2:1. Nhãn/alt/caption là chữ HTML. Không coi các grid trống trong tranh là kết quả dữ liệu đã kiểm.

[Prompt nguyên văn và công cụ](../../superpowers/specs/2026-10-29-lesson-1-1-illustration-prompt.md): built-in ImageGen, không CLI. Ảnh nháp có nhân vật không được giữ hoặc tham chiếu trong project; bản gốc của công cụ không bị xóa.

Giữ đủ nguồn chung có thể cũ, luật phải khai báo/đang bật, hợp lệ chưa chắc đúng, ngày có thể sai hồ sơ, mã hợp lệ gán nhầm người, bản xuất tại thời điểm lấy và lịch sử cần thiết kế lưu. Không thêm SQL preview hoặc câu lệnh mới; không đọc/ghi database vì không đổi dẫn chứng thật.

## Review độc lập và quyết định

Reviewer mới ngữ cảnh mới, kế thừa model Codex phiên, không đổi model. Tự đọc toàn bài/1.2/baPNG/HTML mới, bốn câu ôn; không đọc nhận xét cũ hoặc ma trận tác giả. [Report gốc](review.md) và [kiểm sửa](recheck.md) được sao nguyên, không sửa kết luận.

| Nhận xét | Quyết định | Căn cứ / kết quả |
|---|---|---|
| E1: “câu lệnh đọc đầu tiên học ở1.6” dễ lệch kỳ vọng vì1.2 đã có mẫu SELECT | Làm theo | Đổi thành “Bạn sẽ học cách viết câu lệnh đọc dữ liệu ở bài1.6.” Bài1.2 chỉ cho đọc/chạy mẫu trước khi học cách viết. Reviewer kiểm lại đúng source/HTML18:14:36, không còn mục mở. |
| Giữ được: ba hình phân biệt dữ liệu/phần mềm/ngôn ngữ, đứng cạnh định nghĩa | Làm theo: giữ | Tác giả và reviewer tự xemPNG, so đúng alt/caption với hình; đây là minh họa khái niệm, không giả giao diệnSSMS. |
| Giữ được: mạch kể, bốn câu ôn đủ tiền đề, phạm vi trả lời và giới hạn database | Làm theo: giữ | Đọc đủ toàn bài/report; không thêm kiến thức sâu, SQL hoặc bài tập cho đủ khuôn. |
| Reviewer chưa kiểm UI/SQL | Làm theo: ghi riêng | Tác giả kiểm browser dưới đây; không nhận kiểm do tác giả làm thành kiểm của reviewer. SQL không đổi nên không có kiểm live mới. |

Test cũ bị lỗi vì chỉ chấp nhận chữ hoa H trong “Hợp lệ…”. Đã đổi riêng assertion đó thành regex không phân biệt hoa/thường, giữ nguyên ý cần bảo vệ; không nới schema hoặc bỏ kiểm kiến thức/số liệu. Không thêm test chỉ chép lại lời văn/hình thức.

## Kiểm thực tế

- Sau E1: `npm test` **322/322**, 48 file; `npm run check` **0 errors / 0 warnings**, 3 hint nền FormEvent/execCommand ở editor; mọi lệnh exit 0.
- `npm run build`: **132trang**, hoàn tất18:14:36; `npm run check:dist`: **1997liên kết**, exit0. ẢnhAstro WebP tối ưu và có base `/microsoft-sql-lession/_astro/`; không còn ảnh nháp có nhân vật trong dist hoặc assetproject.
- Preview4336: kiểm1280/1440px, ba ảnh đều tải, đúng tỉ lệ2:1/alt/caption, không tràn ngang. Thẻ ảnh nhỏ hai cột, không kéo dài thành ảnh tràn cả màn. Xem lại bản cuối sau E1, câu cũ đã hết/câu mới có trong browser.
- Kiểm1024px: article414px, bafigure414px, không tràn ngang. Tại390px website vẫn dùng khung ba cột cố định làm article0px/tràn ngang; bài1.2 không có hình mới cũng cùng lỗi. Đây là giới hạn shell desktop hiện tại, không mở rộng phạm vi sửa layout; chưa nghiệm thu mobile.
- Enter mở đủ4tự kiểm tra, focus tới đúngsummary; mục lụcGhi nhớ dẫn đúnganchor dướiheader. Không bấm hoàn thành/nộpSQL, không thay clipboard/nháp học viên. Bài1.2 giữ typographyLiterata và không tràn ở1280px.
- ẢnhExcel: cả4ômark còn đúng; reviewer đối chiếuA3/A5/C4/D4, selectedD4 vànumericC2/C3/C5 trongsource/HTML. Không thay dữ liệu giả lập hoặc ý nghĩa ngày chữ.

Evidence: `temp/verification/2026-10-29-lesson-1-1/` (ignored): các log `*-final.log`, `browser-matrix.json` và ảnh `database-1280.png` / `final-sql-concepts-1440.png`. Preview local giữ chạy để người dùng xem.

## Lỗi nền và giới hạn

Premium audit strict exit1: một `form.textarea-resize-missing` ở `src/components/islands/SqlEditor.tsx:53`. Đây là false positive khi chỉ đọc literaltextarea: cùng phần tử mangclass `ed-input`, đã có `resize: none` tại `src/styles/exercise.css:27`, cảhai file không đổi trong diff. Lưu JSON, không tự sửa editor ngoài phạm vi; chưa đo computedstyle editor trong lượt này. Không báo audit toàn bộ xanh.

Không chạy SQL/API/runner hoặc chấm lại 78 đáp án vì bộ đề/API không đổi; không kiểm SSMS thật, công nghệ hỗ trợ đọc màn hình hoặc đo 12 phút với học viên thật. Không giả lập mất mạng để kiểm ảnh lỗi; lời văn/alt/caption tự đủ đã kiểm từ source/HTML. Không cập nhật hoặc push chuẩn chung trước review của người làm khóa học.

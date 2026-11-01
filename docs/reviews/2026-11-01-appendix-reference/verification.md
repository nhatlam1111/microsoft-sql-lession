# Hồ sơ kiểm PL.1–PL.6

## Phạm vi và phiên bản

Nhánh `codex/appendix-reference-pl-1-6`, base main `5c2604a2495ddf6fbb9a2835f5057a551834f55e`. Source sau sửa sáu review bài được build ngày01/11/2026 lúc10:27:24 (Asia/Saigon); hash từng MDX và từng câu SQL tại `sql-source-coverage.json`. Chuẩn bị commit để giao review tích hợp, chưa chốt lượt tích hợp. Không push/deploy trong lượt này.

## Môi trường SQL và an toàn dữ liệu

Đã kiểm bốn câu SELECT bằng driver mssql của API, nạp cấu hình tại máy không in secret. Azure SQL Database (`EngineEdition=5`, version string `12.0.2000.8`, không diễn giải số phiên bản Azure như bản SQL Server đóng gói); compatibility `170`, collation `SQL_Latin1_General_CP1_CI_AS`, session language `us_english`. Có `json` và `vector` trong sys.types; `PREVIEW_FEATURES=false`, không đổi thiết lập.

Script và kết quả riêng ở `temp/verification/2026-11-01-appendix-reference/verify-environment.mjs`, `environment-results.json`, `sql-readonly.mjs`. Helper chỉ cho câu bắt đầu SELECT và chặn từ khóa ghi/thực thi/batch quản trị. Không chạy INSERT/UPDATE/DELETE/DDL, không đổi dữ liệu hoặc cấu hình. Kiểm giới hạn kiểu hiếm theo tài liệu không đồng nghĩa đã thử tới kích thước tối đa.

## Kiểm ban đầu

- `npx vitest run tests/appendix-content.test.ts`: RED 4 lỗi thiếu nội dung khi chưa có các bài; 2 test vòng lặp rỗng đạt, không coi đó là bảo đảm nội dung. Sẽ chạy lại với đủ sáu bài.
- Audit UI strict trước sửa giao diện: exit 1, một finding `form.textarea-resize-missing` ở `src/components/islands/SqlEditor.tsx:53`. Đây là phạm vi nền; cần đối chiếu CSS/runtime trước kết luận. Không sửa editor trong phạm vi phụ lục.
- Đã xem màn hình bài 1.1 của **build cũ** trên localhost ở 1280×900 làm đối chiếu identity (font, khung ba cột, màu); không có tràn trang ngang, thanh cuộn có màu theo token. Tiến độ hiển thị 0/50. Không dùng lần mở này làm bằng chứng UI Phụ lục.

## Kết quả sau sửa sáu review bài

| Kiểm | Kết quả thực tế |
|---|---|
| `npm test` | 384/384test đạt,51files; log `test-post-review.log` |
| `npm run check` | 218files,0errors,0warnings,3hints deprecated nền ở ExerciseWorkspace/SqlEditor; log `check-post-review.log` |
| `npm run build` | 136trang, trong đó index và6trang Phụ lục; log `build-post-review.log`,10:27:24 |
| `npm run check:dist` | Đạt136trang/2.502link, gồm route/fragment Phụ lục, thụt lề và bảo vệ không lộ đáp án bài tập hiện có; log `dist-post-review.log` |
| `npx -p @google/design.md designmd lint DESIGN.md` | 0errors,0warnings,1info; log `design-post-review.log` |
| UI audit strict | Exit1, đúng một finding nền `form.textarea-resize-missing` ở SqlEditor.tsx:53. CSS hiện có `.ed-input { resize:none }` ở exercise.css; auditor chỉ đọc literal markup không nhận rule dùng chung. Không sửa editor và không báo audit đã đạt. JSON nguyên gốc tại `ui-audit.json`. |
| `git diff --check` | Không lỗi whitespace; có thông báo chuẩn hóa LF/CRLF theo cấu hình Git tại máy |

Các log riêng ở `temp/verification/2026-11-01-appendix-reference/`. Repo không có lệnh formatter/linter riêng ngoài các script đã nêu. Không sửa YAML/runner/API và không chạy câu ghi nên không chạy API build/check:exercises/check:data; không suy từ test đọc nguồn rằng đã chạy bài tập qua API.

## SQL và nguồn kỹ thuật

- PL.1–PL.2: tác giả kiểm76SELECT (21cơ sở +50hướng chuyển ngầm/tường minh giữa5kiểu +5probe tính năng). PL.3–PL.6:37SELECT lấy từsource và36probe bổ sung. Đây là bằng chứng driver mssql trên Azure hiện tại, không phải người review hoặc học viên đã chạy SSMS.
- Root đối chiếu lại nguyên câu nguồn: **53SELECT trong6bài** có live evidence; **47Result** khớp tên/thứ tự cột, dòng và giá trị. Sáu khối không có Result là đề ôn hoặc ví dụ lỗi có bằng chứng riêng. Lệnh `audit-sql-coverage.mjs` đạt sau sửa review; bản kết quả bền vững tại `sql-source-coverage.json`.
- Thêm9SELECT sau review: giới hạn TRY_CAST với ASCII, UTF-8 và ký tự bổ sung UTF-16; PARSE NULL đã có kiểu. Đúng biên8.000byte hoặc4.000đơn vịUTF-16 có kết quả theo giá trị; vượt biên thử báo8152 dù dùng TRY. PARSE đầu vào NULL kiểu nvarchar trảNULL, khác lỗi8116 của NULL viết trực tiếp đã kiểm trước. Kết quả nguyên gốc tại `sql-review-limits.json`; không suy mọi hướng chuyển thất bại giống nhau.
- Nguồn Microsoft hiện hành đặt tại từng nhóm trong bài. Các bản ghi tác giả trước review được lưu nguyên tại `technical-pl-1-2.md`, `technical-pl-3-6.md`; hash/lời “chưa review/build/UI” trong đó mô tả lúc bàn giao, không thay trạng thái source cuối trong hồ sơ này. `infrastructure-evidence.md` cũng là snapshot của người triển khai hạ tầng.
- Đã ghi khác biệt nguồn/live: PATINDEX với chuỗi NULL được tài liệu mô tả báo lỗi nhưng Azure khóa học thử trảNULL; bài nói rõ và hướng xử lý đầu vào có điều kiện nghiệp vụ. Không gọi một lần thử Azure là bằng chứng mọiSQLServer2025 cài riêng. Nvarchar(max) và float(n) dùng trang chuyên biệt/capacity khi trang khác ghi đơn vị mâu thuẫn. JSON/vector/float16 được kiểm có mặt bằng SELECT; không bật preview, không đổi compatibility.
- Dung lượng tối đa hiếm, remoting, tất cả culture/collation/DST, mọi cặp kiểu chuyển và SQLServer2025/ManagedInstance cài riêng chủ yếu đối chiếu tài liệu; không tuyên bố đã thử tới giới hạn hoặc mọi nền tảng. Giữ nguyên giới hạn này sau nghiệm thu.

## Browser trên build sau review

Công cụ CUA, in-app browser tại localhost4332, kiểm build10:27:24. Không gọi API bài tập, không chạy SQL trong UI/SSMS, không nhập/sửa editor hoặc thông tin truy cập.

- Mở index và cả6bài từ điều hướng/sidebar, đúng tiêu đề/current item; mỗi bài3details. Không có nút hoàn thành trên phụ lục; không xuất hiện cờ/trạng thái tiến độ củaPL. Lộ trình sau khi mở hết vẫn “Lần trước bạn dừng ở bài1.1”, học tiếp1.1 và0/50; không dùng localStorage/hidden state để kết luận.
- 1280×900: cả6trang không tràn ngang toàn trang (document width1270); bảng/SQL nằm trong vùng của mình. 1024×768: document width1014, bảng vùng414/content540, có thể dùngArrowRight cuộn40px; tab-size SQL tính được4. 1440×900: document width1430, article720px theo DESIGN. Đã so với màn hình bài1.1 của build cũ; không dùng build cũ làm bằng chứng nội dungPL.
- Đầu vòng đã kiểm anchorASCII tra nhanh giữ tiêu đề dưới thanh đầu trang, thông báo desktop ở1000px, tìmTRY_CONVERT/pl.1, no-results/xóa/refocus, Shift+Tab/Tab vòng trong tìm kiếm vàEnter mở bài. Hạ tầng/owner không đổi sau vòng đó. Sau sửa cuối kiểm thêm tìm không dấu `chuyen doi kieu` raPL.2 vàEscape trả focus về nút mở tìm kiếm.
- PL.2: khi đóng đáp án, hai câu SQL của đề hiện rõ ngoài details; Enter mở lời giải vàSpace đóng lại. Công cụ không nhận rolebutton của summary ở lần chọn đầu; dùng locator summary theo text rồi thực hiện bàn phím thành công. Không coi lỗi selector là lỗi sản phẩm.
- Bấm Sao chép trên ví dụ nhiều dòng PL.2: clipboard trùng nguyên `data-copy`, có newline vàtab thật. Clipboard ban đầu trống; APIwrite với danh sách trống bị từ chối, đã khôi phục bằngwriteText chuỗi rỗng và đọc lại xác nhận trống. Không dán/chạy vàoSSMS. Không lưu nội dung clipboard người dùng vào hồ sơ.
- Console error của tab khi kiểm cuối: rỗng. Đã reset viewport override sau kiểm. Không kiểm IME thực, đầy đủ screenreader, mọi trình duyệt/thiết bị, zoom200% hoặc reduced-motion qua thiết bị; guard IME và CSS reduce-motion chỉ được đối chiếu source ở phạm vi này. Không có loading/network/mutation mới trong luồng tra cứu local để thử lỗi máy chủ.

## Review và phạm vi bàn giao

Cả6review độc lập có report nguyên gốc và bảng tiền đề từng câu ôn; PL.3/PL.4 tiếp tục đúng lượt sau ngắt hạn mức, không thay agent/model. Root đã đọc đầy đủ và xử lý mọifinding kể cả mức thấp tại `decisions.md`. Review source/HTML không được dùng thay bằng chứng SQL/UI nêu riêng ở trên. Review tích hợp và quyết định của root sau report đó sẽ được ghi tiếp; chưa coi kết luận của reviewer là quyền push.

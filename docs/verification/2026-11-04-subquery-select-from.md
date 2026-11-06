# Kiểm chứng và xử lý review — subquery SELECT/FROM

## Phạm vi và phiên bản

Checkout local `codex/lesson-3-10-refresh`, base `e0b419d6bdf0f932be9fbaf43395d0b1ad975800`. Giữ phần COUNT đã hoàn thiện của lượt trước, chuyển sang 3.12. Không commit/push/deploy, không sửa `premium-audit.json`, seed hoặc Arcade. Spec/plan của lượt: `docs/superpowers/{specs,plans}/2026-11-04-subquery-select-from*.md`.

## SQL — kiểm của tác giả

Chỉ SELECT qua runner local đọc cấu hình nội bộ; không in secret. Probe có 24 câu, gồm 9 biến thể lỗi. Lượt nguồn cuối `verify-final.ts`: 23 SELECT duy nhất và chạy lại 9 lỗi; kiểm 3 Result, 12 bước, 4 ví dụ cùng nhóm/không có dòng, bảng soi WHERE, hình Excel, 9 đáp án; 33 so sánh xác nhận hình/câu minh họa không giải đúng bài tập. Evidence scratch: `temp/verification/2026-11-04-subquery/{probe.json,verified-final.json,final-query-results.json}`.

- 3.10: 48/48/48; NV021 có 3, NV047 có 0; ba đáp án đều 48 dòng. Không liên hệ thì mỗi hồ sơ nhận 55; raw scalar không có dòng cho NULL. Hai lỗi scalar và lỗi lặp cùng giá trị đã tái hiện.
- 3.11: 55 hợp đồng → 46 mã → 7 mã đạt >=2. NV021/NV030 có 3; NV025/NV029/NV040/NV044/NV045 có 2. Ba đáp án 5/5/17 dòng. Lỗi thiếu alias, tên cột, cột/bí danh ngoài phạm vi, ORDER BY và tương quan FROM đã tái hiện.
- 3.12: token SQL chính không đổi so bản trước đổi số; ba đề/đáp án khớp nguyên nội dung sau khi chuẩn hóa ID. Ba đáp án 6/2/3 dòng. Kết quả chính vẫn 45 hồ sơ, 22 nam, 23 nữ.

Thông báo trong Messages lấy nguyên văn từ lần chạy, không tự thêm số Msg/Line. Một lỗi syntax tối giản gần dấu `;` được ghi rõ khác biệt vị trí khi giữ phần câu ngoài. Không chạy Excel thật hoặc SSMS thật.

## Nguồn Microsoft đối chiếu ngày 04/11/2026

- [Subqueries](https://learn.microsoft.com/en-us/sql/relational-databases/performance/subqueries?view=sql-server-ver17): scalar, scope và tương quan; cách diễn giải logic không bắt buộc vật lý.
- [FROM](https://learn.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql?view=sql-server-ver17): derived table, bí danh và APPLY.
- [COUNT](https://learn.microsoft.com/en-us/sql/t-sql/functions/count-transact-sql?view=sql-server-ver17), [SUM](https://learn.microsoft.com/en-us/sql/t-sql/functions/sum-transact-sql?view=sql-server-ver17), [MAX](https://learn.microsoft.com/en-us/sql/t-sql/functions/max-transact-sql?view=sql-server-ver17), [ORDER BY](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql?view=sql-server-ver17): phạm vi tổng hợp, NULL trên phạm vi rỗng và giới hạn sắp xếp nguồn.
- [COUNTIF](https://support.microsoft.com/en-gb/excel/get-started/use-the-countif-function-in-microsoft-excel?nochrome=true), [Excel references](https://support.microsoft.com/en-gb/excel/get-started/overview-of-formulas-in-excel?wt.mc_id=otc_excel): range/criteria và vùng tuyệt đối giữ nguyên khi sao chép. SQL live kiểm giá trị minh họa, không nhận đã tính workbook Excel.

## Máy và tương thích

- RED: 6 kiểm v2 thất bại trước sửa; sau sửa 56/56 kiểm progress/storage/client/API liên quan đạt. Giữ v1, migration/import v2, lastLessonNum/cờ/timestamps/solved IDs, nháp COUNT chỉ tới 3.12, hai bài mới không lấy nháp COUNT. Existing v2 thắng; lưu bị chặn không ghi đè dữ liệu cũ.
- API prefix `course-v2:` cho client mới, unprefixed theo nghĩa cũ; unknown version bị từ chối, auth/guard giữ nguyên. Arcade dùng client và storage riêng. API build 82 exercises/50 Arcade; typecheck đạt.
- Chuyển hướng mặc định đầu tiên mất base: `check:dist` phát hiện bốn link sai và đếm nhầm trang redirect thành bài. Đã dùng manifest route chung có base, kiểm refresh/canonical/link dự phòng và tách đúng bốn route lịch sử khỏi số bài; không nới bảo vệ link hay layout.
- Sau nội dung cuối và kiểm trường hợp v2 hỏng: 588/588 tests, 70 file; build 198 trang nội dung + 4 redirect; `check:dist` 202 trang, 3817 link. `check` cuối vòng: 0 errors, 0 warnings, 7 hints nền (FormEvent/execCommand). `git diff --check` không lỗi whitespace; Git chỉ nhắc LF/CRLF ở progress-storage.ts.
- `check:exercises` cuối vòng 82/82 và `check:data`: Không bảng nào lệch. API build và typecheck đạt sau thay COUNT(*) đề 3-10-1.
- `compatibility-live.ts` gọi source `handleGrade` với runner SELECT thật và mã thử chỉ tồn tại trong tiến trình local, không HTTP: cả ba ID COUNT cũ không prefix chấm đúng đáp án 3.12; ID v2 SELECT/FROM chấm đúng bài mới; đáp án SELECT gửi ID cũ bị chấm sai đúng như mong đợi; version lạ trả 404. Không dùng mã truy cập thật, không gửi bài trên browser hoặc API đã triển khai.

## Review và ma trận quyết định

Cả hai reviewer mới được cấu hình rõ `gpt-6.1-terra`/`high`, `fork_turns:none`. Công cụ xác nhận tham số giao việc, không có phép kiểm độc lập model thực tế. Đọc đề không đáp án và khóa bảng tiền đề trước khi mở YAML. Report gốc và bảng khóa giữ nguyên; review tĩnh không chứng minh SQL/UI live.

| Nguồn | Nhận xét | Quyết định và căn cứ |
|---|---|---|
| 3.10 #1 | COUNTIF dùng vùng tương đối | Làm theo: `HopDong!$B$2:$B$56`, giải thích `$` giữ vùng khi sao chép, A2 đổi theo dòng. |
| 3.10 #2–6 | Mạch kể, MaHD không NULL, sơ đồ, lỗi, ôn tập giữ được | Giữ; MaHD là khóa chính (bài 3.5/schema), SELECT kiểm số đếm bằng số dòng thực. Không thêm lời giảng trùng chỉ để đủ finding. |
| 3.10 đề 1 | Chưa xác minh MaDon không NULL, cân nhắc COUNT(*) | Làm theo cách biểu đạt trực tiếp: đáp án mới dùng COUNT(*) đếm dòng, không cần thêm giả định về MaDon. Schema thực có PK/NOT NULL; không kết luận đáp án COUNT(MaDon) trước đó sai. Nguồn cuối đã chạy 48 dòng. |
| 3.11 #1 | Cụm “tên cột không được chấm” mơ hồ | Làm một phần: cả sáu đề mới đổi thành “Bộ chấm so giá trị và thứ tự, không so tiêu đề cột.” Không làm theo đề xuất cấm dấu chấm vì sai nghĩa; reviewer rút đề xuất đó trong addendum. compareResults không so tên cột; kiểm unit hiện hành bảo vệ hành vi này. |
| 3.11 #2 | Lặp giới hạn tương quan | Làm theo: giữ giới hạn và APPLY ở phần chính, cắt câu lặp sau Hay nhầm; không bỏ kiến thức đã duyệt. |
| 3.11 giới hạn đọc bị cắt | Chưa xác nhận đọc đủ bài trước/quy ước | Reviewer tiếp tục cùng lượt, đọc bù theo đoạn; addendum riêng xác nhận đã đọc đủ, không finding mới. Giữ report gốc nguyên vẹn. |
| Tích hợp — v2 hỏng | Có thể cân nhắc quay về bản v1 | Không làm theo fallback tự động: v1 có thể cũ hơn dữ liệu người học đã sửa/xóa. Giữ chính sách hiện hành sao lưu nội dung hỏng và báo qua UI; không sửa v1. Bổ sung kiểm có đồng thời v2 hỏng và v1 hợp lệ, xác nhận không âm thầm phục hồi bản cũ. |
| Tích hợp — web mới/API cũ | Từ chối thực hành cho tới khi API cập nhật | Giữ cơ chế từ chối để không chấm nhầm. README hướng dẫn khi được phép thì phát hành API trước web. Unit kiểm wire ID và source API; live core/runner kiểm đúng nghĩa ID. Chưa thử HTTP tới phiên bản cũ hoặc cloud. |
| Tích hợp — tab v1 ghi sau | Không hợp nhất tiến độ mới phát sinh từ tab cũ | Giữ đúng quyết định đã duyệt và ghi README; không thêm banner/luật gộp mới ngoài phạm vi. V1 nguyên vẹn để người dùng xuất/nhập nếu cần. |
| Tích hợp — UI/SQL/network/manifest | Review tĩnh không kết luận phần thực thi hay ngoài manifest | Tác giả kiểm UI/SQL theo các mục riêng. Không suy review thành kiểm độc lập, không nhận đã kiểm auth/guard/Arcade qua mạng hoặc môi trường phát hành; unit toàn bộ và diff bảo vệ đường xử lý hiện hành. Nằm ngoài phạm vi triển khai cloud của lượt local này. |

## UI và giới hạn

Đã kiểm bản build localhost:4339 qua CUA ở 1280×900 và 1024×768: mở/đóng cả 3 drawer SELECT và 4 drawer FROM ở mỗi viewport; mở/đóng bốn câu ôn mỗi bài ở cả hai kích thước; Escape đóng drawer; không tràn ngang toàn trang. Bảng soi FROM hiện đủ cột và giữ/loại, ví dụ có nhiều dòng và không khớp vẫn đọc được bằng vùng cuộn. Dấu Excel có hai ô mỗi bài, dấu Result và query focus khớp phần được giảng. Ảnh và log: `temp/verification/2026-11-04-subquery/{select-1280.png,select-1024.png,from-1280.png,from-1024.png,ui.json}`.

Đã mở đủ sáu đường đề qua Làm bài/Bài tập sau; SELECT thử ở 1280, FROM ở 1024. Mỗi câu chính sao chép được 8 dòng; SELECT có tab hai cấp, FROM một cấp, không lộ chuỗi escape. Dán thực vào editor, reload vẫn giữ đúng SQL, rồi phục hồi giá trị nháp trước thử. Không nộp SQL trong browser. Bốn URL COUNT cũ thực sự chuyển tới đúng bài/đề 3.12, giữ base.

Tiến độ được xuất qua menu trước các phép thử (sau lần mở đầu bài SELECT), rồi nhập lại đúng snapshot qua UI. Xuất đối chiếu sau phục hồi: lessons/exercises/lastLessonNum giống snapshot; lastActiveAt được cập nhật bởi hành vi nhập file hiện hành, không nhận đã giữ nguyên mốc hoạt động. Clipboard khôi phục và đối chiếu đúng cả nội dung/MIME; reset viewport về mặc định. Không xóa dữ liệu v1 hoặc thay mã truy cập.

Review tích hợp không có finding cần sửa trong phạm vi đọc tĩnh; mọi mục cân nhắc đã có quyết định trong ma trận. Bản gốc, addendum và bảng khóa lưu nguyên tại `docs/reviews/2026-11-04-subquery-terra-high/`. Manifest cuối ghi source/HTML và hash report; các report ghi rõ phiên bản đã đọc trước vòng biên tập, không gọi đó là review trực tiếp mọi chữ của bản sau sửa.

# Màn bài tập theo phong cách SSMS

Người dùng duyệt thiết kế ngày 25/10/2026. Base `main` là `19170bc`. Áp dụng cho 63 màn bài tập, giữ URL, đề, đáp án, dữ liệu mẫu và cách chấm hiện có. Bàn giao local trên nhánh `codex/ssms-exercise-workspace`, chờ duyệt trước khi merge/push.

## Quyết định đã duyệt

- Dùng toàn chiều ngang: đề bên trái 280–340px, editor/kết quả ở giữa, Object Explorer bên phải 260px; lề 24px, gap 16px. Giữ theme sáng, font và token của khóa học. Kiểm ở 1280, 1440 và 1920px; giữ thông báo giới hạn desktop hiện có.
- Khung liền mạch gồm toolbar **Chạy thử (F5) / Nộp bài / Sơ đồ database**, tab tên bài `.sql`, số dòng và status. Editor/kết quả bắt đầu 58/42, kéo hoặc chỉnh bằng bàn phím. Editor tối thiểu 180px, kết quả 160px, cả khung tối thiểu 560px. Màn thấp được cuộn trang; đề và Explorer cuộn riêng.
- Bốn tab dưới: **Kết quả / Thông báo / Dữ liệu bảng / Cấu trúc bảng**. Preview không thay kết quả chạy/chấm hay nháp. Explorer liệt kê bảy bảng, mở cột và thao tác xem dữ liệu/cấu trúc. Kiểu, NULL, PK và FK dùng chung `parseSchema` với sơ đồ.
- CodeMirror 6, dialect MSSQL, gợi ý từ khóa/bảng/cột/alias cơ bản. Ctrl+Space, mũi tên, Enter và Escape chọn/đóng gợi ý. Tab bốn cột, Shift+Tab giảm lề, Escape rồi Tab thoát; F5/Ctrl+Enter chạy toàn editor theo giới hạn một statement. Không gợi ý đáp án hoặc lệnh cấm. Completion không phải bộ xác nhận SQL hợp lệ.
- Giữ khóa lưu nháp và nội dung, kể cả nháp rỗng/comment; mount không tự lưu hoặc format. Textarea có nhãn/placeholder là dự phòng khi CM tải lỗi; lỗi storage vẫn giữ text trong phiên.
- Mỗi lần đổi document tăng revision và hủy quyền nộp, kể cả undo. Bắt đầu chạy lại cũng hủy quyền cũ. Chỉ Execute thành công, không lỗi SQL và đúng revision mở Nộp. Vẫn gõ được khi chờ; kết quả cũ có nhãn, không mở Nộp cho bản mới. Reload/đổi mã phải chạy lại. Chỉ grade đúng ghi tiến độ.
- Dữ liệu trực tiếp cần mã, 50 dòng/trang, Trước/Sau/Làm mới; không thêm edit/sort/filter/export. Metadata/sơ đồ không cần mã; không tự fetch dữ liệu khi mount. Cache trong phiên, xóa khi đổi mã. Một thao tác DB mỗi workspace; vẫn xem schema/sơ đồ khi chờ. Bỏ phản hồi không còn đúng bảng/request hoặc khi rời trang.
- Nộp chỉ chấm, server luôn rollback. Client/server dùng chung guard chặn lệnh giao dịch; literal/comment/quoted identifier không bị coi là lệnh. Giữ một statement, 4.000 ký tự, kiểm `@@TRANCOUNT` và rollback trong `finally`. Không giữ transaction giữa các HTTP call.

## Interface giữa các phần

1. `TablePreviewResponse` trong `exercise-types.ts`: `{ok:true; table:string; columns:string[]; rows:Cell[][]; page:number; pageSize:50; hasMore:boolean; ms:number}`. Failure dùng `ApiFailure` hiện có.
2. `GET /api/table-preview?table=<canonical name>&page=<zero based>` giữ auth/rate limit hiện có. Chỉ bảy bảng từ schema; page nguyên không âm và `page * 50 <= 2147483647`. Server tự tạo SELECT với cột tường minh, ORDER BY toàn bộ PK và FETCH 51, trả tối đa 50 dòng cùng `hasMore`. Không nhận SQL/cột/order tùy ý. Dùng runner hiện có để giữ conversion/timeout/rollback; lỗi SQL nội bộ trả unavailable. Script seed không được đưa vào client bundle.
3. API import script qua esbuild text loader và parser chung. Dev server chỉ bind loopback; `DEV_API_PORT` mặc định 7071, `DEV_UI_ORIGIN` mặc định `http://localhost:4321`, chỉ chấp nhận origin loopback hợp lệ. Không in mã khi khởi động, không đổi auth production.
4. Guard export `isBlockedCompletionKeyword(word:string):boolean` cho completion dùng chung danh sách cấm. Client completion không thay kiểm server.
5. `SqlEditor` giữ `value`, `onChange`, `onRun`; thêm `tables?:DbTable[]`, `describedBy?:string`. Giữ history/cursor qua rerender; chỉ báo đổi document khi người dùng sửa, không khi mount hoặc đồng bộ value ngoài. CSS editor riêng ở `src/styles/sql-editor.css`, bỏ quy tắc `.ed` cũ.
6. Exercise client thêm `preview(table,page,code,onSlow?,signal?)`; run/grade giữ args cũ và thêm optional signal cuối. Auth mask/reveal, lưu mã rồi tiếp tục; đổi mã xóa permit/cache, giữ nháp. Sai mã khi grade yêu cầu Execute lại sau khi nhập mã mới.

## Quyết định sau review

- **UI-01 — Làm theo:** nếu học viên đã nhập/Tab làm đổi text hoặc bắt đầu composition trước khi CM chunk sẵn sàng, giữ nguyên textarea trong suốt mount để giữ native undo và không ngắt IME. Ô chưa dùng vẫn nâng cấp bình thường. Hint phân biệt chế độ cơ bản giữ thao tác với lỗi tải chunk thật.
- **UI-02 — Làm một phần:** giữ route `client:only` để không ghi đè nháp/auth khi hydration. Astro có fallback tĩnh với toolbar/textarea disabled, trạng thái chờ, hướng dẫn tải lại và `noscript` dẫn tới SSMS riêng. Đây không phải editor tương tác trước React; textarea dùng được sau React khi CM lỗi. Test route kiểm chính HTML Astro, không dùng test component rời để khẳng định interactive SSR.
- **UI-03 — Làm theo:** lỗi xóa mã trong storage được báo riêng; memory auth/cache/permit vẫn reset. Không hứa mã đã xóa khỏi browser khi `removeItem` thất bại.
- **API P1/P2 — Làm theo:** lexer nhận literal nhị phân trước số/identifier để không nuốt lệnh giao dịch nối sát; URL parser của dev handler trả 400 có CORS khi target sai, không reject ngoài handler. Regression nguy hiểm chỉ kiểm bằng fake DB deps.

## Triển khai và nghiệm thu

Đã cân nhắc textarea với popup tự viết, CodeMirror và Monaco. Chọn CM6 vì có MSSQL/schema/keyboard, không cần worker hoặc CDN. CSS token hiện có là nguồn chính; `DESIGN.md` và `UX-CONTRACT.md` ghi owner cùng hành vi. Không thêm AI completion/đáp án vào client.

Kiểm RED→GREEN cho guard/API/auth/paging, editor/draft và revision/race. Câu giao dịch bị cấm chỉ kiểm bằng fake deps, không thử escape trên database chung. Kiểm dữ liệu trực tiếp bằng SELECT; 63 đáp án qua runner luôn hoàn tác rồi `check:data`. Chạy API build/typecheck và root test/check/build/check:dist. Kiểm UI ba độ rộng, màn thấp, bảng rộng, keyboard, undo, fallback và storage. Review độc lập UI, API/security và tích hợp bằng agent kế thừa model Codex của phiên; ghi riêng kiểm nguồn, HTML, browser, SQL live và giới hạn. Hồ sơ nghiệm thu được liên kết trong plan, không dùng kết luận reviewer thay bằng chứng hoặc quyền publish.

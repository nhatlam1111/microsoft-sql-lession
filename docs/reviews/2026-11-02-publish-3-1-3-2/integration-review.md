# Review tích hợp bản hợp nhất trước push 3.1–3.2 và research

Ngày: 02/11/2026. Reviewer Codex, **kế thừa model của phiên**, ngữ cảnh mới, không đổi model/effort hoặc phân tiếp. Review này kiểm tính toàn vẹn của bản merge; không học thử lại từng bài hoặc xác minh lại toàn bộ nghiên cứu lịch sử.

## Phạm vi, phiên bản và công cụ thực tế

- HEAD đã kiểm: `b6cf0babd2186ff9bead6a4da5582110ba26f276`; parent thứ nhất `1e3dbd1` (feature cộng research), parent thứ hai `a0a5d4b` (main được giao). Merge-base là `a67c37a4872daaee7711dbab8bb794fbb8a1f681`.
- Feature đã chốt hồ sơ: `5b47458`; sản phẩm drawer đã review: `8de5a4f`; research commit riêng: `1e3dbd1`. Kiểm delta `a0a5d4b..b6cf0ba`, danh sách file với hai parent và blob của mọi file thay đổi so với merge-base. Không chỉ dựa thông báo merge không conflict.
- Build được giao: `dist/`; [manifest](../../../temp/verification/2026-11-02-publish-3-1-3-2/build-manifest.json) ghi source đúng HEAD trên, `buildUTC` là `2026-11-02T16:32:14.5598577Z`. Tự tính SHA-256: **12/12 mục khớp**, gồm 10 file nguồn và HTML hai bài 3.1–3.2.
- Dùng PowerShell, Git `2.55.0.windows.3` chỉ đọc và Node `v24.18.1`; script kiểm trong bộ nhớ, không tạo scratch. Chỉ ghi report này; không sửa sản phẩm, index, HEAD hoặc branch. Không SQL/API/runner/DB/seed/secret, browser hay mạng; không chạy lại build/full suite.
- Đã đọc trọn brief, AGENTS, quy ước (đặc biệt §4.5–4.6), template, hồ sơ công ty và hai bài mẫu; đọc hồ sơ drawer, trình chiếu, validation/resolution nghiên cứu được giao. Hồ sơ cũ dùng để hiểu phạm vi và giới hạn, không thay phép kiểm merge tự làm.

## Nhận xét tích hợp theo tác động

### Giữ được — hai nhánh không ghi đè sản phẩm của nhau

Từ merge-base, feature thay 57 file, main thay 35 file; **chỉ `DESIGN.md` giao nhau**. Tự so object ID: mọi file riêng của feature trong merge khớp nguyên blob parent thứ nhất; mọi file riêng của main khớp nguyên blob parent thứ hai. Tập file cuối bằng hợp hai tập thay đổi, không thiếu file hoặc có thay đổi ngoài hợp đó.

`git diff` với từng parent cho `DESIGN.md` chỉ thêm đoạn của nhánh còn lại: đoạn hình trình chiếu/overview–detail tại khoảng dòng 163 và đoạn FlowExamples tại khoảng dòng 197 đều còn, không sửa lại đoạn của parent. Hai bổ sung có chủ sở hữu/phạm vi riêng và giữ nguyên các điều kiện đã duyệt.

### Giữ được — bài 3.1–3.2 và renderer không bị merge đổi

Đối chiếu trực tiếp `8de5a4f..b6cf0ba` cho toàn bộ bài học, component bài học và `src/lib/run-flow.ts` không có diff. Vì vậy query, drawer, minh họa, bảng kết quả và lời giảng đã chốt không bị main/research sửa ngầm. Đọc delta renderer xác nhận FlowExamples vẫn là render tĩnh tùy chọn; không có SQL runtime hoặc chủ sở hữu điều hướng mới.

So với main, `tests/content.test.ts` chỉ gỡ 3.1/3.2 khỏi danh sách chờ hai tiểu mục; không thêm bài vào allowlist. Bài 3.3 giữ nguyên từ merge-base và nằm ngoài lượt sửa này. Không dùng việc giữ nguyên làm kết luận đã chuyển khung hoặc kiểm lại nội dung 3.3.

### Giữ được — bản trình chiếu mới trên main còn nguyên

Nguồn deck, hai component trình chiếu, CSS, assets, test và hồ sơ main nằm trong 35 file đã so blob với `a0a5d4b`; ngoài phần DESIGN hợp nhất, chúng khớp parent main. Diff riêng `a0a5d4b..b6cf0ba` cho các đường dẫn trình chiếu không có kết quả. Bản sau sửa F1–F4/INT-01 được giữ, không lấy bản trước review trên feature thay vào.

Tác động quan trọng là giữ ID/chế độ chiếu và các sửa điều kiện/alt đã chốt. Đây là bằng chứng toàn vẹn nguồn; không phải reviewer đã xem lại 21 slide hoặc tự thử đồng bộ hai cửa sổ trên build merge.

### Giữ được — research chỉ là tài liệu

Commit `1e3dbd1^..1e3dbd1` chỉ thêm **29 file trong `docs/research/codefights-arcade/`**; không có file code, bundle, capture thô hoặc artifact Arcade đi vào nguồn sản phẩm. Các file này giữ nguyên blob qua merge.

Tự kiểm lại tài liệu bằng phép đọc tĩnh tương đương helper đã giao: **26 Markdown, 3 JSON parse được, 182 liên kết local, 75 đích duy nhất; không thiếu đích**. Kiểm thêm `git cat-file -e b6cf0ba:<đích>` cho từng đích: **75/75 có trong HEAD**, không chỉ tồn tại nhờ temp/untracked. Không có fragment trong các liên kết local này. Không phát hiện chuỗi khớp bốn nhóm mẫu credential của helper; đây không phải khẳng định đã nhận diện mọi dạng secret.

Validation, executive summary và resolution vẫn phân biệt bằng chứng lịch sử, quan sát hiện tại, đề xuất mới và AC chưa thực thi. Sáu quyết định IR được giữ nguyên; push tài liệu không chuyển chúng thành quyền triển khai challenge/runner/hạ tầng hoặc bằng chứng các acceptance test đã chạy.

### Giữ được — ranh giới thực hành, rollback, nháp và xác thực

Kiểm tên đường dẫn thay đổi từ merge-base tới HEAD không có API, database, YAML bài tập, islands/editor, exercise CSS, các file progress được xét, workflow hoặc manifest dependency. So với `8de5a4f`, các chủ sở hữu bài tập/API/dữ liệu/editor trong phạm vi cũng không đổi. Research không thêm route hoặc controller sản phẩm. Không có đề/đáp án/API mới hay migration nháp cần nghiệm thu trong merge này; không có diff thay giới hạn rollback/auth.

## Bằng chứng kiểm được giao, tách khỏi kiểm tự làm

Đã đọc đầy đủ `tests.log`, `check.log`, `build.log`, `dist.log`, `api-typecheck.log`, manifest, helper và `research-check.json` tại `temp/verification/2026-11-02-publish-3-1-3-2/`:

| Kiểm tác giả trên bản merge | Kết quả log thực tế |
|---|---|
| `npm test` | 57 file, **447/447 test đạt** |
| `npm run check` | 254 file, **0 errors, 0 warnings, 3 hints** deprecated: FormEvent hai vị trí, execCommand một vị trí |
| `npm run build` | Hoàn tất, **139 trang** |
| `npm run check:dist` | **139 trang, 2801 link**, OK |
| API typecheck | `tsc -p tsconfig.json`, log không có lỗi |
| Research preflight | 29 file/182 local links, không issue; tôi kiểm lại riêng như mô tả trên |

Đây là log tác giả được giao, không phải các lệnh app/API tôi chạy. Các kết quả SQL live, 76 đáp án qua runner luôn hoàn tác, check:data và UI drawer thuộc [lượt drawer](../2026-11-01-drawer-select/verification.md). Browser trình chiếu và phần sửa sau review thuộc [lượt trình chiếu](../2026-11-02-lam-quen-narrative/verification.md) cùng [ma trận xử lý](../2026-11-02-lam-quen-narrative/decisions.md). Không chuyển các giới hạn lịch sử của chúng thành kiểm tự làm trên bản merge.

## Findings theo ưu tiên

Không phát hiện finding P0–P2 hoặc lỗi tích hợp sản phẩm có căn cứ cần sửa. Có một lưu ý biên tập trong hồ sơ:

### INT-PUB-01 — P3 / Biên tập: whitespace của report lịch sử làm diff check không sạch

- **Vị trí:** `docs/reviews/2026-11-01-lessons-3-1-3-2/review-3-2.md:110`.
- **Thông báo nguyên văn:** `new blank line at EOF.`
- **Kiểm tự làm:** `git diff --check a0a5d4b..b6cf0ba` trả **exit 2**. `git diff --check a67c37a..5b47458` trả cùng thông báo/exit 2, nên đây là định dạng report đã có từ feature, không phải merge tạo lỗi nguồn.
- **Tác động:** không ảnh hưởng bài, renderer, dữ liệu hoặc kết luận review; ảnh hưởng cách ghi kết quả kiểm whitespace. Kiểm riêng delta sản phẩm, tests, DESIGN, quy ước/template/hồ sơ công ty và research trả **exit 0**.
- **Đề nghị:** tác giả ghi quyết định rõ theo §4.6. Có thể giữ nguyên report gốc và ghi ngoại lệ này để bảo toàn hồ sơ; không được báo diff check toàn delta đã đạt hoặc sửa kết luận report cũ. Không cần chạy lại test/build/SQL chỉ để xử lý ghi nhận này.

## Mọi mục cân nhắc, chưa kết luận hoặc ngoài phạm vi

| Mục | Căn cứ và việc tác giả cần xử lý/giữ rõ |
|---|---|
| INT-PUB-01, dòng trắng report gốc | Ghi quyết định giữ nguyên/biên tập tối thiểu cùng lý do; hiện trạng kiểm toàn delta là exit 2, không phải PASS. |
| Provenance HTML trình chiếu trong gói merge | Manifest merge có hai HTML bài học, không có hash HTML audience/presenter. Nguồn trình chiếu đã được tôi so blob chính xác với main; không tự nhận đã đối chiếu checksum hai HTML chiếu với manifest merge. Tác giả ghi riêng phần UI/HTML nào thực sự kiểm trên dist merge, giữ giới hạn này nếu không kiểm thêm. |
| UI/browser, clipboard, xác thực, nộp bài, nháp | Không có tương tác reviewer. Chủ sở hữu tương ứng không đổi; không yêu cầu lặp toàn bộ luồng chỉ vì merge. Nếu tác giả có QA merge mới, ghi viewport/thao tác/kết quả riêng; giữ các giới hạn copy/paste, screen reader, zoom và SSMS/Excel thật của hồ sơ cũ. |
| SQL live/API exercise/data | Không kiểm lại ở lượt này; so nguồn bảo vệ việc không thay câu lệnh/đáp án/runner. Kết quả live của drawer không chứng minh trạng thái DB hiện tại hoặc FK của deck hôm nay; không gọi API typecheck là kiểm SQL live. |
| Research lịch sử, ngoại vi và kiến trúc đề xuất | Không truy cập lại URL/tài khoản/REA hoặc xác minh mọi claim trong 29 file. Local links tồn tại/tracked không chứng minh nguồn bên ngoài vẫn truy cập được hay claim đúng; credential regex có phạm vi hữu hạn. Giữ Open Questions và các quyết định cần duyệt, không diễn giải công bố docs thành triển khai. |
| 3.3, alias minh họa và chuyển khung | Nguồn 3.3 nguyên vẹn; mạch/giới hạn đã có trong review drawer. Để xử lý ở lượt sửa 3.3 do người dùng yêu cầu tiếp theo, không mở rộng merge hiện tại hoặc nới test. |
| Static audit và cảnh báo nền | Giữ ghi nhận false positive resize trong hồ sơ drawer, ba hint deprecated và các giới hạn/audit dependency của hồ sơ trình chiếu. Tôi không chạy lại auditor/npm audit hoặc kết luận chúng đã được sửa. |
| Trạng thái Git/push/CI sau review | Lúc kết thúc kiểm, HEAD vẫn `b6cf0ba`; thư mục hồ sơ lượt publish và `premium-audit.json` còn untracked. Không đọc nội dung premium-audit. Tác giả cần chốt hồ sơ đúng phạm vi và ghi push/CI bằng kết quả thật; không stage file ngoài scope hoặc dùng report này làm kết quả CI/quyền push. |

## Giới hạn và kết luận

Kiểm tự làm của tôi gồm đối chiếu cây/blob hai parent, diff có trọng tâm, 12 hash, preflight local links/JSON/mẫu credential, Git whitespace và đọc hồ sơ/log. Không chạy lại full suite/build/API/SQL, không đọc seed/secret hoặc dùng browser/mạng; không chứng nhận dữ liệu live, hiệu quả sư phạm hay toàn bộ tương tác UI.

Bản merge giữ nguyên sản phẩm 3.1–3.2, phần trình chiếu mới của main và research chỉ tài liệu; không thấy lỗi tích hợp sản phẩm cần sửa. Tác giả cần ghi quyết định cho INT-PUB-01 và các mục giới hạn ở trên theo §4.6, rồi kiểm kết quả Git/CI thực tế khi thực hiện phạm vi push đã được người dùng cho phép. Kết luận này không thay bằng chứng kiểm hoặc quyền push/deploy.

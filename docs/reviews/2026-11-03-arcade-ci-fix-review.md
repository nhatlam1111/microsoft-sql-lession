# Review tích hợp độc lập: bản sửa CI sau PR #7

Ngày review: 03/11/2026, giờ Việt Nam. Reviewer: Codex, kế thừa model của phiên; không chỉ định model khác, không tạo subagent. Đây là review công cụ CI, không phải review lại nội dung các bài SQL.

## Phạm vi, phiên bản và cách kiểm

- Base và HEAD lúc kiểm: `a8d580195e4837c7e214371b48a29c28a28f37c7`.
- Source: working tree nhánh `codex/fix-arcade-ci-dependencies`, chưa commit ở thời điểm review.
- Phạm vi: diff từ base của `.github/workflows/deploy.yml`, `.github/workflows/deploy-api.yml`, `README.md`, spec và plan Arcade ngày 03/11; đọc phần evidence của file mới `docs/reviews/2026-11-03-arcade-ci-fix.md`. Không đọc review khác hay dùng kết luận tác giả để dẫn hướng.
- Quyết định áp dụng: chỉ cài dependencies API trước test; giữ test, dependency/lockfile, mã sản phẩm/API, typecheck/build/prune, quyền và deploy.
- Đã đọc `AGENTS.md`, `docs/quy-uoc.md`, nhất là mục 4.5, 4.6 và 5; đọc hai package manifest, phần đầu hai lockfile, hai test từng lỗi, chuỗi import Arcade liên quan, `api/build.mjs` và `api/.funcignore`.
- Công cụ thực tế: PowerShell, Git, Node.js `v24.22.2`, npm `11.19.1`, parser `yaml` đang có ở repo. Chỉ kiểm nguồn/YAML và đọc log; không dùng browser, không chạy install/test/build của sản phẩm trong lượt reviewer.
- Chỉ ghi report này; không sửa source, test, docs, index, HEAD hay branch. Không đọc `.env`, secret hay `database/HRM_Demo.sql`; không kết nối database, chạy SQL, API/runner, push hoặc deploy.

Fingerprint source của hai workflow (SHA256):

```text
deploy.yml      644F1B56483929B7602C17023854DD150E4CEB56FCF98B4B0AE4C2894D572A46
deploy-api.yml  F3A62DAC1F29ED5E13DDFC6C4169842D180DAF71111ABC18F8DB7E3579855452
```

## Findings theo tác động

Không phát hiện finding cần sửa hoặc cần làm rõ trong phạm vi được giao. Không dùng số lượng finding hay nhãn Ready thay cho bằng chứng kiểm.

## Những phần giữ được và căn cứ

1. **Đúng nguyên nhân thiếu dependency.** `tests/arcade-store.test.ts:2` import trực tiếp `api/src/arcade-store.ts`; `tests/arcade-config.test.ts:3` import qua `api/src/arcade-config.ts:3`. `api/src/arcade-store.ts:2` import `mssql`, còn dependency này thuộc `api/package.json:18` và lockfile API. Package gốc và API là hai package riêng, không có khai báo workspace ở manifest gốc. Cài package gốc không thay cho cài package API.
2. **Web có đủ dependency trước check/test.** `.github/workflows/deploy.yml:26-29` chạy `npm ci`, `npm --prefix api ci`, `npm run check`, rồi `npm test`. Bước mới chạy ở gốc checkout; reviewer tự chạy lệnh đọc `npm --prefix api prefix` và nhận đúng đường dẫn `D:\lam.nguyen\Projects\microsoft-sql-lession\api`. Không có thay đổi working directory làm lệch prefix.
3. **API giữ đúng chuỗi chuẩn bị và đóng gói.** `.github/workflows/deploy-api.yml:36-44` cài gốc và API trước test; bước `Build the API` vẫn có `working-directory: api` và giữ thứ tự typecheck → build → prune production. `npm ci` cũ ở bước build được chuyển lên, không chạy lặp. Dev dependencies vẫn có cho typecheck/build, và `mssql` vẫn thuộc production dependencies sau prune. `api/build.mjs` vẫn để packages external; vị trí cài API phù hợp với gói deploy `api`.
4. **Không đổi quyền hoặc hành vi deploy.** Reviewer parse cả hai YAML bằng `yaml.parseDocument` với kiểm duplicate key: không có lỗi parse. Reviewer đối chiếu object YAML với `git show <base>:<workflow>` bằng `assert.deepEqual`: khi bỏ bước cài API mới và phục hồi dòng `npm ci` cũ trong build API, cấu trúc hai workflow bằng base. Vì vậy trigger/path filter, Node 22, cache, concurrency, permissions, biến build, artifact, Azure login, gói deploy và smoke checks giữ nguyên.
5. **Tài liệu khớp sửa đổi.** `README.md:51-56` có hai lệnh cài và giải thích dependency của test Arcade; `README.md:165-166` phản ánh việc cài cả hai package. Phần mới của spec/plan ghi bản sửa, nguyên nhân và giới hạn push/deploy, không mở rộng sửa nội dung/API. File evidence phân biệt kết quả máy Windows với GitHub runner Ubuntu Node 22/npm 10 và ghi chưa chạy lại Actions/deploy.
6. **Phạm vi source được giữ.** `git status --short` và diff từ base chỉ có năm file tracked được giao cùng file evidence mới. Test, package/lockfile và mã sản phẩm/API không đổi. Reviewer tự chạy `git diff --check`, exit 0, không có output lỗi.

## Bằng chứng reviewer tự kiểm

| Kiểm | Kết quả trực tiếp của reviewer |
|---|---|
| HEAD, branch, status và diff từ base | Khớp source/phạm vi nêu trên |
| Parse hai workflow bằng parser YAML, kiểm duplicate keys | Không có lỗi parse |
| Đối chiếu cấu trúc YAML với base bằng assertion | Chỉ khác phần cài API trước test như quyết định đã chốt |
| Vị trí npm prefix | `npm --prefix api prefix` trả đúng thư mục package API |
| `git diff --check` | Exit 0, không có output lỗi |
| SHA256 working tree với bản sao kiểm | 13/13 file so sánh khớp: hai workflow; README, spec, plan; hai manifest, hai lockfile; hai test từng lỗi; `arcade-config.ts`, `arcade-store.ts` |

Bản sao đối chiếu: `C:\Users\lam.npn\AppData\Local\Temp\sql-pr7-ci-ec695ebc673549f39aef794e2f5e17b5\source`. Reviewer không tự tạo bản sao hoặc quan sát trạng thái trước lúc cài; việc bản sao được tạo bằng `git archive`, không có dependencies/secret cũ là mô tả của tác giả. Hash đối chiếu xác nhận các file đã nêu ở source hiện tại và bản sao giống nhau lúc reviewer kiểm.

## Evidence tác giả đã đọc, không phải lệnh reviewer chạy

Log nằm ở thư mục cha của bản sao trên. Reviewer trực tiếp đọc log trước sửa, log cài đặt, toàn bộ log test/check/API và các dòng kết thúc build web. Exit status không được lưu thành dòng trong các log; cột exit bên dưới là thông tin tác giả cung cấp sau khi session lệnh `80366` hoàn tất với exit 0, và được ghi trong file evidence. Không suy ra exit status chỉ từ một invocation đang chạy.

| Kiểm của tác giả | Nội dung reviewer đọc được trong log | Exit do tác giả cung cấp |
|---|---|---|
| Root install | `install-root.log`: added 508 packages | Không nhận riêng exit status trong gói giao review |
| Tái hiện chỉ cài root rồi chạy hai suite | `before-test.log`: cả hai suite lỗi `Cannot find package 'mssql'` từ `api/src/arcade-store.ts`; 2 failed, no tests | 1 |
| Cài API | `install-api.log`: added 84 packages | 0 |
| Full test sau cài API | `test.log`: 67 file, 561 test passed; hai file từng lỗi có đủ 3 + 3 test passed | 0 |
| Astro check | `astro-check.log`: 187 files, 0 errors, 0 warnings, 7 hints | 0 |
| Web build | `web-build.log`: 190 pages built, `Complete!` | 0 |
| Kiểm dist | `check-dist.log`: OK, 190 trang, 3544 link | 0 |
| API typecheck | `api-typecheck.log`: invocation `tsc -p tsconfig.json`; công cụ không có dòng summary thành công riêng | 0 |
| API build | `api-build.log`: Built the API with 76 exercises and 50 Arcade challenges | 0 |
| API prune | `api-prune.log`: removed 6 packages, audited 79 packages | 0 |

Log root install có 11 audit findings (2 low, 3 moderate, 3 high, 3 critical); API install/prune có 2 high. npm 11 còn nhắc allowScripts của esbuild/sharp. Astro check có 7 hints deprecation; log test có stderr của các ca kiểm lỗi chủ động và thông báo collection exercises trống trong ca component. Summary test/check/build đã kết thúc như bảng trên. Những cảnh báo này được giữ đúng là evidence nền, không báo mọi loại cảnh báo đều bằng 0 và không tự nâng dependency.

## Hành vi đã cân nhắc nhưng để ngoài phạm vi

| Hành vi | Lý do/giới hạn |
|---|---|
| Chạy lại trên GitHub Ubuntu, Node 22/npm 10 | Chưa push/chạy workflow; evidence hiện tại dùng Windows Node 24/npm 11. Không khẳng định CI remote đã xanh |
| Cache npm cho lockfile API riêng | Thay đổi cache key có thể cải thiện tốc độ nhưng không cần để cài đúng package; giữ thiết lập hiện có theo phạm vi |
| Mock `mssql`, tách helper khỏi store hoặc đổi dependency của package gốc | Đây là thay đổi kiến trúc/test; quyết định đã chốt giữ nguyên test và product/API |
| Audit findings, allowScripts và deprecation hints | Không đổi dependency/lockfile hay thiết lập bảo mật trong bản sửa thứ tự cài; không có căn cứ quy chúng thành hồi quy của diff này |
| Hành vi database, API live, smoke check sau deploy và UI | Source sản phẩm không đổi; không được giao chạy database/API/deploy. Không lấy build/test local thay cho nghiệm thu các phần này |
| Review nội dung từng bài và tiền đề bài tập | Không có MDX/YAML bài học thay đổi; lượt này chỉ review công cụ CI, không thay các lượt học thử nội dung |

## Kết luận kỹ thuật

Bản sửa nguồn đáp ứng phạm vi: cài dependencies của package API trước các test import API trong cả hai workflow, giữ nguyên các bước typecheck/build/prune và deploy. Không có finding cần sửa trong lượt review này. Evidence tác giả cho thấy đã tái hiện lỗi thiếu `mssql` trên bản sao sạch và full test/build sau cài API đã hoàn tất theo bảng; reviewer xác nhận nội dung log và sự khớp phiên bản ở các file trọng yếu, không nhận các lệnh đó là do mình chạy.

GitHub Actions trên runner đích và Azure sau deploy vẫn chưa xác minh. Kết luận review này không phải quyền push, merge hoặc deploy; vẫn theo phạm vi người làm khóa học đồng ý ở `docs/quy-uoc.md` mục 5.

# Sửa GitHub Actions sau merge PR #7

## Phạm vi và phiên bản

- Ngày kiểm: 03/11/2026, giờ Việt Nam.
- Base: `a8d580195e4837c7e214371b48a29c28a28f37c7`, merge PR #7 vào `main`.
- Source sửa: working tree trên nhánh `codex/fix-arcade-ci-dependencies` từ base trên.
- Chỉ đổi thứ tự cài dependencies trong hai workflow và tài liệu liên quan; không đổi test, dependency/lockfile, API, YAML bài luyện hay MDX.

## Lỗi đã xác minh

Cả [run web 41562487412](https://github.com/nhatlam1111/microsoft-sql-lession/actions/runs/41562487412) và [run API 41562487438](https://github.com/nhatlam1111/microsoft-sql-lession/actions/runs/41562487438) đều lỗi ở `npm test`: 65 file đạt, 2 file không nạp được, 555 test đạt. Hai file lỗi là `tests/arcade-config.test.ts` và `tests/arcade-store.test.ts`:

```text
Cannot find package 'mssql' imported from '.../api/src/arcade-store.ts'
```

`mssql` thuộc dependencies của `api/package.json`. `npm ci` ở gốc chỉ cài lockfile gốc; workflow web không cài API, còn workflow API cài API sau test. Máy đã từng cài API không gặp lỗi này. Hai run đều chưa tới bước build/deploy của phiên bản mới; lỗi này không phải do các biến `ARCADE_*` trên Azure.

GitHub plugin dùng để lấy PR, job và log; danh sách run dùng `gh run list` vì công cụ liệt kê run của plugin chỉ trả run có sự kiện PR, còn hai run này có sự kiện `push`.

## Bản sửa

- `deploy.yml`: cài `npm --prefix api ci` ngay sau `npm ci`, trước check và test.
- `deploy-api.yml`: cài API ngay sau `npm ci`, trước test; bỏ lần `npm ci` trùng ở bước build API. Giữ typecheck, build và prune trước đăng nhập/deploy Azure.
- README ghi đủ hai lệnh cài trước test; spec/plan cập nhật trạng thái sau merge và lượt sửa CI.

## Kiểm thực tế trước phát hành

Tạo bản sao từ `git archive HEAD` ở `C:\Users\lam.npn\AppData\Local\Temp\sql-pr7-ci-ec695ebc673549f39aef794e2f5e17b5\source`, ngoài repo để không nhận dependencies có sẵn từ thư mục cha. Bản sao không có `.env`, `api/local.settings.json`, `node_modules` hay `dist` của máy phát triển. Chép đúng các file workflow/tài liệu vừa sửa sang bản sao trước vòng kiểm sau sửa.

Môi trường: Windows, Node.js `v24.22.2`, npm `11.19.1`. GitHub runner của lượt lỗi là Ubuntu, Node.js `v22.23.4`, npm `10.9.9`; chưa chạy lại trên runner đó.

| Kiểm | Kết quả |
|---|---|
| Chỉ `npm ci` ở gốc, rồi chạy hai file test lỗi | Tái hiện đúng lỗi thiếu `mssql`, exit 1; log `before-test.log` |
| `npm --prefix api ci` | Đạt, exit 0; log `install-api.log` |
| `npm test` sau khi cài API | 67 file, 561 test đạt, exit 0; gồm đủ 6 test của hai file từng lỗi; log `test.log` |
| `npm run check` | 187 file, 0 errors, 0 warnings, 7 hints; exit 0; log `astro-check.log` |
| `npm run build` | 190 trang, exit 0; log `web-build.log` |
| `npm run check:dist` | 190 trang, 3544 link đạt, exit 0; log `check-dist.log` |
| `npm --prefix api run typecheck` | Đạt, exit 0; log `api-typecheck.log` |
| `npm --prefix api run build` | 76 bài tập và 50 bài Arcade, exit 0; log `api-build.log` |
| `npm --prefix api prune --omit=dev` | Đạt, exit 0; log `api-prune.log` |
| `git diff --check` | Đạt trước và sau vòng kiểm sau sửa |

Log từng lệnh đặt trong thư mục cha của bản sao. Vòng kiểm sau sửa kết thúc với exit 0. Test vẫn in stderr của các tình huống lỗi giả lập và cảnh báo collection `exercises` rỗng trong test placeholder; không có test thất bại. Bảy hint của Astro là deprecated `FormEvent` và `document.execCommand` đã có trong log CI của base.

## Review độc lập và xử lý

Review tích hợp độc lập bằng Codex, kế thừa model của phiên, ngữ cảnh mới; không có finding cần sửa. [Report nguyên văn](2026-11-03-arcade-ci-fix-review.md) lưu bản sao từ `temp/review/2026-11-03-arcade-ci-fix/review-ci.md`, không sửa kết luận reviewer. Reviewer tự parse và đối chiếu cấu trúc YAML với base, kiểm diff/prefix và so SHA256 13 file với bản sao kiểm; đọc log kiểm của tác giả, không nhận các lệnh đó là do mình chạy.

Xử lý các mục reviewer cân nhắc ngoài phạm vi:

| Mục | Quyết định và căn cứ |
|---|---|
| GitHub Ubuntu/Node 22 và Azure sau deploy | Chưa xác minh; cần quyền push/deploy của người làm khóa học, không dùng kết quả local thay thế |
| Cache lockfile API | Không đổi: chỉ ảnh hưởng tốc độ tải package, không cần để sửa thứ tự cài |
| Mock/tách `mssql` hoặc thêm nó vào package gốc | Không làm: cài đúng dependencies API giải quyết lỗi, không cần đổi test/kiến trúc |
| Audit, allowScripts, deprecation | Ghi rõ cảnh báo nền; không nâng dependency hoặc đổi thiết lập bảo mật trong lượt sửa CI |
| Database/API live, UI và review nội dung bài | Không kiểm lại: không đổi mã sản phẩm, MDX/YAML hay dữ liệu; lượt này không thay nghiệm thu các phần đó |

## Giới hạn

- Tại thời điểm kiểm và review ở trên chưa push, chưa chạy lại GitHub Actions và chưa deploy; không dùng kết quả trên máy để khẳng định CI/Azure đã xanh.
- Không đọc secret, kết nối database hay chạy kiểm SQL live trong lượt sửa này; source SQL và dữ liệu không đổi.
- Cảnh báo nền từ dependency hiện có: `npm ci` gốc báo 11 audit findings (2 low, 3 moderate, 3 high, 3 critical), API báo 2 high; npm 11 còn nhắc `allowScripts` cho esbuild/sharp. Các lệnh vẫn exit 0, build web/API đạt; không tự nâng dependency hoặc đổi thiết lập bảo mật ngoài phạm vi sửa thứ tự cài đặt.

## Phát hành

Ngày 03/11/2026, sau khi nhận bản sửa, kết quả kiểm và review, người làm khóa học yêu cầu: "merge và push lên nhé". Phạm vi được đồng ý là merge bản sửa CI vào `main` và push để hai workflow tự chạy build/deploy. Kết quả trên runner đích xem tại [GitHub Actions](https://github.com/nhatlam1111/microsoft-sql-lession/actions); kết quả kiểm và review ở trên giữ nguyên là hồ sơ trước phát hành.

Trước commit, `git fetch origin main` xác nhận remote vẫn ở base `a8d5801`, không có thay đổi mới cần tích hợp. Checkout chính cũng tái hiện hai suite thiếu `mssql` khi chưa cài API; sau `npm --prefix api ci`, chạy lại đầy đủ `npm test`: 67 file, 561 test đạt, exit 0. Hai workflow giữ đúng fingerprint đã review; lockfile và mã sản phẩm không đổi.

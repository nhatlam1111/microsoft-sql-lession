# Review tích hợp AnimatedFlow — 15/11/2026

Phạm vi: bảng soi điều kiện và tổng trong `AnimatedFlow`, đối chiếu `RunFlow`, `run-flow.ts`, ba nơi dùng 2.1–2.3, test và HTML `dist`. Reviewer được cấu hình `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; công cụ không cung cấp xác nhận model thực tế. Không review lại toàn bài hoặc từng đề.

## Kết quả

Không thấy finding trong phạm vi đã kiểm. Giữ được các điểm sau:

- 2.1 có hai bước, không có bảng soi. 2.2 có một điều kiện: bốn dòng trích có kết luận đúng với giá trị nguồn; HTML ghi 14 đúng, 14 giữ trên 48 dòng. 2.3 dùng `AND`: bốn dòng trích cho kết luận Loại/Giữ đúng hai điều kiện, gồm NV003 và NV043 được giữ; HTML ghi lần lượt 24 đúng, 3 đúng, 2 giữ trên 48 dòng. Caption nói rõ bốn dòng là trích và tổng đếm trên cả 48 dòng, từng điều kiện đếm riêng.
- Source dùng cùng `checkKept`, `checkCellText`, `checkNote` với RunFlow. Nhánh có `labels` hiển thị từng nhãn, `null` là “Không xét”, tổng từng nhánh và ELSE dùng “dòng”; nhánh không nhãn hiển thị “Giữ” khi mọi ô đúng, kể cả `null` thì không giữ. Đây là đối chiếu logic source, chưa có ví dụ `labels` trong ba HTML được giao để xác minh hiển thị thực tế.
- Theo source/HTML, bảng có caption, tiêu đề cột và hàng có `scope`, vùng cuộn có tên và `tabindex`; nội dung chi tiết nằm trong `details` native. Kiểm này không chứng minh trải nghiệm bàn phím hay trình đọc màn hình thực tế.

## Bằng chứng và giới hạn

Tự kiểm: đọc source, diff và test được giao; đối chiếu dữ liệu bốn dòng 2.2/2.3 với điều kiện, kết quả và trích HTML hiện có bằng HTML parser. Không tự chạy test, build, browser hay SQL; tổng 48, 14, 24, 3, 2 được đối chiếu với source và HTML, không xác minh độc lập với toàn bộ database. Không xác minh ảnh/GIF bằng mắt hay kiểm accessibility bằng công nghệ hỗ trợ. Test mới kiểm tổng 2.3, chưa bao phủ nhánh `labels` của AnimatedFlow.

Bằng chứng tác giả cung cấp: 41 test đạt, build 204 trang và `check:dist` 286; hai `browser.json` ghi kiểm bàn phím, giảm chuyển động, lỗi tải GIF, không JavaScript và giới hạn shell tại 390px. Đây là báo cáo của tác giả, không phải thao tác reviewer. Hash hiện tại của AnimatedFlow, HTML 2.2/2.3 và hai manifest khớp hash tương ứng trong `browser.json`; chưa đối chiếu toàn bộ phụ thuộc hoặc xác minh thời điểm chạy, nên không suy rộng thành kiểm lại độc lập.

SHA-256 hiện tại: `AnimatedFlow.astro` 769549d8ea868e4743a7b09978dd04819ee2a99415d025f4fb66b64d7b34dd9c; `RunFlow.astro` 8e0d2a64c432ed42afc9441bf4de7000103c3a19a643f47bc2d69ef34022eeeb; `run-flow.ts` 62144fcced9d9310753e3cfa22c75e34e0ff4afbbaebd9b143d05f35015cdfa8; `tests/animated-flow.test.ts` f64b0ffa79d1d93acfb34697c134ef2f093679ad2a4ef88d60884f7c1c6ed341.

HTML 2.1/2.2/2.3 lần lượt: 3002f591d661e87b024aed2843df6a8e205770817693389b7cee6ed1d8861df9, 677d2c18ff8343d7e3f773ac49e89d8eeca627ffdc5e409501590c04c33580f0, 93faa50066e91c9f487b320553121f3e04af1d5fbd00f182f0d560be34c56785. Đổi source hoặc phụ thuộc liên quan cần kiểm lại phần bị ảnh hưởng; hash hiện tại không chứng minh phiên bản dùng trong lần test/build trước.

# Review tích hợp ORDER BY / TOP — 17/11/2026

## Cấu hình và phạm vi

Reviewer được giao cấu hình `gpt-6.1-terra`, `reasoning_effort: high`, `fork_turns: none`; công cụ không cung cấp bằng chứng xác minh model thực tế. Vai trò Business Consultant chỉ biết Excel cơ bản, hỏi vì sao và kết luận theo bằng chứng. Review riêng chuyển động ORDER BY tại bảng phải, khóa/chiều và TOP chuyển năm dòng; 2.6 sau DISTINCT dùng cùng renderer; HAVING 3.3 dùng RunFlow ngoài xuất GIF. Không review lại toàn bài/đề: tiền đề từng đề nằm ngoài gói tích hợp được giao. HEAD `9b76a556eb5f9bc8c6496b18fd9a4845e1bcf880` cũ hơn working tree; hash bên dưới định danh bản đã đọc, không suy bằng chứng từ HEAD hay report cũ.

## Kết quả

**Không có finding đáng kể trong phạm vi đã kiểm.**

- Source: `storyboard.mts` tạo thứ tự bằng khóa ngày DESC rồi mã ASC ở 2.4, tạo các lần đổi vị trí trên bản sao, kiểm thứ tự với dữ liệu bước; 2.6 dùng hai khóa ASC sau DISTINCT. `render-flow.mts` dựng bảng phải từ thứ tự đầu vào, đổi vị trí dòng trong bảng đó và tô cột khóa/mũi tên. TOP dùng một move gồm chỉ số 0–4 và một move loại dòng sau; assertion đối chiếu năm dòng đầu với kết quả. Test source kiểm tái hiện thứ tự, nhóm năm dòng và NV040; chưa chạy test trong lượt review này.
- GIF 2.4: tại 21,30 s bảng phải ban đầu khớp sáu dòng nguồn, cột ngày ↓ và mã ↑ được đánh dấu; tại 23,05 s NV048 đang chuyển lên trong bảng phải; tại 30,35 s thứ tự là NV048, NV047, NV046, NV045, NV044, NV040, ngày tương ứng giảm dần. Sáu ngày trong mẫu khác nhau nên ảnh này không tự chứng minh xử lý trường hợp bằng ngày; lời cảnh giải thích khóa phụ. Tại 32,00 s nguồn giữ sáu dòng, đích chưa có dữ liệu; 32,95 s năm dòng đầu chuyển đồng thời; 35,05 s năm dòng tương ứng đã đến đích và NV040 vẫn ở nguồn, được gạch để thể hiện nằm ngoài TOP. Trong lúc chuyển các bản sao tạm che một phần dòng bên dưới, nhưng các trạng thái đầu/cuối đọc được và dữ liệu không bị đổi trong các mốc đã xem.
- PNG `order.png` và `top.png` khớp trạng thái cuối tương ứng đã xem trong GIF. Chú thích trong cảnh ORDER BY công khai đổi mẫu 3 sang 6 dòng và số trích 6/45, 2/4; không trình bày sáu dòng là toàn bộ dữ liệu.
- HTML: chỉ đọc mã sinh bảng trong renderer; chưa đọc HTML trang build. UI: chưa thử tương tác, bàn phím, thu hẹp hay giảm chuyển động. SQL/API: không chạy theo phạm vi giao, không chứng nhận dữ liệu live; chưa xem GIF các bài ORDER BY khác. Kết luận ảnh chỉ áp dụng các mốc và hai PNG đã kiểm, không phải kiểm toàn bộ khung hay bảo đảm phát hành.

## SHA-256 bản đã kiểm

| Tệp | SHA-256 |
|---|---|
| `scripts/animations/render-flow.mts` | `71c846a4bc7d372003d81823b943535976190f5657011b4dae816d759b8cc6e9` |
| `scripts/animations/storyboard.mts` | `18502449a99292d3462fb220f2475ece4aa2b6ddc64c87ae756a5b0429fa3e99` |
| `scripts/animations/select.css` | `5f1d05e65f73719a9a626bae30eaf8a8d92c716a359a769890de49efe4029469` |
| `scripts/animations/render-order-top.mts` | `55b5fd9e135f3880a3cd4bf6ee7537fb59494995d967ab8e7ed25bf6e723f4ce` |
| `tests/animated-flow.test.ts` | `d108dbf03374bea522390060dcae87d1cbca25761cefdcf4466c2196fa5edf17` |
| `src/content/lessons/2-4-sap-xep-va-top.mdx` | `2de230d6ab778f6bc5acf2fe4da6c2a51e84b21382693c3dc689321999d14eda` |
| `public/lesson-animations/2-4-order-top/animation.gif` | `19f200f37716ee60a701c86b9f2348d08e01cde679d29250b0b36e7c8ee1ff4b` |
| `public/lesson-animations/2-4-order-top/order.png` | `9382f1fa6556f9e40f65f9a1aaed61ead6115daedcf982ac432b387da3c019a5` |
| `public/lesson-animations/2-4-order-top/top.png` | `4a5e89eb122ef22bef90e4bff209f3a40034deca09d7e876f03654eaf849bfd4` |
| `public/lesson-animations/2-4-order-top/manifest.json` | `2cdaa4a30299df4288c15037649019b00846f0b0f6005afe85bd339382d0318c` |

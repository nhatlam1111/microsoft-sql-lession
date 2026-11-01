# Thêm bài giảng trình chiếu

Quy ước nội dung tại mục 4.7 của [quy-uoc.md](quy-uoc.md). Slide dùng để giảng/ôn cùng lớp, bài đầy đủ vẫn là nguồn giải thích để đọc lại.

## Một MDX cho mỗi bộ

Tạo `src/content/presentations/<slug>.mdx`. Slug chỉ dùng chữ thường không dấu, số và gạch ngang. Collection riêng không nhận `num`, `level` hay trạng thái hoàn thành.

```mdx
---
title: Tên buổi giảng
summary: Nội dung và mục đích của buổi học.
sourceLessons: ["1.1"]
keywords: [slide, bài giảng, từ khóa tra cứu]
minutes: 10
---

import Slide from '../../components/presentations/Slide.astro';
import PresenterNotes from '../../components/presentations/PresenterNotes.astro';

<Slide id="nguon-du-lieu" title="Nguồn dữ liệu" source="1.1" minutes={3}>

Một ý chính và hình/bảng minh họa phù hợp.

<details data-answer>
<summary>Lời giải</summary>

Chỉ dùng khối này cho câu hỏi đã có đủ tiền đề.

</details>

<PresenterNotes source="1.1" minutes={3}>

**Ý cần nói:** Điều người giảng cần nhấn mạnh.

**Hay hiểu nhầm:** Một cách hiểu sai và hậu quả.

**Giải thích:** Lý do và điều kiện cần nói thêm.

</PresenterNotes>
</Slide>
```

`id`, `title`, `source` dùng chuỗi literal, `minutes` là số nguyên literal. Mỗi ID duy nhất và giữ ổn định để liên kết chia sẻ không hỏng. `source` phải là bài có thật, thuộc phạm vi `sourceLessons`. `PresenterNotes.source` và `PresenterNotes.minutes` phải khớp `source` và `minutes` của `Slide` chứa nó. Thời lượng metadata gồm phần giảng và hỏi đáp; ghi rõ cách phân bổ trong slide mở đầu. Mỗi slide tối đa một `details data-answer`.

Mục lục được lấy từ các thẻ `Slide` khi build. Một file mới tự có trang chiếu, trang người giảng, mục lục bài giảng, kết quả tìm kiếm và liên kết ở các bài nguồn/nhóm level tương ứng. Không chép controller hoặc thêm route riêng cho từng bộ.

## Hình và bố cục

`ProjectionTable` nhận `caption`, `columns`, `rows`; `markRow` và `markColumn` đánh số từ 0. Caption nói rõ bảng trích/minh họa, không trình bày nó thành toàn bộ dữ liệu thật. `ProjectionRelation` chọn bảng/cột từ schema hiện hành và chỉ hiển thị các quan hệ đã khai báo; `showLinks={false}` dành cho câu hỏi tự tìm đường.

Canvas logic 1280×720, nội dung chỉ khoảng 1168×500 sau tiêu đề/chân slide. Không thu nhỏ chữ để nhét bài dài. Chia ý hoặc rút câu, kiểm cả trạng thái đã hiện lời giải. Các class dùng chung gồm `projection-grid`, `projection-lead`, `projection-caption`, `projection-keyline`, `projection-question` và `projection-rules`.

## Hai cửa sổ và kiểm

Mở chế độ người giảng, bấm **Mở cửa sổ chiếu**, kéo cửa sổ sang màn hình cho lớp. Bấm **Toàn màn hình** trong cửa sổ chiếu. Hai cửa sổ cần cùng trình duyệt/profile và origin; không điều khiển từ máy khác. Một phiên dùng một cửa sổ người giảng. Ghi chú công khai nhưng không có trong HTML trang chiếu cho lớp.

Next hiện đáp án trước khi sang slide khác; Previous đi ngược. Tự bấm màn chiếu chuyển sang Tự xem, **Theo người giảng** yêu cầu trạng thái hiện tại. Link chia sẻ chỉ giữ ID slide và mở câu hỏi chưa lộ đáp án.

Chạy các lệnh test/check/build/check:dist, kiểm browser và review độc lập theo quy ước. Kiểm đủ tiền đề câu hỏi, ghi chú, liên kết, nhãn bảng, tràn chữ, bàn phím, tải lại, theo lại và các nhánh dự phòng. Trang trình chiếu không được import/mount progress store hoặc các island tiến độ.

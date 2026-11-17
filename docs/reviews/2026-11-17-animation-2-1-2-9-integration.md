# Review tích hợp ảnh động 2.1–2.9

- Cấu hình giao: `gpt-6.1-terra`, `reasoning_effort: high`, `fork_turns: none` (ngữ cảnh mới); công cụ không cung cấp bằng chứng xác minh model thực tế.
- Base `9b76a55`, đối chiếu diff local; nguồn và ảnh có thể đang được tác giả xuất lại đồng thời. Review chỉ phần dựng chung, storyboard, entry point, manifest và test; không review lại bài/YAML/đề không đổi.

## Finding

1. **Đứt mạch trong ảnh tĩnh 2.4 — dễ hiểu nhầm dữ liệu tự thay đổi.** `storyboard.mts`, nhánh `ORDER BY` của `2-4-order-top`, thay phần trích sau SELECT bằng sáu dòng để minh họa ranh giới TOP và đặt lời báo trong `intro`. `render-flow.mts` chỉ hiện `intro` đầu cảnh; các cue và khung cuối ghi đè lời này. Do đó `select.png` có NV001, NV047, NV048, còn `order.png` ghi “Đầu vào · Sau SELECT” nhưng hiển thị NV040, NV044, NV045, NV046, NV047, NV048 mà không nói đã đổi phần trích. Tôi thấy hiện tượng trong PNG thực tế; GIF báo đổi mẫu lúc bắt đầu nhưng không giữ thông báo khi các dòng chuyển. Đề xuất giữ lời báo đổi phần trích trong suốt ORDER BY và ảnh tĩnh, để người xem từng bước biết cả hai là phần trích của cùng kết quả 45 dòng. Đây là ngoại lệ được duyệt về đổi mẫu, vấn đề là thông báo không còn ở ảnh tĩnh.

## Phần giữ được

- Source biểu diễn các phép lọc giữ/loại, chiếu cột, tính ô, DISTINCT, sắp thứ tự và TOP; có assertion đối chiếu các giá trị và thứ tự mẫu với dữ liệu bước. Các cảnh bình thường mang kết quả trước sang đầu vào sau; riêng 2.4 đổi phần trích đã được duyệt.
- Xem 34 PNG cảnh đã xuất: bảng có nhãn tổng và trích, không thấy ô đích còn ẩn hoặc bảng bị cắt. 2.5 có mã và email xuống dòng giữa chuỗi trong bảng năm cột, gây khó đọc nhưng vẫn đủ ký tự trên ảnh tĩnh đã xem.
- Đã giải mã GIF cả chín bài và xem mẫu khung trước/giữa/sau; với 2.4, 2.5, 2.7, 2.9 xem thêm mẫu cách 12 frame. Các mẫu cho thấy nguồn nổi, phần dữ liệu chuyển và đích hiện sau; không khẳng định đã soi từng frame hoặc từng thao tác của cả chín ảnh.
- Manifest khai báo nguồn dựng và hash ảnh; `readAnimation` đối chiếu fingerprint và hash ảnh, kiểm bước có ảnh tĩnh. Chín entry point gọi đúng ID và README nêu lệnh dựng tương ứng. Đây là nhận xét từ source, không chứng minh đã tái tạo thành công.

## Giới hạn

Không chạy SQL/API, không kiểm đề/YAML, HTML build, giao diện, bàn phím hoặc màn hẹp; tác giả phụ trách HTML/UI. Không chạy dựng lại vì lệnh ghi đè tài nguyên và tác giả đang xuất; chưa xác minh khả năng recreate trên môi trường sạch, thời lượng đọc thực tế hoặc toàn bộ khung giữa. Tính đúng dữ liệu live không thể suy từ source hay ảnh. Kết quả kiểm ảnh gắn với tài nguyên đang xuất tại thời điểm xem; nếu nguồn/ảnh thay đổi cần kiểm lại phần tương ứng. Không lấy review này làm bằng chứng phát hành hay quyền push.

## Phiên bản source thực sự đọc (SHA-256 raw)

- `scripts/animations/storyboard.mts`: `6D54605B5A6C3867955E62899349BBC1ABC5386C7C2CC519E6BE1F2A074CA960`
- `scripts/animations/render-flow.mts`: `C83F984431B14D933B8B6518D46AEF75F99B047D6781E9C2184687C4E8A90C80`
- `scripts/animations/select.css`: `B9B017ADC2BEB9FCEB38A1FE7ED29AB3FBB322CCD7BABED58AB135674DFF0DCC`
- `scripts/animations/README.md`: `E708753DC368F04ECAF36AD185E73C5D63492F2D588CCB8E945309435CF026B4`
- `tests/animated-flow.test.ts`: `770894908EAE5B4907526D12FB6EF4C6CEC7F0809E0D485623F8DDAAFA0DA1A7`
- `src/lib/animation-assets.ts`: `FE2E809B46598C8E02C3A4FE84CEE7F6EC964021C776C220D3C059C324B80EA2`
- `scripts/animations/render-select.mts`: `9159A315BBB556D86C2803FCBE043E5E5250E48C0921FD092FBA1FD6AABB8A44`
- `scripts/animations/render-where.mts`: `1A3AF65E52720E5341F8914AA6A38F4B2978BBCCDF15E0F6B22FA33B76C7084F`
- `scripts/animations/render-conditions.mts`: `DEAAB6A8CC457E293A3E6B565414FB9297E356DC72446EC6CF83FE33303EF140`
- `scripts/animations/render-order-top.mts`: `55B5FD9E135F3880A3CD4BF6EE7537FB59494995D967AB8E7ED25BF6E723F4CE`
- `scripts/animations/render-null.mts`: `C48700A80E5B115D3263F636F3F46BC75F5385FDB5F7C7EF2924C7037F800EC6`
- `scripts/animations/render-distinct.mts`: `948A2CC19DA75E29CDCBE3624251263CBFA1A5CBC2814FECC9EA1F71E292DA0A`
- `scripts/animations/render-strings.mts`: `30AF8D9130C1CF25B8B62F173367030EDF9764EF843CDD96ECD582537AC8EECC`
- `scripts/animations/render-dates.mts`: `6E9ED9A7A5EB604D5B9CBB667E3531A24D407AAEDC661455C0322863C182300C`
- `scripts/animations/render-case.mts`: `53D6A9B818AF7FFA9E1EB2BBD2142AF61388294BEF1B8DB4C58CEE9A7DE4C8BD`

Ba file dựng chung đã thay đổi sau khi tôi đọc; hash trên là lần đo trước thay đổi, không đại diện bản sửa mới. Manifest 2.4 đã đọc có SHA-256 `ABD9A67E08E812BA0BFB65A72627FA26A4C1CB709BB38A90200937F258C41B13`; hash ảnh do manifest ghi: GIF `e40cd290862ca73c70929aef7ccba815ef0d08faa2496ab1622b842f8393a271`, order.png `d0741a6fa00e9975691fea1ecd1722f29a3e640eea3d5edf0815ae141e8f61ed`, select.png `29d468269ef7947c2155e2243aa77c60f70ff3a85d6accd788a90ce2fa86dc7a`. Không đo độc lập hash từng ảnh ngay lúc xem; các manifest khác cũng không đủ căn cứ gắn chắc với lần xem khi có xuất đồng thời.

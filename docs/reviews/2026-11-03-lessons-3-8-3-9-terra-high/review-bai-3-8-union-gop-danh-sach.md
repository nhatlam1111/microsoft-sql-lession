# Review độc lập bài 3.8 — UNION: gộp hai danh sách

## Phạm vi, phiên bản và công cụ

Cấu hình được giao: `gpt-6.1-terra`, effort `high`, ngữ cảnh mới; công cụ trong phiên review không tự xác nhận runtime model/effort. Review theo gói, đọc MDX, YAML, HTML snapshot, quy ước, template, hồ sơ công ty, mẫu 2.1, các bài trước được giao và quyết định triển khai/spec, công việc và review focus của plan. Không đọc nhận xét cũ. Source mô tả HEAD `63f8f5c` cùng MDX chưa commit; SHA-256 thực tế khớp manifest: MDX `76ed1632664d339ef7c8cadf3f2a0294cf7ffc86aae66decefe0442d7bde6628`, YAML `62581e2ac93d26b50592b51ef6dc80e729632aad3e15cd5c113c7845c67818f6`, HTML snapshot `865e39351a0c11aa66b364da36dbe9b4a519945d061a8e428b59c90c3f492b6f`. Đọc HTML bằng Python HTMLParser, không mở browser.

**Giới hạn quy trình:** thao tác lọc YAML đầu tiên chỉ loại dòng khóa `answer`, nhưng không loại nội dung SQL nhiều dòng phía dưới; cả ba đáp án vì vậy đã xuất hiện cùng đề trước khi có thể khóa đánh giá độc lập. Bảng tiền đề dưới đây dựa vào nội dung đề và bài giảng, nhưng không thể khẳng định đã thử từng đề hoàn toàn mù đáp án. Không dùng đáp án làm nơi dạy kiến thức.

## Rà theo thứ tự bài

- **Tình huống và phần chính — Giữ được.** Yêu cầu một mã một dòng, khoảng ngày nửa mở và giới hạn mốc giờ được nói rõ. Vì sao không kết luận đi muộn? Bài nói chưa xét ca và lý do. Vì sao cần UNION? Hình dán chồng có mã xuất hiện ở cả hai nguồn, câu SQL và LineMap chỉ ra cần bỏ trùng cả trong nhánh. Hai nhánh tự lọc và cột vị trí tương ứng được nêu; ALL giữ số lần xuất hiện, nhãn nguồn làm thay đổi đơn vị trùng. Những câu này trả lời vì sao kết quả 1 cột, số lần xuất hiện và cặp mã–nguồn khác nhau, không cần thêm ví dụ ngoài tình huống.
- **Tự kiểm tra câu 3 — Cần làm rõ.** Trích đáp án “dùng tên cột từ nhánh đầu”; phần chính chỉ nói “tên cột chung lấy từ nhánh đầu” và ví dụ `ORDER BY MaNV` dùng cùng tên ở cả hai nhánh. Người mới chưa được chỉ rõ quy tắc dùng tên kết quả chung khi viết `ORDER BY`, nhất là khi nhánh sau có tên khác; đáp án ôn đưa quy tắc cụ thể hơn lời giảng. Thêm một vế ngắn cạnh câu tên cột chung: `ORDER BY` cuối dùng tên cột kết quả từ nhánh đầu. Đề 3 có `Nguon` được đặt tại nhánh đầu nên vẫn có thể suy ra cách làm; đây là khoảng cần làm rõ, không khẳng định đề không giải được.
- **RunFlow và kết quả — Giữ được qua kiểm nguồn.** Hai thẻ đầu là các nhánh độc lập; `focus` khớp chuỗi query, cả hai đều có nguồn riêng và trả một cột. Hai đầu vào đều có `NV005` trong năm dòng đầu, đủ thấy một mã trùng khi gộp; bước UNION và ORDER BY giữ lần lượt 41 dòng một cột. Bảng kết quả ghi rõ trích 10 trên 41, câu trả lời ngay sau và giữ giới hạn nghiệp vụ. Thẻ tóm tắt SELECT không hiển thị điều kiện lọc trên các bảng đầu vào; cách tóm tắt này được template cho phép và lời dẫn nêu rõ mỗi nhánh đã lọc. Không suy số tổng từ bản trích. Số liệu và kết quả từng SQL chưa chạy xác minh độc lập.
- **Hay nhầm, Ứng dụng, Ghi nhớ — Giữ được.** Các lỗi phân biệt thứ tự cột, mức trùng và dữ liệu nguồn; ứng dụng gắn trực tiếp vào việc gộp, giữ dòng, đối chiếu nguồn. Có nhắc lại ý ở phần lỗi và ghi nhớ nhưng phục vụ cảnh báo/ôn, chưa thấy cần cắt một câu cụ thể.
- **Tự kiểm tra và bài tập — Giữ được ngoài điểm cần làm rõ trên.** Ba câu phủ giữ/bỏ trùng, toàn bộ cột và cấu trúc/sắp xếp; vị trí sau Ghi nhớ, trước Bài tập. Lời dẫn bài tập yêu cầu chốt đơn vị một dòng, thích hợp với sự khác biệt của ba đề.
- **Render HTML — Giữ được trong phạm vi đọc tĩnh.** SQL chính và query trong HTML giữ nháy thẳng và tab thực; source dùng `\t`, các focus tương ứng khớp query. Nội dung `pre` và `summary` đã trích không lộ backtick. Không thể từ HTML tĩnh kết luận độ rộng tab thực tế, thao tác sao chép, focus/drawer khi bấm, bàn phím hay SSMS.

## Tiền đề từng bài tập

| Đề | Cần kiến thức | Đã dạy ở đâu | Thiếu hoặc khó tìm |
|---|---|---|---|
| 3.8-1 | Lọc từng kỳ trên `BangLuong`, chọn `MaNV`, chồng hai nhánh và bỏ mọi dòng trùng, sắp tăng dần | 2.1 SELECT/FROM; 2.3 điều kiện; 2.4 ORDER BY; 3.8 nhánh và UNION | Không thấy thiếu tiền đề; cùng một bảng có thể làm nguồn hai nhánh theo nguyên tắc mỗi nhánh tự chọn nguồn. |
| 3.8-2 | Như đề 1 nhưng giữ mọi lần xuất hiện bằng UNION ALL, một cột và sắp mã | 3.8 giải ALL giữ dòng trong và giữa nhánh; 2.4 sắp xếp | Không thấy thiếu tiền đề. “Hai dòng” cho mã ở hai kỳ phù hợp yêu cầu giữ mọi lần xuất hiện; số dòng thực tế của dữ liệu chưa xác minh. |
| 3.8-3 | Hai nguồn, phạm vi ngày và giờ khác nhau, chuỗi Unicode, nhãn hằng/alias, UNION theo cả cặp, sắp hai cột | 2.1 giá trị chuỗi và AS; 2.3 AND; 2.4 thứ tự nhiều cột; 3.8 nêu cụ thể hai nhãn, vị trí, tên cột chung và ví dụ cặp | Quy tắc `ORDER BY` theo tên cột chung có thể suy từ tên nhánh đầu, nhưng chỉ được phát biểu tường minh trong đáp án tự kiểm tra; xem finding trên. Không dùng answer YAML để bổ sung lời giảng. |

## Ưu tiên và kết luận

Ưu tiên thấp: bổ sung vế về tên cột chung trong `ORDER BY` trước tự kiểm tra. Với kiến thức bài hiện tại và bài trước, không thấy một tiền đề bị thiếu hoàn toàn khiến ba đề không có đường làm; riêng điểm tên cột sắp xếp nên nói rõ hơn. Kết luận này có giới hạn do thao tác đọc YAML đã làm lộ answer trước khi khóa đánh giá.

## Nguồn và giới hạn kiểm

Nguồn chính: `src/content/lessons/3-8-union-gop-danh-sach.mdx`, `src/content/exercises/3-8-union-gop-danh-sach.yaml`, snapshot `temp/verification/2026-11-03-lessons-3-8-3-9/3-8-union-gop-danh-sach-review.html` và manifest cùng thư mục; `docs/quy-uoc.md`, `docs/lesson-template.md`, `docs/ho-so-cong-ty.md`, bài 2.1, 2.3–2.6, 3.1, 3.4–3.5, spec/plan được giao. Không kết nối database/API/runner, không đọc seed/secret, không chạy SQL hay nộp bài; không dùng tài liệu SQL ngoài khóa học. Không xác minh live số liệu, hành vi SQL, copy/paste, drawer runtime, UI viewport, bàn phím hoặc SSMS. Lỗi Python thiếu `bs4` và lỗi mã hóa console được khắc phục bằng HTMLParser chuẩn và UTF-8; đây là giới hạn thao tác đọc, không phải lỗi sản phẩm.

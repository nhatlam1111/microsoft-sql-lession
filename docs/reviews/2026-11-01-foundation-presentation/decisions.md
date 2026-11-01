# Quyết định sau review

Nguồn nhận xét giữ nguyên: [content-review.md](content-review.md), [integration-review.md](integration-review.md). Review dùng agent ngữ cảnh mới, kế thừa model của phiên. Không dùng kết luận review làm quyền đăng web.

| Nhận xét | Quyết định và căn cứ | Kết quả |
|---|---|---|
| Review nội dung: 20 slide giữ được, bốn câu hỏi đủ tiền đề cho người đã học 1.1–1.5 | **Làm theo**, giữ phạm vi buổi ôn. Câu 4/11 dựa vào bài nguồn, không coi đáp án là lời giảng bù. | Không thêm lý thuyết nhập môn hoặc bài thực hành SQL. Nguồn và thời lượng hiện ở mỗi slide/ghi chú. |
| INT-01 P3: Follow vẫn enabled khi channel không dùng được | **Làm theo.** Nút phải phản ánh đúng khả năng đồng bộ. | `disabled = following || !channel`, có title giải thích. Reviewer tái kiểm mock cả API thiếu và constructor lỗi; browser fixture sau build xác nhận nút disabled và vẫn tự đi sang slide 2 được. |
| Reload sau Tự xem sẽ xin theo lại | **Không đổi**, đây là chủ đích: URL có run tham gia lại phiên, đúng yêu cầu tải lại xin full snapshot. | Vị trí cục bộ có trong URL để khôi phục trước khi nhận snapshot. Muốn đọc độc lập dùng link chia sẻ không mang run. Đã thử reload hai cửa sổ, mở muộn, theo lại cùng revision. |
| Gate nguồn của từng Slide cho bộ tương lai | **Làm một phần**, tăng kiểm build trong phạm vi khung dùng lại. | `Slide` từ chối bài nguồn không tồn tại; `presentationOutline(..., sourceLessons)` từ chối nguồn ngoài metadata, có regression assertion. Bộ hiện tại có test đối chiếu đủ 20 cặp Slide/PresenterNotes, cả nguồn và phút. Quy ước authoring ghi hai thuộc tính phải khớp; chưa thêm parser toàn bộ MDX cho mọi mẫu ghi chú tương lai. |
| Audience chưa có H1, AT chưa kiểm | **Làm theo** phần cấu trúc: đổi nhãn tên deck trên header thành H1, giữ cỡ chữ và tiêu đề H2 từng slide. | Build và browser cuối có một H1 trang chiếu. Không nhận thành đã thử screen reader. |
| Một người giảng mỗi run, không đồng bộ nhiều máy | **Giữ giới hạn đã duyệt.** Không thêm leader election/server. | Hai run khác nhau không tác động nhau trong browser. Đóng người giảng vẫn giữ slide và tự điều hướng được. |
| Visual/print/zoom/forced colors chưa có evidence của reviewer | **Ghi đúng ranh giới.** Root đã kiểm browser riêng; không cần đầu ra print/PPTX của lượt này. | Xem verification.md. Chưa thử máy chiếu vật lý, AT, print, zoom 200% hoặc forced colors. Các phần này không được báo đạt. |
| Audit strict báo SqlEditor thiếu resize-none | **Không sửa ngoài phạm vi.** Đây là false positive đã có: `.ed-input` được định nghĩa `resize: none` trong `src/styles/exercise.css:27`; auditor chỉ nhìn markup. | Giữ nguyên JSON lỗi audit, không nới rule hoặc sửa editor cho đẹp báo cáo. Không có finding audit mới trong phần slide. |

Tự rà bổ sung: rút câu dẫn slide 19 và giảm khoảng cách khối đáp án, giữ nguyên cỡ chữ để 24 trạng thái không cuộn trong canvas. Thêm khoảng cách sau bảng của slide 5. Không sửa dữ kiện hay bài đầy đủ 1.1–1.5.

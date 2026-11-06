# Kế hoạch sắp xếp lại menu khóa học

Thiết kế tại [Sắp xếp lại menu khóa học](../specs/2026-11-06-course-menu-design.md).

- [x] Sửa danh mục, số bài, tiền đề, tham chiếu và nội dung trang Giới thiệu. Dùng chung danh mục hiện có cho sidebar, lộ trình, mindmap và tìm kiếm.
- [x] Gỡ hai bài đã chọn và đặt đề cương ở 3.19, 4.10. Giữ nguyên SQL và đề bài tập chuyển vị trí.
- [x] Thêm chuyển hướng và kiểm tiến độ v1/v2, bản nháp cùng mã bài tập ổn định. Sau review tích hợp, dùng kho tiến độ chung để cập nhật trạng thái ở danh sách bài tập.
- [x] Kiểm test, build, HTML, sidebar và lộ trình trong Chrome. Ghi kết quả và xử lý nhận xét review tại [hồ sơ lượt sửa](../../reviews/2026-11-06-course-menu/verification.md).
- [x] Khai báo nhóm Cấp cứu dữ liệu từ 5.4 trong `src/data/curriculum.ts`. Dùng `groupLevelLessons` ở `src/lib/catalog.ts` để SidebarNav và RoadmapPopup hiển thị hai danh sách. Test catalog, test sidebar và Chrome ở 1280 × 900 và 390 × 844 xác nhận thứ tự 5.4–5.8, tổng 8 bài và 5 trạm đúng tâm.

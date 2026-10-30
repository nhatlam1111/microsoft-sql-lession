---
name: teach
description: Stateful, personalized tutor skill distilled from Matt Pocock's /teach and supercharged with Adaptive Cognitive Mentorship, First-Principles, Zone of Proximal Development (ZPD), and Native Interactive UI.
---

# 🎓 Teach Skill: Autonomous Stateful Tutor (`teach`)

## 1. Triết lý Cốt lõi (Distilled from Matt Pocock's /teach)
* **Học tập là một Dự án Dài hạn (Stateful Workspace):** Không dựa vào bộ nhớ tạm thời của LLM (parametric memory vốn dễ quên hoặc hallucinate). Mọi tiến trình học tập được lưu trữ trực tiếp trên đĩa thông qua các file chuẩn hóa.
* **Vùng phát triển gần nhất (Zone of Proximal Development - ZPD):** Mỗi bài học được thiết kế vừa vặn để đẩy người học vượt nhẹ ngưỡng hiện tại, không gây chán nản vì quá dễ, không gây tê liệt vì quá khó.
* **Tài liệu độc lập, vĩnh viễn (Self-contained HTML Lessons):** Mỗi bài học được lưu thành một file HTML độc lập trong thư mục `lessons/` để người học lưu trữ và xem lại trọn đời.

---

## 2. Cấu trúc Thư mục Chuẩn (Stateful Workspace Layout)
Khi kích hoạt `/teach [topic]`, kỹ năng này tự động thiết lập:
```text
learning-workspace/
├── MISSION.md             # Mục tiêu, phạm vi, lý do học, target level (Principal/Master)
├── RESOURCES.md           # Bảng tài liệu gốc Tier 1 kèm Credibility Score (0-100)
├── LEARNER_PROFILE.json   # Chỉ số tải nhận thức, Spaced Repetition, nhịp độ học
├── HIDDEN_CASE_VAULT.json # Ngân hàng bẫy lỗi thực chiến đã gặp
├── learning-records/      # Nhật ký học tập (ADRs for Learning)
│   └── LR-001-insight.md
└── lessons/               # Các bài học HTML tương tác độc lập
    └── 01-core-concept.html
```

---

## 3. Quy trình Vận hành 5 Bước (The 5-Step Teaching Loop)

### Bước 1: Khởi tạo Mission & Săn lùng Tài liệu Gốc
* Tạo `MISSION.md` xác định rõ: Target Role (Principal/Master), Scope Boundary (Học cái gì và KHÔNG học cái gì để tránh lan man).
* Kích hoạt `source-verifier`: Tìm kiếm tài liệu gốc (Tier 1), chấm điểm độ tin cậy và lưu vào `RESOURCES.md`.

### Bước 2: Thiết kế Bài học Ngắn gọn (Bite-sized HTML Lesson)
* Tạo file HTML trong `lessons/` dựa trên nguyên lý First-Principles (Bản chất tầng thấp ➔ Cú pháp ➔ So sánh Junior vs Principal).
* Nhúng bài học trực tiếp vào chat bằng `<agent-embed src="file:///..."></agent-embed>`.

### Bước 3: Đưa ra Thử thách Bẫy Ẩn (Hidden Case Challenge)
* Không hỏi lý thuyết suông. Luôn đưa ra tình huống thực tế chứa **bẫy ngầm (Edge Case / Race Condition / Silent Failures)**.
* Sử dụng tool `ask_question` để tạo nút bấm tùy chọn hướng giải quyết.

### Bước 4: Đối thoại Socratic & Phản biện Kiến trúc
* Khi người dùng trả lời, phân tích ưu/nhược điểm, độ phức tạp Time/Space, và chỉ ra tác động ngầm.
* Ghi lại sai sót vào `HIDDEN_CASE_VAULT.json`.

### Bước 5: Cập nhật Trạng thái & Ghi nhật ký (Learning Record)
* Tạo một bản ghi trong `learning-records/` tóm tắt: Điểm cốt lõi đã ngộ ra, bẫy cần tránh, thời gian ôn tập kế tiếp theo đường cong Ebbinghaus.

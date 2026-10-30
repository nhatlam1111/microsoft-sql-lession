---
name: cognitive-pacer
description: Adaptive Cognitive Load Balancer & Spaced Repetition Engine for teach-skills. Analyzes user response latency, error streaks, prevents cognitive overload via Micro-learning, and implements Ebbinghaus retention curves.
---

# 🧠 Cognitive Pacer Skill (`cognitive-pacer`)

## 1. Mục tiêu
Giải quyết triệt để vấn đề "học trước quên sau" và "quá tải nhận thức" (Cognitive Overload). Kỹ năng này theo dõi nhịp độ sinh lý và phản xạ học tập của người dùng để điều tiết lượng kiến thức đưa vào trong mỗi phiên học.

---

## 2. Ma trận Phát hiện Quá tải Nhận thức (Cognitive Overload Detection)

| Dấu hiệu quan sát | Trạng thái suy luận | Hành động điều chỉnh của Agent |
| :--- | :--- | :--- |
| **Phản hồi nhanh (< 20s), trả lời đúng điểm cốt lõi** | Nhận thức thông suốt, hứng khởi | Nâng độ khó: Đưa thêm Hidden Cases kiến trúc sâu hoặc tăng tốc sang chủ đề mới. |
| **Độ trễ tăng cao (> 60s), câu trả lời ngập ngừng/ngắn** | Có dấu hiệu mệt mỏi hoặc khái niệm trừu tượng quá cao | **Giảm tải (Micro-learning Mode):** Tạm dừng nạp kiến thức mới, dùng ẩn dụ trực quan, chuyển sang dạng trắc nghiệm 2 nút bấm dễ tiếp thu. |
| **Sai liên tiếp 2 lần cùng một bản chất** | Khái niệm nền tảng bị hổng | Quay lại tầng First-Principles (giải thích từ tầng RAM/OS/vật lý) thay vì chỉ nói về cú pháp. |

---

## 3. Lịch Trình Ôn Tập Cách Quãng (Spaced Repetition Schedule)
Dựa trên thuật toán SuperMemo SM-2 rút gọn và đường cong quên lãng Ebbinghaus:
* **Lần 1 (1 ngày sau):** Kiểm tra phản xạ nhận diện bẫy lỗi.
* **Lần 2 (3 ngày sau):** Yêu cầu viết code thực hành giải quyết bẫy.
* **Lần 3 (7 ngày sau):** Đưa bẫy ẩn vào một bài toán kiến trúc tổng hợp.
* **Lần 4 (21 ngày sau):** Đạt trạng thái Master (Long-term Memory Retention).

---

## 4. Quản lý Hồ sơ `LEARNER_PROFILE.json`
Mỗi phiên học được cập nhật các chỉ số thực tế:
```json
{
  "cognitiveMetrics": {
    "averageResponseLatencySeconds": 24.5,
    "consecutiveErrorsCount": 0,
    "isCognitiveOverloaded": false,
    "recommendedPacing": "BALANCED"
  }
}
```

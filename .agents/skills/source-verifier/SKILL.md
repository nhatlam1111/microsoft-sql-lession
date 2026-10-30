---
name: source-verifier
description: Dynamic Source Verification & Credibility Scoring engine for teach-skills. Evaluates technical sources across 4 tiers (0-100), filters out hallucinated or low-quality tutorials, and maintains RESOURCES.md.
---

# 🛡️ Source Verifier Skill (`source-verifier`)

## 1. Mục tiêu
Đảm bảo 100% kiến thức truyền đạt cho người học bắt nguồn từ các tài liệu chuẩn mực nhất thế giới, triệt tiêu hoàn toàn rủi ro ảo giác (hallucination) từ dữ liệu huấn luyện cũ của mô hình.

---

## 2. Thang đo Phân tầng Độ tin cậy (Tiered Credibility Matrix)

| Phân tầng (Tier) | Thang điểm | Định nghĩa nguồn hợp lệ | Ví dụ điển hình |
| :--- | :---: | :--- | :--- |
| **Tier 1: Canonical** | **90 - 100** | Đặc tả chính thức (Language Specs), RFCs, JEPs, PEPs, MDN Docs, First-party Docs, Peer-reviewed Journals. | `kotlinlang.org`, `python.org`, `ietf.org`, `w3.org`, `nature.com` |
| **Tier 2: High-Authority** | **75 - 89** | Engineering Blogs từ các Big Tech (Google, Netflix, Uber, Meta), Sách giáo khoa kinh điển, Tài liệu Đại học top đầu. | `netflixtechblog.com`, Effective Java, CS50 |
| **Tier 3: Standard** | **50 - 74** | Bài viết cá nhân của các tác giả uy tín, tutorial từ các nền tảng lập trình phổ biến. | Medium tech publications, Baeldung, LogRocket |
| **Tier 4: Untrusted** | **< 50** | Diễn đàn chưa qua kiểm duyệt, blog copy, câu view, wiki mở. | **BỊ CHẶN - KHÔNG SỬ DỤNG** |

---

## 3. Cấu trúc Quản lý `RESOURCES.md`
Kỹ năng này tự động tạo và cập nhật file `RESOURCES.md`:
```markdown
# 📚 CANONICAL RESOURCES & PRIMARY SOURCES

| Chủ đề | Nguồn tài liệu | Phân tầng | Điểm tin cậy | Ngày xác thực | Ghi chú kiến trúc |
| :--- | :--- | :---: | :---: | :---: | :--- |
| Data Class Copy | [Kotlin Language Spec](https://kotlinlang.org/docs/data-classes.html) | Tier 1 | 99/100 | 2026-10 | Shallow copy trên heap |
| Memory Management | [JVM Spec SE 21](https://docs.oracle.com/javase/specs/) | Tier 1 | 100/100 | 2026-10 | Garbage Collection & Escape Analysis |
```

---

## 4. Quy tắc Bắt buộc: Gắn Thẻ Minh Bạch (Credibility Badge)
Mỗi khi trích dẫn một giải pháp hoặc bài học, **BẮT BUỘC** in badge:
```markdown
> 🛡️ **Độ tin cậy nguồn dữ liệu:** `[Điểm]/100` (`[Tier 1/2/3]` - [Tên nguồn](URL)) | *Xác thực: [Tháng/Năm]*
```

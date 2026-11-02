import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { presentationOutline } from '../src/lib/presentation-outline';
import { BANNED_PHRASES } from '../src/lib/lesson-schema';
import { proseParagraphs } from './helpers/lessons';

const raw = readFileSync('src/content/presentations/lam-quen.mdx', 'utf8');
const metadata = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)![1]);
const outline = presentationOutline(raw);
const slides = [...raw.matchAll(/<Slide\b[^>]*>([\s\S]*?)<\/Slide>/g)].map(match => match[1]);
const withoutNotes = (text: string) => text.replace(/<PresenterNotes\b[^>]*>[\s\S]*?<\/PresenterNotes>/g, '');

describe('concept-led foundation lecture', () => {
  it('keeps 21 concept slides with visible explanations and no quiz prerequisite', () => {
    expect(slides).toHaveLength(21);
    expect(metadata.sourceLessons).toEqual(['1.1', '1.2', '1.4', '1.5']);
    expect(outline.reduce((sum, slide) => sum + slide.minutes, 0)).toBe(48);
    expect(metadata.minutes).toBe(55);
    expect(withoutNotes(slides[0])).toMatch(/48 phút giảng.*7 phút hỏi đáp/);
    expect(raw).not.toContain('data-answer');
    for (const slide of slides) { expect(withoutNotes(slide)).toMatch(/<(Image|ConceptFigure|ProjectionTable|ProjectionRelation|figure)\b/); expect(withoutNotes(slide)).toContain('<p'); }
    for (const slide of slides) {
      expect(slide).not.toMatch(/<(Sql|Result|Messages|Exercises|RunFlow|Chat)\b/);
    }
  });

  it('gives every slide separate presenter explanations, misconceptions, timing and a valid source', () => {
    for (const [index, slide] of slides.entries()) {
      const notes = slide.match(/<PresenterNotes source="([^"]+)" minutes=\{(\d+)\}>([\s\S]*?)<\/PresenterNotes>/);
      expect(notes, outline[index].id).not.toBeNull();
      expect(notes![1]).toBe(outline[index].source);
      expect(Number(notes![2])).toBe(outline[index].minutes);
      expect(metadata.sourceLessons).toContain(notes![1]);
      for (const explanation of ['Ý cần nói', 'Hay hiểu nhầm', 'Giải thích']) {
        expect(notes![3], `${outline[index].id}: ${explanation}`).toContain(explanation);
      }
    }
  });

  it('explains optional constraints and marks hypothetical examples', () => {
    const visible = (id: string) => withoutNotes(slides[outline.findIndex(s => s.id === id)] ?? '');
    expect(visible('sql-la-gi')).toContain('truy vấn');
    expect(visible('sql-la-gi')).toContain('SELECT HoTen FROM NhanVien;');
    expect(visible('khoa-chinh')).toContain('khai báo');
    expect(visible('khoa-chinh')).toContain('NULL');
    expect(visible('khoa-chinh')).toMatch(/cột.*MaNV.*của bảng.*NhanVien/);
    expect(visible('bang-khong-co-khoa-chinh')).toMatch(/vẫn.*(lưu|đọc)/);
    expect(visible('bang-khong-co-khoa-chinh')).toContain('luật khác');
    expect(visible('bang-khong-co-khoa-chinh')).toContain('giả định');
    expect(visible('khoa-ngoai')).toContain('NULL');
    expect(visible('khoa-ngoai')).toContain('đang bật');
    expect(visible('khoa-ngoai')).toMatch(/nhận.*NULL.*thiết kế cột/);
    expect(visible('khoa-ngoai')).toMatch(/MaPB.*không nhận.*NULL/);
    expect(visible('bang-khong-co-khoa-ngoai')).toContain('giả định');
    expect(visible('bang-khong-co-khoa-ngoai')).toContain('luật kiểm khác');
    expect(visible('bang-khong-co-khoa-ngoai')).toContain('vẫn có thể kết bảng');
    expect(visible('ky-hieu-erd')).toContain('mỗi hồ sơ có một phòng');
    expect(visible('ky-hieu-erd')).toContain('chưa có người');
    const last = visible('hop-dong-kem-ten-phong');
    for (const value of ['HopDong','NhanVien','PhongBan','MaNV','MaPB','hợp đồng','hiện lưu']) expect(last).toContain(value);
    expect(last).not.toContain('showLinks={false}');
  });

  it('preserves concise prose and course terminology', () => {
    expect(proseParagraphs(raw).filter(paragraph => paragraph.words > 120)).toEqual([]);
    for (const phrase of BANNED_PHRASES) expect(raw.toLowerCase()).not.toContain(phrase);
    expect(raw).not.toMatch(/[😀-🙏]/u);
  });

  it('shows the mandatory contract reference condition to the audience, not only in notes', () => {
    const relationship = withoutNotes(slides[outline.findIndex(slide => slide.id === 'ky-hieu-erd')]);
    expect(relationship).toMatch(/HopDong\.MaNV[\s\S]*không nhận[\s\S]*NULL/);
    expect(relationship).toContain('đang bật');
    expect(relationship).toMatch(/một hồ sơ có thể[\s\S]*nhiều hợp đồng/);
  });
});

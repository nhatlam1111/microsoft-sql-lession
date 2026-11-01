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
const prompt = (text: string) => withoutNotes(text).replace(/<details\s+data-answer>[\s\S]*?<\/details>/g, '');

describe('foundation recap teaching contract', () => {
  it('keeps the agreed scope, 48-minute teaching rhythm and four class questions', () => {
    expect(slides).toHaveLength(20);
    expect(metadata.sourceLessons).toEqual(['1.1', '1.2', '1.3', '1.4', '1.5']);
    expect(outline.reduce((sum, slide) => sum + slide.minutes, 0)).toBe(48);
    expect(metadata.minutes).toBe(55);
    expect(slides.flatMap((slide, i) => slide.includes('<details data-answer>') ? [i + 1] : [])).toEqual([4, 11, 14, 19]);
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

  it('keeps material qualifications visible rather than only in presenter notes', () => {
    expect(withoutNotes(slides[7])).toContain('chưa đặt Data Validation');
    expect(withoutNotes(slides[8])).toContain('Mô phỏng Object Explorer');
    expect(withoutNotes(slides[9])).toContain('us_english');
    expect(withoutNotes(slides[9])).toContain('DATEFORMAT mdy');
    expect(withoutNotes(slides[11])).toMatch(/được khai báo.*khóa chính/);
    expect(withoutNotes(slides[12])).toContain('MaPB không nhận NULL');
    expect(withoutNotes(slides[14])).toContain('Không nói phòng nào cũng phải có người');
    expect(withoutNotes(slides[17])).toContain('(KyLuong, MaNV)');
    expect(withoutNotes(slides[17])).toContain('không phải phòng tại kỳ lương');
  });

  it('shows each question and required inputs before the answer is revealed', () => {
    const closing = prompt(slides[3]);
    expect(closing).toContain('đóng SSMS');
    expect(closing).toContain('sửa tên trong file');
    expect(closing).toContain('máy chủ');
    const id = prompt(slides[10]);
    expect(id).toContain('varchar(12)');
    expect(id).toContain('chỉ gồm chữ số');
    const wrongRoom = prompt(slides[13]);
    expect(wrongRoom).toContain('KT');
    expect(wrongRoom).toContain('KD');
    expect(wrongRoom).toContain('Cả hai mã đều có trong danh mục');
    const path = prompt(slides[18]);
    for (const name of ['HopDong', 'NhanVien', 'PhongBan', 'MaNV', 'MaPB', 'TenPB']) expect(path).toContain(name);
    expect(path).toContain('showLinks={false}');
    expect(path).toContain('ý nghĩa của mỗi dòng');
  });

  it('preserves concise prose and course terminology', () => {
    expect(proseParagraphs(raw).filter(paragraph => paragraph.words > 120)).toEqual([]);
    for (const phrase of BANNED_PHRASES) expect(raw.toLowerCase()).not.toContain(phrase);
    expect(raw).not.toMatch(/[😀-🙏]/u);
  });
});

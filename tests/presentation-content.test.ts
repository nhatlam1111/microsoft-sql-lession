import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { presentationOutline } from '../src/lib/presentation-outline';
import { BANNED_PHRASES } from '../src/lib/lesson-schema';
import { proseParagraphs } from './helpers/lessons';
import { presentationFromUrl, presentationStateUrl } from '../src/lib/presentation-state';

const raw = readFileSync('src/content/presentations/lam-quen.mdx', 'utf8');
const metadata = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)![1]);
const outline = presentationOutline(raw);
const slides = [...raw.matchAll(/<Slide\b[^>]*>([\s\S]*?)<\/Slide>/g)].map(match => match[1]);
const withoutNotes = (text: string) => text.replace(/<PresenterNotes\b[^>]*>[\s\S]*?<\/PresenterNotes>/g, '');

describe('concept-led foundation lecture', () => {
  it('covers all five revised lessons in 25 visible concept slides and one hour', () => {
    expect(slides).toHaveLength(25);
    expect(metadata.sourceLessons).toEqual(['1.1', '1.2', '1.3', '1.4', '1.5']);
    expect(outline.reduce((sum, slide) => sum + slide.minutes, 0)).toBe(50);
    expect(metadata.minutes).toBe(60);
    expect(withoutNotes(slides[0])).toMatch(/50 phút giảng.*10 phút hỏi đáp/);
    expect(raw).not.toContain('data-answer');
    for (const slide of slides) {
      const visible = withoutNotes(slide);
      expect(visible).toMatch(/<(Image|PubsFigure|ProjectionTable|figure)\b/);
      expect(visible.match(/<p(?:\s|>)/g)?.length).toBeGreaterThanOrEqual(2);
      expect(visible.match(/<p(?:\s|>)/g)?.length).toBeLessThanOrEqual(3);
    }
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

  it('keeps type, NULL and constraint conditions visible to the audience', () => {
    const visible = (id: string) => withoutNotes(slides[outline.findIndex(s => s.id === id)] ?? '');
    for (const value of ['SQL', 'T-SQL', 'SSMS']) expect(visible('bon-ten-can-phan-biet')).toContain(value);
    for (const value of ['Express', 'Standard Developer', 'Enterprise Developer', 'Azure SQL Database']) expect(visible('edition-va-azure-sql')).toContain(value);
    for (const value of ['int', 'bit']) expect(visible('kieu-du-lieu-cua-cot')).toContain(value);
    for (const value of ['decimal(4,1)', 'float', 'ba chữ số phần nguyên', 'một chữ số phần lẻ']) expect(visible('decimal-va-float')).toContain(value);
    for (const value of ['varchar', 'nvarchar', 'byte', 'Unicode', "N'Trần Thị Mai'"]) expect(visible('varchar-va-nvarchar')).toContain(value);
    for (const value of ['date', 'time', 'datetime2', 'múi giờ']) expect(visible('ngay-va-gio')).toContain(value);
    expect(visible('chuyen-kieu-du-lieu')).toContain('chuyển kiểu ngầm');
    expect(visible('chuyen-kieu-du-lieu')).toMatch(/chưa chắc.*đúng ý/);
    expect(visible('chuyen-kieu-du-lieu')).toContain('Cấu hình đọc tháng trước ngày');
    for (const value of ['NULL', 'NOT NULL', 'chuỗi rỗng', '0']) expect(visible('null-va-not-null')).toContain(value);
    // MDX turns bare quotes in <code> into curly quotes, which hides the empty-string point; keep them as JSX strings.
    for (const value of [`{"''"}`, `{"'NULL'"}`]) expect(visible('null-va-not-null')).toContain(value);
    expect(visible('khoa-chinh')).toContain('khai báo');
    expect(visible('khoa-chinh')).toContain('NULL');
    expect(visible('khoa-chinh')).toMatch(/vẫn.*(lưu|đọc)/);
    expect(visible('khoa-chinh')).toContain('luật khác');
    expect(visible('khoa-chinh')).toContain('giả định');
    for (const value of ['KyLuong', 'MaNV', 'UNIQUE', 'NOT NULL']) expect(visible('khoa-ghep-va-unique')).toContain(value);
    expect(visible('khoa-ngoai')).toContain('NULL');
    expect(visible('khoa-ngoai')).toContain('đang bật');
    expect(visible('khoa-ngoai')).toMatch(/MaPB.*không nhận.*NULL/);
    expect(visible('khoa-ngoai')).toContain('vẫn có thể kết bảng');
    expect(visible('khoa-ngoai')).toContain('luật kiểm khác');
  });

  it('uses PUBS consistently and separates its optional references and HRM self-reference', () => {
    const visible = (id: string) => withoutNotes(slides[outline.findIndex(s => s.id === id)] ?? '');
    for (const slide of slides.slice(19)) expect(withoutNotes(slide)).toContain('<PubsFigure');
    for (const value of ['pub_info.pub_id', 'PK', 'FK', 'tối đa một']) expect(visible('quan-he-mot-mot')).toContain(value);
    for (const value of ['stores', 'sales', 'titles', 'stor_id', 'ord_num', 'title_id']) expect(visible('quan-he-nhieu-nhieu')).toContain(value);
    for (const value of ['titles.pub_id', 'NULL', 'pub_info', 'không bắt']) expect(visible('quan-he-bat-buoc-tuy-chon')).toContain(value);
    for (const value of ['stores', 'sales', 'titles', 'NhanVien.MaQuanLy', 'NhanVien.MaNV', 'HRM_Demo', 'NULL']) expect(visible('lan-duong-va-tu-tham-chieu')).toContain(value);
    expect(raw).not.toMatch(/import (databaseConcept|serverConcept|sqlConcept)|<ProjectionRelation|<ConceptFigure/);
  });

  it('keeps PUBS crops inside the original image, with credits, and appendix links independent of page depth', () => {
    const figure = readFileSync('src/components/presentations/PubsFigure.astro', 'utf8');
    const regions = [...figure.matchAll(/\w+: \{ x: (\d+), y: (\d+), width: (\d+), height: (\d+) \}/g)].map(match => match.slice(1).map(Number));
    expect(regions).toHaveLength(5);
    for (const [x, y, width, height] of regions) { expect(x + width).toBeLessThanOrEqual(477); expect(y + height).toBeLessThanOrEqual(474); }
    for (const value of ['Microsoft Learn', 'MicrosoftDocs/data-tools', 'MIT', 'bảy bảng']) expect(figure).toContain(value);
    // The presenter page is one directory deeper than the audience page, so a relative href breaks on one of them.
    expect(raw).not.toMatch(/href="\.\.\//);
    for (const slug of ['pl-1-chi-tiet-kieu-du-lieu', 'pl-2-chuyen-doi-kieu-du-lieu']) expect(raw).toContain(`appendixUrl('${slug}')`);
  });

  it('restores every one of the 21 legacy slide links through a unique ID or native alias', () => {
    const oldIds = ['database-la-gi','cac-mo-hinh-luu-tru','so-sanh-cac-dang-database','tu-excel-den-database-quan-he','sql-server-la-gi','sql-la-gi','bon-ten-can-phan-biet','du-lieu-trong-database','so-do-quan-he-erd','bang-trong-database','bang-dong-cot','thong-tin-o-nhieu-bang','nhan-dien-mot-ho-so','khoa-chinh','bang-khong-co-khoa-chinh','ma-phong-trong-ho-so','khoa-ngoai','bang-khong-co-khoa-ngoai','ky-hieu-erd','ten-phong-cua-nv001','hop-dong-kem-ten-phong'];
    const specs = outline.map((entry, i) => ({ id: entry.id, hasAnswer: false, aliases: [...slides[i].matchAll(/<span id="([^"]+)" data-slide-alias/g)].map(match => match[1]) }));
    const allIds = specs.flatMap(s => [s.id, ...s.aliases]);
    expect(new Set(allIds).size).toBe(allIds.length);
    for (const id of oldIds) {
      const target = specs.find(s => s.id === id || s.aliases.includes(id));
      expect(target, id).toBeDefined();
      for (const suffix of ['?slide=' + id, '#' + id]) {
        const url = new URL('https://example.org/' + suffix);
        const state = presentationFromUrl(url, specs).state;
        expect(state.slideId, id).toBe(target!.id);
        expect(presentationStateUrl(url, state, null).searchParams.get('slide')).toBe(target!.id);
      }
    }
    for (const oldId of ['ten-phong-cua-nv001', 'hop-dong-kem-ten-phong']) expect(specs.at(-1)!.aliases).toContain(oldId);
  });

  it('preserves concise prose and course terminology', () => {
    expect(proseParagraphs(raw).filter(paragraph => paragraph.words > 120)).toEqual([]);
    for (const phrase of BANNED_PHRASES) expect(raw.toLowerCase()).not.toContain(phrase);
    expect(raw).not.toMatch(/[😀-🙏]/u);
  });

});

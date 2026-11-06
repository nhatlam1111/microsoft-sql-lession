/** Legacy routes preserve the identity of the former conditional-count lesson. */
export function lessonRedirectRoutes(base) {
  return Object.fromEntries(['', '/bai-tap/1', '/bai-tap/2', '/bai-tap/3'].map(tail => [
    `/bai/3-10-dem-co-dieu-kien${tail}/`,
    `${base.replace(/\/$/, '')}/bai/3-12-dem-co-dieu-kien${tail}/`,
  ]));
}

/** A per-code limit on calls in a sliding window, kept in this instance's memory only. */
export function createLimiter(limit = 30, windowMs = 60_000, now: () => number = Date.now): (code: string) => boolean {
  const calls = new Map<string, number[]>();
  return code => {
    const t = now();
    const recent = (calls.get(code) ?? []).filter(at => t - at < windowMs);
    if (recent.length >= limit) {
      calls.set(code, recent);
      return false;
    }
    recent.push(t);
    calls.set(code, recent);
    return true;
  };
}

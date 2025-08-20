export const fmt = (n) => new Intl.NumberFormat('ko-KR').format(Math.round(n ?? 0));

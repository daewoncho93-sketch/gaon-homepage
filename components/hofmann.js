export const MONTHLY_RATE = 0.05/12; // 법정이율 5% 가정 → 월 5/12%

export function hoffman(nMonths){
  if (!nMonths || nMonths <= 0) return 0;
  const r = MONTHLY_RATE;
  let s = 0;
  for (let k=1;k<=nMonths;k++) s += 1/Math.pow(1+r, k);
  return s;
}

// 62세 이상 특례 H값
export const H_SPECIAL = {
  "36": 33.4777,
  "24": 22.8290,
  "12": 11.6858,
};

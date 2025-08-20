import { useMemo, useState, useEffect } from 'react'
const KRW = n => new Intl.NumberFormat('ko-KR', { style:'currency', currency:'KRW', maximumFractionDigits:0 }).format(Math.max(0, Math.round(n||0)));
const TABLE = {
  '교통사고': {
    '척추': {
      '압박골절/불안정': [15, 100],
      '추간판탈출(수술)': [12, 35],
      '신경증상 지속': [10, 25],
    },
    '무릎(십자인대)': { 'ACL 재건': [10, 20], '반월상연골 수술': [5, 12] },
    '상지(수지)': { '수지단/강직': [8, 30], '관절운동제한': [5, 15] },
  },
  '배상책임사고': {
    '경추/요추 손상': { '후유통증 지속': [5, 20], '신경학적 결손': [10, 30] },
    '안면/치아/미용': { '영구 반흔': [3, 15], '치아보철': [2, 8] },
  },
  '산재사고': {
    '절단/기능상실': { '수지/수부': [15, 60], '하지': [20, 80] },
    '청력/시력': { '난청': [5, 30], '한눈 저하': [20, 30] },
  },
  '해상사고': { '척추/몸통': { '항만/선박상해': [10, 40] } },
  '개인보험': {
    '뇌혈관질환': { 'I63~I69(후유증)': [5, 60] },
    '심혈관질환': { 'I21~I25(후유증)': [5, 50] },
    '암(악성신생물)': { '병리확정/치료': [5, 100] },
  },
  '단체보험': { '상해후유장해': { '신체 전반': [1, 100] } },
};
const ADL = { '없음': 0, '경미': 3, '중등도': 7, '심함': 12 };
export default function Simulator() {
  const [category, setCategory] = useState('교통사고');
  const [body, setBody] = useState('척추');
  const [diag, setDiag] = useState('압박골절/불안정');
  const [adl, setAdl] = useState('경미');
  const [age, setAge] = useState(50);
  const [sum, setSum] = useState(300000000);
  useEffect(()=>{ const firstBody = Object.keys(TABLE[category] || {})[0] || ''; setBody(firstBody); },[category]);
  useEffect(()=>{ const firstDiag = Object.keys((TABLE[category]||{})[body] || {})[0] || ''; setDiag(firstDiag); },[body, category]);
  const [lo, hi] = useMemo(()=>{
    const base = ((TABLE[category]||{})[body]||{})[diag] || [0,0];
    let [a,b] = base; const aw = ADL[adl] || 0; a += aw; b += aw; if (age >= 65) { a += 2; b += 2; }
    a = Math.min(Math.max(1, a), 100); b = Math.min(Math.max(a, b), 100); return [a,b];
  },[category, body, diag, adl, age]);
  const payout = useMemo(()=>({ lo: sum*(lo/100), hi: sum*(hi/100) }), [sum, lo, hi]);
  const bodies = Object.keys(TABLE[category] || {});
  const diags = Object.keys((TABLE[category]||{})[body] || {});
  return (
    <section id="simulator" className="py-16">
      <div className="container">
        <div className="badge bg-indigo-700 text-white mb-3">보험금 시뮬레이터</div>
        <h2 className="section-title">사고·질환별 예상 장해율 & 지급액</h2>
        <p className="mt-2 text-slate-600">간단한 입력만으로 대략적인 범위를 확인하세요.</p>
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><div className="text-sm text-slate-600 mb-1">분류</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={category} onChange={e=>setCategory(e.target.value)}>
                  {Object.keys(TABLE).map(k=><option key={k}>{k}</option>)}
                </select>
              </div>
              <div><div className="text-sm text-slate-600 mb-1">부위</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={body} onChange={e=>setBody(e.target.value)}>
                  {bodies.map(k=><option key={k}>{k}</option>)}
                </select>
              </div>
              <div><div className="text-sm text-slate-600 mb-1">진단/상태</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={diag} onChange={e=>setDiag(e.target.value)}>
                  {diags.map(k=><option key={k}>{k}</option>)}
                </select>
              </div>
              <div><div className="text-sm text-slate-600 mb-1">ADL 제한</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={adl} onChange={e=>setAdl(e.target.value)}>
                  {Object.keys(ADL).map(k=><option key={k}>{k}</option>)}
                </select>
              </div>
              <div><div className="text-sm text-slate-600 mb-1">연령</div>
                <input type="number" min={0} max={110} className="border rounded-xl px-3 py-2 w-full" value={age} onChange={e=>setAge(parseInt(e.target.value||'0',10))}/>
              </div>
              <div><div className="text-sm text-slate-600 mb-1">가입금액(원)</div>
                <input type="number" className="border rounded-xl px-3 py-2 w-full" value={sum} onChange={e=>setSum(parseInt(e.target.value||'0',10))}/>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">예상 장해율</div>
                <div className="text-2xl font-extrabold">{lo}% ~ {hi}%</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">예상 지급액</div>
                <div className="text-2xl font-extrabold">{KRW(payout.lo)} ~ {KRW(payout.hi)}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-600">
              * 예시이며, 실제 지급 판단은 약관·진단확정·의학적 인과관계·평가에 따라 달라질 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

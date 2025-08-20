import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useMemo, useState } from 'react';

const CATEGORIES = ['교통사고', '배상책임사고', '산재사고', '해상사고', '개인보험', '단체보험'];

const BASE_TABLE = {
  '척추': { '압박골절': [15, 40], '추간판탈출증': [10, 30] },
  '무릎(십자인대)': { '전방십자인대파열': [10, 25], '반월상연골파열': [8, 18] },
  '손가락': { '절단(부분/수지단)': [20, 40], '강직/운동제한': [8, 20] },
  '시력': { '한눈 영구저하': [20, 35] },
  '청력': { '감각신경성 난청': [10, 25] },
  '뇌혈관질환': { 'I67.8 기타': [10, 35] },
  '심혈관질환': { '심근경색 후유': [10, 30] },
  '암': { '진단비/분쟁': [0, 0] }
};

const ADL = ['없음', '경미', '중등도', '심함'];
const ADL_W = { 없음: 0, 경미: 3, 중등도: 7, 심함: 12 };
const KRW = (n) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n || 0)));

function estimate({ bodyPart, diagnosis, adl, age }) {
  const base = BASE_TABLE[bodyPart]?.[diagnosis] || [0, 0];
  let [lo, hi] = base;
  lo += ADL_W[adl] || 0;
  hi += ADL_W[adl] || 0;
  if (age >= 65) { lo += 2; hi += 2; }
  lo = Math.max(0, Math.min(hi, lo));
  return [lo, hi];
}

export default function SimulatorPage() {
  const [tab, setTab] = useState(CATEGORIES[0]);
  const [bodyPart, setBodyPart] = useState('척추');
  const [diagnosis, setDiagnosis] = useState('압박골절');
  const [adl, setAdl] = useState('경미');
  const [age, setAge] = useState(50);
  const [sum, setSum] = useState(300000000); // 3억

  useEffect(() => {
    const first = Object.keys(BASE_TABLE[bodyPart] || {})[0] || '';
    setDiagnosis(first);
  }, [bodyPart]);

  const [lo, hi] = useMemo(() => estimate({ bodyPart, diagnosis, adl, age }), [bodyPart, diagnosis, adl, age]);
  const payout = useMemo(() => ({ lo: sum * (lo/100), hi: sum * (hi/100) }), [sum, lo, hi]);

  return (
    <div>
      <Header />

      <section className="section bg-slate-50">
        <div className="container-narrow">
          <h1 className="text-3xl font-extrabold">보험금 시뮬레이터</h1>
          <p className="mt-3 text-slate-600">사고유형에 맞춰 장해 부위·진단을 선택하고 가입금액(기본 3억)을 입력하면 예측 범위를 봅니다.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setTab(c)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold border ${tab === c ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-slate-50'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="label">장해 부위</div>
                  <select className="input" value={bodyPart} onChange={(e)=>setBodyPart(e.target.value)}>
                    {Object.keys(BASE_TABLE).map((bp)=>(<option key={bp}>{bp}</option>))}
                  </select>
                </div>
                <div>
                  <div className="label">진단/상태</div>
                  <select className="input" value={diagnosis} onChange={(e)=>setDiagnosis(e.target.value)}>
                    {Object.keys(BASE_TABLE[bodyPart] || {}).map((d)=>(<option key={d}>{d}</option>))}
                  </select>
                </div>
                <div>
                  <div className="label">ADL 제한</div>
                  <select className="input" value={adl} onChange={(e)=>setAdl(e.target.value)}>
                    {ADL.map((a)=>(<option key={a}>{a}</option>))}
                  </select>
                </div>
                <div>
                  <div className="label">연령</div>
                  <input type="number" min={0} max={110} className="input" value={age} onChange={(e)=>setAge(parseInt(e.target.value||'0',10))}/>
                </div>
                <div className="sm:col-span-2">
                  <div className="label">가입금액(원)</div>
                  <input type="number" step={100000} className="input" value={sum} onChange={(e)=>setSum(parseInt(e.target.value||'0',10))}/>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="font-semibold mb-3">결과 요약</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-100 p-4">
                  <div className="text-sm text-slate-500">예상 장해율</div>
                  <div className="text-2xl font-extrabold">{lo}% ~ {hi}%</div>
                </div>
                <div className="rounded-xl bg-slate-100 p-4">
                  <div className="text-sm text-slate-500">예상 지급액</div>
                  <div className="text-2xl font-extrabold">{KRW(payout.lo)} ~ {KRW(payout.hi)}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-600">※ 예시는 참고용이며, 실제 판단은 약관·진단확정·의학적 인과관계에 따라 상이할 수 있습니다.</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

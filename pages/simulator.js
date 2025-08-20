import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useMemo, useState } from 'react';

const ADL = ['없음', '경미', '중등도', '심함'];
const ADL_W = { 없음: 0, 경미: 3, 중등도: 7, 심함: 12 };
const KRW = (n) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n || 0)));

export default function SimulatorPage() {
  const [sum, setSum] = useState(300000000); // 3억
  const [age, setAge] = useState(50);
  const [adl, setAdl] = useState('경미');
  const [data, setData] = useState({});
  const [category, setCategory] = useState('척추');
  const [selected, setSelected] = useState([]); // {code, name, rate}
  const [method, setMethod] = useState('product'); // 'product' or 'sum'

  useEffect(() => {
    fetch('/data/impairments.json').then(r => r.json()).then(setData);
  }, []);

  const items = useMemo(() => (data[category]?.items || []), [data, category]);

  const addItem = (it) => {
    if (selected.find(s => s.code === it.code)) return;
    setSelected([...selected, it]);
  };
  const removeItem = (code) => setSelected(selected.filter(s => s.code !== code));
  const clearSel = () => setSelected([]);

  const baseRate = useMemo(() => {
    const rates = selected.map(s => s.rate || 0).filter(r => r > 0);
    if (rates.length === 0) return 0;
    if (method === 'sum') {
      return Math.min(100, rates.reduce((a,b) => a + b, 0));
    } else {
      // 1 - Π(1 - r_i)
      const prod = rates.reduce((acc, r) => acc * (1 - r/100), 1);
      return Math.min(100, 100 * (1 - prod));
    }
  }, [selected, method]);

  const adjustedRate = useMemo(() => {
    let r = baseRate + (ADL_W[adl] || 0) + (age >= 65 ? 2 : 0);
    return Math.max(0, Math.min(100, r));
  }, [baseRate, adl, age]);

  const payout = useMemo(() => sum * (adjustedRate / 100), [sum, adjustedRate]);

  return (
    <div>
      <Header />

      <section className="section bg-slate-50">
        <div className="container-narrow">
          <h1 className="text-3xl font-extrabold">데이터 기반 보험금 시뮬레이터</h1>
          <p className="mt-3 text-slate-600">장해분류표를 바탕으로 항목을 선택하면 장해율을 자동 적용합니다. 복수 항목은 보수적 결합(1−Π(1−r)) 또는 단순합산을 선택할 수 있습니다.</p>

          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            {/* 좌측: 선택 패널 */}
            <div className="card lg:col-span-2">
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <div className="label">카테고리</div>
                  <select className="input" value={category} onChange={(e)=>{ setCategory(e.target.value); }}>
                    {Object.keys(data).map((k)=>(<option key={k} value={k}>{k}</option>))}
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
              </div>

              <div className="mt-4">
                <div className="label">장해 항목</div>
                <div className="grid md:grid-cols-2 gap-2 max-h-72 overflow-y-auto border rounded-xl p-2">
                  {items.map((it) => (
                    <button key={it.code} onClick={()=>addItem(it)} className="text-left rounded-lg border px-3 py-2 hover:bg-slate-50">
                      <div className="font-semibold text-sm">{it.name}</div>
                      <div className="text-xs text-slate-500">지급률 {it.rate}%</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">선택 항목</div>
                  <button onClick={clearSel} className="text-sm text-slate-500 hover:text-slate-700">모두 해제</button>
                </div>
                {selected.length === 0 ? (
                  <div className="mt-2 text-sm text-slate-500">선택된 항목이 없습니다.</div>
                ) : (
                  <ul className="mt-2 space-y-2">
                    {selected.map(s => (
                      <li key={s.code} className="flex items-center justify-between rounded-lg border px-3 py-2">
                        <div className="text-sm">{s.name} <span className="text-slate-500">({s.rate}%)</span></div>
                        <button onClick={()=>removeItem(s.code)} className="text-xs text-slate-500 hover:text-slate-800">삭제</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <div>
                  <div className="label">가입금액(원)</div>
                  <input type="number" step={100000} className="input" value={sum} onChange={(e)=>setSum(parseInt(e.target.value||'0',10))}/>
                </div>
                <div>
                  <div className="label">복수 항목 결합 방식</div>
                  <select className="input" value={method} onChange={(e)=>setMethod(e.target.value)}>
                    <option value="product">보수: 1−Π(1−r)</option>
                    <option value="sum">단순합산(상한 100%)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 우측: 결과 */}
            <div className="card">
              <div className="font-semibold mb-3">결과 요약</div>
              <div className="rounded-xl bg-slate-100 p-4">
                <div className="text-sm text-slate-500">기초 장해율(선택 항목 기준)</div>
                <div className="text-2xl font-extrabold">{baseRate.toFixed(1)}%</div>
              </div>
              <div className="rounded-xl bg-slate-100 p-4 mt-3">
                <div className="text-sm text-slate-500">보정 후 장해율(ADL·연령 반영)</div>
                <div className="text-2xl font-extrabold">{adjustedRate.toFixed(1)}%</div>
              </div>
              <div className="rounded-xl bg-slate-100 p-4 mt-3">
                <div className="text-sm text-slate-500">예상 지급액</div>
                <div className="text-2xl font-extrabold">{KRW(payout)}</div>
              </div>
              <div className="mt-3 text-xs text-slate-600">
                ※ 본 결과는 예시이며 실제 지급 판단은 약관, 진단확정, 의학적 인과관계, 손해사정 평가에 따라 달라질 수 있습니다.
              </div>
              <div className="mt-4">
                <a href="/contact" className="btn-primary w-full justify-center">전문가 상담 연결</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

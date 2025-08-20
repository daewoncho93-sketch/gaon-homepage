import React, { useMemo, useState } from "react";
import { Calculator, Plus, Trash2, Info } from "lucide-react";
import data from "../data/impairments_by_accident.json";

const ACCIDENTS = ["교통사고","배상책임사고","산재사고","해상사고","개인보험","단체보험"];
const STANDARDS = ["맥브라이드","AMA"];

const krw = (n)=> new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW",maximumFractionDigits:0}).format(Math.max(0, Math.round(n||0)));

export default function Simulator() {
  const [accident, setAccident] = useState("교통사고");
  const [standard, setStandard] = useState("맥브라이드");
  const [sum, setSum] = useState(300000000); // 3억원
  const [mode, setMode] = useState("conservative"); // conservative | sum
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState([]);

  const categories = useMemo(()=>{
    const tree = (data[accident] && data[accident][standard]) || {};
    return Object.keys(tree);
  }, [accident, standard]);

  React.useEffect(()=>{
    setCategory((prev)=> categories.includes(prev) ? prev : categories[0] || "");
    setSelected([]);
  }, [accident, standard]);

  const items = useMemo(()=>{
    const tree = (data[accident] && data[accident][standard]) || {};
    return (tree[category] || []);
  }, [accident, standard, category]);

  const addItem = (item) => {
    setSelected((s)=> s.find(x=>x.code===item.code) ? s : [...s, item]);
  };
  const removeItem = (code)=> setSelected((s)=> s.filter(x=>x.code!==code));

  const combinedRate = useMemo(()=>{
    const rates = selected.map(x=> (x.rate||0)/100);
    if (!rates.length) return 0;
    if (mode==="sum") {
      const s = rates.reduce((a,b)=>a+b,0);
      return Math.min(1, s);
    } else {
      // conservative 1 - Π(1-r)
      const prod = rates.reduce((a,b)=> a*(1-b), 1);
      return 1 - prod;
    }
  }, [selected, mode]);

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="container h-16 flex items-center justify-between">
          <div className="font-extrabold tracking-tight">보험금 시뮬레이터</div>
          <a href="/" className="text-sm text-indigo-600">홈으로</a>
        </div>
      </div>

      <div className="container py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="space-y-1">
                <div className="text-xs text-slate-500">사고유형</div>
                <select className="border rounded-xl px-3 py-2" value={accident} onChange={(e)=>setAccident(e.target.value)}>
                  {ACCIDENTS.map(a=> <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500">평가기준</div>
                <select className="border rounded-xl px-3 py-2" value={standard} onChange={(e)=>setStandard(e.target.value)}>
                  {STANDARDS.map(s=> <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500">가입금액</div>
                <input type="number" className="border rounded-xl px-3 py-2 w-44" value={sum} onChange={(e)=>setSum(parseInt(e.target.value||"0",10))}/>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500">결합방식</div>
                <select className="border rounded-xl px-3 py-2" value={mode} onChange={(e)=>setMode(e.target.value)}>
                  <option value="conservative">보수적(1-Π(1-r))</option>
                  <option value="sum">합산(최대 100%)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="text-sm font-semibold mb-2">부위</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={category||""} onChange={(e)=>setCategory(e.target.value)}>
                  {categories.map(c=> <option key={c}>{c}</option>)}
                </select>
                <div className="mt-4 text-xs text-slate-500 flex gap-1 items-start"><Info className="w-4 h-4"/> 수치는 교육용 예시이며, 실제 인정율은 약관·특약·의학적 인과관계·판례에 따라 달라질 수 있습니다.</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-sm font-semibold mb-2">항목</div>
                <div className="grid sm:grid-cols-2 gap-2 max-h-[380px] overflow-auto pr-1">
                  {items.map(item=> (
                    <button key={item.code} className="flex items-center justify-between rounded-xl border px-3 py-2 hover:border-indigo-300 hover:bg-indigo-50 text-left"
                      onClick={()=>addItem(item)}>
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        {item.ref && <div className="text-[11px] text-slate-500">{item.ref}</div>}
                      </div>
                      <div className="text-sm font-bold text-indigo-700">{item.rate}%</div>
                    </button>
                  ))}
                  {!items.length && <div className="text-sm text-slate-500">이 기준/부위 데이터가 아직 없습니다.</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border p-4">
            <div className="text-sm font-semibold mb-2">선택항목</div>
            {selected.length===0 ? (
              <div className="text-sm text-slate-500">항목을 선택하세요.</div>
            ) : (
              <ul className="space-y-2">
                {selected.map(s=> (
                  <li key={s.code} className="flex items-center justify-between rounded-xl border px-3 py-2">
                    <div>
                      <div className="text-sm font-medium">{s.name}</div>
                      {s.ref && <div className="text-[11px] text-slate-500">{s.ref}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold text-indigo-700">{s.rate}%</div>
                      <button className="p-2 rounded-lg hover:bg-slate-100" onClick={()=>removeItem(s.code)}><Trash2 className="w-4 h-4"/></button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border p-4 sticky top-20">
            <div className="flex items-center gap-2 text-slate-700 font-semibold"><Calculator className="w-5 h-5"/> 결과</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs text-slate-500">최종 장해율</div>
                <div className="text-2xl font-extrabold">{(combinedRate*100).toFixed(1)}%</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs text-slate-500">예상 지급액</div>
                <div className="text-2xl font-extrabold">{krw(sum * combinedRate)}</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500 leading-relaxed">
              * 가입금액 기본값은 3억원입니다. 실제 보장은 상품·특약 구성에 따라 다릅니다.
            </div>
            <div className="mt-4 flex gap-2">
              <a href="tel:01039339493" className="flex-1 rounded-xl bg-indigo-600 text-white px-4 py-2 text-center font-semibold">전화상담</a>
              <a href="https://open.kakao.com/o/sNpCmpXc" target="_blank" className="flex-1 rounded-xl border px-4 py-2 text-center font-semibold">카카오</a>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">문의: <a className="underline" href="mailto:daewoncho@naver.com">daewoncho@naver.com</a></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

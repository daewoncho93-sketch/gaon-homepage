'use client';
import { useMemo, useState } from 'react';
import { hoffmanSum } from '@/lib/hoffman';
const DEFAULT_WAGE = 3248613; // 일용노임단가(월) 자동

export default function Simulator(){
  const [age, setAge] = useState(40);
  const [wage, setWage] = useState('');
  const [monthsLost, setMonthsLost] = useState(3);
  const [nurseDays, setNurseDays] = useState(0);
  const [lossRate, setLossRate] = useState(0.24);
  const [isDeath, setIsDeath] = useState(false);
  const [outDays, setOutDays] = useState(0);

  const appliedWage = useMemo(()=>{
    if(wage !== '' && !isNaN(+wage) && +wage>0) return +wage;
    if(age < 19) return Math.round(DEFAULT_WAGE * 0.8);
    if(age > 65) return 0;
    return DEFAULT_WAGE;
  }, [wage, age]);

  const monthsToRetire = useMemo(()=>{
    if(age >= 65) return 0;
    return (65 - age) * 12;
  }, [age]);

  const deathComp = useMemo(()=>{
    if(!isDeath) return 0;
    const base = age < 65 ? 80000000 : 50000000;
    const funeral = 5000000;
    const livingRate = 1/3;
    const monthSum = hoffmanSum(Math.min(monthsToRetire, 240));
    const loss = Math.max(0, appliedWage * (1 - livingRate)) * monthSum;
    return base + funeral + loss;
  }, [isDeath, age, appliedWage, monthsToRetire]);

  const sequelComp = useMemo(()=>{
    if(isDeath) return 0;
    const monthSum = hoffmanSum(Math.min(monthsToRetire, 240));
    const loss = appliedWage * lossRate * monthSum;
    let pain = 0;
    if(lossRate >= 0.5){
      const base = age < 65 ? 45000000 : 40000000;
      pain = base * lossRate * 0.85;
    }else{
      if(lossRate >= 0.45) pain = 4000000;
      else if(lossRate >= 0.35) pain = 2400000;
      else if(lossRate >= 0.27) pain = 2000000;
      else if(lossRate >= 0.20) pain = 1600000;
      else if(lossRate >= 0.14) pain = 1200000;
      else if(lossRate >= 0.09) pain = 1000000;
      else if(lossRate >= 0.05) pain = 800000;
      else if(lossRate > 0) pain = 500000;
      else pain = 0;
    }
    return loss + pain;
  }, [isDeath, appliedWage, lossRate, monthsToRetire, age]);

  const oneDayIncome = useMemo(()=> appliedWage/20, [appliedWage]);
  const injuryComp = useMemo(()=>{
    if(isDeath) return 0;
    const lost = oneDayIncome * (monthsLost*20) * 0.85;
    const misc = outDays * 8000;
    return Math.max(0, lost + misc);
  }, [oneDayIncome, monthsLost, outDays, isDeath]);

  const nursingPerDay = 129945;
  const nursingComp = useMemo(()=> nursingPerDay * nurseDays, [nurseDays]);

  const total = Math.round(deathComp + sequelComp + injuryComp + nursingComp);

  return (
    <div className="space-y-6">
      <h1>보상 시뮬레이터 (β)</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card space-y-4">
          <div className="flex items-center gap-2">
            <input id="isDeath" type="checkbox" checked={isDeath} onChange={e=>setIsDeath(e.target.checked)} />
            <label htmlFor="isDeath">사망사고</label>
          </div>
          <label className="block text-sm">연령</label>
          <input className="w-full border rounded-xl p-2" type="number" min={1} max={100} value={age} onChange={e=>setAge(+e.target.value||0)} />
          <label className="block text-sm">월 소득(미입력 시 자동: {DEFAULT_WAGE.toLocaleString()}원)</label>
          <input className="w-full border rounded-xl p-2" type="number" placeholder={`${DEFAULT_WAGE}`} value={wage} onChange={e=>setWage(e.target.value)} />
          {!isDeath && (<>
            <label className="block text-sm">후유장해 상실률 (0~1)</label>
            <input className="w-full border rounded-xl p-2" type="number" step="0.01" min={0} max={1} value={lossRate} onChange={e=>setLossRate(Math.max(0, Math.min(1, +e.target.value||0)))} />
            <label className="block text-sm">휴업(월)</label>
            <input className="w-full border rounded-xl p-2" type="number" min={0} value={monthsLost} onChange={e=>setMonthsLost(Math.max(0, +e.target.value||0))} />
            <label className="block text-sm">통원 일수(8,000원/일)</label>
            <input className="w-full border rounded-xl p-2" type="number" min={0} value={outDays} onChange={e=>setOutDays(Math.max(0, +e.target.value||0))} />
          </>)}
          <label className="block text-sm">간병 일수 (1일 129,945원)</label>
          <input className="w-full border rounded-xl p-2" type="number" min={0} value={nurseDays} onChange={e=>setNurseDays(Math.max(0, +e.target.value||0))} />
        </div>
        <div className="card space-y-2">
          <h2>예상 합계</h2>
          <div className="text-4xl font-black text-brand-700">{total.toLocaleString()}원</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-3 bg-brand-100 rounded-xl">사망: {Math.round(deathComp).toLocaleString()}원</div>
            <div className="p-3 bg-brand-100 rounded-xl">후유장해: {Math.round(sequelComp).toLocaleString()}원</div>
            <div className="p-3 bg-brand-100 rounded-xl">부상: {Math.round(injuryComp).toLocaleString()}원</div>
            <div className="p-3 bg-brand-100 rounded-xl">간병비: {Math.round(nursingComp).toLocaleString()}원</div>
          </div>
          <p className="text-xs text-brand-700 mt-2">* 단순 예측치입니다. 실제 산정은 사고유형/과실/증빙/판례 등에 따라 달라집니다.</p>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useMemo, useState } from 'react';

const DEFAULT_DAILY_LABOR_WAGE = 3248613; // 월 일용노임단가
const NURSING_DAILY = 129945; // 간병비 1일

function hoffmanSum(months) {
  const rate = 0.05 / 12;
  const m = Math.max(0, Math.min(240, Math.floor(months)));
  let s = 0;
  for (let k=1;k<=m;k++) s += 1 / (1 + rate * k);
  return s;
}
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

export default function SimulatorPage(){
  const [age, setAge] = useState(40);
  const [kind, setKind] = useState('injury');
  const [actualMonthlyIncome, setActualMonthlyIncome] = useState('');
  const [laborWage, setLaborWage] = useState('');
  const [faultRate, setFaultRate] = useState(0);
  const [disabilityRate, setDisabilityRate] = useState(12);
  const [treatmentWeeks, setTreatmentWeeks] = useState(6);
  const [inpatientDays, setInpatientDays] = useState(10);
  const [outpatientDays, setOutpatientDays] = useState(12);
  const [nursingDays, setNursingDays] = useState(0);

  const monthlyBase = useMemo(()=>{
    if (actualMonthlyIncome) return Math.max(0, Number(actualMonthlyIncome));
    const wage = laborWage ? Number(laborWage) : DEFAULT_DAILY_LABOR_WAGE;
    if (age < 19) return wage * 0.8;
    if (age <= 65) return wage;
    return 0;
  }, [actualMonthlyIncome, laborWage, age]);

  const death = useMemo(()=>{
    if (kind !== 'death') return null;
    const funeral = 5000000;
    const basePain = age < 65 ? 80000000 : 50000000;
    const pain = basePain * (1 - (faultRate/100)*0.6);
    const months = clamp((65 - age) * 12, 0, 600);
    const lost = (monthlyBase - monthlyBase/3) * hoffmanSum(months);
    const total = Math.max(0, funeral + pain + lost);
    return { funeral, pain: Math.round(pain), lost: Math.round(lost), total: Math.round(total) };
  }, [kind, age, faultRate, monthlyBase]);

  const sequel = useMemo(()=>{
    if (kind !== 'sequel') return null;
    const dr = clamp(disabilityRate, 0, 100) / 100;
    let pain = 0;
    if (dr < 0.5){
      if (dr >= 0.45) pain = 4000000;
      else if (dr >= 0.35) pain = 2400000;
      else if (dr >= 0.27) pain = 2000000;
      else if (dr >= 0.20) pain = 1600000;
      else if (dr >= 0.14) pain = 1200000;
      else if (dr >= 0.09) pain = 1000000;
      else if (dr >= 0.05) pain = 800000;
      else pain = 500000;
    } else {
      const base = age < 65 ? 45000000 : 40000000;
      pain = base * dr * 0.85;
    }
    const months = clamp((65 - age) * 12, 0, 600);
    const lost = monthlyBase * dr * hoffmanSum(months);
    const nursing = NURSING_DAILY * Math.max(0, Number(nursingDays)||0);
    const total = Math.round(Math.max(0, pain + lost + nursing));
    return { pain: Math.round(pain), lost: Math.round(lost), nursing: Math.round(nursing), total };
  }, [kind, disabilityRate, age, monthlyBase, nursingDays]);

  const injury = useMemo(()=>{
    if (kind !== 'injury') return null;
    let pain = 150000;
    if (treatmentWeeks >= 8) pain = 1520000;
    else if (treatmentWeeks >= 6) pain = 1280000;
    else if (treatmentWeeks >= 4) pain = 750000;
    const dailyIncome = monthlyBase / 20;
    const loss = 0.85 * dailyIncome * ( (Number(inpatientDays)||0) + ((Number(outpatientDays)||0)/3) );
    const nursing = NURSING_DAILY * Math.max(0, Number(nursingDays)||0);
    const misc = 8000 * (Number(outpatientDays)||0);
    const total = Math.round(Math.max(0, pain + loss + nursing + misc));
    return { pain, loss: Math.round(loss), nursing: Math.round(nursing), misc, total };
  }, [kind, treatmentWeeks, monthlyBase, inpatientDays, outpatientDays, nursingDays]);

  const preview = kind==='death'? death : kind==='sequel'? sequel : injury;

  return (
    <div className="container py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">보상 시뮬레이터 (가온)</h1>
      <p className="text-slate-600 mb-6">일용노임단가 미입력시 3,248,613원/월 자동 적용. 간병비 1일 129,945원.</p>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-5 lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">사고 유형</span>
              <select value={kind} onChange={e=>setKind(e.target.value)} className="border rounded-xl px-3 py-2">
                <option value="injury">부상</option>
                <option value="sequel">후유장해</option>
                <option value="death">사망</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">나이</span>
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} className="border rounded-xl px-3 py-2" min="0" max="120"/>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">월 실제소득(선택)</span>
              <input type="number" placeholder="입증가능시 입력" value={actualMonthlyIncome} onChange={e=>setActualMonthlyIncome(e.target.value)} className="border rounded-xl px-3 py-2"/>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">월 일용노임단가(미입력시 자동)</span>
              <input type="number" placeholder="3248613" value={laborWage} onChange={e=>setLaborWage(e.target.value)} className="border rounded-xl px-3 py-2"/>
            </label>
            {kind!=='death' && (
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">간병일수 (선택)</span>
                <input type="number" value={nursingDays} onChange={e=>setNursingDays(e.target.value)} className="border rounded-xl px-3 py-2"/>
              </label>
            )}
            {kind==='death' && (
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">피해자 과실률(%)</span>
                <input type="number" value={faultRate} onChange={e=>setFaultRate(Number(e.target.value))} className="border rounded-xl px-3 py-2" min="0" max="100"/>
              </label>
            )}
          </div>

          {kind==='sequel' && (
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">노동능력상실률(%)</span>
                <input type="number" value={disabilityRate} onChange={e=>setDisabilityRate(Number(e.target.value))} className="border rounded-xl px-3 py-2" min="0" max="100"/>
              </label>
            </div>
          )}

          {kind==='injury' && (
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">치료기간(주)</span>
                <input type="number" value={treatmentWeeks} onChange={e=>setTreatmentWeeks(Number(e.target.value))} className="border rounded-xl px-3 py-2"/>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">입원일수</span>
                <input type="number" value={inpatientDays} onChange={e=>setInpatientDays(Number(e.target.value))} className="border rounded-xl px-3 py-2"/>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">통원일수</span>
                <input type="number" value={outpatientDays} onChange={e=>setOutpatientDays(Number(e.target.value))} className="border rounded-xl px-3 py-2"/>
              </label>
            </div>
          )}
        </div>

        <div className="card p-5">
          <h3 className="font-semibold mb-2">예상 보상 요약</h3>
          {preview && (
            <div className="space-y-2 text-sm">
              {preview.funeral!=null && <div className="flex justify-between"><span>장례비</span><b>{preview.funeral.toLocaleString()}원</b></div>}
              {preview.pain!=null && <div className="flex justify-between"><span>위자료</span><b>{preview.pain.toLocaleString()}원</b></div>}
              {preview.lost!=null && <div className="flex justify-between"><span>{kind==='death' ? '상실수익액' : '일실수입(장해)'}</span><b>{preview.lost.toLocaleString()}원</b></div>}
              {preview.loss!=null && <div className="flex justify-between"><span>휴업손해</span><b>{preview.loss.toLocaleString()}원</b></div>}
              {preview.nursing!=null && preview.nursing>0 && <div className="flex justify-between"><span>간병비</span><b>{preview.nursing.toLocaleString()}원</b></div>}
              {preview.misc!=null && <div className="flex justify-between"><span>기타(통원 8,000원/일)</span><b>{preview.misc.toLocaleString()}원</b></div>}
              <hr className="my-2"/>
              <div className="flex justify-between text-base"><span>합계(예상)</span><b>{preview.total.toLocaleString()}원</b></div>
              <p className="text-xs text-slate-500">* 실제 보상은 약관·증빙·과실·특약·소송여부 등에 따라 달라질 수 있습니다.</p>
              <a href="https://open.kakao.com/o/sNpCmpXc" className="btn btn-primary w-full" target="_blank" rel="noreferrer">결과 보내고 무료코멘트 받기</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

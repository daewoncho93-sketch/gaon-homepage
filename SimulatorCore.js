
import { useMemo, useState } from 'react';

/** Constants */
const DEFAULT_DAILY_CARE = 129_945; // 간병비(입원) 1일
const DEFAULT_MONTHLY_DAY_LABOR = 3_248_613; // 일용노임단가 월기준 (사용자 미입력시 자동 반영)
const MONTHLY_RATE = 0.05/12; // 호프만 월 이율

function hoffman(months, i = MONTHLY_RATE){
  // H(n) = sum_{k=1..n} 1/(1 + i*k)
  let s = 0;
  for(let k=1;k<=months;k++) s += 1/(1 + i*k);
  return s;
}

function monthsToRetirement({age, baseRetireAge=65, isFarmer=false, useSpecial62=false}){
  if(isFarmer) baseRetireAge = 70;
  // 62세 이상 약관 특칙
  if(useSpecial62 && age >= 62){
    if(age < 67) return 36;
    if(age < 76) return 24;
    return 12;
  }
  const startAge = Math.max(age, 19);
  const months = Math.max(0, Math.round((baseRetireAge - startAge) * 12));
  return months;
}

export default function SimulatorCore(){
  const [tab, setTab] = useState('사망');
  const [age, setAge] = useState(45);
  const [isFarmer, setIsFarmer] = useState(false);
  const [useSpecial62, setUseSpecial62] = useState(true);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [negligence, setNegligence] = useState(0); // 과실률(0~1)
  const [injuryGrade, setInjuryGrade] = useState(12);
  const [hospitalDays, setHospitalDays] = useState(0);
  const [outpatientDays, setOutpatientDays] = useState(0);
  const [recognizeOutpatient13, setRecognizeOutpatient13] = useState(true); // 통원 3일=1일
  const [disabilityRate, setDisabilityRate] = useState(0.12); // 12%
  const [isHomeNursingTarget, setIsHomeNursingTarget] = useState(false);

  const monthly = useMemo(() => {
    const v = parseFloat(monthlyIncome.toString().replace(/,/g,''));
    return Number.isFinite(v) && v>0 ? v : DEFAULT_MONTHLY_DAY_LABOR;
  }, [monthlyIncome]);

  const months = useMemo(() =>
    monthsToRetirement({age, isFarmer, useSpecial62, baseRetireAge: 65})
  , [age, isFarmer, useSpecial62]);

  const hoff = useMemo(() => hoffman(months), [months]);

  // 공통 계산
  const dailyFromMonthly20 = monthly / 20;

  // 사망
  const deathComp = useMemo(() => {
    const basePain = age < 65 ? 80_000_000 : 50_000_000; // 위자료 기준
    const pain = basePain * (1 - (negligence * 0.6)); // 법률 산식 반영(선택 입력시)
    const funeral = 5_000_000;
    const livingRate = 1/3;
    const lossIncome = (monthly * (1 - livingRate)) * hoff; // (월-생활비) × H
    const total = Math.max(0, pain + funeral + lossIncome);
    return { pain, funeral, lossIncome, total };
  }, [age, negligence, monthly, hoff]);

  // 부상
  const injuryPainMap = {
    1:200,2:176,3:152,4:128,5:75,6:50,7:40,8:30,9:25,10:20,11:15,12:15,13:15,14:15
  };
  const injuryComp = useMemo(() => {
    const pain = (injuryPainMap[injuryGrade] || 0) * 10_000;
    const recognizedOut = recognizeOutpatient13 ? Math.floor(outpatientDays/3) : 0;
    const 휴업일수 = (hospitalDays || 0) + recognizedOut;
    const dailyLoss = dailyFromMonthly20;
    const loss = dailyLoss * 휴업일수 * 0.85;
    // 간병비 (1~5급만, 한도 일수)
    const limit = injuryGrade<=2?60: (injuryGrade<=4?30: (injuryGrade===5?15:0));
    const careDays = Math.min(hospitalDays, limit || 0);
    const care = DEFAULT_DAILY_CARE * careDays;
    // 기타손해배상금(통원)
    const etc = outpatientDays * 8_000;
    const total = Math.max(0, pain + loss + care + etc);
    return {pain, loss, care, etc, total, recognizedOut, limit, careDays};
  }, [injuryGrade, hospitalDays, outpatientDays, recognizeOutpatient13, dailyFromMonthly20]);

  // 후유장해
  const sequelaComp = useMemo(() => {
    const rate = Math.max(0, Math.min(1, disabilityRate));
    // 위자료
    let pain = 0;
    if(rate < 0.5){
      // 표 기준
      const bands = [
        [0.05, 500000], [0.09, 800000], [0.14, 1000000], [0.20, 1200000],
        [0.27, 1600000], [0.35, 2000000], [0.45, 2400000], [0.50, 4000000]
      ];
      for(const [th, val] of bands){
        if(rate < th){ pain = val; break; }
      }
    }else{
      let base = age < 65 ? 45_000_000 : 40_000_000;
      if(isHomeNursingTarget){ base = age < 65 ? 80_000_000 : 50_000_000; }
      pain = base * rate * 0.85;
    }
    // 상실수익액
    const lossIncome = monthly * rate * hoff;
    // 가정간호비 (선택: 100% & 대상인 경우, 예상개월 직접입력 대신 월 H 적용 예시)
    const homeNursing = isHomeNursingTarget && rate === 1 ? (monthly/20) * hoff : 0; // 일용근로자 기준 예시
    const total = Math.max(0, pain + lossIncome + homeNursing);
    return { pain, lossIncome, homeNursing, total };
  }, [age, disabilityRate, monthly, hoff, isHomeNursingTarget]);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border shadow-sm">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="font-semibold text-slate-800">기본 입력</div>
          <div className="mt-3 space-y-3 text-sm">
            <label className="block">나이
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value)||0)}
                className="mt-1 w-full rounded-xl border px-3 py-2"/>
            </label>
            <label className="block">월 소득 (미입력시 일용노임 자동적용: 3,248,613원)
              <input placeholder="예: 3,000,000" value={monthlyIncome} onChange={e=>setMonthlyIncome(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"/>
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={isFarmer} onChange={e=>setIsFarmer(e.target.checked)}/>
                농·어업 종사자(가동연한 70세)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={useSpecial62} onChange={e=>setUseSpecial62(e.target.checked)}/>
                62세 이상 약관 특칙 적용
              </label>
            </div>
            <div className="text-xs text-slate-500">
              * 월 소득 미입력 시 연령과 무관하게 최신 일용노임 월기준(3,248,613원)을 적용합니다.
            </div>
            <div className="mt-2 p-3 rounded-lg bg-slate-50 text-xs">
              남은 가동월수: <b>{months}개월</b> · 호프만계수 H={hoff.toFixed(4)}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["사망","부상","후유장해"].map(t => (
              <button key={t} onClick={()=>setTab(t)}
                className={"px-3 py-1.5 rounded-xl border text-sm " + (tab===t? "bg-gaon-accent text-white border-gaon-accent":"border-slate-300")}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          {tab==="사망" && (
            <div>
              <div className="font-semibold">사망 손해 추정</div>
              <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
                <label className="block">과실률 (0~1 선택, 미입력시 0)
                  <input type="number" step="0.01" min="0" max="1" value={negligence}
                    onChange={e=>setNegligence(Math.min(1, Math.max(0, Number(e.target.value)||0)))}
                    className="mt-1 w-full rounded-xl border px-3 py-2"/>
                </label>
              </div>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <CardItem label="위자료" value={deathComp.pain}/>
                <CardItem label="장례비" value={deathComp.funeral}/>
                <CardItem label="상실수익액" value={deathComp.lossIncome}/>
                <CardItem label="합계(추정)" value={deathComp.total} highlight/>
              </div>
            </div>
          )}

          {tab==="부상" && (
            <div>
              <div className="font-semibold">부상 손해 추정</div>
              <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
                <label className="block">상해급수(1~14)
                  <input type="number" min="1" max="14" value={injuryGrade}
                    onChange={e=>setInjuryGrade(Number(e.target.value)||1)}
                    className="mt-1 w-full rounded-xl border px-3 py-2"/>
                </label>
                <label className="block">입원일수
                  <input type="number" value={hospitalDays} onChange={e=>setHospitalDays(Number(e.target.value)||0)}
                    className="mt-1 w-full rounded-xl border px-3 py-2"/>
                </label>
                <label className="block">통원일수
                  <input type="number" value={outpatientDays} onChange={e=>setOutpatientDays(Number(e.target.value)||0)}
                    className="mt-1 w-full rounded-xl border px-3 py-2"/>
                </label>
              </div>
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={recognizeOutpatient13} onChange={e=>setRecognizeOutpatient13(e.target.checked)}/>
                통원 3일 = 휴업 1일로 간주(관행)
              </label>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <CardItem label="부상 위자료" value={injuryComp.pain}/>
                <CardItem label={`휴업손해 (인정 통원 ${injuryComp.recognizedOut}일 포함)`} value={injuryComp.loss}/>
                <CardItem label={`간병비 (한도 ${injuryComp.limit||0}일 중 ${injuryComp.careDays}일)`} value={injuryComp.care}/>
                <CardItem label="기타손해배상금(통원)" value={injuryComp.etc}/>
                <CardItem label="합계(추정)" value={injuryComp.total} highlight/>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                * 간병비 단가 129,945원/일 적용. 상해 1~5급만 한도(60/30/15일) 내 인정.
              </div>
            </div>
          )}

          {tab==="후유장해" && (
            <div>
              <div className="font-semibold">후유장해 손해 추정</div>
              <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
                <label className="block">노동능력상실률(0~1)
                  <input type="number" step="0.01" min="0" max="1" value={disabilityRate}
                    onChange={e=>setDisabilityRate(Math.min(1, Math.max(0, Number(e.target.value)||0)))}
                    className="mt-1 w-full rounded-xl border px-3 py-2"/>
                </label>
                <label className="block">가정간호비 대상 여부
                  <select value={isHomeNursingTarget? 'yes':'no'} onChange={e=>setIsHomeNursingTarget(e.target.value==='yes')}
                    className="mt-1 w-full rounded-xl border px-3 py-2">
                    <option value="no">아니오</option>
                    <option value="yes">예 (100% 상실·식물인간/사지마비)</option>
                  </select>
                </label>
              </div>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <CardItem label="후유장해 위자료" value={sequelaComp.pain}/>
                <CardItem label="상실수익액" value={sequelaComp.lossIncome}/>
                <CardItem label="가정간호비(예시)" value={sequelaComp.homeNursing}/>
                <CardItem label="합계(추정)" value={sequelaComp.total} highlight/>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                * 위자료 산정: 50% 미만은 표준금액, 50% 이상은 기준위자료×상실률×85% (가정간호비 대상 시 상향).
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CardItem({label, value, highlight}){
  const fmt = (n)=> n.toLocaleString('ko-KR') + " 원";
  return (
    <div className={"p-4 rounded-2xl border " + (highlight ? "bg-gaon-accent text-white border-gaon-accent" : "bg-white")}>
      <div className={"text-sm " + (highlight ? "opacity-90":"text-slate-500")}>{label}</div>
      <div className={"mt-1 text-lg font-bold " + (highlight ? "" : "text-slate-900")}>{fmt(Math.round(value))}</div>
    </div>
  )
}

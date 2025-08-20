import { useMemo, useState } from "react"
import Layout from "../components/Layout"
import { hoffman, H_SPECIAL } from "../components/hofmann"
import { fmt } from "../components/number"

const DEFAULT_DAY_WAGE_MONTH = 3248613; // 일용노임단가(미입력시 자동)
const DAILY_CARE = 129945; // 간병비/일

function monthsToRetirement(age, category){
  // category: 'normal65' | 'agri70' | 'custom'
  if (age >= 62){
    if (age < 67) return { months: 36, h: H_SPECIAL["36"] };
    if (age < 76) return { months: 24, h: H_SPECIAL["24"] };
    return { months: 12, h: H_SPECIAL["12"] };
  }
  let limitAge = category === "agri70" ? 70 : 65;
  const months = Math.max(0, Math.round((limitAge - age) * 12));
  return { months, h: hoffman(months) };
}

function chooseMonthlyIncome(age, monthlyInput){
  return (monthlyInput && monthlyInput > 0) ? monthlyInput : DEFAULT_DAY_WAGE_MONTH;
}

function deathCalc(params){
  const { age, monthlyInput, negligence=0, category="normal65", monthsUntilDeath=0 } = params;
  const inc = chooseMonthlyIncome(age, monthlyInput);
  const { months, h } = monthsToRetirement(age, category);
  const lifeExpRate = 1/3;
  const lossMonthly = inc * (1 - lifeExpRate);
  const futurePart = lossMonthly * h;
  const pastPart = lossMonthly * Math.max(0, monthsUntilDeath);
  const lossIncome = futurePart + pastPart;

  const funeral = 5000000;
  const basePain = age < 65 ? 80000000 : 50000000;

  let subtotal = funeral + basePain + lossIncome;
  const afterNeg = subtotal * (1 - (negligence/100));

  return { funeral, basePain, lossIncome, subtotal, afterNeg, h, months };
}

function injuryCalc(params){
  const { age, monthlyInput, negligence=0, inpatientDays=0, outpatientDays=0, grade=12, outToOne=3, nursingDays=0 } = params;
  const inc = chooseMonthlyIncome(age, monthlyInput);
  const dailyIncome = inc / 30;
  const recognizedOut = Math.floor(outpatientDays / (outToOne || 3));
  const workLossDays = Math.max(0, (inpatientDays||0)) + Math.max(0, recognizedOut);
  const workLoss = dailyIncome * workLossDays * 0.85;

  const painTable = {1:200,2:176,3:152,4:128,5:75,6:50,7:40,8:30,9:25,10:20,11:15,12:15,13:15,14:15};
  const pain = (painTable[grade]||0)*10000;

  const caps = { "1":60, "2":60, "3":30, "4":30, "5":15 };
  const cap = caps[String(grade)] || 0;
  const allowed = Math.min(cap, inpatientDays||0, nursingDays||inpatientDays||0);
  const nursing = allowed * DAILY_CARE;

  const other = (outpatientDays||0) * 8000;

  const subtotal = workLoss + pain + nursing + other;
  const afterNeg = subtotal * (1 - (negligence/100));

  const meta = { workLossDays, allowedNursingDays: allowed };
  return { workLoss, pain, nursing, other, subtotal, afterNeg, meta };
}

function sequelCalc(params){
  const { age, monthlyInput, negligence=0, lossRate=0, category="normal65", tempMonths=null, homeNursingDays=0, legalMode=false, isHomeNursingTarget=false } = params;
  const inc = chooseMonthlyIncome(age, monthlyInput);

  let monthsInfo = monthsToRetirement(age, category);
  let H = monthsInfo.h;
  let months = monthsInfo.months;
  if (tempMonths !== null){
    months = Math.max(0, tempMonths);
    H = months >= 0 ? hoffman(months) : 0;
  }
  const lossIncome = inc * (lossRate/100) * H;

  let pain = 0;
  if (lossRate < 50){
    const table = [
      [45, 4000000],[35, 2400000],[27,2000000],[20,1600000],[14,1200000],[9,1000000],[5,800000],[0.00001,500000]
    ];
    for(const [thr, v] of table){
      if (lossRate >= thr){ pain = v; break; }
    }
  } else {
    let base = age < 65 ? 45000000 : 40000000;
    if (isHomeNursingTarget){ base = age < 65 ? 80000000 : 50000000; }
    pain = base * (lossRate/100) * (legalMode ? 1 : 0.85);
  }

  const homeNursing = (isHomeNursingTarget && homeNursingDays>0) ? (homeNursingDays * 129945) : 0;

  const subtotal = lossIncome + pain + homeNursing;
  const afterNeg = subtotal * (1 - (negligence/100));

  return { lossIncome, pain, homeNursing, subtotal, afterNeg, months, H };
}

function Row({label, value, strong=false}){
  return (
    <div className="flex justify-between py-1 text-sm">
      <div className="text-slate-600">{label}</div>
      <div className={strong ? "font-bold" : ""}>{fmt(value)}원</div>
    </div>
  )
}

export default function Simulator(){
  const [tab, setTab] = useState("death"); // death | injury | sequel
  const [age, setAge] = useState(43);
  const [monthly, setMonthly] = useState(""); // optional
  const [category, setCategory] = useState("normal65"); // normal65 | agri70 | custom
  const [negl, setNegl] = useState(0);

  const monthlyEffective = useMemo(()=>{
    const m = monthly === "" ? null : Number(monthly||0);
    return (m && m > 0) ? m : DEFAULT_DAY_WAGE_MONTH;
  },[age, monthly]);

  const [monthsToDeath, setMonthsToDeath] = useState(0);

  const [inGrade, setInGrade] = useState(12);
  const [inInDays, setInInDays] = useState(14);
  const [inOutDays, setInOutDays] = useState(10);
  const [inOutToOne, setInOutToOne] = useState(3);
  const [inNursingDays, setInNursingDays] = useState(0);

  const [lossRate, setLossRate] = useState(12);
  const [tempMonths, setTempMonths] = useState("");
  const [homeNursing, setHomeNursing] = useState(0);
  const [isHNTarget, setIsHNTarget] = useState(false);
  const [legalMode, setLegalMode] = useState(false);

  const death = useMemo(()=>deathCalc({ age, monthlyInput: monthly === "" ? null : Number(monthly), negligence: negl, category, monthsUntilDeath: Number(monthsToDeath||0)}), [age, monthly, negl, category, monthsToDeath]);
  const injury = useMemo(()=>injuryCalc({ age, monthlyInput: monthly === "" ? null : Number(monthly), negligence: negl, inpatientDays: Number(inInDays||0), outpatientDays: Number(inOutDays||0), grade: Number(inGrade||12), outToOne: Number(inOutToOne||3), nursingDays: Number(inNursingDays||0)}), [age, monthly, negl, inInDays, inOutDays, inGrade, inOutToOne, inNursingDays]);
  const sequel = useMemo(()=>sequelCalc({ age, monthlyInput: monthly === "" ? null : Number(monthly), negligence: negl, lossRate: Number(lossRate||0), category, tempMonths: tempMonths===""? null : Number(tempMonths), homeNursingDays: Number(homeNursing||0), legalMode, isHomeNursingTarget: isHNTarget }), [age, monthly, negl, lossRate, category, tempMonths, homeNursing, legalMode, isHNTarget]);

  const retireInfo = monthsToRetirement(age, category);

  return (
    <Layout title="보상 시뮬레이터 | GAON 손해사정">
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6">
            <div className="flex flex-wrap gap-2">
              {["death","injury","sequel"].map(k=>(
                <button key={k} onClick={()=>setTab(k)} className={"btn " + (tab===k ? "btn-primary" : "")}>
                  {k==="death"?"사망":k==="injury"?"부상":"후유장해"}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold">나이</label>
                <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={age} onChange={e=>setAge(Number(e.target.value))} min={0} max={120} />
              </div>
              <div>
                <label className="block text-sm font-semibold">월평균 현실소득 (선택, 미입력시 자동)</label>
                <input type="number" placeholder={`미입력시 ${fmt(DEFAULT_DAY_WAGE_MONTH)} 적용`} className="mt-1 w-full border rounded-xl px-3 py-2" value={monthly} onChange={e=>setMonthly(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold">직종/가동연한</label>
                <select className="mt-1 w-full border rounded-xl px-3 py-2" value={category} onChange={e=>setCategory(e.target.value)}>
                  <option value="normal65">일반 (만 65세)</option>
                  <option value="agri70">농어업인 (만 70세)</option>
                  <option value="custom">기타(기본 65세)</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">62세 이상 특례: 36/24/12개월 + 고정 H값 자동 적용</p>
              </div>
              <div>
                <label className="block text-sm font-semibold">피해자 과실률(%)</label>
                <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={negl} onChange={e=>setNegl(Number(e.target.value))} min={0} max={99} />
              </div>
            </div>

            {tab==="death" && (
              <div className="mt-6">
                <div className="h3 mb-3">사망: 입력값</div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold">사망일까지 경과월수(선택)</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={monthsToDeath} onChange={e=>setMonthsToDeath(e.target.value)} min={0} />
                  </div>
                </div>
              </div>
            )}

            {tab==="injury" && (
              <div className="mt-6">
                <div className="h3 mb-3">부상: 입력값</div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold">상해급수</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={inGrade} onChange={e=>setInGrade(e.target.value)} min={1} max={14} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">입원일수</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={inInDays} onChange={e=>setInInDays(e.target.value)} min={0} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">통원일수</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={inOutDays} onChange={e=>setInOutDays(e.target.value)} min={0} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">통원 → 휴업 1일 인정 비율</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={inOutToOne} onChange={e=>setInOutToOne(e.target.value)} min={1} />
                    <p className="text-xs text-slate-500 mt-1">기본 3일당 1일 (지법 일부 관행)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">간병 필요 일수(선택)</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={inNursingDays} onChange={e=>setInNursingDays(e.target.value)} min={0} />
                    <p className="text-xs text-slate-500 mt-1">1~5급 한도 자동 적용</p>
                  </div>
                </div>
              </div>
            )}

            {tab==="sequel" && (
              <div className="mt-6">
                <div className="h3 mb-3">후유장해: 입력값</div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold">노동능력상실률(%)</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={lossRate} onChange={e=>setLossRate(e.target.value)} min={0} max={100} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">한시장해 개월수(선택, 미입력=영구)</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={tempMonths} onChange={e=>setTempMonths(e.target.value)} min={0} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">가정간호비 대상</label>
                    <select className="mt-1 w-full border rounded-xl px-3 py-2" value={isHNTarget ? "y":"n"} onChange={e=>setIsHNTarget(e.target.value==="y")}>
                      <option value="n">아니오</option>
                      <option value="y">예 (식물인간/사지완전마비)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">가정간호 필요 일수(선택)</label>
                    <input type="number" className="mt-1 w-full border rounded-xl px-3 py-2" value={homeNursing} onChange={e=>setHomeNursing(e.target.value)} min={0} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">법원 위자료 모드</label>
                    <select className="mt-1 w-full border rounded-xl px-3 py-2" value={legalMode ? "y":"n"} onChange={e=>setLegalMode(e.target.value==="y")}>
                      <option value="n">아니오 (약관 기준)</option>
                      <option value="y">예 (법원 기준 시뮬레이션)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="card p-6">
            <div className="h3">결과</div>
            <div className="mt-1 text-sm text-slate-600">미입력 소득은 <b>{fmt(DEFAULT_DAY_WAGE_MONTH)}원</b>으로 자동 계산합니다.</div>
            <div className="mt-2 text-sm text-slate-600">현재 적용 월소득: <b>{fmt(monthlyEffective)}</b>원</div>
            <div className="mt-2 text-sm text-slate-600">가동연한 남은 개월수: <b>{monthsToRetirement(age, category).months}</b> (H={monthsToRetirement(age, category).h.toFixed(4)})</div>

            {tab==="death" && (
              <div className="mt-4">
                <Row label="장례비" value={death.funeral} />
                <Row label={`위자료 (${age<65?"65세 미만":"65세 이상"})`} value={death.basePain} />
                <Row label="상실수익액" value={death.lossIncome} />
                <Row label="소계" value={death.subtotal} />
                <Row label={`과실 반영 (${negl}% 차감)`} value={death.afterNeg} strong />
              </div>
            )}

            {tab==="injury" && (
              <div className="mt-4">
                <Row label="휴업손해" value={injury.workLoss} />
                <Row label={`위자료 (상해 ${inGrade}급)`} value={injury.pain} />
                <Row label={`간병비 (허용일수 ${injury.meta.allowedNursingDays}일)`} value={injury.nursing} />
                <Row label="기타손해배상금 (통원)" value={injury.other} />
                <Row label="소계" value={injury.subtotal} />
                <Row label={`과실 반영 (${negl}% 차감)`} value={injury.afterNeg} strong />
              </div>
            )}

            {tab==="sequel" && (
              <div className="mt-4">
                <Row label={`상실수익액 (H=${sequel.H.toFixed(4)})`} value={sequel.lossIncome} />
                <Row label="후유장해 위자료" value={sequel.pain} />
                <Row label="가정간호비" value={sequel.homeNursing} />
                <Row label="소계" value={sequel.subtotal} />
                <Row label={`과실 반영 (${negl}% 차감)`} value={sequel.afterNeg} strong />
              </div>
            )}

            <div className="mt-6 text-xs text-slate-500">
              * 본 계산기는 약관과 판례 요지를 간단화해 학습/시뮬레이션 용도로 제공합니다. 실제 지급은 증빙, 사실관계, 분쟁전략에 따라 달라질 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

import { useMemo, useState } from "react";

/** Constants */
const DEFAULT_MONTHLY_WAGE = 3248613; // 일용노임단가(월 20일 환산) 기본값
const DAILY_CARE = 129945; // 간병비/일

// 간단 호프만 계수 생성(월 단리 5/12%)
function hoffmanSum(months){
  const i = 0.05/12;
  let s = 0;
  for(let m=1;m<=months;m++){
    s += 1/(1 + i*m); // 단리 중간이자 공제 근사
  }
  return s;
}

// 취업가능 연한(기본 65, 농어업/정년 등은 단순 옵션으로 구현)
function workingMonths(age, cap=65){
  const start = Math.max(age, 19);
  const endAge = Math.max(cap, start);
  const months = Math.max(0, Math.round((endAge - start)*12));
  return months;
}

// 약관 특례: 62세 이상
function seniorHoffmanMonths(age){
  if(age >= 76) return 12;
  if(age >= 67) return 24;
  if(age >= 62) return 36;
  return null;
}

export default function Simulator(){
  const [tab, setTab] = useState("death"); // death | injury | disability
  const [age, setAge] = useState(45);
  const [monthlyIncome, setMonthlyIncome] = useState(""); // 공란이면 자동 기본
  const [fault, setFault] = useState(0); // 과실률
  const [isFarmer, setIsFarmer] = useState(false);
  const [careDays, setCareDays] = useState(0); // 간병일수(부상/후유장해 보조)

  const baseMonthly = useMemo(()=>{
    // 사용자가 입력하지 않으면 기본 일용노임단가 자동 반영
    const val = monthlyIncome === "" ? DEFAULT_MONTHLY_WAGE : Number(monthlyIncome||0);
    return Math.max(0,val);
  },[monthlyIncome]);

  const capAge = isFarmer ? 70 : 65;
  const wMonths = useMemo(()=>workingMonths(age, capAge),[age,capAge]);

  // 사망
  const death = useMemo(()=>{
    // 위자료(65미만 8천/65이상 5천) × {1 - (과실 × 0.6)}
    const basePain = age < 65 ? 80000000 : 50000000;
    const pain = basePain * (1 - (fault/100)*0.6);

    // 장례비 500만
    const funeral = 5000000;

    // 상실수익: (월소득 - 생활비1/3) × (실제월수 + 이후 H계수)
    // 여기서는 간단화를 위해 ‘당일부터 지급’ 가정 ⇒ H(취업가능월수)
    // 62세 이상 특례 월수 우선 적용
    const senior = seniorHoffmanMonths(age);
    const monthsLeft = senior ?? wMonths;
    const lifeExp = Math.max(0, monthsLeft);
    const monthlyAfterLiving = baseMonthly * (2/3); // 생활비 1/3 공제
    const hoff = hoffmanSum(lifeExp);
    const lost = monthlyAfterLiving * hoff;

    return {
      pain: Math.max(0,Math.round(pain)),
      funeral,
      lost: Math.round(lost),
      total: Math.max(0, Math.round(pain + funeral + lost))
    };
  },[age, baseMonthly, fault, wMonths]);

  // 부상(간단 모델): 위자료(급수 선택 생략 → 사용자 과실 반영 X), 휴업손해, 기타/간병
  const [injHospitalDays, setInjHospitalDays] = useState(14);
  const [injOutDays, setInjOutDays] = useState(10);
  const [injIncomeLossPerDay, setInjIncomeLossPerDay] = useState(""); // 미입력시 월소득/20
  const incomeLossPerDay = useMemo(()=>{
    const v = injIncomeLossPerDay === "" ? (baseMonthly/20) : Number(injIncomeLossPerDay||0);
    return Math.max(0,v);
  },[injIncomeLossPerDay, baseMonthly]);
  const injury = useMemo(()=>{
    // 위자료 예시: 경상 12~14급 가정 150,000 (단순예시)
    const pain = 150000;
    // 휴업손해: 85% × (입원일수 + 통원 3일=1일 가정)
    const outAsDays = Math.floor(injOutDays/3);
    const loss = 0.85 * incomeLossPerDay * (injHospitalDays + outAsDays);
    // 기타손해: 통원 8,000원/일
    const misc = injOutDays * 8000;
    // 간병비: 입력 careDays × 129,945
    const care = careDays * 129945;
    const total = Math.round(pain + loss + misc + care);
    return {pain, loss: Math.round(loss), misc, care, total};
  },[injHospitalDays, injOutDays, incomeLossPerDay, careDays]);

  // 후유장해: 상실률, 가정간호여부
  const [disRate, setDisRate] = useState(12); // %
  const [isHomeCare, setIsHomeCare] = useState(false);
  const disability = useMemo(()=>{
    // 위자료: 50% 미만 표준액 vs 50% 이상 산식
    const r = disRate/100;
    let pain = 0;
    if(disRate < 50){
      if(disRate >= 45) pain = 4000000;
      else if(disRate >= 35) pain = 2400000;
      else if(disRate >= 27) pain = 2000000;
      else if(disRate >= 20) pain = 1600000;
      else if(disRate >= 14) pain = 1200000;
      else if(disRate >= 9) pain = 1000000;
      else if(disRate >= 5) pain = 800000;
      else pain = 500000;
    }else{
      const base = isHomeCare ? (age < 65 ? 80000000 : 50000000) : (age < 65 ? 45000000 : 40000000);
      pain = base * r * 0.85;
    }
    // 상실수익: 월소득 × 상실률 × H(남은월수)
    const senior = seniorHoffmanMonths(age);
    const monthsLeft = senior ?? wMonths;
    const lost = baseMonthly * r * hoffmanSum(Math.max(0,monthsLeft));
    // 가정간호비: 선택 시 careDays × 129,945 (시뮬용)
    const care = isHomeCare ? careDays * DAILY_CARE : 0;
    const total = Math.round(pain + lost + care);
    return {pain: Math.round(pain), lost: Math.round(lost), care: Math.round(care), total};
  },[disRate, isHomeCare, careDays, baseMonthly, age, wMonths]);

  return (
    <div className="container">
      <div className="card">
        <div className="kicker">시뮬레이터</div>
        <h2 className="h2">사망 · 부상 · 후유장해 예상보상 계산</h2>
        <p className="small">* 교육용/사전 검토용 계산기입니다. 실제 보상은 약관·의학소견·과실·입증 정도에 따라 달라집니다.</p>
        <div className="row" style={{marginTop:12}}>
          <div>
            <label className="label">나이</label>
            <input className="input" type="number" value={age} min={0} onChange={e=>setAge(Number(e.target.value))}/>
          </div>
          <div>
            <label className="label">월소득 (미입력시 일용노임 자동적용: {DEFAULT_MONTHLY_WAGE.toLocaleString()}원)</label>
            <input className="input" type="number" value={monthlyIncome} placeholder={DEFAULT_MONTHLY_WAGE.toString()} onChange={e=>setMonthlyIncome(e.target.value)}/>
          </div>
        </div>
        <div className="row" style={{marginTop:12}}>
          <div>
            <label className="label">농·어업 종사(증빙 시) 70세 가동</label>
            <select className="input" value={isFarmer?1:0} onChange={e=>setIsFarmer(e.target.value==="1")}>
              <option value="0">해당 없음</option>
              <option value="1">예</option>
            </select>
          </div>
          <div>
            <label className="label">과실률(%)</label>
            <input className="input" type="number" value={fault} min={0} max={100} onChange={e=>setFault(Number(e.target.value))}/>
          </div>
        </div>

        <div style={{display:'flex',gap:8,marginTop:16,flexWrap:'wrap'}}>
          <button className={"btn "+(tab==="death"?"primary":"")} onClick={()=>setTab("death")}>사망</button>
          <button className={"btn "+(tab==="injury"?"primary":"")} onClick={()=>setTab("injury")}>부상</button>
          <button className={"btn "+(tab==="disability"?"primary":"")} onClick={()=>setTab("disability")}>후유장해</button>
        </div>
      </div>

      {tab==="death" && (
        <div className="card" style={{marginTop:16}}>
          <h3>사망 추정</h3>
          <table className="table">
            <tbody>
              <tr><th>위자료</th><td>{death.pain.toLocaleString()} 원</td></tr>
              <tr><th>장례비</th><td>{death.funeral.toLocaleString()} 원</td></tr>
              <tr><th>상실수익액</th><td>{death.lost.toLocaleString()} 원</td></tr>
              <tr><th>합계</th><td><b>{death.total.toLocaleString()} 원</b></td></tr>
            </tbody>
          </table>
          <div className="small">* 62세 이상은 약관 특례(H=36/24/12개월)를 우선 적용했습니다.</div>
        </div>
      )}

      {tab==="injury" && (
        <div className="card" style={{marginTop:16}}>
          <h3>부상 추정</h3>
          <div className="row">
            <div>
              <label className="label">입원일수</label>
              <input className="input" type="number" value={injHospitalDays} onChange={e=>setInjHospitalDays(Number(e.target.value))}/>
            </div>
            <div>
              <label className="label">통원일수</label>
              <input className="input" type="number" value={injOutDays} onChange={e=>setInjOutDays(Number(e.target.value))}/>
            </div>
          </div>
          <div className="row" style={{marginTop:12}}>
            <div>
              <label className="label">1일 수입 감소액 (미입력시 월소득/20)</label>
              <input className="input" type="number" value={injIncomeLossPerDay} onChange={e=>setInjIncomeLossPerDay(e.target.value)}/>
            </div>
            <div>
              <label className="label">간병일수 (1일 {DAILY_CARE.toLocaleString()}원)</label>
              <input className="input" type="number" value={careDays} onChange={e=>setCareDays(Number(e.target.value))}/>
            </div>
          </div>
          <table className="table" style={{marginTop:12}}>
            <tbody>
              <tr><th>위자료(예시)</th><td>{injury.pain.toLocaleString()} 원</td></tr>
              <tr><th>휴업손해(85%)</th><td>{injury.loss.toLocaleString()} 원</td></tr>
              <tr><th>기타(통원 8,000/일)</th><td>{injury.misc.toLocaleString()} 원</td></tr>
              <tr><th>간병비</th><td>{injury.care.toLocaleString()} 원</td></tr>
              <tr><th>합계</th><td><b>{injury.total.toLocaleString()} 원</b></td></tr>
            </tbody>
          </table>
        </div>
      )}

      {tab==="disability" && (
        <div className="card" style={{marginTop:16}}>
          <h3>후유장해 추정</h3>
          <div className="row">
            <div>
              <label className="label">노동능력상실률(%)</label>
              <input className="input" type="number" value={disRate} min={0} max={100} onChange={e=>setDisRate(Number(e.target.value))}/>
            </div>
            <div>
              <label className="label">가정간호 필요</label>
              <select className="input" value={isHomeCare?1:0} onChange={e=>setIsHomeCare(e.target.value==='1')}>
                <option value="0">아니오</option>
                <option value="1">예</option>
              </select>
            </div>
          </div>
          <div className="row" style={{marginTop:12}}>
            <div>
              <label className="label">간병일수 (선택)</label>
              <input className="input" type="number" value={careDays} onChange={e=>setCareDays(Number(e.target.value))}/>
            </div>
            <div>
              <label className="label">참고</label>
              <div className="notice">50% 미만은 표준액, 50% 이상은 기준위자료×상실률×85%</div>
            </div>
          </div>
          <table className="table" style={{marginTop:12}}>
            <tbody>
              <tr><th>위자료</th><td>{disability.pain.toLocaleString()} 원</td></tr>
              <tr><th>상실수익액</th><td>{disability.lost.toLocaleString()} 원</td></tr>
              <tr><th>가정간호비</th><td>{disability.care.toLocaleString()} 원</td></tr>
              <tr><th>합계</th><td><b>{disability.total.toLocaleString()} 원</b></td></tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="card" style={{marginTop:16}}>
        <div className="kicker">도움이 필요하신가요?</div>
        <p>전담 손해사정사 + 변호사 + 의료심사팀이 케이스를 검토합니다.</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <a className="btn primary" href="tel:01039339493">전화 상담</a>
          <a className="btn" href="https://open.kakao.com/o/sNpCmpXc" target="_blank">카카오톡 채널</a>
        </div>
      </div>
    </div>
  );
}

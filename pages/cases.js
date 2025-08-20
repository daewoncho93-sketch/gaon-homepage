export default function Cases(){
  const data = [
    {title:"사망사고 유족청구", tag:"대인배상(사망)", result:"총 1.86억원 수령", body:"위자료·장례비·상실수익액 항목 분리, 62세 특례 H=36 적용. 유족 진술·소득입증 보강."},
    {title:"대퇴골 골절 후 장해 12%", tag:"후유장해", result:"2,480만원", body:"의무기록 리뷰로 기능저하 소견 확보, 장해 0% → 12% 인정."},
    {title:"경상 통원 10일", tag:"부상 합의", result:"62만원", body:"위자료 15만 + 통원 8천×10 + 통원휴손 반영."},
    {title:"음주동승 거절 극복", tag:"분쟁", result:"치료비 전액 + 위자료", body:"약관·판례 반박서면. 면책 주장 철회."},
    {title:"외국인 단기체류", tag:"후유장해", result:"국내 3년 + 본국 이후", body:"체류 2.5년 남음: 국내기준 3년 적용 후 본국 환산."},
    {title:"농업인 68세", tag:"사망/후유", result:"가동연한 70세", body:"농업경영체·농지원부 등 객관자료로 70세 인정."}
  ];
  return (
    <div className="container">
      <div className="card">
        <div className="kicker">사례</div>
        <h2 className="h2">대표 처리 사례</h2>
        <div className="grid" style={{marginTop:12}}>
          {data.map((c,idx)=>(
            <div className="card" key={idx} style={{gridColumn:'span 4'}}>
              <div className="badge">{c.tag}</div>
              <h3 style={{marginTop:10}}>{c.title}</h3>
              <p className="lead">{c.result}</p>
              <p className="small">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

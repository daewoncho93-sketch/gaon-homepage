export default function FAQ(){
  const qas = [
    ["왜 전문가 팀이 필요한가요?","보상은 '입증 게임'입니다. 법률·의학·실무가 결합되어야 금액이 달라집니다."],
    ["수임료는?","초기 상담 무료, 성공보수 중심(케이스별 제시)."],
    ["사망/부상/후유장해 동시 가능?","각 항목 별도 한도로 산정해야 합니다."],
  ];
  return (
    <div className="container">
      <div className="card">
        <div className="kicker">FAQ</div>
        <h2 className="h2">자주 묻는 질문</h2>
        {qas.map((q,i)=>(
          <details className="card" key={i} style={{marginTop:8}}>
            <summary><b>{q[0]}</b></summary>
            <p className="small" style={{marginTop:8}}>{q[1]}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function Experts(){
  return (
    <div className="container">
      <div className="card">
        <div className="kicker">전문가</div>
        <h2 className="h2">전문가 소개</h2>
        <div className="grid" style={{marginTop:12}}>
          <div className="card" style={{gridColumn:'span 4'}}>
            <div className="badge">손해사정사</div>
            <h3>차대원</h3>
            <ul className="small">
              <li>보험사 본사 손해사정 파트 리드</li>
              <li>금융감독원 민원 분쟁 대응</li>
              <li>교통·상해·생명·의료 전문</li>
            </ul>
          </div>
          <div className="card" style={{gridColumn:'span 4'}}>
            <div className="badge">법률자문</div>
            <h3>협업 변호사</h3>
            <ul className="small">
              <li>검사·판사 출신 파트너 변호사</li>
              <li>자동차·생명보험 소송 다수</li>
              <li>자문-소송 원스톱</li>
            </ul>
          </div>
          <div className="card" style={{gridColumn:'span 4'}}>
            <div className="badge">의료심사</div>
            <h3>대학병원 출신 의료진</h3>
            <ul className="small">
              <li>정형외과·신경외과·재활의학과 MD 네트워크</li>
              <li>의무기록 리뷰/인과관계/장해율(맥브라이드·AMA)</li>
              <li>자문의 소견서/진단서 조정 협력</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

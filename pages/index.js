import Link from "next/link";
import ReviewSlider from "@/components/ReviewSlider";

const reviews = [
  {tag:"초고액 합의", text:"골절 + 수술 후 보험사에서 600만원 제시. 가온에서 자료정리/자문 받아 \n결국 3,200만원으로 합의. 이럴 줄 알았으면 처음부터 맡길걸..", meta:"교통사고 / 자영업 / 40대"},
  {tag:"불인정 → 인정", text:"후유장해 0% 통보 받았는데 의료심사팀에서 병원 소견 정리해줘서 \n12% 인정, 총 2,480만원 수령. 솔찍히 제가했다면 못했을듯요.", meta:"산재 유사 / 사무직 / 30대"},
  {tag:"거절 극복", text:"음주동승 거절사유로 퇴짜. 판례/약관 근거로 반박서면 작성해주셔서 \n치료비 전액 + 위자료 받아냈어요. 감사합니다.", meta:"특약 분쟁 / 20대"},
  {tag:"사망사고 유족", text:"뭘 어떻게 해야하는지 몰랐는데 위자료/상실수익 계산까지 \n모두 설명해주시고 1.8억 이상 보상 받았습니다. 존경합니다.", meta:"유족청구 / 60대"},
  {tag:"병원-법률 연계", text:"대학병원 출신 의료인이 직접 케이스 리뷰 + 변호사 협업으로 \n합의금 4,500만원. 중간에 제가 울었네요..", meta:"중상 / 50대"},
];

export default function Home(){
  return (
    <div className="container">
      <section className="hero card">
        <div className="kicker">손해사정사무소 가온</div>
        <h1 className="h1">검사·판사 출신 변호사 × 보험사 본사·금감원 출신 손해사정사 × 메이저대학병원 의료진</h1>
        <p className="lead">교통·상해·생명·의료 분쟁, <b>전문가 풀팀</b>으로 입증하고 이깁니다. 
        후유장해·사망·부상 전 항목 <b>정밀 시뮬레이션</b> 지원.</p>
        <div className="tagline" style={{marginTop:12}}>
          <span className="pill">후유장해/사망 자동 계산</span>
          <span className="pill">일용노임 기본 3,248,613원</span>
          <span className="pill">간병비 129,945원/일 자동</span>
          <span className="pill">후기 자동 슬라이더</span>
        </div>
        <div style={{display:'flex',gap:12,marginTop:18,flexWrap:'wrap'}}>
          <Link className="btn primary" href="/simulator">시뮬레이터 열기</Link>
          <a className="btn" href="tel:01039339493">전화 010-3933-9493</a>
          <a className="btn" href="https://open.kakao.com/o/sNpCmpXc" target="_blank">카카오톡 상담</a>
        </div>
      </section>

      <section className="section grid">
        <div className="card" style={{gridColumn:'span 8'}}>
          <div className="kicker">포인트</div>
          <h2 className="h2">왜 ‘가온’인가</h2>
          <ul>
            <li>검사·판사 출신 <b>소송 파트너 변호사</b> 협업</li>
            <li>보험사 본사·금감원 출신 <b>손해사정사</b>의 실무/협상</li>
            <li>메이저대학병원 출신 <b>의료심사팀</b>의 의학적 인과·MRA·맥브라이드 자문</li>
            <li>대인배상 전 항목(사망/후유장해/부상) <b>한도·산식 정확 반영</b></li>
          </ul>
          <div className="notice" style={{marginTop:10}}>
            치료 중 사망 등 복합사건: 각 항목별 한도로 별도 산정(예: 부상 1,000만 + 사망 1.5억 ⇒ 대인1 총 1.6억).
          </div>
        </div>
        <div className="card" style={{gridColumn:'span 4'}}>
          <div className="kicker">바로 상담</div>
          <h3>무료상담</h3>
          <p className="lead">전화 <a href="tel:01039339493">010-3933-9493</a><br/>
          카카오톡 <a href="https://open.kakao.com/o/sNpCmpXc" target="_blank">채널</a></p>
        </div>
      </section>

      <section className="section">
        <ReviewSlider items={reviews} />
      </section>
    </div>
  );
}

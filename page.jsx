import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = { title: '전문가 | 손해사정사무소 가온' };

export default function AboutPage(){
  return (
    <div>
      <Nav />
      <div className="container section">
        <div className="kicker">팀 소개</div>
        <h2>법률 · 손해사정 · 의료, 3각 체계</h2>
        <div className="grid cols-3">
          <div className="card">
            <h3>법률 자문단</h3>
            <ul>
              <li>검사·판사 출신 변호사 협업</li>
              <li>형사·민사 동시 전략 수립</li>
              <li>위자료 상향/과실 다툼 설계</li>
            </ul>
          </div>
          <div className="card">
            <h3>손해사정 본진</h3>
            <ul>
              <li>보험사 본사·금감원 출신</li>
              <li>경상자 규정·상급병실 쟁점</li>
              <li>상실수익/휴업손해 정밀 산정</li>
            </ul>
          </div>
          <div className="card">
            <h3>의료 자문</h3>
            <ul>
              <li>메이저 대학병원 의료심사 참여</li>
              <li>장해평가·인과관계 소견서</li>
              <li>수술·영상 판독, 치료 적정성 검토</li>
            </ul>
          </div>
        </div>
        <div className="hr" />
        <p className="small">* 필요 시 외부 전문의·법무법인과 제휴하여 사건 특성에 맞춘 태스크포스 구성</p>
      </div>
      <Footer />
    </div>
  );
}

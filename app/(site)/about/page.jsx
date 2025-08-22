export const metadata = { title: '가온 소개 | 손해사정사무소 가온' };

export default function AboutPage(){
  return (
    <div className="container py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">가온의 일하는 방식</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold">01. 항목별 한도 분리</h3>
          <p className="text-slate-700 mt-2">사망/부상/후유장해를 구분하여 각 항목별 한도를 끝까지 적용합니다.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">02. 증빙 중심 케이스메이킹</h3>
          <p className="text-slate-700 mt-2">의무기록·세무증빙·노무자료를 라인바이라인으로 재정리하여 협상력을 만듭니다.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">03. 멀티전문가 협업</h3>
          <p className="text-slate-700 mt-2">검사·판사 출신 변호사, 보험사 본사·금감원 출신 손해사정사, 메이저 대학병원 의료심사 의료진이 함께 움직입니다.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">04. 시뮬레이터로 투명 공개</h3>
          <p className="text-slate-700 mt-2">핵심 로직을 공개한 시뮬레이터로 ‘얼마나, 왜’ 를 고객과 공유합니다.</p>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container mt-10 md:mt-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="badge">손해사정사무소 가온</span>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            보험금, <span className="text-brand-700">원칙대로</span> 끝까지.<br/>
            실무 최전선 팀이 직접 해결합니다.
          </h1>
          <p className="text-slate-600 text-lg">
            검사·판사 출신 변호사, 보험사 본사·금융감독원 출신 손해사정사,
            그리고 메이저 대학병원 의료심사 출신 의료인이 한 팀으로 움직입니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/simulator" className="btn btn-primary">보상 시뮬레이터</Link>
            <a href="https://open.kakao.com/o/sNpCmpXc" target="_blank" rel="noreferrer" className="btn btn-ghost">카카오로 1분 상담</a>
          </div>
          <div className="text-sm text-slate-500">통화가 어려우면 카카오로 간편하게 상담받으세요.</div>
        </div>
        <div className="card p-6 md:p-8">
          <ul className="space-y-4 text-slate-800">
            <li>• 사망·부상·후유장해 항목별로 <b>정확한 한도</b> 구분</li>
            <li>• 일용노임단가 <b>자동 반영(연령고려)</b>, 직접 변경 가능</li>
            <li>• 간병비 <b>1일 129,945원</b> 자동 적용</li>
            <li>• 후기/사례는 <b>실제 합의 감각</b>으로 큐레이션</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

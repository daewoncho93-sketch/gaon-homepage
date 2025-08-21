
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">
            복잡한 손해사정,<br/>
            <span className="text-gaon-accent">가온</span>이 끝까지 책임집니다.
          </h1>
          <p className="mt-6 text-slate-600 text-lg">
            검사·판사 출신 변호사 + 보험사 본사·금감원 출신 손해사정사 + 메이저 대학병원 의료심사 출신 의료인의
            <span className="font-semibold"> 3중 검토</span>로 결과를 만듭니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/simulator" className="px-5 py-3 rounded-2xl bg-gaon-accent text-white font-semibold shadow hover:opacity-90">
              보상금 시뮬레이터
            </Link>
            <a href="tel:01039339493" className="px-5 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100">
              010-3933-9493
            </a>
            <a target="_blank" rel="noreferrer" href="https://open.kakao.com/o/sNpCmpXc"
               className="px-5 py-3 rounded-2xl border border-gaon-accent text-gaon-accent hover:bg-gaon-accent hover:text-white">
              카카오톡 무료상담
            </a>
          </div>
          <div className="mt-6 text-sm text-slate-500 typing-caret">
            * 후기 자동 슬라이드 · 실제 사건 변형 · 합의금 최소 2,000만원 이상 사례 기반
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl bg-slate-100 shadow-inner flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-gaon-gold text-xl font-semibold">핵심 전문성</div>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li>• 검사·판사 출신 변호사 협업</li>
                <li>• 보험사 본사·금융감독원 출신 손해사정</li>
                <li>• 메이저 대학병원 의료심사 의료인</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Header />

      <section className="section relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 to-white"/>
        <div className="container-narrow">
          <h1 className="text-3xl font-extrabold">전문가 약력</h1>
          <p className="mt-3 text-slate-600">보험금 분쟁을 끝까지 해결하는 가온의 이력입니다.</p>

          <div className="mt-8 grid lg:grid-cols-3 gap-8">
            {/* Profile card */}
            <div className="card">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-600 to-yellow-500" />
              <div className="mt-4 font-bold text-lg">손해사정사 조대원</div>
              <div className="text-slate-600 text-sm">손해사정사 등록번호 BD00001251</div>
              <div className="text-slate-600 text-sm">사업자등록번호 294-15-02475</div>
              <div className="mt-4 text-sm text-slate-700">
                인스TV 자동차보험 <b>교수</b> · 금융감독원 근무 · 보험사 본사 · 공제조합 출신.
              </div>
              <div className="mt-4">
                <a href="/contact" className="btn-primary">상담 요청</a>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-2">
              <ol className="relative border-s-2 border-slate-200 pl-6">
                {[
                  ['현재', '손해사정사무소 가온 대표'],
                  ['2023~2024', '인스TV 자동차보험 교수(강의·자문)'],
                  ['이전', '금융감독원 근무(보험 관련)'],
                  ['이전', '보험사 본사(손해사정/보상 정책)'],
                  ['이전', '공제조합 출신(보상/분쟁 조정)']
                ].map(([period, desc], i) => (
                  <li key={i} className="mb-6">
                    <div className="absolute -left-2.5 h-5 w-5 rounded-full bg-indigo-600" />
                    <div className="text-sm text-slate-500">{period}</div>
                    <div className="font-semibold">{desc}</div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 card">
                <div className="font-semibold mb-2">전문 분야</div>
                <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                  <li>교통사고 후유장해(척추·관절·신경)</li>
                  <li>뇌혈관/심혈관·암 진단비 분쟁</li>
                  <li>의료심사(대학병원 의료진 협업)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

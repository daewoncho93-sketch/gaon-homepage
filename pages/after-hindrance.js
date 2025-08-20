import Header from '../components/Header';
import Footer from '../components/Footer';

const KRW = (n) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n || 0)));

export default function AfterHindrance() {
  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-950 via-indigo-800 to-slate-900" />
        <div className="absolute inset-0 -z-0 opacity-20"
             style={{background:'radial-gradient(circle at 30% 20%, #F6E05E 0%, transparent 40%), radial-gradient(circle at 80% 10%, #F6E05E 0%, transparent 35%)'}} />
        <div className="container-narrow text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold">후유장해, 어디서부터 어떻게?</h1>
          <p className="mt-3 text-indigo-100">영구/한시장해 구분, 위자료·휴업손해·상실수익 계산 포인트, 준비 서류까지 한 번에 정리했습니다.</p>
          <div className="mt-6 flex gap-3">
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-5 py-3 font-semibold">
              무료 상담 받기
            </a>
            <a href="/simulator" className="inline-flex items-center gap-2 rounded-xl border border-white text-white px-5 py-3 font-semibold">
              간단 시뮬레이터
            </a>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section className="section">
        <div className="container-narrow grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-bold">후유장해 기본 개념</h2>
              <p className="mt-2 text-slate-600">
                치료 종결 후에도 남아있는 신체 기능상실(운동범위 제한, 감각저하 등)로서 <b>영구장해</b>와 <b>한시장해</b>로 나뉩니다.
                약관/특약에 따라 인정범위와 지급기준이 상이하므로 ‘진단명’보다 <b>기능장해 정도</b>가 핵심입니다.
              </p>
              <ul className="mt-4 list-disc ml-5 text-slate-700 space-y-1">
                <li>영구장해: 고착 상태(호전 가능성 낮음). AMA·McBride·고시 기준 활용</li>
                <li>한시장해: 일정기간 기능저하. 약관/특약에서 제외되는 경우가 있어 약관검토 필수</li>
                <li>ADL(일상생활동작) 제한 정도가 인정 폭을 좌우</li>
              </ul>
            </div>

            <div className="card mt-6">
              <h3 className="font-semibold">보험사 기준 vs 소송 기준(개념 비교)</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="py-2 pr-4">항목</th>
                      <th className="py-2 pr-4">보험사 실무</th>
                      <th className="py-2">소송 시 경향(일반론)</th>
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    <tr className="border-t">
                      <td className="py-2 pr-4 font-semibold">위자료</td>
                      <td className="py-2 pr-4">내부기준/진단명/장해율 중심</td>
                      <td className="py-2">사안에 따라 상향 인정 가능(책임·과실·악질성)</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 pr-4 font-semibold">휴업손해</td>
                      <td className="py-2 pr-4">세후소득 일부, 회사지급분 공제 등 보수적</td>
                      <td className="py-2">실소득/증빙 폭넓게 반영 가능</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 pr-4 font-semibold">상실수익</td>
                      <td className="py-2 pr-4">노동능력상실률/기대여명 보수적 산정</td>
                      <td className="py-2">직업·경력·특수성 반영 여지</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 pr-4 font-semibold">의학자료</td>
                      <td className="py-2 pr-4">영상·검사 수치 위주</td>
                      <td className="py-2">영상+ADL·직무요건·전·후상태 종합</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate-500">※ 실제 결과는 사실관계·약관·판례에 따라 달라질 수 있습니다.</p>
            </div>

            <div className="card mt-6">
              <h3 className="font-semibold">자주 붙는 쟁점</h3>
              <ul className="mt-3 grid md:grid-cols-2 gap-3 text-slate-700 text-sm">
                <li className="rounded-xl border p-3">한시장해 약관 제외 여부</li>
                <li className="rounded-xl border p-3">사전병증(골다공증, 퇴행성)과의 기여도</li>
                <li className="rounded-xl border p-3">영상소견 vs 기능장해(ROM/근력/감각) 불일치</li>
                <li className="rounded-xl border p-3">ADL 제한 및 직무수행 영향도</li>
                <li className="rounded-xl border p-3">진단명(코드)와 약관 정의의 괴리</li>
                <li className="rounded-xl border p-3">자문의/위원회 의견과의 차이</li>
              </ul>
            </div>
          </div>

          {/* 사이드 */}
          <aside className="space-y-6">
            <div className="card">
              <h3 className="font-semibold">필수 준비서류</h3>
              <ul className="mt-2 text-sm text-slate-700 space-y-1">
                <li>진단서/소견서, 수술기록지, 통원·재활 내역</li>
                <li>MRI/CT/X-ray, 기능평가(ROM/근력/감각)</li>
                <li>ADL 평가(예: K-MBI), 직무 관련 증빙</li>
                <li>보험증권/약관(특약 포함)</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="font-semibold">빠른 상담</h3>
              <div className="mt-2 text-sm space-y-2">
                <a className="text-indigo-700 hover:underline" href="tel:01039339493">📞 010-3933-9493</a><br/>
                <a className="text-indigo-700 hover:underline" href="mailto:daewoncho@naver.com">✉️ daewoncho@naver.com</a><br/>
                <a className="text-indigo-700 hover:underline" target="_blank" rel="noreferrer" href="https://open.kakao.com/o/sNpCmpXc">💬 카카오 오픈채팅</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 예시 계산 */}
      <section className="section bg-slate-50">
        <div className="container-narrow card">
          <h3 className="font-semibold">예시: 척추 압박골절 영구장해 20% 가정</h3>
          <p className="mt-2 text-slate-600 text-sm">
            가입금액 3억 기준일 때, 장해율 20% → 예상 범위 {KRW(300000000*0.2)} 전후. (ADL·직업·연령에 따라 가감)
          </p>
          <p className="mt-2 text-xs text-slate-500">※ 예시는 참고용입니다. 실제 산정은 약관·의학·인과관계·판례를 종합합니다.</p>
          <div className="mt-4">
            <a href="/simulator" className="btn-primary">세부 시뮬레이터로 계산</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

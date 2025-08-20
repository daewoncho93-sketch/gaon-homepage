import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

const FEATURES = [
  '금융감독원·손해사정사 교수',
  '보험사 본사·공제조합 출신',
  '대학병원 의료심사 협업',
  'AMA·McBride 기준'
];

const REVIEWS = [
  { name: '김**', date: '2025-08-16', stars: 5, text: '타사 2곳 불가였는데, 가온에서 자료 재구성 후 승인까지 받았습니다.' },
  { name: '백**', date: '2025-08-15', stars: 5, text: '보험사 본사 경험으로 약관 포인트를 정확히 짚어 주셨습니다. 다른 곳은 안됐는데 여기서 됐어요.' },
  { name: '최**', date: '2025-08-13', stars: 5, text: 'I67.8 쟁점에서 K-MBI/ADL 평가 반영해 인정. 자료 묶는 방식이 달랐습니다.' }
];

export default function Home() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % REVIEWS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-950 via-indigo-800 to-slate-900" />
        <div className="absolute inset-0 -z-0 opacity-20" style={{background:'radial-gradient(circle at 30% 20%, #F6E05E 0%, transparent 40%), radial-gradient(circle at 80% 10%, #F6E05E 0%, transparent 35%)'}} />
        <div className="container-narrow grid lg:grid-cols-2 gap-10 items-center text-white">
          <div>
            <div className="badge bg-white/15 text-white border border-white/20">Premium Claims Advisory</div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              보험금, 끝까지 받아드립니다 — <span className="text-yellow-300">손해사정사무소 가온</span>
            </h1>
            <p className="mt-4 text-indigo-100 text-lg">
              의학·약관·판례를 결합한 정밀 손해사정. 데이터 기반 시뮬레이터와 전문가 컨설팅으로 빠르게 방향을 잡고, 끝까지 함께합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/simulator" className="btn-primary bg-yellow-500 hover:bg-yellow-400 text-slate-900">3분 예측</a>
              <a href="/contact" className="btn-ghost border-white text-white">지금 상담하기</a>
            </div>
            <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {FEATURES.map((t) => (<li key={t} className="rounded-xl px-3 py-2 border border-white/20 bg-white/10">{t}</li>))}
            </ul>
          </div>

          <div className="card bg-white/95">
            <div className="font-semibold mb-2">빠른 길 찾기</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['후유장해 가이드', '/after-hindrance'],
                ['시뮬레이터', '/simulator'],
                ['약력', '/about'],
                ['FAQ', '/faq'],
                ['상담', '/contact']
              ].map(([label, href]) => (
                <a key={label} href={href} className="rounded-xl border px-3 py-2 hover:bg-slate-50">{label}</a>
              ))}
            </div>
            <div className="mt-4 text-xs text-slate-500">※ 실제 지급여부는 약관·진단확정·의학적 인과관계에 따라 달라질 수 있습니다.</div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-3xl font-extrabold">후기</h2>
          <p className="mt-3 text-slate-600">“다른 데서는 안된다던 케이스가 여기서 해결됐어요.” 익명 후기(자동 회전)</p>

          <div className="mt-6 card">
            <div className="flex items-center gap-2 text-yellow-500">
              {'★★★★★'.slice(0, REVIEWS[idx].stars)}
            </div>
            <div className="mt-2 text-slate-800 font-semibold">
              {REVIEWS[idx].name} <span className="text-slate-400 font-normal text-sm ml-1">{REVIEWS[idx].date}</span>
            </div>
            <p className="mt-2 text-slate-600">{REVIEWS[idx].text}</p>
            <div className="mt-4 flex gap-2">
              {REVIEWS.map((_, i) => (<span key={i} className={"h-2 w-2 rounded-full " + (i===idx ? "bg-indigo-600" : "bg-slate-300")} />))}
            </div>
          </div>
        </div>
      </section>

      {/* Medical */}
      <section className="section bg-slate-50">
        <div className="container-narrow">
          <h2 className="text-3xl font-extrabold">의료심사</h2>
          <p className="mt-3 text-slate-600">메이저 대학병원 경력 의료진이 영상·임상·검사자료를 검토하고, 약관·판례 포인트와 결합해 설득력 있게 구성합니다.</p>
          <ul className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
            {['영상/검사 리뷰(MRI/CT/안·이비인후)', '진단확정/인과관계 쟁점 정리', '손해사정서/이의신청서 의료 파트 작성'].map((t)=>(
              <li key={t} className="card">{t}</li>
            ))}
          </ul>
          <div className="mt-6"><a href="/about" className="btn-primary">전문가 약력 보기</a></div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-narrow card bg-indigo-50">
          <div className="font-semibold">바로 상담 연결</div>
          <div className="mt-3 flex flex-wrap gap-3">
            <a className="btn-primary" href="tel:01039339493">전화하기</a>
            <a className="btn-ghost" href="mailto:daewoncho@naver.com">메일 보내기</a>
            <a className="btn-ghost" target="_blank" rel="noreferrer" href="https://open.kakao.com/o/sNpCmpXc">카카오 오픈채팅</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import Header from '../components/Header';
import Footer from '../components/Footer';

const QA = [
  ['보험사가 거절하는 흔한 이유는?', '진단확정 미비, 인과관계 불충분, 약관 용어 해석 차이 등이 흔합니다. 가온은 판례·의학자료로 쟁점을 정리합니다.'],
  ['척추 골다공증이 있으면 지급이 안 되나요?', '반드시 불인정은 아닙니다. 영상·골밀도·ADL 등 종합 평가가 중요하며, 사전상태와 사고기여도를 구분해 접근합니다.'],
  ['자살보험금은 전면 면책인가요?', '심신상실/상실 상태 등의 쟁점에 따라 판례가 나뉩니다. 개별 사정이 중요해 상담이 필요합니다.']
];

export default function FAQ() {
  return (
    <div>
      <Header />
      <section className="section bg-slate-50">
        <div className="container-narrow">
          <h1 className="text-3xl font-extrabold">FAQ</h1>
          <div className="mt-6 space-y-3">
            {QA.map(([q, a], i) => (
              <details key={i} className="card">
                <summary className="font-semibold cursor-pointer">{q}</summary>
                <p className="mt-2 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

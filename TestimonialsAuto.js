
import { useEffect, useState } from 'react';

const REVIEWS = [
  {
    title: "못 받는다던 걸… 3,200만원 합의",
    body: "보험사에서 초기에 '치료 종결, 더 이상 불가'라고 해서 포기할뻔 했는데, 가온에서 자료정리부터 자문까지 다 해주셔서 결국 3,200만원으로 원만히 합의했습니다. 솔직히 아직도 실감이 안나요.",
    who: "30대 자영업자 / 경추 염좌"
  },
  {
    title: "초고액 후유장해 인정 (1억 8천)",
    body: "의학적 인과관계가 어렵다는 말만 들었는데 의료심사 출신 선생님이 방향을 잡아주셨고, 변호사님과 함께 소송까지 대비해 정리했습니다. 결국 1억 8천으로 마무리. 진짜 '되는 길'을 아는 팀.",
    who: "40대 회사원 / 족관절 심부건 손상"
  },
  {
    title: "안된대서 포기했는데 2,500만원 수령",
    body: "처음엔 300만원도 힘들다더군요. 손해사정사무소 가온에서 약관 해석과 판례기준으로 다시 계산해서 이의신청, 결국 2,500만원 받았습니다. 친절하고 똑똑합니다. 감사합니다.",
    who: "50대 주부 / 요추 추간판"
  },
  {
    title: "합의금 4,200만원 (치아·향후치료 포함)",
    body: "치아 보철이랑 향후치료비는 잘 안된다고 했는데… 다 챙겨주셨어요. 중간중간 설명이 진짜 이해가 잘 됐습니다.",
    who: "20대 대학생"
  }
];

export default function TestimonialsAuto() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="bg-slate-50 py-14">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold">실제 의뢰기반 후기 (자동 슬라이드)</h2>
        <div className="mt-6 relative">
          <div className="p-6 md:p-10 rounded-3xl bg-white shadow-md border">
            <div className="text-gaon-accent font-semibold">{REVIEWS[i].title}</div>
            <p className="mt-3 text-slate-700 leading-relaxed">{REVIEWS[i].body}</p>
            <div className="mt-4 text-sm text-slate-500">{REVIEWS[i].who}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

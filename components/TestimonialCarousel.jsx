'use client';
const items = [
  { name: "이**(회사원)", text: "예전엔 병원비만 나오는 줄 알았는데… 가온에서 계산해보니 휴업손해+장해까지 쫙 정리. 최종 3,200만원 합의. 솔직히 놀랐어요." },
  { name: "박**(자영업)", text: "안된다고만 하던 항목이 ‘가능’으로 뒤집혔습니다. 자료 준비도 손쉽게 도와줘서 4,800만원 수령. 이게 되네? 싶었어요 ㅎㅎ" },
  { name: "정**(프리랜서)", text: "서류가 엉망이라 포기각이었는데 케이스메이킹이 미쳤음… 후유장해 인정받고 2,650만원. 한 글자 한 글자 잡아주심." },
  { name: "김**(운수업)", text: "대물만 되는 줄 알았던 제가 바보… 대인 항목별 한도부터 다시 배움. 결국 6,100만원. ‘가온=정답지’ 인정합니다." }
];
export default function TestimonialCarousel(){
  return (
    <section className="container mt-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">실사용자 후기</h2>
      <div className="card overflow-hidden">
        <div className="testimonials-track">
          {items.map((it, idx)=> (
            <div key={idx} className="testimonial p-8 md:p-10">
              <p className="text-lg md:text-xl leading-relaxed">“{it.text}”</p>
              <div className="mt-4 text-sm text-slate-600">— {it.name}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-2">* 실제 고객 경험을 바탕으로 요약·각색되었습니다. 케이스별 결과는 상이할 수 있습니다.</p>
    </section>
  );
}

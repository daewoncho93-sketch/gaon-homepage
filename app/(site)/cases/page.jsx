export const metadata = { title: "사례 | 손해사정사무소 가온" };
const items = [
  { title:"치료 중 사망… 항목별 한도 분리로 극대화", sum:"부상/사망 한도 오해 바로잡고 상실수익액+위자료+장례비로 재산정", amount:"합의 1.9억" },
  { title:"경추 골절 후유장해 24% 인정", sum:"의무기록 재정리, 노동능력상실률 타당성 보강", amount:"증액 +6,200만" },
  { title:"경상자 통원, 휴업손해+향후치료비 반영", sum:"지법 레퍼런스로 통원휴손 3일=1일 가이드 제시", amount:"합의 480만 → 1,050만" }
];
export default function Cases(){
  return (
    <div className="space-y-4">
      {items.map((c,i)=>(
        <div key={i} className="card">
          <div className="flex items-center justify-between">
            <h2>{c.title}</h2>
            <div className="text-brand-700 font-bold">{c.amount}</div>
          </div>
          <p className="text-brand-700">{c.sum}</p>
        </div>
      ))}
    </div>
  );
}

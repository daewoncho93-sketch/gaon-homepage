export const metadata = { title: '전문가 | 손해사정사무소 가온' };

const TEAM = [
  { name: "최가온", role: "대표 손해사정사", desc: "보험사 본사 출신 · 대인/후유장해 집중 · 실무 10+년" },
  { name: "한○○", role: "변호사(협업)", desc: "검사·판사 출신, 손해배상/보험소송 다수" },
  { name: "이○○", role: "손해사정사", desc: "금융감독원 민원·분쟁조정 경험" },
  { name: "박○○", role: "의료심사 자문", desc: "메이저 대학병원 의료심사 경력, 정형외과·신경외과 라인" },
];

export default function TeamPage(){
  return (
    <div className="container py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">전문가 소개</h1>
      <p className="text-slate-600 mb-6">검사·판사 출신 변호사 · 보험사 본사·금감원 출신 손해사정사 · 메이저 대학병원 의료심사 출신 의료진.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {TEAM.map((m, idx)=> (
          <div key={idx} className="card p-6">
            <div className="text-sm text-slate-500">#{idx+1}</div>
            <div className="text-lg font-bold">{m.name}</div>
            <div className="text-brand-700 font-medium">{m.role}</div>
            <p className="text-slate-700 mt-2">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

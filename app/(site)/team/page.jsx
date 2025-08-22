export const metadata = { title: "전문가 | 손해사정사무소 가온" };
const people = [
  { role:"손해사정사(대표)", name:"가온 이", desc:"보험사 본사 대인보상/특수사고 10년, 금감원 민원/분쟁 실무" },
  { role:"자문 변호사", name:"홍 모", desc:"검사·판사 출신, 교통사고·손해배상 소송" },
  { role:"의료심사", name:"김 모", desc:"메이저 대학병원 의료심사팀 출신, 신경외과/정형외과" }
];
export default function Team(){
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {people.map((p,i)=>(
        <div key={i} className="card">
          <div className="text-sm text-brand-600">{p.role}</div>
          <div className="text-xl font-bold">{p.name}</div>
          <div className="text-sm text-brand-700">{p.desc}</div>
        </div>
      ))}
    </div>
  );
}

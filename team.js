
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const LIST = [
  {role:"변호사", desc:"검사·판사 출신 네트워크와 협업하여 소송 단계까지 한 흐름으로 대비"},
  {role:"손해사정사", desc:"보험사 본사·금융감독원 출신으로 약관·지침·실무를 정확히 집행"},
  {role:"의료인", desc:"메이저 대학병원 의료심사 출신으로 의학적 인과관계·감정 포인트 정리"},
];

export default function Team(){
  return (
    <>
      <Head><title>전문가 소개 | 손해사정사무소 가온</title></Head>
      <NavBar/>
      <main className="container py-12">
        <h1 className="text-2xl md:text-3xl font-extrabold">전문가 네트워크</h1>
        <p className="mt-2 text-slate-600">사건 유형에 따라 최적의 조합으로 투입합니다.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {LIST.map((m,i)=>(
            <div key={i} className="p-6 rounded-2xl border bg-white">
              <div className="text-gaon-accent font-semibold">{m.role}</div>
              <p className="mt-2 text-slate-700">{m.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer/>
    </>
  )
}

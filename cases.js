
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CaseCard from '@/components/CaseCard';

const CASES = [
  {
    title: "치료 중 사망 사건 – 대인1 한도 정확 적용",
    tags: ["사망","대인배상","상실수익"],
    amount: "1억 6,000만원",
    body: "치료비 1,000만원 + 사망항목 1억 5,000만원(위자료·장례비·상실수익)로 항목별 한도 구분하여 대인1 1.6억 수령."
  },
  {
    title: "무입증 소득 – 일용노임 자동 적용",
    tags: ["부상","휴업손해"],
    amount: "2,300만원",
    body: "소득증빙 곤란하여 일용노임 월 3,248,613원(20일 기준)을 적용해 휴업손해+위자료+기타손해 정산."
  },
  {
    title: "후유장해 60% – 기준위자료 산정 + 상실수익",
    tags: ["후유장해","상실수익"],
    amount: "8,100만원",
    body: "65세 미만 기준위자료 4,500만원×상실률×85% 적용, 호프만계수로 상실수익액 산정."
  },
  {
    title: "간병비 쟁점 – 상해3급, 28일 입원",
    tags: ["부상","간병비"],
    amount: "2,700만원",
    body: "상해3급 한도 30일 중 실제 28일 전액 인정(129,945원/일), 휴업손해와 합산."
  }
];

export default function Cases(){
  return (
    <>
      <Head><title>사례 모음 | 손해사정사무소 가온</title></Head>
      <NavBar/>
      <main className="container py-12">
        <h1 className="text-2xl md:text-3xl font-extrabold">사례</h1>
        <p className="mt-2 text-slate-600">실제 사건을 변형·가공하여 개인정보를 보호했습니다. 최소 합의·보상금 2,000만원 이상 위주.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {CASES.map((c,i)=>(<CaseCard key={i} {...c}/>))}
        </div>
      </main>
      <Footer/>
    </>
  )
}

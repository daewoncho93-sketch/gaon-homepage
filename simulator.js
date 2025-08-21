
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SimulatorCore from '@/components/SimulatorCore';

export default function Simulator(){
  return (
    <>
      <Head>
        <title>보상금 시뮬레이터 | 손해사정사무소 가온</title>
      </Head>
      <NavBar/>
      <main className="container py-10">
        <h1 className="text-2xl md:text-3xl font-extrabold">보상금 시뮬레이터</h1>
        <p className="mt-2 text-slate-600">입력값이 비어있으면 일용노임단가(월 3,248,613원)가 자동 적용됩니다. 62세 이상 특칙과 농·어업 70세 규정도 반영.</p>
        <div className="mt-6">
          <SimulatorCore/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

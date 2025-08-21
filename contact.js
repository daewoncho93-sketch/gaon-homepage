
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Contact(){
  return (
    <>
      <Head><title>연락처 | 손해사정사무소 가온</title></Head>
      <NavBar/>
      <main className="container py-12">
        <h1 className="text-2xl md:text-3xl font-extrabold">무료 상담</h1>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border bg-white">
            <div className="text-sm text-slate-500">전화</div>
            <a href="tel:01039339493" className="text-xl font-bold mt-1 inline-block">010-3933-9493</a>
            <div className="mt-4 text-sm text-slate-500">카카오톡 채널</div>
            <a target="_blank" rel="noreferrer" href="https://open.kakao.com/o/sNpCmpXc" className="text-gaon-accent underline">https://open.kakao.com/o/sNpCmpXc</a>
          </div>
          <div className="p-6 rounded-2xl border bg-slate-50">
            <div className="font-semibold">빠른 상담 팁</div>
            <ul className="list-disc ml-5 mt-2 text-slate-700 space-y-1 text-sm">
              <li>사고일시·장소·경위</li>
              <li>진단명·입퇴원·통원 기록</li>
              <li>소득증빙 여부(미입증도 가능)</li>
              <li>합의 제시액이 있는 경우 금액</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

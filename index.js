
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import TestimonialsAuto from '@/components/TestimonialsAuto';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home(){
  return (
    <>
      <Head>
        <title>손해사정사무소 가온 | 교통사고·의료·산재 전문 손해사정</title>
        <meta name="description" content="검사·판사 출신 변호사, 보험사 본사·금감원 출신 손해사정사, 메이저 대학병원 의료심사 출신 의료인이 함께하는 손해사정사무소 가온"/>
      </Head>
      <NavBar/>
      <main>
        <Hero/>
        <section className="container py-14 grid md:grid-cols-3 gap-6">
          {[
            {title:"대인배상(사망)",body:"위자료·장례비·상실수익액을 정확히 구분해 산정합니다."},
            {title:"대인배상(부상)",body:"적극손해, 휴업손해, 간병비, 기타손해를 약관대로 빠짐없이."},
            {title:"후유장해",body:"노동능력상실률·가동연한·호프만계수까지 한 번에 계산."}
          ].map((c,i)=>(
            <div key={i} className="p-6 rounded-2xl border shadow-sm">
              <div className="text-gaon-accent font-semibold">전문 분야</div>
              <div className="mt-1 font-bold text-xl">{c.title}</div>
              <p className="mt-2 text-slate-700">{c.body}</p>
              <Link href="/simulator" className="inline-block mt-4 text-sm text-gaon-accent">시뮬레이터로 확인 →</Link>
            </div>
          ))}
        </section>
        <TestimonialsAuto/>
        <section className="container py-14">
          <div className="rounded-3xl bg-slate-50 p-8 md:p-10 border">
            <div className="text-lg md:text-xl font-semibold">핵심 포인트</div>
            <ul className="mt-4 grid md:grid-cols-3 gap-4 text-slate-700">
              <li className="p-4 rounded-xl bg-white border">검사·판사 출신 <b>변호사</b>와 협업</li>
              <li className="p-4 rounded-xl bg-white border">보험사 본사·금융감독원 출신 <b>손해사정사</b></li>
              <li className="p-4 rounded-xl bg-white border">메이저 대학병원 의료심사 출신 <b>의료인</b> 자문</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="tel:01039339493" className="px-4 py-2 rounded-xl bg-gaon-accent text-white">전화 상담</a>
              <a target="_blank" rel="noreferrer" href="https://open.kakao.com/o/sNpCmpXc" className="px-4 py-2 rounded-xl border border-gaon-accent text-gaon-accent">카톡 상담</a>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}

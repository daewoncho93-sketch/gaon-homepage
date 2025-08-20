import Head from 'next/head'
import Link from 'next/link'
import Simulator from '@/components/Simulator'
import CaseSlider from '@/components/CaseSlider'
import LeadForm from '@/components/LeadForm'

export default function Home() {
  return (
    <div>
      <Head>
        <title>손해사정사무소 가온</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="의학·약관·판례를 결합한 정밀 손해사정 — 손해사정사무소 가온" />
      </Head>

      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <div className="container h-16 flex items-center justify-between">
          <Link href="#" className="font-extrabold tracking-tight text-lg sm:text-xl">손해사정사무소 가온</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#simulator" className="hover:text-indigo-600">보험금 시뮬레이터</a>
            <a href="#med" className="hover:text-indigo-600">의료심사</a>
            <a href="#reviews" className="hover:text-indigo-600">후기</a>
            <a href="#contact" className="hover:text-indigo-600">상담</a>
          </nav>
          <a href="tel:01039339493" className="btn btn-primary hidden sm:inline-flex">바로 전화</a>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 gradient" />
        <div className="container py-14 md:py-20 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="badge bg-slate-900 text-white">Premium Claims Advisory</div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
              의학·약관·판례를 결합한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">정밀 손해사정</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg">교통사고·의료심사·진단비 분쟁까지. <b>데이터 기반 시뮬레이터</b>와 <b>전문가 상담</b>으로 빠르게 방향을 잡고 끝까지 동행합니다.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#simulator" className="btn btn-primary">3분 예측</a>
              <a href="#contact" className="btn btn-outline">전문가와 상담</a>
              <a href="https://open.kakao.com/o/sNpCmpXc" target="_blank" rel="noreferrer" className="btn btn-outline">카카오 톡상담</a>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {[
                '금융감독원·보험사 본사·공제조합 출신',
                '인스TV 자동차보험 외래교수(손해사정)',
                'AMA·McBride 기준/이의신청·소명서',
                '카카오/전화 즉시상담·전국 대응'
              ].map((t,i)=>(
                <div key={i} className="bg-white/80 backdrop-blur rounded-xl px-3 py-2 border">{t}</div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-indigo-100 to-violet-100 blur-2xl" />
            <div className="card">
              <div className="font-semibold text-slate-800 mb-2">빠른 견적 미리보기</div>
              <Simulator />
            </div>
          </div>
        </div>
      </section>

      <section id="med" className="py-16">
        <div className="container">
          <h2 className="section-title">의료심사 · 메디컬 리뷰</h2>
          <p className="mt-2 text-slate-600">메이저 대학병원 출신 의료인이 병리·영상·임상 자료를 교차 검토하고 의학적 인과관계를 정밀하게 정리합니다.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {t:'병리/영상 재해석', d:'MRI·CT·병리 소견서 핵심 쟁점 정리 및 약관 기준 매칭'},
              {t:'진단확정/분쟁', d:'암·뇌혈관·심혈관 진단/추가검사 검토, 이의신청 자료 작성'},
              {t:'의문소견 자문', d:'외부 전문과 협진 및 감정의뢰 레퍼런스 제공'},
            ].map((c,i)=>(
              <div key={i} className="card">
                <div className="font-bold">{c.t}</div>
                <p className="mt-2 text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="section-title">실제 후기 (익명화)</h2>
          <p className="mt-2 text-slate-600">“다른 데서는 어렵다던 사건, 여기서는 해결합니다.” 자동으로 새로운 후기가 순환 표시됩니다.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <CaseSlider /><CaseSlider /><CaseSlider />
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="container grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="section-title">무료 상담 요청</h2>
            <p className="mt-2 text-slate-600">간단히 남겨주시면 담당 손해사정사가 연락드립니다. (평일 09:00~18:00)</p>
            <div className="mt-6"><LeadForm /></div>
            <div className="mt-4 text-xs text-slate-500">※ 실제 사건은 계약·진단·의학적 사정을 종합하여 개별 검토합니다.</div>
          </div>
          <div className="card bg-slate-50">
            <div className="font-semibold text-slate-800">연락처</div>
            <div className="mt-3 space-y-2 text-slate-700">
              <div>전화: <a className="text-indigo-600 font-semibold" href="tel:01039339493">010-3933-9493</a></div>
              <div>이메일: <a className="text-indigo-600 font-semibold" href="mailto:daewoncho@naver.com">daewoncho@naver.com</a></div>
              <div>카카오톡: <a className="text-indigo-600 font-semibold" href="https://open.kakao.com/o/sNpCmpXc" target="_blank" rel="noreferrer">채팅 열기</a></div>
              <div>지역: 전국 대응</div>
            </div>
            <div className="mt-6">
              <div className="font-semibold text-slate-800">주요 약력</div>
              <ul className="mt-2 text-sm text-slate-700 list-disc ml-5 space-y-1">
                <li>인스TV 자동차보험 손해사정 외래 교수</li>
                <li>금융감독원 · 보험사 본사 · 공제조합 출신</li>
                <li>AMA·McBride 기준 산정 / 손해사정서·이의신청</li>
                <li>여성가족부 청소년복지위원 / 한국손해사정정책협회</li>
                <li>손해사정사 등록번호 BD00001251</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t bg-white">
        <div className="container text-sm text-slate-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900">손해사정사무소 가온</div>
              <div className="mt-1">사업자등록번호 294-15-02475 · 손해사정사 등록번호 BD00001251</div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#simulator" className="hover:text-indigo-600">보험금 시뮬레이터</a>
              <a href="#med" className="hover:text-indigo-600">의료심사</a>
              <a href="#reviews" className="hover:text-indigo-600">후기</a>
              <a href="#contact" className="hover:text-indigo-600">상담</a>
            </div>
          </div>
          <div className="mt-4">© 2017 GAON Loss Adjusters. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

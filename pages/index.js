import Link from "next/link";
import { Phone, Mail, MessageCircle, Calculator, ShieldCheck, ArrowRight, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-extrabold flex items-center justify-center">GAON</div>
            <div className="font-extrabold tracking-tight">손해사정사무소 가온</div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="/simulator" className="hover:text-indigo-600">시뮬레이터</Link>
            <a href="#reviews" className="hover:text-indigo-600">후기</a>
            <a href="#contact" className="hover:text-indigo-600">상담</a>
          </nav>
          <a href="tel:01039339493" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-semibold">
            <Phone className="w-4 h-4"/> 전화
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />
          <div className="container py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy text-white text-xs font-semibold">Premium Claims Advisory</div>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                의학·약관·판례를 결합한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">정밀 손해사정</span>
              </h1>
              <p className="mt-4 text-slate-600 text-lg leading-relaxed">
                교통·산재·배상부터 개인/단체보험까지. 데이터 기반 <b>시뮬레이터</b>와 <b>의료심사</b>로 빠르게 방향을 잡습니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/simulator" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-semibold">
                  <Calculator className="w-5 h-5"/> 3분 예측
                </Link>
                <a href="https://open.kakao.com/o/sNpCmpXc" target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:border-indigo-300 hover:text-indigo-700">
                  <MessageCircle className="w-5 h-5"/> 카카오 상담
                </a>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {[
                  { icon: ShieldCheck, label: "금융감독원 출신" },
                  { icon: Users, label: "손해사정사 교수" },
                  { icon: ShieldCheck, label: "보험사 본사·공제조합" },
                  { icon: Calculator, label: "의료심사·데이터" },
                ].map(({ icon:Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-white/70 backdrop-blur rounded-xl px-3 py-2 border">
                    <Icon className="w-4 h-4 text-indigo-600"/>
                    <div>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border bg-white p-6 shadow-xl">
              <div className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600"/> 빠른 미리보기
              </div>
              <p className="text-sm text-slate-600">상세한 예측은 시뮬레이터에서.</p>
              <Link href="/simulator" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy text-white px-4 py-3 font-semibold">
                시뮬레이터 바로가기 <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-16 bg-slate-50">
          <div className="container">
            <h2 className="text-2xl font-extrabold">실시간 후기</h2>
            <p className="mt-2 text-slate-600 text-sm">“다른 곳에선 안 됐는데, 여기선 됐습니다.”</p>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {["김**","백**","정**","이**","최**","박**"].map((name, i)=>(
                <div key={i} className="rounded-2xl border bg-white p-4">
                  <div className="font-semibold">{name} 고객</div>
                  <p className="mt-2 text-sm text-slate-600">거절 2곳 → 자료 재구성 후 승인. ADL·영상 중심으로 논리 재정비.</p>
                  <div className="mt-2 text-xs text-slate-500">{new Date().toISOString().slice(0,10)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-extrabold">상담</h2>
              <p className="mt-2 text-slate-600 text-sm">빠르게 도와드릴게요.</p>
              <div className="mt-4 space-y-2 text-slate-700">
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-600"/> <a href="tel:01039339493" className="underline">010-3933-9493</a></div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-600"/> <a href="mailto:daewoncho@naver.com" className="underline">daewoncho@naver.com</a></div>
                <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-indigo-600"/> <a href="https://open.kakao.com/o/sNpCmpXc" target="_blank" className="underline">카카오 오픈채팅</a></div>
              </div>
            </div>
            <div className="rounded-2xl border p-4 bg-slate-50">
              <div className="font-semibold">바로가기</div>
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/simulator" className="rounded-xl bg-indigo-600 text-white px-4 py-2 font-semibold">보험금 시뮬레이터</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t bg-white">
        <div className="container text-sm text-slate-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900">손해사정사무소 가온</div>
              <div className="mt-1">사업자등록번호 294-15-02475 · 손해사정사 등록번호 BD00001251</div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/simulator" className="hover:text-indigo-600">시뮬레이터</Link>
            </div>
          </div>
          <div className="mt-4">© 2017 GAON Loss Adjusters. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

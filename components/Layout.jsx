import Link from "next/link"
import HeadMeta from "./HeadMeta"

export default function Layout({ children, title, desc }){
  return (
    <div className="min-h-screen flex flex-col">
      <HeadMeta title={title} desc={desc} />
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="container flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500" />
            <div className="font-extrabold text-lg">GAON 손해사정</div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="navlink" href="/simulator">시뮬레이터</Link>
            <Link className="navlink" href="/guide">가이드</Link>
            <Link className="navlink" href="/reviews">후기</Link>
            <Link className="navlink" href="/about">약력</Link>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn btn-primary">무료 상담</a>
          </div>
        </div>
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="container py-2 text-sm text-slate-700">
            <span className="mr-2">핵심</span>
            <span className="badge">검사·판사 출신 변호사</span>
            <span className="mx-2">/</span>
            <span className="badge">보험사 본사·금감원 출신 손해사정사</span>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200">
        <div className="container py-8 grid md:grid-cols-3 gap-8 text-sm text-slate-600">
          <div>
            <div className="font-bold text-slate-900">GAON 손해사정</div>
            <p className="mt-2">교통사고 · 산재 · 보험분쟁 전문.</p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">바로가기</div>
            <ul className="mt-2 space-y-1">
              <li><Link className="navlink" href="/simulator">시뮬레이터</Link></li>
              <li><Link className="navlink" href="/guide">가이드</Link></li>
              <li><Link className="navlink" href="/reviews">후기</Link></li>
              <li><Link className="navlink" href="/about">약력</Link></li>
            </ul>
          </div>
          <div id="contact">
            <div className="font-semibold text-slate-900">무료 상담</div>
            <p className="mt-2">전화 02-000-0000 · 카카오톡 채널 “가온손해사정”</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

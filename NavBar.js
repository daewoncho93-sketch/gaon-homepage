
import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <nav className="container py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="손해사정사무소 가온" className="h-8 w-auto"/>
          <span className="sr-only">손해사정사무소 가온</span>
        </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li><Link href="/simulator" className="hover:text-gaon-accent">시뮬레이터</Link></li>
          <li><Link href="/cases" className="hover:text-gaon-accent">사례</Link></li>
          <li><Link href="/team" className="hover:text-gaon-accent">전문가</Link></li>
          <li><Link href="/contact" className="hover:text-gaon-accent">연락처</Link></li>
        </ul>
        <div className="flex items-center gap-3">
          <a href="tel:01039339493" className="px-3 py-1.5 rounded-xl bg-gaon-accent text-white text-sm shadow hover:opacity-90">
            무료상담 010-3933-9493
          </a>
          <a target="_blank" rel="noreferrer" href="https://open.kakao.com/o/sNpCmpXc"
             className="px-3 py-1.5 rounded-xl border border-gaon-accent text-gaon-accent text-sm hover:bg-gaon-accent hover:text-white">
            카톡 상담
          </a>
        </div>
      </nav>
    </header>
  )
}

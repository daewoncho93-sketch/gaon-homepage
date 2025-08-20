export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
      <div className="container-narrow h-16 flex items-center justify-between">
        <a href="/" className="font-extrabold tracking-tight text-lg md:text-xl">
          손해사정사무소 가온
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <a href="/simulator" className="hover:text-indigo-600">시뮬레이터</a>
          <a href="/about" className="hover:text-indigo-600">약력</a>
          <a href="/faq" className="hover:text-indigo-600">FAQ</a>
          <a href="/contact" className="hover:text-indigo-600">상담</a>
        </nav>
        <a href="/contact" className="btn-primary hidden sm:inline-flex">무료상담</a>
      </div>
    </header>
  );
}

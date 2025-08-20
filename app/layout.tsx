import "./globals.css";

export const metadata = {
  title: "손해사정사무소 가온",
  description: "교통사고 · 보험금 분쟁 · 후유장해 전문 손해사정",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <a href="/" className="font-extrabold tracking-tight">손해사정사무소 가온</a>
            <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold">
              <a href="#about" className="hover:text-indigo-600">소개</a>
              <a href="#cases" className="hover:text-indigo-600">사례</a>
              <a href="#calculator" className="hover:text-indigo-600">계산기</a>
              <a href="#contact" className="hover:text-indigo-600">상담</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="py-8 mt-16 border-t">
          <div className="max-w-6xl mx-auto px-6 text-sm text-slate-600 flex flex-col gap-2">
            <div className="font-semibold">손해사정사무소 가온</div>
            <div>손해사정사 등록번호 BD00001251 · 사업자등록번호 294-15-02475</div>
            <div>© {new Date().getFullYear()} GAON Loss Adjusters. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}

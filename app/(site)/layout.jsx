import "./../../styles/globals.css";
import Link from "next/link";

export const metadata = {
  title: "손해사정사무소 가온",
  description: "검사·판사 출신 변호사 / 보험사 본사·금융감독원 출신 손해사정사 / 메이저 대학병원 의료심사 출신 의료인 협업",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="font-black text-brand-700 text-xl">손해사정사무소 가온</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/about">소개</Link>
              <Link href="/team">전문가</Link>
              <Link href="/cases">사례</Link>
              <Link href="/simulator" className="btn-primary">보상 시뮬레이터</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="mt-12 border-t">
          <div className="container py-6 text-sm flex flex-col md:flex-row gap-2 md:gap-6 md:items-center">
            <div>© {new Date().getFullYear()} 손해사정사무소 가온</div>
            <div>무료상담 010-3933-9493</div>
            <div><a href="https://open.kakao.com/o/sNpCmpXc" target="_blank" rel="noreferrer">카카오톡 채널</a></div>
          </div>
        </footer>
      </body>
    </html>
  );
}

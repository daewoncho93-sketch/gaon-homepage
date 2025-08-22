'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: '홈' },
  { href: '/simulator', label: '보상 시뮬레이터' },
  { href: '/cases', label: '사례' },
  { href: '/team', label: '전문가' },
  { href: '/about', label: '소개' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-brand-600 text-white grid place-items-center font-bold">GA</div>
          <div className="font-semibold text-lg">손해사정사무소 가온</div>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {nav.map(i => (
            <Link key={i.href} href={i.href}
              className={`px-3 py-2 rounded-lg hover:bg-slate-100 transition ${pathname===i.href ? 'bg-slate-100' : ''}`}>
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:01039339493" className="btn btn-primary">무료상담 010-3933-9493</a>
          <a target="_blank" rel="noreferrer" href="https://open.kakao.com/o/sNpCmpXc" className="btn btn-ghost">카카오 상담</a>
        </div>
      </div>
    </header>
  );
}

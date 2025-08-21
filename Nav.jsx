'use client';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="nav">
      <div className="container nav-inner">
        <div className="brand">
          <span className="title">손해사정사무소 가온</span>
          <span className="subtitle">검사·판사 출신 변호사 / 보험사 본사·금감원 출신 손해사정사 / 메이저대학병원 의료심사 참여</span>
        </div>
        <div className="menu">
          <Link href="/">홈</Link>
          <Link href="/about">전문가</Link>
          <Link href="/cases">사례</Link>
          <Link href="/simulator">시뮬레이터</Link>
          <a href="tel:010-3933-9493" className="badge">무료상담 010-3933-9493</a>
        </div>
      </div>
    </div>
  );
}

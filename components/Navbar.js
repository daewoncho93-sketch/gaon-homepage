import Link from "next/link";

export default function Navbar(){
  return (
    <div className="nav">
      <div className="nav-inner">
        <div className="brand">
          <img src="/logo.svg" alt="logo" width="24" height="24"/>
          손해사정사무소 가온 <span className="tag">교통·상해·생명·의료</span>
        </div>
        <div className="menu">
          <Link href="/">홈</Link>
          <Link href="/simulator">시뮬레이터</Link>
          <Link href="/cases">사례</Link>
          <Link href="/experts">전문가 소개</Link>
          <Link href="/reviews">후기</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">연락하기</Link>
        </div>
      </div>
    </div>
  );
}

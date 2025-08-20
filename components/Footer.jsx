export default function Footer() {
  return (
    <footer className="py-10 border-t bg-white">
      <div className="container-narrow text-sm text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="font-bold text-slate-900">손해사정사무소 가온</div>
          <div className="mt-1">사업자등록번호 294-15-02475 · 손해사정사 등록번호 BD00001251</div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/after-hindrance" className="hover:text-indigo-600">후유장해</a>
          <a href="/simulator" className="hover:text-indigo-600">시뮬레이터</a>
          <a href="/about" className="hover:text-indigo-600">약력</a>
          <a href="/faq" className="hover:text-indigo-600">FAQ</a>
          <a href="/contact" className="hover:text-indigo-600">상담</a>
        </div>
      </div>
      <div className="container-narrow mt-4">© 2017 GAON Loss Adjusters. All rights reserved.</div>
    </footer>
  );
}

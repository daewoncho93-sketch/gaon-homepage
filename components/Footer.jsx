export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200">
      <div className="container py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-brand-600 text-white grid place-items-center font-bold">GA</div>
            <div className="font-semibold">손해사정사무소 가온</div>
          </div>
          <p className="text-slate-600 leading-relaxed">
            검사·판사 출신 변호사 협업 · 보험사 본사·금융감독원 출신 손해사정사 · 메이저 대학병원 의료심사 출신 의료진 동행.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">연락처</div>
          <ul className="space-y-1 text-slate-700">
            <li>무료상담: <a className="underline" href="tel:01039339493">010-3933-9493</a></li>
            <li>카카오톡 채널: <a className="underline" href="https://open.kakao.com/o/sNpCmpXc" target="_blank" rel="noreferrer">바로가기</a></li>
          </ul>
        </div>
        <div className="text-slate-500">
          © {new Date().getFullYear()} 손해사정사무소 가온. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

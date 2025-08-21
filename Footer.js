
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200">
      <div className="container py-10 text-sm text-slate-600 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold text-slate-800">손해사정사무소 가온</div>
          <div className="mt-2">전문 손해사정 · 교통사고 · 의료손해 · 산재</div>
          <div className="mt-1">무료상담 <a className="text-gaon-accent" href="tel:01039339493">010-3933-9493</a></div>
          <div className="mt-1"><a className="text-gaon-accent" target="_blank" rel="noreferrer" href="https://open.kakao.com/o/sNpCmpXc">카카오톡 채널</a></div>
        </div>
        <div>
          <div className="font-semibold text-slate-800">핵심 포인트</div>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>검사·판사 출신 변호사 협업</li>
            <li>보험사 본사·금융감독원 출신 손해사정사</li>
            <li>메이저 대학병원 의료심사 출신 의료인 자문</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-800">법적 고지</div>
          <p className="mt-2">
            본 시뮬레이터 결과는 참고용 추정치로 실제 보험금(합의금)과 다를 수 있습니다.
            세부 사고사실, 과실, 약관, 소송여부에 따라 달라집니다.
          </p>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-slate-500 bg-slate-50">© {new Date().getFullYear()} 손해사정사무소 가온. All rights reserved.</div>
    </footer>
  )
}

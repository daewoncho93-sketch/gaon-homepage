export default function ContactCTA() {
  return (
    <section className="container mt-16">
      <div className="card p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-xl md:text-2xl font-bold">보험금, 지금 어디까지 오셨나요?</h3>
          <p className="text-slate-600 mt-2">케이스를 보내주시면 ‘가온 기준’으로 바로 코멘트 드립니다.</p>
          <ul className="mt-4 text-slate-700 space-y-1">
            <li>• 검사·판사 출신 변호사 협업</li>
            <li>• 보험사 본사·금감원 출신 손해사정사</li>
            <li>• 메이저 대학병원 의료심사 출신 의료인 자문</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <a href="tel:01039339493" className="btn btn-primary grow">전화 무료상담</a>
          <a href="https://open.kakao.com/o/sNpCmpXc" target="_blank" rel="noreferrer" className="btn btn-ghost grow">카카오톡 상담</a>
        </div>
      </div>
    </section>
  );
}

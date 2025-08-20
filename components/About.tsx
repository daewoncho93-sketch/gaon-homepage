export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold">소개</h2>
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">약력</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><b>인스TV 자동차보험 교수</b></li>
              <li>AIG KOREA 본사 근무</li>
              <li>전국버스공제조합 근무</li>
              <li>금융감독원 근무</li>
              <li>서울대학교 금융교육지원센터 강사</li>
              <li>금융투자협회 인증 금융교육 전문강사</li>
              <li>금융투자협회 금융투자 상담사</li>
              <li>한국손해사정사회 정회원 · 공인강사 · 정책위원</li>
              <li>여성가족부 청소년 특별위원</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">등록정보 & 전문분야</h3>
            <div className="space-y-1 text-slate-700">
              <div>손해사정사 등록번호: <b>BD00001251</b></div>
              <div>사업자 등록번호: <b>294-15-02475</b></div>
            </div>
            <div className="mt-4">
              <div className="font-semibold">전문분야</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>교통사고 합의 및 소송 자문</li>
                <li>후유장해 평가 및 보험금 분쟁</li>
                <li>상해·질병보험 손해사정</li>
                <li>자동차보험 약관 자문</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

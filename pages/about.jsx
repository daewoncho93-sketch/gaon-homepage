import Layout from "../components/Layout"

export default function About(){
  return (
    <Layout title="약력 | GAON 손해사정">
      <div className="container py-12 space-y-12">
        <section>
          <h1 className="h1">약력</h1>
          <p className="lead mt-3">수사·재판·지급실무를 모두 경험한 팀이 함께 움직입니다.</p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="h3">법률팀 (변호사)</div>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li><b>검사</b>, <b>판사</b> 출신 변호사</li>
              <li>교통/의료/보험 전문 소송 다수 수행</li>
              <li>형사·민사 병행전략으로 합의금 극대화</li>
            </ul>
          </div>
          <div className="card p-6">
            <div className="h3">손해사정팀</div>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li><b>보험사 본사</b> 및 <b>금융감독원</b> 출신 손해사정사</li>
              <li>약관·지급실무·내부심사 라인 최적화</li>
              <li>현장조사·의무기록 분석·감정의뢰 총괄</li>
            </ul>
          </div>
        </section>

        <section className="card p-6">
          <div className="h3">진행 프로세스</div>
          <ol className="mt-3 list-decimal pl-5 space-y-1">
            <li>사실관계·증빙 체크리스트 제공</li>
            <li>시뮬레이터 산정과 실제 지급 갭 분석</li>
            <li>합의/소송 득실 비교표 제시</li>
          </ol>
        </section>
      </div>
    </Layout>
  )
}

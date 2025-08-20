import Layout from "../components/Layout"

export default function Guide(){
  return (
    <Layout title="지급기준 가이드 | GAON 손해사정">
      <div className="container py-12 space-y-6">
        <h1 className="h1">대인배상 지급기준 가이드</h1>
        <p className="lead">사망 · 부상 · 후유장해 기준 핵심만 요약했습니다. (상세기준은 상담 시 케이스에 맞춰 적용)</p>

        <section className="card p-6 space-y-4">
          <div className="h3">사망</div>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>항목: 장례비(500만) + 위자료(65세 미만 8천만 / 65세 이상 5천만) + 상실수익액</li>
            <li>상실수익액 = (월평균 현실소득 − 생활비 1/3) × (과거월수 + H)</li>
            <li>가동연한: 일반 65세, 농어업 70세(입증), 62세 이상 특례 36/24/12개월(H: 33.4777/22.829/11.6858)</li>
            <li>소득 입증 곤란 시: 일용노임단가 월 3,248,613원 적용</li>
          </ul>
        </section>

        <section className="card p-6 space-y-4">
          <div className="h3">부상</div>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>항목: 적극손해(치료비 등) + 위자료(급수표) + 휴업손해 + 간병비 + 기타손해</li>
            <li>휴업손해 = 1일 수입감소액 × 휴업일수 × 85% (통원 3일→1일 관행 옵션)</li>
            <li>간병비: 1~5급 한도(60/30/15일), 129,945원/일</li>
            <li>기타손해: 통원 8,000원/일</li>
          </ul>
        </section>

        <section className="card p-6 space-y-4">
          <div className="h3">후유장해</div>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>항목: 위자료 + 상실수익액 + 가정간호비(대상자 한정)</li>
            <li>위자료: 상실률 50% 미만 정액표 / 50% 이상은 기준액×상실률×0.85 (법원모드 선택)</li>
            <li>상실수익액 = 월소득 × 상실률 × H (한시/영구 선택 가능)</li>
            <li>가정간호비: 식물인간·사지완전마비 대상, 129,945원/일(1일 1인)</li>
          </ul>
        </section>

        <section className="text-xs text-slate-500">
          * 본 가이드는 학습·상담 편의를 위한 요약입니다. 실제 적용은 최신 약관/판례·증빙·사실관계에 따릅니다.
        </section>
      </div>
    </Layout>
  )
}

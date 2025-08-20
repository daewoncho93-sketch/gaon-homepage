import Layout from "../components/Layout"
import Link from "next/link"

export default function Home(){
  return (
    <Layout>
      <section className="hero">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="h1">교통사고 보상, <span className="bg-yellow-200 px-2 -mx-2 rounded">정확하고 빠르게</span></h1>
            <p className="lead mt-6">사망 · 부상 · 후유장해 산정 기준을 그대로 반영한 시뮬레이터와<br/>검사·판사 출신 변호사, 보험사 본사·금감원 출신 손해사정사가 함께합니다.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/simulator">즉시 보상 시뮬레이션</Link>
              <Link className="btn" href="/reviews">실제 후기 보기</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            ["정확한 계산", "약관·판례 핵심 반영, 62세 이상 특례 H값 자동 적용"],
            ["소득 입증이 어려워도", "미입력 시 일용노임단가 3,248,613원 자동 적용"],
            ["간병비 자동 산정", "129,945원/일 · 등급별 인정일수 체크"],
          ].map(([t,s],i)=>(
            <div key={i} className="card p-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400" />
              <div className="h3 mt-4">{t}</div>
              <p className="mt-2 text-slate-600">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="h2">“왜 우리 팀인가요?”</h2>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li>· <b>검사/판사 출신 변호사</b>가 사건의 흐름을 정확히 짚고</li>
              <li>· <b>보험사 본사/금감원 출신 손해사정사</b>가 약관과 지급실무를 끝까지 밀어붙입니다.</li>
              <li>· 합의/소송 득실을 투명하게 비교, 선택은 의뢰인이 결정합니다.</li>
            </ul>
            <div className="mt-6">
              <Link className="btn btn-primary" href="/about">팀 약력 보기</Link>
            </div>
          </div>
          <div className="card p-6">
            <div className="h3">자주 묻는 질문</div>
            <div className="mt-4 space-y-4 text-slate-700">
              <div>
                <div className="font-semibold">Q. 소득 증빙이 없어도 되나요?</div>
                <div className="mt-1">가능합니다. 미입력 시 <b>3,248,613원</b>으로 자동 계산합니다.</div>
              </div>
              <div>
                <div className="font-semibold">Q. 62세 이상은 어떻게 계산해요?</div>
                <div className="mt-1">36/24/12개월과 고정 H값(33.4777/22.829/11.6858) 적용.</div>
              </div>
              <div>
                <div className="font-semibold">Q. 간병비는요?</div>
                <div className="mt-1"><b>129,945원/일</b> 적용, 등급별 인정일수 자동 한도.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container text-center">
          <h2 className="h2">계산은 무료, 상담도 무료</h2>
          <p className="lead mt-3">“지급실무 기준” vs “법원 기준”을 나란히 비교해 보세요.</p>
          <Link className="btn btn-primary mt-6" href="/simulator">시뮬레이터 열기</Link>
        </div>
      </section>
    </Layout>
  )
}

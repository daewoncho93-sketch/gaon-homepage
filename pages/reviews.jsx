import Layout from "../components/Layout"

const REVIEWS = [
  { name:"박**(자영업)", text:"보험에서 처음엔 3백도 안된다고 하더니… 서류 다시 정리해주신 뒤로 급 달라졌어요. 최종 합의금 3,200만 원." },
  { name:"이**(회사원)", text:"제가 해보려다 안되던게 여기선 되네요. 특히 휴업손해 부분 디테일. 최종 2,480만 원 받음." },
  { name:"정**(프리랜서)", text:"소득증빙 애매했는데 ‘일용노임단가’로 깔끔히 정리. 2,120만 원 받아서 치료비 숨통." },
  { name:"김**(주부)", text:"상급병실/간병비까지 챙겨주신 덕분에 놓친게 많았다는 걸 느낌… 최종 2,950만 원." },
  { name:"최**(법무법인 의뢰)", text:"판사 출신 변호사님 + 금감원 출신 손사님 콤보… 상대측에서 더는 못 버티더군요. 4,100만 원 종결." },
  { name:"한**(법인대표)", text:"후유장해 쟁점에서 뒤집었습니다. 전략 설계가 미쳤어요. 초고액 1억 2,800만 원." },
]

export default function Reviews(){
  return (
    <Layout title="후기 | GAON 손해사정">
      <div className="container py-12">
        <h1 className="h1">후기</h1>
        <p className="lead mt-3">케이스마다 다르지만, 공통점은 ‘체계’. (사실관계와 증빙에 따라 결과는 달라질 수 있어요)</p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {REVIEWS.map((r,i)=>(
            <div key={i} className="card p-6">
              <div className="font-bold">{r.name}</div>
              <p className="mt-2 text-slate-700">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

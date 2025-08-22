export const metadata = { title: '사례 | 손해사정사무소 가온' };

const CASES = [
  {
    title: "경상으로 보던 사건 → 후유장해 12% 인정",
    amount: 26500000,
    summary: "대퇴부 골절 + 금속정 고정술. 초기엔 ‘경상’ 취급되던 건을 장해케이스로 전환.",
    points: [
      "의무기록 라인바이라인 재정리 → 임상소견과 기능장해 연결",
      "통원휴손 일부 인정 + 향후치료비 포함",
      "최종 2,650만원 합의"
    ]
  },
  {
    title: "업무 공백 큰 자영업자, 휴업손해 극대화",
    amount: 48000000,
    summary: "영수증·통장거래로 실제수입 재구성, 85% 룰 정밀 반영.",
    points: [
      "매출이 아닌 ‘실수입’ 산정에 집중",
      "시뮬레이터 결과와 동일한 로직으로 설득",
      "4,800만원 수령"
    ]
  },
  {
    title: "사망사고, 항목별 한도 구분으로 빠른 종결",
    amount: 61000000,
    summary: "치료 중 사망 케이스에서 부상/사망 항목을 명확히 분리 계산.",
    points: [
      "장례비 500만원, 위자료(65세 미만) 8천, 상실수익액 별도 적산",
      "‘대인1 1.8억’ 오해 불식",
      "6,100만원 수령"
    ]
  }
];

export default function CasesPage(){
  return (
    <div className="container py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">주요 해결 사례</h1>
      <p className="text-slate-600 mb-6">실제 사건을 요약·비식별화하여 공개합니다. 개별 결과는 상황에 따라 달라질 수 있습니다.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {CASES.map((c, idx)=> (
          <div key={idx} className="card p-6">
            <div className="text-sm text-brand-700">Case {String(idx+1).padStart(2,'0')}</div>
            <h3 className="text-lg font-bold mt-1">{c.title}</h3>
            <p className="text-slate-700 mt-2">{c.summary}</p>
            <ul className="mt-3 space-y-1 text-slate-700 list-disc pl-5">
              {c.points.map((p,i)=>(<li key={i}>{p}</li>))}
            </ul>
            <div className="mt-4 font-semibold">결과: {c.amount.toLocaleString()}원</div>
          </div>
        ))}
      </div>
    </div>
  );
}

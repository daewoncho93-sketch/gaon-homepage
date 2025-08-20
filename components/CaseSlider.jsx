import { useEffect, useState } from 'react'
const data = [{"name": "백**", "date": "2025.07.21", "text": "다른 곳에서는 불가 판정만 받았는데, 여기서 장해 인정으로 전환되어 해결됐습니다."}, {"name": "강**", "date": "2025.08.01", "text": "보험사에서 몇 달을 미루던 사안이 한 번에 정리되었습니다. 자료 정리가 압도적이었습니다."}, {"name": "이**", "date": "2025.05.01", "text": "타 기관에서 수차례 거절된 I67.8 뇌혈관 사건, 여기서만 지급 결정을 받았습니다."}, {"name": "한**", "date": "2025.05.24", "text": "청구 자체를 막혔는데 손해사정서와 이의신청서로 결과가 달라졌습니다."}, {"name": "한**", "date": "2025.08.14", "text": "척추 사건에서 AMA 기준 재평가, 처음 제시액의 몇 배로 합의됐습니다."}, {"name": "윤**", "date": "2025.07.21", "text": "암(병리) 해석이 핵심이었는데 의료심사팀이 큰 도움을 주셨습니다."}, {"name": "최**", "date": "2025.07.21", "text": "다른 곳에서는 불가 판정만 받았는데, 여기서 장해 인정으로 전환되어 해결됐습니다."}, {"name": "정**", "date": "2025.07.26", "text": "보험사에서 몇 달을 미루던 사안이 한 번에 정리되었습니다. 자료 정리가 압도적이었습니다."}, {"name": "한**", "date": "2025.07.20", "text": "타 기관에서 수차례 거절된 I67.8 뇌혈관 사건, 여기서만 지급 결정을 받았습니다."}, {"name": "강**", "date": "2025.06.11", "text": "청구 자체를 막혔는데 손해사정서와 이의신청서로 결과가 달라졌습니다."}, {"name": "조**", "date": "2025.05.26", "text": "척추 사건에서 AMA 기준 재평가, 처음 제시액의 몇 배로 합의됐습니다."}, {"name": "정**", "date": "2025.08.14", "text": "암(병리) 해석이 핵심이었는데 의료심사팀이 큰 도움을 주셨습니다."}];

export default function CaseSlider() {
  const [i, setI] = useState(0);
  useEffect(()=>{ const t = setInterval(()=>setI(v=>(v+1)%data.length), 4500); return ()=>clearInterval(t); },[]);
  const cur = data[i];
  return (
    <div className="card bg-slate-50 relative overflow-hidden">
      <div className="absolute -inset-6 bg-gradient-to-r from-indigo-100/40 to-violet-100/40 blur-2xl -z-10" />
      <div className="text-sm text-slate-500 mb-2">실시간 후기</div>
      <div className="text-lg font-semibold">“{cur.text}”</div>
      <div className="mt-3 text-sm text-slate-600">- {cur.name} 님 • {cur.date}</div>
      <div className="mt-3 text-xs text-slate-400">* 실제 의뢰 내용을 바탕으로 익명/요지화한 후기입니다.</div>
    </div>
  )
}

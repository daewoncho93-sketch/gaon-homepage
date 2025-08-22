'use client';
import { useEffect, useRef, useState } from 'react';
const DATA = [
  { name:"김**(회사원)", text:"보험사에서 안된다던 걸, 자료로 반박해주셨어요. 제시액 두 배 넘게. 감삼니다 ㅠ" },
  { name:"박**(자영업)", text:"통원이라 어렵다더니... 결과는 1,000만 넘게. 설명도 쉽고 빠름." },
  { name:"이**(주부)", text:"제 상황에서 최대치 뽑아준 느낌. 서류산을 깔끔히 처리." },
  { name:"정**(프리랜서)", text:"후유장해 인정 핵심은 의료심사 팀이었어요." }
];
export default function Testimonials({autoplay=true, interval=2600}){
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  useEffect(()=>{
    if(!autoplay) return;
    timer.current = setInterval(()=> setIdx(i => (i+1)%DATA.length), interval);
    return ()=> clearInterval(timer.current);
  }, [autoplay, interval]);
  return (
    <section className="card">
      <h2>실제 후기</h2>
      <div className="mt-4">
        <div className="text-lg">“{DATA[idx].text}”</div>
        <div className="text-sm text-brand-700 mt-2">— {DATA[idx].name}</div>
      </div>
      <div className="mt-4 flex gap-2">
        {DATA.map((_,i)=>(
          <button key={i} onClick={()=>setIdx(i)} className={"h-2 w-6 rounded-full "+(i===idx?"bg-brand-600":"bg-brand-200")} />
        ))}
      </div>
    </section>
  );
}

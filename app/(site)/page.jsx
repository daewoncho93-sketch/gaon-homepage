import Link from "next/link";
import Testimonials from "@/components/Testimonials";

export default function HomePage(){
  return (
    <div className="space-y-10">
      <section className="card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-white pointer-events-none" />
        <div className="relative">
          <h1>보험사가 아니고, <span className="text-brand-600">당신 편</span>입니다.</h1>
          <p className="mt-3 text-brand-700">
            검사·판사 출신 변호사, 보험사 본사·금융감독원 출신 손해사정사, 메이저 대학병원 의료심사 출신 의료인이 한 팀.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/simulator" className="btn-primary">보상 시뮬레이터</Link>
            <a href="tel:01039339493" className="btn-ghost">무료상담 010-3933-9493</a>
            <a className="btn-ghost" href="https://open.kakao.com/o/sNpCmpXc" target="_blank">카카오 채널</a>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {t:"+60%↑", s:"손해액 상승", d:"쟁점 정리·의무기록 리라이팅·유사판결 레퍼런스"},
          {t:"검사·판사 라인", s:"법률대응", d:"쟁점화 전략과 합의/소송 투트랙"},
          {t:"의료심사", s:"의학 근거", d:"메이저 대학병원 출신 의료심사 파트너"}
        ].map((x,i)=>(
          <div key={i} className="card">
            <div className="text-brand-600 font-bold">{x.t}</div>
            <div className="text-xl font-semibold mt-1">{x.s}</div>
            <div className="text-sm text-brand-700 mt-2">{x.d}</div>
          </div>
        ))}
      </section>
      <Testimonials autoplay />
    </div>
  );
}

import About from "../components/About";
import CaseStudies from "../components/CaseStudies";
import Calculator from "../components/Calculator";
import Contact from "../components/Contact";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
              Premium Claims Advisory
            </div>
            <h1 className="mt-4 text-4xl lg:text-5xl font-extrabold leading-tight">
              의학·약관·판례를 결합한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">정밀 손해사정</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              교통사고·의료사고·진단비 분쟁까지. 데이터 기반 시뮬레이터와 실무 경험으로 빠르게 방향을 잡고, 전문가가 끝까지 동행합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#calculator" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-semibold">
                <CalcIcon className="w-5 h-5" /> 3분 예측
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:border-indigo-300 hover:text-indigo-700">
                전문가와 상담 <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="rounded-3xl border bg-white p-6 shadow-xl">
            <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <CalcIcon className="w-5 h-5 text-indigo-600" /> 빠른 견적 미리보기
            </div>
            <div className="text-sm text-slate-600">간단 시뮬레이터로 대략적인 범위를 확인하세요.</div>
            <div className="mt-4">
              <Calculator />
            </div>
          </div>
        </div>
      </section>

      <About />
      <CaseStudies />
      <Contact />
    </main>
  );
}

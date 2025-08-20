import About from "../components/About";
import CaseStudies from "../components/CaseStudies";
import Calculator from "../components/Calculator";
import Contact from "../components/Contact";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* 헤더 */}
      <header className="bg-blue-800 text-white p-6">
        <h1 className="text-3xl font-bold">손해사정사무소 가온</h1>
        <p className="text-lg mt-1">대표 | 손해사정사 조대원</p>
      </header>

      {/* 메인 섹션 */}
      <section className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">연락처</h2>
        <ul className="space-y-2">
          <li>📞 010-3933-9493</li>
          <li>✉️ daewoncho@naver.com</li>
          <li>📍 전국 상담 가능</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">사업자 정보</h2>
        <p>사업자 등록번호: 294-15-02475</p>
        <p>손해사정사 등록번호: BD00001251</p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">약력</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>인스TV 자동차보험 교수</li>
          <li>AIG KOREA 본사 근무</li>
          <li>전국버스공제조합 근무</li>
          <li>금융감독원 근무</li>
          <li>서울대 노후연금지원센터 강사</li>
          <li>금융투자협회 인증 금융교육 전문강사</li>
          <li>금융연수원 금융교육 부사단장</li>
          <li>한국손해사정사회 공제위원</li>
          <li>한국손해사정사회 정회원</li>
          <li>대한의사협회 정회원</li>
          <li>여성가족부 청소년복지위원</li>
        </ul>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-200 text-center p-4 mt-12">
        <p>© {new Date().getFullYear()} 손해사정사무소 가온. All Rights Reserved.</p>
      </footer>
    </main>
  )
}

import About from "../components/About";
import CaseStudies from "../components/CaseStudies";
import Calculator from "../components/Calculator";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-8">
      <section className="w-full text-center py-16 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">손해사정사무소 가온</h1>
        <p className="text-lg text-gray-700">보험금 분쟁, 교통사고 합의금, 후유장해 상담</p>
      </section>

      <About />
      <CaseStudies />
      <Calculator />
      <Contact />
    </main>
  );
}

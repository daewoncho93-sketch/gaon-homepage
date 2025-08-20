export default function CaseStudies() {
  return (
    <section id="cases" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold">사례 모음</h2>
        <p className="mt-3 text-slate-600">실제 손해사정 사례는 네이버 블로그에서 확인하실 수 있습니다.</p>
        <a
          href="https://blog.naver.com/haesongsonsa"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl bg-slate-900 text-white px-5 py-3 font-semibold hover:bg-slate-800"
        >
          블로그 사례 보러가기
        </a>
      </div>
    </section>
  );
}

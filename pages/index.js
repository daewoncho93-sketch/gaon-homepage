import { useEffect, useMemo, useState } from 'react';

const COMPANY = {
  name: '손해사정사무소 가온',
  bizNo: '294-15-02475',
  licenseNo: 'BD00001251',
  phone: '010-3933-9493',
  mail: 'daewoncho@naver.com',
  kakao: 'https://open.kakao.com/o/sNpCmpXc'
};

const CATEGORIES = ['교통사고', '배상책임사고', '산재사고', '해상사고', '개인보험', '단체보험'];

const BASE_TABLE = {
  '척추': { '압박골절': [15, 40], '추간판탈출증': [10, 30] },
  '무릎(십자인대)': { '전방십자인대파열': [10, 25], '반월상연골파열': [8, 18] },
  '손가락': { '절단(부분/수지단)': [20, 40], '강직/운동제한': [8, 20] },
  '시력': { '한눈 영구저하': [20, 35] },
  '청력': { '감각신경성 난청': [10, 25] },
  '뇌혈관질환': { 'I67.8 기타': [10, 35] },
  '심혈관질환': { '심근경색 후유': [10, 30] },
  '암': { '진단비/분쟁': [0, 0] }
};

const ADL = ['없음', '경미', '중등도', '심함'];
const ADL_W = { 없음: 0, 경미: 3, 중등도: 7, 심함: 12 };
const KRW = (n) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n || 0)));

function estimate({ bodyPart, diagnosis, adl, age }) {
  const base = BASE_TABLE[bodyPart]?.[diagnosis] || [0, 0];
  let [lo, hi] = base;
  lo += ADL_W[adl] || 0;
  hi += ADL_W[adl] || 0;
  if (age >= 65) { lo += 2; hi += 2; }
  lo = Math.max(0, Math.min(hi, lo));
  return [lo, hi];
}

const REVIEWS = [
  { name: '김**', date: '2025-08-16', text: '타사 2곳에서 불가 판정이었는데, 가온에서 자료 재구성 후 승인 받아서 치료비와 후유장해금까지 해결했습니다.' },
  { name: '백**', date: '2025-08-15', text: '보험사 본사·공제조합 출신 경험으로 약관 포인트를 짚어 주셔서 분쟁이 깔끔히 정리됐습니다. 다른 곳은 답이 없었는데 여기서 됐어요.' },
  { name: '최**', date: '2025-08-13', text: 'I67.8 뇌혈관 쟁점이었는데 K-MBI/ADL 평가 반영해서 인정. 병원/재활 자료 묶는 법이 다르더라고요.' },
  { name: '오**', date: '2025-08-12', text: '하청/산재 복잡한 케이스였는데 산재+개인보험 동시 전략으로 빨라졌습니다. 감사합니다.' },
  { name: '박**', date: '2025-08-10', text: '십자인대 재건 후 직업상 기능까지 반영해 범위 넓혀 받았습니다. 다른데서 안된다 했던 부분이 여기서 됐습니다.' }
];

export default function Home() {
  const [tab, setTab] = useState(CATEGORIES[0]);

  const [bodyPart, setBodyPart] = useState('척추');
  const [diagnosis, setDiagnosis] = useState('압박골절');
  const [adl, setAdl] = useState('경미');
  const [age, setAge] = useState(50);
  const [sum, setSum] = useState(300000000); // 3억

  useEffect(() => {
    const first = Object.keys(BASE_TABLE[bodyPart] || {})[0] || '';
    setDiagnosis(first);
  }, [bodyPart]);

  const [lo, hi] = useMemo(() => estimate({ bodyPart, diagnosis, adl, age }), [bodyPart, diagnosis, adl, age]);
  const payout = useMemo(() => ({ lo: sum * (lo / 100), hi: sum * (hi / 100) }), [sum, lo, hi]);

  const [rvIdx, setRvIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRvIdx((i) => (i + 1) % REVIEWS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const [form, setForm] = useState({ name: '', phone: '', category: '교통사고', message: '' });
  const [toast, setToast] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setToast('');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const j = await r.json();
      if (j.ok) {
        setToast('상담 요청이 접수되었습니다. 곧 연락드리겠습니다.');
        setForm({ name: '', phone: '', category: '교통사고', message: '' });
      } else {
        setToast(j.error || '전송에 실패했습니다.');
      }
    } catch {
      setToast('네트워크 오류가 발생했습니다.');
    }
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/75 border-b">
        <div className="container-narrow h-16 flex items-center justify-between">
          <a href="/" className="font-extrabold tracking-tight text-lg md:text-xl">손해사정사무소 가온</a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#sim" className="hover:text-indigo-600">시뮬레이터</a>
            <a href="#cases" className="hover:text-indigo-600">사례</a>
            <a href="#med" className="hover:text-indigo-600">의료심사</a>
            <a href="#contact" className="hover:text-indigo-600">상담</a>
          </nav>
          <a href="#contact" className="btn-primary hidden sm:inline-flex">무료상담</a>
        </div>
      </header>

      {/* Hero */}
      <section className="section relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />
        <div className="container-narrow grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="badge">Premium Claims Advisory</div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              의학·약관·판례를 결합한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">정밀 손해사정</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              교통사고·의료심사·진단비 분쟁까지. <b>데이터 기반 시뮬레이터</b>와 <b>전문가 컨설팅</b>으로 빠르게 방향을 잡고 끝까지 함께합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#sim" className="btn-primary">3분 예측</a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:border-indigo-300 hover:text-indigo-700">전문가와 상담</a>
            </div>
            <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {[
                '금융감독원·손해사정사 교수',
                '보험사 본사·공제조합 출신',
                'AMA·McBride 기준',
                '손해사정서/이의신청 일괄'
              ].map((t) => (<li key={t} className="bg-white/70 backdrop-blur rounded-xl px-3 py-2 border">{t}</li>))}
            </ul>
          </div>

          <div className="card">
            <div className="font-semibold mb-3">빠른 예측 미리보기</div>
            <div className="text-sm text-slate-600">아래의 풀 시뮬레이터에서 자세히 계산해보세요.</div>
            <div className="mt-4"><a href="#sim" className="btn-primary">시뮬레이터로 이동</a></div>
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section id="sim" className="section bg-slate-50">
        <div className="container-narrow">
          <h2 className="text-3xl font-extrabold">보험금 시뮬레이터</h2>
          <p className="mt-3 text-slate-600">사고유형에 맞춰 장해 부위·진단을 선택하고 가입금액(기본 3억)을 입력하면 예측 범위를 봅니다.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setTab(c)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold border ${tab === c ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-slate-50'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="label">장해 부위</div>
                  <select className="input" value={bodyPart} onChange={(e) => setBodyPart(e.target.value)}>
                    {Object.keys(BASE_TABLE).map((bp) => <option key={bp}>{bp}</option>)}
                  </select>
                </div>
                <div>
                  <div className="label">진단/상태</div>
                  <select className="input" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}>
                    {(Object.keys(BASE_TABLE[bodyPart] || {})).map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <div className="label">ADL 제한</div>
                  <select className="input" value={adl} onChange={(e) => setAdl(e.target.value)}>
                    {ADL.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <div className="label">연령</div>
                  <input type="number" min={0} max={110} className="input" value={age} onChange={(e) => setAge(parseInt(e.target.value || '0', 10))} />
                </div>
                <div className="sm:col-span-2">
                  <div className="label">가입금액(원)</div>
                  <input type="number" step={100000} className="input" value={sum} onChange={(e) => setSum(parseInt(e.target.value || '0', 10))} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="font-semibold mb-3">결과 요약</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-100 p-4">
                  <div className="text-sm text-slate-500">예상 장해율</div>
                  <div className="text-2xl font-extrabold">{lo}% ~ {hi}%</div>
                </div>
                <div className="rounded-xl bg-slate-100 p-4">
                  <div className="text-sm text-slate-500">예상 지급액</div>
                  <div className="text-2xl font-extrabold">{KRW(payout.lo)} ~ {KRW(payout.hi)}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-600">※ 예시는 참고용이며, 실제 판단은 약관·진단확정·의학적 인과관계에 따라 상이할 수 있습니다.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases / Reviews */}
      <section id="cases" className="section">
        <div className="container-narrow">
          <h2 className="text-3xl font-extrabold">대표 사례 & 후기</h2>
          <p className="mt-3 text-slate-600">“다른 곳은 안 된다고 했는데, 여기서 해결됐다”는 피드백을 많이 받습니다. 아래 후기는 익명화했습니다.</p>

          <div className="mt-6 card">
            <div className="min-h-[120px]">
              <div className="text-slate-800 font-semibold">{REVIEWS[rvIdx].name} <span className="text-slate-400 font-normal text-sm ml-1">{REVIEWS[rvIdx].date}</span></div>
              <p className="mt-2 text-slate-600">{REVIEWS[rvIdx].text}</p>
            </div>
            <div className="mt-4 flex gap-2">
              {REVIEWS.map((_, i) => (
                <span key={i} className={`h-2 w-2 rounded-full ${i === rvIdx ? 'bg-indigo-600' : 'bg-slate-300'}`}/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Medical review */}
      <section id="med" className="section bg-slate-50">
        <div className="container-narrow">
          <h2 className="text-3xl font-extrabold">의료심사</h2>
          <p className="mt-3 text-slate-600">메이저 대학병원 경력의 의료진이 영상·임상·검사자료를 검토해 의학적 타당성을 정리합니다. 보험 약관·판례 포인트와 결합해 설득력 있는 자료로 구성합니다.</p>
          <ul className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
            {['영상/검사 리뷰(MRI/CT/안·이비인후 검사 등)', '진단확정/인과관계 쟁점 정리', '손해사정서/이의신청서 의료 파트 작성'].map((t) => (
              <li key={t} className="card">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container-narrow grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-extrabold">무료 상담 요청</h2>
            <p className="mt-3 text-slate-600">간단히 남겨주시면 담당 손해사정사가 연락드립니다. (평일 09:00~18:00)</p>

            <form onSubmit={submit} className="mt-6 card space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="input" placeholder="이름" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="input" placeholder="연락처(숫자만)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <input className="input" placeholder="키워드(선택)" value={form.keyword || ''} onChange={(e) => setForm({ ...form, keyword: e.target.value })} />
              </div>
              <textarea className="input h-28" placeholder="간단한 상황 설명" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button type="submit" className="btn-primary w-full justify-center">전문가 상담 요청</button>
              {toast && <div className="text-center text-sm text-emerald-600">{toast}</div>}
            </form>
            <div className="mt-3 text-xs text-slate-500">※ 본 사이트는 정보 제공을 위한 예시 페이지입니다. 실제 사건은 계약·진단·의학적 사정을 종합하여 개별 검토합니다.</div>
          </div>

          <div className="card bg-slate-50">
            <div className="font-semibold text-slate-800">연락처</div>
            <div className="mt-3 space-y-2 text-slate-700">
              <div><a className="hover:text-indigo-600" href={`tel:${COMPANY.phone.replace(/-/g,'')}`}>📞 {COMPANY.phone}</a></div>
              <div><a className="hover:text-indigo-600" href={`mailto:${COMPANY.mail}`}>✉️ {COMPANY.mail}</a></div>
              <div><a className="hover:text-indigo-600" href={COMPANY.kakao} target="_blank" rel="noreferrer">💬 카카오 오픈채팅</a></div>
              <div>📍 전국</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t bg-white">
        <div className="container-narrow text-sm text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-900">{COMPANY.name}</div>
            <div className="mt-1">사업자등록번호 {COMPANY.bizNo} · 손해사정사 등록번호 {COMPANY.licenseNo}</div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#sim" className="hover:text-indigo-600">시뮬레이터</a>
            <a href="#cases" className="hover:text-indigo-600">사례</a>
            <a href="#med" className="hover:text-indigo-600">의료심사</a>
            <a href="#contact" className="hover:text-indigo-600">상담</a>
          </div>
        </div>
        <div className="container-narrow mt-4">© 2017 GAON Loss Adjusters. All rights reserved.</div>
      </footer>
    </div>
  );
}


import React, { useMemo, useState, useEffect, useRef } from "react";
import { ShieldCheck, Scale, FileText, Headset, Calculator, ArrowRight, CheckCircle2, Phone, Mail, MapPin, ChevronRight, Send, MessageCircle, X, BrainCircuit, ClipboardList } from "lucide-react";

const krw = (n) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n || 0)));

const BASE_TABLE = {
  "척추": {
    "압박골절": [5, 15],
    "추간판탈출증": [3, 10],
  },
  "무릎(십자인대)": {
    "전방십자인대파열": [10, 20],
    "반월상연골파열": [5, 12],
  },
  "손가락": {
    "절단(부분/수지단)": [15, 30],
    "강직/운동제한": [5, 15],
  },
  "시력": {
    "한눈 영구저하": [20, 30],
  },
  "청력": {
    "감각신경성 난청": [5, 20],
  },
  "뇌혈관": {
    "I67.8 등 기타": [5, 20],
  },
};

const BODY_PART_HINTS = {
  "척추": ["요추/흉추 X-ray, CT/MRI", "골밀도(T-score) 보고서", "통증/신경학적 소견"],
  "무릎(십자인대)": ["무릎 MRI", "수술기록지(봉합/재건)", "재활치료 내역"],
  "손가락": ["수술·봉합기록, 사진", "장해진단서(그립/운동범위)", "직업상 필요기능 설명"],
  "시력": ["시력검사표(안과)", "시야검사/안저검사", "전문의 소견서"],
  "청력": ["순음/어음청력검사", "이비인후과 소견서", "보청기 사용 여부"],
  "뇌혈관": ["뇌 MRI/CT", "신경학적 검사(K-MBI/ADL)", "재활의학과 평가"],
};

const ADL_WEIGHTS = { "없음": 0, "경미": 3, "중등도": 7, "심함": 12 };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function estimateImpairment({ bodyPart, diagnosis, adl, age }) {
  const base = BASE_TABLE[bodyPart]?.[diagnosis] || [0, 0];
  let [lo, hi] = base;
  const adlW = ADL_WEIGHTS[adl] || 0;
  lo += adlW; hi += adlW;
  if (age >= 65) { lo += 2; hi += 2; }
  lo = clamp(lo, 1, 80);
  hi = clamp(hi, lo, 80);
  return [lo, hi];
}

function Toast({ open, message, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <div className="bg-black/90 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="ml-2 text-white/80 hover:text-white"><X className="w-4 h-4"/></button>
      </div>
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "무엇을 도와드릴까요? 예: 'ACL 파열 장해율', '압박골절 서류'" }]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  const reply = (q) => {
    const t = q.toLowerCase();
    let a = "전문 상담이 필요한 사안입니다. 연락처를 남겨주시면 자세히 안내드릴게요.";
    if (t.includes("acl") || t.includes("십자")) a = "전방십자인대(ACL) 파열은 통상 10~20% 범위에서 평가됩니다. 수술기록과 MRI가 중요해요.";
    else if (t.includes("압박골절")) a = "척추 압박골절은 5~15%가 일반적이며, 골밀도(T-score)와 영상검사가 핵심 자료입니다.";
    else if (t.includes("i67.8") || t.includes("뇌혈관")) a = "뇌혈관 I67.8은 범위가 넓어 ADL, 신경학적 평가(K-MBI)가 관건입니다.";
    else if (t.includes("서류") || t.includes("자료")) a = "진단서, 영상검사, 수술기록, 통원·재활 내역, 장해진단서(해당 시)가 기본입니다.";
    return a + " (본 안내는 일반 정보로, 개별 사건에 따라 달라질 수 있습니다.)";
  };

  const onSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const user = { role: "user", text: input.trim() };
    const bot = { role: "assistant", text: reply(input.trim()) };
    setMsgs((m) => [...m, user, bot]);
    setInput("");
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-[90] rounded-full p-4 shadow-2xl bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
        <MessageCircle className="w-6 h-6" />
      </button>
      {open && (<div className="fixed inset-0 z-[95] bg-black/40" onClick={() => setOpen(false)} />)}
      <div className={`fixed bottom-6 right-6 z-[100] w-[360px] max-w-[90vw] transition-all ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
            <BrainCircuit className="w-5 h-5"/>
            <div className="font-semibold">가온 AI 상담</div>
            <button className="ml-auto opacity-80 hover:opacity-100" onClick={() => setOpen(false)}><X className="w-5 h-5"/></button>
          </div>
          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${m.role === "assistant" ? "bg-white border border-slate-200" : "bg-indigo-600 text-white"}`}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSend} className="flex items-center gap-2 p-3 border-t bg-white">
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="질문을 입력하세요..." className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            <button type="submit" className="rounded-xl px-3 py-2 bg-indigo-600 text-white text-sm hover:bg-indigo-700 flex items-center gap-1"><Send className="w-4 h-4"/>전송</button>
          </form>
        </div>
      </div>
    </>
  );
}

function LeadForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: "", phone: "", type: "교통사고", memo: "", agree: false, keyword: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.agree) return onSubmitted(false, "이름/연락처/동의는 필수입니다.");
    console.log("Lead submitted:", form);
    onSubmitted(true, "상담 요청이 접수되었습니다. 곧 연락드리겠습니다.");
    setForm({ name: "", phone: "", type: "교통사고", memo: "", agree: false, keyword: "" });
  };
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="border rounded-xl px-3 py-2" placeholder="이름" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})}/>
        <input className="border rounded-xl px-3 py-2" placeholder="연락처(숫자만)" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select className="border rounded-xl px-3 py-2" value={form.type} onChange={(e)=>setForm({...form, type: e.target.value})}>
          <option>교통사고</option>
          <option>산재</option>
          <option>의료사고</option>
          <option>일반상해</option>
          <option>진단비/암분쟁</option>
        </select>
        <input className="border rounded-xl px-3 py-2" placeholder="사건 키워드 (선택)" value={form.keyword} onChange={(e)=>setForm({...form, keyword: e.target.value})}/>
      </div>
      <textarea className="border rounded-xl px-3 py-2 w-full h-28" placeholder="간단한 상황 설명" value={form.memo} onChange={(e)=>setForm({...form, memo: e.target.value})}/>
      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input type="checkbox" checked={form.agree} onChange={(e)=>setForm({...form, agree: e.target.checked})} className="mt-1"/>
        <span>개인정보 수집·이용에 동의합니다. (상담 목적, 1년 보관 후 파기)</span>
      </label>
      <button type="submit" className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold flex items-center justify-center gap-2"><Headset className="w-5 h-5"/>전문가 상담 요청</button>
    </form>
  );
}

const ADL_WEIGHTS_KEYS = Object.keys(ADL_WEIGHTS);

function CalculatorSection() {
  const [accident, setAccident] = useState("교통사고");
  const [bodyPart, setBodyPart] = useState("척추");
  const diagnosisOptions = Object.keys(BASE_TABLE[bodyPart] || {});
  const [diagnosis, setDiagnosis] = useState(diagnosisOptions[0] || "압박골절");
  const [adl, setAdl] = useState("경미");
  const [age, setAge] = useState(50);
  const [sum, setSum] = useState(20000000);

  useEffect(()=>{ setDiagnosis(Object.keys(BASE_TABLE[bodyPart] || {})[0] || ""); }, [bodyPart]);

  const [lo, hi] = useMemo(()=>estimateImpairment({ bodyPart, diagnosis, adl, age }), [bodyPart, diagnosis, adl, age]);
  const payout = useMemo(()=>({ lo: sum * (lo/100), hi: sum * (hi/100) }), [sum, lo, hi]);

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-start gap-6 flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-indigo-700 font-semibold mb-3"><Calculator className="w-5 h-5"/> 보험금 시뮬레이터</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">후유장해 예상치 & 지급액 범위</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">간단한 입력만으로 대략적인 장해율과 예상 지급액 범위를 확인하세요. 실제 지급여부는 약관·의학·인과관계에 따라 달라질 수 있습니다.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="text-sm text-slate-600">사고 유형</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={accident} onChange={(e)=>setAccident(e.target.value)}>
                  <option>교통사고</option>
                  <option>산재</option>
                  <option>일반상해</option>
                </select>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-slate-600">장해 부위</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={bodyPart} onChange={(e)=>setBodyPart(e.target.value)}>
                  {Object.keys(BASE_TABLE).map((bp)=> (<option key={bp}>{bp}</option>))}
                </select>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-slate-600">진단/상태</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={diagnosis} onChange={(e)=>setDiagnosis(e.target.value)}>
                  {diagnosisOptions.map((d)=> (<option key={d}>{d}</option>))}
                </select>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-slate-600">ADL 제한</div>
                <select className="border rounded-xl px-3 py-2 w-full" value={adl} onChange={(e)=>setAdl(e.target.value)}>
                  {ADL_WEIGHTS_KEYS.map((k)=> (<option key={k}>{k}</option>))}
                </select>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-slate-600">연령</div>
                <input type="number" min={0} max={110} className="border rounded-xl px-3 py-2 w-full" value={age} onChange={(e)=>setAge(parseInt(e.target.value||"0",10))}/>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-slate-600">가입금액 (원)</div>
                <input type="number" step={100000} className="border rounded-xl px-3 py-2 w-full" value={sum} onChange={(e)=>setSum(parseInt(e.target.value||"0",10))}/>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="rounded-2xl border bg-white shadow-sm p-6">
              <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2"><ClipboardList className="w-5 h-5"/> 결과 요약</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">예상 장해율</div>
                  <div className="text-2xl font-extrabold">{lo}% ~ {hi}%</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">예상 지급액</div>
                  <div className="text-2xl font-extrabold">{krw(payout.lo)} ~ {krw(payout.hi)}</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-600 leading-relaxed">
                본 결과는 일반 정보 제공을 위한 <b>예시</b>이며, 실제 지급 판단은 약관, 진단확정, 의학적 인과관계, 손해사정 평가에 따라 상이할 수 있습니다.
              </div>
              <div className="mt-5">
                <div className="text-sm font-semibold text-slate-700 mb-2">권장 준비자료</div>
                <ul className="text-sm text-slate-600 list-disc ml-5 space-y-1">
                  {(BODY_PART_HINTS[bodyPart] || []).map((h)=> (<li key={h}>{h}</li>))}
                </ul>
              </div>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-semibold">전문가 상담 연결 <ArrowRight className="w-4 h-4"/></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [toast, setToast] = useState({ open: false, message: "" });
  const showToast = (m) => setToast({ open: true, message: m });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/75 border-b">
        <div className="container mx-auto px-6 max-w-7xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold">G</div>
            <div className="font-extrabold tracking-tight">손해사정사무소 가온</div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#calculator" className="hover:text-indigo-600">시뮬레이터</a>
            <a href="#services" className="hover:text-indigo-600">전문분야</a>
            <a href="#cases" className="hover:text-indigo-600">사례</a>
            <a href="#contact" className="hover:text-indigo-600">상담</a>
          </nav>
          <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-semibold"><Headset className="w-4 h-4"/>무료상담</a>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />
        <div className="container mx-auto px-6 max-w-7xl py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">Premium Claims Advisory</div>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">의학·약관·판례를 결합한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">정밀 손해사정</span></h1>
              <p className="mt-4 text-slate-600 text-lg leading-relaxed">교통사고·의료사고·진단비 분쟁까지. <b>데이터 기반 시뮬레이터</b>와 <b>AI 상담</b>으로 빠르게 방향을 잡고, 전문가가 끝까지 동행합니다.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#calculator" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-semibold"><Calculator className="w-5 h-5"/>3분 예측</a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:border-indigo-300 hover:text-indigo-700">전문가와 상담 <ArrowRight className="w-5 h-5"/></a>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {[
                  { icon: ShieldCheck, label: "보험사 본사·차량보험 출신" },
                  { icon: Scale, label: "AMA·McBride 기준" },
                  { icon: FileText, label: "손해사정서·이의신청 일괄" },
                  { icon: Headset, label: "카카오/전화 즉시상담" },
                ].map(({ icon:Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-white/70 backdrop-blur rounded-xl px-3 py-2 border">
                    <Icon className="w-4 h-4 text-indigo-600"/>
                    <div>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-indigo-100 to-violet-100 blur-2xl"/>
              <div className="rounded-3xl border bg-white p-6 shadow-xl">
                <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><Calculator className="w-5 h-5 text-indigo-600"/> 빠른 견적 미리보기</div>
                <div className="text-sm text-slate-600">간단 시뮬레이터로 대략적인 범위를 확인하세요.</div>
                <div className="mt-4"><CalculatorSection/></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold">전문 분야</h2>
          <p className="mt-3 text-slate-600">약관 해석·의학적 인과관계·판례 분석을 종합한 원스톱 컨설팅을 제공합니다.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: "교통사고 후유장해", desc: "척추·관절·신경 손상 평가, AMA/McBride 기반 장해율 산정", icon: ShieldCheck },
              { title: "의료사고·진단비 분쟁", desc: "I67.8, D00~D01, C코드 등 진단확정 쟁점과 판례 대응", icon: Scale },
              { title: "암·후유장해 종합 청구", desc: "영상·병리·임상 소견 종합 손해사정서/이의신청서 작성", icon: FileText },
            ].map(({ title, desc, icon:Icon }) => (
              <div key={title} className="rounded-2xl border p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-2"><Icon className="w-5 h-5 text-indigo-600"/><div className="font-bold">{title}</div></div>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-indigo-600 font-semibold">상담 문의 <ChevronRight className="w-4 h-4"/></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold">대표 사례 (익명화)</h2>
          <p className="mt-3 text-slate-600">구체적인 금액·비율 표기는 광고법 준수를 위해 상담 시 안내드립니다.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: "척추 압박골절", body: "영상·골밀도·ADL 종합 평가로 장해 인정 범위 확대" },
              { title: "ACL 파열 재건술", body: "수술기록 및 재활경과 반영, 직업상 필요기능 고려" },
              { title: "I67.8 뇌혈관 진단", body: "K-MBI/ADL 평가서 확보로 일상생활 제한 입증" },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border bg-white p-6">
                <div className="font-bold">{c.title}</div>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{c.body}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-indigo-600 font-semibold">상담 연결 <ChevronRight className="w-4 h-4"/></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-extrabold">무료 상담 요청</h2>
              <p className="mt-3 text-slate-600">간단히 남겨주시면 담당 손해사정사가 연락드립니다. (평일 09:00~18:00)</p>
              <div className="mt-6">
                <LeadForm onSubmitted={(ok, msg)=>{ showToast(msg); }}/>
              </div>
              <div className="mt-6 text-xs text-slate-500">※ 이 사이트는 정보 제공을 위한 데모입니다. 실제 사건은 계약·진단·의학적 사정을 종합하여 개별 검토합니다.</div>
            </div>
            <div className="rounded-3xl border p-6 bg-slate-50">
              <div className="font-semibold text-slate-800">연락처</div>
              <div className="mt-3 space-y-2 text-slate-700">
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-600"/> 02-000-0000</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-600"/> contact@gaon-adjusters.kr</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-600"/> 서울특별시 ○○구 ○○로 00</div>
              </div>
              <div className="mt-6">
                <div className="font-semibold text-slate-800">뉴스레터 구독</div>
                <form className="mt-3 flex gap-2" onSubmit={(e)=>{e.preventDefault(); showToast("구독 신청이 접수되었습니다.");}}>
                  <input placeholder="이메일 입력" className="flex-1 border rounded-xl px-3 py-2"/>
                  <button className="rounded-xl bg-slate-900 text-white px-4 py-2 font-semibold">구독</button>
                </form>
                <div className="mt-2 text-xs text-slate-500">보험 분쟁·판례 브리핑을 보내드립니다. (월 2회 이내)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t bg-white">
        <div className="container mx-auto px-6 max-w-7xl text-sm text-slate-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900">손해사정사무소 가온</div>
              <div className="mt-1">사업자등록번호 000-00-00000 · 손해사정사 등록번호 제000000호</div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#services" className="hover:text-indigo-600">전문분야</a>
              <a href="#cases" className="hover:text-indigo-600">사례</a>
              <a href="#contact" className="hover:text-indigo-600">상담</a>
            </div>
          </div>
          <div className="mt-4">© {new Date().getFullYear()} GAON Loss Adjusters. All rights reserved.</div>
        </div>
      </footer>

      <Chatbot />
      <Toast open={toast.open} message={toast.message} onClose={()=>setToast({ open:false, message: "" })}/>
    </div>
  );
}

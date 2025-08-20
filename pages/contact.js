import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

const COMPANY = {
  phone: '010-3933-9493',
  mail: 'daewoncho@naver.com',
  kakao: 'https://open.kakao.com/o/sNpCmpXc'
};

export default function Contact() {
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
      <Header />
      <section className="section">
        <div className="container-narrow grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-3xl font-extrabold">무료 상담 요청</h1>
            <p className="mt-3 text-slate-600">간단히 남겨주시면 담당 손해사정사가 연락드립니다. (평일 09:00~18:00)</p>

            <form onSubmit={submit} className="mt-6 card space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="input" placeholder="이름" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})}/>
                <input className="input" placeholder="연락처(숫자만)" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})}/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select className="input" value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})}>
                  {['교통사고','배상책임사고','산재사고','해상사고','개인보험','단체보험'].map(c=>(<option key={c}>{c}</option>))}
                </select>
                <input className="input" placeholder="키워드(선택)" value={form.keyword || ''} onChange={(e)=>setForm({...form, keyword: e.target.value})}/>
              </div>
              <textarea className="input h-28" placeholder="간단한 상황 설명" value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})}/>
              <button type="submit" className="btn-primary w-full justify-center">전문가 상담 요청</button>
              {toast && <div className="text-center text-sm text-emerald-600">{toast}</div>}
            </form>
            <div className="mt-3 text-xs text-slate-500">※ 실제 사건은 계약·진단·의학적 사정을 종합하여 개별 검토합니다.</div>
          </div>

          <div className="card bg-slate-50">
            <div className="font-semibold text-slate-800">연락처</div>
            <div className="mt-3 space-y-2 text-slate-700">
              <div><a className="hover:text-indigo-600" href="tel:01039339493">📞 {COMPANY.phone}</a></div>
              <div><a className="hover:text-indigo-600" href="mailto:daewoncho@naver.com">✉️ {COMPANY.mail}</a></div>
              <div><a className="hover:text-indigo-600" href={COMPANY.kakao} target="_blank" rel="noreferrer">💬 카카오 오픈채팅</a></div>
              <div>📍 전국</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

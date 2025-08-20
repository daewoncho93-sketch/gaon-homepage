import { useState } from 'react'
export default function LeadForm() {
  const [form, setForm] = useState({ name:'', phone:'', type:'교통사고', memo:'', keyword:'' });
  const [status, setStatus] = useState({ ok:false, msg:'' });
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ok:false, msg:'전송 중...' });
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, origin: '홈페이지' })
      });
      const j = await r.json();
      if (j.ok) { setStatus({ ok:true, msg:'접수되었습니다. 곧 연락드리겠습니다.' });
        setForm({ name:'', phone:'', type:'교통사고', memo:'', keyword:'' });
      } else { setStatus({ ok:false, msg:'전송 실패: ' + (j.error || '') }); }
    } catch { setStatus({ ok:false, msg:'전송 실패' }); }
  };
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="border rounded-xl px-3 py-2" placeholder="이름" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="border rounded-xl px-3 py-2" placeholder="연락처(숫자만)" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select className="border rounded-xl px-3 py-2" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
          <option>교통사고</option>
          <option>배상책임사고</option>
          <option>산재사고</option>
          <option>해상사고</option>
          <option>개인보험</option>
          <option>단체보험</option>
        </select>
        <input className="border rounded-xl px-3 py-2" placeholder="사건 키워드 (선택)" value={form.keyword} onChange={e=>setForm({...form, keyword:e.target.value})} />
      </div>
      <textarea className="border rounded-xl px-3 py-2 w-full h-28" placeholder="간단한 상황 설명" value={form.memo} onChange={e=>setForm({...form, memo:e.target.value})} />
      <button type="submit" className="btn btn-primary w-full">전문가 상담 요청</button>
      {status.msg && <div className={`text-sm ${status.ok?'text-emerald-600':'text-rose-600'}`}>{status.msg}</div>}
    </form>
  )
}

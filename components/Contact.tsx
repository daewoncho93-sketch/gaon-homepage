import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold">상담 · 연락처</h2>
        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="space-y-2 text-slate-700">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-600"/> 010-3933-9493</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-600"/> daewoncho@naver.com</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-600"/> 상담 가능 지역: 전국</div>
          </div>
        </div>
      </div>
    </section>
  );
}

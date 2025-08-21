
export default function CaseCard({ title, tags=[], amount="2,000만원 이상", body }){
  return (
    <div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition bg-white">
      <div className="text-sm text-gaon-accent font-semibold">{tags.join(" · ")}</div>
      <h3 className="mt-1 font-bold text-lg">{title}</h3>
      <div className="mt-2 text-slate-700">{body}</div>
      <div className="mt-4 text-sm font-semibold text-slate-900">합의·보상금: {amount}</div>
    </div>
  )
}

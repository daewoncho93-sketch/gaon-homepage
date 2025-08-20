"use client";
import { useState } from "react";

export default function Calculator() {
  const [amount, setAmount] = useState<string>("10000000");
  const [faultRate, setFaultRate] = useState<string>("20");
  const [result, setResult] = useState<number | null>(null);

  const calc = () => {
    const base = Number(amount) || 0;
    const fault = Number(faultRate) || 0;
    const final = Math.max(0, Math.round(base * (1 - fault / 100)));
    setResult(final);
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">기본 손해액 (원)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">과실 비율 (%)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2"
            value={faultRate}
            onChange={(e)=>setFaultRate(e.target.value)}
          />
        </div>
      </div>
      <button onClick={calc} className="mt-4 rounded-xl bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-700">
        계산하기
      </button>
      {result !== null && (
        <div className="mt-4 text-lg font-bold">{result.toLocaleString()} 원</div>
      )}
    </div>
  );
}

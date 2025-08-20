"use client";
import { useState } from "react";

export default function Calculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const amt = parseFloat(amount);
    const rt = parseFloat(rate);
    if (!isNaN(amt) && !isNaN(rt)) {
      setResult(amt * (rt / 100));
    }
  };

  return (
    <section className="w-full max-w-3xl my-12">
      <h2 className="text-2xl font-bold mb-4">합의금 계산기</h2>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="금액 (예: 10000000)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="과실비율 (예: 20)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={calculate}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          계산하기
        </button>
        {result !== null && (
          <p className="mt-4 font-semibold text-lg">
            예상 합의금: {result.toLocaleString()} 원
          </p>
        )}
      </div>
    </section>
  );
}

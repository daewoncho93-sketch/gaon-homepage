'use client';
import { useEffect, useState, useRef } from 'react';
import { testimonials } from './testimonialsData';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const height = 170 + 12; // item height + gap (approx to CSS)
    trackRef.current.style.transform = `translateY(-${index * height}px)`;
  }, [index]);

  return (
    <div className="testi">
      <div>
        <div className="kicker">실제 후기</div>
        <h3>일반인의 말투, 결과로 증명합니다</h3>
        <div className="notice">* 개인정보 보호를 위해 일부 표현과 금액 표기가 조정되었습니다.</div>
        <div className="dotbar">
          {testimonials.map((_, i) => (
            <div key={i} className={`dot ${index===i?'active':''}`} />
          ))}
        </div>
      </div>
      <div className="testi-carousel">
        <div ref={trackRef} className="testi-track">
          {testimonials.map(t => (
            <div key={t.id} className="quote">
              <p>{t.text}</p>
              <div className="meta">
                <span className="badge">{t.tag}</span>
                <span>·</span>
                <span>{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

# 손해사정사무소 가온 (시뮬레이터 반영판)

## 설치
```bash
npm i
npm run dev
# 또는 Vercel
vercel
```

## 수정 포인트
- 데이터: `data/impairments_by_accident.json` (사고유형/평가기준/부위/항목/율)
- 금액 기본값: 3억원 (`pages/simulator.js`의 sum 상태)
- 연락처/카카오: `pages/index.js`, `pages/simulator.js` 내부 링크

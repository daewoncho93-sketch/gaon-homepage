import ReviewSlider from "@/components/ReviewSlider";

const items = [
  {tag:"초고액", text:"보험사 700만 제시 → 4,200만 합의. \n자료 정리부터 동행까지 술술 진행됐어요.", meta:"40대 자영업"},
  {tag:"불승인 뒤집기", text:"0% 통보에서 15% 인정. \n'안 된다'던게 진짜 되네요.", meta:"30대 회사원"},
  {tag:"사망사고", text:"정리가 안됐는데 팀이 같이 붙어서 1.8억 이상 수령. \n진짜 감사합니다.", meta:"유족"},
  {tag:"의료자문", text:"대학병원 의료진 검토로 장해율 상향. \n이건 혼자 못합니다.", meta:"50대"},
  {tag:"분쟁 대응", text:"면책 주장 반박서면으로 치료비 + 위자료까지.", meta:"20대"},
  {tag:"속전속결", text:"2주만에 합의. 디테일이 남다릅니다.", meta:"60대"},
];

export default function Reviews(){
  return (
    <div className="container">
      <div className="card">
        <div className="kicker">후기</div>
        <h2 className="h2">의뢰인 후기 (자동 슬라이드)</h2>
        <ReviewSlider items={items} />
        <p className="small" style={{marginTop:10}}>표시된 금액은 사례별 실제 수령액으로, 사건별로 결과는 달라질 수 있습니다.</p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="hr" />
        <div className="small">
          상호: 손해사정사무소 가온 · 대표/책임손해사정사: 가온 · 사업자등록번호: -<br/>
          무료상담: 010-3933-9493 · 카카오톡 채널: <a className="highlight" href="https://open.kakao.com/o/sNpCmpXc" target="_blank">바로 연결</a><br/>
          ⓒ {new Date().getFullYear()} GAON. All rights reserved.
        </div>
      </div>
    </div>
  );
}

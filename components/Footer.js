export default function Footer(){
  return (
    <div className="footer">
      <div className="container">
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
          <div>
            <b>손해사정사무소 가온</b><br/>
            사업자등록: (예시) 000-00-00000<br/>
            대표: 차대원 | 전화: <a href="tel:01039339493">010-3933-9493</a> | 
            카카오톡: <a href="https://open.kakao.com/o/sNpCmpXc" target="_blank">채널 바로가기</a>
          </div>
          <div className="small">
            © {new Date().getFullYear()} GAON Loss Adjusters. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

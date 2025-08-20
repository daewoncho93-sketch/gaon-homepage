export default function ReviewSlider({items=[]}){
  // duplicate list to create seamless scroll effect
  const list = [...items, ...items];
  return (
    <div className="slider card">
      <div className="kicker">Real Stories</div>
      <h3>의뢰인 후기</h3>
      <div className="slide-track">
        {list.map((r,idx)=>(
          <div className="slide card" key={idx} style={{minWidth:320}}>
            <div className="badge">{r.tag}</div>
            <p style={{marginTop:10,whiteSpace:'pre-wrap'}}>{r.text}</p>
            <div className="small" style={{marginTop:8}}>{r.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

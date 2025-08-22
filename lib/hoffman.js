export function hoffmanSum(months){
  const r = 0.05/12;
  let acc = 0;
  for(let m=1; m<=months; m++){
    acc += 1 / (1 + r * m);
  }
  return acc;
}

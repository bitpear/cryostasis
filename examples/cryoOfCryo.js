const Cryo = require('..');

const one = Cryo(async o => {
  console.log('quo', o)
  o.v++;
  return o;
}, {
  v: 0
});

const two = Cryo(o => {
  console.log('qui', o);
  o.v += 10;
  return o;
}, one);


(async function main(params) {
  const gna = await two.update();
  console.log(two, gna);
})()
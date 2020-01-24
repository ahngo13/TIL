const Calc = require('./calc');

const calc = new Calc();

calc.emit('stop');
const result = calc.add(1,2);
console.log(result);
console.log(Calc.title + '에 stop 이벤트 전달');

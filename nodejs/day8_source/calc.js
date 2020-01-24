const util = require('util');
const EventEmitter = require('events').EventEmitter;

var Calc = function(){
    var self = this;

    this.on('stop',()=>{
        console.log('Calc에 stop event 전달');
    });
};

util.inherits(Calc, EventEmitter); //Calc 객체에 이벤트 처리를 할 수 있도록 상속함

Calc.prototype.add = (a,b)=>{
    return a+b;
}

module.exports = Calc;
module.exports.title = 'calculator';
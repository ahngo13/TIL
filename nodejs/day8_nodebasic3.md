### 주소문자열을 URL 객체로 변환

url.js

~~~js
const url = require('url');

//주소 문자열을 URL 객체로 만듦
const curlURL = url.parse('https://www.youtube.com/watch?v=IbtKd3XGL3c');

// URL 객체를 주소 문자열로 만들기
const curStr = url.format(curlURL);

console.log(`주소문자열 : ${curStr}`);
console.dir(curlURL);
~~~



### 요청 파라미터 확인

url.js

~~~js
const url = require('url');
const querystring = require('querystring');

//주소 문자열을 URL 객체로 만듦
const curlURL = url.parse('https://www.youtube.com/watch?v=IbtKd3XGL3c');

// URL 객체를 주소 문자열로 만들기
const curStr = url.format(curlURL);

console.log(`주소문자열 : ${curStr}`);
console.dir(curlURL);

//요청 파라미터 확인하기
const param = querystring.parse(curlURL.query);
console.log(`파라미터 안에있는 v 값: ${param.v}}`);
console.log(`원본 파라미터: ${querystring.stringify(param)}`);
~~~

~~~
주소문자열 : https://www.youtube.com/watch?v=IbtKd3XGL3c
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.youtube.com',
  port: null,
  hostname: 'www.youtube.com',
  hash: null,
  search: '?v=IbtKd3XGL3c',
  query: 'v=IbtKd3XGL3c',
  pathname: '/watch',
  path: '/watch?v=IbtKd3XGL3c',
  href: 'https://www.youtube.com/watch?v=IbtKd3XGL3c'
}
파라미터 안에있는 query 값: IbtKd3XGL3c}
원본 파라미터: v=IbtKd3XGL3c
~~~



### 이벤트 보내고 받기

#### 프로세스가 끝날 때를 확인

event1.js

~~~js
process.on('exit',()=>{
    console.log('exit 이벤트 발생');
});

setTimeout(()=>{
    console.log('2초 후 시스템 종료 시도');

    process.exit();
},2000);

~~~



#### 직접 만든 이벤트 처리

event2.js

~~~js
process.on('tick',(count)=>{
    console.log(`tick 이벤트 발생 ${count}`);
});

setTimeout(() => {
    console.log(`2초 후에 tick 이벤트 전달 시도`);

    //이벤트를 다른쪽으로 전달할 때 사용
    process.emit('tick','2');
}, 2000);
~~~



#### 더하기 객체 모듈 만들기

calc.js

~~~js
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
~~~



event3.js

~~~js
const Calc = require('./calc');

const calc = new Calc();

calc.emit('stop');
const result = calc.add(1,2);
console.log(result);
console.log(Calc.title + '에 stop 이벤트 전달');
~~~



### 파일 다루기



#### 파일 읽기

file1.js

~~~js
const fs = require('fs');

//동기식으로 파일을 읽어옴
const data = fs.readFileSync('./text.txt','utf-8');

console.log(data);

//비동기식으로 읽어옴(대부분 비동기 방식의 메소드를 주로 사용함)
fs.readFile('./text.txt','utf-8',(err,data)=>{
    console.log(data);
});
~~~



#### 파일 쓰기

file2.js

~~~js
const fs = require('fs');

fs.writeFile('./text.txt', 'update Text file', (err)=>{
    if(err){
        console.log('error : ' + err);
    }
    console.log('text.txt 파일에 데이터 쓰기');
});
~~~




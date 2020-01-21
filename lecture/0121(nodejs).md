# 1/21

#### async, await 활용

~~~js
function a(){
    return new Promise((resolve, result)=>{
        setTimeout(()=>{
            resolve("hello");
        },2000);
    });
}

function b(){
    return new Promise((resolve, result)=>{
        setTimeout(()=>{
            resolve("world");
        },1000);
    });
}

async function c(){
    console.log("start");
    const v1 = await a();
    console.log(v1);
    const v2 = await b();
    console.log(v2);
    console.log("end");
}

c();
~~~



### 모듈

- 노드는 코드를 모듈로 만들 수 있다

- 모듈이란 특정한 기능을 하는 함수나 변수들의 집합

- 자바의 클래스와 비슷



var.js

~~~js
const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = { //객체 생성
    odd,
    even,
};
~~~



func.js

~~~js
const {odd, even} = require('./var'); 
//var.js 가져다가 odd, even 변수를 가져옴
//물론 객체로도 가져올 수 있음

function checkOddEven(num){
    if(num % 2){ // 홀수면
        return odd; //홀수 입니다.
    }
    return even; // 짝수입니다.
}

module.exports = checkOddEven;//checkOddEven이라는 이름으로 Export
~~~



index.js

~~~js
const {odd, even} = require('./var'); // var.js를 가져옴
const checkNumber = require('./func'); // func.js를 가져옴

function checkStringOddOrEven(str){//문자열 글자 수 갯수를 체크하는 function 생성
    if(str.length % 2){ //홀수면
        return odd; // 홀수입니다.
    }
    return even; // 짝수입니다.
}

console.log(checkNumber(10)); //var.js에 있는 checkNumber(10) 결과값을 콘솔에 출력
console.log(checkStringOddOrEven('hello')); //checkStringOddOrEven 값 콘솔 출력
~~~



#### mongoDB와 연동시 사용하는 API docs

https://mongoosejs.com/docs/api.html



#### global

브라우저의 window와 같은 전역 객체



globalA.js

~~~js
module.exports = () => globalThis.message;
~~~

globalB.js

~~~js
const A = require('./globalA');

global.message = '안녕하세요';
console.log(A());
~~~



#### console

console.js

~~~js
const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};

console.time('전체 시간');
console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요');

console.dir(obj, {colors:false, depth:2});
console.dir(obj, {colors:true, depth:1});

console.time('시간 측정'); //값이 타이틀이 됨. timeend도 동일해야 함.
for(let i =0;i<100000; i++){
    continue;
}

console.timeEnd('시간 측정');

function b(){
    console.trace('에러 위치 추적');
}

function a(){
    b();
}

a();

console.timeEnd('전체 시간');

~~~

#### __filename, __dirname

~~~js
console.log(__filename);
console.log(__dirname);
~~~

~~~
PS C:\Users\student\TIL\node> node filename
C:\Users\student\TIL\node\filename.js
~~~



#### module, exports

~~~js
// const odd = '홀수입니다';
// const even = '짝수입니다';

// module.exports = { //객체 생성
//     odd,
//     even,
// };
//위의 내용과 동일
exports.odd = '홀수입니다';
exports.even = '짝수입니다';
~~~

~~~js
console.log(module.exports===exports); // true
~~~



#### process

~~~
> process.version
'v12.14.1'
> process.arch
'x64'
> process.platform
'win32'
> process.pid
2936
> process.uptime()
29.04328
> process.execPath
'C:\\Program Files\\nodejs\\node.exe'
> process.cwd()
'C:\\Users\\student\\TIL\\node'
> process.cpuUsage()
{ user: 250000, system: 93000 }
~~~



~~~js
let i = 1;
setInterval(()=>{
    if(i === 5){
        console.log('종료!');
        process.exit(); // 프로세스 종료
    }
    console.log(i);
    i+=1;
}, 1000);
~~~



### 내장 모듈 사용하기

### node API docs

https://nodejs.org/ko/docs/

https://nodejs.org/dist/latest-v12.x/docs/api/os.html

내장 모듈을 사용하기 위해서는 require(''); 를 사용해야 한다.

#### OS

~~~js
const os = require('os');

console.log('운영체제 정보---------------');
console.log('os.arch():', os.arch());
console.log('os.platform():', os.platform());
console.log('os.type():', os.type());
console.log('os.uptime():', os.uptime());
console.log('os.hostname():', os.hostname());
console.log('os.release():', os.release());

console.log('경로---------------');
console.log('os.homedir():', os.homedir());
console.log('os.tmpdir():', os.tmpdir());

console.log('cpu 정보---------------');
console.log('os.cpus():', os.cpus());
console.log('os.cpus().length:', os.cpus().length);

console.log('메모리 정보---------------');
console.log('os.freemem():', os.freemem());
console.log('os.totalmem():', os.totalmem());

~~~



#### path

~~~js
const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('--------------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));
console.log('path.basename():', path.dirname(string, path.extname(string)));
console.log('--------------------------------');
console.log('path.parse():', path.parse(string));
console.log('path.format():', path.format({
    dir: 'c:\\users\\zerocho',
    name: 'path',
    ext: '.js',
}));

console.log('path.normalize():',path.normalize('C://users\\\\zerocho\\\path.js'));
console.log('--------------------------');
console.log('path.isAbsolute():', path.isAbsolute('C:\\'));
console.log('path.isAbsolute():', path.isAbsolute('./home'));
console.log('--------------------------');
console.log('path.relative():', path.relative('C:\\users\\zerocho\\path.js','C:\\'));
console.log('path.join():',path.join(__dirname, '..', '..', '/users', '.', '/zerocho'));
console.log('path.resolve():', path.resolve(__dirname, '..', 'users', '.', '/zerocho'));
~~~



##### resolve는 절대경로, join 상대경로

path.join('/a', '/b', 'c'); // 결과 /a/b/c/ 

path.resolve('/a', '/b', 'c'); // 결과 /b/c/ 



#### url

주로 많이 사용하는 메서드

- url.parse(주소) : 주소 분해(WHATWG 방식과 비교하면 username, password → auth, searchParams → query)
- url.format(객체) : 분해되었던 객체를 다시 원래 상태로 조립
- WHATWG 방식은 부분주소를 처리할 수 없음

~~~js
const url = require('url');

const URL = url.URL;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('--------------------------------');
const parseUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=00100100#anchor');
console.log('url.parse():', parseUrl);
console.log('url.format():', url.format(parseUrl));
~~~



#### querystring

~~~js
const url = require('url');
const querystring = require('querystring');

const parseUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
const query = querystring.parse(parseUrl.query);
console.log('querystring.parse():', query);
console.log('querystring.stringify():', querystring.stringify(query));
~~~



#### file system

~~~js
const fs = require('fs');

fs.readFile('./readme.txt', (err, data)=>{
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
~~~



~~~js
const fs= require('fs');

fs.writeFile('./writeme.txt', '글이 입력됩니다!!', (err)=>{
    if(err){
        throw err;
    }
    fs.readFile('./writeme.txt', (err, buffer)=>{
        if(err){
            throw err;
        }
        console.log(buffer.toString());
    });
});
~~~



### 동기 메서드와 비동기 메서드

#### 비동기 메서드(순서없음)

~~~js
const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt',(err,buffer)=>{
    if(err){
        throw err;
    }
    console.log('1번',buffer.toString());
});

fs.readFile('./readme2.txt', (err, buffer)=> {
    if(err){
        throw err;
    }
    console.log('2번',buffer.toString());
});

fs.readFile('./readme2.txt', (err, buffer)=> {
    if(err){
        throw err;
    }
    console.log('3번',buffer.toString());
});

console.log('끝');
~~~



#### 동기와 비동기 : 함수가 바로 return되는지 여부

#### 블로킹과 논블로킹 : 백그라운드 작업 완료 여부



#### 동기 메서드(순서대로)

~~~js
const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');
~~~



#### 동기여도 논블로킹 처리 가능

~~~js
const fs = require('fs');

console.log('시작');
setImmediate(()=>{
    let data = fs.readFileSync('./readme2.txt');
    console.log('1번', data.toString());
});

setImmediate(()=>{
    data = fs.readFileSync('./readme2.txt');
    console.log('2번', data.toString());
});

setImmediate(()=>{
    data = fs.readFileSync('./readme2.txt');
    console.log('3번', data.toString());
});

console.log('끝');
~~~



#### readStream

~~~js
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark:8});
const data = [];

readStream.on('data', (chunk)=>{
    data.push(chunk);
    console.log('data:', chunk, chunk.length);
});

readStream.on('end', ()=>{
    console.log('end:', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error:', err);
});
~~~



### 예외 처리

~~~js
setInterval(()=>{
    console.log('시작');
    try {
        throw new Error('서버를 고장내주마!');
    } catch (err) {
        console.error(err);
    }
    console.log('끝');
},1000);
~~~



~~~js
const fs = require('fs');

setInterval(()=>{
    fs.unlink('./abcdefg.js',(err)=>{
        if(err){
            console.error(err);
        }
    });
}, 1000);
~~~



uncaughtException 이벤트 리스너가 연결되어 있으므로 프로세스가 멈추지 않음.

~~~js
process.on('uncaughtException', (err)=>{
    console.error('예기치 못한 에러',err);
});

setInterval(()=>{
    throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(()=>{
    console.log('실행됩니다');
},2000);
~~~



## HTTP 서버

~~~js
const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('요청 옴');
    res.write('<!DOCTYPE html>');
    res.write('<head>');
    res.write('<meta charset="utf-8"/>');
    res.write('<title>Node.js 웹서버</title>');
    res.write('<body>');
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p></body></html>');

});

server.listen(8080, ()=>{
    console.log('server listen...');
});
~~~



~~~js
const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    fs.readFile('./index.html', (err,buffer)=>{
        if(err){
            throw err;
        }
        res.end(buffer);
    });
}).listen(8080,()=>{
    console.log('8080번 포트에서 서버 대기중 입니다.');
});

~~~



## npm

Node Package Manager

https://www.npmjs.com/



### npm 명령어

- npm init : package.json 파일 생성

- npm install express : express 설치 **(npm i)**

- npm install morgan kookie-parser express-session : 모듈 여러개 동시 설치

- npm install --save dev nodemon : 개발용 패키지 설치 **(--dave-dev : -D)**

- npm install ---global rimraf : 전역 설치**(--global : -g)**

- rimraf node_modules : 전역 폴더 삭제



### 패키지 버전

- major 버전 : 하위 호환이 안될 정도로 패키지의 내용이 수정 되었을 때 (1.0.0→2.0.0)
- minor 버전 : 하위 호환이 되는 기능을 업데이트 했을 경우 (1.0.0→1.1.0)
- patch 버전 : 기존 기능에 문제가 있어 수정한 것을 내놓았을 때 (1.0.0→1.0.1)




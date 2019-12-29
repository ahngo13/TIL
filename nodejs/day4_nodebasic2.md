### 내장 모듈

내장 모듈 : 미리 포함되어 있는 모듈 ↔ 외장 모듈 : 개발자가 직접 만들어 올린 모듈

내장 모듈은 별도의 설치없이 바로 사용가능

내장 모듈의 기능이 불편하거나 충분하지 않다면 외장 모듈을 사용하는게 더 편리할 수 있음



#### 내장모듈 확인 사이트

https://nodejs.org/api/



#### - os 모듈 : 시스템 정보 확인

os_module.js

~~~js
var os = require('os');

console.log('시스템의 hostname : %s', os.hostname());
console.log('시스템의 메모리 : %d / %d', os.freemem(), os.totalmem());
console.log('시스템의 CPU 정보\n');
console.dir(os.cpus());
console.log('시스템의 네트워크 인터페이스 정보\n');
console.dir(os.networkInterfaces());
~~~



#### - path 모듈 : 파일 패스를 다룰 때 사용

path_module.js

~~~js
var path = require('path');

//디렉토리 이름 합치기
var directories = ['C:', 'workspace', 'SIU'];
var docsDirectory = directories.join(path.sep);
console.log('문서 디렉토리 : %s', docsDirectory);

//디렉토리 이름과 파일 이름 합치기
var curPath = path.join("/users/jane", 'jane.exe');
console.log('파일 패스 : %s', curPath);

//디렉터리, 파일 이름, 확장자 구분
var filename = "C:\\Users\\hamletshu\\TIL.txt"
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);

console.log('디렉토리 : %s, 파일이름 : %s, 확장자 : %s', dirname, basename, extname);
        
~~~



## 자바스크립트

### 자료형

Boolean : true / false

Number : 정수나 부동 소수 값을 가지는 자료형

undefined : 값이 할당되지 않은 변수값

String : 문자열

null : 존재하지 않는 값

Object : 객체를 값으로 가지는 자료형



javascript_type.js

~~~js
var Person={};

Person['age'] = 31;
Person['name'] = '태연';
Person.mobile = '010-0000-0000';

console.log('나이 : %d', Person.age);
console.log('이름 : %s', Person.name);
console.log('전화 : %s', Person['mobile']);
~~~



#### 함수 선언

함수를 선언 하는 방식은 이렇게 아래와 같이 2가지가 있다.

function_test.js

~~~js
function add(a, b){
    return a + b;
}

var result = add(31, 1);

var add2= function (a, b){
    return a + b;
}

var result2 = add2(31, 1);

console.log('result : %d', result);
console.log('result2 : %d', result2);
~~~



#### 객체 안에 함수 선언하기

3가지 방법을 모두 사용할 수 있다.

attribute_test.js

~~~js
var Person={}; //첫번째 방법

Person['age'] = 31;
Person['name'] = '태연';
Person.add = function(a, b){
    return a+b;
}

var Person2={}; //두번째 방법

Person2['age'] = 30;
Person2['name'] = '유리';

var oper = function(a,b){
    return a + b;
}

Person2['add'] = oper;

var Person3 = { //세번째 방법
  age: 28,
  name : '서현',
  add : function(a,b){
    return a+b;
    }
};


console.log('태연의 내년 나이 구하기 : %d', Person.add(Person.age, 1));
console.log('유리의 내년 나이 구하기 : %d', Person2.add(Person2.age, 1));
console.log('서현의 내년 나이 구하기 : %d', Person3.add(Person3.age, 1));
~~~






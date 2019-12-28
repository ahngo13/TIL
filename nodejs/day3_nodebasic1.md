

# 노드 간단하게 살펴보기

### 노드에서 모듈 사용하기

모듈 : 별도의 파일로 분리된 독립 기능

노드에서 모듈을 사용할 때는 exports, module.exports가 있다.

어떤 것을 사용하는가에 따라 메인 팡리에서 모듈을 불러와 사용하는 방식이 다를 수 있다.



ch02_test4.js

~~~js
var calc = {};
calc.add = function(a, b) {
    return a + b;
}

console.log('모듈로 분리하기 전 - calc.add 함수 호출 결과 : %d', calc.add(10, 10));
~~~



#### exports 사용

calc.js

~~~js
exports.add = function(a, b) {
    return a + b;
}
~~~



ch02_test5.js

~~~js
var calc = require('./calc');
console.log('모듈로 분리한 후 - calc.add 함수 호출 결과 : ', calc.add(10, 10));
~~~

ch02_test5.js에서 calc.js 모듈 파일을 불러와서 사용



#### module.exports 사용

calc2.js

~~~js
var calc={};

calc.add = function(a, b){
    return a + b;
}

module.export = calc;
~~~



ch02_test5.js

~~~js
var calc = require('./calc');
console.log('모듈로 분리한 후 - calc.add 함수 호출 결과 : %d', calc.add(10, 10));

var calc2 = require('./calc2');
console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : %d', calc.add(10, 10));
~~~

모듈 파일을 불러와서 사용하는 곳은 같으나 exports와 module.exports에 따라서 모듈 파일은 구조가 달라지는 것을 확인할 수 있다.



 #### 외장 모듈

외장 모듈 : 다른 사람이 만들어 둔 모듈

~~~js
var nconf = require('nconf');
nconf.env();

console.log('OS 환경 변수의 값 : %s', nconf.get('OS'));
~~~

외장 모듈을 사용하기 위해서는 외장 모듈 설치가 필요하므로 npm을 활용해서 설치 필요



![1](https://user-images.githubusercontent.com/13622474/71541507-6fc4e380-299d-11ea-8014-05fbe9d37b34.png)

본 소스코드에는 nconf라는 외장 모듈을 사용하므로 npm install nconf 명령어로 외장 모듈을 설치



![2](https://user-images.githubusercontent.com/13622474/71541562-48bae180-299e-11ea-8a7d-474a727a9ec9.png)

OS 환경 변수의 값이 잘 출력됨을 확인할 수 있음


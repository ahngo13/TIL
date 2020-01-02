### 배열

여러 개의 데이터를 하나의 변수에 담아둘 수 있음

배열을 만들 때는 대괄호 사용

요소를 만들 때는 push() 사용



array1.js

~~~js
var Users = [{name:'태연', age:32}, {name: '서현', age:29}];

Users.push([{name:'유리', age:29}]);

console.log('소녀시대 멤버 수 : %d', Users.length);
console.log('첫 번째 멤버 이름 : %s', Users[0].name);
~~~



#### 배열의 요소에도 함수 할당 가능

array2.js

~~~js
var Users = [{name:'태연', age:32}, {name: '서현', age:29}];

var add = function(a, b){
    return a+b;
}

Users.push(add); //Users 배열 객체 요소에 함수 추가

console.log('배열 요소 수 : %d', Users.length);
console.log('세 번째 요소로 추가된 함수 실행 : %d', Users[2](1, 1));
~~~



#### 배열 요소 확인

array3.js

~~~js
var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}];

console.log('배열 요소의 수 : %d', Users.length);

console.log('for');

for(var i=0; i<Users.length; i++){
    console.log('배열 요소 이름 : %s', Users[i].name);
    console.log('배열 요소 나이 : %d', Users[i].age);
}

// for문과 foreach문 문법 차이가 있으니 유의
console.log('foreach');

Users.forEach(function(item, index){
    console.log('배열 요소 이름 : %s', item.name);
    console.log('배열 요소 나이 : %d', item.age);
});
~~~



#### 배열 값 추가 및 삭제

~~~js
var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}];
console.log(Users.length); // 최초 배열 요소 수 확인
console.dir(Users);

Users.push({name:'효연', age:31});
console.log(Users.length); // 배열 요소 추가
console.dir(Users);

Users.pop(); // 배열 끝에 있는 요소 삭제
console.log(Users.length);
console.dir(Users);

Users.unshift({name:'써니', age:31}); // 배열의 앞에 요소 추가
console.log(Users.length);
console.dir(Users);

Users.shift(); // 배열 앞에 있는 요소 삭제
console.log(Users.length);
console.dir(Users);
~~~



#### 특정 위치의 배열 요소 삭제

~~~js
var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}];
console.log(Users.length); // 최초 배열 요소 수 확인
console.dir(Users);

delete Users[1]; // 두번째 요소 삭제
console.log(Users.length); 
console.dir(Users); // 두번째 요소는 비어있는 것을 확인할 수 있음
~~~

~~~js
var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}];
Users.splice(1, 0, {name: '써니', age:30}); // 써니 요소를 1번 인덱스 값 위치에 넣음
console.dir(Users);

Users.splice(2, 1); // 2번 인덱스 값에 위치한 서현 요소 삭제
console.dir(Users); 
~~~



#### 일부 요소 잘라내기

~~~js
var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}, {name: '써니', age :30 }];
console.dir(Users);

var Users2 = Users.slice(1,3); //index 1번부터 3번 위치 전 요소까지 잘라내기
console.dir(Users2);

var Users3 = Users2.slice(1);//index 1번 위치 요소 잘라내기
console.dir(Users3);
~~~


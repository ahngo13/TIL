### 콜백 함수

함수가 실행되는 중간에 호출되어 상태 정보를 전달하거나 결과 값을 처리하는데 사용

매개 변수를 전달하는 함수

익명 함수를 매개변수에 곧바로 넣은 것

콜백 함수는 마지막에 변수를 써주는게 일반적임



callback1.js

함수를 호출했을 때 또 다른 함수 호출

~~~js
function add(a, b, callback){
    var result = a+b;
    callback(result);
}

add(20, 20, function(result){
    console.log('콜백 함수 호출');
    console.log('더하기 결과 : %d', result);
});
~~~



결과

~~~
콜백 함수 호출
더하기 결과 : 40
~~~



callback2.js

새로운 함수를 만들어 반환

~~~js
function add(a, b, callback){
    var result = a + b;
    callback(result);
    
    var history = function(){
        return a + ' + ' + b + ' = ' + result; 
    };
    return history;
}

var add_history = add(10, 10, function(result){
    console.log('파라미터로 전달된 콜백 함수 호출');
    console.log('더하기 값 결과 : %d', result);
});

console.log('결과 값으로 받은 함수 실행 결과 : ' + add_history());
~~~



결과

~~~
파라미터로 전달된 콜백 함수 호출
더하기 값 결과 : 20
결과 값으로 받은 함수 실행 결과 : 10 + 10 = 20
~~~



callback3.js
반환된 함수에서는 함수가 반환된 후에도 계속 접근 가능

~~~js
function add(a, b, callback){
    var result = a + b;
    callback(result);
    
    var count = 0; 
    var history = function(){
        count++;
        return count + ' : ' + a + ' + ' + b + ' = ' + result;
    };
    return history;
}

var add_history = add(20, 20, function(result){
    console.log('콜백 함수 호출');
    console.log('더하기 결과 : %d', result);
});

console.log(add_history());
console.log(add_history());
console.log(add_history());
~~~



결과

~~~js
콜백 함수 호출
더하기 결과 : 40 
1 : 20 + 20 = 40 //count변수는 add함수에서 반환된 함수안에서 계속 접근할 수 있음
2 : 20 + 20 = 40
3 : 20 + 20 = 40
~~~



클로저 : 함수 안에서 새로운 함수를 반환하는 경우에는 예외적으로 변수 접근을 허용
var Users = [{name:'태연', age:32}, {name: '서현', age:29}];

var add = function(a, b){
    return a+b;
}

Users.push(add); //Users 배열 객체 요소에 함수 추가

console.log('배열 요소 수 : %d', Users.length);
console.log('세 번째 요소로 추가된 함수 실행 : %d', Users[2](1, 1));
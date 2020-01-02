var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}, {name: '써니', age :30 }];
console.dir(Users);

var Users2 = Users.slice(1,3); //index 1번부터 3번 위치 전 요소까지 잘라내기
console.dir(Users2);

var Users3 = Users2.slice(1);//index 1번 위치 요소 잘라내기
console.dir(Users3);

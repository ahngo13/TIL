var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}];
console.log(Users.length); // 최초 배열 요소 수 확인
console.dir(Users);

delete Users[1]; // 두번째 요소 삭제
console.log(Users.length); 
console.dir(Users); // 두번째 요소는 비어있는 것을 확인할 수 있음

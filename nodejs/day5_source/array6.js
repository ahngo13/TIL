var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}];
Users.splice(1, 0, {name: '써니', age:30}); // 써니 요소를 1번 인덱스 값 위치에 넣음
console.dir(Users);

Users.splice(2, 1); // 2번 인덱스 값에 위치한 서현 요소 삭제
console.dir(Users); 

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
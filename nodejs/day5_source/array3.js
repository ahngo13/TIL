var Users = [{name:'태연', age:32}, {name: '서현', age:29}, {name: '유리', age:31}];

console.log('배열 요소의 수 : %d', Users.length);

console.log('for');

for(var i=0; i<Users.length; i++){
    console.log('배열 요소 이름 : %s', Users[i].name);
    console.log('배열 요소 나이 : %d', Users[i].age);
}

console.log('foreach');

Users.forEach(function(item, index){
    console.log('배열 요소 이름 : %s', item.name);
    console.log('배열 요소 나이 : %d', item.age);
});

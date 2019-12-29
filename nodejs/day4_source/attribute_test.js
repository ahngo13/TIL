var Person={};

Person['age'] = 31;
Person['name'] = '태연';
Person.add = function(a, b){
    return a+b;
}

var Person2={};

Person2['age'] = 30;
Person2['name'] = '유리';

var oper = function(a,b){
    return a + b;
}

Person2['add'] = oper;

var Person3 = {
  age: 28,
  name : '서현',
  add : function(a,b){
    return a+b;
    }
};


console.log('태연의 내년 나이 구하기 : %d', Person.add(Person.age, 1));
console.log('유리의 내년 나이 구하기 : %d', Person2.add(Person2.age, 1));
console.log('서현의 내년 나이 구하기 : %d', Person3.add(Person3.age, 1));
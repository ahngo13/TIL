function Person(name, age){
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed){
    console.log(speed + '배속으로 춤을 춥니다');
}

var person1 = new Person('태연', 32);
var person2 = new Person('유리', 31);

console.log(person1.name + ' ' + person1.age + '세');
person1.walk(1);
console.log(person2.name + ' '  + person2.age + '세');
person2.walk(2);
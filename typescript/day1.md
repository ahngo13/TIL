### 타입스크립트란

- ES5 < ESNext < TypeScript

- 구글의 Angular.js팀이 앵귤러 버전을 만들면서 타입스크립트를 채택하면서 널리 알려짐
- 리액트나 뷰에서도 타입스크립트 사용하는 추세



~~~typescript
function Person(name : string, age: number){ //타입스크립트의 타입 기능
//문제가 발생했을 때 원인을 친절하게 알려주므로써 선호하게 됨
}
~~~



#### 트랜스파일

- 타입스크립트 소스는 TSC(TypeScript Compiler) 트랜스파일러를 통해 ES5 자바스크립트 코드로 변환됨



### 타입스크립트 주요 문법

#### ESNext 주요 문법

1. 비구조화 할당

~~~typescript
let person = {name: "hamletshu", age: 32}
let {name, age} = person // name = "hamletshu, age = 32"와 같은 의미

let array = [1, 2, 3, 4, 5]
let [head, ...rest] = array // head = 1, rest = [2, 3, 4]와 같은 의미

let a = 1, b = 2
[a, b] = [b, a] // a와 b의 값을 바꾼 것과 같은 의미
~~~



2. 화살표 함수

~~~typescript
function add(a, b){return a+b}
const add2 = (a,b) = > a+b //function 키워드를 사용하지 않고 함수 선언
~~~



3. 클래스

객체지향 프로그래밍을 지원(캡슐화, 상속, 다형성)

~~~typescript
abstract class Animal {
	constructor(public name?: public age?: number){}
    abstract say(): string
}

class Cat extends Animal{
    say(){
        return 'miyao~'
    }
} 

class Dog extends Animal{
    say(){
        return 'baw~ wow~'
    }
}

let animals: Animal[] = [new Cat('고양이', 2), new Dog('멍멍이', 3)]
let sounds = animals.map(a=>a.say())
~~~



4. 모듈

파일을 분할해서 구현할 수 있게 해줌

~~~typescript
import * as fs from 'fs'
export function writeFile(filepath: string, content: any){}
~~~



5. 생성기

~~~typescript
function* gen(){ //function 키워드에 별표를 결합해서 만듦.
	yield* [1,2] //yield문은 반복자를 의미(반복기 생성)
    //yield문은 function*로 만들어진 함수 내부에서만 사용 가능
}
for(let value of gen()){ console.log(value) } // 1, 2
~~~



6. Promise와 async/await

Promise란 자바스크립트 비동기 처리에 사용되는 객체

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태



`new Promise()` 메서드를 호출하면 대기(Pending) 상태

`resolve`를 아래와 같이 실행하면 이행(Fulfilled) 상태

`then()`을 이용하여 처리 결과 값을 받을 수 있음

실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 `catch()`로 받을 수 있음



~~~typescript
async function get(){
	let values = []
	values.push(await Promise.resolve(1)) //1을 넣을 때까지 기다렸다가 다음 문장실행
    values.push(await Promise.resolve(2)) //2를 넣을 때까지 기다렸다가 다음 문장실행
    values.push(await Promise.resolve(3)) //3을 넣을 때까지 기다렸다가 다음 문장실행
    return values
}

get().then(values => console.log(values)) //1, 2, 3
~~~



#### 타입스크립트 문법

1. 타입 주석과 타입 추론

~~~typescript
let n: nubmer = 1 //타입 주석
let m = 2 //타입 추론
~~~



2. 인터페이스

~~~typescript
interface Person{
	name: string
	age?: number
}

let person: Person = {name: "Jane"}
~~~



3. 튜플

물리적으로는 배열과 같지만 배열에 저장되는 아이템의 데이터타입이 다르면 튜플

~~~typescript
let numberArray : number[]  = [1,2,3] //배열
let tuple: [boolean, number, string] = [true, 1, 'Ok'] //튜플
~~~



4. 제네릭 타입

다양한 타입을 한꺼번에 취급할 수 있게 해줌

~~~typescript
class Container<T>{
	constructor(public value: T){}
}

let nubmer Container: Container<number> = new Container<number>(1)
let stringContainer: Container<string> = new Container<string>('Hello world')
~~~



5. 대수 타입

추상 데이터 타입을 의미, 합집합 타입과 교집합 타입 두가지가 있음

~~~typescript
type NumberOrString = number |string // 합집합 타입
type AnimalAndPerson = Animal &Person // 교집합 타입
~~~


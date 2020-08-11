### 코틀린은 다중 패러다임 언어

- 함수형 프로그래밍 (FP)
- 객체 지향 프로그래밍 (OOP)



### 함수형 프로그래밍

- 코드 간략, 테스트나 재사용성 증가
- 람다식, 고차 함수를 사용해 구성
- 순수 함수



### 순수 함수

- 부작용이 없는 함수
  - 동일한 입력 인자에 대해서는 항상 같은 결과를 출력 혹은 반환
  - 값이 예측이 가능해 결정적이다.

~~~kotlin
fun sum (a: Int, b: Int): Int{
	return a + b //동일한 인자인 a, b를 입력 받아 항상 a + b를 출력(부작용이 없음)
}
~~~

- 순수 함수의 조건
  - 같은 인자에 대하여 항상 같은 값을 반환
  - 함수 외부의 어떤 상태도 바꾸지 않는다.
- 순수 함수가 아닌 예

~~~kotlin
fun check(){
	val test = User.grade() // check() 함수에 없는 외부의 User 객체를 사용
	if(test != null) process(test) //변수 test는 User.grade()의 실행 결과에 따라 달라짐
}
~~~

~~~kotlin
const val global = 10

fun main(){
	val num1 = 10
	val num2 = 3
	val result = noPureFunction(num1, num2)
	println(result)
}

fun noPureFunction(a: Int, b: Int): Int{
	return a + b + global // 입력값과 무관하게 외부의 변수 사용
}
~~~

- 순수 함수를 사용하는 이유
  - 재사용성이 높아진다.
  - 병행 작업시 안전
  - 테스트, 디버깅 등이 유리
- 함수형 프로그래밍에 적용
  - 함수를 매개변수, 인자 혹슨 반환값에 적용 (고차 함수)
  - 함수를 변수나 데이터 구조에 저장
  - 유연성 증가



### 람다식

- 익명 함수의 하나의 형태로 이름 없이 사용 및 실행이 가능
- 람다 대수로 부터 유래

~~~kotlin
{x, y -> x + y} //람다식의 예 (이름이 없는 함수 형태)
~~~



#### 람다식의 이용

- 람다식은 고차 함수에서 인자로 넘기거나 결과값으로 반환 등을 할 수 있다.



### 일급 객체

- 일급 객체는 함수의 인자로 전달할 수 있다.
- 일급 객체는 함수의 반환값에 사용할 수 있다.
- 일급 객체는 변수에 담을 수 있다.

### 코틀린에서 함수는 1급 객체로 다룸

- 1급 함수라고도 한다.



### 고차함수

~~~kotlin
fun main(){
	println(highFunc({x, y -> x + y }, 10, 20)) //람다식 함수를 인자로 넘김
}

fun highFunc(sum: (Int, Int)-> Int, a:Int, b:Int): Int = sum(a,b) //sum 매개변수는 함수
~~~


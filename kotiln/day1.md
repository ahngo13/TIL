# 기본 문법

### 변수와 상수

~~~kotlin
var a: int // var 변수명: 자료형 = 값
val b: int = 20 // val 상수명: 자료형 = 값, java와 비교할 때 final
~~~



### 함수

~~~kotlin
fun greet(str: String): Unit{ //fun 함수명 (인수1: 자료형1 ...) : 반환자료형
	println(str)
}
//반환 자료형이 없을 때 Unit을 사용하면 되고 생략도 가능하다.
~~~



### 기본 자료형

- 코틀린의 기본 자료형은 모두 객체 (자바에서는 프리미티브 자료형과 객체자료형으로 분류됨)



#### 여러 줄의 문자열 표현

~~~kotlin
val str = """ 여러줄로
문자열을
표현할 수 있습니다 """
~~~



#### 문자열 비교

- 문자열 비교는 ==을 사용, 자바의 equals와 동일



#### 문자열 템플릿

~~~kotlin
var str = "안녕"

println("$str 하세요")
println("${str}하세요")
~~~



#### 배열

~~~kotlin
val numbers: Array<Int> = arrayOf(1,2,3,4,5) //배열의 생성과 초기화
val numbers = arrayOf(1,2,3,4,5) //배열의 생성과 초기화 (자료형 생략)
numbers[0] = 5 //0번지의 값 변경
~~~



### 제어문

#### if문 : 자바와 동일

#### when : 자바의 switch~case문과 비슷

- if문처럼 식처럼, 함수의 반환값으로 활용가능

~~~kotlin
val x = 1

when(x){
	1-> println("x==1") 
	2, 3-> println("x==2 or x==3") //여러 값은 콤마로 구분
    in 4..7-> println("4부터 7사이")
    !in 8..10-> println("8부터 10사이가 아님")
    else->{
        print("x는 1이나 2가 아님")
    }
}
~~~



#### for

~~~kotlin
val numbers = arrayOf(1,2,3,4,5)

for(num in numbers){ // 모든 요소를 반환
	println(num) //1;2;3;4;5;
}

for(i in 1..3){ //1~3까지 반환
    println(i)
}

for(i in 0..10 step 2){//0~10까지 2씩 증가하며 출력
    println(i)
}

for(i in 10 downTo 0 step 2){//0~10까지 2씩 감소하면 출력
    println(i)
}
~~~



#### while, do~while

- 자바와 동일

~~~kotlin
var x = 10
println(x)
while(x>0){
    x--
    println(x)
}

var x= 10
do{
    x--
    println(x)
}while(x>0)
~~~










# 함수

### 함수의 선언

- Unit = void (Java)

~~~kotlin
fun 함수 이름([변수 이름: 자료형, 변수 이름: 자료형]):[반환값의 자료형]{
	표현식...
	[return 반환값]
}
~~~



### 반환 자료형 생략

- return문을 요약해서 표현 가능
- 반환형 Int도 추론하므로 생략 가능

~~~kotlin
fun sum(a: Int, b: Int): Int = a+b
~~~



### 전역 함수

~~~kotlin
package chap03.section1

fun sum(a: Int, b: Int) :Int {
    return a+b
} //최상위 함수

fun main() { //최상위 (Top-level) 함수
    val result1 = sum(2,3)
    println(result1)
}
~~~



### 지역 함수

~~~kotlin
fun main() { //최상위 (Top-level) 함수

    fun sum(a: Int, b: Int) :Int {
        return a+b
    } //최상위 함수

    val result1 = sum(2,3)
    println(result1)
}
~~~




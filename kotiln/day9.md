### 코틀린의 자료형 변환

~~~kotlin
val a: Int = 1 // 정수형 변수 a른 선언하고 1을 할당
val b: Double = a // 자료형 불일치 오류 발생
val c: Int = 1.1 // 자료형 불일치 오류 발생
~~~

- 변환 메서드의 이용

~~~kotlin
val b: Double = a.toDouble() // 변환 메서드 사용
~~~

- 표현식에서 자료형의 자동 변환

~~~kotlin
val result = 1L +3 // Long + Int -> Long
~~~



### 기본형과 참조형 자료형의 비교

- 이중등호 `==`  값만 비교하는 경우
- 삼중등호 `===` 값과 참조 주소를 비교할 때

~~~kotlin
val a: Int = 128
val b: Int = 128
println(a == b) // true
println(a === b) // true
~~~

- 참조 주소가 달라지는 경우

~~~kotlin
val a: Int = 128
val b: Int? = 128 // 동적이므로 참조 주소가 다름
println(a == b) // true
println(a === b) // false
~~~



~~~kotlin
fun main() {
    val a: Int = 128
    val b = a

    val c: Int? = a
    val d: Int? = a // 위치가 동적이므로 다름
    val e: Int? = c

    println(c == d)
    println(c === d)
    println(c === e)
}
~~~

- 코틀린에서는 참조형으로 선언한 변수의 값이 -128~127 범위에 있으면 캐시에 그 값을 저장

- 값에 따라 자료형을 결정
- Number형은 숫자를 저장하기 위한 특수한 자료형으로 스마트 캐스트됨

~~~kotlin
fun main() {
    var test: Number = 12.2 // Float로 스마트 캐스트
    println("$test")

    test = 12 // Int형으로 스마트 캐스트
    println("$test")
    test = 120L // Long형으로 스마트 캐스트
    println("$test")

    test += 12.0f // Float형으로 스마트 캐스트
    println("$test")
    
}
~~~

- is 키워드를 사용한 검사

~~~kotlin
fun main() {
    val num = 256

    if(num is Int){ // num이 int형일 때
        print(num)
    }else if(num !is Int){ // num이 Int형이 아닐 때
        print("Not a Int")
    }
}
~~~

- Any
  - 자료형이 정해지지 않은 경우
  - 모든 클래스의 뿌리 - Int나 String은 Any형의 자식 클래스
  - Any는 언제든 필요한 자료형으로 자동 변환 (스마트 캐스트)

~~~kotlin
fun main() {
    var a: Any = 1 // Any형 a는 1로 초기화될 때 Int형이 됨
    a = 20L // Int형이었던 a는 변경된 값 20L에 의해 Long이 됨
    println("a: $a type: ${a.javaClass}") // a의 자바 기본형을 출력하면 long이 나옴
}
~~~

~~~kotlin
fun main() {
    checkArg("Hello") // 문자열을 인자로 넣음
    checkArg(5) // 숫자를 인자로 넣음
}

fun checkArg(x:Any){ // 인자를 Any형으로 받음
    if(x is String){
        println("x is String: $x")
    }
    if(x is Int){
        println("x is Int: $x")
    }
}
~~~


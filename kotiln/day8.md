### null을 허용한 변수 검사

- 코틀린의 변수 선언은 기본적으로 null을 허용하지 않음

~~~kotlin
val a: Int = 30
var b: String = "Hello"
~~~

- null 가능한 선언
  - 단순 출력은 상관 없지만 멤버에 접근할 때는 NPE (NullPointerException 발생)

~~~kotlin
val a: Int? = null
var b: String? = null
~~~



- ?로 null 허용

~~~kotlin
fun main() {
    var str1: String? //null 허용
    str1 = null
    println(str1)
}
~~~



### 세이프 콜(Safe-call)

- 멤버 변수 접근 ? 사용 (null일 때는 null을 리턴)

~~~kotlin
fun main() {
    var str1: String?
    str1 = "hello"
    println("str1: $str1, length: ${str1?.length}" )
}
~~~



### non-null 단정 기호

- 멤버 변수 접근 !! 사용 (null일리 없을 때), 안 쓰는게 좋음

~~~kotlin
fun main() {
    var str1: String?
    str1 = null
    println("str1: $str1, length: ${str1!!.length}" )
}
~~~



### 더 안전하게 사용 (세이프 콜과 엘비스 연산자 사용)

~~~kotlin
fun main() {
    var str1: String?
    str1 = null
    val len = if (str1 != null) str1.length else -1
    println("str1: $str1, length: $len" )
}
~~~

~~~kotlin
fun main() {
    var str1: String?
    str1 = null
    val len = str1?.length ?: -1 //엘비스 연산자 (앞에 값이 null일 경우 -1이 들어간다)
    println("str1: $str1, length: $len" )
}
~~~


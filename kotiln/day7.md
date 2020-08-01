### 각 자료형의 최대 최솟값

~~~kotlin
package chap02.section2

fun main() {
    println("Int: ${Int.MIN_VALUE}~${Int.MAX_VALUE}")
    println("Byte: ${Byte.MIN_VALUE}~${Byte.MAX_VALUE}")
    println("Short: ${Short.MIN_VALUE}~${Short.MAX_VALUE}")
    println("Long: ${Long.MIN_VALUE}~${Long.MAX_VALUE}")
    println("Float: ${Float.MIN_VALUE}~${Float.MAX_VALUE}")
    println("Double: ${Double.MIN_VALUE}~${Double.MAX_VALUE}")
}
~~~

~~~
Int: -2147483648~2147483647
Byte: -128~127
Short: -32768~32767
Long: -9223372036854775808~9223372036854775807
Float: 1.4E-45~3.4028235E38
Double: 4.9E-324~1.7976931348623157E308
~~~



### 2의 보수

- 절댓값 이진수에 값을 뒤집고 1을 더함.



### 논리 자료형

- Boolean : true, false (1비트)



### 문자 자료형

- Char : 2바이트 (16비트)



### 문자열 자료형

- String으로 선언, String Pool이라는 공간에 구성

- String Pool에 생성된 문자열은 변경되지 않고 주소로 찾게 만듦

~~~kotlin
fun main(){
    var str1: String = "Hello"
    var str2 = "World"
    var str3 = "Hello"
    
    println("str1 === str2: ${str1 === str2}")
    println("str1 === str3: ${str1 === str3}")
}
~~~

~~~
str1 === str2: false
str1 === str3: true
~~~



### 표현식과 $ 기호 사용하여 문자열 출력하기

~~~kotlin
package chap02.section2

fun main() {
    var a = 1
    val str1 = "a = $a"
    val str2 = "a = ${a + 2}" //문자열에 표현식 사용

    println("str1: \"$str1\", str2: \"$str2\"")
    
}
~~~

~~~
str1: "a = 1", str2: "a = 3"
~~~




### 자료형

- 코틀린은 기본형 (int, long, float, double...)을 사용하지 않고 참조형을 사용한다.

- 참조형 Int (정수), String (문자열), Float (실수) ...



### 변수

- val (value) - 불변형 (immutable)
- var (variable) - 가변형 (mutable)



### 변수의 선언

- 자료형을 지정하지 않은 변수는 사용할 수 없다.
- 사용전 혹은 생성자 시점에서 변수를 초기화 해야한다.
- 변수 이름은 숫자로 시작하면 안된다.
- 변수 이름에는 예약어를 사용할 수 없다.
- 카멜 표기법으로 사용하는 것이 좋다.

 ~~~kotlin
//선언 키워드 / 변수 이름 / 자료형 / 값
val username: String = "Kildong"
 ~~~

~~~kotlin
fun main() {
    val username: String = "Kildong"
    println("username : $username")
}
~~~

~~~kotlin
fun main() {

    //ctrl + shift + p로 자동으로 설정된 자료형 추론 가능
    var username: String = "Kildong"
    var count : Int = 3
    username = "Dooly"

    println("username : $username")
}
~~~




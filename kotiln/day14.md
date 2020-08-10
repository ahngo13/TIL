### 함수를 활용한 예제 만들기

- 초기값을 위한 인자는 Float형
- 초기값은 두번째 부터 나열된 인자의 최종 평균 결과에 더함
- 초기값에 아무런 인자를 입력하지 않으면 0을 기본 사용
- 두번째부터 받아들일 인자는 가변형 인자로 모두 실수형 Float
- 반환값은 모든 인자의 평균값으로 마찬가지로 실수형 Double



~~~kotlin
package chap03.section1

fun avgFunc(initial: Float, vararg numbers:Float): Double{
    var result = 0f
    for(num in numbers){
        result += num
    }

    println("result: $result, numbers.size: ${numbers.size}")
    val avg = result / numbers.size
    return avg.toDouble()
}

fun main() {
    val result = avgFunc(5f, 100f, 90f, 80f) //첫번째 인자: 초기값, 이후 인자는 가변인자
    println("avg result: $result")
}

//1. Float
//2. vararg
//3. result += num
//4. result / numbers.size
//5. avg.toDouble()
~~~


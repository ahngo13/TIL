### 기본 연산자

- 종류
  - 산술, 대입, 증가, 감소, 비교, 논리 연산자 등
- 수식의 구조

~~~kotlin
val result = num1 + num2
~~~



#### 산술 연산자

`+, -, *, /, %`



#### 대입 연산자

- `=`
- `+=`
- `-=`
- `*=`
- `/=`
- `%=`



#### 증가 연산자와 감소 연산자

- `++` 선증가, 후증가
- `--` 선감소, 후감소

~~~kotlin
fun main() {
    var a: Int = 10
    var b: Int = 10

    var result1 = ++a //선증가
    var result2 = b++ //후증가

    println("result1: $result1, result2: $result2")
    println("a: $a, b: $b ")
}
~~~



#### 비교 연산자

- `>`
- `<`
- `>=`
- `<=`
- `==`
- `!=`
- `===`
- `!==`



#### 논리 연산자

- `&&` : 논리곱, 모두 true일 때 true, 아니면 false
- `||` : 논리합, 하나의 항이라도 true이면 true 아니면 false
- `!` : 부정 단항 연산자, true면 false로, false면 true로




# 개발환경 세팅



## 코틀린의 용도

- Kotlin/JVM - 자바 가상 머신 상에서 동작
- Kotlin/JS - 자바스크립트로 인한 브라우저에서 동작
- Kotlin/Native - LLVM기반의 네이티브 컴파일로 여러 타깃 앱에서 동작



## JDK 설치

### :x: Oracle JDK

- Oracle JDK SE 8은 유료 구독자에게만 업데이트를 제공

### :ballot_box_with_check: Open JDK

- Zulu 배포판은 OpenJDK 기반이며 TCK 인증 통과 했기 때문에 상업적 제품 개발 가능

https://www.azul.com/downloads/zulu-community/?architecture=x86-64-bit&package=jdk

- LTS 버전으로 설치
  - **LTS**는 해당 버전에 대해서 장기적인 지원을 보장

- 환경변수 설정
  - C:\Program Files\Zulu\zulu-8



## IntelliJ IDEA 설치

https://www.jetbrains.com/idea/download

:ballot_box_with_check: 64-bit launcher



### Hello Kotlin 출력하기

~~~kotlin
fun main() {
    println("Hello Kotlin")
}
~~~


### 자료형

- 부호있는 자료형
  - Long : 8 바이트 (64비트)
  - Int : 4 바이트 (32비트)
  - Short : 2 바이트 (16비트)
  - Byte : 1 바이트 (8비트)
- 부호없는 자료형 (음수 사용 가능)
  - ULong : 8 바이트 (64비트)
  - UInt : 4 바이트 (32비트)
  - UShort : 2 바이트 (16비트)
  - UByte : 1 바이트 (8비트)



#### 자료형 생략

~~~kotlin
val num05 = 127 // Int형으로 추론
val num06 = -32768 // Int형으로 추론
val num07 = 12341234 // Int형으로 추론
val num08 = 3473924792834237924 // Long형으로 추론
~~~



#### 접미사, 접두사 사용

~~~kotlin
val exp01 = 123 // Int형으로 추론
val exp02 = 123L // 접미사 L을 통해 Long형으로 추론
val exp03 = 0x0F // 접두사 0x를 사용해 16진 표기가 사용된 Int형으로 추론
val exp04 = 0b00001011 // 접두사 0b를 사용해 2진 표기가 사용된 Int형으로 추론
~~~



#### 작은 값의 사용

~~~kotlin
val exp08: Byte = 127 // 자료형을 Byte로 지정
val exp09 = 32767 // 자료형을 지정하지 않으면 Short형의 범위더라도 Int형으로 추론
val exp10: Short = 32767 // 자료형을 Short로 지정
~~~



#### 부호 없는 정수 자료형

~~~kotlin
val uint: UInt = 153u
val ushort: UShort = 65535u
val ulong: ULong = 46321521uL
val ubyte: UByte = 255u
~~~



#### 큰 수를 읽기 쉽게 표현 하는 방법

- 언더스코어(_)를 포함해 표현

~~~kotlin
val number = 1_000_000
val cardNum = 1234_1234_1234_1234L
val hexVal = 0xAB_CB_EF_12
val bytes = 0b1101_0010
~~~



#### 실수 자료형

~~~kotlin
val exp01 = 3.14 //Double로 추론
val exp02 = 3.14F //식별자에 의해 Float로 지정
~~~



- 공간 제약에 따른 부동 소수점 연산의 단점

~~~kotlin
package chap02.section2

fun main() {
    var num: Double = 0.1

    for (x in 0..999){
        num += 0.1
    }

    println("num: $num") // num: 100.09999999999859 출력
}
~~~


#### File>Setting

- Font 설정
- Ctrl + 마우스 휠로 크기 조정



#### Kotlin 코드

~~~kotlin
fun main() {
    println("Hello Kotlin")
}
~~~



#### Java 코드 (위의 Kotlin 코드를 Java로 변환했을 때)

- Tools > Kotlin > Show Kotlin Bytecode에서 Decomplie 하여 자바소스와 비교 가능

- Ctrl + b 단축키를 통해 하위 메소드를 확인할 수 있음.

~~~java
import kotlin.Metadata;

@Metadata(
   mv = {1, 1, 16},
   bv = {1, 0, 3},
   k = 2,
   d1 = {"\u0000\b\n\u0000\n\u0002\u0010\u0002\n\u0000\u001a\u0006\u0010\u0000\u001a\u00020\u0001¨\u0006\u0002"},
   d2 = {"main", "", "HelloKotlin"}
)
public final class HelloKotlinKt {
   public static final void main() {
      String var0 = "Hello Kotlin";
      boolean var1 = false;
      System.out.println(var0);
   }

   // $FF: synthetic method
   public static void main(String[] var0) {
      main();
   }
}
~~~



#### args 활용

- edit Configuration에서 arguments를 넣어준다.
- arguments 없이 실행했을 경우에는 아래와 같은 에러 발생

~~~
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 4
	at HelloKotlinKt.main(HelloKotlin.kt:6)
~~~

- 아래와 같이 실행했을 경우에는 해당 결과 값을 출력한다.

~~~kotlin
fun main(args: Array<String>) { //소스 외부에서 인자를 받아들인다.
    println("args[0] = ${args[0]}")
    println(args[1])
    println(args[2])
    println(args[3])
}
~~~

~~~
args[0] = arg1
arg2
3
hwang
~~~




### 최대, 최소를 구하는 함수 만들기

~~~kotlin
package chap03.section1

fun sum(a: Int, b: Int) :Int {
    return a+b
}

fun max(a: Int, b: Int): Int{
    return if (a>b) a else b
}

fun outfunc(name: String): Unit{
    println("Name: $name")
}

fun main() {

    val result1 = sum(2,3)
    println(result1)

    val a = 3
    val b = 5
    println(max(a, b))
    outfunc("Kildong")
}



~~~



### 축약형으로 변경

~~~kotlin
package chap03.section1

fun sum(a: Int, b: Int) = a+b


fun max(a: Int, b: Int) = if (a>b) a else b


fun outfunc(name: String): Unit = println("Name: $name")


fun main() { //최상위 (Top-level) 함수

    val result1 = sum(2,3)
    println(result1)

    val a = 3
    val b = 5
    println(max(a, b))
    outfunc("Kildong")
}
~~~



### 매개변수의 기본값 넣기

~~~kotlin
package chap03.section1

fun sum(a: Int = 2 , b: Int = 5) = a+b //매개변수의 기본값 넣기


fun max(a: Int, b: Int) = if (a>b) a else b


fun outfunc(name: String): Unit = println("Name: $name")


fun main() {

    val result1 = sum(2,3)
    val result3 = sum()
    println(result1)

    val a = 3
    val b = 5
    
    println(max(a, b))
    println(result3)
    outfunc("Kildong")
}
~~~



### 특정 인자만 변경

~~~kotlin
package chap03.section1

fun sum(a: Int = 2 , b: Int = 5) = a+b


fun max(a: Int, b: Int) = if (a>b) a else b


fun outfunc(name: String): Unit = println("Name: $name")


fun main() {

    val result1 = sum(2,3)
    val result3 = sum(b = 2) //b의 값만 2로 변경
    println(result1)

    val a = 3
    val b = 5
    
    println(max(a, b))
    println(result3)
    outfunc("Kildong")
}
~~~



### 가변인자 (vararg)

~~~kotlin
package chap03.section1

fun normalVarargs(vararg  a: Int){
    for(num in a){
        print("$num ")
    }
}

fun main() {
    normalVarargs(1) //한개의 인자만으로 구성
    println()
    normalVarargs(1,2,3,4) // 4개의 인자로 구성
}
~~~


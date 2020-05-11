Bean : 스프링이 관리 해주는 객체

BeanFactory : Bean을 생성, 관리해주는 컨테이너 객체

ApplicationContext : BeanFactory와 동일한 기능을 하고, 추가적인 기능을 제공한다.

Meta Data : Spring Configuration XML

XML : F/W에 개발자가 정의한 클래스 정보를 알려주기 위함



~~~java
// 1.
public class Hello {
	private Printer printer;
}

// 2. 다른 구현 클래스 ConsolePrinter로 런타임에 교체하는 것이 불가능하다. 유연성이 떨어진다.
public class Hello{
    private SringPrinter printer;
}
~~~



### DI

- 전략1 - 설정을 모두 XML에 한다.

1. setter injection

~~~xml
<property name="" value="" ref="">
~~~

2. constructor injection

~~~xml
<constructor-org/>
~~~



- 전략2 - 설정을 클래스와 XML에 한다.

1. setter injection

   @value, @Autowired

   

2. constructor injection

   ~~~xml
   <context:component-scan base-packeges=""/>
   ~~~

   

- 전략3 - 설정을 클래스에 한다.

1. @Configuration
2. @ComponentScan

~~~xml
<context:component-scan/>와 동일
~~~

3. @Bean



Run SQL Commend Line 실행

SQL> start C:\spring\sql_oracle\scott.sql

SQL> start C:\spring\sql_oracle\user.sql

SQL> select * from users;

SQL> start C:\spring\sql_oracle\student.sql

SQL> select * from student;



### MyBatis 예습

### DI 복습
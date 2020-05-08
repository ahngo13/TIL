#### 참고 문서

https://blog.naver.com/vega2k/221951736862



### Spring Framework

- DI, Spring-Test, jDBC, MyBatis, AOP, Servlet/JSP, Spring MVC (JSP, JSTL)

- REST Service (JSON, XML)



### Spring Boot

- JPA, Spring MVC(Thymeleaf), REST
- Spring Security



### 패키지 룰

#### kbstar.cms.dao (data access object, db 연결)

#### 			.service (Biz logic)

#### 			.controller (frontend 와 backend 연결)

#### 			.vo (value object) / entity / dto(data transfer object) / javabeans

#### 			.exception

#### 			.mapper



### Maven

: pom.xml 설정파일

~~~xml
<dependency>
</dependency>
~~~



https://mvnrepository.com/



### 홈워크

Java 연습문제 2개

Spring DI(Dependecy Injection)이란?

Junit 이란?



### 디자인 패턴

: 가이드라인

: GoF패턴 (Gang of Four)

-Eric Gamma



### WAS(Web Application Server)

: Web Container + EJB Container

: J2EE API 구현체, 미들웨어 



Tomcat은 Web Container / Web Server ?

: Web Container

Apach, Nginx에서 JSP를 실행 시킬 수 있을까요?

: 없다.



### Spring이 나오게 된 배경

: EJB를 사용하지 않고(WAS가 없어도) 자바기반 엔터프라이즈 어플리케이션을 POJO(Plain Old Java Object) 기반으로 작성할 수 있도록 해주겠다.
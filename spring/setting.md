# Spring Framework 개발환경 세팅

### Spring과 Spring Boot의 차이

- 간단하게 말하면 소규모 사이트 개발 시 Spring Boot, 대규모 사이트 개발 시 Spring

https://monkey3199.github.io/develop/spring/2019/04/14/Spring-And-SpringBoot.html



### JDK 설치

https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html



### 환경변수 세팅

윈도우 키 + Pause/Break 키

→ 고급 시스템 설정 

→ 고급 탭 

→ 환경변수 

→ 시스템변수 

→ 새로 만들기 

→ 변수이름 : JAVA_HOME, 변수 값 : C:\Program Files\Java\jdk1.8.0_241(기본 경로로 설치했을 경우) 

→ 이렇게 하나 만들고 path라고 되어있는 시스템 변수를 찾아서 편집 

→ 변수 값 : %JAVA_HOME%\bin 저장 

→ 커맨드 창 켜서 java, javac가 되는지 확인(두 명령어가 잘 되면 세팅이 잘 된 것임)



### 이클립스(eclipse 설치)

https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2019-12/R/eclipse-jee-2019-12-R-win32-x86_64.zip&mirror_id=1273

(installer로 설치해도 되긴 하지만 설치하는데 오래 걸릴 수 있으므로 zip파일로 따로 되어있는 것을 받는게 빠름)



### STS 설치

Help - eclipse MarketPlace - sts 검색 - Spring Tools 3 Add-On for Spring Tools 4 3.0.12 CI 설치

이클립스 restart



### 프로젝트 생성

File - New - Other - Spring Legacy Project - Spring MVC Project



### Perspective 변경

이클립스 창 우측 위에 + 아이콘을 클릭하여 Spring Perspective 추가

(스프링 작업환경이라고 생각하면 됨)



### Lombok 라이브러리 설치

https://projectlombok.org/download

다운 후 명령 프롬프트에서 실행

C:\eclipse-jee-2019-12-R-win32-x86_64\eclipse>java -jar lombok.jar



### 서버 설치 (Apache Tomcat 9.0)

https://tomcat.apache.org/download-90.cgi

Core - 64-bit Windows zip 다운로드

→ 이클립스 servers 창에서 No servers are available. Click this link to create a new server... 클릭

→ Apache Tomcat v9.0 선택

→ 설치한 Tomcat 폴더 선택

→ 프로젝트를 우측으로 add



### 프로젝트 Context root 설정

프로젝트 마우스 오른쪽 - properties - Web Project Settings - Context root를 /로 변경 후 Apply

→ 서버 마우스 오른쪽 - clean 후 서버 시작

→ 기본 설정대로 했을 경우 http://localhost:8080 으로 되어있음

→ Hello World 창이 잘 뜨는지 확인



### Mybatis 설치 및 MySQL 연동 

pom.xml에 해당 소스를 추가

~~~xml
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.6</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis-spring -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.3.2</version>
</dependency>

<!-- Spring -->
<!-- https://mvnrepository.com/artifact/org.springframework/spring-jdbc -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>${org.springframework-version}</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.springframework/spring-test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>${org.springframework-version}</version>
    <scope>test</scope>
</dependency>
~~~

각종 버전은 이 사이트에서 확인 후 설정해주면 더 좋다. (버전은 수시로 바뀔 수 있기 때문에)

https://mvnrepository.com/



root-context.xml의 namespace 탭에 가서 아래와 같이 체크

![이미지 001](https://user-images.githubusercontent.com/13622474/74695497-8cf88e80-5237-11ea-9cf8-082c1c0a0eaa.png)



MySQL Connecter 다운로드 받거나 pom.xml에 추가

1. 다운로드

https://dev.mysql.com/downloads/file/?id=492426

mysql-connector-java-8.0.19.jar

2. Maven으로 다운로드

pom.xml

~~~xml
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.15</version>
</dependency>
~~~



root-context.xml에 추가

~~~xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    <property name="url" value="jdbc:mysql://localhost:3306/스키마(데이터베이스명)?useSSL=false&amp;serverTimezone=UTC" />
    <property name="username" value="DB계정명"></property>
    <property name="password" value="계정비밀번호"></property>
</bean>

<!-- DB에 사용이 끝나면 sqlSessionFactory에 접근하여 커넥션을 close()를 하는 기능 -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
    <property name="configLocation" value="classpath:/mybatis-config.xml" />
    <property name="mapperLocations" value="classpath:/mappers/**/*Mapper.xml" />
</bean>

<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate" destroy-method="clearCache">
    <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory">				</constructor-arg>
</bean>  
~~~

예제)

~~~xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    <property name="url" value="jdbc:mysql://localhost:3307/flangs?useSSL=false&amp;serverTimezone=UTC" />
    <property name="username" value="root"></property>
    <property name="password" value="mysql"></property>
</bean>

<!-- DB에 사용이 끝나면 sqlSessionFactory에 접근하여 커넥션을 close()를 하는 기능 -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource" />
    <property name="configLocation" value="classpath:/mybatis-config.xml" />
    <property name="mapperLocations" value="classpath:/mappers/**/*Mapper.xml" />
</bean>

<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate" destroy-method="clearCache">
    <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory">				</constructor-arg>
</bean>  
~~~



#### MySQL 스키마 생성 및 테이블 구성

~~~mysql
CREATE SCHEMA `test` DEFAULT CHARACTER SET utf8 ;
~~~



#### MySQL 연결 테스트

- JUnit으로 MySQL 연결이 정상적으로 이루어지는지 확인

- MySqlConnectionTest.java 마우스 오른쪽 → Run As → JUnit Test



MySqlConnectionTest.java

~~~java
package com.flangs.www;

import static org.junit.Assert.*;

import java.sql.Connection;
import java.sql.DriverManager;

import org.junit.Test;

public class MySqlConnectionTest {

	private static final String DRIVER = "com.mysql.jdbc.Driver";
    private static final String URL = "jdbc:mysql://127.0.0.1:3307/flangs?serverTimezone=UTC&verifyServerCertificate=false&useSSL=false";
    private static final String USER = "root";
    private static final String PW = "mysql";
    

    @Test
    public void testConnection() throws Exception {
        Class.forName(DRIVER);
        
        try(Connection conn1 = DriverManager.getConnection(URL, USER, PW);
            Connection conn2 = DriverManager.getConnection(URL, USER, PW);) {
            
            System.out.println("===== mysql connection test start =====");
            System.out.println(conn1);
            System.out.println(conn2);
            System.out.println("===== mysql connection test end =====");
            
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

}
~~~



#### Mybatis 설정

src/main/resources 에 mybatis-conifg.xml 추가

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
	<typeAliases>		

	</typeAliases>
</configuration>
~~~



src/main/resources 에 mappers 패키지 추가 후 testMapper.xml 추가

testMapper.xml

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.flangs.www.testMapper">

</mapper>
~~~



#### 테이블 생성

~~~mysql
CREATE TABLE `test` (
`test_INT` INT(11) NOT NULL,
`test_TEXT` VARCHAR(50) NOT NULL,
`test_DATE` DATE NOT NULL,
`test_DOUBLE` DOUBLE NOT NULL,
PRIMARY KEY (`test_INT`)
);

INSERT INTO test (`test_INT`, `test_TEXT`, `test_DATE`,`test_DOUBLE`) VALUES (1, 'test1', '2020-02-18','123.123');
INSERT INTO test (`test_INT`, `test_TEXT`, `test_DATE`, `test_DOUBLE`) VALUES (2, 'test2', '2020-02-18', '123.123');
~~~



#### TestBean 클래스 생성

~~~java
package com.flangs.www.beans;

import java.sql.Date;

public class TestBean {

	private int test_INT;
	private String test_TEXT;
	private Date test_DATE;
	private double test_DOUBLE;
	
	public int getTest_INT() {
		return test_INT;
	}
	public void setTest_INT(int test_INT) {
		this.test_INT = test_INT;
	}
	public String getTest_TEXT() {
		return test_TEXT;
	}
	public void setTest_TEXT(String test_TEXT) {
		this.test_TEXT = test_TEXT;
	}
	public Date getTest_DATE() {
		return test_DATE;
	}
	public void setTest_DATE(Date test_DATE) {
		this.test_DATE = test_DATE;
	}
	public double getTest_DOUBLE() {
		return test_DOUBLE;
	}
	public void setTest_DOUBLE(double test_DOUBLE) {
		this.test_DOUBLE = test_DOUBLE;
	}

	
}
~~~



#### testMapper.xml 수정

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.flangs.www.testMapper">
	<select id='test' resultType="Test">
		 select * from test
	</select>
</mapper>
~~~



#### TestDAO.java 추가

~~~java
package com.flangs.www.DAO;
import java.util.List;
import com.flangs.www.beans.TestBean;

public interface TestDAO {
	public List<TestBean> test() throws Exception;

}

~~~



#### TestDAOImpl.java 추가

~~~java
package com.flangs.www.DAO;
import java.util.List;
import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.flangs.www.beans.TestBean;

@Repository
public class TestDAOImpl implements TestDAO {
	private static final String namespace="com.flangs.www.testMapper";

	@Inject
	private SqlSession sqlSession;

	@Override
	public List<TestBean> test() throws Exception{
		return sqlSession.selectList(namespace+".test");
	}
}
~~~



#### TestServiceImpl.java 추가

~~~java
package com.flangs.www.service;
import java.util.List;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

import com.flangs.www.DAO.TestDAO;
import com.flangs.www.beans.TestBean;

@Service
public class TestServiceImpl implements TestService {

	@Inject
	private TestDAO dao;

	@Override
	public List<TestBean> test() throws Exception {
		return dao.test();

	}

}
~~~



#### TestService.java 추가

~~~java
package com.flangs.www.service;

import java.util.List;

import com.flangs.www.beans.TestBean;

public interface TestService {
	public List<TestBean> test() throws Exception;
}

~~~



#### TestController.java 추가

~~~java
package com.flangs.www.controller;

import java.util.List;
import javax.inject.Inject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.flangs.www.beans.TestBean;
import com.flangs.www.service.TestService;

@Controller
public class TestController {

	@Inject
	TestService service;

	@RequestMapping(value="/test",method = RequestMethod.GET)
	public String test(Model model) throws Exception {
		List<TestBean> list;		
		list = service.test();	
		model.addAttribute("list",list);	

		return "test";
	}

}
~~~



#### src/main/webapp/WEB-INF/views/home.jsp 추가

~~~jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>   
<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>test</title>
	</head>
	<body>
		<c:forEach items="${list}" var="test">
		int = ${test.test_INT }<br>
		test = ${test.test_TEXT}<br>
		date = ${test.test_DATE }<br>
		double = ${test.test_DOUBLE }<br>
		</c:forEach>
	</body>
</html>
~~~



### 서버 시작 후 http://localhost:8080/test 에서 데이터가 잘 나오는지 확인


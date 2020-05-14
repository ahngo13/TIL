response(응답)

response.setContentType("text/html; sharset=UTF-8");



Query String 형태로 데이터 전달

deleteUser.do?userid=gildong

@RequestParam



데이터를 url에 /(슬래쉬)로 전달

web.xml

~~~xml
<servlet-mapping>
    <servlet-name>springDispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
~~~



spring_bean_web.xml

~~~xml
<!-- url-pattern 충돌 문제를 해결하기 위한 설정 -->
	<mvc:default-servlet-handler/>
	<mvc:annotation-driven/>
~~~



UserController.java

~~~java
@RequestMapping("/deleteUser.do/{id}")
public String deleteUser(@PathVariable("id") String userid) {
    userService.deleteUser(userid);
    //getUserList(); (x)

    return "redirect:/userList.do";
}
~~~



### Spring Boot

https://start.spring.io/

https://spring.io/projects/spring-boot
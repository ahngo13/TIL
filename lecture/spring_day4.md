### MVC (Model View Controller)

: "Seperation of Concerns(Responsibility)"

관심사의 분리, 책임의 분리

- Model1 Architecture

  Model : Java (DAO, Service, VO)

  View : JSP (html, css, js)

  Controller : JSP

- Model2 Architecture

  Model: Java (DAO, Service, VO)

  VIew: JSP (html, css, js)

  Controller : Servlet

  Spring MVC, Struts



### Servlet과 JSP의 차이점

: Servlet은 Java 클래스 내부에 html을 삽입할 수 있다.

: JSP는 html에 java code를 삽입할 수 있다.



### JSTL (Java Standard Tag Library)

: Jsp에서 java code를 없애자 <% %>, <%= %> 

: 개발자들이 자주 사용하는 java 구문을 jsp 표준태그로 만들어 놓은 라이브러리



Servlet

​	session.setAttribute("userList");

jsp

​	${sessionScope.userList}



Servlet

​	request.setAttribute("userList", users);

jsp

​	${userList}
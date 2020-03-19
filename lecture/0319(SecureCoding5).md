### 크로스 사이트 스크립팅(XSS)

#### Reflective XSS

URL을 클라이언트에 노출시켜 클릭을 유도



#### Stored XSS

악성 스크립트를 DB에 저장해 해당 DB정보를 이용하는 애플리케이션을 통해 시스템을 사용하는 모든 사용자들이 해당 스크립트를 실행, 사용자의 쿠기 정보를 탈취하거나 악성 사이트로 이동하게 함.



#### DOM XSS

Document에 write하는 작업을 수행하는 경우 XSS 공격이 가능



http://xssed.com/

https://www.exploit-db.com/



#### 오픈 소스 라이브러리 활용하여 XSSFilter 적용

1. 네이버 개발자 센터에서 Lucy-XSS Filter 라이브러리 설정파일 다운로드

- lucy-xss-1.1.2.jar

- lucy-xss-superset.xml

2. WebContent\WEB-INF\lucy-xss-1.1.2.jar, src\lucy-xss-superset.xml 이동
3. TestController.java 수정 

~~~java
	@RequestMapping(value="/test/xss_test.do", method = RequestMethod.POST)
	@ResponseBody
	public String testXss(HttpServletRequest request) {
		StringBuffer buffer=new StringBuffer();
		String data=request.getParameter("data");
		data = URLDecoder.decode(data);
		/*String regex = "(?i)<script>";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(data);
		if(m.find()){ //matches()는 정확히 일치해야 true를 리턴
			data=data.replaceAll("<", "&lt;").replaceAll(">", "&gt;");	
		}*/
		
		//필터 객체를 생성한 뒤, 출력갑셍 대해 anti-XSS필터를 적용한다.
		XssFilter filter = XssFilter.getInstance("lucy-xss-superset.xml");
		buffer.append(filter.doFilter(data));
	
        return buffer.toString();	
	}
~~~



#### DOM XSS 제거를 위한 입출력 값에 대한 필터링 적용

~~~js
       function onClickString() {
          var  a= document.URL;
          a=unescape(a);
          var str = a.substring(a.indexOf("message=")+8, a.length);
          var d = document.createElement("div");
          d.appendChild(document.createTextNode(str));
          document.write(d.innerHTML);
       }
~~~



### CSRF(Cross Site Request Forgery)

크로스 사이트 요청 위조

서버가 클라이언트의 요청이 인증받은 사용자의 인가된 실제 요청인지 구분하지 않고 요청을 처리하는 경우 발생될 수 있는 취약점 → 재인증이 필요함(캡챠, CSRF Token 등)



글 내용

~~~html
<html><body>안녕하세요? 잘 지내셨죠?<form method="POST" name="form0" action="http://70.12.113.167:8888/manager/html/stop?path=/jsp-examples"></form><script>document.forms[0].submit();</script></body></html>
~~~



~~~html
<body>
<form style="display:none" method="post" action="write.do" ENCTYPE="multipart/form-data">
<input type="hidden" name="subject" value="회비 계좌 확인 요합니다">
<input type="hidden" name="writer" value="관리자">
<input type="hidden" name="writerId" value="admin">
<input type="hidden" name="content" value="이번 모임의 회비 납부 안내입니다<br>국민은행 01-0123-1234 홍길동">
<input type="submit" name="submit" id="send">
</form>
<script>document.forms[0].send.click();</script>
</body>

~~~



#### CSRF Token 적용

1. BoardController.java에서 write.do를 get으로 처리하는 부분에 다음과 같이 코딩

boardController.java

~~~java
	@RequestMapping("/write.do")
	public String boardWrite( HttpSession session,    @ModelAttribute("BoardModel") BoardModel boardModel){		
		String token=UUID.randomUUID().toString();
		session.setAttribute("CSRF_TOKEN", token);
		return "/board/write";
	}
~~~

2. write.jsp에 hidden 파라미터를 설정

~~~html
<input type="hidden" name="csrf" value="${CSRF_TOKEN}" />
~~~

3. kr.co.openeg.lab.common.interceptor 패키지에 CSRFInterceptor.java를 추가

~~~java
package kr.co.openeg.lab.common.interceptor;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


public class CSRFInterceptor extends HandlerInterceptorAdapter{
	@Override
	public boolean preHandle(HttpServletRequest request,
		                                  HttpServletResponse response, Object handler) throws Exception {
        
		// POST 방식의 요청에 대해서만 인터셉트를 적용해야 함
		if ( ! request.getMethod().equalsIgnoreCase("post")) {
			return true;
		} else {
			if( request instanceof MultipartHttpServletRequest) {
				Enumeration<String> names =
					                request.getParameterNames();
				while( names.hasMoreElements()) {
					String param=names.nextElement();
					//파라메터로 전달된 csrf 토큰값과 세션에 저장된 csrf토큰값을 비교하여 일치하는 경우
					//에만 요청을 처리한다.
					if( param.equals("csrf")) {                     
					    String value=request.getParameter(param);
					    if ( value != null &&  value.equals(
					    		request.getSession().getAttribute("CSRF_TOKEN"))) {
							 return true;
					    } 
				    }
			    }
			
			}
		}	
		// 유효하지 않은요청(CSRF_TOKEN이 없거나 틀린경우) 
		response.sendRedirect("list.do");
		return false;
	}
	
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}
}

~~~

4. dispatcher-servlet.xml에 3번의 인터셉터를 등록

~~~xml
<mvc:interceptors>
          <mvc:interceptor>
             <mvc:mapping path="/board/write.do"/>
             <bean class="kr.co.openeg.lab.common.interceptor.CSRFInterceptor"/>
          </mvc:interceptor>
    </mvc:interceptors>

~~~



~~~xml
******* 혹시 제대로 동작하지 않을 때는 web.xml에 다음과 같이 설정하고
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns="http://java.sun.com/xml/ns/javaee" 
xmlns:web="http://java.sun.com/xml/ns/javaee" 
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" 
id="WebApp_ID" 
version="2.5">

  <display-name>openeg</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
  
  <filter>
    <filter-name>encodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>
  
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>
		/WEB-INF/dispatcher-servlet.xml
	</param-value>
  </context-param>
   
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
  
  <filter-mapping>
    <filter-name>encodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
  
  <filter>
    <filter-name>multipartFilter</filter-name>
    <filter-class>org.springframework.web.multipart.support.MultipartFilter</filter-class>
  </filter>
  
  <filter-mapping>
    <filter-name>multipartFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
  
 <!--  <filter>
    <filter-name>xssFilter</filter-name>
    <filter-class>kr.co.openeg.lab.common.filter.XSSFilter</filter-class>
  </filter>
  
  <filter-mapping>
    <filter-name>xssFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping> -->

  <servlet>
    <servlet-name>dispatcher</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  </servlet>
  
  <servlet-mapping>
    <servlet-name>dispatcher</servlet-name>
    <url-pattern>*.do</url-pattern>
  </servlet-mapping>
  
<!--   <error-page> -->
<!--      <error-code>404</error-code> -->
<!--      <location>/404.jsp</location> -->
<!--   </error-page> -->
<!--     <error-page> -->
<!--       <exception-type>java.lang.Throwable</exception-type> -->
<!--      <location>/500.jsp</location> -->
<!--   </error-page> -->
</web-app>



dispatcher-servlet.xml의 45행을 
<bean id="filterMultipartResolver" ... 로 바꿨는지 확인한다

~~~



### Recaptcha 적용

1. jcaptcha-1.0-all.jar와 commons-collections-3.2.1.jar를 lib에 넣는다

~~~
D:\javaDev\workspace\openeg\WebContent\WEB-INF\lib
~~~

2. write.jsp에 다음 내용을 추가한다

~~~jsp
 <input type="hidden" name="hidCaptchaID" value="<%= session.getId() %>"/>		
			Enter these letters: &nbsp; &nbsp; <img  class="captcha"  src="getCaptcha.do"    align="middle" alt="Enter the
    characters appearing in this image" border="10 "/>
    <input type="text" name="inCaptchaChars"/>

~~~

3. MyCaptchaService.java를 작성한다

~~~java
package kr.co.openeg.lab.test;

import com.octo.captcha.service.image.ImageCaptchaService;
import com.octo.captcha.service.image.DefaultManageableImageCaptchaService;
public class MyCaptchaService
{
  // a singleton class
  private static ImageCaptchaService instance = new DefaultManageableImageCaptchaService();
  public static ImageCaptchaService getInstance()
  {
    return instance;
  }
} 	
~~~

4. BoardController.java에 다음 내용을 추가한다.

~~~java
@RequestMapping("/write.do")
	public String boardWrite( HttpSession session,    @ModelAttribute("BoardModel") BoardModel boardModel){		
~~~

이 위의 줄에 복사, 붙여넣기 하면 된다.

~~~java
@RequestMapping(value = "/getCaptcha.do")
	protected void getCaptcha(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String sImgType = "png";
		ByteArrayOutputStream imgOutputStream = new ByteArrayOutputStream();
		byte[] captchaBytes;

		if (request.getQueryString() != null) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "GET request should have no query string.");
			return;
		}
		try {
			// Session ID is used to identify the particular captcha.
			String captchaId = request.getSession().getId();

			// Generate the captcha image.
			BufferedImage challengeImage = MyCaptchaService.getInstance().getImageChallengeForID(captchaId,
					request.getLocale());

			ImageIO.write(challengeImage, sImgType, imgOutputStream);
			captchaBytes = imgOutputStream.toByteArray();

			// Clear any existing flag.
			request.getSession().removeAttribute("PassedCaptcha");
		} catch (CaptchaServiceException cse) {
			System.out.println("CaptchaServiceException - " + cse.getMessage());
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Problem generating captcha image.");
			return;
		} catch (IOException ioe) {
			System.out.println("IOException - " + ioe.getMessage());
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Problem generating captcha image.");
			return;
		}

		// Set appropriate http headers.
		response.setHeader("Cache-Control", "no-store");
		response.setHeader("Pragma", "no-cache");
		response.setDateHeader("Expires", 0);
		response.setContentType("image/" + (sImgType.equalsIgnoreCase("png") ? "png" : "jpeg"));

		// Write the image to the client.
		ServletOutputStream outStream = response.getOutputStream();
		outStream.write(captchaBytes);
		outStream.flush();
		outStream.close();
	}

///////////////////////////////////////


protected boolean processCaptcha( HttpServletRequest request) 
			 
			  {
			    // Get the request params.
			    Map paramMap = request.getParameterMap();
			    if ( paramMap.isEmpty() )
			    {
			    	return false; 
			    }
			    String[] arr1 = (String[])paramMap.get( "hidCaptchaID" );
			    String[] arr2 = (String[])paramMap.get( "inCaptchaChars" );
			    System.out.println("========>"+arr1[0]+":"+arr2[0]);
			    if ( arr1==null || arr2==null  )
			    {
			    	return false; 
			    }

			    String sessId = request.getSession().getId();
			    String incomingCaptchaId = arr1.length>0 ? arr1[0] : "";
			    String inputChars = arr2.length>0 ? arr2[0] : "";

			    // Check validity and consistency of the data.
			    if ( sessId==null || incomingCaptchaId==null || !sessId.equals(incomingCaptchaId) )
			    {
			    	return false; 
			    }

			    // Validate whether input from user is correct.
			    System.out.println( "Validating - inputChars are: " + inputChars );
			    boolean passedCaptchaTest = validateCaptcha( incomingCaptchaId, inputChars );
System.out.println(passedCaptchaTest);
			    // Set flag into session.
			    request.getSession().setAttribute( "PassedCaptcha", new Boolean(passedCaptchaTest) );

			    return passedCaptchaTest;
			  }

///////////////////////////////////////////////


    private boolean validateCaptcha( String captchaId, String inputChars )
			  {
			    boolean bValidated = false;
			    try
			    {
			      bValidated = MyCaptchaService.getInstance().validateResponseForID( captchaId, inputChars );
			    }
			    catch( CaptchaServiceException cse )
			    {cse.printStackTrace();}
			    return bValidated;
			  }

//////////////////////////////////////////////////

	
	@RequestMapping(value="/write.do", method=RequestMethod.POST)
	public String boardWriteProc(@ModelAttribute("BoardModel") BoardModel boardModel, MultipartHttpServletRequest request, HttpSession session){		
		if(!processCaptcha(request)){
			System.out.println("captcha test fail!");
			session.setAttribute("writeErrorCode", 3); 
			return "redirect:list.do"; 
		}
		
		MultipartFile file = request.getFile("file");				
		...

~~~


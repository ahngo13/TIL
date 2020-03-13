### 세션을 사용하지 않는 HTTP 인증

WebGoat

web.xml

Basic Authentication이라는 것을 확인할 수 있다.

보안에 취약하므로 사용하지 않는 것이 좋다.

~~~xml
	<!-- Login configuration uses BASIC authentication -->
	<login-config>
	    <auth-method>BASIC</auth-method>
	    <realm-name>WebGoat Application</realm-name>
	</login-config>
~~~

tomcat-users.xml

~~~xml
  <role rolename="webgoat_basic"/>
	<role rolename="webgoat_admin"/>
	<role rolename="webgoat_user"/>
	<role rolename="tomcat"/>
	<user password="webgoat" roles="webgoat_admin" username="webgoat"/>
	<user password="basic" roles="webgoat_user,webgoat_basic" username="basic"/>
	<user password="tomcat" roles="tomcat" username="tomcat"/>
	<user password="guest" roles="webgoat_user" username="guest"/>
~~~



### 쿠키 보안설정 삽입

openeg

TestController.java

~~~java
Cookie c=new Cookie("openeg",data);
			// 쿠키에 보안 설정 CODE 삽입
			//c.setMaxAge(60*60*24*365);            // 쿠키 유지 기간 - 1년
			c.setPath("/"); 
//			c.setSecure(true); // https에서만 사용하는 쿠키
			c.setHttpOnly(true); //javascript로 탈취 불가능
			response.addCookie(c);
			buffer.append("openeg="+data +"  쿠키값 추가");
			break;
~~~

~~~
HelpFile=AccessControlMatrix.help"& ipconfig&SUBMIT=View
~~~

URL encoding 변환

~~~
HelpFile=AccessControlMatrix.help%22%26+ipconfig&SUBMIT=View
~~~

### HTML 인코딩

~~~java
	@RequestMapping(value="/test/xss_test.do", method = RequestMethod.POST)
	@ResponseBody
	public String testXss(HttpServletRequest request) {
		StringBuffer buffer=new StringBuffer();
		String data=request.getParameter("data");
		data=data.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
		buffer.append(data);
        return buffer.toString();	
	}
~~~

이렇게 처리가 가능하지만 URL 인코딩해서 보낼 경우 XSS 공격이 가능하다.

~~~
%3Cscript%3Ealert%28%22XSS%22%29%3C%2Fscript%3E
~~~

그러므로 URL을 디코딩해서 replace 해주는 방법을 사용해야 한다.

~~~java
		StringBuffer buffer=new StringBuffer();
		String data=request.getParameter("data");
		data = URLDecoder.decode(data);
		data=data.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
		buffer.append(data);
        return buffer.toString();	
~~~

하지만 HTML이 인식이 되지 않을 수 있으므로 이 또한 처리가 필요하다.

~~~java
	public String testXss(HttpServletRequest request) {
		StringBuffer buffer=new StringBuffer();
		String data=request.getParameter("data");
		data = URLDecoder.decode(data);
		String regex = "<script>";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(data);
		if(m.find()){ //matches()는 정확히 일치해야 true를 리턴
			data=data.replaceAll("<", "&lt;").replaceAll(">", "&gt;");	
		}
		
		buffer.append(data);
        return buffer.toString();	
	}
~~~

대문자도 구분을 해주어야 한다.

~~~java
	public String testXss(HttpServletRequest request) {
		StringBuffer buffer=new StringBuffer();
		String data=request.getParameter("data");
		data = URLDecoder.decode(data);
		String regex = "(?i)<script>";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(data);
		if(m.find()){ //matches()는 정확히 일치해야 true를 리턴
			data=data.replaceAll("<", "&lt;").replaceAll(">", "&gt;");	
		}
		
		buffer.append(data);
        return buffer.toString();	
	}
~~~



https://owasp.org/www-community/xss-filter-evasion-cheatsheet


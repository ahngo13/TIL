# 1/7

### \<button\> 요소

~~~java
package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MainServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    protected void a(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	request.setCharacterEncoding("UTF-8");
    	String sign = request.getParameter("sign");
    	System.out.println(sign);
    	if("level".equals(sign)){
    		String major = request.getParameter("major");
    		System.out.println("major:" +major);
    		String name = request.getParameter("name");
    		System.out.println("name:" +name);
    		String middle = request.getParameter("middle");
    		System.out.println("middle:" + middle);
    		String last = request.getParameter("last");
    		System.out.println("last:" + last);
    		String id = request.getParameter("id");
    		System.out.println("id:" + id);
    		String password = request.getParameter("password");
    		System.out.println("password:" + password);
    	}else if("button".equals(sign)){
    		String userID = request.getParameter("userID");
    		System.out.println("userID:" + userID);
    	}
    	
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		a(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		a(request, response);
	}

}

~~~



WebServer : httpd

Web Container : CGI engine

Web Context : My Application scope



Web Application = Web Site + CGI



~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form method="post" action="main">
	HTML5 웹 프로그래밍 = HTML5 + CSS3 + Javascript <hr>
	<a href="https://www.w3schools.com/html/" target="_blank">
		<button type="button">Learn HTML</button>
	</a>
	<a href="https://www.w3schools.com/css/" target="_blank">
		<button type="button">Learn CSS</button>
	</a>
	<a href="https://www.w3schools.com/js/" target="_blank">
		<button type="button">Learn JS</button>
	</a>
	<button type="button" onclick="alert('버튼을 클릭했습니다');">
		click me
	</button><br><br>
	글 남기기 : <input type="text" name="userID" size=35/>
	<button type="submit">저장</button>
	<button type="reset">지우기</button>
	<input type="hidden" name="sign" value="button">
	</form>
</body>
</html>
~~~



### \<select\> \<option\> 

~~~html
회원님의 국적과 여행한 국가를 선택하세요<hr>
		국적 : <select name="country">
			<option value="France">프랑스</option>
			<option value="Korea" selected="selected">대한민국</option>
			<option value="USA">미국</option>
			<option value="Germany">독일</option>
			<option value="others">기타</option>
		</select>
~~~



~~~java
else if("button".equals(sign)){
    		String userID = request.getParameter("userID");
    		String country = request.getParameter("country"); //추가
    		System.out.println("userID:" + userID);
    		System.out.println("country:" + country); //추가
    	}
~~~



### \<label>요소

~~~html
Q1. 학생의 학년은? <br>
	학년 : <input type="radio" name="year" value="1" id="r1"/><label for="r1">1학년</label>
	 <input type="radio" name="year" value="2" id="r2" checked="checked"/><label for="r2">2학년</label>
	 <input type="radio" name="year" value="3" id="r3"/><label for="r3">3학년</label>
	 <input type="radio" name="year" value="4" id="r4"/><label for="r4">4학년</label>
	 <br><hr>
	 Q2. 즐겨보는 스포츠 중계 프로그램을 모두 선택하세요. <br>
	 <input type="checkbox" name="sport" value="baseball" checked="checked" id="b1"/><label for="b1">프로야구 중계</label>
	 <input type="checkbox" name="sport" value="s1" id="b2"/><label for="b2">프로축구 중계</label>
	 <input type="checkbox" name="sport" value="s2" id="b3"/><label for="b3">프로골프 중계</label>
	 <input type="checkbox" name="sport" value="s3" id="b4"/><label for="b4">프로농구 중계</label>
	 <input type="checkbox" name="sport" value="s4" id="b5"/><label for="b5">프로배구 중계</label>
	 <input type="checkbox" name="sport" value="s5" id="b6"/><label for="b6">프로바둑 중계</label>
~~~



~~~java
String userID = request.getParameter("userID");
    		String country = request.getParameter("country");
    		String year = request.getParameter("year");
    		String[] sport = request.getParameterValues("sport");
    		System.out.println("userID:" + userID);
    		System.out.println("country:" + country);
    		System.out.println("year:" + year);
    		for(int i=0; i<sport.length ; i++){
    			System.out.print("sport"+i+":" + sport[i] + "\t\n");
    		}
    		for(String sports:sport){
    			System.out.print(sports + "\t");
    		}
~~~



### \<fieldset\>, \<regend\>요소 및 \<input\> 요소의 고급 type 속성 값, 추가 속성들

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<base href="./img/" target="_blank">
</head>
<body>
	<h1>회원가입</h1>
	<hr><hr>
	<form method="post" action="main">
		<fieldset>
			<legend>인적사항</legend>
			이름 : <input type="text" name="name" placeholder="ID 입력요망" required="required" autofocus="autofocus">
			주민번호 : <input type="text" name="ssn1">-<input type="text" name="ssn2"><br>
			국적 : <select name="country">
				<option value="korea">내국인(대한민국)</option>
				<option value="foreign">외국인(대한민국)</option>
			</select>
			<br>
			취득 자격증 : <select size="1" name="license" multiple="multiple">
				<option value="L1" >정보처리기사</option>
				<option value="L2" >정보보안기사</option>
				<option value="L3" >정보통신기사</option>
			</select>
		</fieldset>
		<fieldset>
			<legend>메모사항</legend>
			<textarea name="memo" rows="3" cols="75" placeholder="메모글을 남겨 주세요"></textarea>
		</fieldset>
		
		<fieldset>
			<legend>기타</legend>
			이메일 : <input type="email" name="email" placeholder="xxx@xx.xx.xx" value="a@a.com" disabled="disabled"><br>
			웹 주소 : <input type="url" name="address" placeholder="http://xxx.xxx.xxx.xxxx"><br>
			연락처 : <input type="tel" name="tel" pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}" placeholder="0**-999*-9999"><br>
			검색1 : <input type="text" name="search1"><br>
			검색2 : <input type="search" autocomplete="on"><br>
			회의 일자 : <input type="date" name="mday"><br>
			회의 시간 : <input type="time" name="mtime"><br>
			시험 성적 : <input type="range" min="0" max="100" step="5" value="50" name="grade"><br>
			색상 : <input type="color" value="#FF0000" name="favorite">
		</fieldset>
		
		<fieldset>
			<legend>텍스트 명령 버튼</legend>
			<a href="" target="_blank"><input type="button" value="이동1"></a>
			<input type="button" value="버튼 클릭" onclick="alert('버튼1 클릭 됨');">
			<a href="" target="_blank"><button onclick="alert('버튼이2 클릭 됨')" type="button">이동 2</button></a>
		</fieldset>
		
		<fieldset>
			<legend>이미지 버튼</legend>
			<a href="">
				<input type="image" width="100" height="100" src="instargram.png" >
			</a>
			<input type="image" width="100" height="100" src="instargram.png" onclick="alert('버튼이 클릭됨!');" >
		</fieldset>
		
		<input type="submit" value="회원가입">
		<input type="hidden" name="sign" value="memberInsert">
	</form>
</body>
</html>
~~~

https://www.w3schools.com/



## CSS 스타일시트



index.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>첫 페이지</title>
<!-- <link rel="stylesheet" type="text/css" href="css/style01.css"> -->
<style>
	@import "css/style01.css";
</style> 

</head>
<body>
<!-- <body style="background: skyblue;"> -->
	<!-- <h3 style="background: blue;color: white;text-align: center;">배경색 파랑색, 글자색 하얀색, 가운데 정렬 적용이 되었나?</h3> -->
	<h3 style="background: white;color: blue;text-align: center;">배경색 파랑색, 글자색 하얀색, 가운데 정렬 적용이 되었나?</h3>
	<h3>여기는 적용이 안됨</h3>
	<a href="memberInsert.html">회원가입</a><br>
	<a href="css_ex1.html">스타일 오버로딩</a><br>
	<a href="css_ex2.html">아이디 선택자 이용</a><br>
	<a href="css_ex3.html">아이디, 클래스 선택자 이용</a>
	
	<table border="1" style="height: 500px;width: 700px;background-color: white;">
		<tr>
			<td colspan="3">title</td>
		</tr>
		<tr>
			<td>nav</td>
			<td>content</td>
			<td>banner</td>
		</tr>
		<tr>
			<td colspan="3">copyright</td>
		</tr>
	</table>
</body>
</html>
~~~



style01.css

~~~css
	body {background: skyblue;}
	h3{background: white;color: blue;text-align: center;}
~~~



css_ex1.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style type="text/css">h1,h2,h5,pre {background: skyblue;}</style>
<style type="text/css">@import "css/mystyle.css"</style>
<style type="text/css">h1, div {background: blue; color: white;}</style>
</head>
<body>
<h1>HTML5웹프로그래밍(h1)</h1>
<h1 style="background: black;">HTML5웹프로그래밍2(h1)</h1>
<h2>HTML5 웹프로그래밍3(h2)</h2>
<div><h3>HTML5 웹프로그래밍4(h3)</h3></div>
<pre><h3>HTML5 웹프로그래밍5(h3)</h3></pre>
<h3>HTML5 웹프로그래밍6(h5)</h3>
<h4>HTML5 웹프로그래밍7(h4)</h4>
</body>
</html>
~~~



myStyle.css

~~~css
h1,h2,h4{background: orange;}
~~~



css_ex2.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style type="text/css">
	#s1 {background: skyblue;}
	li#s2 {color: red;}
</style>
</head>
<body>
<h3>HTML5 프로그래밍 입문!</h3>
<ul>
	<li>HTML5</li>
	<li id="s1">CSS3</li>
	<li>Javascript</li>
	<li id="s2">HTML5 API</li>
</ul>

</body>
</html>
~~~



css_ex3.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style type="text/css">
	.c1{background: skyblue;}
	.c2{color: blue;}
	.c3{color: red;}
	#a1{background: orange;}
</style>
</head>
<body>
	<h3>HTML5 프로그래밍</h3>
	<ol>
		<li class="c1 c3">HTML5</li>
		<ul>
			<li class="c2">하이퍼링크</li>
			<li class="c2">입력양식</li>
		</ul>
		<li>CSS3</li>
		<ul>
			<li class="c3">선택자</li>
			<li class="c3">CSS 스타일 속성</li>
			<li id="a1">레이아웃</li>
		</ul>
		<li class="c1 c2">Javascript</li>
	</ol>
</body>
</html>
~~~


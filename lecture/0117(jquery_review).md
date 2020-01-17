### Jquery 복습

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="js/client.js"></script>
</head>
<body>
	<div id="login_div"><button id="login_button">로그인</button></div>
</body>
</html>
~~~



MainServlet.java

~~~java
package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class MainServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		BufferedReader br=request.getReader();
		//json-simple-1.1.1.jar 파일을 WebContent/WEB-INF/lib에 넣고 나서
		JSONObject obj=(JSONObject)JSONValue.parse(br);
		String sign=(String)obj.get("sign");
		
		if(sign!=null){
			//sign 값이 login 이면
			if("login".equals(sign)){
				String id=(String)obj.get("id");
				String pw=(String)obj.get("pw");
				
				//DB 확인 처리
				obj=new JSONObject();
				boolean flag=true;
				if(flag){
					obj.put("resultCode", true);
					obj.put("message", id+"님 환영합니다");
				}else{
					obj.put("resultCode", false);
					obj.put("message", "다시 로그인 하세요");
				}
			}
		}else{//해킹 대응
			
		}//end Process
		//out에 꼭 넣어줘야 리턴값이 넘어감
		out.print(obj);
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

}

~~~



client.js

~~~javascript
//html 페이지 호출시 변동사항 있으면 호출되는 function(?) 느낌만
$(document).ready(function(){
//	버튼 눌렀을 때 아이디 패스워드 입력하는 필드가 나오고 로그인 버튼 나오게 함
//	변수를 밖에다 선언해서 여러 군데서 사용가능하도록 함. (최초 로그인 버튼 클릭시, 로그아웃 버튼 클릭시)
	let login_form="<form id='login_form'>"
		login_form+="ID<input id='id_val'><br>";
		login_form+="PW<input type='password' id='pw_val'><br>";
		login_form+="<input type='button' id='login_send_button' value='login'>";

	//로그인 버튼 클릭시
	$('#login_button').click(function(){
		//	최초에 로그인 버튼 클릭시 호출되는지 확인 차 alert
		//	alert();
		//login_div에 login_form안의 html값 
		$('#login_div').html(login_form);
	});
	
	
//	$(document).on("이벤트이름","아이디",콜백function(){
//		수행할 일
//	});
	
	//로그인 버튼 클릭시(처음화면 아님)
	$(document).on("click","#login_send_button",function(){
		
		//id와 비밀번호 값을 받아와서 alert
		//변수의 변경이 이후에 필요 없을 때, const를 쓰는 것이 더 경제적이다.
		const id = $('#id_val').val();
		const pw= $('#pw_val').val();
//		alert(id_val + ":" + pw_val);
		
		//자바스크립트 객체생성
		const send_data_temp={
				sign:"login",
				id:id,
				pw:pw
		};
		
		const send_data=JSON.stringify(send_data_temp);
		
//		$.get(); 도 가능함. ajax 다르게  호출하는 방법으로 진행
//		$.post('보내려는 서블릿', send_data, function(리턴받는 값,상태값(성공, 실패)){
		$.post('main', send_data, function(returnData,status){
			//서블릿에서 리턴받는 데이터 안에있는 resultCode와 message라는 키값을 가져옴.
			if(returnData.resultCode){
				//로그인 성공했을 때 로그아웃 버튼 노출
				$('#login_div').html("<button id='logout_button'>로그아웃</button>");
			}else{
				//로그인 실패시 메시지만 출력
				alert(returnData.message);
			}
		});
	});
	
	//로그아웃 버튼 클릭시
	$(document).on("click","#logout_button",function(){
//		alert();
		$('#login_div').html(login_form);
	});
});
~~~


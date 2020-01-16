# 1/16

### Ajax(Asynchronous Javascript And Xml)

- 비동기적 요청 수행
- 오픈소스 AJAX 라이브러리로는 존 레식이 만든 jQuery가 가장 유명

~~~html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script type="text/javascript">
	function login(){
		var loginForm=document.loginForm;
		var obj=new Object();
		obj.sign=loginForm.sign.value;
		obj.id=loginForm.id.value;
		obj.pw=loginForm.pw.value;
		var jsonOBJ=JSON.stringify(obj);
		
		$.ajax({url:"MainServlet", 
			type:"POST", 
			data:jsonOBJ, 
			dataType:"json",
			success:function(jsonObj){
				if(jsonObj.result==1){
					$("#login").html(jsonObj.message+"<br><input type='button' value='logout'/>");
				}else if(jsonObj.result==2){
					alert(jsonObj.message);
				}
			},
	        error: function() {
	            alert('Ajax readyState: '+xhr.readyState+'\nstatus: '+xhr.status + ' ' + err);
	        }
		});
	
	}
	</script>

~~~

동적인 DOM이란 없었던 태그가 생기는 것



### HTML 태그의 요소 내용 변경

- html() : 요소내용을 참조하거나 변경함
- text() : 요소내용을 참조 또는 변경함
- val() : \<input\>요소의 요소값 참조 또는 변경



### HTML 요소의 속성 변경

- attr() : 인수로 지정된 속성값 참조, 변경
- removeAttr() : 인수로 지정된 속성 제거
- addClass('클래스 값') : class 속성에 '클래스값'을 추가함
- toggleClass('클래스값') : class 속성에 '클래스값'을 추가, 삭제



~~~js
$(document).ready(function(){
//	alert();
	$('#login1').click(function(){
		
	});

	$('#join_b').click(function(){
		
/*		let obj=new Object();
		obj.joinEmail=$('#joinEmail').val();
		obj.joinName=$('#joinName').val();
		obj.joinNickName=$('#joinNickName').val();
		obj.joinPw=$('#joinPw').val();
		let jsonOBJ=JSON.stringify(obj);*/
		let temp={
				sign : "join",
				joinEmail : $('#joinEmail').val(),
				joinName : $('#joinName').val(),
				joinNickName : $('#joinNickName').val(),
				joinPw : $('#joinPw').val()
		};
		
		let jsonOBJ=JSON.stringify(temp);
	
		$.ajax({url:"main", 
			type:"POST", 
			data:jsonOBJ, 
			dataType:"json",
			success:function(result){
				if(result.resultCode==1){
//					alert('가입 성공');
					$("#content").html(result.content);
				}else if(result.resultCode==2){
					alert(result.message);
				}
			},
	        error: function(err) {
	            alert(err);
	        }
		});
	});
		
});


$(document).on("click","#login_b",function(){
	let mainForm=$('#mainForm');
	let obj=new Object();
	obj.sign="login";
	obj.loginEmail=$('#loginEmail').val();
	obj.loginPw=$('#loginPw').val();
	
	let jsonOBJ=JSON.stringify(obj);
	
	$.ajax({url:"main", 
		type:"POST", 
		data:jsonOBJ, 
		dataType:"json",
		success:function(result){
//			alert(resultCode.message);
			
		},
		error: function(err) {
				alert(err);
		}
	});
	
});
~~~



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
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out=response.getWriter();
		BufferedReader br=request.getReader();
		if(br==null){
			System.out.println("BufferedReader is null");
		}else{
			JSONObject obj=(JSONObject)JSONValue.parse(br);			
			if(obj==null){
				System.out.println("JSONObject is null");				
			}else{
				System.out.println(obj);
				String sign=(String) obj.get("sign");
				if(sign==null){
					System.out.println("sign is null");
				}else{										
					if("join".equals(sign)){
						String joinEmail=(String) obj.get("joinEmail");
						String joinNickName=(String) obj.get("joinNickName");
						String joinName=(String) obj.get("joinName");
						String joinPw=(String) obj.get("joinPw");
						System.out.println(joinEmail+":"+joinPw+"를 DB에서 확인");
						
						obj=new JSONObject();	
						if(true){	
							String content = "<fieldset class='field1'>";
							content += "<img id='join-success' src='./image/joinsuccess.jpg'><br><br>";
							content += "<div class='mainText'>"+joinName+"님 가입완료 되셨습니다!</div><br><br>";
							content += "</fieldset>";
							obj.put("resultCode", 1);
							obj.put("content", content);
//							obj.put("message", joinName+"님 환영합니다");	
//							obj.put("message", joinName+"님 환영합니다");	
							
						}else{
							obj.put("resultCode", 2);
						}
						out.print(obj);
					}else if("login".equals(sign)){
						String loginEmail=(String) obj.get("loginEmail");
						String loginPw=(String) obj.get("loginPw");
						String Content = "";
						obj=new JSONObject();	
						obj.put("message", loginEmail+"님 환영합니다");
						out.print(obj);
					}
				}				
			}
		}		
	
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

}

~~~


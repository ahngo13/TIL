# 1/23

### node.js

#### express-session 내장모듈 설치

PS C:\0_NodePrj\test> npm i express-session



~~~js
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const user_data={id:"a",pw:"b"};

app.use(session({
    resave: false, //세션이 수정사항이 발생하지 않더라도 세션을 다시 저장할지 여부
    saveUninitialized: true, //세션에 저장할 내역이 없더라도 세션을 저장할지 여부
    secret: "햄릿슈",
    cookie:{
        secure: false, //https 통신만 할 때 사용하려면 true
        httpOnly: true,
    }
}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.post('/login', (req,res)=>{
    console.log(req.headers.cookie);

    const id = req.body.id;
    const pw = req.body.pw;
    if(id == user_data.id && pw == user_data.pw){
        res.json({message:`${id}님 로그인 되셨습니다!`, resultCode:1});
    }else{
        res.json({message:`존재하지 않는 아이디이거나 비밀번호가 틀렸습니다! 메롱~`,resultCode:0});
    }
});

app.listen(3000,()=>{
    console.log('3000 port listen');
});
~~~



### 로그인, 장바구니 세션처리



#### eclipse(Servlet)

default로 세션은 30분 유지됨

web.xml

```xml
<session-config>
    <session-timeout>30</session-timeout>
</session-config>
```


MainServlet.java

~~~java
package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class MainServlet extends HttpServlet {
   
   protected void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      request.setCharacterEncoding("utf-8");
      response.setContentType("application/json;charset=utf-8");
      PrintWriter out=response.getWriter();      
      
      BufferedReader br=request.getReader();
      JSONObject obj=(JSONObject)JSONValue.parse(br);
      String sign=(String)obj.get("sign");      
      if(sign!=null){   
         if("login".equals(sign)){ //login 처리
            String id=(String)obj.get("id");
            String pw=(String)obj.get("pw");
            //DB 확인
            boolean flag=true;
            obj=new JSONObject();
            if(flag){ //login 되었을 때
               HttpSession session=request.getSession(); //세션을 가져옴
               System.out.println("login: "+session.getId());//세션 ID 값을 콘솔에 출력
               session.setAttribute("logind_user_id", id);//logind_user_id라는 키값에 id 저장
               session.setAttribute("logind_user_pw", pw);//logind_user_pw라는 키값에 pw 저장       
               obj.put("resultCode", 1);
               obj.put("message", id+"님 로그인 되셨습니다.");
            }else{ //login 되지 않았을 때
               obj.put("resultCode", 0);
               obj.put("message", "다시 로그인 하세요");
            }
         }else if("basket".equals(sign)){ //장바구니 넣기 처리
            HttpSession session=request.getSession();//세션을 가져옴
            System.out.println("basket:"+session.getId());//세션 ID 값을 콘솔에 출력
            String id=(String)session.getAttribute("logind_user_id");
            
            //session에 id의 장바구니에 물품을 저장...
            String product=(String) obj.get("product");
            
            //장바구니에 아직 넣은 상태는 아니지만 메시지를 콘솔창에 띄워줌
            System.out.println(id+"님의 장바구니에 "+product+"를 넣겠습니다.");
            
            //가져온 세션에서 basket이라는 키값에 ArrayList<String>(문자열 목록을 담는 객체라고 생각하면 됨)
            ArrayList<String> basket=(ArrayList<String>)session.getAttribute("basket"); 
            
            //세션에 basket이 비어있으면
            if(basket==null){
            	//문자열 값 목록 객체(ArrayList<String>)를 빈 깡통으로 새로 만들어 줌.
            	basket=new ArrayList<String>();
            	//세션에 basket이라는 키 값에 문자열 값 목록 객체를 넣어줌.
            	session.setAttribute("basket", basket);      
            }
            //장바구니에 상품을 넣어줌
            basket.add(product);
            //콘솔 메시지 띄워줌
            out.println(id+"님의 장바구니에 "+product+"를 넣었습니다.");
            
         }else if("basket_view".equals(sign)){ //장바구니 보기 처리
        	//세션을 가져옴
            HttpSession session=request.getSession();
            //세션의 ID값을 콘솔창에 출력
            System.out.println("basket_view:"+session.getId());
            //세션에 들어있는 logind_user_id 키값으로 id값을 가져옴.
            String id=(String)session.getAttribute("logind_user_id");
            //session에 id의 장바구니에 물품 보기...            
            //세션에 들어있는 basket이라는 키값으로 문자열 목록을 가져옴.
            ArrayList<String> basket=(ArrayList<String>)session.getAttribute("basket");
            //세션안에 basket 키값으로 가진 것이 없을 때
            if(basket==null){
            	//리턴하는 message 키 값에 해당 값을 넣음
            	obj.put("message", id+"님의 장바구니가 비었습니다.");
            }else{
               String products="";
               //가져온 제품 문자열 목록을 반복문을 통해서 products라는 변수에 넣음
               for(String product : basket){
                  products += product+"\n"; //\n은 한줄 띄는 것을 뜻함             
               }
               //메시지에 문자열 목록을 넣음
               obj.put("message",products);
            }
         }else if("logout".equals(sign)){
        	 HttpSession session=request.getSession(false); //session 가져온 것만 받겠다
        	 if(session != null){ //세션이 빈값이 아니면
        		 session.invalidate(); //세션 삭제
        	 }
        	 obj.put("message", "로그아웃 되었습니다");
         }
         out.print(obj);
         
      }else{//sign==null
         //침해대응       
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



client.js

~~~js
$(document).ready(function(){
    let login_form = 'ID : <input id="id" class="form-control"><br>';
    login_form += 'PW : <input id="pw" type="password" class="form-control"><br>';
    login_form += '<button id="login_btn" class="btn btn-success">로그인</button>';
    $('#hello_div').click(function(){
        $('#content_div').html(login_form);
    });

    $(document).on('click','#login_btn',function(){
        const id = $('#id').val();
        const pw = $('#pw').val();
        const param = {
            sign:"login",id, pw
        };
        
        $.post('main', JSON.stringify(param), function(resultData){
            alert(resultData.message);
            if(resultData.resultCode){
                let logout_form = '<div id="logout_btn" class="btn btn-danger">logout</div>';
                logout_form += '<br><hr>쇼핑하기<br>';                
                logout_form += '<input type="radio" name="product" value="apple">사과</input>';
                logout_form += '<input type="radio" name="product" value="orange">오렌지</input>';
                logout_form += '<input type="radio" name="product" value="banana">바나나</input>';
                logout_form += '<input type="button"  id="basket_btn" value="장바구니 넣기"><br>';
                logout_form += '<hr><input type="button"  id="basket_view_btn" value="장바구니 보기">';
                logout_form += '<br><div id="basket_view_div"></div>';
                $('#content_div').html(logout_form);
            }else{
                $('#id').val('');
                $('#pw').val('');
            }
        });
    });

    $(document).on('click','#logout_btn',function(){
    	const param = {
            sign:"logout"
        };
        
        $.post('main', JSON.stringify(param), function(result){
        	alert(result.message);
        	location.reload();
        });
        
//        $('#content_div').html(login_form);
    });
    
    $(document).on('click','#basket_btn',function(){
        const product=$(':input:radio[name=product]:checked').val();
        const send_param={sign:"basket", product:product};
        $.post('main',JSON.stringify(send_param),function(returnData){
            alert(returnData.message);
        });
    });
    
    $(document).on('click','#basket_view_btn',function(){      
       alert();
        const send_param={sign:"basket_view"};
        $.post('main',JSON.stringify(send_param),function(returnData){
           alert(returnData.message);
            
        });
    });
});
~~~



#### node.js



app.js

~~~js
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const user_data={id:"a",pw:"b"};

app.use(session({
    resave: false, //다시 저장 가능
    saveUninitialized: true, //세션을 처음에 할당 받으려면 무조건 true여야함.
    secret: "햄릿슈",
    cookie:{
        httpOnly: true,
        secure: false, //https 통신만 할 때 사용하려면 true
    }
}));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/login', (req,res)=>{
    console.log(req.headers.cookie);

    const id = req.body.id;
    const pw = req.body.pw;
    if(id == user_data.id && pw == user_data.pw){
        //request 객체 안에 있는 세션에 logined_user_id라는 키값에 id라는 값을 부여함.
        //해당 값으로 로그인 처리가 되었는지 구분함.
        req.session.logined_user_id=id;
        res.json({message:`${id}님 로그인 되셨습니다!`, resultCode:1});
    }else{
        res.json({message:`존재하지 않는 아이디이거나 비밀번호가 틀렸습니다! 메롱~`,resultCode:0});
    }
});

//장바구니 넣기
app.post('/basket',(req,res)=>{
    console.log("basket처리:"+req.headers.cookie);
    console.log(req.session);
    
    const product=req.body.product;
    
    //request 객체 안에 있는 세션에 logined_user_id라는 키값에 값이 있으면
    if( req.session.logined_user_id){//(로그인 되어있는 사용자)
        //request 객체 안에 있는 세션에 basket라는 키값에 값이 있으면
        if(!req.session.basket){//(장바구니가 없을 때)
            req.session.basket=[];//basket이라는 키값으로 배열을 만들어 줌.
        }
        //request 객체 안에 있는 세션에 basket라는 키값에 있는 배열에 product를 추가해 줌.
        req.session.basket.push(product);
        res.json({resultCode:1, message:`${req.session.logined_user_id}님의 장바구니에 ${product}가 담겼습니다.`});
    }else{
        res.json({resultCode:0, message:`로그인부터 하세요`});
    }    
});

//장바구니 보기
app.post('/basket_view',(req,res)=>{
    console.log("basket_view 처리:"+req.headers.cookie);
    console.log(req.session);    
    
    //request 객체 안에 있는 세션에 logined_user_id라는 키값에 값이 있으면
    if( req.session.logined_user_id){//(로그인 되어있는 사용자)
        let basket;
        //request 객체 안에 있는 세션에 basket라는 키값에 값이 있으면
        if(req.session.basket){//(장바구니가 있을 때)
            //request 객체 안에 있는 세션에 basket 배열에 요소별로 ,로 구분해서 basket 변수에 넣음
            //join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듦
            basket=req.session.basket.join(',');
            //ex) banana,apple,orange 
            res.json({resultCode:1, message:basket});
        }else{
            res.json({resultCode:0, message:`장바구니가 비었습니다`});
        }    
        
    }else{
        //request 객체 안에 있는 세션에 logined_user_id라는 키값에 값이 없으면
        res.json({resultCode:0, message:`로그인부터 하세요`});
    }    
});

app.post('/logout',(req,res)=>{
    console.log("logout 처리:"+req.headers.cookie);
    console.log(req.session);    
    
    //세션 파기
    req.session.destroy(()=>{
        console.log("세션이 파기 되었습니다");
        res.json({resultCode:1, message:`로그아웃 되었습니다`});
    });
});

app.listen(3000,()=>{
    console.log('3000 port listen');
});
~~~



client2.js

~~~js
$(document).ready(function(){
    let login_form = 'ID : <input id="id" class="form-control"><br>';
    login_form += 'PW : <input id="pw" type="password" class="form-control"><br>';
    login_form += '<button id="login_btn" class="btn btn-success">로그인</button>';
    $('#hello_div').click(function(){
        $('#content_div').html(login_form);
    });

    $(document).on('click','#login_btn',function(){
        const id = $('#id').val();
        const pw = $('#pw').val();
        const param = {
            sign:"login",id, pw
        };
        
        $.post('login', param, function(resultData){
            alert(resultData.message);
            if(resultData.resultCode){
                let logout_form = '<div id="logout_btn" class="btn btn-danger">logout</div>';
                logout_form += '<br><hr>쇼핑하기<br>';                
                logout_form += '<input type="radio" name="product" value="apple">사과</input>';
                logout_form += '<input type="radio" name="product" value="orange">오렌지</input>';
                logout_form += '<input type="radio" name="product" value="banana">바나나</input>';
                logout_form += '<input type="button"  id="basket_btn" value="장바구니 넣기"><br>';
                logout_form += '<hr><input type="button"  id="basket_view_btn" value="장바구니 보기">';
                logout_form += '<br><div id="basket_view_div"></div>';
                $('#content_div').html(logout_form);
            }else{
                $('#id').val('');
                $('#pw').val('');
            }
        });
    });

    $(document).on('click','#logout_btn',function(){
    	const param = {
            sign:"logout"
        };
        
        $.post('logout', param, function(result){
        	alert(result.message);
        	location.reload();
        });
        
//        $('#content_div').html(login_form);
    });
    
    $(document).on('click','#basket_btn',function(){
        const product=$(':input:radio[name=product]:checked').val();
        const send_param={sign:"basket", product:product};
        $.post('basket',send_param,function(returnData){
            alert(returnData.message);
        });
    });
    
    $(document).on('click','#basket_view_btn',function(){      
       alert();
        const send_param={sign:"basket_view"};
        $.post('basket_view', send_param,function(returnData){
           alert(returnData.message);
            
        });
    });
});
~~~



#### 연습문제

세션을 활용하여 체크박스 목록을 장바구니에 넣는 것을 구현하시오.

(기존 기능에서 추가, 라디오 버튼 데이터와 별도로 처리해도 됨)



app.js

~~~js
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const user_data={id:"a",pw:"b"};

app.use(session({
    resave: false, //다시 저장 가능
    saveUninitialized: true, //세션을 처음에 할당 받으려면 무조건 true여야함.
    secret: "햄릿슈",
    cookie:{
        httpOnly: true,
        secure: false, //https 통신만 할 때 사용하려면 true
    }
}));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/login', (req,res)=>{
    console.log(req.headers.cookie);

    const id = req.body.id;
    const pw = req.body.pw;
    if(id == user_data.id && pw == user_data.pw){
        //request 객체 안에 있는 세션에 logined_user_id라는 키값에 id라는 값을 부여함.
        //해당 값으로 로그인 처리가 되었는지 구분함.
        req.session.logined_user_id=id;
        res.json({message:`${id}님 로그인 되셨습니다!`, resultCode:1});
    }else{
        res.json({message:`존재하지 않는 아이디이거나 비밀번호가 틀렸습니다! 메롱~`,resultCode:0});
    }
});

//장바구니 넣기
app.post('/basket',(req,res)=>{
    console.log("basket처리:"+req.headers.cookie);
    console.log(req.session);
    
    const product=req.body.product;

    //request 객체 안에 있는 세션에 logined_user_id라는 키값에 값이 있으면
    if( req.session.logined_user_id){//(로그인 되어있는 사용자)
        //request 객체 안에 있는 세션에 basket라는 키값에 값이 있으면
        if(!req.session.basket){//(장바구니가 없을 때)
            req.session.basket=[];//basket이라는 키값으로 배열을 만들어 줌.
        }
        //request 객체 안에 있는 세션에 basket라는 키값에 있는 배열에 product를 추가해 줌.
        req.session.basket.push(product);
        res.json({resultCode:1, message:`${req.session.logined_user_id}님의 장바구니에 ${product}가 담겼습니다.`});
    }else{
        res.json({resultCode:0, message:`로그인부터 하세요`});
    }    
});

//장바구니 보기
app.post('/basket_view',(req,res)=>{
    console.log("basket_view 처리:"+req.headers.cookie);
    console.log(req.session);    
    
    //request 객체 안에 있는 세션에 logined_user_id라는 키값에 값이 있으면
    if( req.session.logined_user_id){//(로그인 되어있는 사용자)
        let basket;
        //request 객체 안에 있는 세션에 basket라는 키값에 값이 있으면
        if(req.session.basket){//(장바구니가 있을 때)
            //request 객체 안에 있는 세션에 basket 배열에 요소별로 ,로 구분해서 basket 변수에 넣음
            //join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듦
            basket=req.session.basket.join(',');
            //ex) banana,apple,orange 
            res.json({resultCode:1, message:basket});
        }else{
            res.json({resultCode:0, message:`장바구니가 비었습니다`});
        }    
        
    }else{
        //request 객체 안에 있는 세션에 logined_user_id라는 키값에 값이 없으면
        res.json({resultCode:0, message:`로그인부터 하세요`});
    }    
});

app.post('/logout',(req,res)=>{
    console.log("logout 처리:"+req.headers.cookie);
    console.log(req.session);    
    
    //세션 파기
    req.session.destroy(()=>{
        console.log("세션이 파기 되었습니다");
        res.json({resultCode:1, message:`로그아웃 되었습니다`});
    });
});

app.listen(3000,()=>{
    console.log('3000 port listen');
});
~~~



client2.js

~~~js
$(document).ready(function(){
    let login_form = 'ID : <input id="id" class="form-control"><br>';
    login_form += 'PW : <input id="pw" type="password" class="form-control"><br>';
    login_form += '<button id="login_btn" class="btn btn-success">로그인</button>';
    $('#hello_div').click(function(){
        $('#content_div').html(login_form);
    });

    $(document).on('click','#login_btn',function(){
        const id = $('#id').val();
        const pw = $('#pw').val();
        const param = {
            sign:"login",id, pw
        };
        
        $.post('login', param, function(resultData){
            alert(resultData.message);
            if(resultData.resultCode){
                let logout_form = '<div id="logout_btn" class="btn btn-danger">logout</div>';
                logout_form += '<br><hr>쇼핑하기<br>';                
                logout_form += '<input type="radio" name="product" value="apple">사과</input>';
                logout_form += '<input type="radio" name="product" value="orange">오렌지</input>';
                logout_form += '<input type="radio" name="product" value="banana">바나나</input>';
                logout_form += '<br><div id="basket_view_div"></div>';
                //장바구니 넣기 추가
                logout_form += `<br><div id="basket_check_div">`;
                logout_form += `<input type="checkbox" name="youtube" value="구독">구독</input>`;
                logout_form += `<input type="checkbox" name="youtube" value="좋아요">좋아요</input>`;
                logout_form += `<input type="checkbox" name="youtube" value="알람 설정">알람 설정</input>`;
                logout_form += '<input type="button"  id="basket_btn" value="장바구니 넣기"><br>';
                logout_form += '<hr><input type="button"  id="basket_view_btn" value="장바구니 보기">';
                logout_form += '</div>';

                $('#content_div').html(logout_form);
            }else{
                $('#id').val('');
                $('#pw').val('');
            }
        });
    });

    $(document).on('click','#logout_btn',function(){
    	const param = {
            sign:"logout"
        };
        
        $.post('logout', param, function(result){
        	alert(result.message);
        	location.reload();
        });
        
//        $('#content_div').html(login_form);
    });
    
    $(document).on('click','#basket_btn',function(){
        const fruitRadio=$(':input:radio[name=product]:checked').val();
        //체크박스 항목 추가 checked된 객체들을 변수에 넣음
        const youtubeChk=$(':input:checkbox[name=youtube]:checked');
        //넘겨줄 배열 변수 선언
        const product = [];
        
        //라디오 버튼으로 목록을 선택했는지 판별하기 위한 변수
        let i=0;
        //라디오 버튼을 체크했을 경우
        if(fruitRadio != '' && fruitRadio != undefined){
            //배열의 첫번째 값에 넣어줌
            product[0]=fruitRadio;
            //변수 1로 변경
            i=1;
        }

        //체크된 목록들을 반복문으로 value값을 배열에 넣어줌
        for(y=0; y<youtubeChk.length;y++){
            //라디오 버튼 목록 선택 안할 시
            if(i==0){
                product[y] = youtubeChk[y].value;
            //라디오 버튼 목록 선택할 시
            }else{
                product[y+1] = youtubeChk[y].value;
            }
        }
        
        //ajax로 배열 데이터를 넘겨줄 때 세팅해줘야 함
        $.ajaxSettings.traditional = true;

        //파라미터 세팅
        const send_param={sign:"basket", product:product};
        $.post('basket',send_param,function(returnData){
            alert(returnData.message);
        });
    });
    
    $(document).on('click','#basket_view_btn',function(){      
        const send_param={sign:"basket_view"};
        $.post('basket_view', send_param,function(returnData){
           alert(returnData.message);
            
        });
    });
});
~~~



index.html

~~~html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/my.css">
    <script src="js/client2.js"></script>
</head>
<body>
    <div id="container_div">
        <div id="hello_div" class="btn btn-success">로그인 해볼까요?</div>
        <div id="content_div">
            <img class="feed_img rounded-circle" src="img/feed5.jpg">
        </div>
    </div>
</body>
~~~


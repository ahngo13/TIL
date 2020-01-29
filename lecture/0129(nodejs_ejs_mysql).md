### ejs

#### ejs 환경 세팅

새로고침 할 때 로그인 영역이 그대로 노출됨

동적인 페이지로 구현하기 위해 ejs 사용



1. index.js 파일 추가

~~~js
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('index', {title:"MySHOP2"});
});

module.exports = router;
~~~



2. terminal에서 ejs 모듈 설치

~~~
npm i ejs
~~~



3. app.js

index라우터 require 및 view engine을 ejs로 변경

~~~js
const indexRouter = require('./routes/index');

app.set('view engine','ejs');
~~~



4. views 폴더 만들기

5. index.html을 views 밑으로 옮기기

6. index.html 이름을 index.ejs로 변경

7. index.ejs

~~~ejs
  <title><%=title %></title>
~~~



#### EJS 문법

1. ~~~ejs
   <%= %> //expression(표현, 출력) : 값을 출력
   ~~~

2. ~~~ejs
   <% %> //scriptlet (스크립트릿) : 코딩 영역, HTML 영역과 섞어서 표현
   ~~~

※ 태그 안에 태그가 들어갈 수 없다.

3. ~~~ejs
   <%  //변수 사용가능
   	const node = 'Node.js'
   %>
   ~~~

4. ~~~ejs
   <%  //반복문
   	const fruits = ['apple', 'orange']
   	for(let i=0; i<fruits.length; i++){
   %>		<%=(i+1) + '번째' + fruits[i]%>
   <%	}
   %>
   ~~~

5. ~~~js
   <%
   	//조건문
   	if(isLoggedIn){
       %>    <div>로그인</div>
   <%  }else{%>
           <div>로그아웃</div>
   <%  }%>
   %>
   ~~~



### MySQL

#### mysql 모듈 설치

~~~
C:\Users\Your Name>npm install mysql
~~~



#### mysql 컨넥션 생성

mysql.js

~~~js
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    port:"3307",
    database:"nodejs"
});

module.exports = con;
~~~



#### 회원가입 시 DB에 데이터 insert

contact.js

~~~js
// const mysql = require('mysql');
const express = require('express');
const router = express.Router();
// const members = require('./members');
const con = require('./mysql');

router.post('/',(req,res,next)=>{
    
    console.log("Connected!");
    const name = req.body.name;
    const email = req.body.email;
    const comments= req.body.comments
    var sql = `INSERT INTO members (name, email, comments) VALUES ('${name}','${email}','${comments}')`;
    console.log(sql);
    con.query(sql, (err, result) =>{
        if (err) {
            console.log("insert fail", err);
            res.json({message:"회원가입 실패"});
        }else{
            console.log("1 record inserted");
            res.json({message:"회원가입 되었습니다"});
        }
    });
});

module.exports = router;
~~~



#### 로그인 시 DB 데이터 Select

~~~js
const express = require('express');
const router = express.Router();
// const members = require('./members');
const con = require('./mysql');

router.post('/', (req,res)=>{
    let message;

    const sql = `SELECT * FROM members where email='${req.body.email}'`;
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
        }else{
            // console.log(result.length);
            console.log(result.length);
            if(result.length > 0){
                req.session.email = req.body.email;  
                req.session.name = result[0].name;         
                message = "login ok";
                console.log(message);
            }else{
                message = "login Fail";
                console.log(message);

            }
            res.json({message:message});
        }
    });
});

module.exports = router;
~~~



#### 로그인 시 지정한 세션 데이터를 index.ejs로 넘기고 렌더링

index.js

~~~js
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    let logind=0;
    if(req.session.email){
        logind=1;
    }
    res.render('index', {title:"MySHOP2", logind:logind, name:req.session.name});
});

module.exports = router;
~~~



#### ejs에서 로그인 화면 처리

index.ejs

~~~ejs
  <% if(logind == 0){%>
        <input id="login_email" value="ahngo13@naver.com">
        <input id="login_btn" type="button" class="btn btn-success" value="login"">
      <%}else{%>
        <%=name%>님 로그인 되셨습니다.    
        <input id="logout_btn" type="button" class="btn btn-danger" value="logout"">
      <%}%>
~~~


# 1/22

### 기타 npm 명령어

- npm update [패키지명] : 특정 패키지 업데이트
- npm update : 업데이트 가능한 모든 패키지 업데이트
- npm uninstall(npm rm [패키지명]) : 해당 패키지를 제거
- npm search : 패키지 검색
- npm info : 패키지의 세부정보 파악
- npm adduser : npm 로그인
- npm whoami : 로그인한 사용자 확인
- npm logout : 로그아웃
- npm version [버전] : package.json 버전 올리기
- npm deprecate [패키지명] [버전] [메시지] : 해당 패키지를 설치할 때 경고 메시지를 띄움
- npm publish : 패키지 배포
- npm unpublish : 배포한 패키지 제거(24시간 이내에 배포한 패키지만 제거)



### 패키지 배포하기

1. 회원가입

https://www.npmjs.com/

2. npm adduser : 생성한 계정으로 로그인
3. npm info [패키지명] : 누군가 패키지 이름을 사용하고 있는지 확인
4. npm publish : 패키지 배포
5. npm info [패키지명] : 패키지가 잘 등록 되었는지 확인
6. npm unpublish [패키지명] --p : 패키지 삭제 (24시간 이내에 가능)
7. npm info [패키지명] : 패키지가 잘 지워졌는지 확인



## Express

1. 프로젝트 생성

C:\0_NodePrj>express project1 --view=ejs

2. 모듈 설치

C:\0_NodePrj\project1> npm i

3. 서버 시작

C:\0_NodePrj\project1> npm start

4. 서버 실행 확인

http://localhost:3000/

path.join(__dirname, 'public') → 경로를 합쳐준다

__dirname : 현재 경로

app.use(express.static(path.join(__dirname, 'public'))); → 정적인 css, javascript, image 세팅할 곳

app.use('/', indexRouter); → 컨트롤러(라우터라고도 함)



~~~js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hamlet Shu' });
});

module.exports = router;

~~~

~~~ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>

~~~



https://expressjs.com/ko/api.html

#### nodemon 설치

- 서버를 수정할 때마다 서버를 중지시켰다가 재시작하지 않아도 됨

C:\0_NodePrj\project2> npm i -g nodemon



1. mkdir projectx
2. cd projectx
3. npm init
4. npm i express
5. package.json에 start 속성 넣기
6. app.js 작성
7. require('express')... listen(port,)
8. public 폴더에 html, css, js, img...
9. http://localhost:port 확인
10. client.js 작성
11. $.post('url', send_param, callback);
12. app.js에서 app.post('/url', callback);
13. app.js에서 app.use(express.json()); 설정



app.js

~~~js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/login', (req,res)=>{
    const id = req.body.id;
    res.json({message:`${id}님 로그인 축하합니다!!`});
});

app.listen(3000, ()=>{
    console.log('3000 port');
});

~~~



client.js

~~~js
$(document).ready(function(){
    $('#hello_div').click(function(){
        let login_form = `ID : <input id="id"><br>`;
        login_form += `PW : <input id="pw"><br>`;
        login_form += `<button id="login_btn" class="btn btn-secondary">로그인</button>`;
        $('#content_div').html(login_form);
    });

    $(document).on('click', '#login_btn', function(){
        const id = $('#id').val();
        const pw = $('#pw').val();
        const param = {id, pw};

        $.post('/login', param, function(result){
            alert(result.message);
        });
    });
});
~~~



index.html

~~~html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="css/my.css">
        <script src="js/client.js"></script>
    </head>
    <body>
        <div id="hello_div" class="btn btn-secondary">HELLO</div>
        <div id="content_div">
            <img src="img/feed5.jpg">
        </div>
    </body>
</html>
~~~



~~~css
.content_img{
    width: 1000px;
}
~~~


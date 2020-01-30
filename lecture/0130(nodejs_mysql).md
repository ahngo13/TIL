# EJS, MySQL 응용

### views

index.ejs

~~~ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Theme Made By www.w3schools.com - No Copyright -->
  <title><%=title %></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  <script src="http://localhost:3000/js/client.js"></script>
  <style>
  body {
    font: 400 15px/1.8 Lato, sans-serif;
    color: #777;
  }
  h3, h4 {
    margin: 10px 0 30px 0;
    letter-spacing: 10px;      
    font-size: 20px;
    color: #111;
  }
  .container {
    padding: 80px 120px;
  }
  .person {
    border: 10px solid transparent;
    margin-bottom: 25px;
    width: 80%;
    height: 80%;
    opacity: 0.7;
  }
  .person:hover {
    border-color: #f1f1f1;
  }
  .carousel-inner img {
    -webkit-filter: grayscale(90%);
    filter: grayscale(90%); /* make all photos black and white */ 
    width: 100%; /* Set width to 100% */
    margin: auto;
  }
  .carousel-caption h3 {
    color: #fff !important;
  }
  @media (max-width: 600px) {
    .carousel-caption {
      display: none; /* Hide the carousel text when the screen is less than 600 pixels wide */
    }
  }
  .bg-1 {
    background: #2d2d30;
    color: #bdbdbd;
  }
  .bg-1 h3 {color: #fff;}
  .bg-1 p {font-style: italic;}
  .list-group-item:first-child {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  .list-group-item:last-child {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .thumbnail {
    padding: 0 0 15px 0;
    border: none;
    border-radius: 0;
  }
  .thumbnail p {
    margin-top: 15px;
    color: #555;
  }
  .btn {
    padding: 10px 20px;
    background-color: #333;
    color: #f1f1f1;
    border-radius: 0;
    transition: .2s;
  }
  .btn:hover, .btn:focus {
    border: 1px solid #333;
    background-color: #fff;
    color: #000;
  }
  .modal-header, h4, .close {
    background-color: #333;
    color: #fff !important;
    text-align: center;
    font-size: 30px;
  }
  .modal-header, .modal-body {
    padding: 40px 50px;
  }
  .nav-tabs li a {
    color: #777;
  }
  #googleMap {
    width: 100%;
    height: 400px;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }  
  .navbar {
    font-family: Montserrat, sans-serif;
    margin-bottom: 0;
    background-color: #2d2d30;
    border: 0;
    font-size: 11px !important;
    letter-spacing: 4px;
    opacity: 0.9;
  }
  .navbar li a, .navbar .navbar-brand { 
    color: #d5d5d5 !important;
  }
  .navbar-nav li a:hover {
    color: #fff !important;
  }
  .navbar-nav li.active a {
    color: #fff !important;
    background-color: #29292c !important;
  }
  .navbar-default .navbar-toggle {
    border-color: transparent;
  }
  .open .dropdown-toggle {
    color: #fff;
    background-color: #555 !important;
  }
  .dropdown-menu li a {
    color: #000 !important;
  }
  .dropdown-menu li a:hover {
    background-color: red !important;
  }
  footer {
    background-color: #2d2d30;
    color: #f5f5f5;
    padding: 32px;
  }
  footer a {
    color: #f5f5f5;
  }
  footer a:hover {
    color: #777;
    text-decoration: none;
  }  
  .form-control {
    border-radius: 0;
  }
  textarea {
    resize: none;
  }
  </style>
  <style>
    .board:hover{
      color: red;
    }

  </style>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="50">

<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#myPage">Logo</a>
    </div>
    <div>
      <% if(logind == 0){%>
        <input id="login_email" value="ahngo13@naver.com">
        <input id="login_btn" type="button" class="btn btn-success" value="login"">
      <%}else{%>
        <%=name%>님 로그인 되셨습니다.    
        <input id="logout_btn" type="button" class="btn btn-danger" value="logout"">
      <%}%>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#myPage">HOME</a></li>
        <li><a href="#band">BAND</a></li>
        <li><a href="#tour">TOUR</a></li>
        <li><a href="#contact">CONTACT</a></li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">MORE
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Merchandise</a></li>
            <li><a href="#">Extras</a></li>
            <li><a href="#">Media</a></li> 
          </ul>
        </li>
        <li><a href="#"><span class="glyphicon glyphicon-search"></span></a></li>
      </ul>
    </div>
  </div>
</nav>

<div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div class="item active">
        <img src="ny.jpg" alt="New York" width="1200" height="700">
        <div class="carousel-caption">
          <h3>New York</h3>
          <p>The atmosphere in New York is lorem ipsum.</p>
        </div>      
      </div>

      <div class="item">
        <img src="chicago.jpg" alt="Chicago" width="1200" height="700">
        <div class="carousel-caption">
          <h3>Chicago</h3>
          <p>Thank you, Chicago - A night we won't forget.</p>
        </div>      
      </div>
    
      <div class="item">
        <img src="la.jpg" alt="Los Angeles" width="1200" height="700">
        <div class="carousel-caption">
          <h3>LA</h3>
          <p>Even though the traffic was a mess, we had the best time playing at Venice Beach!</p>
        </div>      
      </div>
    </div>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
</div>

<!-- Container (The Band Section) -->
<div id="band" class="container text-center">
  <h3>THE BAND</h3>
  <p><em>We love music!</em></p>
  <p>We have created a fictional band website. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <br>
  <div class="row">
    <div class="col-sm-4">
      <p class="text-center board"><strong id="board_write_text">게시판 글쓰기</strong></p><br>
      <a href="#demo" data-toggle="collapse">
        <img src="bandmember.jpg" class="img-circle person" alt="Random Name" width="255" height="255">
      </a>
      <div id="demo" class="collapse">
        <p>Guitarist and Lead Vocalist</p>
        <p>Loves long walks on the beach</p>
        <p>Member since 1988</p>
      </div>
    </div>
    <div class="col-sm-4">
      <p class="text-center board"><strong>게시판 보기</strong></p><br>
      <a href="#demo2" data-toggle="collapse">
        <img src="bandmember.jpg" class="img-circle person" alt="Random Name" width="255" height="255">
      </a>
      <div id="demo2" class="collapse">
        <p>Drummer</p>
        <p>Loves drummin'</p>
        <p>Member since 1988</p>
      </div>
    </div>
    <div class="col-sm-4">
      <p class="text-center"><strong>Name</strong></p><br>
      <a href="#demo3" data-toggle="collapse">
        <img src="bandmember.jpg" class="img-circle person" alt="Random Name" width="255" height="255">
      </a>
      <div id="demo3" class="collapse">
        <p>Bass player</p>
        <p>Loves math</p>
        <p>Member since 2005</p>
      </div>
    </div>
  </div>
</div>

<!-- Container (TOUR Section) -->
<div id="tour" class="bg-1">
  <div class="container">
    <h3 class="text-center">TOUR DATES</h3>
    <p class="text-center">Lorem ipsum we'll play you some music.<br> Remember to book your tickets!</p>
    <ul class="list-group">
      <li class="list-group-item">September <span class="label label-danger">Sold Out!</span></li>
      <li class="list-group-item">October <span class="label label-danger">Sold Out!</span></li> 
      <li class="list-group-item">November <span class="badge">3</span></li> 
    </ul>
    
    <div class="row text-center">
      <div class="col-sm-4">
        <div class="thumbnail">
          <img src="paris.jpg" alt="Paris" width="400" height="300">
          <p><strong>Paris</strong></p>
          <p>Friday 27 November 2015</p>
          <button class="btn" data-toggle="modal" data-target="#myModal">Buy Tickets</button>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="thumbnail">
          <img src="newyork.jpg" alt="New York" width="400" height="300">
          <p><strong>New York</strong></p>
          <p>Saturday 28 November 2015</p>
          <button class="btn" data-toggle="modal" data-target="#myModal">Buy Tickets</button>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="thumbnail">
          <img src="sanfran.jpg" alt="San Francisco" width="400" height="300">
          <p><strong>San Francisco</strong></p>
          <p>Sunday 29 November 2015</p>
          <button class="btn" data-toggle="modal" data-target="#myModal">Buy Tickets</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">×</button>
          <h4><span class="glyphicon glyphicon-lock"></span> Tickets</h4>
        </div>
        <div class="modal-body">
          <form role="form">
            <div class="form-group">
              <label for="psw"><span class="glyphicon glyphicon-shopping-cart"></span> Tickets, $23 per person</label>
              <input type="number" class="form-control" id="quantity" placeholder="How many?">
            </div>
            <div class="form-group">
              <label for="usrname"><span class="glyphicon glyphicon-user"></span> Send To</label>
              <select class="form-control" id="product">
                <option value="Paris">Paris</option>
                <option value="NewYork">NewYork</option>
                <option value="San Francisco">San Francisco</option>
              </select>
            </div>
              <button id="basket_btn" class="btn btn-block">Pay 
                <span class="glyphicon glyphicon-ok"></span>
              </button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal">
            <span class="glyphicon glyphicon-remove"></span> Cancel
          </button>
          <p>Need <a href="#">help?</a></p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Container (Contact Section) -->
<div id="contact" class="container">
  <h3 class="text-center">Contact</h3>
  <p class="text-center"><em>We love our fans!</em></p>

  <div class="row">
    <div class="col-md-4">
      <p>Fan? Drop a note.</p>
      <p><span class="glyphicon glyphicon-map-marker"></span>Chicago, US</p>
      <p><span class="glyphicon glyphicon-phone"></span>Phone: +00 1515151515</p>
      <p><span class="glyphicon glyphicon-envelope"></span>Email: mail@mail.com</p>
    </div>
    <div class="col-md-8">
      <div class="row">
        <div class="col-sm-6 form-group">
          <input class="form-control" id="name" name="name" placeholder="Name" type="text" required>
        </div>
        <div class="col-sm-6 form-group">
          <input class="form-control" id="email" name="email" placeholder="Email" type="email" required>
        </div>
      </div>
      <textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea>
      <br>
      <div class="row">
        <div class="col-md-12 form-group">
          <button class="btn pull-right" id="contact_btn">Send</button>
        </div>
      </div>
    </div>
  </div>
  <br>
  <h3 class="text-center">From The Blog</h3>  
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#home">Mike</a></li>
    <li><a data-toggle="tab" href="#menu1">Chandler</a></li>
    <li><a data-toggle="tab" href="#menu2">Peter</a></li>
  </ul>

  <div class="tab-content">
    <div id="home" class="tab-pane fade in active">
      <h2>Mike Ross, Manager</h2>
      <p>Man, we've been on the road for some time now. Looking forward to lorem ipsum.</p>
    </div>
    <div id="menu1" class="tab-pane fade">
      <h2>Chandler Bing, Guitarist</h2>
      <p>Always a pleasure people! Hope you enjoyed it as much as I did. Could I BE.. any more pleased?</p>
    </div>
    <div id="menu2" class="tab-pane fade">
      <h2>Peter Griffin, Bass player</h2>
      <p>I mean, sometimes I enjoy the show, but other times I enjoy other things.</p>
    </div>
  </div>
</div>

<!-- Image of location/map -->
<img src="map.jpg" class="img-responsive" style="width:100%">

<!-- Footer -->
<footer class="text-center">
  <a class="up-arrow" href="#myPage" data-toggle="tooltip" title="TO TOP">
    <span class="glyphicon glyphicon-chevron-up"></span>
  </a><br><br>
  <p>Bootstrap Theme Made By <a href="https://www.w3schools.com" data-toggle="tooltip" title="Visit w3schools">www.w3schools.com</a></p> 
</footer>

<script>
$(document).ready(function(){
  // Initialize Tooltip
  $('[data-toggle="tooltip"]').tooltip(); 
  
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
})
</script>

</body>
</html>
~~~



board_write_form.ejs

~~~ejs
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%=title%></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <script src="http://localhost:3000/js/client.js"></script>
    </head>
    <body>
        <table class="table">
            <tr>
                <td>글 제목</td>
                <td><input id="board_title" placeholder="제목을 입력하세요"></td>
            </tr>
            <tr>
                <td>글 내용</td>
                <td><textarea id="board_content" placeholder="글 내용을 입력하세요" rows="10" cols="60"></textarea></td>
            </tr>    
        </table>
        <button id="board_write_btn">등록</button>
        <button type="reset">취소</button>

        <hr>
        <table class="table">
            <tr><td>글 번호</td><td>글 제목</td><td>작성자</td></tr>
            <% for(let i=0;i<result.length;i++){%>
            <tr><td><%=result[i].bo_no%></td><td><%=result[i].title%></td><td><%=result[i].name%></td></tr>
            <% } %>
        </table>
    </body>
</html>
~~~



### js

client.js

~~~js
$(document).ready(function(){
    $('#contact_btn').click(function(){

        const name = $('#name').val();
        const email = $('#email').val();
        const comments = $('#comments').val();

        const send_param = {
            name,email,comments
        };

        $.post('contact', send_param, function(resultData){
            alert(resultData.message);
        });
    });

    $('#login_btn').click(function(){

        const email = $('#login_email').val();
        const send_param = {
            email
        };

        $.post('login', send_param, function(resultData){
            alert(resultData.message);
            location.reload();
        });
    });
    $('#logout_btn').click(function(){

        $.post('logout', {}, function(resultData){
            alert(resultData.message);
            location.reload();
        });
    });

    $('#basket_btn').click(function(){
        const quantity = $('#quantity').val();
        const product = $('#product').val();
        alert(quantity+":"+product);
        const send_param = {product, quantity};

        $.post('basket',send_param,function(resultData){
            alert(resultData.message);
        });

    });

    $('#board_write_text').click(function(){
        window.open("/board/write_form", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
    });

    $('#board_write_btn').click(function(){
        const title = $('#board_title').val();
        const content = $('#board_content').val();
        // alert(board_title + ":" + board_content);
        const send_param = {title, content};
        $.post('/board/write', send_param, function(resultData){
            alert(resultData.message);
        });
    });

    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var deleteUrl = button.data('title');
        var modal = $(this);
    });
});
~~~



### app.js

~~~js
const express = require('express');
const path = require('path');
const session = require('express-session');

const boardRouter = require('./routes/board');
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const basketRouter = require('./routes/basket');

const app = express();

app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');

// 배열 같은 데이터도 파싱 가능
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:"I kill you",
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/contact', contactRouter);
app.use('/basket', basketRouter);
app.use('/board', boardRouter);

app.listen(3000,()=>{
    console.log('3000 listen');
});
~~~



### routes

index.js

~~~js
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    let logind=0;
    if(req.session.email){
        logind=1;
    }else{
    }
    res.render('index', {title:"MySHOP2", logind:logind, name:req.session.name});
});

module.exports = router;
~~~



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



login.js

~~~js
const express = require('express');
const router = express.Router();
// const members = require('./members');
const con = require('./mysql');

router.post('/', (req,res)=>{
    let message;

    const sql = `SELECT * FROM members where email='${req.body.email}'`;
    // con.connect((err)=>{
    //     if(err) throw err;

        con.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
            }else{
                // console.log(result.length);
                console.log(result.length);
                if(result.length > 0){
                    // con.end();
                    req.session.email = req.body.email;  
                    req.session.name = result[0].name;
                    req.session.m_no = result[0].no;         
                    message = "login ok";
                    console.log(message);
                }else{
                    // con.end();
                    message = "login Fail";
                    console.log(message);
                }
                res.json({message:message});
            }
        });
    // });
});

module.exports = router;
~~~



logout.js

~~~js
const express = require('express');
const router = express.Router();

router.post('/', (req,res)=>{
    req.session.destroy(()=>{
        res.json({message : "로그아웃 되었습니다!"});
    });
});

module.exports = router;
~~~



basket.js

~~~js
const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/',(req,res,next)=>{
    
    // con.connect((err)=>{
    //     if(err) throw err;
        // console.log("Connected!");
        
        if(req.session.email){
            var sql = `INSERT INTO basket (m_no, product, quantity) VALUES ('${req.session.m_no}','${req.body.product}',${req.body.quantity})`;
            console.log(sql);
            con.query(sql, (err, result) =>{
                // con.end();
                if (err) {
                    console.log("insert fail", err);
                    res.json({message:"장바구니 넣기 실패"});
                }else{
                    console.log("1 record inserted");
                    res.json({message:`${req.session.name}님! 장바구니에 ${req.body.product}가 추가 되었습니다!`});
                }
            });
        }else{
            // con.end();
            res.json({message:"로그인 후 진행하십시오."});
        }
    // });
});

module.exports = router;
~~~



board.js

~~~js
const express = require('express');
const router = express.Router();
const con = require('./mysql');

router.post('/write', (req,res)=>{
    if(req.session.email){
        var sql = `INSERT INTO board (m_no, title, content) VALUES (${req.session.m_no},'${req.body.title}','${req.body.content}')`;
        console.log(sql);
        con.query(sql, (err, result) =>{
            if (err) {
                console.log("insert fail", err);
                res.json({message:`글쓰기 실패`});
            }else{
                console.log("1 record inserted");
                res.json({message:`글쓰기가 완료 되었습니다`});
            }
        });
    }else{
        res.json({message:"로그인부터 진행해주세요~"});
    }
});

router.get('/write_form', (req,res)=>{
    var sql = `select * from board join members on board.m_no = members.no`;
    console.log(sql);
    con.query(sql, (err, result, field) =>{
        if (err) {
            console.log("insert fail", err);
            res.json({message:`글보기 실패`});
        }else{
            console.log(field);
            res.render('board_write_form',{title:"글쓰기 화면", result});
        }
    });
});

module.exports = router;
~~~


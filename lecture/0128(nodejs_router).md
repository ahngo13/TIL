#### JQuery .each()

https://api.jquery.com/each/#each-function

~~~html
<ul>
  <li>foo</li>
  <li>bar</li>
</ul>
~~~

~~~js
$( "li" ).each(function( index ) {
  console.log( index + ": " + $( this ).text() );
});
~~~



app.js

배열이 파라미터로 넘어가지 않는 것은 어떠한 파라미터가 넘어와도 json 데이터로 넘겨주도록 설정을 했기 때문임. 따라서 extended:true로 변경해주면 배열도 잘 넘어가는 것을 확인할 수 있다.

~~~js
app.use(express.urlencoded({extended:true}));
app.use(express.json());
~~~



^ : minor 버전까지만 설치 또는 업데이트

~ : patch 버전까지만 설치 또는 업데이트

~~~json
  "dependencies": {
    "express": "^4.17.1"
  }
~~~



#### 논블록킹으로 인해 반복문이 돌아감과 동시에 아래의 처리가 되므로 message에 값 변경하는 로직으로 변경하여 적용

~~~js
app.post('/login', (req,res)=>{
    const email = req.body.email;
    let message;
    for(let i=0; i<members.length; i++){
        if(email == members[i].email){
            message=`${email}님 로그인 되셨습니다!`;
            break;
        }
    }

    if(!message){
        message = "존재하지 않는 아이디이거나 비밀번호가 틀렸습니다!";
    }
    /*  members.forEach((value,index)=>{
            if(email == value.email){
                res.json({message:`${email}님 로그인 되셨습니다!`});
                break;
            }
        console.log(index,value);
    }); */
    
    res.json({message:message});
    
});
~~~



#### 로그인 및 장바구니 구현

index.html

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Theme Made By www.w3schools.com -->
  <title>Bootstrap Theme Company Page</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="js/client.js"></script>
  <style>
  body {
    font: 400 15px Lato, sans-serif;
    line-height: 1.8;
    color: #818181;
  }
  h2 {
    font-size: 24px;
    text-transform: uppercase;
    color: #303030;
    font-weight: 600;
    margin-bottom: 30px;
  }
  h4 {
    font-size: 19px;
    line-height: 1.375em;
    color: #303030;
    font-weight: 400;
    margin-bottom: 30px;
  }  
  .jumbotron {
    background-color: aquamarine;
    color: #fff;
    padding: 100px 25px;
    font-family: Montserrat, sans-serif;
  }
  .container-fluid {
    padding: 60px 50px;
  }
  .bg-grey {
    background-color: #f6f6f6;
  }
  .logo-small {
    color: aquamarine;
    font-size: 50px;
  }
  .logo {
    color: aquamarine;
    font-size: 200px;
  }
  .thumbnail {
    padding: 0 0 15px 0;
    border: none;
    border-radius: 0;
  }
  .thumbnail img {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }
  .carousel-control.right, .carousel-control.left {
    background-image: none;
    color: aquamarine;
  }
  .carousel-indicators li {
    border-color: aquamarine;
  }
  .carousel-indicators li.active {
    background-color: aquamarine;
  }
  .item h4 {
    font-size: 19px;
    line-height: 1.375em;
    font-weight: 400;
    font-style: italic;
    margin: 70px 0;
  }
  .item span {
    font-style: normal;
  }
  .panel {
    border: 1px solid aquamarine; 
    border-radius:0 !important;
    transition: box-shadow 0.5s;
  }
  .panel:hover {
    box-shadow: 5px 0px 40px rgba(0,0,0, .2);
  }
  .panel-footer .btn:hover {
    border: 1px solid aquamarine;
    background-color: #fff !important;
    color: aquamarine;
  }
  .panel-heading {
    color: #fff !important;
    background-color: aquamarine !important;
    padding: 25px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .panel-footer {
    background-color: white !important;
  }
  .panel-footer h3 {
    font-size: 32px;
  }
  .panel-footer h4 {
    color: #aaa;
    font-size: 14px;
  }
  .panel-footer .btn {
    margin: 15px 0;
    background-color: aquamarine;
    color: #fff;
  }
  .navbar {
    margin-bottom: 0;
    background-color: aquamarine;
    z-index: 9999;
    border: 0;
    font-size: 12px !important;
    line-height: 1.42857143 !important;
    letter-spacing: 4px;
    border-radius: 0;
    font-family: Montserrat, sans-serif;
  }
  .navbar li a, .navbar .navbar-brand {
    color: #fff !important;
  }
  .navbar-nav li a:hover, .navbar-nav li.active a {
    color: aquamarine !important;
    background-color: #fff !important;
  }
  .navbar-default .navbar-toggle {
    border-color: transparent;
    color: #fff !important;
  }
  footer .glyphicon {
    font-size: 20px;
    margin-bottom: 20px;
    color: aquamarine;
  }
  .slideanim {visibility:hidden;}
  .slide {
    animation-name: slide;
    -webkit-animation-name: slide;
    animation-duration: 1s;
    -webkit-animation-duration: 1s;
    visibility: visible;
  }
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(70%);
    } 
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @-webkit-keyframes slide {
    0% {
      opacity: 0;
      -webkit-transform: translateY(70%);
    } 
    100% {
      opacity: 1;
      -webkit-transform: translateY(0%);
    }
  }
  @media screen and (max-width: 768px) {
    .col-sm-4 {
      text-align: center;
      margin: 25px 0;
    }
    .btn-lg {
      width: 100%;
      margin-bottom: 35px;
    }
  }
  @media screen and (max-width: 480px) {
    .logo {
      font-size: 150px;
    }
  }
  </style>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">

<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#myPage">Logo</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#about">ABOUT</a></li>
        <li><a href="#services">SERVICES</a></li>
        <li><a href="#portfolio">PORTFOLIO</a></li>
        <li><a href="#pricing">PRICING</a></li>
        <li><a href="#contact">CONTACT</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="jumbotron text-center">
  <h1>Company</h1> 
  <p>We specialize in blablabla</p> 
  <form>
    <div style="display: none;" id="logout_div">
      <span id="login_msg"></span>
      <input  type='button' class='btn btn-danger' value='logout' id='logout_btn'>
    </div>
    <div class="input-group" id="login_div">
      <input id="login_email" type="email" class="form-control" size="50" placeholder="Email Address" required>
      <div class="input-group-btn">
        <button type="button" class="btn btn-danger" id="login_btn">Subscribe</button>
      </div>
    </div>
  </form>
</div>

<!-- Container (About Section) -->
<div id="about" class="container-fluid">
  <div class="row">
    <div class="col-sm-8">
      <h2>About Company Page</h2><br>
      <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <br><button class="btn btn-default btn-lg">Get in Touch</button>
    </div>
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-signal logo"></span>
    </div>
  </div>
</div>

<div class="container-fluid bg-grey">
  <div class="row">
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-globe logo slideanim"></span>
    </div>
    <div class="col-sm-8">
      <h2>Our Values</h2><br>
      <h4><strong>MISSION:</strong> Our mission lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br>
      <p><strong>VISION:</strong> Our vision Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </div>
</div>

<!-- Container (Services Section) -->
<div id="services" class="container-fluid text-center">
  <h2>SERVICES</h2>
  <h4>What we offer</h4>
  <br>
  <div class="row slideanim">
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-off logo-small"></span>
      <h4>POWER</h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div>
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-heart logo-small"></span>
      <h4>LOVE</h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div>
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-lock logo-small"></span>
      <h4>JOB DONE</h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div>
  </div>
  <br><br>
  <div class="row slideanim">
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-leaf logo-small"></span>
      <h4>GREEN</h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div>
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-certificate logo-small"></span>
      <h4>CERTIFIED</h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div>
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-wrench logo-small"></span>
      <h4 style="color:#303030;">HARD WORK</h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div>
  </div>
</div>

<!-- Container (Portfolio Section) -->
<div id="portfolio" class="container-fluid text-center bg-grey">
  <h2>Portfolio</h2><br>
  <h4>What we have created</h4>
  <div class="row text-center slideanim">
    <div class="col-sm-4">
      <div class="thumbnail">
        <img src="paris.jpg" alt="Paris" width="400" height="300">
        <p><strong>Paris</strong></p>
        <p>Yes, we built Paris</p>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="thumbnail">
        <img src="newyork.jpg" alt="New York" width="400" height="300">
        <p><strong>New York</strong></p>
        <p>We built New York</p>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="thumbnail">
        <img src="sanfran.jpg" alt="San Francisco" width="400" height="300">
        <p><strong>San Francisco</strong></p>
        <p>Yes, San Fran is ours</p>
      </div>
    </div>
  </div><br>
  
  <h2>What our customers say</h2>
  <div id="myCarousel" class="carousel slide text-center" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div class="item active">
        <h4>"This company is the best. I am so happy with the result!"<br><span>Michael Roe, Vice President, Comment Box</span></h4>
      </div>
      <div class="item">
        <h4>"One word... WOW!!"<br><span>John Doe, Salesman, Rep Inc</span></h4>
      </div>
      <div class="item">
        <h4>"Could I... BE any more happy with this company?"<br><span>Chandler Bing, Actor, FriendsAlot</span></h4>
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
</div>

<!-- Container (Pricing Section) -->
<div id="pricing" class="container-fluid">
  <div class="text-center">
    <h2>Pricing</h2>
    <h4>Choose a payment plan that works for you</h4>
  </div>
  <div class="row slideanim">
    <div class="col-sm-4 col-xs-12">
      <div class="panel panel-default text-center">
        <div class="panel-heading">
          <h1>Basic</h1>
        </div>
        <div class="panel-body">
          <p><strong>20</strong> Lorem</p>
          <p><strong>15</strong> Ipsum</p>
          <p><strong>5</strong> Dolor</p>
          <p><strong>2</strong> Sit</p>
          <p><strong>Endless</strong> Amet</p>
        </div>
        <div class="panel-footer">
          <h3>$19</h3>
          <h4>per month</h4>
          <button onclick="signUpBtn('Basic')" class="btn btn-lg">Sign Up</button>
        </div>
      </div>      
    </div>     
    <div class="col-sm-4 col-xs-12">
      <div class="panel panel-default text-center">
        <div class="panel-heading">
          <h1>Pro</h1>
        </div>
        <div class="panel-body">
          <p><strong>50</strong> Lorem</p>
          <p><strong>25</strong> Ipsum</p>
          <p><strong>10</strong> Dolor</p>
          <p><strong>5</strong> Sit</p>
          <p><strong>Endless</strong> Amet</p>
        </div>
        <div class="panel-footer">
          <h3>$29</h3>
          <h4>per month</h4>
          <button onclick="signUpBtn('Pro')" class="btn btn-lg">Sign Up</button>
        </div>
      </div>      
    </div>       
    <div class="col-sm-4 col-xs-12">
      <div class="panel panel-default text-center">
        <div class="panel-heading">
          <h1>Premium</h1>
        </div>
        <div class="panel-body">
          <p><strong>100</strong> Lorem</p>
          <p><strong>50</strong> Ipsum</p>
          <p><strong>25</strong> Dolor</p>
          <p><strong>10</strong> Sit</p>
          <p><strong>Endless</strong> Amet</p>
        </div>
        <div class="panel-footer">
          <h3>$49</h3>
          <h4>per month</h4>
          <button onclick="signUpBtn('Premium')" class="btn btn-lg">Sign Up</button>
        </div>
      </div>      
    </div>
    <div>장바구니</div>
    <div class="col-sm-12" id="cart">
    
    </div>    
  </div>
</div>

<!-- Container (Contact Section) -->
<div id="contact" class="container-fluid bg-grey">
  <h2 class="text-center">CONTACT</h2>
  <div class="row">
    <div class="col-sm-5">
      <p>Contact us and we'll get back to you within 24 hours.</p>
      <p><span class="glyphicon glyphicon-map-marker"></span> Chicago, US</p>
      <p><span class="glyphicon glyphicon-phone"></span> +00 1515151515</p>
      <p><span class="glyphicon glyphicon-envelope"></span> myemail@something.com</p>
    </div>
    <div class="col-sm-7 slideanim">
      <div class="row">
        <div class="col-sm-6 form-group">
          <input class="form-control" id="name" name="name" placeholder="Name" type="text" required>
        </div>
        <div class="col-sm-6 form-group">
          <input class="form-control" id="email" name="email" placeholder="Email" type="email" required>
        </div>
      </div>
      <textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea><br>
      <div class="row">
        <div class="col-sm-12 form-group">
          <input id="contact_btn" class="btn btn-default pull-right" value="send" type="button">
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Image of location/map -->
<img src="/w3images/map.jpg" class="w3-image w3-greyscale-min" style="width:100%">

<footer class="container-fluid text-center">
  <a href="#myPage" title="To Top">
    <span class="glyphicon glyphicon-chevron-up"></span>
  </a>
  <p>Bootstrap Theme Made By <a href="https://www.w3schools.com" title="Visit w3schools">www.w3schools.com</a></p>
</footer>

<script>
$(document).ready(function(){
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
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
})
</script>

</body>
</html>

~~~



app.js

~~~js
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const members = [{name:'hamletshu',email:'ahngo13@naver.com', comments:'배고파'},
{name:'godletshu',email:'hamletshu@naver.com', comments:'배고파'}];

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:'갓창유',
    cookie: {
        httpOnly:true,
        secure:false,
    }
}));


app.post('/contact',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const comments = req.body.comments;
    members.push(req.body);
    console.log(members);

    res.json({message:`${name} : ${email} : ${comments}`});
});

app.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.json({message:"logout ok"});
    });
});

app.post('/cart', (req,res)=>{
    const product = req.body.product;
    let resultCode;
    if(!req.session.email){
        resultCode = '401';
    }else{
        if(!req.session.cart){
            req.session.cart = [];
        }
        
        req.session.cart.push(product);
        resultCode = '200';
    }
    // const cart = req.session.cart;
    res.json({product:product,cart:req.session.cart,resultCode:resultCode});

});

app.post('/login', (req,res)=>{
    const email = req.body.email;
    let message;
    let status;
    for(let i=0; i<members.length; i++){
        if(email == members[i].email){
            message=`${email}님 로그인 되셨습니다!`;
            req.session.email = req.body.email;
            status = '1';
            break;
        }
    }

    if(!message){
        message = "존재하지 않는 아이디이거나 비밀번호가 틀렸습니다!";
        status = '0';
    }
    /*  members.forEach((value,index)=>{
            if(email == value.email){
                res.json({message:`${email}님 로그인 되셨습니다!`});
                break;
            }
        console.log(index,value);
    }); */
    
    res.json({message:message, status:status});
    
});

app.listen(3000, ()=>{
    console.log('3000 listen');
});
~~~



client.js

~~~js
$(document).ready(function(){
    $('#contact_btn').click(function(){
        const name = $('#name').val();
        const email = $('#email').val();
        const comments = $('#comments').val();
        
        const send_param={name, email, comments};
        //  alert(name + ':' + email + ':' + comments);
        $.post('contact', send_param, function(resultData){
            alert(resultData.message);
            $('#name').val('');
            $('#email').val('');
            $('#comments').val('');
        });
    });
    
    $('#login_btn').click(function(){
        const email = $('#login_email').val();
        const send_param = {email};
        $.post('login', send_param, function(resultData){
            if(resultData.status == '1'){
                // $('#login_div').html(resultData.message + "<input type='button' class='btn btn-danger' value='logout' id='logout_btn'>");           
                $('#login_msg').html(resultData.message);
                $('#logout_div').show();
                $('#login_div').hide();
            }else{
                alert(resultData.message);
                $('#login_email').val('');           
            }
        });
    });

    $(document).on('click', '#logout_btn', function(){

        $.get('logout', function(resultData){
            // alert(resultData.message);
           /*  let login_form = "<input id='login_email' type='email' class='form-control' size='50' placeholder='Email Address' required>";
            login_form += "<div class='input-group-btn'>";
            login_form += "<button type='button' class='btn btn-danger' id='login_btn'>Subscribe</button>";
            login_form += "</div>"
            $('#login_div').html(login_form); */
            $('#login_msg').html('');
            $('#login_div').show();
            $('#logout_div').hide();
            $('#login_email').val('');
        });

        
    });

});

function signUpBtn(product){
    // alert(num);
    const send_param = {
        product
    };
    
    $.post('cart', send_param, function(resultData){
        //로그인이 되어있지 않으면
        if(resultData.resultCode == '401'){
            alert('로그인을 하신 후에 진행 해주세요~');
            $('#login_email').focus();
        }else{
            //로그인이 되어있을 경우
            alert(resultData.product + '가 장바구니에 담겼습니다!');
            $('#cart').html('<div>'+resultData.cart+'</div>');
        }
    });
}
~~~



#### Router 객체로 라우팅 분리하기

app.js

~~~js
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const {contactRouter, members} = require('./routes/contact');
const cartRouter = require('./routes/cart');

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:'갓창유',
    cookie: {
        httpOnly:true,
        secure:false,
    }
}));

app.use('/contact', contactRouter);
app.use('/logout', logoutRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);

app.listen(3000, ()=>{
    console.log('3000 listen');
});
~~~



cart.js

~~~js
const express = require('express');
const router = express.Router();

router.post('/', (req,res)=>{
    const product = req.body.product;
    let resultCode;
    if(!req.session.email){
        resultCode = '401';
    }else{
        if(!req.session.cart){
            req.session.cart = [];
        }
        
        req.session.cart.push(product);
        resultCode = '200';
    }
    // const cart = req.session.cart;
    res.json({product:product,cart:req.session.cart,resultCode:resultCode});

});

module.exports=router;
~~~



contact.js

~~~js
const express = require('express');
const contactRouter = express.Router();

const members = [{name:'hamletshu',email:'ahngo13@naver.com', comments:'배고파'},
{name:'godletshu',email:'hamletshu@naver.com', comments:'배고파'}];

contactRouter.post('/',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const comments = req.body.comments;
    members.push(req.body);
    console.log(members);

    res.json({message:`${name} : ${email} : ${comments}`});
});

module.exports={contactRouter, members};

~~~



login.js

~~~js
const express = require('express');
const router = express.Router();
const {contactRouter, members} = require('./contact');

router.post('/', (req,res)=>{
    const email = req.body.email;
    let message;
    let status;
    for(let i=0; i<members.length; i++){
        if(email == members[i].email){
            message=`${email}님 로그인 되셨습니다!`;
            req.session.email = req.body.email;
            status = '1';
            break;
        }
    }

    if(!message){
        message = "존재하지 않는 아이디이거나 비밀번호가 틀렸습니다!";
        status = '0';
    }
    /*  members.forEach((value,index)=>{
            if(email == value.email){
                res.json({message:`${email}님 로그인 되셨습니다!`});
                break;
            }
        console.log(index,value);
    }); */
    
    res.json({message:message, status:status});
    
});

module.exports = router;
~~~



logout.js

~~~js
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    req.session.destroy(()=>{
        res.json({message:"logout ok"});
    });
});

module.exports=router;
~~~




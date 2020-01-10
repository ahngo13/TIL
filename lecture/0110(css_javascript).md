# 1/10

### 아이콘 참고 사이트

https://fontawesome.com/start



### 부트스트랩 참고 사이트 

https://www.w3schools.com/bootstrap4

~~~html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
~~~



~~~html
<button href="memberInsert.jsp" class="btn btn-primary">회원가입</button>
~~~



## 자바스크립트

https://www.w3schools.com/js/default.asp



### 내부 자바스크립트

~~~html
<!DOCTYPE html>
<html>
<body>

<h3>내부 자바스크립트 작성</h3>
<script>
	document.write("Welcome to Javascript!<br>");
    document.write("Enjoy Javascript programming!");
</script>

</body>
</html> 

~~~

~~~html
<!DOCTYPE html>
<html>
<body>

<h3>내부 자바스크립트 작성</h3>
<script>
	window.document.write("Welcome to Javascript!<br>");
    window.document.write("Enjoy Javascript programming!");
</script>

</body>
</html> 

~~~

window는 생략 가능하고 document의 소유주이다.

BOM (Browser Object Model) 에 document가 포함



~~~html
<!DOCTYPE html>
<html>
  <head>
    <script>
    	var subject1="Welcome to Javascript!<br>";
        var subject2="Enjoy Javascript programming!";
        
        function welcome(target){
          document.write(target);
        }
        
       
    </script>
  </head>
<body>

<h3>내부 자바스크립트 작성</h3>
	<script>
     	welcome(subject1);//window.welcome(window.subject1);과 같음
        welcome(subject2);//window.welcome(window.subject2);과 같음
    </script>

</body>
</html> 

~~~



~~~html
<!DOCTYPE html>
<html>
    <body>
        <script>
            var v1=10;
            document.write(window.v1);
        </script>
    </body>
</html>
~~~

변수를 선언하면 window 객체에 포함된다.



### 외부 자바스크립트

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>외부 자바스크립트 작성</h3>
	<script src="welcome.js"></script>
	
	<h3>인라인 자바스크립트 작성</h3>
	<button onclick="alert('&^_^&')">웹프로그래밍</button>
	<a href="javascript:alert('^ㅅ^');">자바스크립트</a>
</body>
</html>
~~~



welcome.js

~~~js
	var subject1="Welcome to Javascript!<br>";
    var subject2="Enjoy Javascript programming!";
    
    function welcome(target){
      document.write(target);
    }
    
 	window.welcome(window.subject1);
    window.welcome(window.subject2);
~~~



~~~html
	<button onclick="welcome(subject1)">웹프로그래밍</button>
	<a href="javascript:welcome(subject2);">자바스크립트</a>
~~~

documnet.write() 함수는 HTML 문서에 있던 직전의 내용들을 모두 삭제하고 출력



### 내부 및 인라인 자바스크립트 작성

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>외부 자바스크립트 작성</h3>
	<script src="welcome.js"></script>
	
	<h3>인라인 자바스크립트 작성</h3>
	<button onclick="welcome(subject1)">웹프로그래밍</button>
	<a href="javascript:welcome(subject2);">자바스크립트</a>
	<div id="here"></div>
</body>
</html>
~~~

welcome.js

~~~js
	var subject1="Welcome to Javascript!<br>";
    var subject2="Enjoy Javascript programming!";
    
    function welcome(target){
    	document.getElementById("here").innerHTML = target;
    }
    
 	window.welcome(window.subject1);
    window.welcome(window.subject2);
~~~



### 자바스크립트 주석

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>자바스크립트 코드 구조</title>
	<script>
		//문자열 변수 정의
		var txt = "자바스크립트 프로그래밍을 시작합니다.";
		
		/* 자바스크립트 함수 welcome() 정의 
			<p>태그 내용으로 문자열 변수 txt를 지정함 */
		function welcome(){
			document.getElementById('demo').innerHTML=txt;		
		}
	</script>
</head>
<body>
	<h3>Welcome to Javascript!</h3>
	<button type="button" onclick="welcome();">
		Start Learning
	</button>
	<p id="demo"></p>
</body>
</html>
~~~



~~~html
<!DOCTYPE html>
<html>

<body>
	<script>
        document.write(window.v1+1); //NAN이라고 출력됨. 에러 발생은 안됨.
        //밑에 var v1 이런식으로 변수가 선언되어있으면 hoisting 되어서 전에 변수가
        //자동으로 선언이 됨.
        v1=100;
        document.write(window.v1+1);
    </script>
</body>
</html> 

~~~

NaN(Not a Number)



### 객체의 비교

~~~html
<!DOCTYPE html>
<html>
<body>
	<script>
		var v1 =new Object();
        var v2 =new Object();
        document.write(window.v1 === window.v2);
    </script>
</body>
</html> 

~~~

false 값이 나오므로 각각의 오브젝트는 다르게 인식된다.



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
var v1=new Object();
v1.name="aaa";
document.write(v1.name);
</script>
</body>
</html>
~~~

prototype = 공장

객체를 만들 때 같은 프로토타입을 사용한다.



~~~html
<script>
function Person(){
this.eyes=2;
this.nose=1;
}
var p1=new Person();
var p2=new Person();
document.write(p1.eyes+":"+p1.nose);
document.write("<br>");
document.write(p2.eyes+":"+p2.nose);
</script>
~~~

그러므로 꼬일 수 있다.



### 수식과 연산자

~~~html
<!DOCTYPE html>
<html>
<body>
	<script>
		var num1 =15, num2 =4;
        var grade1 = 3.8, grade2 =4.3, grade3=15.0;
        var str1 = "Javascript",str2="Programming",str3="80";
        
        document.write(num1+num2+'<br>');
        document.write(num1-num2+'<br>');
        document.write(num1*num2+'<br>');
        document.write(num1/num2+'<br>');
        document.write(num1++ +30+'<br>');
        document.write(num1+'<br>');
        document.write(--num2 + 30 + '<br>');
        document.write(num2+'<br>');
        document.write(num1 + grade1 + '<br><br>');
        
    </script>
</body>
</html> 

~~~



~~~html
<!DOCTYPE html>
<html>
<body>
	<script>
		
        for(prop in window){
        	document.write(prop + '<br>');
        }
        document.write('<hr>');
        document.write(toolbar);
        
        document.write('<hr>');
        var toolbar = "hi";
        document.write(toolbar);
 
    </script>
</body>
</html> 

~~~



### 자바스크립트 비교연산자

~~~html
<!DOCTYPE html>
<html>
<body>
	<script>
		
      var num1 = 15, num2 =4, num3=15;
      var grade =15.0;
      var str="80";
      
      document.write((num1 <= num2) +'<br>');
      document.write((num1 != num3) +'<br>');
      document.write((num3 == grade) +'<br>');
      document.write((num3 === grade) +'<br>');
      document.write((num3 == 15) +'<br>');
      document.write((num3 === "15") +'<br>');
      document.write((str == 80) + '<br>');
      document.write((str === 80) + '<br>');
 
    </script>
</body>
</html> 

~~~



### 자바스크립트의 문장

~~~html
<!DOCTYPE html>
<html>
<head>
	<style>
    	td{width : 100px;
           taxt-align:center;}
    </style>
</head>
<body>
	<h3>성적 처리 결과 </h3><hr>
    
	<script>
		var kor=92, math=77, eng=88;
        var total, avg;
        
        total=kor+math+eng; //치환문
        avg=total/3; //치환문
        document.write('<table border=1>'); //함수문
        document.write('<tr><td>국어</td><td>'+kor+'</td></tr>'); //함수문
        document.write('<tr><td>수학</td><td>'+math+'</td></tr>'); //함수문
        document.write('<tr><td>영어</td><td>'+eng+'</td></tr>'); //함수문
        document.write('<tr><td>총점</td><td>'+total+'</td></tr>'); //함수문
        document.write('<tr><td>평균</td><td>'+avg+'</td></tr>'); //함수문
    	document.write('</table>');
    </script>
</body>
</html> 

~~~



### 자바스크립트 블록문

~~~html
<!DOCTYPE html>
<html>
<head>
	<style>
    	td{width : 100px;
           taxt-align:center;}
    </style>
</head>
<body>
	<h3>블록문 사용 예 </h3><hr>
    
	<script>
		var x, y, temp;
        //블록문 사용
        x=30, y=70, temp="***";
        if(x>y) {temp=x; x=y; y=temp;}
        document.write("x="+x+",y="+y+"<br>");
        
        x=30, y=70, temp="***";
        if(x>y) temp=x; x=y; y=temp;
        document.write("x="+x+",y="+y+"<br>");
        
         x=30, y=70, temp="***";
        if(x>y) {temp=x;} x=y; y=temp;
        document.write("x="+x+",y="+y+"<br>");
    </script>
</body>
</html> 
~~~

~~~
블록문 사용 예
x=30,y=70
x=70,y=***
x=70,y=***
~~~




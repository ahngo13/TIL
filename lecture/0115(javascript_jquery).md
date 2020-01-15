# 1/15

#### toString() 메서드의 재정의

~~~html
<!DOCTYPE html>
<html>
<body>

<script> 
   var obj = new Object();  

   obj.name = "조민규";  obj.major = "건축공학";   
   
   document.write("obj의 constructor: "); 
   document.write(obj.constructor + "<br>"); 

   document.write("obj의 toString():  ");   
   document.write(obj.toString()); // 상속 메서드  
   document.write("<br>"); 

   // toString() 재정의  
   obj.toString  = function() {       
      document.write("{ name: " + this.name  + ", major: " + this.major + " }<br>"); 
   };  

   document.write("obj의 toString(): "); 
   document.write(obj.toString());  // 재정의 메서드   
</script>

</body>
</html>

 
~~~

obj.prototype.toString() 으로 원래의 toString 사용가능

모든 Function에는 return; 생략되어 있음



### 브라우저 객체 모델

#### window 객체

BOM의 최상위 객체로서 현재 실행되고 있는 웹 브라우저 창

onload, open, setTimeout, setTimeInterval, clearTimeout, clearInterval, print



#### location

웹 브라우저의 주소 표시 영역을 나타내는 객체



#### history 객체

브라우저의 히스토리 정보를 제공



#### navigator 객체

웹 브라우저에 대한 정보



#### screen 객체

컴퓨터 모니터에 대한 정보

width, height, availWidth, availHeight, colorDepth, pixelDepth



### HTML DOM, 동적 문서 작성

HTML DOM은 HTML 문서에 있는 모든 HTML 요소들을 자바스크립트에서 다룰 수 있는 개체들로 표현해서 제공

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<style type="text/css">
		#f1{width: 150px; height: 150px;}
/* 		#f1{width: 70px; height: 70px;} */
		#txt1{background: "orange";}
	</style>
	<script type="text/javascript">
	function a(){
		var img = document.getElementById('f1');
		img.style.width="70px";
		img.style.height="70px";
		img.src="./image/js.PNG";
		
		var txt = document.getElementById('txt1');
		txt.innerHTML="자바스크립트";
		txt.style.background="orange";
	}
		
	</script>
</head>
<body>
	<img onclick="javascript:a();" id="f1" src="./image/html5.PNG">
	<span id="txt1">HTML5</span>
	<!-- <img id="f1" src="./image/js.PNG">
	<span id="txt1">자바스크립트</span> -->
</body>
</html>
~~~



~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
<h3>What Can JavaScript Do ?</h3>
<button id="b1" onclick="changeOn();">전구 켜기</button>
<img id="light" src="./image/lightoff.png" style="width:70px">
<button id="b2" onclick="changeOff();">전구 끄기</button>

<script type="text/javascript">
	function changeOff(){
		var tag1= document.getElementById('light');
		tag1.src='./image/lightoff.png';
	}
	function changeOn(){
		var tag1= document.getElementById('light');
		tag1.src='./image/lighton.png';
	}
</script>
</body>
</html>
~~~



### 이벤트 처리

#### 고전 이벤트 모델

직접 DOM 요소객체의 이벤트 속성에 이벤트핸들러를 지정



#### 표준 이벤트 모델

W3C에서 공식적으로 권장하는 표준 이벤트 처리 방법



#### Event Programming

1. EventSource에 EventListener(onclick, onchange 등등...)를 달고
2. EventListener를 구현하는 EnventHandler(Function)를 작성



~~~html
<!DOCTYPE html>
<html>
<body  >
<h3> 수강신청 과목을 모두 선택하세요 </h3><hr>  
<input type="checkbox" name="s" value="2" onchange="apply(event,this)"/>교양컴퓨터(2학점)
<input type="checkbox" name="s" value="4" onchange="apply(event,this)"/>자료구조실습(4학점) 
<input type="checkbox" name="s" value="3" onchange="apply(event,this)"/>데이터베이스(3학점)
<input type="checkbox" name="s" value="4" onchange="apply(event,this)"/>알고리즘실습(4학점)
<input type="checkbox" name="s" value="3" onchange="apply(,eventthis)"/>네트워크(3학점)<hr>
총 수강신청 학점 : <input type="text" id="sum" value="" /> 
<div id="aaa"></div>
<script> 
   var total=0; 
   function apply(e,subject) {
	   document.getElementById("aaa").innerHTML= e.type + ":" + e.target ; 
      if (subject.checked==true) { total=total+parseInt(subject.value); }
      else  { total=total- parseInt(subject.value); }
      document.getElementById("sum").value= total ; 
   }  
</script> 
</body>
</html>

~~~

이벤트 핸들러는 각각 핸들러를 따로따로 만드는 것이 효율적이다.

Java에서도 아래와 같이 예외처리를 해주는 것이 효율적이다.

~~~java
try {

}catch(ClassNotFoundException e){

}catch(FileNotFoundException e){

}
~~~



## JQuery

~~~html
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="js/jquery.js">
	
</script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h1 id="title1">자바스크립트 프로그래밍</h1>
<button onclick="$('#title1').html('jQuery 프로그래밍');">내용변경</button>
<button onclick="$('#title1').css('color','red');">스타일변경</button>
</body>
</html>
~~~



#### CDN 방법

~~~html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
~~~



### jQuery의 일반적인 사용구조

~~~html
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="js/jquery.js">
	
</script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#b1').on('click',function(){
			$('#t1').html('jQuery 프로그래밍');
		});	
		$('#b2').on('click',function(){
			$('#t1').css('color','red');
		});	
	});
	
</script>
<meta charset="UTF-8">
</head>
<body>
<h1 id="t1">자바스크립트 프로그래밍</h1>
<button id="b1">내용변경</button>
<button id="b2">스타일변경</button>
</body>
</html>
~~~



#### on() 작업함수를 이용한 다중 이벤트 처리 등록

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('#b1').on({
				"click" : function(){$('#t1').html('jQuery 라이브러리');},
				"mouseover" : function(){$('#t1').css('color','red')}
			});
		});
	</script>
</head>
<body>
<h3 id="t1">자바스크립트 프로그래밍</h3><hr>
<button id="b1">내용변경&스타일변경</button>
</body>
</html>
~~~



#### 이벤트 처리 작업함수 변경

~~~html
<!DOCTYPE html>
<html>
<head>
<script
  src="https://code.jquery.com/jquery-3.4.1.js"
  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  crossorigin="anonymous"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#b1').hover(
			function(){$('#t1').html('jQeury 라이브러리');
			$('#t1').css('color','red');},
			function(){$('#t1').css('color','black');}
		);
		
	});
</script>

<meta charset="UTF-8">
</head>
<body>
	<h3 id="t1">자바스크립트 프로그래밍</h3>
	<button id="b1">내용변경&스타일변경</button>
</body>
</html>
~~~



#### jQuery의 주요 작업함수

- 요소 내용 : html(), text(), val()
- 속성 : attr(), removeAttr(), addClass(), removeClass(), toggleClass()
- 스타일 속성 : css()
- DOM 트리 : first(), last(), remove() 등등


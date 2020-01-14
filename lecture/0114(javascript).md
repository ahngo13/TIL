# 1/14

### 배열

- Java는 연속된 메모리 공간을 갖지만 Javascript는 연속된 메모리 공간을 갖지 않는다.

따라서 동적인 배열을 사용하는 것보다 배열의 크기를 지정해서 사용하는 것이 효율적이다.



~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript">
	var student=[88,92,76];
	
	document.write("<hr> 배열 student 크기:" + student.length + "<br>");
	for(i=0;i<student.length;i++){
		document.write("student["+i+"]=");
		document.write(student[i]+"<br>");
	}
	
	student[6]=84; // 동적 배열 크기 확장
	student[4]="결석";
	document.write("<hr>배열 student 크기 :" + student.length+"<br>");
	for(i=0;i<student.length;i++){
		document.write("student["+i+"]=");
		document.write(student[i]+"<br>");
	}
</script>
</head>
<body>

</body>
</html>
~~~



~~~html
<!DOCTYPE html>
<html>
<body>    
  <script>  
  
    var student = Array( //new Array/Array 어느것으로 해도 문제 발생 없음
          Array('강민성', '컴공', 88, 76), 
          Array('김정아', '수학', 70, 83),
          Array('신은수', '행정', 92, 95),
          Array('이은준', '물리', 85, 92),
          Array('조우진', '건축', 97, 88)
    );  
   
    document.write("<h2> 성적 테이블 </h2>"); 
    document.write("<table border=1>"); 
    document.write("<tr><td>이름</td><td>전공</td>" 
                  + "<td>중간</td><td>기말</td></tr>");
    for (i=0; i<5; i++) { 
      document.write("<tr>");       
      for (j=0; j<4; j++) {     
         document.write("<td>" + student[i][j]+ "</td>"); 
      } 
      document.write("</tr>"); 
    } 
  </script> 
</body>
</html> 
~~~



- 문자열 인덱스를 가진 배열원소들을 추가해도 배열속성에는 반영되지 않고 for문에서 정수 인덱스를 이용해서 출력하면 출력되지 않음
- name 속성값을 인덱으로 이용해서 배열원소처럼 접근할 수 있음

~~~html
<!DOCTYPE html>
<html>
<body>       
  
  <script>          
      var score=new Array(), season=new Array("봄","여름","가을","겨울");   
      var subject="java";      
   
      score["web"] = 75; score[subject]=92; score['project']=85;  
      
      // 연관배열 score 출력 2 : 전체 출력   
      document.write("<hr>1. score (키인덱스 사용) 출력 <br>"); 
      document.write("(1) 배열명 출력: " + score +  "<br>"); 
      document.write("(2) 배열크기: " + score.length +  "<br>"); 
      document.write("(3) for문 출력: "); 
      for (i=0 ; i<score.length; i++) document.write(score[i] + " "); 
      document.write("<br>");  

      // 연관배열 score 출력 1 : 배열원소 출력  
      document.write("(4) 배열원소 출력: ");    
      document.write(score['web'] + ", " + score[subject]); 
      document.write(", " + score['project'] + "<hr>");  

      season["mar"]="춘곤기"; season["sep"]="환절기";         
 
      document.write("2. season (정수 및 문자열 인덱스 혼용) 출력<br>"); 
      document.write("(1) 배열명 출력: " + season +  "<br>"); 
      document.write("(2) 배열크기: " + season.length +  "<br>"); 
      document.write("(3) for문 출력: "); 
      for (i=0 ; i<season.length; i++) document.write(season[i]+" "); 
      document.write("<br>(4) 배열원소 출력: ");    
      document.write(season[0] + ", " + season['mar'] + ", " + season[1] + ", "); 
      document.write(season[2] + ", " + season['sep'] + ", " + season[3]);   
  </script> 
</body>
</html> 
~~~



~~~html
<!DOCTYPE html>
<html>
<body>    
  <script>  
    var students = ['강민성', '김정아', '신은수', '이은준', '조우진'];  

    students['전입생1'] = '조민규'; 
    students['전입생2'] = '홍정아'; 

    document.write("<h3>  학생 명단 </h3> <hr>");     
    for ( var i in students ) { 
       document.write(students[i] + "<br>");       
    } 
  </script> 
</body>
</html> 
~~~



### 자바스크립트 함수

- 특정기능이나 작업을 수행하는 프로그램 단위
- 함수 안에 선언된 변수는 그 함수 안에 우선한다

~~~html
<html>
<body>
<script>
   function f(){ 
    var v1=10; //이것을 함수레벨 스코프라고 부름
    document.write(window.v1); //undefined
    document.write(this.v1); //undefined
    document.write(v1); //10
   }
   f();
</script>
</body>
</html>

~~~



~~~html
<html>
<body>
<script>
   function f(){ 
    v1=10; //var 선언이 없으면 global 변수
    document.write(window.v1); //10
    document.write(this.v1); //10
    document.write(v1); //10
   }
   f();
</script>
</body>
</html>

~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
   function f(){ 
    let v1=10; //ES6 이것을 블록레벨 스코프라고 부름
    document.write(window.v1); //undefined
    document.write(this.v1); //undefined
    document.write(v1); //10
   }
   f();
</script>
</body>
</html>
~~~



~~~html
<html>
<body>
<script>
    var v1=10; let v1=20; 
    //SyntaxError: Identifier 'v1' has already been declared

    function f(){
      document.write(window.v1); //
      document.write(this.v1); //
      document.write(v1); //
    }
    f();
</script>
</body>
</html>
~~~



#### 호이스팅(Hoisting)의 개념
함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것



### 콜백 함수

어떤 함수의 인수로만 사용되는 함수

#### 클로저

반환값으로만 사용되는 함수

(Function을 return하면 stack 영역이 안 사라짐)

~~~html
<!DOCTYPE html>
<html>
<body>
  <script>
  function f1(f2, n) { 
    document.write('콜백함수를 '+n+'번 호출함!' + '<br>');  
    for ( i=0; i<n; i++)  f2(); ;
  }

  var f3 = function () { 
       document.write('Welcome to HTML5! <br>');  
  }

  f1(f3, 5);

  document.write('<hr>'); 
  f1( function() { 
     document.write('Welcome to Javascript! <br>');
  }, 5);
</script>
  
</body>
</html> 
~~~



~~~js
var points = new Array(40, 100);  // Creates an array with two elements (40 and 100)
var points = new Array(40);  // Creates an array with 40 undefined elements !!!!!
~~~

Array 객체는 2개 이상의 값이 들어갈 때는 2개의 elements로 인식되지만 하나의 값이 들어갈 때는 배열의 크기로 인식됨. 따라서 var array = []; 로 사용하는 것을 권장



### 객체

컴퓨터 시스템에서 하나의 처리 대상으로 파악되는 모든 개념이나 실체



#### 객체의 생성과 사용

- 시스템 생성 객체(내장 객체)
  - https://www.w3schools.com/jsref/jsref_obj_array.asp
  - https://www.w3schools.com/jsref/jsref_obj_string.asp
  - https://www.w3schools.com/jsref/jsref_obj_date.asp
- 사용자 생성 객체



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
    var v1=new Object(); // [object Object]
    document.write(window.v1);
</script>
</body>
</html>

~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
    var person1=new Object();
    document.write(person1 + "<br>");
    
    var person2=new Object();
    document.write(person2 + "<br>");
    
    document.write(person1==person2 + "<br>"); // false
    document.write(person1===person2 + "<br>"); // false
</script>
</body>
</html>

~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
    var person1=new Object();
    person1.name="안시우";
    document.write(person1.name + "<br>");
    
    var person2=new Object();
    person2.name="안시우";
    //person2.name="햄릿슈";
    document.write(person2.name + "<br>");
    
    document.write((person1==person2) + "<br>"); // false
    document.write((person1.name===person2.name) + "<br>"); // true
    // String literal pool에서 엔진으로 찾아서 쓰기 때문에 동일하게 인식됨.
</script>
</body>
</html>
~~~



#### 자바스크립트 객체 생성법

1. 객체리터럴 이용

~~~js
 var p1={ name:”전은수” }
~~~



2. Object 생성자 이용

~~~js
  var p2=new Object(); p2.name=“전은수”;
~~~



3. 사용자 지정 생성자 이용

~~~js
function Person(name){
     this.name=name;
}

var p3=new Person(“전은수”);

var Person=function(name){
     this.name=name;
}

var p4=new Person(“전은수”);
~~~



~~~js
function Person(){    	
    }    
    Person.prototype.eyes=2;
    Person.prototype.nose=1;
    var p1=new Person();
    var p2=new Person();
    document.write(p1.eyes+":"+p1.nose);
    document.write(p2.eyes+":"+p2.nose);  
    p1.eyes=1;    
    document.write(p2.eyes+":"+p2.nose); 
    document.write(Person.prototype.eyes); 
    document.write(p1.eyes===Person.prototype.eyes);//false

~~~

prototype을 바꾸면 전체가 바뀌지만 본인 것을 바꾸면 prototype은 바뀌지 않는다.

자바의 super와 비슷

#### super

- 자신을 가리키는 키워드가 this 라면, 부모들 가리키는 키워드는 super
- super() 는 부모의 생성자를 의미한다.
- 부모의 생성자를 임의로 호출하지 않으면, 부모 class의 기본 생성자가 자동으로 호출된다.



~~~js
var p1= {
      eyes: 3,
      nose: 4
    }
document.write(p1.hasOwnProperty(‘eyes')); // true

~~~



#### 변수 호이스팅

~~~js
console.log(num); //undefined
var num=100; 
console.log(num); //100

🡺
var num;
console.log(num);
num=100;
console.log(num);
~~~



#### Function 호이스팅

~~~js
fn(); //error
var fn = function () { alert("test!"); } 

fn2(); //ok
function fn2() { alert("test!"); }

~~~

호이스팅은 쓰지 않는 것이 좋고 변수를 순서대로 선언하면서 코딩하는 것이 좋다.



### 자바스크립트 응용

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript">
	function Donuts(name, count, price){
		this.name = name;
		this.count = count;
		this.price = price;
	}
	
	var donuts = [];
	donuts[0]= new Donuts("바바리안", 1, 3000);
	donuts[1]= new Donuts("플레인", 10, 30000);
	donuts[2]= new Donuts("염주", 5, 15000);
	donuts[3]= new Donuts("흰가루", 8, 16000);
	donuts[4]= new Donuts("초코", 3, 6000);
	donuts[5]= new Donuts("블루베리", 5, 15000);
	donuts[6]= new Donuts("딸기", 8, 15000);
	donuts[7]= new Donuts("생크림", 1, 2500);
	donuts[8]= new Donuts("바다의향 물씬", 2, 4500);
	donuts[9]= new Donuts("고향의맛", 3, 6000);
	

	for(let i=0; i<donuts.length; i++){
		document.write("도넛 이름 : " + donuts[i].name + 
				"<br>도넛 갯수 :" + donuts[i].count + 
				"<br>도넛 가격 :"+ donuts[i].price + "<br><br>");
	}
</script>

</head>
<body>

</body>
</html>
~~~


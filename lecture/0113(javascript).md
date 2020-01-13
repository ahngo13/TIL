# 1/13

### 자료형

#### String형

문자열은 내부적으로 시작 인덱스가 0인 문자 배열로 저장

#### number형

~~~html
<!DOCTYPE html>
<html>
<body>
<h3>number형</h3>
<script>
	var x=314e-2, y=12345e10;
    var num1=9999999999999, num2=9999999999999999;
    
    document.write("x="+x+"<br>");
    document.write("y="+y+"<br>");
    document.write("num1="+(num1)+"<br>");
    document.write("num2="+(num2)+"<br>");
    document.write("54/0="+(54/0)+"<br>");
    document.write("-54/0="+(-54/0)+"<br>");
    document.write("88/'pi'="+(54/'pi')+"<br>");
</script>
</body>
</html>
~~~

#### boolean형

참 또는 거짓의 논리값

#### undefined형

~~~html
<!DOCTYPE html>
<html>
<body>
<h3>undefined형</h3>
<script>
	var obj=new Object();
    var num;
    
    document.write(obj+'<br>');
    document.write(num+'<br>');
    obj=null;
    document.write(obj+'<br>');
    obj=undefined;
    document.write(obj+'<br>');
    document.write((undefined==null)+'<br>');
    document.write((undefined===null)+'<br>');
</script>
</body>
</html>

~~~

#### typeof 연산자

자료형 확인



| DataType   | Privitive data type(기본형)                                  | reference data type(참조형)                                  |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Java       | 정수 : byte(1byte), short(2byte), **int(4byte, 기본형)**, long(8byte)<br />실수 : float(소수점 7째 자리까지), **double(소수점 15째 자리, 기본형)**<br />단일문자 : char(2) <br /> 논리 : boolean(1) | object(user define data tye)<br />class Test{<br />    int age=28;<br />    float weight=50.5;<br />    char gender='여';<br />    boolean isPretty=true;<br />} |
| Javascript | 숫자 : number(8byte)<br />10진수, 16진수, 지수<br />NaN, Infinity, -Infinity<br />단일문자 : string<br />논리 : boolean<br />undefined | complex data types<br />- object<br />- function             |



http://tcpschool.com/c/c_memory_structure



~~~java
class MyProfile{
    int age = 28;
    double weight = 50.5;
    char gender = '여';
    boolean isPretty = true;
    MyBirthDay birthday = new MyBirthDay(); 
    //생성자 non-static인 것을 메모리에 올려주세요.
}

class MyBirthDay{
    int year = 1990;
    int month = 10;
    int day = 3;
}
~~~



~~~java

public class Test {

	static int age=28;
	static double weight=50.5;
	static char gender='여';
	static boolean isPretty=true;

	public static void main(String[] args) {
		System.out.println(age);
		System.out.println(weight);
		System.out.println(gender);
		System.out.println(isPretty);
	}

}
~~~

Java static과 Javascript Window(Global) 비슷한 개념



#### 형변환 메서드

~~~html
<!DOCTYPE html>
<html>
<body>
<h3>Type Conversion</h3>
<script>
	var num1=3.145, num2=20, num3=100;
    var str1="58", str2="3.678", str3="javascript";
    var flag1=true, flag2=false;

    
    document.write(str1+num2+'<br>');
    document.write(Number(str1)+num2+'<br>');
    document.write(parseInt(str1)+num2+'<br>');
    document.write(parseInt(str2)+num2+'<br>');
    document.write(parseInt(str3)+num2+'<br>');
    document.write(parseFloat(str2)+num2+'<br>');
    document.write(parseInt(num1)+num2+'<br><hr>');
    
    document.write(num2+num3+'<br>');
    document.write(num2+num3.toString()+'<br>');
    document.write(Boolean(num2)+num3.toString()+'<br>');
    document.write(str3+Number(flag1)+'<br>');
    document.write(str3+Number(flag2)+'<br>');
   
</script>
</body>
</html>

~~~



#### 이벤트 속성

~~~html
<!DOCTYPE html>
<html>
<body onload="alert('안녕하세요?');">
	<h1 onmouseover="alert('안녕하세요?');">안녕하세요~</h1>
    <input type="text" onchange="alert('안녕하세요?');">
    <input type="text" onkeypress="alert('안녕하세요?');">
</body>
</html>

~~~



~~~html
<!DOCTYPE html>
<html>
<head>
  <script>
  	var str1="꽝! 다음을 기약하세요!";
    var str2="당첨! 축하합니다!";
  </script>
  <style>
  	div{width:50px; height:50px; border-radius:50px; display:inline-block;}
    img{width:50px; height:80px; float:left;}
    #b1{background:red;} #b2{background:green;}
    #b3{background:blue;} #b4{background:orange;}
    #b5{background:skyblue;}
  </style>
</head>
<body>
	<h4>1.MouseOver/MouseLeave 이벤트 처리</h4>
	<img alt="" src="image/lightoff.png" onmouseover="this.src='image/lighton.png;'" onmouseleave="this.src='image/lightoff.png'"><br><br>
	마우스가 전구 위에 있으면 켜지고, 벗어나면 꺼집니다. <hr>
	<h4>2.MouseClck 이벤트 처리</h4>
	경품추첨! 원하는 공을 클릭하세요. <br><br>
	<div id="b1" onclick="document.write(str1);"></div>
	<div id="b2" onclick="document.write(str1);"></div>
	<div id="b3" onclick="document.write(str1);"></div>
	<div id="b4" onclick="document.write(str2);"></div>
	<div id="b5" onclick="document.write(str1);"></div>
	
	<h1 onmouseover="alert('안녕하세요?');">안녕하세요~</h1>
   
</body>
</html>

~~~



### 제어문

#### 선택문

~~~html
<!DOCTYPE html>
<html>
<head>
  <script>
  function score(){
	  var score = prompt('점수는?');
	  if(score>=80){
		  document.write("합격입니다.");
		  document.write("추가 과제는 없습니다.<br>");
	  }else{
		  document.write("불합격입니다.");
		  document.write("추가 과제가 있습니다.<br>");
	  }
	  document.write("수업을 종료합니다.");
  }
  
  </script>
</head>
<body>
	<input type="button" onclick="javascript:score();" value="합격 확인">
</body>
</html>

~~~



~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script>
		var score;
		var grade;
		
		document.write("<h3>학점 판정</h3>");
		score=prompt(" 성적을 입력하세요~");
		switch(parseInt(score/10)){
			case 10,9: grade="A"; break;
			case 8: grade="B"; break;
			case 7: grade="C"; break;
			case 6: grade="D"; break;
			default: grade="F";
		}
		document.write("<hr>학점판정 결과:");
		document.write("score("+ grade +")");		
	</script>
</head>
<body>
	
</body>
</html>
~~~



~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script>
		var month;
		var day;
		
		document.write("<h3>월별 일수 확인</h3>");
		month=Number(prompt("월을 입력하세요~"));
		switch(month){
            case 1: case 3: case 5: case 6: case 7: case 8: case 10: case 12:
				day="31";break;
			case 2:day="28"; break;
			case 4: case 6: case 9: case 11:day="30"; break;
			default: day="잘못 입력된 값";
		}
		document.write("<hr>월별 일수 확인 결과:");
		document.write(month+"월의 일수는("+ day +")입니다.");		
	</script>
</head>
<body>
	
</body>
</html>
~~~



~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script>
		var sum=0; 
        //let을 사용하면 지역 변수로 변경되게 됨, 데이터 측면에서 let을 쓰는게 좋음
		for(let i=1;sum<=100;i++){
			sum=sum+i;
		}
		document.write(sum+"<br>");
		/* document.write(i+"<br>"); */
		document.write(window.i+"<br>");
		document.write(window.sum+"<br>");
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

<h2>Declaring a Variable Using let</h2>

<p id="demo"></p>

<script>
var  x = 10;
// Here x is 10
{  
  let x = 2;
  // Here x is 2
}
// Here x is 10
document.getElementById("demo").innerHTML = x;
</script>

</body>
</html>
~~~

`let`은 변수에 재할당이 가능하지만, `const`는 변수 재선언, 재할당 모두 불가능하다.



#### break, continue문

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script>
	sum=0;
	for(i=0;i<100000;i=i+1){
		sum=sum+i;
		if(sum>100000)break;
	}
	
	document.write("1부터 N까지의 합이 처음으로 100,000을 넘을 때 <br>");
	document.write("N은 "+i+"이고, 합은"+sum+"입니다.<hr>");
</script>
</head>
<body>
	
</body>
</html>
~~~



~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script>
	sum=0; count=0;
	for(i=0;i<=100;i=i+1){
		if(i%7==0){
			count++;
			continue;
		}
		sum=sum+i;
	}
	
	document.write("1~100사이의 7의 배수 개수 :"+ count +" <br>");
	document.write("1~100사이의 7의 배수 를 제외한 합 :"+ sum+" <br>");
</script>
</head>
<body>
	
</body>
</html>
~~~




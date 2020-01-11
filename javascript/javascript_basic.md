# 자바 스크립트

### \+ 연산자

~~~html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
	<h3> + 연산자</h3>
<script>
	var num1=15, num2=4;
	var str1= "Javascript", str2="Programming";
	
	document.write(str1+str2+'<br>'); //JavascriptProgramming
	document.write(str1+num1+'<br>'); //Javascript15
	document.write(123+num2+'<br>'); //127
	document.write("123"+num2+'<br>'); //1234
	
</script>
</body>
</html>
~~~



### 문장의 표현

치환식 명령문은 '변수 = 식'

함수식 명령문은 '함수식(인수)'



### 자바스크립트 블록문

~~~js
	var x,y,temp;
	x=30, y=70, temp="***";
	if(x>y){temp=x; x=y; y=temp;} 
	//블록을 전부 묶었으므로 묶어서 처리됨.
	document.write("x="+x+",y="+y+"<br>"); //x=30, y=70

	x=30, y=70, temp="***";
	if(x>y)temp=x; x=y; y=temp; 
	//if문에 포함되는 것은 temp=x만이므로 x=y와 y=temp만 처리됨.
	document.write("x="+x+",y="+y+"<br>"); //x=70, y=***
	
	x=30, y=70, temp="***";
	if(x>y){temp=x;} x=y; y=temp; 
	//if문에 포함되는 것은 괄호에 묶인 temp=x만이므로 x=y와 y=temp만 처리됨.
	document.write("x="+x+",y="+y+"<br>"); //x=70, y=***
~~~



### 자료형

#### String 자료형

~~~js
	var str1="web programming";
	var str2="공과대학 '컴퓨터공학' 전공";
	var str3='HTML5 "웹"프로그래밍';
	
	document.write("str1의 크기 :");
	document.write("str1.length"); //15
	document.write("<br>");
	document.write("str1의 네번째 문자(str1[4]):"+str1[4]); 
	//p 말은 4번째라고 했지만 실질적으로는 5번째 문자임. 공백 포함
	document.write("<br>");
	document.write(str2 + "<br>");//공과대학 '컴퓨터공학' 전공
	document.write(str3 + "<br>");//HTML5 "웹"프로그래밍
~~~



#### number형

~~~html
<html>
    <head></head>
    <body>
        <h3>number 형</h3>
        <script>
            var x= 314e-2, y=123245e10;
            var num1=999999999999, num2=99999999999999999;

            document.write("x="+x+"<br>"); //지수 표현 3.14
            document.write("y="+y+"<br>"); //지수 표현 1232450000000000
            document.write("num1="+num1+"<br>"); //999999999999
            document.write("num2="+num2+"<br>"); //99999999999999999
            document.write("54/0="+(54/0)+"<br>"); //Infinity
            document.write("-54/0="+(-54/0)+"<br>"); //-Infinity
            document.write("88/'pi'"+(88/'pi')); // NaN
        </script>
    </body>
</html>
~~~



#### boolean형

정수 0과 -0, 공백문자, undefind, null 객체는 모두 false, 그 외에는 모두 true

~~~html
<html>
    <head></head>
    <body>
        <h3>boolean 형</h3>
        <script>
            var state, num1=0,num2=88;
            var str1="";str2="Javascript";
            var obj1=null;
            var obj2= new Object();
            
            document.write(Boolean(num1)+"<br>"); //false
            document.write(Boolean(num2)+"<br>"); //값이 있으면 ture
            document.write(Boolean(str1)+"<br>"); //false
            document.write(Boolean(str2)+"<br>"); //값이 있으면 true
            document.write(Boolean(obj1)+"<br>"); //false
            document.write(Boolean(obj2)+"<br>"); //객체가 있으면 ture 
            document.write(Boolean(state)+"<br>"); //false
        </script>
    </body>
</html>
~~~



#### undefined형

undefined와 null은 둘다 비어있다는 것을 나타내지만 자료형은 undefined와 object로 서로 다름

~~~html
<html>
    <head></head>
    <body>
        <h3>undefined</h3>
        <script>
            var obj=new Object();
            var num;

            document.write(obj+"<br>");//[object Object]
            document.write(num+"<br>");//undefined
            obj=null;
            document.write(obj+'<br>');//null
            obj=undefined;
            document.write(obj+'<br>');//undefined
            document.write((undefined==null)+'<br>');//true
            document.write((undefined===null));//false 자료형까지 비교하면 다름.
        </script>
    </body>
</html>
~~~



#### typeof 연산자

~~~html
<html>
    <head></head>
    <body>
        <h3>typeof</h3>
        <script>
            document.write(typeof("John")+"<br>"); //string
            document.write(typeof(3.14)+'<br>'); //number
            document.write(typeof(NaN)+'<br>'); //number
            document.write(typeof(false)+'<br>'); //boolean
            document.write(typeof([1,2,3,4])+'<br>'); //object
            document.write(typeof(function(){})+'<br>'); //function
            document.write(typeof(myCar)+'<br>'); //undefined
            document.write(typeof(null)+'<br>'); //object
        </script>
    </body>
</html>
~~~



#### 자동형변환

수식에서 피연산자들의 자료형이 서로 다르면 일정한 교칙을 가지고 피연산자들에 대해 자동으로 형변환을 수행해서 연산을 수행함

ex) 7+null = 7, "7"+null=7null 



#### 형변환 메서드

String(1234) → "1234"

Number("1234") → 1234

parseInt("1234") → 1234

(1234).toString() → "123"



### 이벤트 속성

- 특정 태그 영역 클릭 onclick
- 특정 태그 영역 위로 이동 mouseover
- 사용자의 입력값 변경 onchange
- 이미지 파일이나 HTML문서가 웹브라우저의 로드를 마침 load
- 브라우저 창의 크기 변경 resize

- 이외에도 onkeypress, onkeydown, onunload, onfocus등이 있음



~~~html
<html>
    <head></head>
    <body>
        <h3>event</h3>
        <input type="button" onclick="javascript:alert('클릭 되었습니다.')" value="클릭">
        <input type="button" ondblclick="javascript:alert('더블 클릭 되었습니다.')" value="더블 클릭">
    </body>
</html>
~~~



### 입력 함수

- alert() : 확인 버튼 클릭시 종료
- confirm() : 확인 또는 취소 버튼 클릭시 종료
- prompt() : 사용자가 문자열 입력하면 그것을 문자열로 반환(수치값 입력시에도 문자열로 반환)



### 제어문

- 선택문 

  - if : 단일 선택
  - if~else : 양자택일
  - if~else if : 다중 택일
  - switch : 다중 택일
    - if문과 다르게 값들을 이용해서 선택 구조를 나타냄
    - break를 만나면 실행 종료하고 다음 문장으로 이동
    - 나열된 값들과 다를 경우 defalut 위치에 있는 문장부터 실행
    - 실수형 이외 모든 수식 사용가능

- 반복문 

  - while : 반복 조건을 제어
  - do~while :  반복 조건을 제어(적어도 한번은 실행)
  - for : 반복 루프의 반복 횟수를 제어 
  - for-in : 배열이나 객체 변수에 대해 사용

  ~~~html
  <html>
      <head></head>
      <body>
          <h3>event</h3>
          <script>
              sum=0;
              for(i=1;sum<=10000;i=i+1){
                  sum=sum+i;
              }
              //for문 내부에 있는 i값이 외부에도 사용가능, while문도 동일
              document.write("1부터 합이 만이 넘을 때<br>");
              document.write("i는" + (i-1) +"이고, 합은" + sum);
          </script>
      </body>
  </html>
  ~~~

  

- 기타
  - continue : 반복문에서 사용 (예정된 다음 반복루프의 실행은 계속함)
  - break : if, switch에서 사용 (반복문 자체를 중단)



### 배열

- 변수를 모아놓은 집합



#### 배열 정의 방법

- var a = Array()로 빈 배열 정의
- var b = []; 빈 배열 정의
- var c = [1,2,3,4,5]; 크기 5인 배열 정의



#### 배열 사용 방법

var month = [1,2,3,4,5,6,7,8,9,10,11,12];

month[0]; //1

month.length //12



#### 배열의 특성

- 배열 크기를 미리 정하지 않아도 됨
- 동적으로 배열크기 확장이 가능



#### 2차원 배열

- var a = [[1,2,3],[4,5,6],[7,8,9]];

- var b = new Array(Array(1,2,3),Array(4,5,6),Array(7,8,9));



#### 배열 원소의 문자열 인덱스

- 문자열 인덱스를 사용했을 때는 배열크기가 0이며 for문 출력이 불가능하다.
- for~in으로 출력 가능

~~~html
<html>
    <head></head>
    <body>
        <h3>arrayIndex</h3>
        <script>
            var num= new Array();
            num['zero']=0;
            num['one']=1;
            num['two']=2;

            document.write(num['zero']+"<br>");
            document.write(num['one']+"<br>");
            document.write(num['two']+"<br>");
            document.write(num.length+"<br>");

            for(i=0; i<num.length;i++){
                document.write(num[i]);
            }
        </script>
    </body>
</html>
~~~



~~~html
<html>
    <head></head>
    <body>
        <h3>arrayIndex2</h3>
        <form name="form1">
            아이디 : <input type="text" name="id">
            <button onclick="showId();">클릭</button>
        </form>
        <script>
            function showId(){
                alert(form1['id'].value);
            }
        </script>
    </body>
</html>
~~~


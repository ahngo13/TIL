# 1/20

~~~html
<tag 이름 속성이름="값">content</tag>
~~~

1. $('?').html() : 태그 이름
2. $('?').attr() : 속성
3. $('?').text() : content
4. $('?').val() : value



## node.js

- node.js는 크롬 V8 자바스크립트 엔진
- Node.js 패키지 생태계 npm은 세계에서 가장 큰 오픈소스 라이브러리 생태계



~~~html
<!DOCTYPE html>
<html>
<body>

<script>
	function run(){
    	console.log('3초 후 실행');
    }
    console.log('시작'); //동기식 메서드
    setTimeout(run,3000); //비동기식 메서드
    console.log('끝'); //동기식 메서드
</script>
</body>
</html> 

~~~

~~~
시작
끝
3초 후 실행
~~~



#### 논블로킹 I/O

- 오래 걸리는 함수를 백그라운드로 보내서 다음 코드가 먼저 실행되게 하고, 그 함수가 다시 태스크 큐를 거쳐 호출 스택으로 올라오기를 기다리는 방식
- 주문한 순서와 서빙하는 순서가 일치하지 않을 수 있음

- setTimeout(콜백, 0)은 논블로킹으로 만들기 위해 사용하는 기법 중 하나이지만 node에서는 이것을 쓰지 않음
- node.js는 싱글스레드의 논블로킹 모델



#### node.js, npm version 확인

~~~
C:\Users\student>node -v
v12.14.1

C:\Users\student>npm -v
6.13.4
~~~



### 알아두어야 할 자바스크립트

#### const, let

~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	const a=0;
    a=1; //VM697:3 Uncaught TypeError: Assignment to constant variable.
</script>
</body>
</html> 

~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	let a=0;
    a=1;
    const c; //VM716:4 Uncaught SyntaxError: Missing initializer in const declaration
</script>
</body>
</html> 

~~~



#### 템플릿 문자열

~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	var num1=1;
    var num2=2;
    var result=3;
    var string1 =num1 + ' 더하기 ' + num2 + '는 \'' + result + '\'';
    console.log(string1); // 1 더하기 2는 '3'
</script>
</body>
</html> 

~~~

##### 백틱 (`), EL(Express Language) ${변수명} 사용 가능 

~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	const num3=1;
    const num4=2;
    const result2=3;
    const string2 =`${num3} 더하기 ${num4}는 '${result2}'`;
    console.log(string2); // 1 더하기 2는 '3'
</script>
</body>
</html> 

~~~



#### 객체 리터럴

~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	var sayNode = function(){
    	console.log('Node');
    }
    sayNode();
    
    var es='ES';
    var oldObject={
    	sayJS:function(){
        	console.log('JS');
        },
        sayNode: sayNode,
    };
    
    oldObject[es+6]='Fantastic';
    oldObject.sayNode(); // Node
    oldObject.sayJS(); //JS
    console.log(oldObject.ES6); //Fantastic (ES6 대문자로 인식)
</script>
</body>
</html> 

~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	const sayNode = function(){
    	console.log('Node');
    }
    sayNode();
    
    const es='ES';
    const newObject={
    	sayJS:function(){
        	console.log('JS');
        },
        sayNode: sayNode,
        [es+6]:'Fantastic' //ES6 대문자로 인식
    };
    
    newObject.sayNode(); // Node
    newObject.sayJS(); //JS
    console.log(newObject.ES6); //Fantastic
</script>
</body>
</html> 

~~~



#### 화살표 함수

~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	function add1(x,y){
    	return x+y;
    }
    
    const add2 =(x,y) => {
    	return x+y;
    };
    
    const add3 = (x,y) => x+y;
    const add4 = (x,y) => (x+y);
    
    function not1(x){
    	return !x;
    }
    
    const not2 = x => !x;

</script>
</body>
</html> 

~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	var relationship1={
    	name:'zero',
        friends: ['nero', 'hero', 'xero'],
        logFriends: function(){
        	var that=this;
            this.friends.forEach(function(friend){
            	console.log(that.name, friend);
            }); //end forEach
        },//end function()
    };//end object
    
    relationship1.logFriends();
</script>
</body>
</html> 
~~~

~~~
zero nero
zero hero
zero xero
~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	const relationship2={
    	name:'zero',
        friends:['nero','hero','xero'],
        logFriends(){
        	this.friends.forEach(friend => {
            	console.log(this.name, friend);
            });
        },
    };
    relationship2.logFriends();
</script>
</body>
</html> 

~~~

~~~
zero nero
zero hero
zero xero
~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	var relationship1={
    	name:'zero',
        friends: ['nero', 'hero', 'xero'],
        logFriends: function(){
        	//var that=this;
            this.friends.forEach(function(friend){
            	console.log(this.name, friend);
            }); //end forEach
        },//end function()
    };//end object
    
    relationship1.logFriends();
</script>
</body>
</html> 
~~~

~~~
iframeResult nero
iframeResult hero
iframeResult xero
~~~



#### 비구조화 할당

같은 이름의 변수에 대입하는 코드



#### 프로미스

콜백 헬(callback hell) : 콜백 지옥은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제

~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	function a(){
    	console.log('hello');	
    }
    function b(){
    	console.log('world');	
    }
	console.log('시작');
    setTimeout(a,2000);
    setTimeout(b,1000);
    console.log('끝');
</script>
</body>
</html> 
~~~

~~~
시작
끝
world
hello
~~~

~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	console.log('시작');
    setTimeout(function (){
    	console.log('hello');	
    },2000);
    setTimeout(function (){
    	console.log('world');	
    },1000);
    console.log('끝');
</script>
</body>
</html> 
~~~

~~~
시작
끝
world
hello
~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	console.log('시작');
    setTimeout(function (){
    	console.log('hello');
          setTimeout(function (){
          console.log('world');	
          console.log('끝');
      },1000);
    },2000);
</script>
</body>
</html> 
~~~

~~~
시작
hello
world
끝
~~~



~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	function a(){
    	return new Promise((resolve,reject)=>{
    		setTimeout(()=>{
            	resolve("hello");
            },2000);    
        });
    }
	function b(){
    	return new Promise((resolve,reject)=>{
    		setTimeout(()=>{
            	resolve("world");
            },1000);    
        });
    }
	console.log('시작');
    a()//a를 호출
    .then((result)=>{ //Promise1가 이행 되었을 때
    	console.log(result);//hello
        return b();//Promise2가 이행 되었을 때
    })
    .then((result)=>{
    	console.log(result);//world
        console.log('끝');
    })
    .catch((error)=>{//a,b 중 에러가 발생했을 경우
    	console.log(error);
    });
</script>
</body>
</html> 
~~~



#### async/await

- 프로미스 문법을 깔끔하게 줄여줌

- 정말 순차적인 일을 할 때만 필요

~~~html
<!DOCTYPE html>
<html>
<body>
<script>
	function a(){
    	return new Promise((resolve,reject)=>{
    		setTimeout(()=>{
            	resolve("hello");
            },2000);    
        });
    }
	function b(){
    	return new Promise((resolve,reject)=>{
    		setTimeout(()=>{
            	resolve("world");
            },1000);    
        });
    }
    
    async function c(){
      console.log('시작');
      const data1 = await a();
      console.log(data1);
      
      const data2=await b();
      console.log(data2);
      console.log('끝');
    }
    
    c();
</script>
</body>
</html> 
~~~



## 노드기능 알아보기

### JS 파일 실행하기

- ctrl + ` 로 터미널 실행
- node + js 파일명

~~~js
console.log('시작');
setTimeout(function(){
    console.log('hello');
},2000);
setTimeout(function(){
    console.log('world');
},1000);
console.log('끝');
~~~



~~~js
console.log('시작');
setTimeout(function(){
    console.log('hello');
    setTimeout(function(){
        console.log('world');
        console.log('끝');
    },1000);
},2000);
~~~



### 콜백 헬

~~~js
console.log('시작');
setTimeout(function(){
    console.log('hello');
    setTimeout(function(){
        console.log('world');
        setTimeout(function(){
            console.log('Callback Hell');
            setTimeout(function(){
                console.log('Callback Hell');
                setTimeout(function(){
                    console.log('Callback Hell');
                    setTimeout(function(){
                        console.log('Callback Hell');
                        setTimeout(function(){
                            console.log('Callback Hell');
                            setTimeout(function(){
                                console.log('Callback Hell');
                                setTimeout(function(){
                                    console.log('Callback Hell');
                                    setTimeout(function(){
                                        console.log('Callback Hell');
                                        setTimeout(function(){
                                            console.log('Callback Hell');
                                        },1000);
                                    },1000);
                                },1000);
                            },1000);
                        },1000);
                    },1000);
                },1000);
            },1000);
        },1000);
    },1000);
},2000);
~~~




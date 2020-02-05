# React

- JSX 문법을 사용

- 태그를 만들어서 쓸 수 있는 기술
- 완전히 갖춘 프레임워크가 아님
- 비주얼 요소와 그 상태를 최신으로 유지



### html과 JQuery로 버튼 클릭할 때마다 숫자 올라가게 구현

index.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <title>Document</title>
    <script>
      $(document).ready(function() {
        $("button").click(function() {
          let num = $("h1").text();
          $("h1").text(++num);
        });
      });
    </script>
    <style>
      div {
        background-color: yellow;
        width: 150px;
        text-align: center;
        padding-bottom: 15px;
        border-radius: 15px;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>0</h1>
      <br /><button>+</button>
    </div>
  </body>
</html>
~~~



### 동일한 기능 React 적용

index_react.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <title>Document</title>
    <script>
      /*       $(document).ready(function() {
        $("button").click(function() {
          let num = $("h1").text();
          $("h1").text(++num);
        });
      }); */
    </script>
    <style>
      div {
        background-color: yellow;
        width: 150px;
        text-align: center;
        padding-bottom: 15px;
        border-radius: 15px;
      }
    </style>
  </head>
  <body>
    <script type="text/babel" src="./a.jsx"></script>
  </body>
</html>

~~~

a.jsx

~~~js
//리액트 컴포넌트
class Counter extends React.Component {
    render() {
    return <h1>{this.props.count}</h1>;
    }
  }

  class CounterParent extends React.Component {
    state={message:0}; //javascript 객체
    a=()=>{
      this.setState({
        message:this.state.message +1
      });
    };
    render() {
      return (
        //CounterParent 안에 Counter를 넣음
        <div>
          <Counter count={this.state.message} /> 
          {/*state에 선언한 message를 불러와서 count라는 속성에 넣어줌 */}
          <button onClick={this.a}> + </button>
          {/* jsx에서는 대문자가 중간에 들어감 {}로 값을 넣음 */}
        </div>
      );
    }
  }

  //호출(만들어놓은 컴포넌트를 부르는 곳)
  ReactDOM.render(
    //태그, 위치
    <CounterParent />,
    document.body //body 태그 안에 해당 컴포넌트를 넣겠다
  );
~~~



### 리액트 컴포넌트

- 리액트 프로그램의 단위



~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <title>Document</title>
    <style>
      #container {
        padding: 50px;
        background-color: #eee;
      }
      #container h1 {
        font-size: 70px;
        font-family: sans-serif;
        color: #0080a8;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script type="text/babel">
      function formatDistance(distance) {
        return distance + "km";
      }

      function getDistance(speed, time) {
        const result = speed * time;
        alert(formatDistance(result));
      }

      /*       const speed = 10;
      const time = 5;
      alert(speed * time); */
      //   getDistance(10, 5);
      /*       const speed1 = 85;
      const time1 = 1.5;
      alert(speed1 * time1); */
      //   getDistance(85, 1.5);
      /*       const speed2 = 12;
      const time2 = 9;
      alert(speed2 * time2); */
      //   getDistance(12, 9);
      /*       const speed3 = 42;
      const time3 = 21;
      alert(speed3 * time3); */
      // getDistance(42, 21);

      class HelloWorld extends React.Component {}

      const destination = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <h1>
            <i> 안녕? 블록체인</i>
          </h1>
          <h1>
            <i>안녕? node JS</i>
          </h1>
          <h1>
            <i>안녕? React</i>
          </h1>
          <h1>
            <i>안녕? 나쁜기술</i>
          </h1>
        </div>,
        destination
      );
    </script>
  </body>
</html>

~~~





### ECMA script 6 class

~~~html
<!DOCTYPE html>
<html>
<body>

<p id="demo"></p>

<script>

//신버전
class Car {
  constructor(brand, id) {
    this.carname = brand;
    this.carid=id;
  }
}

//구버전
/*function Car(brand,id){
	this.carname = brand;
    this.carid = id;
}*/

mycar = new Car("멀세리", "레간지");

document.getElementById("demo").innerHTML = mycar.carname + ',' + mycar.carid;

</script>

</body>
</html>

~~~



### 리액트 컴포넌트 적용

~~~js
 class HelloWorld extends React.Component {
        //상속을 받았기 때문에 리액트 컴포넌트로 인식함. 상속이 없으면 자바스크립트 클래스
        render() {
          //오버라이딩 overrriding 재정의, 리액트 컴포넌트의 내용을 내가 바꾸겠습니다.
          return <p>안녕, 욱마왕</p>;
        }
      }

      const destination = document.querySelector("#container");
      ReactDOM.render(<HelloWorld />, destination); 
	  //리액트 컴포넌트 적용 HelloWorld
~~~



### 한개의 태그만 사용할 수 있기 때문에 div로 묶어줘야 함

~~~ js
      const destination = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
        </div>,
        destination
      );
~~~



### 컴포넌트의 property 사용

~~~js
class HelloWorld extends React.Component {
        //상속을 받았기 때문에 리액트 컴포넌트로 인식함. 상속이 없으면 자바스크립트 클래스
        render() {
          //오버라이딩 overrriding 재정의, 리액트 컴포넌트의 내용을 내가 바꾸겠습니다.
          return (
            <p>
              <i>안녕? {this.props.name}</i>
            </p>
          );
        }
      }

      const destination = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <HelloWorld name="햄릿슈" />
          <HelloWorld name="욱마왕" />
          <HelloWorld name="갓창유" />
          <HelloWorld name="초록피" />
          <HelloWorld name="파란피" />
          <HelloWorld name="빨간피" />
        </div>,
        destination
      );
~~~



### Javascript, JQuery, React 비교

#### 메시지 출력 버튼 클릭시 메시지 띄우기

![123](https://user-images.githubusercontent.com/13622474/73821620-ad881800-4837-11ea-95f8-821f3f78e210.JPG)

##### Javascript

1. 버튼과 메시지를 출력할 곳의 영역을 그려준다.

~~~html
<button>메시지 출력</button>
<div></div>
~~~

2. 버튼에는 onclick 이벤트를 주고 메시지를 출력할 곳은 id값을 부여한다.

~~~html
 <button onclick="showMsg()">메시지 출력</button>
 <div id="msg"></div>
~~~

3. onclick 이벤트 function 생성

~~~js
function showMsg() {
	document.getElementById("msg").innerHTML = "안녕! 햄릿슈!";
}
~~~

전체 소스

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script>
      function showMsg() {
        document.getElementById("msg").innerHTML = "안녕! 햄릿슈!";
      }
    </script>
  </head>
  <body>
    <button onclick="showMsg()">메시지 출력</button>
    <div id="msg"></div>
  </body>
</html>
~~~



##### JQuery

1. 버튼과 메시지를 출력할 곳의 영역을 그려준다.

~~~html
<button>메시지 출력</button>
<div></div>
~~~

2. 버튼에는 onclick 이벤트를 주고 메시지를 출력할 곳은 id값을 부여한다.

~~~html
 <button id="msg_btn">메시지 출력</button>
 <div id="msg"></div>
~~~

3. JQuery document 객체를 사용해서 클릭 이벤트를 생성한다.

~~~js
 $(document).ready(function() {
     $("#msg_btn").click(function() {
         $("#msg").text("안녕! 햄릿슈!");
     });
 });
~~~

전체 소스

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <title>Document</title>
    <script>
      $(document).ready(function() {
        $("#msg_btn").click(function() {
          $("#msg").text("안녕! 햄릿슈!");
        });
      });
    </script>
  </head>
  <body>
    <button id="msg_btn">메시지 출력</button>
    <div id="msg"></div>
  </body>
</html>
~~~



##### React

1. 버튼과 메시지를 넣을 영역을 그린다.

~~~html
<div id="container"></div>
~~~

2. 리액트를 사용하기 위해 CDN을 삽입한다.

~~~html
 <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
~~~

3. 각각의 리액트 컴포넌트를 생성한다.

~~~react
class Show extends React.Component {
        render() {
          return <div></div>;
        }
      }

class MsgButton extends React.Component {
    render() {
        return (
            <div>
                <button>메시지 출력</button>
                <Show/>
            </div>
        );
    }
}
const destination = document.querySelector("#container");
      ReactDOM.render(<MsgButton />, destination);
~~~

4. 버튼 클래스에 onClick 이벤트를 주고 이벤트를 this.setState를 통해 만든다. state에 변수를 만들어서 기본값은 빈값으로 넣어주고 클릭을 했을 때 "안녕! 햄릿슈!"를 나타내도록 한다.

~~~react
class MsgButton extends React.Component {
    state = { message: "" };
	showMsg = () => {
    	this.setState({
        message: "안녕! 햄릿슈!"
        });
    };
    render() {
        return (
            <div>
                <button onClick={this.showMsg}>메시지 출력</button>
                <Show msg={this.state.message} />
            </div>
        );
    }
}
~~~

5. 프로퍼티에 있는 값을 가져와서 출력할 값을 세팅해준다.

~~~react
class Show extends React.Component {
    	render() {
    	return <div>{this.props.msg}</div>;
    }
}
~~~

전체 소스

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <title>Document</title>
  </head>
  <body>
    <div id="container"></div>

    <script type="text/babel">
      class Show extends React.Component {
        render() {
          return <div>{this.props.msg}</div>;
        }
      }

      class MsgButton extends React.Component {
        state = { message: "" };
        showMsg = () => {
          this.setState({
            message: "안녕! 햄릿슈!"
          });
        };
        render() {
          return (
            <div>
              <button onClick={this.showMsg}>메시지 출력</button>
              <Show msg={this.state.message} />
            </div>
          );
        }
      }

      const destination = document.querySelector("#container");
      ReactDOM.render(<MsgButton />, destination);
    </script>
  </body>
</html>
~~~


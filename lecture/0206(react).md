### 리액트 컴포넌트 안에 자식넣기

~~~react
<A>
	<b></b>
</A>
~~~

#### 간단하게 here라는 글자 띄우기

~~~react
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
      const container = document.querySelector("#container");
      ReactDOM.render(<div>here</div>, container);
    </script>
  </body>
</html>
~~~

#### Buttonify 클래스 생성

~~~react
      class Buttonify extends React.Component {
        render() {
          return (
            <div>
              <button></button>
            </div>
          );
        }
      }
      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Buttonify />
        </div>,
        container
      );

~~~

#### 속성과 child 사용

~~~react
      class Buttonify extends React.Component {
        render() {
          return (
            <div>
              <button type={this.props.behavior}>{this.props.children}</button>
            </div>
          );
        }
      }
      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Buttonify behavior="submit">SEND DATA</Buttonify>
        </div>,
        container
      );

~~~

### 리액트 스타일링

~~~react
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
      class Letter extends React.Component {
        render() {
          return <div>{this.props.children}</div>;
        }
      }
      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Letter>A</Letter>
          <Letter>E</Letter>
          <Letter>I</Letter>
          <Letter>O</Letter>
          <Letter>U</Letter>
        </div>,
        container
      );
    </script>
  </body>
</html>

~~~

#### head 태그안에 CSS 추가

~~~css
      div div div {
        padding: 10px;
        margin: 10px;
        background-color: #ffde00;
        color: #333;
        display: inline-block;
        font-family: monospace;
        font-size: 32px;
        text-align: center;
      }
~~~

#### className으로 CSS 적용

~~~react
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
      .letter {//클래스 이름 설정
        padding: 10px;
        margin: 10px;
        background-color: #ffde00;
        color: #333;
        display: inline-block;
        font-family: monospace;
        font-size: 32px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script type="text/babel">
      class Letter extends React.Component {
        render() {
          return <div className="letter">{this.props.children}</div>;
        }//리액트에서는 class를 className이라는 속성으로 사용함
      }
      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Letter>A</Letter>
          <Letter>E</Letter>
          <Letter>I</Letter>
          <Letter>O</Letter>
          <Letter>U</Letter>
        </div>,
        container
      );
    </script>
  </body>
</html>

~~~

#### 스타일 객체 만들기

~~~react
class Letter extends React.Component {
        render() {
          const letterStyle = {
            padding: 10,
            margin: 10,
            backgroundColor: "#FFDE00",
            color: "#333",
            display: "inline-block",
            fontFamily: "monospace",
            fontSize: 32,
            textAlign: "center"
          };
          return <div style={letterStyle}>{this.props.children}</div>;
        }
      }
      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Letter>A</Letter>
          <Letter>E</Letter>
          <Letter>I</Letter>
          <Letter>O</Letter>
          <Letter>U</Letter>
        </div>,
        container
      );
~~~



#### 속성을 이용해 배경색 변경하기

~~~react
class Letter extends React.Component {
        render() {
          const letterStyle = {
            padding: 10,
            margin: 10,
            backgroundColor: this.props.a, //여기에서는 {} 안함, 이 구역은 자바스크립트이기 때문
            color: "#333",
            display: "inline-block",
            fontFamily: "monospace",
            fontSize: 32,
            textAlign: "center"
          };
          return <div style={letterStyle}>{this.props.children}</div>;
        }
      }
      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Letter a="red">A</Letter>
          <Letter a="yellow">E</Letter>
          <Letter a="green">I</Letter>
          <Letter a="blue">O</Letter>
          <Letter a="gray">U</Letter>
        </div>,
        container
      );
~~~

### 복잡한 컴포넌트 제작

#### 각각의 색을 지정

~~~react
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
      class Square extends React.Component {
        render() {
          const squareStyle = {
            height: 150,
            backgroundColor: "#FF6663"
          };
          return <div style={squareStyle}></div>;
        }
      }
      class Label extends React.Component {
        render() {
          const labelStyle = {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 13,
            margin: 0
          };
          return <p style={labelStyle}>#FF6663</p>;
        }
      }
      class Card extends React.Component {
        render() {
          const cardStyle = {
            height: 200,
            width: 150,
            padding: 0,
            backgroundColor: "#FFF",
            boxShadow: "0px 0px 5px #666"
          };
          return (
            <div style={cardStyle}>
              <Square />
              <Label />
            </div>
          );
        }
      }

      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Card />
        </div>,
        container
      );
    </script>
  </body>
</html>

~~~

#### 속성을 전달하기 위해서는 여러 계층을 거쳐가면서 계속 전달필요

ex1)

~~~react
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
      class Square extends React.Component {
        render() {
          const squareStyle = {
            height: 150,
            backgroundColor: this.props.color
          };
          return <div style={squareStyle}></div>;
        }
      }
      class Label extends React.Component {
        render() {
          const labelStyle = {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 13,
            margin: 0
          };
          return <p style={labelStyle}>{this.props.color}</p>;
        }
      }
      class Card extends React.Component {
        render() {
          const cardStyle = {
            height: 200,
            width: 150,
            padding: 0,
            backgroundColor: "#FFF",
            boxShadow: "0px 0px 5px #666"
          };
          return (
            <div style={cardStyle}>
              <Square color={this.props.color} />
              <Label color={this.props.color} />
            </div>
          );
        }
      }

      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Card color="red" />
          <Card color="yellow" />
        </div>,
        container
      );
    </script>
  </body>
</html>

~~~

ex2)

~~~react
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
      class Display extends React.Component {
        render() {
          return (
            <div>
              <p>{this.props.color}</p>
              <p>{this.props.num}</p>
              <p>{this.props.size}</p>
            </div>
          );
        }
      }
      class Label extends React.Component {
        render() {
          return (
            <div>
              <Display
                color={this.props.color}
                num={this.props.num}
                size={this.props.size}
              />
            </div>
          );
        }
      }
      class Shirt extends React.Component {
        render() {
          return (
            <div>
              <Label
                color={this.props.color}
                num={this.props.num}
                size={this.props.size}
              />
            </div>
          );
        }
      }

      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Shirt color="steelblue" num="3.14" size="medium" />
        </div>,
        container
      );
    </script>
  </body>
</html>
~~~

#### 문제점 해결을 위해 스프레드 연산자를 사용

~~~react
      class Display extends React.Component {
        render() {
          return (
            <div>
              <p>{this.props.color}</p>
              <p>{this.props.num}</p>
              <p>{this.props.size}</p>
            </div>
          );
        }
      }
      class Label extends React.Component {
        render() {
          return (
            <div>
              <Display {...this.props} /> //스프레드 연산자
            </div>
          );
        }
      }
      class Shirt extends React.Component {
        render() {
          return (
            <div>
              <Label {...this.props} /> //스프레드 연산자
            </div>
          );
        }
      }

      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Shirt color="steelblue" num="3.14" size="medium" />
        </div>,
        container
      );
~~~

#### 스프레드 연산자

~~~html
<!DOCTYPE html>
<html>
<body>

<script>
	const items = ["1","2","3"];
    function printStuff(a,b,c){
    	console.log("Printing: " + a + " " + b + " " + c);
    }
    printStuff(items[0],items[1],items[2]);
    printStuff(...items); // 스프레드 연산자
</script>

</body>
</html> 
~~~

#### 표현식 사용(자바스크립트 구문)

~~~react
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
      class Stuff extends React.Component {
        render() {
          return <h1>Boring {Math.random() * 100} content!</h1>; 
            //표현식 사용 {}로 묶어야 됨
        }
      }
      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Stuff />
        </div>,
        container
      );
    </script>
  </body>
</html>

~~~

#### 복수의 엘리먼트 리턴 방법

~~~react
      class Stuff extends React.Component {
        render() {
          return (
            <React.Fragment>
              <h1 key="1">Boring {Math.random() * 100} content!</h1>
              <h1 key="2">Boring {Math.random() * 100} content!</h1>
            </React.Fragment>
          );
        }
      }
      const container = document.querySelector("#container");
      ReactDOM.render(
        <div>
          <Stuff />
        </div>,
        container
      );
~~~

#### 인라인 CSS 사용 불가

style 속성 안에 직접 CSS를 포함할 수 없고 자바스크립트 객체형태로 포함해야 함.



#### 주석

~~~react
{/* 주석 */}
/*여러 줄 주석*/
~~~



#### 컴포넌트를 나타낼 때는 이름에 대문자 사용  필요\



#### JSX는 어디서나 사용가능

~~~react
class Stuff extends React.Component {
        render() {
          return (
            <div>
              <h1 key="1">Boring {Math.random() * 100} content!</h1>
              <h1 key="2">Boring {Math.random() * 100} content!</h1>
            </div>
          );
        }
      }
      const a = <Stuff />; //JSX는 밖에서도 사용이 가능함
      const container = document.querySelector("#container");
      ReactDOM.render(<div>{a}</div>, container);
~~~

~~~react
class Stuff extends React.Component {
        render() {
          return (
            <div>
              <h1 key="1">Boring {Math.random() * 100} content!</h1>
              <h1 key="2">Boring {Math.random() * 100} content!</h1>
            </div>
          );
        }
      }
      function b() {
        const a = <Stuff />;
        return a;
      }
      const container = document.querySelector("#container");
      ReactDOM.render(<div>{b()}</div>, container); // function return 값 사용
~~~

~~~react
      class Stuff extends React.Component {
        render() {
          return (
            <div>
              <h1 key="1">Boring {Math.random() * 100} content!</h1>
            </div>
          );
        }
      }
      function b() {
        let a = (
          <div>
            <Stuff />
            <Stuff />
          </div>
        );//하나의 태그로 묶어줘야 함

        return a;
      }
      const container = document.querySelector("#container");
      ReactDOM.render(<div>{b()}</div>, container);
~~~

#### javascript와 jsx 혼용

~~~react
class Stuff extends React.Component {
        render() {
          return (
            <div>
              <h1 key="1">Boring {Math.random() * 100} content!</h1>
            </div>
          );
        }
      }
      function b() {
        const a = propkey => (
          <div key={propkey}>
            <Stuff />
          </div>
        );

        let arr = [];

        for (let i = 0; i < 100; ++i) {
          arr.push(a(i));
        }

        return arr;
      }
      const container = document.querySelector("#container");
      ReactDOM.render(<div>{b()}</div>, container);
~~~

### 상태 다루기

~~~react
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
      class LightningCounter extends React.Component {
        constructor(props) {
          super(props);
          console.log("constructor 호출됨");
          this.state = {
            //state로 하지 않으면 상태변수로 인식하지 않음
            strikes: 0
          };
          // this.timerTick = this.timerTick.bind(this);
        }
        //클래스 안에 있지만 독립적임. bind를 해주었음.
        /* timerTick() {
          this.setState({
            strikes: this.state.strikes + 1000
          });
        } */
        timerTick = () => {
          //화살표 함수로 바꾸면 bind하지 않아도 독립적으로 수행가능.
          this.setState({
            strikes: this.state.strikes + 1000
          });
        };
        componentDidMount() {
          //화면이 모두 구성된 이후에 실행
          console.log("componentDidMount 호출됨");
          setInterval(this.timerTick, 1000); //1초마다 timerTick 콜백 메서드를 실행
        }
        render() {
          //반복적으로 호출되고 있는 곳
          console.log("render 호출됨");
          return <h1>리액트 못 따라갈 가능성{this.state.strikes}</h1>;
        }
      }
      class LightningCounterDisplay extends React.Component {
        render() {
          const divStyle = {
            width: 250,
            textAlign: "center",
            backgroundColor: "black",
            padding: 40,
            fontFamily: "sans-serif",
            color: "#999",
            borderRadius: 10
          };
          return (
            <div style={divStyle}>
              <LightningCounter />
            </div>
          );
        }
      }

      ReactDOM.render(
        <div>
          <LightningCounterDisplay />
        </div>,
        document.querySelector("#container")
      );
    </script>
  </body>
</html>

~~~

### 

~~~react
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="container"></div>
    <script type="text/babel">
      class MyCounter extends React.Component {
        state = {
          counter: 0
        };

        timerTick = () => {
          console.log("timerTick 호출됨");
          this.setState({
            counter: (this.state.counter += 100)
          });
        };
        componentDidMount() {
          console.log("componentDidMount 호출됨");
          setInterval(this.timerTick, 100); //timerTick()로 하면 지금 수행하라는 의미
        }
        render() {
          console.log("render 호출됨");
          return (
            <h1>
              리액트 배우는 내 눈물 방울 수<br />
              {this.state.counter}
            </h1>
          );
        }
      }
      ReactDOM.render(
          <MyCounter />,
           document.querySelector("#container")
           );
    </script>
  </body>
</html>

~~~

#### 상태 변경시 원칙

~~~react
state={message:0}; //1.상태 변경에 사용할 변수는 state
    a=()=>{ //2.화살표 함수로
      this.setState({ //3.setState로 상태변경 처리
        message:this.state.message +1
      });
    };
~~~


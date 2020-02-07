

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
      class Game extends React.Component {
        aaa;

        state = {
          ball_top: Math.random() * 500,
          ball_left: Math.random() * 500,
          h3BGC: "yellow"
        };

        moveBall = () => {
          this.setState({
            ball_top: Math.random() * 500,
            ball_left: Math.random() * 500
          });
        };

        catchMe = () => {
          this.setState({ h3BGC: "red" });
          clearInterval(this.aaa);
        };

        componentDidMount() {
          this.aaa = setInterval(this.moveBall, 1000);
        }

        render() {
          const divStyle = {
            width: 600,
            height: 600,
            backgroundColor: "gray"
          };
          const h3Style = {
            backgroundColor: this.state.h3BGC,
            borderRadius: 30,
            width: 100,
            height: 100,
            position: "fixed",
            top: this.state.ball_top,
            left: this.state.ball_left
          };
          return (
            <div style={divStyle}>
              <h3 style={h3Style} onClick={this.catchMe}>
                catch me
              </h3>
            </div>
          );
        }
      }
      ReactDOM.render(<Game />, document.querySelector("#container"));
    </script>
  </body>
</html>

~~~



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
      class MyBall extends React.Component {
        aaa;
        state = {
          ball_top: Math.random() * 500,
          ball_left: Math.random() * 500,
          ball_bgColor: "yellow"
        };

        changeBallPosition = () => {
          this.setState({
            ball_top: Math.random() * 500,
            ball_left: Math.random() * 500
          });
        };

        componentDidMount() {
          this.aaa = setInterval(this.changeBallPosition, this.props.speed);
        }

        catchMe = () => {
          this.setState({
            ball_bgColor: "red"
          });
          clearInterval(this.aaa);
        };
        render() {
          const h3Style = {
            backgroundColor: this.state.ball_bgColor,
            width: 100,
            height: 100,
            borderRadius: 50,
            textAlign: "center",
            position: "fixed",
            top: this.state.ball_top,
            left: this.state.ball_left
          };

          return (
            <h3 style={h3Style} onClick={this.catchMe}>
              나를 잡아봐~
            </h3>
          );
        }
      }
      class MyGamePanel extends React.Component {
        render() {
          const divStyle = {
            backgroundColor: "gray",
            width: 600,
            height: 600
          };

          return (
            <div style={divStyle}>
              <MyBall speed="1000" />
              <MyBall speed="100" />
            </div>
          );
        }
      }

      ReactDOM.render(
        <MyGamePanel></MyGamePanel>,
        document.querySelector("#container")
      );
    </script>
  </body>
</html>

~~~



### JSX 응용

#### 배경색 속성 값을 태그 속성으로 넘겨주어 원 그리기

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
      class Circle extends React.Component {
        render() {
          const circleStyle = {
            paddding: 10,
            margin: 20,
            display: "inline-block",
            backgroundColor: this.props.bgColor,
            borderRadius: "50%",
            width: 100,
            height: 100
          };
          return <div style={circleStyle}></div>;
        }
      }
      ReactDOM.render(
        <div>
          <Circle bgColor="#F9C240" />
        </div>,
        document.querySelector("#container")
      );
    </script>
  </body>
</html>

~~~

#### 자바스크립트 변수를 추가하여 

~~~react
const theCircle = <Circle bgColor="#F9C240" />;
      ReactDOM.render(
        <div>{theCircle}</div>,
        document.querySelector("#container")
      );
~~~



~~~react
      function showCircle() {
        const colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363"];
        const ran = Math.floor(Math.random() * colors.length); //floor는 0<=x<4
        return <Circle bgColor={colors[ran]} />;
      }

      //   const theCircle = <Circle bgColor="#F9C240" />;
      ReactDOM.render(
        <div>{showCircle()}</div>,
        document.querySelector("#container")
      );
~~~



~~~react
      ReactDOM.render(
        <div>
          {showCircle()}
          {showCircle()}
          {showCircle()}
        </div>,
        document.querySelector("#container")
      );
~~~

#### 

~~~react
const renderData = [];
      function showCircle() {
        const colors = [
          "#393E41",
          "#E94F37",
          "#1C89BF",
          "#A1D363",
          "#85FFC7",
          "#297373",
          "#FF8552",
          "#A40E4C"
        ];
        // const ran = Math.floor(Math.random() * colors.length); //floor는 0<=x<4
        for (let i = 0; i < colors.length; i++) {
          const color = colors[i];
          //key값은 개발자 도구에서도 확인 불가능하기 때문에 console에 찍어봄
          //리액트 엔진에서만 사용
          console.log(i + color);
          //빠르게 UI를 갱신할 수 있도록 key값을 세팅
          renderData.push(<Circle key={i + color} bgColor={colors[i]} />);
        }
        // return renderData;
      }
      showCircle();

      //   const theCircle = <Circle bgColor="#F9C240" />;
      ReactDOM.render(
        <div>{renderData}</div>,
        document.querySelector("#container")
      );
~~~

#### 이벤트 파라미터를 활용한 shift 키 + 마우스 왼쪽 클릭시 10씩 증가시키기

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
      class Square extends React.Component {
        state = {
          count: 0
        };

        increaseCount = e => {
          let currentCount = this.state.count;
          if (e.shiftKey) {
            currentCount += 10;
          } else {
            currentCount += 1;
          }
          this.setState({
            count: currentCount
          });
        };

        render() {
          const divStyle = {
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "yellow",
            textAlign: "center"
          };
          return (
            <div style={divStyle}>
              <h1>{this.state.count}</h1>
              <button onClick={this.increaseCount}>+</button>
            </div>
          );
        }
      }
      ReactDOM.render(<Square />, document.querySelector("#container"));
    </script>
  </body>
</html>

~~~

#### 커스텀 태그는 이벤트를 직접 리스닝 할 수 없다

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
      class PlusButton extends React.Component {
        render() {
          return <button>+</button>;
        }
      }

      class Square extends React.Component {
        state = {
          count: 0
        };

        increaseCount = e => {
          let currentCount = this.state.count;
          if (e.shiftKey) {
            currentCount += 10;
          } else {
            currentCount += 1;
          }
          this.setState({
            count: currentCount
          });
        };

        render() {
          const divStyle = {
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "yellow",
            textAlign: "center"
          };
          /*커스텀 태그는 이벤트를 직접 리스닝 할 수 없다*/
          return (
            <div style={divStyle}>
              <h1>{this.state.count}</h1>
              <PlusButton onClick={this.increaseCount} />
            </div>
          );
        }
      }
      ReactDOM.render(<Square />, document.querySelector("#container"));
    </script>
  </body>
</html>

~~~

#### 속성 값으로 이벤트를 넘겨서 사용할 수 있다

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
      class PlusButton extends React.Component {
        render() {
          return <button onClick={this.props.a}>+</button>; //속성으로 전달
        }
      }

      class Square extends React.Component {
        state = {
          count: 0
        };

        increaseCount = e => {
          let currentCount = this.state.count;
          if (e.shiftKey) {
            currentCount += 10;
          } else {
            currentCount += 1;
          }
          this.setState({
            count: currentCount
          });
        };

        render() {
          const divStyle = {
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "yellow",
            textAlign: "center"
          };
          /*커스텀 태그에는 이벤트를 직접 리스닝 할 수 없다*/
          //a라는 속성으로 넘겨줌
          return (
            <div style={divStyle}>
              <h1>{this.state.count}</h1>
              <PlusButton a={this.increaseCount} />
            </div>
          );
        }
      }
      ReactDOM.render(<Square />, document.querySelector("#container"));
    </script>
  </body>
</html>

~~~

### 컴포넌트의 생명주기

~~~react
class Square extends React.Component {
        constructor(props) {
          super(props);
          console.log("생성자 호출됨");
        }
        state = {
          count: 0
        };

        increaseCount = e => {
          console.log("increaseCount 호출됨");
          let currentCount = this.state.count;
          if (e.shiftKey) {
            currentCount += 10;
          } else {
            currentCount += 1;
          }
          this.setState({
            count: currentCount
          });
        };

        componentWillUpdate(newProps, newState) {
          console.log("componentWillUpdate 호출됨");
        }

        componentDidUpdate(currentProps, currentState) {
          console.log("componentDidUpdate 호출됨");
        }

        componentWillMount() {
          console.log("componentWillMount 호출됨");
        }

        componentDidMount() {
          console.log("componentDidMount 호출됨");
        }

        componentWillUnmount() {
          console.log("componentWillUnmount 호출됨");
        }

        shouldComponentUpdate(newProps, newState) {
          console.log("shouldComponentUpdate 호출됨");
          if (newState.count < 5) {
            console.log("shouldComponentUpdate : 업데이트 할 것임");
            return true;
          } else {
            console.log("shouldComponentUpdate : 업데이트 안 할 것임");
            return false;
          }
        }

        componentWillReceiveProps(newProps) {
          console.log("componentWillReceiveProps 호출됨");
        }

        render() {
          console.log("render 호출됨");
          const divStyle = {
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "yellow",
            textAlign: "center"
          };
          /*커스텀 태그에는 이벤트를 직접 리스닝 할 수 없다*/
          //a라는 속성으로 넘겨줌
          return (
            <div style={divStyle}>
              <h1>{this.state.count}</h1>
              <PlusButton a={this.increaseCount} />
            </div>
          );
        }
      }
      ReactDOM.render(<Square />, document.querySelector("#container"));
~~~



### DOM 엘리먼트 접근

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
      class Colorizer extends React.Component {
        state = {
          bgColor: "yellow"
        };

        setNewColor = e => {
          this.setState({
            bgColor: this.input_color.value
          });
          this.input_color.focus();
          this.input_color.value = "";
          e.preventDefault();
        };

        render() {
          const colorStyle = {
            width: 200,
            height: 300,
            backgroundColor: this.state.bgColor
          };
          return (
            <div>
              <div style={colorStyle}>color</div>
              <form onSubmit={this.setNewColor}>
                {/*태그에 이름을 지으려고 함, id와 같은 역할*/}
                <input ref={ref => (this.input_color = ref)} />
                <button type="submit">go</button>
              </form>
            </div>
          );
        }
      }
      ReactDOM.render(<Colorizer />, document.querySelector("#container"));
    </script>
  </body>
</html>

~~~



#### Array.filter

~~~html
<!DOCTYPE html>
<html>
<body>

<h2>JavaScript Array.filter()</h2>

<p>Creates a new array with all array elements that passes a test.</p>

<p id="demo"></p>

<script>
var numbers = [45, 4, 9, 16, 25];
var over18 = numbers.filter(myFunction);

document.getElementById("demo").innerHTML = over18;

function myFunction(value, index, array) {
  return value > 18;
}
</script>

</body>
</html>
~~~



### 게임 만들기

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
      class MyBall extends React.Component {
        aaa;

        state = {
          ball_top: Math.random() * 500,

          ball_left: Math.random() * 500,

          ball_bgColor: "yellow"
        };

        catchMe = () => {
          this.setState({
            ball_bgColor: "red"
          });

          clearInterval(this.aaa);

          this.props.a(this.props.ballNo);
        };

        componentDidMount() {
          this.aaa = setInterval(this.changeBallPosition, 1000);
        }

        changeBallPosition = () => {
          this.setState({
            ball_top: Math.random() * 500,

            ball_left: Math.random() * 500
          });
        };

        render() {
          const ballStyle = {
            width: 80,

            position: "fixed",

            top: this.state.ball_top,

            left: this.state.ball_left
          };

          return (
            <img onClick={this.catchMe} src="peng.gif" style={ballStyle} />
          );
        }
      }

      class MyGamePanel extends React.Component {
        state = {
          balls: [],

          score: 0
        };

        increaseScore = ballNo => {
          console.log(ballNo);

          const new_balls = this.state.balls.filter(ball => {
            console.log(ball.key);

            return ball.key != ballNo;
          });

          console.log(new_balls);

          this.setState({
            score: this.state.score + 1,

            balls: new_balls
          });
        };

        createBalls = () => {
          const before_balls = this.state.balls;

          const no = this.no.value;

          for (let i = 0; i < no; i++) {
            let ballNo = Math.random();

            before_balls.push(
              <MyBall key={ballNo} ballNo={ballNo} a={this.increaseScore} />
            );
          }

          this.setState({
            balls: before_balls
          });
        };

        test = e => {
          alert(
            e.clientX + ":" + e.clientY + ":" + e.screenX + ":" + e.screenY
          );
        };

        render() {
          const divStyle = {
            backgroundColor: "gray",

            width: 600,

            height: 600
          };

          return (
            <div>
              <input type="number" min="1" ref={ref => (this.no = ref)} />
              <button onClick={this.createBalls}>start</button>
              점수 : {this.state.score}
              <div onClick={this.test} style={divStyle}>
                {this.state.balls}
              </div>
            </div>
          );
        }
      }

      ReactDOM.render(
        <MyGamePanel />,

        document.querySelector("#container")
      );
    </script>
  </body>
</html>

~~~


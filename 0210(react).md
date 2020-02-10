#### 포털 사용하기

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
    <h1 id="here"></h1>
    <div id="container"></div>
    <script type="text/babel">
      class ColorLabel extends React.Component {
        render() {
          return ReactDOM.createPortal(
            this.props.color,
            document.querySelector("#here")
          );
        }
      }

      class Colorizer extends React.Component {
        state = {
          bgColor: "yellow",
          color: ""
        };

        setColor = e => {
          //e.key === "Enter"와 동일
          if (e.keyCode == 13) {
            this.setState({
              bgColor: this.colorName.value
            });
            this.colorName.value = "";
            this.colorName.focus();
          }
        };
        render() {
          const colorPanel = {
            width: 200,
            height: 300,
            backgroundColor: this.state.bgColor
          };

          //멤버 변수이기 때문에 this 안해도 됨
          return (
            <div>
              <div style={colorPanel}></div>
              <input
                ref={ref => (this.colorName = ref)}
                onKeyDown={this.setColor}
              />
              <button onClick={this.setColor}>go</button>
              <ColorLabel color={this.state.bgColor} />
            </div>
          );
        }
      }
      ReactDOM.render(<Colorizer />, document.querySelector("#container"));
    </script>
  </body>
</html>

~~~



### 리액트 개발환경 구성

- 너무 많은 라이브러리가 의존되어 있으므로 서버 개발에 그대로 사용하는 것은 좋지 않음

~~~
npm i -g create-react-app
~~~

- 커맨트 창에서 설치가 안될 경우

~~~
yarn global add create-react-app
// yarn으로 인스톨 해도 안될 경우
npm install -g create-react-app
~~~



#### SRC에 있는 파일들을 모두 삭제하고 해당 파일들을 추가

index.js

~~~react
import React from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./HelloWorld";

ReactDOM.render(<HelloWorld />, document.querySelector("#root"));

~~~

HelloWorld.js

~~~react
import React, { Component } from "react";

class HellowWorld extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}

export default HellowWorld;

~~~

index.css

~~~css
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

~~~

index.js에 추가로 import 필요

~~~js
import "./index.css";
~~~



### 외부 데이터 사용

- 예제 사이트

https://www.kirupa.com/react/examples/ipaddress.htm



- 플러그인에서 project manager 설치

HelloWorld.js

~~~react
import React, { Component } from "react";
import "./css/HelloWorld.css";

let xhr;

class HellowWorld extends Component {
  state = {
    ip_address: "..."
  };
  componentDidMount() {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080", true);
    xhr.send();
    xhr.addEventListener("readystatechange", this.processRequest, false);
  }

  processRequest = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      this.setState({
        ip_address: response.ip
      });
    } else {
      console.log(xhr);
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.ip_address}</h1>
      </div>
    );
  }
}

export default HellowWorld;

~~~

server.js

~~~js
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

//app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ip: "111.222.333.444" });
});

app.listen(8080, () => {
  console.log("8080 server ready");
});

~~~



client에서 jquery 사용

~~~
npm i jquery
~~~



~~~js
  componentDidMount() {
    $.get("http://localhost:8080", returnData => {
      this.setState({
        ip_address: returnData.ip
      });
    });
    /*  xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080", true);
    xhr.send();
    xhr.addEventListener("readystatechange", this.processRequest, false); */
  }
~~~



### Todo List 앱 제작

cmd 창에서

~~~
create-react-app todolist
~~~

src 안의 파일 모두 삭제, public 파비콘 제외 모두 삭제

index.jsx

~~~jsx
import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import TodoList from "./TodoList";

ReactDOM.render(<TodoList />, document.querySelector("#container"));

~~~

TodoList.jsx

~~~jsx
import React,{Component} from 'react';
import TodoItems from './TodoItems';
import './css/TodoList.css';

class TodoList extends Component{
    state={
        items:[]
    }
    addItem=()=>{
        
        //push는 뒤에 번지에 넣는 것, unshift는 앞에 번지에 넣는 것
        this.state.items.unshift({
            text : this._inputElement.value,
            key:Date.now()
        });

        this.setState({
            items:this.state.items
        });

        this._inputElement.value = '';
        this._inputElement.focus();

        console.log(this.state.items);
    }
    render(){
        return(
            <div className="todoListMain">
                <div className="header">
                    <input ref={ref=>this._inputElement = ref} placeholder="enter task"></input>
                    <button onClick={this.addItem}>add</button>
                </div>
                <TodoItems entries={this.state.items}/>
            </div>
        )
    }
}

export default TodoList;
~~~



https://www.w3schools.com/js/js_array_iteration.asp

~~~html
<!DOCTYPE html>
<html>
<body>

<h2>JavaScript Array.map()</h2>

<p>Creates a new array by performing a function on each array element.</p>

<p id="demo"></p>

<script>
var numbers1 = [45, 4, 9, 16, 25];
var numbers2 = numbers1.map(myFunction);

document.getElementById("demo").innerHTML = numbers2;

function myFunction(value, index, array) {
  return value * 2;// 모든 값에 2를 곱한 것을 리턴함
}
</script>

</body>
</html>

~~~

TodoItems.jsx

~~~jsx
import React, {Component} from 'react';
import './css/TodoList.css';

class TodoItems extends Component{
    render(){
        const myList=this.props.entries.map((item)=>{
            return <li key={item.key}>{item.text}</li>
        });
        return(
        <ul className="theList">
            {myList}
        </ul>);
    }
}

export default TodoItems
~~~

TodoList.css

~~~css
.todoListMain .header input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #fff;
  width: 165px;
}
.todoListMain .header button {
  padding: 10px;
  font-size: 16px;
  margin: 10px;
  margin-right: 0px;
  background-color: #0066ff;
  color: #fff;
  border: 2px solid #0066ff;
}
.todolistMain .header button:hover {
  background-color: #003399;
  border: 2px solid #003399;
  cursor: pointer;
}
.todoListMain .theList {
  list-style: none;
  padding-left: 0;
  width: 250px;
}
.todoListMain .theList li {
  color: #333;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

~~~

#### 아이템 삭제

TodoList.jsx

~~~react
import React,{Component} from 'react';
import TodoItems from './TodoItems';
import './css/TodoList.css';

class TodoList extends Component{
    state={
        items:[]
    }

    deleteItem=(key)=>{
        const filteredItems=this.state.items.filter((item)=>{
            //키 값이 일치하지 않는 것만 리턴
            return item.key !== key
        });
        this.setState({
            items: filteredItems
        });
    }
    addItem=()=>{
        
        //push는 뒤에 번지에 넣는 것, unshift는 앞에 번지에 넣는 것
        this.state.items.unshift({
            text : this._inputElement.value,
            key:Date.now()
        });

        this.setState({
            items:this.state.items
        });

        this._inputElement.value = '';
        this._inputElement.focus();

        console.log(this.state.items);
    }
    render(){
        return(
            <div className="todoListMain">
                <div className="header">
                    <input ref={ref=>this._inputElement = ref} placeholder="enter task"></input>
                    <button onClick={this.addItem}>add</button>
                </div>
                <TodoItems entries={this.state.items} superDelete={this.deleteItem}/>
            </div>
        )
    }
}

export default TodoList;
~~~



TodoItems.jsx

~~~jsx
import React, {Component} from 'react';
import './css/TodoList.css';

class TodoItems extends Component{
    //파라미터를 받기 위해서 하나 더 메서드를 만들어 줌
    subDelete=(key)=>{
        this.props.superDelete(key)
    }

    render(){
        const myList=this.props.entries.map((item)=>{
            return <li key={item.key} onClick={()=>this.subDelete(item.key)}>{item.text}</li>
        });
        return(
        <ul className="theList">
            {myList}
        </ul>);
    }
}

export default TodoItems
~~~


### redux

- 많은 클래스와 서브 컴포넌트를 사용할 경우 공유저장소인 store를 통한 state 활용가능
- 받은 인자의 변형 금지
- API 호출이나 라우팅 변경 등과 같은 추가 기능 구현 금지
- Date.now()나 Math.random()과 같은 비순수 함수의 호출



#### CDN 추가

~~~
<script src="https://unpkg.com/redux@latest/dist/redux.js"></script>
~~~



####  add 기능 추가

redux.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/redux@latest/dist/redux.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  </head>
  <body>
    <input />
    <button>add</button>
    <br />
    <div></div>
    <script>
      function reducer(state, action) {
        //2 리듀서 작성
        if (state === undefined) {
          state = [];
        }
        if (action.type === "add") {
          //   state.unshift(action.value);
          state.concat(action.value); //권장
        }
        return state;
      }
      const store = Redux.createStore(reducer); //1 스토어 생성
      const state = store.getState(); //3 state 얻기

      console.log(state);
      $(document).ready(function() {
        store.subscribe(function() {
          //4 store 구독
          $("div").text(state);
        });

        $("button").click(function() {
          const data = $("input").val();
          const action = {
            type: "add",
            value: data
          };
          store.dispatch(action); //5 store에 액션 전달
          console.log(state);
          $("input").val("");
        });
      });
    </script>
  </body>
</html>
~~~



#### delete 기능 추가

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/redux@latest/dist/redux.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  </head>
  <body>
    <button id="delete_btn">delete</button>
    <input />
    <button id="add_btn">add</button>
    <br />
    <div></div>
    <script>
      function reducer(state, action) {
        //2 리듀서 작성
        if (state === undefined) {
          state = [];
        }
        if (action.type === "add") {
          //   state.unshift(action.value);
          return state.concat(action.value); //권장
        } else if (action.type === "delete") {
          return state.filter(item => {
            return item !== action.value;
          });
        } else {
          return state;
        }
      }
      const store = Redux.createStore(reducer); //1 스토어 생성
      const state = store.getState(); //3 state 얻기

      console.log(state);
      $(document).ready(function() {
        store.subscribe(function() {
          //4 store 구독
          $("div").text(store.getState());
        });

        $("#delete_btn").click(function() {
          const data = $("input").val();
          const action = {
            type: "delete",
            value: data
          };
          store.dispatch(action); //5 store에 액션 전달
          console.log(state);
          $("input").val("");
        });

        $("#add_btn").click(function() {
          const data = $("input").val();
          const action = {
            type: "add",
            value: data
          };
          store.dispatch(action); //5 store에 액션 전달
          console.log(store.getState());
          $("input").val("");
        });
      });
    </script>
  </body>
</html>

~~~



favoriteColors.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/redux@latest/dist/redux.js"></script>
    <script>
      function addColor(value) {
        return {
          type: "ADD",
          color: value
        };
      }

      function removeColor(value) {
        return {
          type: "REMOVE",
          color: value
        };
      }

      function favoriteColors(state, action) {
        if (state === undefined) {
          state = [];
        }

        if (action.type === "ADD") {
          return state.concat(action.color);
        } else if (action.type === "REMOVE") {
          return state.filter(function(item) {
            return item !== action.color;
          });
        } else {
          return state;
        }
      }

      const store = Redux.createStore(favoriteColors);
      store.subscribe(render);
      function render() {
        console.log(store.getState());
      }
      store.dispatch(addColor("blue"));
      store.dispatch(addColor("yellow"));
      store.dispatch(addColor("green"));
      store.dispatch(addColor("red"));
      store.dispatch(addColor("gray"));
      store.dispatch(addColor("orange"));
      store.dispatch(removeColor("gray"));
      console.log(store.getState());
    </script>
  </head>
  <body></body>
</html>
~~~



### 리덕스를 활용한 카운터 만들기

~~~
create-react-app reduxcounter
~~~

~~~
npm i redux
npm i react-redux
~~~



index.html

~~~jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redux Counter</title>
  </head>
  <body>
    <div id="container"></div>
  </body>
</html>

~~~



index.jsx

~~~react
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import counter from "./reducer";
import App from "./App";
import "./index.css";

const store = createStore(counter);

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.querySelector("#container")
);

~~~



reducer.js

~~~js
function counter(state, action) {
  if (state === undefined) {
    state = { count: 0 };
    return state;
  }

  let count = state.count;
  switch (action.type) {
    case "increase":
      return { count: count + 1 };
    case "decrease":
      return { count: count - 1 };
    default:
      return state;
  }
}

export default counter;

~~~



Counter.jsx

~~~react
import React, {Component} from 'react';

class Counter extends Component{
    render(){
        return(
        <div className="container">
            <button className="buttons" onClick={this.props.decreaseCount}>-</button>
            <span>{this.props.countValue}</span>
            <button className="buttons" onClick={this.props.increaseCount}>+</button>
        </div>)
    }
}

export default Counter;
~~~



App.jsx

~~~jsx
import {connect} from 'react-redux';
import Counter from './Counter';

function mapStateToProps(state){
    return {
        countValue: state.count
    };
}

const increaseAction = {type: "increase"};
const decreaseAction = {type: "decrease"};

function mapDispatchToProps(dispatch){
    return{
        increaseCount: function(){
            return dispatch(increaseAction);
        },
        decreaseCount: function(){
            return dispatch(decreaseAction);
        }
    };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default connectedComponent;
~~~



index.css

~~~css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  background-color: #8e7c93;
}

.container {
  background-color: #fff;
  margin: 100px;
  padding: 10px;
  border-radius: 3px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.buttons {
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 3px;
  transition: all 0.15s ease-in;
}

.buttons:hover:nth-child(1) {
  background-color: #f45b69;
}
.buttons:hover:nth-child(3) {
  background-color: #c0dfa1;
}

~~~





~~~
PS C:\4_reactHamletshu\test3\slidingmenu> npm install axios
~~~



### 로그인, 로그아웃 쿠키 적용

~~~
PS C:\4_reactHamletshu\test3\slidingmenu> npm i jquery.cookie
~~~



Menu.jsx

~~~jsx
import {} from "jquery.cookie";
~~~

~~~jsx
logout=()=>{
        $.get('http://localhost:8080/member/logout',(returnData)=>{
            if(returnData.message){
                $.removeCookie("login_name");
                this.setState({
                    loginStyle:"inline-block",
                    logoutStyle:"none"
                })
            }
        });
    }
~~~

~~~jsx
$.post('http://localhost:8080/member/login',send_param, (returnData)=>{
            if(returnData.message){
                $.cookie("login_name",returnData.message);
                this.setState({
                    login_email:returnData.message,
                    loginStyle:"none",
                    logoutStyle:"inline-block"
                });
            }else{
                alert("login fail");
            }
            
            this.emailE.value='';
            this.pwE.value='';
            this.emailE.focus();
        });
~~~


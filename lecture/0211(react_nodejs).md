### TodoList (node.js 서버 연동)

index.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="container"></div>
  </body>
</html>

~~~



TodoList.jsx

~~~react
import React, {Component} from 'react';
import TodoItem from './TodoItem';
import "./css/TodoList.css";
import $ from 'jquery';

class TodoList extends Component{
    componentWillMount(){
        //render 전 서버 접속
        $.get('http://localhost:8080/',(returnData)=>{
            console.log(returnData.message);
        });
        
    }

    state={
        items:[]
    }

    deleteItem=(key)=>{
        const filteredItems = this.state.items.filter((item)=>{
            return key !== item.key;
        });

        this.setState({
            items : filteredItems
        });
    }

    addItem=()=>{
       this.state.items.unshift({
            text: this._inputE.value,
            key:Date.now()
        }); 


        this.setState({
            items: this.state.items
        });
        this._inputE.value='';
        this._inputE.focus();
    }
    render(){
        return(<div className="todoListMain">
                <div className="header">
                    <input ref={ref=>this._inputE=ref}></input>
                    <button onClick={this.addItem}>add</button>
                    <TodoItem items={this.state.items} superDelete={this.deleteItem}/>
                </div>
            </div>);
    }
}

export default TodoList;
~~~



TodoItem.jsx

~~~jsx
import React, {Component} from 'react';

class TodoItem extends Component{
    /* delete=(key)=>{
        this.props.superDelete(key);
    } */

    render(){
        const myItems = this.props.items.map((item)=>{
        return <li key={item.key} onClick={this.props.superDelete.bind(null,item.key)}>{item.text}</li>
        });
        return(
        <ul>{myItems}</ul>
        );
    }
}

export default TodoItem;
~~~



server.js

~~~js
const express = require("express");
const app = express();
const cors = require("cors");

//cors 허용
app.use(cors());

app.get("/", (req, res) => {
  console.log("요청 받음");
  res.json({ message: "ok" });
});

app.listen(8080, () => {
  console.log("8080 server listen");
});

~~~



### TodoList (데이터베이스 연동)

서버 작업환경에 mysql 모듈 설치

~~~
reactHamletshu\test3\todolist_server> npm i mysql
~~~



server.js

~~~js
const itemRouter = require("./routes/item");
const express = require("express");
const app = express();
const cors = require("cors");

//cors 허용
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/item", itemRouter);

app.get("/", (req, res) => {
  console.log("요청 받음");
  res.json({ message: "ok" });
});

app.listen(8080, () => {
  console.log("8080 server listen");
});

~~~



item.js

~~~js
const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "nodejs",
  port: "3307"
});

router.post("/delete", (req, res) => {
  const sql = `DELETE FROM todolist WHERE \`key\` = '${req.body.key}'`;
  console.log(sql);
  con.query(sql, function(err, result) {
    if (err) {
      res.json({ message: false });
    } else {
      res.json({ message: true });
    }
  });
});

router.post("/add", (req, res) => {
  const key = parseInt(req.body.key);
  console.log(key);
  const sql = `INSERT INTO todolist (\`key\`, text) VALUES (${key}, '${req.body.text}')`;
  console.log(sql);
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      console.log("1 record inserted");
      res.json({ message: true });
    }
  });
});

module.exports = router;

~~~



TodoList.jsx

~~~jsx
import React, {Component} from 'react';
import TodoItem from './TodoItem';
import "./css/TodoList.css";
import $ from 'jquery';

class TodoList extends Component{
    componentWillMount(){
        //render 전 서버 접속
        $.get('http://localhost:8080/',(returnData)=>{
            console.log(returnData.message);
        });
        
    }

    state={
        items:[]
    }

    deleteItem=(key)=>{
        const send_param = {
            key
        };

        $.post('http://localhost:8080/item/delete', send_param, (returnData)=>{
            if(returnData.message){
                const filteredItems = this.state.items.filter((item)=>{
                    return key !== item.key;
                });
                
                this.setState({
                    items : filteredItems
                });

            }else{
                alert('일정 삭제 오류');
            }
        });
        
    }

    addItem=()=>{
        /* this.state.items.unshift({
            text: this._inputE.value,
            key:Date.now()
        }); */

        const send_param = {
            text: this._inputE.value,
            key:Date.now()
        };

        $.post('http://localhost:8080/item/add', send_param, (returnData)=>{
            if(returnData.message){
                this.state.items.unshift(send_param);
                this.setState({
                    items: this.state.items
                });
            }else{
                alert('일정 추가 오류');
            }

            this._inputE.value='';
            this._inputE.focus();
        });

    }
    render(){
        return(<div className="todoListMain">
                <div className="header">
                    <input ref={ref=>this._inputE=ref}></input>
                    <button onClick={this.addItem}>add</button>
                    <TodoItem items={this.state.items} superDelete={this.deleteItem}/>
                </div>
            </div>);
    }
}

export default TodoList;
~~~



TodoItem.jsx

~~~jsx
import React, {Component} from 'react';

class TodoItem extends Component{
    /* delete=(key)=>{
        this.props.superDelete(key);
    } */

    render(){
        const myItems = this.props.items.map((item)=>{
        return <li key={item.key} onClick={this.props.superDelete.bind(null,item.key)}>{item.text}</li>
        });
        return(
        <ul>{myItems}</ul>
        );
    }
}

export default TodoItem;
~~~



### 로그인, 로그아웃 기능까지

server.js

~~~js
const express = require("express");
const app = express();
const cors = require("cors");
const memberRouter = require("./routes/memberRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/member", memberRouter);

//app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ip: "111.222.333.444" });
});

app.listen(8080, () => {
  console.log("8080 server ready");
});

~~~



memberRouter.js

~~~js
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ message: true });
});

router.get("/logout", (req, res) => {
  res.json({ message: true });
});

module.exports = router;

~~~



MenuContainer.jsx

- react-router-dom 모듈 설치 필요(라우터 처리)

~~~jsx
import React, {Component} from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';
import Home from './Home';
import Stuff from './Stuff';
import Contact from './Contact';
import {Route,NavLink,HashRouter} from 'react-router-dom';


class MenuContainer extends Component{
       state = {
            visible:false
        };

    handleMouseDown=(e)=>{
        this.toggleMenu();

        console.log("clicked");
        e.stopPropagation();
    }

    toggleMenu=()=>{
        this.setState({
            visible:!this.state.visible
        });
    }

    render(){
        return(
            <div>
                <MenuButton handleMouseDown={this.handleMouseDown}/>
                <Menu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}></Menu>
                <HashRouter>
                <div>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink exact to='/'>Home</NavLink></li>
                        <li><NavLink to='/stuff'>Stuff</NavLink></li>
                        <li><NavLink to='/contact'>Contact</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/stuff" component={Stuff}/>
                        <Route path="/contact" component={Contact}/>
                    </div>
                </div>
                </HashRouter>
            </div>
        );
    }
}

export default MenuContainer;
~~~



menu.jsx

- jQuery 모듈 설치

~~~jsx
import React, {Component} from 'react';
import "./css/Menu.css";
import $ from 'jquery';

class Menu extends Component{

    state={
        loginStyle:"inline-block",
        logoutStyle:"none"
    }

    logout=()=>{
        $.get('http://localhost:8080/member/logout',(returnData)=>{
            if(returnData.message){
                this.setState({
                    loginStyle:"inline-block",
                    logoutStyle:"none"
                })
            }
        });
    }

    login=()=>{
        const send_param = {
            email : this.emailE.value,
            pw : this.pwE.value
        };

        $.post('http://localhost:8080/member/login',send_param, (returnData)=>{
            if(returnData.message){
                this.setState({
                    loginStyle:"none",
                    logoutStyle:"inline-block"
                });
            }
            
            this.emailE.value='';
            this.pwE.value='';
            this.emailE.focus();
        });
    }

    render(){
        const loginStyle={
            display:this.state.loginStyle
        }
        const logoutStyle={
            display:this.state.logoutStyle
        }

        let visibility = "hide";

        if(this.props.menuVisibility){
            visibility = "show";
        }

        return(
        <div id="flyoutMenu" onDrag={this.props.handleMouseDown} className={visibility}>
            <div style={loginStyle}>
                이메일 : <input ref={ref=>this.emailE=ref}/><br/>
                비밀번호 : <input type="password" ref={ref=>this.pwE=ref}/><br/>
                <button onClick={this.login}>로그인</button>
                <button>회원가입</button>
            </div>
            <div style={logoutStyle}>
                <button onClick={this.logout}>로그아웃</button>
            </div>
            <h2><a href="/">Home</a></h2>
            <h2><a href="/">About</a></h2>
            <h2><a href="/">Contact</a></h2>
            <h2><a href="/">Search</a></h2>
        </div>
        );
    }
}

export default Menu;
~~~



menubutton.jsx

~~~jsx
import React, {Component} from 'react';
import './css/MenuButton.css';

class MenuButton extends Component{
    render(){
        return(<button id="roundButton" onMouseDown={this.props.handleMouseDown}></button>);
    }
}

export default MenuButton;
~~~



Home.jsx

~~~jsx
import React, {Component} from 'react';

class Home extends Component{
    render(){
        return(
            <div>
                <h2>HOME</h2>
                <p>home</p>
            </div>
        );
    }
}

export default Home;
~~~



Stuff.jsx

~~~jsx
import React, {Component} from 'react';

class Stuff extends Component{
    render(){
        return(
            <div>
                <h2>Stuff</h2>
                <p>Stuff</p>
            </div>
        );
    }
}

export default Stuff;
~~~



contact.jsx

~~~jsx
import React, {Component} from 'react';

class Contact extends Component{
    render(){
        return(
            <div>
                <h2>Contact</h2>
                <p>회원가입</p>
                이름 : <input /> <br/>
                이메일 : <input /> <br/>
                비밀번호 : <input /> <br/>
                comments : <input /> <br/>
                <input type="button" value="가입하기"/>
            </div>
        );
    }
}

export default Contact;
~~~



### ngrok

- 모바일 기기에서 접속가능하게 URL을 만들어서 제공해 줌(모바일 테스트할 때 유용해보임)

- https://dashboard.ngrok.com/get-started 접속 후 설치

~~~
ngrok is a command line application, try typing 'ngrok.exe http 80'
at this terminal prompt to expose port 80.
C:\Users\student\Downloads\ngrok-stable-windows-amd64>ngrok http 3000
~~~


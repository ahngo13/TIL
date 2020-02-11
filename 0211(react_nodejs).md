### TodoList (서버 연결까지)

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





### ngrok 사용법

- https://dashboard.ngrok.com/get-started 접속 후 설치

~~~
ngrok is a command line application, try typing 'ngrok.exe http 80'
at this terminal prompt to expose port 80.
C:\Users\student\Downloads\ngrok-stable-windows-amd64>ngrok http 3000
~~~


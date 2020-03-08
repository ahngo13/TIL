## React Hooks - useState, useEffect



### create-react-app으로 프로젝트 생성

app.js를 함수형으로 변경

~~~ react
import React from 'react';
import './App.css';

const App = () => {
  return (
    <h1>todo 애플리케이션</h1>
  )
}

export default App;
~~~



### todolist 화면 구성

app.js

~~~react
import React from 'react';
import './App.css';
import List from './List.jsx';

const App = () => {
  return (
    <>
      <h1>todo 애플리케이션</h1>
      <form action="">
        <input type="text" name="" />
        <button>할일추가</button>
      </form>
      <List/>
    </>
  )
}

export default App;
~~~



List.jsx

- List 컴포넌트 생성

~~~react
import React from 'react';

const List = () =>{
    return(
        <ul>
            <li>공부하자 제발..</li>
        </ul>
    )
}

export default List;
~~~



### useState 사용

- useState에 있는 내용이 ul에 li태그로 들어감

app.js

~~~react
import React, { useState } from 'react';
import './App.css';
import List from './List.jsx';

const App = () => {
  const [todos, setTodos] = useState(['js공부']); //첫번째는 상태값, 두번째는 메서드
  return (
    <>
      <h1>todo 애플리케이션</h1>
      <form action="">
        <input type="text" name="" />
        <button>할일추가</button>
      </form>
      <List todos={todos}/>
    </>
  )
}

export default App;
~~~

List.jsx

~~~react
import React from 'react';

const List = ({todos}) =>{
    const todoList = todos.map(todo => <li>{todo}</li>)
    return(
        <ul>
            {todoList}
        </ul>
    )
}

export default List;
~~~



### setState 사용

- 입력한 값이 할일 추가 버튼을 눌렀을 경우 추가됨.

app.js

~~~react
import React, { useState } from 'react';
import './App.css';
import List from './List.jsx';

const App = () => {
  const [todos, setTodos] = useState(['js공부']); //첫번째는 상태값, 두번째는 메서드
  const [newTodo, setNewTodo] = useState(); //빈값으로 세팅

  const changeInputData = (e) =>{
    setNewTodo(e.target.value); //onChange된 value값이 실시간으로 들어감
  }

  const addTodo = (e) => {
    e.preventDefault(); //기본 폼 전송을 막음, form이 submit 되는 것을 막음
    setTodos([...todos,newTodo]); //이전 todos 정보, 입력한 정보
  }

  return (
    <>
      <h1>todo 애플리케이션</h1>
      <form action="">
        <input type="text" name="" onChange={changeInputData}/>
        <button onClick={addTodo}>할일추가</button>
      </form>
      <List todos={todos}/>
    </>
  )
}

export default App;
~~~



### useEffect 사용

- useEffect를 사용해서 할일추가 버튼을 눌렀을 때 새로운 내용이 랜더링 된 것을 콘솔에 출력

app.js

~~~react
import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List.jsx';

const App = () => {
  const [todos, setTodos] = useState(['js공부']); //첫번째는 상태값, 두번째는 메서드
  const [newTodo, setNewTodo] = useState(); //빈값으로 세팅

  const changeInputData = (e) =>{
    setNewTodo(e.target.value); //onChange된 value값이 실시간으로 들어감
  }

  const addTodo = (e) => {
    e.preventDefault(); //기본 폼 전송을 막음, form이 submit 되는 것을 막음
    setTodos([...todos,newTodo]); //이전 todos 정보, 입력한 정보
  }

  useEffect(()=>{
    console.log("새로운 내용이 렌더링 됐네요", todos);
  },[todos]) //newTodo에 대한 내용이 렌더링 되었을 때만 수행  

  return (
    <>
      <h1>todo 애플리케이션</h1>
      <form action="">
        <input type="text" name="" onChange={changeInputData}/>
        <button onClick={addTodo}>할일추가</button>
      </form>
      <List todos={todos}/>
    </>
  )
}

export default App;
~~~


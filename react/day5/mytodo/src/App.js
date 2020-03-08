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

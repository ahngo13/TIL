# React Day 1

## JS 코딩하는 방법

### App.js

~~~react
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* App div 태그 안에 있는 내용을 수정하면 된다.
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
      Hello~ React!!
    </div>
  );
}

export default App;


~~~

## CSS 코딩하는 방법

### index.css

~~~css
/* body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
} */
body{
  background-color: powderblue;
}
~~~

index.css 파일과 app.css 파일에 있는 내용을 모두 지워주고 프로젝트를 시작하면 된다.
#### 리액트 스타일링

UI 컴포넌트를 위한 스타일이 다른 어딘가에 있다면 독립적인 UI 컴포넌트가 될 수 있기 때문에 리액트는 HTML과 자바스크립트 바로 옆에서 엘리먼트 스타일을 지정할 것을 권함.



~~~html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    <style>
        #container{
            padding: 50px;
            background-color: #FFF;
        }
    </style>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    var destination = document.querySelector('#container');
    class Letter extends React.Component{
        render(){
            return( 
        <div>
            {this.props.children}
        </div>
            );
        }
    }

    ReactDOM.render(
        <div>
            <Letter>A</Letter>
            <Letter>E</Letter>
            <Letter>I</Letter>
            <Letter>O</Letter>
            <Letter>U</Letter>
        </div>,
        destination
    );
    </script>
</body>
~~~


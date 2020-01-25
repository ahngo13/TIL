#### SPA(Single Page App)

서버로부터 완전한 새로운 페이지를 불러오지 않고 현재의 페이지를 동적으로 다시 작성함으로써 사용자와 소통하는 웹 애플리케이션이나 웹사이트



#### 싱글 페이지 앱 제작시 이슈

1. 데이터와 UI 동기화에 많은 시간을 쏟게 된다.
2. DOM이 느림




#### UR 상태의 자동 관리

리액트에서 중요한 것은 UI의 마지막 상태이다.



#### 번개같이 빠른 DOM 조작

가상 DOM을 만들어 조작



#### 자바스크립트만으로 정의하는 비주얼

자바스크립트와 호환되면서도 HTML과 닮은 JSX라고 하는 문법을 사용해 비주얼을 지정할 수 있는 옵션 제공



#### 브라우저가 JSX에 대해서 모른다

1. Node.js와 그 외 빌드 툴 등으로 구성된 개발 환경을 구축(대표적인 방식)
2. 런타임 시에 브라우저가 JSX를 자바스크립트로 자동 변환(입문자들 사용)



#### 리액트 시작하기

~~~html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
</head>
<body>
    <script type="text/babel">
        ReactDOM.render(
            <h1>Hamlet Shu</h1>, //첫번째 인자 화면에 출력하고 싶은 HTML
            document.body //그 JSX를 렌더링해 보여줄 DOM 안의 위치(body 태그 안)
        );
    </script>
</body>
~~~



#### 새로운 엘리먼트를 만들어 새로운 루트 엘리먼트로 사용

~~~html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
</head>
<body>
    <div id="container"></div> //새로운 엘리먼트 생성
    <script type="text/babel">
        ReactDOM.render(
            <h1>Hamlet Shu</h1>,
            document.querySelector('#container') //새로운 루트 엘리먼트 사용
        );
    </script>
</body>
~~~



#### 스타일 적용

~~~html
<style>
    #container{
        padding: 50px;
        background-color: #EEE;
    }
    #container h1{
        font-size: 144px;
        font-family: sans-serif;
        color: #0080A8;
    }
</style>
~~~



#### 리액트 컴포넌트 사용

~~~html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    class HelloWorld extends React.Component{
        render(){
            return <p>Hello, world!</p>
        }
    }

    ReactDOM.render(
        <div>
            <HelloWorld/>
            <HelloWorld/>
            <HelloWorld/>
            <HelloWorld/>
            <HelloWorld/>
            <HelloWorld/>
        </div>,
        document.querySelector('#container')
    );
    </script>
</body>
~~~



#### 컴포넌트 속성 지정

~~~html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    class HelloWorld extends React.Component{
        render(){
            return <p>Hello, {this.props.greetTarget}!</p> //속성은 여러개 사용이 가능하며 모든 컴포넌트가 접근할 수 있는 porps라는 속성을 통해 호출하게 변경
        }
    }

    ReactDOM.render(
        <div>
            <HelloWorld greetTarget="Batman"/> //속성에 들어갈 값들을 넣음
            <HelloWorld greetTarget="Iron Man"/>
            <HelloWorld greetTarget="Mega Man"/>
            <HelloWorld greetTarget="X Man"/>
            <HelloWorld greetTarget="Nicolas Cage"/>
            <HelloWorld greetTarget="Catwoman"/>
        </div>,
        document.querySelector('#container')
    );
    </script>
</body>
~~~



#### 자식 다루기

~~~html
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>React</title>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    class Buttonify extends React.Component{
        render(){
            return( 
        <div>
            <button type="{this.props.behavior}">{this.props.children}</button>
        </div>
            );
        }
    }

    ReactDOM.render(
        <div>
            <Buttonify behavior="submit">SEND DATA</Buttonify>
        </div>,
        document.querySelector('#container')
    );
    </script>
</body>
~~~


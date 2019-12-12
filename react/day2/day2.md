# React day2

**expo**는 **리액트 네이티브** 개발 환경을 자동으로 구축 

**create-react-app**은 **리액트**로 웹 애플리케이션을 만들기 위한 환경을 제공

create-react-app에는 **바벨과 웹팩이 포함**되어 있음. 그 밖에도 ES6+, HMR, CSS 후처리 등 개발환경 구축



### create-react-app 개발 환경 설치

npx create-react-app cra-test



### npm이 버전이 낮아서 실행이 안될 경우

npm install -g create-react-app

create-react-app cra-test



### 웹 페이지 실행

cd cra-test

npm start



- index.html, index.js, package.json 파일을 제외한 나머지 파일은 데모 앱을 위한 파일이기 때문에 마음대로 수정하거나 삭제해도 괜찮다.

- 검색엔진 최적화가 중요하다면 서버사이드 렌더링에 특화된 next.js를 사용하는게 좋다.



#### PWA(Progressive Web App)

- 오프라인에서도 잘 동작하는 웹 애플리케이션을 만들기 위한 기술
- 기능을 원한다면 index.js 파일에 serviceWorker.register(); 코드를 기술



### npm 주요 명령어

**개발모드로 실행 :  npm start** 

개발 모드로 실행하면 HMR이 동작하기 때문에 코드를 수정하면 화면에 즉시 반영

(개발 모드에서 코드에 에러가 있을 때는 브라우저에 에러메시지가 출력됨)

**자체 서명된 인증서와 함께 https 사이트로 접속 : set HTTPS=true && npm start**

자체 서명된 인증서이기 때문에 안전하지 않다는 경고 문구가 뜨지만 무시하면 됨

**빌드하기**

**npm run build** : 배포 환경에서 사용할 파일을 만듦

**npx serve -s build** : 생성된 정적 파일을 웹서버를 통해 사용자가 내려받을 수 있게 함

**npm test** : 테스트 코드 실행

**set "CI-true" && npm test** : watch 모드가 필요 없는 환경에서 테스트 코드 실행

**npm run eject** : 숨겨져 있던 내부 설정파일 노출



#### 브라우저 히스토리 API 동작을 확인하는 코드

~~~react
import React, {Component} from 'react';

class App extends Component{
  componentDidMount(){
    window.onpopstate = function(event){
      this.console.log('location: ${document.location}, state: ${event.state}');
    };
  }
  render(){
    return(
      <div>
        <button onClick={() => window.history.pushState('v1','','/page1')}>
        page1
        </button>
        <button onClick={() => window.history.pushState('v2','','/page2')}>
        page2
        </button>
      </div>
    );
  }
}

export default App;

~~~

page1 버튼과 page2 버튼을 눌러보면 /page1과 /page2로 브라우저 주소창의 url이 변경되는 것을 확인할 수 있음.



~~~
./src/App.js
  Line 6:24:  Unexpected template string expression  no-template-curly-in-string

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.
~~~


# React-Native

리액트 네이티브에서 스타일은 웹의 CSS와 일치하는데 HTML태그와 CSS를 사용할 수는 없다.

따라서 StyleSheet.create 메소드를 활용해서 스타일 object를 작성해야한다.

~~~react
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    );
  }
}
~~~



### 기본 문법

#### id, 클래스 등의 선택자 사용

- 아래의 예제에서 보면 bigBlue, red에 앞에 .이 붙어있지 않은 것을 알 수 있다.

~~~react
const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
~~~



#### 세미콜론 대신 콤마 사용

- 각 스타일 속성의 구분을 CSS 처럼 세미콜론이 아닌 콤마로 구분한다.

~~~react
const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
~~~



#### 스타일 속성명 하이픈 사용

- 리액트와 RN의 경우 스타일을 카멜케이스를 이용함

~~~react
content: {
    justifyContent: 'space-between',
    backgroundColor: '#eee',
},
~~~

#### px, em 등의 단위 미사용



### RN 스타일과 CSS의 차이점

- 축약형이 존재하지 않는다.
  - margin, padding 같은 속성이 없음

~~~react
item: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    marginVertical: 0,
    marginBottom: 4,
    marginLeft: 6,
},
~~~



- 나중에 전달하는 스타일이 우선 순위가 높다.
  - 여러 개의 스타일을 전달할 수 있다.

~~~react
render() {
return (
    <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
);
}
~~~



- 의사 클래스(가상 클래스), 가상요소, 형제 선택자, 자식선택자 등 사용 불가

  - ```
    :first-child`, `:nth-child`, `:focus ::before, ::after 등
    ```



### RN의 FLEX

- RN에서는 flex와 none 두 가지 밖에 없다. (float 같은 것을 쓸 수 없음)



### flex 컨테이너와 아이템은 main axis(주축)과 cross axis (교차축)에 따라 정렬



 ### 지원하지 않는 flex 속성이 있음



### Component

- View : UI를 구축하기 위한 가장 기본적인 구성요소 (웹의 div와 유사)
- Text : 텍스트를 표현하기 위한 컴포넌트(컴포넌트 내부에 다른 컴포넌트 사용은 지양, 중첩해서 사용 가능, 중첩된 Text 컴포넌트는 inline-level처럼 동작하는데 margin, padding, border 등 box-model에 관련된 스타일이 적용되지 않는다)

- Touchable

  - button : 기본적인 버튼 컴포넌트(style props 이용 불가하므로 UI 개발 시 활용도 떨어짐)
  - TouchableHightlight : 터치시 하이라이트가 발생, 내부에 반드시 하나의 자식 컴포넌트 필요(여러 개가 필요하다면 View나 flagment를 이용해서 그룹화 해야함)
    - 주요 props
      - underlayColor : 터치시 하이라이팅 되는 색상을 지정

  - TouchableOpacity : 터치시 opacity값이 적용됨
    - 주요 props
      - activeOpacity : 터치시 적용되는 opacity값을 설정(0~1)
  - TouchableNativeFeedback : 터치시 사용자가 정의한 피드백을 표현할 수 있으며 단일 View 컴포넌트만 자식 요소로 가질 수 있다. (android만 가능)

### Image

- 이미지를 표현할 때 사용하는 컴포넌트
- 불러올 때는 require, width, height를 적용하지 않으면 원본사이즈 대로 렌더링



### 새로운 기능을 가진 컴포넌트

- ImageBackground : 배경이미지가 필요할 때 사용하는 컴포넌트 (CSS의 background-image와 유사)
- SafeAreaView : 기기의 안전한 영역 경계 내에서 콘텐츠를 렌더링할 때 사용 (적용하지 않으면 기기의 탭바, 시간, 배터리 등 도구 모음 등 뷰가 렌더링 되는 내용가 겹치는 현상 발생, 보통 페이지의 최상위 래퍼 컴포넌트로 많이 사용)

- ScrollView : CSS에서 요소에 `overflow: auto`을 선언한 것과 유사하게 동작

- keyboardAvoidingView : 키보드가 올라올 경우 컨텐츠가 키보드에 가려지는 문제를 해결하는 방법을 제공하는 컴포넌트
- FlatList : 목록형 UI를 렌더링 할 때 유용한 기능을 제공하는컴포넌트(자동적으로 내부에 ScrollView가 적용, data와 renderItem props는 필수적으로 선언)
- ActiveIndicator : 로딩시 로딩 인디케이터를 제공하는 컴포넌트

- Modal : 모달창을 구현할 때 사용되는 컴포넌트
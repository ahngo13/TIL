### 연산자

- 연산자는 우선순위가 있다

~~~mysql
select 504.7*13,504.2+32,504.7 DIV 2, 504.7%2
~~~



#### 대입 연산자

**=** 왼쪽 피연산자에 오른쪽 피연산자를 대입함. (SET 문이나 UPDATE 문의 SET 절에서만 대입연산자로 사용됨)

**:=** 왼쪽 피연산자에 오른쪽 피연산자를 대입함.



#### 비교연산자

~~~mysql
SELECT 3 = 3,      // 3과 3이 같은지를 비교함.
0 = NULL,          // 0과 NULL이 같은지를 비교함.
1 IS TRUE,         // 1과 TRUE가 같은지를 비교함.
1 IS NULL,         // 1과 NULL이 같은지를 비교함.
3 BETWEEN 2 AND 7, // 3이 2보다 크거나 같고, 7보다 작거나 같은지를 비교함.
5 IN (2, 3, 4, 5); // 5가 2, 3, 4, 5중에 포함되는지를 비교함.
~~~



#### 논리연산자

~~~mysql
SELECT NOT 0, // 피연산자가 0이면 1을 반환하고, 1이면 0을 반환함.
1 AND 1,      // 피연산자가 모두 1일때만 1을 반환하고, 나머지 경우에는 0을 반환함.
0 OR 0,       // 피연산자가 모두 0일때만 0을 반환하고, 나머지 경우에는 1을 반환함.
1 XOR 0;      // 피연산자가 서로 다르면 1을 반환하고, 서로 같으면 0을 반환함.
~~~



### 흐름 제어

#### CASE

CASE 연산자는 값을 서로 비교하거나, 표현식의 논리값에 따라 다른 값을 반환합니다.

~~~mysql
CASE value
    WHEN [compare_value] THEN result
    [WHEN [compare_value] THEN result] ...
    [ELSE result]
~~~



#### IF()

IF() 함수는 첫 번째 인수로 전달받은 표현식의 논리값에 따라 다른 값을 반환합니다.

~~~mysql
SELECT IF(0 < 1, 'yes', 'no');
~~~



#### IFNULL()

IFNULL() 함수는 첫 번째 인수로 전달받은 값이 NULL인지 아닌지를 검사하여 다른 값을 반환합니다.

~~~mysql
SELECT IFNULL(NULL, '전달받은 값이 null입니다.');
~~~



#### NULLIF()

NULLIF() 함수는 인수로 전달받은 두 값이 서로 같은지를 검사하여 다른 값을 반환합니다.

~~~mysql
SELECT NULLIF(3, 3);
~~~



#### LIKE

LIKE 연산자는 특정 패턴을 포함하는 데이터만을 검색하기 위해 사용합니다.

~~~mysql
SELECT * FROM Reservation
WHERE Name LIKE '장%';
~~~



#### 와일드카드(wildcard)

와일드카드(wildcard)란 문자열 내에서 임의의 문자나 문자열을 대체하기 위해 사용되는 기호

% : 0개 이상의 문자를 대체함.

_ : 1개의 문자를 대체함.



#### REGEXP

- LIKE 연산자보다 더욱 복잡한 패턴을 검색하고 싶을 때는 REGEXP 연산자를 사용할 수 있음

-  정규 표현식을 토대로 하는 패턴 매칭 연산을 제공

~~~mysql
select * from test where name regexp '^햄'
-- 햄으로 시작하는 이름을 가지는 데이터 조회
~~~



### 제약조건

- NOT NULL : 해당 필드에 NULL값 저장 불가

- UNIQUE : 해당 필드는 서로 다른 값을 가져야 함. 중복 안됨. (그러나, 유니크 제약조건만 지정할 경우 NULL값이 허용됨)
- INDEX : 인덱스(index)는 테이블에서 원하는 데이터를 쉽고 빠르게 찾기 위해 사용
- PRIMARY KEY : 해당 필드는 NOT NULL과 UNIQUE 모두의 제약조건

~~~mysql
ALTER TABLE test add CONSTRAINT test PRIMARY KEY (id);
ALTER TABLE test DROP PRIMARY KEY
~~~

- FOREIGN KEY : 한 테이블을 다른 테이블과 연결해주는 역할



# Node.js SNS 만들기

### Menu.jsx

- axios 적용

~~~jsx
import axios from 'axios';
axios.defaults.withCredentials = true;
const headers={withCredentials:true};


    logout=()=>{
        axios.get('http://localhost:8080/member/logout',{
            headers
        }).then((returnData)=>{
            if(returnData.data.message){
                $.removeCookie("login_name");
                this.setState({
                    loginStyle:"inline-block",
                    logoutStyle:"none"
                });
            }
        });
    }

    login=()=>{
        const send_param = {
            headers,
            email : this.emailE.value,
            pw : this.pwE.value
        };

        axios.post('http://localhost:8080/member/login',send_param)
        .then((returnData)=>{
            if(returnData.data.message){
                $.cookie("login_name",returnData.data.message);
                this.setState({
                    login_email:returnData.data.message,
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
    }

~~~

server.js

- cors 속성 설정

~~~js
const corsOptions = {
  origin: true,
  credentials: true
};


app.use(cors(corsOptions));

~~~

memberRouter.js

~~~js
//로그인 후 세션 아이디 확인
console.log("/login" + req.sessionID);

//로그아웃 전 세션 아이디 확인
console.log("/logout" + req.sessionID);
~~~



### 테이블 생성

~~~mysql
CREATE TABLE `sns`.`user` (
  `email` VARCHAR(50) NOT NULL,
  `nick` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `nick_UNIQUE` (`nick` ASC));

CREATE TABLE `sns`.`post` (
  `post_no` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `content` VARCHAR(140) NULL,
  `img` VARCHAR(45) NULL,
  PRIMARY KEY (`post_no`));

ALTER TABLE `sns`.`post` 
ADD INDEX `f1_idx` (`email` ASC);
;

ALTER TABLE `sns`.`post` 
DROP FOREIGN KEY `f1`;
ALTER TABLE `sns`.`post` 
ADD CONSTRAINT `f1`
  FOREIGN KEY (`email`)
  REFERENCES `sns`.`user` (`email`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
CREATE TABLE `hashtag` (
  `hashtag_no` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  PRIMARY KEY (`hashtag_no`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8


CREATE TABLE `follow` (
  `follower_id` varchar(45) NOT NULL,
  `following_id` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8

ALTER TABLE `sns`.`follow` 
ADD INDEX `f2_idx` (`follower_id` ASC, `following_id` ASC);
;
ALTER TABLE `sns`.`follow` 
ADD CONSTRAINT `f2`
  FOREIGN KEY (`follower_id` , `following_id`)
  REFERENCES `sns`.`user` (`email` , `email`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

CREATE TABLE `follow` (
  `follower_id` varchar(45) NOT NULL,
  `following_id` varchar(45) NOT NULL,
  KEY `f2_idx` (`follower_id`,`following_id`),
  KEY `f4_idx` (`following_id`),
  CONSTRAINT `f3` FOREIGN KEY (`follower_id`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `f4` FOREIGN KEY (`following_id`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8

CREATE TABLE `sns`.`posthashtag` (
  `post_no` INT NOT NULL,
  `hashtag_no` INT NOT NULL);

ALTER TABLE `sns`.`posthashtag` 
ADD INDEX `f5_idx` (`post_no` ASC);
;
ALTER TABLE `sns`.`posthashtag` 
ADD CONSTRAINT `f5`
  FOREIGN KEY (`post_no`)
  REFERENCES `sns`.`post` (`post_no`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `sns`.`posthashtag` 
ADD INDEX `f6_idx` (`hashtag_no` ASC);
;
ALTER TABLE `sns`.`posthashtag` 
ADD CONSTRAINT `f6`
  FOREIGN KEY (`hashtag_no`)
  REFERENCES `sns`.`hashtag` (`hashtag_no`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

~~~



### ORM(Object Relational Mapping)

객체 관계 매핑은 데이터베이스와 객체 지향 프로그래밍 언어 간의 호환되지 않는 데이터를 변환하는 프로그래밍 기법이다. 객체 지향 언어에서 사용할 수 있는 "가상" 객체 데이터베이스를 구축하는 방법




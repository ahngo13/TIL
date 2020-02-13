# MySQL

http://tcpschool.com/mysql/intro

### 기본 문법

#### 주석

~~~mysql
# 한 줄 주석
-- 한 줄 주석
/* 두줄
이상의
주석*/
~~~



### 주요 구문

~~~m
1. CREATE DATABASE
2. ALTER DATABASE
3. CREATE TABLE
4. ALTER TABLE
5. DROP TABLE
6. INSERT INTO
7. UPDATE
8. DELETE
9. SELECT
10. CREATE INDEX
11. DROP INDEX
~~~



### CREATE

~~~mysql
crate database hotel; -- 데이터베이스 생성
show databases; -- 데이터베이스 목록 확인
use hotel; -- 데이터베이스 사용
~~~



### ALTER

~~~mysql
ALTER DATABASE Hotel CHARACTER SET=utf8 COLLATE=utf8_general_ci;
-- cherset 변경, 여기서 ci는 대소문자 구분을 안한다는 것을 뜻함.
ALTER TABLE test ADD Phone INT;
-- test 테이블에 phone 컬럼 추가
ALTER TABLE test DROP phone;
-- test 테이블에 phone 컬럼 삭제
ALTER TABLE Reservation MODIFY COLUMN ReserveDate VARCHAR(20);
-- reservation 테이블 reserveDate 필드 타입 변경
~~~



### DROP

~~~mysql
drop table members;
-- members 테이블 삭제
truncate table members;
-- members 테이블 모든 데이터 삭제
DROP DATABASE IF EXISTS Hotel; -- 데이터베이스 삭제
DROP TABLE IF EXISTS Reservation; -- 테이블 삭제
-- IF EXISTS를 통해 존재하면 삭제 가능
~~~



### INSERT

~~~mysql
1. INSERT INTO 테이블이름(필드이름1, 필드이름2, 필드이름3, ...) -- 안정적
   VALUES (데이터값1, 데이터값2, 데이터값3, ...)
2. INSERT INTO 테이블이름 -- 필드값 순서대로
   VALUES (데이터값1, 데이터값2, 데이터값3, ...)
~~~

~~~mysql
insert into test(id,name,reserveDate,roomnum) values('2','wook','2018-01-05','1004')
insert into test(id,name,reserveDate,roomnum) values('2','wook','2018-01-05','1004')
insert into test(id,name) values('3','mincheol')
~~~



### UPDATE

~~~mysql
UPDATE 테이블이름
SET 필드이름1=데이터값1, 필드이름2=데이터값2, ...
WHERE 필드이름=데이터값
~~~

~~~mysql
UPDATE test
SET name='햄릿슈'
WHERE id='1';
~~~



### DELETE

~~~mysql
DELETE FROM 테이블이름
WHERE 필드이름=데이터값
~~~

~~~mysql
delete from test where roomnum=5000
~~~



### SELECT

~~~mysql
SELECT 필드이름
FROM 테이블이름
[WHERE 조건]
~~~

~~~mysql
select * from test where id>=2;
select roomnum from test;
select distinct roomnum from test;
select * from test order by ReserveDate desc;
select reservedate, concat(roomnum, ':', name) as reserveInfo from test;
~~~



### 정수 타입

~~~mysql
-- 고정 소수점 타입
ALTER TABLE test
MODIFY COLUMN RoomNum DECIMAL(7,2);

-- 부동 소수점 타입
ALTER TABLE Reservation
MODIFY COLUMN RoomNum FLOAT(7,2);

-- 비트값 타입
insert into test values('10','2020-01-16',2015,'비트', 2000.123, b'100');
~~~



### 문자열 타입

- BINARY와 VARBINARY(이미지, 영상 등)는 문자 집합이 아닌 바이너리(binary) 데이터를 저장할 때 사용된다는 점
- BLOB은 Binary Large Object를 의미하며, 다양한 크기의 바이너리 데이터를 저장할 수 있는 타입(DB에 이미지와 영상을 저장할 수 있지만 DB에 넣을 경우 느리기 때문에 따로 파일 시스템으로 관리함)
- TEXT는 VARCHAR와 비슷, VARCHAR와는 달리 기본값 X, TEXT는 BLOB과도 비슷하지만, BLOB과는 달리 문자열의 대소문자를 구분

~~~mysql
alter table test add note char(4);

insert into test values('10','2020-01-16',2015,'CHAR4', 2000.123, b'100', 'abcd'); -- 4byte까지만 입력가능
-- VARCHAR(4)는 기본 1byte를 잡아먹음

-- ENUM은 미리 정의한 집합 안의 요소 중 하나만을 저장할 수 있는 타입
ALTER TABLE test
ADD COLUMN RoomType ENUM('Single', 'Twin', 'Double', 'Triple');
INSERT INTO Reservation (RoomType) VALUES (2); -- Twin이 들어감
INSERT INTO Reservation (RoomType) VALUES ('Single'); -- Single이 들어감

-- SET은 미리 정의한 집합 안의 요소 중 여러 개를 동시에 저장할 수 있는 타입
ALTER TABLE Reservation
ADD COLUMN Request SET('Breakfast', 'Extra Bed', 'Non-Smoking');
INSERT INTO Reservation (Request) VALUES ('Breakfast,Extra Bed');

~~~



### 날짜, 시간타입

- TIMESTAMP 타입의 필드는 사용자가 별다른 입력을 주지 않으면, 데이터가 마지막으로 입력되거나 변경된 시간이 저장

~~~mysql
-- 날짜와 시간
ALTER TABLE test
MODIFY COLUMN ReserveDate DATETIME;
INSERT INTO test (ReserveDate) VALUES ('2016-01-01 01:23:45');
-- 시간
ALTER TABLE Reservation ADD COLUMN CheckIn TIME;
INSERT INTO Reservation (CheckIn) VALUES ('01:23:45');
-- 연도
ALTER TABLE test
ADD COLUMN ThisYear YEAR;
INSERT INTO test (ThisYear) VALUES (2016);
~~~




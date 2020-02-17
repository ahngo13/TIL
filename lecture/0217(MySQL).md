### JOIN

여러 테이블에서 가져온 레코드를 조합하여 하나의 테이블이나 결과 집합으로 표현해 주는 것

#### INNER JOIN = JOIN = CROSS JOIN (교집합)

ON 절의 조건을 만족하는 데이터만 조회

~~~mysql
SELECT *
FROM Reservation
INNER JOIN Customer
ON Reservation.Name = Customer.Name; -- 이름을 구분값으로 JOIN을 하는 것은 좋지 않을 듯

SELECT *
FROM Reservation
JOIN Customer
ON Reservation.Name = Customer.Name; -- 중복될 수 있기 때문에

SELECT *
FROM Reservation AS r, Customer AS c -- 별명을 사용하면 좀 더 간단하게 표현 가능
WHERE r.Name = c.Name;
~~~



#### LEFT JOIN

첫번째 테이블 기준으로 두번째 테이블을 조합해서 조회

~~~mysql
SELECT *
FROM Reservation
LEFT JOIN Customer
ON Reservation.Name = Customer.Name
WHERE ReserveDate > '2016-02-01';
~~~

#### RIGHT JOIN

두번째 테이블 기준으로 첫번째 테이블을 조합해서 조회

~~~mysql
SELECT *
FROM Reservation
RIGHT JOIN Customer
ON Reservation.Name = Customer.Name;
~~~


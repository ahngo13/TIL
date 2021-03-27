# Oracle 문제 풀이

1.사원의 이름과 직위를 출력하시오 단, 사원의 이름은 "사원이름", 직위는 "사원직원" 머리글이 나오도록 출력한다.

```sql
SELECT ENAME AS 사원이름, JOB AS 사원직원 FROM EMP;
```

2.30번 부서에 근무하는 모든 사원의 이름과 급여를 출력하시오.

```sql
SELECT ENAME AS 이름, SAL AS 급여 FROM EMP WHERE DEPTNO = 30;
```

3.사원 번호와 이름, 현재 급여, 10%인상된 급여(열 이름은 '인상된 금액'), 증가된 금여분(열 이름은 '증가액')을 출력하시오 단, 사원 번호순으로 출력한다

```sql
SELECT EMPNO AS "사원번호", ENAME AS "이름", SAL AS "급여", SAL+(SAL*0.1) AS "인상된 금액", SAL*0.1 AS "증가된 급여분" 
FROM EMP
ORDER BY EMPNO
```

4.'F'로 시작하는 모든 사원과 부서번호를 출력하시오.

```sql
SELECT ENAME AS 사원이름, DEPTNO AS 부서번호
FROM EMP
WHERE ENAME LIKE 'F%'
```

5.모든 사원의 최대 및 최소 급여, 합계 및 평균급여를 출력하시오. 열 이름은 각각 MAX, MIN, SUM, AVG로 하고 소수점 이하는 반올림하여 정수로 출력

```sql
SELECT MAX(SAL) AS MAX, MIN(SAL) AS MIN, SUM(SAL) AS SAL, ROUND(AVG(SAL),2) AS AVG
FROM EMP
```

6.업무이름과 업무별로 동일한 업무를 하는 사원의 수를 출력하시오. 열 이름은 각각 '업무'와 '업무별 사원수'로 출력

```sql
SELECT JOB AS "업무", COUNT(EMPNO) "업무별 사원수"
FROM EMP
GROUP BY JOB
```

7.사원의 최대 급여와 최소 급여 차액을 출력

```sql
SELECT MAX(SAL)-MIN(SAL) AS 최대급여와최소급여의차액
FROM EMP
```

8.30번 부서의 구성원 수와 사원들의 급여의 합계와 평균을 출력

```sql
SELECT COUNT(EMPNO) AS "구성원 수", SUM(SAL) AS 급여합계, AVG(SAL) AS 급여평균
FROM EMP
WHERE DEPTNO=30
```

9.평균급여가 가장 높은 부서의 번호를 출력

```sql
select deptno"부서번호" ,avg(sal)
from emp
group by deptno
having avg(sal) = (select max(avg(sal)) from emp group by deptno);
```

10.SALESMAN을 제외하고, 각 업무별 사원들의 총 급여가 3000이상인 각 업무에 대해서, 업무명과 각 업무별 평균급여를 출력하되, 평균급여의 내림차순으로 출력하시오.

```sql
SELECT JOB AS 업무명, AVG(SAL) AS "업무별 평균급여"
FROM EMP
WHERE SAL >= 3000 
GROUP BY JOB
ORDER BY AVG(SAL) DESC
```

11.전체 사원 가운데 직속상관이 있는 사원의 수를 출력하시요.

```sql
SELECT COUNT(*) AS "직속 상관이 있는 사원의 수"
FROM EMP
WHERE MGR IS NOT NULL;
```

12.EMP테이블에서 이름, 급여, 커미션 금액, 총액(SAL+COMM)을 구하여 총액이 많은 순으로 출력하시오 단, 커미션 NULL인 사람 제외

```sql
SELECT ENAME AS 이름, SAL AS 급여, COMM AS "커미션 금액", SAL+COMM AS 총액
FROM EMP
WHERE COMM IS NOT NULL
ORDER BY SAL+COMM DESC
```

13.각 부서별로 같은 업무를 하는 사람의 인원수를 구하여 부서번호, 업무명, 인원수를 출력하시오.

```sql
SELECT DEPTNO AS 부서번호, JOB AS 업무명, COUNT(ENAME) AS 인원수
FROM EMP
GROUP BY DEPTNO, JOB
```

14.사원이 한 명도 없는 부서의 이름을 출력하시오.

```sql
SELECT D.DNAME, COUNT(E.DEPTNO)
FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO
GROUP BY D.DEPTNO, D.DNAME
```

15.같은 업무를 하는 사람의 수가 4명 이상인 업무와 인원수를 출력하시오.

```sql
SELECT D.DNAME AS 부서명
FROM EMP E RIGHT OUTER JOIN DEPT D ON E.DEPTNO = D.DEPTNO
GROUP BY D.DEPTNO, D.DNAME
HAVING COUNT(E.DEPTNO) = 0
```

16.사원번호가 7400이상 7600이하인 사원의 이름을 출력하시오.

```sql
SELECT ENAME AS 사원이름
FROM EMP
WHERE EMPNO BETWEEN 7400 AND 7600
```

17.사원의 이름과 사원의 부서를 출력하시오.

```sql
SELECT E.ENAME AS 사원이름, D.DNAME AS 부서명
FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO
```

18.사원의 이름과 팀장의 이름을 출력하시오.

```sql
SELECT E2.ENAME AS "사원이름", E1.ENAME AS "팀장이름"
FROM EMP E1 RIGHT OUTER JOIN EMP E2 ON E1.EMPNO = E2.MGR
```

19.사원 BLAKE보다 급여를 많이 받는 사람의 이름을 출력하시오.

```sql
SELECT ENAME AS 급여
FROM EMP
WHERE SAL > (SELECT SAL FROM EMP WHERE ENAME = 'BLAKE')
```

20.사원 BLAKE가 일하는 부서번호 혹은 DALLAS에 있는 부서번호를 출력하시오.

```sql
SELECT DEPTNO AS "부서번호"
FROM DEPT
WHERE DEPTNO = (SELECT DEPTNO FROM EMP
WHERE ENAME = 'BLAKE') 
OR
DEPTNO = (SELECT DEPTNO
FROM DEPT
WHERE LOC = 'DALLAS')
```

21.30번 부서 사원들의 최대 급여보다 적은 급여를 받는 사원 정보

```sql
SELECT *
FROM EMP
WHERE SAL < (SELECT MAX(SAL) FROM EMP GROUP BY DEPTNO HAVING DEPTNO = '30')
```

22.전체 사원 중 ALLEN과 직무가 같은 사원들의 사원 정보(직무,사원번호, 사원이름, 급여)와 부서 정보 (부서 번호, 부서 이름)을 출력하기

```sql
SELECT E.JOB 직무, E.EMPNO 사원번호, E.ENAME 사원이름, E.SAL 급여, D.DEPTNO 부서번호, D.DNAME 부서이름
FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO
WHERE E.JOB IN (SELECT JOB FROM EMP WHERE ENAME = 'ALLEN')
```

23.전체 사원의 평균급여보다 높은 급여를 받는 사원들의 사원 정보, 부서 정보, 급여 등급 정보를 출력하기 (급여가 많은순으로 정렬 급여가 같으면 사원번호 기준 오름차순)

```sql
SELECT EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, E.DEPTNO, DNAME, LOC, S.*
FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO, SALGRADE S
WHERE SAL > (SELECT AVG(SAL) FROM EMP)
AND S.GRADE = (SELECT GRADE FROM SALGRADE WHERE SAL BETWEEN LOSAL AND HISAL)
```

24.10번 부서에 근무하는 사원 중 30번 부서에는 존재하지 않는 직책을 가진 사원들의 사원정보 부서정보를 다음과 같이 출력하기

```sql
SELECT E.*, D.* 
FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO
WHERE E.DEPTNO = 10
AND E.JOB NOT IN (SELECT JOB FROM EMP WHERE DEPTNO = 30)
```

25.직책이 SALESMAN인 사람들의 최고 급여보다 높은 급여를 받는 사원들의 사원정보, 급여 등급 정보를 같이 출력

```sql
SELECT E.*, D.*, S.*
FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO, SALGRADE S
WHERE SAL > (SELECT MAX(SAL) FROM EMP WHERE JOB = 'SALESMAN')
AND S.GRADE = (SELECT GRADE FROM SALGRADE WHERE SAL BETWEEN LOSAL AND HISAL)
```

26.추가수당을 받는 사원 수와 받지 않는 사원 수 출력하기 (?)

```sql
SELECT 
(SELECT COUNT(*) FROM EMP WHERE REPLACE(COMM,0,NULL) IS NOT NULL ) A,
(SELECT COUNT(*) FROM EMP WHERE REPLACE(COMM,0,NULL) IS NULL OR COMM = 0) B
FROM DUAL;

select nvl2(REPLACE(comm,0,NULL),'o','x')"추가수당여부",count(*)
from emp
group by nvl2(REPLACE(comm,0,NULL),'o','x');
```

27.입사년도 기준으로 부서별 입사 인원수 출력하기

```sql
SELECT  TO_CHAR(HIREDATE,'YYYY') 입사년도, COUNT(TO_CHAR(HIREDATE,'YYYY')) 인원수
FROM EMP
GROUP BY TO_CHAR(HIREDATE,'YYYY')
```

28.같은 직책에 근무하는 사원이 3명 이상인 직책과 인원수

```sql
SELECT JOB, COUNT(*)
FROM EMP
GROUP BY JOB
HAVING COUNT(*) >= 3
```

29.사원이름 5자 이상 여섯자 미만 정보 출력

```sql
SELECT *
FROM EMP
WHERE LENGTH(ENAME) BETWEEN 5 AND 5
```

30.사원들의 월 평균 근무일수 21.5일이다. 하루에 8시간 근무 기준으로 하루 급여 및 시급 계산하여 출력- 출력 결과를 확인하여 적절한 반올림 처리

```sql
SELECT E.*, ROUND(SAL/21.5,2) AS 하루급여, ROUND(((SAL/21.5)/8),2) AS 시급 
FROM EMP E
```

31.사원들은 입사일을 기준으로 3개월이 지난 후 첫 월요일에 정직원이 된다. 정직원이 되는 날짜를 YYYY-MM-DD 형식으로 출력후 추가수당이 없는 사원의 추가수당은 N/A 출력

```sql
SELECT TO_CHAR(NEXT_DAY(ADD_MONTHS(HIREDATE,3),'월요일'),'YYYY-MM-DD') "정직원 날짜", DECODE(NVL(COMM,0), 0, 'N/A', COMM) 추가수당
FROM EMP
```

32.평균 급여가 가장 높은 부서와 낮은 부서의 번호를 출력하시오

```sql
SELECT DEPTNO, AVG(SAL)
FROM EMP
GROUP BY DEPTNO
HAVING AVG(SAL) = (SELECT MAX(AVG(SAL)) FROM EMP GROUP BY DEPTNO)
OR
AVG(SAL) = (SELECT MIN(AVG(SAL)) FROM EMP GROUP BY DEPTNO)
ORDER BY AVG(SAL) DESC;
```

33.전체 사원 가운데 직속 상관이 있는 사원의 수를 출력하시오.

```sql
SELECT COUNT(*)
FROM EMP
WHERE MGR IS NOT NULL
```

34.매니저가 없는 사원의 이름을 찾아라.

```sql
SELECT ENAME
FROM EMP
WHERE MGR IS NULL
```

35.이름에 'M'과 'S'가 포함된 사원의 이름을 찾아라.

```sql
SELECT ENAME
FROM EMP
WHERE ENAME LIKE '%M%'
AND ENAME LIKE '%S%'
```

36.EMP 테이블에서 MILLER 보다 늦게 입사한 사원의 사번, 이름, 입사일을 검색하시오

```sql
SELECT EMPNO, ENAME, HIREDATE
FROM EMP
WHERE HIREDATE > (SELECT HIREDATE FROM EMP WHERE ENAME = 'MILLER');
```

37.각 부서별로 1982년 이전에 입사한 직원들의 인원수를 출력하시오.

```sql
SELECT COUNT(*)
FROM EMP
WHERE TO_NUMBER(TO_CHAR(HIREDATE,'YYYY')) IN (SELECT TO_NUMBER(TO_CHAR(HIREDATE,'YYYY')) FROM EMP WHERE TO_NUMBER(TO_CHAR(HIREDATE,'YYYY')) < 1982)
```

38.직원 중 근무 개월 수가 30년보다 많은 사람의 이름, 급여 , 입사일 , 부서명을 출력하시오

```sql
SELECT ENAME, SAL, HIREDATE, DNAME
FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO
WHERE MONTHS_BETWEEN(SYSDATE,HIREDATE) > 30*12
```

39.자신의 관리자 보다 연봉(sal)을 많이 받는 사원의 이름과 연봉을 출력하시오.

```sql
SELECT E1.ENAME 사원이름, E1.SAL 사원연봉, E2.ENAME 관리자이름, E2.SAL 관리자연봉
FROM EMP E1 INNER JOIN EMP E2 ON E2.EMPNO = E1.MGR
WHERE E1.SAL > E2.SAL
```

40.DALLAS에 근무하는 사원 중 급여 1500 이상인 사원의 이름, 급여, 입사일 , 보너스(comm)을 출력하시오.

```sql
SELECT E.ENAME, E.SAL, E.HIREDATE, E.COMM, D.*
FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO
WHERE D.LOC = 'DALLAS'
AND E.SAL > 1500
```

41.EMP 테이블에서 보너스가 급여보다 10%가 많은 모든 종업원에 대하여 이름,급여,보너스를 출력하는 SELECT 문을 작성하여라.

```sql
SELECT ENAME, SAL, COMM
FROM EMP
WHERE COMM > SAL+(SAL*0.1)
```

42.EMP 테이블에서 업무가 Clerk이거나 Analyst이고 급여가 1000,3000,5000이 아닌 모든 사원의 정보를 출력하는 SELECT 문을 작성하여라.

```sql
SELECT *
FROM EMP
WHERE (JOB = 'CLERK'
OR JOB = 'ANALYST')
AND (SAL != 1000
AND SAL != 3000
AND SAL != 5000)
```

43.EMP 테이블에서 이름에 L이 두 자가 있고 부서가 30이거나 또는 관리자가 7782인 사원의 모든 정보를 출력하는 SELECT 문을 작성하여라.

```sql
SELECT *
FROM EMP
WHERE LENGTH(ENAME) - LENGTH(REPLACE(ENAME,'L','')) = 2
AND
(DEPTNO = 30 OR MGR = '7782')
```

44.EMP 테이블에서 현재 급여에 15%가 증가된 급여를 사원번호,이름,업무,급여,증가된 급여(New Salary),증가액(Increase)를 출력하는 SELECT 문장을 기술하시오.

```sql
SELECT EMPNO 사원번호, ENAME 이름, JOB 업무, SAL 급여, SAL+(SAL*0.15) "증가된 급여", SAL*0.15 "증가액"
FROM EMP
```

45.EMP 테이블에서 이름,입사일,입사일로부터 6개월 후 돌아오는 월요일 구하여 출력하는 SELECT 문장을 기술하시오.

```sql
SELECT ENAME, HIREDATE, NEXT_DAY(ADD_MONTHS(HIREDATE,6),'월요일')
FROM EMP
```

46.EMP 테이블에서 이름,입사일, 입사일로부터 현재까지의 월수,급여, 입사일부터 현재까지의 급여의 총계를 출력하는 SELECT 문장을 기술하시오.

```sql
SELECT TRUNC(MONTHS_BETWEEN(SYSDATE,HIREDATE),0), SAL, TRUNC(MONTHS_BETWEEN(SYSDATE,HIREDATE),0)*SAL
FROM EMP
```

47.EMP 테이블에서 이름의 길이가 6자 이상인 사원의 정보를 이름,이름의 글자수,업무를 출력하는 SELECT 문장을 기술하시오.

```sql
SELECT ENAME, LENGTH(ENAME), JOB
FROM EMP
WHERE LENGTH(ENAME) >= 6
```

48.EMP 테이블에서 월급이 부서 30의 최저 월급보다 높은 사원을 출력하는 SELECT문을 작성하시오.

```sql
SELECT *
FROM EMP
WHERE SAL > (SELECT MIN(SAL) FROM EMP GROUP BY DEPTNO HAVING DEPTNO = '30')
```

49.EMP 테이블에서 부서 10에서 부서 30의 사원과 같은 업무를 맡고 있는 사원의 이름과 업무를 출력하는 SELECT문을 작성하시오.

```sql
SELECT ENAME, JOB
FROM EMP
WHERE
DEPTNO = 10
AND
JOB IN (SELECT JOB FROM EMP WHERE DEPTNO = 30)
```

50.EMP 테이블에서 SCOTT 또는 WARD와 월급이 같은 사원의 정보를 이름,업무,급여를 출력하는 SELECT문을 작성하시오.

```sql
SELECT ENAME, JOB, SAL
FROM EMP
WHERE SAL IN (SELECT SAL FROM EMP WHERE ENAME IN ('SCOTT','WARD'))
```
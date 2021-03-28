# Oracle 문제 풀이2

1.EMPLOEES 테이블에서 급여가 12000이상인 직원의 성과 급여 출력하기(9)

```sql
SELECT COMMISSION_PCT
FROM EMPLOYEES
WHERE SALARY >= 12000
```

2.부서 번호가 20 혹은 50인 직원의 성과 부서번호를 성에 대하여 오름차순으로 출력하기(47)

```sql
SELECT LAST_NAME, DEPARTMENT_ID
FROM EMPLOYEES
WHERE DEPARTMENT_ID IN ('20','50')
ORDER BY LAST_NAME
```

3.성의 세번째에 a가 들어가는 직원의 성만 출력하기(3)

```sql
SELECT LAST_NAME
FROM EMPLOYEES
WHERE LAST_NAME LIKE '__a%'
```

4.현재 날짜 타입을 날짜 함수를 통해 확인하고, 2006년 05월 20일 부터 2007년 05월 20일 사이에 고용된 사원들의 이름과 성 (Name으로 별칭), 업무, 입사일을 출력하시오. 단, 입사일이 빠른 순으로 정렬하시오(18행)

```sql
SELECT FIRST_NAME, LAST_NAME NAME, JOB_ID, HIRE_DATE
FROM EMPLOYEES
WHERE HIRE_DATE BETWEEN TO_DATE('2006-05-20') AND TO_DATE('2007-05-20')
ORDER BY HIRE_DATE DESC
```

5.모든 사원의 연봉을 표시하는 보고서를 작성하려고 한다. 보고서에 사원의 이름과 성(Name으로 별칭), 급여, 수당여부에 따른 연봉을 포함하여 출력하시오. 수당여부는 수당이 있으면 "Salary + Commission", 수당이 없으면 "Salary only"라고 표시하고, 별칭은 적절히 붙이시오. 또한 출력시 연봉이 높은 순으로 정렬하시오(107행)

```sql
SELECT LAST_NAME, FIRST_NAME NAME, SALARY, DECODE(NVL2(COMMISSION_PCT, SALARY+COMMISSION_PCT, 0),0,'Salary only', SALARY+COMMISSION_PCT) AS COMM
FROM EMPLOYEES
ORDER BY SALARY DESC
```

6.모든 사원의 이름과 성(Name으로 별칭), 입사일 그리고 입사일이 어떤 요일이었는지 출력하시오. 이때 주(week)의 시작인 월요일로부터 출력되도록 정렬하시오(107행)

```sql
SELECT FIRST_NAME, LAST_NAME NAME, HIRE_DATE, TO_CHAR(HIRE_DATE, 'DAY')
FROM EMPLOYEES
ORDER BY REPLACE(TO_CHAR(HIRE_DATE, 'D'),1,8);
```

7.부서별로 담당하는 업무를 한 번씩만 출력하시오(20행)

```sql
SELECT FIRST_NAME, LAST_NAME NAME, HIRE_DATE, TO_CHAR(HIRE_DATE, 'DAY')
FROM EMPLOYEES
ORDER BY REPLACE(TO_CHAR(HIRE_DATE, 'D'),1,8);
SELECT JOB_ID
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID, JOB_ID
```

[8.HR](http://8.HR) 부서에서 예산 편성 문제로 급여 정보 보고서를 작성하려고 한다. 사원정보(EMPLOYEES)테이블에서 급여가 $7,000 ~ $10,000 범위 이외인 사람의 이름과 성(NAME으로 별칭) 및 급여를 급여가 적은 순서로 출력하시오 (75행)

```sql
SELECT FIRST_NAME, LAST_NAME AS NAME, SALARY
FROM EMPLOYEES
WHERE SALARY NOT IN (SELECT SALARY FROM EMPLOYEES WHERE SALARY BETWEEN 7000 AND 10000)
ORDER BY SALARY
```

9.사원의 성(LSAT_NAME)중에 'e' 및 'o' 글자가 포함된 사원을 출력하시오. 이때 머리글은 e and o Name이라고 출력하시오 (8행)

```sql
SELECT LAST_NAME AS "e and o name"
FROM EMPLOYEES
WHERE LAST_NAME LIKE '%e%' AND LAST_NAME LIKE '%o%'
```

10.현재 날짜 타입을 날짜 함수를 통해 확인하고, 2006년 05월 20일부터 2007년 05월 20일 사이에 고용된 사원들의 이름과 성(NAME으로 별칭), 업무 입사일을 출력하시오. 단. 입사일이 빠른 순으로 정렬하시오(18행)

```sql
SELECT FIRST_NAME, LAST_NAME NAME, HIRE_DATE
FROM EMPLOYEES
WHERE HIRE_DATE BETWEEN TO_DATE('2006-05-20') AND TO_DATE('2007-05-20')
ORDER BY HIRE_DATE
```

11.HR부서에서는 급여(SALARY)와 수당을(COMMISSION_PCT)에 대한 지출 보고서를 작성하려고 한다. 수당을 받는 모든 사원의 이름과 성(NAME으로 별칭). 급여,업무, 수당율을 출력하시오. 이때 급여가 큰 순서대로 정렬하되, 급여가 같으면 수당율이 큰 순서대로 정렬하시오(35행)

```sql
SELECT FIRST_NAME, LAST_NAME NAME, SALARY, JOB_ID, COMMISSION_PCT
FROM EMPLOYEES
WHERE COMMISSION_PCT IS NOT NULL
ORDER BY SALARY DESC, COMMISSION_PCT DESC
```

12.이번분기에 60번 IT 부서에서는 신규 프로그램을 개발하고 보급하여 회사에 공헌하였다. 이에 해당 부서의 사원 급여를 12.3% 인상하기로 하였다. 60번 IT 부서사원의 급여를 12.3% 인상하여 정수만(반올림) 표시하는 보고서를 작성하시오. 보고서는 사원번호, 성과 이름(NAME으로별칭), 급여, 인상된 급여(INCREASE SALARY로 별칭) 순으로 출력하시오 (5행)

```sql
SELECT E.EMPLOYEE_ID, E.LAST_NAME NAME, E.FIRST_NAME, E.SALARY, E.SALARY + ROUND(E.SALARY*0.123) AS "INCREASE SALARY"
FROM EMPLOYEES E INNER JOIN DEPARTMENTS D ON E.DEPARTMENT_ID = D.DEPARTMENT_ID
WHERE E.DEPARTMENT_ID = '60'
```

13.각 사원의 성(LAST_NAME)이 's'로 끝나는 사원의 이름과 업무를 아래의 예와 같이 출력하고자 한다. 출력시 이름(fist_name)과 성(last_name)은 첫글자가 대문자, 업무는 모두 대문자로 출력하고 머리글은 Employee JOBs. 로 표시하시오 (18행) 예) Michael Rogers is a ST_CLEKRK

```sql
SELECT CONCAT(CONCAT(CONCAT(CONCAT(FIRST_NAME, ' '), LAST_NAME), ' is '),UPPER(E.JOB_ID))
FROM EMPLOYEES E
WHERE LAST_NAME LIKE '%s'
```

14.모든 사원은 직속 상사 및 직속 직원을 갖는다. 단, 최상위 또는 최하위 직원은 직속 상사 및 직원이 없다. 소속된 사원들 중 어떤 사원의 상사로 근무 중인 사원의 총 수를 출력하시오(1행)

```sql
SELECT COUNT(E1.EMPLOYEE_ID)
FROM EMPLOYEES E1 RIGHT OUTER JOIN EMPLOYEES E2 ON E1.EMPLOYEE_ID = E2.MANAGER_ID
```

15.연습문제 각 사원이 소속된 부서별로 급여 합계, 급여 평균, 급여 최대값, 급여 최소값을 집계하고자 한다. 계산된 출력값은 여섯 자리와 세자리 구분기호, $표시와 함께 아래와 같이 출력하시오. 단, 부서에 소속되지 않은 사원에 대한 정보는 제외하고 , 출력시 다음처럼 별칭(alias) 처리하시오 (11행) (별칭들: DEPARTMENT_ID,SUM_Salary,Avg_Salary,Max_Salary,Min_Salary)

```sql
SELECT DEPARTMENT_ID, TO_CHAR(SUM(SALARY),'$999,999,999,999,999') SUM_Salary, TO_CHAR(AVG(SALARY),'$999,999,999,999,999') Avg_Salary, TO_CHAR(MAX(SALARY),'$999,999,999,999,999') Max_Salary, TO_CHAR(MIN(SALARY),'$999,999,999,999,999') Min_Salary
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID
```

16.같은 직무를 하는 사람의 수를 세어 출력하기

```sql
SELECT JOB_ID,COUNT(JOB_ID)
FROM EMPLOYEES
GROUP BY JOB_ID
```

17.급여의 최댓값과 최솟값의 차이 구하기

```sql
SELECT MAX(SALARY) - MIN(SALARY)
FROM EMPLOYEES
```

18.toronto에서 일하는 직원의 성, 직무, 부서번호, 부서이름 출력하기

```sql
SELECT E.LAST_NAME, J.JOB_TITLE, D.DEPARTMENT_ID, D.DEPARTMENT_NAME
FROM EMPLOYEES E INNER JOIN DEPARTMENTS D ON E.DEPARTMENT_ID = D.DEPARTMENT_ID
INNER JOIN JOBS J ON E.JOB_ID = J.JOB_ID
INNER JOIN LOCATIONS L ON D.LOCATION_ID = L.LOCATION_ID
WHERE L.CITY = 'Toronto'
```

19.성이 Matos와 Taylor인 직원의 성, 직무아이디, 입사일을 입사일 기준으로 오름차순으로 출력하기

```sql
SELECT LAST_NAME, JOB_ID, HIRE_DATE
FROM EMPLOYEES
WHERE LAST_NAME IN ('Matos','Taylor')
ORDER BY HIRE_DATE
```

20.1994년에 입사한 사원들의 성, 입사일 출력하기

```sql
SELECT LAST_NAME, HIRE_DATE
FROM EMPLOYEES
WHERE TO_CHAR(HIRE_DATE,'YYYY') = '1994'
```
### 정규식

https://www.regexpal.com/



~~~html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<script>
	function removeTags(data){
    	return data.replace(/<[^>]+>/g, "");
    }
    
    const str = "<b>Hello</b> <i>kim</i>";
    document.write(str + "<br>");
    document.write(removeTags(str));
</script>

</body>
</html>

~~~



### 보안분야

https://openeg.co.kr/506



### MS LogParser를 이용한 로그 분석

~~~
D:\LogFiles\W3SVC1965632154>logparser "select date, time, c-ip, cs-met
i-stem, cs-uri-query, sc-status into log.csv from ex200316.log where s
00" -i:W3C -o:csv

Statistics:
-----------
Elements processed: 7
Elements output:    1
Execution time:     0.36 seconds
~~~



log.csv

~~~
date,time,c-ip,cs-method,cs-uri-stem,cs-uri-query,sc-status
2020-03-16,05:50:19,192.168.63.128,POST,/login_ck.asp,|8|80040e14|문자열_''_and_bPass=_''의_따옴표가_짝이_맞지_않습니다.,500
~~~





~~~
D:\LogFiles\W3SVC1965632154>cd D:\APM_Setup\Server\Apache\logs

D:\APM_Setup\Server\Apache\logs>logparser "select DateTime, RemoteHost
est, StatusCode, BytesSent into log.csv from access.log where StatusCo
" -i:NCSA -o:CSV

Statistics:
-----------
Elements processed: 4512
Elements output:    2
Execution time:     0.08 seconds
~~~



log.csv

~~~
DateTime,RemoteHostName,Request,StatusCode,BytesSent
2013-09-05 13:01:19,192.168.79.1,GET /dvwa/login.php HTTP/1.1,500,535
2013-09-05 13:01:54,192.168.79.1,GET /dvwa/login.php HTTP/1.1,500,535

~~~



### SQL 삽입

#### Form Based SQL 삽입 체크

~~~
SELECT * FROM weather_data WHERE station = 101
~~~

숫자이므로 ''는 사용하지 않아도 됨

~~~
station=101 or 1=1&SUBMIT=Go%21
~~~



### 데이터베이스 백도어

~~~
101; update employee set salary=60000
~~~


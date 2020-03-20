### 파일 업로드/다운로드 취약점

1. BoardController.java 의 write.do 처리 메소드를 다음과 같이 바꾼다

BoardController.java

~~~java
    @RequestMapping(value="/write.do", method=RequestMethod.POST)
	public String boardWriteProc(@ModelAttribute("BoardModel") BoardModel boardModel, MultipartHttpServletRequest request, HttpSession session){		
		MultipartFile file = request.getFile("file");				
		//file size check
		if(file.getSize()>512000){
			System.out.println("too large file upload...reject!");
			session.setAttribute("writeErrorCode", 1);
			String content =  boardModel.getContent().replaceAll("\r\n", "<br />");		
			boardModel.setContent(content);
			service.writeArticle(boardModel);
			return "redirect:list.do"; 
		}		
		String originalFileName = file.getOriginalFilename();		
		if ( !"".equals(originalFileName)) {			
				String lowerCaseFileName=originalFileName.toLowerCase();				
				// file type check
				if(lowerCaseFileName.endsWith(".doc") || lowerCaseFileName.endsWith(".hwp") ||
				  lowerCaseFileName.endsWith(".pdf") ||  lowerCaseFileName.endsWith(".jpg") ||
				  lowerCaseFileName.endsWith(".png") ||  lowerCaseFileName.endsWith(".gif") ) {
					// upload file directory
					String uploadPath = session.getServletContext().getRealPath("/")+"WEB-INF/files/";	
					//new create uploadFileName 					
					String uploadFileName=UUID.randomUUID().toString();
					File uploadFile = new File(uploadPath+ uploadFileName);		
					if(uploadFile.exists()){
						System.out.print("save as modify name becase of already exists fileName=>");
						uploadFileName = new Date().getTime() + uploadFileName;
						//System.out.println(uploadFileName);
						uploadFile = new File(uploadPath + uploadFileName);
					}
					try {
						file.transferTo(uploadFile);
					} catch (Exception e) {
						System.out.println("upload error");
					}
					boardModel.setFileName(originalFileName);
					boardModel.setSavedFileName(uploadFileName);					
				}else{
					session.setAttribute("writeErrorCode", 2);
				}//			
		}
		String content =  boardModel.getContent().replaceAll("\r\n", "<br />");		
		boardModel.setContent(content);
		service.writeArticle(boardModel);				
		return "redirect:list.do";
	}
~~~

2. list.jsp에 다음과 같은 코드를 넣고 body onload에서 errCodeCheck()를 호출하게 바꾼다

list.jsp

~~~jsp
function errCodeCheck(){
	var errCode = parseInt("${writeErrorCode}");	
	if(errCode != null || errCode != ""){		
		switch (errCode) {
		case 1:	alert("too large size file...no upload!");<c:remove var="writeErrorCode"  />	break;
		case 2:	alert("upload only doc,hwp,pdf,png,jpg,gif!");<c:remove var="writeErrorCode"  />break;
		}
	}	
	selectedOptionCheck();
}	

<body onload="errCodeCheck()">
~~~

3. view.jsp에 이미지 이름을 수정한다 (91~92행)

~~~jsp
<span class="date">첨부파일:&nbsp;
			<a href="get_image.do?filename=${board.savedFileName}" 	target="_blank">${board.savedFileName}</a></span></td>
~~~

4. BoardController에 get_image.do 요청이 처리되도록 메소드를 새로 작성한다

~~~java
    @RequestMapping("/get_image.do")
	public void getImage(HttpServletRequest request, HttpSession session, 
			                       HttpServletResponse response){
		String filename=request.getParameter("filename");
		String filePath=session.getServletContext().getRealPath("/")+"WEB-INF/files/"+filename;
		System.out.println("filename: "+filePath);
		BufferedOutputStream out=null;
		InputStream in=null;
		try {
			response.setContentType("image/jpeg");
			response.setHeader("Content-Disposition", "inline;filename="+filename);
			File file=new File(filePath);
			in=new FileInputStream(file);
			out=new BufferedOutputStream(response.getOutputStream());
			int len;
			byte[] buf=new byte[1024];
			while ( (len=in.read(buf)) > 0) {
				out.write(buf,0,len);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println("파일 전송 에러");
		} finally {
			if ( out != null ) try { out.close(); }catch(Exception e){}
			if ( in != null ) try { in.close(); }catch(Exception e){}
		}
		
	}
~~~

5. view.jsp에 이미지를 다운로드하는 방법을 경로가 직접 노출되지 않고 게시물 번호로 넘어가게 수정한다

~~~jsp
<span class="date">첨부파일:&nbsp;
			<a href="get_image.do?idx=${board.idx}" 	target="_blank">${board.savedFileName}</a></span></td>
~~~

6. BoardController의 view.do를 처리하는 메소드에서 게시물 보기를 할 때마다 해당 게시물이 세션에 저장되도록 수정한다

~~~java
  @RequestMapping("/view.do")
	public ModelAndView boardView(HttpServletRequest request){		
		int idx = Integer.parseInt(request.getParameter("idx"));			
		BoardModel board = service.getOneArticle(idx); // get selected article model
		service.updateHitcount(board.getHitcount()+1, idx); // update hitcount		
		List<BoardCommentModel> commentList = service.getCommentList(idx); // get comment list		
		request.getSession().setAttribute("board", board);
		ModelAndView mav = new ModelAndView();
		mav.addObject("board", board);
		mav.addObject("commentList", commentList);
		mav.setViewName("/board/view");
		return mav;
	}

~~~

7. BoardController에 get_image.do 요청이 처리되도록 메소드를 새로 작성한다

~~~java
@RequestMapping("/get_image.do")
	public void getImage(HttpServletRequest request, HttpSession session,  HttpServletResponse response){
		int idx=0;
		try{
			idx = Integer.parseInt(request.getParameter("idx"));		
		}catch(NumberFormatException e){
			System.out.println("idx not number");
			return;
		}
		BoardModel board = (BoardModel) session.getAttribute("board");
		if(board !=null && idx==board.getIdx()){
			String filename=board.getSavedFileName();
			String filePath=session.getServletContext().getRealPath("/")+"WEB-INF/files/"+filename;
			System.out.println("찾는 파일 filename: "+filePath);
			BufferedOutputStream out=null;
			InputStream in=null;
			try {
				response.setContentType("image/jpeg");
				response.setHeader("Content-Disposition", "inline;filename="+filename);
				File file=new File(filePath);
				in=new FileInputStream(file);
				out=new BufferedOutputStream(response.getOutputStream());
				int len;
				byte[] buf=new byte[1024];
				while ( (len=in.read(buf)) > 0) {
					out.write(buf,0,len);
				}
			}catch(Exception e){
				e.printStackTrace();
				System.out.println("파일 전송 에러");
			} finally {
				if ( out != null ) try { out.close(); }catch(Exception e){}
				if ( in != null ) try { in.close(); }catch(Exception e){}
			}
		}			
	}		

~~~



### 암호화 처리

1. http://www.openeg.co.kr/403 에서 제일 위에 있는 OpenCrypt.java를 복사해 common.utils 패키지에 저장한다

~~~java
package kr.co.openeg.lab.common.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class OpenCrypt {

	 public static byte[] getSHA256(String source, String salt) {
           byte byteData[]=null;
           try{
               MessageDigest md = MessageDigest.getInstance("SHA-256"); 
               md.update(source.getBytes()); 
               md.update(salt.getBytes()); 
               byteData= md.digest();  
               System.out.println("원문: "+source+ "   SHA-256: "+
                                     byteData.length+","+byteArrayToHex(byteData));
           }catch(NoSuchAlgorithmException e){
               e.printStackTrace(); 
           }
           return byteData;
     }
	 	 
	  public static byte[] generateKey(String algorithm,int keySize) throws NoSuchAlgorithmException {
		 
	       KeyGenerator keyGenerator = KeyGenerator.getInstance(algorithm);	 
	       keyGenerator.init(keySize);
	       SecretKey key = keyGenerator.generateKey();
	       return key.getEncoded();	 
}	

 public static String aesEncrypt(String msg, byte[] key) throws Exception {
       SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        String iv = "AAAAAAAAAAAAAAAA";
        cipher.init(Cipher.ENCRYPT_MODE, 
        		       skeySpec,
        		       new IvParameterSpec(iv.getBytes()));        
        byte[] encrypted = cipher.doFinal(msg.getBytes());     
        return  byteArrayToHex(encrypted);
 }
	 
public static String aesDecrypt(String msg,byte[] key ) throws Exception {
 	        SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
	        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
	        String iv = "AAAAAAAAAAAAAAAA";
	        cipher.init(Cipher.DECRYPT_MODE, 
	        		       skeySpec,
	        		       new IvParameterSpec(iv.getBytes()));  
	        byte[] encrypted = hexToByteArray(msg);
	        byte[] original = cipher.doFinal(encrypted);  
	        return new String(original); 
}
	 
	 public static byte[] hexToByteArray(String hex) {
		    if (hex == null || hex.length() == 0) {
		        return null;
		    }
		 
		    byte[] ba = new byte[hex.length() / 2];
		    for (int i = 0; i < ba.length; i++) {
		        ba[i] = (byte) Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
		    }
		    return ba;
		}
		 
		// byte[] to hex
		public static String byteArrayToHex(byte[] ba) {
		    if (ba == null || ba.length == 0) {
		        return null;
		    }
		 
		    StringBuffer sb = new StringBuffer(ba.length * 2);
		    String hexNumber;
		    for (int x = 0; x < ba.length; x++) {
		        hexNumber = "0" + Integer.toHexString(0xff & ba[x]);
		 
		        sb.append(hexNumber.substring(hexNumber.length() - 2));
		    }
		    return sb.toString();
		} 
	 
}

~~~



2. MemberService.java를 다음과 같이 작성한다

~~~java
package kr.co.openeg.lab.member.service;

import java.util.UUID;

import javax.annotation.Resource;

import kr.co.openeg.lab.common.utils.OpenCrypt;
import kr.co.openeg.lab.member.dao.MemberDao;
import kr.co.openeg.lab.member.model.MemberModel;
import kr.co.openeg.lab.member.model.SecVO;

import org.springframework.stereotype.Service;

@Service
public class MemberService {  
	@Resource(name="memberDao")
	private MemberDao dao;
	
    public void deleteMember(MemberModel memberModel){
    	dao.deleteMember(memberModel);
    }  
  
    public boolean modifyMember(MemberModel memberModel){
    	try {
    		SecVO sec=dao.selectSecurity(memberModel.getUserId());
    		memberModel.setUserPw(
  	    		   new String(OpenCrypt.getSHA256(memberModel.getUserPw(),sec.getSalt())));
    	    dao.updateMember(memberModel);
    	}catch(Exception e){
    		return false;
    	}
    	return true; 	    
    }  
  
	public int addMember(MemberModel memberModel) {
		if ( dao.selectMember(memberModel.getUserId()) != null ) {
			return 1;
		} else {
		           try {
		        	   byte[] key=OpenCrypt.generateKey("AES",128);
		        	   System.out.println("key length:"+key.length);
		        	   SecVO sec=
new SecVO(memberModel.getUserId(),UUID.randomUUID().toString(),OpenCrypt.byteArrayToHex(key));
		        	   dao.insertSecurity(sec);
		        	   memberModel.setUserName(OpenCrypt.aesEncrypt(memberModel.getUserName(), key));
		               memberModel.setUserPw(new String(OpenCrypt.getSHA256(memberModel.getUserPw(), sec.getSalt())));    
		        	   dao.insertMember(memberModel);		                   
		                   return 3;
		           }catch(Exception e ){
		        	  e.printStackTrace();
			               return 2;
		           }
		}
	}
	
	public MemberModel findMember(String userId ) {
		MemberModel m=dao.selectMember(userId);
		SecVO sec=dao.selectSecurity(userId);
		try {
			m.setUserName(OpenCrypt.aesDecrypt(m.getUserName(), 
					OpenCrypt.hexToByteArray(sec.getSecKey())));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return m;
	}	
}

~~~

3. SecVO.java를 복사해 member.model 패키지에 넣는다

~~~java
package kr.co.openeg.lab.member.model;

public class SecVO {
    private String userId;
    private String salt;
    private String secKey;
    
    public SecVO() {}
	public SecVO(String userId, String salt, String secKey) {
		super();
		this.userId = userId;
		this.salt = salt;
		this.secKey = secKey;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public String getSecKey() {
		return secKey;
	}
	public void setSecKey(String secKey) {
		this.secKey = secKey;
	}

	
}

~~~

4. member.xml에 SecVO를 처리할 SQL을 추가한다

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE sqlMap      
    PUBLIC "-//ibatis.apache.org//DTD SQL Map 2.0//EN"      
    "http://ibatis.apache.org/dtd/sql-map-2.dtd">
    
<sqlMap namespace="member">
	<typeAlias alias="MemberModel" type="kr.co.openeg.lab.member.model.MemberModel"/>
	<typeAlias alias="MemberSecurity" type="kr.co.openeg.lab.member.model.MemberSecurity"/>
	<typeAlias alias="SecVO" type="kr.co.openeg.lab.member.model.SecVO"/>

    <select id="selectSecurity" parameterClass="String" resultClass="SecVO">
    	select salt,secKey from openeg_security where userId=#userId#
    </select>    
    <insert id="insertSecurity" parameterClass="SecVO">
    	insert into openeg_security(userId,salt,secKey)  
    	values(#userId#,#salt#,#secKey#)
    </insert>
	
	
	<select id="selectOneMember" parameterClass="int" resultClass="MemberModel">
		select idx, userId, userPw, userName, pinNo,joinDate
		from board_member
		where idx = #idx#
	</select>
	
	<select id="selectAllMember" resultClass="MemberModel">
		select idx, userId, userPw, userName, pinNo,joinDate
		from board_member
	</select>
	
	<select id="findByUserId" parameterClass="String" resultClass="MemberModel">
		select 
			idx,
			userId,
			userPw,
			userName,
			pinNo,
			joinDate
		from board_member
		where userId = #userId#
	</select>
	
	<delete id="deleteMember" parameterClass="MemberModel">
		delete from board_member where userId=#userId#
	</delete>	
	
	<insert id="addMember" parameterClass="MemberModel">
		insert into board_member(userId, userPw, userName, pinNo,joinDate)
		values(#userId#, #userPw#, #userName#, #pinNo#,CURDATE())
	</insert>	
	<update id="updateMember" parameterClass="MemberModel">
		update  board_member  set
		   userPw=#userPw#, 
		   userName=#userName#,
		   pinNo=#pinNo#
		where 
		   userId=#userId#
	</update>	
	
	
	<insert id="addMemberSecurity" parameterClass="MemberSecurity">
		insert into openeg_security(userId, salt,secKey)
		                 values(#userId#, #salt#,#secKey#)
	</insert>	
	
	<update id="updateMemberSecurity" parameterClass="MemberSecurity">
		update  openeg_security
		      set  salt=#salt#,
		            secKey=#secKey#,
		      where userId=#userId#
	</update>	
	
	<select id="findMemberSecurityByUserId" parameterClass="String" resultClass="MemberSecurity">
		select userId,
	              salt,
	              secKey
		from  openeg_security
		where userId = #userId#
	</select>	
</sqlMap>

~~~



5. MemberDao.java에 SecVO를 처리할 메소드를 추가한다

~~~java
package kr.co.openeg.lab.member.dao;

import kr.co.openeg.lab.member.model.MemberModel;
import kr.co.openeg.lab.member.model.SecVO;
;
public interface MemberDao {
	void insertMember(MemberModel memberModel);
	void deleteMember(MemberModel memberModel);
	void updateMember(MemberModel memberModel);
	MemberModel selectMember(String userId);
	void insertSecurity(SecVO salt);
	SecVO selectSecurity(String userId);	
}

~~~



6. MemberDaoImpl.java에 SecVO를 처리할 메소드를 추가한다

~~~java
package kr.co.openeg.lab.member.dao;

import kr.co.openeg.lab.member.model.MemberModel;
import kr.co.openeg.lab.member.model.SecVO;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;


public class MemberDaoImpl extends SqlMapClientDaoSupport implements MemberDao{

	@Override
	public void insertMember(MemberModel memberModel) {
		getSqlMapClientTemplate().insert("member.addMember", memberModel);
	}

	@Override
	public MemberModel selectMember(String userId) {
		return (MemberModel) getSqlMapClientTemplate().queryForObject("member.findByUserId", userId);
	}

	@Override
	public void deleteMember(MemberModel memberModel) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().delete("member.deleteMember", memberModel);
	}

	@Override
	public void updateMember(MemberModel memberModel) {
		// TODO Auto-generated method stub
		getSqlMapClientTemplate().update("member.updateMember", memberModel);
	}
	
	@Override
	public void insertSecurity(SecVO sec) {
		getSqlMapClientTemplate().insert("member.insertSecurity", sec);		
	}

	@Override
	public SecVO selectSecurity(String userId) {	
		return (SecVO)getSqlMapClientTemplate().queryForObject("member.selectSecurity",userId);
	}


}

~~~

7. LoginService.java에서 사용자가 로그인 요청 시 입력한 패스워드는 암호화 되어 있지 않으므로 그 값을 SHA256 암호화하여 db에서 찾고 사용자 이름은 AES복호화하여 model에 저장하도록 한다

~~~java
package kr.co.openeg.lab.login.service;

import javax.annotation.Resource;

import kr.co.openeg.lab.common.utils.OpenCrypt;
import kr.co.openeg.lab.login.dao.LoginDao;
import kr.co.openeg.lab.login.model.LoginSessionModel;
import kr.co.openeg.lab.login.model.SecurityModel;
import kr.co.openeg.lab.member.dao.MemberDao;
import kr.co.openeg.lab.member.model.SecVO;

import org.springframework.stereotype.Service;

@Service
public class LoginService {	

	@Resource(name="loginDao")
	private LoginDao dao;

	@Resource(name="memberDao")
	private MemberDao mdao;	

	public LoginSessionModel checkUserId(String userId) {
		return dao.selectUserId(userId);		
	}	

	public LoginSessionModel checkUserId(String userId, String userPw) {
		SecVO sec=mdao.selectSecurity(userId);
		userPw=new String(OpenCrypt.getSHA256(userPw,sec.getSalt()));
		LoginSessionModel  m= dao.selectUserId(userId, userPw);
		try {
	              m.setUserName(OpenCrypt.aesDecrypt(m.getUserName(), OpenCrypt.hexToByteArray(sec.getSecKey())));
		} catch (Exception e) {						
e.printStackTrace();
		}
		return m;
	}
	
	public SecurityModel checkSecurity(String userId) {
		// TODO Auto-generated method stub
		return dao.checkSecurity(userId);
	}

	public void updateSecurity(SecurityModel sec) {
		dao.updateSecurity(sec);
	}	
	
	public void insertSecurity(SecurityModel sec) {
		dao.insertSecurity(sec);
	}


}

~~~


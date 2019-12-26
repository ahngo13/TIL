# 12/19

### 아키텍쳐 다이어그램

![ArchitectureDiagram.PNG](https://github.com/ahngo13/TIL/blob/master/lecture/1219/ArchitectureDiagram.PNG?raw=true)



### ARP 스푸핑

로컬에서 통신하고 있는 서버와 클라이언트의 IP 주소에 대한 데이터 링크 계층의 MAC 주소를 공격자의 MAC 주소로 속여, 클라이언트에서 서버로 가는 패킷이나 서버에서 클라이언트로 가는 패킷이 공격자에게 향하게 함으로써 랜의 통신 흐름을 왜곡한다.

서버와 클라이언트 사이에서 패킷을 가로챔



#### ARP 스푸핑 테스트

1. WinClient Tomcat server 실행
2. ubuntu server 터미널에서 arp -a로 ARP 요청을 이용한 네트워크 연결을 확인
   - 처음에는 몇 개 안 나옴
3. kali linux(attecker)에서 ifconfig로 MAC Address를 확인한다. (추후에 ubuntu server 터미널에서 arp -a로 확인 가능)
4. kali linux(attecker)에서 ettercap -T -i eth0 -M arp:remote /192.168.111.2// /192.168.111.100// 입력 후 WireShark 실행
5. WinClient에서 192.168.111.100:8080/MyWeb 접속해서 id, pw 입력 후 로그인 버튼 클릭
6. kali linux(attecker) WireShark에서 http로 검색하고 해당 항목을 마우스 오른쪽 → Follow → TCP로 넘어온 패킷을 확인 (id, pw가 확인되는 것을 볼 수 있음)




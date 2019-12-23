# 12/23

### docker

inc에서 출시한 오픈 소스 컨테이너 프로젝트

aws, google cloud platform, microsoft azure 등의 클라우드 서비스에서 공식 지원



### 왜 인기 있을까?

- 복잡한 리눅스 애플리케이션을 컨테이너로 묶어서 실행할 수 있기 때문

- 개발, 테스트, 서비스 환경을 하나로 통일하여 효율적으로 관리할 수 있기 때문

- 컨테이너를 전세계 사람들과 공유 가능



- 리눅스 컨테이너 기술 활용

- github와 비슷한 방식의 docker hub 제공

- 컨테이너는 가상화보다 훨씬 가벼운 기술



### 가상머신의 등장

- 컴퓨터 안에서 컴퓨터를 만들어내기 위한 시도

- 컴퓨터 성능, 서버 성능이 점점 좋아짐

- 서버가 놀게 되었음 → 서버에 가상머신을 여러개 띄워서 일을 더 시키자!

- IT 기술이 보편화되면서 서버도 많아졌음 → 서버 자체를 가상머신에 넣어서 돌리자!

- 가상머신에 각종 서버 프로그램, DB 등을 설치하여 애플리케이션이나 웹사이트를 실행

- 미리 구축한 가상 머신 이미지를 여러 서버에서 복사하여 실행하면 이미지 하나로 서버를 계속 만들어 낼 수 있음

- 가상화 기술을 이용하여 서버를 임대해주는 서비스가 **클라우드 서비스**



### 가상머신의 문제점

- 컴퓨터를 통째로 만들어내다보니 각종 성능 손실이 발생 → 인텔과 AMD는 CPU 안에 가상화 기능을 넣기 시작 → 그래도 느림 → 호스트와 커널을 공유하는 반가상화 기술 등장
- 이러나 저러나 가상머신은 완전한 컴퓨터(항상 게스트 OS를 설치해야 함) → 이미지 안에 OS가 포함되기 때문에 이미지 용량이 커짐(네트워크로 가상화 이미지를 주고 받는 건 꽤 부담스러움)
- 오픈소스 가상화 소프트웨어는 OS 가상화에만 주력(배포와 관리 기능이 부족)



### 리눅스 컨테이너

- 가상 머신의 성능 문제가 있다보니 리눅스 컨테이너가 나옴

- 컨테이너 안에 가상 공간을 만들지만 실행파일을 호스트에서 직접 실행

- 리눅스 커널의 cgroups와 namespaces가 제공하는 기술(가상화가 아닌 격리)

- 도커는 리눅스 컨테이너를 사용
  - 초기에는 리눅스 컨테이너를 기반으로 구현
  - 버전 0.9부터는 LXC를 대신하는 libcontainer를 개발하여 사용
  - 실행옵션으로 선택가능



### 도커의 특징

- 도커는 게스트 OS를 설치하지 않음(vmware나 virtual box는 하드웨어 구성 OS 설치부터 함)
  - 이미지에 서버 운영을 위한 프로그램과 라이브러리만 격리해서 설치
  - 이미지 용량이 크게 줄어듦
  - 호스트와 OS자원(시스템 콜)을 공유
- 도커는 하드웨어 가상화 계층이 없음
  - 메모리 접근, 파일 시스템, 네트워크 전송 속도가 가상 머신에 비해 월등히 빠름
  - 호스트와 도커 컨테이너 사이의 성능 차이가 크지 않음(오차 범위 안)

- 이미지 생성과 배포에 특화
- 이미지 버전 관리도 제공하고 중앙 저장소에 이미지를 올리고 받을 수 있음(Puch/Pull)

- 다양한 API를 제공하여 원하는 만큼 자동화 가능 개발과 서버 운영에 매우 유용



CI/CD : 개발자를 위한 자동한 프로세스 지속적인 통합

hudson → jenkins



### 도커 이미지

- 이미지는 서비스 운영에 필요한 서버 프로그램, 소스 코드, 컴파일된 실행 파일을 묶은 형태

- 저장소에 올리고 받는 건 이미지(push/pull)



### 컨테이너

- 이미지를 실행한 상태

- 이미지로 여러 개의 컨테이너를 만들 수 있음

- 운영체제로 치면 **이미지는 실행파일**이고 **컨테이너는 프로세스**



### 도커는 이미지의 바뀐 부분을 어떻게 관리하나?

- 유니온 파일 시스템 형식(aufs, btrfs, devicemapper)

- 도커는 베이스 이미지에서 바뀐 부분만 이미지로 생성
- 컨테이너로 실행할 때는 베이스 이미지와 바뀐 부분을 합쳐서 실행

- Docker Hub 및 개인 저장소에서 이미지를 공유할 때 바뀐 부분만 주고 받음



### 서비스 운영 환경과 도커

지금까지는 물리 서버를 직접 운영했음 → 서버 구입과 설치에 돈이 많이 들고 시간이 오래 걸림 → 가상 서버를 임대하여 사용한 만큼만 요금 지불 → 클릭 몇 번 만으로 가상 서버를 생성 → 서버 대수가 많아지면서 사람이 일일이 세팅하기 힘들어짐



### 서버 세팅과 배포는 어떻게?

- immutable infrastructure라는 패러다임이 나옴

→ 한번 설정한 운영환경은 변경하지 않는다는 개념

- 서비스 운영 환경을 이미지로 생성한 뒤 서버에 배포하여 실행

- 서비스가 업데이트되면 운영 환경 자체를 변경하지 않고, 이미지를 새로 생성하여 배포

1. 편리한 관리
2. 확장
3. 테스트
4. 가볍다



### 도커를 요약하면

- 도커는 immutable infrastructure 적용한 프로젝트

- 컨테이너를 싣고다니는 고래

- 서비스 운영환경을 묶어서 손쉽게 배포하고 실행하는 경량 컨테이너 기술



### 도커 설치하기

- 윈도우에서는 Hyper-V로 가상화하여야 도커 사용이 가능



### 참고자료

[**http://www.pyrasis.com/docker.html**](http://www.pyrasis.com/docker.html)



#### 우분투 VMware 이미지 다운로드 

1. https://cafe.naver.com/thisisLinux 에서 Server 압축 실행 파일 다운로드 후 압축 해제

2. C:\Ubuntu\Server\Server.vmx 파일 실행

3. ubuntu / ubuntu 계정으로 로그인



VMware Tools 설치 #1 VM 메뉴 > Install VMware Tools 클릭

![img](https://lh3.googleusercontent.com/b2hO0SjnY15CeYcwSQCrGzJtC3MsLHYk6WFtWLPTr5FKJ5BP-bNd_YS-gczna56bRTrxM9pwbkhcOmIr-P6gjTTopSKK061epxZEL92KF-DGYFxM8l3Nf7DMBwIb-3rNxMwykVRn)



#2 터미널(terminal)![img](https://lh4.googleusercontent.com/5yK6QrmjhO1JQ5G1fbUVHkTM1X9g7gZ1v5JnqVnpwqFIsckkNx_9TzNBsg41VtA83_iD0yUKBYdAMgz5YTvZrT_z7p1FX6WgPTJoXoHUHALsCbZ0N5X6iQXUyiAGI1aO7PaG90jz)![img](https://lh6.googleusercontent.com/LM2zTwp9GcHBpufhlFeK-N2qVmeLxjnOs42uG_65ROM0CBFOMpkhRjJZFW9HJ6wxe3DvF_7sqBGj0dWG6G3hiIcR5SzgJ0l6JUH4hrzdPoPEwqgJ3Rq-jVV1NKvHwIC7hP31k8Sb)

\#3 이하 계속해서 디폴트로 설치 진행

\#4 설치 완료 후 가상머신(우분투) 리부팅



### 빌버 패스워드

아직도 복잡한 비밀번호를 사용하고 있다고?

https://1boon.kakao.com/subusunews/5dfc8da923b9d7597983bced

https://news.sbs.co.kr/news/endPage.do?news_id=N1005573011



### 도커 설치

공식문서 ⇒ https://docs.docker.com/install/linux/docker-ce/ubuntu/



#1 도커 저장소 추가 (아래 내용 추가 후 저장)

root@server:~# gedit /etc/apt/sources.list

deb https://apt.dockerproject.org/repo ubuntu-xenial main



\#2 HTTPS 통신을 위한 패키지와 공개키를 설치

root@server:~# apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common



root@server:~# apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys d58118E89F3A912897C070ADBF76221572C52609D



#4 linux-image extra 및 docker-engine 패키지 설치

root@server:~# apt-get install linux-image-extra-$(uname -r)

root@server:~# apt-get install docker-engine  ⇐ 설치 여부 질문에 Yes 입력



#5 도커 설치 확인

root@server:~# docker version

Client:

 Version:      17.05.0-ce

 API version:  1.29

 Go version:   go1.7.5

 Git commit:   89658be

 Built:        Thu May  4 22:10:54 2017

 OS/Arch:      linux/amd64



Server:

 Version:      17.05.0-ce

 API version:  1.29 (minimum version 1.12)

 Go version:   go1.7.5

 Git commit:   89658be

 Built:        Thu May  4 22:10:54 2017

 OS/Arch:      linux/amd64

 Experimental: false



### 도커 이미지 생성 

#### #1 작업 디렉터리 및 main.go 파일 생성**

root@server:~#cd ~

root@server:~#mkdir docker

root@server:~#cd docker

root@server:~/docker#gedit main.go



// 8080 포트로 대기하는 웹 서버에 /로 요청이 들어오면 Hello Docker!!라는 응답 메시지를 반환

~~~go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("received request")
		fmt.Fprintf(w, "Hello Docker!!")
	})

	log.Println("start server")
	server := &http.Server{Addr: ":8080"}
	if err := server.ListenAndServe(); err != nil {
		log.Println(err)
	}
}

~~~



#### \#2 main.go 실행 및 확인

root@server:~/docker# apt-get install golang-go

root@server:~/docker# go run main.go

2019/12/23 15:00:03 start server

(새 터미널에서)

root@server:~# curl http://localhost:8080/

Hello Docker!!root@server:~# 

(브라우져에서)

![img](https://lh6.googleusercontent.com/DMLSSILGkbJX6EuiVIx3-MY9pUnvBP4raMAzzHo2BidLz2twMOPVV1xRICQpyj9z06Unr_I9U6Vhk1i8Ss1g16xmH1IJWijtmd7_ZDwDhFT3_yFfZHkpJhSngMvlqRia-UGk-S5u)



#### \#3 Dockerfile 작성

~~~
FROM golang:1.9 ← 베이스 이미지를 가져온다. (저장소 이름 생략 → 도커 허브의 공식 이미지)

RUN mkdir /echo ← 컨테이너 내부에 /echo 디렉터리를 생성하라

COPY main.go /echo

CMD [ "go", "run", "/echo/main.go" ]
~~~



#### #4 도커 이미지를 빌드

root@server:~/docker# docker image build -t example/echo:latest .

~~~
Step 1/4 : FROM golang:1.9
1.9: Pulling from library/golang
55cbf04beb70: Pull complete 
1607093a898c: Pull complete 
9a8ea045c926: Pull complete 
d4eee24d4dac: Pull complete 
9c35c9787a2f: Pull complete 
8b376bbb244f: Pull complete 
0d4eafcc732a: Pull complete 
186b06a99029: Pull complete 
Digest: sha256:8b5968585131604a92af02f5690713efadf029cc8dad53f79280b87a80eb1354
Status: Downloaded newer image for golang:1.9
 ---> ef89ef5c42a9
Step 2/4 : RUN mkdir /echo
 ---> Running in 6dc120a62ec4
 ---> 01e1e24ca0cb
Removing intermediate container 6dc120a62ec4
Step 3/4 : COPY main.go /echo
 ---> 79eef696796c
Removing intermediate container 674eba754423
Step 4/4 : CMD go run /echo/main.go
~~~

→ 1/4, 2/4, 3/4, 4/4 나누어서 받아오는 것을 확인할 수 있음



#### #5 도커 이미지 확인

root@server:~/docker# **docker image ls**

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE

example/echo        latest              bc3210a80f17        4 minutes ago       750MB

golang              1.9                 ef89ef5c42a9        17 months ago       750MB

root@server:~/docker#**docker images**

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE

example/echo        latest              bc3210a80f17        5 minutes ago       750MB

golang              1.9                 ef89ef5c42a9        17 months ago       750MB



#### #6 도커 컨테이너 실행

root@server:~/docker#docker container run -p 9000:8080 example/echo:latest

example/echo:latestroot@server:~/docker#docker container run -p 9000:8080 -d  

example/echo:latestroot@server:~/docker#docker container run -p 9000:8080 -it 

example/echo:latestroot@server:~/docker#docker container run -p 9000:8080 -itd 

example/echo:latestroot@server:~/docker#docker container run -p 9000:8080 -it 

example/echo:latest /bin/bashroot@server:~/docker#docker container run -p 9000:8080 -itd example/echo:latest /bin/bash



root@server:~/docker# docker container run -p 9003:8080 -itd --name CONTAINER_NAME example/echo:latest /bin/bash

root@server:~/docker# docker container run -p 8080 -itd example/echo:latest /bin/bash



입력을 받을 수 없는 경우 ⇒ docker container stop CONTAINER_ID

입력을 받을 수 있는 경우 ⇒ Ctrl+C or Ctrl+PQ

쉘이 제공되는 경우 ⇒ exit or Ctrl+PQ



#### #7 백그라운드에 실행되는 컨테이너에 접속

root@server:~/docker#docker attach CONTAINER_ID



#### #8 도커 컨테이터에서 빠져 나오는 방법

입력을 받을 수 없는 경우 ⇒ (다른 터미널에서) docker container stop *CONTAINER_ID_or_NAME*

입력을 받을 수 있는 경우 ⇒ Ctrl+C or Ctrl+PQ

쉘이 제공되는 경우 ⇒ exit or Ctrl+PQ



#### #9 도커 컨테이너 실행/중지

root@server:~/docker# docker container stop CONTAINER_ID

root@server:~/docker# docker container start CONTAINER_ID



#### #10 도커 컨테이너 상태 확인

root@server:~/docker#docker container ps

root@server:~/docker#docker container ps -a

root@server:~/docker#docker container ls

root@server:~/docker#docker container ls -a



#### #11실행 중인 컨테이너를 모두 중지

root@server:~/docker#docker container stop **$(docker container ls -q)**

$(docker container ls -q) : 컨테이너의 ID를 가져온다



https://hub.docker.com/ 회원가입



레퍼지터리/이미지명:태그명



#### 도커 이미지 태그 설정

~~~
root@server:~/docker# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
example/echo        latest              11c732eb2923        About an hour ago   750MB
<none>              <none>              be867a4ba9d0        2 hours ago         750MB
golang              1.9                 ef89ef5c42a9        17 months ago       750MB
root@server:~/docker# docker image tag example/echo:latest example/echo:1.0
root@server:~/docker# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
example/echo        1.0                 11c732eb2923        About an hour ago   750MB
example/echo        latest              11c732eb2923        About an hour ago   750MB
<none>              <none>              be867a4ba9d0        2 hours ago         750MB
golang              1.9                 ef89ef5c42a9        17 months ago       750MB

~~~



#### 도커 이미지를 토커 허브에 등록

#1 이미지명을 **DOCKERHUB_ID/**IMAGE_NAME:TAG_NAME 형식을 준수

#2 docker login 명령어로 docker hub에 로그인

#3 docker image push 명령어로 이미지를 등록

~~~
root@server:~/docker# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
example/echo        1.0                 11c732eb2923        About an hour ago   750MB
example/echo        latest              11c732eb2923        About an hour ago   750MB
<none>              <none>              be867a4ba9d0        2 hours ago         750MB
golang              1.9                 ef89ef5c42a9        17 months ago       750MB
root@server:~/docker# docker image tag example/echo:latest myanjini/echo:latest
root@server:~/docker# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
example/echo        1.0                 11c732eb2923        2 hours ago         750MB
example/echo        latest              11c732eb2923        2 hours ago         750MB
myanjini/echo       latest              11c732eb2923        2 hours ago         750MB
<none>              <none>              be867a4ba9d0        2 hours ago         750MB
golang              1.9                 ef89ef5c42a9        17 months ago       750MB
root@server:~/docker# docker login -u myanjini
Password: 
Login Succeeded
root@server:~/docker# docker image push myanjini/echo:latest

~~~


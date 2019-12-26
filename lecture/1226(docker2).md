# 12/26

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

태그를 쓰는 이유는 versionning 구분하기 위함

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



#### Dockerfile을 이용한 도커 이미지 생성 시 유의사항

Dockerfile의 명령어 단위로 레이어가 생성되므로 불필요한 명령어 실행을 자제



root@server:~/docker# gedit Dockerfile

~~~
FROM ubuntu

RUN mkdir /echo - echo라는 디렉토리를 만듦

RUN fallocate -l 100m /echo/dummy 

RUN rm /echo/dummy
~~~

root@server:~/docker# docker build -t falloc100m . → 마지막 . 은 이미지 경로

root@server:~/docker# docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE

***falloc100m          latest              587c62703027        8 seconds ago       169MB***

ahngo13/echo        latest              be1f41d64237        2 days ago          750MB

***ubuntu              latest              549b9b86cb8d        6 days ago          64.2MB***

golang              latest              a1072a078890        2 weeks ago         803MB

→ 명령어가 길면 용량이 커짐, 불필요한 명령어의 갯수를 줄이면 된다.



> FROM ubuntu
>
> RUN mkdir /echo **&& fallocate -l 100m /echo/dummy && rm /echo/dummy**
>

 or

> FROM ubuntu
>
> RUN mkdir /echo && **\\**
>
> fallocate -l 100m /echo/dummy && **\\**
>
> rm /echo/dummy



root@server:~/docker# docker build -t recommanded .



root@server:~/docker# docker images

> REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
>
> **recommanded         latest              f53fa5589f6c        12 seconds ago      64.2MB**
>
> falloc100m          latest              587c62703027        12 minutes ago      169MB
>
> ahngo13/echo        latest              be1f41d64237        2 days ago          750MB
>
> **ubuntu              latest              549b9b86cb8d        6 days ago          64.2MB**
>
> golang              latest              a1072a078890        2 weeks ago  

→ 명령어를 한번에 이어서 처리하면 이미지 용량이 적어짐을 확인할 수 있다.



#### 아파치 웹 서버 설치하고 로컬에 있는 hello.html 파일을 컨테이너의 /var/www/html 디렉터리로 복사

#1 작업 디렉터리 생성 및 이동

> root@server:~/docker# cd ~
>
> root@server:~# mkdir webserver
>
> root@server:~# cd webserver
>
> root@server:~/webserver# 



#2 Dockerfile 생성

> FROM ubuntu
>
> RUN apt-get update 
>
> RUN apt-get install apache2 **-y**  
>
> **← -y : docker build 과정에서 사용자 입력이 발생하면 오류로 처리하므로 사용자 입력이 발생하지 않도록 하기 위한 옵션**
>
> **ADD** hello.html /var/www/html/
>
> **← ADD, COPY 호스트의 파일 또는 디렉터리를 컨테이너 내부로 복사**
>
> - **COPY는 호스트의 로컬 파일만 복사 가능**
> - **ADD는 호스트의 로컬 파일 뿐 아니라 외부 URL 또는 tar 파일도 복사가 가능 (tar 파일인 경우 압축을 해제해서 복사가 이루어진다)**
> - **일반적으로 COPY 사용을 권장(ADD는 보안적으로 취약할 수 있음)**
>
> **WORKDIR** /var/www/html 
>
> **← WORKDIR : cd 명령어와 동일, 명령어 실행 위치를 지정**
>
> RUN **[** "/bin/bash", "-c", "echo hello2 >> hello2.html" **]** 
>
> **← [] 형식의 인자 = JSON 배열 형식 → 쉘을 실행하지 않음을 의미**
>
> **RUN command 형식은 /bin/sh -c command 형식으로 실행**
>
> **EXPOSE** 80 
>
> **← EXPOSE : 이미지에서 노출할 포트를 설정**
>
> **CMD** apachectl -DFOREGROUND
>
> **← CMD : 컨테이너가 실행될 때 마다 실행할 명령어 (반드시 한번만 사용이 가능하다)**



#3 hello.html 파일을 생성

> root@server:~/webserver# echo hello >> hello.html
>
> root@server:~/webserver# ls hello.html
>
> hello.html
>
> root@server:~/webserver# cat hello.html
>
> hello



#4 Dockerfile을 이용하여 이미지 생성

> root@server:~/webserver# docker build -t myimage .



> root@server:~/webserver# docker images
>
> REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
>
> **myimage             latest              1dd323135654        10 seconds ago      188MB**
>
> recommanded         latest              f53fa5589f6c        About an hour ago   64.2MB
>
> falloc100m          latest              587c62703027        About an hour ago   169MB
>
> ahngo13/echo        latest              be1f41d64237        2 days ago          750MB
>
> ubuntu              latest              549b9b86cb8d        6 days ago          64.2MB
>
> golang              latest              a1072a078890        2 weeks ago        



#5 생성된 이미지로 컨테이너 실행

> root@server:~/webserver# docker run -d **-P** --name myserver myimage

-P : 호스트의 빈 포트를 컨테이너에 EXPOSE된 포트로 매핑



#6 포트 확인

> **root@server:~/webserver# docker container ls**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES
>
> bb1566e52c2a        myimage             "/bin/sh -c 'apach..."   2 minutes ago       Up 2 minutes        
>
> 0.0.0.0:32768->80/tcp   myserver
>
> **root@server:~/webserver# docker port myserver**
>
> 80/tcp -> 0.0.0.0:32768
>
> **root@server:~/webserver# docker ps**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES
>
> bb1566e52c2a        myimage             "/bin/sh -c 'apach..."   4 minutes ago       Up 4 minutes        0.0.0.0:32768->80/tcp   myserver



\#7 웹 서버 접속(포트 32768)

![img](https://lh4.googleusercontent.com/B2zZe9pvyYhWB9Y9J66vOK2Nh7SeRAGhAz7FAElu1fsHx7Fff7pd6wSwmNXwNqcv-_dAj6jMTAJtCplG78iiPssd3nhbSzP8Ymz5_1HbOsbjLqZjyVL4f0Yy-UJ9p_db1cUrfACl)![img](https://lh4.googleusercontent.com/oFiyFOGdk87nxmnNpBb_QBdySk4lXY73r2YusiKMtJkYl9WuQ-6t02v0E4rR8WE4rCiImEMrQqazbT9lJ2XVic3hIdFoTy-Sf_VtM_NymavCUuF0AoB9RhF8VMJ2x-t5iPO7WDPg)



컨테이너 중지 → docker container stop CONTAINER_ID_or_NAME

> root@server:~/docker# **docker container stop myserver**
>
> myserver
>
> root@server:~/docker# docker ps
>
> CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES



> root@server:~/docker# docker ps -a
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS               NAMES
>
> bb1566e52c2a        myimage             "/bin/sh -c 'apach..."   29 minutes ago      Exited (137) 51 seconds ago                        myserver



컨테이너 실행 → docker container start CONTAINER_ID_or_NAME

> root@server:~/docker# docker container start myserver
>
> myserver
>
> 
>
> root@server:~/docker# docker ps -a
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                         PORTS                   NAMES
>
> bb1566e52c2a        myimage             "/bin/sh -c 'apach..."   31 minutes ago      Up 17 seconds                  0.0.0.0:32769->80/tcp   myserver



컨테이너 삭제 → docker container rm CONTAINER_ID_or_NAME

→ 컨테이너를 중지하고 삭제 필요

root@server:~/webserver# docker container stop myserver

myserver

root@server:~/webserver# docker container rm myserver

myserverroot@server:~/webserver# docker container ls -a

CONTAINER ID    IMAGE               COMMAND       CREATED             STATUS                 PORTS               NAMES

8c4f9e337753    golang              "/bin/bash"     2 days ago          Exited (100) 2 days ago  

실행 중인 모든 컨테이너를 중지 ⇒ docker container stop $(docker container ls -q)

모든 컨테이너를 삭제 ⇒ docker container rm -f $(docker container ls -aq)



myimage 이미지를 이용해서 mywebserver 컨테이너를 실행

> root@server:~/webserver# **docker run -d -P --name mywebserver myimage**
>
>  7fc896026d799e38d79d32e0f9b92478c54f47cdbe70202c6fa982496dd0c524
>
> root@server:~/webserver# **docker ps**
>
> CONTAINER ID    IMAGE               COMMAND         CREATED             STATUS              PORTS          NAMES
>
> 7fc896026d79    myimage             "/bin/sh -c 'apach..."  5 seconds ago       Up 5 seconds        0.0.0.0:32779->80/tcp  mywebserver
>
> root@server:~/webserver# **docker run -d -P --name mywebserver myimage** 
>
> **⇐ 동일한 이름의 컨테이너가 존재하면 컨테이너 실행시 오류가 발생**
>
> docker: Error response from daemon: Conflict. The container name "/mywebserver" is already in use by container 
>
> "7fc896026d799e38d79d32e0f9b92478c54f47cdbe70202c6fa982496dd0c524". You have to remove (or rename) that container to be able to reuse that name.See 'docker run --help'.
>
> root@server:~/webserver# **docker container stop mywebserver**
>
> mywebserver
>
> root@server:~/webserver# **docker container ps -a**
>
> CONTAINER ID    IMAGE               COMMAND         CREATED             STATUS                     PORTS               NAMES
>
> 7fc896026d79    myimage             "/bin/sh -c 'apach..."  2 minutes ago       Exited (137) 6 seconds ago            mywebserver8c4f9e337753    golang              "/bin/bash"       2 days ago          Exited (100) 2 days ago              zealous_newton
>
> root@server:~/webserver# **docker run -d -P --name mywebserver myimage** 
>
> docker: Error response from daemon: Conflict. The container name "/mywebserver" is already in use by container "7fc896026d799e38d79d32e0f9b92478c54f47cdbe70202c6fa982496dd0c524". You have to remove (or rename) that container to be able to reuse that name.See 'docker run --help'.



> root@server:~/webserver# **docker container rm -f mywebserver ; docker run -d -P --name mywebserver myimage**
>
> mywebserver **⇐ 이전 컨테이너를 강제적으로 삭제하는 과정에서 나온 로그**
>
> e0a8871b29d28b4b22b4cb7ca28b6f2d6fec5ac01b25f0071b0ca0085b104978
>
> root@server:~/webserver# **docker container ps -a**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES
>
> e0a8871b29d2        myimage             "/bin/sh -c 'apach..."   21 seconds ago      Up 20 seconds       0.0.0.0:32771->80/tcp   mywebserver



./../bin/.a.sh

첫번째 점 → 현재 디렉터리

두번째 점 → 상위 디렉터리

세번째 점 → 숨김 파일

네번째 점 → 확장자 구분자

> root@server:~/webserver# **echo hidden >> .hidden_file**
>
> root@server:~/webserver# **ls**
>
> Dockerfile  hello.html
>
> root@server:~/webserver# **ls -an**
>
> 합계 20
>
> drwxr-xr-x  2 0 0 4096 12월 26 11:45 .
>
> drwx------ 22 0 0 4096 12월 26 10:25 ..
>
> -rw-r--r--  1 0 0    7 12월 26 11:45 .hidden_file
>
> -rw-r--r--  1 0 0  214 12월 26 10:49 Dockerfile
>
> -rw-r--r--  1 0 0    6 12월 26 10:49 hello.html
>
> root@server:~/webserver# **ls -a**
>
> .  ..  .hidden_file  Dockerfile  hello.html



동일한 이름의 컨테이너를 삭제 후 실행하는 쉘 스크립트를 작성

root@server:~/webserver# gedit run.sh

~~~shell
#!/bin/bash

#1 명령어 형식 체크
if [ $# == 0 ]
then
	echo 명령어 형식이 잘못되었습니다.
	echo [사용법] ./run.sh container_name_or_id
	exit 1
 
	
fi
#2 컨테이너 실행 전 컨테이너 리스트 출력
docker container ps -a

#3 동일 이름의 컨테이너를 조회
cid=$(docker container ps -a --filter="name=^/$1$" -q)

#4 동일 이름의 컨테이너가 존재하는 경우 해당 컨테이너를 삭제 후 메시지를 출력

if [ -n "$cid" ]
then
	docker container rm -f $cid
	echo $1 이름의 컨테이너\($cid\)를 삭제했습니다.
fi

#5 컨테이너를 실행
docker container run --name $1 -d -P myimage

#6 컨테이너 실행 후 컨테이너 리스트 출력
docker container ps -a

#7 쉘 종료
exit 0
~~~

> root@server:~/webserver# **chmod 755 run.sh**
>
> root@server:~/webserver# **ls -l**
>
> 합계 12
>
> -rw-r--r-- 1 root root 214 12월 26 10:49 Dockerfile
>
> -rw-r--r-- 1 root root   6 12월 26 10:49 hello.html
>
> -rwxr-xr-x 1 root root 752 12월 26 13:35 run.sh



> root@server:~/webserver# **./run.sh mywebserver**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS                   NAMES
>
> e0a8871b29d2        myimage             "/bin/sh -c 'apach..."   2 hours ago         Up 2 hours                 0.0.0.0:32771->80/tcp   mywebserver
>
> db81d4cedc4a        549b9b86cb8d        "/bin/sh -c 'apt-g..."   3 hours ago         Exited (127) 3 hours ago                           upbeat_banach
>
> 1456a2bebd8a        549b9b86cb8d        "/bin/sh -c 'mkdir..."   4 hours ago         Exited (1) 4 hours ago                             affectionate_dijkstra
>
> 9c10135cad18        golang              "/bin/bash"              2 days ago          Exited (130) 4 hours ago                           jolly_wiles
>
> 6fdf41c6be7b        be1f41d64237        "/bin/bash"              2 days ago          Created                                            ccc
>
> d02485c0588d        be1f41d64237        "/bin/bash"              2 days ago          Exited (0) 2 days ago                              stoic_shaw
>
> 6a09b4ff2ca9        be1f41d64237        "/bin/bash"              2 days ago          Exited (0) 2 days ago                              adoring_swanson
>
> 1e084672c832        be1f41d64237        "/bin/bash"              2 days ago          Exited (130) 2 days ago                            flamboyant_aryabhata
>
> 906d1f9ac4bc        be1f41d64237        "/bin/bash"              2 days ago          Exited (0) 2 days ago                              naughty_wozniak
>
> 5649aa64f7d2        be1f41d64237        "/bin/bash"              2 days ago          Exited (130) 2 days ago                            sharp_poincare
>
> 9db5c7ead8ce        be1f41d64237        "go run /echo/main.go"   2 days ago          Exited (1) 2 days ago                              competent_hamilton
>
> 835b4ceb849d        be1f41d64237        "go run /echo/main.go"   2 days ago          Exited (1) 2 days ago                              compassionate_jones
>
> 3af2b48e07fd        be1f41d64237        "go run /echo/main.go"   2 days ago          Exited (2) 2 days ago                              inspiring_benz
>
> e0a8871b29d2
>
> mywebserver 이름의 컨테이너(e0a8871b29d2)를 삭제했습니다.
>
> ac20ba28d9adc80ce2cececcbf03f254d5f0d43aaae3b37b9c6b10d7601e9611
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED                  STATUS                     PORTS                   NAMES
>
> ac20ba28d9ad        myimage             "/bin/sh -c 'apach..."   Less than a second ago   Up Less than a second      0.0.0.0:32772->80/tcp   mywebserver
>
> db81d4cedc4a        549b9b86cb8d        "/bin/sh -c 'apt-g..."   3 hours ago              Exited (127) 3 hours ago                           upbeat_banach
>
> 1456a2bebd8a        549b9b86cb8d        "/bin/sh -c 'mkdir..."   4 hours ago              Exited (1) 4 hours ago                             affectionate_dijkstra
>
> 9c10135cad18        golang              "/bin/bash"              2 days ago               Exited (130) 4 hours ago                           jolly_wiles
>
> 6fdf41c6be7b        be1f41d64237        "/bin/bash"              2 days ago               Created                                            ccc
>
> d02485c0588d        be1f41d64237        "/bin/bash"              2 days ago               Exited (0) 2 days ago                              stoic_shaw
>
> 6a09b4ff2ca9        be1f41d64237        "/bin/bash"              2 days ago               Exited (0) 2 days ago                              adoring_swanson
>
> 1e084672c832        be1f41d64237        "/bin/bash"              2 days ago               Exited (130) 2 days ago                            flamboyant_aryabhata
>
> 906d1f9ac4bc        be1f41d64237        "/bin/bash"              2 days ago               Exited (0) 2 days ago                              naughty_wozniak
>
> 5649aa64f7d2        be1f41d64237        "/bin/bash"              2 days ago               Exited (130) 2 days ago                            sharp_poincare
>
> 9db5c7ead8ce        be1f41d64237        "go run /echo/main.go"   2 days ago               Exited (1) 2 days ago                              competent_hamilton
>
> 835b4ceb849d        be1f41d64237        "go run /echo/main.go"   2 days ago               Exited (1) 2 days ago                              compassionate_jones
>
> 3af2b48e07fd        be1f41d64237        "go run /echo/main.go"   2 days ago               Exited (2) 2 days ago                              inspiring_benz



아래와 같은 형태로 기존의 컨테이너를 삭제하고 새롭게 컨테이너를 생성하는 스크립트를 작성하시오.

[사용법] ./run.sh IMAGE_NAME CONTAINER_NAME

1. CONTAINER_NAME 일치하는 컨테이너가 존재하는지 확인
2. 존재하는 경우 해당 컨테이너를 삭제
3. IMAGE_NAME 이미지를 이용해서 CONTAINER_NAME 이름의 컨테이너를 생성

~~~sh
#!/bin/bash

#1 명령어 형식 체크 (파라미터 갯수)
if [ $# -ne 2 ]
then
	echo 명령어 형식이 잘못되었습니다.
	echo [사용법] ./run.sh IMAGE_NAME CONTAINER_NAME
	exit 1
 
	
fi
#2 컨테이너 실행 전 컨테이너 리스트 출력
docker container ps -a

#3 동일 이름의 컨테이너를 조회
cid=$(docker container ps -a --filter="name=^/$2$" -q)

#4 동일 이름의 컨테이너가 존재하는 경우 해당 컨테이너를 삭제 후 메시지를 출력

if [ -n "$cid" ]
then
	docker container rm -f $cid
	echo $2 이름의 컨테이너\($cid\)를 삭제했습니다.
fi

#5 컨테이너를 실행
docker container run --name $2 -d -P $1

#6 컨테이너 실행 후 컨테이너 리스트 출력
docker container ps -a

#7 쉘 종료
exit 0
~~~

-d : 백그라운드에서 실행

-P : 호스트의 비어있는 포트를 할당

-p : 포트를 직접 설정

EXPOSE 80 : 80포트로 포트포워딩



root@server:~/webserver# gedit Dockerfile

> FROM ubuntu
>
> ENV workspace /workspace - workspace 라는 이름으로 workspace 디렉토리를 활용가능
>
> RUN mkdir $workspace
>
> WORKDIR $workspace
>
> RUN touch $workspace/mytouchfile



> root@server:~/docker# **docker build -t envimage .**
>
> Sending build context to Docker daemon  3.072kB
>
> Step 1/5 : FROM ubuntu
>
>  ---> 549b9b86cb8d
>
> Step 2/5 : ENV workspace /workspace
>
>  ---> Running in 7b88960cc38b
>
>  ---> f3ef88c4e175
>
> Removing intermediate container 7b88960cc38b
>
> Step 3/5 : RUN mkdir $workspace
>
>  ---> Running in 2f7d1fd9b65d
>
>  ---> 24559a900648
>
> Removing intermediate container 2f7d1fd9b65d
>
> Step 4/5 : WORKDIR $workspace
>
>  ---> 96b4011a24ec
>
> Removing intermediate container 2f530110f225
>
> Step 5/5 : RUN touch $workspace/mytouchfile
>
>  ---> Running in 5d6c0a9eee4d
>
>  ---> d36d3a128b4d
>
> Removing intermediate container 5d6c0a9eee4d
>
> Successfully built d36d3a128b4d
>
> Successfully tagged envimage:latest



> root@server:~/webserver# **docker run -itd envimage /bin/bash**
>
> 72b72b173b3b397860e155fcf92f8166f2446020137e5322287dc4013f356b29
>
> root@server:~/webserver# **docker attach 72b7**
>
> root@72b72b173b3b:/workspace# **echo $workspace**
>
> /workspaceroot@72b72b173b3b:/workspace# exit
>
> exit
>
> 
>
> root@server:~/webserver# **docker run -itd -e workspace=/tmp envimage /bin/bash**
>
> 2bbafc20d4f20c3e886e2170529efe71c9c59683fa9ea833ecd3b6a2ff9b8645
>
> root@server:~/webserver# **docker attach 2bba**
>
> root@2bbafc20d4f2:/workspace# **echo $workspace**
>
> /tmp



#### 호스트와 컨테이너 간 파일 복사 

docker container cp HOST_FILE_PATH CONTAINER_ID_or_NAME:CONTAINER_FILE_PATH

> root@server:~/docker# docker container ls -a
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                   NAMES
>
> 5af41a72f27a        envimage            "/bin/bash"              4 minutes ago       Exited (0) 14 seconds ago                           tender_easley
>
> 09a88d4774bf        f53fa5589f6c        "/bin/bash"              9 minutes ago       Exited (0) 7 minutes ago                            tender_kepler
>
> e586811266c9        myimage             "/bin/sh -c 'apach..."   About an hour ago   Up About an hour            0.0.0.0:32774->80/tcp   mywebserver99
>
> eb974f46df49        myimage             "/bin/sh -c 'apach..."   About an hour ago   Up About an hour            0.0.0.0:32773->80/tcp   mywebserver
>
> db81d4cedc4a        549b9b86cb8d        "/bin/sh -c 'apt-g..."   4 hours ago         Exited (127) 4 hours ago                            upbeat_banach



http://localhost:32773/hello.html 으로 접속

호스트에서 hello3.html을 만들어서 컨테이너 내부의 apache 웹 루트 디렉터리에 저장 후 http://localhost:32773/hello3.html으로 접속



root@server:~/webserver# echo hello3 >> hello3.html

root@server:~/webserver# ls hello3.htmlhello3.html

root@server:~/webserver# cat hello3.htmlhello3

root@server:~/webserver# docker container cp ./hello3.html 

mywebserver:/var/www/html/hello3.html



#### 컨테이너의 파일 또는 디렉터리를 호스트로 복사

docker container cp CONTAINER_ID_or_NAME:FILE_PATH HOST_FILE_PATH



문제: 

mywebserver의 웹 루트 리렉터리(/var/www/html/)에 있는 index.html 파일을 가져와서 자신의 이름을 출력하는 페이지로 변경 후 다시 웹 서버에 적용

http://localhost:32773 접속했을 때 자신의 이름이 출력되는지 확인



> root@server:~/webserver# **docker container cp mywebserver:/var/www/html/index.html .**
>
> root@server:~/webserver# **ls index.htmlindex.html**
>
> root@server:~/webserver# **gedit index.html**
>
> (내용 수정 후 저장)
>
> root@server:~/webserver# **docker container cp ./index.html** 
>
> mywebserver:/var/www/html/
>
> root@server:~/webserver# 



\#docker stats ⇐ 컨테이너의 실시간 자원 사용 현황

CONTAINER           CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS

e586811266c9        0.01%               6.754MiB / 983.8MiB   0.69%               4.05kB / 0B         61.4kB / 0B         57

eb974f46df49        0.01%               7.238MiB / 983.8MiB   0.74%               5.68kB / 1.79kB     528kB / 0B          57



#### MySQL과 워드프레스 연동

#0 작업폴더 생성

root@server:~# mkdir wblog

root@server:~# cd wblog



#1 MySQL 이미지 이용한 데이터베이스 컨테이너를 생성

> root@server:~/wblog# docker run -d --name wordpressdb \
>
> -e MYSQL_ROOT_PASSWORD=passwd \
>
> -e MYSQL_DATABASE=wordpress \
>
> mysql:5.7



\#2 워드프로세스 이미지를 이용한 웹 서버 컨테이너를 생성

https://hub.docker.com/_/wordpress

> root@server:~/wblog# docker run -d \
>
> -e WORDPRESS_DB_PASSWORD=passwd \
>
> --name wordpress \
>
> --link wordpressdb:mysql \ **← 컨테이너의 별명(alias)으로 접근할 수 있도록 설정**
>
> -p 80 \ 
>
> wordpress



root@server:~/wblog# docker ps

> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES
>
> de3b6a8265ab        wordpress           "docker-entrypoint..."   4 minutes ago       Up 4 minutes        0.0.0.0:32775->80/tcp   wordpress
>
> ef1219e40a69        mysql:5.7           "docker-entrypoint..."   7 minutes ago       Up 7 minutes        3306/tcp, 33060/tcp     wordpressdb
>
> e586811266c9        myimage             "/bin/sh -c 'apach..."   2 hours ago         Up 2 hours          0.0.0.0:32774->80/tcp   mywebserver99
>
> eb974f46df49        myimage             "/bin/sh -c 'apach..."   2 hours ago         Up 2 hours          0.0.0.0:32773->80/tcp   mywebserver



\#4 호스트(ubuntu)에서 http://localhost:32775로 접속

5zg7eBkaRcv)7&Kfe(



### 도커 이미지 커밋하기

> root@server:~/webserver# docker commit -m "add hello3.html" mywebserver ahngo13/mywebserverimage:1.0
>
> sha256:fda7edddccba6b55b3242565d5c88399a24ae5c2f752e8998b8e852d020beec2
>
> root@server:~/webserver# docker images
>
> REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
>
> **ahngo13/mywebserverimage   1.0                 fda7edddccba        6 seconds ago       188MB**
>
> envimage                   latest              d36d3a128b4d        2 hours ago         64.2MB
>
> myimage                    latest              1dd323135654        5 hours ago         188MB
>
> recommanded                latest              f53fa5589f6c        6 hours ago         64.2MB
>
> falloc100m                 latest              587c62703027        6 hours ago         169MB
>
> ahngo13/echo               latest              be1f41d64237        3 days ago          750MB
>
> wordpress                  latest              a9f43b7c47db        6 days ago          539MB
>
> ubuntu                     latest              549b9b86cb8d        7 days ago          64.2MB
>
> golang                     latest              a1072a078890        2 weeks ago         803MB
>
> mysql                      5.7                 1e4405fe1ea9        4 weeks ago         437MB



ahngo13/mywebserverimage:1.0 이미지를 이용해서 컨테이너를 생성

> root@server:~/webserver# docker run --name mws_1.0 -d -P ahngo13/mywebserverimage:1.0
>
> 474ceed9cf25cf25a9183dff6ab5f06ff3fe3a489cca7d79ad25d96c6d338e54
>
> root@server:~/webserver# docker ps
>
> CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS              PORTS                   NAMES
>
> 474ceed9cf25        ahngo13/mywebserverimage:1.0   "/bin/sh -c 'apach..."   7 seconds ago       Up 6 seconds        0.0.0.0:32776->80/tcp   mws_1.0
>
> de3b6a8265ab        wordpress                      "docker-entrypoint..."   27 minutes ago      Up 27 minutes       0.0.0.0:32775->80/tcp   wordpress
>
> ef1219e40a69        mysql:5.7                      "docker-entrypoint..."   30 minutes ago      Up 30 minutes       3306/tcp, 33060/tcp     wordpressdb
>
> e586811266c9        myimage                        "/bin/sh -c 'apach..."   3 hours ago         Up 3 hours          0.0.0.0:32774->80/tcp   mywebserver99
>
> eb974f46df49        myimage                        "/bin/sh -c 'apach..."   3 hours ago         Up 3 hours          0.0.0.0:32773->80/tcp   mywebserver



#### 모든 컨테이너와 이미지를 삭제

> root@server:~/webserver# docker container stop $(docker container ps -aq)
>
> root@server:~/webserver# docker container rm -f $(docker container ls -aq)
>
> root@server:~/webserver# docker image rm -f $(docker images -aq)
>
> root@server:~/webserver# docker container prune
>
> WARNING! This will remove all stopped containers.
>
> Are you sure you want to continue? [y/N] y
>
> Total reclaimed space: 0Broot@server:~/webserver# docker image pruneWARNING! This will remove all dangling images.
>
> Are you sure you want to continue? [y/N] y
>
> Total reclaimed space: 0B
>
> root@server:~/webserver# 

> #docker container ls -a 
>
> #docker image ls -a 





\#1 작업디렉터리(lab) 생성 

\#2 아래 작업을 수행하는 Dockerfile을 생성

- ubuntu 최신 버전의 이미지를 베이스 이미지로 사용

- apache2 설치

- apache2를 백그라운드에서 실행

  

#3 docker build를 통해 이미지를 생성

- 이미지 이름 : myapach
- 이미지 태그 : latest



\#4 호스트에서 생성한 index.html 파일을 컨테이너 내부 아파치 웹 루트에 복사

~~~html
<html><body><h1>Hello, Docker</h1></body></html>
~~~

\#5 호스트에서 웹 브라우저를 통해서 컨테이너로 접속

http://localhost:??????/index.html 로 접속했을 때 Hello, Docker가 출력되는 것을 확인

#6 현재 상태의 컨테이너의 이미지를 생성

- 이미지 이름 : myapache
- 이미지 태그는 : 1.0

#7 #6에서 생성한 이미지를 자신의 도커 허브에 반영

#8 #7에서 반영한 이미지를 다른 사람의 자리에서 가져와서 실행 후 브라우저를 통해서 확인



LAB2

아래 조건을 만족하는 Dockerfile을 만들고 이미지를 빌드

- ubuntu 최신 버전을 베이스 이미지로 지정

- https://docs.docker.com/install/linux/docker-ce/ubuntu/ 내용을 참조하여 도커를 설치

- 이미지 이름을 dind로 태그명을 latest로 생성

생성한 이미지로 컨테이너를 생성

- 사용자 입력을 받을 수 있도록 하고, 백그라운드에서 실행될 수 있도록 한다. 컨테이너 실행시 /bin/bash 쉘이 실행되도록 한다. 

- 실행된 컨테이너에 접속하여 docker --version 실행 결과를 확인

[실행예]

root@014130d892cf:/# docker --version

Docker version 19.03.5, build 633a0ea838
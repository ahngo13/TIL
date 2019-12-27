# 12/27

### 컨테이너 내부로 명령어를 실행 → docker exec

> root@server:~# **/bin/bash -c "while true; do echo Hello Docker; sleep 1; done"**
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> Hello Docker
>
> ^C



> root@server:~# **docker run -d --name echo ubuntu:14.04 /bin/bash -c "while true; do echo Hello Docker; sleep 1; done"**

우분투 이미지를 가져와서 해당 컨테이너에서 해당 명령어를 실행



> root@server:~# **docker exec -it echo /bin/bash**
>
> root@45005d784658:/# **ps -ef**
>
> UID        PID  PPID  C STIME TTY          TIME CMD
>
> root         1     0  0 00:29 ?        00:00:00 /bin/bash -c while true; do echo
>
> root       116     0  0 00:31 ?        00:00:00 /bin/bash
>
> root       162     1  0 00:32 ?        00:00:00 sleep 1
>
> root       163   116  0 00:32 ?        00:00:00 ps -ef
>
> root@45005d784658:/# **exit**
>
> exit
>
> root@server:~# **docker container ls**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
>
> 45005d784658        ubuntu:14.04        "/bin/bash -c 'whi..."   4 minutes ago       Up 4 minutes                            echo



> root@server:~# **docker exec echo apt-get update**
>
> root@server:~# **docker exec echo apt-get install apache2**

attech로 들어가지 않고도 exec로 명령어를 실행할 수 있음



#### VMware의 shared folders

VM 메뉴 → Settings → option 탭에서 확인 가능



#### Docker 볼륨

호스트의 특정 디렉토리를 Volume으로 가져감. 공유하는 것

공유 컨테이너를 다른 컨테이너가 공유한다. volume container

유지보수 관리를 위해 필요



docker 볼륨과 VMware의 shared folders 비슷함



### 모든 컨테이너 및 이미지 삭제

root@server:~/docker# docker container stop $(docker container ls -aq)

root@server:~/docker# docker container rm $(docker container ls -aq)

root@server:~/docker# docker container prune



### 호스트 볼륨 공유

-v 옵션을 이용해서 호스트의 볼륨을 공유

호스트의 디렉터리(또는 파일)을 컨테이너의 디렉터리(또는 파일)로 마운트



\#1 MySQL 이미지를 이용해서 데이터베이스 컨테이너를 생성

> root@server:~# docker run -d \
>
> --name wordpressdb_hostvolume \
>
> -e MYSQL_ROOT_PASSWORD=password \
>
> -e MYSQL_DATABASE=wordpress \
>
> **-v /home/wordpress_db:/var/lib/mysql \\**
>
> mysql:5.7

**-v \\home\wordpress_d(HOST)b:/var/lib/mysql (Container)\\**

→ 호스트의 /home/wordpress_db 디렉터리를 컨테이너의 /var/lib/mysql(mysql DB의 데이터를 저장하는 곳) 디렉터리로 공유하라



\#2 워드프레스 이미지를 이용해서 웹 서버 컨테이너를 생성

> root@server:~# docker run -d \
>
> --name wordpress_hostvolume \
>
> -e WORDPRESS_DB_PASSWORD=password \
>
> --link wordpressdb_hostvolume:mysql \
>
> -p 80 \
>
> wordpress



\#3 호스트 볼륨 공유를 확인

> root@server:~/docker# ls /home/wordpress_db/
>
> auto.cnf     client-key.pem  ibdata1       private_key.pem  sysca-key.pem    ib_buffer_pool  ibtmp1       public_key.pem   wordpressca.pem      ib_logfile0     mysql        server-cert.pemclient-cert.pem ib_logfile1     performance_schema server-key.pem
>
> root@server:~/docker# docker exec wordpressdb_hostvolume ls /var/lib/mysql\
>
> auto.cnf
>
> ca-key.pem
>
> ca.pem
>
> client-cert.pem
>
> client-key.pem
>
> ib_buffer_pool
>
> ib_logfile0
>
> ib_logfile1
>
> ibdata1
>
> ibtmp1
>
> mysql
>
> performance_schema
>
> private_key.pem
>
> public_key.pem
>
> server-cert.pem
>
> server-key.pem
>
> sys
>
> wordpress
>
> root@server:~/docker# cd ..
>
> root@server:~# ls



\#4 컨테이너 삭제 후 볼륨 데이터가 유지되는지 확인

> root@server:~# docker container stop wordpress_hostvolume wordpressdb_hostvolume 
>
> wordpress_hostvolume
>
> wordpressdb_hostvolume
>
> root@server:~# docker container rm  wordpress_hostvolume 
>
> wordpressdb_hostvolumewordpress_hostvolume
>
> wordpressdb_hostvolume
>
> root@server:~/docker# ls /home/wordpress_db/



\#5 파일 단위의 공유도 가능하고, -v 옵션을 여러개 사용하는 것도 가능

> root@server:~/docker# **echo hello1 >> hello1.txt && echo hello2 >> hello2.txt**
>
> root@server:~/docker# **cat hello1.txt && cat hello2.txt**
>
> hello1
>
> hello2



> root@server:~/docker# **docker run -it \\**
>
> **--name volume_test2 \\**
>
> **-v /root/docker/hello2.txt:/hello2.txt \\**
>
> **-v /root/docker/hello1.txt:/hello1.txt \\**
>
> **ubuntu:14.04**
>
> root@b53d5f0f3df7:/# **ls**
>
> bin   dev  **hello1.txt**  home  lib64  mnt  proc  run   srv  tmp  var
>
> boot  etc  **hello2.txt**  lib   media  opt  root  sbin  sys  usr



> root@cdfdbaa30a15:/# **cat ./hello1.txt && cat ./hello2.txt**
>
> hello1
>
> hello2



(호스트에서) hello1.txt 내용을 변경 후 호스트와 컨테이너에서 반영되는지 확인



> root@server:~/docker# **echo HELLO CONTAINER >> hello1.txt**
>
> echo HELLO CONTAINER >> hello1.txt
>
> root@server:~/docker# **cat hello1.txt**
>
> hello1
>
> HELLO CONTAINER
>
> root@4d4abd7c3d33:/# **cat ./hello1.txt**
>
> hello1
>
> HELLO CONTAINER



(컨테이너에서) hello2.txt 내용을 변경 후 호스트와 컨테이너에서 반영되는지 확인

> root@4d4abd7c3d33:/# **echo HELLO HOST >> hello2.txt**
>
> root@4d4abd7c3d33:/# **cat ./hello2.txt**
>
> hello2
>
> HELLO HOST
>
> 
>
> root@server:~/docker# **cat ./hello2.txt**
>
> hello2
>
> HELLO HOST



\#6 컨테이너에 존재하는 디렉터리를 호스트 볼륨으로 공유하는 경우

> root@server:~/docker# **docker run -it --name dummy alicek106/volume_test**
>
> root@9c4da7bff294:/# **ls -l /home/testdir_2**
> total 4
>
> -rw-r--r-- 1 root root 11 Sep  8  2016 test
>
> root@server:~/docker# **docker run -it --name volume_overide -v /home/wordpress_db:/home/testdir_2 alicek106/volume_test**
>
> root@541bf233929d:/# **ls -l /home/testdir_2**
>
> -rw-r----- 1 999 999    56 Dec 27 01:24 auto.cnf
>
> -rw------- 1 999 999   1680 Dec 27 01:24 ca-key.pem
>
> -rw-r--r-- 1 999 999   1112 Dec 27 01:24 ca.pem
>
> -rw-r--r-- 1 999 999   1112 Dec 27 01:24 client-cert.pem
>
> -rw------- 1 999 999   1680 Dec 27 01:24 client-key.pem
>
> -rw-r----- 1 999 999   690 Dec 27 01:35 ib_buffer_pool-rw
>
> -r----- 1 999 999 50331648 Dec 27 01:35 ib_logfile0
>
> -rw-r----- 1 999 999 50331648 Dec 27 01:24 ib_logfile1
>
> -rw-r----- 1 999 999 79691776 Dec 27 01:35 ibdata1
>
> drwxr-x--- 2 999 999   4096 Dec 27 01:24 mysqldrwxr
>
> -x--- 2 999 999   4096 Dec 27 01:24 performance_schema
>
> -rw------- 1 999 999   1680 Dec 27 01:24 private_key.pem
>
> -rw-r--r-- 1 999 999   452 Dec 27 01:24 public_key.pem
>
> -rw-r--r-- 1 999 999   1112 Dec 27 01:24 server-cert.pem
>
> -rw------- 1 999 999   1680 Dec 27 01:24 server-key.pem
>
> drwxr-x--- 2 999 999  12288 Dec 27 01:24 sys
>
> drwxr-x--- 2 999 999   4096 Dec 27 01:24 wordpress



#### 볼륨 컨테이너

컨테이너를 실행할 때 --volume-from 옵션을 사용 → -**v (--volume) 옵션을 적용한 컨테이너**의 볼륨 디렉터리를 공유

> root@9c4da7bff294:/# **docker run -it \\**
>
> --name volumes-from-container \
>
> --volumes-from volume_overide \
>
> ubuntu:14.04

> root@ebaddd1d49e3:/# **ls /home/testdir_2/**
>
> auto.cnf     client-key.pem  ibdata1       public_key.pem   wordpress
>
> ca-key.pem    ib_buffer_pool  mysql        server-cert.pem
>
> ca.pem      ib_logfile0     performance_schema server-key.pem
>
> client-cert.pem ib_logfile1     private_key.pem   sys



#### 도커 볼륨

- 도커 자체에서 제공하는 볼륨 기능을 활용한 데이터 보존 방식
- docker volume 명령어 사용



#1 볼륨 생성

> root@server:~/docker# docker volume create --name myvolume
>
> root@server:~/docker# docker volume ls
>
> DRIVER              VOLUME NAME
>
> local               4e41df3bd5d6e62b254868330358023aa7929be946c8b203378d979ad8efea41
>
> local               c535c2a69b64a80beeaec944f403897f5040675cdb529808d905d8d86fcde93d
>
> local               c9020584d2f8d67a4ff7fae44821a650e96d263115bfc336521e051e6125e835
>
> local               hello1.txt
>
> local               hello2.txt
>
> local               homewordpress_db
>
> local               myvolume



\#2 생성한 볼륨을 사용하는 컨테이너를 생성

-v [볼륨이름]:[컨테이너 디렉터리]

> root@server:~/docker# **docker run -it --name myvolume_1 \\**
>
> **-v myvolume:/root/ \\**
>
> **ubuntu:14.04**



> root@0fe4a1dff4c5:~# **echo Hello, Volume >> /root/hello**
>
> root@0fe4a1dff4c5:~# **exit**



\#3 동일 볼륨을 사용하는 컨테이너를 생성해서 파일 공유가 되는지 확인

> root@server:~/docker# **docker run -it --name myvolume_3 -v myvolume:/temp/ ubuntu:14.04**
>
> root@08e2abfca357:/# **ls /temp**
>
> hello
>
> root@08e2abfca357:/# **cat /temp/hello**



\#4 docker inspect 명령어를 이용해서 볼륨 정보를 조회

> root@server:~/docker# **docker inspect --type volume myvolume**
>
> [
>
> ​    {
>
> ​        "Driver": "local",
>
> ​        "Labels": {},
>
> ​        "Mountpoint": "/var/lib/docker/volumes/myvolume/_data",
>
> ​        "Name": "myvolume",
>
> ​        "Options": {},
>
> ​        "Scope": "local"
>
> ​    }
>
> ]



#### 도커 컴포즈(docker compose)

설치 → https://docs.docker.com/compose/install/

\#curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

#chmod +x /usr/local/bin/docker-compose

#docker-compose --version

docker-compose version 1.24.0, build 0aa59064



YAML (= YAML Ain't Markup Language)

https://ko.wikipedia.org/wiki/YAML



gedit docker-compose.yml

~~~yaml
version: "3"
services: 
    echo: 
       image: ahngo13/echo:latest
       ports:
          - 9090:8080
~~~

> root@server:~/compose# **docker-compose up**
>
> Creating network "compose_default" with the default driver
>
> Pulling echo (ahngo13/echo:latest)...
>
> latest: Pulling from ahngo13/echo
>
> 55cbf04beb70: Pull complete
>
> 1607093a898c: Pull complete
>
> 9a8ea045c926: Pull complete
>
> d4eee24d4dac: Pull complete
>
> 9c35c9787a2f: Pull complete
>
> 8b376bbb244f: Pull complete
>
> 0d4eafcc732a: Pull complete
>
> 186b06a99029: Pull complete
>
> 1f601a737be4: Pull complete
>
> eb76678530a3: Pull complete
>
> Digest: sha256:b99fc97025557ba87935084201146239d2e4e986aaed8ea448c854692c3932a0
>
> Status: Downloaded newer image for ahngo13/echo:latest
>
> Creating compose_echo_1 ... done
>
> Attaching to compose_echo_1
>
> echo_1  | 2019/12/27 04:52:42 start server



(다른 터미널에서 동작하는 것을 확인)

> root@server:~# curl http://localhost:9090
>
> Hello Docker!!root@server:~# 



YAML 파일이 있는 곳으로 이동해서 내려줌

> root@server:~# **cd compose/**
>
> root@server:~/compose# **docker-compose down**
>
> Stopping compose_echo_1 ... done
>
> Removing compose_echo_1 ... done
>
> Removing network compose_default



docker-compose.yml

~~~yaml
version: '3.3'

services:
   db:
     image: mysql:5.7
     volumes:
       - /home/db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "8000:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
       WORDPRESS_DB_NAME: wordpress
volumes:
    db_data: {}


~~~



# 
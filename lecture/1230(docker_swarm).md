# 12/30

### 도커 스웜



#### 일반적인 클러스터 구성

- 분산 코디네이터 - 각종 정보를 저장하고 동기화 → 클러스터에 영입할 새로운 서버의 발견, 클러스터의 각종 설정 저장, 데이터 동기화 등에 주로 사용
- 매니저 - 클러스터 내의 서버를 관리하고 제어에이전트 
- 각 서버를 제어



#### 도커 스웜과 도커 스웜 모드

- 여러 대의 도커 서버를 하나의 클러스터로 만들어 컨테이너를 생성하는 기능
- 도커 스웜 → 도커 1.6 버전 이후부터 사용
  - 에이전트 컨테이너가 필요하며 분산 코디네이터가 외부에 존재해야 함
  - 여러 대의 도커 서버를 하나의 지점에서 사용하도록 단일 접근점을 제공
- 도커 스웜 모드 → 도커 1.12 버전 이후부터 사용
  - 에이전트가 도커 자체에 내장 (분산 코디네이터를 외부에 설치할 필요 없음)
  - 클러스터링 기능에 초점

도커 스웜과 스웜 모드는 최소 3개 이상의 도커 서버를 필요로 함



#### 도커 스웜 모드 → 매니저 노드와 워커 노드로 구성

- 매니저 노드 : 워커 노드를 관리하기 위한 도커 노드
- 워커 노드 : 실제 컨테이너가 생성되고 관리되는 도커 노드
- 매니저 노드에도 컨테이너가 생성될 수 있음 = 매니저 노드는 기본적으로 워커 노드 역할을 포함
- 매니저 노드는 반드시 1개 이상 존재해야 하며, 운영 환경에서는 다중화하는 것을 권장
- 매니저 노드의 절반 이상에 장애가 발생하는 경우 복구를 위해 클러스터 운영을 중지하므로 매니저 노드는 홀수개로 구성하는 것이 효율적
- 

#### LAB 스웜 모드 환경 구성

\#1 도커가 설치되어 있는 우분투 서버 3개 생성

\#2 스웜 지원 여부 확인

> root@server:~# **docker --version**
>
> Docker version 17.05.0-ce, build 89658be ⇐ 버전이 1.12 이상
>
> root@server:~# **docker info | grep Swarm** 
>
> Swarm: inactive
>
> WARNING: No swap limit support



\#3 각 서버의 이름을 아래와 같이 설정

swarm-manager

swarm-worker1

swarm-worker2



#### 가상 머신 이름 변경

![img](https://lh4.googleusercontent.com/vZrjzvhoxhGpCXQ_9AnKObrCGVSUxbNyrD42qCdi8zLrhjBEcvlTrT_OVglPNTMVJxH2XbPSU-NLBwyX_B_Bn1k99mrHOj3uZPYQ-TXBdjrcBQv-WijmL8sM_4pxEkkTh37T_Nlf)![img](https://lh5.googleusercontent.com/5OjXOlLtd4t4acSOJHxmSEApC1YKn37ZrjDbuTB1tY1hNhXpy9G_IFx2-AMXpMyl0saBpUssA54UwWqFeuQa5iChgLckQgG_-tXMdfkLV62l5KaPMAtfG18q61dMOezj8W6m8PIo)

가상 머신 별로 호스트 명 변경, 리부팅 후 확인![img](https://lh6.googleusercontent.com/PUsPM25o_NuEmXlFM-8-NAQqyozZQsGUPwoNJlsCThr_74uEgtINgVzDliLTK1P9NgauKj46Znmm8Clw-FJkkOt6xOAWuNExXhUuJ7TyVr8YyF_De0TVfjYNwm57t1gz3Icnk9-B)![img](https://lh6.googleusercontent.com/RT3pEUCts_FD00O7Vi-YNqlMd9nCkelx0fkBxk2gPpPjIGxl482S62xJVy4YCG3R0C2wVx3F3LaapRnWMN47iZl9pSjPyMbH8Hl8uZpnaVTX1_OQapwV7i1PqK5upm3wUsxs1H_H)
![img](https://lh5.googleusercontent.com/tEqF4h50uJJvCm-CWcomTwswB1MwJa2-1AThKTKfg0HphNOHg19xZiD30MCbd0KvdhQopdXN5Cxh3DCj6JlsGW-m8VmgOMwfNjleOB4R_M5KX1G4FIaWLifA9jNcbxbb4ftHmFQe)![img](https://lh3.googleusercontent.com/QCP6_KaJ0ykyDu-xogwwzXWSl-1kmJoOUrqmdB4bbhGuxDlgiM7bdkdTWS1UhDKrgHgjLAixk-dYieoowkBaqGRZ8V2qiSlj2uNfjr_bmx6hrHjWSL5kxuLjVqOs4wh87dNXgDW7)
![img](https://lh5.googleusercontent.com/0xsldEBW8WmSeaGQidNzxsGW3AxA0z0qpJUbkJWJkU9ASZyie5Hmy-MP8mq8h8HD12o-t6a3USASvSxQVN957FRQq0CAq3-du9XCJAr1H-qjBJfeGzmHboEsxjOiVFPEUEZaS-dQ)![img](https://lh4.googleusercontent.com/8tYoGu4lWJ8n4U0Y3F49cwb0kJrtImJo0OvMbrgze19NmgJzT-jnh6KZicd0paU5CyZuhp0d5Bl2twDUBNcOxyf6HTKAf3FVwakmISNLMBAX5-6g14_z_j0HlsO5jLphsM9k7nqB)

#### 가상 머신 별 IP 확인

swarm-manager : 192.168.111.134

swarm-worker1 : 192.168.111.132

swarm-worker2 : 192.168.111.133

vitualbox는 MAC주소를 별도로 설정해줘야 될 수 있음. 안그러면 인식이 안될 수도 있다고 함.



\#1 매니저 역할의 서버에서 스웜 클러스를 시작

root@swarm-manager:~# **docker swarm init --advertise-addr 192.168.111.134**

Swarm initialized: current node (lua2m8ruxmacxhr29ehrywzo7) is now a manager.



To add a worker to this swarm, run the following command:

```java
docker swarm join \
--token SWMTKN-1-6b6uxft3lt5050sepno6ngts2qiahmhi9963ma22vso9b45x9b-3yzkh51m6h82ab9ya9s7hii7u \
192.168.111.134:2377 // 새로운 워커 노드를 클러스터에 추가할 때 사용하는 비밀키
```

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.



\#2 워커 노드를 추가 

swarm-worker1, 2 모두에 해당 명령어를 실행 시킨다.

(안되면 방화벽을 모두 해제한다. ufw disable)

**do**cker swarm join \**
    **--token SWMTKN-1-2nhqocu7ipdf37442zrx2d3uafkjojojn6lfhzksbhfcexnmoj-b1nkfttz3k0xsmodujk4dd48v \**
    192.168.111.134:2377**



\#3 도커 서버가 정상적으로 스웜 클러스트에 추가되었는지 확인

root@swarm-manager:~# **docker node ls**

ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS

i8v8vtvqr891t5pgcj76ru2ye     swarm-worker1       Ready               Active              

kdcqwyk0l1qwi8g36jhh2kc42     swarm-worker2       Ready               Active              

qg55pzy1i5xy35elmra43k0mb *   swarm-manager       Ready               Active              Leader



\#4 토큰 확인 및 변경 방법

root@swarm-manager:~# **docker swarm join-token manager**

To add a manager to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-0oks0xrkd91tmckftf6tdha0gxw5ku8h1huymgudnew2qi8925-0f25m8weyxkgt3y8gx1klmbwb \
    192.168.111.134:2377
root@swarm-manager:~# **docker swarm join-token manager**

To add a manager to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-0oks0xrkd91tmckftf6tdha0gxw5ku8h1huymgudnew2qi8925-0f25m8weyxkgt3y8gx1klmbwb \
    192.168.111.134:2377


root@swarm-manager:~# **docker swarm join-token --rotate manager**

Successfully rotated manager join token.

To add a manager to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-0oks0xrkd91tmckftf6tdha0gxw5ku8h1huymgudnew2qi8925-46dp7xwrjkwd8cbr3ct1hf6k6 \
    192.168.111.134:2377


\#5 노드 삭제

> root@swarm-manager:~# **docker node ls**
>
> ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
>
> i8v8vtvqr891t5pgcj76ru2ye     swarm-worker1       Ready               Active              
>
> kdcqwyk0l1qwi8g36jhh2kc42     swarm-worker2       Ready               Active              
>
> qg55pzy1i5xy35elmra43k0mb *   swarm-manager       Ready               Active              Leader
>
> 
>
> root@swarm-worker1:~# **docker swarm leave**
>
> Node left the swarm.



> root@swarm-manager:~# **docker node ls**
>
> ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
>
> i8v8vtvqr891t5pgcj76ru2ye     swarm-worker1       Down                Active              
>
> kdcqwyk0l1qwi8g36jhh2kc42     swarm-worker2       Ready               Active              
>
> qg55pzy1i5xy35elmra43k0mb *   swarm-manager       Ready               Active              Leader



> root@swarm-manager:~# **docker node rm swarm-worker1**
>
> swarm-worker1
>
> root@swarm-manager:~# **docker node ls**
>
> ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
>
> kdcqwyk0l1qwi8g36jhh2kc42     swarm-worker2       Ready               Active              
>
> qg55pzy1i5xy35elmra43k0mb *   swarm-manager       Ready               Active              Leader



> root@swarm-manager:~# **docker swarm leave**
>
> Error response from daemon: You are attempting to leave the swarm on a node that is 
>
> participating as a manager. Removing this node leaves 1 managers out of 2. Without a Raft 
>
> quorum your swarm will be inaccessible. The only way to restore a swarm that has lost 
>
> consensus is to reinitialize it with `--force-new-cluster`. Use `--force` to suppress this 
>
> message.
>
> root@swarm-manager:~# **docker swarm leave --force**
>
> Node left the swarm.



> root@swarm-manager:~# **docker node ls**
>
> Error response from daemon: This node is not a swarm manager. Use "docker swarm init" or "docker swarm join" to connect this node to swarm and try again.



\#6 노드의 역할을 변경

\##새로운 클러스터 구성

root@swarm-manager:~# **docker swarm init**

Swarm initialized: current node (sm73oba7d7v8rdor1lk4p0t1v) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-4nshl7rs9nlpd1ypml81u1n4b1z771fwi8dp1n3chappdetcbt-awjlo48a5bos8ut0cd2j0fi0k \
    192.168.111.134:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.



\##워커 노드를 추가

> root@swarm-worker1:~# **docker swarm leave --force**
>
> Node left the swarm.
>
> root@swarm-worker1:~# docker swarm join \
>
> --token SWMTKN-1-4nshl7rs9nlpd1ypml81u1n4b1z771fwi8dp1n3chappdetcbt-awjlo48a5bos8ut0cd2j0fi0k \
> 192.168.111.134:2377
> This node joined a swarm as a worker.



> root@swarm-worker2:~# docker swarm leave
>
> Node left the swarm.
>
> root@swarm-worker2:~# docker swarm join \
>
> --token SWMTKN-1-4nshl7rs9nlpd1ypml81u1n4b1z771fwi8dp1n3chappdetcbt-awjlo48a5bos8ut0cd2j0fi0k \
> 192.168.111.134:2377
> This node joined a swarm as a worker.



\##클러스터 확인

root@swarm-manager:~# docker node ls

ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS

sm73oba7d7v8rdor1lk4p0t1v *   swarm-manager       Ready               Active              Leader

v2ifa63aukgc4ttqhxf49308w     swarm-worker1       Ready               Active              

yfdz1d76nbk8hq3t5v5nks1uc     swarm-worker2       Ready               Active              



\##매니저 노드를 워커 노드로 변경

> root@swarm-manager:~# **docker node demote swarm-manager**
>
> Error response from daemon: rpc error: code = 9 desc = attempting to demote the last manager of the swarm

⇒ 매니저 노드가 1개인 경우 demote 불가



\##swarm-worker1 노드를 매니저 노드로 변경

> root@swarm-manager:~# docker node promote swarm-worker1
>
> Node swarm-worker1 promoted to a manager in the swarm.
>
> root@swarm-manager:~# docker node ls
>
> ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
>
> sm73oba7d7v8rdor1lk4p0t1v *   swarm-manager       Ready               Active              Leader
>
> **v2ifa63aukgc4ttqhxf49308w     swarm-worker1       Ready               Active              Reachable**
>
> yfdz1d76nbk8hq3t5v5nks1uc     swarm-worker2       Ready               Active              



\##매니저(swarm-manager) 노드를 워커 노드로 변경

> root@swarm-manager:~# **docker node demote swarm-manager**
>
> Manager swarm-manager demoted in the swarm.
>
> root@swarm-manager:~# **docker node ls**
>
> Error response from daemon: This node is not a swarm manager. Worker nodes can't be used 
>
> to view or modify cluster state. Please run this command on a manager node or promote the 
>
> current node to a manager.



> root@swarm-worker1:~# **docker node ls**
>
> ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
>
> sm73oba7d7v8rdor1lk4p0t1v     swarm-manager       Ready               Active              
>
> v2ifa63aukgc4ttqhxf49308w *   swarm-worker1       Ready               Active              Leader
>
> yfdz1d76nbk8hq3t5v5nks1uc     swarm-worker2       Ready               Active              



\##최초 형태로 변경 : swarm-manager를 매니저 노드로, swarm-worker1, swarm-worker2를 워커 노드

> root@swarm-worker1:~# **docker node promote swarm-manager**
>
> Node swarm-manager promoted to a manager in the swarm.
>
> root@swarm-worker1:~# **docker node demote swarm-worker1**
>
> Manager swarm-worker1 demoted in the swarm.



정상적으로 변경된 경우 아래와 같은 결과가 나와야 함

> root@swarm-manager:~# **docker node ls**
>
> ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
>
> sm73oba7d7v8rdor1lk4p0t1v *   swarm-manager       Ready               Active              Leader
>
> v2ifa63aukgc4ttqhxf49308w     swarm-worker1       Ready               Active              
>
> yfdz1d76nbk8hq3t5v5nks1uc     swarm-worker2       Ready               Active              



서비스 = 같은 이미지로 생성된 컨테이너의 집합

서비스 제어는 매니저 노드에서만 가능

서비스 생성

> root@swarm-manager:~# **docker service create \\**
>
> **ubuntu:14.04 \\**
>
> **/bin/bash -c "while true; do echo Hello Docker; sleep 1; done"**

> yf8048pg461j450lbtazylatc
>
> Since --detach=false was not specified, tasks will be created in the background.
>
> In a future release, --detach=false will become the default.



서비스 확인

> root@swarm-manager:~# **docker service ls**
>
> ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
>
> yf8048pg461j        hungry_jennings     replicated          1/1                 ubuntu:14.04        



> root@swarm-manager:~# **docker service ps hungry_jennings**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
>
> 1jvuo6x0w7ke        hungry_jennings.1   ubuntu:14.04        **swarm-manager**       Running             Running 2 minutes ago                       

swarm-manager로 반드시 생성되는 것은 아님 work1, work2에 실행될 가능성도 있음.



> root@swarm-manager:~# **docker container ls**
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
>
> 1e9955dec410        ubuntu:14.04        "/bin/bash -c 'whi..."   5 minutes ago       Up 5 minutes                            hungry_jennings.1.1jvuo6x0w7ke20mlus573csw7



서비스 삭제 → 서비스 상태와 관계 없이 삭제가 가능

(일반 컨테이너는 중지하고 삭제했었음)

> root@swarm-manager:~# **docker service rm hungry_jennings**
>
> hungry_jennings
>
> root@swarm-manager:~# **docker service ls**
> ID                  NAME                MODE                REPLICAS            IMAGE               PORTS



nginx 웹 서버 서비스를 생성

#1 서비스 생성

> root@swarm-manager:~# **docker service create \\**
>
> **--name myweb \\**
>
> **--replicas 2 \\**
>
> **-p 8080:80 \\**
>
> **nginx**
>
> **4akq5mvpedtszecql2aqkrp7t**
>
> Since --detach=false was not specified, tasks will be created in the background.
>
> In a future release, --detach=false will become the default.



> root@swarm-manager:~# **docker service ls**
>
> ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
>
> 4akq5mvpedts        myweb               replicated          2/2                 nginx:latest        *:8080->80/tcp
>
> root@swarm-manager:~# **docker service ps myweb**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE                ERROR               PORTS
>
> otgfavess5bi        myweb.1             nginx:latest        swarm-worker1       Running             Running about a minute ago                       
>
> m0sb8uhibnsp        myweb.2             nginx:latest        swarm-manager       Running             Running about a minute ago                       



> root@swarm-manager:~# **docker container ls**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
>
> 09ac425bb7e8        nginx:latest        "nginx -g 'daemon ..."   2 minutes ago       Up 2 minutes        80/tcp              myweb.2.m0sb8uhibnspgj9uhpmdxdo7v



#2 nginx로 접속 

http://SWARM_MANAGER_IP:8080/

http://SWARM_WORKER1_IP:8080/

http://SWARM_WORKER2_IP:8080/

→ 컨테이너 실행 여부와 관계 없이 접속을 확인

→ 각 호스트의 어느 노드로 접근하든 실행 중인 컨테이너로 접속이 가능

→ 스웜 모드는 라운드 로빈 방식으로 서비스 내에 접근할 컨테이너를 결정

(기본적으로는 라운드 로빈 방식이나 생성할 때 다르게 설정 가능함)



#3 리플리카 개수를 변경

> root@swarm-manager:~# **docker service scale myweb=4**
>
> myweb scaled to 4



> root@swarm-manager:~# **docker service ls**
>
> ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
>
> 4akq5mvpedts        myweb               replicated          4/4                 nginx:latest        *:8080->80/tcp
> root@swarm-manager:~# **docker service ps myweb**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
>
> otgfavess5bi        myweb.1             nginx:latest        swarm-worker1       Running             Running 14 minutes ago                       
>
> m0sb8uhibnsp        myweb.2             nginx:latest        swarm-manager       Running             Running 14 minutes ago               
>
> kjnprdd8tcio        myweb.3             nginx:latest        swarm-worker2       Running             Running 24 seconds ago                       
>
> br4qgrzpt1gt        myweb.4             nginx:latest        swarm-worker2       Running             Running 23 seconds ago                       



복제 모드 서비스 → 정의한 리플리카의 개수 만큼 컨테이너가 생성 (default)

글로벌 모드 서비스 →  모든 노드의 컨테이너를 생성(docker service create --mode global 옵션으로 생성)



서비스 장애 복구

#1 매니저 노드에서 노드의 상태를 확인

> root@swarm-manager:~# **docker service ls**
>
> ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
>
> 4akq5mvpedts        myweb               replicated          4/4                 nginx:latest        *:8080->80/tcp
>
> → 4개의 태스크가 동작 중
>
> root@swarm-manager:~# **docker service ps myweb**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
>
> otgfavess5bi        myweb.1             nginx:latest        swarm-worker1       Running             Running 14 minutes ago                       
>
> m0sb8uhibnsp        myweb.2             nginx:latest        swarm-manager       Running             Running 14 minutes ago                       
>
> kjnprdd8tcio        myweb.3             nginx:latest        swarm-worker2       Running             Running 24 seconds ago                       
>
> br4qgrzpt1gt        myweb.4             nginx:latest        swarm-worker2       Running             Running 23 seconds ago                       
>
> root@swarm-manager:~# **docker node ls**
>
> ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
>
> sm73oba7d7v8rdor1lk4p0t1v *   swarm-manager       Ready               Active              Leader
>
> v2ifa63aukgc4ttqhxf49308w     swarm-worker1       Ready               Active              
>
> yfdz1d76nbk8hq3t5v5nks1uc     swarm-worker2       Ready               Active   

→  1개의 매니저 노드와 2개의 워커 노드가 실행 중

> root@swarm-manager:~# **docker service ps myweb**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE               ERROR               PORTS
>
> otgfavess5bi        myweb.1             nginx:latest        swarm-worker1       Running             Running about an hour ago                       
>
> m0sb8uhibnsp        myweb.2             nginx:latest        swarm-manager       Running             Running about an hour ago                       
>
> kjnprdd8tcio        myweb.3             nginx:latest        swarm-worker2       Running             Running 32 minutes ago                          
>
> br4qgrzpt1gt        myweb.4             nginx:latest        swarm-worker2       Running             Running 32 minutes ago                          



#2 매니저 노드에서 실행 중인 컨테이너를 삭제

> root@swarm-manager:~# **docker container ls**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
>
> 09ac425bb7e8        nginx:latest        "nginx -g 'daemon ..."   About an hour ago   Up About an hour    80/tcp              myweb.2.m0sb8uhibnspgj9uhpmdxdo7v
>
> root@swarm-manager:~# **docker container rm -f 09ac425bb7e8**
>
> 09ac425bb7e8
>
> root@swarm-manager:~# **docker container ls**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                  PORTS               NAMES
>
> 7281886113ae        nginx:latest        "nginx -g 'daemon ..."   6 seconds ago       Up Less than a second   80/tcp              myweb.2.vmwzs5vcahcm92f3q172daz1c



> root@swarm-manager:~# **docker service ps myweb**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE                ERROR                         PORTS
>
> otgfavess5bi        myweb.1             nginx:latest        swarm-worker1       Running             Running about an hour ago                          
>
> vmwzs5vcahcm        myweb.2             nginx:latest        swarm-manager       Running             Running about a minute ago                  
>
>
> m0sb8uhibnsp         \_ myweb.2         nginx:latest        swarm-manager       Shutdown            Failed about a minute ago    "task: non-zero exit (137)"   
>
> kjnprdd8tcio        myweb.3             nginx:latest        swarm-worker2       Running             Running 37 minutes ago                                     
>
> br4qgrzpt1gt        myweb.4             nginx:latest        swarm-worker2       Running             Running 37 minutes ago                                     



스웜 노드(swarm-worker1)에 장애가 발생하는 경우

> root@swarm-worker1:~# **service docker stop**
>
> root@swarm-worker1:~# **docker container ls**
>
> Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
>
> 
>
> root@swarm-manager:~# **docker node ls**
>
> ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
>
> sm73oba7d7v8rdor1lk4p0t1v *   swarm-manager       Ready               Active              Leader
>
> v2ifa63aukgc4ttqhxf49308w     swarm-worker1       Down                Active              
>
> yfdz1d76nbk8hq3t5v5nks1uc     swarm-worker2       Ready               Active              
>
> root@swarm-manager:~# **docker service ps myweb**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE               ERROR                         PORTS
>
> xycz4idjxuus        myweb.1             **nginx:latest        swarm-manager       Running**             Running 40 seconds ago                                    
>
> otgfavess5bi         \_ myweb.1         **nginx:latest        swarm-worker1       Shutdown**            Running about an hour ago                                 
>
> vmwzs5vcahcm        myweb.2             nginx:latest        swarm-manager       Running             Running 5 minutes ago                                     
>
> m0sb8uhibnsp         \_ myweb.2         nginx:latest        swarm-manager       Shutdown            Failed 5 minutes ago        "task: non-zero exit (137)"   
>
> kjnprdd8tcio        myweb.3             nginx:latest        swarm-worker2       Running             Running 41 minutes ago                                    
>
> br4qgrzpt1gt        myweb.4             nginx:latest        swarm-worker2       Running             Running 41 minutes ago  
>
> 
>
> root@swarm-worker1:~# **service docker start**
>
> root@swarm-worker1:~# **docker container ls**
>
> CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
>
> ​     
>
> root@swarm-manager:~# **docker container ls**
>
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
>
> 5f2743a597b8        nginx:latest        "nginx -g 'daemon ..."   8 minutes ago       Up 8 minutes        80/tcp              myweb.1.xycz4idjxuus15o8rjlw3z003
>
> 7281886113ae        nginx:latest        "nginx -g 'daemon ..."   13 minutes ago      Up 13 minutes       80/tcp              myweb.2.vmwzs5vcahcm92f3q172daz1c
>
> root@swarm-manager:~# docker container rm -f myweb.2.vmwzs5vcahcm92f3q172daz1c
> myweb.2.vmwzs5vcahcm92f3q172daz1c
>
> root@swarm-manager:~# **docker service ps myweb**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE               ERROR                         PORTS
>
> xycz4idjxuus        myweb.1             nginx:latest        swarm-manager       Running             Running 9 minutes ago                                     
>
> otgfavess5bi         \_ myweb.1         nginx:latest        swarm-worker1       Shutdown            Shutdown 2 minutes ago                                    
>
> bb7lsvkgxw16        myweb.2             nginx:latest        swarm-worker1       Running             Running 3 seconds ago                                     
>
> vmwzs5vcahcm         \_ myweb.2         nginx:latest        swarm-manager       Shutdown            Failed 8 seconds ago        "task: non-zero exit (137)"   
>
> m0sb8uhibnsp         \_ myweb.2         nginx:latest        swarm-manager       Shutdown            Failed 14 minutes ago       "task: non-zero exit (137)"   
>
> kjnprdd8tcio        myweb.3             nginx:latest        swarm-worker2       Running             Running about an hour ago                                 
>
> br4qgrzpt1gt        myweb.4             nginx:latest        swarm-worker2       Running             Running about an hour ago                                 



서비스 롤링 업데이트

#0 기존 서비스를 모두 삭제

> root@swarm-manager:~# **docker service rm myweb**
>
> myweb
>
> root@swarm-manager:~# **docker service ls**
>
> ID                  NAME                MODE                REPLICAS            IMAGE               PORTS



#1 새로운 서비스 생성

> root@swarm-manager:~# **docker service create --name myweb2 --replicas 3 nginx:1.10**
>
> y53yvn60sk79kjywr4lk5rtoa
>
> Since --detach=false was not specified, tasks will be created in the background.
>
> In a future release, --detach=false will become the default.
>
> 
>
> root@swarm-manager:~# **docker service ps myweb2**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
>
> jkx28e63jlq8        myweb2.1            nginx:1.10          swarm-manager       Running             Running 15 seconds ago                       
>
> fexd3bcp0ad5        myweb2.2            nginx:1.10          swarm-worker1       Running             Running 16 seconds ago                       
>
> v1ir7vadbspv        myweb2.3            nginx:1.10          swarm-worker2       Running             Running 16 seconds ago                       



#2 nginx:1.10에서 nginx:1.11로 업데이트

> root@swarm-manager:~# **docker service update --image nginx:1.11 myweb2**
>
> myweb2
>
> Since --detach=false was not specified, tasks will be updated in the background.
>
> In a future release, --detach=false will become the default.
>
> 
>
> root@swarm-manager:~# **docker service ps myweb2**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE             ERROR               PORTS
>
> 9ikm45v7hfzt        myweb2.1            nginx:1.11          swarm-manager       Running             Running 34 seconds ago                        
>
> jkx28e63jlq8         \_ myweb2.1        nginx:1.10          swarm-manager       Shutdown            Shutdown 40 seconds ago                       
>
> 2z2fqvstu8go        myweb2.2            nginx:1.11          swarm-worker1       Running             Running 42 seconds ago                        
>
> fexd3bcp0ad5         \_ myweb2.2        nginx:1.10          swarm-worker1       Shutdown            Shutdown 47 seconds ago                       
>
> fllx1umkfl0p        myweb2.3            nginx:1.11          swarm-worker2       Running             Running 28 seconds ago                        
>
> v1ir7vadbspv         \_ myweb2.3        nginx:1.10          swarm-worker2       Shutdown            Shutdown 33 seconds ago                       



\#3 업데이트 조건과 함께 서비스를 생성

**docker service create \\** 

**--replicas 4 \\** 

**--name myweb3 \\**

**--update-delay 10s \\** 

**--update-failure-action continue \\**

**nginx:1.10**



~~~
root@swarm-manager:~# docker service inspect myweb2
[
    {
        "ID": "y53yvn60sk79kjywr4lk5rtoa",
        "Version": {
            "Index": 154
        },
        "CreatedAt": "2019-12-30T06:12:06.408380942Z",
        "UpdatedAt": "2019-12-30T06:15:02.499804491Z",
        "Spec": {
            "Name": "myweb2",
            "Labels": {},
            "TaskTemplate": {
                "ContainerSpec": {
                    "Image": "nginx:1.11@sha256:e6693c20186f837fc393390135d8a598a96a833917917789d63766cab6c59582",
                    "StopGracePeriod": 10000000000,
                    "DNSConfig": {}
                },
                "Resources": {
                    "Limits": {},
                    "Reservations": {}
                },
                "RestartPolicy": {
                    "Condition": "any",
                    "Delay": 5000000000,
                    "MaxAttempts": 0
                },
                "Placement": {},
                "ForceUpdate": 0
            },
            "Mode": {
                "Replicated": {
                    "Replicas": 3
                }
            },
            "UpdateConfig": {
                "Parallelism": 1,
                "FailureAction": "pause",
                "Monitor": 5000000000,
                "MaxFailureRatio": 0,
                "Order": "stop-first"
            },
            "RollbackConfig": {
                "Parallelism": 1,
                "FailureAction": "pause",
                "Monitor": 5000000000,
                "MaxFailureRatio": 0,
                "Order": "stop-first"
            },
            "EndpointSpec": {
                "Mode": "vip"
            }
        },
        "PreviousSpec": {
            "Name": "myweb2",
            "Labels": {},
            "TaskTemplate": {
                "ContainerSpec": {
                    "Image": "nginx:1.10@sha256:6202beb06ea61f44179e02ca965e8e13b961d12640101fca213efbfd145d7575",
                    "DNSConfig": {}
                },
                "Resources": {
                    "Limits": {},
                    "Reservations": {}
                },
                "Placement": {},
                "ForceUpdate": 0
            },
            "Mode": {
                "Replicated": {
                    "Replicas": 3
                }
            },
            "EndpointSpec": {
                "Mode": "vip"
            }
        },
        "Endpoint": {
            "Spec": {}
        },
        "UpdateStatus": {
            "State": "completed",
            "StartedAt": "2019-12-30T06:14:36.625687671Z",
            "CompletedAt": "2019-12-30T06:15:02.499776802Z",
            "Message": "update completed"
        }
    }
]

~~~



#4 서비스 롤백

> root@swarm-manager:~# **docker service update  --rollback myweb2**
>
> myweb2
>
> Since --detach=false was not specified, tasks will be updated in the background.
>
> In a future release, --detach=false will become the default.
>
> root@swarm-manager:~# **docker service ps myweb2**
>
> ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
>
> kcu72gn4guqq        myweb2.1            nginx:1.10          swarm-manager       Running             Running 5 seconds ago                        
>
> 9ikm45v7hfzt         \_ myweb2.1        nginx:1.11          swarm-manager       Shutdown            Shutdown 5 seconds ago                       
>
> jkx28e63jlq8         \_ myweb2.1        nginx:1.10          swarm-manager       Shutdown            Shutdown 9 minutes ago                       
>
> ohcc59fvlfdx        myweb2.2            nginx:1.10          swarm-worker1       Running             Running 6 seconds ago                        
>
> 2z2fqvstu8go         \_ myweb2.2        nginx:1.11          swarm-worker1       Shutdown            Shutdown 7 seconds ago                       
>
> fexd3bcp0ad5         \_ myweb2.2        nginx:1.10          swarm-worker1       Shutdown            Shutdown 9 minutes ago                       
>
> vleud73ke5ug        myweb2.3            nginx:1.10          swarm-worker2       Running             Running 3 seconds ago                        
>
> fllx1umkfl0p         \_ myweb2.3        nginx:1.11          swarm-worker2       Shutdown            Shutdown 3 seconds ago                       
>
> v1ir7vadbspv         \_ myweb2.3        nginx:1.10          swarm-worker2       Shutdown            Shutdown 9 minutes ago                       



![Screenshot_20191230-170518_Samsung Notes](https://user-images.githubusercontent.com/13622474/71574870-fd373d80-2b2d-11ea-92a8-1cbb35090b9f.jpg)
# 12/26 linux

### 시스템 종료 명령어

- poweroff
- shutdown -P now
- halt -p
- init 0



### 런레벨(0~6까지 총 7개)

- 0 - Power Off : 종료 모드
- 1 - Rescue : 시스템 복구 모드(단일 사용자 모드)
- 2 - Multi-User : 사용하지 않음
- 3 - Multi-User : 텍스트 모드의 다중 사용자 모드
- 4 - Multi-User : 사용하지 않음
- 5 - Graphical : 그래픽 모드의 다중 사용자 모드
- 6 - Reboot : 재부팅

(우분투에서는 2번과 4번은 사용하지 않지만 호환성을 위해서 런레벨 3번과 동일한 것으로 취급한다)



### 런레벨 모드 확인 명령어






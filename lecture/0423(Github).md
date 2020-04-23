#  Github 특강

- 코드관리도구
- 협업도구
  - pull & pull
  - Fork & PR
  - Shared Repository with Branching(Branch)
- 배포도구



### 1.코드관리

#### (1)SCM(Source Code Management)

how? 버전을 통해 관리 (Version Control System)

by what? 디렉토리 중심 (Repository)



#### (2) 코드관리를 위한 기본 명령어

1. git init
   - .git 폴더 생성 : git 관련 데이터들이 저장된 폴더
   - (master) 프롬프트
   - 문제가 있다면 .git 폴더를 지우면 됨
   - git 폴더 때문에 꼬일 수 있으므로 주의해야함
2. git status
   - 현재 git 저장소(repository)의 상태를 확인
3. git add [파일명/폴더명]
   - staging Area에 파일 추가
4. git commit -m [메시지]
   - 스냅샷 저장(버전을 생성)
5. git log
   - 현재까지의 저장된 버전을 조회
   - git log --oneline
   - git log --oneline 1
6. git stash(임시 보관), git stash pop(임시 보관해제), git checkout master(마스터로 이동)

~~~
git config --global --list
user.email=ahngo13@gmail.com
user.name=Hamlet Shu

git commit -m "Modify a.txt"

git log --oneline

git diff //변경된 부분 확인

git remote add myremote https://github.com/ahngo13/test_repo.git

git remote -v(verbose) //말수가 많은

git credential reject

~~~

#### (3) 원격 저장소 관련 명령어

1. git remote
   - 현재 설정된 모든 원격저장소에 관한 정보를 조회
2. git remote add [저장소의 별명] [저장소의 주소]
   - `git remote add origin https://github.com/ahngo13

3. git push [저장소의 별명] [브랜치의 이름]
   - git push origin master
4. git clone [저장소의 주소] ([디렉토리 이름])
   - 디렉토리 이름까지는 안쓰는 경우가 있는 듯

#### (4) Branch

#### "브랜치는 일회용" : 더 이상 쓰이지 않는 브랜치는 항상 정리 필요

1. git branch
   - 현재 브랜치를 조회
2. git branch [브랜치명]
   - 브랜치 생성

3. git checkout [브랜치명]
   - 브랜치 이동
4. git merge [(합칠)브랜치명]
   - (주의)master에서 test 병합할 때, merge 전에 마스터로 이동 후
   - git checkout master => git merge test
5. git branch -d [(삭제할)브랜치명] / `git branch -D [브랜치명]
   - 이미 병합된 브랜치를 삭제할 경우(-d): soft deletion
   - 병합되지 않은 브랜치를 삭제할 경우(-D): hard deletion

#### (5) Merge 시나리오

1. Fast-Forward Merge : 관련없는 새로운 파일로 작업을 했을 경우
2. Auto Merge : 겹칠수도 있고 겹치지 않을 수도 있고
3. Merge Conflict : 같은 파일의 동일 라인일 경우에 (동일파일, 동일 line, 다른내용)



### 2.협업 도구

#### (1)Push & Pull 모델(끝말잇기)

- Synchronous 작업(동기적인 작업)
- 해당 프로젝트에 대한 push 권한이 있어야 함(공동 작업자로 초대)

#### (2) Fork & Pull Request 모델(백일장)



### 3.배포 도구


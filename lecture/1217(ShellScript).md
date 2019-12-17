# 12/17



### 셸 스크립트 프로그래밍

#### 셸

사용자가 입력한 명령을 해석해 커널에게 전달하거나, 커널의 처리 결과를 사용자에게 전달하는 역할을 한다.



#### 우분투의 bash 셸

- alias 기능(명령 단축 기능), history 기능, 연산 기능, job control 기능, 자동 이름 완성 기능, 프롬프트 제어 기능, 명령 편집 기능



#### 셸의 명령문 처리 방법

(프롬프트) 명령 [옵션...] [인자...]



#### 셸 스크립트 작성

- vi name.sh
- gedit name sh



#### echo $ 환경변수 : 설정된 환경변수 실행

#### printenv : 환경변수 목록 확인

#### sh 스트립트파일(.sh) : 셸 스크립트 실행(권한 없어도 가능)

#### chmod + x 파일명 : 실행 가능 속성 추가

#### ./스크립트파일(.sh) : 셸 스크립트 실행(실행권한 필요)



name.sh

~~~shell
#!/bin/sh
echo "사용자 이름: " $USER # $USER 환경변수 내용 출력
echo "홈 디렉터리: " $HOME # $HOME 환경변수 내용 출력
exit 0
~~~



#### 변수와 입력과 출력

var.sh

~~~shell
#!/bin/sh
myvar="HI Hamlet Shu"
echo $myvar
echo "$myvar"
echo '$myvar' # 글자취급
echo \$myvar # 글자취급
echo 값 입력:
read myvar # 
echo '$myvar' = $myvar
exit 0
~~~



#### 숫자 계산

numcalc.sh

~~~shell
#!/bin/sh
num1=100
num2=$num1+200
echo $num2
num3=`expr $num1 + 200` #expr 키워드를 사용해서 +, -, *, / 연산 수행
echo $num3
num4=`expr \( $num1 + 200 \) / 10 \* 2`
echo $num4
exit 0
~~~



#### 파라미터 변수

paravar.sh

sh paravar.sh 값1, 값2, 값3

실행 파일 이름은<paravar.sh>이다

첫번째 파라미터는 <값1>이고, 두번째 파라미터는 <값2>다

전체 파라미터는 <값1 값2 값3>다

~~~shell
#!/bin/sh
echo"실행 파일 이름은 <$0>이다" # <>는 필수아님
echo "첫번째 파라미터는 <$1>이고, 두번째 파라미터는 <$2>다"
echo "전체 파라미터는 <$*>다"
exit
~~~



#### 기본 if 문

if1.sh

~~~shell
#!/bin/sh
if [ "woo" = "woo" ] #if [ 조건 ] 사이의 각 단어에는 모두 공백이 있어야 함
then
	echo "블록체인 이대로 괜찮은가" # 참일 경우 실행
fi
exit 0
~~~



#### 조건문에 들어가는 비교 연산자

if3.sh

~~~shell
#!/bin/sh
if [ 100 -eq 100 ] # 두 수식 또는 변수가 같을 경우 참
then
	echo "100과 200은 같다." # 참일 경우 실행
else 
	echo "100과 200은 다르다." # 거짓인 겨우 실행
fi
exit 0
~~~



#### 파일과 관련된 조건

if4.sh

~~~shell
#!/bin/sh
fname=/lib/systemd/system/cron.service
if [ -f $fname ] # 일반 파일이면 참
then
	head -5 $fname # 참일 경우 실행
else
	echo "cron 서버가 설치되지 않았습니다." # 거짓일 경우 실행
fi
exit 0
~~~



#### case~esac문

case1.sh

~~~shell
#!/bin/sh
case "$1" in
	start) 
		echo "과정 시작~~";; ##세미콜론 2개를 붙여야 braek가 됨
	stop)
		echo "과정 중지~~";;
	restart)
		echo "과정 다시 시작~~";;
	*)
		echo "블록체인이 뭔지 모름";;
esac
exit 0
~~~

case2.sh

~~~shell
#!/bin/sh
echo "트와이트 노래 중 이 곡을 알고있나요? (yes or yes)"
read answer # answer 변수에 입력한 값을 받는다
case $answer in
	yes | y | Y | Yes | YES)
		echo "트둥이들을 잘 아시는군요~"
		echo "아주 훌륭합니다!";;
	[nN]*) # 앞에 n 또는 N이 들어가는 모든 단어를 다 인정해준다는 의미
		echo "사람도 아니군요~";;
	*)
		echo "물어본 말에 대답하세요~"
		exit 1;;
esac
exit 0
~~~



#### AND, OR 관계 연산자

andor.sh

~~~shell
#!/bin/sh
echo "미칠 듯 사랑했던 기억이~ 추억들이~ 너를 잡고 있지만~"
echo "보고싶은 파일명을 입력하세요."
read fname
if [ -f $fname ] && [ -s $fname ] ; then # 일반 파일이고 크기가 0이 아니라면
	head -5 $fname # 5행을 출력
else
	echo "파일이 없어서 보고싶거나, 있는데 용량이 없습니다!" # 그렇지 않을 경우 실행
fi
exit 0
~~~



#### for~in문

forin1.sh

~~~shell
#!/bin/sh
hap=0
for i in 1 2 3 4 5 6 7 8 9 10 # 1~10까지 반복해 넣으면서 실행한다
do
	hap=`expr $hap + $i` # do 반복할 문장 done
done
echo "1부터 10까지의 합: "$hap
exit 0
~~~

forin2.sh

~~~shell
#!/bin/sh
for fname in $(ls *.sh) # ls *.sh 명령의 실행결과를 하나씩 넣는다.
do
	echo "-------$fname-------" # 파일이름을 출력
	head -3 $fname # 파일의 앞 3줄을 출력
done
exit 0

~~~



#### while문

while1.sh

~~~shell
#!/bin/sh
while [ 1 ]
do
	echo "수업 언제 끝나나" #참인 동안에 계속 반복
done
exit 0

~~~

while2.sh

~~~shell
#!/bin/sh
hap=0
i=1 # 1에서 10까지 증가할 i 변수 선언
while [ $i -le 10 ] #i가 10보다 작거나 같으면
do
	hap=`expr $hap + $i`
	i=`expr $i + 1`
done
echo "1부터 10까지 합 : "$hap 
exit 0
~~~

while3.sh

~~~shell
#!/bin/sh
echo "비밀번호를 입력하세요."
read mypass # mypass 변수에 값을 입력
while [ $mypass != "1234" ] 
do
	echo "아니지롱~ 약오르지? 다시한번 맞춰봐!" # 변수의 값이 1234가 아니면 실행
	read mypass
done
echo "올~ 기억력 좋은데?" # 변수의 값이 1234가 맞으면 실행
exit 0
~~~



#### break, continue, exit, return

bce.sh

~~~shell
#!/bin/sh
echo "거의 셸 스크립트 기계가 된 느낌입니다. (b: break, c: continue, e: exit)"
while [ 1 ] ; do
	read input
	case $input in
		b | B)
			break;; # b또는 B가 입력될 경우
		c | C)
			echo "continue를 누르면 while의 조건으로 돌아감" #c 또는 C가 입력될 경우
			continue ;;
		e | E)
			echo "exit를 누르면 프로그램(함수)를 완전히 종료함" # e 또는 E가 입력될 경우
			exit 1;;
	esac;
done
echo "break를 누르면 while을 빠져나와 지금 이 문장이 출력됨."
exit 0
~~~



#### 사용자 정의 함수

func1.sh

~~~shell
#!/bin/sh
myFunction(){ #함수를 정의
	echo "함수 안으로 들어 왔음" #내용들
	return
}

echo "프로그램을 시작합니다."
myFunction # 함수를 호출
echo "프로그램을 종료합니다."
exit 0

~~~



#### 함수의 파라미터 사용

func2.sh

~~~shell
#!/bin/sh
hap (){
	echo `expr $1 + $2`
}
echo "10 더하기 20을 실행합니다"
hap 10 20 # 함수 이름에 넘겨줄 파라미터를 공백으로 분리해서 전달
exit 0
~~~



#### eval

eval.sh

~~~shell
#!/bin/sh
str="ls -l eval.sh" # 입력받는 내용이 명령어인 경우 보안이 위험
echo $str
eval $str
exit 0
~~~



#### export

외부 변수로 선언

exp1.sh

~~~shell
#!/bin/sh
echo $var1
echo $var2
exit 0
~~~

exp2.sh

~~~shell
#!/bin/sh
var1="지역 변수"
export var2="외부 변수"
sh exp1.sh # 외부 변수를 전달하여 exp1.sh를 호출
exit 0
~~~



#### printf

printf.sh

~~~shell
#!/bin/sh
var1=100.5
var2="재미있는 리눅스~~" # var2에 이미 ""로 묶여있으나
printf "%5.2f \n\n \t %s \n" $var1 "$var2" # "$var2"로 한번 더 묶어줘야 함
exit
~~~



#### set과 $(명령)

set.sh

~~~shell
#!/bin/sh
echo "오늘 날짜는 ${date} 입니다람쥐" # 2016. 08 .09 (화) 21:23:08 KSS
set $(date)
echo "오늘은 $4 요일 입니다." # 4번째 위치에 해당하는 (화)가 포함되어 출력
exit 0
~~~



#### shift

shift.sh

~~~shell
#!/bin/sh
myfunc () {
	str=""
	while [ "$1" != "" ] ; do # 파라미터가 비어있지 않는 동안 반복
		str="$str $1" # str 변수에 $1을 추가
		shift # 전체 파라미터를 왼쪽으로 쉬프트 ex) $2 → $1
	done
	echo $str # 누적한 변수를 출력
}
myfunc AAA BBB CCC DDD EEE FFF GGG HHH III JJJ KKK
exit 0
~~~


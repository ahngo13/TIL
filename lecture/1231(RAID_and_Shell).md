# 12/31

QUIZ1. 다음 명령어의 실행 결과가 나머지와 다른 것은? 4번

1. root@server:/bin# ls

2. root@server:/bin# ls .

3. root@server:/bin# ls ./
4. root@server:/bin# ls /
5. root@server:/bin# ls /bin
6. root@server:/bin# ls /bin/*
7. root@server:/bin# ls /bin/

절대경로 : 현재 위치에 관계없이 사용

상대경로 : 현재 위치를 기준으로 사용



QUIZ2. 특정 디렉터리에서 root 사용자 홈 디렉터리로 이동 방법

root@swarm-manager:~/dira# cd 

root@swarm-manager:~/dira# cd ~

root@swarm-manager:~/dira# cd ..

root@swarm-manager:~/dira# cd /root

root@swarm-manager:~/dira# cd $HOME



QUIZ3. 다음 명령어의 실행 결과는?

root@server:/tmp# touch aaa

root@server:/tmp# touch bbb

root@server:/tmp# touch ccc

root@server:/tmp# mkdir ddd

root@server:/tmp# ls

aaa

bbb

ccc

ddd ← 디렉터리

root@server:/tmp# mv aaa bbb ccc ddd

aaa, bbb, ccc 3개의 파일을 ddd 디렉터리로 옮겨라.



QUIZ4. >와 >> 차이점

\> : 덮어쓰기

\>> : 추가하기(append)

~~~
root@swarm-manager:~# date > now
root@swarm-manager:~# cat now
2019. 12. 31. (화) 09:34:02 KST
root@swarm-manager:~# date >> now
root@swarm-manager:~# cat now
2019. 12. 31. (화) 09:34:02 KST
2019. 12. 31. (화) 09:36:11 KST
~~~



QUIZ5. cat all 명령어의 실행 결과가 아래와 같이 나오도록 >를 이용해서 all 파일을 생성해 보세요.

~~~
nanjini@linux:~$ date > aaa
nanjini@linux:~$ cat aaa
2019. 12. 29. (일) 20:58:38 KST
nanjini@linux:~$ date > bbb
nanjini@linux:~$ cat bbb
2019. 12. 29. (일) 20:58:49 KST
nanjini@linux:~$ cat all
2019. 12. 29. (일) 20:58:38 KST
2019. 12. 29. (일) 20:58:49 KST
~~~

~~~
root@swarm-manager:~# cat aaa bbb > all
root@swarm-manager:~# cat all
2019. 12. 31. (화) 09:38:27 KST
2019. 12. 31. (화) 09:38:34 KST
~~~



**문항1**다음 조건을 만족하는 쉘 스크립트 파일(backup.sh)과 crontab 파일을 제출하시오. 

1. 매월 16일 새벽 3시 20분에 /home 디렉터리 전체를 백업해서 /backup 디렉터리에 저장합니다.
2.  백업 파일은 "backup.년.월.일.tar.xz" 형식으로 생성합니다. ( 예: backup.2019.05.21.tar.xz )
3. 백업 기능은 /root/backup.sh 쉘 스크립트 파일로 구현하고, cron에 등록해서 주기적으로 실행합니다.
4. 쉘 스크립트 파일의 소유자는 root입니다.



20 3 16 * * root /root/backup.sh



\#!/bin/bash

set $(date)

fname="backup.$1$2$3tar.xz"

tar cfJ /backup/$fname /home



### RAID

여러 개의 하드디스크를 하나의 하드디스크처럼 사용하는 방식

https://myanjini.tistory.com/73



\#1 하드디스크 9개 추가

\#2 서버 부팅 후 하드디스크 추가 확인

> root@swarm-worker1:~# ls /dev/sd*
>
> /dev/sda   /dev/sda2  /dev/sdc  /dev/sde  /dev/sdg  /dev/sdi
>
> /dev/sda1  /dev/sdb   /dev/sdd  /dev/sdf  /dev/sdh  /dev/sdj
>
> root@swarm-worker1:~# ls -l /dev/sd*
>
> brw-rw---- 1 root disk 8,   0 12월 20 17:33 /dev/sda
>
> brw-rw---- 1 root disk 8,   1 12월 20 17:33 /dev/sda1
>
> brw-rw---- 1 root disk 8,   2 12월 20 17:33 /dev/sda2
>
> brw-rw---- 1 root disk 8,  16 12월 20 17:33 /dev/sdb
>
> brw-rw---- 1 root disk 8,  32 12월 20 17:33 /dev/sdc
>
> brw-rw---- 1 root disk 8,  48 12월 20 17:33 /dev/sdd
>
> brw-rw---- 1 root disk 8,  64 12월 20 17:33 /dev/sde
>
> brw-rw---- 1 root disk 8,  80 12월 20 17:33 /dev/sdf
>
> brw-rw---- 1 root disk 8,  96 12월 20 17:33 /dev/sdg
>
> brw-rw---- 1 root disk 8, 112 12월 20 17:33 /dev/sdh
>
> brw-rw---- 1 root disk 8, 128 12월 20 17:33 /dev/sdi
>
> brw-rw---- 1 root disk 8, 144 12월 20 17:33 /dev/sdj



9개의 디스크를 RAID용으로 파티션을 생성

> root@swarm-worker1:~# **fdisk /dev/sdb**
>
> Welcome to fdisk (util-linux 2.27.1).
>
> Changes will remain in memory only, until you decide to write them.
>
> Be careful before using the write command.
>
> Device does not contain a recognized partition table.
>
> Created a new DOS disklabel with disk identifier 0x5bc090da.
>
> Command (m for help): **m**
>
> Help:
>
>   DOS (MBR)
>
>    a   toggle a bootable flag
>
>    b   edit nested BSD disklabel
>
>    c   toggle the dos compatibility flag
>
>   Generic
>
>    d   delete a partition
>
>    F   list free unpartitioned space
>
>    l   list known partition types
>
>    n   add a new partition
>
>    p   print the partition table
>
>    t   change a partition type
>
>    v   verify the partition table
>
>    i   print information about a partition
>
>   Misc
>
>    m   print this menu
>
>    u   change display/entry units
>
>    x   extra functionality (experts only)
>
>   Script
>
>    I   load disk layout from sfdisk script file
>
>    O   dump disk layout to sfdisk script file
>
>   Save & Exit
>
>    w   write table to disk and exit
>
>    q   quit without saving changes
>
>   Create a new label
>
>    g   create a new empty GPT partition table
>
>    G   create a new empty SGI (IRIX) partition table
>
>    o   create a new empty DOS partition table
>
>    s   create a new empty Sun partition table
>
> Command (m for help): **n**
>
> Partition type
>
>    p   primary (0 primary, 0 extended, 4 free)
>
>    e   extended (container for logical partitions)
>
> Select (default p): **p**
>
> Partition number (1-4, default 1): **1**
>
> First sector (2048-4194303, default 2048): 
>
> Last sector, +sectors or +size{K,M,G,T,P} (2048-4194303, default 4194303): 
>
> Created a new partition 1 of type 'Linux' and of size 2 GiB.
>
> Command (m for help): **t**
>
> Selected partition 1
>
> Partition type (type L to list all types): **L**
>
>  0  Empty           24  NEC DOS         81  Minix / old Lin bf  Solaris        
>
>  1  FAT12           27  Hidden NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
>
>  2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
>
>  3  XENIX usr       3c  PartitionMagic  84  OS/2 hidden or  c6  DRDOS/sec (FAT-
>
>  4  FAT16 <32M      40  Venix 80286     85  Linux extended  c7  Syrinx         
>
>  5  Extended        41  PPC PReP Boot   86  NTFS volume set da  Non-FS data    
>
>  6  FAT16           42  SFS             87  NTFS volume set db  CP/M / CTOS / .
>
>  7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux plaintext de  Dell Utility   
>
>  8  AIX             4e  QNX4.x 2nd part 8e  Linux LVM       df  BootIt         
>
>  9  AIX bootable    4f  QNX4.x 3rd part 93  Amoeba          e1  DOS access     
>
>  a  OS/2 Boot Manag 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O        
>
>  b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor      
>
>  c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad hi ea  Rufus alignment
>
>  e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         eb  BeOS fs        
>
>  f  W95 Ext'd (LBA) 54  OnTrackDM6      a6  OpenBSD         ee  GPT            
>
> 10  OPUS            55  EZ-Drive        a7  NeXTSTEP        ef  EFI (FAT-12/16/
>
> 11  Hidden FAT12    56  Golden Bow      a8  Darwin UFS      f0  Linux/PA-RISC b
>
> 12  Compaq diagnost 5c  Priam Edisk     a9  NetBSD          f1  SpeedStor      
>
> 14  Hidden FAT16 <3 61  SpeedStor       ab  Darwin boot     f4  SpeedStor      
>
> 16  Hidden FAT16    63  GNU HURD or Sys af  HFS / HFS+      f2  DOS secondary  
>
> 17  Hidden HPFS/NTF 64  Novell Netware  b7  BSDI fs         fb  VMware VMFS    
>
> 18  AST SmartSleep  65  Novell Netware  b8  BSDI swap       fc  VMware VMKCORE 
>
> 1b  Hidden W95 FAT3 70  DiskSecure Mult bb  Boot Wizard hid fd  Linux raid auto
>
> 1c  Hidden W95 FAT3 75  PC/IX           bc  Acronis FAT32 L fe  LANstep        
>
> 1e  Hidden W95 FAT1 80  Old Minix       be  Solaris boot    ff  BBT            
>
> Partition type (type L to list all types): **fd**
>
> Changed type of partition 'Linux' to 'Linux raid autodetect'.
>
> Command (m for help): **p**
>
> Disk /dev/sdb: 2 GiB, 2147483648 bytes, 4194304 sectors
>
> Units: sectors of 1 * 512 = 512 bytes
>
> Sector size (logical/physical): 512 bytes / 512 bytes
>
> I/O size (minimum/optimal): 512 bytes / 512 bytes
>
> Disklabel type: dos
>
> Disk identifier: 0x5bc090da
>
> Device     Boot Start     End Sectors Size Id Type
>
> /dev/sdb1        2048 4194303 4192256   2G fd Linux raid autodetect
>
> Command (m for help): **w**
>
> The partition table has been altered.
>
> Calling ioctl() to re-read partition table.
>
> Syncing disks.



> root@swarm-worker1:~# ls /dev/sd*
>
> /dev/sda   /dev/sdb   /dev/sdc1  /dev/sde   /dev/sdf1  /dev/sdh   /dev/sdi1
>
> /dev/sda1  /dev/sdb1  /dev/sdd   /dev/sde1  /dev/sdg   /dev/sdh1  /dev/sdj
>
> /dev/sda2  /dev/sdc   /dev/sdd1  /dev/sdf   /dev/sdg1  /dev/sdi   /dev/sdj1



mdadm 패키지 설치

> root@swarm-worker1:~# apt-get install mdadm



스냅샷 생성



RAID 구성

> root@swarm-worker1:~# **mdadm --create /dev/md9 --level=linear --raid-devices=2 /dev/sdb1 /dev/sdc1**
>
> mdadm: Defaulting to version 1.2 metadata
>
> mdadm: array /dev/md9 started.
>
> 
>
> root@swarm-worker1:~# **mdadm --detail --scan**
>
> ARRAY /dev/md9 metadata=1.2 name=swarm-worker1:9 
>
> UUID=85241310:eaa8dd56:9a719675:491153a8



포맷

> root@swarm-worker1:~# **mkfs.ext4 /dev/md9**
>
> mke2fs 1.42.13 (17-May-2015)
>
> Creating filesystem with 785408 4k blocks and 196608 inodes
>
> Filesystem UUID: ed137eea-5a57-486c-b012-7e3bf9d9ad85
>
> Superblock backups stored on blocks: 
>
> ​	32768, 98304, 163840, 229376, 294912
>
> Allocating group tables: done                            
>
> Writing inode tables: done                            
>
> Creating journal (16384 blocks): done
>
> Writing superblocks and filesystem accounting information: done 



> root@swarm-worker1:~# **mkdir /raidLinear**
>
> root@swarm-worker1:~# **mount /dev/md9 /raidLinear**
>
> root@swarm-worker1:~# **df** (디스크의 가용공간 확인)
>
> Filesystem     1K-blocks    Used Available Use% Mounted on
>
> udev              484152       0    484152   0% /dev
>
> tmpfs             100744    6400     94344   7% /run
>
> /dev/sda2       78499768 8502228  65986892  12% /
>
> tmpfs             503712      12    503700   1% /dev/shm
>
> tmpfs               5120       0      5120   0% /run/lock
>
> tmpfs             503712       0    503712   0% /sys/fs/cgroup
>
> tmpfs             100744      48    100696   1% /run/user/0
>
> /dev/md9         3026704    4608   2848632   1% /raidLinear



fstab 등록

root@swarm-worker1:~# **gedit /etc/fstab**

**/dev/md9	/raidLinear	ext4	dafaults	0	0**



RAID 정보 확인

root@swarm-worker1:~# **mdadm --detail /dev/md9**

/dev/md9:

​        Version : 1.2

  Creation Time : Tue Dec 31 11:28:23 2019

​     Raid Level : linear

​     Array Size : 3141632 (3.00 GiB 3.22 GB) **← sdb(2G) + sdc(1G)**

   Raid Devices : 2

  Total Devices : 2

​    Persistence : Superblock is persistent

    Update Time : Tue Dec 31 11:28:23 2019
          State : clean 
 Active Devices : 2

Working Devices : 2

 Failed Devices : 0

  Spare Devices : 0

```
   Rounding : 0K
       Name : swarm-worker1:9  (local to host swarm-worker1)
       UUID : 85241310:eaa8dd56:9a719675:491153a8
     Events : 0
Number   Major   Minor   RaidDevice State

   0       8       17        0      active sync   /dev/sdb1
   1       8       33        1      active sync   /dev/sdc1
```


354~356 RAID0, RAID1 생성 실습

실습 후 결과

> root@swarm-worker1:~# **df | grep /dev/md**
>
> /dev/md9         3026704    4608   2848632   1% /raidLinear **← sdb(2G) + sdc(1G)**
>
> /dev/md0         2027408    3072   1903300   1% /raid0 **← sdd(1G) + sde(1G)**
>
> /dev/md1         1014104    1284    944088   1% /raid1 **← sdf(1G) + sdg(1G)**



357~360 RAID5 생성 실습

실습 후 결과

> root@swarm-worker1:~# **df | grep md**
>
> /dev/md0         2027408    3072   1903300   1% /raid0
>
> /dev/md1         1014104    1284    944088   1% /raid1
>
> /dev/md5         2027408    3072   1903300   1% /raid5
>
> /dev/md9         3026704    4608   2848632   1% /raidLinear



#### 장애 복구 테스트

##테스트 용도의 파일을 각 레이드 장치에 생성

장애대응 : RAID 1(미러링, 백업), RAID 5(패리티)

각 RAID 장치에 설정

> root@swarm-worker1:~# **cp /boot/vmlinuz-4.4.0-21-generic /raidLinear/testFile**
>
> root@swarm-worker1:~# **cp /boot/vmlinuz-4.4.0-21-generic /raid0/testFile**
>
> root@swarm-worker1:~# **cp /boot/vmlinuz-4.4.0-21-generic /raid1/testFile**
>
> root@swarm-worker1:~# **cp /boot/vmlinuz-4.4.0-21-generic /raid5/testFile**



\##하드디스크 제거

SCSI 0:x 번째 하드디스크를 제거

x : 2, 4, 6, 9번 



##시스템 시작



~375까지 실습



### bash 셸 스크립트

> root@swarm-worker1:~# vi /etc/fstab
>
> root@swarm-worker1:~# myval="Hi Woo"
>
> root@swarm-worker1:~# echo $myval
>
> Hi Woo
>
> root@swarm-worker1:~# echo "$myval"
>
> Hi Woo
>
> root@swarm-worker1:~# echo '$myval'
>
> $myval
>
> root@swarm-worker1:~# echo \$myval
>
> $myval
>
> root@swarm-worker1:~# echo \$ myval
>
> $ myval
>
> root@swarm-worker1:~# echo \$ $myval
>
> $ Hi Woo
>
> root@swarm-worker1:~# echo \$$myval
>
> $Hi Woo



> root@swarm-worker1:~# read myval
>
> Hello World
>
> root@swarm-worker1:~# echo $myval
>
> Hello World
>
> root@swarm-worker1:~# echo \$myval = $myval
>
> $myval = Hello World
>
> root@swarm-worker1:~# echo '$myval' = $myval
>
> $myval = Hello World
>
> root@swarm-worker1:~# echo " '$myval' = $myval"
>
>  'Hello World' = Hello World



#!/bin/bash와 #!/bin/sh랑은 다름

gugudan1.sh

~~~shell
#!/bin/bash

#for i in 1 2 3 4 5 6 7 8 9 10
for (( i= 2; i<=9 ; i ++ ))
#for i in $(seq 1 10)
	do
		for (( j= 1; j<=9 ; j ++ ))
			do
			echo $i \* $j = `expr $i \* $j`
		done
	done

exit 0
~~~



gugudan2.sh

~~~shell
#!/bin/bash

#for i in 1 2 3 4 5 6 7 8 9 10
for (( j= 1; j<=9 ; j ++ ))
#for i in $(seq 1 10)
	do
		for (( i= 2; i<=9 ; i ++ ))
			do
			printf "%s x %s = %s \t" $i $j `expr $i \* $j`
		done
	done

exit 0
~~~



난수를 생성해주는 함수

root@swarm-worker1:~# **apt-get install rand**

root@swarm-worker1:~# **echo $(rand)**

17725



문제. quiz.sh 을 작성하시오.

1) 임의의 숫자를 생성 : rand

2)사용자가 숫자를 입력해서 1)에서 생성한 숫자를 맞추는 게임

3)만약, 사용자가 입력한 숫자가 1)에서 생성한 숫자와 다르면, 크다, 작다 메시지를 출력하고, 맞으면 정답 메시지를 출력하고 종료한다.

4)맞추는 회수는 10회로 제한한다.

5)10회를 초과하면 실패 메시지를 출력하고 종료한다.



~~~shell
#!/bin/bash

count=0
r=$(rand)
echo $r
while [ $count -lt 10 ]
do
	echo "숫자를 입력하세요"
	read num
	if [ $num -eq $r ]
	then	echo "맞췄습니다! 축하합니다"
		break;
	else
		if [ $num -gt $r ]
		then	echo "더 작은 수를 입력하세요"
		else 
			echo "더 큰 수를 입력하세요"
		fi
	fi
	count=`expr $count + 1`
done
exit 1
~~~


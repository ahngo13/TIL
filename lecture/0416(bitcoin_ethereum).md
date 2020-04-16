

### 로컬 비트코인 코어 연결

~~~
bitcoind -regtest -printtoconsole -datadir="C:\TEMP\mynode" -rpcpassword=12345
~~~

새 콘솔창

~~~
bitcoin-cli -regtest -rpcpassword=12345 getbalance
~~~



### 다른 비트코인 코어 연결

~~~
bitcoind -regtest -printtoconsole -datadir="C:\TEMP\mynode2" -addnode=70.12.113.173:18444 -rpcport=54321
~~~



## 이더리움

https://geth.ethereum.org/downloads/



~~~
1. geth1.8.8 설치

2. C:\TEMP\geth\private_net 폴더 기준

3. genesis블락의 헤더 작성 후 C:\TEMP\geth\private_net\genesis.json 으로 저장
{
  "config": {
        "chainId": 4777,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
  "alloc"      : {},
  "difficulty" : "0x400",
  "extraData"  : "",
  "gasLimit"   : "0x7A1200",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00"
}


4. 기본 설정 파일 얻음
geth --datadir C:\TEMP\geth\private_net init C:\TEMP\geth\private_net\genesis.json

5. 이더리움 네트웍 가동
geth --networkid "10" --nodiscover --datadir C:\TEMP\geth\private_net --rpc --rpcaddr "localhost" --rpcport "8545" --rpccorsdomain "*" --rpcapi "eth,net,web3,personal" --targetgaslimit "20000000" console 2>> C:\TEMP\geth\private_net\error.log 

5. 
>personal.newAccount("1234")
>personal.newAccount("1234")
>personal.newAccount("1234")

6. geth 종료
>exit


7. C:\TEMP\geth\private_net 에 pw.txt만들기
1234
1234
1234

8. geth --networkid "10" --nodiscover --datadir C:\TEMP\geth\private_net --rpc --rpcaddr "localhost" --rpcport "8545" --rpccorsdomain "*" --rpcapi "eth,net,web3,personal" --targetgaslimit "20000000" console 2>> C:\TEMP\geth\private_net\error.log -unlock "0xb3762c4cd92afeb839dbcc10c1f0a66b6bfcec40", "0x9dde7902c33621e8bb5c47b849d825ef5c65adb7", "0xcc9508ecfe27def4f0effc7be935b82a84acdfaa" --password C:\TEMP\geth\private_net\pw.txt

(==>생성해 놓은 계정 주소를 잘 붙여 넣고 수행해야 함)

9. eth.accounts

10. eth.coinbase

11. miner.start(1) (스레드 몇개 쓸거니?)

12. eth.mining

13.eth.getBalance(eth.accounts[0])

14. web3.fromWei(eth.getBalance(eth.accounts[0]),"ether")

15. eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[2],value:web3.toWei(5,"ether")})

16. web3.fromWei(eth.getBalance(eth.accounts[2]),"ether")

(==> 5이더가 확인됨)

~~~



http://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.1+commit.e6f7d5a4.js
index.jsx

~~~js
var {Component} = React;
var {Router, Route, IndexRoute, Link} = ReactRouter;
 
class Main extends Component{
    render(){
        return(            
            <div>
                <h1>BlockChain Study</h1>
                <ul className="header" >
                    <li><Link exact to="/">Home</Link></li>
                    <li><Link to="/bitcoin">Bitcoin</Link></li>
                    <li><Link to="/ethereum">Ethereum</Link></li>
                    <li><Link to="/hyperledger">Hyperledger</Link></li>
                </ul>
                <div className="content">
                {this.props.children}
                </div>
            </div>            
        );
    }
}
 
class Home extends Component{
    render(){
        return(
            <div>
                <h2>HELLO</h2>
                <p>안녕하세요? BlockChain 노드 웹 예제(dApp)입니다. 잘해보죠~!!!</p>
            </div>
        );
    }
}

class List extends Component{
    render(){
    let property;
    if(this.props.property === ''){
        property='admin';
    }else{
        property=this.props.property;
    }
        return(
            <div>
                <p>{property} : {this.props.data}</p>
            </div>
        );
    }
}


class BitcoinNetwork extends Component{
    state={
	blockNumber:0,
	acc1_balance:0,
	acc2_balance:0,
        userList:[]
    }
    
    bit_network_connect=()=>{
        axios.get('/bit_network/connect')
        .then((response)=>{
            console.log(response.data);
            const returnData = response.data;
	    let returnList = [];
	    for (const property in returnData) {
	      returnList.push(<List property={property} data={returnData[property]}></List>);
	    }

            this.setState({
            userList:returnList
            });
            
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    send=()=>{
        alert(this.amount.value);
        axios.post('/bit_network/send',{"amount":this.amount.value})
        .then((response)=>{
            console.log(response);
            this.setState({
                blockNumber:response.data.blockNumber,
                acc1_balance:response.data.acc1_balance,
                acc2_balance:response.data.acc2_balance
            });
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    createUser=()=>{
    	alert(this.joinId.value);
	axios.post('/bit_network/joinup',{"joinId":this.joinId.value})
        .then((response)=>{
	    console.log(response.data);
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    render(){
        return(
            <div>
                <h2>BitcoinNetwork</h2>
                <p><button onClick={this.bit_network_connect}>연결</button></p>
                <br/>
                {this.state.userList}
                <br/>
                <div>acc1가 acc2에게
                <input placeholder='송금량' ref={ref=>this.amount=ref} />BTC
                <button onClick={this.send}> 보내기</button><br/>
		<input type="text" ref={ref=>this.joinId=ref}/>
		<button onClick={this.createUser}>join up</button><br/>               
                </div>
            </div>
        );
    }
}
class EthereumNetwork extends Component{  
 
    render(){
        return(
            <div>
                <h2>EthereumNetwork 연결 해보세요</h2>                
            </div>
        );
    }
}
class HyperledgerNetwork extends Component{  
 
    render(){
        return(
            <div>
                <h2>HyperledgerNetwork 연결 해보세요</h2>                
            </div>
        );
    }
}
 
ReactDOM.render(
    (<Router>
        <Route path="/" component={Main} >   
            <Route path="bitcoin" component={BitcoinNetwork}/>
            <Route path="ethereum" component={EthereumNetwork} />
            <Route path="hyperledger" component={HyperledgerNetwork} />
            <IndexRoute component={Home} />
        </Route>
    </Router>)
    ,document.getElementById("root")
);

~~~



bitcoin_network_router.js

~~~js
const express = require('express');
const router = express.Router();

let client;

/* GET */
router.get('/connect', async (req, res, next) =>{
    try{
        
        if(!client){
            let RpcClient=require('bitcoind-rpc-client');
            client=new RpcClient(
                {
                    user:"test",
                    pass:"test",
                    host:"127.0.0.1",
                    port:12345
                }
            );
        }
        

        let blockNumber=await client.getBlockCount();
        console.log(blockNumber);
        let balance1=await client.getBalance('acc1');
        console.log(balance1);
        let balance2=await client.getBalance('acc2');
        console.log(balance2);

	let {result} = await client.listAccounts();

/*
        let result={
            "blockNumber":blockNumber.result,
            "acc1_balance":balance1.result,
            "acc2_balance":balance2.result
        }
*/
        console.log(result);

        res.json(result);
    }catch(e){
        console.log(e);
        res.json({"msg":"fail"});
    }
});
  

/* POST */
router.post('/send', async (req, res, next) =>{
    try{
        let RpcClient=require('bitcoind-rpc-client');
        if(!client){
            res.json({'msg':'please connect...'});
            return;
        }
        
        let re=await client.move('acc1','acc2',req.body.amount);
        console.log(re);
        let re2=await client.generate(1);
        console.log(re2);
        let blockNumber=await client.getBlockCount();
        console.log(blockNumber);
        let balance1=await client.getBalance('acc1');
        console.log(balance1);
        let balance2=await client.getBalance('acc2');
        console.log(balance2);

        let result={
            "blockNumber":blockNumber.result,
            "acc1_balance":balance1.result,
            "acc2_balance":balance2.result
        }

        console.log(result);

        res.json(result);
    }catch(e){
        console.log(e);
        res.json({"msg":"fail"});
    }
});

router.post('/joinup', async (req, res, next) =>{
    try{

      let RpcClient=require('bitcoind-rpc-client');
 
      if(!client){
            res.json({'msg':'please connect...'});
            return;
        }
        
	const result = await client.getNewAddress(req.body.joinId);
	console.log(result);

	res.json({message:"success", result});

        
    }catch(e){
        console.log(e);
        res.json({"msg":"fail"});
    }
});

module.exports = router;
~~~


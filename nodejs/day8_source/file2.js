const fs = require('fs');

fs.writeFile('./text.txt', 'update Text file', (err)=>{
    if(err){
        console.log('error : ' + err);
    }
    console.log('text.txt 파일에 데이터 쓰기');
});
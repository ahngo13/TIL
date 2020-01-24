const fs = require('fs');

//동기식으로 파일을 읽어옴
const data = fs.readFileSync('./text.txt','utf-8');

console.log(data);

//비동기식으로 읽어옴
fs.readFile('./text.txt','utf-8',(err,data)=>{
    console.log(data);
});
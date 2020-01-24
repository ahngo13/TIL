process.on('exit',()=>{
    console.log('exit 이벤트 발생');
});

setTimeout(()=>{
    console.log('2초 후 시스템 종료 시도');

    process.exit();
},2000);


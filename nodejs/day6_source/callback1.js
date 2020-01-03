function add(a, b, callback){
    var result = a+b;
    callback(result);
}

add(20, 20, function(result){
    console.log('콜백 함수 호출');
    console.log('더하기 결과 : %d', result);
});
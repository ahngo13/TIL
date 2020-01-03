function add(a, b, callback){
    var result = a + b;
    callback(result);
    
    var count = 0;
    var history = function(){
        count++;
        return count + ' : ' + a + ' + ' + b + ' = ' + result;
    };
    return history;
}

var add_history = add(20, 20, function(result){
    console.log('콜백 함수 호출');
    console.log('더하기 결과 : %d', result);
});

console.log(add_history());
console.log(add_history());
console.log(add_history());
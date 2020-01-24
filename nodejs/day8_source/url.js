const url = require('url');
const querystring = require('querystring');

//주소 문자열을 URL 객체로 만듦
const curlURL = url.parse('https://www.youtube.com/watch?v=IbtKd3XGL3c');

// URL 객체를 주소 문자열로 만들기
const curStr = url.format(curlURL);

console.log(`주소문자열 : ${curStr}`);
console.dir(curlURL);

//요청 파라미터 확인하기
const param = querystring.parse(curlURL.query);
console.log(`파라미터 안에있는 v 값: ${param.v}}`);
console.log(`원본 파라미터: ${querystring.stringify(param)}`);
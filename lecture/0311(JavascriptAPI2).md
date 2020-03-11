### formidable 모듈로 이미지 업로드 구현

server.js

~~~js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", require("./routes/uploadRouter"));

app.listen(8080, () => {
  console.log("listen... ummummummumm~");
});

~~~



index.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="upload/img" method="POST" enctype="multipart/form-data">
      <input type="file" name="filetoupload" />
      <input type="submit" value="파일 업로드" />
    </form>
  </body>
</html>

~~~



uploadRouter.js

~~~js
const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const router = express.Router();

fs.readdir("uploads", error => {
  if (error) {
    console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다!");
    fs.mkdirSync("uploads");
  }
});

router.post("/img", (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    console.log(files);
    var oldpath = files.filetoupload.path;
    var newpath = "uploads/" + files.filetoupload.name;
    console.log(oldpath);
    console.log(newpath);
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
      res.write("File uploaded and moved!");
      res.end();
    });
  });
});

module.exports = router;

~~~



### 웹 워커

index.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let w;
      function startWorker() {
        if (typeof Worker !== undefined) {
          if (typeof w == "undefined") {
            w = new Worker("workertask.js");
          }
          w.onmessage = function(event) {
            //편지 받기
            document.getElementById("result").innerHTML = event.data;
          };
        } else {
          document.getElementById("result").innerHTML =
            "이 브라우저가 Worker를 지원하지 않습니다";
        }
      }

      function stopWorker() {
        w.terminate();
      }
    </script>
  </head>
  <body>
    <form action="upload/img" method="POST" enctype="multipart/form-data">
      <input type="file" name="filetoupload" />
      <input type="submit" value="파일 업로드" />
    </form>
    <hr />
    <button onclick="startWorker()">500 보다 큰 소수 찾기</button>
    <p>결과: <span id="result"></span></p>
  </body>
</html>

~~~



workertask.js

~~~js
let i = 1;
while (true) {
  i++;
  //소수 찾기 하는 로직
  for (let j = 2; j < Math.sqrt(i); j++) {
    if (i % j == 0) continue;
  }
  if (i > 500) postMessage(i); //편지 부치기
}

~~~



### 웹소켓으로 실시간 채팅 만들기

index.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      let w;
      function startWorker() {
        if (typeof Worker !== undefined) {
          if (typeof w == "undefined") {
            w = new Worker("workertask.js");
          }
          w.onmessage = function(event) {
            //편지 받기
            document.getElementById("result").innerHTML = event.data;
          };
        } else {
          document.getElementById("result").innerHTML =
            "이 브라우저가 Worker를 지원하지 않습니다";
        }
      }

      function stopWorker() {
        w.terminate();
      }

      let webSocket, chatId;
      function startChat() {
        webSocket = new WebSocket("ws://localhost:8080");
        webSocket.onopen = function() {
          chatId = "[" + document.getElementById("chatId").value + "]";
          if (chatId) {
            alert("채팅 시작");
          } else {
            alert("채팅 아이디를 입력하세요");
          }
        };
        //webSocket 안에 webWorker가 들어있는 것을 알 수 있음
        webSocket.onmessage = function(event) {
          console.log(event.data);
          document.getElementById("ta").value += event.data;
        };
      }

      function sendMessage(event) {
        if (event.key === "Enter") {
          console.log("서버로 전송 시작");
          webSocket.send(
            chatId + document.getElementById("sendText").value + "\n"
          );
          document.getElementById("sendText").value = "";
        }
      }
    </script>
  </head>
  <body>
    <form action="upload/img" method="POST" enctype="multipart/form-data">
      <input type="file" name="filetoupload" />
      <input type="submit" value="파일 업로드" />
    </form>
    <hr />
    <button onclick="startWorker()">500 보다 큰 소수 찾기</button>
    <p>결과: <span id="result"></span></p>
    <hr />
    <input id="chatId" placeholder="채팅 아이디를 입력하세요" /><button
      onclick="startChat()"
    >
      채팅 접속</button
    ><br />
    <textarea id="ta" rows="10" cols="50"></textarea><br />
    <input id="sendText" onkeypress="sendMessage(event)" />
  </body>
</html>

~~~



server.js

~~~js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", require("./routes/uploadRouter"));

const server = app.listen(8080, () => {
  console.log("listen... ummummummumm~");
});

const webSocket = require("./socket");
webSocket(server);

~~~



socket.js

~~~js
const WebSocket = require("ws");

a = server => {
  //server socket....
  const wss = new WebSocket.Server({ server }); //서버 소켓

  wss.on("connection", (ws, req) => {
    //소켓
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("새로운 클라이언트 접속", ip);
    ws.on("message", message => {
      wss.clients.forEach(client => {
        //살아있는 모든 클라이언트에게 보냄
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
    ws.on("error", error => {
      console.error(error);
    });
    ws.on("close", () => {
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });
    /*     const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send("서버에서 클라이언트로 메시지를 보냅니다.");
      }
    }, 3000);
    ws.interval = interval; */
  });
};

module.exports = a;

~~~



### Giolocation API

index.html

~~~js
let x;
      function getLocation() {
        x = document.getElementById("demo");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          x.innerHTML = "Geolocation is not supported by browser.";
        }
      }
      
      function getLocationMap() {
        x = document.getElementById("demo");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPositionMap, showError);
        } else {
          x.innerHTML = "Geolocation is not supported by browser.";
        }
      }

      function showPositionMap(position){
        const latlon = position.coords.latitude + "," + position.coords.longitude;
        const img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+ latlon +
        "&zoom=14&size=400x300&key=AIzaSyCEsAO2rb8R6VR2gVpYIJTNASoqvMXBrag";
        document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
      }

      function showError(error){
        x = document.getElementById("demo");
          switch(error.code){
              case error.PERMISSION_DENIED: x.innerHTML = "User denied the request for Geolocation";
              break;
              case error.POSITION_UNAVAILABLE: x.innerHTML = "Location information is unavailable.";
              break;
              case error.TIMEOUT: x.innerHTML = "The request to get user location timed out.";
              break;
              case error.UNKNOWN_ERROR: x.innerHTML = "An unknown error occurred.";
              break;
          }
      }

      function showPosition(position) {
        x = document.getElementById("demo");
        x.innerHTML =
          "Latitude: " +
          position.coords.latitude +
          "<br>Longitude:" +
          position.coords.longitude;
      }

    <button onclick="getLocation()">현재 위치 확인</button>
    <hr />
    <div id="demo"></div>

    <button onclick="getLocationMap()">현재 위치 확인(구글 지도보기)</button>
    <hr />
    <div id="mapholder""></div>
~~~



### Server Sent Events

https://www.w3schools.com/html/html5_serversentevents.asp

index.html

~~~js
 let source = new EventSource('/sse');
      function sse(){
          source.onmessage=function(event){
              console.log(event.data);
          }
      }

      function sse_stop(){
          source.close();
      }
      
      <button onclick="sse()">경매 진행 보기</button>
    <button onclick="sse_stop()">경매 진행 그만보기</button>
~~~



server.js

~~~js
const b = require("./sse");
b(server);
~~~



sse.js

~~~js
const SSE = require("sse");

let price = 100;

b = server => {
  const sseObj = new SSE(server);
  sseObj.on("connection", client => {
    // client.send(price);
    setInterval(() => {
      client.send("현재입찰가:" + (price *= 2));
    }, 5000);
  });
};

module.exports = b;

~~~



### 보안 체크

- 로그인 횟수 제한

- google reCAPTCHA : https://developers.google.com/recaptcha/docs/v3
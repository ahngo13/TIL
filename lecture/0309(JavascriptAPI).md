## 자바스크립트 API 활용

- 태그로 할수도 있지만 API를 사용했을 경우 파일들을 미리 로딩해두고 로딩시간의 지연없이 곧바로 웹브라우저 화면에서 실행될 수 있다.

### audio

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- <audio src="music01.mp3" controls></audio> -->
    <script>
      var audio1 = new Audio();
      function musicPlay() {
        audio1.src = document.getElementById("song2").value;
        audio1.play();
      }

      function musicStop() {
        audio1.pause();
        audio1.currentTime = 0;
      }
    </script>

    듣고싶은 음악을 선택하세요<br /><br />
    희망곡 :
    <select id="song2">
      <option value="music01.mp3" selected>music01</option>
      <option value="music02.mp3">music02</option>
      <option value="music03.mp3">music03</option>
    </select>

    <div>
      <button onclick="musicPlay();">노래시작</button>
      <button onclick="audio1.pause();">일시멈춤</button>
      <button onclick="audio1.play();">계속감상</button>
      <button onclick="audio1.currentTime-=1;">되돌리기</button>
      <button onclick="musicStop();">멈춤</button>
    </div>
  </body>
</html>

~~~



### img

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      var i = 0;
      imgTotal = 3;
      var imgFile = "image";
      function change() {
        var obj = document.getElementById("img1");
        i = (i + 1) % imgTotal;
        imgFile = imgFile + i + ".jpg";
        obj.src = imgFile;
        imgFile = "image";
      }
    </script>

    이미지 보기 &nbsp; &nbsp;
    <input type="button" value="Next" onclick="change()" />
    <hr />
    <img id="img1" src="image0.jpg" width="200" height="150" />
    <hr />
  </body>
</html>

~~~



### 로컬 스토리지

- 웹 브라우저가 웹 문서에게 항상 제공하는 저장 공간으로 웹 브라우저 종료 이후에도 계속 유지

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function showPoint() {
        document.getElementById("totalPoint").value = localStorage.points;
      }

      function clickPoint() {
        if (localStorage !== null) {
          if (localStorage.points) {
            localStorage.points++;
          } else {
            localStorage.points = 1;
          }
          document.getElementById("totalPoint").value = localStorage.points;
        } else {
          document.getElementById("totalPoint").value = "포인트 적립 불가";
        }
      }

      function clearPoint() {
        localStorage.removeItem("points");
        document.getElementById("totalPoint").value = localStorage.points;
      }
    </script>
  </head>
  <body onload="showPoint()">
    <p>
      누적 포인트 :
      <input type="text" id="totalPoint" size="6" disabled />
      <button onclick="clickPoint()">+</button>
      <button onclick="clearPoint()">reset</button>
    </p>
    <hr />
    <p>"+"을 클릭하면, 로컬포인트가 추가됨</p>
  </body>
</html>

~~~



### 세션 스토리지

- 웹 브라우저가 웹 문서를 로드해서 서버와 연결을 유지하고 있는 동안만 웹 문서에게 제공, 웹 브라우저가 종료되면 세션 스토리지에 저장된 자료들은 자동 삭제

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function showPoint() {
        document.getElementById("totalPoint").value = sessionStorage.points;
      }

      function clickPoint() {
        if (sessionStorage !== null) {
          if (sessionStorage.points) {
            sessionStorage.points++;
          } else {
            sessionStorage.points = 1;
          }
          document.getElementById("totalPoint").value = sessionStorage.points;
        } else {
          document.getElementById("totalPoint").value = "포인트 적립 불가";
        }
      }

      function clearPoint() {
        sessionStorage.removeItem("points");
        document.getElementById("totalPoint").value = sessionStorage.points;
      }
    </script>
  </head>
  <body onload="showPoint()">
    <p>
      누적 포인트 :
      <input type="text" id="totalPoint" size="6" disabled />
      <button onclick="clickPoint()">+</button>
      <button onclick="clearPoint()">reset</button>
    </p>
    <hr />
    <p>"+"을 클릭하면, 로컬포인트가 추가됨</p>
  </body>
</html>

~~~



### 드래그 앤 드롭 API

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #div1,
      #div2 {
        width: 300px;
        height: 100px;
        border: 1px solid black;
      }
      img {
        width: 50px;
        height: 50px;
        margin: 10px;
      }
    </style>
    <script>
      function dragstartListener(e) {
        console.log(e.target);
        e.dataTransfer.setData("imgNo", e.target.id);
      }

      function dragoverListener(e) {
        e.preventDefault();
      }

      function dropListener(e) {
        console.log(e.target);
        e.preventDefault();
        var data = e.dataTransfer.getData("imgNo");
        e.target.appendChild(document.getElementById(data));
      }
    </script>
  </head>
  <body>
    <p>드래그&드롭 기능을 이용한 이미지 이동</p>
    <div
      id="div1"
      ondrop="dropListener(event)"
      ondragover="dragoverListener(event)"
    >
      <img
        src="./image/logo0.png"
        draggable="true"
        ondragstart="dragstartListener(event)"
        id="d0"
      />
      <img
        src="./image/logo1.png"
        draggable="true"
        ondragstart="dragstartListener(event)"
        id="d1"
      />
      <img
        src="./image/logo2.png"
        draggable="true"
        ondragstart="dragstartListener(event)"
        id="d2"
      />
      <img
        src="./image/logo3.png"
        draggable="true"
        ondragstart="dragstartListener(event)"
        id="d3"
      />
    </div>
    <div
      id="div2"
      ondrop="dropListener(event)"
      ondragover="dragoverListener(event)"
    ></div>
  </body>
</html>

~~~



### 파일 API

사용자 컴퓨터의 텍스트 파일 읽기

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      var fileObj;
      function a() {
        fileObj = document.getElementById("file1");
      }

      function b() {
        var fileList = fileObj.files;
        console.log(fileList);

        var reader = new FileReader();
        reader.readAsText(fileList[0]);
        console.log(fileList[0]);

        reader.onload = function() {
          document.getElementById("content").textContent = reader.result;
          console.log(reader.result);
        };
      }
    </script>
  </head>
  <body onload="a()">
    파일 선택 : <input type="file" id="file1" onchange="b()" />
    <hr />
    <div id="content"></div>
  </body>
</html>

~~~

사용자 컴퓨터의 이미지 파일 읽기

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      var fileObj;
      function a() {
        fileObj = document.getElementById("file1");
      }

      function b() {
        var fileList = fileObj.files;
        console.log(fileList[0].type);

        var reader = new FileReader();

        //fileList 0번지 파일의 타입이 text로 시작할 경우
        if (fileList[0].type.startsWith("text")) {
          reader.readAsText(fileList[0]);
          console.log(fileList[0]);

          reader.onload = function() {
            document.getElementById("content").textContent = reader.result;
            console.log(reader.result);
          };
          //fileList 0번지 파일의 타입이 image로 시작할 경우
        } else if (fileList[0].type.startsWith("image")) {
          reader.readAsDataURL(fileList[0]);
          reader.onload = function() {
            document.getElementById("img").src = reader.result;
          };
        }
      }
    </script>
  </head>
  <body onload="a()">
    파일 선택 : <input type="file" id="file1" onchange="b()" />
    <hr />
    <div id="content"></div>
    <img src="" id="img" />
  </body>
</html>

~~~



### multer 모듈로 이미지 업로드 구현

express 환경 세팅

npm init

npm i express

npm i multer



index.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script
      src="https://code.jquery.com/jquery-3.4.1.js"
      integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
      crossorigin="anonymous"
    ></script>

    <title>Document</title>
  </head>
  <body>
    <form action="imgUpload/img" enctype="multipart/form-data" method="POST">
      <input type="file" name="file"/>
      <input type="submit" value="파일 업로드"></input>
    </form>
  </body>
</html>

~~~



server.js

~~~js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/imgUpload", require("./routes/uploadRouter"));

app.listen(8080, () => {
  console.log("8080 listen umm umm umm umm~~");
});

~~~



uploadRouter.js

~~~js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

fs.readdir("uploads", error => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다!");
    fs.mkdirSync("uploads");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post("/img", upload.single("file"), (req, res) => {
  //   console.log(req);
  console.log(req.file);
  res.end("file upload ok");
  //   res.json({ url: `/img/${req.file.filename}` });
});

module.exports = router;

~~~


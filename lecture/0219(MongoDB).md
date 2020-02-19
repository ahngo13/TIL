## MongoDB

#### MongoDB 사이트에서 다운 후 설치 (모두 Default)

https://www.mongodb.com/download-center/community



#### cmd 창 띄워서 mongod 입력(server)

- 실행이 제대로 되지 않는 것을 확인할 수 있음(폴더 경로가 존재하지 않아서 에러 발생)



#### C:\data\db 폴더 생성



#### 새로운 cmd 창 하나 더 띄워서 mongo 입력(client)

~~~
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

> use admin //admin 데이터베이스 접속
switched to db admin

> db //현재 데이터베이스 위치 확인
admin

//계정 추가
> db.createUser({user: 'root', pwd:'mongo', roles:['root']})
Successfully added user: { "user" : "root", "roles" : [ "root" ] }
~~~



#### 기존 커맨드 창은 닫고 새 커맨드 창 실행

~~~
C:\Users\student>mongo admin -u root -p // root 계정으로 admin 데이터베이스 접속

> use nodejs //nodejs라는 DB가 없는데 이동이 됨 
switched to db nodejs

> db
nodejs

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

//컬렉션 생성
> db.createCollection('member')
{ "ok" : 1 }
> show collections
member
> db.createCollection('comments')
{ "ok" : 1 }
> show collections
comments
member

//데이터 insert
> db.member.save({name:'zero', age:24, married:false, comment:'안녕?'})
WriteResult({ "nInserted" : 1 })
> db.member.save({aaa:'bbb'})
WriteResult({ "nInserted" : 1 })

//데이터 조회
> db.member.find()
{ "_id" : ObjectId("5e4c8a5b37d8cd848d0bb81d"), "name" : "zero", "age" : 24, "married" : false, "comment" : "안녕?" }
{ "_id" : ObjectId("5e4c8ab437d8cd848d0bb81e"), "aaa" : "bbb" }

//데이터 조회(예쁘게)
> db.member.find().pretty()
{
        "_id" : ObjectId("5e4c8a5b37d8cd848d0bb81d"),
        "name" : "zero",
        "age" : 24,
        "married" : false,
        "comment" : "안녕?"
}
{ "_id" : ObjectId("5e4c8ab437d8cd848d0bb81e"), "aaa" : "bbb" }

//데이터 선택해서 조회하기
> db.member.find({_id:ObjectId("5e4c8ab437d8cd848d0bb81e")})
{ "_id" : ObjectId("5e4c8ab437d8cd848d0bb81e"), "aaa" : "bbb" }
~~~



#### MongoDB Manual

https://docs.mongodb.com/manual/crud/



#### select(조회)

~~~
//comments 콜렉션에 데이터 insert
> db.comments.save({commenter:ObjectId("5e4c8a5b37d8cd848d0bb81d"), comment:'댓글',cratedAt:new Date()})
WriteResult({ "nInserted" : 1 })

//comments 콜렉션에서 데이터 find
> db.comments.find()
{ "_id" : ObjectId("5e4c922b61e8ebfd17610e20"), "commenter" : ObjectId("5e4c8a5b37d8cd848d0bb81d"), "comment" : "댓글", "cratedAt" : ISODate("2020-02-19T01:40:59.248Z") }

> db.member.save({name:'안시우',age:30,married:0})
WriteResult({ "nInserted" : 1 })

//member 콜렉션에서 name과 married 정보만 조회
> db.member.find({},{_id:0, name:1, married:1})
{ "name" : "zero", "married" : false }
{  }
{ "name" : "안시우", "married" : 0 }


> db.member.find({age:{$gt:20}, married:false},{_id:0, name:1, age:1})
{ "name" : "zero", "age" : 24 }
> db.member.find({age:{$gt:20}, married:0},{_id:0, name:1, age:1})
{ "name" : "안시우", "age" : 30 }
> db.member.find({age:{$gt:31}, married:0},{_id:0, name:1, age:1})

sort을 활용한 정렬 내림차순(-1)
> db.member.find({},{_id:0, name:1, age:1}).sort({age:-1})
{ "name" : "안시우", "age" : 30 }
{ "name" : "zero", "age" : 24 }
{  }
sort을 활용한 정렬 오름차순(1)
> db.member.find({},{_id:0, name:1, age:1}).sort({age:1})
{  }
{ "name" : "zero", "age" : 24 }
{ "name" : "안시우", "age" : 30 }
~~~



#### Update(수정)

~~~
//name이 zero인 사람의 comment를 hi로 변경
> db.member.update({name:'zero'},{$set:{comment:'hi'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.member.find()
{ "_id" : ObjectId("5e4c8a5b37d8cd848d0bb81d"), "name" : "zero", "age" : 24, "married" : false, "comment" : "hi" }
{ "_id" : ObjectId("5e4c8ab437d8cd848d0bb81e"), "aaa" : "bbb" }
{ "_id" : ObjectId("5e4c928e61e8ebfd17610e21"), "name" : "안시우", "age" : 30, "married" : 0 }

> db.member.update({name:'안시우'},{$set:{comment:'hihihihi'}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.member.find().pretty()                                 }})
{
        "_id" : ObjectId("5e4c8a5b37d8cd848d0bb81d"),
        "name" : "zero",
        "age" : 24,
        "married" : false,
        "comment" : "hi"
}
{ "_id" : ObjectId("5e4c8ab437d8cd848d0bb81e"), "aaa" : "bbb" }
{
        "_id" : ObjectId("5e4c928e61e8ebfd17610e21"),
        "name" : "안시우",
        "age" : 30,
        "married" : 0,
        "comment" : "hihihihi"
}
~~~



#### delete(삭제)

~~~
> db.member.remove({aaa:'bbb'})
WriteResult({ "nRemoved" : 1 })
> db.member.find().pretty()
{
        "_id" : ObjectId("5e4c8a5b37d8cd848d0bb81d"),
        "name" : "zero",
        "age" : 24,
        "married" : false,
        "comment" : "hi"
}
{
        "_id" : ObjectId("5e4c928e61e8ebfd17610e21"),
        "name" : "안시우",
        "age" : 30,
        "married" : 0,
        "comment" : "hihihihi"
}
~~~



### MongoDB 연동

~~~
npm init
npm i express
~~~

package.json

~~~json
    "start": "nodemon server",
~~~

server.js

~~~js
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/member", require("./routes/memberRouter"));

app.listen(8080, () => {
  console.log("listen umm~~~ umm~~ umm~~");
});

~~~

index.html

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
    <title>Document</title>
  </head>
  <body>
    <input placeholder="이름" id="name" /><br />
    <input placeholder="나이" id="age" /><br />
    <input type="checkbox" name="married" />결혼여부 <br />
    <button id="addMember">등록</button>
    <button id="updateMember">수정</button>
    <button id="getAllMember">모든 멤버 보기</button>
    <div id="all_div"></div>
    <script>
      function deleteMember(_id) {
        const send_param = { _id };
        $.post("/member/delete", send_param, function(returnData) {
          alert(returnData.message);
        });
      }

      function display(_id, name, age, married) {
        $.cookie("_id", _id); //설정 이름, 값
        console.log(_id);
        $("#name").val(name);
        $("#age").val(age);
        if (married != "false" || married != "undefined") {
          $("input[name='married']").prop("checked", true);
        } else {
          $("input[name='married']").prop("checked", false);
        }
      }

      $(document).ready(function() {
        $("#getAllMember").click(function() {
          $.post("/member/getAllMember", {}, function(returnData) {
            console.log(returnData.message);
            let result = `<table border="1"><tr><td>아이디</td><td>이름</td><td>나이</td><td>결혼</td><td>비고</td></tr>`;
            returnData.message.forEach(e => {
              result += `<tr><td onclick=display('${e._id}','${e.name}','${e.age}','${e.married}')>${e._id}</td><td>${e.name}</td><td>${e.age}</td><td>${e.married}</td><td><button onclick="deleteMember('${e._id}')">삭제</button></td></tr>`;
            });
            result += "</table>";
            $("#all_div").html(result);
          });
        });

        $("#updateMember").click(function() {
          const _id = $.cookie("_id");
          const name = $("#name").val();
          const age = $("#age").val();
          const married = $('input[name="married"]').is(":checked");
          //   alert(name + ":" + age + ":" + married);

          const send_param = { _id, name, age, married };
          $.post("/member/update", send_param, function(returnData) {
            alert(returnData.message);
          });
        });

        $("#addMember").click(function() {
          const name = $("#name").val();
          const age = $("#age").val();
          const married = $('input[name="married"]').is(":checked");
          alert(name + ":" + age + ":" + married);
          const send_param = { name, age, married };
          $.post("/member/add", send_param, function(returnData) {
            console.log(returnData.message);
          });
        });
      });
    </script>
  </body>
</html>

~~~

memberRouter.js

~~~js
const express = require("express");
const router = express.Router();
const mongo = require("mongodb");

//mongodb 연동
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/nodejs";
let dbo;
MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    dbo = db.db("nodejs");
  }
});

router.post("/getAllMember", (req, res) => {
  dbo
    .collection("member")
    .find({})
    .toArray(function(err, result) {
      if (err) {
        console.log(err);
        res.json({ message: false });
      } else {
        res.json({ message: result });
      }
    });
});

router.post("/add", (req, res) => {
  dbo.collection("member").insertOne(req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      console.log("1 document inserted");
      res.json({ message: true });
    }
  });
});

router.post("/update", (req, res) => {
  console.log(req.body._id);
  const myquery = { _id: mongo.ObjectID(req.body._id) };
  console.log(myquery);
  const newvalues = {
    $set: { name: req.body.name, age: req.body.age, married: req.body.married }
  };
  dbo.collection("member").updateOne(myquery, newvalues, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      console.log("1 document updated");
      res.json({ message: true });
    }
  });
});

router.post("/delete", (req, res) => {
  const myquery = { _id: mongo.ObjectID(req.body._id) };
  console.log(req.body._id);
  dbo.collection("member").deleteOne(myquery, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      console.log("1 document delete");
      res.json({ message: true });
    }
  });
});

module.exports = router;

~~~



### mongoose 사용

~~~
npm i mongoose
~~~

schemas 폴더 생성

index.js

~~~js
const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb:localhost:27017/nodejs",
      {
        dbName: "nodejs"
      },
      error => {
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.log("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect();
  });
  require("./user");
  require("./comment");
};

~~~

comments.js

~~~js
const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", commentSchema);

~~~

user.js

~~~js
const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  married: {
    type: Boolean,
    required: true
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);

~~~

mongo_userRouter.js

~~~js
const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

router.post("/delete", async (req, res) => {
  try {
    const result = await User.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    const result = await User.update({
      _id: req.body._id,
      name: req.body.name,
      age: req.body.age,
      married: req.body.married
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getAllMember", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ message: users });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;

~~~



https://mongoosejs.com/docs/api.html


import express from "express";
const app = express();

// app.get("/sky/:id", (req, res, next) => {
//   // console.log(req.path);
//   // console.log(req.headers)
//   // console.log(req.params); // path parameter -> object 형태로 key, value로 저장
//   // console.log(req.query); // query parameter -> object 형태로 key, value로 저장
//   // res.send("hi");
//   // res.json({ name: "Tony" });
//   // res.status(201).send("created");
//   // res.setHeader("key", "value");
//   // res.setHeader("Content-Type", "text/html");
// });

// 한 경로에 대해 여러 핸들러를 등록할 수 있다
// app.get(
//   "/",
//   (req, res, next) => {
//     console.log("first");
//     next();
//     // next("route"); // 다음 라우터로 넘어간다 -> first2를 건너뛰고 second로 넘어간다
//     // next(new Error("error")); // 에러를 발생시킨다
//   },
//   (req, res, next) => {
//     console.log("first2");
//     next();
//   }
// );

// app.get("/", (req, res, next) => {
//   console.log("second");
//   // res.send("hi");
//   next();
// });

// // 미들웨어
// // res.send()를 호출하지 않고 next()를 계속 호출한다면 여기에 도달하면서 404응답을 보낸다
// app.use((req, res, next) => {
//   res.status(404).send("Not Found");
// });

// // 에러 핸들러
// // 에러 핸들러를 등록하지 않으면 사용자에게 에러가 전달된다
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).send("Sorry try again later");
// });

// 포스트맨을 이용해서 POST 요청을 보내보자
app.use(express.json()); // json 형태의 데이터를 파싱해준다 -> req.body에 저장
app.post("/", (req, res, next) => {
  console.log(req.body);
  res.send("POST");
});

app.listen(8080);

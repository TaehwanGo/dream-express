import express from "express";
const app = express();

app.get("/sky/:id", (req, res, next) => {
  // console.log(req.path);
  // console.log(req.headers)
  console.log(req.params); // path parameter -> object 형태로 key, value로 저장
  console.log(req.query); // query parameter -> object 형태로 key, value로 저장
  res.send("hi");
});

app.listen(8080);

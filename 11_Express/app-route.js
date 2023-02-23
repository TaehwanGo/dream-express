import express from "express";
import postRouter from "./router/post.js";
import userRouter from "./router/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const option = {
  dotfiles: "ignore",
  etag: false,
  index: false,
  maxAge: "1d", // 캐시 유효기간
  redirect: false,
  setHeaders: (res, path, stat) => {
    res.set("x-timestamp", Date.now());
  },
};
// 정적 파일 제공
app.use(express.static("public", option));

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(8080);

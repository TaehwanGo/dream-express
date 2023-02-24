import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import postRouter from "./router/post.js";

const app = express();

// helmet 미들웨어 - 보안 관련 헤더 설정
app.use(helmet());
// morgan 미들웨어 - 로그 출력(사용자에게 요청을 받을 때 마다 로그를 출력)
app.use(morgan("combined")); // dev, short, common, combined
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use("/posts", postRouter);

app.use((err, req, res, next) => {
  res.status(404).send("not found");
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

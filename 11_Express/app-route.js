import express from "express";
import postRouter from "./router/post.js";
import userRouter from "./router/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

// helmet 미들웨어 - 보안 관련 헤더 설정
app.use(helmet());

// morgan 미들웨어 - 로그 출력(사용자에게 요청을 받을 때 마다 로그를 출력)
app.use(morgan()); // dev, short, common, combined

// 쿠키 파서 미들웨어
app.use(cookieParser()); // req.cookies.쿠키이름 으로 접근 가능

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors 설정 방법 1 - 직접 헤더를 설정
/**
 * 단점
 * - 헤더 이름을 정확히 알고 있어야 한다
 */
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });

// cors 설정 방법 2 - cors 미들웨어 사용
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    optionsSuccessStatus: 200, // 자동으로 200 응답을 보내도록 설정
    credentials: true, // 사용자 인증 정보를 포함 허용
  })
);

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

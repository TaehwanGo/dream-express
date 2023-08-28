import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { initSocket, getSocketIO } from "./connection/socket.js";
import { sequelize } from "./db/database.js";
import rateLimiter from "./middleware/rate-limiter.js";
import { TweetController } from "./controller/tweet.js";
import * as tweetRepository from "./data/tweet.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors()); // 배포 시엔 신경을 써주자 지금은 "*"
app.use(morgan("tiny"));
app.use(rateLimiter);

app.use(
  "/tweets",
  tweetRouter(new TweetController(tweetRepository, getSocketIO))
);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404);
});
app.use((req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// export const dbConnection = await connectDB();

sequelize.sync().then((client) => {
  // console.log(client);

  // db가 연결이 먼저 되고 서버를 실행하기 위해 then안에서 실행
  const server = app.listen(4000, () => console.log("Listening on port 4000"));
  initSocket(server);
});

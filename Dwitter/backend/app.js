import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { getSocketIO, initSocket } from "./connection/socket.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors()); // 배포 시엔 신경을 써주자 지금은 "*"
app.use(morgan("tiny"));

app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404);
});
app.use((req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
const server = app.listen(4000, () => console.log("Listening on port 4000"));

initSocket(server);

// getSocketIO().on("tony", (arg) => console.log("on tony", arg)); // not working

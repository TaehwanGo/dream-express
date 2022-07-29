const fs = require("fs");

const data = [];
const readStream = fs
  .createReadStream("./file.txt", {
    // 8바이트씩 읽는다. -> What is
    highWaterMark: 8, // default : 64KBytes https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#buffering
    // encoding: "utf-8",
  })
  // on과 달리 once는 한번만 실행되는 이벤트
  .once("data", (chunk) => {
    // console.log(chunk);
    data.push(chunk);
    console.count("data");
  })
  .on("end", () => {
    console.log(data.join("")); // 전체 데이터가 합쳐져서 출력 됨
  })
  .on("error", (err) => {
    console.log(err);
  });

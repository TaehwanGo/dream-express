const fs = require("fs");

const data = [];
const readStream = fs.createReadStream("./file.txt", {
  // highWaterMark: 8, // default : 64KBytes https://nodejs.org/dist/latest-v16.x/docs/api/stream.html#buffering
  encoding: "utf-8",
});

// on 메서드의 콜백함수에 전달되는 데이터는 우리가 인코딩을 utf-8로 했으므로 문자열이 된다
// 만약 인코딩 설정을 따로 지정하지 않았다면 chunk가 왔을 것이다
readStream.on("data", (chunk) => {
  // console.log(chunk);
  data.push(chunk);
  console.count("data");
});

readStream.on("end", () => {
  console.log(data.join("")); // 전체 데이터가 합쳐져서 출력 됨
});

readStream.on("error", (err) => {
  console.log(err);
});

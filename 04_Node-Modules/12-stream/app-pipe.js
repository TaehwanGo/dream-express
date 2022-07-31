const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./file.txt");
const zlibStream = zlib.createGzip(); // zipping 스트림
const writeStream = fs.createWriteStream("./file4.zip");

// 파이프는 여러개 연결 가능
const piping = readStream.pipe(zlibStream).pipe(writeStream); // readStream의 데이터를 받아서 writeStream에 연결

piping.on("finish", () => {
  console.log("done!");
});

const http = require("http");

const server = http.createServer((req, res) => {
  // 서버는 파일을 다 읽은 다음 메모리에 들어온 데이터를 보내줌
  // fs.readFile("file.txt", (err, data) => {
  //   res.end(data);
  // });

  // 위방식보다 스트림을 이용해서 스트림 자체를 파이핑해서 연결해주는 것이 좋음
  const stream = fs.createReadStream("./file.txt");
  stream.pipe(res);
});
server.listen(3000);

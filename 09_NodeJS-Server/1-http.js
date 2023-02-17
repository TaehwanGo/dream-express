const http = require("http");
const fs = require("fs");
/**
 * https와 함께 적용이 됨
 * https를 위한 SSL 인증서(certification)가 필요함
 */
// const http2 = require('http2');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

const server = http.createServer((req, res) => {
  console.log("incomming...");
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    // nodejs stream을 이용해서 ./html/output.html을 읽어서 전달해보자
    const readStream = fs.createReadStream("./html/index.html");
    readStream.pipe(res);
  } else if (url === "/courses") {
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("./html/courses.html").pipe(res);
  } else {
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
  // res.end(); // stream을 이용하면 end를 호출하면 안됨
});

server.listen(8080);

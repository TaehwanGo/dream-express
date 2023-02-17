const http = require("http");
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

  res.write("Hello World!!");
  res.end();
});

server.listen(8080);

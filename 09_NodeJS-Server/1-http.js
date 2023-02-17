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
  const url = req.url;
  if (url === "/") {
    // HTML을 전달해보자
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
    res.write("</html>");
  } else if (url === "/courses") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Courses</title></head>");
    res.write("<body><ul><li>Node.js</li><li>React</li></ul></body>");
    res.write("</html>");
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Not Found</title></head>");
    res.write("<body><h1>Page not found!</h1></body>");
    res.write("</html>");
  }
  res.end();
});

server.listen(8080);

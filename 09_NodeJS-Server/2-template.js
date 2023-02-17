const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
/**
 * https와 함께 적용이 됨
 * https를 위한 SSL 인증서(certification)가 필요함
 */
// const http2 = require('http2');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);
const name = "Tony";
const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "NodeJS" },
  { name: "React" },
];
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    // { name, courses } == { name: name, courses: courses }
    ejs
      .renderFile("./template/index.ejs", { name, courses })
      .then((data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      })
      .catch((err) => {
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>500 Internal Server Error</h1>");
      });
  } else if (url === "/courses") {
    ejs
      .renderFile("./template/courses.ejs", { courses })
      .then((data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      })
      .catch((err) => {
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>500 Internal Server Error</h1>");
      });
  } else {
    ejs
      .renderFile("./template/not-found.ejs", { name })
      .then((data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      })
      .catch((err) => {
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>500 Internal Server Error</h1>");
      });
  }
});

server.listen(8080);

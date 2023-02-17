const http = require("http");

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
  const method = req.method;
  if (url === "/courses") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(courses));
    } else if (method === "POST") {
      const body = []; // 버퍼 방식을 이용해보자
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
      });
      req.on("end", () => {
        const bodyStr = Buffer.concat(body).toString();
        const course = JSON.parse(bodyStr);
        courses.push(course);
        console.log(courses);
        res.writeHead(201);
        res.end();
      });
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8080);

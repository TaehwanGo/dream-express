const os = require("os");

console.log(os.EOL === "\n"); // 맥의 줄바꿈 문자
console.log(os.EOL === "\r\n"); // 윈도우의 줄바꿈 문자

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.type());
console.log(os.userInfo());
console.log(os.cpus());

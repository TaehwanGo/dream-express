const fs = require("fs");

// 💩
const beforeMem = process.memoryUsage().rss; // 메모리 상태 저장
fs.readFile("./file.txt", (_, data) => {
  // file을 전부 읽음
  fs.writeFile("./file2.txt", data, () => {}); // file2에 file을 쓴다
  // calculate
  const afterMem = process.memoryUsage().rss;
  const memDiff = afterMem - beforeMem;
  const consumed = memDiff / 1024 / 1024;
  console.log(memDiff);
  console.log(`Consumed ${consumed} MB`); // 실제로 메모리 사용량을 확인
});

const fs = require("fs");

// ๐ฉ
const beforeMem = process.memoryUsage().rss; // ๋ฉ๋ชจ๋ฆฌ ์ํ ์ ์ฅ
fs.readFile("./file.txt", (_, data) => {
  // file์ ์ ๋ถ ์ฝ์
  fs.writeFile("./file2.txt", data, () => {}); // file2์ file์ ์ด๋ค
  // calculate
  const afterMem = process.memoryUsage().rss;
  const memDiff = afterMem - beforeMem;
  const consumed = memDiff / 1024 / 1024;
  console.log(memDiff);
  console.log(`Consumed ${consumed} MB`); // ์ค์ ๋ก ๋ฉ๋ชจ๋ฆฌ ์ฌ์ฉ๋์ ํ์ธ
});

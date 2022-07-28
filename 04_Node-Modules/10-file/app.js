const fs = require("fs");

// file 이름 변경
// 만약 존재하지 않는 file에 접근하려 한다면 에러가 발생하고 node가 종료된다.
// 따라서 try catch로 감싸서 사용한다
try {
  fs.renameSync("./text.txt", "./text-new.txt");
} catch (error) {
  console.error(error);
}

fs.rename("./text-new.txt", "./text.txt", (err) => {
  console.log(err);
});

fs.promises
  .rename("./text2.txt", "./text2-new.txt")
  .then(() => {
    console.log("success");
  })
  .catch(console.error);

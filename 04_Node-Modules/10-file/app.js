const fs = require("fs");

// 방법 3가지
// 1. 비동기적 - rename(기존파일, 새파일, 콜백함수)
// 2. 동기적(Blocking) - renameSync(기존파일, 새파일)
// 3. Promise - promises.rename(기존파일, 새파일).then().catch(0)

// file 이름 변경
// 만약 존재하지 않는 file에 접근하려 한다면 에러가 발생하고 node가 종료된다.
// 따라서 try catch로 감싸서 사용한다
try {
  // 동기적 방식은 blocking하기 때문에 renameSync보단 비동기적 방식을 사용하는 것이 좋다
  fs.renameSync("./text.txt", "./text-new.txt");
} catch (error) {
  console.error(error);
}

fs.rename("./text-new.txt", "./text.txt", (err) => {
  console.log(err); // 에러가 발생하지 않으면 null
});

fs.promises
  .rename("./text2.txt", "./text2-new.txt")
  .then(() => {
    console.log("success");
  })
  .catch(console.error);

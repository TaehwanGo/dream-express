const fsPromises = require("fs").promises;

// read a file
// fsPromises
//   .readFile("text.txt", "utf8") // default는 buffer형태로 읽어온다 - <Buffer 72 65 6e 61 6d 65 20 74 65 78 74 20 66 69 6c 65>
//   .then((data) => {
//     console.log(data);
//   })
//   .catch(console.error);

// write a file
// fsPromises
//   .writeFile("text.txt", "Hello Node.js\n")
//   .then(() => {
//     // 이 프로미스의 리턴이 void이기 때문에 따로 작성은 안해도 됨
//     // 만약 성공했다는 로그를 찍고 싶다면 아래와 같이 찍을 수 있음
//     console.log("success");
//   })
//   .catch(console.error);

// append 기존의 데이터를 유지하면서 추가하고 싶을 때
fsPromises
  .appendFile("text.txt", "appended text\n")
  .then(() => {
    // promises의 then을 이용해서 각각의 비동기작업을 순서대로 처리할 수 있음
    fsPromises.copyFile("text.txt", "text2.txt").catch(console.error);
  })
  .catch(console.error);

// folder 생성
fsPromises.mkdir("sub-folder").catch(console.error);

fsPromises.readdir("./").then(console.log).catch(console.error);

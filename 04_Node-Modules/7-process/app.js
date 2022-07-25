const process = require("process");

console.log(process.execPath); // 실행되는 경로
console.log(process.version); // Node.js 버전
console.log(process.pid); // 현재 실행되는 프로세스의 아이디
console.log(process.ppid); // 상위 프로세스(부모)의 아이디
console.log(process.platform); // 현재 실행되는 플랫폼
console.log(process.env); // 현재 실행되는 환경변수 정보
console.log(process.uptime()); // 실행된 시간(초)
console.log(process.cwd()); // 현재 실행되는 프로세스의 작업 디렉토리
console.log(process.cpuUsage()); // 현재 실행되는 프로세스의 CPU 사용량

setTimeout(() => {
  // 콜백함수를 0ms 뒤에 실행하는 함수
  // 아래쪽의 process.nextTict
  console.log("setTimeout");
}, 0);

process.nextTick(() => {
  console.log("nextTick");
}); // 지금은 아닌데 현재 수행되고 있는 코드가 완료되면 등록한 콜백함수를 테스크 큐에 등록

for (let i = 0; i < 3; i++) {
  console.log("for loop");
}

const os = require("os");

console.log(os.EOL === "\n"); // 맥의 줄바꿈 문자 end of the line
console.log(os.EOL === "\r\n"); // 윈도우의 줄바꿈 문자

console.log(os.totalmem()); // 최종 메모리
console.log(os.freemem()); // 최종 메모리 중 사용 가능한 메모리
console.log(os.type()); // 운영체제 타입(mac은 Darwin - 리눅스 기반 커널)
console.log(os.userInfo()); // 사용자 정보
console.log(os.cpus()); // CPU 정보
console.log(os.homedir()); // 홈 디렉토리
console.log(os.hostname()); // 호스트 이름
console.log(os.networkInterfaces()); // 네트워크 인터페이스 정보

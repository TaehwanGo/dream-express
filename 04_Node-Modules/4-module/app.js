// console.log(count); // 외부 모듈에서 export 된 것만 사용 가능
// console.log(getCount());

const counter = require("./counter.js");

counter.increase();
counter.increase();
counter.increase();
console.log(counter.getCount());

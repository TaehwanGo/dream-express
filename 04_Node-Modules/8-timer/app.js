let num = 1;

/* setInterval */
// const interval = setInterval(() => {
//   console.log(num++);
// }, 1000);

// setTimeout(() => { // 3초 뒤 interval은 해제 되고, 3번째는 실행되지 않음
//   console.log("Timeout!");
//   clearTimeout(interval);
// }, 3000);

/**
 * setImmediate과 setTimeout는 process.nextTick 보다 나중에 실행 된다
 * code1 -> code2 -> code3 -> process.nextTick -> setTimeout 0 -> setImmediate
 */
// console.log("code1");
// setTimeout(() => {
//   console.log("setTimeout 0");
// }, 0);

// console.log("code2");
// setImmediate(() => {
//   console.log("setImmediate");
// });

// console.log("code3");
// process.nextTick(() => {
//   console.log("process.nextTick");
// });

/**
 * setTimeout의 시간을 0으로 지정한 경우 실제로 실행되는 시간은 정확하진 않다
 * 0초로 지정해도 1.688ms 가 나옴(개인 컴퓨터 마다 다름)
 */
console.time("timeout 0");
setTimeout(() => {
  console.timeEnd("timeout 0");
}, 0);

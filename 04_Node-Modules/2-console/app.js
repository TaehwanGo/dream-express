console.clear();

console.log("logging..."); // 개발
console.info("info"); // 정보
console.warn("warning"); // 경고
console.error("error"); // 에러 - 사용자 에러, 시스템 에러

// assert
console.assert(1 === 2, "not same!!"); // 참이 아닌 경우에만 출력
console.assert(1 === 1, "same!!"); // 참인 경우엔 출력되지 않음

// print object
const student = { name: "tony", age: 30, company: { name: "AC" } };
console.log(student);
console.table(student);
console.dir(student, { showhidden: true, colors: false, depth: 0 }); // depth : 중첩된 오브젝트를 어느정도까지 보여줄지 결정

// measuring time
console.time("for loop");
for (let i = 0; i < 10; i++) {
  const x = i * 2;
}
console.timeEnd("for loop");

// counting
function a() {
  console.count("a function");
}
a();
console.countReset("a function"); // counting 초기화
a();

// trace - debugging에서 사용
function f1() {
  f2();
}

function f2() {
  f3();
}

function f3() {
  console.trace("trace");
}

f1();

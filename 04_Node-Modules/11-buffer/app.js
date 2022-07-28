const buf = Buffer.from("Hi"); // 바로 버퍼를 만들 수 있는 API
console.log(buf); // <Buffer 48 69>
// buffer는 UTF-8로 변환되어 보관된다.

// Array 형태로 되어있기 때문에 인덱스로 접근할 수 있다.
// 배열을 출력하면 ASCII 코드가 출력된다.
console.log(buf[0]); // H -> 72
console.log(buf[1]); // i -> 105
console.log(buf.length); // 2

console.log(buf.toString()); // Hi

// create
// allocation의 약어 : 배당, 할당
// 메모리에서 사용가능한 덩어리를 찾고 그 덩어리를 초기화해서 사용가능하게 만듦
const buf2 = Buffer.alloc(2); // 2바이트를 가진 버퍼를 만든다.
const buf3 = Buffer.allocUnsafe(2); // 초기화를 하지 않으므로 안전하지 않다.(속도는 더 빠름)
buf2[0] = 72;
buf2[1] = 105;
buf2.copy(buf3); // buf2를 buf3에 복사
console.log(buf2); // <Buffer 48 69>
console.log(buf2.toString()); // Hi

console.log(buf3);
console.log(buf3.toString); // Hi

// concat
// 여러가지 버퍼를 모을 수 있음
const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf.toString()); // HiHiHi

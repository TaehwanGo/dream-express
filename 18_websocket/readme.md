# 18. Socket 실시간 트윗

## 18.1 소켓이란?

- HTTP : 요청 -> 응답
  - 서버에서 먼저 보낼 수 없음
- Web socket
  - 실시간으로 데이터를 주고 받을 수 있음

## 18.2 소켓의 기본 사용법 실습

- socket을 감싸고 있는 라이브러리인 socket.io를 사용한다

```
# backend
npm i socket.io

# frontend
npm i socket.io-client
```

## 18.3 실시간 트윗 받아오기

## 18.4 실시간 트윗 받아오기 - 서버

```js
// js에서 싱글톤을 활용해서 인스턴스를 하나만 만들어서 사용하는 방법

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO() {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket.io;
}
```

## 18.5 실시간 트윗 받아오기 - 프론트엔드

### socket.io-client API

#### socket.on(eventName, callback)

- 이벤트에 콜백함수를 등록
- https://socket.io/docs/v4/client-api/#socketoneventname-callback

```js
socket.on("news", (data) => {
  console.log(data);
});

// with multiple arguments
socket.on("news", (arg1, arg2, arg3, arg4) => {
  // ...
});
// with callback
socket.on("news", (cb) => {
  cb(0);
});
```

#### socket.emit(eventName, data)

- `socket.emit(eventName[, ...args][, ack])`
  - eventName : 이벤트 이름
  - ...args : 이벤트에 전달할 데이터
  - ack : 서버에서 받은 응답을 받을 콜백함수
- https://socket.io/docs/v4/client-api/#socketemiteventname-args

##### Client side

```js
socket.emit("hello", "world", (response) => {
  console.log(response); // "got it"
});
```

##### Server side

```js
io.on("connection", (socket) => {
  socket.on("hello", (arg, callback) => {
    console.log(arg); // "world"
    callback("got it");
  });
});
```

- 서버에서 이벤트를 받으려면 connection 이벤트를 받아서 나오는 socket을 사용한다

#### socket.connect()

- 소켓을 수동으로 연결합니다.
- https://socket.io/docs/v4/client-api/#socketconnect

## 18.6 소켓에서도 중요한 Auth

```js
// client/network/socket.js
import socket from "socket.io-client";

/**
 * 웹소켓에서 표준으로 정해진 auth를 사용해야 한다 - 조금 더 보안에 강화된 방법 !
 * 만약 socket(this.baseURL, { query: { token: getAccessToken() } }) 이렇게 하면
 * - 브라우저에서 콘솔에서도 토큰을 확인할 수 있고 로그에도 남을 수 있다
 */
const io = socket(baseURL, {
  auth: (cb) => cb({ token: getAccessToken() }),
});
```

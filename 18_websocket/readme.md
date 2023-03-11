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

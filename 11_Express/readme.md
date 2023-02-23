# 11. Express.js

## 11.1 왜 Express.js인가?

- 많은 사람들이 사용한다 -> 안정성
  - 많은 사람들이 사용하면 버그가 발견되면 빠르게 수정됨
  - 관련 라이브러리가 커뮤니티에서 만들어져있을 수 있다
- 배우기 쉽다
- Express
  - 경량형 프레임워크

## 11.2 Express의 큰그림, 중요 포인트!

```js
const express = require("express");
const app = express();

app.get("/posts", (req, res, next) => {
  res.send("...");
});

app.post("/posts", (req, res, next) => {
  res.send("...");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
```

- app.get, app.post

  - HTTP 메서드를 통해서 어떤 동작을 할지 정의
  - 첫 번째 인자
    - URL
  - 두 번째 인자
    - 콜백 함수
      - 첫 번째 인자
        - req
          - request
          - 클라이언트가 보낸 요청에 대한 정보
      - 두 번째 인자
        - res
          - response
          - 서버가 클라이언트에게 보내는 응답에 대한 정보
      - 세 번째 인자
        - next
          - 다음에 실행될 콜백 함수
          - 미들웨어에서 사용

- express를 한 문장으로 정의한다면

  - 미들웨어의 연속(체인)이다
  - use(json) -> use(headers) -> get(/) -> get(/posts) -> use(error) -> ...

- next() 함수 : 다음 미들웨어로 넘어감

- express의 다양한 미들웨어들
  - express 자체에서 제공
  - 커뮤니티에서 제공

## 11.3 서버 만들기

## 11.4 요청에 대해서

## 11.5 응답에 대해서

## 11.6 미들웨어의 중요한 특징

- 미들웨어 체이닝

### app.all() vs app.use()

- all

  - 모든 HTTP 메서드에 대해서 적용
  - 특정 url에 대해서만 적용하고 싶다면
    - app.all("/posts", (req, res, next) => {
      ...
      });
  - all에서도 `/posts/*`와 같이 하위 경로에 대해서 적용할 수 있다

- use
  - 모든 HTTP 메서드에 대해서 적용
  - 하위 경로 전체에 대해서 적용
    - app.use("/posts", (req, res, next) => {
      ...
      });

### res.send() 이후엔 return을 붙여서 종료하게 하자!

### 미들웨어는 next()를 호출해야 다음으로 넘어간다!

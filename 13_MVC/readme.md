# 13. 리팩토링 - MVC

## 13.1 MVC 패턴이란? 서버에 어떻게 활용할까?

- view : 보여지는 화면(UI)
- controller : 뷰와 모델을 연결하는 비즈니스 로직
- model : 데이터

#### 서버에서 MVC

- view : router
- controller : logic
- model : data

## 13.2 현재 서버 코드의 문제점 개선하기

- router에 모든 로직이 들어있음

## 13.3 서버에 Data층을 만들어보기

## 13.4 서버에 Controller층을 만들어보기

- 로직이 바뀌어야 한다면, controller를 수정하면 된다.
- 데이터가 바뀌어야 한다면, model(data)을 수정하면 된다.

## 13.5 async 비동기 함수들의 매력 포인트

- async 비동기 함수들은 promise를 반환한다.

## 13.6 프론트엔드 코드 개선

```js
async function postTweet(text) {
  return this.http.fetch(`/tweets`, {
    method: "POST",
    body: JSON.stringify({ text, username: "tony", name: "Tony" }),
  });
}
```

- Promise 형태로 바로 리턴
- 만약 에러가 발생된다면 Promise.reject()를 리턴한다.

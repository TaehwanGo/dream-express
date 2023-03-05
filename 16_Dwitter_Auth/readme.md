# 16. Dwitter - 로그인 적용

## 16.1 드위터의 Auth 선택은? 이유는?

- JWT를 선택한 이유
  - RESTful API Service as a backend
  - Usable by other services -> micro-services
  - Easy to scale horizontally -> multiple instances

## 16.2 로그인 REST APIs 디자인하기?

- 어떤 요청을 보낼 수 있고 어떤 응답을 받을 수 있는지 디자인하기

- 로그인
- 회원가입

## 16.3 로그인 REST APIs 디자인하기!

#### User Schema

```typescript
type User = {
  id: string; // 사용자의 고유한 아이디
  username: string; // 사용자 닉네임(아이디)
  password: string; // 사용자 비밀번호
  name: string; // 사용자 이름
  email: string; // 사용자 이메일
  url?: string; // 사용자 프로파일 사진 URL
};
```

#### POST /auth/signup

```typescript
// request
type SignupRequest = {
  username: string;
  password: string;
  name: string;
  email: string;
  url: string;
};

// response
type SignupResponse = {
  token: string;
  username: string;
};
```

#### POST /auth/login

```typescript
// request
type LoginRequest = {
  username: string;
  password: string;
};

// response
type LoginResponse = {
  token: string;
  username: string;
};
```

#### GET /auth/me

- 어플이 실행이 될때 기존에 토큰이 있다면 유효한지 아닌지 검사하는 API

```typescript
type MeResponse = {
  token: string;
  username: string;
};
```

## 16.4 로그인 RestAPIs 개발을 위한 포스트맨 셋업

- 포스트맨에 위 디자인한 API들을 추가해서 바로 테스트 할 수 있도록 준비하기

## 16.5 로그인 Rest APIs 개발을 위한 포스트맨 셋업

- auth 라우터, 컨트롤러, 모델 구현

## 16.6 가입, 로그인 Rest APIs 구현하기

- 패키지 설치

  - bcrypt
  - jsonwebtoken

- authRouter 추가

## 16.7 Auth 미들웨어 구현하기

- 토큰 유효성 검사

#### 엘리의 추가 노트

세션과 다르게 JWT 토큰 자체로 유효성을 판단하는 장점을 극대화 하기 위해서,
isAuth에서 사용자 DB에 사용자가 있는지 없는지 확인하는 과정은 생략 가능합니다 ✨

사용자의 유효성을 확인하는것이 필수적인 상황이라면, 필요한 API에 한해서 컨틀롤러에서 확인하거나,
꽤 많은 API에서 확인이 필요한경우 isAuth처럼 별도의 미들웨어를 만들어서 확인할수 있어요.

그럼 어플리케이션 전반적으로 다 사용하는 isAuth 미들웨어에서는 JWT 토큰 자체로 유효성을 확인 할 수 있으니,
(다른 DB의 쿼리를 할 필요가 없음) 더 좋은 성능을 기대해 볼 수 있겠죠? :)

## 16.8 User와 Tweets 모델 분리하기

- 시작전 postman 요청에 폴더별로 토큰 추가할 수 있음

- 기존 Tweet 모델에서 User 관련 데이터를 분리
  - userId만 가지고 있도록 변경

```js
// 기존
  {
    id: "1",
    text: "Hello World",
    createdAt: new Date().toString(),
    name: "Bob",
    username: "bob",
    url: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
  },

// 변경
  {
    id: "1",
    text: "Hello World",
    createdAt: new Date().toString(),
    userId: "1",
  },
```

## 16.8~9 리액트 프론트엔드 가입/로그인 구현

## 16.11 리액트 프론트엔드 가입/로그인 구현

- 토큰이 만료되었을 때 다시 로그인 페이지로 이동하게 하기
- [ ] TODO : 토큰 만료 후 로그인 페이지로 이동하는지 확인해보기

## 16.12~13 Authorization 권한 부여

- 내가 수정한 트윗만 수정할 수 있도록 하기

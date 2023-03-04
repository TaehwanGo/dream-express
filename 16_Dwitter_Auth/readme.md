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

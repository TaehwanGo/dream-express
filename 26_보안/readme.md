# 26. 보너스 챕터 1. 치명적인 보안

## 26.1 보안 챕터 소개

- dwitter 문제점 분석 후 개선

## 26.2 로그인 보안과 유용한 사이트

- 현재 구현

  - JWT -> localStorage

- 문제점

  - 민감한 정보를 localStorage에 저장하고 있는데 XSS 공격에 취약

- 공부하기에 참고하기 좋은 웹 사이트
  - https://owasp.org

## 26.3 XSS(Cross Site Scripting) 어택이란? 대응 솔루션

- XSS(Cross Site Scripting) 어택이란?

  - 웹사이트의 input태그로 주입

- 1. 토큰을 메모리상에 보관
  - 로그인 유지가 안됨
- 2. 쿠키를 사용, httpOnly 옵션을 사용

  - 브라우저만 이 쿠키를 읽을 수 있다
  - 만료되기 전까진 로그인 유지
  - 단점
    - 모바일 클라이언트에선 사용할 수 없음
    - CSRF 공격에 취약

- 참고
  - https://nodegoat.herokuapp.com/tutorial/a3
  - https://www.google.com/about/appsecurity/learning/xss/

## 26.4 XSS 어택에 안전한 백엔드 업데이트

- XSS : 해커가 웹사이트에 스크립트를 주입해서 사용자의 정보를 탈취하는 공격

### 개선안

- localStorage 대신 httpOnly 쿠키를 사용

### backend

- npm i cookie-parser
- app.js

  - const cookieParser = require('cookie-parser');
  - app.use(cookieParser());
  - corsOptions.credentials = true; // 서버가 해당 쿠키는 안전한 것이므로 브라우저가 사용해도 된다는 것을 알려주는 것

- TODO: 따라서 해보기

# 15. Authentication - 로그인

## 15.1 Auth 챕터 소개

- 인증 방식
  - 세션 쿠키
  - JWT(조트)
- bcrypt 모듈
  - 비밀번호 암호화

## 15.2 인증이란 무엇인가?

- 인증(Authentication)이란?

  - 사용자가 누구인지 확인하는 것(you are who you say you are)

- 인증 방식
  - you know
    - password, pin-code, mobile phone, hardware token, etc.
  - you are
    - fingerprint, face recognition, etc.

## 15.3 세션과 쿠키란? 장/단점

- 장점
  - 안전(http only option 사용)
  - 쉬움
- 단점
  - stateful : 세션에 상태가 있음
  - 분산형 시스템으로 디자인해도 세션때문에 성능이 안좋아 질 수 있음

## 15.4 JWT란? 장/단점

- JWT(JSON Web Token)란?

  - JSON을 이용해서 웹 토큰을 주고 받는 방식

- 구성

  - Header
    - 사용 알고리즘
    - 타입
  - Payload
    - 전송해서 주고 받을 정보
    - 인코딩된 정보
  - Signature
    - secret key로 Header와 Payload를 합쳐서 인코딩
    - 변조를 방지하기 위해 사용

- 장점
  - stateless : 토큰에 정보가 있음
  - 분산형 시스템으로 디자인해도 성능이 좋음
- 단점
  - 보안에 유념해서 사용해야 함 - 만료기간, secret key

## 15.5 bcrypt란?

- bcrypt란?
  - 문자열을 암호화(해싱)하는 알고리즘
- bcrypt 예시

  - `$2a$12$44GsHef74NF2Q.thBGDqeOq02bo4GFUpfBJEesISScdVHRUh6ul2.`
  - Alg(알고리즘) : `$2a$`
  - Cost(복잡도, 비용) : `12`
  - Salt : `44GsHef74NF2Q.thBGDqeO`(base64-encoded)
    - 원하는 길이만큼 더 랜덤한 것들을 이용해서 암호화를 더 복잡하게 만드는 문자열
  - Hash : 최종적으로 암호화된 정보 (base64-encoded)

- bcrypt는 암호화는 가능하지만 복호화는 안됨
  - 모든 경우를 가진 테이블로 찾아서 할 순 있겠지만 salt의 복잡도에 따라 몇 년 이상이 걸리게 할 수도 있음

## 15.6 bcrypt 사용해보기 + 유의사항

- bcrypt 사용해보기
  - bcrypt 모듈 설치
  - bcrypt 모듈 사용
- `npm install bcrypt`

- 복잡도가 증가할 수록 암호화(hash)에 시간이 기하급수적으로 증가

- 신기한 점
  - 실행 할 때마다 해쉬된 값이 달라지지만 compare로 비교하면 true가 나옴
  - e.g.
    - 1번째
      - hashed: $2b$10$QR8zSVWhOsvUPL4PbCG5WubQVE5qdxqYuPZIseNa3I75ENngQP4RC
      - result: true
    - 2번째
      - hashed: $2b$10$OHrGybRV02WrjRbQ1TURz.2bYJolL1vRZtL0ZrtQr7Yrz/8LZQO/2
      - result: true

## 15.7 JWT 사용해보기

`npm i jsonwebtoken`

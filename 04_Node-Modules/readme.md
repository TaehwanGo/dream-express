# 04. Node Modules

## 4.1. 노드 모듈 챕터 소개

## 4.2. 노드 관련 필수사이트 북마크 하기

- https://nodejs.org/dist/latest-v16.x/docs/api/
- https://nodejs.dev/learn

## 4.3. 글로벌 오브젝트 - 소스 공부법

- node 04_Node-Modules/1-global/app.js
- 브라우저는 window
- nodejs는 global

## 4.4. 콘솔로그의 진실

- node 04_Node-Modules/2-console/app.js
- console.time, timeEnd - 성능 테스트를 하고 싶을 때
- trace 어디에서 호출되었는지 확인할 때 사용

## 4.5. this란(브라우저와의 차이점)

- node 04_Node-Modules/3-this/app.js
- class에서 this는 클래스 자기 자신
- 클래스 외부의 this는 global
- nodejs에서 this
  - 함수 내에서 사용 => global
  - 전역 => module.exports
  - 클래스 내부 => 클래스

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

## 4.6. 모듈(export, require)

- node 04_Node-Modules/4-module/app.js
- 모듈 : 연관된 것 끼리 묶어 놓은 것
- nodejs가 브라우저보다 먼저 export, import가 생겨서 예전 문법은 약간 다름
  - module.exports
  - require
- javascript ES6(2015) 부턴 자체적으로 모듈을 제공

## 4.7. 2015최신 모듈(export, import)

- npm init --yes
- type : "module"
  - commonjs가 아닌 자바스크립트가 자체적으로 제공하는 모듈을 사용하겠다는 의미

## 4.8. OS(운영체제) 정보

- node가 가진 OS 모듈에 대해 알아보자
- npm init 으로 매번 자바스크립트 모듈 설정하는 것은 번거로우므로
  - 그냥 node에서 제공되는 default 모듈을 사용(require)

## 4.9. process(프로세스) 정보

- nextTick : 기존 콜백함수 보다 더 우선순위를 높여서 테스크 큐에 등록
  - nextTick이 setTimeout 보다 먼저 실행 됨

## 4.10. 타이머와 콜스택의 연관

- global에 정의되어 있기 때문에 모듈을 import(require)를 하지 않아도 됨
- setInterval
- setTimeout
- node 04_Node-Modules/8-timer/app.js

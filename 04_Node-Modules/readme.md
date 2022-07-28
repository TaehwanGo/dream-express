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

## 4.11. path 그리고 유의할 점

- nodejs는 PC위에서 동작하기 때문에 file system에 접근하기 좋음
- path : 경로
  - 파일 경로를 접근하거나 경로에 대해 무언가 처리해야될 때 사용
- node 04_Node-Modules/9-path/app.js

## 4.12. file 동기와 비동기 그리고 프로미스

- file에서 기본적으로 할 수 있는 모든 동작들을 fs 모듈에서 제공
- 모든 API는 3가지 형태로 제공됨

  - 비동기
    - rename(..., callback)
  - blocking : 끝날 때 까지 다음으로 넘어가지 않음
    - renameSync
    - 항상 try catch로 감싸서 사용해야 함
  - promises.rename().then().catch()
    - promise 형태로 사용할 수 있음

- fs API 중 sync형태보단 callback또는 promises 형태로 사용하는 것이 좋다

- cd 04_Node-Modules/10-file
- node app.js

## 4.13. file 다양한 사용법

- cd 04_Node-Modules/10-file
- node app2.js

- 항상 API를 사용할 땐 그 API에 전달해야되는 매개변수가 어떤 것들이 있는지 확인하자
- 함수의 리턴값은 무엇인지
- 프로미스에선 캐치로 에러를 잡아내자

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

## 4.14. 버퍼와 스트림

- 웹에서 동영상을 볼 때

  - 스트리밍
    - 서버에서 동영상의 잘게 나눠진 데이터를 조금씩 보내주는 것
    - progressive download
  - 버퍼
    - 버퍼링 : 버퍼를 채워둘 수 있음
    - 보는 속도 보다 다운 속도가 빠르면 버퍼를 충분히 쌓을 수 있음
    - 반대로 다운속도 보다 보는 속도가 빠르면 버퍼링에 걸렸다고 할 수 있음
  - HLS 플레이어에서 지원

- 컴퓨터에서 큰 사이즈의 파일을 읽을 때
  - 메모리에 파일을 올리고 사용하는데
  - 파일을 버퍼와 스트림을 이용해서 조금씩 가져옴

## 4.15. 버퍼, 제대로 알아보기

- fs.readFile로 읽을 때 인코딩을 정해주지 않으면 Buffer의 내용을 그대로 보여줌
- c, c++, go 같이 메모리를 직접 관리할 수 있는 언어는 버퍼에 대해 들어봤을 수 있다
- 하지만 자바스크립트만 사용했다면 익숙하지 않을 수 있음
- 버퍼
  - 메모리에서 고정된 사이즈의 메모리 덩어리(Fixed-size chunk of memory)
  - 숫자의 배열(array of integers)
  - 메모리에 들어있는 데이터 자체(byte of data)
  - 유니코드 테이블에 있는 숫자와 매칭 됨
- 버퍼 생성

## 4.16. 스트림의 매력

- 스트림 - 활용, 장점
- txt 파일로 실험
- node app-file.js
- file이 메모리보다 용량이 큰 경우 문제가 생길 수 있음
- 스트림을 이용하면 조금씩 읽고 쓰기가 가능
- 스트림은 조금씩 읽어 오기 때문에 event 베이스 이다
  - 나중에 이벤트파트에서 자세히 다룸
- createReadStream 메서드를 클릭해서 따라 들어가면
  - ReadStream 클래스를 반환하는데 ReadStream 클래스를 보면
  - on 메서드를 통해 다양한 이벤트를 등록할 수 있다
- stream 메서드들은 자기자신을 리턴하므로 체이닝을 할 수 있다

## 4.17. 파이프

- 쓰기작업을 할 때에도 스트림을 만들 수 있음
- 파이프 ?
  - 스트림을 읽어와서 읽어온 것을 그대로 연결하는 것
- zlib : 노드에서 제공하는 압축할 수 있는 모듈

## 4.18. 노드의 중요 포인트! 이벤트

- 이벤트 emitter : 이벤트가 발생할 때마다 호출
  - nodejs 자체적으로도 사용할 수 있고
    - nodejs가 자체적으로 사용하고 있는 예시
      - createReadStream에서 사용 중(EventEmitter를 상속받아서)
  - 이벤트 이미터를 만들고 관심있는 콜백함수를 등록해놓고 사용할 수도 있음

## 4.19. 재사용성이 높은 이벤트 클래스 만들기

- event emitter는 그 객체에만 해당된다
  - 객체가 다르면 다른 이벤트를 감지할 수 없다

# 5. NPM 구석 구석

## 5.1 NPM 챕터 소개

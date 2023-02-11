# 2. What's Node.JS?

## 2.1 챕터 소개

## 2.2 Node.js란 무엇인가? 공부 포인트!

- 기본을 알고 프레임워크를 배우는 것이 더 빠른 길이다
- Node.js API
- console
- crypto
- HTTP
- file
- OS
- Path
- Stream

## 2.3 노드를 배우면 좋은 점들

- 1. Javascript everywhere
  - 자바스크립트로 모든 것을 할 수 있다
- 2. 50% of developers use Node.js
  - Node.js를 사용하는 개발자 수는 전체 개발자의 50% 정도이고
  - 그 중 43%는 기업용 앱을 만드는데 사용하고 있다
- 3. Big corporates use Node.js
  - 큰 기업들도 노드를 서버로 사용하고 있다
  - 노드는 강력한 커뮤니티가 존재한다
  - 많은 기업들에 의해 증명된 질좋은 서버를 만들 수 있다는 것이 증명되어 있다
  - 노드엔 많은 툴(라이브러리)들이 존재한다
- 4. Easy, Simple yet Powerful and flexible
  - 많은 개발자들이 루비나 자바들에 비해 생산성이 높다
  - Easy Learning curve
  - Great Productivity
  - Good Performance
- 5. Strong Community
  - NPM !!

## 2.4 노드의 4가지 매력포인트

- 1. Javascript runtime
- 2. Single Thread
- 3. Non-Blocking I/O
- 4. Event-Driven

### 1. Javascript runtime

- 노드에선 자바스크립트를 실행해서 브라우저 밖에서 사용 가능

### 2. Single Thread

- 프로세스 vs 쓰레드
  - 프로세스 : 프로그램
  - 프로세스 안에
    - Code : 프로그램에 대한 코드
    - Stack : 함수의 실행 순서를 기억
    - Heap : 동적으로 생긴 데이터를 보관
    - Data : 전역 변수 등의 다양한 데이터를 보관
  - 프로세스의 모든 자원 : 리소스
  - 프로세스 안에 여러가지 쓰레드가 존재
    - 원하는 기능마다 한 프로그램 안에서 여러 기능을 동시에 실행할 수 있음
  - 쓰레드 : 일꾼
- 쓰레드의 단점
  - 메모리 사용량 증가
  - 쓰레드안에서 순서를 정하는 비용
  - 프로세스안의 공통된 리소스에 접근하면 그 동안 다른 쓰레드는 그것을 접근 할 수 없음
- 멀티쓰레딩
  - 자바의 Cuncurrency API
- 자바스크립트는 싱글 스레드 언어

### 3. Non-Blocking I/O

- I/O : input, output - 읽고 쓰기
- CPU : 두뇌 - 계산, 연산
- Blocking : 동기적 - 기다림
- Non-Blocking : 비동기적 - 기다리지 않고 다음으로 넘어감

### 4. Event-Driven

- file이 다 읽어지면 이벤트를 통해서 이벤트에 등록한 콜백을 실행할 수 있게 함

## 2.5 노드 내부속으로 쏘옥 들여다보기

- Memory Heap : 동적으로 생성한 데이터를 저장
- Call stack : 함수의 실행 순서를 저장
- Task Queue : Non-Blocking(Node API)으로 처리가 완료되어 실행되어야 될 것들이 Task Queue로 이동되어 콜스택이 비워지는 것을 기다림
  - 이벤트루프에 의해 테스크큐에서 콜스택으로 이동
- Event Loop : 콜 스택이 비어있으면 Task queue에서 Call stack으로 가져옴
  - 자바스크립트 언어는 싱글스레딩이지만
  - Node APIs는 멀티 스레딩이 가능

### Node.js APIs

- 멀티스레딩 => Non-blocking I/O, Event-driven 방식(콜백)
- Node.JS APIs

  - V8
    - 기능
      - Javascript engine
    - 작성 언어
      - C++
  - Libuv
    - 기능
      - Non-blocking I/O 가능
      - 운영체제에 따라서 다른 방식으로 동작
    - 작성 언어
      - C
  - llhttp
    - 기능
      - HTTP parsing
    - 작성 언어
      - Typescript, C
  - Open SSL
    - 기능
      - tls, crypto
    - 작성 언어
      - C
  - c-ares
    - async DNS request
  - zlib
    - 데이터 압축/해제 관련 모듈

- Main Single Thread

  - 우리 어플리케이션은 메인 싱글스레드에서 동작
  - 우리가 등록한 콜백함수는 싱글 스레드에서 동작하기 때문에
    - 무거운 일이 다 처리가 될 때 까지 다음작업으로 넘어가지 않기 때문에
    - 어플리케이션에서 처리해야되는 것들은 가벼운 것들만 처리해야 된다

- 정리
  - 가벼운 작업을 처리하는 I/O 방식으론 최고이지만
  - 무거운 방식을 하는 CPU엔 적합하지 않다
  - 노드 12버전 이상에선 멀티스레드를 이용할 수 있다(워커쓰레드)
    - 무거운 작업들 예시 : image resizing, video encoding, ...

## 2.6 노드 서버의 특징과 장/단점

- 전통적인(전형적인) 서버

  - 서버 - 데이터베이스
  - 멀티스레딩 환경
    - 쓰레드 풀 : 쓰레드를 보관할 수 있는 최대 개수가 제한되어 있음
    - 한번에 처리할 수 있는 개수가 제한되어 있음

- Node.js Server
  - Non-Blocking I/O, Event-Driven 방식
    - 가벼운 일처리엔 최고
    - 무거운 일을 메인쓰레드(Node.js API를 사용하지 않고)에서 처리 시 싱글스레드이기 때문에 다른 작업들이 제한 됨
  - 하나의 메인 싱글 스레드
    - 일단 받고 뒤에 있는 던짐
      - 완료된 것이 완료되면 콜스택으로 이동되어 콜백을 실행해서 완료 처리
    - 동시 작업을 수락하는 데 개수 제한이 없음
  - 노드로 무거운 작업을 하고 싶은 경우
    - 개별적인 분산서버
    - AWS 람다
    - 구글 클라우드 펑션

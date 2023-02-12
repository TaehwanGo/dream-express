# Debugging

## 6.1 디버깅의 궁극적인 목표

- defining the problem
- 현재와 예상 결과의 갭을 매꿔나가는 것
- 고려 해야 하는 것들
  - UX/UI
  - logic/flow
  - performance
  - (server) costs
- 디버깅 방법

  - unit testing
  - integration testing
  - control flow analysis
  - log file analysis / print logs
  - interactive debugging
  - memory dumps
  - profiling

- 이번장 목표
  - interactive debugging
  - debugger 잘 사용하기

## 6.2 디버거 기본 사용법(툴 제대로 쓰기)

- continue : 그 다음 break point로 넘어감
- step over : 다음 줄로 넘어감
- step into : 함수 안으로 들어감
- step out : 함수 밖으로 나옴
- break point : 디버깅을 멈추는 지점
- watch : 특정 변수의 값을 보여줌
- call stack : 함수 호출 스택
- locals : 현재 함수의 지역 변수
- console : 디버거에서 코드를 실행할 수 있음

## 6.3 디버거 꿀팁

- console.log의 문제점

  - 소스코드를 돌려야 함 -> 컴파일, 빌드, ... 등 오래 걸릴 수 있음

- 디버거의 장점
  - 실시간으로 변수값을 바꿔가면서 확인할 수 있음
  - watch로 변수값을 보여줄 수 있음

## 6.4 자동 재시작 설정

- npm i -g nodemon
- debugger 탭에서 `create launch.json` 클릭

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/06_Debugging/app.js",
      "runtimeExecutable": "nodemon",
      "restart": true
    }
  ]
}
```

#### global install

npm에서 패키지를 설치하실때 왠만하면 sudo(파워 권한)로 설치 하시지 않는게 좋아요. 보안에 안전하지 않아서 최대한 피해야 한답니다 😱

npm에서 무언가 설치하실때 권한 이슈가 나오면 아래와 같이 해보세요:

sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

https://stackoverflow.com/questions/47252451/permission-denied-when-installing-npm-modules-in-osx/47252840

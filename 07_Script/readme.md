# 7. 파일정리 스크립트 만들기

## 7.1 스크립트 챌린지 소개(요구 사항 분석)

- 챌린지 !

  - 파일 정리 스크립트 만들기

- 필요 상황

  - 매달 사진을 백업한다
    - pictures 폴더에 사진이 저장된다
  - pictures/jan 폴더에는 1월 사진이 저장된다
    - 사진과 동영상을 분류해서 구글 드라이브에 업로드
  - 동영상 파일은 video 폴더로 이동(.mp4, .mov)
    - pictures/jan/video
  - captured 폴더에는 캡쳐된 사진이 저장된다(.aaa, .png)
    - pictures/jan/captured
  - duplicated 폴더에는 중복된 사진이 저장된다
    - pictures/jan/duplicated

- node photo test
  - photo : 노드 파일명
  - test : 노드 실행 시 전달할 인자

## 7.2 계획 세우고 사용자 입력 처리

### 계획

1. 사용자가 원하는 폴더의 이름을 입력받는다
2. 해당 폴더 안에 video, duplicated, captured 폴더를 만든다
3. 폴더안에 있는 파일들을 다 돌면서 해당하는 mp4|mov는 video로 png|aae는 captured로,
   파일명이 중복되는 파일(IMG_1234, IMG_E1234)은 duplicated로 이동시킨다

### 디버깅을 하고 싶다면

디버깅을 하시고 싶으시다면! 🐛

인자를 전달해야 하는 경우 아래와 같이 .vscode/launch.json 파일을 설정해 보세요:

(디버깅 챕터에서 파일 설정하는법 다뤘었죠?)

"program": "${workspaceFolder}/5-project-photo/photo.js", // 여러분 경로대로 바꿔주세요

"args": ["test"], // 테스트 하고자 하는 폴더 이름

"restart": true,

"runtimeExecutable": "node"

## 7.3 메인 로직 골격 작성하기

## 7.4 세부 기능 구현하기

- 옮기는 것 : fs.promises.rename

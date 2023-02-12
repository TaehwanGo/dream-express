# NPM

## 5.1 NPM 챕터 소개

- node package manager

- npx
  - bundled with npm 5.2+ tool for executing node packages

## 5.2 NPM 시작하기

- npm cli

  - https://docs.npmjs.com/cli/

- npm init

## 5.3 소프트웨어 라이센스란? 꿀사이트

- https://spdx.org/licenses/
- https://olis.or.kr/license/licenseSPDX.do?mapcode=010107&page=1

## 5.4 라이브러리 버전관리? 꿀사이트

- 1.2.3
  - 1: major version
  - 2: minor version
  - 3: patch version
- 버전 관리 방법
  - https://semver.org/lang/ko/
  - https://docs.npmjs.com/about-semantic-versioning
- 버전 확인
  - https://semver.npmjs.com/

## 5.5 글로벌로 설치 하고 목록 확인

### 일반적으로 설치

- npm install
- npm i

### 글로벌로 설치

- npm i -g

```bash
npm i -g netlify
```

### npm list, la, ll

- npm list
- depth 지정도 가능
  - npm ll -g --dept=0

## 5.6 프로젝트 라이브러리 확인, 설치 및 삭제

- `npm view <package>`

  - 해당 package 정보를 볼 수 있음
  - `npm view underscore`

- `npm uninstall <package>` 또는 `npm un <package>`
  - 해당 package를 삭제
  - `npm uninstall underscore`

## 5.7 버전 업데이트 하기

- 버전 업데이트 필요 패키지 확인
  - `npm outdated`
- 버전 업데이트
  - `npm update <package>`

## 5.8 개발 모드로 설치하기 + 좋은 툴 설치

- 라이브러리 제품안에 포함시키지 않고 개발용으로만 사용할 때
  - `npm i -D <package>`
- nodemon
  - 파일 변경시 자동으로 서버 재시작
  - `npm i -D nodemon`

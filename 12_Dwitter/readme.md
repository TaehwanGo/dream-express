# 12. Dwitter

- Twitter 같은 간단한 포스트를 작성해서 공유할 수 있는 웹서비스를 만들어보자

## 12.1 챌린지 소개

## 12.2 요구 사항 분석, REST APIs 디자인 하기

- DB는 아직 배우지 않았으므로 서버 메모리 상에 데이터를 저장하도록 한다
- 로그인은 아직 구현하지 않는다

## 직접 구현해보기

### 포스트 CRUD API

#### 포스트에 필요한 데이터

- id
- username
- text
- createdAt

#### 모든 포스트 불러오기

- GET /posts

#### 포스트 작성하기

- POST /posts

#### 포스트 수정하기

- PUT /posts/:id

#### 포스트 삭제하기

- DELETE /posts/:id

#### 포스트를 username으로 검색하기

- GET /posts?username=:username

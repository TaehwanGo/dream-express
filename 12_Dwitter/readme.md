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

## 12.3 요구 사항 분석, REST APIs 디자인 하기(Ellie의 구현 살펴보기)

- https://www.notion.so/API-Spec-Tweets-b04541cf06f84b83bf4891abfaa27d03

### API Spec

#### Tweet Schema

```json
{
  id: string,  // 트윗 아이디
  text: string,  // 트윗 텍스트
  createdAt: Date, // 트윗 생성 날짜
  name: string,  // 사용자 이름
  username: string,  // 사용자 닉네임 (아이디)
  url: string (optional) // 사용자 프로파일 사진 URL
}
```

#### GET /tweets

- get all tweets
- 200

```json
[
  {
    id: string,
    text: string,
    createdAt: Date,
    name: string,
    username: string,
    url: string (optional)
  },
  ...
]
```

#### POST /tweets

- creating new tweet

```json
{
  text: string,
  name: string,
  username: string,
  url: string (optional)
}
```

#### GET /tweets?username=:username

- get all tweets for user's username

```json
{
   [tweet, tweet ....]
}
```

#### GET /tweets/:id

- get tweet by id

```json
{
   tweet
}
```

#### PUT /tweets/:id

- updating tweet

```json
// Request
{
   text
}

// Response
{
   tweet
}
```

#### DELETE /tweets/:id

- deleting tweet
- Response 204

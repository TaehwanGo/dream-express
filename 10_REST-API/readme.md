# 10. Restful API

## 10.1 Rest API 챕터 소개

- Rest API라면 API를 어떻게만 이야기 하는 것일까?
- REST API란 무엇인지
- REST 한 시스템, 서버를 만들기 위한 원칙
- API를 디자인하는 팁, 방법

## 10.2 진정한 Restful API 도대체 무엇인가?

- API : Application Programming Interface
- ful : ~이 가득한, ~의 성격을 지닌

- REST : Representational State Transfer

  - 상태를 나타내는(대표하는) 전송

- REST는 API URL을 디자인하는 것이라고 정의할 수도 있지만
- Server Software Architectural Style이라고도 정의할 수 있다

  - Web service를 만들 때 지켜야하는 가이드라인이라고 볼 수도 있다

- HTTP로 서버와 클라이언트 간 통신을 어떻게 효율적으로 잘 디자인해서 할 수 있을까?
  - 네트워크 기반으로 서버 소프트웨어 아키텍처를 만들어 갈 것인지 정의한 것이 RESTful 시스템

### RESTful system 6 guiding constrains

#### 1. Client-server architecture

- 서버는 클라이언트가 다양한 어플리케이션에 데이터를 제공할 수 있는 아키텍처 유지

#### 2. Stateless

- 하나의 요청이 다른 요청과 연관되어 있지 않다

#### 3. Cacheability

- 캐시가 가능하다면 캐시를 하는 것으로 디자인

#### 4. Layered system

- 클라이언트가 서버에게 얼마나 많은 서버가 있는지 또는 서버 사이에 게이트웨이가 있든 없든 상관없이 공통된 서버 API하나로 서버에 접근할 수 있도록 디자인

#### 5. Code on demand(optional)

- 클라이언트가 원한다면 클라이언트에서 수행해야될 코드를 클라이언트로 보내줄 수 있다

#### 6. Uniform interface(중요! - RESTful한 시스템인지 아닌지를 결정)

- fundamental to the design of any RESTful system

- (1) Resource identification in requests

  - 모든 자원은 고유한 ID를 가지고 있어야 한다
  - 클라이언트 요청에서 서버에 있는 어떤 자원(또는 도메인 데이터)을 원하는지 식별할 수 있어야 한다
  - 그리고 클라이언트가 이해할 수 있는 format으로(HTML or JSON, ...) 응답을 보내줘야 한다

- (2) Resource manipulation through representations

  - 서버로 부터 받은 데이터를 통해서 해당 리소스에 대해서 어떻게 더 처리할 수 있는지 모든 정보를 알 수 있어야 함

- (3) Self-descriptive messages

  - 클라이언트가 서버에서 받은 응답 데이터를 어떻게 처리해야하는지 설명이 되어있어야 함
  - e.g. HTTP 헤더의 Content-Type

- (4) Hypermedia as the engine of application state(HATEOAS)
  - 서버에서 제공하는 API URL이 있다면 클라이언트는 어떤 URL이 있는지 알아야 되고 적절한 URL로 요청을 해야 한다

```json
// e.g. HATEOAS
// HTTP/1.1 200 OK
// Content-Type: application/vnd.acme.account+json
// ...
{
  "account" : {
    "account_number": 1234,
    "balance" : {
      "currency" : "USD",
      "value" : 100.00
    },
    "links" : {
      "deposit" : "/account/1234/deposit",
      "withdraw" : "/account/1234/withdraw",
      "transfer" : "/account/1234/transfer"
      "close" : "/account/1234/close"
    }
  }
}
```

- 위와 같이 클라이언트가 어떤 URL을 요청해야 하는지 알려주는 것이 HATEOAS
- HATEOAS까지 지키는 서버는 많지 않다

## 10.3 Web APIs 디자인

- APIs 디자인 하는 방법, 팁 알아보기

- 대부분 REST의 특징은 HTTP의 특징을 따른다

### Designing Web APIs

- 웹 API를 디자인할 때는 서버에 있는 어떠한 특정한 데이터를 클라이언트가 읽거나 새로 만들거나 수정하거나 삭제하는 이런 기본적인 동작을 지원해주면 된다
- 이런 동작을 지원해주는 것을 CRUD(Create, Read, Update, Delete)라고 한다
  - Read는 GET
  - Create는 POST
  - Update는 PUT
  - Delete는 DELETE
- Action(operation) : GET, POST, PUT, DELETE
  - verb(동사)
- Item(domain) : /users, /posts, /comments

  - noun(명사)

- e.g.
  - `GET /posts/getPosts` -> `GET /posts`
    - API 이름에는 GET이라는 메서드를 사용하고 있으므로 get(action)을 생략할 수 있다
  - `GET /posts/createPost` -> `POST /posts`
    - create(action)를 생략할 수 있다
    - 어떤 것을 만들려면 POST 메서드를 사용해야 한다
  - `GET /posts/1` : good
  - `PUT /posts/1` : good
  - `DELETE /posts/1` : good
  - `GET /posts/1/tags` -> `GET /tags/?postId=1`
    - what이 명확하지 않다
  - `GET /tags/?query=cool` : good

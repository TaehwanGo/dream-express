# 8. HTTP

## 8.1 HTTP 챕터 소개

## 8.2 HTTP 역사와 HTTPs, 그리고 V2, V3

- HTTP : HyperText Transfer Protocol
  - 요즘엔 HyperMedia로 볼 수 있음
- HTTPS : HyperText Transfer Protocol Secure
  - HTTP에 SSL이나 TLS를 적용한 것
  - SSL : Secure Socket Layer
  - TLS : Transport Layer Security
- HTTPS 구성 방법
  - 1. 클라이언트가 서버에게 HTTPS로 접속하겠다고 요청
  - 2. 서버는 클라이언트에게 자신의 인증서를 전달
  - 3. 클라이언트는 서버의 인증서를 검증
  - 4. 클라이언트가 서버의 인증서를 검증하면, 클라이언트는 서버에게 자신의 인증서를 전달
  - 5. 서버는 클라이언트의 인증서를 검증
  - 6. 서버가 클라이언트의 인증서를 검증하면, 서버와 클라이언트는 암호화된 통신을 시작

### HTTP v1

- text-based
- uncompressed headers
- one file at a time

### HTTP v2

- binary-based protocol
- compressed headers
- multiple files at a time
- stream prioritization : 우선순위를 정해서 전송

### HTTP v3

- QUIC : Quick UDP Internet Connection
- UDP 기반의 프로토콜

### 이번 강의에선 HTTP v2에 초점을 맞춰서 다룸

- HTTP2에선 여러 파일을 동시에 보낼 수 있음(HTML, CSS, JS 등)

## 8.3 Status code 잘 활용하기

- 100번대
  - 정보
  - 100 : continue - 클라이언트가 서버에게 요청을 계속하라고 알려줌
  - 102 : processing - 서버가 요청을 받았고, 처리 중임을 알려줌
- 200번대
  - 성공
  - 200 : OK - 요청이 성공적으로 처리됨
  - 201 : Created - 요청이 성공적으로 처리되어 새로운 리소스가 생성됨
  - 204 : No Content - 요청은 성공적이었지만, 응답 페이로드 본문에 보낼 데이터가 없음
- 300번대
  - 리다이렉션
  - 301 : Moved Permanently - 요청한 리소스가 새로운 URI에 영구적으로 이동됨
  - 302 : Found - 요청한 리소스가 임시적으로 다른 URI에 있음
  - 303 : 302와 비슷하지만 GET요청에서만 사용
  - 304 : Not Modified - 클라이언트가 캐시된 리소스를 그대로 사용
  - 307 : 302와 비슷하지만 POST요청에서도 사용
  - 308 : 301과 비슷하지만 POST요청에서도 사용
- 400번대

  - 클라이언트 에러
  - 400 : Bad Request - 잘못된 문법으로 인해 서버가 요청을 이해할 수 없음
  - 401 : Unauthorized - 요청한 리소스에 접근하기 위해선 인증이 필요함
  - 403 : Forbidden - 서버가 요청을 이해했지만 승인을 거부함(admin)
  - 404 : Not Found - 서버가 요청한 리소스를 찾을 수 없음
  - 405 : Method Not Allowed - 요청한 메소드가 허용되지 않음
  - 409 : Conflict - 요청은 충돌이 발생했지만, 서버가 충돌을 처리하지 못함
    - client가 만들려는 리소스가 존재하거나 충돌이 발생할 때
    - ex) 같은 이름의 파일을 두 번 생성하려고 할 때

- 500번대

  - 서버 에러
  - 500 : Internal Server Error - 서버에 오류가 발생하여 요청을 처리할 수 없음
  - 501 : Not Implemented - 서버가 요청을 처리하기 위해 필요한 기능을 구현하지 않았음
  - 502 : Bad Gateway - 서버가 게이트웨이나 프록시 역할을 하고 있고, 요청을 처리하기 위해 다른 서버에 요청을 보냈지만, 다른 서버가 유효한 응답을 반환하지 않음
    - 요청을 받아서 처리를 해야하지만 어떻게 처리해야하는지 모를 때
  - 503 : Service Unavailable - 서버가 일시적으로 과부하 또는 예정된 작업으로 인해 요청을 처리할 수 없음
  - 504 : Gateway Timeout - 서버가 게이트웨이나 프록시 역할을 하고 있고, 요청을 처리하기 위해 다른 서버에 요청을 보냈지만, 다른 서버가 요청을 처리하는데 너무 오래 걸림

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- https://developer.mozilla.org/ko/docs/Web/HTTP/Status

## 8.4 Request Method

```
https://www.server.com/course/backend/search?q=love
```

- https : 프로토콜
- www.server.com : 호스트
- /course/backend/search : 경로
- ?q=love : 쿼리스트링

### Request Method

- GET : 서버의 리소스를 가져오는데 사용
- POST : 서버에 리소스를 새로 등록하거나, 데이터를 전송할 때 사용
- PUT : 서버의 리소스를 업데이트할 때 사용
- DELETE : 서버의 리소스를 삭제할 때 사용
- PATCH : 서버의 리소스를 부분적으로 업데이트할 때 사용
- OPTIONS : 서버의 특정 리소스에 대해 지원되는 요청 메소드를 조회할 때 사용
- HEAD : 서버의 특정 리소스에 대한 응답 헤더를 조회할 때 사용 - 데이터는 받지 않고 헤더만 받음
- TRACE : 서버의 특정 리소스에 대한 경로를 추적할 때 사용

### GET에 대한응답 코드

- 200 : OK - 요청이 성공적으로 처리됨
- 401 : Unauthorized - 요청한 리소스에 접근하기 위해 인증이 필요함
- 403 : Forbidden - 서버가 요청을 이해했지만 승인을 거부함
- 405 : Method Not Allowed - 요청한 메소드가 허용되지 않음

### POST에 대한 응답 코드

- 201 : Created - 요청이 성공적으로 처리되어 새로운 리소스가 생성됨
- 401 : Unauthorized - 요청한 리소스에 접근하기 위해 인증이 필요함
- 403 : Forbidden - 서버가 요청을 이해했지만 승인을 거부함
- 404 : Not Found - 서버가 요청한 리소스를 찾을 수 없음

### PUT, DELETE, PATCH

- 200 : OK - 요청이 성공적으로 처리됨
- 204 : No Content - 요청은 성공적이었지만, 응답 페이로드 본문에 보낼 데이터가 없음
- 403 : Forbidden - 서버가 요청을 이해했지만 승인을 거부함
- 404 : Not Found - 서버가 요청한 리소스를 찾을 수 없음
- 405 : Method Not Allowed - 요청한 메소드가 허용되지 않음

### OPTIONS, HEAD, TRACE

- 200 : OK - 요청이 성공적으로 처리됨
- 401 : Unauthorized - 요청한 리소스에 접근하기 위해 인증이 필요함
- 403 : Forbidden - 서버가 요청을 이해했지만 승인을 거부함
- 404 : Not Found - 서버가 요청한 리소스를 찾을 수 없음
- 405 : Method Not Allowed - 요청한 메소드가 허용되지 않음

### 서버의 리소스를 변경하지 않고 읽기만 하는 메소드들

- GET
- HEAD
- OPTIONS
- TRACE

### 서버의 리소스를 변경하는 메소드들

- POST
- PUT
- DELETE
- PATCH

### 참고

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

### 메서드들의 특징들

- safe

  - 읽기만 하는 메서드들은 안전하다

- idempotent(멱등)

  - 동일한 요청을 여러번 보내도 서버를 동일한 상태로 유지할 수 있는가

- cacheable
  - GET은 서버에서 캐시가 가능함
  - POST는 생성하므로 서버에서 캐시가 불가능함 - 부분적으로만 가능

### GET

- safe : Yes
- idempotent : Yes
- cacheable : Yes

### POST

- safe : No
- idempotent : No
- cacheable : 부분적으로만 가능(Only if freshness information is included)

### PUT

- safe : No
- idempotent : Yes
  - 원하는 URL에 전체적으로 업데이트하므로 Yes
- cacheable : No

### PATCH

- safe : No
- idempotent : No
  - 부분적으로 업데이트하므로 No
- cacheable : No

## 8.5 Headers의 오해와 진실

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
- HTTP는 stateless protocol이다

  - 한 요청에 대해 state가 없다
  - 클라이언트 요청 -> 각각 개별적인 요청은 서로 연관되어 있지 않음

- 상태가 없는 이 프로토콜에서 어떻게 로그인을 유지할 수 있을까요?
  - Session & Cookies

### Session & Cookies

#### Cookies

- (1) 클라이언트가 로그인 요청
- (2) 서버는 응답으로 headers를 보내줌
  - header안에는
    - `Set-Cookie: auth token=xxx...` 과 같은 것을 같이 보내줌
      - 브라우저가 자동으로 저장을 해줌
      - 브라우저가 다음 요청을 보낼 때 자동으로 쿠키를 같이 보냄
- (3) Cookie는 브라우저 어플리케이션에만 있음

  - Cookie: 브라우저에서 잠시 보관하고 있는 저장소

- HTTP는 상태는 없지만 Headers를 통해 다양한 정보를 보내줌

#### Cache-Control

- e.g. 캐싱 기간을 지정할 수 있음

#### User-Agent(UA)

- 서버에서 클라이언트가 어떤 플랫폼에서 접속했는지 알 수 있음
  - 어떤 클라이언트(브라우저)인지, 어떤 운영체제인지에 대한 정보가 들어있음
- e.g.
  - `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36`

#### Standard(표준화)

- 표준화된 헤더
  - `X-auth` -> `Authorization`
- Authorization 예시
  - `Authorization: Basic YWxhZGRpbjpvcGVuc2vzYW1l`
- 표준화된 헤더를 사용하면 브라우저가 원하는 대로 동작할 수 있음

#### Custom

- Header에 원하는 데이터를 추가하고 싶을 때 사용
- e.g. `X-USER-ID: 1234` : 2012년 부터는 이 방법은 권장하지 않음
  - 표준화가 된 것이 꽤 있기 때문
- 요즘엔 `domain-key`와 같은 방식을 사용함
  - e.g. `tony.com-key: 1234`

#### Content-Length

- 컨텐트 크기

#### Content-Type

- 컨텐트 타입
- e.g.
  - `Content-Type: application/json`
  - `Content-Type: text/html`

#### Content-Language

- 언어에 대한 정보
- e.g. `Content-Language: en`

#### Cache-Control

- 캐싱에 대한 정보
- e.g.
  - `Cache-Control: no-cache` : 캐싱을 하지 않음
  - `Cache-Control: max-age=3600` : 1시간 동안 캐싱을 할 수 있음(숫자는 초단위)

## 8.6 실제 예제 분석해 보기

- 정보를 요청할 때 어떤 정보를 많이 실어 보내야 한다면 POST를 사용할 수도 있음

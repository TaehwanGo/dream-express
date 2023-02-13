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

# 28. Web APIs 디자인/문서화

## 28.1 소개

- How to define RESTful API?
- How to document RESTful API?
- How to keep code and docs in sync?
- How to make API adoption easy?

- 이런 질문들에 대한 답으로 Swagger, OpenAPI에 대해 알아보자.

## 28.2 Swagger란 무엇인가?

- Domain specific language(도메인의 규격을 정의하는 언어)

  - to describe RESTful API
  - Swagger Spec 2.0

- Swagger Tools

  - Swagger Editor
  - Swagger Codegen
  - Swagger UI

- 기존 Swagger -> OPEN API(리눅스)

  - Swagger Spec 2.0 -> OpenAPI Spec 3.0

- 통상적으로 Swagger라 하면 Tools를 의미한다.

## 28.3 Swagger를 왜 배워야 할까?

- API를 구현하기 이전에 API가 어떻게 생겼는지 모델링을 할때 => Swagger Editor를 사용
- Rest API 문서화 => Swagger UI
- 코드와 문서와 자동으로 싱크를 만들 때 => Swagger Codegen
- 클라이언트들에게 SDK를 제공해주면서 해당 SDK만 사용하면 자동으로 API가 변경될 때 마다 업데이트 할 수 있다(API adoption) => Swagger Codegen

- Swagger !
  - Community
  - Tooling
  - Numerous libraries

## 28.4 Open API 살펴보기

- Open API Specification

  - API를 어떻게 정의할 것인지 알아보자

- API를 구현하기 이전 또는 구현하고 난 뒤 문서화를 하는 것, 규격 사항 정의

  - JSON 또는 YAML 형태로 작성, 보통은 YAML

- OpenAPI Document
  - OpenAPI 3.1.0 : 버전 정보
  - info : API에 대한 정보
    - 우리 REST API에 대한 대략적인 정보
      - title, description, termsOfService, contact, license, version
  - servers : API를 구동하는데 있어서 어떤 어떤 서버가 있는지 서버에 대한 정보
    - url, description
  - security : API를 이용하는 데 있어서 필요한 어떤 API키가 필요한지 등
    - api_key
  - paths : API에 있는 모든 경로(Declares available API endpoints and operations)
    - e.g.
      - /pet
        - put
          - tags
          - summary
          - ...
  - tags : 나중에 연관있는 API경로들을 함께 묶어주는 역할
    - 그룹을 지을 때 관련있는 태그로 묶을 수 있음
  - externalDocs : 추가적으로 보면 좋은 링크들
    - description
    - url
  - components
    - requests, responses, schemas, parameters, examples, securitySchemes, links, callbacks

## 28.5 OpenAPI 데모 - 사용해보기

- https://editor.swagger.io/
- 위 사이트에서 OpenAPI를 작성하고, Swagger UI를 통해 문서화를 할 수 있다.

  - 작성된 것을 지우고 새로 만들어보자

- try it out을 통해 API를 테스트 할 수 있다.

```yaml
openapi: 3.0.0
info:
  description: This is Dwitter API service.
  version: 1.0.0
  title: Dwitter - Dream Coding Nodejs Test Project
  contact:
    email: gth1123@naver.com
servers:
  - url: "http://localhost:4000"
tags:
  - name: tweets
    description: Methods to access and manage tweets
  - name: auth
    description: Methods to handle authentication
basePath: /
paths:
  /auth/signup:
    post:
      tags:
        - auth
      summary: Signs up a user to the Dwitter service
      description: Creates a user account for the given user details
      operationId: signup
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserRegistration"
        required: true
      responses:
        "201":
          description: Created
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AuthApiResponse"
        "400":
          description: Bad request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorApiResponse"
        "409":
          description: User already exists
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorApiResponse"

  /tweets:
    get:
      tags:
        - tweets
      summary: Get all tweets optionally filtered by author
      description: >
        Fetches a list of tweets. If username is provided, the list contains
        only tweets by the given user.
      operationId: getTweets
      parameters:
        - name: username
          in: query
          description: Username value to filter the results
          schema:
            type: string
      responses:
        "200":
          description: Succeeded
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/TweetsApiResponse"
        "401":
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorApiResponse"
      security:
        - jwt_auth: []

components:
  schemas:
    UserRegistration:
      type: object
      title: User registration details
      properties:
        username:
          type: string
        password:
          type: string
          minLength: 5
        name:
          type: string
        email:
          type: string
          format: email
        url:
          type: string
          format: url
      required:
        - username
        - password
        - email
        - name
      example:
        username: johndoe
        password: password
        name: John Doe
        email: john.doe@gmail.com
        url: "https://awesomepics.com/878y766"
    Tweet:
      type: object
      properties:
        id:
          type: integer
          format: int64
        text:
          type: string
          minLength: 3
        createdAt:
          type: string
          format: date-time
          description: Creation date
          example: "2021-01-30T08:30:20.000Z"
        username:
          type: string
        name:
          type: string
        userId:
          type: integer
          format: int64
        url:
          type: string
          format: url
          nullable: true
      required:
        - id
        - text
        - createdAt
        - username
        - name
        - userId
        - url
      example:
        id: 42
        text: Best tweet ever
        createdAt: "2021-01-30T08:30:20.000Z"
        userId: 1
        name: John Doe
        username: johndoe
        url: null
    AuthApiResponse:
      type: object
      properties:
        token:
          type: string
        username:
          type: string
      required:
        - token
        - username
      example:
        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
        username: johndoe
    ErrorApiResponse:
      type: object
      properties:
        message:
          type: string
      required:
        - message
      example:
        message: "Something went wrong 🤪"
    TweetsApiResponse:
      type: array
      items:
        $ref: "#/components/schemas/Tweet"
  securitySchemes:
    jwt_auth:
      description: Bearer token authorization with JWT
      type: http
      scheme: bearer
      bearerFormat: JWT
```

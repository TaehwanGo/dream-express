# 22. MongoDB

## 22.1 MongoDB 시작!

- The most commonly used NoSQL DB in Web development
- Primary unit of data is a document
- Documents organized in collections
- Document structure is not enforced by DB
- Each document is self-contained
- Data duplication instead of relation
- 하나의 데이터를 독립적으로 저장하는 것이 중요 !

## 22.2 설치 및 설정하기

- MongoDB는 자체적으로 무료로 지원하는 클라우드 서비스가 있기 때문에 이것을 이용해보자

### 22.2.1 MongoDB Atlas

- shared/clusters M0 Sandbox free tier
- Connect to Cluster
  - Connect your application

## 22.2 설치 및 설정하기

- 공식 문서 : https://www.mongodb.com/docs/drivers/
  - Drivers : 새로운 장치(e.g. 프린터 등)를 컴퓨터에 연결하는 소프트웨어
    - MongoDB도 Cloud를 연결하기 위해 드라이버를 설치해야한다

```bash
npm install mongodb
```

## 22.3 연결 및 공식 문서 확인

## 22.4 ~ 5 드위터 Auth 관련 MongoDB 사용하기

- https://www.mongodb.com/docs/drivers/node/current/usage-examples/

- 어플리케이션 로직과 데이터베이스 연결 로직을 분리해놓았기 때문에 이렇게 db를 바꿀 때도 쉽게 바꿀 수 있다

- MongoDB Atlas -> Browse Collections

  - MongoDB에선 \_id가 기본적으로 생성되어있다
  - 그래서 해당 \_id를 사용해서 데이터를 찾는다

```js
import MongDB from "mongodb";
export async function findById(id) {
  return getUsers().findOne({ _id: new MongDB.ObjectId(id) });
}
```

- \_id는 문자열이 아닌 MongDB에서 사용하는 ObjectID이다

  - ObjectID는 12바이트의 유니크한 값이다
  - 4바이트는 timestamp, 3바이트는 machine id, 2바이트는 process id, 3바이트는 counter로 구성되어 있다
  - MongoDB에서는 ObjectID를 문자열로 변환해서 사용한다

- MongoDB에서 조회한 데이터 id는 어플리케이션에서 사용하고 있는 id로 반환해야 한다

# 19. Database 정리

## 19.1. 데이터베이스 챕터 소개

- 이번 19장에서 배우는 내용
  - 데이터베이스 개념
  - 관계형 데이터 베이스
  - 쿼리
  - 디비 종류
  - NoSQL
  - ORM, ODM
  - SQL vs. NoSQL

## 19.2. 데이터 베이스란?

- 컴퓨터 파일 시스템에서 관련있는 데이터 끼리 모아 놓은 것
- 일반적으로 말하는 데이터베이스는 DBMS를 말한다

  - DBMS: 데이터베이스 관리 시스템(Database Management System)

- 많이 쓰이는 DBMS

  - Oracle
  - MySQL
  - PostgreSQL
    - 비교적 최근에 나온 DBMS
    - 더 강력하고 많은 기능을 제공
    - MySQL에 비해 조금 복잡할 수 있고 쿼리도 조금씩 다르다
    - Heroku에서는 PostgreSQL을 기본으로 사용하고 MySQL도 사용할 수 있다
  - MongoDB
  - SQLite

- SQL

  - Structured Query Language

- NoSQL

  - No SQL
  - SQL을 사용하지 않는 데이터베이스
  - key-value 형태로 데이터를 저장
  - MongoDB, Redis, Cassandra, HBase, Neo4j, CouchDB

- 각 데이터베이스는 장단점이 다르므로 적절한 데이터베이스를 선택해야 한다

## 19.3. SQL 그 모든 것

- 관계형 데이터베이스와 쿼리 언어(SQL)에 대해 알아보자

- SQL 데이터 베이스의 구성

  - Tables, rows(행), columns(열) 로 구성

- 각 열(column)은 데이터 타입을 가진다

  - VARCHAR: 문자열
  - INT: 정수
  - FLOAT: 실수
  - DATE: 날짜
  - DATETIME: 날짜와 시간

- Record : 행(row)을 의미

  - 한 줄에 들어가는 데이터를 의미

- Schema

  - 테이블, 컬럼, 로 그리고 각각의 데이터 타입을 지정해주는 것들을 스키마라고 한다
  - 예를 들어, 테이블의 이름은 users, 컬럼의 이름은 id, name, email, password, created_at, updated_at 등이 있다
  - 스키마를 통해서 Data integrity(데이터의 무결성)를 보장할 수 있다

- Data integrity(데이터의 무결성)
  - 데이터의 온전함, 진실성, 정확성을 보장하는 것
  - 데이터의 정확성과 일관성을 보장하는 것
  - 스키마에서 정의한 타입 외에 다른 타입의 데이터는 넣을 수 없기 때문

### 데이터 베이스의 중요 키 두 가지

- Primary key

  - 각 테이블에서 각 레코드를 구분할 수 있는 키
  - 중복되지 않는 유일한 값
  - 테이블을 생성할 때 지정
  - 테이블을 생성할 때 지정하지 않으면 자동으로 생성

- Foreign key
  - 두 가지 다른 테이블의 관계를 정의해 줌

### SQL 쿼리

- SELECT
  - 내가 가지고 오고 싶은 테이블에서 어떤 컬럼을 가지고 올 것인지 명시
- FROM
  - 어떤 테이블에서 가지고 올 것인지 명시
- WHERE

  - 조건을 명시

#### e.g.

- SELECT \* FROM Users WHERE name LIKE '%Bob%';

  - Users 테이블에서 name이 Bob으로 시작하는 모든 레코드를 가지고 온다

- SELECT \* FROM Users WHERE id = 1;

  - Users 테이블에서 id가 1인 레코드를 가지고 온다

## 19.4 NoSQL 그 모든 것

- NoSQL의 개념과 종류들

- 1990년데에 오브젝트를 기반으로한 프로그래밍에서 어떻게 하면 오브젝트 자체를 데이터베이스에 저장할 수 있을지를 고민
- 2000년도 중반에 인터넷이 급 성장하면서 빅데이터가 뜨면서 NoSQL이 뜨기 시작함

### NoSQL의 특징

- schema가 없음
- 관계형이 아님
  - 서로 관계가 없으므로 자체적으로 고립된 형태로 관리
- 정말 특수한 문제를 해결하기 위해 나옴
- NoSQL의 종류
  - key-value
  - Document
  - Wide-column
  - Graph
- 대표적인 NoSQL인 MongoDB는 Document 형태로 데이터를 저장
  - 하나의 데이터는 JSON 과 같이 오브젝트로 관리 할 수 있고
  - 관련있는 document를 묶어주는 `collection`이라는 개념이 있음
  - 하나의 collection과 다른 collection과는 관계가 없음 -> 다른 서버에 저장해도 됨
- 차라리 데이터를 중복으로 관리하는 것을 선호
  - 데이터간의 관계를 맺으면 NoSQL의 장점을 살리기 어려움

```js
/* NoSQL 예시 */
// code
const userJane = {
  username: "jane",
  birthday: new Date(1980, 6, 20),
};
const userBob = {
  first_name: "Bob",
  last_name: "Smith",
}

const product = {
  name: "toothbrush",
  price: 1000,
};

// Database
// User collection
{ id: 123, username: "jane", birthday: '1980-06-20' }
{ id: 456, first_name: "Bob", last_name: "Smith"}

// Product collection
{ id: 123, name: "toothbrush", price: 1000 }
```

- NoSQL은 스키마가 없으므로 어떤 데이터든 저장할 수 있다

### Most Popular NoSQL Databases

#### Wide Column

- cassandra
- Cloud Bigtable

#### Graph

- Neo4j

#### Document

- MongoDB

#### Key-value

- Redis
- DynamoDB

## 19.5 ORM과 ODM

### ORM(Object Relational Mapping)

- code의 여러 오브젝트를 데이터베이스의 테이블과 매핑해주는 것

#### ORM인 Sequelize 예시

1. Run the code

```js
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  },
  { sequelize, modelName: "user" }
);

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: "jane",
    birthday: new Date(1980, 6, 20),
  });
  console.log(jane.toJSON());
})();
```

2. Creates DB Table
3. Creates the record

#### ORM의 장점

- Business Logic
  - DB쿼리를 몰라도 어플리케이션 비지니스 로직에 집중하여 개발 할 수 있다
- No Boilerplate code
  - SQL 쿼리를 반복해서 작성해야할 때가 많은데 그런 작업을 줄여 줌
- Database Abstraction
  - 데이터 베이스를 추상화하는 추상화 레벨이 들어가 있기 때문에 데이터베이스를 바꿔도 코드를 거의 수정하지 않아도 된다
- Schema migration

#### ORM의 단점

- Suboptimal queries SQL knowledge?
  - ORM에서 제공하는 API만으론 상세한 쿼리를 할 수 없음
- ORM 마다 API가 다름
  - SQL은 한번 배워두면 전체적으로 비슷하지만
  - ORM은 각각의 ORM마다 API가 다르다
- SQL을 모른채로 ORM을 사용한다면 효율적인 쿼리를 작성하지 못 할 수 있다
  - 그래서 ORM마다 수동적인 쿼리를 작성할 수 있도록 API를 제공해주고 있다

### ORM 예시

#### 간단한 쿼리

```sql
SELECT * FROM Users WHERE name LIKE '%Bob%' AND age > 20;
```

```js
User.findAll({
  where: {
    name: {
      [Op.like]: "%Bob%",
    },
    age: {
      [Op.gt]: 20,
    },
  },
});
```

#### 복잡한 쿼리

```sql
SELECT * FROM item WHERE id NOT IN (SELECT item_id FROM ingredient WHERE dish_id = 2) AND (SELECT item_id FROM ingredient WHERE dish_id = 1);
```

- ORM의 API 특성상 모든 행에 있는 데이터를 다 읽어와서 코드에서 필터링을 해야하기 때문에 실제로 Database만을 이용했을 때의 정말 빠른 성능, 메모리의 최적화를 할 수 없을 수 있다

### Node 진영에서 많이 사용하는 ORM 과 ODM

#### ORM(Object Relational Mapping)

- Sequelize
- TypeORM
- Prisma

#### ODM(Object Document Mapping)

- Mongoose

## 19.6 SQL vs. NoSQL 언제 어떤 것을?

| SQL vs. NoSQL                    | SQL                | NoSQL                           |
| -------------------------------- | ------------------ | ------------------------------- |
| Getting started                  | Medium             | Easy                            |
| Data structure                   | 고정적(Rigid/Fixed | 유연함(undefined/Flexible)      |
| Data lookup                      | Easy               | Easy                            |
| 데이터 연관성(Aggregate queries) | Easy               | Difficult(어렵고 성능도 떨어짐) |
| 하나의 데이터를 여러가지로 분리  | Easy               | Difficult                       |
| 확장성(Scalability)              | Difficult          | Easy                            |
| 클라우드에서 운영 비용           | costly             | cheap                           |

### Scaling(확장성)

- 수직으로 확장
  - SQL은 서로 다른 테이블이 연관
    - 다른 서버에 배포하기 어렵다
  - 서버 자체의 Ram, CPU, Disk 등을 늘려서 확장
- 수평으로 확장
  - NoSQL은 서로 다른 데이터들이 연관이 없으므로 컬렉션을 다른 서버에 배포할 수 있다
  - 수평적으로 서버를 늘려서 확장
- 확장성도 데이터베이스를 고르는 중요한 요소가 될 수도 있지만 더 중요한 3가지 포인트를 알아보자

### SQL vs. NoSQL 을 고를 때 고려해야 할 3가지

#### 1. The type of data in question

- 우리의 데이터 타입은 무엇인가?

#### 2. The amount of data

- 데이터의 양

#### 3. How data will be queried?

- 데이터의 관계가 있는지
  - 관계가 있다면 관계가 있는 데이터를 묶어서 쿼리를 할 확률이 얼마나 많은지를 고려해야 한다

### SQL을 사용하는 제품들

- Accounting software
- E-commerce platforms
- customer relationship software(CRM)

### NoSQL을 사용하는 제품들

- Social Networks(graph)
- Distributed cache(key-value)
- content management systems(CMS)(document)
  - 사용자가 문서를 만들고
  - 여러가지 컨텐트 별로 다큐먼로 관리 될 수 있는 것들
- Real-time analytics(wide column)
  - 빅데이터 같이 실시간으로 데이터를 분석해야 하는 경우

### Hybrid approach

- 하나의 기업에서 하나의 제품을 사용한는 것이 아닌 여러가지 제품을 사용하는 경우가 많다
- 같은 프로젝트에서도 필요에 따라 부분적으로 사용할 수 있다

- Hybrid approach 예시
  - User service : MongoDB
  - Billing service : MySQL
  - Transcoding service : DynamoDB
    - Transcoding : 하나의 인코딩을 다른 인코딩으로 직접 디지털-디지털로 변환하는 것
    - e.g. 동영상을 변환하는 서비스

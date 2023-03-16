# 20. MySQL

## 20.1 MySQL 챕터에서 우리가 배울 것

- MySQL 설치
- SQL 문 사용해보기

## 20.2 MySQL 설치

- [MySQL 공식 홈페이지](https://www.mysql.com/)에서 다운로드
- 커뮤니티 버전으로 다운로드
- MySQL Community Server

  - macOS 13, DMG - MD5: a32ba099234dc70103f9bd1b25ccc9fd - Signature: iQIzBAABCAAdFiEEhZvo18WG9ThDCxnCRnuULTp5vSkFAmOd7mMACgkQRnuULTp5
    vSlL2Q//aann1uY5eXujV2z6NgHM+AI7koIIntB/IUsje8iA9ZSrN0yI9TraAQJy
    xzAsnwGNz4aWd32fg50nTmrQDBvIX5fBX3LtjuDmNCpZLRC2pDFXER6M7WX9dVoR
    mAqLAqCJMJrPTRxiCSAsNbVX7/GsmV9Bwa5IzN5DGS+f8QtF4djIjIhsprFoL9JL
    LptcNDODF8GnkQP1mlsXAH0xlPZMI6bk6X1U/W0qzWEP3uFtc5E3SF3GQ7+eXkji
    kas9tDuKHFaSh/EZtjU+f/q6ZyIEOmF/c84Mpo90zXSirZAzWOrAVG3HI5yTKHsk
    pgVDqPNOgTb6xlUAmXAfjyfZbHENiDKR9B3PNSJsI7OnUErS47TSHruZmU2Qvwmr
    TvrB6axfEFXTGDTyvVMucgnjurg1m5PRj3ZbHHLIIHK+rl0yzVaC53w8K0A7kWpr
    jNKo7/lKXhsq+0pVmBPX8gaDORnHT5MEWtgLIi0YJf5c2Q1s1yYbfoGU3Vm1n/ok
    LAtdNtoswnBfFwwDDAPeWWfmR8UledQo9TC34uRqRPqkPe7K/G3RDG5jVOpTjv94
    oWoTNl5pEkGPGbEF0Cz+xLisYowzsUiYfy0MK047iQe8ACgsCiqO7Sbm8OlAN6t3
    h5xP3Wh/bP74Azsx9g/6wxtTuOfA6O9OKUf71oR0GDVvlTF3iCI=
    =u7UV
  - Login 없이 설치 : `No thanks, just start my download.` 클릭

- MySQL Workbench
  - MD5: 496c6367ae625253eed30862911b029e
  - Signature : iQIzBAABCAAdFiEEhZvo18WG9ThDCxnCRnuULTp5vSkFAmOZ/DEACgkQRnuULTp5
    vSlzQA//UYmcZathWuPut7lJsjkLa0WXDf3TrVJFjZlcBfzh3DGrByHBXJEYbE4e
    g+oAoDNc8a4QGRDxbJvxukGtsdNwDtoeH2GRD4HxWkmAIdx3yo2i7fZbUvFvlOgq
    +tBg7qhk5kHkeqKdwl4Uf57NM+EufPb6P75pDLxsvm546uq+o+Mu9bRq92IlIpd8
    zZYlscjWXvkYu076wn2oxOpVajNdPf5y/0qwR8xWVhkRlsMkTYH00UcTFwt6f1ws
    2alWt8pJHxS2uz/Lf+vzZ/2eCoVbV85pOYvufn8sOU6PxCipjdsgtnYOZ5btRAcq
    UUOGGFc79bvMHj21g7k5ztP1BCH17P6bkpguCJhEqsHUVtXaDV3sVJKgCB3guN/T
    1TldmvMO8qKRQOJpKKl5Y2bB2PkgDBZxEal2QDbYxihoxpQgE4xcverabV8cIqv7
    4ve0qXYYDHMBja8kBRLSYK4lodESu3NkqfJ0Nl9z1XM/RykT7AdO2l4eGBonmH5m
    /kXBcYTkWAXs15rchVwNrj+Va3V4PnZ9xgbHdlrZZRz8aOHRCXrlQwZZuPuUbJK4
    XS8yHk7SaAzGPDucGA8aQ6b2GnY2ELhnHAYsq3aEEWO0fwS8c2egGxF1ZaDp/TGR
    JZfRw2oqPAP3yDURGYe+sjVMfXs+YyS+mak2jEIwMDo4KBsAdVw=
    =92GH

### 20.2.1 MySQL 설치

- Strong Password Encryption
- root 유저의 비밀번호

### 설치 확인

- System에서 MySQL을 실행

## 20.3 스키마 정의하기

### 20.3.1 스키마란?

- 스키마 : 관계 정의
  - 어떤 테이블들이 있는지
  - 어떤 컬럼들이 있는지
- 스키마 이름은 보통 프로젝트 이름으로 정함

- PK: Primary Key
  - 기본키
  - 중복되지 않는 값
  - Null이 아닌 값
- NN: Not Null
  - Null이 아닌 값
- UQ: Unique
  - 중복되지 않는 값
- BN: Binary
  - 데이터인지 아닌지 구분
- UN: Unsigned
  - 음수가 아닌 값
- ZF: Zero Fill
  - 0으로 채워진 값
- AI: Auto Increment
  - 자동으로 1씩 증가하는 값

### 20.3.2 스키마 정의하기

#### users 테이블

- id
  - PK, NN, UQ, AI
  - INT
- username
  - NN, UQ
    - 나중에 내 서비스를 만들 땐 username을 UQ가 아니게 만들자
  - VARCHAR(45)
    - 45자 이하의 문자열(기본 값)
- password
  - NN
  - VARCHAR(128)
- name
  - NN
  - VARCHAR(128)
- email

  - NN, UQ
  - VARCHAR(128)

- apply 클릭

```sql
CREATE TABLE `dwitter`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `url` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

```

- unique한 필드는 UQ를 체크해줘야 성능에도 도움이 된다

#### tweets 테이블

- id
  - PK, NN, UQ, AI
  - INT
- text
  - NN
  - TEXT
- createdAt
  - NN
  - DATETIME
- userId
  - NN
  - INT

```sql
CREATE TABLE `dwitter`.`tweets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

```

#### tweets 테이블과 users 테이블 연결

- tweets 테이블에서 아래쪽에 Foreign Keys 클릭

![](../images/workbench_%EA%B4%80%EA%B3%84%EC%84%A4%EC%A0%95.png)

```sql
ALTER TABLE `dwitter`.`tweets`
ADD INDEX `id_idx` (`userId` ASC) VISIBLE;
;
ALTER TABLE `dwitter`.`tweets`
ADD CONSTRAINT `id`
  FOREIGN KEY (`userId`)
  REFERENCES `dwitter`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

```

- 관계가 있는 경우에 update 시 어떤 액션을 할 것인지 정할 수도 있다
  - 현재는 NO ACTION으로 설정

### 이슈

- MySQL 8.0.32 버전에서 테이블 조회 시 워크벤치가 꺼지는 현상
  - 8.0.31 버전으로 낮춰서 다시 설치

## 20.4 노드 서버에서 연결하기

- dwitter backend에 mysql2 설치

  - npm i mysql2

- db 관련 설정을 해주고 설정 데이터는 .env 파일에 추가한 뒤 config.js에서 불러온다

## 20.5 드위터 Auth관련 MySQL 사용하기

- 사용자 데이터를 메모리가 아닌 db에 저장해보자

#### createUser(user)

```js
// sign up : gth1123, 12345
[
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 1, // insert된 id, 즉 user table의 pk
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]
```

#### findByUsername(username)

```js
[
  [
    {
      id: 1,
      username: "gth1123",
      password: "$2b$10$qqr6.NOqelpjueylMfzVFOVhuZXKSnymkSnksbO4JZQvHlFe6iray",
      name: "Tony",
      email: "gth1123@naver.com",
      url: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
    },
  ],
  // ...
];
```

### 이슈

/auth/me 응답이 되지 않는다

# 21. Sequelize

## 21.1 Sequelize ORM 시작!

- SQL에서 많이 사용되는 ORM인 Sequelize
- 지난 챕터에선 직접 스키마를 만들고 쓰고 사용했지만
- 이번엔 스키마를 미리 만들지 않고 CRUD를 해보자

## 21.2 Sequelize 힌트 듣고 드위터에 적용하기

- 참고
  - https://sequelize.org/master/manual/getting-started.html
  - https://www.npmjs.com/package/sequelize

```bash
npm install --save sequelize
```

## 21.3 Sequelize 드위터에 전용하기 - 연결

## 21.4 Sequelize 드위터에 적용하기 - Auth

- Auth를 Sequelize로 바꿔보자

### users 테이블 만들기

```js
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  url: DataTypes.TEXT,
});
```

```sql
CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(45) NOT NULL, `password` VARCHAR(128) NOT NULL, `name` VARCHAR(128) NOT NULL, `email` VARCHAR(128) NOT NULL, `url` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
```

## 21.5 Sequelize 드위터에 적용하기 - Tweet

### tweets 테이블 만들기

```js
const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(userRepository.User); // 테이블 관계 설정 - 정말 간단하게 이렇게 할 수 있다
```

### tweet 조회

```js
export async function getAll() {
  return Tweet.findAll().then((result) => {
    console.log(result);
    return result;
  });
}
```

- 이 경우 트윗만 조회되고 유저 정보는 조회되지 않는다

```js
export async function getAll() {
  return Tweet.findAll({
    attributes: [
      "id",
      "text",
      "createdAt",
      "userId",
      // 중첩 객체 -> 플랫하게 만들어준다
      [Sequelize.col("user.name"), "name"], // user 테이블의 name 컬럼을 name으로 가져온다
      [Sequelize.col("user.username"), "username"],
      [Sequelize.col("user.url"), "url"],
    ],
    include: {
      model: userRepository.User,
      attributes: [],
    },
    order: [["createdAt", "DESC"]], // 최신순으로 정렬
  }).then((result) => {
    console.log(result);
    return result;
  });
}
```

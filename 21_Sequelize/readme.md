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

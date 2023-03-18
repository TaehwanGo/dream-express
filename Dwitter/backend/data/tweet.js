// import { dbConnection } from "../app.js";
import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../db/database.js";
import * as userRepository from "./auth.js";

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

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";

const INCLUDE_USER = {
  attributes: [
    "id",
    "text",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"],
    [Sequelize.col("user.username"), "username"],
    [Sequelize.col("user.url"), "url"],
  ],
  include: {
    model: userRepository.User,
    attributes: [],
  },
};

const SQ_ORDER_DESC = {
  order: [["createdAt", "DESC"]],
};

export async function getAll() {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...SQ_ORDER_DESC,
  }).then((result) => {
    return result;
  });
  // return dbConnection
  //   .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
  //   .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...SQ_ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
  // return dbConnection
  //   .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) // us.username에서 us같이 테이블명은 생략 가능하다
  //   .then((result) => result[0]);
}

export async function getById(id) {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
  // return dbConnection
  //   .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]) // tw.id에서 tw을 생략하지 않은 이유는 us.id와 혼동하지 않기 위해 명확하게 표기해준 것이다
  //   .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return Tweet.create({ text, userId }).then((data) => {
    return getById(data.dataValues.id);
  });
  // return dbConnection
  //   .execute("INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)", [
  //     text,
  //     new Date(),
  //     userId,
  //   ])
  //   .then((result) => {
  //     return getById(result[0].insertId);
  //   });
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
    tweet.text = text; // sequelize에서는 이렇게 바로 할당해주면 된다
    return tweet.save();
  });
  // return dbConnection
  //   .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
  //   .then(() => getById(id));
}

/**
 * javascript 자체에서 delete는 이미 선점하고 있으므로 다른 이름으로
 */
export async function remove(id) {
  return Tweet.findByPk(id).then((tweet) => {
    tweet.destroy();
  });
  // return dbConnection.execute("DELETE FROM tweets WHERE id=?", [id]);
}

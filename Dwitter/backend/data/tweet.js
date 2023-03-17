import { dbConnection } from "../app.js";
import * as userRepository from "./auth.js";

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";
export async function getAll() {
  return dbConnection
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return dbConnection
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]) // us.username에서 us같이 테이블명은 생략 가능하다
    .then((result) => result[0]);
}

export async function getById(id) {
  return dbConnection
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]) // tw.id에서 tw을 생략하지 않은 이유는 us.id와 혼동하지 않기 위해 명확하게 표기해준 것이다
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return dbConnection
    .execute("INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)", [
      text,
      new Date(),
      userId,
    ])
    .then((result) => {
      return getById(result[0].insertId);
    });
}

export async function update(id, text) {
  return dbConnection
    .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
    .then(() => getById(id));
}

/**
 * javascript 자체에서 delete는 이미 선점하고 있으므로 다른 이름으로
 */
export async function remove(id) {
  return dbConnection.execute("DELETE FROM tweets WHERE id=?", [id]);
}

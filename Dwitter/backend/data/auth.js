import { dbConnection } from "../app.js";

export async function findByUsername(username) {
  return dbConnection
    .execute("SELECT * FROM users WHERE username=?", [username])
    .then((result) => {
      console.log(result);
      return result[0][0];
    });
}

export async function findById(id) {
  console.log("findById", id);
  return dbConnection
    .execute("SELECT * FROM users WHERE id=?", [id])
    .then((result) => {
      console.log(result);
      return result[0][0];
    });
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  dbConnection
    .execute(
      "INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)",
      [username, password, name, email, url]
    )
    .then((result) => {
      console.log(result);
      return result[0].insertId;
    });
}

import { dbConnection } from "../app.js";
import SQ from "sequelize";
import { sequelize } from "../db/database.js";

const DataTypes = SQ.DataTypes;

/**
 * user로 이름을 지으면 users로 s가 붙어서 생성된다
 */
const User = sequelize.define(
  "user",
  {
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
  },
  {
    timestamps: true,
  }
);

export async function findByUsername(username) {
  return User.findOne({ where: { username } });
  // return dbConnection
  //   .execute("SELECT * FROM users WHERE username=?", [username])
  //   .then((result) => {
  //     console.log(result);
  //     return result[0][0];
  //   });
}

export async function findById(id) {
  return User.findByPk(id);
  // return dbConnection
  //   .execute("SELECT * FROM users WHERE id=?", [id])
  //   .then((result) => {
  //     console.log(result);
  //     return result[0][0];
  //   });
}

export async function createUser(user) {
  return User.create(user).then((data) => {
    console.log(data);
    return data.dataValues.id;
  });
  // const { username, password, name, email, url } = user;
  // dbConnection
  //   .execute(
  //     "INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)",
  //     [username, password, name, email, url]
  //   )
  //   .then((result) => {
  //     console.log(result);
  //     return result[0].insertId;
  //   });
}

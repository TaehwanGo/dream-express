import mysql from "mysql2/promise";
import { config } from "../config.js";

// 데이터베이스를 관리하는 pool
// createPool() 메소드를 사용하여 데이터베이스와 연결
export const connectDB = async () => {
  try {
    return await mysql
      .createConnection({
        host: config.db.host,
        user: config.db.user,
        database: config.db.database,
        password: config.db.password,
      })
      .then((connection) => {
        console.log("DB connected");
        return connection;
      });
  } catch (error) {
    console.error(error);
  }
};

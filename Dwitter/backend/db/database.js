// import mysql from "mysql2/promise";
import { config } from "../config.js";
import SQ from "sequelize";

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql", // default: 'mysql'
  // logging: false, // 로그를 출력하지 않음
});

// 데이터베이스를 관리하는 pool
// createPool() 메소드를 사용하여 데이터베이스와 연결
// export const connectDB = async () => {
//   try {
//     return await mysql
//       .createConnection({
//         host,
//         user,
//         database,
//         password,
//       })
//       .then((connection) => {
//         console.log("DB connected");
//         return connection;
//       });
//   } catch (error) {
//     console.error(error);
//   }
// };

// import { sequelize } from "../../db/database";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;
dotenv.config({ path: path.join(__dirname, "../../.env.test") });

export default async function teardown() {
  return new Promise(async (resolve) => {
    /**
     * global하게 존재하는 file은 우리 application에 대해 전혀 알지 못하기 때문에
     * sequelize drop을 사용할 수 없다
     */
    // await sequelize.drop();
    const connection = await mysql.createConnection({
      host: process.env["DB_HOST"],
      user: process.env["DB_USER"],
      database: process.env["DB_NAME"],
      password: process.env["DB_PASSWORD"],
    });

    try {
      await connection.execute("DROP TABLE tweets, users");
    } catch (err) {
      console.log(err);
    } finally {
      await connection.end();
    }

    resolve();
  });
}

/**
 * 이런 설정은 docker 에서는 필요하지 않다
 */

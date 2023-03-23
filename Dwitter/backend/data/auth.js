import { getUsers } from "../db/mongo.js";
import MongDB from "mongodb";

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username }) // 함수형에선 실행하는 명령어 하나당 한 줄씩 적는 것이 가독성이 좋다
    .then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new MongDB.ObjectId(id) })
    .then((data) => {
      return mapOptionalUser(data);
    });
}

/**
 * 사용자 id를 리턴
 */
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
}

function mapOptionalUser(user) {
  return user
    ? {
        ...user,
        id: user._id,
      }
    : user;
}

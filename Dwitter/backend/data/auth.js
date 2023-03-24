import { getUsers, useVirtualId } from "../db/mongo.js";
// import MongDB from "mongodb";
import Mongoose from "mongoose";

// NoSQL은 스키마가 없지만 ODM을 사용하면 스키마를 만들 수 있다
const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });
  // return getUsers()
  //   .findOne({ username }) // 함수형에선 실행하는 명령어 하나당 한 줄씩 적는 것이 가독성이 좋다
  //   .then(mapOptionalUser);
}

export async function findById(id) {
  return User.findById(id);
  // return getUsers()
  //   .findOne({ _id: new MongDB.ObjectId(id) })
  //   .then((data) => {
  //     return mapOptionalUser(data);
  //   });
}

/**
 * 사용자 id를 리턴
 */
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
  // return getUsers()
  //   .insertOne(user)
  //   .then((result) => result.insertedId.toString());
}

// function mapOptionalUser(user) {
//   return user
//     ? {
//         ...user,
//         id: user._id.toString(),
//       }
//     : user;
// }

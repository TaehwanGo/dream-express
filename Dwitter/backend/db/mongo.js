// import MongoDB from "mongodb";
import Mongoose from "mongoose";
import { config } from "../config.js";

// /**
//  * @type {MongoDB.Db}
//  */
let db; // TODO(Tony): Delete db
export async function connectDB() {
  return Mongoose.connect(config.mongodb.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // return MongoDB.MongoClient.connect(config.mongodb.host).then((client) => {
  //   db = client.db();
  // });
}

export function useVirtualId(schema) {
  // MongoDB에서 _id로 저장이 되지만 Mongoose에서도 _id로 저장을 하고 id로 사용할 수 있게 한다(_id -> id)
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}

export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}

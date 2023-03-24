import { getTweets } from "../db/mongo.js";
import * as userRepository from "./auth.js";
import MongoDB from "mongodb";

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then((data) => {
      return data;
    });
}

export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new MongoDB.ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  // 정보의 중복을 관계보다 우선시 함
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => {
      const newTweet = {
        ...tweet,
        _id: data.insertedId,
      };
      return mapOptionalTweet(newTweet);
    });
}

export async function update(id, text) {
  return (
    getTweets() // findOneAndUpdate : 찾은 데이터를 업데이트하고, 업데이트된 데이터를 반환
      // updateOne : 찾은 데이터를 업데이트하고, 업데이트된 데이터를 반환하지 않음
      .findOneAndUpdate(
        { _id: new MongoDB.ObjectId(id) },
        { $set: { text } },
        { returnDocument: "after" } // 업데이트된 데이터를 반환
      )
      .then((data) => data.value)
      .then(mapOptionalTweet)
  );
}

/**
 * javascript 자체에서 delete는 이미 선점하고 있으므로 다른 이름으로
 */
export async function remove(id) {
  return getTweets() //
    .deleteOne({ _id: new MongoDB.ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet
    ? {
        ...tweet,
        id: tweet._id.toString(),
      }
    : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}

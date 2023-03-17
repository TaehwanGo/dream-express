import { getSocketIO } from "../connection/socket.js";
import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found.` });
  }
}

export async function createTweet(req, res) {
  const { text } = req.body;
  // console.log("createTweet, req.body", req.body);
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet); // REST API에서는 201과 생성된 트윗을 보내준다.
  getSocketIO().emit("tweets", tweet); // socket.io를 통해서도 생성된 tweet을 보내준다.
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    res.status(404).json({ message: `Tweet id(${id}) not found.` });
    return;
  }

  if (tweet.userId !== req.userId) {
    res.status(403).json({ message: "Not authorized" });
    return;
  }

  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.status(404);
  }
  if (tweet.userId !== req.userId) {
    // 해당 트윗 유저아이디와 로그인된 유저아이디가 다르면
    return res.status(403);
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
}

import * as userRepository from "./auth.js";

let tweets = [
  {
    id: "1",
    text: "Hello World",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "Hello Tony",
    createdAt: new Date().toString(),
    userId: "2",
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      console.log("getAll, tweet", tweet);
      // const { username, name, url } = await userRepository.findById(
      const userData = await userRepository.findById(tweet.userId);
      console.log("getAll, userData", userData);
      const { username, name, url } = userData;
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  // console.log("getById, id", id);
  const found = tweets.find((tweet) => tweet.id === id);
  // console.log("getById, found", found);
  if (!found) {
    return null;
  }
  // const { username, name, url } = await userRepository.findById(found.userId);
  const userData = await userRepository.findById(found.userId);
  // console.log("getById, userData", userData);
  const { username, name, url } = userData;
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

/**
 * javascript 자체에서 delete는 이미 선점하고 있으므로 다른 이름으로
 */
export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

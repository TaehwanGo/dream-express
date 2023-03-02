let tweets = [
  {
    id: "1",
    text: "Hello World",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
  },
  {
    id: "2",
    text: "Hello Tony",
    createdAt: Date.now().toString(),
    name: "Tony",
    username: "tony",
    url: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
  },
];

export function getAll() {
  return tweets;
}

export function getByUsername(Username) {
  return tweets.filter((tweet) => tweet.username === Username);
}

export function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

/**
 * javascript 자체에서 delete는 이미 선점하고 있으므로 다른 이름으로
 */
export function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

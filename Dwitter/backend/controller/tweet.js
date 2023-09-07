export class TweetController {
  constructor(tweetRepository, getSocketIO) {
    this.tweetRepository = tweetRepository;
    this.getSocketIO = getSocketIO;
  }

  // 일반 함수를 사용하면 외부에서 함수를 사용할 때 this를 잃어버리는 문제가 발생한다.
  // 이를 해결하기 위해 화살표 함수를 사용한다.(자동으로 this를 바인딩해준다.)
  getTweets = async (req, res) => {
    const username = req.query.username;
    const data = await (username
      ? this.tweetRepository.getAllByUsername(username)
      : this.tweetRepository.getAll());
    res.status(200).json(data);
  };

  getTweet = async (req, res) => {
    const id = req.params.id;
    const tweet = await this.tweetRepository.getById(id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found.` });
    }
  };

  createTweet = async (req, res) => {
    const { text } = req.body;
    // console.log("createTweet, req.body", req.body);
    const tweet = await this.tweetRepository.create(text, req.userId);
    res.status(201).json(tweet); // REST API에서는 201과 생성된 트윗을 보내준다.
    this.getSocketIO().emit("tweets", tweet); // socket.io를 통해서도 생성된 tweet을 보내준다.
  };

  updateTweet = async (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await this.tweetRepository.getById(id);
    if (!tweet) {
      res.status(404).json({ message: `Tweet id(${id}) not found.` });
      return;
    }

    if (tweet.userId !== req.userId) {
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    const updated = await this.tweetRepository.update(id, text);
    res.status(200).json(updated);
  };

  deleteTweet = async (req, res, next) => {
    const id = req.params.id;
    const tweet = await this.tweetRepository.getById(id);
    if (!tweet) {
      return res.status(404).json({ message: `Tweet not found: ${id}` });
    }
    if (tweet.userId !== req.userId) {
      // 해당 트윗 유저아이디와 로그인된 유저아이디가 다르면
      return res.sendStatus(403);
    }
    await this.tweetRepository.remove(id);
    res.sendStatus(204);
  };
}

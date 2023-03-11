export default class TweetService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }
  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      headers: this.getHeaders(),
      // FIXME : 현재 소켓으로 바뀌면서 username과 name은 사용되지 않음
      body: JSON.stringify({ text, username: "tony", name: "Tony" }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  onSync(callback) {
    return this.socket.onSync("tweets", callback);
  }
}

import React, { useState } from "react";
import { socketClient } from "..";

const NewTweetForm = ({ tweetService, onError, onCreated }) => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet)
      .then((created) => {
        setTweet("");
        // onCreated(created); // 더 이상 로컬에 만들지 않고 서버에서 만들어서 받아옴 - 소켓을 통해서 요청해서 받아와서 보여줌
      })
      .catch(onError);

    // test emit
    socketClient.emit("tony", "hello");
  };

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <form className="tweet-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Edit your tweet"
        value={tweet}
        required
        autoFocus
        onChange={onChange}
        className="form-input tweet-input"
      />
      <button type="submit" className="form-btn">
        Post
      </button>
    </form>
  );
};

export default NewTweetForm;

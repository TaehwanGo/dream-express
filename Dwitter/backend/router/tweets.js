import express from "express";
import "express-async-errors";
import { validate } from "../middleware/validator.js";
import { body } from "express-validator";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),
  validate,
];

export default function tweetsRouter(tweetController) {
  // GET /tweets
  // GET /tweets?username=:username
  router.get("/", tweetController.getTweets); // tweetController.getTweets는 this바인딩이 되어있어야 한다

  // GET /tweets/:id
  router.get("/:id", tweetController.getTweet);

  // POST /tweets
  router.post("/", isAuth, validateTweet, tweetController.createTweet);

  // PUT /tweets/:id
  router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);

  // DELETE /tweets/:id
  router.delete("/:id", isAuth, tweetController.deleteTweet);
  return router;
}

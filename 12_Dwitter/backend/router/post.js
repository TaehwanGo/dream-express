import express from "express";
import {
  addPost,
  deletePost,
  getPostByUserName,
  getPosts,
  updatePost,
} from "../memoryDB.js";
const postRouter = express.Router();

/**
getPostById
getPostByUserName
 */

// addPost
postRouter.post("/", (req, res) => {
  const { title, name } = req.body;
  const post = addPost(title, name);
  res.status(201).json(post);
});

// getPosts
postRouter.get("/", (req, res) => {
  const { username } = req.query;
  if (username) {
    // getPostByUserName
    const posts = getPostByUserName(username);
    res.status(200).json(posts);
    return;
  }
  const posts = getPosts();
  res.status(200).json(posts);
});

// updatePost
postRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const post = updatePost(id, title);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).send("Not found");
  }
});

// deletePost
postRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  deletePost(id);
  res.status(204).send();
});

export default postRouter;

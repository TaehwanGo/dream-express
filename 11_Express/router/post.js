import express from "express";
const router = express.Router();

// 라우터 => router.메서드(경로, 핸들러)
router.get("/:id", (req, res) => {
  res.status(200).send("GET: /posts/:id");
});
router.put("/:id", (req, res) => {
  res.status(200).send("PUT: /posts/:id");
});
router.delete("/:id", (req, res) => {
  res.status(200).send("DELETE: /posts/:id");
});

export default router;

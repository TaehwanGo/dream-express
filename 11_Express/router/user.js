import express from "express";
const router = express.Router();

// 라우터 => router.메서드(경로, 핸들러)
router.get("/", (req, res) => {
  res.status(200).send("GET: /users");
});

export default router;

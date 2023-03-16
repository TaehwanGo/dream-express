import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";

const authRouter = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  body("url")
    .isURL()
    .withMessage("invalid url")
    .optional({ nullable: true, checkFalsy: true }), // 없거나 null이거나 빈 문자열이면 optional
  validate,
];

authRouter.post("/signup", validateSignup, authController.signup);
authRouter.post("/login", validateCredential, authController.login);
authRouter.get("/me", isAuth, authController.me); // 로그인 한 다음 내가 유효한지 아닌지 확인 후 컨트롤러에서 처리

export default authRouter;

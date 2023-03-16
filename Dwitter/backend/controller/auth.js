import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "express-async-errors";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

export const jwtSecretKey = config.jwt.secretKey;
const jwtExpiresInDays = config.jwt.expiresInSec;
const bcryptSaltRounds = config.bcrypt.saltRounds;

/**
 * @param {string} id
 * @returns string
 */
const createJwtToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" }); // 보안과 연결이 되어있기 때문 - 아이디 또는 비밀번호 중 어느것이 틀렸는지 알려주면 안됨
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" }); // 보안과 연결이 되어있기 때문 - 아이디 또는 비밀번호 중 어느것이 틀렸는지 알려주면 안됨
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

export async function me(req, res) {
  console.log("get me", req.userId);
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

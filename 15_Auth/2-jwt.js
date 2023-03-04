const jwt = require("jsonwebtoken");

/**
 * jwt.sign(payload, secretOrPrivateKey, options)
 * secretOrPrivateKey: string | buffer | object
 * - https://www.lastpass.com/features/password-generator#generatorTool
 * - 권고되는 사이즈 : 32 characters : 256 bits
 */
const SECRET_KEY = "DcN79cgoke$28#t*WPU30zinK7Y8yN4x";
const token = jwt.sign(
  {
    id: "gth1123",
    name: "tony",
    isAdmin: true,
  },
  SECRET_KEY,
  {
    expiresIn: 2, // 2초
  }
);

console.log("token: ", token);

// jwt.io 에서 토큰 해독을 할 수 있습니다
/**
 * iat(issued at): 토큰이 발급된 시간
 */
// const editedToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imd0aDExMjMiLCJuYW1lIjoidG9ueSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Nzc5MTA5MTB9.VVUXmSeR3Xack6ewBU-u93bjKP00wLMHiXEujbi_XAs";

const verifyToken = () => {
  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      console.error(error);
    } else {
      console.log("decoded: ", decoded);
    }
  });
};

setTimeout(verifyToken, 100);

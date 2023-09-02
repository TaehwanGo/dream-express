import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`key not found: ${key}`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("PORT", 4000)),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_NAME"),
    password: required("DB_PASSWORD"),
  },
  rateLimit: {
    windowMs: 60000, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    // windowMs: 10000, // 10 seconds
    // max: 10, // limit each IP to
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
};

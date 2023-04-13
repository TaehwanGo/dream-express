import rateLimit from "express-rate-limit";
import { config } from "../config.js";

export default rateLimit({
  windowMs: config.rateLimit.windowMs, // 1 minutes
  max: config.rateLimit.max, // limit each IP to 100 requests per windowMs
});

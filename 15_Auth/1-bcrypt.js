const bcrypt = require("bcrypt");

const password = "abcd1234";

const hashed = bcrypt.hashSync(password, 10);

console.log("hashed: ", hashed);

const result = bcrypt.compareSync("abcd1234", hashed);
// const result = bcrypt.compareSync("abcd1234", "$2b$10$TuxPqU7uFRpq9qyIWEXHg.hQvb59H/P1IHot7mpmt1JAW2KrIMzl.");
console.log("result: ", result);

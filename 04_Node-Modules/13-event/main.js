const logger = require("./logger");
const emitter = new logger.Logger();

emitter.on("log", (event) => {
  console.log(event);
});

emitter.log(() => {
  console.log("...doing something!");
});

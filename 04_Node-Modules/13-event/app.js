const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("tony", (args) => {
  console.log("first callback - ", args);
});

emitter.on("tony", (args) => {
  console.log("second callback - ", args);
});

emitter.emit("tony", { message: 1 });
emitter.emit("tony", { message: 2 });
emitter.emit("tony", { message: 3 });

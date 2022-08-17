const EventEmitter = require("events");
const emitter = new EventEmitter();

const callback1 = (args) => {
  console.log("first callback - ", args);
};

emitter.on("tony", callback1);

emitter.on("tony", (args) => {
  console.log("second callback - ", args);
});

emitter.emit("tony", { message: 1 });
emitter.emit("tony", { message: 2 });
emitter.removeListener("tony", callback1);
// emitter.removeAllListeners();
emitter.emit("tony", { message: 3 });

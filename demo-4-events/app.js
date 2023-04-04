const EventEmitter = require("events");

const myEmitter = new EventEmitter();

const logDbConnection = () => {
    console.log("DB connected");
};

myEmitter.addListener("connected", logDbConnection);
myEmitter.emit("connected");

myEmitter.removeListener("connected", logDbConnection);
// myEmitter.off("connected", logDbConnection);
// myEmitter.removeAllListener("connected");
myEmitter.emit("connected");

myEmitter.on("msg", data => {
    console.log("Get: ", data);
});

myEmitter.prependListener("msg", data => {
    console.log("Prepend");
});

myEmitter.emit("msg", "Hi, this is my message!");

myEmitter.once("off", () => {
    console.log("Executed once.")
})
myEmitter.emit("off");

myEmitter.emit("off");
console.log(myEmitter.getMaxListeners());
myEmitter.setMaxListeners(1);

console.log(myEmitter.getMaxListeners());
console.log(myEmitter.listenerCount("msg"));

console.log(myEmitter.listenerCount("off"));

console.log(myEmitter.listeners("msg"));

console.log(myEmitter.eventNames());


myEmitter.on("error", err => {
    console.log("Error:", err.message);
});

myEmitter.emit("error", new Error("big error!"));

const target = new EventTarget();

const logTarget = ()=> {
    console.log("connected to target.")
}

target.addEventListener("connected", logTarget);
target.dispatchEvent(new Event("connected"));
const fs = require("fs");

console.log("init");

setTimeout(() => {
    console.log("Timer 0:", performance.now());
}, 100);

setImmediate(() => {
    console.log("Immediate");
})

fs.readFile(__filename, () => {
    console.log("file read");
})

setTimeout(() => {
    for (let i = 0; i < 1000000000; i++) {

    }
    console.log("Done");
    Promise.resolve().then(() => {
        console.log("Promise inside timeout");
    });
    process.nextTick(()=> {
        console.log("tick inside timeout");
    });
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

process.nextTick(()=> {
    console.log("tick");
});

console.log("end");
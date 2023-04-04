// import {characters, greet} from "./characters.mjs"
//
// for (const c of characters) {
//     greet(c);
// }

// import * as char from "./characters.mjs"
//
// for (const c of char.characters) {
//     char.greet(c);
// }

// // import log, * as char from "./characters.mjs"
// import log, {characters, greet as hello} from "./characters.mjs"
//
// log();
//
// for (const c of characters) {
//     // greet(c);
//     hello(c);
// }

async function main() {
    try {
        const {characters, greet} = await import("./characters.mjs");
        for (const c of characters) {
            greet(c);
        }
    } catch (e) {
        console.log("Error!!")
    }
}

main();

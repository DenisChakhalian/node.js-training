const a = "dfgsdfgsdf";

let b: "hi" = "hi";

type direction = "left" | "right";

function moveDog(direction: direction): -1 | 0 | 1 {
    switch (direction) {
        case "left":
            return -1;
        case "right":
            return 1;
        default:
            return 0;
    }
}

interface IConnection {
    host: string;
    port: number;
}

// function connect(connection: IConnection | "default") {
//
// }
//
// connect("default");

const connection = {
    host: "localhost",
    protocol: "https" as "https",
}

const a2: any = 5;
const b2 = <number>a2;
const c2 = a2 as number;

function connect(host: string, protocol: "http" | "https") {

}

connect(connection.host, connection.protocol);
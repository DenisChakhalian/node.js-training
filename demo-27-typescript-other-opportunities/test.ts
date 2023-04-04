let a = "Hi!"

if (typeof a === "string") {

}

let b: typeof a;

type Coords = {
    lat: number;
    long: number;
}

type P = keyof Coords;

let a2: P = "long"
let a3: P = "lat"


function log(a: string | null): void {
    if (a === null) {

    } else {
        a.toUpperCase();
    }
}

function log2(a: string | null): void {
    a!.toUpperCase();
}

const bigInt: bigint = BigInt(100);

const symbol1: symbol = Symbol("dfgdfgsdf");

const symbol2: symbol = Symbol("dfgdfgsdf");

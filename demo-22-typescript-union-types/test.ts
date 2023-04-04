type coords = { lat: number, long: number };

interface ICoords {
    lat: number;
    long: number;
}

type ID = number | string;

function compute(coords: ICoords) {

}

interface Animal {
    name: string;
}

interface Dog extends Animal {
    tail?: boolean;
}

const dog: Dog = {
    name: "dog",
}

type Animal2 = {
    name: string;
}

type Dog2 = Animal2 & {
    tail: boolean;
}

const dog2: Dog2 = {
    name: "dog",
    tail: true,
}

interface Dog3 {
    name: string;
}

interface Dog3 {
    tail: boolean;
}

const dog3: Dog3 = {
    name: "dog",
    tail: true,
}
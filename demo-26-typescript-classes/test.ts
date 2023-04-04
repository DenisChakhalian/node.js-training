class Coords {
    lat: number;
    long: number;

    protected test() {
        if (this.lat > 0) {

        }
    }

    computeDistance(newLat: number, newLong: number): number {
        this.test();
        return 0;
    }

    constructor(lat: number, long: number) {
        this.lat = lat;
        this.long = long;
    }
}

const point = new Coords(1, 2);

class MapLocation extends Coords {
    private _name: string;

    get name() {
        return this._name;
    }

    set name(s: string) {
        this._name = s + "_cool";
    }

    override computeDistance(newLat: number, newLong: number): number {
        console.log(this.name)
        this.test();
        return 1;
    }

    constructor(lat: number, long: number, name: string) {
        super(lat, long);
    }
}

const loc = new MapLocation(0, 1, "dfd");

// loc.test();

interface LoggerService {
    log: (s: string) => void;
}

class Logger implements LoggerService {
    public log(s: string) {
        console.log(s)
    }

    private error() {

    }

    private a = "";
}

const l = new Logger();
l.log("d");

// l.a

class MyClass {
    static a = "1"
}

MyClass.a

class MyClass2<T> {
    a: T;
}

const ba = new MyClass2<string>();
ba.a //string

abstract class Base {
    print(s: string) {
        console.log(s);
    }

    abstract error(s: string): void;
}

class BaseExtended extends Base {
    error(s: string) {

    }
}

new BaseExtended().print("sdd")

class Animal {
    name: string;
}

class Dog {
    name: string;
    rail: boolean;
}

const puppy: Animal = new Dog();
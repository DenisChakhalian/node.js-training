interface HasLength {
    length: number;
}

function log<T extends HasLength, K>(obj: T, arr: K[]): K[] {
    obj.length;
    console.log(obj);
    return arr;
}

log<string, number>("sdf", [1]);

interface IUser {
    name: string;
    age?: number;
    bit: <T>(sum: T) => boolean;
}

function bit<T>(sum: T): boolean {
    return true;
}
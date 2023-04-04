let a: number = 5;
let b: string = "4";

let c: number = a + Number(b);

let d: boolean = true;

let names: string[] = ["dfgdfgdfg", "sdfsdf"];
let ages: number[] = [31, 45];

let tup: [number, string] = [1, "dfgs"];

let e: any = 2;
e = "sfsdf";
e = true;

let anyArr: any[] = ["dfgdfg", 2, true];

function greet(name: string): string {
    return name + "H1";
}

names.map((x: string) => x);

function coords(coords: { lat: number, long?: number }) {

}
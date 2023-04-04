import "reflect-metadata"

function Injectable(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata(key, 1, target);
        const meta = Reflect.getMetadata(key, target);
        console.log(meta)
    }
}

function Props(target: Object, name: string) {

}

@Injectable("C")
export class C {
    @Props prop: number;
}

@Injectable("D")
export class D {
    constructor(@Inject("C") c: C) {


    }

}
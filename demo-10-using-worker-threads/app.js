const factorial = require('./factorial.js');

const compute = (array) => {
    let arr = [];
    for (let i = 0; i < 100000000; i++) {
        arr.push(i * i);
    }
    return array.map(el => factorial(el));
};

const main = async () => {
    performance.mark('start');

    const result = [
        compute([34, 26, 53, 42, 15, 28]),
        compute([34, 26, 53, 42, 15, 28]),
        compute([34, 26, 53, 42, 15, 28]),
        compute([34, 26, 53, 42, 15, 28]),
    ];


    console.log(result);

    performance.mark('end');
    performance.measure('slow', 'start', 'end');

    console.log(performance.getEntriesByName('slow').pop())
}

setTimeout(() => {
    console.log("Timeout");
}, 2000);

main();
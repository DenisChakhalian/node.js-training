const factorial = require('./factorial.js');
const {Worker} = require('worker_threads');

const compute = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                array,
            }
        });

        worker.on('message', (msg) => {
            console.log(worker.threadId);
            resolve(msg)
        });

        worker.on('error', (err) => {
            reject(err)
        });

        worker.on('exit', () => {
            console.log(`Finished work`);
        });
    })
};

const main = async () => {
    try {
        performance.mark('start');

        const result = await Promise.all([
            compute([34, 26, 53, 42, 15, 28]),
            compute([34, 26, 53, 42, 15, 28]),
            compute([34, 26, 53, 42, 15, 28]),
            compute([34, 26, 53, 42, 15, 28]),
        ]);
        console.log(result);


        performance.mark('end');
        performance.measure('slow', 'start', 'end');
        console.log(performance.getEntriesByName('slow').pop())
    } catch (e) {
        console.log(e.message)
    }

}

setTimeout(() => {
    console.log("Timeout");
}, 2000);

main();
const { Worker } = require('worker_threads');
const { fork } = require('child_process');
const { performance, PerformanceObserver } = require('perf_hooks');
const { readFileSync } = require('fs');

const file = readFileSync('./file.mp4');  //big file

const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
    });
});
performanceObserver.observe({ entryTypes: ['measure'] });

const workerFunction = (array) => {
    return new Promise((resolve, reject) => {
        performance.mark('worker start');
        const worker = new Worker('./worker.js', {
            workerData: {
                array,
                file
            }
        });
        worker.on('message', (msg) => {
            performance.mark('worker end');
            performance.measure('worker', 'worker start', 'worker end');

            resolve(msg);
        });
    });
};

const forkFunction = (array) => {
    return new Promise((resolve, reject) => {
        performance.mark('fork start');
        const forkProcess = fork('./fork.js');
        forkProcess.send({ array, file });
        forkProcess.on('message', (msg) => {
            performance.mark('fork end');
            performance.measure('fork', 'fork start', 'fork end');
            resolve(msg);
        });

    });
};

const main = async () => {
    try {
        await workerFunction([34, 43, 25, 18, 37, 22]);
        await forkFunction([34, 43, 25, 18, 37, 22]);
    } catch (e) {
        console.error(e.message);
    }
};

main();
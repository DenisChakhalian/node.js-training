const {exec, spawn} = require('child_process');

const childProcess = exec('dir', (err, stdout, stderr) => {
    if (err) {
        console.log(err.message);
    }

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
});

childProcess.on('exit', (code) => {
    console.log('exited with code ' + code);
});


const workerProcess = spawn('cmd.exe', ['/c', 'app.js']);

workerProcess.stdout.on('data', (data) => {
    console.log('stdout: ' + data);
});

workerProcess.stderr.on('data', (data) => {
    console.log('stderr: ' + data);
});

workerProcess.on('close', (code) => {
    console.log('exited with code ' + code);
});
process.on('message', (msg) => {
    if (msg === 'disconnect') {
        process.disconnect();
        return;
    }
    console.log(`Client got: ${msg}`);
    process.send('Pong!');
})
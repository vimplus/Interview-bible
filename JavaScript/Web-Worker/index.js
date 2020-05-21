var inputBox = document.getElementById('inputBox');
var inputWorker = document.getElementById('inputWorker');

if (window.Worker) {
    const myWorker = new Worker('worker.js');

    inputBox.addEventListener('change', function (event) {
        let total = 1;
    
        for (let i = 0; i < 5000000000; i++) {
            total += i;
        }
        console.log('total:', total);
        inputBox.value = total;
    })

    inputWorker.addEventListener('change', function () {
        myWorker.postMessage('total');
    });

    myWorker.onmessage = function (event) {
        console.log('onmessage total:', event.data);
        inputWorker.value = event.data;
    }
}
onmessage = function (e) {
    if (e.data === 'total') {
        let total = 1;

        for (let i = 0; i < 5000000000; i++) {
            total += i;
        }
        postMessage(total);
    }
}

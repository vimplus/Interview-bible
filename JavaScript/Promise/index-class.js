
class Promise {
    constructor(executor) {
        let resolve = () => {};
        let reject = () => {};
        executor(resolve, reject);
    }
}
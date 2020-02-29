
class Promise {
    constructor(func) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;

        const resolve = function(value) {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
            }
        }

        const reject = function (value) {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.value = value;
            }
        }
        try {
            func(resolve, reject);
        } catch (err) {
            reject(err);
        }

    }
    then(onFulfilled, onRejected) {
        switch (this.state) {
            case 'fulfilled':
                onFulfilled();
                break;
            case 'rejected':
                onRejected();
                break;
            default:
                break;
        }
    }
}
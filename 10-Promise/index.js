
function Promise(executor) {
    const _this = this;
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.state = 'resolved';
            _this.value = value;
            // 依次执行回调
            _this.onResolvedCallbacks.map(func => func(value));
        }
    }
    function reject(reason) {
        if (_this.state === 'pending') {
            _this.state = 'rejected';
            _this.reason = reason;
            // 依次执行回调
            _this.onRejectedCallbacks.map(func => func(value));
            
        }
    }

    executor(resolve, reject);  // 马上执行
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    // if (this.state === 'resolved') {
    //     if (typeof onFulfilled === 'function') {
    //         // onFulfilled(this.value);
    //         this.onResolvedCallbacks.push(onFulfilled);
    //     }
    // }
    // if (this.state === 'rejected') {
    //     if (typeof onRejected === 'function') {
    //         // onRejected(this.value);
    //         this.onRejectedCallbacks.push(onRejected);
    //     }
    // }

    const promise2 = new Promise((resolve, reject) => {
        if (this.state === 'resolved') {
            if (typeof onFulfilled === 'function') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            }
        }
        if (this.state === 'rejected') {
            if (typeof onRejected === 'function') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            }
        }
        if (this.state === 'pending') {
            this.onResolvedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            });
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            })
        }
    })
    return promise2;
}


function resolvePromise(promise2, x, resolve, reject) {
    // 循环引用保存
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;

    // x不是null 并且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            // A+规定，声明then = x的then方法
            let then = x.then;
            // 如果then是函数，就默认是promise了
            if (typeof then === 'function') {
                // 就让then执行，第一个参数是this， 后面是成功的回调 和 失败的回调
                then.call(x, (y) => {
                    // 成功和失败只能调一个
                    if (called) return;
                    called = true;
                    // resolve的结果依旧是promise，那就继续解析
                    resolvePromise(promise2, y, resolve, reject);
                }, (err) => {
                    // 成功和失败只能调一个
                    if (called) return;
                    called = true;
                    reject(err);    // 失败了就失败了
                })
            } else {
                resolve(x); // 直接成功即可
            }
        } catch (err) {
            // 也属于失败
            if (called) return;
            called = true;
            // 取then出错了那就不要在继续执行了
            reject(e); 
        }
    } else {
        // 否则是个普通值,直接成功即可
        resolve(x);
    }
}
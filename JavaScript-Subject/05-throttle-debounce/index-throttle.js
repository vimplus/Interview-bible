
// 第一种：时间戳版
function throttle(func, delay) {
    var prevTime = Date.now(); // 初始化一个时间，也作为高频率事件判断事件间隔的变量，通过闭包进行保存。 

    return function () {
        var context = this;
        var args = arguments;
        var nowTime = Date.now();

        // 如果本次触发和上次触发的时间间隔超过设定的时间
        if (nowTime - prevTime >= delay) {
            func.apply(context, args);   // 就执行事件处理函数 （eventHandler）
            prevTime = nowTime; // 然后将本次的触发时间，作为下次触发事件的参考时间。 
        }
    }
}

// 第二种：定时器版
function throttle(func, delay) {
    var timer = null;
    return function () {
        const context = this;
        const args = arguments;
        // 如果定时器未存在，则创建一个定时任务
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(context, args);
                clearTimeout(timer);    // 执行后销毁定期任务
                timer = null;           // 重置定时器
            }, delay)
        }
    }
}


/**
 * 增强版
 * @param {*} func 
 * @param {*} delay     延期时间
 * @param {*} duration  持续间隔时间
 * @desc 在初始的时候定义一个begin开始时间，
 * 当时间间隔超过duration时，则执行一次函数，
 * 这样我们做到了不重复调用，又能保证500毫秒执行一次。
 */
function throttle(func, delay, duration) {
    var timer = null;
    var startTime = Date.now();

    return function () {
        var context = this;
        var args = arguments;
        var currTime = Date.now();

        clearTimeout(timer);
        if (currTime - startTime >= duration) {
            func.apply(context, args);
            startTime = currTime;
        }

        timer = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    }
}
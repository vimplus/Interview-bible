/**
 * underscore 节流函数
 * @param {*} func 
 * @param {*} wait              间隔时间
 * @param {*} options.leading   是否间隔时间开始时执行
 * @param {*} options.trailing  是否间隔时间结束后
 */
function _throttle(func, wait, options) {
    var context, args, result;

    // 定时器变量默认为 null, 是为了如果想要触发了一次后再延迟执行一次。 
    var timeout = null;

    // 上一次触发事件回调的时间戳。 默认为 0 是为了方便第一次触发默认立即执行 
    var previous = 0;

    // 如果没有传入 options 参数 
    // 则将 options 参数置为空对象 
    if (!options) options = {};

    var later = function () {
        // 如果 options.leading === false 
        // 则每次触发回调后将 previous 置为 0, 表示下次事件触发会立即执行事件处理函数 
        // 否则置为当前时间戳 
        previous = options.leading === false ? 0 : +new Date();

        // 剩余时间跑完，执行事件，并把定时器变量置为空，如果不为空，那么剩余时间内是不会执行事件处理函数的，见 else if 那。 
        timeout = null;
        
        result = func.apply(context, args);

        // 剩余时间结束，并执行完事件后，清理闭包中自由变量的内存垃圾，因为不再需要了。 
        if (!timeout) context = args = null;
    };

    // 返回的事件回调函数 
    return function () {
        // 记录当前时间戳 
        var now = +new Date();

        // 第一次执行回调（此时 previous 为 0，之后 previous 值为上一次时间戳） 
        // 并且如果程序设定第一个回调不是立即执行的（options.leading === false） 
        // 则将 previous 值（表示上次执行的时间戳）设为 now 的时间戳（第一次触发时） 
        // 表示刚执行过，这次就不用执行了
        if (!previous && options.leading === false) previous = now;

        // 间隔时间 和 上一次到本次事件触发回调的持续时间的时间差 
        var remaining = wait - (now - previous);

        context = this;
        args = arguments;

        // 如果间隔时间还没跑完，则不会执行任何事件处理函数。 
        // 如果超过间隔时间，就可以触发方法（remaining <= 0） 
        
        // remaining > wait，表示客户端系统时间被调整过 
        // 也会立即执行 func 函数 
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                // 解除引用，防止内存泄露 
                timeout = null;
            }

            // 重置前一次触发的时间戳 
            previous = now;

            // result 为事件处理函数(handler)的返回值 
            // 采用 apply 传递类数组对象 arguments 
            result = func.apply(context, args);

            // 引用置为空，防止内存泄露 
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            // 如果 remaining > 0, 表示在间隔时间内，又触发了一次事件 

            // 如果 trailing 为真，则会在间隔时间结束时执行一次事件处理函数（handler） 
            // 在从触发到剩余时间跑完，会利用一个定时器执行事件处理函数，并在定时器结束时把 定时器变量置为空 

            // 如果剩余事件内已经存在一个定时器，则不会进入本 else if 分支, 表示剩余时间已经有一个定时器在运行，该定时器会在剩余时间跑完后执行。 
            // 如果 trailing = false，即不需要在剩余时间跑完执行事件处理函数。 
            // 间隔 remaining milliseconds 后触发 later 方法 
            timeout = setTimeout(later, remaining);
        }
        // 回调返回值 
        return result;
    };
};
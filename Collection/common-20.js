

/**
 * 实现一个call函数
 */
Function.prototype._call = function (ctx) {
    ctx = ctx || window;
    ctx.fn = this;
    const args = [...arguments].slice(1);
    const res = ctx.fn(...args);
    delete ctx.fn;
    return res;
}


/**
 * 实现一个apply函数
 */
Function.prototype._apply = function (ctx) {
    ctx = ctx || window;
    ctx.fn = this;
    let res = null;
    const args = [...arguments].slice(1);
    if (args[1]) {
        res = ctx.fn(...args[1]);
    } else {
        res = ctx.fn();
    }
    delete ctx.fn;
    return res;
}

/**
 * 实现一个bind函数
 */
Function.prototype._bind = function (ctx) {
    ctx = ctx || window;
    let _this = this;
    const args = [...arguments].slice(1);
    return function () {
        return _this.apply(ctx, args.concat(...arguments))
    }
}


/**
 * instanceOf 原理
 * 思路：右边变量的原型存在于左边变量的原型链上
 */
function instanceOf(left, right) {
    let leftValue = left.__proto__;
    let rightValue = right.prototype;
    while(true) {
        if (leftValue === null) {
            return false;
        }
        if (leftValue === rightValue) {
            return true;
        }
        leftValue = leftValue.__proto__;
    }
}


/**
 * Object.create的基本实现原理
 */
function create(obj) {
    function Fn() {}
    Fn.prototype = obj;
    return new Fn();
}



/**
 * new本质
 */
function _new(func, ...args) {
    const target = Object.create(func.prototype);
    const res = func.apply(target, args);
    if (typeof(res) === 'object' || typeof(res) === 'function') {
        return res;
    }
    return target;
}

/**
 * 实现一个基本的Promise
 */
class Promise {
    constructor(func) {
        // 三个状态
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;

        // 定义两个函数
        let resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
            }
        }

        let reject = (value) => {
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
    // then
    then(onFulfilled, onRejected) {
        switch (this.state) {
            case 'fulfilled':
                onFulfilled()
                break;
            case 'rejected':
                onRejected()
                break;
            default:
                break;
        }
    }
}


/**
 * assign的原理
 */
if (typeof Object._assign !== 'function') {
    Object.defineProperty(Object, '_assign', {
        value: function (target) {
            if (target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            let to = Object(target);
            for (let i = 1; i < arguments.length; i++) {
                const nextSource = arguments[i];
                
                if (nextSource !== null) {
                    for (const nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    })
}

/**
 * 实现一个基本的深拷贝
 */
function deepCopy(obj) {
    const copy = obj instanceof Array ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return copy;
}

/**
 * 使用setTimeout模拟setInterval
 */
setTimeout(function () {
   setTimeout(arguments.callee, 500) 
}, 500)


/**
 * js实现一个继承方法
 */
function inheritPrototype(parent, child) {
    // 根据父级的prototype重新创建一份
    const prototype = Object.create(parent.prototype);
    // 将子集替换constructor
    prototype.constructor = child;
    // 将父级的prototype赋给子集
    child.prototype = prototype;
}

/**
 * 实现一个基本的Event Bus
 */
class EventEmitter {
    constructor() {
        // 储存事件
        this.events = this.events || new Map();
    }
    addListener(type, callback) {
        if (!this.events.get(type)) {
            this.events.set(type, callback)
        }
    }
    emit(type) {
        let handle = this.events.get(type);
        handle.apply(this, [...arguments].slice(1))
    }
}

// 测试
let emitter = new EventEmitter()
// 监听事件
emitter.addListener('printLogs', value => {
  console.log(value)
})
// 触发事件
emitter.emit('printLogs', 'a somthing')  // a somthing



/**
 * 实现一个双向数据绑定
 */
let obj = {};
let input = document.getElementById('input');
let span = document.getElementById('span');
Object.defineProperty(obj, 'text', {
    configurable: true,
    enumerable: true,
    get() {
        console.log('获取数据了！');
        return obj['text'];
    },
    set(value) {
        console.log('数据更新了！');
        input.value = value;
        span.innerHTML = value;
    }
})

input.addEventListener('keyup', function (event) {
    obj.text = event.target.value;
})


/**
 * 实现一个简单路由
 */
class Route {
    constructor() {
        // 路由存储对象
        this.routes = {};
        // 当前hash
        this.currentHash = '';
        // 绑定this，避免监听时this发生变化
        this.freshRoute = this.freshRoute.bind(this);
        window.addEventListener('load', this.freshRoute, false);
        window.addEventListener('hashchange', this.freshRoute, false);
    }
    // 存储
    setRoute(path, callback) {
        this.routes[path] = callback || function () {}
    }
    // 更新
    freshRoute() {
        this.currentHash = location.hash.slice(1) || '/';
        this.routes[this.currentHash]();
    }
}

/**
 * rem基本设置
 */
function setRem() {
    let doc =  document.documentElement;
    let width = doc.getBoundingClientRect().width;
    let rem = width / 75;
    doc.style.fontSize = `${rem}px`;
}

window.addEventListener('resize', setRem);


/**
 * 手写实现AJAX
 */
function xhrHttp({method, url, data, async}) {
    // 实例化
    var xhr = new XMLHttpRequest();
    // 初始化
    xhr.open(method, url, async);
    // 发送数据
    xhr.send(data);
    // 设置状态变化回调处理请求结果
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText)
        }
    }
}

/**
 * 实现一个节流函数
 * 思路：在规定的时间内只触发一次
 */
function throtte(func, delay) {
    // 利用闭包保存时间
    let prevTime = Date.now();
    return function () {
        let nowTime = Date.now();
        let context = this;
        if (nowTime - prevTime >= delay) {
            func.apply(context, arguments);
            prevTime = Date.now();
        }
    }
}

function fn () {
    console.log('节流')
}
window.addEventListener('scroll', throttle(fn, 1000)) 

/**
 * 实现一个防抖函数
 * 思路：在规定的时间内未触发第二次，则执行
 */
function debounce(func, delay) {
    // 利用闭包储存定时器
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        // 在规定的时间内再次触发则先清除定时器，重设定时器
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context, args)
        }, delay);
    }
}

function fn() {
    console.log('防抖')
}
window.addEventListener('scroll', debounce(fn, 1000));
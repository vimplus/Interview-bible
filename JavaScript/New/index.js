/**
 * new本质
 * 第一步：建立一个新对象； 
 * 第二步：将该对象内置的原型对象设置为构造函数prototype引用的那个原型对象； 
 * 第三步：将该对象作为this参数绑定到(调用)构造函数上，完成成员设置等初始化工作。
 * 
 * 默认情况下，如果你的构造函数中没有返回任何内容，就会返回this —— 当前的上下文。
 */
function _new(func, ...args) {
    const target = {
        __proto__: func.prototype
    }
    const res = func.apply(target, args);
    if (typeof(res) === 'object' || typeof(res) === 'function') {
        // 实际上一般的构造函数都没有返回值，所以不太会走到这一步；
        return res;
    }
    return target;
}


function Person(name) {
    this.name = name;
}

const p = _new(Person, 'txboy');
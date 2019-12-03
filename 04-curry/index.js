function sum(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}
console.log(sum(2)(3)(5))


function fn(a) {
    let sum = a;
    function add(params) {
        sum += params;
        return add;
    }

    add.toString = function () {
        return sum;
    }

    return add;
}

console.log(fn(2)(3)(5))



function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
    // debugger
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function () {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}

add(1)(2)(3)


// function curry(fn, ...args) {
//     console.log('------------args:', ...args);
//     console.log('------------args.length:', args.length);
//     console.log('------------arguments:', ...arguments);
//     if (args.length < fn.length) {
//         return function (...arguments) {
//             console.log('-------------function arguments:', ...arguments);
//             return curry(fn, ...args, ...arguments);
//         }
//     } else {
//         console.log('---------------------------------else args:', ...args);
//         return fn(...args);
//     }
// }


function curry(fn, ...args) {
    return args.length < fn.length ? (...arguments) => curry(fn, ...args, ...arguments) : fn(...args);
}

function sumFn(a, b, c) {
    return a + b + c;
}
var sum = curry(sumFn);
console.log(sum(2)(3)(5))
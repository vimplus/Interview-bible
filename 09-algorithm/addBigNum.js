/**
 * 在JS支持的最大整数范围内，计算两个超大整数之和，实现函数add(a, b)，函数的参数a, b及返回值都为字符串。
 * @param {*} a 
 * @param {*} b 
 */
function add(a, b) {
    var arrayA = a.split('');   // 将字符串转为数组
    var arrayB = b.split('');
    var res = '';
    var temp = 0;
    while(arrayA.length || arrayB.length || temp) {
        temp += ~~arrayA.pop() + ~~arrayB.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
}

// ~~:双非按位取反运算符，相当于Math.floor()，对于正数，它向下取整；对于负数，向上取整；非数字取值为0

console.log(add('123', '23'));
console.log(add('999', '222'));
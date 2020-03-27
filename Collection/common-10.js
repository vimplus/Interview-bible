/**
 * 不用加减乘除运算符实现加法
 * @param {*} a 
 * @param {*} b 
 */
function add(a, b) {
    while (b != 0) {
        var sum = a ^ b;
        var carray = (a & b) << 1;
        a = sum;
        b = carray;
    }
    return num1;
}

console.log(add(2, 3))

/**
 * 不用加减乘除运算符实现减法
 * @param {*} a 
 * @param {*} b 
 */
function minus(a, b) {
    let temp = add(~b, 1);
    return add(a, temp);
}


/**
 * 金额千位分隔符正则
 * 
 * \b，\B是单词边界，不匹配任何实际字符，所以是看不到的；\B是\b的非(补)。
 * \b：表示[字母数字]与[非字母数字]的边界， [非字母数字]与[字母数字]的边界。
 * \B：表示[字母数字]与[(非非)字母数字]的边界，[非字母数字]与[非字母数字]的边界。
 */
'120000000.88'.replace(/\B(?=(\d{3})+\.)/g, ',');



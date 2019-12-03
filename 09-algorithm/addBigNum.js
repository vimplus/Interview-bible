/**
 * 在JS支持的最大整数范围内，计算两个超大整数之和，实现函数add(a, b)，函数的参数a, b及返回值都为字符串。
 * @param {*} a 
 * @param {*} b 
 */
function add(a, b) {
    var arrayA = a.split("");//将字符串转为数组
    var arrayB = b.split("");
    var ArrayA = [];
    var ArrayB = [];
    var l1 = arrayA.length;
    var l2 = arrayB.length;
    var arrayC = [];

    var n = l1 < l2 ? l1 : l2;

    for (var i = 0; i < arrayA.length; i++) {//将string类型的数组转为int型
        ArrayA[i] = parseInt(arrayA[i]);
    }
    for (var i = 0; i < arrayB.length; i++) {
        ArrayB[i] = parseInt(arrayB[i]);
    }

    if (ArrayA.length >= ArrayB.length) {//判断哪个数组较大
        max = ArrayA;
        min = ArrayB;
    } else {
        min = ArrayA;
        max = ArrayB;
    }

    for (var i = n - 1; i >= 0; i--) {
        arrayC[i] = (min[i]) + max[Math.abs(l1 - l2) + i];
        //从个位开始相加
        if ((arrayC[i]) > 9) {
            //遇10进一
            arrayC[i] -= 10;
            max[Math.abs(l1 - l2) + i - 1] += 1;    // 进一
        }
    }
    var result = [];
    for (var i = 0; i < Math.abs(l1 - l2); i++) {//补齐高位
        result[i] = max[i];

    }
    result = (result.concat(arrayC)).join("");//将数组连接成字符串
    console.log(result);

}
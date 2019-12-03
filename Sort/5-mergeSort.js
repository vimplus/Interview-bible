/**
 * 归并排序
 * <1>.把长度为n的输入序列分成两个长度为n/2的子序列；
 * <2>.对这两个子序列分别采用归并排序；
 * <3>.将两个排序好的子序列合并成一个最终的排序序列。
 * @param {*} array 
 */
function mergeSort(array) {
    var length = array.length;
    if (length < 2) return array;

    var middle = Math.floor(length / 2);
    var left = array.slice(0, middle);
    var right = array.slice(middle);
    // 采用自上而下的递归方法
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    
    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }
    return result;
}

var arr=[7,5,8,3,1,6,4,2];
console.log(mergeSort(arr));

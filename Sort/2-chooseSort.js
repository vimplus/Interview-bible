/**
 * 选择排序
 * n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：
 * <1>. 初始状态：无序区为R[1..n]，有序区为空；
 * <2>. 第i趟排序(i=1,2,3...n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。
 *      该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，
 *      使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
 * <3>. n-1趟结束，数组有序化了。
 * @param {*} array 
 */
function chooseSort(array) {
    var length = array.length;
    var minIndex = 0;
    var temp = null;
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return array;
}

var arr1=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(chooseSort(arr1));
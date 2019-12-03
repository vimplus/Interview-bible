/**
 * 希尔排序
 * 思想：
 * 先将整个待排序的记录序列分割成为若干子序列。
 * 分别进行直接插入排序。
 * 待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序。
 * @param {*} array 
 */
function shellSort(array) {
    let len = array.length;
    let gap = 1;
    // 动态定义间隔序列
    while (gap < len / 3) {
        gap = gap * 3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = gap; i < len; i++) {
            let temp = array[i];
            for (var j = i - gap; j >= 0 && array[j] > temp; j = j - gap) {
                array[j + gap] = array[j];
            }
            array[j + gap] = temp;
        }
    }
    return array;
}

var arr=[8,9,1,7,2,3,5,4,6,0];
console.log(shellSort(arr));
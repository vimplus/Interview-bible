/**
 * 冒泡排序
 * <1>.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * <2>.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
 * <3>.针对所有的元素重复以上的步骤，除了最后一个；
 * <4>.重复步骤1~3，直到排序完成。
 */


const arr = ['B', 'A', 'E', 'C', 'D'];
var arr1 = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

function bubbleSortA(array) {
    console.time('冒泡排序耗时');
    const list = array.slice(0);
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) {
                let temp = list[i];    // 用temp先保存list[i]的值;
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
    console.timeEnd('冒泡排序耗时');
    return list;
}

console.log(bubbleSortA(arr))
console.log(bubbleSortA(arr1))

function bubbleSortB(array) {
    console.time('改进后冒泡排序耗时');
    var i = array.length - 1;
    while (i > 0) {
        var pos = 0;
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j+1]) {
                pos = j;
                const tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
            }
        }
        i = pos;
    }
    console.timeEnd('改进后冒泡排序耗时');
    return array;
}

var arr2 = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSortB(arr2));


function bubbleSortC(array) {
    var low = 0;
    var high = array.length - 1;
    var tmp = null;
    var i = null;
    while (low < high) {
        for (i = low; i < high; ++i) {
            if (array[i] > array[i+1]) {
                tmp = array[i];
                array[i] = array[i+1];
                array[i+1] = tmp;
            }
        }
        --high;
        for (i = high; i > low; --i) {
            if (array[i] < array[i-1]) {
                tmp = array[i];
                array[i] = array[i-1];
                array[i-1] = array[i];
            }
        }
        ++low;
    }
}
var arr3 = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSortC(arr3));
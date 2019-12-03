/**
 * 插入排序
 * <1>.从第一个元素开始，该元素可以认为已经被排序；
 * <2>.取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * <3>.如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * <4>.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 * <5>.将新元素插入到该位置后；
 * <6>.重复步骤2~5。
 * @param {*} array 
 */
function insertionSort(array) {
    for (let i = 0; i < array.length; i++) {
        let value = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > value) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = value;
    }
    return array;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(insertionSort(arr));


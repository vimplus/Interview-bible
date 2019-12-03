/**
 * 题目：考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素
 * [洗牌算法]
 * 1.生成一个0 - arr.length 的随机数
 * 2.交换该随机数位置元素和数组的最后一个元素，并把该随机位置的元素放入结果数组
 * 3.生成一个0 - arr.length - 1 的随机数
 * 4.交换该随机数位置元素和数组的倒数第二个元素，并把该随机位置的元素放入结果数组
 * 依次类推，直至取完所需的10k个元素
 */
function shuffle(array, size) {
    let result = [];
    console.time('--------Time');
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * (array.length - i));
        const item = array[randomIndex];
        result.push(item);
        array[randomIndex] = array[array.length - 1 - i];
        array[array.length - 1 - i] = item;
    }
    console.timeEnd('--------Time');
    return result;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
console.log(shuffle(arr, 20));
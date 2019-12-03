
/**
 * 算法题「移动零」，给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * @param {*} array 
 */

function zeroMove(array) {
    let length = array.length;
    let j = 0;
    for (let i = 0; i < length - j; i++) {
        if(array[i] === 0) {
            array.push(0);
            array.splice(i, 1);
            i--;
            j++;
        }
    }
    return array;
}

const arr = [1, 0, 3, 0, 0, 12];
console.log(zeroMove(arr));

let obj = {1:222, 2:123, 5:888};
const result = Array.from({ length: 12 }).map((_, index) => {
    console.log('*****************:', _)
    return obj[index + 1] || null;
});
console.log(result)


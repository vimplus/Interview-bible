/**
 * 求两个数组的交集
 * @param {*} arrA 
 * @param {*} arrB 
 */
function intersect(arrA, arrB) {
    const map = {};
    const res = [];
    for (let n of arrA) {
        if (map[n]) {
            map[n]++;
        } else {
            map[n] = 1;
        }
    }
    for (let n of arrB) {
        if (map[n] > 0) {
            res.push(n);
            map[n]--;
        }
    }
    return res;
}

const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2, 3, 2];

// var nums1 = [1]
// var nums2 = [1,1]
console.log(intersect(nums1, nums2))
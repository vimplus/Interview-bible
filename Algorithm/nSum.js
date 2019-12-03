/**
 * 从数组中找出两数之和等于sum
 */
function twoSum(array, target) {
    let map = {}
    for (let i = 0; i < array.length; i++) {
        map[array[i]] = i;
    }
    for (let i = 0; i < array.length; i++) {
        var diff = target - array[i];
        if (map[diff]) {
            return [array[i], diff];
        }
    }
    return null;
}

function twoSum(array, target) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        var v = target - array[i];
        var index = array.indexOf(v, i);
        if (index >= 0) {
            result.push(array[i], v);
        }
    }
    return result;
}

const arr = [8, 1, 2, 5, 10];
console.log(twoSum(arr, 6))


// function threeSum(nums, target) {
//     var res = [];
//     for (let i = 0; i < nums.length; i++) {
//         const value1 = nums[i + 1];
//         for (let j = 2; j < nums.length - 2; j++) {
//             const value2 = nums[j];
//             const value3 = target - value1 - value2;
//             if (nums.indexOf(value3) !== -1) {
//                 minV = Math.min(value1, value2, value3)
//                 maxV = Math.max(value1, value2, value3)
//                 midV = target - minV - maxV;
//                 if (!res.includes(value1) && !res.includes(value2) && !res.includes(value3)) {
//                     res.push(minV, midV, maxV);
//                     break;
//                 }
//             }
//         }
//     }
//     return res;
// }

// var arr = [-1, 2, 8, 5, 3, 0];

// console.log(threeSum(arr, 15))


// var data = [1, 6, 5, 2, 3, 1, 8, 5, 2, 8, 0];

// function a(n) {
//     var length = data.length;
//     var arr = [];
//     function b(k) {
//         if (k > (length - 3)) {
//             console.log('------------arr: ', arr);
//             return;
//         }
//         var m = n - data[k];
//         for (var j = k + 1; j < length - 1; j++) {
//             var data1 = data.slice(j + 1);
//             if (data1.indexOf(m - data[j]) > -1) arr.push([data[k], data[j], m - data[j]]);
//             continue;
//         }
//         k++;
//         b(k);
//     }
//     b(0);
// }
// a(11);

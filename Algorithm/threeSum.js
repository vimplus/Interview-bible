/**
 * 从数组中找出[三数之和]等于sum
 */

function threeSum(nums, target) {
    // 最左侧值为定值，右侧所有值进行两边推进计算
    let res = [];
    nums.sort((a, b) => a - b);
    let size = nums.length;
    if (nums[0] <= 0 && nums[size - 1] >= 0) {
        // 保证有正数负数
        let i = 0;
        while (i < size - 2) {
            if (nums[i] > target) break; // 最左侧大于0，无解
            let first = i + 1;
            let last = size - 1;
            while (first < last) {
                if (nums[i] * nums[last] > target) break; // 三数同符号，无解
                let sum = nums[i] + nums[first] + nums[last];
                if (sum === target) {
                    res.push([nums[i], nums[first], nums[last]]);
                }
                if (sum <= target) {
                    // 负数过小，first右移
                    while (nums[first] === nums[++first]) { } // 重复值跳过
                } else {
                    while (nums[last] === nums[--last]) { } // 重复值跳过
                }
            }
            while (nums[i] === nums[++i]) { }
        }
    }
    return res;
};


const arr = [6, 1, 0, 5, 3, 4];
console.log(threeSum(arr, 10))
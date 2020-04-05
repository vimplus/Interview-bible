/**
 * 无重复字符的最长子串
 * 思路分析：
 * 对字符串进行遍历，使用String.prototype.indexOf()实时获取遍历过程中的
 * 无重复子串并存放于str，并保存当前状态最长无重复子串的长度为res，
 * 当遍历结束时，res的值即为无重复字符的最长子串的长度。
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let array = s.split('');
    let result = [];
    let size = 0;
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let current = result.indexOf(item);
        result.push(item);
        
        if (current !== -1) {
            result = result.slice(current + 1);
        }
        if (size < result.length) {
            size = result.length;
        }
    }
    return size;
}

lengthOfLongestSubstring('abcabca');
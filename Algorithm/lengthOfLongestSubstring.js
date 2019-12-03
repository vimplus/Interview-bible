/**
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
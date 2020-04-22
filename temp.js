// 航班预订统计
var corpFlightBookings = function (bookings, n) {
    let addMap = new Map();
    let minusMap = new Map();
    for (let i = 0; i < bookings.length; i++) {
        let [start, end, tickets] = bookings[i];
        addMap.set(start, (addMap.get(start) || 0) + tickets);
        minusMap.set(end, (minusMap.get(end) || 0) + tickets);
    }
    let sum = 0;
    let ans = new Array(n);
    for (let i = 0; i < n; i++) {
        sum += addMap.get(i + 1) || 0;
        ans[i] = sum;
        sum -= minusMap.get(i + 1) || 0;
    }
    return ans;
};

// 九宫格按键输入（T9键盘）
var getValidT9Words = function (num, words) {
    let map = new Map()
    let result = new Array()
    map.set(2, ['a', 'b', 'c'])
    map.set(3, ['d', 'e', 'f'])
    map.set(4, ['g', 'h', 'i'])
    map.set(5, ['j', 'k', 'l'])
    map.set(6, ['m', 'n', 'o'])
    map.set(7, ['p', 'q', 'r', 's'])
    map.set(8, ['t', 'u', 'v'])
    map.set(9, ['w', 'x', 'y', 'z'])
    words.map(x => {
        if (x.length !== num.length) {
            return false
        }
        for (let i = 0; i < num.length; i++) {
            if (!map.get(Number(num[i])).includes(x[i])) {
                break
            }
            if (i === num.length - 1) {
                result.push(x)
            }
        }
    })
    return result;
}
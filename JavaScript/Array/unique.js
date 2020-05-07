// JavaScript数组去重（12种方法，史上最全）
// https://segmentfault.com/a/1190000016418021

function unique(arr) {
    var res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}

function unique(arr) {
    return Array.from(new Set(arr));
}


function unique(arr) {
    let res = [];
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (map.has(item)) {
            map.set(item, true);    // 如果有该key值
        } else {
            map.set(item, false);   // 如果没有该key值
            res.push(item);
        }
    }
}
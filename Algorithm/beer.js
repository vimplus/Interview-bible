/**
 * 3个空酒瓶换一瓶酒，5个瓶盖换一瓶酒，酒 5 元一瓶，共100元，可以买多瓶酒?
 */

function buyBeer(x, y, z) {
    if (x < 5 && y < 3) return z;

    var a = parseInt(y / 3); // 空瓶可换的啤酒数
    var b = parseInt(y % 3); // 空瓶换完啤酒剩下的空瓶数
    var c = parseInt(x / 5); // 瓶盖可换的啤酒数
    var d = parseInt(x % 5); // 瓶盖换完啤酒剩下的瓶盖数
    return buyBeer(a + c + d, a + c + b, a + c + z);
    // 空瓶换的酒 + 瓶盖换的酒 + 瓶盖换酒剩下的瓶盖
    // 空瓶换的酒 + 瓶盖换的酒 + 空瓶换酒剩下的空瓶
    // 空瓶换的酒 + 瓶盖换的酒 + 换好的酒
}

let num  = 100 / 5; // 先买它20瓶酒

console.log(num + buyBeer(num, num, 0))
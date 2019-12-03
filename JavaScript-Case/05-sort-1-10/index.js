/* 
 从1-10，按顺序每秒输出一个数字
*/

// for (var i = 1; i <= 10; ++i) {
//     (function (i) {
//         setTimeout(function () {
//             console.log(i);
//         }, 1000 * i);
//     })(i)
// }

// for (let i = 1; i <= 10; ++i) {
//     setTimeout(function () {
//         console.log(i);
//     }, 1000 * i);
// }

function increase(n) {
    if (n > 10) return;
    setTimeout(() => {
        console.log(n);
        increase(n+1);
    }, 1000)
}

increase(1)
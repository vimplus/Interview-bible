'use strict';

/* 
 以下代码在非严格模式与严格模式中分别输出什么？
*/

var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();


var a = 10;
function say() {
    console.log(a);
    var a = 20;
    // let a = 20;
    console.log(a);
}


var c = 3;
function c() {};
console.log(c);


//块级作用域
try {
    let x = 1;
    const y = 2;
} catch (error) {
    
}
console.log(x);
console.log(y);
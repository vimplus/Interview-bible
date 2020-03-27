'use strict';

/**
 * 1. 变量必须声明才能使用；
 * 2. 全局作用域中定义的函数中的this为undefined(禁止this关键字指向全局对象)；
 * 3. 禁止使用with语句；
 * 4. 无法删除变量，只有conifgurable设置为true的对象属性才能被删除；
 */



 
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

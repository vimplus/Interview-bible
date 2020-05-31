# 闭包与执行上下文

## 前言
要学习闭包首先要了解JavaScript的变量作用域。
作用域是执行上下文的一部分，在ES6之前，JS中的**变量作用域**无非就是两种：

> **全局作用域**(全局变量)和**函数作用域**(局部变量)。

### var声明与赋值
`var`声明作用域是函数执行的作用域，var 会穿透 for 、if 等语句。

作用范围：函数作用域，存在变量提升，即实际解析顺序与编码位置无关（赋值前预解析）。

### let
let 是 `ES6` 开始引入的新的变量声明模式。为了实现`let`，JavaScript 在运行时引入了**块级作用域**。

作用范围：块级作用域，不存在变量提升，与大多数后端语言一样。

以下语句会产生 let 使用的作用域：

* for；
* if；
* switch；
* try/catch/finally。

## 函数声明
函数内部会形成封闭环境，在函数外部自然无法读取函数内的局部变量。

```javascript
function fn(){
    var n = 666;
}
console.log(n); // error: n is not defined
```

如何从外部读取局部变量？那就是在函数的内部，再定义一个函数。比如：

```javascript
function fn(){
    var n = 666;
    return function () {
        console.log(n);
    }
}
var func = fn();
console.log(func());
```

函数执行上下文会形成作用域链，如果函数访问了上层作用域链上的变量，函数不销毁，变量不回收，这就形成了我们要说的闭包。


## 执行上下文：执行的基础设施

### ES3中的【执行上下文】：

* scope：作用域，也常常被称作为作用域链；
* variable object（VO）：变量对象(活动对象)，用于存储变量的对象；
* this value：this 值。


### ES5中的【执行上下文】：

* lexical environment：词法环境，当获取变量时使用；
* variable environment：变量环境，当声明变量时使用；
* this value：this 值。

### ES2018中的【执行上下文】：

* lexical environment：词法环境(作用域)，当获取变量或this值时使用。
* variable environment：变量环境，当声明变量时使用。
* code evaluation state：用于恢复代码执行位置。
* Function：执行的任务是函数时使用，表示正在被执行的函数。
* ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。
* Realm：使用的基础库和内置对象实例。
* Generator：仅生成器上下文有这个属性，表示当前生成器。

## 词法环境（作用域）

> 词法环境（lexical encironment） ，是JS引擎内部用来跟踪标识符和特定变量之间的映射关系。
> 词法环境是JS作用域的实现机制，通常又被称为**作用域**；值得注意的是，**JS的词法环境在其创建的时候就已经决定了**
> https://blog.csdn.net/qq_31594099/article/details/83003516


函数在定义时的环境与调用函数的环境往往是不相同的，无论何时调用函数，都会创建一个新的执行环境，被推入执行上下文栈。并且还会创建一个与之相关联的词法环境，JS引擎将调用函数的内置[[Environment]]属性与创建函数时的环境进行关联。在其原来的词法环境中若找不到值，则会向其外部环境中查询（作用域链）。

示例一：

```javascript
var a = 1;
function bar(){
    var a = 2;
    function foo() {
        console.log(a)
    };
    foo();
};
bar();
```

无论何时创建函数，都会创建一个与之想关联的词法环境，并存储在名为[[Environment]]的内部属性上，在上面示例中bar函数保存了全局环境的引用，foo函数保存了bar函数的引用。所以结果为2。

示例二：

```javascript
var a = 1;
function foo() {
	console.log(a)
};
function bar(){
	var a = 2;
	foo();
};
bar();
```

foo调用时的词法环境内为`console.log(a)`，JS引擎会将其与其创建时的环境（即全局环境）进行关联。当其内部找不到a时，则会在全局环境中去找a，而不是bar函数的环境。所以结果是1。

## 什么是闭包？
这个古典的闭包定义中，闭包包含两个部分:

* 环境部分

  - 环境

  - 标识符列表

* 表达式部分

### JavaScript中的闭包组成部分：

* 环境部分
     - 环境：函数的词法环境（执行上下文的一部分）
     - 标识符列表：函数中用到的未声明的变量

* 表达式部分：函数体

我们可以认为，JavaScript 中的函数完全符合闭包的定义。它的环境部分是函数词法环境部分组成，它的标识符列表是函数中用到的未声明变量，它的表达式部分就是函数体。



>  **闭包其实只是一个绑定了执行环境的函数。**



这个函数并不是印在书本里的一条简单的表达式，闭包与普通函数的区别是，它携带了执行的环境，就像人在外星中需要自带吸氧的装备一样，这个函数也带有在程序中生存的环境。


## 闭包的作用

* 1.可以读取函数内部的变量；

```javascript
function outer () {
    var a = 2;
    function inner () {
        console.log(a);
    }
    return inner();
}
outer();
```

* 2.让这些变量的值始终保持在内存中。

```javascript
//示例1：
var add = null;
function outer () {
    var a = 999;
    
    add = function (){
        a++;
    }
    function inner () {
        console.log(a);
    }
    return inner;
}
var res = outer();
res(); //999
add();
res(); //1000

//示例2：
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

## 使用闭包的注意点
（1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
（2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

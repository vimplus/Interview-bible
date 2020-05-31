this代表函数调用相关联的对象，通常页称之为执行上下文。

## this的几种情况

1. 默认绑定（非严格模式情况下，this 指向 window, 严格模式下，this指向 undefined。） 
2. 隐式绑定（如果函数调用时，前面存在调用它的对象，那么this就会隐式绑定到这个对象上）
3. 显式绑定（函数通过 call()、apply()、bind()调用，this 指向被绑定的对象。） 
4. new 绑定（函数被 new 调用，this 指向由 new 新构造出来的这个对象。）
5. DOM事件中指向被绑定的DOM对象。


## 严格模式
JavaScript严格模式标识：`use strict`;

* 1. 变量必须声明才能使用；
* 2. 全局作用域中定义的函数中的this为undefined(禁止this关键字指向全局对象)；
* 3. 禁止使用with语句；
* 4. 无法删除变量，只有conifgurable设置为true的对象属性才能被删除；
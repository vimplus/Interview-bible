

## 严格模式
JavaScript严格模式标识：`use strict`;

* 1. 变量必须声明才能使用；
* 2. 全局作用域中定义的函数中的this为undefined(禁止this关键字指向全局对象)；
* 3. 禁止使用with语句；
* 4. 无法删除变量，只有conifgurable设置为true的对象属性才能被删除；
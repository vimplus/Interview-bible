this代表函数调用相关联的对象，通常页称之为执行上下文。

## this的几种情况

1. 作为函数调用，非严格模式下，this指向window，严格模式下，this指向undefined；
2. 作为某对象的方法调用，this通常指向调用的对象。
3. 使用apply、call、bind 可以绑定this的指向。
4. 在构造函数中，this指向新创建的对象。
5. DOM事件中指向被绑定的DOM对象。
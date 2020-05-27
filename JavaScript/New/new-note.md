
## New的原理
new 运算接受一个构造器和一组调用参数，实际上做了几件事：

* 以构造器的 prototype 属性（注意与私有字段[[prototype]]的区分）为原型，创建新对象；
* 将 this 和调用参数传给构造器，执行；
* 如果构造器返回的是对象，则返回这个对象，否则返回第一步创建的对象。

## 怎么判断一个函数是否被new调用过？
```JavaScript
// ES6方式
function Foo() {
    if (!new.target) throw "Foo() must be called with new";
    console.log("Foo instantiated with new");
}

// ES5方式
if(this instanceof Foo) {}
```


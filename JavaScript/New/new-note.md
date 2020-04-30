
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


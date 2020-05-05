## 说说 ES5 和 ES6 继承的区别？
* ES5 的继承使用借助构造函数实现，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面。ES6 的继承机制完全不同，实质是先创造父类的实例对象`this`（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。
* ES6 在继承的语法上不仅继承了类的原型对象，还继承了类的静态属性和静态方法

### Class继承

```JavaScript
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
    this.val = value
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```


### 下面代码输出啥？为什么？
```JavaScript
var a = function() {}
var b = a.bind(null)
```
箭头函数和bind返回的函数没有prototype属性，其他函数都有prototype，网上实现的bind都是错的。
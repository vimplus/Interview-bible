# JavaScript原型与继承相关知识笔记

## JavaScript 的原型
* 所有对象都有私有字段[[prototype]]，就是对象的原型；
* 读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。

## JavaScript的继承
说到面向对象就不得不聊到继承。
JavaScript的继承方法有很多，从最开始的使用`function`来模拟Java类的语法（如：`new`，`prototype`，`constructor`等），到ES5的`Object.create()`的出现，再到现在ES6的`class`和`extends`语法糖。随着标准的不断提出，也趋向于逐渐完善的状态。

不管是哪种方法，归根结底都是**基于原型的继承**，JavaScript的原型链是其中的关键所在。

### 继承的状态

继承有三个重要的状态，脑海中要有一张图，分别是：**原型对象**，**构造函数**，**对象**

- 原型对象 `constructor` -> 构造函数
- 构造函数 `prototype` -> 原型对象
- 构造函数 `new` -> 实例
- 实例 `__proto__` -> 原型对象

### 继承的方法

七种方式：

- 原型链继承
  - 实现：new 父类 赋给 子类prototype
  - 缺点：实例对引用类型（如数组）的改动，会导致所有实例改动，而且不可向父类传参
- 构造函数式继承
  - 实现：子类 call 父类构造函数
  - 缺点：无法实现复用，所有子类有父类实例的副本，影响性能
- 组合式继承
  - 实现：上面两种综合使用
  - 缺点：创建实例的时候，原型中会有两份相同的属性（可用 寄生组合方式 改进，即Object.create）
- 原型式继承
  - 实现：对象Object.create创建
  - 缺点：无法传递参数，有篡改可能
- 寄生式继承
  - 是一种思路，可以和组合方式组合
  - 缺点：同原型式继承
- 寄生组合式继承
  - 实现：在组合式继承的基础上改动，即将new 父类的部分，改成Object.create(父类.prototype)。原因，new会执行目标函数，导致多创建一层，而Object.create()不会执行，所以少一层。
  - 目前最为完善的方法
- 混入方式继承多个对象
  - 实现：Object.assign()会将其它原型上的函数拷贝到目标原型上，所以可以继承多个对象

备注：Object.create()是ES5的方法，原理是创建一个空函数，将传入的参数绑定到空函数的prototype上，然后返回new f() 实例

### 继承总结

其实上面说的这么多方式，排除掉ES6之外，其实就两种思路

- 第一种是`function`来模拟，该种方法更像Java风格的类接口来操纵，非常的别扭
- 第二种即ES5的`Object.create()`直接创建（Object.create可用其他方式模拟），这种方式在我看来更加符合基于原型的面向对象

### 说说 ES5 和 ES6 继承的区别？
* ES5 的继承使用借助构造函数实现，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面。
* ES6 的继承机制完全不同，实质是先创造父类的实例对象`this`（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。
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
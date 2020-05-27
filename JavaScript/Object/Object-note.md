# Object相关知识笔记

## 对象的特征
* 对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。
* 对象有状态：对象具有状态，同一对象可能处于不同状态之下。
* 对象具有行为：即对象的状态，可能因为它的行为产生变迁。

对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力。

## 哪些类型可以作为对象的key？
string、symbol

## 说说toString与valueOf
https://www.cnblogs.com/liutianzeng/p/10859000.html

所有的对象都继承了toString和valueOf这两个方法：
* `valueOf()`  - 它的作用是返回它相应的原始值；
* `toString()` - 它的作用是返回一个反映这个对象的字符串；

### toString和valueOf哪个先执行？
对象通过toString或valueOf方法转换为原始值，JS语言核心的内置类首先尝试使用valueOf()，再尝试使用toString()

这两个方法在不同使用场景会有不同的优先级：
* 默认情况下，执行这个抽象操作时会先执行valueOf方法；
* 如果返回的不是原始值，会继续执行toString方法；
* 如果返回的还不是原始值，那么会报错；
* 如果有指定转换类型时，情况又会有所不同。

### 以下代码中obj输出什么?

```JavaScript
var arr = [function() {console.log('x')}, function() {}, {}];
var obj = {};
obj[arr[0]] = 1;

{"function() {console.log('x')}": 1}
```
分析：函数隐式转化会将函数本身的代码转成字符串，对象的隐式转化会转成`[object Object]`;

